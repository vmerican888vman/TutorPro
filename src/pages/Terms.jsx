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

export default function Terms() {
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
          Terms of Service
        </h1>
        <p style={{ fontFamily: body, fontSize: '0.9rem', color: muted, marginBottom: 40 }}>
          Last updated: March 3, 2026
        </p>

        <Section title="1. Acceptance of Terms">
          <p>By accessing or using TutorPro.ai, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.</p>
        </Section>

        <Section title="2. Description of Service">
          <p>TutorPro.ai provides AI-powered test preparation services for standardized exams including the SAT and ACT. Our service includes diagnostic assessments, personalized study plans, practice questions, full-length practice tests, and AI tutoring sessions.</p>
        </Section>

        <Section title="3. Accounts">
          <p>You must create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information when creating your account.</p>
        </Section>

        <Section title="4. Subscription & Billing">
          <p><strong style={{ color: white }}>Free Tier:</strong> Includes a diagnostic assessment and limited practice questions at no cost.</p>
          <p style={{ marginTop: 8 }}><strong style={{ color: white }}>Pro Monthly ($39/month):</strong> Billed monthly. You may cancel anytime. Cancellation takes effect at the end of the current billing period.</p>
          <p style={{ marginTop: 8 }}><strong style={{ color: white }}>Pro Yearly ($374/year):</strong> Billed as a one-time annual payment, representing a 20% discount. This plan is non-refundable after the 7-day money-back guarantee period.</p>
          <p style={{ marginTop: 8 }}><strong style={{ color: white }}>7-Day Money-Back Guarantee:</strong> Both Pro plans include a 7-day money-back guarantee. If you are not satisfied within 7 days of your initial purchase, contact us for a full refund.</p>
        </Section>

        <Section title="5. Acceptable Use">
          <p>You agree not to:</p>
          <ul style={{ paddingLeft: 20, marginTop: 8 }}>
            <li style={{ marginBottom: 6 }}>Share your account credentials with others</li>
            <li style={{ marginBottom: 6 }}>Use the service for any unlawful purpose</li>
            <li style={{ marginBottom: 6 }}>Attempt to reverse-engineer, copy, or redistribute our content</li>
            <li style={{ marginBottom: 6 }}>Use automated tools to scrape or access the service</li>
            <li style={{ marginBottom: 6 }}>Misrepresent your identity or affiliation</li>
          </ul>
        </Section>

        <Section title="6. Intellectual Property">
          <p>All content on TutorPro.ai, including questions, explanations, study materials, and software, is owned by TutorPro.ai and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without written permission.</p>
        </Section>

        <Section title="7. Disclaimer of Warranties">
          <p>TutorPro.ai is provided "as is" without warranties of any kind. While we strive to provide accurate and helpful test preparation content, we do not guarantee specific test score improvements or outcomes. Individual results vary based on effort, study time, and other factors.</p>
        </Section>

        <Section title="8. Limitation of Liability">
          <p>To the maximum extent permitted by law, TutorPro.ai shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service.</p>
        </Section>

        <Section title="9. Termination">
          <p>We reserve the right to suspend or terminate your account if you violate these terms. You may delete your account at any time through your account settings.</p>
        </Section>

        <Section title="10. Changes to Terms">
          <p>We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the updated terms. We will notify you of material changes via email.</p>
        </Section>

        <Section title="11. Contact">
          <p>For questions about these terms, contact us at <a href="mailto:support@tutorpro.ai" style={{ color: gold, textDecoration: 'none' }}>support@tutorpro.ai</a>.</p>
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
