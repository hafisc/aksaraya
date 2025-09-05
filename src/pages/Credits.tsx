import { motion } from 'framer-motion'
import { Shield, Award, ExternalLink, Heart, Code, Palette } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { Heading } from '../components/ui/Heading'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export function Credits() {
  const licenses = [
    {
      category: 'Fonts & Typography',
      icon: <Palette className="w-5 h-5" />,
      items: [
        {
          name: 'Plus Jakarta Sans',
          author: 'Tokotype',
          license: 'Open Font License',
          url: 'https://fonts.google.com/specimen/Plus+Jakarta+Sans'
        },
        {
          name: 'Noto Serif',
          author: 'Google Fonts',
          license: 'Open Font License',
          url: 'https://fonts.google.com/noto/specimen/Noto+Serif'
        }
      ]
    },
    {
      category: 'Icons & Graphics',
      icon: <Award className="w-5 h-5" />,
      items: [
        {
          name: 'Lucide Icons',
          author: 'Lucide Contributors',
          license: 'ISC License',
          url: 'https://lucide.dev'
        },
        {
          name: 'Cultural Patterns',
          author: 'Traditional Indonesian Motifs',
          license: 'Public Domain',
          url: '#'
        }
      ]
    },
    {
      category: 'Libraries & Frameworks',
      icon: <Code className="w-5 h-5" />,
      items: [
        {
          name: 'React',
          author: 'Meta Platforms, Inc.',
          license: 'MIT License',
          url: 'https://reactjs.org'
        },
        {
          name: 'Tailwind CSS',
          author: 'Tailwind Labs Inc.',
          license: 'MIT License',
          url: 'https://tailwindcss.com'
        },
        {
          name: 'Framer Motion',
          author: 'Framer',
          license: 'MIT License',
          url: 'https://www.framer.com/motion'
        },
        {
          name: 'React Leaflet',
          author: 'Paul Le Cam',
          license: 'Hippocratic License',
          url: 'https://react-leaflet.js.org'
        },
        {
          name: 'Vite',
          author: 'Evan You',
          license: 'MIT License',
          url: 'https://vitejs.dev'
        }
      ]
    },
    {
      category: 'Cultural Data Sources',
      icon: <Heart className="w-5 h-5" />,
      items: [
        {
          name: 'Unicode Consortium',
          author: 'Unicode, Inc.',
          license: 'Unicode License',
          url: 'https://unicode.org'
        },
        {
          name: 'Wikimedia Commons',
          author: 'Wikimedia Foundation',
          license: 'Creative Commons',
          url: 'https://commons.wikimedia.org'
        },
        {
          name: 'Indonesian Cultural Heritage',
          author: 'Various Traditional Sources',
          license: 'Cultural Commons',
          url: '#'
        }
      ]
    }
  ]

  const originalityStatement = {
    title: 'Pernyataan Orisinalitas',
    content: `Aksaraya adalah karya original yang dikembangkan khusus untuk melestarikan dan mempromosikan aksara tradisional Nusantara. 
    Aplikasi ini bukan merupakan template atau fork dari proyek existing, melainkan dibangun dari nol dengan pendekatan inovatif 
    yang menggabungkan teknologi modern dengan kearifan budaya lokal.`,
    features: [
      'Arsitektur aplikasi dirancang khusus untuk pembelajaran aksara',
      'Sistem gamifikasi yang unik untuk engagement pengguna',
      'Integrasi peta interaktif dengan data budaya lokal',
      'Implementasi canvas untuk praktik menulis aksara',
      'Desain visual yang terinspirasi motif Nusantara',
      'Algoritma pembelajaran adaptif berbasis progres pengguna'
    ]
  }

  const technicalSpecs = [
    { label: 'Framework', value: 'React 19 + TypeScript' },
    { label: 'Styling', value: 'Tailwind CSS + Custom Theme' },
    { label: 'Animation', value: 'Framer Motion' },
    { label: 'Routing', value: 'React Router DOM' },
    { label: 'Build Tool', value: 'Vite' },
    { label: 'Map Library', value: 'Leaflet + React Leaflet' },
    { label: 'Icons', value: 'Lucide React' },
    { label: 'Deployment', value: 'Ready for Vercel/Netlify' }
  ]

  return (
    <Section className="min-h-screen">
      <Container>
        {/* Hero */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Heading level={1} cultural className="mb-6">
              Credits & Lisensi
            </Heading>
            <p className="text-xl text-sogan-batik max-w-3xl mx-auto leading-relaxed">
              Penghargaan untuk semua kontributor, sumber data, dan teknologi 
              yang memungkinkan Aksaraya menjadi kenyataan.
            </p>
          </motion.div>
        </div>

        {/* Originality Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <Card className="p-8 bg-gradient-to-r from-indigo-lurik to-jade-tenun text-white">
            <div className="text-center mb-8">
              <Shield className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">{originalityStatement.title}</h2>
              <p className="text-gabus-pualam/90 text-lg leading-relaxed max-w-4xl mx-auto">
                {originalityStatement.content}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-4">Fitur Original:</h3>
                <ul className="space-y-2">
                  {originalityStatement.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gabus-pualam/90">
                      <span className="text-giring-emas">•</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Inovasi Teknis:</h3>
                <ul className="space-y-2">
                  {originalityStatement.features.slice(3).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gabus-pualam/90">
                      <span className="text-giring-emas">•</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Technical Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-indigo-lurik text-center mb-8">
            Spesifikasi Teknis
          </h2>
          <Card className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {technicalSpecs.map((spec, index) => (
                <div key={index} className="text-center p-4 bg-gabus-pualam rounded-lg">
                  <div className="font-semibold text-indigo-lurik text-sm mb-1">
                    {spec.label}
                  </div>
                  <div className="text-sogan-batik text-xs">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Licenses */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-indigo-lurik text-center mb-8">
            Lisensi & Atribusi
          </h2>
          <div className="space-y-8">
            {licenses.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * categoryIndex }}
              >
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-jade-tenun">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-indigo-lurik">
                      {category.category}
                    </h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="p-4 bg-gabus-pualam rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-indigo-lurik">
                            {item.name}
                          </h4>
                          {item.url !== '#' && (
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => window.open(item.url, '_blank')}
                            >
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                        <p className="text-sm text-sogan-batik mb-1">
                          oleh {item.author}
                        </p>
                        <span className="inline-block px-2 py-1 text-xs bg-jade-tenun/20 text-jade-tenun rounded-full">
                          {item.license}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Open Source Notice */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <Card className="p-8 bg-gradient-to-br from-gabus-pualam to-white text-center">
            <Code className="w-12 h-12 text-indigo-lurik mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-indigo-lurik mb-4">
              Komitmen Open Source
            </h2>
            <p className="text-sogan-batik mb-6 max-w-2xl mx-auto">
              Aksaraya dikembangkan dengan semangat open source untuk transparansi dan kolaborasi. 
              Semua kode sumber tersedia untuk komunitas dengan lisensi MIT.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="primary">
                Lihat Source Code
              </Button>
              <Button variant="outline">
                Laporan Bug
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Acknowledgments */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Card className="p-8 bg-gradient-to-r from-jade-tenun to-giring-emas text-white text-center">
            <Heart className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Terima Kasih</h2>
            <p className="text-gabus-pualam/90 mb-6 max-w-3xl mx-auto leading-relaxed">
              Kepada seluruh komunitas developer, peneliti budaya, dan penjaga tradisi 
              yang telah berkontribusi dalam pelestarian aksara Nusantara. 
              Bersama kita jaga warisan leluhur untuk generasi mendatang.
            </p>
            <div className="text-sm text-gabus-pualam/80">
              © 2024 Aksaraya. Dibuat dengan ❤️ untuk Indonesia.
            </div>
          </Card>
        </motion.div>
      </Container>
    </Section>
  )
}
