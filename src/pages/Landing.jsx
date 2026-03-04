import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

/* ─── Noise overlay SVG (data URI) ─── */
const noiseBg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`

/* ─── Shared style helpers ─── */
const gold = '#F5C842'
const bg = '#07070F'
const bgLight = '#0E0E1A'
const cardBg = '#0C0C18'
const white = '#FAFAF9'
const muted = '#9B9BAD'
const border = 'rgba(255,255,255,0.06)'
const goldDim = 'rgba(245,200,66,0.15)'
const goldBorder = 'rgba(245,200,66,0.25)'
const transition = 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
const heading = "'Playfair Display', serif"
const body = "'DM Sans', sans-serif"

function GoldText({ children }) {
  return <span style={{ color: gold, fontStyle: 'italic' }}>{children}</span>
}

function CheckIcon({ color = '#34D399' }) {
  return <span style={{ color, fontWeight: 700, marginRight: 8, fontSize: '1.1rem' }}>&#10003;</span>
}

function CrossIcon() {
  return <span style={{ color: '#F87171', fontWeight: 700, marginRight: 8, fontSize: '1.1rem' }}>&#10005;</span>
}

function DashIcon() {
  return <span style={{ color: muted, fontWeight: 700, marginRight: 8, fontSize: '1.1rem' }}>&#8212;</span>
}

/* ══════════════════════════════════════════════════════════════════
   NAV
   ══════════════════════════════════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(7,7,15,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? `1px solid ${border}` : '1px solid transparent',
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
          <a href="#pricing" style={{ color: muted, textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, fontFamily: body, transition }}>Pricing</a>
          <Link to="/diagnostic" style={{ color: muted, textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, fontFamily: body, transition }}>Free Diagnostic</Link>
          <Link to="/login" style={{ color: muted, textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, fontFamily: body, transition }}>Log In</Link>
          <Link to="/signup" style={{
            background: gold, color: bg, fontWeight: 700, fontSize: '0.9rem',
            padding: '10px 24px', borderRadius: 100, textDecoration: 'none',
            fontFamily: body, transition,
          }}>
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  )
}

/* ══════════════════════════════════════════════════════════════════
   HERO
   ══════════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '140px 24px 80px', position: 'relative', overflow: 'hidden',
      backgroundImage: noiseBg, backgroundSize: '256px',
    }}>
      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 800, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,200,66,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 800, textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <h1 style={{
          fontFamily: heading, fontWeight: 800,
          fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
          lineHeight: 1.1, marginBottom: 24, color: white,
        }}>
          The SAT & ACT tutor<br /><GoldText>that never sleeps</GoldText>
        </h1>

        <p style={{
          fontFamily: body, fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: muted, maxWidth: 600, margin: '0 auto 40px',
          lineHeight: 1.7,
        }}>
          AI-powered prep that adapts to exactly how you learn. Premium tutoring quality at a fraction of the price — designed to maximize your score improvement.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
          <Link to="/diagnostic" style={{
            background: gold, color: bg, fontWeight: 700, fontSize: '1.05rem',
            padding: '16px 36px', borderRadius: 100, textDecoration: 'none',
            fontFamily: body, transition,
          }}>
            Take the Free Diagnostic
          </Link>
          <a href="#how-it-works" style={{
            background: 'transparent', color: white, fontWeight: 600, fontSize: '1.05rem',
            padding: '16px 36px', borderRadius: 100, textDecoration: 'none',
            border: `1.5px solid ${border}`, fontFamily: body, transition,
          }}>
            See how it works
          </a>
        </div>

        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['No credit card', '7-day money-back guarantee', 'SAT + ACT'].map((badge) => (
            <span key={badge} style={{
              fontSize: '0.85rem', color: muted, fontFamily: body,
              padding: '6px 16px', borderRadius: 100,
              background: 'rgba(255,255,255,0.03)', border: `1px solid ${border}`,
            }}>
              {badge}
            </span>
          ))}
        </div>

        {/* Floating score card */}
        <div style={{
          marginTop: 56, display: 'inline-block',
          background: cardBg, border: `1.5px solid ${goldBorder}`,
          borderRadius: 14, padding: '24px 40px', textAlign: 'center',
        }}>
          <div style={{ fontSize: '0.8rem', color: muted, fontFamily: body, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>
            Avg. Score Improvement
          </div>
          <div style={{ fontFamily: heading, fontWeight: 800, fontSize: '3.5rem', color: gold, lineHeight: 1 }}>
            +180
          </div>
          <div style={{ fontSize: '0.9rem', color: muted, fontFamily: body, marginTop: 4 }}>
            points &middot; SAT composite
          </div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(155,155,173,0.6)', fontFamily: body, marginTop: 8 }}>
            Based on student averages
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════
   TICKER
   ══════════════════════════════════════════════════════════════════ */
const tickerItems = [
  'SAT prep', 'ACT prep', 'Free diagnostic', 'Personalized plans',
  '24/7 AI tutoring', '$39/month', '7-day guarantee', 'Score improvement',
  'Practice tests', 'Real-time feedback',
]

function Ticker() {
  return (
    <div style={{
      overflow: 'hidden', borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`,
      padding: '14px 0', background: bgLight,
    }}>
      <div style={{
        display: 'flex', gap: 48, whiteSpace: 'nowrap',
        animation: 'ticker 30s linear infinite',
        width: 'max-content',
      }}>
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
          <span key={i} style={{
            fontSize: '0.85rem', fontFamily: body, fontWeight: 500,
            color: i % 2 === 0 ? gold : muted, textTransform: 'uppercase', letterSpacing: 1.5,
          }}>
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   STATS BAR
   ══════════════════════════════════════════════════════════════════ */
