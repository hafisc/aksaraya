import { useState, useRef, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, RotateCcw, Palette, Save, Award, Target, PenTool, Sparkles } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { Heading } from '../components/ui/Heading'
import { Card } from '../components/ui/Card'
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
  const [selectedScript, setSelectedScript] = useState<string | null>(scriptId || null)
  const [showScriptSelection, setShowScriptSelection] = useState(!scriptId)

  const script = selectedScript ? aksaraScripts.find(s => s.id === selectedScript) : null
  const practiceCharacters = useMemo(() => {
    return script?.basicCharacters.slice(0, 12) || []
  }, [script?.basicCharacters])

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
    if (strokes.length === 0) {
      setScore(0)
      setFeedback('Tidak ada goresan yang terdeteksi. Silakan coba menulis aksara.')
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    // Advanced evaluation algorithm with stricter criteria
    const strokeCount = strokes.length
    const totalPoints = strokes.reduce((sum, stroke) => sum + stroke.points.length, 0)
    
    // Character-specific expected stroke counts for accuracy
    const characterStrokeMap: { [key: string]: number } = {
      'ꦲ': 3, 'ꦤ': 2, 'ꦕ': 2, 'ꦫ': 2, 'ꦏ': 2, 'ꦢ': 2,
      'ᬅ': 3, 'ᬇ': 2, 'ᬉ': 3, 'ᬋ': 2, 'ᬍ': 2, 'ᬏ': 2,
      'ᮃ': 2, 'ᮅ': 3, 'ᮇ': 2, 'ᮉ': 2, 'ᮋ': 3, 'ᮍ': 2
    }
    
    const expectedStrokes = characterStrokeMap[selectedCharacter] || 3
    
    // 1. Stroke Count Accuracy (30 points max) - Very strict
    let strokeScore = 0
    if (strokeCount === expectedStrokes) {
      strokeScore = 30
    } else if (Math.abs(strokeCount - expectedStrokes) === 1) {
      strokeScore = 15
    } else if (Math.abs(strokeCount - expectedStrokes) === 2) {
      strokeScore = 5
    }
    // More than 2 strokes off = 0 points
    
    // 2. Minimum Complexity Check (25 points max)
    let complexityScore = 0
    if (totalPoints >= 50) { // Minimum drawing effort
      complexityScore = Math.min(25, totalPoints / 4)
    }
    
    // 3. Canvas Coverage (20 points max) - Must use reasonable space
    let minX = canvas.width, maxX = 0, minY = canvas.height, maxY = 0
    strokes.forEach(stroke => {
      stroke.points.forEach(point => {
        minX = Math.min(minX, point.x)
        maxX = Math.max(maxX, point.x)
        minY = Math.min(minY, point.y)
        maxY = Math.max(maxY, point.y)
      })
    })
    
    const usedWidth = maxX - minX
    const usedHeight = maxY - minY
    const coverageRatio = (usedWidth * usedHeight) / (canvas.width * canvas.height)
    
    let coverageScore = 0
    if (coverageRatio >= 0.1 && coverageRatio <= 0.6) { // Reasonable size range
      coverageScore = 20
    } else if (coverageRatio >= 0.05 && coverageRatio <= 0.8) {
      coverageScore = 10
    }
    // Too small or too large = poor score
    
    // 4. Stroke Quality (15 points max)
    let qualityScore = 0
    const avgPointsPerStroke = totalPoints / strokeCount
    if (avgPointsPerStroke >= 8 && avgPointsPerStroke <= 50) { // Good stroke density
      qualityScore = 15
    } else if (avgPointsPerStroke >= 5 && avgPointsPerStroke <= 80) {
      qualityScore = 8
    }
    
    // 5. Form Completeness (10 points max)
    let formScore = 0
    if (strokeCount >= 2 && usedWidth > 20 && usedHeight > 20) {
      formScore = 10
    } else if (strokeCount >= 1 && (usedWidth > 15 || usedHeight > 15)) {
      formScore = 5
    }
    
    const finalScore = Math.max(0, strokeScore + complexityScore + coverageScore + qualityScore + formScore)
    setScore(Math.round(finalScore))
    
    // Detailed feedback based on analysis
    let feedback = ''
    if (finalScore >= 80) {
      feedback = `Excellent! Skor: ${Math.round(finalScore)}%. Goresan Anda sangat baik dan sesuai dengan bentuk aksara ${selectedCharacter}.`
    } else if (finalScore >= 60) {
      feedback = `Bagus! Skor: ${Math.round(finalScore)}%. `
      if (strokeCount !== expectedStrokes) {
        feedback += `Aksara ${selectedCharacter} membutuhkan ${expectedStrokes} goresan (Anda: ${strokeCount}). `
      }
      if (coverageScore < 15) {
        feedback += `Perbesar ukuran tulisan. `
      }
    } else if (finalScore >= 40) {
      feedback = `Cukup. Skor: ${Math.round(finalScore)}%. `
      if (strokeCount !== expectedStrokes) {
        feedback += `Gunakan ${expectedStrokes} goresan untuk ${selectedCharacter}. `
      }
      if (complexityScore < 15) {
        feedback += `Tambahkan detail lebih banyak. `
      }
      if (coverageScore < 10) {
        feedback += `Ukuran terlalu kecil atau besar. `
      }
    } else {
      feedback = `Perlu latihan lagi. Skor: ${Math.round(finalScore)}%. `
      feedback += `Aksara ${selectedCharacter} membutuhkan ${expectedStrokes} goresan dengan bentuk yang lebih lengkap dan proporsional.`
    }
    
    setFeedback(feedback)

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

  const handleScriptSelect = (scriptId: string) => {
    setSelectedScript(scriptId)
    setShowScriptSelection(false)
    setSelectedCharacter('')
    clearCanvas()
  }

  // Show script selection if no script is selected
  if (showScriptSelection) {
    return (
      <div className="min-h-screen bg-[#592B18]">
        <Section className="bg-[#592B18] relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-16 left-20 text-8xl text-white rotate-12">📝</div>
            <div className="absolute top-32 right-16 text-6xl text-white -rotate-12">ꦲ</div>
            <div className="absolute bottom-20 left-1/4 text-7xl text-white rotate-45">ᮃ</div>
            <div className="absolute bottom-16 right-20 text-5xl text-white -rotate-30">ᬅ</div>
          </div>
          
          <Container className="relative z-10">
            <motion.div
              variants={stagger}
              initial="initial"
              animate="animate"
              className="py-8"
            >
              <motion.div variants={fadeUp} className="text-center mb-12">
                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                  <PenTool className="w-6 h-6 text-white" />
                  <span className="text-white font-medium">Pilih Aksara</span>
                </div>
                <Heading level={1} className="text-white mb-6 text-4xl lg:text-5xl" cultural>
                  Pilih Aksara untuk Latihan
                </Heading>
                <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                  Pilih salah satu aksara tradisional Indonesia untuk memulai latihan menulis
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aksaraScripts.map((script) => (
                  <motion.div
                    key={script.id}
                    variants={fadeUp}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      onClick={() => handleScriptSelect(script.id)}
                      className="w-full text-left"
                    >
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                        <Card className="relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden h-full">
                          <div className="p-6">
                            <div className="text-center mb-4">
                              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center mb-4 shadow-2xl">
                                <span className="text-3xl text-white font-cultural">
                                  {script.glyph}
                                </span>
                              </div>
                              <h3 className="text-lg font-bold text-white mb-2 font-cultural">
                                {script.name}
                              </h3>
                              <p className="text-sm text-white/70 mb-4">
                                {script.region}
                              </p>
                            </div>
                            
                            <div className="text-center">
                              <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs text-white/80">
                                <Target className="w-3 h-3" />
                                {script.basicCharacters.length} karakter
                              </span>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </Container>
        </Section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#592B18]">
      {/* Header */}
      <Section className="bg-[#592B18] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-16 left-20 text-8xl text-white rotate-12">✍️</div>
          <div className="absolute top-32 right-16 text-6xl text-white -rotate-12">{selectedCharacter || 'ꦲ'}</div>
          <div className="absolute bottom-20 left-1/4 text-7xl text-white rotate-45">📝</div>
          <div className="absolute bottom-16 right-20 text-5xl text-white -rotate-30">🎯</div>
        </div>
        
        <Container className="relative z-10">
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="py-4"
          >
            <motion.div variants={fadeUp} className="mb-8">
              <Link 
                to={script ? `/learn/${script.id}` : "/learn"}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white hover:bg-white/20 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                {script ? `Kembali ke ${script.name}` : 'Kembali ke Belajar'}
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="text-center">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <PenTool className="w-6 h-6 text-white" />
                <span className="text-white font-medium">Latihan Interaktif</span>
              </div>
              <Heading level={1} className="text-white mb-6 text-4xl lg:text-5xl" cultural>
                Latihan Goresan {script?.name || 'Aksara'}
              </Heading>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Praktikkan menulis aksara dengan panduan interaktif dan dapatkan umpan balik langsung untuk meningkatkan kemampuan Anda
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section className="bg-[#592B18] -mt-24">
        <Container>
          <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Character Selection */}
              <motion.div variants={fadeUp} className="lg:col-span-1">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <Card className="relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                    <h3 className="text-lg font-semibold text-white mb-6 font-cultural flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Pilih Aksara
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {practiceCharacters.map((char) => (
                        <motion.button
                          key={char}
                          onClick={() => {
                            setSelectedCharacter(char)
                            clearCanvas()
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={cn(
                            "aspect-square rounded-xl border-2 flex items-center justify-center text-2xl transition-all duration-300 font-cultural",
                            selectedCharacter === char
                              ? "border-white bg-white/20 text-white shadow-lg"
                              : "border-white/30 text-white/80 hover:border-white hover:bg-white/10"
                          )}
                        >
                          {char}
                        </motion.button>
                      ))}
                    </div>

                    {/* Progress */}
                    <div className="mt-8">
                      <h4 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Progress
                      </h4>
                      <div className="space-y-3">
                        {practiceCharacters.slice(0, 6).map((char) => {
                          const progress = JSON.parse(localStorage.getItem('aksara-progress') || '{}')
                          const charScore = progress[script?.id || 'default']?.[char] || 0
                          return (
                            <div key={char} className="flex items-center gap-3">
                              <span className="text-lg text-white font-cultural w-8">{char}</span>
                              <div className="flex-1 bg-white/20 rounded-full h-2">
                                <motion.div 
                                  className="bg-white h-2 rounded-full transition-all"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${charScore}%` }}
                                  transition={{ duration: 0.5 }}
                                />
                              </div>
                              <span className="text-xs text-white/70 w-10 text-right">{charScore}%</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>

              {/* Canvas Area */}
              <motion.div variants={fadeUp} className="lg:col-span-2">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <Card className="relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-white font-cultural flex items-center gap-2">
                        <PenTool className="w-5 h-5" />
                        Area Latihan
                      </h3>
                      <div className="flex items-center gap-3">
                        <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                          <span className="text-sm text-white/80">Target:</span>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center">
                          <span className="text-2xl text-white font-cultural">{selectedCharacter}</span>
                        </div>
                      </div>
                    </div>

                    {/* Canvas */}
                    <div className="relative bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl overflow-hidden shadow-2xl">
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
                        <span className="text-9xl text-white/5 font-cultural select-none">
                          {selectedCharacter}
                        </span>
                      </div>
                      
                      {/* Grid lines for guidance */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10"></div>
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10"></div>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                          <Palette className="w-4 h-4 text-white" />
                          <input
                            type="range"
                            min="2"
                            max="20"
                            value={brushSize}
                            onChange={(e) => setBrushSize(Number(e.target.value))}
                            className="w-20 accent-white"
                          />
                          <span className="text-sm text-white/80">{brushSize}px</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <motion.button
                          onClick={undoLastStroke}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 text-sm bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
                        >
                          Undo
                        </motion.button>
                        <motion.button
                          onClick={clearCanvas}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 text-sm bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
                        >
                          <RotateCcw className="w-4 h-4" />
                          Reset
                        </motion.button>
                        <motion.button
                          onClick={saveDrawing}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 text-sm bg-white text-[#592B18] rounded-lg hover:bg-white/90 transition-all duration-300 flex items-center gap-2 font-medium"
                        >
                          <Save className="w-4 h-4" />
                          Simpan
                        </motion.button>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>

              {/* Evaluation Panel */}
              <motion.div variants={fadeUp} className="lg:col-span-1">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <Card className="relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                    <h3 className="text-lg font-semibold text-white mb-6 font-cultural flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Evaluasi
                    </h3>

                    <motion.button
                      onClick={evaluateDrawing}
                      disabled={strokes.length === 0}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-white text-[#592B18] px-4 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Award className="w-4 h-4" />
                      Nilai Goresan
                    </motion.button>

                    {score !== null && (
                      <motion.div
                        variants={fadeUp}
                        initial="initial"
                        animate="animate"
                        className="mt-8 text-center"
                      >
                        <div className="relative mb-6">
                          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center mb-4 shadow-2xl">
                            <div className="text-2xl font-bold text-white">
                              {score}%
                            </div>
                          </div>
                          {score >= 80 && (
                            <div className="absolute -top-2 -right-2 text-2xl animate-bounce">🎉</div>
                          )}
                        </div>
                        
                        <div className="text-sm text-white/80 mb-6 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                          {feedback}
                        </div>
                        
                        {/* Score Bar */}
                        <div className="w-full bg-white/20 rounded-full h-3 mb-6">
                          <motion.div 
                            className="bg-white h-3 rounded-full shadow-lg"
                            initial={{ width: 0 }}
                            animate={{ width: `${score}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Tips */}
                    <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                      <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Tips Latihan:
                      </h4>
                      <ul className="text-xs text-white/80 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-white/60">•</span>
                          <span>Ikuti urutan goresan yang benar</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-white/60">•</span>
                          <span>Perhatikan proporsi dan bentuk</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-white/60">•</span>
                          <span>Gunakan gerakan yang halus</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-white/60">•</span>
                          <span>Latihan rutin untuk hasil terbaik</span>
                        </li>
                      </ul>
                    </div>
                  </Card>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}
