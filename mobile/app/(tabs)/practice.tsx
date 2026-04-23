import { useState, useRef } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity, Animated, Alert, ActivityIndicator,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuthStore } from '@/stores/authStore'
import { savePracticeSession } from '@/lib/database'
import { diagnosticQuestions, DiagnosticQuestion } from '@/data/diagnosticQuestions'
import { colors, spacing, radius, categoryColor } from '@/theme'
import { Ionicons } from '@expo/vector-icons'
import FloatingTutorChat from '@/components/FloatingTutorChat'

type Phase = 'setup' | 'question' | 'results'

export default function PracticeScreen() {
  const [phase, setPhase] = useState<Phase>('setup')
  const [category, setCategory] = useState('mixed')
  const [questionCount, setQuestionCount] = useState(10)
  const [questions, setQuestions] = useState<DiagnosticQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswers] = useState<Array<{ question_id: string; selected: string; correct: string; category: string; is_correct: boolean }>>([])
  const [startTime, setStartTime] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [finishing, setFinishing] = useState(false)
  const fadeAnim = useRef(new Animated.Value(1)).current
  const user = useAuthStore((s) => s.user)
  const isPro = useAuthStore((s) => s.isPro)

  const startPractice = () => {
    let pool = [...diagnosticQuestions]
    if (category !== 'mixed') {
      pool = pool.filter((q) => q.category === category)
    }
    // Shuffle
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]]
    }
    setQuestions(pool.slice(0, Math.min(questionCount, pool.length)))
    setCurrentIndex(0)
    setAnswers([])
    setStartTime(Date.now())
    setPhase('question')
  }

  const handleSelect = (letter: string) => {
    if (showResult || submitting) return
    setSubmitting(true)
    setSelectedAnswer(letter)
    setShowResult(true)
    setAnswers((prev) => [...prev, {
      question_id: questions[currentIndex].id,
      selected: letter,
      correct: questions[currentIndex].correct,
      category: questions[currentIndex].category,
      is_correct: letter === questions[currentIndex].correct,
    }])
    setSubmitting(false)
  }

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      finishPractice()
    } else {
      setSelectedAnswer(null)
      setShowResult(false)
      fadeAnim.setValue(0)
      Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }).start()
      setCurrentIndex((i) => i + 1)
    }
  }

  const finishPractice = async () => {
    setFinishing(true)
    setPhase('results')
    if (user) {
      const totalCorrect = answers.filter((a) => a.is_correct).length
      try {
        await savePracticeSession({
          user_id: user.id,
          session_type: 'practice',
          correct_answers: totalCorrect,
          total_questions: answers.length,
          category,
          answers,
          time_spent_seconds: Math.round((Date.now() - startTime) / 1000),
        })
      } catch (e) {
        Alert.alert('Save Error', 'Your results could not be saved. Please try again later.')
      }
    }
    setFinishing(false)
  }

  // ── SETUP ──
  if (phase === 'setup') {
    const categories = [
      { key: 'mixed', label: 'Mixed', icon: 'shuffle' as const },
      { key: 'math', label: 'Math', icon: 'calculator' as const },
      { key: 'reading', label: 'Reading', icon: 'book' as const },
    ]
    const counts = [5, 10, 20]

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
        <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
          <Text style={{ color: colors.white, fontSize: 24, fontWeight: '700', marginBottom: spacing.xl }}>
            Practice
          </Text>

          <Text style={{ color: colors.muted, fontSize: 13, marginBottom: spacing.sm }}>Category</Text>
          <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl }}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.key}
                style={{
                  flex: 1, paddingVertical: 14, borderRadius: radius.md, alignItems: 'center',
                  backgroundColor: category === cat.key ? colors.goldDim : colors.cardBg,
                  borderWidth: 1, borderColor: category === cat.key ? colors.goldBorder : colors.border,
                }}
                onPress={() => setCategory(cat.key)}
              >
                <Ionicons name={cat.icon} size={20} color={category === cat.key ? colors.gold : colors.muted} />
                <Text style={{
                  color: category === cat.key ? colors.gold : colors.muted,
                  fontSize: 13, fontWeight: '600', marginTop: 4,
                }}>{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={{ color: colors.muted, fontSize: 13, marginBottom: spacing.sm }}>Questions</Text>
          <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl }}>
            {counts.map((n) => (
              <TouchableOpacity
                key={n}
                style={{
                  flex: 1, paddingVertical: 14, borderRadius: radius.md, alignItems: 'center',
                  backgroundColor: questionCount === n ? colors.goldDim : colors.cardBg,
                  borderWidth: 1, borderColor: questionCount === n ? colors.goldBorder : colors.border,
                }}
                onPress={() => setQuestionCount(n)}
              >
                <Text style={{
                  color: questionCount === n ? colors.gold : colors.muted,
                  fontSize: 16, fontWeight: '700',
                }}>{n}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: colors.gold, borderRadius: radius.md, paddingVertical: 16,
              alignItems: 'center',
            }}
            onPress={startPractice}
          >
            <Text style={{ color: colors.bg, fontSize: 17, fontWeight: '700' }}>Start Practice</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  }

  // ── QUESTION ──
  if (phase === 'question') {
    const q = questions[currentIndex]
    if (!q) return null

    const isCorrect = selectedAnswer === q.correct

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
        <View style={{ flex: 1 }}>
        <View style={{ padding: spacing.md }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm }}>
            <View style={{
              backgroundColor: categoryColor(q.category) + '20', paddingHorizontal: 10,
              paddingVertical: 4, borderRadius: radius.full,
            }}>
              <Text style={{ color: categoryColor(q.category), fontSize: 12, fontWeight: '600', textTransform: 'capitalize' }}>
                {q.category}
              </Text>
            </View>
            <Text style={{ color: colors.muted, fontSize: 13 }}>{currentIndex + 1}/{questions.length}</Text>
          </View>
          <View style={{ height: 4, backgroundColor: colors.border, borderRadius: 2 }}>
            <View style={{ height: 4, backgroundColor: colors.gold, borderRadius: 2, width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
          </View>
        </View>

        <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingTop: spacing.sm }}>
          <Animated.View style={{ opacity: fadeAnim }}>
            {q.passage && (
              <View style={{
                backgroundColor: colors.cardBg, padding: spacing.md, borderRadius: radius.md,
                marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border,
              }}>
                <Text style={{ color: colors.muted, fontSize: 13, lineHeight: 20 }}>{q.passage}</Text>
              </View>
            )}

            <Text style={{ color: colors.white, fontSize: 17, fontWeight: '600', lineHeight: 24, marginBottom: spacing.lg }}>
              {q.question}
            </Text>

            {q.options.map((opt) => {
              let bgColor = colors.cardBg
              let borderColor = colors.border
              if (showResult) {
                if (opt.letter === q.correct) { bgColor = colors.green + '15'; borderColor = colors.green }
                else if (opt.letter === selectedAnswer && !isCorrect) { bgColor = colors.red + '15'; borderColor = colors.red }
              }

              return (
                <TouchableOpacity
                  key={opt.letter}
                  style={{
                    flexDirection: 'row', alignItems: 'center', backgroundColor: bgColor,
                    padding: spacing.md, borderRadius: radius.md, marginBottom: spacing.sm,
                    borderWidth: 1.5, borderColor,
                  }}
                  onPress={() => handleSelect(opt.letter)}
                  disabled={showResult || submitting}
                >
                  <View style={{
                    width: 32, height: 32, borderRadius: radius.full, backgroundColor: colors.bgLight,
                    justifyContent: 'center', alignItems: 'center', marginRight: spacing.md,
                  }}>
                    <Text style={{ color: colors.white, fontSize: 14, fontWeight: '600' }}>{opt.letter}</Text>
                  </View>
                  <Text style={{ color: colors.white, fontSize: 15, flex: 1 }}>{opt.text}</Text>
                </TouchableOpacity>
              )
            })}

            {showResult && (
              <>
                <View style={{
                  backgroundColor: isCorrect ? colors.green + '10' : colors.red + '10',
                  padding: spacing.md, borderRadius: radius.md, marginTop: spacing.sm,
                  borderWidth: 1, borderColor: isCorrect ? colors.green + '30' : colors.red + '30',
                }}>
                  <Text style={{ color: isCorrect ? colors.green : colors.red, fontWeight: '600', marginBottom: 4 }}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </Text>
                  <Text style={{ color: colors.muted, fontSize: 14, lineHeight: 20 }}>{q.explanation}</Text>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.gold, borderRadius: radius.md, paddingVertical: 14,
                    alignItems: 'center', marginTop: spacing.lg,
                    opacity: finishing ? 0.6 : 1,
                  }}
                  onPress={handleNext}
                  disabled={finishing}
                >
                  {finishing ? (
                    <ActivityIndicator color={colors.bg} />
                  ) : (
                    <Text style={{ color: colors.bg, fontSize: 16, fontWeight: '700' }}>
                      {currentIndex + 1 >= questions.length ? 'See Results' : 'Next Question'}
                    </Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </Animated.View>
        </ScrollView>
        <FloatingTutorChat question={q} />
        </View>
      </SafeAreaView>
    )
  }

  // ── RESULTS ──
  const totalCorrect = answers.filter((a) => a.is_correct).length
  const pct = answers.length > 0 ? Math.round((totalCorrect / answers.length) * 100) : 0

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <Text style={{ color: colors.white, fontSize: 24, fontWeight: '700', textAlign: 'center', marginBottom: spacing.xl }}>
          Practice Complete
        </Text>

        <View style={{ alignItems: 'center', marginBottom: spacing.xl }}>
          <View style={{
            width: 120, height: 120, borderRadius: 60, borderWidth: 5,
            borderColor: pct >= 70 ? colors.green : pct >= 40 ? colors.gold : colors.red,
            justifyContent: 'center', alignItems: 'center',
          }}>
            <Text style={{ color: colors.white, fontSize: 32, fontWeight: '700' }}>{totalCorrect}/{answers.length}</Text>
            <Text style={{ color: colors.muted, fontSize: 13 }}>{pct}%</Text>
          </View>
        </View>

        {/* Wrong answers review */}
        {answers.filter((a) => !a.is_correct).length > 0 && (
          <>
            <Text style={{ color: colors.white, fontSize: 16, fontWeight: '600', marginBottom: spacing.md }}>
              Review Mistakes
            </Text>
            {answers.filter((a) => !a.is_correct).map((a, i) => {
              const q = diagnosticQuestions.find((qq) => qq.id === a.question_id)
              if (!q) return null
              return (
                <View key={i} style={{
                  backgroundColor: colors.cardBg, padding: spacing.md, borderRadius: radius.md,
                  marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border,
                }}>
                  <Text style={{ color: colors.white, fontSize: 14, marginBottom: 4 }} numberOfLines={2}>
                    {q.question}
                  </Text>
                  <Text style={{ color: colors.red, fontSize: 12 }}>Your answer: {a.selected}</Text>
                  <Text style={{ color: colors.green, fontSize: 12 }}>Correct: {a.correct}</Text>
                </View>
              )
            })}
          </>
        )}

        <TouchableOpacity
          style={{
            backgroundColor: colors.gold, borderRadius: radius.md, paddingVertical: 14,
            alignItems: 'center', marginTop: spacing.lg,
          }}
          onPress={() => { setPhase('setup'); setAnswers([]) }}
        >
          <Text style={{ color: colors.bg, fontSize: 16, fontWeight: '700' }}>Practice Again</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}
