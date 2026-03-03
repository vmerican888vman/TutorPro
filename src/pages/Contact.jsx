import { Link } from 'react-router-dom'

const heading = "'Playfair Display', serif"
const body = "'DM Sans', sans-serif"
const gold = '#F5C842'
const bg = '#07070F'
const white = '#FAFAF9'
const muted = '#9B9BAD'
const border = 'rgba(255,255,255,0.06)'
const cardBg = '#0C0C18'
const goldDim = 'rgba(245,200,66,0.15)'

function ContactCard({ icon, title, description, action, href }) {
  return (
    <a href={href} style={{
      display: 'block', background: cardBg, border: `1.5px solid ${border}`,
      borderRadius: 14, padding: 32, textDecoration: 'none', transition: 'all 0.35s ease',
    }}>
      <div style={{ fontSize: '2rem', marginBottom: 16 }}>{icon}</div>
      <h3 style={{ fontFamily: body, fontWeight: 700, fontSize: '1.1rem', color: white, marginBottom: 8 }}>
        {title}
      </h3>
      <p style={{ fontFamily: body, fontSize: '0.9rem', color: muted, lineHeight: 1.7, marginBottom: 16 }}>
        {description}
      </p>
      <span style={{
        fontFamily: body, fontSize: '0.9rem', fontWeight: 600, color: gold,
      }}>
        {action} &rarr;
      </span>
    </a>
  )
}

export default function Contact() {
  return (
    <div style={{ minHeight: '100vh', padding: '80px 24px 80px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <Link to="/" style={{
          fontFamily: body, fontSize: '0.9rem', color: muted,
          textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32,
        }}>
          &larr; Back to home
        </Link>

        <h1 style={{
          fontFamily: heading, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 2.5rem)',
          color: white, marginBottom: 8,
        }}>
          Get in Touch
        </h1>
        <p style={{ fontFamily: body, fontSize: '1rem', color: muted, marginBottom: 48, maxWidth: 500 }}>
          Have a question, feedback, or need help with your account? We're here for you.
        </p>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24,
          marginBottom: 48,
        }}>
          <ContactCard
            icon="&#9993;"
            title="Email Support"
            description="For account issues, billing questions, or general inquiries. We typically respond within 24 hours."
            action="support@tutorpro.ai"
            href="mailto:support@tutorpro.ai"
          />
          <ContactCard
            icon="&#128172;"
            title="AI Tutor Help"
            description="Having trouble with the AI tutor? Log in and start a chat — our AI is available 24/7 to help with any study questions."
            action="Open AI Tutor"
            href="/dashboard/tutor"
          />
        </div>

        <div style={{
          background: cardBg, border: `1.5px solid ${border}`,
          borderRadius: 14, padding: 32,
        }}>
          <h2 style={{ fontFamily: body, fontWeight: 700, fontSize: '1.1rem', color: white, marginBottom: 16 }}>
            Frequently Asked
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { q: 'How do I cancel my subscription?', a: 'Go to Dashboard > Settings > Manage Subscription. Monthly plans can be cancelled anytime.' },
              { q: 'How do I request a refund?', a: 'Email support@tutorpro.ai within 7 days of purchase for a full refund under our money-back guarantee.' },
              { q: 'Can I switch from monthly to yearly?', a: 'Yes! Go to the Pricing page to switch plans. Your remaining monthly balance will be prorated.' },
              { q: 'I forgot my password', a: 'Use the "Forgot Password" link on the login page to reset your password via email.' },
            ].map((item) => (
              <div key={item.q} style={{ paddingBottom: 16, borderBottom: `1px solid ${border}` }}>
                <div style={{ fontFamily: body, fontWeight: 600, fontSize: '0.95rem', color: white, marginBottom: 4 }}>
                  {item.q}
                </div>
                <div style={{ fontFamily: body, fontSize: '0.9rem', color: muted, lineHeight: 1.7 }}>
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${border}`, paddingTop: 24, marginTop: 40 }}>
          <Link to="/" style={{
            fontFamily: body, fontSize: '0.9rem', color: muted, textDecoration: 'underline',
          }}>
            &larr; Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
