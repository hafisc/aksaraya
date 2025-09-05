import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Play, PenTool, BookOpen, MapPin, Calendar, Users } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { Heading } from '../components/ui/Heading'
import { Card } from '../components/ui/Card'
import { PitaAksen } from '../components/ui/PitaAksen'
import { aksaraScripts } from '../data/aksara'
import { fadeUp, stagger } from '../lib/motion'
import { cn } from '../lib/utils'

export function ScriptDetail() {
  const { scriptId } = useParams<{ scriptId: string }>()
  const [activeTab, setActiveTab] = useState<'overview' | 'characters' | 'examples' | 'stories'>('overview')
  
  const script = aksaraScripts.find(s => s.id === scriptId)

  if (!script) {
    return (
      <Section>
        <Container>
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-indigo-lurik mb-4">Aksara tidak ditemukan</h1>
            <Link to="/learn" className="text-giring-emas hover:underline">
              Kembali ke daftar aksara
            </Link>
          </div>
        </Container>
      </Section>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Ringkasan', icon: BookOpen },
    { id: 'characters', label: 'Huruf Dasar', icon: Users },
    { id: 'examples', label: 'Contoh Kata', icon: PenTool },
    { id: 'stories', label: 'Cerita & Artefak', icon: MapPin }
  ] as const

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
            {/* Back Button */}
            <motion.div variants={fadeUp} className="mb-8">
              <Link 
                to="/learn"
                className="inline-flex items-center gap-2 text-gabus-pualam hover:text-giring-emas transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Kembali ke Daftar Aksara
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Main Info */}
              <div className="lg:col-span-2">
                <motion.div variants={fadeUp} className="mb-6">
                  <PitaAksen length="medium" className="mb-6" />
                </motion.div>
                
                <Heading level={1} className="text-gabus-pualam mb-4" cultural>
                  {script.name}
                </Heading>
                
                <motion.p 
                  variants={fadeUp}
                  className="text-xl text-gabus-pualam/90 mb-6 leading-relaxed"
                >
                  {script.description}
                </motion.p>

                {/* Metadata Grid */}
                <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="bg-gabus-pualam/10 rounded-lg p-3">
                    <MapPin className="w-4 h-4 text-giring-emas mb-2" />
                    <p className="text-gabus-pualam/70">Wilayah</p>
                    <p className="text-gabus-pualam font-medium">{script.region}</p>
                  </div>
                  <div className="bg-gabus-pualam/10 rounded-lg p-3">
                    <Calendar className="w-4 h-4 text-giring-emas mb-2" />
                    <p className="text-gabus-pualam/70">Periode</p>
                    <p className="text-gabus-pualam font-medium">{script.period}</p>
                  </div>
                  <div className="bg-gabus-pualam/10 rounded-lg p-3">
                    <BookOpen className="w-4 h-4 text-giring-emas mb-2" />
                    <p className="text-gabus-pualam/70">Sistem</p>
                    <p className="text-gabus-pualam font-medium">{script.writingSystem}</p>
                  </div>
                  <div className="bg-gabus-pualam/10 rounded-lg p-3">
                    <Users className="w-4 h-4 text-giring-emas mb-2" />
                    <p className="text-gabus-pualam/70">Status</p>
                    <p className="text-gabus-pualam font-medium">
                      {script.status === 'active' ? 'Aktif' :
                       script.status === 'revitalized' ? 'Dihidupkan Kembali' : 'Terancam'}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Large Glyph */}
              <div className="text-center">
                <motion.div
                  variants={fadeUp}
                  className="text-9xl text-giring-emas mb-6"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  {script.glyph}
                </motion.div>
                
                <motion.div variants={fadeUp} className="space-y-3">
                  <Link 
                    to={`/practice/${script.id}`}
                    className="block w-full bg-giring-emas text-indigo-lurik px-6 py-3 rounded-full font-semibold hover:bg-giring-emas/90 transition-colors"
                  >
                    Latihan Sekarang
                  </Link>
                  <button className="w-full bg-gabus-pualam/20 text-gabus-pualam px-6 py-3 rounded-full font-medium hover:bg-gabus-pualam/30 transition-colors flex items-center justify-center gap-2">
                    <Play className="w-4 h-4" />
                    Lihat Goresan
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Tabs Navigation */}
      <Section className="py-0 border-b border-jade-tenun/20">
        <Container>
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap",
                    activeTab === tab.id
                      ? "border-giring-emas text-giring-emas"
                      : "border-transparent text-sogan-batik hover:text-indigo-lurik"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Tab Content */}
      <Section>
        <Container>
          <motion.div
            key={activeTab}
            variants={fadeUp}
            initial="initial"
            animate="animate"
          >
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* History */}
                <Card>
                  <h3 className="text-xl font-semibold text-indigo-lurik mb-4 font-cultural">
                    Sejarah & Perkembangan
                  </h3>
                  <p className="text-sogan-batik leading-relaxed mb-6">
                    {script.history}
                  </p>
                  <div className="text-sm text-jade-tenun">
                    <strong>Asal-usul:</strong> {script.origin}
                  </div>
                </Card>

                {/* Writing Rules */}
                <Card>
                  <h3 className="text-xl font-semibold text-indigo-lurik mb-4 font-cultural">
                    Aturan Penulisan
                  </h3>
                  <ul className="space-y-3">
                    {script.rules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-giring-emas rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sogan-batik">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            )}

            {activeTab === 'characters' && (
              <div className="space-y-8">
                {/* Basic Characters */}
                <Card>
                  <h3 className="text-xl font-semibold text-indigo-lurik mb-6 font-cultural">
                    Huruf Dasar
                  </h3>
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
                    {script.basicCharacters.map((char, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        className="aspect-square bg-gabus-pualam border-2 border-jade-tenun/20 rounded-lg flex items-center justify-center text-2xl text-indigo-lurik hover:border-giring-emas hover:bg-giring-emas/10 transition-all cursor-pointer"
                      >
                        {char}
                      </motion.div>
                    ))}
                  </div>
                </Card>

                {/* Numbers */}
                {script.numbers.length > 0 && (
                  <Card>
                    <h3 className="text-xl font-semibold text-indigo-lurik mb-6 font-cultural">
                      Angka
                    </h3>
                    <div className="grid grid-cols-5 sm:grid-cols-10 gap-4">
                      {script.numbers.map((num, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.1 }}
                          className="aspect-square bg-gabus-pualam border-2 border-jade-tenun/20 rounded-lg flex flex-col items-center justify-center hover:border-giring-emas hover:bg-giring-emas/10 transition-all cursor-pointer"
                        >
                          <div className="text-2xl text-indigo-lurik mb-1">{num}</div>
                          <div className="text-xs text-sogan-batik">{index}</div>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            )}

            {activeTab === 'examples' && (
              <Card>
                <h3 className="text-xl font-semibold text-indigo-lurik mb-6 font-cultural">
                  Contoh Kata & Kalimat
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {script.examples.map((example, index) => (
                    <div key={index} className="bg-gabus-pualam border border-jade-tenun/20 rounded-lg p-4">
                      <div className="text-3xl text-indigo-lurik mb-3 text-center font-cultural">
                        {example.word}
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-sogan-batik mb-1">
                          Romanisasi: <span className="font-medium">{example.script}</span>
                        </div>
                        <div className="text-sm text-jade-tenun">
                          Arti: <span className="font-medium">{example.meaning}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'stories' && (
              <div className="space-y-8">
                <Card>
                  <h3 className="text-xl font-semibold text-indigo-lurik mb-4 font-cultural">
                    Cerita & Artefak Budaya
                  </h3>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-sogan-batik leading-relaxed mb-6">
                      Aksara {script.name} memiliki peran penting dalam pelestarian budaya dan tradisi di {script.region}. 
                      Berbagai naskah kuno dan artefak bersejarah menggunakan aksara ini untuk merekam pengetahuan, 
                      cerita rakyat, dan ajaran spiritual.
                    </p>
                    
                    <div className="bg-gradient-to-r from-giring-emas/10 to-jade-tenun/10 rounded-lg p-6 mb-6">
                      <h4 className="text-lg font-semibold text-indigo-lurik mb-3">Fakta Menarik</h4>
                      <ul className="space-y-2 text-sogan-batik">
                        <li>• Digunakan dalam naskah-naskah penting kerajaan</li>
                        <li>• Memiliki variasi regional yang unik</li>
                        <li>• Masih dipelajari dalam komunitas tradisional</li>
                        <li>• Bagian dari warisan budaya tak benda UNESCO</li>
                      </ul>
                    </div>

                    <div className="text-center">
                      <p className="text-jade-tenun italic">
                        "Setiap goresan aksara adalah jejak peradaban yang harus kita lestarikan"
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}
