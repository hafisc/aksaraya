import { motion } from 'framer-motion'
import { Heart, Users, BookOpen, Globe, Github, Database, Award, Shield } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { Heading } from '../components/ui/Heading'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export function About() {
  const teamMembers = [
    {
      name: 'Tim Aksaraya',
      role: 'Developer & Cultural Researcher',
      description: 'Passionate about preserving Indonesian cultural heritage through technology'
    }
  ]

  const dataSources = [
    {
      name: 'Unicode Consortium',
      description: 'Official Unicode standards for Indonesian scripts',
      url: 'https://unicode.org'
    },
    {
      name: 'Perpustakaan Nasional RI',
      description: 'Historical manuscripts and cultural documentation',
      url: 'https://perpusnas.go.id'
    },
    {
      name: 'Wikimedia Commons',
      description: 'Open cultural heritage images and resources',
      url: 'https://commons.wikimedia.org'
    },
    {
      name: 'Academic Research',
      description: 'Peer-reviewed studies on Indonesian writing systems',
      url: '#'
    }
  ]

  return (
    <Section className="min-h-screen">
      <Container>
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Heading level={1} cultural className="mb-6">
              Tentang Aksaraya
            </Heading>
            <p className="text-xl text-sogan-batik max-w-3xl mx-auto leading-relaxed">
              Platform digital inovatif untuk melestarikan, mempelajari, dan menghidupkan kembali 
              kekayaan aksara tradisional Nusantara melalui teknologi modern dan pendekatan interaktif.
            </p>
          </motion.div>
        </div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <Card className="p-8 bg-coklat-utama text-putih-bersih">
            <div className="text-center">
              <Heart className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Misi Pelestarian Budaya</h2>
              <p className="text-putih-bersih/90 text-lg leading-relaxed max-w-4xl mx-auto">
                Aksaraya hadir dengan misi mulia untuk menyelamatkan warisan aksara Nusantara dari kepunahan. 
                Kami percaya bahwa setiap goresan aksara adalah jembatan yang menghubungkan masa lalu dengan masa depan, 
                menyimpan kebijaksanaan leluhur yang tak ternilai harganya.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-indigo-lurik text-center mb-8">
            Mengapa Aksaraya?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <BookOpen className="w-10 h-10 text-jade-tenun mx-auto mb-4" />
              <h3 className="font-bold text-indigo-lurik mb-2">Pembelajaran Interaktif</h3>
              <p className="text-sm text-sogan-batik">
                Metode belajar yang engaging dengan gamifikasi dan teknologi modern
              </p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <Globe className="w-10 h-10 text-jade-tenun mx-auto mb-4" />
              <h3 className="font-bold text-indigo-lurik mb-2">Jangkauan Global</h3>
              <p className="text-sm text-sogan-batik">
                Memperkenalkan aksara Nusantara ke dunia internasional
              </p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <Users className="w-10 h-10 text-jade-tenun mx-auto mb-4" />
              <h3 className="font-bold text-indigo-lurik mb-2">Komunitas Aktif</h3>
              <p className="text-sm text-sogan-batik">
                Platform kolaboratif untuk pembelajar dan peneliti budaya
              </p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <Shield className="w-10 h-10 text-jade-tenun mx-auto mb-4" />
              <h3 className="font-bold text-indigo-lurik mb-2">Akurasi Tinggi</h3>
              <p className="text-sm text-sogan-batik">
                Data terverifikasi dari sumber akademis dan institusi terpercaya
              </p>
            </Card>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-indigo-lurik text-center mb-8">
            Tim Pengembang
          </h2>
          <div className="max-w-2xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-giring-emas to-jade-tenun rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-indigo-lurik">{member.name}</h3>
                    <p className="text-sogan-batik font-medium">{member.role}</p>
                    <p className="text-sm text-sogan-batik mt-1">{member.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Data Sources */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-indigo-lurik text-center mb-8 flex items-center justify-center gap-2">
            <Database className="w-6 h-6" />
            Sumber Data & Atribusi
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {dataSources.map((source, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-jade-tenun mt-1" />
                  <div className="flex-1">
                    <h3 className="font-bold text-indigo-lurik mb-2">{source.name}</h3>
                    <p className="text-sm text-sogan-batik mb-3">{source.description}</p>
                    {source.url !== '#' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(source.url, '_blank')}
                      >
                        Kunjungi Sumber
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Open Source */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-16"
        >
          <Card className="p-8 bg-gradient-to-br from-gabus-pualam to-white text-center">
            <Github className="w-12 h-12 text-indigo-lurik mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-indigo-lurik mb-4">
              Proyek Open Source
            </h2>
            <p className="text-sogan-batik mb-6 max-w-2xl mx-auto">
              Aksaraya adalah proyek open source yang dikembangkan dengan transparansi penuh. 
              Semua kode sumber, data, dan dokumentasi tersedia untuk komunitas.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="primary">
                <Github className="w-4 h-4 mr-2" />
                Lihat di GitHub
              </Button>
              <Button variant="outline">
                Dokumentasi API
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Contact & Contribution */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Card className="p-8 bg-gradient-to-r from-jade-tenun to-giring-emas text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Bergabunglah dengan Misi Kami</h2>
            <p className="text-gabus-pualam/90 mb-6 max-w-2xl mx-auto">
              Setiap kontribusi, sekecil apapun, memiliki dampak besar dalam pelestarian budaya Nusantara. 
              Mari bersama-sama menjaga warisan leluhur untuk generasi mendatang.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="secondary">
                Cara Berkontribusi
              </Button>
              <Button variant="secondary">
                Hubungi Kami
              </Button>
            </div>
          </Card>
        </motion.div>
      </Container>
    </Section>
  )
}
