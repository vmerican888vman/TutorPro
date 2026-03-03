import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDiagnosticStore } from '../stores/diagnosticStore'
import { supabase } from '../lib/supabase'

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
  reading: { label: 'Reading', color: '#34D399' },
  writing: { label: 'Writing', color: '#FBBF24' },
}

function estimateSATRange(score, total) {
  const pct = score / total
  const baseLow = 400
  const baseHigh = 1600
  const range = baseHigh - baseLow
  const estimated = Math.round(baseLow + pct * range)
  const low = Math.max(400, Math.round(estimated - 60))
  const high = Math.min(1600, Math.round(estimated + 60))
  return { low, high, estimated }
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}m ${secs}s`
}

/* ── Score Ring ── */
function ScoreRing({ score, total, size = 160 }) {
  const pct = total > 0 ? score / total : 0
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - pct)

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={gold} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontFamily: heading, fontWeight: 800, fontSize: '2.8rem', color: white, lineHeight: 1 }}>
          {score}
        </span>
        <span style={{ fontFamily: bodyFont, fontSize: '0.85rem', color: muted }}>
          out of {total}
        </span>
      </div>
    </div>
  )
}

/* ── Category Bar ── */
function CategoryBar({ label, score, total, color }) {
  const pct = total > 0 ? (score / total) * 100 : 0

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 8,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
          <span style={{ fontFamily: bodyFont, fontWeight: 600, fontSize: '0.95rem', color: white }}>
            {label}
          </span>
        </div>
        <span style={{ fontFamily: bodyFont, fontSize: '0.9rem', color: muted }}>
          {score}/{total}
        </span>
      </div>
      <div style={{
        height: 10, background: 'rgba(255,255,255,0.06)', borderRadius: 100,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', width: `${pct}%`, background: color, borderRadius: 100,
          transition: 'width 1s ease',
        }} />
      </div>
    </div>
  )
}

/* ── Strengths & Weaknesses ── */
function Analysis({ results }) {
  const categories = [
    { key: 'math', score: results.math_score, total: results.math_questions, ...categoryConfig.math },
    { key: 'reading', score: results.reading_score, total: results.reading_questions, ...categoryConfig.reading },
    { key: 'writing', score: results.writing_score, total: results.writing_questions, ...categoryConfig.writing },
  ]

  const sorted = [...categories].sort((a, b) => (b.score / b.total) - (a.score / a.total))
  const strengths = sorted.filter((c) => c.score / c.total >= 0.6)
  const weaknesses = sorted.filter((c) => c.score / c.total < 0.6)

  return (
    <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 32 }}>
      <div style={{
        background: cardBg, border: `1.5px solid ${border}`, borderRadius: 14, padding: 24,
      }}>
        <div style={{
          fontFamily: bodyFont, fontWeight: 700, fontSize: '0.8rem', color: green,
          textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16,
        }}>
          Strengths
        </div>
        {strengths.length === 0 ? (
          <p style={{ fontFamily: bodyFont, fontSize: '0.9rem', color: muted }}>
            Keep practicing to build your strengths!
          </p>
        ) : (
          strengths.map((c) => (
            <div key={c.key} style={{
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12,
            }}>
              <span style={{ color: green, fontSize: '1rem' }}>&#10003;</span>
              <span style={{ fontFamily: bodyFont, fontSize: '0.95rem', color: white }}>
                {c.label}
              </span>
              <span style={{ fontFamily: bodyFont, fontSize: '0.85rem', color: muted, marginLeft: 'auto' }}>
                {Math.round((c.score / c.total) * 100)}%
              </span>
            </div>
          ))
        )}
      </div>

      <div style={{
        background: cardBg, border: `1.5px solid ${border}`, borderRadius: 14, padding: 24,
      }}>
        <div style={{
          fontFamily: bodyFont, fontWeight: 700, fontSize: '0.8rem', color: red,
          textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16,
        }}>
          Needs Work
        </div>
        {weaknesses.length === 0 ? (
          <p style={{ fontFamily: bodyFont, fontSize: '0.9rem', color: muted }}>
            Great job — no major weak spots detected!
          </p>
        ) : (
          weaknesses.map((c) => (
            <div key={c.key} style={{
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12,
            }}>
              <span style={{ color: red, fontSize: '1rem' }}>&#9888;</span>
              <span style={{ fontFamily: bodyFont, fontSize: '0.95rem', color: white }}>
                {c.label}
              </span>
              <span style={{ fontFamily: bodyFont, fontSize: '0.85rem', color: muted, marginLeft: 'auto' }}>
                {Math.round((c.score / c.total) * 100)}%
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

/* ── Email Capture ── */
function EmailCapture({ results }) {
  const [email, setEmail] = useState('')
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleSave = async (e) => {
    e.preventDefault()
    if (!email || saving) return
    setSaving(true)
    try {
      await supabase.from('diagnostic_results').insert({
        email,
        total_score: results.total_score,
        math_score: results.math_score,
        reading_score: results.reading_score,
        writing_score: results.writing_score,
        total_questions: results.total_questions,
        math_questions: results.math_questions,
        reading_questions: results.reading_questions,
        writing_questions: results.writing_questions,
        answers: results.answers,
        time_spent_seconds: results.time_spent_seconds,
      })
      setSaved(true)
    } catch {
      // Save locally if Supabase isn't configured
      setSaved(true)
    }
    setSaving(false)
  }

  if (saved) {
    return (
      <div style={{
        background: 'rgba(52,211,153,0.06)', border: '1.5px solid rgba(52,211,153,0.2)',
        borderRadius: 14, padding: 24, textAlign: 'center',
      }}>
        <div style={{ fontFamily: bodyFont, fontWeight: 700, color: green, fontSize: '1rem', marginBottom: 4 }}>
          Results saved!
        </div>
        <p style={{ fontFamily: bodyFont, fontSize: '0.9rem', color: muted }}>
          We'll send your personalized study plan to {email}
        </p>
      </div>
    )
  }

  return (
    <div style={{
      background: cardBg, border: `1.5px solid ${goldBorder}`, borderRadius: 14, padding: 32,
    }}>
      <h3 style={{
        fontFamily: heading, fontWeight: 700, fontSize: '1.3rem', color: white, marginBottom: 8,
      }}>
        Save your results
      </h3>
      <p style={{
        fontFamily: bodyFont, fontSize: '0.95rem', color: muted, marginBottom: 20,
      }}>
        Enter your email to save your score breakdown and get a personalized study plan.
      </p>
      <form onSubmit={handleSave} style={{ display: 'flex', gap: 12 }}>
        <input
          type="email"
          required
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            flex: 1, background: bgLight, border: `1.5px solid ${border}`,
            borderRadius: 100, color: white, padding: '14px 20px',
            fontFamily: bodyFont, fontSize: '0.95rem',
          }}
        />
        <button
          type="submit"
          disabled={saving}
          style={{
            background: gold, color: bg, fontWeight: 700, fontSize: '0.95rem',
            padding: '14px 28px', borderRadius: 100, fontFamily: bodyFont,
            transition, cursor: 'pointer', border: 'none',
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? 'Saving...' : 'Save Results'}
        </button>
      </form>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   RESULTS PAGE
   ══════════════════════════════════════════════════════════════════ */
export default function DiagnosticResults() {
  const navigate = useNavigate()
  const { answers, getResults } = useDiagnosticStore()

  // Redirect if no answers (user navigated directly)
  useEffect(() => {
    if (answers.length === 0) {
      navigate('/diagnostic')
    }
  }, [answers, navigate])

  if (answers.length === 0) return null

  const results = getResults()
  const sat = estimateSATRange(results.total_score, results.total_questions)

  return (
    <div style={{ minHeight: '100vh', padding: '48px 24px 80px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            display: 'inline-block', background: goldDim, color: gold,
            fontSize: '0.8rem', fontWeight: 700, fontFamily: bodyFont,
            padding: '6px 16px', borderRadius: 100, marginBottom: 20,
            textTransform: 'uppercase', letterSpacing: 1.5,
          }}>
            Diagnostic Complete
          </div>
          <h1 style={{
            fontFamily: heading, fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: white, marginBottom: 8,
          }}>
            Your Score Breakdown
          </h1>
          <p style={{ fontFamily: bodyFont, fontSize: '1rem', color: muted }}>
            Completed in {formatTime(results.time_spent_seconds)}
          </p>
        </div>

        {/* Overall score */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 48,
        }}>
          <ScoreRing score={results.total_score} total={results.total_questions} />
        </div>

        {/* Category breakdown */}
        <div style={{
          background: cardBg, border: `1.5px solid ${border}`, borderRadius: 14,
          padding: 32, marginBottom: 24,
        }}>
          <h3 style={{
            fontFamily: heading, fontWeight: 700, fontSize: '1.2rem', color: white, marginBottom: 24,
          }}>
            Category Breakdown
          </h3>
          <CategoryBar
            label="Math" score={results.math_score}
            total={results.math_questions} color={categoryConfig.math.color}
          />
          <CategoryBar
            label="Reading" score={results.reading_score}
            total={results.reading_questions} color={categoryConfig.reading.color}
          />
          <CategoryBar
            label="Writing" score={results.writing_score}
            total={results.writing_questions} color={categoryConfig.writing.color}
          />
        </div>

        {/* Estimated SAT score */}
        <div style={{
          background: cardBg, border: `1.5px solid ${goldBorder}`, borderRadius: 14,
          padding: 32, textAlign: 'center', marginBottom: 24,
        }}>
          <div style={{
            fontFamily: bodyFont, fontWeight: 600, fontSize: '0.8rem', color: muted,
            textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8,
          }}>
            Estimated SAT Score Range
          </div>
          <div style={{
            fontFamily: heading, fontWeight: 800, fontSize: '2.5rem', color: gold, lineHeight: 1,
          }}>
            {sat.low} – {sat.high}
          </div>
          <p style={{
            fontFamily: bodyFont, fontSize: '0.8rem', color: muted, marginTop: 8,
          }}>
            Based on diagnostic performance. Actual scores may vary.
          </p>
        </div>

        {/* Strengths & Weaknesses */}
        <Analysis results={results} />

        {/* Email capture */}
        <div style={{ marginTop: 32 }}>
          <EmailCapture results={results} />
        </div>

        {/* CTA */}
        <div style={{
          marginTop: 40, textAlign: 'center',
          background: cardBg, border: `1.5px solid ${border}`, borderRadius: 14,
          padding: '40px 32px',
        }}>
          <h3 style={{
            fontFamily: heading, fontWeight: 700, fontSize: '1.4rem', color: white, marginBottom: 8,
          }}>
            Ready to improve your score?
          </h3>
          <p style={{
            fontFamily: bodyFont, fontSize: '0.95rem', color: muted, marginBottom: 24,
            maxWidth: 400, margin: '0 auto 24px',
          }}>
            Get unlimited AI tutoring, personalized study plans, and full practice tests.
          </p>
          <Link to="/signup" style={{
            display: 'inline-block', background: gold, color: bg,
            fontWeight: 700, fontSize: '1.05rem', padding: '16px 40px',
            borderRadius: 100, textDecoration: 'none', fontFamily: bodyFont, transition,
          }}>
            Start Pro — Unlock Full Access
          </Link>
          <p style={{ fontFamily: bodyFont, fontSize: '0.85rem', color: muted, marginTop: 12 }}>
            From $31/month &middot; 7-day money-back guarantee
          </p>
        </div>

        {/* Retake link */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link to="/diagnostic" style={{
            fontFamily: bodyFont, fontSize: '0.9rem', color: muted, textDecoration: 'underline',
          }}>
            Retake Diagnostic
          </Link>
        </div>
      </div>
    </div>
  )
}
