export interface UserProfile {
  id: string
  username: string
  displayName: string
  avatar?: string
  joinDate: string
  level: number
  totalXP: number
  streak: number
  badges: Badge[]
  achievements: Achievement[]
  favoriteAksara: string[]
  completedStories: string[]
  practiceStats: PracticeStats
  quizStats: QuizStats
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlockedAt: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  progress: number
  maxProgress: number
  category: 'practice' | 'quiz' | 'story' | 'exploration' | 'social'
  reward: {
    xp: number
    badge?: string
  }
}

export interface PracticeStats {
  totalSessions: number
  totalStrokes: number
  averageAccuracy: number
  bestAccuracy: number
  timeSpent: number // in minutes
  scriptsLearned: string[]
}

export interface QuizStats {
  totalQuizzes: number
  totalCorrect: number
  totalIncorrect: number
  averageScore: number
  bestScore: number
  streakRecord: number
}

export interface CommunityChallenge {
  id: string
  title: string
  description: string
  type: 'practice' | 'quiz' | 'story' | 'exploration'
  difficulty: 'easy' | 'medium' | 'hard'
  startDate: string
  endDate: string
  participants: number
  rewards: {
    xp: number
    badge?: string
  }
  requirements: {
    target: number
    metric: string
  }
}

export interface Leaderboard {
  period: 'daily' | 'weekly' | 'monthly' | 'all-time'
  category: 'xp' | 'practice' | 'quiz' | 'stories'
  users: LeaderboardEntry[]
}

export interface LeaderboardEntry {
  rank: number
  userId: string
  username: string
  displayName: string
  avatar?: string
  score: number
  change: number // position change from previous period
}

// Sample data
export const sampleUser: UserProfile = {
  id: 'user-1',
  username: 'aksara_explorer',
  displayName: 'Penjelajah Aksara',
  avatar: '/avatars/default.png',
  joinDate: '2024-01-15',
  level: 12,
  totalXP: 2450,
  streak: 7,
  badges: [
    {
      id: 'first-steps',
      name: 'Langkah Pertama',
      description: 'Menyelesaikan latihan pertama',
      icon: '🎯',
      rarity: 'common',
      unlockedAt: '2024-01-15'
    },
    {
      id: 'story-lover',
      name: 'Pecinta Cerita',
      description: 'Membaca 5 cerita tradisional',
      icon: '📚',
      rarity: 'rare',
      unlockedAt: '2024-02-01'
    },
    {
      id: 'javanese-master',
      name: 'Ahli Jawa',
      description: 'Menguasai aksara Jawa',
      icon: '🏆',
      rarity: 'epic',
      unlockedAt: '2024-02-15'
    }
  ],
  achievements: [
    {
      id: 'practice-warrior',
      name: 'Pejuang Latihan',
      description: 'Selesaikan 100 sesi latihan',
      progress: 75,
      maxProgress: 100,
      category: 'practice',
      reward: { xp: 500, badge: 'practice-master' }
    },
    {
      id: 'quiz-champion',
      name: 'Juara Kuis',
      description: 'Raih skor sempurna 10 kali',
      progress: 6,
      maxProgress: 10,
      category: 'quiz',
      reward: { xp: 300, badge: 'quiz-master' }
    }
  ],
  favoriteAksara: ['javanese', 'balinese', 'sundanese'],
  completedStories: ['malin-kundang', 'sangkuriang'],
  practiceStats: {
    totalSessions: 75,
    totalStrokes: 1250,
    averageAccuracy: 87.5,
    bestAccuracy: 96.2,
    timeSpent: 420,
    scriptsLearned: ['javanese', 'balinese', 'sundanese', 'bugis']
  },
  quizStats: {
    totalQuizzes: 45,
    totalCorrect: 380,
    totalIncorrect: 70,
    averageScore: 84.4,
    bestScore: 100,
    streakRecord: 12
  }
}

export const communityChallenges: CommunityChallenge[] = [
  {
    id: 'weekly-practice',
    title: 'Tantangan Latihan Mingguan',
    description: 'Selesaikan 10 sesi latihan dalam seminggu',
    type: 'practice',
    difficulty: 'medium',
    startDate: '2024-09-02',
    endDate: '2024-09-08',
    participants: 234,
    rewards: { xp: 200, badge: 'weekly-warrior' },
    requirements: { target: 10, metric: 'practice_sessions' }
  },
  {
    id: 'story-marathon',
    title: 'Maraton Cerita Nusantara',
    description: 'Baca 3 cerita dari daerah berbeda',
    type: 'story',
    difficulty: 'easy',
    startDate: '2024-09-01',
    endDate: '2024-09-30',
    participants: 156,
    rewards: { xp: 150, badge: 'story-explorer' },
    requirements: { target: 3, metric: 'stories_read' }
  },
  {
    id: 'aksara-master',
    title: 'Penguasa Aksara',
    description: 'Raih akurasi 90% di 5 aksara berbeda',
    type: 'practice',
    difficulty: 'hard',
    startDate: '2024-09-01',
    endDate: '2024-09-15',
    participants: 89,
    rewards: { xp: 500, badge: 'aksara-master' },
    requirements: { target: 5, metric: 'scripts_mastered' }
  }
]

export const leaderboards: Leaderboard[] = [
  {
    period: 'weekly',
    category: 'xp',
    users: [
      { rank: 1, userId: 'user-2', username: 'aksara_ninja', displayName: 'Ninja Aksara', score: 1250, change: 2 },
      { rank: 2, userId: 'user-1', username: 'aksara_explorer', displayName: 'Penjelajah Aksara', score: 980, change: -1 },
      { rank: 3, userId: 'user-3', username: 'budaya_lover', displayName: 'Pecinta Budaya', score: 875, change: 1 },
      { rank: 4, userId: 'user-4', username: 'nusantara_fan', displayName: 'Penggemar Nusantara', score: 720, change: 0 },
      { rank: 5, userId: 'user-5', username: 'script_master', displayName: 'Master Aksara', score: 650, change: -2 }
    ]
  }
]

export const badges: Badge[] = [
  {
    id: 'first-steps',
    name: 'Langkah Pertama',
    description: 'Menyelesaikan latihan pertama',
    icon: '🎯',
    rarity: 'common',
    unlockedAt: ''
  },
  {
    id: 'story-lover',
    name: 'Pecinta Cerita',
    description: 'Membaca 5 cerita tradisional',
    icon: '📚',
    rarity: 'rare',
    unlockedAt: ''
  },
  {
    id: 'javanese-master',
    name: 'Ahli Jawa',
    description: 'Menguasai aksara Jawa',
    icon: '🏆',
    rarity: 'epic',
    unlockedAt: ''
  },
  {
    id: 'practice-master',
    name: 'Master Latihan',
    description: 'Selesaikan 100 sesi latihan',
    icon: '💪',
    rarity: 'epic',
    unlockedAt: ''
  },
  {
    id: 'quiz-master',
    name: 'Master Kuis',
    description: 'Raih skor sempurna 10 kali',
    icon: '🧠',
    rarity: 'legendary',
    unlockedAt: ''
  }
]
