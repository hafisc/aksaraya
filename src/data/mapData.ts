export interface MapLocation {
  id: string
  name: string
  coordinates: [number, number]
  aksara: string[]
  description: string
  culturalStory: string
  historicalPeriod: string
  region: string
}

export const mapLocations: MapLocation[] = [
  {
    id: 'java-central',
    name: 'Jawa Tengah',
    coordinates: [-7.2575, 110.1739],
    aksara: ['javanese', 'pegon'],
    description: 'Pusat kebudayaan Jawa dengan tradisi aksara Jawa yang kuat',
    culturalStory: 'Di tanah Mataram ini, aksara Jawa berkembang pesat sejak era kerajaan. Para pujangga keraton menciptakan karya sastra agung menggunakan aksara hanacaraka.',
    historicalPeriod: 'Abad ke-8 - sekarang',
    region: 'Jawa Tengah'
  },
  {
    id: 'bali-denpasar',
    name: 'Bali',
    coordinates: [-8.3405, 115.0920],
    aksara: ['balinese'],
    description: 'Pulau dewata dengan tradisi aksara Bali yang masih hidup',
    culturalStory: 'Aksara Bali digunakan dalam lontar suci dan prasasti pura. Setiap huruf memiliki makna spiritual yang mendalam dalam tradisi Hindu-Dharma.',
    historicalPeriod: 'Abad ke-11 - sekarang',
    region: 'Bali'
  },
  {
    id: 'sumatra-palembang',
    name: 'Palembang',
    coordinates: [-2.9761, 104.7754],
    aksara: ['rejang', 'kaganga'],
    description: 'Bekas ibu kota Sriwijaya dengan warisan aksara kuno',
    culturalStory: 'Sebagai pusat maritim Nusantara, Palembang menjadi tempat bertemunya berbagai tradisi aksara. Prasasti Kedukan Bukit menjadi saksi kejayaan aksara Melayu kuno.',
    historicalPeriod: 'Abad ke-7 - sekarang',
    region: 'Sumatera Selatan'
  },
  {
    id: 'sulawesi-makassar',
    name: 'Makassar',
    coordinates: [-5.1477, 119.4327],
    aksara: ['bugis', 'makassar'],
    description: 'Pusat kebudayaan Bugis-Makassar dengan aksara Lontara',
    culturalStory: 'Aksara Lontara digunakan untuk menulis naskah I La Galigo, epos terpanjang di dunia. Setiap goresan menyimpan kebijaksanaan leluhur Bugis-Makassar.',
    historicalPeriod: 'Abad ke-13 - sekarang',
    region: 'Sulawesi Selatan'
  },
  {
    id: 'lombok-mataram',
    name: 'Lombok',
    coordinates: [-8.5833, 116.1167],
    aksara: ['sasak'],
    description: 'Pulau seribu masjid dengan aksara Sasak yang unik',
    culturalStory: 'Aksara Sasak berkembang dari pengaruh Jawa dan Arab. Digunakan dalam penulisan kitab-kitab agama dan sastra lokal yang mencerminkan kearifan Sasak.',
    historicalPeriod: 'Abad ke-16 - sekarang',
    region: 'Nusa Tenggara Barat'
  },
  {
    id: 'sumatra-medan',
    name: 'Medan',
    coordinates: [3.5952, 98.6722],
    aksara: ['batak'],
    description: 'Tanah Batak dengan sistem aksara pustaha yang sakral',
    culturalStory: 'Aksara Batak ditulis pada kulit kayu dan bambu untuk menyimpan mantra, ramalan, dan pengetahuan tradisional. Setiap datu (dukun) wajib menguasai aksara ini.',
    historicalPeriod: 'Abad ke-13 - sekarang',
    region: 'Sumatera Utara'
  },
  {
    id: 'kalimantan-banjarmasin',
    name: 'Banjarmasin',
    coordinates: [-3.3194, 114.5906],
    aksara: ['banjar'],
    description: 'Kota seribu sungai dengan tradisi aksara Arab-Melayu',
    culturalStory: 'Aksara Banjar berkembang dari pengaruh Islam dan perdagangan. Digunakan dalam hikayat dan syair yang menceritakan sejarah Kesultanan Banjar.',
    historicalPeriod: 'Abad ke-15 - sekarang',
    region: 'Kalimantan Selatan'
  },
  {
    id: 'papua-jayapura',
    name: 'Jayapura',
    coordinates: [-2.5489, 140.7197],
    aksara: ['papua'],
    description: 'Tanah Papua dengan sistem notasi tradisional yang unik',
    culturalStory: 'Meskipun tidak memiliki aksara tertulis tradisional, Papua memiliki sistem notasi dalam ukiran dan lukisan kulit kayu yang menyimpan sejarah dan mitos suku-suku Papua.',
    historicalPeriod: 'Tradisi lisan - sekarang',
    region: 'Papua'
  }
]

export const regionColors: Record<string, string> = {
  'Jawa Tengah': '#f6c453',
  'Bali': '#2f7a5b',
  'Sumatera Selatan': '#7a4b2f',
  'Sulawesi Selatan': '#1e1b4b',
  'Nusa Tenggara Barat': '#f6c453',
  'Sumatera Utara': '#2f7a5b',
  'Kalimantan Selatan': '#7a4b2f',
  'Papua': '#1e1b4b'
}
