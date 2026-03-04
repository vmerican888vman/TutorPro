import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import { signUp, signIn, signInWithGoogle, signInWithApple, signOut as authSignOut, linkDiagnosticResults } from '../lib/auth'

export const useAuthStore = create((set, get) => ({
  user: null,
  profile: null,
  loading: true,

  initialize: () => {
    console.log('[AuthStore] Initializing, pathname:', window.location.pathname)

    supabase.auth.onAuthStateChange((event, session) => {
      console.log('[AuthStore] onAuthStateChange:', event, 'session:', !!session, 'email:', session?.user?.email || 'n/a')

      if (session?.user) {
        set({ user: session.user, loading: false })
        // Defer profile fetch out of the auth callback — the Supabase client's
        // internal auth lock can block concurrent queries inside onAuthStateChange.
        setTimeout(() => get().fetchProfile(session.user.id), 0)
      } else if (event === 'INITIAL_SESSION') {
        // If we're on the /auth/callback page, the PKCE code exchange may
        // still be in progress (or AuthCallback will handle it). Keep
        // loading=true so AuthGuard doesn't redirect prematurely.
        const isCallback = window.location.pathname === '/auth/callback'
        console.log('[AuthStore] INITIAL_SESSION no session. isCallback:', isCallback)
        if (isCallback) {
          return // keep loading=true; AuthCallback will drive the flow
        }
        set({ user: null, profile: null, loading: false })
      } else {
        set({ user: null, profile: null, loading: false })
      }
    })
  },

  fetchProfile: async (userId, retries = 2) => {
    console.log('[AuthStore] fetchProfile called for:', userId, 'retries:', retries)
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      if (data) {
        console.log('[AuthStore] Profile loaded:', data.email, 'status:', data.subscription_status)
        set({ profile: data })
      } else if (error) {
        console.warn('[AuthStore] fetchProfile error:', error.message, error.code)
        if (retries > 0) {
          await new Promise((r) => setTimeout(r, 500))
          return get().fetchProfile(userId, retries - 1)
        }
        // Final fallback: build a minimal profile from auth user metadata
        // so the UI isn't completely broken if the profiles table is unreachable
        const { user } = get()
        if (user) {
          console.warn('[AuthStore] Using fallback profile from user metadata')
          set({
            profile: {
              id: user.id,
              email: user.email,
              full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
              subscription_status: 'free',
            },
          })
        }
      }
    } catch (err) {
      console.error('[AuthStore] fetchProfile exception:', err)
      if (retries > 0) {
        await new Promise((r) => setTimeout(r, 500))
        return get().fetchProfile(userId, retries - 1)
      }
    }
  },

  signUp: async ({ email, password, fullName }) => {
    const { data, error } = await signUp({ email, password, fullName })
    if (error) return { error }

    // Link any anonymous diagnostic results to this new account
    if (data?.user) {
      await linkDiagnosticResults(email, data.user.id)
    }

    return { data, error: null }
  },

  signIn: async ({ email, password }) => {
    const { data, error } = await signIn({ email, password })
    return { data, error }
  },

  signInWithGoogle: async () => {
    const { data, error } = await signInWithGoogle()
    return { data, error }
  },

  signInWithApple: async () => {
    const { data, error } = await signInWithApple()
    return { data, error }
  },

  signOut: async () => {
    await authSignOut()
    set({ user: null, profile: null })
  },

  isPro: () => {
    const { profile } = get()
    if (profile?.subscription_status === 'pro') return true
    // 7-day free trial: check if account was created within the last 7 days
    if (profile?.created_at) {
      const createdAt = new Date(profile.created_at)
      const daysSince = Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24))
      return daysSince < 7
    }
    return false
  },

  isTrialActive: () => {
    const { profile } = get()
    if (profile?.subscription_status === 'pro') return false
    if (profile?.created_at) {
      const createdAt = new Date(profile.created_at)
      const daysSince = Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24))
      return daysSince < 7
    }
    return true
  },

  trialDaysRemaining: () => {
    const { profile } = get()
    if (profile?.created_at) {
      const createdAt = new Date(profile.created_at)
      const daysSince = Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24))
      return Math.max(0, 7 - daysSince)
    }
    return 7
  },

  isAdmin: () => {
    const { profile } = get()
    return profile?.role === 'admin'
  },
}))
