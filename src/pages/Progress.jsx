import { useState, useEffect, useRef } from 'react'
import { useAuthStore } from '../stores/authStore'
import { getPracticeSessions, getDiagnosticResults, getUserProgress, getFullTestSessions } from '../lib/database'
import { computeSessionScore, parseTestAnswers, computeCategoryBreakdown } from '../lib/scoring'

const heading = 'var(--font-heading)'
const body = 'var(--font-body)'
const gold = 'var(--gold)'
const white = 'var(--white)'
const muted = 'var(--muted)'
const cardBg = 'var(--card-bg)'
const border = 'var(--border)'
const green = '#34D399'
const red = '#F87171'
const mathPurple = '#818CF8'
const readingGreen = '#34D399'
const writingYellow = '#FBBF24'
const scienceBlue = '#60A5FA'

const categoryConfig = {
  math: { label: 'Math', color: 'var(--math-purple)' },
  reading: { label: 'Reading', color: 'var(--reading-green)' },
  writing: { label: 'Writing', color: 'var(--writing-yellow)' },
}

const testCategoryColors = {
  math: mathPurple,
  reading: readingGreen,
  writing: writingYellow,
  english: writingYellow,
  science: scienceBlue,
}

/* ══════════════════════════════════════════════════════════════════
   SHARED COMPONENTS
   ══════════════════════════════════════════════════════════════════ */

function StatCard({ value, label, sub, valueColor }) {
  return (
    <div style={{
      background: cardBg, border: `1.5px solid ${border}`,
      borderRadius: 14, padding: '20px 24px',
    }}>
      <div style={{
        fontFamily: heading, fontWeight: 800,
        fontSize: '1.8rem', color: valueColor || gold, lineHeight: 1,
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: body, fontSize: '0.85rem',
        color: muted, marginTop: 6,
      }}>
        {label}
      </div>
      {sub && (
        <div style={{
          fontFamily: body, fontSize: '0.75rem',
          color: muted, marginTop: 2, opacity: 0.7,
        }}>
          {sub}
        </div>
      )}
    </div>
  )
}

function MasteryBar({ label, color, correct, total }) {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontFamily: body, fontWeight: 600, fontSize: '0.9rem', color: white }}>
          {label}
        </span>
        <span style={{ fontFamily: body, fontSize: '0.85rem', color: muted }}>
          {pct}% ({correct}/{total})
        </span>
      </div>
      <div style={{
        height: 10, background: 'rgba(255,255,255,0.06)',
        borderRadius: 100, overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', width: `${pct}%`, background: color,
          borderRadius: 100, transition: 'width 0.8s ease',
        }} />
      </div>
    </div>
  )
}

