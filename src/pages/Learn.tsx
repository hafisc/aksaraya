import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Filter, MapPin, Calendar, BookOpen, Sparkles } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { Card } from '../components/ui/Card'
import { aksaraScripts } from '../data/aksara'
import { fadeUp, stagger } from '../lib/motion'
import { cn } from '../lib/utils'

export function Learn() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [selectedPeriod, setSelectedPeriod] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const regions = useMemo(() => {
    const uniqueRegions = [...new Set(aksaraScripts.map(script => script.region))]
    return uniqueRegions.sort()
  }, [])

  const periods = useMemo(() => {
    const uniquePeriods = [...new Set(aksaraScripts.map(script => script.period))]
    return uniquePeriods.sort()
  }, [])

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(aksaraScripts.map(script => script.category))]
    return uniqueCategories.sort()
  }, [])

  const filteredScripts = useMemo(() => {
    return aksaraScripts.filter(script => {
      const matchesSearch = script.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           script.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           script.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesRegion = selectedRegion === 'all' || script.region === selectedRegion
      const matchesPeriod = selectedPeriod === 'all' || script.period === selectedPeriod
      const matchesCategory = selectedCategory === 'all' || script.category === selectedCategory

      return matchesSearch && matchesRegion && matchesPeriod && matchesCategory
    })
  }, [searchTerm, selectedRegion, selectedPeriod, selectedCategory])

  return (
    <div className="min-h-screen bg-[#592B18]">
      {/* Header */}
      <Section className="bg-[#592B18] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-16 left-20 text-8xl text-white rotate-12">📚</div>
          <div className="absolute top-32 right-16 text-6xl text-white -rotate-12">ꦲ</div>
          <div className="absolute bottom-20 left-1/4 text-7xl text-white rotate-45">✨</div>
          <div className="absolute bottom-16 right-20 text-5xl text-white -rotate-30">🎓</div>
        </div>
        
        <Container className="relative z-10">
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="py-8"
          >
            <motion.div variants={fadeUp} className="text-center">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <BookOpen className="w-6 h-6 text-white" />
                <span className="text-white font-medium">Eksplorasi Aksara</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-cultural">
                Belajar Aksara Nusantara
              </h1>
              <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
                Jelajahi kekayaan aksara tradisional Indonesia dari berbagai daerah dan periode sejarah
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Search and Filter Section */}
      <Section className="bg-[#592B18] py-8">
        <Container>
          <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}>
            <motion.div variants={fadeUp} className="mb-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* Search */}
                  <div className="lg:col-span-2 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Cari aksara, wilayah, atau deskripsi..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/30 focus:border-white/40 text-white placeholder-white backdrop-blur-sm"
                    />
                  </div>

                  {/* Region Filter */}
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="w-full pl-12 pr-8 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/30 focus:border-white/40 text-white appearance-none backdrop-blur-sm"
                    >
                      <option value="all" className="bg-[#592B18] text-white">Semua Wilayah</option>
                      {regions.map(region => (
                        <option key={region} value={region} className="bg-[#592B18] text-white">{region}</option>
                      ))}
                    </select>
                  </div>

                  {/* Period Filter */}
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                    <select
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      className="w-full pl-12 pr-8 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/30 focus:border-white/40 text-white appearance-none backdrop-blur-sm"
                    >
                      <option value="all" className="bg-[#592B18] text-white">Semua Periode</option>
                      {periods.map(period => (
                        <option key={period} value={period} className="bg-[#592B18] text-white">{period}</option>
                      ))}
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div className="relative">
                    <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full pl-12 pr-8 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/30 focus:border-white/40 text-white appearance-none backdrop-blur-sm"
                    >
                      <option value="all" className="bg-[#592B18] text-white">Semua Kategori</option>
                      {categories.map(category => (
                        <option key={category} value={category} className="bg-[#592B18] text-white">
                          {category === 'brahmi' ? 'Brahmi' : 
                           category === 'arabic' ? 'Arab' : 
                           category === 'indigenous' ? 'Asli' : category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results Count */}
            <motion.div variants={fadeUp} className="text-center mb-8">
              <div className="inline-flex items-center gap-3 text-white">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-white/30"></div>
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Menampilkan {filteredScripts.length} dari {aksaraScripts.length} aksara
                </span>
                <Sparkles className="w-4 h-4" />
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-white/30"></div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Scripts Grid */}
      <Section className="bg-[#592B18]">
        <Container>
          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredScripts.map((script) => (
              <motion.div 
                key={script.id} 
                variants={fadeUp}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Link to={`/learn/${script.id}`}>
                  <div className="relative group">
                    {/* Glowing background effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                    
                    <Card className="relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden h-full">
                      {/* Decorative corner elements */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full"></div>
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-tr-full"></div>
                      
                      <div className="relative p-6">
                        {/* Header with Glyph */}
                        <div className="text-center mb-6">
                          <motion.div
                            className="relative mb-4"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center mb-4 shadow-2xl">
                              <span className="text-4xl text-white font-cultural">
                                {script.glyph}
                              </span>
                            </div>
                            {/* Floating particles effect */}
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
                            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white/20 rounded-full animate-pulse delay-300"></div>
                          </motion.div>
                          
                          <h3 className="text-xl font-bold text-white mb-3 font-cultural">
                            {script.name}
                          </h3>
                          
                          <div className="flex items-center justify-center gap-2 text-sm text-white mb-4">
                            <MapPin className="w-4 h-4" />
                            <span>{script.region}</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-4">
                          <p className="text-sm text-white leading-relaxed">
                            {script.description}
                          </p>

                          {/* Metadata */}
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                              <span className="font-medium text-white block mb-1">Periode:</span>
                              <p className="text-white">{script.period}</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                              <span className="font-medium text-white block mb-1">Sistem:</span>
                              <p className="text-white">{script.writingSystem}</p>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <span className={cn(
                              "inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold border transition-all duration-300",
                              script.status === 'active' 
                                ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                              script.status === 'revitalized' 
                                ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                                'bg-orange-500/20 text-orange-300 border-orange-500/30'
                            )}>
                              <div className={cn(
                                "w-2 h-2 rounded-full",
                                script.status === 'active' ? 'bg-green-400' :
                                script.status === 'revitalized' ? 'bg-blue-400' : 'bg-orange-400'
                              )}></div>
                              {script.status === 'active' ? 'Aktif' :
                               script.status === 'revitalized' ? 'Dihidupkan Kembali' : 'Terancam'}
                            </span>

                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                              <BookOpen className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredScripts.length === 0 && (
            <motion.div 
              variants={fadeUp}
              initial="initial"
              animate="animate"
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
                <div className="text-4xl text-white/50">🔍</div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Tidak ada aksara yang ditemukan
              </h3>
              <p className="text-white max-w-md mx-auto">
                Coba ubah kata kunci pencarian atau filter yang dipilih untuk menemukan aksara yang Anda cari
              </p>
            </motion.div>
          )}
        </Container>
      </Section>
    </div>
  )
}
