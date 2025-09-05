import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, BookOpen, Users, Clock, MapPin, Volume2, Eye, EyeOff } from 'lucide-react'
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
  
  const audioRef = useRef<HTMLAudioElement>(null)

  const filteredStories = stories.filter(story => {
    const categoryMatch = !activeCategory || story.category === activeCategory
    const difficultyMatch = !activeDifficulty || story.difficulty === activeDifficulty
    return categoryMatch && difficultyMatch
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
    <Section className="min-h-screen">
      <Container>
        <div className="text-center mb-8">
          <Heading level={1} cultural className="mb-4">
            Cerita & Folklor Nusantara
          </Heading>
          <p className="text-sogan-batik text-lg max-w-3xl mx-auto">
            Jelajahi kekayaan cerita tradisional Nusantara dalam aksara aslinya. 
            Setiap cerita menyimpan nilai-nilai luhur dan kebijaksanaan leluhur.
          </p>
        </div>

        {!selectedStory ? (
          <>
            {/* Filters */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant={activeCategory === null ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setActiveCategory(null)}
                >
                  Semua Kategori
                </Button>
                {storyCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant={activeDifficulty === null ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setActiveDifficulty(null)}
                >
                  Semua Level
                </Button>
                {difficultyLevels.map((level) => (
                  <Button
                    key={level.id}
                    variant={activeDifficulty === level.id ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => setActiveDifficulty(level.id)}
                  >
                    {level.name}
                  </Button>
                ))}
              </div>

              {(activeCategory || activeDifficulty) && (
                <div className="text-center">
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset Filter
                  </Button>
                </div>
              )}
            </div>

            {/* Stories Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredStories.map((story, index) => {
                  const aksaraData = aksaraScripts.find(a => a.id === story.aksara)
                  return (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card 
                        className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        onClick={() => setSelectedStory(story)}
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-indigo-lurik mb-1">
                                {story.title}
                              </h3>
                              <p className="text-sogan-batik text-sm mb-2 font-medium">
                                {story.titleOriginal}
                              </p>
                            </div>
                            <BookOpen className="w-6 h-6 text-jade-tenun" />
                          </div>

                          <p className="text-sm text-sogan-batik mb-4 line-clamp-3">
                            {story.summary}
                          </p>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-sogan-batik">
                              <MapPin className="w-3 h-3" />
                              <span>{story.region}</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="px-2 py-1 bg-giring-emas/20 text-sogan-batik text-xs rounded-full">
                                {aksaraData?.name || story.aksara}
                              </span>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                story.difficulty === 'beginner' ? 'bg-jade-tenun/20 text-jade-tenun' :
                                story.difficulty === 'intermediate' ? 'bg-giring-emas/20 text-sogan-batik' :
                                'bg-indigo-lurik/20 text-indigo-lurik'
                              }`}>
                                {difficultyLevels.find(d => d.id === story.difficulty)?.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </>
        ) : (
          /* Story Reader */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
          >
            {/* Story Header */}
            <div className="mb-8">
              <Button
                variant="ghost"
                onClick={() => setSelectedStory(null)}
                className="mb-4"
              >
                ← Kembali ke Daftar Cerita
              </Button>
              
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-indigo-lurik mb-2">
                  {selectedStory.title}
                </h1>
                <p className="text-xl text-sogan-batik mb-4 font-medium">
                  {selectedStory.titleOriginal}
                </p>
                
                <div className="flex items-center justify-center gap-4 text-sm text-sogan-batik">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedStory.region}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{difficultyLevels.find(d => d.id === selectedStory.difficulty)?.name}</span>
                  </div>
                </div>
              </div>

              {/* Audio Controls */}
              {selectedStory.audioUrl && (
                <div className="flex justify-center mb-6">
                  <div className="flex items-center gap-4 bg-gabus-pualam p-4 rounded-lg">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handlePlayPause}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Volume2 className="w-4 h-4 text-sogan-batik" />
                    <span className="text-sm text-sogan-batik">Narasi Audio</span>
                    <audio ref={audioRef} src={selectedStory.audioUrl} />
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Tabs */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-gabus-pualam rounded-lg p-1">
                <Button
                  variant={currentSection === 'story' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentSection('story')}
                >
                  Cerita
                </Button>
                <Button
                  variant={currentSection === 'characters' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentSection('characters')}
                >
                  Tokoh
                </Button>
                <Button
                  variant={currentSection === 'cultural' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentSection('cultural')}
                >
                  Budaya
                </Button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {currentSection === 'story' && (
                <motion.div
                  key="story"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  {/* Text Display Controls */}
                  <div className="flex justify-center gap-2 mb-6">
                    <Button
                      variant={showOriginal ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => setShowOriginal(!showOriginal)}
                    >
                      {showOriginal ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
                      Aksara Asli
                    </Button>
                    <Button
                      variant={showTransliteration ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => setShowTransliteration(!showTransliteration)}
                    >
                      {showTransliteration ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
                      Transliterasi
                    </Button>
                  </div>

                  {/* Story Text */}
                  <div className="space-y-6">
                    {showOriginal && (
                      <Card className="p-6 bg-gradient-to-br from-gabus-pualam to-white">
                        <h3 className="text-lg font-semibold text-indigo-lurik mb-4">
                          Teks Aksara Asli
                        </h3>
                        <p className="text-2xl leading-relaxed text-sogan-batik font-serif">
                          {selectedStory.originalText}
                        </p>
                      </Card>
                    )}

                    {showTransliteration && (
                      <Card className="p-6">
                        <h3 className="text-lg font-semibold text-indigo-lurik mb-4">
                          Transliterasi
                        </h3>
                        <p className="text-lg leading-relaxed text-sogan-batik italic">
                          {selectedStory.transliteration}
                        </p>
                      </Card>
                    )}

                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-indigo-lurik mb-4">
                        Terjemahan
                      </h3>
                      <p className="text-lg leading-relaxed text-sogan-batik">
                        {selectedStory.translation}
                      </p>
                    </Card>

                    <Card className="p-6 bg-gradient-to-r from-jade-tenun/10 to-giring-emas/10">
                      <h3 className="text-lg font-semibold text-indigo-lurik mb-4">
                        Pesan Moral
                      </h3>
                      <p className="text-sogan-batik leading-relaxed">
                        {selectedStory.moralLesson}
                      </p>
                    </Card>
                  </div>
                </motion.div>
              )}

              {currentSection === 'characters' && (
                <motion.div
                  key="characters"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    {selectedStory.characters.map((character, index) => (
                      <motion.div
                        key={character.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="p-6">
                          <div className="flex items-start gap-3 mb-4">
                            <Users className="w-6 h-6 text-jade-tenun mt-1" />
                            <div>
                              <h3 className="text-lg font-bold text-indigo-lurik">
                                {character.name}
                              </h3>
                              <p className="text-sogan-batik font-medium">
                                {character.nameOriginal}
                              </p>
                              <span className="inline-block px-2 py-1 bg-giring-emas/20 text-sogan-batik text-sm rounded-full mt-2">
                                {character.role}
                              </span>
                            </div>
                          </div>
                          <p className="text-sogan-batik leading-relaxed">
                            {character.description}
                          </p>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentSection === 'cultural' && (
                <motion.div
                  key="cultural"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card className="p-8 bg-gradient-to-br from-indigo-lurik/5 to-jade-tenun/5">
                    <h3 className="text-2xl font-bold text-indigo-lurik mb-6 text-center">
                      Konteks Budaya
                    </h3>
                    <p className="text-lg leading-relaxed text-sogan-batik mb-6">
                      {selectedStory.culturalContext}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white/50 p-4 rounded-lg">
                        <h4 className="font-semibold text-indigo-lurik mb-2">Kategori</h4>
                        <p className="text-sogan-batik">
                          {storyCategories.find(c => c.id === selectedStory.category)?.name}
                        </p>
                      </div>
                      
                      <div className="bg-white/50 p-4 rounded-lg">
                        <h4 className="font-semibold text-indigo-lurik mb-2">Aksara</h4>
                        <p className="text-sogan-batik">
                          {aksaraScripts.find(a => a.id === selectedStory.aksara)?.name || selectedStory.aksara}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </Container>
    </Section>
  )
}
