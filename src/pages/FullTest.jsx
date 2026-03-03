import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { SAT_CONFIG, ACT_CONFIG, AVAILABLE_TESTS } from '../data/testConfig'
import { savePracticeSession } from '../lib/database'
import { computeSATScore, computeACTScore } from '../lib/scoring'
import { buildRandomSATTest } from '../lib/testBuilder'

/* ── Design tokens (match existing app) ── */
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
const mathPurple = '#818CF8'
const readingGreen = '#34D399'
const writingYellow = '#FBBF24'
const scienceBlue = '#60A5FA'
const transition = 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
const heading = "'Playfair Display', serif"
const bodyFont = "'DM Sans', sans-serif"

const sectionColors = {
  reading: readingGreen,
  math: mathPurple,
  english: writingYellow,
  science: scienceBlue,
  writing: gold,
}

/* ── Helper: format seconds to MM:SS ── */
function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

/* ── Helper: load question pools and build a random test ── */
async function loadTestQuestions(testId) {
  if (testId === 'sat-random') {
    // Dynamically import both pool files
    const [{ satRWPool }, { satMathPool }] = await Promise.all([
      import('../data/sat/rw-pool.js'),
      import('../data/sat/math-pool.js'),
    ])
    // Build a randomized test from the pools
    return buildRandomSATTest(satRWPool, satMathPool)
  }
  // Future: ACT pools
  return null
}

/* ══════════════════════════════════════════════════════════════════
   TEST SELECTION SCREEN
   ══════════════════════════════════════════════════════════════════ */
