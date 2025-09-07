import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { motion } from 'framer-motion'
import { MapPin, Book, Clock, Globe } from 'lucide-react'
import L from 'leaflet'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { Heading } from '../components/ui/Heading'
import { Button } from '../components/ui/Button'
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
    <Section className="min-h-screen">
      <Container>
        <div className="text-center mb-8">
          <Heading level={1} cultural className="mb-4">
            Atlas Budaya Nusantara
          </Heading>
          <p className="text-sogan-batik text-lg max-w-3xl mx-auto">
            Jelajahi persebaran aksara tradisional di seluruh Nusantara. 
            Setiap titik menyimpan cerita budaya yang telah mengakar selama berabad-abad.
          </p>
        </div>

        {/* Region Filter */}
        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          <Button
            variant={activeRegion === null ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setActiveRegion(null)}
          >
            Semua Wilayah
          </Button>
          {regions.map((region) => (
            <Button
              key={region}
              variant={activeRegion === region ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setActiveRegion(region)}
              className="text-sm"
            >
              {region}
            </Button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gabus-pualam"
            >
              <div className="h-[500px] relative">
                <MapContainer
                  center={[-2.5, 118]}
                  zoom={5}
                  style={{ height: '100%', width: '100%' }}
                  className="rounded-xl"
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

          {/* Location Details */}
          <div className="space-y-6">
            {selectedLocation ? (
              <motion.div
                key={selectedLocation.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#592B18] p-6 rounded-xl shadow-lg border border-white/20"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div 
                    className="w-4 h-4 rounded-full mt-1 border-2 border-white shadow-sm"
                    style={{ backgroundColor: regionColors[selectedLocation.region] }}
                  />
                  <div>
                    <h3 className="text-xl font-bold text-indigo-lurik mb-1">
                      {selectedLocation.name}
                    </h3>
                    <p className="text-sogan-batik text-sm">{selectedLocation.region}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-jade-tenun mt-0.5" />
                    <p className="text-sm text-sogan-batik">{selectedLocation.description}</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-jade-tenun mt-0.5" />
                    <p className="text-sm text-sogan-batik">{selectedLocation.historicalPeriod}</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <Book className="w-5 h-5 text-jade-tenun mt-0.5" />
                    <div>
                      <p className="text-sm text-sogan-batik mb-2">Aksara yang digunakan:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedLocation.aksara.map((script) => {
                          const aksaraData = aksaraScripts.find(a => a.id === script)
                          return (
                            <span
                              key={script}
                              className="px-3 py-1 bg-giring-emas text-indigo-lurik text-sm rounded-full font-medium"
                            >
                              {aksaraData?.name || script}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-indigo-lurik mb-2 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Cerita Budaya
                    </h4>
                    <p className="text-sm text-sogan-batik leading-relaxed">
                      {selectedLocation.culturalStory}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gradient-to-br from-gabus-pualam to-white p-6 rounded-xl shadow-lg border border-giring-emas/20 text-center"
              >
                <MapPin className="w-12 h-12 text-jade-tenun mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-indigo-lurik mb-2">
                  Pilih Lokasi di Peta
                </h3>
                <p className="text-sogan-batik text-sm">
                  Klik pada titik-titik di peta untuk melihat cerita budaya dan sejarah aksara di wilayah tersebut.
                </p>
              </motion.div>
            )}

            {/* Legend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-4 rounded-xl shadow-lg border border-gabus-pualam"
            >
              <h4 className="font-semibold text-indigo-lurik mb-3">Legenda Wilayah</h4>
              <div className="space-y-2">
                {regions.map((region) => (
                  <div key={region} className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: regionColors[region] }}
                    />
                    <span className="text-sm text-sogan-batik">{region}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Cultural Heritage Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-indigo-lurik to-jade-tenun p-8 rounded-2xl text-white"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Warisan Budaya Nusantara</h3>
            <p className="text-gabus-pualam/90 max-w-3xl mx-auto leading-relaxed">
              Setiap aksara di Nusantara adalah cerminan kekayaan budaya yang tak ternilai. 
              Dari Sabang hingga Merauke, tradisi tulis-menulis telah menjadi jembatan 
              penghubung antar generasi, menyimpan kebijaksanaan leluhur dalam setiap goresan.
            </p>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