const stats = [
  { value: '2,847', label: 'Students helped' },
  { value: '+180', label: 'Avg. point improvement' },
  { value: '$39', label: 'Per month' },
  { value: '94%', label: 'Would recommend' },
]

function Stats() {
  return (
    <section style={{ padding: '56px 24px', background: bg, backgroundImage: noiseBg, backgroundSize: '256px' }}>
      <div style={{
        maxWidth: 1000, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
        textAlign: 'center',
      }} className="grid-4">
        {stats.map((s) => (
          <div key={s.label}>
            <div style={{ fontFamily: heading, fontWeight: 800, fontSize: '2rem', color: gold }}>{s.value}</div>
            <div style={{ fontFamily: body, fontSize: '0.9rem', color: muted, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════
   HOW IT WORKS
   ══════════════════════════════════════════════════════════════════ */
const steps = [
  {
    num: '01',
    title: 'Free Diagnostic',
    desc: 'Take a quick adaptive assessment — no credit card, no commitment. We identify exactly where you stand and where the biggest gains are hiding.',
  },
  {
    num: '02',
    title: 'Personalized Plan',
    desc: 'Our AI builds a study roadmap tailored to your score goals, timeline, and learning style. Every session targets your specific weak points.',
  },
  {
    num: '03',
    title: 'AI Tutoring Sessions',
    desc: 'Practice with an AI tutor that explains concepts your way, adapts difficulty in real-time, and keeps you accountable 24/7.',
  },
]

function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: '100px 24px', background: bgLight, backgroundImage: noiseBg, backgroundSize: '256px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: heading, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          textAlign: 'center', marginBottom: 64, color: white,
        }}>
          Three steps to a <GoldText>higher score</GoldText>
        </h2>

        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {steps.map((step) => (
            <div key={step.num} style={{
              background: cardBg, border: `1.5px solid ${border}`, borderRadius: 14,
              padding: 32, transition,
            }}>
              <div style={{
                fontFamily: body, fontWeight: 700, fontSize: '0.8rem',
                color: gold, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16,
              }}>
                Step {step.num}
              </div>
              <h3 style={{ fontFamily: heading, fontWeight: 700, fontSize: '1.4rem', color: white, marginBottom: 12 }}>
                {step.title}
              </h3>
              <p style={{ fontFamily: body, fontSize: '0.95rem', color: muted, lineHeight: 1.7 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════
   COMPARISON TABLE
   ══════════════════════════════════════════════════════════════════ */
const comparisons = [
  {
    name: 'Private Tutor',
    price: '$300–500/hour',
    features: [
      { icon: 'cross', text: 'Scheduling hassles' },
      { icon: 'cross', text: 'Inconsistent quality' },
      { icon: 'dash', text: 'Limited availability' },
      { icon: 'dash', text: 'Geography dependent' },
    ],
  },
  {
    name: 'Kaplan / Princeton Review',
    price: '$450–999/course',
    features: [
      { icon: 'cross', text: 'One-size-fits-all' },
      { icon: 'cross', text: 'Rigid schedules' },
      { icon: 'dash', text: 'Outdated materials' },
      { icon: 'dash', text: 'No 1-on-1 attention' },
    ],
  },
  {
    name: 'TutorPro.ai',
    price: '$39/mo',
    best: true,
    features: [
      { icon: 'check', text: 'AI-personalized plans' },
      { icon: 'check', text: '24/7 availability' },
      { icon: 'check', text: 'Adaptive difficulty' },
      { icon: 'check', text: 'Save 20% with yearly plan' },
    ],
  },
]

function Comparison() {
  return (
    <section style={{ padding: '100px 24px', background: bg, backgroundImage: noiseBg, backgroundSize: '256px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: heading, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          textAlign: 'center', marginBottom: 64, color: white,
        }}>
          Premium prep, <GoldText>honest price</GoldText>
        </h2>

        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {comparisons.map((item) => (
            <div key={item.name} style={{
              background: cardBg, borderRadius: 14, padding: 32,
              border: item.best ? `1.5px solid ${goldBorder}` : `1.5px solid ${border}`,
              position: 'relative',
            }}>
              {item.best && (
                <div style={{
                  position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                  background: gold, color: bg, fontSize: '0.75rem', fontWeight: 700,
                  fontFamily: body, padding: '4px 16px', borderRadius: 100,
                  textTransform: 'uppercase', letterSpacing: 1,
                }}>
                  Best value
                </div>
              )}
              <h3 style={{ fontFamily: heading, fontSize: '1.2rem', color: white, marginBottom: 4 }}>{item.name}</h3>
              <div style={{ fontFamily: body, fontSize: '1.5rem', fontWeight: 700, color: item.best ? gold : white, marginBottom: 24 }}>
                {item.price}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {item.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', fontFamily: body, fontSize: '0.9rem', color: muted }}>
                    {f.icon === 'check' && <CheckIcon color={gold} />}
                    {f.icon === 'cross' && <CrossIcon />}
                    {f.icon === 'dash' && <DashIcon />}
                    {f.text}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════
   TESTIMONIALS
   ══════════════════════════════════════════════════════════════════ */
const testimonials = [
  {
    name: 'Jordan M.',
    school: 'Westview High, CA',
    gain: '+240 pts',
    quote: 'I went from feeling lost on every practice test to actually enjoying the process. The AI broke down problems in a way my school tutors never could.',
  },
  {
    name: 'Priya S.',
    school: 'Thomas Jefferson HS, VA',
    gain: '+190 pts',
    quote: "I tried Khan Academy but it felt too generic. TutorPro.ai figured out my weak spots in math and drilled exactly what I needed. My parents couldn't believe my score.",
  },
  {
    name: 'Marcus T.',
    school: 'Lincoln Park Academy, FL',
    gain: '+210 pts',
    quote: 'As a student-athlete, I needed something flexible. Studying at midnight after practice? No problem. The AI was always ready and never judged my schedule.',
  },
]

function Testimonials() {
  return (
    <section style={{ padding: '100px 24px', background: bgLight, backgroundImage: noiseBg, backgroundSize: '256px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: heading, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          textAlign: 'center', marginBottom: 64, color: white,
        }}>
          Real students, <GoldText>real results</GoldText>
        </h2>

        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{
              background: cardBg, border: `1.5px solid ${border}`, borderRadius: 14,
              padding: 32, display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <div style={{ fontFamily: body, fontWeight: 600, color: white, fontSize: '1rem' }}>{t.name}</div>
                  <div style={{ fontFamily: body, fontSize: '0.8rem', color: muted }}>{t.school}</div>
                </div>
                <div style={{
                  background: goldDim, color: gold, fontWeight: 700,
                  fontSize: '0.85rem', fontFamily: body,
                  padding: '4px 12px', borderRadius: 100,
                }}>
                  {t.gain}
                </div>
              </div>
              <p style={{ fontFamily: body, fontSize: '0.95rem', color: muted, lineHeight: 1.7, flex: 1 }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ marginTop: 16, color: gold, fontSize: '0.95rem', letterSpacing: 2 }}>
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════
   AI TUTOR DEMO
   ══════════════════════════════════════════════════════════════════ */
const demoConversation = [
  { role: 'user', text: "I keep getting confused on questions about semicolons vs commas. Can you help?" },
  { role: 'ai', text: "Great question! Here's the key rule:\n\n**Semicolons** join two **complete sentences** that are closely related.\n**Commas** cannot join two complete sentences alone — that creates a comma splice." },
  { role: 'ai', text: "Let's try one together:\n\n*\"The experiment failed, the researchers started over.\"*\n\nWhat's wrong with this sentence?" },
  { role: 'user', text: "That's a comma splice right? It should be a semicolon because both parts are complete sentences?" },
  { role: 'ai', text: "Exactly right! ✓\n\nBoth \"The experiment failed\" and \"the researchers started over\" are independent clauses. You'd fix it as:\n\n*\"The experiment failed**;** the researchers started over.\"*\n\nYou're getting the hang of this! Want to try a harder one?" },
]

function DemoBubble({ role, text, visible }) {
  const isUser = role === 'user'
  return (
    <div style={{
      display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: 14, opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(12px)',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
    }}>
      {!isUser && (
        <div style={{
          width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
          background: goldDim, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          marginRight: 10, marginTop: 2,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
      )}
      <div style={{
        maxWidth: '78%', padding: '11px 15px',
        borderRadius: isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
        background: isUser ? goldDim : cardBg,
        border: isUser ? `1px solid ${goldBorder}` : `1px solid ${border}`,
        fontFamily: body, fontSize: '0.85rem', lineHeight: 1.65,
        color: isUser ? white : 'rgba(250,250,249,0.88)',
        whiteSpace: 'pre-line',
      }}>
        {text.split(/(\*\*.*?\*\*|\*.*?\*|✓)/).map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**'))
            return <strong key={i} style={{ color: white, fontWeight: 700 }}>{part.slice(2, -2)}</strong>
          if (part.startsWith('*') && part.endsWith('*'))
            return <em key={i} style={{ color: 'rgba(250,250,249,0.7)' }}>{part.slice(1, -1)}</em>
          if (part === '✓')
            return <span key={i} style={{ color: '#34D399', fontWeight: 700 }}>✓</span>
          return <span key={i}>{part}</span>
        })}
      </div>
    </div>
  )
}

function TypingDots({ visible }) {
  if (!visible) return null
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14,
      opacity: visible ? 1 : 0, transition: 'opacity 0.3s ease',
    }}>
      <div style={{
        width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
        background: goldDim, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <div style={{
        padding: '11px 15px', borderRadius: '14px 14px 14px 4px',
        background: cardBg, border: `1px solid ${border}`,
        display: 'flex', gap: 4,
      }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: 6, height: 6, borderRadius: '50%', background: muted,
            animation: `demoBounce 1.2s ease-in-out ${i * 0.15}s infinite`,
          }} />
        ))}
      </div>
    </div>
  )
}

function TutorDemo() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [showTyping, setShowTyping] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const sectionRef = useRef(null)

  // Start animation when section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasStarted) setHasStarted(true) },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [hasStarted])

  // Animate messages one by one
  useEffect(() => {
    if (!hasStarted) return
    if (visibleCount >= demoConversation.length) return

    const nextMsg = demoConversation[visibleCount]
    const isAI = nextMsg.role === 'ai'
    const typingDelay = isAI ? 1200 : 600
    const showDelay = isAI ? 800 : 400

    const t1 = setTimeout(() => setShowTyping(isAI), typingDelay > 200 ? 200 : 0)
    const t2 = setTimeout(() => {
      setShowTyping(false)
      setVisibleCount((c) => c + 1)
    }, typingDelay + showDelay)

    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [hasStarted, visibleCount])

  return (
    <section ref={sectionRef} style={{ padding: '100px 24px', background: bgLight, backgroundImage: noiseBg, backgroundSize: '256px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: heading, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          textAlign: 'center', marginBottom: 12, color: white,
        }}>
          Meet your <GoldText>AI tutor</GoldText>
        </h2>
        <p style={{
          fontFamily: body, fontSize: '1rem', color: muted,
          textAlign: 'center', maxWidth: 520, margin: '0 auto 48px',
        }}>
          See how our AI tutor explains concepts, gives instant feedback, and adapts to your level — available 24/7.
        </p>

        {/* Chat mockup */}
        <div style={{
          maxWidth: 580, margin: '0 auto',
          background: bg, border: `1.5px solid ${border}`, borderRadius: 18,
          overflow: 'hidden',
        }}>
          {/* Chat header */}
          <div style={{
            padding: '14px 20px',
            borderBottom: `1px solid ${border}`,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%', background: '#34D399',
            }} />
            <span style={{ fontFamily: body, fontWeight: 600, fontSize: '0.9rem', color: white }}>
              TutorPro AI
            </span>
            <span style={{ fontFamily: body, fontSize: '0.75rem', color: muted, marginLeft: 'auto' }}>
              Writing &middot; Grammar
            </span>
          </div>

          {/* Messages */}
          <div style={{ padding: '20px 18px', minHeight: 340 }}>
            {demoConversation.map((msg, i) => (
              <DemoBubble key={i} role={msg.role} text={msg.text} visible={i < visibleCount} />
            ))}
            <TypingDots visible={showTyping} />
          </div>

          {/* Fake input bar */}
          <div style={{
            padding: '12px 18px', borderTop: `1px solid ${border}`,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{
              flex: 1, padding: '10px 14px', borderRadius: 100,
              background: cardBg, border: `1px solid ${border}`,
              fontFamily: body, fontSize: '0.85rem', color: 'rgba(155,155,173,0.5)',
            }}>
              Ask anything about SAT or ACT...
            </div>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: goldDim, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom badges */}
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', marginTop: 32 }}>
          {['Math help', 'Reading strategies', 'Writing & grammar', 'Step-by-step solutions'].map((badge) => (
            <span key={badge} style={{
              fontSize: '0.8rem', color: muted, fontFamily: body, fontWeight: 500,
              padding: '6px 14px', borderRadius: 100,
              background: 'rgba(255,255,255,0.03)', border: `1px solid ${border}`,
            }}>
              {badge}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes demoBounce {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-4px); }
        }
      `}</style>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════
   PRICING
   ══════════════════════════════════════════════════════════════════ */
function Pricing() {
  const MONTHLY = 39
  const YEARLY_TOTAL = 374
  const YEARLY_MO = Math.round(YEARLY_TOTAL / 12)
  const YEARLY_SAVINGS = MONTHLY * 12 - YEARLY_TOTAL

  const proFeatures = [
    'Unlimited AI tutoring sessions',
    'Full-length practice tests',
    'Personalized study plans',
    'Performance analytics',
    'SAT + ACT coverage',
    '24/7 availability',
    '7-day money-back guarantee',
  ]

  return (
    <section id="pricing" style={{ padding: '100px 24px', background: bg, backgroundImage: noiseBg, backgroundSize: '256px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: heading, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          textAlign: 'center', marginBottom: 12, color: white,
        }}>
          Try free for 7 days, <GoldText>then subscribe</GoldText>
        </h2>
        <p style={{
          fontFamily: body, fontSize: '1rem', color: muted,
          textAlign: 'center', maxWidth: 500, margin: '0 auto 48px',
        }}>
          Full access for 7 days. No credit card required. Cancel anytime.
        </p>

        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 1020, margin: '0 auto' }}>
          {/* ── Free Trial ── */}
          <div style={{
            background: cardBg, border: '1.5px solid rgba(16,185,129,0.35)', borderRadius: 14, padding: '36px 28px',
            display: 'flex', flexDirection: 'column', position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
              background: '#10B981', color: bg, fontSize: '0.75rem', fontWeight: 700,
              fontFamily: body, padding: '4px 16px', borderRadius: 100,
              textTransform: 'uppercase', letterSpacing: 1, whiteSpace: 'nowrap',
            }}>
              No credit card
            </div>
            <div style={{ fontFamily: body, fontWeight: 600, fontSize: '1rem', color: '#10B981', marginBottom: 4 }}>Free Trial</div>
            <div style={{ fontFamily: heading, fontWeight: 800, fontSize: '2.5rem', color: white, marginBottom: 4 }}>7 Days</div>
            <div style={{ fontFamily: body, fontSize: '0.9rem', color: muted, marginBottom: 28 }}>Full access — everything included</div>
            <div style={{ flex: 1 }}>
              {['AI tutoring sessions', 'Full practice tests', 'Progress tracking', 'Step-by-step explanations'].map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', fontFamily: body, fontSize: '0.9rem', color: muted, marginBottom: 12 }}>
                  <CheckIcon color="#10B981" />{f}
                </div>
              ))}
            </div>
            <Link to="/signup" style={{
              display: 'block', textAlign: 'center', marginTop: 28,
              padding: '14px 24px', borderRadius: 100, fontWeight: 600, fontSize: '0.95rem',
              fontFamily: body, textDecoration: 'none', transition,
              background: '#10B981', color: white,
            }}>
              Start Free Trial
            </Link>
          </div>

          {/* ── Pro Monthly ── */}
          <div style={{
            background: cardBg, border: `1.5px solid ${goldBorder}`, borderRadius: 14, padding: '36px 28px',
            position: 'relative', display: 'flex', flexDirection: 'column',
          }}>
            <div style={{
              position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
              background: gold, color: bg, fontSize: '0.75rem', fontWeight: 700,
              fontFamily: body, padding: '4px 16px', borderRadius: 100,
              textTransform: 'uppercase', letterSpacing: 1, whiteSpace: 'nowrap',
            }}>
              Most popular
            </div>
            <div style={{ fontFamily: body, fontWeight: 600, fontSize: '1rem', color: gold, marginBottom: 4 }}>Pro Monthly</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
              <span style={{ fontFamily: heading, fontWeight: 800, fontSize: '2.5rem', color: white }}>${MONTHLY}</span>
              <span style={{ fontFamily: body, fontSize: '1rem', color: muted }}>/month</span>
            </div>
            <div style={{ fontFamily: body, fontSize: '0.9rem', color: muted, marginBottom: 28 }}>
              Everything you need to improve
            </div>
            <div style={{ flex: 1 }}>
              {[...proFeatures, 'Cancel anytime'].map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', fontFamily: body, fontSize: '0.9rem', color: muted, marginBottom: 12 }}>
                  <CheckIcon color={gold} />{f}
                </div>
              ))}
            </div>
            <Link to="/pricing" style={{
              display: 'block', textAlign: 'center', marginTop: 28,
              padding: '14px 24px', borderRadius: 100, fontWeight: 700, fontSize: '0.95rem',
              fontFamily: body, textDecoration: 'none', transition,
              background: gold, color: bg,
            }}>
              Start Pro — ${MONTHLY}/mo
            </Link>
          </div>

          {/* ── Pro Yearly ── */}
          <div style={{
            background: cardBg, border: '1.5px solid rgba(52,211,153,0.35)', borderRadius: 14, padding: '36px 28px',
            position: 'relative', display: 'flex', flexDirection: 'column',
          }}>
            <div style={{
              position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
              background: '#34D399', color: bg, fontSize: '0.75rem', fontWeight: 700,
              fontFamily: body, padding: '4px 16px', borderRadius: 100,
              textTransform: 'uppercase', letterSpacing: 1, whiteSpace: 'nowrap',
            }}>
              Save 20%
            </div>
            <div style={{ fontFamily: body, fontWeight: 600, fontSize: '1rem', color: '#34D399', marginBottom: 4 }}>Pro Yearly</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
              <span style={{ fontFamily: body, fontSize: '1.2rem', color: muted, textDecoration: 'line-through', marginRight: 4 }}>${MONTHLY * 12}</span>
              <span style={{ fontFamily: heading, fontWeight: 800, fontSize: '2.5rem', color: white }}>${YEARLY_TOTAL}</span>
              <span style={{ fontFamily: body, fontSize: '1rem', color: muted }}>/year</span>
            </div>
            <div style={{ fontFamily: body, fontSize: '0.9rem', color: '#34D399', marginBottom: 28, fontWeight: 600 }}>
              ${YEARLY_MO}/mo &middot; Save ${YEARLY_SAVINGS}/year
            </div>
            <div style={{ flex: 1 }}>
              {[...proFeatures, 'Paid in full — best value'].map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', fontFamily: body, fontSize: '0.9rem', color: muted, marginBottom: 12 }}>
                  <CheckIcon color="#34D399" />{f}
                </div>
              ))}
            </div>
            <Link to="/pricing" style={{
              display: 'block', textAlign: 'center', marginTop: 28,
              padding: '14px 24px', borderRadius: 100, fontWeight: 700, fontSize: '0.95rem',
              fontFamily: body, textDecoration: 'none', transition,
              background: '#34D399', color: bg,
            }}>
              Start Pro — ${YEARLY_TOTAL}/yr
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════
   FAQ
   ══════════════════════════════════════════════════════════════════ */
const faqData = [
  {
    q: 'How is TutorPro.ai different from Khan Academy?',
    a: "Khan Academy is a great free resource, but it's built for general education — not targeted test prep. TutorPro.ai uses AI to identify your specific weak areas, create a personalized study plan, and adapt in real-time to how you learn. Think of it as having a private tutor who knows the SAT and ACT inside-out, available 24/7 for a fraction of the price.",
  },
  {
    q: 'Do you guarantee a specific score improvement?',
    a: "We don't make specific point guarantees because every student's starting point and commitment level is different. What we can say is that our AI adapts to focus on where you'll see the biggest score improvement, and our student average speaks for itself. We're so confident you'll see progress that we offer a 7-day money-back guarantee.",
  },
  {
    q: 'Does TutorPro.ai cover both the SAT and ACT?',
    a: 'Yes! Your Pro subscription covers comprehensive prep for both exams. Our diagnostic will help you identify which test might be a better fit for your strengths, and you can switch between SAT and ACT prep anytime.',
  },
  {
    q: 'What are the billing options?',
    a: "We offer two plans: Monthly at $39/month which you can cancel anytime, and Yearly at $374/year (20% off) paid in full upfront. Both plans come with a 7-day money-back guarantee so you can try Pro risk-free.",
  },
  {
    q: 'Is the AI tutor available 24/7?',
    a: "Yes — that's one of the biggest advantages. Whether you're a night owl studying at midnight or an early bird prepping before school, your AI tutor is always ready. No scheduling, no waiting, no geographic limitations.",
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{
      borderBottom: `1px solid ${border}`,
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', background: 'transparent', border: 'none', cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '24px 0', fontFamily: body, fontSize: '1.05rem', fontWeight: 600,
          color: white, textAlign: 'left', transition,
        }}
      >
        {q}
        <span style={{
          fontSize: '1.5rem', color: gold, marginLeft: 16, flexShrink: 0,
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)', transition,
        }}>
          +
        </span>
      </button>
      <div style={{
        maxHeight: open ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease',
      }}>
        <p style={{
          fontFamily: body, fontSize: '0.95rem', color: muted,
          lineHeight: 1.7, paddingBottom: 24,
        }}>
          {a}
        </p>
      </div>
    </div>
  )
}

function FAQ() {
  return (
    <section style={{ padding: '100px 24px', background: bgLight, backgroundImage: noiseBg, backgroundSize: '256px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: heading, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          textAlign: 'center', marginBottom: 56, color: white,
        }}>
          Questions? <GoldText>Answers.</GoldText>
        </h2>
        {faqData.map((item) => (
          <FAQItem key={item.q} q={item.q} a={item.a} />
        ))}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════
   FINAL CTA
   ══════════════════════════════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section style={{
      padding: '100px 24px', background: bg, textAlign: 'center',
      backgroundImage: noiseBg, backgroundSize: '256px', position: 'relative',
    }}>
      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,200,66,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{
          fontFamily: heading, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          marginBottom: 16, color: white,
        }}>
          Your score improvement <GoldText>starts now</GoldText>
        </h2>
        <p style={{
          fontFamily: body, fontSize: '1.1rem', color: muted, marginBottom: 40, maxWidth: 480, margin: '0 auto 40px',
        }}>
          Take the free diagnostic. See where you stand. No credit card required.
        </p>
        <Link to="/diagnostic" style={{
          display: 'inline-block', background: gold, color: bg,
          fontWeight: 700, fontSize: '1.1rem', padding: '18px 44px',
          borderRadius: 100, textDecoration: 'none', fontFamily: body, transition,
        }}>
          Start Free Diagnostic &rarr;
        </Link>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{
      padding: '40px 24px', background: bgLight,
      borderTop: `1px solid ${border}`,
    }}>
      <div style={{
        maxWidth: 1000, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 16,
      }}>
        <div style={{ fontFamily: body, fontSize: '0.85rem', color: muted }}>
          &copy; 2026 TutorPro.ai. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          {[
            { label: 'Privacy Policy', to: '/privacy' },
            { label: 'Terms of Service', to: '/terms' },
            { label: 'Contact', to: '/contact' },
          ].map((link) => (
            <Link key={link.label} to={link.to} style={{
              fontFamily: body, fontSize: '0.85rem', color: muted,
              textDecoration: 'none', transition,
            }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}

/* ══════════════════════════════════════════════════════════════════
   LANDING PAGE
   ══════════════════════════════════════════════════════════════════ */
export default function Landing() {
  return (
    <>
      <Nav />
      <Hero />
      <Ticker />
      <Stats />
      <HowItWorks />
      <Comparison />
      <Testimonials />
      <TutorDemo />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  )
}