function TestSelectionScreen({ onSelect }) {
  const [tab, setTab] = useState('sat')

  const tests = AVAILABLE_TESTS[tab]
  const config = tab === 'sat' ? SAT_CONFIG : ACT_CONFIG
  const activeSections = config.sections.filter(s => s.type !== 'break' && !s.optional)
  const totalTime = config.sections
    .filter(s => !s.optional)
    .reduce((sum, s) => sum + s.timeMinutes, 0)

  return (
    <div style={{ maxWidth: 700 }}>
      <h1 style={{
        fontFamily: heading, fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2rem)',
        color: white, marginBottom: 8,
      }}>
        Full Practice Tests
      </h1>
      <p style={{
        fontFamily: bodyFont, fontSize: '0.95rem', color: muted,
        lineHeight: 1.7, marginBottom: 32,
      }}>
        Simulate the real test experience with timed sections and breaks. Your score will be calculated at the end.
      </p>

      {/* SAT / ACT tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
        {['sat', 'act'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '10px 28px', borderRadius: 100, border: 'none', cursor: 'pointer',
              fontFamily: bodyFont, fontWeight: 700, fontSize: '0.9rem',
              background: tab === t ? gold : 'rgba(255,255,255,0.04)',
              color: tab === t ? bg : muted, transition,
            }}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Test info card */}
      <div style={{
        background: cardBg, border: `1.5px solid ${border}`, borderRadius: 14,
        padding: '20px 24px', marginBottom: 24,
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginBottom: 16 }}>
          <div>
            <div style={{ fontFamily: bodyFont, fontSize: '0.7rem', color: muted, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>Questions</div>
            <div style={{ fontFamily: heading, fontWeight: 800, fontSize: '1.4rem', color: white }}>{config.totalQuestions}</div>
          </div>
          <div>
            <div style={{ fontFamily: bodyFont, fontSize: '0.7rem', color: muted, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>Total Time</div>
            <div style={{ fontFamily: heading, fontWeight: 800, fontSize: '1.4rem', color: white }}>
              {Math.floor(totalTime / 60)}h {totalTime % 60}m
            </div>
          </div>
          <div>
            <div style={{ fontFamily: bodyFont, fontSize: '0.7rem', color: muted, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>Score Range</div>
            <div style={{ fontFamily: heading, fontWeight: 800, fontSize: '1.4rem', color: white }}>
              {config.scoreRange.min}–{config.scoreRange.max}
            </div>
          </div>
        </div>
        <div style={{ fontFamily: bodyFont, fontSize: '0.8rem', color: muted, lineHeight: 1.6 }}>
          {activeSections.map(s => `${s.shortName} (${s.questionCount}q, ${s.timeMinutes}m)`).join(' → ')}
        </div>
      </div>

      {/* Test cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {tests.length === 0 ? (
          <div style={{
            background: cardBg, border: `1.5px solid ${border}`, borderRadius: 14,
            padding: '24px', textAlign: 'center',
          }}>
            <div style={{ fontFamily: bodyFont, fontSize: '0.9rem', color: muted }}>
              ACT practice tests are coming soon!
            </div>
          </div>
        ) : (
          tests.map((test) => (
            <button
              key={test.id}
              onClick={() => onSelect(test.id, tab)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: cardBg, border: `1.5px solid ${goldBorder}`,
                borderRadius: 14, padding: '18px 24px', cursor: 'pointer',
                transition, textAlign: 'left', width: '100%',
              }}
            >
              <div>
                <div style={{
                  fontFamily: bodyFont, fontWeight: 700, fontSize: '1rem',
                  color: white, marginBottom: 4,
                }}>
                  {test.name}
                </div>
                <div style={{ fontFamily: bodyFont, fontSize: '0.8rem', color: muted }}>
                  {test.description || 'Ready to take'}
                </div>
              </div>
              <div style={{
                background: gold, color: bg, fontWeight: 700, fontSize: '0.85rem',
                padding: '10px 24px', borderRadius: 100, fontFamily: bodyFont,
                whiteSpace: 'nowrap',
              }}>
                Start Test
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   BREAK SCREEN
   ══════════════════════════════════════════════════════════════════ */
function BreakScreen({ timeMinutes, nextSectionName, onEnd }) {
  const [secondsLeft, setSecondsLeft] = useState(timeMinutes * 60)
  const timerRef = useRef(null)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          onEnd()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [onEnd])

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '60vh', textAlign: 'center',
    }}>
      <div style={{
        width: 80, height: 80, borderRadius: '50%', background: goldDim,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 24,
      }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      </div>
      <h2 style={{ fontFamily: heading, fontWeight: 800, fontSize: '1.8rem', color: white, marginBottom: 8 }}>
        Break Time
      </h2>
      <p style={{ fontFamily: bodyFont, fontSize: '0.95rem', color: muted, marginBottom: 24 }}>
        Take a moment to relax. The next section will begin automatically.
      </p>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: '3rem', fontWeight: 700,
        color: gold, marginBottom: 8,
      }}>
        {formatTime(secondsLeft)}
      </div>
      <p style={{ fontFamily: bodyFont, fontSize: '0.85rem', color: muted, marginBottom: 32 }}>
        Up next: <strong style={{ color: white }}>{nextSectionName}</strong>
      </p>
      <button
        onClick={() => { clearInterval(timerRef.current); onEnd() }}
        style={{
          background: 'transparent', border: `1.5px solid ${border}`,
          color: muted, fontFamily: bodyFont, fontWeight: 600, fontSize: '0.9rem',
          padding: '10px 28px', borderRadius: 100, cursor: 'pointer', transition,
        }}
      >
        Skip Break
      </button>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   SECTION QUESTION SCREEN (timed, no answer reveal)
   ══════════════════════════════════════════════════════════════════ */
function SectionScreen({ section, questions, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({}) // { questionId: letter }
  const [flagged, setFlagged] = useState(new Set())
  const [secondsLeft, setSecondsLeft] = useState(section.timeMinutes * 60)
  const [showReview, setShowReview] = useState(false)
  const timerRef = useRef(null)
  const startTimeRef = useRef(Date.now())

  // Countdown timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          handleSubmitSection()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [])

  const question = questions[currentIndex]
  const totalQuestions = questions.length
  const selected = selectedAnswers[question?.id]
  const answeredCount = Object.keys(selectedAnswers).length
  const timeWarning = secondsLeft < 300 // less than 5 min
  const timeCritical = secondsLeft < 60

  const handleSelect = (letter) => {
    setSelectedAnswers(prev => ({ ...prev, [question.id]: letter }))
  }

  const handleNav = (idx) => {
    if (idx >= 0 && idx < totalQuestions) {
      setCurrentIndex(idx)
      setShowReview(false)
    }
  }

  const toggleFlag = () => {
    setFlagged(prev => {
      const next = new Set(prev)
      if (next.has(question.id)) next.delete(question.id)
      else next.add(question.id)
      return next
    })
  }

  const handleSubmitSection = useCallback(() => {
    clearInterval(timerRef.current)
    const answers = questions.map(q => ({
      question_id: q.id,
      selected: selectedAnswers[q.id] || null,
      correct: q.correct,
      category: q.category,
      subcategory: q.subcategory,
      question_text: (q.passage ? q.passage.slice(0, 80) + '... ' : '') + (q.question || '').slice(0, 120),
    }))
    onComplete(answers, Date.now() - startTimeRef.current)
  }, [questions, selectedAnswers, onComplete])

  // Review screen
  if (showReview) {
    return (
      <div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 24,
        }}>
          <h2 style={{ fontFamily: heading, fontWeight: 800, fontSize: '1.3rem', color: white }}>
            Review: {section.name}
          </h2>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '1.1rem', fontWeight: 600,
            color: timeWarning ? (timeCritical ? red : gold) : white,
          }}>
            {formatTime(secondsLeft)}
          </div>
        </div>

        <p style={{ fontFamily: bodyFont, fontSize: '0.9rem', color: muted, marginBottom: 20 }}>
          {answeredCount} of {totalQuestions} answered &middot; {flagged.size} flagged
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
          {questions.map((q, i) => {
            const answered = !!selectedAnswers[q.id]
            const isFlagged = flagged.has(q.id)
            return (
              <button
                key={q.id}
                onClick={() => handleNav(i)}
                style={{
                  width: 44, height: 44, borderRadius: 8, border: 'none',
                  cursor: 'pointer', fontFamily: bodyFont, fontWeight: 600,
                  fontSize: '0.85rem', transition,
                  background: isFlagged ? 'rgba(248,113,113,0.15)' : answered ? goldDim : 'rgba(255,255,255,0.03)',
                  color: isFlagged ? red : answered ? gold : muted,
                  outline: isFlagged ? `2px solid ${red}` : 'none',
                }}
              >
                {i + 1}
              </button>
            )
          })}
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => setShowReview(false)}
            style={{
              background: 'transparent', border: `1.5px solid ${border}`, color: white,
              fontFamily: bodyFont, fontWeight: 600, fontSize: '0.9rem',
              padding: '12px 28px', borderRadius: 100, cursor: 'pointer', transition,
            }}
          >
            Back to Questions
          </button>
          <button
            onClick={handleSubmitSection}
            style={{
              background: gold, border: 'none', color: bg,
              fontFamily: bodyFont, fontWeight: 700, fontSize: '0.9rem',
              padding: '12px 28px', borderRadius: 100, cursor: 'pointer', transition,
            }}
          >
            Submit Section
          </button>
        </div>
      </div>
    )
  }

  if (!question) return null

  const catColor = sectionColors[question.category] || muted

  return (
    <div>
      {/* Top bar with timer and section info */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 16, flexWrap: 'wrap', gap: 8,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            background: catColor + '22', color: catColor,
            fontSize: '0.7rem', fontWeight: 700, fontFamily: bodyFont,
            padding: '4px 12px', borderRadius: 100, textTransform: 'uppercase',
            letterSpacing: 1,
          }}>
            {section.shortName}
          </span>
          <span style={{ fontFamily: bodyFont, fontSize: '0.9rem', color: muted }}>
            {currentIndex + 1} of {totalQuestions}
          </span>
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '1.1rem', fontWeight: 600,
          color: timeWarning ? (timeCritical ? red : gold) : white,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {formatTime(secondsLeft)}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 100, marginBottom: 28 }}>
        <div style={{
          height: '100%', background: catColor, borderRadius: 100, transition: 'width 0.4s ease',
          width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
        }} />
      </div>

      {/* Passage */}
      {question.passage && (
        <div style={{
          background: bgLight, border: `1.5px solid ${border}`,
          borderRadius: 14, padding: '20px 24px', marginBottom: 24,
        }}>
          <div style={{
            fontFamily: bodyFont, fontSize: '0.7rem', fontWeight: 600,
            color: catColor, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10,
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
        fontSize: 'clamp(1rem, 2.2vw, 1.15rem)',
        color: white, lineHeight: 1.5, marginBottom: 24,
      }}>
        {question.question}
      </h2>

      {/* Options — no answer reveal in full test mode */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
        {question.options.map((opt) => {
          const isSelected = selected === opt.letter
          return (
            <button
              key={opt.letter}
              onClick={() => handleSelect(opt.letter)}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: isSelected ? goldDim : cardBg,
                border: `1.5px solid ${isSelected ? goldBorder : border}`,
                borderRadius: 12, padding: '14px 18px',
                cursor: 'pointer', textAlign: 'left', transition, width: '100%',
              }}
            >
              <span style={{
                width: 32, height: 32, borderRadius: '50%', display: 'flex',
                alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                background: isSelected ? gold : 'rgba(255,255,255,0.04)',
                color: isSelected ? bg : muted,
                fontFamily: bodyFont, fontWeight: 700, fontSize: '0.85rem',
              }}>
                {opt.letter}
              </span>
              <span style={{
                fontFamily: bodyFont, fontSize: '0.95rem', color: white, lineHeight: 1.5,
              }}>
                {opt.text}
              </span>
            </button>
          )
        })}
      </div>

      {/* Navigation */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 8,
      }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => handleNav(currentIndex - 1)}
            disabled={currentIndex === 0}
            style={{
              background: 'transparent', border: `1.5px solid ${border}`,
              color: currentIndex === 0 ? 'rgba(255,255,255,0.15)' : white,
              fontFamily: bodyFont, fontWeight: 600, fontSize: '0.85rem',
              padding: '10px 20px', borderRadius: 100, cursor: currentIndex === 0 ? 'default' : 'pointer',
              transition,
            }}
          >
            ← Prev
          </button>
          <button
            onClick={toggleFlag}
            style={{
              background: flagged.has(question.id) ? 'rgba(248,113,113,0.12)' : 'transparent',
              border: `1.5px solid ${flagged.has(question.id) ? red : border}`,
              color: flagged.has(question.id) ? red : muted,
              fontFamily: bodyFont, fontWeight: 600, fontSize: '0.85rem',
              padding: '10px 20px', borderRadius: 100, cursor: 'pointer', transition,
            }}
          >
            {flagged.has(question.id) ? '⚑ Flagged' : '⚐ Flag'}
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setShowReview(true)}
            style={{
              background: 'transparent', border: `1.5px solid ${border}`,
              color: muted, fontFamily: bodyFont, fontWeight: 600, fontSize: '0.85rem',
              padding: '10px 20px', borderRadius: 100, cursor: 'pointer', transition,
            }}
          >
            Review All
          </button>
          {currentIndex + 1 < totalQuestions ? (
            <button
              onClick={() => handleNav(currentIndex + 1)}
              style={{
                background: gold, border: 'none', color: bg,
                fontFamily: bodyFont, fontWeight: 700, fontSize: '0.85rem',
                padding: '10px 24px', borderRadius: 100, cursor: 'pointer', transition,
              }}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={() => setShowReview(true)}
              style={{
                background: gold, border: 'none', color: bg,
                fontFamily: bodyFont, fontWeight: 700, fontSize: '0.85rem',
                padding: '10px 24px', borderRadius: 100, cursor: 'pointer', transition,
              }}
            >
              Finish Section
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   SCORE REPORT
   ══════════════════════════════════════════════════════════════════ */
function ScoreReport({ testType, testId, allAnswers, config, totalTimeMs, onRestart }) {
  const user = useAuthStore((s) => s.user)
  const savedRef = useRef(false)

  // Calculate scores per section
  const sectionResults = {}
  allAnswers.forEach(a => {
    const cat = a.category
    if (!sectionResults[cat]) sectionResults[cat] = { total: 0, correct: 0 }
    sectionResults[cat].total++
    if (a.selected === a.correct) sectionResults[cat].correct++
  })

  const totalCorrect = allAnswers.filter(a => a.selected === a.correct).length
  const totalQuestions = allAnswers.length
  const overallPct = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0

  // Estimated score (using shared utility)
  const estimatedScore = testType === 'sat'
    ? computeSATScore(allAnswers)
    : computeACTScore(allAnswers)

  // Save results to database (once)
  useEffect(() => {
    if (savedRef.current || !user) return
    savedRef.current = true
    savePracticeSession({
      user_id: user.id,
      session_type: 'full_test',
      category: 'mixed',
      total_questions: totalQuestions,
      correct_answers: totalCorrect,
      answers: {
        meta: { testType, testId, estimatedScore },
        questions: allAnswers,
      },
      time_spent_seconds: totalTimeMs ? Math.round(totalTimeMs / 1000) : null,
    }).catch(err => console.error('[FullTest] Failed to save results:', err))
  }, [user, totalQuestions, totalCorrect, allAnswers, testType, testId, estimatedScore, totalTimeMs])

  // Subcategory breakdown
  const subcatResults = {}
  allAnswers.forEach(a => {
    const key = a.subcategory || a.category
    if (!subcatResults[key]) subcatResults[key] = { total: 0, correct: 0, category: a.category }
    subcatResults[key].total++
    if (a.selected === a.correct) subcatResults[key].correct++
  })

  return (
    <div style={{ maxWidth: 700 }}>
      <h1 style={{
        fontFamily: heading, fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2rem)',
        color: white, marginBottom: 8,
      }}>
        Score Report
      </h1>
      <p style={{ fontFamily: bodyFont, fontSize: '0.95rem', color: muted, marginBottom: 32 }}>
        Here&apos;s how you performed on the full practice test.
      </p>

      {/* Big score card */}
      <div style={{
        background: `linear-gradient(135deg, rgba(245,200,66,0.08) 0%, rgba(129,140,248,0.06) 100%)`,
        border: `1.5px solid ${goldBorder}`, borderRadius: 14,
        padding: '32px 28px', textAlign: 'center', marginBottom: 28,
      }}>
        <div style={{ fontFamily: bodyFont, fontSize: '0.75rem', color: muted, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>
          Estimated {testType.toUpperCase()} Score
        </div>
        <div style={{ fontFamily: heading, fontWeight: 800, fontSize: '3.5rem', color: gold, marginBottom: 4 }}>
          {estimatedScore.total}
        </div>
        <div style={{ fontFamily: bodyFont, fontSize: '0.85rem', color: muted }}>
          out of {config.scoreRange.max}
        </div>
        {testType === 'sat' && estimatedScore.rw && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 20 }}>
            <div>
              <div style={{ fontFamily: bodyFont, fontSize: '0.7rem', color: readingGreen, textTransform: 'uppercase', letterSpacing: 1 }}>Reading & Writing</div>
              <div style={{ fontFamily: heading, fontWeight: 800, fontSize: '1.5rem', color: white }}>{estimatedScore.rw}</div>
            </div>
            <div>
              <div style={{ fontFamily: bodyFont, fontSize: '0.7rem', color: mathPurple, textTransform: 'uppercase', letterSpacing: 1 }}>Math</div>
              <div style={{ fontFamily: heading, fontWeight: 800, fontSize: '1.5rem', color: white }}>{estimatedScore.math}</div>
            </div>
          </div>
        )}
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
        <div style={{
          flex: 1, minWidth: 120, background: cardBg, border: `1.5px solid ${border}`,
          borderRadius: 14, padding: '16px 20px',
        }}>
          <div style={{ fontFamily: bodyFont, fontSize: '0.7rem', color: muted, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 }}>Correct</div>
          <div style={{ fontFamily: heading, fontWeight: 800, fontSize: '1.4rem', color: green }}>{totalCorrect}</div>
          <div style={{ fontFamily: bodyFont, fontSize: '0.8rem', color: muted }}>of {totalQuestions}</div>
        </div>
        <div style={{
          flex: 1, minWidth: 120, background: cardBg, border: `1.5px solid ${border}`,
          borderRadius: 14, padding: '16px 20px',
        }}>
          <div style={{ fontFamily: bodyFont, fontSize: '0.7rem', color: muted, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 }}>Accuracy</div>
          <div style={{ fontFamily: heading, fontWeight: 800, fontSize: '1.4rem', color: white }}>{overallPct}%</div>
        </div>
        <div style={{
          flex: 1, minWidth: 120, background: cardBg, border: `1.5px solid ${border}`,
          borderRadius: 14, padding: '16px 20px',
        }}>
          <div style={{ fontFamily: bodyFont, fontSize: '0.7rem', color: muted, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 }}>Unanswered</div>
          <div style={{ fontFamily: heading, fontWeight: 800, fontSize: '1.4rem', color: allAnswers.filter(a => !a.selected).length > 0 ? red : green }}>
            {allAnswers.filter(a => !a.selected).length}
          </div>
        </div>
      </div>

      {/* Category breakdown */}
      <h3 style={{ fontFamily: heading, fontWeight: 700, fontSize: '1.1rem', color: white, marginBottom: 16 }}>
        Category Breakdown
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
        {Object.entries(subcatResults).map(([key, val]) => {
          const pct = Math.round((val.correct / val.total) * 100)
          const color = sectionColors[val.category] || muted
          return (
            <div key={key} style={{
              background: cardBg, border: `1.5px solid ${border}`, borderRadius: 10,
              padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                <span style={{ fontFamily: bodyFont, fontSize: '0.85rem', color: white, textTransform: 'capitalize' }}>
                  {key.replace(/-/g, ' ')}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 80, height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 100 }}>
                  <div style={{ height: '100%', background: color, borderRadius: 100, width: `${pct}%` }} />
                </div>
                <span style={{
                  fontFamily: bodyFont, fontSize: '0.8rem', fontWeight: 600,
                  color: pct >= 70 ? green : pct >= 40 ? gold : red, minWidth: 55, textAlign: 'right',
                }}>
                  {val.correct}/{val.total} ({pct}%)
                </span>
              </div>
            </div>
          )
        })}
      </div>

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
          Take Another Test
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
   FULL TEST PAGE — Main Orchestrator
   ══════════════════════════════════════════════════════════════════ */
export default function FullTest() {
  const [phase, setPhase] = useState('select') // select | loading | testing | break | results
  const [testId, setTestId] = useState(null)
  const [testType, setTestType] = useState(null) // 'sat' or 'act'
  const [config, setConfig] = useState(null)
  const [questionsBySection, setQuestionsBySection] = useState(null)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [allAnswers, setAllAnswers] = useState([])
  const [totalTimeMs, setTotalTimeMs] = useState(0)

  const handleSelectTest = async (id, type) => {
    setTestId(id)
    setTestType(type)
    setConfig(type === 'sat' ? SAT_CONFIG : ACT_CONFIG)
    setPhase('loading')

    const questions = await loadTestQuestions(id)
    if (questions) {
      setQuestionsBySection(questions)
      setPhase('testing')
    }
  }

  const activeConfig = config
  const sections = activeConfig?.sections || []
  const currentSection = sections[currentSectionIndex]

  const handleSectionComplete = (answers, sectionTimeMs) => {
    setAllAnswers(prev => [...prev, ...answers])
    if (sectionTimeMs) setTotalTimeMs(prev => prev + sectionTimeMs)

    // Move to next section
    const nextIdx = currentSectionIndex + 1
    if (nextIdx >= sections.length) {
      setPhase('results')
      return
    }

    const nextSection = sections[nextIdx]
    if (nextSection.type === 'break') {
      setCurrentSectionIndex(nextIdx)
      setPhase('break')
    } else {
      setCurrentSectionIndex(nextIdx)
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
    setCurrentSectionIndex(0)
    setAllAnswers([])
    setTotalTimeMs(0)
  }

  if (phase === 'select') {
    return <TestSelectionScreen onSelect={handleSelectTest} />
  }

  if (phase === 'loading') {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', minHeight: '60vh',
      }}>
        <div style={{
          width: 40, height: 40, border: '3px solid rgba(255,255,255,0.06)',
          borderTopColor: gold, borderRadius: '50%',
          animation: 'spin 0.8s linear infinite', marginBottom: 16,
        }} />
        <p style={{ fontFamily: bodyFont, fontSize: '0.9rem', color: muted }}>
          Loading test...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (phase === 'break' && currentSection?.type === 'break') {
    const nextTestSection = sections.slice(currentSectionIndex + 1).find(s => s.type !== 'break')
    return (
      <BreakScreen
        timeMinutes={currentSection.timeMinutes}
        nextSectionName={nextTestSection?.name || 'Next Section'}
        onEnd={handleBreakEnd}
      />
    )
  }

  if (phase === 'testing' && currentSection && questionsBySection) {
    const sectionQuestions = questionsBySection[currentSection.id] || []
    return (
      <SectionScreen
        key={currentSection.id}
        section={currentSection}
        questions={sectionQuestions}
        onComplete={handleSectionComplete}
      />
    )
  }

  if (phase === 'results') {
    return (
      <ScoreReport
        testType={testType}
        testId={testId}
        allAnswers={allAnswers}
        config={activeConfig}
        totalTimeMs={totalTimeMs}
        onRestart={handleRestart}
      />
    )
  }

  return null
}
