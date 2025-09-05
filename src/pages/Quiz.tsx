import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Clock, Trophy, Zap, RefreshCw, Star } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { Heading } from '../components/ui/Heading'
import { Card } from '../components/ui/Card'
import { IconBadge } from '../components/ui/IconBadge'
import { PitaAksen } from '../components/ui/PitaAksen'
import { aksaraScripts } from '../data/aksara'
import { fadeUp, stagger } from '../lib/motion'
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
  const [showConfetti, setShowConfetti] = useState(false)

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
            'Setiap huruf berdiri sendiri'
          ].filter(r => r !== rule).slice(0, 3)
          
          const options = [rule, ...otherRules]
          const shuffledOptions = options.sort(() => Math.random() - 0.5)
          
          questionPool.push({
            id: `${script.id}-rules-${index}`,
            type: 'rules',
            question: `Manakah aturan penulisan yang benar untuk aksara ${script.name}?`,
            options: shuffledOptions,
            correct: shuffledOptions.indexOf(rule),
            explanation: `Aturan ini adalah salah satu karakteristik khusus aksara ${script.name}`
          })
        })
      }
    })

    return questionPool.sort(() => Math.random() - 0.5).slice(0, 10)
  }

  const startQuiz = (type: typeof quizType) => {
    setQuizType(type)
    const newQuestions = generateQuestions(type)
    setQuestions(newQuestions)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setCombo(0)
    setAnswers(new Array(newQuestions.length).fill(null))
    setTimeLeft(30)
    setGameMode('playing')
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    const isCorrect = selectedAnswer === questions[currentQuestion].correct
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = selectedAnswer
    setAnswers(newAnswers)

    if (isCorrect) {
      const points = timerEnabled ? Math.max(10, timeLeft * 2) : 10
      setScore(score + points + combo * 5)
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
      if (score >= 80) {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 3000)
      }
    }
  }

  const resetQuiz = () => {
    setGameMode('select')
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setCombo(0)
    setAnswers([])
  }

  const getScoreGrade = (score: number) => {
    if (score >= 90) return { grade: 'A+', color: 'text-giring-emas', message: 'Luar biasa!' }
    if (score >= 80) return { grade: 'A', color: 'text-giring-emas', message: 'Sangat baik!' }
    if (score >= 70) return { grade: 'B', color: 'text-jade-tenun', message: 'Baik!' }
    if (score >= 60) return { grade: 'C', color: 'text-sogan-batik', message: 'Cukup baik' }
    return { grade: 'D', color: 'text-red-500', message: 'Perlu belajar lagi' }
  }

  if (gameMode === 'select') {
    return (
      <div className="min-h-screen bg-gabus-pualam">
        <Section className="bg-gradient-to-br from-indigo-lurik via-sogan-batik to-jade-tenun">
          <Container>
            <motion.div
              variants={stagger}
              initial="initial"
              animate="animate"
              className="py-16"
            >
              <motion.div variants={fadeUp} className="mb-8">
                <Link 
                  to={script ? `/learn/${script.id}` : "/learn"}
                  className="inline-flex items-center gap-2 text-gabus-pualam hover:text-giring-emas transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  {script ? `Kembali ke ${script.name}` : 'Kembali ke Belajar'}
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="text-center">
                <PitaAksen length="medium" className="mx-auto mb-6" />
                <Heading level={1} className="text-gabus-pualam mb-4" cultural>
                  Kuis {script?.name || 'Aksara Nusantara'}
                </Heading>
                <p className="text-xl text-gabus-pualam/90 max-w-2xl mx-auto">
                  Uji pemahaman Anda tentang aksara tradisional dengan berbagai mode permainan
                </p>
              </motion.div>
            </motion.div>
          </Container>
        </Section>

        <Section>
          <Container>
            <motion.div 
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              {/* Mode A: Glyph to Romanization */}
              <motion.div variants={fadeUp}>
                <Card hover className="h-full text-center">
                  <IconBadge size="lg" variant="accent" className="mx-auto mb-4">
                    <span className="text-2xl">ꦲ</span>
                  </IconBadge>
                  <h3 className="text-xl font-semibold text-indigo-lurik mb-3 font-cultural">
                    Tebak Romanisasi
                  </h3>
                  <p className="text-sogan-batik mb-6 leading-relaxed">
                    Lihat glyph aksara dan pilih cara membacanya yang benar
                  </p>
                  <button
                    onClick={() => startQuiz('glyph-to-romanization')}
                    className="w-full bg-giring-emas text-indigo-lurik px-6 py-3 rounded-lg font-semibold hover:bg-giring-emas/90 transition-colors"
                  >
                    Mulai Kuis
                  </button>
                </Card>
              </motion.div>

              {/* Mode B: Romanization to Glyph */}
              <motion.div variants={fadeUp}>
                <Card hover className="h-full text-center">
                  <IconBadge size="lg" variant="cultural" className="mx-auto mb-4">
                    <span className="text-lg">ABC</span>
                  </IconBadge>
                  <h3 className="text-xl font-semibold text-indigo-lurik mb-3 font-cultural">
                    Tebak Glyph
                  </h3>
                  <p className="text-sogan-batik mb-6 leading-relaxed">
                    Dengar romanisasi dan pilih glyph aksara yang tepat
                  </p>
                  <button
                    onClick={() => startQuiz('romanization-to-glyph')}
                    className="w-full bg-jade-tenun text-gabus-pualam px-6 py-3 rounded-lg font-semibold hover:bg-jade-tenun/90 transition-colors"
                  >
                    Mulai Kuis
                  </button>
                </Card>
              </motion.div>

              {/* Mode C: Rules */}
              <motion.div variants={fadeUp}>
                <Card hover className="h-full text-center">
                  <IconBadge size="lg" variant="primary" className="mx-auto mb-4">
                    <Trophy className="w-6 h-6" />
                  </IconBadge>
                  <h3 className="text-xl font-semibold text-indigo-lurik mb-3 font-cultural">
                    Aturan Penulisan
                  </h3>
                  <p className="text-sogan-batik mb-6 leading-relaxed">
                    Uji pengetahuan tentang aturan dan konvensi penulisan
                  </p>
                  <button
                    onClick={() => startQuiz('rules')}
                    className="w-full bg-indigo-lurik text-gabus-pualam px-6 py-3 rounded-lg font-semibold hover:bg-indigo-lurik/90 transition-colors"
                  >
                    Mulai Kuis
                  </button>
                </Card>
              </motion.div>
            </motion.div>

            {/* Timer Option */}
            <motion.div 
              variants={fadeUp}
              className="max-w-md mx-auto mt-8"
            >
              <Card>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-sogan-batik" />
                    <span className="text-indigo-lurik font-medium">Mode Timer</span>
                  </div>
                  <button
                    onClick={() => setTimerEnabled(!timerEnabled)}
                    className={cn(
                      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                      timerEnabled ? "bg-giring-emas" : "bg-gray-300"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                        timerEnabled ? "translate-x-6" : "translate-x-1"
                      )}
                    />
                  </button>
                </div>
                <p className="text-sm text-sogan-batik mt-2">
                  Aktifkan untuk menambah tantangan dengan batas waktu 30 detik per soal
                </p>
              </Card>
            </motion.div>
          </Container>
        </Section>
      </div>
    )
  }

  if (gameMode === 'playing') {
    const question = questions[currentQuestion]
    
    return (
      <div className="min-h-screen bg-gabus-pualam">
        {/* Header */}
        <Section className="py-4 bg-gradient-to-r from-indigo-lurik to-jade-tenun">
          <Container>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-gabus-pualam font-medium">
                  Soal {currentQuestion + 1} dari {questions.length}
                </span>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-giring-emas" />
                  <span className="text-giring-emas font-bold">Combo: {combo}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-gabus-pualam font-bold">
                  Skor: {score}
                </div>
                {timerEnabled && (
                  <div className={cn(
                    "flex items-center gap-2 px-3 py-1 rounded-full",
                    timeLeft <= 10 ? "bg-red-500" : "bg-giring-emas"
                  )}>
                    <Clock className="w-4 h-4" />
                    <span className="font-bold">{timeLeft}s</span>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <div className="max-w-3xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  variants={fadeUp}
                  initial="initial"
                  animate="animate"
                  exit="initial"
                >
                  <Card>
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-semibold text-indigo-lurik mb-4 font-cultural">
                        {question.question}
                      </h2>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-jade-tenun/20 rounded-full h-2 mb-6">
                        <div 
                          className="bg-giring-emas h-2 rounded-full transition-all duration-300"
                          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {question.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          className={cn(
                            "p-4 rounded-lg border-2 transition-all text-left",
                            selectedAnswer === index
                              ? "border-giring-emas bg-giring-emas/10 text-giring-emas"
                              : "border-jade-tenun/30 text-indigo-lurik hover:border-giring-emas hover:bg-giring-emas/5"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                              selectedAnswer === index
                                ? "bg-giring-emas text-indigo-lurik"
                                : "bg-jade-tenun/20 text-sogan-batik"
                            )}>
                              {String.fromCharCode(65 + index)}
                            </div>
                            <span className="text-lg font-cultural">{option}</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="flex justify-center mt-8">
                      <button
                        onClick={handleNextQuestion}
                        disabled={selectedAnswer === null}
                        className="px-8 py-3 bg-giring-emas text-indigo-lurik rounded-lg font-semibold hover:bg-giring-emas/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {currentQuestion + 1 === questions.length ? 'Selesai' : 'Lanjut'}
                      </button>
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          </Container>
        </Section>
      </div>
    )
  }

  // Results screen
  const correctAnswers = answers.filter((answer, index) => answer === questions[index].correct).length
  const percentage = Math.round((correctAnswers / questions.length) * 100)
  const grade = getScoreGrade(percentage)

  return (
    <div className="min-h-screen bg-gabus-pualam">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-6xl animate-bounce">🎉</div>
        </div>
      )}

      <Section className="bg-gradient-to-br from-indigo-lurik via-sogan-batik to-jade-tenun">
        <Container>
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="text-center py-16"
          >
            <div className="text-6xl mb-6">
              {percentage >= 80 ? '🏆' : percentage >= 60 ? '🎯' : '📚'}
            </div>
            
            <Heading level={1} className="text-gabus-pualam mb-4" cultural>
              Kuis Selesai!
            </Heading>
            
            <div className="text-4xl font-bold text-giring-emas mb-2">
              {percentage}%
            </div>
            
            <div className={cn("text-2xl font-semibold mb-4", grade.color)}>
              Grade: {grade.grade}
            </div>
            
            <p className="text-xl text-gabus-pualam/90 mb-8">
              {grade.message}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
              <div className="bg-gabus-pualam/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-giring-emas">{correctAnswers}</div>
                <div className="text-gabus-pualam/80">Benar</div>
              </div>
              <div className="bg-gabus-pualam/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-giring-emas">{score}</div>
                <div className="text-gabus-pualam/80">Total Skor</div>
              </div>
              <div className="bg-gabus-pualam/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-giring-emas">{Math.max(...Array.from({length: answers.length}, (_, i) => {
                  let currentCombo = 0
                  let maxCombo = 0
                  for (let j = 0; j <= i; j++) {
                    if (answers[j] === questions[j].correct) {
                      currentCombo++
                      maxCombo = Math.max(maxCombo, currentCombo)
                    } else {
                      currentCombo = 0
                    }
                  }
                  return maxCombo
                }))}</div>
                <div className="text-gabus-pualam/80">Combo Terbaik</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetQuiz}
                className="px-6 py-3 bg-giring-emas text-indigo-lurik rounded-lg font-semibold hover:bg-giring-emas/90 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Coba Lagi
              </button>
              
              <Link
                to={script ? `/learn/${script.id}` : "/learn"}
                className="px-6 py-3 bg-gabus-pualam/20 text-gabus-pualam rounded-lg font-semibold hover:bg-gabus-pualam/30 transition-colors flex items-center justify-center gap-2"
              >
                <Star className="w-4 h-4" />
                Kembali Belajar
              </Link>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Review Section */}
      <Section>
        <Container>
          <Card>
            <h3 className="text-xl font-semibold text-indigo-lurik mb-6 font-cultural text-center">
              Review Jawaban
            </h3>
            
            <div className="space-y-4">
              {questions.map((question, index) => {
                const userAnswer = answers[index]
                const isCorrect = userAnswer === question.correct
                
                return (
                  <div key={question.id} className={cn(
                    "p-4 rounded-lg border-2",
                    isCorrect ? "border-jade-tenun bg-jade-tenun/5" : "border-red-300 bg-red-50"
                  )}>
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0",
                        isCorrect ? "bg-jade-tenun text-gabus-pualam" : "bg-red-500 text-white"
                      )}>
                        {index + 1}
                      </div>
                      
                      <div className="flex-1">
                        <p className="font-medium text-indigo-lurik mb-2">{question.question}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                          {question.options.map((option, optIndex) => (
                            <div key={optIndex} className={cn(
                              "p-2 rounded text-sm",
                              optIndex === question.correct ? "bg-jade-tenun/20 text-jade-tenun font-medium" :
                              optIndex === userAnswer && !isCorrect ? "bg-red-100 text-red-600" :
                              "text-sogan-batik"
                            )}>
                              {String.fromCharCode(65 + optIndex)}. {option}
                              {optIndex === question.correct && " ✓"}
                              {optIndex === userAnswer && !isCorrect && " ✗"}
                            </div>
                          ))}
                        </div>
                        
                        <p className="text-sm text-jade-tenun italic">{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </Container>
      </Section>
    </div>
  )
}
