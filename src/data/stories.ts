export interface Story {
  id: string
  title: string
  titleOriginal: string
  aksara: string
  region: string
  category: 'folklore' | 'legend' | 'myth' | 'historical'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  summary: string
  moralLesson: string
  culturalContext: string
  originalText: string
  transliteration: string
  translation: string
  audioUrl?: string
  imageUrl?: string
  characters: StoryCharacter[]
}

export interface StoryCharacter {
  name: string
  nameOriginal: string
  role: string
  description: string
}

export const stories: Story[] = [
  {
    id: 'malin-kundang',
    title: 'Malin Kundang',
    titleOriginal: 'ملين كوندڠ',
    aksara: 'jawi',
    region: 'Sumatera Barat',
    category: 'folklore',
    difficulty: 'beginner',
    summary: 'Kisah seorang anak yang durhaka kepada ibunya dan dikutuk menjadi batu.',
    moralLesson: 'Pentingnya berbakti kepada orang tua dan tidak melupakan asal-usul.',
    culturalContext: 'Cerita ini mengajarkan nilai-nilai Minangkabau tentang hormat kepada orang tua dan konsekuensi dari sifat sombong.',
    originalText: 'دهولو كالا اد سأورڠ ڤرمڤوان مسكين برنام مندى كونيڠ. ايا ممڤوڽاي سأورڠ انق لاكي لاكي برنام ملين كوندڠ.',
    transliteration: 'Dahulu kala ada seorang perempuan miskin bernama Mande Kuning. Ia mempunyai seorang anak laki-laki bernama Malin Kundang.',
    translation: 'Once upon a time there was a poor woman named Mande Kuning. She had a son named Malin Kundang.',
    characters: [
      {
        name: 'Malin Kundang',
        nameOriginal: 'ملين كوندڠ',
        role: 'Protagonis',
        description: 'Anak laki-laki yang merantau dan menjadi kaya namun menyangkal ibunya'
      },
      {
        name: 'Mande Kuning',
        nameOriginal: 'مندى كونيڠ',
        role: 'Ibu',
        description: 'Ibu yang miskin namun penyayang, dikutuk anaknya'
      }
    ]
  },
  {
    id: 'sangkuriang',
    title: 'Sangkuriang',
    titleOriginal: 'ᮞᮀᮊᮥᮛᮤᮀ',
    aksara: 'sundanese',
    region: 'Jawa Barat',
    category: 'legend',
    difficulty: 'intermediate',
    summary: 'Legenda asal mula Gunung Tangkuban Perahu dan Danau Bandung.',
    moralLesson: 'Akibat dari nafsu dan ketidaksabaran yang berujung pada kehancuran.',
    culturalContext: 'Cerita ini menjelaskan formasi geografis Bandung menurut kepercayaan Sunda dan mengajarkan tentang konsekuensi dari melanggar tabu.',
    originalText: 'ᮞᮀᮊᮥᮛᮤᮀ ᮏᮨᮜᮨᮙ ᮞᮧᮛᮀ ᮞᮊᮒᮤ ᮔᮥ ᮞᮊᮒᮤ ᮞᮥᮊ ᮘᮥᮛᮥ. ᮔᮙᮤᮔ ᮃᮚᮔ ᮞᮀᮊᮥᮛᮤᮀ ᮏᮨᮜᮨᮙ ᮞᮧᮛᮀ ᮞᮊᮒᮤ ᮔᮥ ᮌᮩᮞ ᮔᮀ ᮞᮥᮊ ᮘᮥᮛᮥ.',
    transliteration: 'Sangkuriang jelem sorang sakti nu sakti suk buru. Namin naon Sangkuriang jelem sorang sakti nu geus nang suk buru.',
    translation: 'Sangkuriang was a powerful young man who liked to hunt. But what happened was that Sangkuriang was a powerful young man who was already skilled at hunting.',
    characters: [
      {
        name: 'Sangkuriang',
        nameOriginal: 'ᮞᮀᮊᮥᮛᮤᮀ',
        role: 'Protagonis',
        description: 'Pemuda sakti yang jatuh cinta pada ibunya sendiri tanpa menyadarinya'
      },
      {
        name: 'Dayang Sumbi',
        nameOriginal: 'ᮓᮚᮀ ᮞᮥᮙ᮪ᮘᮤ',
        role: 'Ibu/Kekasih',
        description: 'Wanita cantik yang tetap awet muda karena kutukan'
      }
    ]
  },
  {
    id: 'calon-arang',
    title: 'Calon Arang',
    titleOriginal: 'ꦕꦭꦺꦴꦤ꧀ꦄꦫꦁ',
    aksara: 'javanese',
    region: 'Jawa Timur',
    category: 'legend',
    difficulty: 'advanced',
    summary: 'Kisah seorang janda tua yang menguasai ilmu hitam dan meneror Kerajaan Airlangga.',
    moralLesson: 'Kekuatan harus digunakan untuk kebaikan, bukan untuk balas dendam dan kejahatan.',
    culturalContext: 'Cerita ini berasal dari era Kerajaan Kediri dan mengajarkan tentang keseimbangan antara kekuatan spiritual dan moral.',
    originalText: 'ꦲꦤ꧀ꦠꦸꦏ꧀ꦕꦭꦺꦴꦤ꧀ꦄꦫꦁꦶꦁꦝꦸꦏꦸꦃꦒꦶꦫꦁ꧈ꦱꦏ꧀ꦠꦶꦤ꧀ꦝꦸꦏꦸꦃꦒꦶꦫꦁꦩꦚ꧀ꦝꦶꦫꦶꦁꦠꦤꦃꦗꦮ꧉',
    transliteration: 'Antuk Calon Arang ing dukuh Girah, sakti ndukuh Girah mandhiri ing tanah Jawa.',
    translation: 'About Calon Arang in the village of Girah, the powerful village of Girah stands independently in the land of Java.',
    characters: [
      {
        name: 'Calon Arang',
        nameOriginal: 'ꦕꦭꦺꦴꦤ꧀ꦄꦫꦁ',
        role: 'Antagonis',
        description: 'Janda tua yang menguasai ilmu hitam dan menyebarkan wabah'
      },
      {
        name: 'Mpu Bharada',
        nameOriginal: 'ꦩ꧀ꦥꦸꦨꦫꦢ',
        role: 'Guru Spiritual',
        description: 'Pendeta yang mengalahkan Calon Arang dengan kekuatan spiritual'
      }
    ]
  },
  {
    id: 'i-la-galigo',
    title: 'I La Galigo',
    titleOriginal: 'ᨕᨗ ᨒ ᨁᨒᨗᨁᨚ',
    aksara: 'bugis',
    region: 'Sulawesi Selatan',
    category: 'myth',
    difficulty: 'advanced',
    summary: 'Epos terpanjang di dunia yang menceritakan asal-usul dunia menurut kepercayaan Bugis.',
    moralLesson: 'Keseimbangan antara dunia atas, tengah, dan bawah dalam kosmologi Bugis.',
    culturalContext: 'Karya sastra terbesar Bugis yang menggambarkan kosmologi dan nilai-nilai budaya Sulawesi Selatan.',
    originalText: 'ᨕᨗᨊᨗᨊᨗ ᨈᨚ ᨁᨒᨗᨁᨚ ᨑᨗ ᨒᨗᨊᨚ ᨈᨚᨑᨗᨚᨒᨚ ᨊᨚᨄᨚᨒᨗ ᨑᨗ ᨄᨚᨈᨚᨊᨗ ᨊᨚᨄᨚᨒᨗ ᨑᨗ ᨕᨒᨗᨓᨙ',
    transliteration: 'Inanini to Galigo ri lino toriolo napolli ri patani napolli ri aliwe',
    translation: 'This is the story of Galigo in the world of the past, born in the east and born in the west',
    characters: [
      {
        name: 'Sawerigading',
        nameOriginal: 'ᨔᨓᨙᨑᨗᨁᨉᨗᨊ',
        role: 'Pahlawan',
        description: 'Putra dewa yang menjelajahi dunia untuk mencari jodohnya'
      },
      {
        name: 'We Tenriabeng',
        nameOriginal: 'ᨓᨙ ᨈᨙᨊᨑᨗᨕᨅᨙᨊ',
        role: 'Putri',
        description: 'Saudara kembar Sawerigading yang menjadi cinta sejatinya'
      }
    ]
  },
  {
    id: 'ni-diah-tantri',
    title: 'Ni Diah Tantri',
    titleOriginal: 'ᬦᬶᬤᬶᬳᬢᬦ᭄ᬢ᭄ᬭᬶ',
    aksara: 'balinese',
    region: 'Bali',
    category: 'folklore',
    difficulty: 'intermediate',
    summary: 'Kisah seorang putri cerdik yang menyelamatkan kerajaan dengan cerita-ceritanya.',
    moralLesson: 'Kecerdasan dan kebijaksanaan dapat mengalahkan kekuatan dan kekejaman.',
    culturalContext: 'Adaptasi Bali dari kisah Seribu Satu Malam yang mengajarkan nilai-nilai Hindu-Dharma.',
    originalText: 'ᬳᬦ᭄ᬢᬸᬓ᭄ᬦᬶᬤᬶᬳᬢᬦ᭄ᬢ᭄ᬭᬶᬲᬦ᭄ᬤᬶᬧᬸᬢ᭄ᬭᬶᬭᬢᬸᬦᬦ᭄ᬤᬦᬧᬸᬦᬶᬓᬵᬓᬸᬦ᭄ᬤᬦ᭄',
    transliteration: 'Antuk Ni Diah Tantri sandi putri ratu nandan puni kakundan',
    translation: 'About Ni Diah Tantri, the wise princess of the king who was also beautiful',
    characters: [
      {
        name: 'Ni Diah Tantri',
        nameOriginal: 'ᬦᬶᬤᬶᬳᬢᬦ᭄ᬢ᭄ᬭᬶ',
        role: 'Protagonis',
        description: 'Putri cerdik yang menyelamatkan kerajaan dengan bercerita'
      },
      {
        name: 'Prabu Jayendriya',
        nameOriginal: 'ᬧ᭄ᬭᬪᬸᬚᬬᬾᬦ᭄ᬤ᭄ᬭᬶᬬ',
        role: 'Raja',
        description: 'Raja yang kejam namun akhirnya berubah karena cerita Tantri'
      }
    ]
  }
]

export const storyCategories = [
  { id: 'folklore', name: 'Cerita Rakyat', description: 'Cerita tradisional yang diwariskan turun-temurun' },
  { id: 'legend', name: 'Legenda', description: 'Cerita yang menjelaskan asal-usul tempat atau fenomena alam' },
  { id: 'myth', name: 'Mitos', description: 'Cerita tentang dewa-dewa dan asal-usul dunia' },
  { id: 'historical', name: 'Sejarah', description: 'Cerita berdasarkan peristiwa sejarah' }
]

export const difficultyLevels = [
  { id: 'beginner', name: 'Pemula', description: 'Cerita sederhana dengan aksara dasar' },
  { id: 'intermediate', name: 'Menengah', description: 'Cerita dengan kompleksitas aksara sedang' },
  { id: 'advanced', name: 'Mahir', description: 'Cerita kompleks dengan aksara lengkap' }
]
