import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Filter, MapPin, Calendar, BookOpen } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { Heading } from '../components/ui/Heading'
import { Card } from '../components/ui/Card'
import { IconBadge } from '../components/ui/IconBadge'
import { PitaAksen } from '../components/ui/PitaAksen'
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
    <div className="min-h-screen bg-gabus-pualam">
      {/* Header Section */}
      <Section className="bg-gradient-to-br from-indigo-lurik via-sogan-batik to-jade-tenun">
        <Container>
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="text-center py-16"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <PitaAksen length="long" className="mx-auto mb-8" />
            </motion.div>
            
            <Heading level={1} className="text-gabus-pualam mb-6" cultural>
              Jelajahi Aksara Nusantara
            </Heading>
            
            <motion.p 
              variants={fadeUp}
              className="text-xl text-gabus-pualam/90 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Temukan keragaman sistem tulisan tradisional Indonesia dari berbagai periode dan wilayah
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      {/* Search and Filter Section */}
      <Section className="py-8 border-b border-jade-tenun/20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sogan-batik w-5 h-5" />
              <input
                type="text"
                placeholder="Cari aksara, wilayah, atau deskripsi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-jade-tenun/30 rounded-lg focus:ring-2 focus:ring-giring-emas focus:border-giring-emas bg-gabus-pualam text-indigo-lurik"
              />
            </div>

            {/* Region Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sogan-batik w-5 h-5" />
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full pl-10 pr-8 py-3 border border-jade-tenun/30 rounded-lg focus:ring-2 focus:ring-giring-emas focus:border-giring-emas bg-gabus-pualam text-indigo-lurik appearance-none"
              >
                <option value="all">Semua Wilayah</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            {/* Period Filter */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sogan-batik w-5 h-5" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full pl-10 pr-8 py-3 border border-jade-tenun/30 rounded-lg focus:ring-2 focus:ring-giring-emas focus:border-giring-emas bg-gabus-pualam text-indigo-lurik appearance-none"
              >
                <option value="all">Semua Periode</option>
                {periods.map(period => (
                  <option key={period} value={period}>{period}</option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sogan-batik w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-8 py-3 border border-jade-tenun/30 rounded-lg focus:ring-2 focus:ring-giring-emas focus:border-giring-emas bg-gabus-pualam text-indigo-lurik appearance-none"
              >
                <option value="all">Semua Kategori</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'brahmi' ? 'Brahmi' : 
                     category === 'arabic' ? 'Arab' : 
                     category === 'indigenous' ? 'Asli' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-center">
            <p className="text-sogan-batik">
              Menampilkan {filteredScripts.length} dari {aksaraScripts.length} aksara
            </p>
          </div>
        </Container>
      </Section>

      {/* Scripts Grid */}
      <Section>
        <Container>
          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredScripts.map((script) => (
              <motion.div key={script.id} variants={fadeUp}>
                <Link to={`/learn/${script.id}`}>
                  <Card 
                    ornamental 
                    hover 
                    className="group h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    {/* Header with Glyph */}
                    <div className="text-center mb-6">
                      <motion.div
                        className="text-6xl mb-4 text-indigo-lurik group-hover:text-giring-emas transition-colors duration-300"
                        whileHover={{ 
                          scale: 1.1,
                          rotate: [0, -5, 5, 0],
                          transition: { duration: 0.3 }
                        }}
                      >
                        {script.glyph}
                      </motion.div>
                      
                      <h3 className="text-xl font-semibold text-indigo-lurik mb-2 font-cultural">
                        {script.name}
                      </h3>
                      
                      <div className="flex items-center justify-center gap-2 text-sm text-sogan-batik mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>{script.region}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <p className="text-sm text-jade-tenun leading-relaxed">
                        {script.description}
                      </p>

                      {/* Metadata */}
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="font-medium text-indigo-lurik">Periode:</span>
                          <p className="text-sogan-batik">{script.period}</p>
                        </div>
                        <div>
                          <span className="font-medium text-indigo-lurik">Sistem:</span>
                          <p className="text-sogan-batik">{script.writingSystem}</p>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="flex items-center justify-between">
                        <span className={cn(
                          "inline-block px-3 py-1 rounded-full text-xs font-medium",
                          script.status === 'active' ? 'bg-jade-tenun text-gabus-pualam' :
                          script.status === 'revitalized' ? 'bg-giring-emas text-indigo-lurik' :
                          'bg-sogan-batik text-gabus-pualam'
                        )}>
                          {script.status === 'active' ? 'Aktif' :
                           script.status === 'revitalized' ? 'Dihidupkan Kembali' : 'Terancam'}
                        </span>

                        <IconBadge size="sm" variant="accent">
                          <BookOpen size={12} />
                        </IconBadge>
                      </div>
                    </div>
                  </Card>
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
              <div className="text-6xl mb-4 text-sogan-batik/30">🔍</div>
              <h3 className="text-xl font-semibold text-indigo-lurik mb-2">
                Tidak ada aksara yang ditemukan
              </h3>
              <p className="text-sogan-batik">
                Coba ubah kata kunci pencarian atau filter yang dipilih
              </p>
            </motion.div>
          )}
        </Container>
      </Section>
    </div>
  )
}
