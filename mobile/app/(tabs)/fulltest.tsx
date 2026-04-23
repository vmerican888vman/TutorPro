import { useState, useEffect, useRef, useCallback } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Alert,
  ActivityIndicator,
  Dimensions,
  StatusBar,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useAuthStore } from '@/stores/authStore'
import { savePracticeSession } from '@/lib/database'
import { SAT_CONFIG, ACT_CONFIG, AVAILABLE_TESTS, TestSection, TestConfig } from '@/data/testConfig'
import { computeSATScore, computeACTScore, TestAnswer } from '@/lib/scoring'
import { buildRandomSATTest } from '@/lib/testBuilder'
import { buildRandomACTTest } from '@/lib/actTestBuilder'
import { satRWPool } from '@/data/sat/rw-pool'
import { satMathPool } from '@/data/sat/math-pool'
import { actEnglishPool } from '@/data/act/english-pool'
import { actMathPool } from '@/data/act/math-pool'
import { actReadingPool } from '@/data/act/reading-pool'
import { actSciencePool } from '@/data/act/science-pool'
import { colors, spacing, radius, categoryColor } from '@/theme'
import FloatingTutorChat from '@/components/FloatingTutorChat'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

/** Question shape from the SAT pool files */
export interface SATPoolQuestion {
  id: string
  question: string
  passage?: string | null
  options: { letter: string; text: string }[]
  correct: string
  category: string
  subcategory?: string
  difficulty?: 'easy' | 'medium' | 'hard'
  explanation?: string
}

// ── Color map for section badges ──
const sectionColors: Record<string, string> = {
  reading: colors.readingGreen,
  math: colors.mathPurple,
  writing: colors.writingYellow,
  rw: colors.readingGreen,
  english: colors.flame,
  science: colors.gold,
}

// ── Format seconds to MM:SS ──
function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

type Phase = 'select' | 'loading' | 'testing' | 'break' | 'results'

