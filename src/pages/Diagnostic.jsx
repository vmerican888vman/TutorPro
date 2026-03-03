import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDiagnosticStore } from '../stores/diagnosticStore'
import { diagnosticQuestions } from '../data/diagnosticQuestions'

const gold = '#F5C842'
const bg = '#07070F'
const bgLight = '#0E0E1A'
const cardBg = '#0C0C18'
const white = '#FAFAF9'
const muted = '#9B9BAD'
const border = 'rgba(255,255,255,0.06)'
const goldDim = 'rgba(245,200,66,0.15)'
const goldBorder = 'rgba(245,200,66,0.25)'
const green = '#34D399'
const red = '#F87171'
const transition = 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
const heading = "'Playfair Display', serif"
const body = "'DM Sans', sans-serif"

const categoryColors = {
  math: '#818CF8',
  reading: '#34D399',
  writing: '#FBBF24',
}

const categoryLabels = {
  math: 'Math',
  reading: 'Reading',
  writing: 'Writing',
}

/* ══════════════════════════════════════════════════════════════════
   TIMER HOOK
   ══════════════════════════════════════════════════════════════════ */
function useTimer(running) {
  const startRef = useState(() => Date.now())[0]
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (!running) return
    const interval = setInterval(() => {
      setSeconds(Math.floor((Date.now() - startRef) / 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [running, startRef])

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

/* ══════════════════════════════════════════════════════════════════
   INTRO SCREEN
   ══════════════════════════════════════════════════════════════════ */
function IntroScreen({ onStart }) {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '48px 24px',
    }}>
      <div style={{ maxWidth: 560, textAlign: 'center' }}>
        <div style={{
          display: 'inline-block', background: goldDim, color: gold,
          fontSize: '0.8rem', fontWeight: 700, fontFamily: body,
          padding: '6px 16px', borderRadius: 100, marginBottom: 24,
          textTransform: 'uppercase', letterSpacing: 1.5,
        }}>
          Free Diagnostic
        </div>

        <h1 style={{
          fontFamily: heading, fontWeight: 800,
          fontSize: 'clamp(2rem, 4.5vw, 3rem)', color: white,
          marginBottom: 16, lineHeight: 1.15,
        }}>
          Find out where you stand
        </h1>

        <p style={{
          fontFamily: body, fontSize: '1.1rem', color: muted,
          lineHeight: 1.7, marginBottom: 40,
        }}>
          20 questions across Math, Reading, and Writing. Takes about 15 minutes.
          No account needed — see your score breakdown instantly.
        </p>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
          marginBottom: 40,
        }}>
          {[
            { label: 'Math', count: '7 questions', color: categoryColors.math },
            { label: 'Reading', count: '7 questions', color: categoryColors.reading },
            { label: 'Writing', count: '6 questions', color: categoryColors.writing },
          ].map((cat) => (
            <div key={cat.label} style={{
              background: cardBg, border: `1.5px solid ${border}`,
              borderRadius: 14, padding: '20px 16px',
            }}>
              <div style={{
                width: 10, height: 10, borderRadius: '50%',
                background: cat.color, marginBottom: 10,
              }} />
              <div style={{ fontFamily: body, fontWeight: 600, color: white, fontSize: '0.95rem' }}>
                {cat.label}
              </div>
              <div style={{ fontFamily: body, fontSize: '0.8rem', color: muted, marginTop: 2 }}>
                {cat.count}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          style={{
            background: gold, color: bg, fontWeight: 700, fontSize: '1.1rem',
            padding: '16px 48px', borderRadius: 100, fontFamily: body,
            transition, cursor: 'pointer', border: 'none',
          }}
        >
          Start Diagnostic
        </button>

        <p style={{ fontFamily: body, fontSize: '0.85rem', color: muted, marginTop: 16 }}>
          No credit card required
        </p>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   QUESTION SCREEN
   ══════════════════════════════════════════════════════════════════ */
function QuestionScreen() {
  const navigate = useNavigate()
  const {
    currentQuestionIndex, submitAnswer, nextQuestion, isComplete,
  } = useDiagnosticStore()

  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const question = diagnosticQuestions[currentQuestionIndex]
  const totalQuestions = diagnosticQuestions.length
  const progress = ((currentQuestionIndex) / totalQuestions) * 100
  const timer = useTimer(true)

  // Navigate to results when complete
  useEffect(() => {
    if (isComplete) {
      navigate('/diagnostic/results')
    }
  }, [isComplete, navigate])

  const handleSelect = (letter) => {
    if (hasSubmitted) return
    setSelectedAnswer(letter)
    setHasSubmitted(true)
    submitAnswer(question.id, letter, question.correct, question.category)
  }

  const handleNext = () => {
    setSelectedAnswer(null)
    setHasSubmitted(false)
    nextQuestion(totalQuestions)
  }

  const isCorrect = selectedAnswer === question.correct
  const catColor = categoryColors[question.category]

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(7,7,15,0.95)', backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${border}`, padding: '0 24px',
      }}>
        <div style={{
          maxWidth: 800, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 60,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              background: catColor + '22', color: catColor,
              fontSize: '0.75rem', fontWeight: 700, fontFamily: body,
              padding: '4px 12px', borderRadius: 100, textTransform: 'uppercase',
              letterSpacing: 1,
            }}>
              {categoryLabels[question.category]}
            </span>
            <span style={{ fontFamily: body, fontSize: '0.9rem', color: muted }}>
              {currentQuestionIndex + 1} of {totalQuestions}
            </span>
          </div>

          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem',
            color: muted, background: bgLight, padding: '4px 14px',
            borderRadius: 100, border: `1px solid ${border}`,
          }}>
            {timer}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          height: 3, background: 'rgba(255,255,255,0.05)',
          position: 'absolute', bottom: 0, left: 0, right: 0,
        }}>
          <div style={{
            height: '100%', background: gold, width: `${progress}%`,
            transition: 'width 0.4s ease',
          }} />
        </div>
      </div>

      {/* Question content */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '48px 24px',
      }}>
        <div style={{ maxWidth: 700, width: '100%' }}>
          {/* Passage (if reading question) */}
          {question.passage && (
            <div style={{
              background: bgLight, border: `1.5px solid ${border}`,
              borderRadius: 14, padding: '24px 28px', marginBottom: 32,
            }}>
              <div style={{
                fontFamily: body, fontSize: '0.75rem', fontWeight: 600,
                color: catColor, textTransform: 'uppercase', letterSpacing: 1.5,
                marginBottom: 12,
              }}>
                Read the passage
              </div>
              <p style={{
                fontFamily: body, fontSize: '0.95rem', color: 'rgba(250,250,249,0.85)',
                lineHeight: 1.8,
              }}>
                {question.passage}
              </p>
            </div>
          )}

          {/* Question text */}
          <h2 style={{
            fontFamily: body, fontWeight: 600, fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
            color: white, lineHeight: 1.5, marginBottom: 32,
          }}>
            {question.question}
          </h2>

          {/* Answer options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {question.options.map((opt) => {
              const isSelected = selectedAnswer === opt.letter
              const isCorrectOption = opt.letter === question.correct
              let optionBg = cardBg
              let optionBorder = border
              let optionColor = white

              if (hasSubmitted) {
                if (isCorrectOption) {
                  optionBg = 'rgba(52,211,153,0.08)'
                  optionBorder = 'rgba(52,211,153,0.4)'
                  optionColor = green
                } else if (isSelected && !isCorrectOption) {
                  optionBg = 'rgba(248,113,113,0.08)'
                  optionBorder = 'rgba(248,113,113,0.4)'
                  optionColor = red
                }
              } else if (isSelected) {
                optionBg = goldDim
                optionBorder = goldBorder
              }

              return (
                <button
                  key={opt.letter}
                  onClick={() => handleSelect(opt.letter)}
                  disabled={hasSubmitted}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    background: optionBg, border: `1.5px solid ${optionBorder}`,
                    borderRadius: 12, padding: '16px 20px',
                    cursor: hasSubmitted ? 'default' : 'pointer',
                    transition, textAlign: 'left', width: '100%',
                  }}
                >
                  <span style={{
                    width: 36, height: 36, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: body, fontWeight: 700, fontSize: '0.85rem',
                    flexShrink: 0,
                    background: hasSubmitted && isCorrectOption
                      ? 'rgba(52,211,153,0.15)'
                      : hasSubmitted && isSelected && !isCorrectOption
                        ? 'rgba(248,113,113,0.15)'
                        : 'rgba(255,255,255,0.05)',
                    color: hasSubmitted && isCorrectOption
                      ? green
                      : hasSubmitted && isSelected && !isCorrectOption
                        ? red
                        : muted,
                  }}>
                    {hasSubmitted && isCorrectOption ? '✓' : hasSubmitted && isSelected && !isCorrectOption ? '✗' : opt.letter}
                  </span>
                  <span style={{
                    fontFamily: body, fontSize: '1rem', color: optionColor,
                    fontWeight: isSelected ? 600 : 400,
                  }}>
                    {opt.text}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Explanation (shown after answer) */}
          {hasSubmitted && (
            <div style={{
              marginTop: 24, padding: '20px 24px',
              background: isCorrect ? 'rgba(52,211,153,0.06)' : 'rgba(248,113,113,0.06)',
              border: `1.5px solid ${isCorrect ? 'rgba(52,211,153,0.2)' : 'rgba(248,113,113,0.2)'}`,
              borderRadius: 14,
            }}>
              <div style={{
                fontFamily: body, fontWeight: 700, fontSize: '0.9rem',
                color: isCorrect ? green : red, marginBottom: 8,
              }}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </div>
              <p style={{
                fontFamily: body, fontSize: '0.95rem', color: muted, lineHeight: 1.7,
              }}>
                {question.explanation}
              </p>
            </div>
          )}

          {/* Next button */}
          {hasSubmitted && (
            <div style={{ marginTop: 32, display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={handleNext}
                style={{
                  background: gold, color: bg, fontWeight: 700, fontSize: '1rem',
                  padding: '14px 36px', borderRadius: 100, fontFamily: body,
                  transition, cursor: 'pointer', border: 'none',
                }}
              >
                {currentQuestionIndex + 1 < totalQuestions ? 'Next Question →' : 'See Results →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   MAIN DIAGNOSTIC PAGE
   ══════════════════════════════════════════════════════════════════ */
export default function Diagnostic() {
  const [started, setStarted] = useState(false)
  const { startTest, reset } = useDiagnosticStore()

  const handleStart = () => {
    reset()
    startTest()
    setStarted(true)
  }

  if (!started) {
    return <IntroScreen onStart={handleStart} />
  }

  return <QuestionScreen />
}
