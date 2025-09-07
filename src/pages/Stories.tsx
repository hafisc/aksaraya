import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, BookOpen, Users, Clock, MapPin, Volume2, Eye, EyeOff, Sparkles, ArrowLeft, Heart, Share2, Bookmark, Globe } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { Heading } from '../components/ui/Heading'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { stories, storyCategories, difficultyLevels, type Story } from '../data/stories'
import { aksaraScripts } from '../data/aksara'

export function Stories() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeDifficulty, setActiveDifficulty] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showOriginal, setShowOriginal] = useState(true)
  const [showTransliteration, setShowTransliteration] = useState(false)
  const [currentSection, setCurrentSection] = useState<'story' | 'characters' | 'cultural'>('story')
  const [searchQuery, setSearchQuery] = useState('')
  const [favoriteStories, setFavoriteStories] = useState<string[]>([])
  
  const audioRef = useRef<HTMLAudioElement>(null)

  const filteredStories = stories.filter(story => {
    const categoryMatch = !activeCategory || story.category === activeCategory
    const difficultyMatch = !activeDifficulty || story.difficulty === activeDifficulty
    const searchMatch = !searchQuery || 
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.summary.toLowerCase().includes(searchQuery.toLowerCase())
    return categoryMatch && difficultyMatch && searchMatch
  })

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const resetFilters = () => {
    setActiveCategory(null)
    setActiveDifficulty(null)
    setSearchQuery('')
  }

  const toggleFavorite = (storyId: string) => {
    setFavoriteStories(prev => 
      prev.includes(storyId) 
        ? prev.filter(id => id !== storyId)
        : [...prev, storyId]
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'folklore': return '📚'
      case 'legend': return '🏔️'
      case 'myth': return '⚡'
      case 'historical': return '🏛️'
      default: return '📖'
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', () => setIsPlaying(false))
      return () => {
        audioRef.current?.removeEventListener('ended', () => setIsPlaying(false))
      }
    }
  }, [selectedStory])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#592B18] via-[#6B3423] to-[#4A2317]">
      {!selectedStory ? (
        <>
          <Section className="bg-gradient-to-br from-[#592B18] via-[#6B3423] to-[#4A2317] relative overflow-hidden pt-24 pb-12">
            {/* Enhanced background decorative elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 left-16 text-8xl text-white rotate-12 animate-pulse">📚</div>
              <div className="absolute top-32 right-20 text-6xl text-white -rotate-12 animate-bounce">ꦲ</div>
              <div className="absolute bottom-20 left-1/4 text-7xl text-white rotate-45 animate-pulse">ᮃ</div>
              <div className="absolute bottom-16 right-16 text-5xl text-white -rotate-30 animate-bounce">ᬅ</div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl text-white/5 rotate-12">✨</div>
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
                  className="text-center mb-16"
                >
                  
                  <Heading level={1} cultural className="text-white mb-8 text-5xl lg:text-6xl font-bold">
                    Cerita & Folklor Nusantara
                  </Heading>
                  <p className="text-xl text-white max-w-4xl mx-auto leading-relaxed mb-8">
                    Jelajahi kekayaan cerita tradisional Nusantara dalam aksara aslinya dengan pengalaman membaca yang interaktif dan mendalam
                  </p>
                  
                  {/* Search Bar */}
                  <div className="max-w-2xl mx-auto mb-8">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Cari cerita berdasarkan judul, daerah, atau ringkasan..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-6 py-4 pl-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                      />
                      <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white" />
                    </div>
                  </div>
                </motion.div>

                
              </motion.div>
            </Container>
          </Section>

          <Section className="bg-[#592B18]">
            <Container>
              {(activeCategory || activeDifficulty) && (
                <div className="text-center mb-8">
                  <Button
                    onClick={resetFilters}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-white hover:bg-white/20 rounded-xl px-4 py-2 transition-all duration-200"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset Filter
                  </Button>
                </div>
              )}

              {/* Story Grid */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredStories.map((story, index) => {
                  const category = storyCategories.find(c => c.id === story.category)
                  const difficulty = difficultyLevels.find(d => d.id === story.difficulty)
                  const script = aksaraScripts.find(s => s.id === story.aksara)
                  
                  return (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="cursor-pointer"
                      onClick={() => setSelectedStory(story)}
                    >
                      <div className="relative group">
                        {/* Glowing background effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                        
                        <Card className="relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden h-full">
                          {/* Decorative corner gradient */}
                          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full"></div>
                          
                          <div className="relative p-6 h-full flex flex-col">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-2">{story.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-white mb-2">
                                  <MapPin className="w-4 h-4" />
                                  <span>{story.region}</span>
                                </div>
                              </div>
                              <motion.div 
                                className="text-4xl ml-4 bg-white/10 rounded-full w-16 h-16 flex items-center justify-center"
                                whileHover={{ rotate: 10, scale: 1.1 }}
                              >
                                {script?.glyph}
                              </motion.div>
                            </div>
                            
                            <p className="text-white text-sm mb-4 line-clamp-3 flex-grow">
                              {story.summary}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {category && (
                                <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-full font-medium flex items-center gap-1">
                                  <span>{getCategoryIcon(story.category)}</span>
                                  {category.name}
                                </span>
                              )}
                              {difficulty && (
                                <span className={`px-3 py-1 text-xs rounded-full font-medium ${getDifficultyColor(story.difficulty)}`}>
                                  {difficulty.name}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center justify-between text-xs text-white">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>5-10 menit</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  <span>{story.characters.length} karakter</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <motion.button
                                  whileHover={{ scale: 1.2 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleFavorite(story.id)
                                  }}
                                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                                >
                                  <Heart className={`w-4 h-4 ${favoriteStories.includes(story.id) ? 'text-red-400 fill-current' : 'text-white'}`} />
                                </motion.button>
                                <motion.div
                                  whileHover={{ scale: 1.2 }}
                                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center"
                                >
                                  <BookOpen className="w-4 h-4 text-white" />
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>

              {filteredStories.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-12 h-12 text-white/50" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Tidak ada cerita ditemukan</h3>
                  <p className="text-white mb-6">Coba ubah filter atau reset pencarian untuk menemukan cerita lainnya</p>
                  <Button
                    onClick={resetFilters}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-white hover:bg-white/20 rounded-xl px-4 py-2 transition-all duration-200"
                  >
                    Reset Filter
                  </Button>
                </motion.div>
              )}
              
              {/* Bottom decorative element */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center mt-16"
              >
                <div className="inline-flex items-center gap-3 text-white">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/30"></div>
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-medium">Warisan Sastra Nusantara</span>
                  <Sparkles className="w-5 h-5" />
                  <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/30"></div>
                </div>
              </motion.div>
            </Container>
          </Section>
        </>
      ) : (
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gradient-to-br from-[#592B18] via-[#6B3423] to-[#4A2317]"
          >
            <Section className="pt-24 pb-12">
              <Container>
                <div className="max-w-6xl mx-auto">
                  {/* Header with Back Button */}
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                  >
                    <Button
                      onClick={() => setSelectedStory(null)}
                      variant="ghost"
                      className="mb-6 px-6 py-3 bg-white/10 text-white rounded-2xl font-medium hover:bg-white/20 transition-all duration-300 flex items-center gap-3 backdrop-blur-md"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Kembali ke Daftar Cerita
                    </Button>
                    
                    {/* Story Header */}
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-6">
                        <BookOpen className="w-6 h-6 text-white" />
                        <span className="text-white font-medium">{getCategoryIcon(selectedStory.category)} {storyCategories.find(c => c.id === selectedStory.category)?.name}</span>
                      </div>
                      
                      <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 cultural">
                        {selectedStory.title}
                      </h1>
                      <div className="text-2xl lg:text-3xl text-white mb-6 font-cultural">
                        {selectedStory.titleOriginal}
                      </div>
                      
                      <div className="flex flex-wrap items-center justify-center gap-6 text-white">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5" />
                          <span className="font-medium">{selectedStory.region}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5" />
                          <span>5-10 menit</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          <span>{selectedStory.characters.length} karakter</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Audio Controls */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                  >
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Button
                            onClick={handlePlayPause}
                            className="w-14 h-14 bg-white text-[#592B18] rounded-full hover:bg-white/90 transition-all duration-300 flex items-center justify-center"
                          >
                            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                          </Button>
                          <div>
                            <h3 className="text-white font-semibold">Audio Narasi</h3>
                            <p className="text-white text-sm">Dengarkan cerita dalam bahasa asli</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Volume2 className="w-5 h-5 text-white" />
                          <div className="w-24 h-2 bg-white/20 rounded-full">
                            <div className="w-3/4 h-full bg-white rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <audio ref={audioRef} className="hidden">
                        <source src={selectedStory.audioUrl || "/audio/sample.mp3"} type="audio/mpeg" />
                      </audio>
                    </div>
                  </motion.div>

                  {/* Content Navigation */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                  >
                    <div className="flex flex-wrap gap-3 justify-center">
                      {[
                        { id: 'story', label: 'Cerita', icon: BookOpen },
                        { id: 'characters', label: 'Karakter', icon: Users },
                        { id: 'cultural', label: 'Budaya', icon: Globe }
                      ].map(({ id, label, icon: Icon }) => (
                        <Button
                          key={id}
                          onClick={() => setCurrentSection(id as 'story' | 'characters' | 'cultural')}
                          variant={currentSection === id ? 'primary' : 'ghost'}
                          className={`${
                            currentSection === id
                              ? 'bg-white text-[#592B18] hover:bg-white/90'
                              : 'text-white hover:text-white hover:bg-white/20 border-white/30'
                          } transition-all duration-300 rounded-xl px-6 py-3 flex items-center gap-2`}
                        >
                          <Icon className="w-4 h-4" />
                          {label}
                        </Button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Text Display Options */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8"
                  >
                    <div className="flex flex-wrap gap-3 justify-center">
                      <Button
                        onClick={() => setShowOriginal(!showOriginal)}
                        variant={showOriginal ? 'primary' : 'ghost'}
                        className={`${
                          showOriginal
                            ? 'bg-white text-[#592B18] hover:bg-white/90'
                            : 'text-white hover:text-white hover:bg-white/20 border-white/30'
                        } transition-all duration-300 rounded-xl px-4 py-2 flex items-center gap-2`}
                      >
                        <Eye className="w-4 h-4" />
                        Aksara Asli
                      </Button>
                      <Button
                        onClick={() => setShowTransliteration(!showTransliteration)}
                        variant={showTransliteration ? 'primary' : 'ghost'}
                        className={`${
                          showTransliteration
                            ? 'bg-white text-[#592B18] hover:bg-white/90'
                            : 'text-white hover:text-white hover:bg-white/20 border-white/30'
                        } transition-all duration-300 rounded-xl px-4 py-2 flex items-center gap-2`}
                      >
                        <EyeOff className="w-4 h-4" />
                        Transliterasi
                      </Button>
                    </div>
                  </motion.div>

                  {/* Main Content */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                  >
                    {/* Story Content */}
                    <div className="lg:col-span-2">
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8">
                        {currentSection === 'story' && (
                          <div className="space-y-6">
                            <div className="flex items-center justify-between mb-6">
                              <h2 className="text-2xl font-bold text-white">Cerita</h2>
                              <div className="flex items-center gap-2">
                                <Button
                                  onClick={() => toggleFavorite(selectedStory.id)}
                                  variant="ghost"
                                  size="sm"
                                  className="text-white hover:text-white hover:bg-white/20 rounded-xl p-2"
                                >
                                  <Heart className={`w-5 h-5 ${favoriteStories.includes(selectedStory.id) ? 'text-red-400 fill-current' : 'text-white'}`} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-white hover:text-white hover:bg-white/20 rounded-xl p-2"
                                >
                                  <Share2 className="w-5 h-5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-white hover:text-white hover:bg-white/20 rounded-xl p-2"
                                >
                                  <Bookmark className="w-5 h-5" />
                                </Button>
                              </div>
                            </div>
                            
                            {showOriginal && (
                              <div className="mb-6 p-6 bg-white/5 rounded-2xl">
                                <h3 className="text-lg font-semibold text-white mb-4">Aksara Asli</h3>
                                <p className="text-2xl leading-relaxed text-white font-cultural">
                                  {selectedStory.originalText}
                                </p>
                              </div>
                            )}
                            
                            {showTransliteration && (
                              <div className="mb-6 p-6 bg-white/5 rounded-2xl">
                                <h3 className="text-lg font-semibold text-white mb-4">Transliterasi</h3>
                                <p className="text-lg leading-relaxed text-white italic">
                                  {selectedStory.transliteration}
                                </p>
                              </div>
                            )}
                            
                            <div className="p-6 bg-white/5 rounded-2xl">
                              <h3 className="text-lg font-semibold text-white mb-4">Terjemahan</h3>
                              <p className="text-lg leading-relaxed text-white">
                                {selectedStory.translation}
                              </p>
                            </div>
                            
                            <div className="p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl border border-yellow-500/20">
                              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-yellow-400" />
                                Pesan Moral
                              </h3>
                              <p className="text-white leading-relaxed">
                                {selectedStory.moralLesson}
                              </p>
                            </div>
                          </div>
                        )}
                        
                        {currentSection === 'characters' && (
                          <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white mb-6">Karakter dalam Cerita</h2>
                            <div className="grid gap-4">
                              {selectedStory.characters.map((character, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="p-6 bg-white/5 rounded-2xl border border-white/10"
                                >
                                  <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                                      <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                      <h3 className="text-lg font-semibold text-white mb-1">{character.name}</h3>
                                      <div className="text-white mb-2 font-cultural">{character.nameOriginal}</div>
                                      <div className="text-sm text-white mb-2">{character.role}</div>
                                      <p className="text-white leading-relaxed">{character.description}</p>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {currentSection === 'cultural' && (
                          <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white mb-6">Konteks Budaya</h2>
                            <div className="p-6 bg-white/5 rounded-2xl">
                              <p className="text-lg leading-relaxed text-white mb-6">
                                {selectedStory.culturalContext}
                              </p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 rounded-xl">
                                  <h4 className="font-semibold text-white mb-2">Asal Daerah</h4>
                                  <p className="text-white">{selectedStory.region}</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl">
                                  <h4 className="font-semibold text-white mb-2">Jenis Aksara</h4>
                                  <p className="text-white capitalize">{selectedStory.aksara}</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl">
                                  <h4 className="font-semibold text-white mb-2">Kategori</h4>
                                  <p className="text-white">{storyCategories.find(c => c.id === selectedStory.category)?.name}</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl">
                                  <h4 className="font-semibold text-white mb-2">Tingkat Kesulitan</h4>
                                  <p className="text-white">{difficultyLevels.find(d => d.id === selectedStory.difficulty)?.name}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                      {/* Story Summary */}
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Ringkasan</h3>
                        <p className="text-white leading-relaxed text-sm">
                          {selectedStory.summary}
                        </p>
                      </div>
                      
                      {/* Related Stories */}
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Cerita Serupa</h3>
                        <div className="space-y-3">
                          {stories
                            .filter(s => s.id !== selectedStory.id && s.category === selectedStory.category)
                            .slice(0, 3)
                            .map((story) => (
                              <motion.div
                                key={story.id}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setSelectedStory(story)}
                                className="p-3 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-all duration-200"
                              >
                                <h4 className="text-white font-medium text-sm mb-1">{story.title}</h4>
                                <p className="text-white text-xs">{story.region}</p>
                              </motion.div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </Container>
            </Section>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
