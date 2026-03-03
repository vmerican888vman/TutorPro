import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import AuthLayout from '../components/auth/AuthLayout'
import GoogleButton from '../components/auth/GoogleButton'
import AppleButton from '../components/auth/AppleButton'
import Divider from '../components/auth/Divider'
import FormInput from '../components/auth/FormInput'
import SubmitButton from '../components/auth/SubmitButton'

export default function Login() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user, signIn, signInWithGoogle, signInWithApple } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const message = searchParams.get('reset') === 'true'
    ? 'Password updated successfully. Please log in.'
    : searchParams.get('confirmed') === 'true'
      ? 'Email confirmed! Please log in.'
      : null

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true })
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: signInError } = await signIn({ email, password })
    if (signInError) {
      setError(signInError.message)
      setLoading(false)
    }
    // Auth state listener in the store handles redirect
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

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to continue your SAT & ACT prep."
    >
      {message && (
        <div style={{
          background: 'rgba(52,211,153,0.08)', border: '1.5px solid rgba(52,211,153,0.25)',
          borderRadius: 'var(--radius-input)', padding: '12px 16px', marginBottom: 20,
          fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#34D399',
        }}>
          {message}
        </div>
      )}

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
          placeholder="Enter your password"
          autoComplete="current-password"
        />

        <div style={{ textAlign: 'right', marginBottom: 16 }}>
          <Link to="/forgot-password" style={{
            fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--gold)',
            textDecoration: 'none',
          }}>
            Forgot password?
          </Link>
        </div>

        <SubmitButton loading={loading}>Log In</SubmitButton>
      </form>

      <p style={{
        fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--muted)',
        textAlign: 'center', marginTop: 24,
      }}>
        Don&rsquo;t have an account?{' '}
        <Link to="/signup" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }}>
          Sign up
        </Link>
      </p>
    </AuthLayout>
  )
}
