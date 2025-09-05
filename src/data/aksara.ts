export interface AksaraScript {
  id: string
  name: string
  region: string
  glyph: string
  description: string
  origin: string
  status: 'active' | 'endangered' | 'revitalized'
  period: string
  category: 'brahmi' | 'arabic' | 'indigenous'
  writingSystem: string
  coordinates: [number, number]
  basicCharacters: string[]
  numbers: string[]
  examples: { word: string; meaning: string; script: string }[]
  history: string
  rules: string[]
}

export const aksaraScripts: AksaraScript[] = [
  {
    id: 'javanese',
    name: 'Aksara Jawa',
    region: 'Jawa Tengah & Jawa Timur',
    glyph: 'ꦲ',
    description: 'Aksara tradisional Jawa yang digunakan untuk menulis bahasa Jawa',
    origin: 'Abad ke-8 Masehi',
    status: 'revitalized',
    period: 'Klasik (8-15 M)',
    category: 'brahmi',
    writingSystem: 'Abugida',
    coordinates: [-7.7956, 110.3695],
    basicCharacters: ['ꦲ', 'ꦤ', 'ꦕ', 'ꦫ', 'ꦏ', 'ꦢ', 'ꦠ', 'ꦱ', 'ꦮ', 'ꦭ', 'ꦥ', 'ꦝ', 'ꦗ', 'ꦪ', 'ꦚ', 'ꦩ', 'ꦒ', 'ꦧ', 'ꦛ', 'ꦔ'],
    numbers: ['꧐', '꧑', '꧒', '꧓', '꧔', '꧕', '꧖', '꧗', '꧘', '꧙'],
    examples: [
      { word: 'ꦗꦮ', meaning: 'Jawa', script: 'jawa' },
      { word: 'ꦧꦸꦢꦪ', meaning: 'budaya', script: 'budaya' },
      { word: 'ꦲꦏ꧀ꦱꦫ', meaning: 'aksara', script: 'aksara' }
    ],
    history: 'Aksara Jawa berkembang dari aksara Kawi pada abad ke-8 Masehi. Digunakan secara luas di Jawa untuk menulis naskah-naskah sastra, hukum, dan keagamaan.',
    rules: [
      'Ditulis dari kiri ke kanan',
      'Menggunakan sistem pasangan untuk konsonan berurutan',
      'Vokal ditandai dengan sandhangan',
      'Tanda baca khusus untuk jeda dan akhir kalimat'
    ]
  },
  {
    id: 'sundanese',
    name: 'Aksara Sunda',
    region: 'Jawa Barat',
    glyph: 'ᮃ',
    description: 'Sistem tulisan tradisional untuk bahasa Sunda',
    origin: 'Abad ke-14 Masehi',
    status: 'revitalized',
    period: 'Pertengahan (14-16 M)',
    category: 'brahmi',
    writingSystem: 'Abugida',
    coordinates: [-6.9175, 107.6191],
    basicCharacters: ['ᮃ', 'ᮊ', 'ᮌ', 'ᮍ', 'ᮔ', 'ᮕ', 'ᮘ', 'ᮙ', 'ᮚ', 'ᮛ', 'ᮜ', 'ᮝ', 'ᮞ', 'ᮟ', 'ᮠ', 'ᮡ', 'ᮢ', 'ᮣ'],
    numbers: ['᮰', '᮱', '᮲', '᮳', '᮴', '᮵', '᮶', '᮷', '᮸', '᮹'],
    examples: [
      { word: 'ᮞᮥᮔ᮪ᮓ', meaning: 'Sunda', script: 'sunda' },
      { word: 'ᮘᮞ', meaning: 'bahasa', script: 'basa' },
      { word: 'ᮃᮊ᮪ᮞᮛ', meaning: 'aksara', script: 'aksara' }
    ],
    history: 'Aksara Sunda dikembangkan pada abad ke-14 dari aksara Kawi. Digunakan untuk menulis naskah-naskah Sunda kuno dan manuskrip keagamaan.',
    rules: [
      'Ditulis dari kiri ke kanan',
      'Setiap aksara dasar memiliki vokal inheren /a/',
      'Vokal lain ditandai dengan rarangkén',
      'Konsonan penutup menggunakan panyakra dan panyiku'
    ]
  },
  {
    id: 'balinese',
    name: 'Aksara Bali',
    region: 'Bali',
    glyph: 'ᬅ',
    description: 'Aksara suci yang digunakan dalam tradisi Hindu-Bali',
    origin: 'Abad ke-11 Masehi',
    status: 'active',
    period: 'Klasik (11-15 M)',
    category: 'brahmi',
    writingSystem: 'Abugida',
    coordinates: [-8.3405, 115.0920],
    basicCharacters: ['ᬅ', 'ᬓ', 'ᬔ', 'ᬕ', 'ᬖ', 'ᬗ', 'ᬘ', 'ᬙ', 'ᬚ', 'ᬛ', 'ᬜ', 'ᬝ', 'ᬞ', 'ᬟ', 'ᬠ', 'ᬡ', 'ᬢ', 'ᬣ'],
    numbers: ['᭐', '᭑', '᭒', '᭓', '᭔', '᭕', '᭖', '᭗', '᭘', '᭙'],
    examples: [
      { word: 'ᬩᬮᬶ', meaning: 'Bali', script: 'bali' },
      { word: 'ᬳᬶᬦ᭄ᬤᬸ', meaning: 'Hindu', script: 'hindu' },
      { word: 'ᬅᬓ᭄ᬱᬭ', meaning: 'aksara', script: 'aksara' }
    ],
    history: 'Aksara Bali berkembang dari aksara Kawi pada abad ke-11. Digunakan untuk menulis lontar suci, mantra, dan literatur Bali-Hindu.',
    rules: [
      'Ditulis dari kiri ke kanan',
      'Menggunakan pangangge untuk modifikasi vokal',
      'Adeg-adeg untuk menghilangkan vokal inheren',
      'Cecak dan surang untuk konsonan penutup'
    ]
  },
  {
    id: 'lontara',
    name: 'Aksara Lontara',
    region: 'Sulawesi Selatan',
    glyph: 'ᨕ',
    description: 'Aksara tradisional Bugis-Makassar',
    origin: 'Abad ke-17 Masehi',
    status: 'endangered',
    period: 'Modern Awal (17-19 M)',
    category: 'brahmi',
    writingSystem: 'Abugida',
    coordinates: [-5.1477, 119.4327],
    basicCharacters: ['ᨀ', 'ᨁ', 'ᨂ', 'ᨃ', 'ᨄ', 'ᨅ', 'ᨆ', 'ᨇ', 'ᨈ', 'ᨉ', 'ᨊ', 'ᨋ', 'ᨌ', 'ᨍ', 'ᨎ', 'ᨏ', 'ᨐ', 'ᨑ', 'ᨒ', 'ᨓ', 'ᨔ', 'ᨕ'],
    numbers: ['᨞', '᨟'],
    examples: [
      { word: 'ᨅᨘᨁᨗᨔ', meaning: 'Bugis', script: 'bugis' },
      { word: 'ᨒᨚᨊ᨞ᨈᨑ', meaning: 'lontara', script: 'lontara' },
      { word: 'ᨔᨘᨒᨓᨙᨔᨗ', meaning: 'Sulawesi', script: 'sulawesi' }
    ],
    history: 'Lontara dikembangkan pada abad ke-17 untuk menulis bahasa Bugis dan Makassar. Nama "lontara" berasal dari daun lontar yang digunakan sebagai media tulis.',
    rules: [
      'Ditulis dari kiri ke kanan',
      'Tidak ada spasi antar kata',
      'Vokal ditandai dengan diakritik',
      'Konsonan ganda menggunakan pengulangan'
    ]
  },
  {
    id: 'batak',
    name: 'Aksara Batak',
    region: 'Sumatera Utara',
    glyph: 'ᯀ',
    description: 'Sistem tulisan suku Batak untuk pustaha dan tradisi',
    origin: 'Abad ke-13 Masehi',
    status: 'endangered',
    period: 'Pertengahan (13-16 M)',
    category: 'brahmi',
    writingSystem: 'Abugida',
    coordinates: [2.5164, 99.0320],
    basicCharacters: ['ᯀ', 'ᯁ', 'ᯂ', 'ᯃ', 'ᯄ', 'ᯅ', 'ᯆ', 'ᯇ', 'ᯈ', 'ᯉ', 'ᯊ', 'ᯋ', 'ᯌ', 'ᯍ', 'ᯎ', 'ᯏ', 'ᯐ', 'ᯑ', 'ᯒ'],
    numbers: ['᯼', '᯽', '᯾', '᯿'],
    examples: [
      { word: 'ᯅᯖᯂ᯲', meaning: 'Batak', script: 'batak' },
      { word: 'ᯇᯩᯒᯘᯉ᯲', meaning: 'pustaha', script: 'pustaha' },
      { word: 'ᯀᯂ᯲ᯘᯒ', meaning: 'aksara', script: 'aksara' }
    ],
    history: 'Aksara Batak dikembangkan pada abad ke-13 dari aksara India Selatan. Digunakan untuk menulis pustaha (kitab tradisional) dan mantra-mantra dukun.',
    rules: [
      'Ditulis dari kiri ke kanan atau boustrophedon',
      'Setiap aksara memiliki vokal inheren /a/',
      'Anak huruf untuk vokal lain',
      'Pangolat untuk menghilangkan vokal'
    ]
  },
  {
    id: 'rejang',
    name: 'Aksara Rejang',
    region: 'Bengkulu',
    glyph: 'ꤰ',
    description: 'Aksara kuno suku Rejang di Bengkulu',
    origin: 'Abad ke-18 Masehi',
    status: 'endangered',
    period: 'Modern Awal (18-19 M)',
    category: 'brahmi',
    writingSystem: 'Abugida',
    coordinates: [-3.7928, 102.2608],
    basicCharacters: ['ꤰ', 'ꤱ', 'ꤲ', 'ꤳ', 'ꤴ', 'ꤵ', 'ꤶ', 'ꤷ', 'ꤸ', 'ꤹ', 'ꤺ', 'ꤻ', 'ꤼ', 'ꤽ', 'ꤾ', 'ꤿ', 'ꥀ', 'ꥁ', 'ꥂ'],
    numbers: ['ꥐ', 'ꥑ', 'ꥒ', '꥓', '꥔', '꥕', '꥖', '꥗', '꥘', '꥙'],
    examples: [
      { word: 'ꤽꥇꤶꤰꥏ', meaning: 'Rejang', script: 'rejang' },
      { word: 'ꤰꤰꥄꤿ', meaning: 'adat', script: 'adat' },
      { word: 'ꤰꤰꥄꤿꤰꥏ', meaning: 'aksara', script: 'aksara' }
    ],
    history: 'Aksara Rejang dikembangkan pada abad ke-18 oleh suku Rejang di Bengkulu. Digunakan untuk menulis adat istiadat dan cerita rakyat.',
    rules: [
      'Ditulis dari kiri ke kanan',
      'Vokal inheren /a/ pada setiap konsonan',
      'Diakritik untuk vokal lain',
      'Tidak ada huruf kapital'
    ]
  },
  {
    id: 'bugis',
    name: 'Aksara Bugis',
    region: 'Sulawesi Selatan',
    glyph: 'ᨆ',
    description: 'Varian aksara Lontara khusus untuk bahasa Bugis',
    origin: 'Abad ke-16 Masehi',
    status: 'endangered',
    period: 'Modern Awal (16-18 M)',
    category: 'brahmi',
    writingSystem: 'Abugida',
    coordinates: [-4.0435, 119.6213],
    basicCharacters: ['ᨀ', 'ᨁ', 'ᨂ', 'ᨃ', 'ᨄ', 'ᨅ', 'ᨆ', 'ᨇ', 'ᨈ', 'ᨉ', 'ᨊ', 'ᨋ', 'ᨌ', 'ᨍ', 'ᨎ', 'ᨏ', 'ᨐ', 'ᨑ', 'ᨒ', 'ᨓ', 'ᨔ', 'ᨕ'],
    numbers: ['᨞', '᨟'],
    examples: [
      { word: 'ᨅᨘᨁᨗ', meaning: 'Bugis', script: 'ugi' },
      { word: 'ᨅᨔ', meaning: 'bahasa', script: 'basa' },
      { word: 'ᨔᨘᨒ', meaning: 'surat', script: 'surat' }
    ],
    history: 'Varian khusus dari aksara Lontara yang dikembangkan untuk bahasa Bugis pada abad ke-16. Digunakan dalam naskah-naskah sastra dan sejarah Bugis.',
    rules: [
      'Identik dengan aturan Lontara',
      'Adaptasi khusus untuk fonologi Bugis',
      'Penggunaan diakritik yang spesifik',
      'Konvensi penulisan nama dan gelar'
    ]
  },
  {
    id: 'lampung',
    name: 'Aksara Lampung',
    region: 'Lampung',
    glyph: 'ꥆ',
    description: 'Had Lampung - aksara tradisional Lampung',
    origin: 'Abad ke-16 Masehi',
    status: 'endangered',
    period: 'Modern Awal (16-18 M)',
    category: 'brahmi',
    writingSystem: 'Abugida',
    coordinates: [-4.5585, 105.4068],
    basicCharacters: ['ꥆ', 'ꥇ', 'ꥈ', 'ꥉ', 'ꥊ', 'ꥋ', 'ꥌ', 'ꥍ', 'ꥎ', 'ꥏ', 'ꥐ', 'ꥑ', 'ꥒ', '꥓', '꥔', '꥕', '꥖', '꥗', '꥘'],
    numbers: ['꧐', '꧑', '꧒', '꧓', '꧔', '꧕', '꧖', '꧗', '꧘', '꧙'],
    examples: [
      { word: 'ꥆꥏꥉ꥓ꥏ', meaning: 'Lampung', script: 'lampung' },
      { word: 'ꥇꥆꥉ', meaning: 'had', script: 'had' },
      { word: 'ꥆꥇꥉ꥓', meaning: 'adat', script: 'adat' }
    ],
    history: 'Had Lampung atau Aksara Lampung dikembangkan pada abad ke-16. "Had" berarti "tulisan" dalam bahasa Lampung. Digunakan untuk menulis adat dan hukum tradisional.',
    rules: [
      'Ditulis dari kiri ke kanan',
      'Setiap aksara memiliki vokal inheren',
      'Tanda diakritik untuk vokal lain',
      'Penggunaan khusus dalam konteks adat'
    ]
  },
  {
    id: 'pegon',
    name: 'Aksara Pegon',
    region: 'Jawa & Madura',
    glyph: 'ڤ',
    description: 'Adaptasi aksara Arab untuk bahasa Jawa dan Madura',
    origin: 'Abad ke-15 Masehi',
    status: 'revitalized',
    period: 'Islam Awal (15-17 M)',
    category: 'arabic',
    writingSystem: 'Abjad yang dimodifikasi',
    coordinates: [-7.2575, 112.7521],
    basicCharacters: ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'و', 'ه', 'ي', 'ڤ', 'چ', 'ڠ', 'ڽ'],
    numbers: ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'],
    examples: [
      { word: 'جاوا', meaning: 'Jawa', script: 'jawa' },
      { word: 'ڤيڠون', meaning: 'pegon', script: 'pegon' },
      { word: 'اكسارا', meaning: 'aksara', script: 'aksara' }
    ],
    history: 'Pegon dikembangkan pada abad ke-15 sebagai adaptasi aksara Arab untuk menulis bahasa lokal Jawa dan Madura. Digunakan dalam pesantren dan literatur Islam Nusantara.',
    rules: [
      'Ditulis dari kanan ke kiri',
      'Adaptasi huruf Arab dengan tambahan huruf khusus',
      'Vokal ditandai dengan harakat',
      'Penggunaan dalam konteks keagamaan dan sastra'
    ]
  }
]

