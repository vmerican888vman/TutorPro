import { useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useAuthStore } from '@/stores/authStore'
import { getPracticeSessions } from '@/lib/database'
import { colors, spacing, radius } from '@/theme'
import { Ionicons } from '@expo/vector-icons'

export default function DashboardScreen() {
  const { profile, isPro, isTrialActive, trialDaysRemaining } = useAuthStore()
  const [stats, setStats] = useState({ questionsAnswered: 0, streak: 0, estScore: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (profile?.id) loadStats()
  }, [profile?.id])

  const loadStats = async () => {
    try {
      if (!profile?.id) return
      const { data } = await getPracticeSessions(profile.id)
      if (data) {
        const totalQ = data.reduce((sum: number, s: { total_questions?: number; total_score?: number }) => sum + (s.total_questions || 0), 0)
        const totalCorrect = data.reduce((sum: number, s: { total_questions?: number; total_score?: number }) => sum + (s.total_score || 0), 0)
        const pct = totalQ > 0 ? totalCorrect / totalQ : 0
        setStats({
          questionsAnswered: totalQ,
          streak: Math.min(data.length, 30),
          estScore: Math.round(400 + pct * 1200),
        })
      }
    } catch (e) {
      // Silently fail — stats will show defaults
    } finally {
      setLoading(false)
    }
  }

  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  const actions = [
    { title: 'Practice', desc: 'Question sets', icon: 'book' as const, route: '/(tabs)/practice', color: colors.mathPurple },
    { title: 'AI Tutor', desc: 'Ask anything', icon: 'chatbubble-ellipses' as const, route: '/(tabs)/tutor', color: colors.gold },
    { title: 'Progress', desc: 'Your stats', icon: 'stats-chart' as const, route: '/(tabs)/progress', color: colors.readingGreen },
    { title: 'Diagnostic', desc: 'Free test', icon: 'clipboard' as const, route: '/diagnostic', color: colors.writingYellow },
  ]

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        {/* Greeting */}
        <Text style={{ color: colors.white, fontSize: 24, fontWeight: '700' }}>
          {greeting()}, {profile?.full_name?.split(' ')[0] || 'Student'}
        </Text>

        {/* Trial banner */}
        {isTrialActive() && (
          <View style={{
            backgroundColor: colors.goldDim, borderRadius: radius.md, padding: spacing.md,
            marginTop: spacing.md, borderWidth: 1, borderColor: colors.goldBorder,
            flexDirection: 'row', alignItems: 'center',
          }}>
            <Ionicons name="time" size={20} color={colors.gold} style={{ marginRight: spacing.sm }} />
            <Text style={{ color: colors.gold, fontSize: 13, flex: 1 }}>
              Free trial: {trialDaysRemaining()} days remaining
            </Text>
          </View>
        )}

        {/* Stats row */}
        <View style={{ flexDirection: 'row', marginTop: spacing.lg, gap: spacing.sm }}>
          {[
            { label: 'Streak', value: `${stats.streak} ${stats.streak === 1 ? 'day' : 'days'}`, icon: 'flame' as const, color: colors.flame },
            { label: 'Answered', value: `${stats.questionsAnswered}`, icon: 'help-circle' as const, color: colors.mathPurple },
            { label: 'Est. SAT', value: `${stats.estScore || '—'}`, icon: 'trophy' as const, color: colors.gold },
          ].map((stat) => (
            <View key={stat.label} style={{
              flex: 1, backgroundColor: colors.cardBg, padding: spacing.md, borderRadius: radius.md,
              alignItems: 'center', borderWidth: 1, borderColor: colors.border,
            }}>
              <Ionicons name={stat.icon} size={22} color={stat.color} />
              <Text style={{ color: colors.white, fontSize: 18, fontWeight: '700', marginTop: 6 }}>
                {stat.value}
              </Text>
              <Text style={{ color: colors.muted, fontSize: 11 }}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Quick actions */}
        <Text style={{ color: colors.white, fontSize: 18, fontWeight: '600', marginTop: spacing.xl, marginBottom: spacing.md }}>
          Quick Actions
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
          {actions.map((action) => (
            <TouchableOpacity
              key={action.title}
              style={{
                width: '48%', backgroundColor: colors.cardBg, padding: spacing.md,
                borderRadius: radius.md, borderWidth: 1, borderColor: colors.border,
              }}
              onPress={() => router.push(action.route as any)}
              accessibilityLabel={`${action.title}: ${action.desc}`}
              accessibilityRole="button"
            >
              <View style={{
                width: 44, height: 44, borderRadius: radius.sm, backgroundColor: action.color + '15',
                justifyContent: 'center', alignItems: 'center', marginBottom: spacing.sm,
              }}>
                <Ionicons name={action.icon} size={22} color={action.color} />
              </View>
              <Text style={{ color: colors.white, fontSize: 15, fontWeight: '600' }}>{action.title}</Text>
              <Text style={{ color: colors.muted, fontSize: 12, marginTop: 2 }}>{action.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Category mastery */}
        <Text style={{ color: colors.white, fontSize: 18, fontWeight: '600', marginTop: spacing.xl, marginBottom: spacing.md }}>
          Category Mastery
        </Text>
        {[
          { label: 'Math', color: colors.mathPurple, pct: 0 },
          { label: 'Reading', color: colors.readingGreen, pct: 0 },
          { label: 'Writing', color: colors.writingYellow, pct: 0 },
        ].map((cat) => (
          <View key={cat.label} style={{
            backgroundColor: colors.cardBg, padding: spacing.md, borderRadius: radius.md,
            marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border,
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={{ color: cat.color, fontWeight: '600' }}>{cat.label}</Text>
              <Text style={{ color: colors.muted, fontSize: 13 }}>Start practicing</Text>
            </View>
            <View style={{ height: 6, backgroundColor: colors.border, borderRadius: 3 }}>
              <View style={{ height: 6, backgroundColor: cat.color, borderRadius: 3, width: `${cat.pct}%` }} />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
