import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import AuthLayout from '../components/auth/AuthLayout'
import GoogleButton from '../components/auth/GoogleButton'
import AppleButton from '../components/auth/AppleButton'
import Divider from '../components/auth/Divider'
import FormInput from '../components/auth/FormInput'
import SubmitButton from '../components/auth/SubmitButton'

export default function Signup() {
  const navigate = useNavigate()
  const { user, signUp, signInWithGoogle, signInWithApple } = useAuthStore()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [confirmationSent, setConfirmationSent] = useState(false)

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true })
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)

    const { error: signUpError } = await signUp({ email, password, fullName })
    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    setConfirmationSent(true)
    setLoading(false)
  }

  const handleGoogle = async () => {
    setError(null)
    const { error: googleError } = await signInWithGoogle()
    if (googleError) {
      setError(googleError.message)
    }
  }

  const handleApple = async () => {
    setError(null)
    const { error: appleError } = await signInWithApple()
    if (appleError) {
      setError(appleError.message)
    }
  }

  if (confirmationSent) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle={`We sent a confirmation link to ${email}`}
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
            Click the link in your email to confirm your account.
            Then come back here to log in.
          </p>
          <Link to="/login" style={{
            display: 'inline-block', background: 'var(--gold)', color: 'var(--bg)',
            fontWeight: 700, fontSize: '0.95rem', padding: '12px 32px',
            borderRadius: 100, textDecoration: 'none', fontFamily: 'var(--font-body)',
          }}>
            Go to Login
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Start your free trial"
      subtitle="7 days of full access — no credit card required."
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <GoogleButton onClick={handleGoogle} disabled={loading} />
        <AppleButton onClick={handleApple} disabled={loading} />
      </div>
      <Divider />

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Full name"
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Jane Smith"
          autoComplete="name"
        />
        <FormInput
          label="Email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          autoComplete="email"
        />
        <FormInput
          label="Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
          autoComplete="new-password"
        />

        <SubmitButton loading={loading}>Create Account</SubmitButton>
      </form>

      <p style={{
        fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--muted)',
        textAlign: 'center', marginTop: 24,
      }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }}>
          Log in
        </Link>
      </p>
    </AuthLayout>
  )
}
