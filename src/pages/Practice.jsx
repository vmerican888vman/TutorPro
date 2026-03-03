import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { satRWPool } from '../data/sat/rw-pool'
import { satMathPool } from '../data/sat/math-pool'
import { savePracticeSession } from '../lib/database'
import FloatingTutorChat from '../components/FloatingTutorChat'

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
const bodyFont = "'DM Sans', sans-serif"

const categoryConfig = {
  math: { label: 'Math', color: '#818CF8' },
  reading: { label: 'Reading & Writing', color: '#34D399' },
  mixed: { label: 'Mixed', color: gold },
}

/* ── Build practice pool from SAT question banks ── */
// RW pool questions get category 'reading', Math pool questions get category 'math'
const practicePool = [
  ...satRWPool.map((q) => ({ ...q, category: 'reading' })),
  ...satMathPool.map((q) => ({ ...q, category: 'math' })),
]

/* ── Shuffle helper ── */
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildQuestionSet(category, count) {
  let pool = practicePool
  if (category !== 'mixed') {
    pool = practicePool.filter((q) => q.category === category)
  }
  return shuffle(pool).slice(0, count)
}

/* ══════════════════════════════════════════════════════════════════
   SETUP SCREEN
   ══════════════════════════════════════════════════════════════════ */
