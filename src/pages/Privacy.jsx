import { Link } from 'react-router-dom'

const heading = "'Playfair Display', serif"
const body = "'DM Sans', sans-serif"
const gold = '#F5C842'
const white = '#FAFAF9'
const muted = '#9B9BAD'
const border = 'rgba(255,255,255,0.06)'

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontFamily: body, fontWeight: 700, fontSize: '1.2rem', color: white, marginBottom: 12 }}>
        {title}
      </h2>
      <div style={{ fontFamily: body, fontSize: '0.95rem', color: muted, lineHeight: 1.8 }}>
        {children}
      </div>
    </div>
  )
}

export default function Privacy() {
  return (
    <div style={{ minHeight: '100vh', padding: '80px 24px 80px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
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
          Privacy Policy
        </h1>
        <p style={{ fontFamily: body, fontSize: '0.9rem', color: muted, marginBottom: 40 }}>
          Last updated: March 3, 2026
        </p>

        <Section title="1. Information We Collect">
          <p>When you use TutorPro.ai, we collect information you provide directly, including your name, email address, and account credentials when you sign up. We also collect usage data such as diagnostic results, practice session scores, and study progress to personalize your learning experience.</p>
        </Section>

        <Section title="2. How We Use Your Information">
          <p>We use your information to provide and improve our AI tutoring services, personalize your study plans, track your progress, process payments, and communicate with you about your account. We do not sell your personal information to third parties.</p>
        </Section>

        <Section title="3. Data Storage & Security">
          <p>Your data is stored securely using industry-standard encryption. We use Supabase for data storage and Stripe for payment processing — both are SOC 2 compliant. We never store your full credit card information on our servers.</p>
        </Section>

        <Section title="4. Third-Party Services">
          <p>We use the following third-party services to operate TutorPro.ai:</p>
          <ul style={{ paddingLeft: 20, marginTop: 8 }}>
            <li style={{ marginBottom: 6 }}>Stripe — payment processing</li>
            <li style={{ marginBottom: 6 }}>Supabase — authentication and data storage</li>
            <li style={{ marginBottom: 6 }}>Anthropic (Claude AI) — AI tutoring engine</li>
            <li style={{ marginBottom: 6 }}>Cloudflare — hosting and content delivery</li>
          </ul>
        </Section>

        <Section title="5. Your Rights">
          <p>You can access, update, or delete your personal data at any time through your account settings. You may also request a complete export of your data or ask us to delete your account entirely by contacting us at support@tutorpro.ai.</p>
        </Section>

        <Section title="6. Cookies">
          <p>We use essential cookies to keep you logged in and remember your preferences. We do not use third-party advertising or tracking cookies.</p>
        </Section>

        <Section title="7. Children's Privacy">
          <p>TutorPro.ai is designed for high school students preparing for standardized tests. Users under 13 must have parental consent to use our service. We comply with COPPA requirements for users under 13.</p>
        </Section>

        <Section title="8. Changes to This Policy">
          <p>We may update this privacy policy from time to time. We will notify you of any material changes by email or through a notice on our website.</p>
        </Section>

        <Section title="9. Contact Us">
          <p>If you have questions about this privacy policy, contact us at <a href="mailto:support@tutorpro.ai" style={{ color: gold, textDecoration: 'none' }}>support@tutorpro.ai</a>.</p>
        </Section>

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
