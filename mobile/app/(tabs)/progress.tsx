import { useEffect, useState, useCallback } from 'react'
import { View, Text, ScrollView, Alert, ActivityIndicator, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuthStore } from '@/stores/authStore'
import { getPracticeSessions, getFullTestSessions } from '@/lib/database'
import { computeSATScore, TestAnswer } from '@/lib/scoring'
import { colors, spacing, radius, categoryColor } from '@/theme'
import { Ionicons } from '@expo/vector-icons'

type Tab = 'practice' | 'tests'

interface SessionRow {
  id?: string
  category?: string
  created_at: string
  total_score: number
  total_questions: number
  correct_answers?: number
  is_full_test?: boolean
  time_spent_seconds?: number
  answers?: TestAnswer[] | { questions?: TestAnswer[] }
}

interface TestHistoryEntry {
  id?: string
  date: Date
  total: number
  rw: number
  math: number
  accuracy: number
  totalQuestions: number
  totalCorrect: number
}

/** Extract a flat answer array from a session row */
function extractAnswers(session: SessionRow): TestAnswer[] {
  if (!session.answers) return []
  if (Array.isArray(session.answers)) return session.answers as TestAnswer[]
  if (typeof session.answers === 'object' && 'questions' in session.answers) {
    return (session.answers as { questions?: TestAnswer[] }).questions || []
  }
  return []
}

