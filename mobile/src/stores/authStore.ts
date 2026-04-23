import { create } from 'zustand'
import { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import {
  signUp as authSignUp,
  signIn as authSignIn,
  signInWithGoogle as authGoogle,
  signInWithApple as authApple,
  signOut as authSignOut,
  linkDiagnosticResults,
} from '../lib/auth'

interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  subscription_status: 'free' | 'trial' | 'pro'
  created_at: string
  updated_at: string
}

interface AuthState {
  user: User | null
  profile: Profile | null
  loading: boolean
  initialize: () => void
  fetchProfile: (userId: string, retries?: number) => Promise<void>
  signUp: (params: { email: string; password: string; fullName: string }) => Promise<any>
  signIn: (params: { email: string; password: string }) => Promise<any>
  signInWithGoogle: () => Promise<any>
  signInWithApple: () => Promise<any>
  signOut: () => Promise<void>
  isPro: () => boolean
  isTrialActive: () => boolean
  trialDaysRemaining: () => number
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  loading: true,

  initialize: () => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        set({ user: session.user, loading: false })
        setTimeout(() => get().fetchProfile(session.user.id), 0)
      } else {
        set({ user: null, profile: null, loading: false })
      }
    })
    // subscription stored but not unsubscribed — this is a global store
  },

  fetchProfile: async (userId: string, retries = 3) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      if (data) {
        set({ profile: data })
      } else if (error && retries > 0) {
        await new Promise((r) => setTimeout(r, 500))
        return get().fetchProfile(userId, retries - 1)
      } else {
        const { user } = get()
        if (user) {
          set({
            profile: {
              id: user.id,
              email: user.email ?? '',
              full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
              avatar_url: null,
              subscription_status: 'free',
              created_at: user.created_at,
              updated_at: user.created_at,
            },
          })
        }
      }
    } catch {
      if (retries > 0) {
        await new Promise((r) => setTimeout(r, 500))
        return get().fetchProfile(userId, retries - 1)
      }
    }
  },

  signUp: async ({ email, password, fullName }) => {
    const { data, error } = await authSignUp({ email, password, fullName })
    if (error) return { error }
    if (data?.user) {
      await linkDiagnosticResults(email, data.user.id)
    }
    return { data, error: null }
  },

  signIn: async ({ email, password }) => {
    const { data, error } = await authSignIn({ email, password })
    return { data, error }
  },

  signInWithGoogle: async () => {
    const { data, error } = await authGoogle()
    return { data, error }
  },

  signInWithApple: async () => {
    const { data, error } = await authApple()
    return { data, error }
  },

  signOut: async () => {
    await authSignOut()
    set({ user: null, profile: null })
  },

  isPro: () => {
    const { profile } = get()
    if (profile?.subscription_status === 'pro') return true
    if (profile?.created_at) {
      const createdAt = new Date(profile.created_at).getTime()
      if (isNaN(createdAt)) return false
      const daysSince = Math.floor((Date.now() - createdAt) / 86400000)
      return daysSince < 7
    }
    return false
  },

  isTrialActive: () => {
    const { profile } = get()
    if (profile?.subscription_status === 'pro') return false
    if (profile?.created_at) {
      const createdAt = new Date(profile.created_at).getTime()
      if (isNaN(createdAt)) return false
      const daysSince = Math.floor((Date.now() - createdAt) / 86400000)
      return daysSince < 7
    }
    return true
  },

  trialDaysRemaining: () => {
    const { profile } = get()
    if (profile?.created_at) {
      const createdAt = new Date(profile.created_at).getTime()
      if (isNaN(createdAt)) return 0
      const daysSince = Math.floor((Date.now() - createdAt) / 86400000)
      return Math.max(0, 7 - daysSince)
    }
    return 7
  },
}))
