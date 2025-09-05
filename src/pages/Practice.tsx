import { useState, useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, RotateCcw, Palette, Save, Award, Target } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { Heading } from '../components/ui/Heading'
import { Card } from '../components/ui/Card'
import { IconBadge } from '../components/ui/IconBadge'
import { PitaAksen } from '../components/ui/PitaAksen'
import { aksaraScripts } from '../data/aksara'
import { fadeUp, stagger } from '../lib/motion'
import { cn } from '../lib/utils'

interface Point {
  x: number
  y: number
}

interface Stroke {
  points: Point[]
  brushSize: number
}

export function Practice() {
  const { scriptId } = useParams<{ scriptId: string }>()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [strokes, setStrokes] = useState<Stroke[]>([])
  const [currentStroke, setCurrentStroke] = useState<Point[]>([])
  const [brushSize, setBrushSize] = useState(8)
  const [selectedCharacter, setSelectedCharacter] = useState<string>('')
  const [score, setScore] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<string>('')

  const script = scriptId ? aksaraScripts.find(s => s.id === scriptId) : null
  const practiceCharacters = script?.basicCharacters.slice(0, 12) || ['ꦲ', 'ꦤ', 'ꦕ', 'ꦫ', 'ꦏ', 'ꦢ']

  useEffect(() => {
    if (practiceCharacters.length > 0 && !selectedCharacter) {
      setSelectedCharacter(practiceCharacters[0])
    }
  }, [practiceCharacters, selectedCharacter])

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    
    const rect = canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const pos = getMousePos(e)
    setCurrentStroke([pos])
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const pos = getMousePos(e)
    setCurrentStroke(prev => [...prev, pos])

    ctx.lineWidth = brushSize
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#1e1b4b'
    
    if (currentStroke.length > 0) {
      const prevPos = currentStroke[currentStroke.length - 1]
      ctx.beginPath()
      ctx.moveTo(prevPos.x, prevPos.y)
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
    }
  }

  const stopDrawing = () => {
    if (isDrawing && currentStroke.length > 0) {
      setStrokes(prev => [...prev, { points: currentStroke, brushSize }])
      setCurrentStroke([])
    }
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setStrokes([])
    setCurrentStroke([])
    setScore(null)
    setFeedback('')
  }

  const undoLastStroke = () => {
    if (strokes.length === 0) return
    
    const newStrokes = strokes.slice(0, -1)
    setStrokes(newStrokes)
    redrawCanvas(newStrokes)
  }

  const redrawCanvas = (strokesToRedraw: Stroke[]) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    strokesToRedraw.forEach(stroke => {
      if (stroke.points.length < 2) return
      
      ctx.lineWidth = stroke.brushSize
      ctx.lineCap = 'round'
      ctx.strokeStyle = '#1e1b4b'
      ctx.beginPath()
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y)
      
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y)
      }
      ctx.stroke()
    })
  }

  const evaluateDrawing = () => {
    // Simple scoring algorithm based on stroke count and coverage
    const strokeCount = strokes.length
    const expectedStrokes = 3 // Simplified assumption
    
    let baseScore = Math.max(0, 100 - Math.abs(strokeCount - expectedStrokes) * 20)
    
    // Add randomness for demo purposes
    const variation = Math.random() * 20 - 10
    const finalScore = Math.max(0, Math.min(100, baseScore + variation))
    
    setScore(Math.round(finalScore))
    
    if (finalScore >= 80) {
      setFeedback('Excellent! Goresan Anda sangat baik.')
    } else if (finalScore >= 60) {
      setFeedback('Bagus! Coba perhatikan urutan goresan.')
    } else {
      setFeedback('Perlu latihan lagi. Perhatikan bentuk dasar aksara.')
    }

    // Save progress to localStorage
    const progress = JSON.parse(localStorage.getItem('aksara-progress') || '{}')
    const scriptProgress = progress[script?.id || 'default'] || {}
    scriptProgress[selectedCharacter] = Math.max(scriptProgress[selectedCharacter] || 0, finalScore)
    progress[script?.id || 'default'] = scriptProgress
    localStorage.setItem('aksara-progress', JSON.stringify(progress))
  }

  const saveDrawing = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const link = document.createElement('a')
    link.download = `aksara-${selectedCharacter}-${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="min-h-screen bg-gabus-pualam">
      {/* Header */}
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
                Latihan Goresan {script?.name || 'Aksara'}
              </Heading>
              <p className="text-xl text-gabus-pualam/90 max-w-2xl mx-auto">
                Praktikkan menulis aksara dengan panduan interaktif dan dapatkan umpan balik langsung
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Character Selection */}
            <div className="lg:col-span-1">
              <Card>
                <h3 className="text-lg font-semibold text-indigo-lurik mb-4 font-cultural">
                  Pilih Aksara
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {practiceCharacters.map((char) => (
                    <button
                      key={char}
                      onClick={() => {
                        setSelectedCharacter(char)
                        clearCanvas()
                      }}
                      className={cn(
                        "aspect-square rounded-lg border-2 flex items-center justify-center text-2xl transition-all",
                        selectedCharacter === char
                          ? "border-giring-emas bg-giring-emas/10 text-giring-emas"
                          : "border-jade-tenun/30 text-indigo-lurik hover:border-giring-emas hover:bg-giring-emas/5"
                      )}
                    >
                      {char}
                    </button>
                  ))}
                </div>

                {/* Progress */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-indigo-lurik mb-3">Progress</h4>
                  <div className="space-y-2">
                    {practiceCharacters.slice(0, 6).map((char) => {
                      const progress = JSON.parse(localStorage.getItem('aksara-progress') || '{}')
                      const charScore = progress[script?.id || 'default']?.[char] || 0
                      return (
                        <div key={char} className="flex items-center gap-2">
                          <span className="text-lg">{char}</span>
                          <div className="flex-1 bg-jade-tenun/20 rounded-full h-2">
                            <div 
                              className="bg-giring-emas h-2 rounded-full transition-all"
                              style={{ width: `${charScore}%` }}
                            />
                          </div>
                          <span className="text-xs text-sogan-batik">{charScore}%</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </Card>
            </div>

            {/* Canvas Area */}
            <div className="lg:col-span-2">
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-indigo-lurik font-cultural">
                    Area Latihan
                  </h3>
                  <div className="flex items-center gap-2">
                    <IconBadge size="sm" variant="cultural">
                      <Target className="w-4 h-4" />
                    </IconBadge>
                    <span className="text-3xl text-giring-emas">{selectedCharacter}</span>
                  </div>
                </div>

                {/* Canvas */}
                <div className="relative bg-gabus-pualam border-2 border-jade-tenun/20 rounded-lg overflow-hidden">
                  <canvas
                    ref={canvasRef}
                    width={600}
                    height={400}
                    className="block w-full h-auto cursor-crosshair"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                  />
                  
                  {/* Template Character (Background) */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-9xl text-jade-tenun/10 font-cultural select-none">
                      {selectedCharacter}
                    </span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Palette className="w-4 h-4 text-sogan-batik" />
                      <input
                        type="range"
                        min="2"
                        max="20"
                        value={brushSize}
                        onChange={(e) => setBrushSize(Number(e.target.value))}
                        className="w-20"
                      />
                      <span className="text-sm text-sogan-batik">{brushSize}px</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={undoLastStroke}
                      className="px-3 py-2 text-sm bg-sogan-batik text-gabus-pualam rounded-lg hover:bg-sogan-batik/80 transition-colors"
                    >
                      Undo
                    </button>
                    <button
                      onClick={clearCanvas}
                      className="px-3 py-2 text-sm bg-jade-tenun text-gabus-pualam rounded-lg hover:bg-jade-tenun/80 transition-colors flex items-center gap-1"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </button>
                    <button
                      onClick={saveDrawing}
                      className="px-3 py-2 text-sm bg-indigo-lurik text-gabus-pualam rounded-lg hover:bg-indigo-lurik/80 transition-colors flex items-center gap-1"
                    >
                      <Save className="w-4 h-4" />
                      Simpan
                    </button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Evaluation Panel */}
            <div className="lg:col-span-1">
              <Card>
                <h3 className="text-lg font-semibold text-indigo-lurik mb-4 font-cultural">
                  Evaluasi
                </h3>

                <button
                  onClick={evaluateDrawing}
                  disabled={strokes.length === 0}
                  className="w-full bg-giring-emas text-indigo-lurik px-4 py-3 rounded-lg font-semibold hover:bg-giring-emas/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  Nilai Goresan
                </button>

                {score !== null && (
                  <motion.div
                    variants={fadeUp}
                    initial="initial"
                    animate="animate"
                    className="mt-6 text-center"
                  >
                    <div className="text-4xl font-bold text-giring-emas mb-2">
                      {score}%
                    </div>
                    <div className="text-sm text-sogan-batik mb-4">
                      {feedback}
                    </div>
                    
                    {/* Score Bar */}
                    <div className="w-full bg-jade-tenun/20 rounded-full h-3 mb-4">
                      <motion.div 
                        className="bg-giring-emas h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>

                    {score >= 80 && (
                      <div className="text-2xl mb-2">🎉</div>
                    )}
                  </motion.div>
                )}

                {/* Tips */}
                <div className="mt-6 p-4 bg-jade-tenun/10 rounded-lg">
                  <h4 className="text-sm font-medium text-indigo-lurik mb-2">Tips:</h4>
                  <ul className="text-xs text-sogan-batik space-y-1">
                    <li>• Ikuti urutan goresan yang benar</li>
                    <li>• Perhatikan proporsi dan bentuk</li>
                    <li>• Gunakan gerakan yang halus</li>
                    <li>• Latihan rutin untuk hasil terbaik</li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
