import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { motion } from 'framer-motion'
import { MapPin, Book, Clock, Globe, Sparkles } from 'lucide-react'
import L from 'leaflet'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { Heading } from '../components/ui/Heading'
import { mapLocations, regionColors, type MapLocation } from '../data/mapData'
import { aksaraScripts } from '../data/aksara'

// Fix for default markers
delete (L.Icon.Default.prototype as Record<string, any>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Custom marker icons for different regions
const createCustomIcon = (color: string) => {
  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    className: 'custom-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  })
}

function MapController({ selectedLocation }: { selectedLocation: MapLocation | null }) {
  const map = useMap()
  
  useEffect(() => {
    if (selectedLocation) {
      map.flyTo(selectedLocation.coordinates, 8, { duration: 1.5 })
    }
  }, [selectedLocation, map])
  
  return null
}

export function Atlas() {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null)
  const [activeRegion, setActiveRegion] = useState<string | null>(null)

  const filteredLocations = activeRegion 
    ? mapLocations.filter(loc => loc.region === activeRegion)
    : mapLocations

  const regions = Array.from(new Set(mapLocations.map(loc => loc.region)))

  return (
    <div className="min-h-screen bg-[#592B18]">
      <Section className="bg-[#592B18] relative overflow-hidden pt-24 pb-8">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-16 text-8xl text-white rotate-12">🗺️</div>
          <div className="absolute top-32 right-20 text-6xl text-white -rotate-12">ꦲ</div>
          <div className="absolute bottom-20 left-1/4 text-7xl text-white rotate-45">ᮃ</div>
          <div className="absolute bottom-16 right-16 text-5xl text-white -rotate-30">ᬅ</div>
        </div>
        
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <Globe className="w-6 h-6 text-white" />
                <span className="text-white font-medium">Pemetaan Budaya</span>
              </div>
              <Heading level={1} cultural className="text-white mb-6 text-4xl lg:text-5xl">
                Atlas Budaya Nusantara
              </Heading>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Jelajahi persebaran aksara tradisional di seluruh Nusantara dalam peta interaktif yang menampilkan kekayaan budaya Indonesia
              </p>
            </motion.div>

            {/* Region Filter */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex flex-wrap gap-3 justify-center">
                  <motion.button
                    onClick={() => setActiveRegion(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeRegion === null 
                        ? 'bg-white text-[#592B18] shadow-lg' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    Semua Wilayah
                  </motion.button>
                  {regions.map((region) => (
                    <motion.button
                      key={region}
                      onClick={() => setActiveRegion(region)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        activeRegion === region 
                          ? 'bg-white text-[#592B18] shadow-lg' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {region}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section className="bg-[#592B18]">
        <Container>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {/* Map */}
            <div className="lg:col-span-2">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
                >
                  <div className="h-[500px] relative">
                    <MapContainer
                      center={[-2.5, 118]}
                      zoom={5}
                      style={{ height: '100%', width: '100%' }}
                      className="rounded-2xl"
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <MapController selectedLocation={selectedLocation} />
                  {filteredLocations.map((location) => (
                    <Marker
                      key={location.id}
                      position={location.coordinates}
                      icon={createCustomIcon(regionColors[location.region])}
                      eventHandlers={{
                        click: () => setSelectedLocation(location)
                      }}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-bold text-indigo-lurik mb-2">{location.name}</h3>
                          <p className="text-sm text-sogan-batik mb-2">{location.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {location.aksara.map((script) => {
                              const aksaraData = aksaraScripts.find(a => a.id === script)
                              return (
                                <span
                                  key={script}
                                  className="px-2 py-1 bg-giring-emas/20 text-sogan-batik text-xs rounded-full"
                                >
                                  {aksaraData?.name || script}
                                </span>
                              )
                            })}
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl p-6"
                >
                  <h3 className="text-xl font-semibold text-white mb-6 font-cultural flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Informasi Lokasi
                  </h3>
                  
                  {selectedLocation ? (
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-white mb-3 text-lg">{selectedLocation.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-white/80 mb-3">
                          <MapPin className="w-4 h-4" />
                          <span>{selectedLocation.region}</span>
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed bg-white/10 backdrop-blur-sm rounded-lg p-3">
                          {selectedLocation.description}
                        </p>
                      </div>
                      
                      {selectedLocation.aksara && selectedLocation.aksara.length > 0 && (
                        <div>
                          <h5 className="font-medium text-white mb-3 flex items-center gap-2">
                            <Book className="w-4 h-4" />
                            Aksara Terkait
                          </h5>
                          <div className="space-y-3">
                            {selectedLocation.aksara.map((scriptId) => {
                              const script = aksaraScripts.find(s => s.id === scriptId)
                              return script ? (
                                <motion.div 
                                  key={scriptId} 
                                  whileHover={{ scale: 1.02 }}
                                  className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300"
                                >
                                  <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center">
                                    <span className="text-xl text-white">{script.glyph}</span>
                                  </div>
                                  <div>
                                    <p className="font-medium text-white text-sm">{script.name}</p>
                                    <p className="text-xs text-white/70">{script.period}</p>
                                  </div>
                                </motion.div>
                              ) : null
                            })}
                          </div>
                        </div>
                      )}
                      
                      {selectedLocation.historicalPeriod && (
                        <div>
                          <h5 className="font-medium text-white mb-3 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Periode Sejarah
                          </h5>
                          <p className="text-sm text-white/80 bg-white/10 backdrop-blur-sm rounded-lg p-3">{selectedLocation.historicalPeriod}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin className="w-8 h-8 text-white/50" />
                      </div>
                      <p className="text-white/70 text-sm">
                        Pilih lokasi di peta untuk melihat informasi detail tentang aksara dan budaya setempat
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.div 
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl font-bold text-white">
                    {filteredLocations.length}
                  </div>
                </div>
                <p className="text-white/80 text-sm font-medium">Lokasi Budaya</p>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl font-bold text-white">
                    {regions.length}
                  </div>
                </div>
                <p className="text-white/80 text-sm font-medium">Wilayah</p>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl font-bold text-white">
                    {aksaraScripts.length}
                  </div>
                </div>
                <p className="text-white/80 text-sm font-medium">Sistem Aksara</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom decorative element */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center gap-3 text-white/60">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/30"></div>
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">Warisan Budaya Nusantara</span>
              <Sparkles className="w-5 h-5" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/30"></div>
            </div>
          </motion.div>
        </Container>
      </Section>
    </div>

  )
}
