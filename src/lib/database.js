import { supabase } from './supabase'

/* ── Diagnostic Results ─────────────────────────────────────── */

export async function saveDiagnosticResult(result) {
  const { data, error } = await supabase
    .from('diagnostic_results')
    .insert(result)
    .select()
    .single()
  return { data, error }
}

export async function getDiagnosticResults(userId) {
  const { data, error } = await supabase
    .from('diagnostic_results')
    .select('*')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false })
  return { data, error }
}

/* ── Practice Sessions ──────────────────────────────────────── */

export async function savePracticeSession(session) {
  const { data, error } = await supabase
    .from('practice_sessions')
    .insert(session)
    .select()
    .single()
  return { data, error }
}

export async function getPracticeSessions(userId) {
  const { data, error } = await supabase
    .from('practice_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false })
  return { data, error }
}

export async function getFullTestSessions(userId) {
  const { data, error } = await supabase
    .from('practice_sessions')
    .select('*')
    .eq('user_id', userId)
    .eq('session_type', 'full_test')
    .order('completed_at', { ascending: false })
  return { data, error }
}

/* ── Tutor Conversations ────────────────────────────────────── */

export async function createConversation(userId, category) {
  const { data, error } = await supabase
    .from('tutor_conversations')
    .insert({
      user_id: userId,
      category,
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Session`,
      messages: [],
    })
    .select()
    .single()
  return { data, error }
}

export async function getConversations(userId) {
  const { data, error } = await supabase
    .from('tutor_conversations')
    .select('id, title, category, created_at, updated_at')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
  return { data, error }
}

export async function getConversation(conversationId) {
  const { data, error } = await supabase
    .from('tutor_conversations')
    .select('*')
    .eq('id', conversationId)
    .single()
  return { data, error }
}

export async function updateConversationMessages(conversationId, messages) {
  const { error } = await supabase
    .from('tutor_conversations')
    .update({ messages })
    .eq('id', conversationId)
  return { error }
}

/* ── User Progress ──────────────────────────────────────────── */

export async function getUserProgress(userId) {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .single()
  return { data, error }
}

export async function upsertUserProgress(userId, progress) {
  const { data, error } = await supabase
    .from('user_progress')
    .upsert({ user_id: userId, ...progress }, { onConflict: 'user_id' })
    .select()
    .single()
  return { data, error }
}

/* ── Profile ────────────────────────────────────────────────── */

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  return { data, error }
}

export async function updateProfile(userId, updates) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  return { data, error }
}

/* ── Admin Functions ───────────────────────────────────────── */

export async function getAdminData(action, params = {}) {
  const response = await supabase.functions.invoke('admin-data', {
    body: { action, params },
  })
  if (response.error) throw new Error(response.error.message)
  return response.data
}

export async function createDiscountCode(codeData) {
  const response = await supabase.functions.invoke('create-discount-code', {
    body: codeData,
  })
  if (response.error) throw new Error(response.error.message)
  return response.data
}

/* ── Promo Code Validation ─────────────────────────────────── */

export async function validatePromoCode(code) {
  const { data, error } = await supabase
    .from('discount_codes')
    .select('id, code, discount_percent, affiliate_name, is_active, max_uses, times_used, expires_at')
    .eq('code', code.toUpperCase())
    .eq('is_active', true)
    .single()

  if (error || !data) return { valid: false }

  const notExpired = !data.expires_at || new Date(data.expires_at) > new Date()
  const notMaxed = !data.max_uses || data.times_used < data.max_uses

  if (!notExpired || !notMaxed) return { valid: false }

  return { valid: true, discountPercent: data.discount_percent, code: data.code }
}
