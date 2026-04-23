import { useState, useEffect, useRef } from 'react'
import {
  View, Text, TouchableOpacity, ScrollView, Animated,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useDiagnosticStore } from '@/stores/diagnosticStore'
import { diagnosticQuestions } from '@/data/diagnosticQuestions'
import { colors, spacing, radius, categoryColor } from '@/theme'
import { Ionicons } from '@expo/vector-icons'

export default function DiagnosticScreen() {
  const [started, setStarted] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const { currentQuestionIndex, isComplete, startTest, submitAnswer, nextQuestion } = useDiagnosticStore()
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (!started) return
    const timer = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(timer)
  }, [started])

  useEffect(() => {
    if (isComplete) {
      router.replace('/diagnostic-results')
    }
  }, [isComplete])

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start()
  }, [currentQuestionIndex])

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

  if (!started) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
        <ScrollView contentContainerStyle={{ padding: spacing.lg, flexGrow: 1, justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => router.back()} style={{ position: 'absolute', top: 10, left: 0 }}>
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>

          <View style={{ alignItems: 'center', marginBottom: spacing.xl }}>
            <View style={{
              width: 72, height: 72, borderRadius: radius.xl, backgroundColor: colors.goldDim,
              justifyContent: 'center', alignItems: 'center', marginBottom: spacing.md,
            }}>
              <Ionicons name="clipboard" size={32} color={colors.gold} />
            </View>
            <Text style={{ color: colors.white, fontSize: 26, fontWeight: '700', textAlign: 'center' }}>
              Free Diagnostic Test
            </Text>
            <Text style={{ color: colors.muted, fontSize: 14, textAlign: 'center', marginTop: spacing.sm, lineHeight: 20 }}>
              20 questions across Math, Reading & Writing.{'\n'}Takes about 15 minutes.
            </Text>
          </View>

          {/* Breakdown */}
          {[
            { label: 'Math', count: 7, color: colors.mathPurple, icon: 'calculator' as const },
            { label: 'Reading', count: 7, color: colors.readingGreen, icon: 'book' as const },
            { label: 'Writing', count: 6, color: colors.writingYellow, icon: 'pencil' as const },
          ].map((item) => (
            <View key={item.label} style={{
              flexDirection: 'row', alignItems: 'center', backgroundColor: colors.cardBg,
              padding: spacing.md, borderRadius: radius.md, marginBottom: spacing.sm,
              borderWidth: 1, borderColor: colors.border,
            }}>
              <View style={{
                width: 40, height: 40, borderRadius: radius.sm, backgroundColor: item.color + '20',
                justifyContent: 'center', alignItems: 'center', marginRight: spacing.md,
              }}>
                <Ionicons name={item.icon} size={20} color={item.color} />
              </View>
              <Text style={{ color: colors.white, fontSize: 16, flex: 1, fontWeight: '500' }}>{item.label}</Text>
              <Text style={{ color: colors.muted, fontSize: 14 }}>{item.count} questions</Text>
            </View>
          ))}

          <TouchableOpacity
            style={{
              backgroundColor: colors.gold, borderRadius: radius.md, paddingVertical: 16,
              alignItems: 'center', marginTop: spacing.xl,
            }}
            onPress={() => { startTest(); setStarted(true) }}
            accessibilityRole="button"
            accessibilityLabel="Start Diagnostic"
          >
            <Text style={{ color: colors.bg, fontSize: 17, fontWeight: '700' }}>Start Diagnostic</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  }

  const question = diagnosticQuestions[currentQuestionIndex]
  const progress = (currentQuestionIndex + 1) / diagnosticQuestions.length

  const handleSelect = (letter: string) => {
    if (showResult) return
    setSelectedAnswer(letter)
    submitAnswer(question.id, letter, question.correct, question.category)
    setShowResult(true)
  }

  const handleNext = () => {
    setSelectedAnswer(null)
    setShowResult(false)
    fadeAnim.setValue(0)
    nextQuestion(diagnosticQuestions.length)
  }

  const isCorrect = selectedAnswer === question.correct

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Top bar */}
      <View style={{ padding: spacing.md, paddingTop: spacing.sm }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm }}>
          <View style={{
            backgroundColor: categoryColor(question.category) + '20',
            paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.full,
          }}>
            <Text style={{ color: categoryColor(question.category), fontSize: 12, fontWeight: '600', textTransform: 'capitalize' }}>
              {question.category}
            </Text>
          </View>
          <Text style={{ color: colors.muted, fontSize: 13 }}>{formatTime(elapsed)}</Text>
          <Text style={{ color: colors.muted, fontSize: 13 }}>
            {currentQuestionIndex + 1}/{diagnosticQuestions.length}
          </Text>
        </View>
        {/* Progress bar */}
        <View style={{ height: 4, backgroundColor: colors.border, borderRadius: 2 }}>
          <View style={{ height: 4, backgroundColor: colors.gold, borderRadius: 2, width: `${progress * 100}%` }} />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingTop: spacing.sm }}>
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Passage */}
          {question.passage && (
            <View style={{
              backgroundColor: colors.cardBg, padding: spacing.md, borderRadius: radius.md,
              marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border,
            }}>
              <Text style={{ color: colors.muted, fontSize: 13, lineHeight: 20 }}>{question.passage}</Text>
            </View>
          )}

          {/* Question */}
          <Text style={{ color: colors.white, fontSize: 17, fontWeight: '600', lineHeight: 24, marginBottom: spacing.lg }}>
            {question.question}
          </Text>

          {/* Options */}
          {question.options.map((opt) => {
            let bgColor = colors.cardBg
            let borderColor = colors.border
            if (showResult) {
              if (opt.letter === question.correct) {
                bgColor = colors.green + '15'
                borderColor = colors.green
              } else if (opt.letter === selectedAnswer && !isCorrect) {
                bgColor = colors.red + '15'
                borderColor = colors.red
              }
            } else if (selectedAnswer === opt.letter) {
              borderColor = colors.gold
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
                disabled={showResult}
                accessibilityRole="button"
                accessibilityLabel={`Answer ${opt.letter}: ${opt.text}`}
              >
                <View style={{
                  width: 32, height: 32, borderRadius: radius.full, backgroundColor: colors.bgLight,
                  justifyContent: 'center', alignItems: 'center', marginRight: spacing.md,
                  borderWidth: 1, borderColor: colors.border,
                }}>
                  <Text style={{ color: colors.white, fontSize: 14, fontWeight: '600' }}>{opt.letter}</Text>
                </View>
                <Text style={{ color: colors.white, fontSize: 15, flex: 1, lineHeight: 21 }}>{opt.text}</Text>
                {showResult && opt.letter === question.correct && (
                  <Ionicons name="checkmark-circle" size={22} color={colors.green} />
                )}
                {showResult && opt.letter === selectedAnswer && !isCorrect && opt.letter !== question.correct && (
                  <Ionicons name="close-circle" size={22} color={colors.red} />
                )}
              </TouchableOpacity>
            )
          })}

          {/* Explanation */}
          {showResult && (
            <View style={{
              backgroundColor: isCorrect ? colors.green + '10' : colors.red + '10',
              padding: spacing.md, borderRadius: radius.md, marginTop: spacing.sm,
              borderWidth: 1, borderColor: isCorrect ? colors.green + '30' : colors.red + '30',
            }}>
              <Text style={{ color: isCorrect ? colors.green : colors.red, fontWeight: '600', marginBottom: 4 }}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </Text>
              <Text style={{ color: colors.muted, fontSize: 14, lineHeight: 20 }}>{question.explanation}</Text>
            </View>
          )}

          {showResult && (
            <TouchableOpacity
              style={{
                backgroundColor: colors.gold, borderRadius: radius.md, paddingVertical: 14,
                alignItems: 'center', marginTop: spacing.lg,
              }}
              onPress={handleNext}
              accessibilityRole="button"
              accessibilityLabel={currentQuestionIndex + 1 >= diagnosticQuestions.length ? 'See Results' : 'Next Question'}
            >
              <Text style={{ color: colors.bg, fontSize: 16, fontWeight: '700' }}>
                {currentQuestionIndex + 1 >= diagnosticQuestions.length ? 'See Results' : 'Next Question'}
              </Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  )
}
