import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Clock, Trophy, Zap, RefreshCw, Sparkles, Brain } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { Heading } from '../components/ui/Heading'
import { aksaraScripts } from '../data/aksara'
import { cn } from '../lib/utils'

interface Question {
  id: string
  type: 'glyph-to-romanization' | 'romanization-to-glyph' | 'rules'
  question: string
  options: string[]
  correct: number
  explanation: string
}

export function Quiz() {
  const { scriptId } = useParams<{ scriptId: string }>()
  const [gameMode, setGameMode] = useState<'select' | 'playing' | 'results'>('select')
  const [quizType, setQuizType] = useState<'glyph-to-romanization' | 'romanization-to-glyph' | 'rules'>('glyph-to-romanization')
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [timerEnabled, setTimerEnabled] = useState(false)
  const [answers, setAnswers] = useState<(number | null)[]>([])

  const script = scriptId ? aksaraScripts.find(s => s.id === scriptId) : null
  const allScripts = script ? [script] : aksaraScripts

  useEffect(() => {
    if (gameMode === 'playing' && timerEnabled && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gameMode === 'playing') {
      handleNextQuestion()
    }
  }, [timeLeft, gameMode, timerEnabled])

  const generateQuestions = (type: typeof quizType): Question[] => {
    const questionPool: Question[] = []
    
    allScripts.forEach(script => {
      if (type === 'glyph-to-romanization') {
        script.examples.forEach((example, index) => {
          const otherExamples = script.examples.filter((_, i) => i !== index).slice(0, 3)
          const options = [example.script, ...otherExamples.map(e => e.script)]
          const shuffledOptions = options.sort(() => Math.random() - 0.5)
          
          questionPool.push({
            id: `${script.id}-gtr-${index}`,
            type: 'glyph-to-romanization',
            question: `Bagaimana cara membaca aksara ini: ${example.word}`,
            options: shuffledOptions,
            correct: shuffledOptions.indexOf(example.script),
            explanation: `${example.word} dibaca "${example.script}" yang berarti "${example.meaning}"`
          })
        })
      } else if (type === 'romanization-to-glyph') {
        script.examples.forEach((example, index) => {
          const otherExamples = script.examples.filter((_, i) => i !== index).slice(0, 3)
          const options = [example.word, ...otherExamples.map(e => e.word)]
          const shuffledOptions = options.sort(() => Math.random() - 0.5)
          
          questionPool.push({
            id: `${script.id}-rtg-${index}`,
            type: 'romanization-to-glyph',
            question: `Bagaimana menulis "${example.script}" dalam aksara ${script.name}?`,
            options: shuffledOptions,
            correct: shuffledOptions.indexOf(example.word),
            explanation: `"${example.script}" ditulis sebagai ${example.word} dalam aksara ${script.name}`
          })
        })
      } else if (type === 'rules') {
        script.rules.forEach((rule, index) => {
          const otherRules = [
            'Ditulis dari kanan ke kiri',
            'Menggunakan spasi antar kata',
            'Tidak memiliki huruf kapital',
            'Menggunakan tanda baca khusus',
            'Ditulis dalam bentuk sambung',
            'Memiliki sistem vokal terpisah'
          ].filter(r => r !== rule).slice(0, 3)
          
          const options = [rule, ...otherRules]
          const shuffledOptions = options.sort(() => Math.random() - 0.5)
          
          questionPool.push({
            id: `${script.id}-rules-${index}`,
            type: 'rules',
            question: `Manakah yang merupakan aturan penulisan aksara ${script.name}?`,
            options: shuffledOptions,
            correct: shuffledOptions.indexOf(rule),
            explanation: `Aksara ${script.name} memiliki aturan: ${rule}`
          })
        })
      }
    })
    
    return questionPool.sort(() => Math.random() - 0.5).slice(0, 10)
  }

  const startQuiz = () => {
    const newQuestions = generateQuestions(quizType)
    setQuestions(newQuestions)
    setAnswers(new Array(newQuestions.length).fill(null))
    setCurrentQuestion(0)
    setScore(0)
    setCombo(0)
    setSelectedAnswer(null)
    setTimeLeft(30)
    setGameMode('playing')
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = selectedAnswer
    setAnswers(newAnswers)

    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1)
      setCombo(combo + 1)
    } else {
      setCombo(0)
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setTimeLeft(30)
    } else {
      setGameMode('results')
    }
  }

  const resetQuiz = () => {
    setGameMode('select')
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setCombo(0)
    setTimeLeft(30)
    setAnswers([])
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 90) return { message: 'Luar Biasa!', color: 'text-yellow-500' }
    if (percentage >= 80) return { message: 'Sangat Baik!', color: 'text-green-500' }
    if (percentage >= 70) return { message: 'Baik!', color: 'text-blue-500' }
    if (percentage >= 60) return { message: 'Cukup', color: 'text-orange-500' }
    return { message: 'Perlu Latihan', color: 'text-red-500' }
  }

  return (
    <div className="min-h-screen bg-[#592B18]">
      {gameMode === 'select' && (
        <Section className="bg-[#592B18] relative overflow-hidden pt-24 pb-8">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-16 text-8xl text-white rotate-12">🧠</div>
            <div className="absolute top-32 right-20 text-6xl text-white -rotate-12">ꦲ</div>
            <div className="absolute bottom-20 left-1/4 text-7xl text-white rotate-45">ᮃ</div>
            <div className="absolute bottom-16 right-16 text-5xl text-white -rotate-30">ᬅ</div>
          </div>
          
          <Container className="relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                  <Brain className="w-6 h-6 text-white" />
                  <span className="text-white font-medium">Uji Kemampuan</span>
                </div>
                <Heading level={1} cultural className="text-white mb-6 text-4xl lg:text-5xl">
                  Kuis Aksara {script?.name || 'Nusantara'}
                </Heading>
                <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                  Uji pemahaman Anda tentang aksara tradisional dengan berbagai jenis pertanyaan yang menantang
                </p>
              </motion.div>

              {script && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center mb-8"
                >
                  <Link 
                    to="/quiz" 
                    className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Semua Kuis
                  </Link>
                </motion.div>
              )}

              {/* Quiz Type Selection */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-white font-medium mb-4 text-center">Pilih Jenis Kuis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { type: 'glyph-to-romanization', title: 'Aksara ke Latin', desc: 'Baca aksara dan pilih romanisasinya' },
                      { type: 'romanization-to-glyph', title: 'Latin ke Aksara', desc: 'Pilih aksara yang sesuai dengan romanisasi' },
                      { type: 'rules', title: 'Aturan Penulisan', desc: 'Pahami aturan dan karakteristik aksara' }
                    ].map((quiz) => (
                      <motion.button
                        key={quiz.type}
                        onClick={() => setQuizType(quiz.type as typeof quizType)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-xl text-left transition-all duration-300 ${
                          quizType === quiz.type 
                            ? 'bg-white text-[#592B18] shadow-lg' 
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        <h4 className="font-semibold mb-2">{quiz.title}</h4>
                        <p className="text-sm opacity-80">{quiz.desc}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Settings */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-white font-medium mb-4 text-center">Pengaturan</h3>
                  <div className="flex items-center justify-center gap-4">
                    <label className="flex items-center gap-2 text-white">
                      <input
                        type="checkbox"
                        checked={timerEnabled}
                        onChange={(e) => setTimerEnabled(e.target.checked)}
                        className="rounded"
                      />
                      <span>Aktifkan Timer (30 detik per soal)</span>
                    </label>
                  </div>
                </div>
              </motion.div>

              {/* Start Button */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <motion.button
                  onClick={startQuiz}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-[#592B18] rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Mulai Kuis
                </motion.button>
              </motion.div>
            </motion.div>
          </Container>
        </Section>
      )}

      {gameMode === 'playing' && questions.length > 0 && (
        <Section className="bg-[#592B18] pt-24">
          <Container>
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <motion.button
                  onClick={resetQuiz}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-xl font-medium hover:bg-white/30 transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Keluar
                </motion.button>
                
                <div className="flex items-center gap-6 text-white">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    <span>{score}/{questions.length}</span>
                  </div>
                  {combo > 1 && (
                    <div className="flex items-center gap-2 text-yellow-400">
                      <Zap className="w-5 h-5" />
                      <span>{combo}x</span>
                    </div>
                  )}
                  {timerEnabled && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{timeLeft}s</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Question Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-white mb-4 font-cultural">
                      {questions[currentQuestion].question}
                    </h2>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-white/20 rounded-full h-2 mb-6">
                      <div 
                        className="bg-white h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {questions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "p-4 rounded-xl border-2 transition-all text-left",
                          selectedAnswer === index
                            ? "border-white bg-white/20 text-white"
                            : "border-white/30 text-white/80 hover:border-white hover:bg-white/10"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                            selectedAnswer === index
                              ? "bg-white text-[#592B18]"
                              : "bg-white/20 text-white"
                          )}>
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span className="text-lg font-cultural">{option}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Next Button */}
                  {selectedAnswer !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center mt-8"
                    >
                      <motion.button
                        onClick={handleNextQuestion}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-white text-[#592B18] rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                      >
                        {currentQuestion + 1 === questions.length ? 'Selesai' : 'Lanjut'}
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </Container>
        </Section>
      )}

      {gameMode === 'results' && (
        <Section className="bg-[#592B18] pt-24">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              {/* Results Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                  <Trophy className="w-6 h-6 text-white" />
                  <span className="text-white font-medium">Hasil Kuis</span>
                </div>
                
                <h1 className="text-4xl font-bold text-white mb-4">
                  {getScoreMessage().message}
                </h1>
                
                <div className="text-6xl font-bold text-white mb-4">
                  {score}/{questions.length}
                </div>
                
                <p className="text-xl text-white/80">
                  Skor: {Math.round((score / questions.length) * 100)}%
                </p>
              </motion.div>

              {/* Score Breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">{score}</div>
                    <div className="text-white/70">Benar</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">{questions.length - score}</div>
                    <div className="text-white/70">Salah</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">{Math.round((score / questions.length) * 100)}%</div>
                    <div className="text-white/70">Akurasi</div>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.button
                  onClick={startQuiz}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-[#592B18] rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Ulangi Kuis
                </motion.button>
                
                <motion.button
                  onClick={resetQuiz}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-300"
                >
                  Pilih Kuis Lain
                </motion.button>
              </motion.div>

              {/* Bottom decorative element */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center mt-16"
              >
                <div className="inline-flex items-center gap-3 text-white/60">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/30"></div>
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-medium">Terus Berlatih!</span>
                  <Sparkles className="w-5 h-5" />
                  <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/30"></div>
                </div>
              </motion.div>
            </div>
          </Container>
        </Section>
      )}
    </div>
  )
}