// ══════════════════════════════════════════════════════════════════
//  TEST SELECTION SCREEN
// ══════════════════════════════════════════════════════════════════
function TestSelectionScreen({ onSelect }: { onSelect: (id: string, type: string) => void }) {
  const [activeTab, setActiveTab] = useState<'sat' | 'act'>('sat')
  const config = activeTab === 'sat' ? SAT_CONFIG : ACT_CONFIG
  const tests = AVAILABLE_TESTS[activeTab]
  const activeSections = config.sections.filter((s) => s.type !== 'break' && !s.optional)
  const totalTime = config.sections
    .filter((s) => !s.optional)
    .reduce((sum, s) => sum + s.timeMinutes, 0)

  const descriptions: Record<string, string> = {
    sat: 'Simulate the real SAT experience with timed sections, a 10-minute break, and no answer reveals until the end. Your estimated score will be calculated when you finish.',
    act: 'Simulate the 2025 Enhanced ACT with timed sections, a 10-minute break, and Science included. Composite score averages English, Math, and Reading (1-36).',
  }

  // Determine where the break falls for annotation
  const breakAfterIndex = activeTab === 'sat' ? 1 : 1 // break after 2nd section for both

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <Text
          style={{
            color: colors.white,
            fontSize: 26,
            fontWeight: '800',
            marginBottom: spacing.sm,
          }}
        >
          Full Practice Tests
        </Text>

        {/* SAT / ACT tab selector */}
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: colors.bgLight,
            borderRadius: radius.full,
            padding: 4,
            marginBottom: spacing.lg,
          }}
        >
          {(['sat', 'act'] as const).map((tab) => {
            const isActive = activeTab === tab
            return (
              <TouchableOpacity
                key={tab}
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  borderRadius: radius.full,
                  alignItems: 'center',
                  backgroundColor: isActive ? colors.gold : 'transparent',
                }}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.7}
              >
                <Text
                  style={{
                    color: isActive ? colors.bg : colors.muted,
                    fontSize: 15,
                    fontWeight: '700',
                  }}
                >
                  {tab.toUpperCase()}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>

        <Text
          style={{
            color: colors.muted,
            fontSize: 14,
            lineHeight: 22,
            marginBottom: spacing.xl,
          }}
        >
          {descriptions[activeTab]}
        </Text>

        {/* Test info card */}
        <View
          style={{
            backgroundColor: colors.cardBg,
            borderWidth: 1.5,
            borderColor: colors.border,
            borderRadius: radius.lg,
            padding: spacing.lg,
            marginBottom: spacing.lg,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md }}>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text
                style={{
                  color: colors.muted,
                  fontSize: 10,
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  marginBottom: 4,
                }}
              >
                Questions
              </Text>
              <Text style={{ color: colors.white, fontSize: 22, fontWeight: '800' }}>
                {config.totalQuestions}
              </Text>
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text
                style={{
                  color: colors.muted,
                  fontSize: 10,
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  marginBottom: 4,
                }}
              >
                Total Time
              </Text>
              <Text style={{ color: colors.white, fontSize: 22, fontWeight: '800' }}>
                {Math.floor(totalTime / 60)}h {totalTime % 60}m
              </Text>
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text
                style={{
                  color: colors.muted,
                  fontSize: 10,
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  marginBottom: 4,
                }}
              >
                Score Range
              </Text>
              <Text style={{ color: colors.white, fontSize: 22, fontWeight: '800' }}>
                {config.scoreRange.min}–{config.scoreRange.max}
              </Text>
            </View>
          </View>

          {/* Section flow */}
          <View style={{ marginTop: spacing.sm }}>
            {activeSections.map((s, i) => (
              <View key={s.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: sectionColors[s.category || ''] || colors.muted,
                    marginRight: 8,
                  }}
                />
                <Text style={{ color: colors.muted, fontSize: 12 }}>
                  {s.shortName} — {s.questionCount}q, {s.timeMinutes} min
                </Text>
                {i === breakAfterIndex && (
                  <Text style={{ color: colors.gold, fontSize: 11, marginLeft: 8 }}>
                    then 10-min break
                  </Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Test cards */}
        {tests.map((test) => (
          <TouchableOpacity
            key={test.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: colors.cardBg,
              borderWidth: 1.5,
              borderColor: colors.goldBorder,
              borderRadius: radius.lg,
              padding: spacing.lg,
              marginBottom: spacing.md,
            }}
            onPress={() => onSelect(test.id, activeTab)}
            activeOpacity={0.7}
          >
            <View style={{ flex: 1, marginRight: spacing.md }}>
              <Text style={{ color: colors.white, fontSize: 16, fontWeight: '700', marginBottom: 4 }}>
                {test.name}
              </Text>
              <Text style={{ color: colors.muted, fontSize: 13 }}>
                {test.description}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: colors.gold,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: radius.full,
              }}
            >
              <Text style={{ color: colors.bg, fontSize: 14, fontWeight: '700' }}>Start</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

// ══════════════════════════════════════════════════════════════════
//  BREAK SCREEN
// ══════════════════════════════════════════════════════════════════
function BreakScreen({
  timeMinutes,
  nextSectionName,
  sectionsCompleted,
  totalSections,
  onEnd,
}: {
  timeMinutes: number
  nextSectionName: string
  sectionsCompleted: number
  totalSections: number
  onEnd: () => void
}) {
  const [secondsLeft, setSecondsLeft] = useState(timeMinutes * 60)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const onEndRef = useRef(onEnd)
  onEndRef.current = onEnd

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          onEndRef.current()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const handleSkip = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    onEnd()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.xl }}>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: colors.goldDim,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: spacing.lg,
          }}
        >
          <Ionicons name="cafe" size={36} color={colors.gold} />
        </View>
        <Text
          style={{
            color: colors.white,
            fontSize: 28,
            fontWeight: '800',
            marginBottom: spacing.sm,
          }}
        >
          Break Time
        </Text>
        <Text
          style={{
            color: colors.muted,
            fontSize: 15,
            textAlign: 'center',
            marginBottom: spacing.sm,
            lineHeight: 22,
          }}
        >
          You've completed {sectionsCompleted} of {totalSections} sections.{'\n'}
          Take a moment to rest — just like the real test.
        </Text>
        <Text
          style={{
            color: colors.muted,
            fontSize: 13,
            textAlign: 'center',
            marginBottom: spacing.xl,
          }}
        >
          The next section will begin automatically when the break ends.
        </Text>
        <Text
          style={{
            color: colors.gold,
            fontSize: 56,
            fontWeight: '700',
            fontVariant: ['tabular-nums'],
            marginBottom: spacing.sm,
          }}
        >
          {formatTime(secondsLeft)}
        </Text>
        <Text style={{ color: colors.muted, fontSize: 14, marginBottom: spacing.xl }}>
          Up next: <Text style={{ color: colors.white, fontWeight: '600' }}>{nextSectionName}</Text>
        </Text>
        <TouchableOpacity
          style={{
            borderWidth: 1.5,
            borderColor: colors.border,
            borderRadius: radius.full,
            paddingHorizontal: 28,
            paddingVertical: 12,
          }}
          onPress={handleSkip}
          activeOpacity={0.7}
        >
          <Text style={{ color: colors.muted, fontSize: 14, fontWeight: '600' }}>Skip Break</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

// ══════════════════════════════════════════════════════════════════
//  SECTION QUESTION SCREEN (timed, no answer reveal)
// ══════════════════════════════════════════════════════════════════
function SectionScreen({
  section,
  sectionNumber,
  totalSections,
  questions,
  onComplete,
}: {
  section: TestSection
  sectionNumber: number
  totalSections: number
  questions: SATPoolQuestion[]
  onComplete: (answers: TestAnswer[], timeMs: number) => void
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [flagged, setFlagged] = useState<Set<string>>(new Set())
  const [secondsLeft, setSecondsLeft] = useState(section.timeMinutes * 60)
  const [showReview, setShowReview] = useState(false)
  const [timerHidden, setTimerHidden] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef(Date.now())
  const fadeAnim = useRef(new Animated.Value(1)).current
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const handleSubmitSection = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    const answers: TestAnswer[] = questions.map((q) => ({
      question_id: q.id,
      selected: selectedAnswers[q.id] || null,
      correct: q.correct,
      category: q.category,
      subcategory: q.subcategory,
      question_text:
        (q.passage ? q.passage.slice(0, 80) + '... ' : '') + (q.question || '').slice(0, 120),
    }))
    onCompleteRef.current(answers, Date.now() - startTimeRef.current)
  }, [questions, selectedAnswers])

  // Countdown timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          setTimeout(() => handleSubmitSection(), 0)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [handleSubmitSection])

  const question = questions[currentIndex]
  const totalQuestions = questions.length
  const selected = question ? selectedAnswers[question.id] : undefined
  const answeredCount = Object.keys(selectedAnswers).length
  const timeWarning = secondsLeft < 300
  const timeCritical = secondsLeft < 60

  const handleSelect = (letter: string) => {
    if (!question) return
    setSelectedAnswers((prev) => ({ ...prev, [question.id]: letter }))
  }

  const handleNav = (idx: number) => {
    if (idx >= 0 && idx < totalQuestions) {
      fadeAnim.setValue(0)
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start()
      setCurrentIndex(idx)
      setShowReview(false)
    }
  }

  const toggleFlag = () => {
    if (!question) return
    setFlagged((prev) => {
      const next = new Set(prev)
      if (next.has(question.id)) next.delete(question.id)
      else next.add(question.id)
      return next
    })
  }

  const timerColor = timeCritical ? colors.red : timeWarning ? colors.gold : colors.white
  const sectionCatKey = section.category === 'reading' ? 'rw' : section.category || ''
  const catColor = sectionColors[sectionCatKey] || sectionColors[section.category || ''] || colors.muted

  // Confirm before submitting with unanswered questions
  const confirmSubmit = () => {
    const unanswered = totalQuestions - answeredCount
    if (unanswered > 0) {
      Alert.alert(
        'Submit Section?',
        `You have ${unanswered} unanswered question${unanswered > 1 ? 's' : ''}. Are you sure you want to submit?`,
        [
          { text: 'Keep Working', style: 'cancel' },
          { text: 'Submit', style: 'destructive', onPress: handleSubmitSection },
        ]
      )
    } else {
      handleSubmitSection()
    }
  }

  // ── Review screen ──
  if (showReview) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
        <StatusBar barStyle="light-content" />
        <View style={{ padding: spacing.md }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: spacing.md,
            }}
          >
            <Text style={{ color: colors.white, fontSize: 18, fontWeight: '800' }}>
              Review: {section.shortName}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: timeCritical ? colors.red + '20' : timeWarning ? colors.gold + '20' : 'rgba(255,255,255,0.06)',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: radius.full,
                gap: 6,
              }}
            >
              <Ionicons name="time" size={18} color={timerColor} />
              <Text
                style={{
                  color: timerColor,
                  fontSize: 18,
                  fontWeight: '700',
                  fontVariant: ['tabular-nums'],
                }}
              >
                {formatTime(secondsLeft)}
              </Text>
            </View>
          </View>
          <Text style={{ color: colors.muted, fontSize: 13, marginBottom: spacing.md }}>
            {answeredCount} of {totalQuestions} answered · {flagged.size} flagged
          </Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: spacing.md, paddingTop: 0 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: spacing.xl }}>
            {questions.map((q, i) => {
              const answered = !!selectedAnswers[q.id]
              const isFlagged = flagged.has(q.id)
              return (
                <TouchableOpacity
                  key={q.id}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: isFlagged
                      ? colors.red + '18'
                      : answered
                      ? colors.goldDim
                      : 'rgba(255,255,255,0.03)',
                    borderWidth: isFlagged ? 2 : 0,
                    borderColor: isFlagged ? colors.red : 'transparent',
                  }}
                  onPress={() => handleNav(i)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={{
                      color: isFlagged ? colors.red : answered ? colors.gold : colors.muted,
                      fontSize: 14,
                      fontWeight: '600',
                    }}
                  >
                    {i + 1}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>

          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                borderWidth: 1.5,
                borderColor: colors.border,
                borderRadius: radius.full,
                paddingVertical: 14,
                alignItems: 'center',
              }}
              onPress={() => setShowReview(false)}
              activeOpacity={0.7}
            >
              <Text style={{ color: colors.white, fontSize: 14, fontWeight: '600' }}>
                Back to Questions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: colors.gold,
                borderRadius: radius.full,
                paddingVertical: 14,
                alignItems: 'center',
              }}
              onPress={confirmSubmit}
              activeOpacity={0.7}
            >
              <Text style={{ color: colors.bg, fontSize: 14, fontWeight: '700' }}>
                Submit Section
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  if (!question) return null

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1 }}>
        {/* ── Prominent timer bar ── */}
        <View
          style={{
            backgroundColor: timeCritical
              ? colors.red + '18'
              : timeWarning
              ? colors.gold + '12'
              : 'rgba(255,255,255,0.03)',
            paddingVertical: 10,
            paddingHorizontal: spacing.md,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View
              style={{
                backgroundColor: catColor + '22',
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: radius.full,
              }}
            >
              <Text
                style={{
                  color: catColor,
                  fontSize: 11,
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}
              >
                {section.shortName}
              </Text>
            </View>
            <Text style={{ color: colors.muted, fontSize: 12 }}>
              Section {sectionNumber} of {totalSections}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setTimerHidden(!timerHidden)}
            activeOpacity={0.7}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              backgroundColor: timeCritical ? colors.red + '30' : timeWarning ? colors.gold + '20' : 'rgba(255,255,255,0.06)',
              paddingHorizontal: 14,
              paddingVertical: 6,
              borderRadius: radius.full,
            }}
          >
            <Ionicons name="time" size={18} color={timerColor} />
            {timerHidden ? (
              <Text style={{ color: timerColor, fontSize: 13, fontWeight: '600' }}>Show</Text>
            ) : (
              <Text
                style={{
                  color: timerColor,
                  fontSize: 20,
                  fontWeight: '700',
                  fontVariant: ['tabular-nums'],
                  minWidth: 60,
                  textAlign: 'center',
                }}
              >
                {formatTime(secondsLeft)}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Question counter + progress */}
        <View style={{ paddingHorizontal: spacing.md, paddingTop: spacing.sm }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: spacing.sm,
            }}
          >
            <Text style={{ color: colors.white, fontSize: 14, fontWeight: '600' }}>
              Question {currentIndex + 1} of {totalQuestions}
            </Text>
            <Text style={{ color: colors.muted, fontSize: 12 }}>
              {answeredCount} answered
            </Text>
          </View>

          {/* Progress bar */}
          <View style={{ height: 3, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 100 }}>
            <View
              style={{
                height: 3,
                backgroundColor: catColor,
                borderRadius: 100,
                width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
              }}
            />
          </View>
        </View>

        <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingTop: spacing.md }}>
          <Animated.View style={{ opacity: fadeAnim }}>
            {/* Passage */}
            {question.passage && (
              <View
                style={{
                  backgroundColor: colors.bgLight,
                  borderWidth: 1.5,
                  borderColor: colors.border,
                  borderRadius: radius.lg,
                  padding: spacing.md,
                  marginBottom: spacing.md,
                }}
              >
                <Text
                  style={{
                    color: catColor,
                    fontSize: 10,
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: 1.5,
                    marginBottom: spacing.sm,
                  }}
                >
                  Read the passage
                </Text>
                <Text
                  style={{
                    color: 'rgba(250,250,249,0.85)',
                    fontSize: 14,
                    lineHeight: 22,
                  }}
                >
                  {question.passage}
                </Text>
              </View>
            )}

            {/* Question text */}
            <Text
              style={{
                color: colors.white,
                fontSize: 16,
                fontWeight: '600',
                lineHeight: 24,
                marginBottom: spacing.lg,
              }}
            >
              {question.question}
            </Text>

            {/* Options — no answer reveal in full test mode */}
            {question.options.map((opt) => {
              const isSelected = selected === opt.letter
              return (
                <TouchableOpacity
                  key={opt.letter}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: isSelected ? colors.goldDim : colors.cardBg,
                    borderWidth: 1.5,
                    borderColor: isSelected ? colors.goldBorder : colors.border,
                    borderRadius: radius.md,
                    padding: spacing.md,
                    marginBottom: spacing.sm,
                  }}
                  onPress={() => handleSelect(opt.letter)}
                  activeOpacity={0.7}
                >
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: radius.full,
                      backgroundColor: isSelected ? colors.gold : 'rgba(255,255,255,0.04)',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: spacing.md,
                    }}
                  >
                    <Text
                      style={{
                        color: isSelected ? colors.bg : colors.muted,
                        fontSize: 14,
                        fontWeight: '700',
                      }}
                    >
                      {opt.letter}
                    </Text>
                  </View>
                  <Text style={{ color: colors.white, fontSize: 15, flex: 1, lineHeight: 22 }}>
                    {opt.text}
                  </Text>
                </TouchableOpacity>
              )
            })}

            {/* Navigation */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: spacing.lg,
                marginBottom: spacing.xxl,
              }}
            >
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <TouchableOpacity
                  style={{
                    borderWidth: 1.5,
                    borderColor: colors.border,
                    borderRadius: radius.full,
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    opacity: currentIndex === 0 ? 0.3 : 1,
                  }}
                  onPress={() => handleNav(currentIndex - 1)}
                  disabled={currentIndex === 0}
                  activeOpacity={0.7}
                >
                  <Ionicons name="chevron-back" size={18} color={colors.white} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 6,
                    borderWidth: 1.5,
                    borderColor: flagged.has(question.id) ? colors.red : colors.border,
                    backgroundColor: flagged.has(question.id) ? colors.red + '12' : 'transparent',
                    borderRadius: radius.full,
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                  }}
                  onPress={toggleFlag}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={flagged.has(question.id) ? 'flag' : 'flag-outline'}
                    size={16}
                    color={flagged.has(question.id) ? colors.red : colors.muted}
                  />
                  <Text
                    style={{
                      color: flagged.has(question.id) ? colors.red : colors.muted,
                      fontSize: 13,
                      fontWeight: '600',
                    }}
                  >
                    Flag
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', gap: 8 }}>
                <TouchableOpacity
                  style={{
                    borderWidth: 1.5,
                    borderColor: colors.border,
                    borderRadius: radius.full,
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                  }}
                  onPress={() => setShowReview(true)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="grid-outline" size={16} color={colors.muted} />
                </TouchableOpacity>
                {currentIndex + 1 < totalQuestions ? (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                      backgroundColor: colors.gold,
                      borderRadius: radius.full,
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                    }}
                    onPress={() => handleNav(currentIndex + 1)}
                    activeOpacity={0.7}
                  >
                    <Text style={{ color: colors.bg, fontSize: 14, fontWeight: '700' }}>Next</Text>
                    <Ionicons name="chevron-forward" size={16} color={colors.bg} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                      backgroundColor: colors.gold,
                      borderRadius: radius.full,
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                    }}
                    onPress={() => setShowReview(true)}
                    activeOpacity={0.7}
                  >
                    <Text style={{ color: colors.bg, fontSize: 14, fontWeight: '700' }}>Finish</Text>
                    <Ionicons name="checkmark" size={16} color={colors.bg} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </Animated.View>
        </ScrollView>

        <FloatingTutorChat question={question} />
      </View>
    </SafeAreaView>
  )
}

