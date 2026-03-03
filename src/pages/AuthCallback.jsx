import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { supabase, pendingAuthCode } from '../lib/supabase'

export default function AuthCallback() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const navigated = useRef(false)
  const [status, setStatus] = useState('Signing you in...')

  const go = (path) => {
    if (!navigated.current) {
      navigated.current = true
      navigate(path, { replace: true })
    }
  }

  // React to store user changes (covers the happy-path where auto-exchange worked)
  useEffect(() => {
    if (user && !navigated.current) {
      go('/dashboard')
    }
  }, [user])

  // Main callback handler
  useEffect(() => {
    // Check for OAuth error params
    const params = new URLSearchParams(window.location.search)
    const errorParam = params.get('error')
    const errorDesc = params.get('error_description')
    if (errorParam) {
      setStatus(`Sign-in error: ${errorDesc || errorParam}`)
      setTimeout(() => go('/login?error=' + encodeURIComponent(errorDesc || errorParam)), 2500)
      return
    }

    const attemptAuth = async () => {
      // Step 1: Check if the auto-exchange already produced a session
      const { data: { session: existingSession } } = await supabase.auth.getSession()
      if (existingSession?.user) {
        go('/dashboard')
        return
      }

      // Step 2: If we captured a code before the client could clean the URL,
      // try exchanging it manually.
      if (pendingAuthCode) {
        setStatus('Exchanging authorization code...')
        const { data } = await supabase.auth.exchangeCodeForSession(pendingAuthCode)
        if (data?.session?.user) {
          go('/dashboard')
          return
        }
      }

      // Step 3: Poll getSession as a safety net.
      setStatus('Waiting for authentication...')
      let attempts = 0
      const maxAttempts = 12

      const pollInterval = setInterval(async () => {
        attempts++
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          clearInterval(pollInterval)
          go('/dashboard')
        } else if (attempts >= maxAttempts) {
          clearInterval(pollInterval)
          setStatus('Authentication timed out. Redirecting...')
          setTimeout(() => go('/login?error=timeout'), 1500)
        }
      }, 1500)
    }

    attemptAuth()

    // Also listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        go('/dashboard')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 40, height: 40, border: '3px solid var(--border)',
          borderTopColor: 'var(--gold)', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite', margin: '0 auto 16px',
        }} />
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--muted)' }}>
          {status}
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  )
}
