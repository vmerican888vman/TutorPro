import { useEffect, useMemo, useRef } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useDiagnosticStore } from '@/stores/diagnosticStore'
import { useAuthStore } from '@/stores/authStore'
import { saveDiagnosticResult } from '@/lib/database'
import { colors, spacing, radius, categoryColor } from '@/theme'
import { Ionicons } from '@expo/vector-icons'

const STRENGTH_THRESHOLD = 0.6

export default function DiagnosticResultsScreen() {
  const answers = useDiagnosticStore((s) => s.answers)
  const getResults = useDiagnosticStore((s) => s.getResults)
  const reset = useDiagnosticStore((s) => s.reset)
  const user = useAuthStore((s) => s.user)
  const savedRef = useRef(false)

  const results = useMemo(() => getResults(), [answers])

  const percentage = results.total_questions > 0
    ? Math.round((results.total_score / results.total_questions) * 100) : 0
  const satEstimate = Math.round(400 + (percentage / 100) * 1200)

  useEffect(() => {
    if (user && results.total_questions > 0 && !savedRef.current) {
      savedRef.current = true
      saveDiagnosticResult({
        user_id: user.id,
        ...results,
      }).catch(() => {})
    }
  }, [user?.id, results.total_questions])

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}m ${sec}s`
  }

  const categories = [
    { key: 'math', label: 'Math', score: results.math_score, total: results.math_questions },
    { key: 'reading', label: 'Reading', score: results.reading_score, total: results.reading_questions },
    { key: 'writing', label: 'Writing', score: results.writing_score, total: results.writing_questions },
  ]

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <Text style={{ color: colors.white, fontSize: 24, fontWeight: '700', textAlign: 'center', marginBottom: spacing.xs }}>
          Diagnostic Results
        </Text>
        <Text style={{ color: colors.muted, fontSize: 13, textAlign: 'center', marginBottom: spacing.xl }}>
          Time: {formatTime(results.time_spent_seconds)}
        </Text>

        {/* Score circle */}
        <View style={{ alignItems: 'center', marginBottom: spacing.xl }}>
          <View style={{
            width: 140, height: 140, borderRadius: 70, borderWidth: 6,
            borderColor: percentage >= 70 ? colors.green : percentage >= 40 ? colors.gold : colors.red,
            justifyContent: 'center', alignItems: 'center',
          }}>
            <Text style={{ color: colors.white, fontSize: 36, fontWeight: '700' }}>
              {results.total_score}/{results.total_questions}
            </Text>
            <Text style={{ color: colors.muted, fontSize: 13 }}>{percentage}%</Text>
          </View>
          <View style={{
            backgroundColor: colors.goldDim, paddingHorizontal: 16, paddingVertical: 8,
            borderRadius: radius.full, marginTop: spacing.md,
          }}>
            <Text style={{ color: colors.gold, fontSize: 15, fontWeight: '600' }}>
              Est. SAT: {satEstimate}
            </Text>
          </View>
        </View>

        {/* Category breakdown */}
        <Text style={{ color: colors.white, fontSize: 18, fontWeight: '600', marginBottom: spacing.md }}>
          Score Breakdown
        </Text>
        {categories.map((cat) => {
          const pct = cat.total > 0 ? (cat.score / cat.total) * 100 : 0
          return (
            <View key={cat.key} style={{
              backgroundColor: colors.cardBg, padding: spacing.md, borderRadius: radius.md,
              marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border,
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm }}>
                <Text style={{ color: categoryColor(cat.key), fontWeight: '600', fontSize: 15 }}>{cat.label}</Text>
                <Text style={{ color: colors.white, fontSize: 14 }}>{cat.score}/{cat.total}</Text>
              </View>
              <View style={{ height: 6, backgroundColor: colors.border, borderRadius: 3 }}>
                <View style={{
                  height: 6, backgroundColor: categoryColor(cat.key), borderRadius: 3,
                  width: `${pct}%`,
                }} />
              </View>
            </View>
          )
        })}

        {/* Strengths/Weaknesses */}
        <View style={{ flexDirection: 'row', marginTop: spacing.md, gap: spacing.sm }}>
          <View style={{ flex: 1, backgroundColor: colors.green + '10', padding: spacing.md, borderRadius: radius.md, borderWidth: 1, borderColor: colors.green + '30' }}>
            <Text style={{ color: colors.green, fontWeight: '600', marginBottom: 4 }}>Strengths</Text>
            {categories.filter((c) => c.total > 0 && c.score / c.total >= STRENGTH_THRESHOLD).map((c) => (
              <Text key={c.key} style={{ color: colors.muted, fontSize: 13 }}>{c.label}</Text>
            ))}
            {categories.filter((c) => c.total > 0 && c.score / c.total >= STRENGTH_THRESHOLD).length === 0 && (
              <Text style={{ color: colors.muted, fontSize: 13 }}>Keep practicing!</Text>
            )}
          </View>
          <View style={{ flex: 1, backgroundColor: colors.red + '10', padding: spacing.md, borderRadius: radius.md, borderWidth: 1, borderColor: colors.red + '30' }}>
            <Text style={{ color: colors.red, fontWeight: '600', marginBottom: 4 }}>Needs Work</Text>
            {categories.filter((c) => c.total > 0 && c.score / c.total < STRENGTH_THRESHOLD).map((c) => (
              <Text key={c.key} style={{ color: colors.muted, fontSize: 13 }}>{c.label}</Text>
            ))}
          </View>
        </View>

        {/* Actions */}
        <TouchableOpacity
          style={{
            backgroundColor: colors.gold, borderRadius: radius.md, paddingVertical: 14,
            alignItems: 'center', marginTop: spacing.xl,
          }}
          onPress={() => {
            reset()
            if (user) {
              router.replace('/(tabs)/dashboard')
            } else {
              router.replace('/(auth)/signup')
            }
          }}
          accessibilityRole="button"
          accessibilityLabel={user ? 'Go to Dashboard' : 'Sign Up for Free Trial'}
        >
          <Text style={{ color: colors.bg, fontSize: 16, fontWeight: '700' }}>
            {user ? 'Go to Dashboard' : 'Sign Up for Free Trial'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: spacing.md, alignItems: 'center' }}
          onPress={() => { reset(); router.replace('/diagnostic') }}
          accessibilityRole="button"
          accessibilityLabel="Retake Diagnostic"
        >
          <Text style={{ color: colors.gold, fontSize: 14 }}>Retake Diagnostic</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}