// ══════════════════════════════════════════════════════════════════
//  SCORE REPORT  (with answer review)
// ══════════════════════════════════════════════════════════════════
function ScoreReport({
  testType,
  testId,
  allAnswers,
  allQuestions,
  config,
  totalTimeMs,
  onRestart,
}: {
  testType: string
  testId: string
  allAnswers: TestAnswer[]
  allQuestions: SATPoolQuestion[]
  config: TestConfig
  totalTimeMs: number
  onRestart: () => void
}) {
  const user = useAuthStore((s) => s.user)
  const savedRef = useRef(false)
  const [showAnswerReview, setShowAnswerReview] = useState(false)
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect' | 'unanswered'>('all')

  // Calculate scores per section
  const sectionResults: Record<string, { total: number; correct: number }> = {}
  allAnswers.forEach((a) => {
    const cat = a.category
    if (!sectionResults[cat]) sectionResults[cat] = { total: 0, correct: 0 }
    sectionResults[cat].total++
    if (a.selected === a.correct) sectionResults[cat].correct++
  })

  const totalCorrect = allAnswers.filter((a) => a.selected === a.correct).length
  const totalQuestions = allAnswers.length
  const overallPct = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0

  const isACT = testType === 'act'
  const estimatedSATScore = !isACT ? computeSATScore(allAnswers) : null
  const estimatedACTScore = isACT ? computeACTScore(allAnswers) : null

  // Save results to database (once)
  useEffect(() => {
    if (savedRef.current || !user) return
    savedRef.current = true

    const meta = isACT
      ? {
          testType: 'act' as const,
          testId,
          estimatedScore: {
            composite: estimatedACTScore!.composite,
            english: estimatedACTScore!.english,
            math: estimatedACTScore!.math,
            reading: estimatedACTScore!.reading,
            science: estimatedACTScore!.science,
          },
        }
      : {
          testType: 'sat' as const,
          testId,
          estimatedScore: {
            total: estimatedSATScore!.total,
            rw: estimatedSATScore!.rw,
            math: estimatedSATScore!.math,
          },
        }

    savePracticeSession({
      user_id: user.id,
      session_type: 'full_test',
      category: 'mixed',
      total_questions: totalQuestions,
      correct_answers: totalCorrect,
      answers: {
        meta,
        questions: allAnswers,
      },
      time_spent_seconds: totalTimeMs ? Math.round(totalTimeMs / 1000) : null,
      is_full_test: true,
    }).catch((err: unknown) => console.error('[FullTest] Failed to save results:', err))
  }, [user])

  // Subcategory breakdown
  const subcatResults: Record<string, { total: number; correct: number; category: string }> = {}
  allAnswers.forEach((a) => {
    const key = a.subcategory || a.category
    if (!subcatResults[key]) subcatResults[key] = { total: 0, correct: 0, category: a.category }
    subcatResults[key].total++
    if (a.selected === a.correct) subcatResults[key].correct++
  })

  const unanswered = allAnswers.filter((a) => !a.selected).length

  // Build answer review data by mapping answers to questions
  const questionMap = new Map<string, SATPoolQuestion>()
  allQuestions.forEach((q) => questionMap.set(q.id, q))

  const filteredAnswers = allAnswers.filter((a) => {
    if (reviewFilter === 'incorrect') return a.selected !== a.correct && a.selected !== null
    if (reviewFilter === 'unanswered') return !a.selected
    return true
  })

  // ── Answer review mode ──
  if (showAnswerReview) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: spacing.md,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          }}
        >
          <TouchableOpacity onPress={() => setShowAnswerReview(false)} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={{ color: colors.white, fontSize: 17, fontWeight: '700' }}>
            Review Answers
          </Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Filter tabs */}
        <View
          style={{
            flexDirection: 'row',
            padding: spacing.md,
            gap: 8,
          }}
        >
          {(['all', 'incorrect', 'unanswered'] as const).map((f) => {
            const active = reviewFilter === f
            const count =
              f === 'all'
                ? allAnswers.length
                : f === 'incorrect'
                ? allAnswers.filter((a) => a.selected !== a.correct && a.selected !== null).length
                : unanswered
            return (
              <TouchableOpacity
                key={f}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: radius.full,
                  backgroundColor: active ? colors.goldDim : 'rgba(255,255,255,0.04)',
                  borderWidth: active ? 1.5 : 0,
                  borderColor: active ? colors.goldBorder : 'transparent',
                }}
                onPress={() => setReviewFilter(f)}
                activeOpacity={0.7}
              >
                <Text
                  style={{
                    color: active ? colors.gold : colors.muted,
                    fontSize: 13,
                    fontWeight: '600',
                    textTransform: 'capitalize',
                  }}
                >
                  {f} ({count})
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>

        <ScrollView contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xxl }}>
          {filteredAnswers.map((answer, i) => {
            const q = questionMap.get(answer.question_id)
            if (!q) return null
            const isCorrect = answer.selected === answer.correct
            const wasSkipped = !answer.selected
            return (
              <View
                key={answer.question_id}
                style={{
                  backgroundColor: colors.cardBg,
                  borderWidth: 1.5,
                  borderColor: wasSkipped
                    ? colors.gold + '40'
                    : isCorrect
                    ? colors.green + '40'
                    : colors.red + '40',
                  borderRadius: radius.lg,
                  padding: spacing.md,
                  marginBottom: spacing.md,
                }}
              >
                {/* Question header */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: spacing.sm,
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Ionicons
                      name={wasSkipped ? 'remove-circle' : isCorrect ? 'checkmark-circle' : 'close-circle'}
                      size={20}
                      color={wasSkipped ? colors.gold : isCorrect ? colors.green : colors.red}
                    />
                    <Text style={{ color: colors.muted, fontSize: 12, textTransform: 'capitalize' }}>
                      {q.category} · {q.subcategory || 'General'}
                    </Text>
                  </View>
                  {q.difficulty && (
                    <Text
                      style={{
                        color:
                          q.difficulty === 'easy'
                            ? colors.green
                            : q.difficulty === 'hard'
                            ? colors.red
                            : colors.gold,
                        fontSize: 11,
                        fontWeight: '600',
                        textTransform: 'uppercase',
                      }}
                    >
                      {q.difficulty}
                    </Text>
                  )}
                </View>

                {/* Passage snippet */}
                {q.passage && (
                  <Text
                    style={{
                      color: colors.muted,
                      fontSize: 12,
                      fontStyle: 'italic',
                      lineHeight: 18,
                      marginBottom: spacing.sm,
                    }}
                    numberOfLines={2}
                  >
                    {q.passage}
                  </Text>
                )}

                {/* Question text */}
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 14,
                    lineHeight: 20,
                    marginBottom: spacing.sm,
                  }}
                >
                  {q.question}
                </Text>

                {/* Options with correct/incorrect highlights */}
                {q.options.map((opt) => {
                  const wasSelected = answer.selected === opt.letter
                  const isCorrectAnswer = answer.correct === opt.letter
                  let optBg = 'transparent'
                  let optBorder = 'transparent'
                  let optTextColor = colors.muted
                  if (isCorrectAnswer) {
                    optBg = colors.green + '15'
                    optBorder = colors.green + '50'
                    optTextColor = colors.green
                  }
                  if (wasSelected && !isCorrectAnswer) {
                    optBg = colors.red + '15'
                    optBorder = colors.red + '50'
                    optTextColor = colors.red
                  }
                  return (
                    <View
                      key={opt.letter}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: optBg,
                        borderWidth: isCorrectAnswer || (wasSelected && !isCorrectAnswer) ? 1 : 0,
                        borderColor: optBorder,
                        borderRadius: radius.sm,
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        marginBottom: 4,
                      }}
                    >
                      <Text
                        style={{
                          color: optTextColor,
                          fontSize: 13,
                          fontWeight: isCorrectAnswer ? '700' : '500',
                          marginRight: 8,
                        }}
                      >
                        {opt.letter}.
                      </Text>
                      <Text
                        style={{
                          color: isCorrectAnswer ? colors.white : wasSelected ? colors.red : colors.muted,
                          fontSize: 13,
                          flex: 1,
                        }}
                      >
                        {opt.text}
                      </Text>
                      {isCorrectAnswer && (
                        <Ionicons name="checkmark" size={14} color={colors.green} />
                      )}
                      {wasSelected && !isCorrectAnswer && (
                        <Ionicons name="close" size={14} color={colors.red} />
                      )}
                    </View>
                  )
                })}

                {/* Explanation */}
                {q.explanation && (
                  <View
                    style={{
                      marginTop: spacing.sm,
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      borderRadius: radius.sm,
                      padding: 10,
                    }}
                  >
                    <Text style={{ color: colors.muted, fontSize: 10, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
                      Explanation
                    </Text>
                    <Text style={{ color: 'rgba(250,250,249,0.75)', fontSize: 13, lineHeight: 19 }}>
                      {q.explanation}
                    </Text>
                  </View>
                )}
              </View>
            )
          })}

          {filteredAnswers.length === 0 && (
            <View style={{ alignItems: 'center', padding: spacing.xl }}>
              <Text style={{ color: colors.muted, fontSize: 14 }}>
                No questions match this filter.
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <Text
          style={{
            color: colors.white,
            fontSize: 26,
            fontWeight: '800',
            marginBottom: spacing.sm,
          }}
        >
          Score Report
        </Text>
        <Text style={{ color: colors.muted, fontSize: 14, marginBottom: spacing.xl }}>
          Here's how you performed on the full {isACT ? 'ACT' : 'SAT'} practice test.
        </Text>

        {/* Big score card */}
        <View
          style={{
            borderWidth: 1.5,
            borderColor: colors.goldBorder,
            borderRadius: radius.lg,
            padding: spacing.xl,
            alignItems: 'center',
            marginBottom: spacing.lg,
            backgroundColor: 'rgba(245,200,66,0.04)',
          }}
        >
          <Text
            style={{
              color: colors.muted,
              fontSize: 11,
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: 1.5,
              marginBottom: spacing.sm,
            }}
          >
            {isACT ? 'ACT Composite Score' : 'Estimated SAT Score'}
          </Text>
          <Text
            style={{
              color: colors.gold,
              fontSize: 56,
              fontWeight: '800',
              marginBottom: 4,
            }}
          >
            {isACT ? estimatedACTScore!.composite : estimatedSATScore!.total}
          </Text>
          <Text style={{ color: colors.muted, fontSize: 14 }}>out of {config.scoreRange.max}</Text>

          {/* Section scores */}
          {isACT ? (
            <View style={{ marginTop: spacing.lg, width: '100%' }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 24,
                  flexWrap: 'wrap',
                }}
              >
                {[
                  { label: 'English', score: estimatedACTScore!.english, color: colors.flame },
                  { label: 'Math', score: estimatedACTScore!.math, color: colors.mathPurple },
                  { label: 'Reading', score: estimatedACTScore!.reading, color: colors.readingGreen },
                  ...(estimatedACTScore!.science != null
                    ? [{ label: 'Science', score: estimatedACTScore!.science, color: colors.gold }]
                    : []),
                ].map((s) => (
                  <View key={s.label} style={{ alignItems: 'center', minWidth: 60 }}>
                    <Text
                      style={{
                        color: s.color,
                        fontSize: 10,
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                        marginBottom: 4,
                      }}
                    >
                      {s.label}
                    </Text>
                    <Text style={{ color: colors.white, fontSize: 24, fontWeight: '800' }}>
                      {s.score}
                    </Text>
                  </View>
                ))}
              </View>
              {estimatedACTScore!.science != null && (
                <Text
                  style={{
                    color: colors.muted,
                    fontSize: 11,
                    textAlign: 'center',
                    marginTop: spacing.sm,
                    fontStyle: 'italic',
                  }}
                >
                  Science is scored separately and not included in the composite.
                </Text>
              )}
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 40,
                marginTop: spacing.lg,
              }}
            >
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    color: colors.readingGreen,
                    fontSize: 10,
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    marginBottom: 4,
                  }}
                >
                  Reading & Writing
                </Text>
                <Text style={{ color: colors.white, fontSize: 24, fontWeight: '800' }}>
                  {estimatedSATScore!.rw}
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    color: colors.mathPurple,
                    fontSize: 10,
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    marginBottom: 4,
                  }}
                >
                  Math
                </Text>
                <Text style={{ color: colors.white, fontSize: 24, fontWeight: '800' }}>
                  {estimatedSATScore!.math}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Stats row */}
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: spacing.lg }}>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.cardBg,
              borderWidth: 1.5,
              borderColor: colors.border,
              borderRadius: radius.lg,
              padding: spacing.md,
            }}
          >
            <Text
              style={{
                color: colors.muted,
                fontSize: 10,
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                marginBottom: 6,
              }}
            >
              Correct
            </Text>
            <Text style={{ color: colors.green, fontSize: 22, fontWeight: '800' }}>
              {totalCorrect}
            </Text>
            <Text style={{ color: colors.muted, fontSize: 12 }}>of {totalQuestions}</Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.cardBg,
              borderWidth: 1.5,
              borderColor: colors.border,
              borderRadius: radius.lg,
              padding: spacing.md,
            }}
          >
            <Text
              style={{
                color: colors.muted,
                fontSize: 10,
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                marginBottom: 6,
              }}
            >
              Accuracy
            </Text>
            <Text style={{ color: colors.white, fontSize: 22, fontWeight: '800' }}>
              {overallPct}%
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.cardBg,
              borderWidth: 1.5,
              borderColor: colors.border,
              borderRadius: radius.lg,
              padding: spacing.md,
            }}
          >
            <Text
              style={{
                color: colors.muted,
                fontSize: 10,
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                marginBottom: 6,
              }}
            >
              Unanswered
            </Text>
            <Text
              style={{
                color: unanswered > 0 ? colors.red : colors.green,
                fontSize: 22,
                fontWeight: '800',
              }}
            >
              {unanswered}
            </Text>
          </View>
        </View>

        {/* Category breakdown */}
        <Text
          style={{
            color: colors.white,
            fontSize: 18,
            fontWeight: '700',
            marginBottom: spacing.md,
          }}
        >
          Category Breakdown
        </Text>
        {Object.entries(subcatResults).map(([key, val]) => {
          const pct = Math.round((val.correct / val.total) * 100)
          const color = sectionColors[val.category] || colors.muted
          return (
            <View
              key={key}
              style={{
                backgroundColor: colors.cardBg,
                borderWidth: 1.5,
                borderColor: colors.border,
                borderRadius: radius.md,
                padding: 14,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: spacing.sm,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
                <View
                  style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color }}
                />
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 13,
                    fontWeight: '500',
                    textTransform: 'capitalize',
                    flex: 1,
                  }}
                >
                  {key.replace(/-/g, ' ')}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View
                  style={{
                    width: 60,
                    height: 4,
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    borderRadius: 100,
                  }}
                >
                  <View
                    style={{
                      height: 4,
                      backgroundColor: color,
                      borderRadius: 100,
                      width: `${pct}%`,
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: pct >= 70 ? colors.green : pct >= 40 ? colors.gold : colors.red,
                    fontSize: 12,
                    fontWeight: '600',
                    minWidth: 60,
                    textAlign: 'right',
                  }}
                >
                  {val.correct}/{val.total} ({pct}%)
                </Text>
              </View>
            </View>
          )
        })}

        {/* Actions */}
        <View style={{ marginTop: spacing.lg, gap: 12, marginBottom: spacing.xxl }}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.gold,
              borderRadius: radius.md,
              paddingVertical: 16,
              alignItems: 'center',
            }}
            onPress={() => setShowAnswerReview(true)}
            activeOpacity={0.7}
          >
            <Text style={{ color: colors.bg, fontSize: 16, fontWeight: '700' }}>
              Review Answers
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 1.5,
              borderColor: colors.border,
              borderRadius: radius.md,
              paddingVertical: 16,
              alignItems: 'center',
            }}
            onPress={onRestart}
            activeOpacity={0.7}
          >
            <Text style={{ color: colors.white, fontSize: 16, fontWeight: '700' }}>
              Take Another Test
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