export const features = [
  {
    id: 'learn',
    title: 'Belajar',
    description: 'Pelajari sejarah dan struktur aksara Nusantara',
    icon: 'BookOpen'
  },
  {
    id: 'practice',
    title: 'Latihan Goresan',
    description: 'Praktik menulis dengan panduan interaktif',
    icon: 'PenTool'
  },
  {
    id: 'quiz',
    title: 'Kuis',
    description: 'Uji pemahaman dengan kuis interaktif',
    icon: 'Brain'
  },
  {
    id: 'atlas',
    title: 'Atlas Budaya',
    description: 'Jelajahi peta persebaran aksara',
    icon: 'Map'
  },
  {
    id: 'stories',
    title: 'Cerita & Folklor',
    description: 'Baca cerita tradisional dalam aksara asli',
    icon: 'Scroll'
  }
]

export const testimonials = [
  {
    name: 'Dr. Sari Wulandari',
    role: 'Peneliti Filologi UGM',
    quote: 'Platform ini membuat aksara Nusantara lebih mudah dipelajari generasi muda.'
  },
  {
    name: 'Pak Bambang Sutrisno',
    role: 'Guru Bahasa Jawa',
    quote: 'Metode interaktif yang sangat membantu dalam mengajar aksara Jawa.'
  },
  {
    name: 'Made Ayu Kartika',
    role: 'Pegiat Budaya Bali',
    quote: 'Preservasi digital yang indah untuk warisan leluhur kita.'
  }
]