function TopicSection({ title, topics, color }) {
  if (!topics.length) return null
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{
        fontFamily: body, fontWeight: 600, fontSize: '0.85rem',
        color: muted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em',
      }}>
        {title}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {topics.map((t) => (
          <span key={t} style={{
            fontFamily: body, fontSize: '0.8rem', color: white,
            background: color, padding: '4px 12px', borderRadius: 100,
          }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   PRACTICE STATS COMPONENTS
   ══════════════════════════════════════════════════════════════════ */

function ScoreChart({ sessions }) {
  const points = sessions
    .filter((s) => s.total_questions > 0)
    .sort((a, b) => new Date(a.completed_at) - new Date(b.completed_at))
    .map((s) => ({
      date: new Date(s.completed_at),
      pct: Math.round((s.correct_answers / s.total_questions) * 100),
    }))

  if (points.length < 2) {
    return (
      <div style={{
        background: cardBg, border: `1.5px solid ${border}`,
        borderRadius: 14, padding: 32, textAlign: 'center',
      }}>
        <div style={{ fontFamily: body, fontSize: '0.9rem', color: muted }}>
          Complete at least 2 practice sessions to see your score trend.
        </div>
      </div>
    )
  }

  const W = 560, H = 200, padX = 40, padY = 24
  const chartW = W - padX * 2, chartH = H - padY * 2
  const minPct = Math.max(0, Math.min(...points.map((p) => p.pct)) - 10)
  const maxPct = Math.min(100, Math.max(...points.map((p) => p.pct)) + 10)
  const range = maxPct - minPct || 1

  const coords = points.map((p, i) => ({
    x: padX + (i / (points.length - 1)) * chartW,
    y: padY + chartH - ((p.pct - minPct) / range) * chartH,
    pct: p.pct, date: p.date,
  }))

  const pathD = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ')
  const gridLines = [minPct, Math.round((minPct + maxPct) / 2), maxPct]

  return (
    <div style={{
      background: cardBg, border: `1.5px solid ${border}`,
      borderRadius: 14, padding: '24px 16px', overflowX: 'auto',
    }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: W }}>
        {gridLines.map((pct) => {
          const y = padY + chartH - ((pct - minPct) / range) * chartH
          return (
            <g key={pct}>
              <line x1={padX} y1={y} x2={W - padX} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
              <text x={padX - 6} y={y + 4} textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize={11} fontFamily="var(--font-body)">{pct}%</text>
            </g>
          )
        })}
        <path d={pathD} fill="none" stroke={gold} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        {coords.map((c, i) => (
          <g key={i}>
            <circle cx={c.x} cy={c.y} r={4} fill={gold} />
            <title>{c.date.toLocaleDateString()} — {c.pct}%</title>
          </g>
        ))}
        <text x={coords[0].x} y={H - 4} textAnchor="start" fill="rgba(255,255,255,0.3)" fontSize={10} fontFamily="var(--font-body)">
          {coords[0].date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
        </text>
        <text x={coords[coords.length - 1].x} y={H - 4} textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize={10} fontFamily="var(--font-body)">
          {coords[coords.length - 1].date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
        </text>
      </svg>
    </div>
  )
}

function StreakCalendar({ sessions }) {
  const activeDates = new Set()
  for (const s of sessions) {
    if (s.completed_at) activeDates.add(new Date(s.completed_at).toISOString().split('T')[0])
  }
  const days = []
  const today = new Date()
  for (let i = 27; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const key = d.toISOString().split('T')[0]
    days.push({ key, active: activeDates.has(key), date: d })
  }

  return (
    <div style={{ background: cardBg, border: `1.5px solid ${border}`, borderRadius: 14, padding: 24 }}>
      <div style={{ fontFamily: heading, fontWeight: 700, fontSize: '1rem', color: white, marginBottom: 16 }}>
        Activity (Last 28 Days)
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
        {days.map((d) => (
          <div key={d.key} title={`${d.date.toLocaleDateString()} ${d.active ? '— Active' : ''}`}
            style={{ aspectRatio: '1', borderRadius: 4, background: d.active ? gold : 'rgba(255,255,255,0.04)', opacity: d.active ? 1 : 0.5, transition: 'var(--transition)' }} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
        <span style={{ fontFamily: body, fontSize: '0.7rem', color: muted }}>{days[0].date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
        <span style={{ fontFamily: body, fontSize: '0.7rem', color: muted }}>Today</span>
      </div>
    </div>
  )
}

function RecentActivity({ sessions, diagnostics }) {
  const items = [
    ...sessions.map((s) => ({
      type: s.session_type === 'full_test' ? 'full_test' : 'practice',
      date: new Date(s.completed_at),
      category: s.category,
      score: `${s.correct_answers}/${s.total_questions}`,
      pct: Math.round((s.correct_answers / s.total_questions) * 100),
    })),
    ...diagnostics.map((d) => ({
      type: 'diagnostic',
      date: new Date(d.completed_at),
      category: 'mixed',
      score: `${d.correct_answers || d.total_score}/${d.total_questions}`,
      pct: Math.round(((d.correct_answers || d.total_score) / d.total_questions) * 100),
    })),
  ].sort((a, b) => b.date - a.date).slice(0, 10)

  if (!items.length) {
    return (
      <div style={{ background: cardBg, border: `1.5px solid ${border}`, borderRadius: 14, padding: 32, textAlign: 'center' }}>
        <div style={{ fontFamily: body, fontSize: '0.9rem', color: muted }}>No activity yet. Complete a practice set to get started.</div>
      </div>
    )
  }

  return (
    <div style={{ background: cardBg, border: `1.5px solid ${border}`, borderRadius: 14, overflow: 'hidden' }}>
      {items.map((item, i) => {
        const catConf = categoryConfig[item.category]
        const label = item.type === 'diagnostic' ? 'Diagnostic Test'
          : item.type === 'full_test' ? 'Full Practice Test'
          : `${catConf?.label || 'Mixed'} Practice`
        return (
          <div key={i} style={{
            padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderBottom: i < items.length - 1 ? `1px solid ${border}` : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: catConf?.color || gold }} />
              <div>
                <div style={{ fontFamily: body, fontWeight: 600, fontSize: '0.9rem', color: white }}>{label}</div>
                <div style={{ fontFamily: body, fontSize: '0.75rem', color: muted }}>
                  {item.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontFamily: heading, fontWeight: 700, fontSize: '1rem',
                color: item.pct >= 70 ? green : item.pct >= 50 ? writingYellow : '#EF4444',
              }}>{item.pct}%</div>
              <div style={{ fontFamily: body, fontSize: '0.75rem', color: muted }}>{item.score}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   TEST HISTORY COMPONENTS
   ══════════════════════════════════════════════════════════════════ */

function TestScoreChart({ sessions }) {
  // Build data points from full test sessions (chronological)
  const points = sessions
    .filter(s => s.total_questions > 0)
    .sort((a, b) => new Date(a.completed_at) - new Date(b.completed_at))
    .map(s => {
      const { score } = computeSessionScore(s)
      return { date: new Date(s.completed_at), score: score.total, rw: score.rw, math: score.math }
    })

  if (points.length < 1) {
    return (
      <div style={{ background: cardBg, border: `1.5px solid ${border}`, borderRadius: 14, padding: 32, textAlign: 'center' }}>
        <div style={{ fontFamily: body, fontSize: '0.9rem', color: muted }}>
          Complete a full practice test to see your score history.
        </div>
      </div>
    )
  }

  if (points.length === 1) {
    return (
      <div style={{ background: cardBg, border: `1.5px solid ${border}`, borderRadius: 14, padding: 32, textAlign: 'center' }}>
        <div style={{ fontFamily: heading, fontWeight: 800, fontSize: '2rem', color: gold, marginBottom: 8 }}>
          {points[0].score}
        </div>
        <div style={{ fontFamily: body, fontSize: '0.9rem', color: muted }}>
          Your first test score — take another to track improvement!
        </div>
      </div>
    )
  }

  const W = 560, H = 220, padX = 50, padY = 24
  const chartW = W - padX * 2, chartH = H - padY * 2
  const scores = points.map(p => p.score)
  const minScore = Math.max(400, Math.min(...scores) - 50)
  const maxScore = Math.min(1600, Math.max(...scores) + 50)
  const range = maxScore - minScore || 1

  const coords = points.map((p, i) => ({
    x: padX + (points.length === 1 ? chartW / 2 : (i / (points.length - 1)) * chartW),
    y: padY + chartH - ((p.score - minScore) / range) * chartH,
    score: p.score, rw: p.rw, math: p.math, date: p.date,
  }))

  const pathD = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ')

  // RW line (if SAT)
  const hasSubScores = points.every(p => p.rw != null)
  let rwCoords, mathCoords, rwPathD, mathPathD
  if (hasSubScores) {
    const allSub = [...points.map(p => p.rw), ...points.map(p => p.math)]
    const subMin = Math.max(200, Math.min(...allSub) - 30)
    const subMax = Math.min(800, Math.max(...allSub) + 30)
    const subRange = subMax - subMin || 1
    rwCoords = points.map((p, i) => ({
      x: padX + (i / (points.length - 1)) * chartW,
      y: padY + chartH - ((p.rw - subMin) / subRange) * chartH,
    }))
    mathCoords = points.map((p, i) => ({
      x: padX + (i / (points.length - 1)) * chartW,
      y: padY + chartH - ((p.math - subMin) / subRange) * chartH,
    }))
    rwPathD = rwCoords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ')
    mathPathD = mathCoords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ')
  }

  const gridLines = [minScore, Math.round((minScore + maxScore) / 2), maxScore]

  return (
    <div style={{ background: cardBg, border: `1.5px solid ${border}`, borderRadius: 14, padding: '24px 16px', overflowX: 'auto' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: W }}>
        {gridLines.map(val => {
          const y = padY + chartH - ((val - minScore) / range) * chartH
          return (
            <g key={val}>
              <line x1={padX} y1={y} x2={W - padX} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
              <text x={padX - 6} y={y + 4} textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize={11} fontFamily="var(--font-body)">{val}</text>
            </g>
          )
        })}

        {/* Main score line */}
        <path d={pathD} fill="none" stroke={gold} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        {coords.map((c, i) => (
          <g key={i}>
            <circle cx={c.x} cy={c.y} r={5} fill={gold} />
            <title>{c.date.toLocaleDateString()} — {c.score}{c.rw ? ` (RW: ${c.rw}, Math: ${c.math})` : ''}</title>
          </g>
        ))}

        {/* Date labels */}
        <text x={coords[0].x} y={H - 4} textAnchor="start" fill="rgba(255,255,255,0.3)" fontSize={10} fontFamily="var(--font-body)">
          {coords[0].date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
        </text>
        <text x={coords[coords.length - 1].x} y={H - 4} textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize={10} fontFamily="var(--font-body)">
          {coords[coords.length - 1].date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
        </text>
      </svg>

      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 12, height: 3, background: gold, borderRadius: 2 }} />
          <span style={{ fontFamily: body, fontSize: '0.75rem', color: muted }}>Total Score</span>
        </div>
      </div>
    </div>
  )
}

function TestAttemptRow({ session, index, totalSessions, prevSession }) {
  const [expanded, setExpanded] = useState(false)
  const { testType, score } = computeSessionScore(session)
  const { meta, questions } = parseTestAnswers(session)
  const totalCorrect = session.correct_answers
  const totalQuestions = session.total_questions
  const pct = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0
  const date = new Date(session.completed_at)
  const timeMin = session.time_spent_seconds ? Math.round(session.time_spent_seconds / 60) : null

  // Compute improvement vs previous attempt
  let trend = null
  if (prevSession) {
    const { score: prevScore } = computeSessionScore(prevSession)
    const diff = score.total - prevScore.total
    trend = { diff, direction: diff > 0 ? 'up' : diff < 0 ? 'down' : 'same' }
  }

  // Category breakdown
  const breakdown = computeCategoryBreakdown(questions)

  // Weak subcategories (< 60%)
  const weakAreas = []
  for (const [cat, stats] of Object.entries(breakdown)) {
    for (const [sub, subStats] of Object.entries(stats.subcategories)) {
      if (subStats.pct < 60 && subStats.total >= 2) {
        weakAreas.push({ name: sub, pct: subStats.pct, category: cat })
      }
    }
  }

  // Wrong questions
  const wrongQuestions = questions.filter(q => q.selected !== q.correct && q.selected !== null)

  const testLabel = meta?.testId
    ? `${testType.toUpperCase()} Practice Test ${meta.testId.split('-')[1] || ''}`
    : `${testType.toUpperCase()} Full Test`

  return (
    <div style={{
      background: cardBg, border: `1.5px solid ${border}`,
      borderRadius: 14, overflow: 'hidden', marginBottom: 12,
    }}>
      {/* Summary row */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%', padding: '16px 20px', background: 'transparent',
          border: 'none', cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between', gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
          {/* Test type badge */}
          <div style={{
            padding: '4px 10px', borderRadius: 6, flexShrink: 0,
            background: testType === 'sat' ? 'rgba(245,200,66,0.12)' : 'rgba(96,165,250,0.12)',
            color: testType === 'sat' ? gold : scienceBlue,
            fontFamily: body, fontWeight: 700, fontSize: '0.7rem',
            textTransform: 'uppercase', letterSpacing: 1,
          }}>
            {testType.toUpperCase()}
          </div>
          <div style={{ textAlign: 'left', minWidth: 0 }}>
            <div style={{ fontFamily: body, fontWeight: 600, fontSize: '0.9rem', color: white, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {testLabel}
            </div>
            <div style={{ fontFamily: body, fontSize: '0.75rem', color: muted }}>
              {date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              {timeMin ? ` · ${timeMin} min` : ''}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
          {/* Score */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: heading, fontWeight: 800, fontSize: '1.3rem', color: gold }}>
              {score.total}
            </div>
            <div style={{ fontFamily: body, fontSize: '0.7rem', color: muted }}>
              {pct}% accuracy
            </div>
          </div>

          {/* Trend arrow */}
          {trend && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 4,
              color: trend.direction === 'up' ? green : trend.direction === 'down' ? red : muted,
              fontFamily: body, fontWeight: 700, fontSize: '0.8rem',
            }}>
              {trend.direction === 'up' && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15"/>
                </svg>
              )}
              {trend.direction === 'down' && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              )}
              {trend.diff !== 0 ? `${trend.diff > 0 ? '+' : ''}${trend.diff}` : '—'}
            </div>
          )}

          {/* Expand arrow */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'rotate(0)' }}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div style={{ padding: '0 20px 20px', borderTop: `1px solid ${border}` }}>
          {/* Sub-scores for SAT */}
          {score.rw != null && (
            <div style={{ display: 'flex', gap: 16, marginTop: 16, marginBottom: 20 }}>
              <div style={{
                flex: 1, padding: '12px 16px', borderRadius: 10,
                background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.15)',
              }}>
                <div style={{ fontFamily: body, fontSize: '0.7rem', color: readingGreen, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Reading & Writing</div>
                <div style={{ fontFamily: heading, fontWeight: 800, fontSize: '1.2rem', color: white }}>{score.rw}</div>
              </div>
              <div style={{
                flex: 1, padding: '12px 16px', borderRadius: 10,
                background: 'rgba(129,140,248,0.06)', border: '1px solid rgba(129,140,248,0.15)',
              }}>
                <div style={{ fontFamily: body, fontSize: '0.7rem', color: mathPurple, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Math</div>
                <div style={{ fontFamily: heading, fontWeight: 800, fontSize: '1.2rem', color: white }}>{score.math}</div>
              </div>
            </div>
          )}

          {/* Category breakdown bars */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: body, fontWeight: 600, fontSize: '0.85rem', color: muted, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Category Breakdown
            </div>
            {Object.entries(breakdown).map(([cat, stats]) => (
              <MasteryBar
                key={cat}
                label={cat.charAt(0).toUpperCase() + cat.slice(1)}
                color={testCategoryColors[cat] || gold}
                correct={stats.correct}
                total={stats.total}
              />
            ))}
          </div>

          {/* Weak areas */}
          {weakAreas.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: body, fontWeight: 600, fontSize: '0.85rem', color: muted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Needs Improvement
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {weakAreas.map((w) => (
                  <span key={w.name} style={{
                    fontFamily: body, fontSize: '0.8rem', color: white,
                    background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.25)',
                    padding: '4px 12px', borderRadius: 100,
                  }}>
                    {w.name.charAt(0).toUpperCase() + w.name.slice(1).replace(/[-_]/g, ' ')} ({w.pct}%)
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Wrong questions */}
          {wrongQuestions.length > 0 && (
            <div>
              <div style={{ fontFamily: body, fontWeight: 600, fontSize: '0.85rem', color: muted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Missed Questions ({wrongQuestions.length})
              </div>
              <div style={{
                maxHeight: 300, overflowY: 'auto', borderRadius: 10,
                background: 'rgba(255,255,255,0.02)', border: `1px solid ${border}`,
              }}>
                {wrongQuestions.slice(0, 20).map((q, i) => (
                  <div key={i} style={{
                    padding: '10px 14px', borderBottom: i < Math.min(wrongQuestions.length, 20) - 1 ? `1px solid ${border}` : 'none',
                    display: 'flex', alignItems: 'flex-start', gap: 12,
                  }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                      background: 'rgba(248,113,113,0.12)', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      fontFamily: body, fontWeight: 700, fontSize: '0.65rem', color: red,
                    }}>
                      ✕
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontFamily: body, fontSize: '0.8rem', color: 'rgba(250,250,249,0.8)',
                        lineHeight: 1.5, marginBottom: 4,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>
                        {q.question_text || q.question_id || `Question ${i + 1}`}
                      </div>
                      <div style={{ fontFamily: body, fontSize: '0.75rem', color: muted }}>
                        Your answer: <span style={{ color: red, fontWeight: 600 }}>{q.selected}</span>
                        {' · '}
                        Correct: <span style={{ color: green, fontWeight: 600 }}>{q.correct}</span>
                        {q.subcategory && (
                          <span style={{ marginLeft: 8, color: testCategoryColors[q.category] || muted }}>
                            {q.subcategory.replace(/[-_]/g, ' ')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {wrongQuestions.length > 20 && (
                  <div style={{ padding: '10px 14px', fontFamily: body, fontSize: '0.8rem', color: muted, textAlign: 'center' }}>
                    + {wrongQuestions.length - 20} more missed questions
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   MAIN PROGRESS PAGE
   ══════════════════════════════════════════════════════════════════ */
export default function Progress() {
  const user = useAuthStore((s) => s.user)
  const [sessions, setSessions] = useState([])
  const [diagnostics, setDiagnostics] = useState([])
  const [progress, setProgress] = useState(null)
  const [fullTestSessions, setFullTestSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('practice')
  const loadedRef = useRef(false)

  useEffect(() => {
    if (!user || loadedRef.current) return
    loadedRef.current = true

    async function load() {
      const [sessRes, diagRes, progRes, testRes] = await Promise.all([
        getPracticeSessions(user.id),
        getDiagnosticResults(user.id),
        getUserProgress(user.id),
        getFullTestSessions(user.id),
      ])
      setSessions(sessRes.data || [])
      setDiagnostics(diagRes.data || [])
      setProgress(progRes.data || null)
      setFullTestSessions(testRes.data || [])
      setLoading(false)
    }
    load()
  }, [user])

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '40vh', color: muted, fontFamily: body }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 32, height: 32, border: `3px solid ${border}`,
            borderTopColor: gold, borderRadius: '50%',
            animation: 'spin 0.8s linear infinite', margin: '0 auto 12px',
          }} />
          Loading your progress...
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    )
  }

  // Filter practice sessions (exclude full_test for practice stats)
  const practiceSessions = sessions.filter(s => s.session_type !== 'full_test')

  // Aggregate stats from practice sessions only
  const totalAnswered = practiceSessions.reduce((sum, s) => sum + s.total_questions, 0)
  const totalCorrect = practiceSessions.reduce((sum, s) => sum + s.correct_answers, 0)
  const overallPct = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0

  // Category breakdown from practice sessions
  const categoryStats = {}
  for (const s of practiceSessions) {
    const answers = Array.isArray(s.answers) ? s.answers : (s.answers?.questions || [])
    for (const a of answers) {
      const cat = a.category || s.category
      if (!cat || cat === 'mixed') continue
      if (!categoryStats[cat]) categoryStats[cat] = { correct: 0, total: 0, subcategories: {} }
      categoryStats[cat].total += 1
      const isCorrect = a.selected === a.correct
      if (isCorrect) categoryStats[cat].correct += 1
      const sub = a.subcategory
      if (sub) {
        if (!categoryStats[cat].subcategories[sub]) categoryStats[cat].subcategories[sub] = { correct: 0, total: 0 }
        categoryStats[cat].subcategories[sub].total += 1
        if (isCorrect) categoryStats[cat].subcategories[sub].correct += 1
      }
    }
  }

  const mastered = []
  const needsWork = []
  for (const [, stats] of Object.entries(categoryStats)) {
    for (const [sub, subStats] of Object.entries(stats.subcategories)) {
      const pct = subStats.total > 0 ? subStats.correct / subStats.total : 0
      const name = sub.charAt(0).toUpperCase() + sub.slice(1).replace(/_/g, ' ')
      if (pct >= 0.7 && subStats.total >= 2) mastered.push(name)
      else if (subStats.total >= 2) needsWork.push(name)
    }
  }

  const estSat = totalAnswered >= 5 ? Math.round(400 + (overallPct / 100) * 1200) : null
  const streakDays = progress?.streak_days ?? 0

  // Full test stats
  const sortedTests = [...fullTestSessions].sort((a, b) => new Date(a.completed_at) - new Date(b.completed_at))
  const testCount = fullTestSessions.length
  const bestScore = testCount > 0 ? Math.max(...fullTestSessions.map(s => computeSessionScore(s).score.total)) : null
  const firstScore = sortedTests.length > 0 ? computeSessionScore(sortedTests[0]).score.total : null
  const latestScore = sortedTests.length > 0 ? computeSessionScore(sortedTests[sortedTests.length - 1]).score.total : null
  const improvement = firstScore != null && latestScore != null && testCount > 1 ? latestScore - firstScore : null

  return (
    <div style={{ maxWidth: 900 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{
          fontFamily: heading, fontWeight: 800,
          fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: white, marginBottom: 6,
        }}>
          Your Progress
        </h1>
        <p style={{ fontFamily: body, fontSize: '0.95rem', color: muted }}>
          Track your improvement across all categories.
        </p>
      </div>

      {/* Tab toggle */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
        {[
          { key: 'practice', label: 'Practice Stats' },
          { key: 'tests', label: 'Test History' },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            style={{
              padding: '10px 28px', borderRadius: 100, border: 'none', cursor: 'pointer',
              fontFamily: body, fontWeight: 700, fontSize: '0.9rem',
              background: activeTab === t.key ? gold : 'rgba(255,255,255,0.04)',
              color: activeTab === t.key ? '#07070F' : muted,
              transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {t.label}
            {t.key === 'tests' && testCount > 0 && (
              <span style={{
                marginLeft: 8, padding: '2px 8px', borderRadius: 100, fontSize: '0.7rem',
                background: activeTab === t.key ? 'rgba(7,7,15,0.15)' : 'rgba(245,200,66,0.15)',
                color: activeTab === t.key ? '#07070F' : gold,
              }}>
                {testCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ═══ PRACTICE STATS TAB ═══ */}
      {activeTab === 'practice' && (
        <>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
            <StatCard value={totalAnswered} label="Questions Answered" sub={totalCorrect > 0 ? `${totalCorrect} correct` : undefined} />
            <StatCard value={`${overallPct}%`} label="Overall Accuracy" sub={totalAnswered > 0 ? `${totalCorrect}/${totalAnswered}` : undefined} />
            <StatCard value={estSat ? estSat : '--'} label="Est. SAT Score" sub={estSat ? `Based on ${totalAnswered} questions` : 'Need 5+ questions'} />
          </div>

          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16, marginBottom: 32 }}>
            <div style={{
              background: cardBg, border: `1.5px solid ${border}`, borderRadius: 14, padding: 24,
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            }}>
              <div style={{ fontFamily: heading, fontWeight: 800, fontSize: '3rem', color: gold, lineHeight: 1 }}>{streakDays}</div>
              <div style={{ fontFamily: body, fontSize: '0.9rem', color: muted, marginTop: 8 }}>Day Streak</div>
            </div>
            <StreakCalendar sessions={[...practiceSessions, ...diagnostics]} />
          </div>

          <h2 style={{ fontFamily: heading, fontWeight: 700, fontSize: '1.2rem', color: white, marginBottom: 16 }}>Score Trend</h2>
          <div style={{ marginBottom: 32 }}>
            <ScoreChart sessions={practiceSessions} />
          </div>

          <h2 style={{ fontFamily: heading, fontWeight: 700, fontSize: '1.2rem', color: white, marginBottom: 16 }}>Category Breakdown</h2>
          <div style={{ background: cardBg, border: `1.5px solid ${border}`, borderRadius: 14, padding: 24, marginBottom: 32 }}>
            {Object.keys(categoryStats).length > 0 ? (
              Object.entries(categoryConfig).map(([key, conf]) => {
                const stats = categoryStats[key]
                if (!stats) return null
                return <MasteryBar key={key} label={conf.label} color={conf.color} correct={stats.correct} total={stats.total} />
              })
            ) : (
              <div style={{ fontFamily: body, fontSize: '0.9rem', color: muted, textAlign: 'center', padding: 16 }}>
                Complete practice sets to see category breakdown.
              </div>
            )}
          </div>

          {(mastered.length > 0 || needsWork.length > 0) && (
            <>
              <h2 style={{ fontFamily: heading, fontWeight: 700, fontSize: '1.2rem', color: white, marginBottom: 16 }}>Topic Analysis</h2>
              <div style={{ background: cardBg, border: `1.5px solid ${border}`, borderRadius: 14, padding: 24, marginBottom: 32 }}>
                <TopicSection title="Mastered" topics={mastered} color="rgba(52,211,153,0.2)" />
                <TopicSection title="Needs Work" topics={needsWork} color="rgba(239,68,68,0.2)" />
              </div>
            </>
          )}

          <h2 style={{ fontFamily: heading, fontWeight: 700, fontSize: '1.2rem', color: white, marginBottom: 16 }}>Recent Activity</h2>
          <RecentActivity sessions={sessions} diagnostics={diagnostics} />
        </>
      )}

      {/* ═══ TEST HISTORY TAB ═══ */}
      {activeTab === 'tests' && (
        <>
          {/* Improvement summary cards */}
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
            <StatCard value={testCount} label="Tests Taken" sub={testCount > 0 ? 'Full practice tests' : 'Take your first test!'} />
            <StatCard value={bestScore || '--'} label="Best Score" sub={bestScore ? 'Highest achieved' : 'No tests yet'} />
            <StatCard
              value={improvement != null ? `${improvement > 0 ? '+' : ''}${improvement}` : '--'}
              label="Improvement"
              sub={improvement != null ? 'First → Latest test' : testCount === 1 ? 'Take another test!' : 'No tests yet'}
              valueColor={improvement > 0 ? green : improvement < 0 ? red : gold}
            />
          </div>

          {/* Score trend chart */}
          <h2 style={{ fontFamily: heading, fontWeight: 700, fontSize: '1.2rem', color: white, marginBottom: 16 }}>Score History</h2>
          <div style={{ marginBottom: 32 }}>
            <TestScoreChart sessions={fullTestSessions} />
          </div>

          {/* Test attempts list */}
          <h2 style={{ fontFamily: heading, fontWeight: 700, fontSize: '1.2rem', color: white, marginBottom: 16 }}>
            All Tests
            {testCount > 0 && <span style={{ fontFamily: body, fontWeight: 400, fontSize: '0.85rem', color: muted, marginLeft: 8 }}>({testCount})</span>}
          </h2>
          {testCount === 0 ? (
            <div style={{ background: cardBg, border: `1.5px solid ${border}`, borderRadius: 14, padding: 32, textAlign: 'center' }}>
              <div style={{ fontFamily: body, fontSize: '0.9rem', color: muted }}>
                No full tests completed yet. Go to Full Tests to take your first practice exam!
              </div>
            </div>
          ) : (
            // Show in reverse chronological (most recent first) but pass prev session for trends
            [...fullTestSessions]
              .sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at))
              .map((session, i, arr) => {
                // prev session is the one taken before this one (next in reverse-sorted array)
                const prevSession = i < arr.length - 1 ? arr[i + 1] : null
                return (
                  <TestAttemptRow
                    key={session.id}
                    session={session}
                    index={i}
                    totalSessions={arr.length}
                    prevSession={prevSession}
                  />
                )
              })
          )}
        </>
      )}
    </div>
  )
}
