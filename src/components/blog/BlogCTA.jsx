import { Link } from 'react-router-dom'

const gold = '#F5C842'
const bg = '#07070F'
const white = '#FAFAF9'
const muted = '#9B9BAD'
const goldDim = 'rgba(245,200,66,0.12)'
const goldBorder = 'rgba(245,200,66,0.25)'
const transition = 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
const heading = "'Playfair Display', serif"
const body = "'DM Sans', sans-serif"

export function InlineCTA() {
  return (
    <div style={{
      background: goldDim, border: `1px solid ${goldBorder}`,
      borderRadius: 16, padding: '24px 28px', margin: '32px 0',
    }}>
      <p style={{
        fontFamily: heading, fontWeight: 700, fontSize: '1.15rem',
        color: white, marginBottom: 8,
      }}>
        Ready to boost your score?
      </p>
      <p style={{ fontFamily: body, fontSize: '0.9rem', color: muted, marginBottom: 16 }}>
        Try TutorPro's AI-powered SAT & ACT practice for free. Get a personalized study plan based on your diagnostic results.
      </p>
      <Link to="/diagnostic" style={{
        display: 'inline-block', background: gold, color: bg,
        fontWeight: 700, fontSize: '0.9rem', padding: '10px 24px',
        borderRadius: 100, textDecoration: 'none', fontFamily: body, transition,
      }}>
        Take Free Diagnostic &rarr;
      </Link>
    </div>
  )
}

export function BottomCTA() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(245,200,66,0.08), rgba(245,200,66,0.03))',
      border: `1px solid ${goldBorder}`,
      borderRadius: 20, padding: '40px 32px', marginTop: 48, textAlign: 'center',
    }}>
      <h3 style={{
        fontFamily: heading, fontWeight: 800, fontSize: '1.5rem',
        color: white, marginBottom: 12,
      }}>
        Get Your Personalized Study Plan
      </h3>
      <p style={{
        fontFamily: body, fontSize: '1rem', color: muted,
        maxWidth: 480, margin: '0 auto 24px', lineHeight: 1.6,
      }}>
        Take our free 20-question diagnostic test. Our AI analyzes your strengths and weaknesses to create a custom study plan just for you.
      </p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/diagnostic" style={{
          display: 'inline-block', background: gold, color: bg,
          fontWeight: 700, fontSize: '0.95rem', padding: '14px 32px',
          borderRadius: 100, textDecoration: 'none', fontFamily: body, transition,
        }}>
          Start Free Diagnostic
        </Link>
        <Link to="/pricing" style={{
          display: 'inline-block', background: 'transparent', color: gold,
          fontWeight: 600, fontSize: '0.95rem', padding: '14px 32px',
          borderRadius: 100, textDecoration: 'none', fontFamily: body,
          border: `1px solid ${goldBorder}`, transition,
        }}>
          View Pricing
        </Link>
      </div>
    </div>
  )
}
