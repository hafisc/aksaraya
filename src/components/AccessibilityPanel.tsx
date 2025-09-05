import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Settings, Eye, EyeOff, Zap, ZapOff, 
  Type, Contrast, X, Check 
} from 'lucide-react'
import { useAccessibility } from '../hooks/useAccessibility'
import { Button } from './ui/Button'
import { Card } from './ui/Card'

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const { 
    settings, 
    toggleHighContrast, 
    toggleReducedMotion, 
    setFontSize 
  } = useAccessibility()

  return (
    <>
      {/* Floating Accessibility Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-indigo-lurik text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-giring-emas focus:ring-offset-2"
        aria-label="Buka panel aksesibilitas"
        title="Pengaturan Aksesibilitas"
      >
        <Settings className="w-6 h-6 mx-auto" />
      </button>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-indigo-lurik">
                    Pengaturan Aksesibilitas
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gabus-pualam rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-giring-emas"
                    aria-label="Tutup panel"
                  >
                    <X className="w-5 h-5 text-sogan-batik" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* High Contrast */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Contrast className="w-5 h-5 text-jade-tenun" />
                      <div>
                        <h3 className="font-medium text-indigo-lurik">
                          Kontras Tinggi
                        </h3>
                        <p className="text-sm text-sogan-batik">
                          Tingkatkan kontras untuk visibilitas yang lebih baik
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={toggleHighContrast}
                      className={`relative w-12 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-giring-emas ${
                        settings.highContrast ? 'bg-jade-tenun' : 'bg-gray-300'
                      }`}
                      aria-label={`${settings.highContrast ? 'Nonaktifkan' : 'Aktifkan'} kontras tinggi`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          settings.highContrast ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Reduced Motion */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {settings.reducedMotion ? (
                        <ZapOff className="w-5 h-5 text-jade-tenun" />
                      ) : (
                        <Zap className="w-5 h-5 text-jade-tenun" />
                      )}
                      <div>
                        <h3 className="font-medium text-indigo-lurik">
                          Kurangi Animasi
                        </h3>
                        <p className="text-sm text-sogan-batik">
                          Minimalkan gerakan dan transisi
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={toggleReducedMotion}
                      className={`relative w-12 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-giring-emas ${
                        settings.reducedMotion ? 'bg-jade-tenun' : 'bg-gray-300'
                      }`}
                      aria-label={`${settings.reducedMotion ? 'Nonaktifkan' : 'Aktifkan'} pengurangan animasi`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          settings.reducedMotion ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Font Size */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Type className="w-5 h-5 text-jade-tenun" />
                      <div>
                        <h3 className="font-medium text-indigo-lurik">
                          Ukuran Teks
                        </h3>
                        <p className="text-sm text-sogan-batik">
                          Sesuaikan ukuran teks untuk kenyamanan membaca
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {(['small', 'medium', 'large'] as const).map((size) => (
                        <button
                          key={size}
                          onClick={() => setFontSize(size)}
                          className={`p-3 text-center rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-giring-emas ${
                            settings.fontSize === size
                              ? 'border-jade-tenun bg-jade-tenun/10 text-jade-tenun'
                              : 'border-gabus-pualam text-sogan-batik hover:border-jade-tenun/50'
                          }`}
                          aria-label={`Ukuran teks ${size}`}
                        >
                          <div className={`font-medium ${
                            size === 'small' ? 'text-sm' :
                            size === 'medium' ? 'text-base' :
                            'text-lg'
                          }`}>
                            Aa
                          </div>
                          <div className="text-xs capitalize mt-1">
                            {size === 'small' ? 'Kecil' :
                             size === 'medium' ? 'Sedang' : 'Besar'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Keyboard Navigation Info */}
                  <div className="p-4 bg-gabus-pualam rounded-lg">
                    <h3 className="font-medium text-indigo-lurik mb-2 flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Tips Navigasi
                    </h3>
                    <ul className="text-sm text-sogan-batik space-y-1">
                      <li>• Gunakan Tab untuk navigasi keyboard</li>
                      <li>• Tekan Enter atau Space untuk aktivasi</li>
                      <li>• Gunakan arrow keys pada menu</li>
                      <li>• Esc untuk menutup dialog</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="primary"
                    className="focus:ring-2 focus:ring-giring-emas"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Selesai
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
