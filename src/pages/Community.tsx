import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, Trophy, Target, Calendar, Star, Award, 
  TrendingUp, Users, Zap, BookOpen, 
  PenTool, Brain, Map, Share2, Medal
} from 'lucide-react'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { Heading } from '../components/ui/Heading'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { 
  sampleUser, 
  communityChallenges, 
  leaderboards, 
  badges,
  type CommunityChallenge,
  type Badge 
} from '../data/community'

export function Community() {
  const [activeTab, setActiveTab] = useState<'profile' | 'challenges' | 'leaderboard' | 'achievements'>('profile')

  const user = sampleUser
  const weeklyLeaderboard = leaderboards.find(l => l.period === 'weekly' && l.category === 'xp')

  const getRarityColor = (rarity: Badge['rarity']) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100'
      case 'rare': return 'text-blue-600 bg-blue-100'
      case 'epic': return 'text-purple-600 bg-purple-100'
      case 'legendary': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getDifficultyColor = (difficulty: CommunityChallenge['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'text-jade-tenun bg-jade-tenun/20'
      case 'medium': return 'text-giring-emas bg-giring-emas/20'
      case 'hard': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTypeIcon = (type: CommunityChallenge['type']) => {
    switch (type) {
      case 'practice': return <PenTool className="w-4 h-4" />
      case 'quiz': return <Brain className="w-4 h-4" />
      case 'story': return <BookOpen className="w-4 h-4" />
      case 'exploration': return <Map className="w-4 h-4" />
      default: return <Target className="w-4 h-4" />
    }
  }

  return (
    <Section className="min-h-screen">
      <Container>
        <div className="text-center mb-8">
          <Heading level={1} cultural className="mb-4">
            Komunitas Aksaraya
          </Heading>
          <p className="text-sogan-batik text-lg max-w-3xl mx-auto">
            Bergabunglah dengan komunitas pembelajar aksara Nusantara. 
            Lacak progres, ikuti tantangan, dan raih pencapaian bersama!
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gabus-pualam rounded-lg p-1">
            <Button
              variant={activeTab === 'profile' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('profile')}
            >
              <User className="w-4 h-4 mr-2" />
              Profil
            </Button>
            <Button
              variant={activeTab === 'challenges' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('challenges')}
            >
              <Target className="w-4 h-4 mr-2" />
              Tantangan
            </Button>
            <Button
              variant={activeTab === 'leaderboard' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('leaderboard')}
            >
              <Trophy className="w-4 h-4 mr-2" />
              Papan Skor
            </Button>
            <Button
              variant={activeTab === 'achievements' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('achievements')}
            >
              <Award className="w-4 h-4 mr-2" />
              Pencapaian
            </Button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              {/* User Header */}
              <Card className="p-8 mb-8 bg-gradient-to-r from-indigo-lurik to-jade-tenun text-white">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{user.displayName}</h2>
                    <p className="text-gabus-pualam/80 mb-2">@{user.username}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>Level {user.level}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="w-4 h-4" />
                        <span>{user.totalXP} XP</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{user.streak} hari berturut-turut</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Bagikan Profil
                  </Button>
                </div>
              </Card>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Statistics */}
                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold text-indigo-lurik mb-4 flex items-center gap-2">
                      <PenTool className="w-5 h-5" />
                      Statistik Latihan
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gabus-pualam rounded-lg">
                        <div className="text-2xl font-bold text-indigo-lurik">{user.practiceStats.totalSessions}</div>
                        <div className="text-sm text-sogan-batik">Sesi Latihan</div>
                      </div>
                      <div className="text-center p-3 bg-gabus-pualam rounded-lg">
                        <div className="text-2xl font-bold text-indigo-lurik">{user.practiceStats.averageAccuracy}%</div>
                        <div className="text-sm text-sogan-batik">Akurasi Rata-rata</div>
                      </div>
                      <div className="text-center p-3 bg-gabus-pualam rounded-lg">
                        <div className="text-2xl font-bold text-indigo-lurik">{user.practiceStats.totalStrokes}</div>
                        <div className="text-sm text-sogan-batik">Total Goresan</div>
                      </div>
                      <div className="text-center p-3 bg-gabus-pualam rounded-lg">
                        <div className="text-2xl font-bold text-indigo-lurik">{user.practiceStats.timeSpent}</div>
                        <div className="text-sm text-sogan-batik">Menit Berlatih</div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-bold text-indigo-lurik mb-4 flex items-center gap-2">
                      <Brain className="w-5 h-5" />
                      Statistik Kuis
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gabus-pualam rounded-lg">
                        <div className="text-2xl font-bold text-indigo-lurik">{user.quizStats.totalQuizzes}</div>
                        <div className="text-sm text-sogan-batik">Kuis Selesai</div>
                      </div>
                      <div className="text-center p-3 bg-gabus-pualam rounded-lg">
                        <div className="text-2xl font-bold text-indigo-lurik">{user.quizStats.averageScore}%</div>
                        <div className="text-sm text-sogan-batik">Skor Rata-rata</div>
                      </div>
                      <div className="text-center p-3 bg-gabus-pualam rounded-lg">
                        <div className="text-2xl font-bold text-indigo-lurik">{user.quizStats.totalCorrect}</div>
                        <div className="text-sm text-sogan-batik">Jawaban Benar</div>
                      </div>
                      <div className="text-center p-3 bg-gabus-pualam rounded-lg">
                        <div className="text-2xl font-bold text-indigo-lurik">{user.quizStats.streakRecord}</div>
                        <div className="text-sm text-sogan-batik">Streak Terbaik</div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Badges & Progress */}
                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold text-indigo-lurik mb-4 flex items-center gap-2">
                      <Medal className="w-5 h-5" />
                      Lencana ({user.badges.length})
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {user.badges.map((badge) => (
                        <div
                          key={badge.id}
                          className={`p-3 rounded-lg text-center ${getRarityColor(badge.rarity)}`}
                        >
                          <div className="text-2xl mb-1">{badge.icon}</div>
                          <div className="text-xs font-medium">{badge.name}</div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-bold text-indigo-lurik mb-4">Progres Pencapaian</h3>
                    <div className="space-y-4">
                      {user.achievements.map((achievement) => (
                        <div key={achievement.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium text-sogan-batik">{achievement.name}</h4>
                            <span className="text-sm text-sogan-batik">
                              {achievement.progress}/{achievement.maxProgress}
                            </span>
                          </div>
                          <div className="w-full bg-gabus-pualam rounded-full h-2">
                            <div 
                              className="bg-giring-emas h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                            />
                          </div>
                          <p className="text-xs text-sogan-batik">{achievement.description}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'challenges' && (
            <motion.div
              key="challenges"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {communityChallenges.map((challenge, index) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(challenge.type)}
                          <h3 className="font-bold text-indigo-lurik">{challenge.title}</h3>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty}
                        </span>
                      </div>

                      <p className="text-sm text-sogan-batik mb-4 line-clamp-2">
                        {challenge.description}
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1 text-sogan-batik">
                            <Users className="w-3 h-3" />
                            <span>{challenge.participants} peserta</span>
                          </div>
                          <div className="flex items-center gap-1 text-sogan-batik">
                            <Calendar className="w-3 h-3" />
                            <span>Berakhir {new Date(challenge.endDate).toLocaleDateString('id-ID')}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm">
                            <Zap className="w-3 h-3 text-giring-emas" />
                            <span className="text-sogan-batik">{challenge.rewards.xp} XP</span>
                          </div>
                          <Button size="sm" variant="primary">
                            Ikut Tantangan
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="p-6">
                <h3 className="text-xl font-bold text-indigo-lurik mb-6 text-center flex items-center justify-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Papan Skor Mingguan - XP
                </h3>
                
                <div className="space-y-3">
                  {weeklyLeaderboard?.users.map((entry, index) => (
                    <motion.div
                      key={entry.userId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-4 p-4 rounded-lg ${
                        entry.userId === user.id ? 'bg-giring-emas/20 border border-giring-emas' : 'bg-gabus-pualam'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        entry.rank === 1 ? 'bg-yellow-500 text-white' :
                        entry.rank === 2 ? 'bg-gray-400 text-white' :
                        entry.rank === 3 ? 'bg-amber-600 text-white' :
                        'bg-sogan-batik text-white'
                      }`}>
                        {entry.rank}
                      </div>
                      
                      <div className="w-10 h-10 bg-indigo-lurik/20 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-indigo-lurik" />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-medium text-indigo-lurik">{entry.displayName}</h4>
                        <p className="text-sm text-sogan-batik">@{entry.username}</p>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold text-indigo-lurik">{entry.score} XP</div>
                        <div className={`text-xs flex items-center gap-1 ${
                          entry.change > 0 ? 'text-jade-tenun' : 
                          entry.change < 0 ? 'text-red-500' : 'text-sogan-batik'
                        }`}>
                          <TrendingUp className="w-3 h-3" />
                          {entry.change > 0 ? '+' : ''}{entry.change}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {badges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`p-6 text-center ${
                      user.badges.some(b => b.id === badge.id) ? 'bg-gradient-to-br from-giring-emas/20 to-jade-tenun/20' : 'opacity-60'
                    }`}>
                      <div className="text-4xl mb-3">{badge.icon}</div>
                      <h3 className="font-bold text-indigo-lurik mb-2">{badge.name}</h3>
                      <p className="text-sm text-sogan-batik mb-3">{badge.description}</p>
                      <span className={`px-3 py-1 text-xs rounded-full ${getRarityColor(badge.rarity)}`}>
                        {badge.rarity}
                      </span>
                      {user.badges.some(b => b.id === badge.id) && (
                        <div className="mt-3 text-xs text-jade-tenun font-medium">
                          ✓ Terbuka
                        </div>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  )
}
