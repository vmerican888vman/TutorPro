import { Link } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

function UpgradePrompt() {
  return (
    <div style={{ maxWidth: 500, margin: '0 auto', paddingTop: 40 }}>
      <div style={{
        background: 'var(--card-bg)', border: '1.5px solid var(--gold-border)',
        borderRadius: 14, padding: '40px 32px', textAlign: 'center',
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%', margin: '0 auto 20px',
          background: 'var(--gold-dim)', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <h2 style={{
          fontFamily: 'var(--font-heading)', fontWeight: 800,
          fontSize: '1.5rem', color: 'var(--white)', marginBottom: 8,
        }}>
          Pro Feature
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '0.95rem',
          color: 'var(--muted)', lineHeight: 1.7, marginBottom: 28,
        }}>
          This feature requires a Pro subscription. Upgrade to unlock unlimited
          AI tutoring, full practice tests, and progress tracking.
        </p>
        <Link to="/pricing" style={{
          display: 'inline-block', background: 'var(--gold)', color: 'var(--bg)',
          fontWeight: 700, fontSize: '1rem', padding: '14px 36px',
          borderRadius: 100, textDecoration: 'none',
          fontFamily: 'var(--font-body)', transition: 'var(--transition)',
        }}>
          Upgrade to Pro — from $31/mo
        </Link>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '0.8rem',
          color: 'var(--muted)', marginTop: 12,
        }}>
          7-day money-back guarantee
        </p>
      </div>
    </div>
  )
}

export default function ProGuard({ children }) {
  const isPro = useAuthStore((s) => s.isPro)

  if (!isPro()) {
    return <UpgradePrompt />
  }

  return children
}
