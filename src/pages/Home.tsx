import { motion } from 'framer-motion'
import { Map, Scroll, Sparkles, BookOpen, PenTool, Brain } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { Heading } from '../components/ui/Heading'
import { Card } from '../components/ui/Card'
import { aksaraScripts, features } from '../data/aksara'
import { fadeUp, stagger } from '../lib/motion'

const iconMap = {
  BookOpen,
  PenTool,
  Brain,
  Map,
  Scroll
}

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section background="brown" className="relative overflow-hidden min-h-screen flex items-center">
        <Container className="relative z-10 w-full">
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="text-center"
          >
            <Heading level={1} className="text-white mb-6" cultural>
              Aksara Nusantara Interaktif
            </Heading>
            
            <motion.p 
              variants={fadeUp}
              className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Peluk Tradisi, Gerakkan Teknologi. Jelajahi keindahan aksara tradisional Nusantara 
              melalui pengalaman belajar yang interaktif dan imersif.
            </motion.p>
            
            <motion.div variants={fadeUp}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#592B18] px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white"
              >
                Mulai Belajar
              </motion.button>
            </motion.div>
          </motion.div>
        </Container>

        {/* Floating Aksara Glyphs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {aksaraScripts.slice(0, 6).map((script, index) => (
            <motion.div
              key={script.id}
              className="absolute text-6xl text-white/20"
              style={{
                left: `${10 + index * 15}%`,
                top: `${20 + (index % 2) * 40}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
            >
              {script.glyph}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Papan Koleksi Aksara */}
      <Section className="bg-[#592B18] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-8xl text-white rotate-12">ᬳ</div>
          <div className="absolute top-32 right-20 text-6xl text-white -rotate-12">ꦲ</div>
          <div className="absolute bottom-20 left-1/4 text-7xl text-white rotate-45">ᮃ</div>
          <div className="absolute bottom-32 right-10 text-5xl text-white -rotate-45">ᬅ</div>
        </div>
        
        <Container className="relative z-10">
          <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}>
            <div className="text-center mb-20">
              <Heading level={2} className="text-white mb-6 text-4xl lg:text-5xl" cultural>
                Koleksi Aksara Nusantara
              </Heading>
              <motion.p variants={fadeUp} className="text-white/90 text-xl max-w-3xl mx-auto leading-relaxed">
                Temukan keragaman aksara tradisional dari berbagai daerah di Indonesia dalam koleksi interaktif yang memukau
              </motion.p>
            </div>

            <motion.div 
              variants={stagger}
              className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {aksaraScripts.map((script) => (
                <motion.div 
                  key={script.id} 
                  variants={fadeUp}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative group">
                    {/* Glowing background effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                    
                    <Card className="relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
                      {/* Decorative corner elements */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full"></div>
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-tr-full"></div>
                      
                      <div className="relative p-8 text-center">
                        {/* Script glyph with enhanced styling */}
                        <motion.div
                          className="relative mb-6"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center mb-4 shadow-2xl">
                            <span className="text-5xl text-white font-cultural">
                              {script.glyph}
                            </span>
                          </div>
                          {/* Floating particles effect */}
                          <div className="absolute -top-2 -right-2 w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
                          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white/20 rounded-full animate-pulse delay-300"></div>
                        </motion.div>

                        {/* Content */}
                        <h3 className="text-2xl font-bold text-white mb-3 font-cultural">
                          {script.name}
                        </h3>
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <Map className="w-4 h-4 text-white/70" />
                          <p className="text-white/80 font-medium">{script.region}</p>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed mb-6">
                          {script.description}
                        </p>

                        {/* Status badge with enhanced design */}
                        <div className="flex justify-center">
                          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300 ${
                            script.status === 'active' 
                              ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                            script.status === 'revitalized' 
                              ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                              'bg-orange-500/20 text-orange-300 border-orange-500/30'
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${
                              script.status === 'active' ? 'bg-green-400' :
                              script.status === 'revitalized' ? 'bg-blue-400' : 'bg-orange-400'
                            }`}></div>
                            {script.status === 'active' ? 'Aktif' :
                             script.status === 'revitalized' ? 'Dihidupkan Kembali' : 'Terancam'}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom decorative element */}
            <motion.div 
              variants={fadeUp}
              className="text-center mt-16"
            >
              <div className="inline-flex items-center gap-3 text-white/60">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/30"></div>
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium">Warisan yang Tak Ternilai</span>
                <Sparkles className="w-5 h-5" />
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/30"></div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Bagian Fitur */}
      <Section className="bg-[#592B18] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-16 text-6xl text-white rotate-45">📚</div>
          <div className="absolute top-40 right-24 text-5xl text-white -rotate-30">✍️</div>
          <div className="absolute bottom-24 left-1/3 text-7xl text-white rotate-12">🧠</div>
          <div className="absolute bottom-16 right-16 text-4xl text-white -rotate-45">🗺️</div>
        </div>

        <Container className="relative z-10">
          <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}>
            <div className="text-center mb-20">
              
              <Heading level={2} className="text-white mb-6 text-4xl lg:text-5xl" cultural>
                Fitur Pembelajaran
              </Heading>
              <motion.p variants={fadeUp} className="text-white/90 text-xl max-w-3xl mx-auto leading-relaxed">
                Pelajari aksara Nusantara dengan berbagai fitur interaktif yang menarik dan mudah dipahami
              </motion.p>
            </div>

            <motion.div 
              variants={stagger}
              className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {features.map((feature) => {
                const Icon = iconMap[feature.icon as keyof typeof iconMap]
                return (
                  <motion.div 
                    key={feature.id} 
                    variants={fadeUp}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative group">
                      {/* Glowing background effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                      
                      <Card className="relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden h-full">
                        {/* Decorative corner gradient */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full"></div>
                        
                        <div className="relative p-8 text-center h-full flex flex-col">
                          {/* Enhanced icon container */}
                          <motion.div
                            className="relative mb-6"
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center mb-4 shadow-2xl relative">
                              <Icon className="w-10 h-10 text-white" />
                              {/* Pulsing ring effect */}
                              <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-pulse"></div>
                            </div>
                            {/* Floating particles */}
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-white/40 rounded-full animate-bounce"></div>
                            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white/30 rounded-full animate-bounce delay-300"></div>
                          </motion.div>

                          {/* Content */}
                          <div className="flex-grow flex flex-col justify-between">
                            <div>
                              <h3 className="text-2xl font-bold text-white mb-4 font-cultural">
                                {feature.title}
                              </h3>
                              <p className="text-white/80 text-sm leading-relaxed">
                                {feature.description}
                              </p>
                            </div>

                            {/* Interactive indicator */}
                            <div className="mt-6 pt-4 border-t border-white/10">
                              <div className="flex items-center justify-center gap-2 text-white/60 text-xs">
                                <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
                                <span>Interaktif</span>
                                <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse delay-150"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Bottom decorative element */}
            <motion.div 
              variants={fadeUp}
              className="text-center mt-16"
            >
              <div className="inline-flex items-center gap-3 text-white/60">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/30"></div>
                <Brain className="w-5 h-5" />
                <span className="text-sm font-medium">Belajar dengan Mudah</span>
                <Brain className="w-5 h-5" />
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/30"></div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

    </div>
  )
}
