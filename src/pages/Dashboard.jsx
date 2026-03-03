import { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

const categoryCards = [
  { label: 'Math', color: 'var(--math-purple)', mastery: null },
  { label: 'Reading', color: 'var(--reading-green)', mastery: null },
  { label: 'Writing', color: 'var(--writing-yellow)', mastery: null },
]

const quickActions = [
  { label: 'Start Practice', to: '/dashboard/practice', desc: 'Answer targeted questions' },
  { label: 'Full Practice Test', to: '/dashboard/full-test', desc: 'Timed SAT & ACT exams' },
  { label: 'Q&A Explainer', to: '/dashboard/explain', desc: 'Paste any question for AI help' },
  { label: 'Talk to Tutor', to: '/dashboard/tutor', desc: 'Get AI-powered help' },
  { label: 'View Progress', to: '/dashboard/progress', desc: 'See your analytics' },
]

function StatCard({ value, label }) {
  return (
    <div style={{
      background: 'var(--card-bg)', border: '1.5px solid var(--border)',
      borderRadius: 14, padding: '20px 24px',
    }}>
      <div style={{
        fontFamily: 'var(--font-heading)', fontWeight: 800,
        fontSize: '1.8rem', color: 'var(--gold)', lineHeight: 1,
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: 'var(--font-body)', fontSize: '0.85rem',
        color: 'var(--muted)', marginTop: 6,
      }}>
        {label}
      </div>
    </div>
  )
}

function MasteryCard({ label, color }) {
  return (
    <div style={{
      background: 'var(--card-bg)', border: '1.5px solid var(--border)',
      borderRadius: 14, padding: 24, transition: 'var(--transition)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
        <span style={{
          fontFamily: 'var(--font-body)', fontWeight: 600,
          fontSize: '1rem', color: 'var(--white)',
        }}>
          {label}
        </span>
      </div>
      <div style={{
        height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 100,
        overflow: 'hidden', marginBottom: 8,
      }}>
        <div style={{ height: '100%', width: '0%', background: color, borderRadius: 100, transition: 'width 1s ease' }} />
      </div>
      <div style={{
        fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--muted)',
      }}>
        Take a practice set to track mastery
      </div>
    </div>
  )
}

export default function Dashboard() {
  const profile = useAuthStore((s) => s.profile)
  const isPro = useAuthStore((s) => s.isPro)
  const fetchProfile = useAuthStore((s) => s.fetchProfile)
  const user = useAuthStore((s) => s.user)
  const [searchParams, setSearchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [dismissed, setDismissed] = useState(false)
  const showSuccess = !!sessionId && !dismissed
  const cleanedRef = useRef(false)

  // If user is logged in but profile is missing, retry the fetch
  useEffect(() => {
    if (user && !profile) {
      const timer = setTimeout(() => fetchProfile(user.id), 800)
      return () => clearTimeout(timer)
    }
  }, [user, profile, fetchProfile])

  // Clean session_id from URL and refresh profile after checkout
  useEffect(() => {
    if (!sessionId || cleanedRef.current) return
    cleanedRef.current = true
    const next = new URLSearchParams(searchParams)
    next.delete('session_id')
    setSearchParams(next, { replace: true })
    if (user) {
      const timer = setTimeout(() => fetchProfile(user.id), 1500)
      return () => clearTimeout(timer)
    }
  }, [sessionId, user, fetchProfile, searchParams, setSearchParams])

  return (
    <div style={{ maxWidth: 900 }}>
      {/* Checkout success banner */}
      {showSuccess && (
        <div style={{
          background: 'rgba(52,211,153,0.08)', border: '1.5px solid rgba(52,211,153,0.25)',
          borderRadius: 14, padding: '16px 24px', marginBottom: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: '#34D399',
          }}>
            Welcome to Pro! Your subscription is active. Time to start improving.
          </div>
          <button
            onClick={() => setDismissed(true)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#34D399', fontSize: '1.2rem', padding: '0 4px',
            }}
          >
            &times;
          </button>
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{
          fontFamily: 'var(--font-heading)', fontWeight: 800,
          fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--white)', marginBottom: 6,
        }}>
          Welcome back{(profile?.full_name || user?.user_metadata?.full_name || user?.user_metadata?.name) ? `, ${profile?.full_name || user?.user_metadata?.full_name || user?.user_metadata?.name}` : ''}
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--muted)' }}>
          Your personalized SAT & ACT prep dashboard.
        </p>
      </div>

      {/* Upgrade banner (free users) */}
      {!isPro() && (
        <div style={{
          background: 'var(--gold-dim)', border: '1.5px solid var(--gold-border)',
          borderRadius: 14, padding: '20px 24px', marginBottom: 28,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16,
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-body)', fontWeight: 700,
              fontSize: '1rem', color: 'var(--gold)', marginBottom: 4,
            }}>
              Upgrade to Pro
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--muted)' }}>
              Unlock unlimited AI tutoring, full practice tests, and progress tracking.
            </div>
          </div>
          <Link to="/pricing" style={{
            background: 'var(--gold)', color: 'var(--bg)', fontWeight: 700,
            fontSize: '0.9rem', padding: '10px 24px', borderRadius: 100,
            textDecoration: 'none', fontFamily: 'var(--font-body)',
            whiteSpace: 'nowrap', transition: 'var(--transition)',
          }}>
            $39/month &rarr;
          </Link>
        </div>
      )}

      {/* Quick stats */}
      <div className="grid-3" style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 16, marginBottom: 32,
      }}>
        <StatCard value="0" label="Day Streak" />
        <StatCard value="0" label="Questions Answered" />
        <StatCard value="--" label="Est. SAT Score" />
      </div>

      {/* Quick actions */}
      <h2 style={{
        fontFamily: 'var(--font-heading)', fontWeight: 700,
        fontSize: '1.2rem', color: 'var(--white)', marginBottom: 16,
      }}>
        Quick Actions
      </h2>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 16, marginBottom: 40,
      }}>
        {quickActions.map((action) => (
          <Link key={action.to} to={action.to} style={{
            background: 'var(--card-bg)', border: '1.5px solid var(--border)',
            borderRadius: 14, padding: 24, textDecoration: 'none',
            transition: 'var(--transition)', display: 'block',
          }}>
            <div style={{
              fontFamily: 'var(--font-body)', fontWeight: 600,
              fontSize: '1rem', color: 'var(--white)', marginBottom: 6,
            }}>
              {action.label}
            </div>
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--muted)',
            }}>
              {action.desc}
            </div>
          </Link>
        ))}
      </div>

      {/* Category mastery */}
      <h2 style={{
        fontFamily: 'var(--font-heading)', fontWeight: 700,
        fontSize: '1.2rem', color: 'var(--white)', marginBottom: 16,
      }}>
        Category Mastery
      </h2>
      <div className="grid-3" style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
      }}>
        {categoryCards.map((cat) => (
          <MasteryCard key={cat.label} label={cat.label} color={cat.color} />
        ))}
      </div>
    </div>
  )
}