export default function ProgressScreen() {
  const profile = useAuthStore((s) => s.profile)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('practice')

  // Practice stats
  const [stats, setStats] = useState({
    totalQuestions: 0, totalCorrect: 0, streak: 0,
    mathCorrect: 0, mathTotal: 0,
    readingCorrect: 0, readingTotal: 0,
    writingCorrect: 0, writingTotal: 0,
    sessions: [] as SessionRow[],
  })

  // Full test history
  const [testHistory, setTestHistory] = useState<TestHistoryEntry[]>([])
  const [testCount, setTestCount] = useState(0)
  const [bestScore, setBestScore] = useState<number | null>(null)
  const [improvement, setImprovement] = useState<number | null>(null)

  const loadProgress = useCallback(async () => {
    if (!profile?.id) return
    try {
      const [practiceRes, testRes] = await Promise.all([
        getPracticeSessions(profile.id),
        getFullTestSessions(profile.id),
      ])

      // --- Practice stats ---
      const sessions = practiceRes.data || []
      // Filter out full test sessions from practice stats
      const practiceSessions = sessions.filter((s: SessionRow) => !s.is_full_test)

      let mathC = 0, mathT = 0, readC = 0, readT = 0, writC = 0, writT = 0
      practiceSessions.forEach((s: SessionRow) => {
        const answers = extractAnswers(s)
        answers.forEach((a) => {
          const correct = a.selected === a.correct
          if (a.category === 'math') { mathT++; if (correct) mathC++ }
          else if (a.category === 'reading') { readT++; if (correct) readC++ }
          else if (a.category === 'writing') { writT++; if (correct) writC++ }
        })
      })

      const totalQ = mathT + readT + writT
      const totalC = mathC + readC + writC

      setStats({
        totalQuestions: totalQ, totalCorrect: totalC,
        streak: Math.min(practiceSessions.length, 30),
        mathCorrect: mathC, mathTotal: mathT,
        readingCorrect: readC, readingTotal: readT,
        writingCorrect: writC, writingTotal: writT,
        sessions: practiceSessions.slice(0, 10),
      })

      // --- Full test history ---
      const fullTests = (testRes.data || []) as SessionRow[]
      setTestCount(fullTests.length)

      if (fullTests.length > 0) {
        // Sort chronologically (oldest first) for improvement calc
        const sorted = [...fullTests].sort(
          (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )

        const entries: TestHistoryEntry[] = sorted.map((s) => {
          const answers = extractAnswers(s)
          const score = computeSATScore(answers)
          const totalCorrect = answers.filter((a) => a.selected === a.correct).length
          return {
            id: s.id,
            date: new Date(s.created_at),
            total: score.total,
            rw: score.rw,
            math: score.math,
            accuracy: answers.length > 0 ? Math.round((totalCorrect / answers.length) * 100) : 0,
            totalQuestions: answers.length || s.total_questions,
            totalCorrect,
          }
        })

        setTestHistory(entries)
        setBestScore(Math.max(...entries.map((e) => e.total)))

        if (entries.length > 1) {
          setImprovement(entries[entries.length - 1].total - entries[0].total)
        } else {
          setImprovement(null)
        }
      } else {
        setTestHistory([])
        setBestScore(null)
        setImprovement(null)
      }
    } catch (e) {
      Alert.alert('Error', 'Could not load your progress. Please try again later.')
    } finally {
      setLoading(false)
    }
  }, [profile?.id])

  useEffect(() => {
    if (profile?.id) loadProgress()
  }, [profile?.id, loadProgress])

  // --- Derived values for practice tab ---
  const pct = stats.totalQuestions > 0 ? Math.round((stats.totalCorrect / stats.totalQuestions) * 100) : 0
  const estSAT = Math.round(400 + (pct / 100) * 1200)

  const categories = [
    { key: 'math', label: 'Math', correct: stats.mathCorrect, total: stats.mathTotal },
    { key: 'reading', label: 'Reading', correct: stats.readingCorrect, total: stats.readingTotal },
    { key: 'writing', label: 'Writing', correct: stats.writingCorrect, total: stats.writingTotal },
  ]

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.gold} />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <Text style={{ color: colors.white, fontSize: 24, fontWeight: '700', marginBottom: spacing.md }}>
          Your Progress
        </Text>

        {/* ── Tab Toggle ── */}
        <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl }}>
          {([
            { key: 'practice' as Tab, label: 'Practice Stats' },
            { key: 'tests' as Tab, label: 'Test History' },
          ]).map((t) => (
            <TouchableOpacity
              key={t.key}
              onPress={() => setActiveTab(t.key)}
              activeOpacity={0.7}
              style={{
                paddingVertical: 10, paddingHorizontal: 24, borderRadius: radius.full,
                backgroundColor: activeTab === t.key ? colors.gold : 'rgba(255,255,255,0.04)',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{
                  fontWeight: '700', fontSize: 14,
                  color: activeTab === t.key ? colors.bg : colors.muted,
                }}>
                  {t.label}
                </Text>
                {t.key === 'tests' && testCount > 0 && (
                  <View style={{
                    marginLeft: 8, paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.full,
                    backgroundColor: activeTab === t.key ? 'rgba(7,7,15,0.15)' : colors.goldDim,
                  }}>
                    <Text style={{
                      fontSize: 11, fontWeight: '700',
                      color: activeTab === t.key ? colors.bg : colors.gold,
                    }}>
                      {testCount}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ════════════════════════════════════════════ */}
        {/* ═══ PRACTICE STATS TAB ═══                  */}
        {/* ════════════════════════════════════════════ */}
        {activeTab === 'practice' && (
          <>
            {stats.totalQuestions === 0 && stats.sessions.length === 0 ? (
              <View style={{ alignItems: 'center', paddingTop: 60 }}>
                <Ionicons name="stats-chart-outline" size={48} color={colors.muted} />
                <Text style={{ color: colors.white, fontSize: 18, fontWeight: '600', marginTop: spacing.md }}>
                  No sessions yet
                </Text>
                <Text style={{ color: colors.muted, fontSize: 14, textAlign: 'center', marginTop: spacing.sm }}>
                  Complete a practice session to see your progress here.
                </Text>
              </View>
            ) : (
              <>
                {/* Stat cards */}
                <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl }}>
                  {[
                    { label: 'Streak', value: `${stats.streak}`, icon: 'flame' as const, color: colors.flame },
                    { label: 'Questions', value: `${stats.totalQuestions}`, icon: 'help-circle' as const, color: colors.mathPurple },
                    { label: 'Est. SAT', value: stats.totalQuestions > 0 ? `${estSAT}` : '--', icon: 'trophy' as const, color: colors.gold },
                  ].map((stat) => (
                    <View key={stat.label} style={{
                      flex: 1, backgroundColor: colors.cardBg, padding: spacing.md, borderRadius: radius.md,
                      alignItems: 'center', borderWidth: 1, borderColor: colors.border,
                    }} accessibilityLabel={`${stat.label}: ${stat.value}`}>
                      <Ionicons name={stat.icon} size={22} color={stat.color} />
                      <Text style={{ color: colors.white, fontSize: 20, fontWeight: '700', marginTop: 6 }}>{stat.value}</Text>
                      <Text style={{ color: colors.muted, fontSize: 11 }}>{stat.label}</Text>
                    </View>
                  ))}
                </View>

                {/* Accuracy */}
                <View style={{
                  backgroundColor: colors.cardBg, padding: spacing.lg, borderRadius: radius.md,
                  alignItems: 'center', marginBottom: spacing.xl, borderWidth: 1, borderColor: colors.border,
                }}>
                  <Text style={{ color: colors.muted, fontSize: 13, marginBottom: spacing.sm }}>Overall Accuracy</Text>
                  <Text style={{ color: colors.white, fontSize: 42, fontWeight: '700' }}>{pct}%</Text>
                  <Text style={{ color: colors.muted, fontSize: 13 }}>
                    {stats.totalCorrect} / {stats.totalQuestions} correct
                  </Text>
                </View>

                {/* Category mastery */}
                <Text style={{ color: colors.white, fontSize: 18, fontWeight: '600', marginBottom: spacing.md }}>
                  Category Mastery
                </Text>
                {categories.map((cat) => {
                  const catPct = cat.total > 0 ? Math.round((cat.correct / cat.total) * 100) : 0
                  return (
                    <View key={cat.key} style={{
                      backgroundColor: colors.cardBg, padding: spacing.md, borderRadius: radius.md,
                      marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border,
                    }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text style={{ color: categoryColor(cat.key), fontWeight: '600' }}>{cat.label}</Text>
                        <Text style={{ color: colors.muted, fontSize: 13 }}>
                          {cat.total > 0 ? `${catPct}% (${cat.correct}/${cat.total})` : 'No data'}
                        </Text>
                      </View>
                      <View style={{ height: 6, backgroundColor: colors.border, borderRadius: 3 }}>
                        <View style={{ height: 6, backgroundColor: categoryColor(cat.key), borderRadius: 3, width: `${catPct}%` }} />
                      </View>
                    </View>
                  )
                })}

                {/* Recent sessions */}
                {stats.sessions.length > 0 && (
                  <>
                    <Text style={{ color: colors.white, fontSize: 18, fontWeight: '600', marginTop: spacing.xl, marginBottom: spacing.md }}>
                      Recent Sessions
                    </Text>
                    {stats.sessions.map((s, i) => (
                      <View key={i} style={{
                        backgroundColor: colors.cardBg, padding: spacing.md, borderRadius: radius.md,
                        marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border,
                        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                      }}>
                        <View>
                          <Text style={{ color: colors.white, fontSize: 14, fontWeight: '500', textTransform: 'capitalize' }}>
                            {s.category || 'Mixed'} Practice
                          </Text>
                          <Text style={{ color: colors.muted, fontSize: 12, marginTop: 2 }}>
                            {new Date(s.created_at).toLocaleDateString()}
                          </Text>
                        </View>
                        <Text style={{ color: colors.gold, fontSize: 16, fontWeight: '700' }}>
                          {s.total_score}/{s.total_questions}
                        </Text>
                      </View>
                    ))}
                  </>
                )}
              </>
            )}
          </>
        )}

        {/* ════════════════════════════════════════════ */}
        {/* ═══ TEST HISTORY TAB ═══                    */}
        {/* ════════════════════════════════════════════ */}
        {activeTab === 'tests' && (
          <>
            {testCount === 0 ? (
              <View style={{ alignItems: 'center', paddingTop: 60 }}>
                <Ionicons name="document-text-outline" size={48} color={colors.muted} />
                <Text style={{ color: colors.white, fontSize: 18, fontWeight: '600', marginTop: spacing.md }}>
                  No full tests yet
                </Text>
                <Text style={{ color: colors.muted, fontSize: 14, textAlign: 'center', marginTop: spacing.sm }}>
                  Complete a Full Practice Test to see your score history here.
                </Text>
              </View>
            ) : (
              <>
                {/* Summary stat cards */}
                <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl }}>
                  <View style={{
                    flex: 1, backgroundColor: colors.cardBg, padding: spacing.md, borderRadius: radius.md,
                    alignItems: 'center', borderWidth: 1, borderColor: colors.border,
                  }}>
                    <Ionicons name="document-text" size={22} color={colors.mathPurple} />
                    <Text style={{ color: colors.white, fontSize: 20, fontWeight: '700', marginTop: 6 }}>{testCount}</Text>
                    <Text style={{ color: colors.muted, fontSize: 11 }}>Tests Taken</Text>
                  </View>
                  <View style={{
                    flex: 1, backgroundColor: colors.cardBg, padding: spacing.md, borderRadius: radius.md,
                    alignItems: 'center', borderWidth: 1, borderColor: colors.border,
                  }}>
                    <Ionicons name="trophy" size={22} color={colors.gold} />
                    <Text style={{ color: colors.white, fontSize: 20, fontWeight: '700', marginTop: 6 }}>
                      {bestScore ?? '--'}
                    </Text>
                    <Text style={{ color: colors.muted, fontSize: 11 }}>Best Score</Text>
                  </View>
                  <View style={{
                    flex: 1, backgroundColor: colors.cardBg, padding: spacing.md, borderRadius: radius.md,
                    alignItems: 'center', borderWidth: 1, borderColor: colors.border,
                  }}>
                    <Ionicons
                      name={improvement != null && improvement > 0 ? 'trending-up' : improvement != null && improvement < 0 ? 'trending-down' : 'remove'}
                      size={22}
                      color={improvement != null && improvement > 0 ? colors.green : improvement != null && improvement < 0 ? colors.red : colors.gold}
                    />
                    <Text style={{
                      fontSize: 20, fontWeight: '700', marginTop: 6,
                      color: improvement != null && improvement > 0 ? colors.green : improvement != null && improvement < 0 ? colors.red : colors.white,
                    }}>
                      {improvement != null ? `${improvement > 0 ? '+' : ''}${improvement}` : '--'}
                    </Text>
                    <Text style={{ color: colors.muted, fontSize: 11 }}>
                      {improvement != null ? 'Improvement' : testCount === 1 ? 'Take another!' : 'Improvement'}
                    </Text>
                  </View>
                </View>

                {/* Score history header */}
                <Text style={{ color: colors.white, fontSize: 18, fontWeight: '600', marginBottom: spacing.md }}>
                  Score History
                </Text>

                {/* Mini score chart - simple bar representation */}
                {testHistory.length >= 2 && (
                  <View style={{
                    backgroundColor: colors.cardBg, padding: spacing.lg, borderRadius: radius.md,
                    marginBottom: spacing.xl, borderWidth: 1, borderColor: colors.border,
                  }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: spacing.sm, height: 120 }}>
                      {testHistory.map((entry, i) => {
                        // Normalize bar heights between 400-1600
                        const minDisplay = 400
                        const maxDisplay = 1600
                        const normalized = Math.max(0, (entry.total - minDisplay) / (maxDisplay - minDisplay))
                        const barHeight = Math.max(8, normalized * 100)
                        return (
                          <View key={i} style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Text style={{ color: colors.gold, fontSize: 10, fontWeight: '700', marginBottom: 4 }}>
                              {entry.total}
                            </Text>
                            <View style={{
                              width: '100%', maxWidth: 40, height: barHeight,
                              backgroundColor: colors.gold, borderRadius: radius.sm,
                              opacity: i === testHistory.length - 1 ? 1 : 0.5,
                            }} />
                            <Text style={{ color: colors.muted, fontSize: 9, marginTop: 4 }}>
                              {entry.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </Text>
                          </View>
                        )
                      })}
                    </View>
                  </View>
                )}

                {/* Single test - show score prominently */}
                {testHistory.length === 1 && (
                  <View style={{
                    backgroundColor: colors.cardBg, padding: spacing.xl, borderRadius: radius.md,
                    alignItems: 'center', marginBottom: spacing.xl, borderWidth: 1, borderColor: colors.border,
                  }}>
                    <Text style={{ color: colors.gold, fontSize: 48, fontWeight: '700' }}>
                      {testHistory[0].total}
                    </Text>
                    <Text style={{ color: colors.muted, fontSize: 13, marginTop: spacing.sm }}>
                      Your first test score -- take another to track improvement!
                    </Text>
                  </View>
                )}

                {/* All test entries */}
                <Text style={{ color: colors.white, fontSize: 18, fontWeight: '600', marginBottom: spacing.md }}>
                  All Tests
                </Text>
                {/* Show in reverse chronological order (most recent first) */}
                {[...testHistory].reverse().map((entry, i, arr) => {
                  // Compute trend vs previous attempt (next in reversed array = earlier test)
                  const prevEntry = i < arr.length - 1 ? arr[i + 1] : null
                  const diff = prevEntry ? entry.total - prevEntry.total : null

                  return (
                    <View key={entry.id || i} style={{
                      backgroundColor: colors.cardBg, padding: spacing.md, borderRadius: radius.md,
                      marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border,
                    }}>
                      {/* Top row: badge + date + score */}
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
                          {/* SAT badge */}
                          <View style={{
                            paddingHorizontal: 8, paddingVertical: 3, borderRadius: radius.sm,
                            backgroundColor: colors.goldDim,
                          }}>
                            <Text style={{ color: colors.gold, fontSize: 10, fontWeight: '700', letterSpacing: 1 }}>SAT</Text>
                          </View>
                          <View style={{ flex: 1 }}>
                            <Text style={{ color: colors.white, fontSize: 14, fontWeight: '600' }}>
                              Full Practice Test
                            </Text>
                            <Text style={{ color: colors.muted, fontSize: 12, marginTop: 2 }}>
                              {entry.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </Text>
                          </View>
                        </View>

                        <View style={{ alignItems: 'flex-end' }}>
                          <Text style={{ color: colors.gold, fontSize: 22, fontWeight: '700' }}>
                            {entry.total}
                          </Text>
                          <Text style={{ color: colors.muted, fontSize: 11 }}>
                            {entry.accuracy}% accuracy
                          </Text>
                        </View>
                      </View>

                      {/* Sub-scores row */}
                      <View style={{
                        flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm,
                        paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.border,
                      }}>
                        <View style={{
                          flex: 1, backgroundColor: 'rgba(52,211,153,0.06)',
                          borderWidth: 1, borderColor: 'rgba(52,211,153,0.15)',
                          borderRadius: radius.sm, padding: spacing.sm,
                        }}>
                          <Text style={{ color: colors.readingGreen, fontSize: 10, fontWeight: '700', letterSpacing: 0.5 }}>
                            R&W
                          </Text>
                          <Text style={{ color: colors.white, fontSize: 16, fontWeight: '700', marginTop: 2 }}>
                            {entry.rw}
                          </Text>
                        </View>
                        <View style={{
                          flex: 1, backgroundColor: 'rgba(129,140,248,0.06)',
                          borderWidth: 1, borderColor: 'rgba(129,140,248,0.15)',
                          borderRadius: radius.sm, padding: spacing.sm,
                        }}>
                          <Text style={{ color: colors.mathPurple, fontSize: 10, fontWeight: '700', letterSpacing: 0.5 }}>
                            MATH
                          </Text>
                          <Text style={{ color: colors.white, fontSize: 16, fontWeight: '700', marginTop: 2 }}>
                            {entry.math}
                          </Text>
                        </View>
                        {/* Trend indicator */}
                        {diff != null && (
                          <View style={{
                            justifyContent: 'center', alignItems: 'center', paddingHorizontal: spacing.md,
                          }}>
                            <Ionicons
                              name={diff > 0 ? 'arrow-up' : diff < 0 ? 'arrow-down' : 'remove'}
                              size={16}
                              color={diff > 0 ? colors.green : diff < 0 ? colors.red : colors.muted}
                            />
                            <Text style={{
                              fontSize: 13, fontWeight: '700',
                              color: diff > 0 ? colors.green : diff < 0 ? colors.red : colors.muted,
                            }}>
                              {diff > 0 ? '+' : ''}{diff}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  )
                })}
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