// ══════════════════════════════════════════════════════════════════
//  FULL TEST PAGE — Main Orchestrator
// ══════════════════════════════════════════════════════════════════
export default function FullTestScreen() {
  const [phase, setPhase] = useState<Phase>('select')
  const [testId, setTestId] = useState<string | null>(null)
  const [testType, setTestType] = useState<string | null>(null)
  const [config, setConfig] = useState<TestConfig | null>(null)
  const [questionsBySection, setQuestionsBySection] = useState<Record<
    string,
    SATPoolQuestion[]
  > | null>(null)
  const [allPoolQuestions, setAllPoolQuestions] = useState<SATPoolQuestion[]>([])
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [allAnswers, setAllAnswers] = useState<TestAnswer[]>([])
  const [totalTimeMs, setTotalTimeMs] = useState(0)

  const handleSelectTest = (id: string, type: string) => {
    setTestId(id)
    setTestType(type)
    const activeConfig = type === 'act' ? ACT_CONFIG : SAT_CONFIG
    setConfig(activeConfig)
    setPhase('loading')

    // Small timeout so loading spinner renders
    setTimeout(() => {
      try {
        if (type === 'act') {
          // Build ACT test — include Science as a standard section
          const actResult = buildRandomACTTest(
            actEnglishPool as SATPoolQuestion[],
            actMathPool as SATPoolQuestion[],
            actReadingPool as SATPoolQuestion[],
            actSciencePool as SATPoolQuestion[]
          )
          const sectionQuestions: Record<string, SATPoolQuestion[]> = {
            english: actResult.english as SATPoolQuestion[],
            math: actResult.math as SATPoolQuestion[],
            reading: actResult.reading as SATPoolQuestion[],
          }
          const allQs: SATPoolQuestion[] = [
            ...sectionQuestions.english,
            ...sectionQuestions.math,
            ...sectionQuestions.reading,
          ]
          if (actResult.science) {
            sectionQuestions.science = actResult.science as SATPoolQuestion[]
            allQs.push(...sectionQuestions.science)
          }
          setQuestionsBySection(sectionQuestions)
          setAllPoolQuestions(allQs)
          setPhase('testing')
        } else {
          // Build SAT test
          const sectionQuestions = buildRandomSATTest(satRWPool, satMathPool)
          if (sectionQuestions) {
            setQuestionsBySection(sectionQuestions)
            const allQs = [
              ...(sectionQuestions.rw1 || []),
              ...(sectionQuestions.rw2 || []),
              ...(sectionQuestions.math1 || []),
              ...(sectionQuestions.math2 || []),
            ]
            setAllPoolQuestions(allQs)
            setPhase('testing')
          } else {
            Alert.alert('Error', 'Could not load test questions. Please try again.')
            setPhase('select')
          }
        }
      } catch (err) {
        console.error('[FullTest] Failed to build test:', err)
        Alert.alert('Error', 'Could not load test questions. Please try again.')
        setPhase('select')
      }
    }, 300)
  }

  const sections = config?.sections || []
  // Only count test sections (not breaks) for display
  const testSections = sections.filter((s) => s.type !== 'break')
  const currentSection = sections[currentSectionIndex]
  const currentTestSectionNumber =
    currentSection && currentSection.type !== 'break'
      ? testSections.findIndex((s) => s.id === currentSection.id) + 1
      : 0

  const handleSectionComplete = (answers: TestAnswer[], sectionTimeMs: number) => {
    setAllAnswers((prev) => [...prev, ...answers])
    if (sectionTimeMs) setTotalTimeMs((prev) => prev + sectionTimeMs)

    const nextIdx = currentSectionIndex + 1
    if (nextIdx >= sections.length) {
      setPhase('results')
      return
    }

    const nextSection = sections[nextIdx]
    setCurrentSectionIndex(nextIdx)
    if (nextSection.type === 'break') {
      setPhase('break')
    } else {
      setPhase('testing')
    }
  }

  const handleBreakEnd = () => {
    const nextIdx = currentSectionIndex + 1
    if (nextIdx >= sections.length) {
      setPhase('results')
      return
    }
    setCurrentSectionIndex(nextIdx)
    setPhase('testing')
  }

  const handleRestart = () => {
    setPhase('select')
    setTestId(null)
    setTestType(null)
    setConfig(null)
    setQuestionsBySection(null)
    setAllPoolQuestions([])
    setCurrentSectionIndex(0)
    setAllAnswers([])
    setTotalTimeMs(0)
  }

  if (phase === 'select') {
    return <TestSelectionScreen onSelect={handleSelectTest} />
  }

  if (phase === 'loading') {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.bg,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color={colors.gold} />
        <Text style={{ color: colors.muted, fontSize: 14, marginTop: spacing.md }}>
          Building your practice test...
        </Text>
      </SafeAreaView>
    )
  }

  if (phase === 'break' && currentSection?.type === 'break') {
    const completedTestSections = sections
      .slice(0, currentSectionIndex)
      .filter((s) => s.type !== 'break').length
    const nextTestSection = sections
      .slice(currentSectionIndex + 1)
      .find((s) => s.type !== 'break')
    return (
      <BreakScreen
        timeMinutes={currentSection.timeMinutes}
        nextSectionName={nextTestSection?.name || 'Next Section'}
        sectionsCompleted={completedTestSections}
        totalSections={testSections.length}
        onEnd={handleBreakEnd}
      />
    )
  }

  if (phase === 'testing' && currentSection && questionsBySection) {
    const sectionQuestions = questionsBySection[currentSection.id] || []
    if (sectionQuestions.length === 0) {
      // Skip empty sections (can happen with small question pools)
      setTimeout(() => {
        handleSectionComplete([], 0)
      }, 0)
      return (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: colors.bg,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" color={colors.gold} />
        </SafeAreaView>
      )
    }
    return (
      <SectionScreen
        key={currentSection.id}
        section={currentSection}
        sectionNumber={currentTestSectionNumber}
        totalSections={testSections.length}
        questions={sectionQuestions}
        onComplete={handleSectionComplete}
      />
    )
  }

  if (phase === 'results' && testType && testId && config) {
    return (
      <ScoreReport
        testType={testType}
        testId={testId}
        allAnswers={allAnswers}
        allQuestions={allPoolQuestions}
        config={config}
        totalTimeMs={totalTimeMs}
        onRestart={handleRestart}
      />
    )
  }

  return null
}