function SetupScreen({ onStart }) {
  const [category, setCategory] = useState('mixed')
  const [count, setCount] = useState(10)

  const counts = [5, 10, 25, 50]
  const cats = [
    { value: 'mixed', label: 'Mixed', color: gold },
    { value: 'math', label: 'Math', color: '#818CF8' },
    { value: 'reading', label: 'Reading & Writing', color: '#34D399' },
  ]

  const maxAvailable = category === 'mixed'
    ? practicePool.length
    : practicePool.filter((q) => q.category === category).length

  return (
    <div style={{ maxWidth: 520 }}>
      <h1 style={{
        fontFamily: heading, fontWeight: 800, fontSize: '1.8rem',
        color: white, marginBottom: 8,
      }}>
        Practice
      </h1>
      <p style={{
        fontFamily: bodyFont, fontSize: '0.95rem', color: muted, marginBottom: 36,
      }}>
        Choose a category and number of questions to start a practice set.
      </p>

      {/* Category */}
      <div style={{ marginBottom: 28 }}>
        <label style={{
          display: 'block', fontFamily: bodyFont, fontSize: '0.85rem',
          fontWeight: 600, color: white, marginBottom: 10,
        }}>
          Category
        </label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {cats.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              style={{
                padding: '10px 20px', borderRadius: 100, border: 'none',
                cursor: 'pointer', fontFamily: bodyFont, fontSize: '0.9rem',
                fontWeight: 600, transition,
                background: category === c.value ? c.color + '22' : cardBg,
                color: category === c.value ? c.color : muted,
                outline: category === c.value ? `1.5px solid ${c.color}55` : `1.5px solid ${border}`,
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div style={{ marginBottom: 36 }}>
        <label style={{
          display: 'block', fontFamily: bodyFont, fontSize: '0.85rem',
          fontWeight: 600, color: white, marginBottom: 10,
        }}>
          Questions
        </label>
        <div style={{ display: 'flex', gap: 8 }}>
          {counts.map((n) => (
            <button
              key={n}
              onClick={() => setCount(n)}
              disabled={n > maxAvailable}
              style={{
                padding: '10px 24px', borderRadius: 100, border: 'none',
                cursor: n > maxAvailable ? 'not-allowed' : 'pointer',
                fontFamily: bodyFont, fontSize: '0.9rem', fontWeight: 600,
                transition,
                background: count === n ? goldDim : cardBg,
                color: count === n ? gold : n > maxAvailable ? 'rgba(155,155,173,0.4)' : muted,
                outline: count === n ? `1.5px solid ${goldBorder}` : `1.5px solid ${border}`,
                opacity: n > maxAvailable ? 0.5 : 1,
              }}
            >
              {n}
            </button>
          ))}
        </div>
        <p style={{ fontFamily: bodyFont, fontSize: '0.75rem', color: muted, marginTop: 8 }}>
          {maxAvailable} questions available in this category
        </p>
      </div>

      <button
        onClick={() => onStart(category, Math.min(count, maxAvailable))}
        style={{
          background: gold, color: bg, fontWeight: 700, fontSize: '1.05rem',
          padding: '14px 40px', borderRadius: 100, fontFamily: bodyFont,
          cursor: 'pointer', border: 'none', transition,
        }}
      >
        Start Practice
      </button>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   QUESTION SCREEN
   ══════════════════════════════════════════════════════════════════ */
function QuestionScreen({ questions, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [answers, setAnswers] = useState([])
  const startTimeRef = useRef(null)
  const qStartRef = useRef(null)

  useEffect(() => {
    startTimeRef.current = Date.now()
    qStartRef.current = Date.now()
  }, [])

  const question = questions[currentIndex]
  const totalQuestions = questions.length
  const progress = (currentIndex / totalQuestions) * 100
  const catColor = categoryConfig[question.category]?.color || muted

  const handleSelect = (letter) => {
    if (hasSubmitted) return
    setSelectedAnswer(letter)
    setHasSubmitted(true)
    setAnswers((prev) => [...prev, {
      question_id: question.id,
      selected: letter,
      correct: question.correct,
      category: question.category,
      time_spent_ms: Date.now() - qStartRef.current,
    }])
  }

  const handleNext = () => {
    if (currentIndex + 1 >= totalQuestions) {
      onComplete(answers.concat(hasSubmitted ? [] : []), Date.now() - startTimeRef.current)
      return
    }
    setSelectedAnswer(null)
    setHasSubmitted(false)
    setCurrentIndex((i) => i + 1)
    qStartRef.current = Date.now()
  }

  const isCorrect = selectedAnswer === question.correct

  return (
    <div>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            background: catColor + '22', color: catColor,
            fontSize: '0.75rem', fontWeight: 700, fontFamily: bodyFont,
            padding: '4px 12px', borderRadius: 100, textTransform: 'uppercase',
            letterSpacing: 1,
          }}>
            {categoryConfig[question.category]?.label}
          </span>
          <span style={{ fontFamily: bodyFont, fontSize: '0.9rem', color: muted }}>
            {currentIndex + 1} of {totalQuestions}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        height: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 100,
        marginBottom: 32,
      }}>
        <div style={{
          height: '100%', background: gold, width: `${progress}%`,
          borderRadius: 100, transition: 'width 0.4s ease',
        }} />
      </div>

      {/* Passage */}
      {question.passage && (
        <div style={{
          background: bgLight, border: `1.5px solid ${border}`,
          borderRadius: 14, padding: '20px 24px', marginBottom: 24,
        }}>
          <div style={{
            fontFamily: bodyFont, fontSize: '0.75rem', fontWeight: 600,
            color: catColor, textTransform: 'uppercase', letterSpacing: 1.5,
            marginBottom: 10,
          }}>
            Read the passage
          </div>
          <p style={{
            fontFamily: bodyFont, fontSize: '0.9rem',
            color: 'rgba(250,250,249,0.85)', lineHeight: 1.8,
          }}>
            {question.passage}
          </p>
        </div>
      )}

      {/* Question */}
      <h2 style={{
        fontFamily: bodyFont, fontWeight: 600,
        fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
        color: white, lineHeight: 1.5, marginBottom: 24,
      }}>
        {question.question}
      </h2>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {question.options.map((opt) => {
          const isSelected = selectedAnswer === opt.letter
          const isCorrectOpt = opt.letter === question.correct
          let optBg = cardBg
          let optBorder = border

          if (hasSubmitted) {
            if (isCorrectOpt) {
              optBg = 'rgba(52,211,153,0.08)'
              optBorder = 'rgba(52,211,153,0.4)'
            } else if (isSelected) {
              optBg = 'rgba(248,113,113,0.08)'
              optBorder = 'rgba(248,113,113,0.4)'
            }
          } else if (isSelected) {
            optBg = goldDim
            optBorder = goldBorder
          }

          return (
            <button
              key={opt.letter}
              onClick={() => handleSelect(opt.letter)}
              disabled={hasSubmitted}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: optBg, border: `1.5px solid ${optBorder}`,
                borderRadius: 12, padding: '14px 18px', width: '100%',
                cursor: hasSubmitted ? 'default' : 'pointer',
                transition, textAlign: 'left',
              }}
            >
              <span style={{
                width: 34, height: 34, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: bodyFont, fontWeight: 700, fontSize: '0.85rem',
                flexShrink: 0,
                background: hasSubmitted && isCorrectOpt
                  ? 'rgba(52,211,153,0.15)'
                  : hasSubmitted && isSelected && !isCorrectOpt
                    ? 'rgba(248,113,113,0.15)'
                    : 'rgba(255,255,255,0.05)',
                color: hasSubmitted && isCorrectOpt
                  ? green
                  : hasSubmitted && isSelected && !isCorrectOpt
                    ? red : muted,
              }}>
                {hasSubmitted && isCorrectOpt ? '\u2713' : hasSubmitted && isSelected && !isCorrectOpt ? '\u2717' : opt.letter}
              </span>
              <span style={{
                fontFamily: bodyFont, fontSize: '0.95rem',
                color: hasSubmitted && isCorrectOpt ? green : hasSubmitted && isSelected && !isCorrectOpt ? red : white,
                fontWeight: isSelected ? 600 : 400,
              }}>
                {opt.text}
              </span>
            </button>
          )
        })}
      </div>

      {/* Explanation */}
      {hasSubmitted && (
        <div style={{
          marginTop: 20, padding: '16px 20px',
          background: isCorrect ? 'rgba(52,211,153,0.06)' : 'rgba(248,113,113,0.06)',
          border: `1.5px solid ${isCorrect ? 'rgba(52,211,153,0.2)' : 'rgba(248,113,113,0.2)'}`,
          borderRadius: 14,
        }}>
          <div style={{
            fontFamily: bodyFont, fontWeight: 700, fontSize: '0.85rem',
            color: isCorrect ? green : red, marginBottom: 6,
          }}>
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </div>
          <p style={{ fontFamily: bodyFont, fontSize: '0.9rem', color: muted, lineHeight: 1.7 }}>
            {question.explanation}
          </p>
        </div>
      )}

      {/* Actions */}
      {hasSubmitted && (
        <div style={{
          marginTop: 24, display: 'flex', alignItems: 'center',
          justifyContent: 'flex-end', flexWrap: 'wrap', gap: 12,
        }}>
          <button
            onClick={handleNext}
            style={{
              background: gold, color: bg, fontWeight: 700, fontSize: '0.95rem',
              padding: '12px 28px', borderRadius: 100, fontFamily: bodyFont,
              cursor: 'pointer', border: 'none', transition, marginLeft: 'auto',
            }}
          >
            {currentIndex + 1 < totalQuestions ? 'Next \u2192' : 'See Results \u2192'}
          </button>
        </div>
      )}

      {/* Floating AI Tutor Chat */}
      <FloatingTutorChat question={question} />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   RESULTS SCREEN
   ══════════════════════════════════════════════════════════════════ */
function ResultsScreen({ answers, totalTimeMs, category, questionsUsed, onRestart }) {
  const user = useAuthStore((s) => s.user)
  const savedRef = useRef(false)

  const totalCorrect = answers.filter((a) => a.selected === a.correct).length
  const totalQuestions = answers.length
  const pct = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0
  const timeSec = Math.round(totalTimeMs / 1000)

  const catBreakdown = ['math', 'reading']
    .map((cat) => {
      const catAnswers = answers.filter((a) => a.category === cat)
      if (catAnswers.length === 0) return null
      return {
        key: cat,
        ...categoryConfig[cat],
        correct: catAnswers.filter((a) => a.selected === a.correct).length,
        total: catAnswers.length,
      }
    })
    .filter(Boolean)

  const wrongAnswers = answers.filter((a) => a.selected !== a.correct)

  // Save to database
  useEffect(() => {
    if (savedRef.current || !user) return
    savedRef.current = true
    savePracticeSession({
      user_id: user.id,
      session_type: 'practice',
      category: category === 'mixed' ? 'mixed' : category,
      total_questions: totalQuestions,
      correct_answers: totalCorrect,
      answers,
      time_spent_seconds: timeSec,
    })
  }, [user, category, totalQuestions, totalCorrect, answers, timeSec])

  return (
    <div style={{ maxWidth: 600 }}>
      <h1 style={{
        fontFamily: heading, fontWeight: 800, fontSize: '1.8rem',
        color: white, marginBottom: 8,
      }}>
        Practice Complete
      </h1>
      <p style={{ fontFamily: bodyFont, fontSize: '0.9rem', color: muted, marginBottom: 32 }}>
        Finished in {Math.floor(timeSec / 60)}m {timeSec % 60}s
      </p>

      {/* Score card */}
      <div style={{
        background: cardBg, border: `1.5px solid ${goldBorder}`,
        borderRadius: 14, padding: '32px 28px', textAlign: 'center', marginBottom: 24,
      }}>
        <div style={{
          fontFamily: heading, fontWeight: 800, fontSize: '3rem',
          color: gold, lineHeight: 1,
        }}>
          {totalCorrect}/{totalQuestions}
        </div>
        <div style={{ fontFamily: bodyFont, fontSize: '0.9rem', color: muted, marginTop: 6 }}>
          {pct}% correct
        </div>
      </div>

      {/* Category breakdown */}
      {catBreakdown.length > 1 && (
        <div style={{
          background: cardBg, border: `1.5px solid ${border}`,
          borderRadius: 14, padding: 24, marginBottom: 24,
        }}>
          {catBreakdown.map((cat) => (
            <div key={cat.key} style={{ marginBottom: cat.key === catBreakdown[catBreakdown.length - 1].key ? 0 : 16 }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: cat.color }} />
                  <span style={{ fontFamily: bodyFont, fontWeight: 600, fontSize: '0.9rem', color: white }}>
                    {cat.label}
                  </span>
                </div>
                <span style={{ fontFamily: bodyFont, fontSize: '0.85rem', color: muted }}>
                  {cat.correct}/{cat.total}
                </span>
              </div>
              <div style={{
                height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 100, overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%', width: `${(cat.correct / cat.total) * 100}%`,
                  background: cat.color, borderRadius: 100, transition: 'width 1s ease',
                }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Wrong answers — discuss with tutor */}
      {wrongAnswers.length > 0 && (
        <div style={{
          background: cardBg, border: `1.5px solid ${border}`,
          borderRadius: 14, padding: 24, marginBottom: 24,
        }}>
          <div style={{
            fontFamily: bodyFont, fontWeight: 700, fontSize: '0.95rem',
            color: white, marginBottom: 16,
          }}>
            Review Missed Questions ({wrongAnswers.length})
          </div>
          {wrongAnswers.map((a, i) => {
            const q = questionsUsed.find((q) => q.id === a.question_id)
            if (!q) return null
            const catCfg = categoryConfig[q.category]
            return (
              <div key={i} style={{
                padding: '12px 0',
                borderBottom: i < wrongAnswers.length - 1 ? `1px solid ${border}` : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 700, fontFamily: bodyFont,
                    padding: '2px 8px', borderRadius: 100, textTransform: 'uppercase',
                    letterSpacing: 1,
                    background: (catCfg?.color || muted) + '22',
                    color: catCfg?.color || muted,
                  }}>
                    {catCfg?.label}
                  </span>
                </div>
                <p style={{
                  fontFamily: bodyFont, fontSize: '0.85rem', color: 'rgba(250,250,249,0.8)',
                  lineHeight: 1.5, marginBottom: 4,
                }}>
                  {q.question.length > 120 ? q.question.slice(0, 120) + '...' : q.question}
                </p>
                <div style={{
                  fontFamily: bodyFont, fontSize: '0.8rem', color: muted,
                }}>
                  Your answer: <span style={{ color: red }}>{a.selected}</span>
                  {' \u00b7 '}
                  Correct: <span style={{ color: green }}>{a.correct}</span>
                </div>
              </div>
            )
          })}
          <Link to="/dashboard/tutor" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: bodyFont, fontSize: '0.9rem', fontWeight: 600,
            color: gold, textDecoration: 'none', marginTop: 12,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Discuss with AI Tutor
          </Link>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button
          onClick={onRestart}
          style={{
            background: gold, color: bg, fontWeight: 700, fontSize: '0.95rem',
            padding: '12px 28px', borderRadius: 100, fontFamily: bodyFont,
            cursor: 'pointer', border: 'none', transition,
          }}
        >
          Practice Again
        </button>
        <Link to="/dashboard" style={{
          display: 'inline-flex', alignItems: 'center',
          background: 'transparent', color: white, fontWeight: 600,
          fontSize: '0.95rem', padding: '12px 28px', borderRadius: 100,
          fontFamily: bodyFont, textDecoration: 'none',
          border: `1.5px solid ${border}`, transition,
        }}>
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   PRACTICE PAGE
   ══════════════════════════════════════════════════════════════════ */
export default function Practice() {
  const [phase, setPhase] = useState('setup') // 'setup' | 'active' | 'results'
  const [questions, setQuestions] = useState([])
  const [practiceCategory, setPracticeCategory] = useState('mixed')
  const [results, setResults] = useState(null)

  const handleStart = (category, count) => {
    const set = buildQuestionSet(category, count)
    setQuestions(set)
    setPracticeCategory(category)
    setPhase('active')
  }

  const handleComplete = (answers, totalTimeMs) => {
    setResults({ answers, totalTimeMs })
    setPhase('results')
  }

  const handleRestart = () => {
    setQuestions([])
    setResults(null)
    setPhase('setup')
  }

  if (phase === 'active' && questions.length > 0) {
    return <QuestionScreen questions={questions} onComplete={handleComplete} />
  }

  if (phase === 'results' && results) {
    return (
      <ResultsScreen
        answers={results.answers}
        totalTimeMs={results.totalTimeMs}
        category={practiceCategory}
        questionsUsed={questions}
        onRestart={handleRestart}
      />
    )
  }

  return <SetupScreen onStart={handleStart} />
}
