import { supabase } from './supabase'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import { makeRedirectUri } from 'expo-auth-session'

WebBrowser.maybeCompleteAuthSession()

interface SignUpParams {
  email: string
  password: string
  fullName: string
}

export async function signUp({ email, password, fullName }: SignUpParams) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  })
  return { data, error }
}

export async function signIn({ email, password }: { email: string; password: string }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  return { data, error }
}

export async function signInWithGoogle() {
  const redirectUrl = makeRedirectUri({ scheme: 'tutorpro' })
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: redirectUrl },
  })
  if (error) return { data, error }
  if (data?.url) {
    const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl)
    if (result.type === 'success' && result.url) {
      const url = new URL(result.url)
      const params = new URLSearchParams(url.hash.substring(1))
      const accessToken = params.get('access_token')
      const refreshToken = params.get('refresh_token')
      if (accessToken && refreshToken) {
        const session = await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
        return { data: session.data, error: session.error }
      }
    }
    return { data: null, error: new Error('OAuth flow was cancelled') }
  }
  return { data, error }
}

export async function signInWithApple() {
  const redirectUrl = makeRedirectUri({ scheme: 'tutorpro' })
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
    options: { redirectTo: redirectUrl },
  })
  if (error) return { data, error }
  if (data?.url) {
    const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl)
    if (result.type === 'success' && result.url) {
      const url = new URL(result.url)
      const params = new URLSearchParams(url.hash.substring(1))
      const accessToken = params.get('access_token')
      const refreshToken = params.get('refresh_token')
      if (accessToken && refreshToken) {
        const session = await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
        return { data: session.data, error: session.error }
      }
    }
    return { data: null, error: new Error('OAuth flow was cancelled') }
  }
  return { data, error }
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email)
  return { error }
}

export async function updatePassword(password: string) {
  const { error } = await supabase.auth.updateUser({ password })
  return { error }
}

export async function signOut() {
  await supabase.auth.signOut()
}

export async function linkDiagnosticResults(email: string, userId: string) {
  try {
    await supabase
      .from('diagnostic_results')
      .update({ user_id: userId })
      .eq('email', email)
      .is('user_id', null)
  } catch {}
}
