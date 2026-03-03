import { useState } from 'react'
import { Link } from 'react-router-dom'
import { resetPassword } from '../lib/auth'
import AuthLayout from '../components/auth/AuthLayout'
import FormInput from '../components/auth/FormInput'
import SubmitButton from '../components/auth/SubmitButton'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: resetError } = await resetPassword(email)
    if (resetError) {
      setError(resetError.message)
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  if (sent) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle={`We sent a password reset link to ${email}`}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'var(--gold-dim)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px', fontSize: '1.8rem',
          }}>
            &#9993;
          </div>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.95rem',
            color: 'var(--muted)', lineHeight: 1.7, marginBottom: 24,
          }}>
            Click the link in your email to reset your password.
          </p>
          <Link to="/login" style={{
            display: 'inline-block', background: 'var(--gold)', color: 'var(--bg)',
            fontWeight: 700, fontSize: '0.95rem', padding: '12px 32px',
            borderRadius: 100, textDecoration: 'none', fontFamily: 'var(--font-body)',
          }}>
            Back to Login
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email and we'll send you a reset link."
    >
      {error && (
        <div style={{
          background: 'rgba(248,113,113,0.08)', border: '1.5px solid rgba(248,113,113,0.25)',
          borderRadius: 'var(--radius-input)', padding: '12px 16px', marginBottom: 20,
          fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#F87171',
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          autoComplete="email"
        />
        <SubmitButton loading={loading}>Send Reset Link</SubmitButton>
      </form>

      <p style={{
        fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--muted)',
        textAlign: 'center', marginTop: 24,
      }}>
        Remember your password?{' '}
        <Link to="/login" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }}>
          Log in
        </Link>
      </p>
    </AuthLayout>
  )
}
