import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const gold = '#F5C842'
const bg = '#07070F'
const white = '#FAFAF9'
const muted = '#9B9BAD'
const border = 'rgba(255,255,255,0.06)'
const transition = 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
const heading = "'Playfair Display', serif"
const body = "'DM Sans', sans-serif"

export default function BlogNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(7,7,15,0.92)' : 'rgba(7,7,15,0.8)',
      backdropFilter: 'blur(16px)',
      borderBottom: `1px solid ${scrolled ? border : 'transparent'}`,
      transition,
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 72,
      }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 0 }}>
          <span style={{ fontFamily: heading, fontWeight: 800, fontSize: '1.35rem', color: gold }}>Tutor</span>
          <span style={{ fontFamily: heading, fontWeight: 800, fontSize: '1.35rem', color: white }}>Pro.ai</span>
        </Link>

        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <Link to="/blog" style={{ color: gold, textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600, fontFamily: body, transition }}>Blog</Link>
          <Link to="/pricing" style={{ color: muted, textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, fontFamily: body, transition }}>Pricing</Link>
          <Link to="/diagnostic" style={{ color: muted, textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, fontFamily: body, transition }}>Free Diagnostic</Link>
          <Link to="/signup" style={{
            background: gold, color: bg, fontWeight: 700, fontSize: '0.9rem',
            padding: '10px 24px', borderRadius: 100, textDecoration: 'none',
            fontFamily: body, transition,
          }}>
            Sign Up Free
          </Link>
        </div>
      </div>
    </nav>
  )
}
