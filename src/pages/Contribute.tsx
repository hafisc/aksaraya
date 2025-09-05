import { motion } from 'framer-motion'
import { 
  Github, GitBranch, FileText, Users, Code, BookOpen, 
  CheckCircle, AlertCircle, ExternalLink, Download, Upload
} from 'lucide-react'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { Heading } from '../components/ui/Heading'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export function Contribute() {
  const contributionTypes = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Menambah Cerita MDX',
      description: 'Kontribusi cerita tradisional dalam format MDX dengan aksara asli',
      difficulty: 'Pemula',
      color: 'jade-tenun'
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Pengembangan Fitur',
      description: 'Membantu mengembangkan fitur baru atau memperbaiki bug',
      difficulty: 'Menengah',
      color: 'giring-emas'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Data Aksara',
      description: 'Menambah atau memperbaiki data aksara dan karakter',
      difficulty: 'Ahli',
      color: 'indigo-lurik'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Dokumentasi',
      description: 'Membantu menulis dokumentasi dan panduan pengguna',
      difficulty: 'Pemula',
      color: 'jade-tenun'
    }
  ]

  const steps = [
    {
      number: 1,
      title: 'Fork Repository',
      description: 'Fork repository Aksaraya ke akun GitHub Anda',
      code: 'git clone https://github.com/yourusername/aksaraya.git'
    },
    {
      number: 2,
      title: 'Setup Development',
      description: 'Install dependencies dan setup environment development',
      code: 'npm install && npm run dev'
    },
    {
      number: 3,
      title: 'Buat Branch Baru',
      description: 'Buat branch baru untuk kontribusi Anda',
      code: 'git checkout -b feature/nama-fitur-anda'
    },
    {
      number: 4,
      title: 'Buat Perubahan',
      description: 'Lakukan perubahan sesuai dengan guidelines kontribusi',
      code: '# Edit files, add stories, fix bugs, etc.'
    },
    {
      number: 5,
      title: 'Commit & Push',
      description: 'Commit perubahan dan push ke repository Anda',
      code: 'git add . && git commit -m "feat: deskripsi perubahan" && git push origin feature/nama-fitur-anda'
    },
    {
      number: 6,
      title: 'Create Pull Request',
      description: 'Buat Pull Request ke repository utama',
      code: '# Gunakan GitHub UI untuk membuat PR'
    }
  ]

  const mdxTemplate = `---
title: "Judul Cerita"
titleOriginal: "ꦗꦸꦢꦸꦭ꧀ꦕꦫꦶꦠ"
aksara: "javanese"
region: "Jawa Tengah"
category: "folklore"
difficulty: "beginner"
author: "Nama Kontributor"
---

# {frontmatter.title}

<div className="text-2xl font-serif text-sogan-batik mb-4">
  {frontmatter.titleOriginal}
</div>

Dahulu kala di tanah Jawa...

## Tokoh Cerita

- **Nama Tokoh**: Deskripsi tokoh dalam cerita
- **Tokoh Lain**: Peran dalam cerita

## Pesan Moral

Cerita ini mengajarkan tentang...`

  const fileStructure = [
    {
      path: '/src/stories/',
      description: 'Folder untuk file MDX cerita',
      files: ['malin-kundang.mdx', 'sangkuriang.mdx', 'cerita-baru.mdx']
    },
    {
      path: '/src/data/aksara.ts',
      description: 'Data aksara dan karakter',
      files: ['Tambah aksara baru atau perbaiki yang ada']
    },
    {
      path: '/src/data/stories.ts',
      description: 'Metadata cerita',
      files: ['Daftar cerita dan informasi dasar']
    },
    {
      path: '/public/assets/',
      description: 'Aset gambar dan audio',
      files: ['images/', 'audio/', 'fonts/']
    }
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
              Berkontribusi ke Aksaraya
            </Heading>
            <p className="text-xl text-sogan-batik max-w-3xl mx-auto leading-relaxed">
              Bantu kami melestarikan aksara Nusantara! Setiap kontribusi Anda, 
              baik kode, data, maupun cerita, sangat berarti untuk masa depan budaya Indonesia.
            </p>
          </motion.div>
        </div>

        {/* Contribution Types */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-indigo-lurik text-center mb-8">
            Jenis Kontribusi
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {contributionTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300 h-full">
                  <div className={`text-${type.color} mb-4`}>
                    {type.icon}
                  </div>
                  <h3 className="text-lg font-bold text-indigo-lurik mb-2">
                    {type.title}
                  </h3>
                  <p className="text-sogan-batik mb-4">
                    {type.description}
                  </p>
                  <span className={`inline-block px-3 py-1 text-xs rounded-full bg-${type.color}/20 text-${type.color}`}>
                    {type.difficulty}
                  </span>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Start */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <Card className="p-8 bg-gradient-to-r from-indigo-lurik to-jade-tenun text-white">
            <div className="text-center">
              <Github className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
              <p className="text-gabus-pualam/90 mb-6 max-w-2xl mx-auto">
                Siap untuk berkontribusi? Mulai dengan fork repository kami dan ikuti panduan langkah demi langkah.
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="secondary">
                  <Github className="w-4 h-4 mr-2" />
                  Fork di GitHub
                </Button>
                <Button variant="secondary">
                  <Download className="w-4 h-4 mr-2" />
                  Download Template
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Step by Step Guide */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-indigo-lurik text-center mb-8">
            Panduan Langkah demi Langkah
          </h2>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-giring-emas text-indigo-lurik rounded-full flex items-center justify-center font-bold text-lg">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-indigo-lurik mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sogan-batik mb-4">
                        {step.description}
                      </p>
                      <div className="bg-gabus-pualam p-3 rounded-lg font-mono text-sm text-sogan-batik">
                        {step.code}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* MDX Template */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-indigo-lurik text-center mb-8 flex items-center justify-center gap-2">
            <FileText className="w-6 h-6" />
            Template MDX untuk Cerita
          </h2>
          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-indigo-lurik">cerita-baru.mdx</h3>
              <Button size="sm" variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Copy Template
              </Button>
            </div>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
                <code>{mdxTemplate}</code>
              </pre>
            </div>
          </Card>
        </motion.div>

        {/* File Structure */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-indigo-lurik text-center mb-8">
            Struktur File Project
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {fileStructure.map((folder, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <GitBranch className="w-5 h-5 text-jade-tenun mt-1" />
                  <div>
                    <h3 className="font-bold text-indigo-lurik font-mono">
                      {folder.path}
                    </h3>
                    <p className="text-sm text-sogan-batik">
                      {folder.description}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  {folder.files.map((file, fileIndex) => (
                    <div key={fileIndex} className="text-sm text-sogan-batik font-mono bg-gabus-pualam px-2 py-1 rounded">
                      {file}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-indigo-lurik text-center mb-8">
            Guidelines Kontribusi
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-jade-tenun" />
                <h3 className="font-bold text-indigo-lurik">Yang Harus Dilakukan</h3>
              </div>
              <ul className="space-y-2 text-sm text-sogan-batik">
                <li>• Gunakan aksara asli yang akurat</li>
                <li>• Sertakan sumber referensi</li>
                <li>• Ikuti format MDX yang benar</li>
                <li>• Test perubahan sebelum PR</li>
                <li>• Tulis commit message yang jelas</li>
                <li>• Hormati lisensi dan hak cipta</li>
              </ul>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <h3 className="font-bold text-indigo-lurik">Yang Harus Dihindari</h3>
              </div>
              <ul className="space-y-2 text-sm text-sogan-batik">
                <li>• Menggunakan data tanpa verifikasi</li>
                <li>• Melanggar hak cipta</li>
                <li>• Commit langsung ke main branch</li>
                <li>• Mengabaikan code style</li>
                <li>• Menambah dependencies berat</li>
                <li>• Mengubah core functionality</li>
              </ul>
            </Card>
          </div>
        </motion.div>

        {/* Community */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <Card className="p-8 bg-gradient-to-r from-jade-tenun to-giring-emas text-white text-center">
            <Users className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Bergabung dengan Komunitas</h2>
            <p className="text-gabus-pualam/90 mb-6 max-w-2xl mx-auto">
              Punya pertanyaan? Butuh bantuan? Bergabunglah dengan komunitas kontributor kami 
              untuk diskusi, sharing, dan kolaborasi.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="secondary">
                <ExternalLink className="w-4 h-4 mr-2" />
                Discord Community
              </Button>
              <Button variant="secondary">
                <Github className="w-4 h-4 mr-2" />
                GitHub Discussions
              </Button>
            </div>
          </Card>
        </motion.div>
      </Container>
    </Section>
  )
}
