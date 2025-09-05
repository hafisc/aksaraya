import { motion } from 'framer-motion'
import { BookOpen, PenTool, Brain, Map, Scroll, Sparkles, Globe, Users, Trophy, Star, Zap, Heart, Award, Target, Rocket } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { Heading } from '../components/ui/Heading'
import { Card } from '../components/ui/Card'
import { aksaraScripts, features, testimonials } from '../data/aksara'
import { fadeUp, stagger } from '../lib/motion'

const iconMap = {
  BookOpen,
  PenTool,
  Brain,
  Map,
  Scroll,
  Sparkles,
  Globe,
  Users,
  Trophy,
  Star,
  Zap,
  Heart,
  Award,
  Target,
  Rocket
}

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section background="brown" className="relative overflow-hidden">
        <Container className="relative z-10">
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="text-center py-20"
          >
            <Heading level={1} className="text-putih-bersih mb-6" cultural>
              Aksara Nusantara Interaktif
            </Heading>
            
            <motion.p 
              variants={fadeUp}
              className="text-xl text-putih-bersih/90 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Peluk Tradisi, Gerakkan Teknologi. Jelajahi keindahan aksara tradisional Nusantara 
              melalui pengalaman belajar yang interaktif dan imersif.
            </motion.p>
            
            <motion.div variants={fadeUp}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-putih-bersih text-coklat-utama px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-krem-hangat"
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
              className="absolute text-6xl text-putih-bersih/20"
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
      <Section className="bg-putih-bersih">
        <Container>
          <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}>
            <div className="text-center mb-16">
              <Heading level={2} className="text-coklat-utama mb-4" cultural>
                Koleksi Aksara Nusantara
              </Heading>
              <motion.p variants={fadeUp} className="text-coklat-tua text-lg max-w-2xl mx-auto">
                Temukan keragaman aksara tradisional dari berbagai daerah di Indonesia
              </motion.p>
            </div>

            <motion.div 
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {aksaraScripts.map((script) => (
                <motion.div key={script.id} variants={fadeUp}>
                  <Card hover className="text-center group">
                    <motion.div
                      className="text-6xl mb-4 text-coklat-utama group-hover:text-coklat-muda transition-colors duration-300"
                    >
                      {script.glyph}
                    </motion.div>
                    <h3 className="text-xl font-semibold text-coklat-utama mb-2 font-cultural">
                      {script.name}
                    </h3>
                    <p className="text-coklat-tua mb-3">{script.region}</p>
                    <p className="text-sm text-coklat-muda">{script.description}</p>
                    <div className="mt-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        script.status === 'active' ? 'bg-coklat-utama text-putih-bersih' :
                        script.status === 'revitalized' ? 'bg-coklat-muda text-coklat-tua' :
                        'bg-coklat-tua text-putih-bersih'
                      }`}>
                        {script.status === 'active' ? 'Aktif' :
                         script.status === 'revitalized' ? 'Dihidupkan Kembali' : 'Terancam'}
                      </span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Bagian Fitur */}
      <Section className="bg-coklat-muda/10">
        <Container>
          <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}>
            <div className="text-center mb-16">
              <Heading level={2} className="text-coklat-utama mb-4" cultural>
                Fitur Pembelajaran
              </Heading>
              <motion.p variants={fadeUp} className="text-coklat-tua text-lg max-w-2xl mx-auto">
                Pelajari aksara Nusantara dengan berbagai fitur interaktif yang menarik
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => {
                const Icon = iconMap[feature.icon as keyof typeof iconMap]
                return (
                  <motion.div key={feature.id} variants={fadeUp}>
                    <Card hover className="text-center group">
                      <div className="w-16 h-16 mx-auto bg-coklat-utama rounded-full flex items-center justify-center mb-6 group-hover:bg-coklat-muda transition-colors duration-300">
                        <Icon className="w-8 h-8 text-putih-bersih" />
                      </div>
                      <h3 className="text-xl font-semibold text-coklat-utama mb-4 font-cultural">
                        {feature.title}
                      </h3>
                      <p className="text-coklat-tua">{feature.description}</p>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Bagian Testimoni */}
      <Section className="bg-putih-bersih">
        <Container>
          <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}>
            <div className="text-center mb-16">
              <Heading level={2} className="text-coklat-utama mb-4" cultural>
                Testimoni Pengguna
              </Heading>
              <motion.p variants={fadeUp} className="text-coklat-tua text-lg max-w-2xl mx-auto">
                Dengarkan pengalaman dari para pengguna yang telah belajar aksara Nusantara
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <motion.div key={testimonial.name} variants={fadeUp}>
                  <Card hover className="group">
                    <div className="text-4xl text-coklat-muda mb-4">"</div>
                    <p className="text-coklat-tua mb-6 italic">{testimonial.quote}</p>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-coklat-utama fill-current" />
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-coklat-utama rounded-full flex items-center justify-center text-putih-bersih font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-coklat-utama">{testimonial.name}</h4>
                        <p className="text-coklat-muda text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Call to Action */}
      <Section background="brown">
        <Container>
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center py-20"
          >
            <motion.div variants={fadeUp}>
              <Heading level={2} className="text-putih-bersih mb-6" cultural>
                Mulai Petualangan Anda
              </Heading>
              <p className="text-xl text-putih-bersih/90 mb-8 max-w-2xl mx-auto">
                Bergabunglah dengan ribuan pembelajar lainnya dan jelajahi keindahan aksara Nusantara
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-putih-bersih text-coklat-utama px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-krem-hangat"
              >
                Mulai Sekarang
              </motion.button>
            </motion.div>
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}
