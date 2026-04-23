import { supabase } from './supabase'

interface DiagnosticResult {
  user_id: string
  total_score: number
  total_questions: number
  math_score: number
  math_questions: number
  reading_score: number
  reading_questions: number
  writing_score: number
  writing_questions: number
  time_spent_seconds: number
  answers: Array<{ question_id: string; selected: string; correct: string; category: string; time_spent_ms: number }>
}

interface PracticeSession {
  user_id: string
  session_type?: string
  category: string
  total_questions: number
  correct_answers?: number
  total_score?: number
  time_spent_seconds: number | null
  answers: unknown
  is_full_test?: boolean
}

interface UserProgress {
  overall_accuracy: number
  math_accuracy: number
  reading_accuracy: number
  writing_accuracy: number
  total_questions: number
  estimated_sat: number
}

// ── Diagnostic Results ──
export async function saveDiagnosticResult(result: DiagnosticResult) {
  const { data, error } = await supabase
    .from('diagnostic_results')
    .insert(result)
    .select()
    .single()
  return { data, error }
}

export async function getDiagnosticResults(userId: string) {
  const { data, error } = await supabase
    .from('diagnostic_results')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data, error }
}

// ── Practice Sessions ──
export async function savePracticeSession(session: PracticeSession) {
  const { data, error } = await supabase
    .from('practice_sessions')
    .insert(session)
    .select()
    .single()
  return { data, error }
}

export async function getPracticeSessions(userId: string) {
  const { data, error } = await supabase
    .from('practice_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function getFullTestSessions(userId: string) {
  const { data, error } = await supabase
    .from('practice_sessions')
    .select('*')
    .eq('user_id', userId)
    .eq('is_full_test', true)
    .order('created_at', { ascending: false })
  return { data, error }
}

// ── Tutor Conversations ──
export async function createConversation(userId: string, category: string) {
  const { data, error } = await supabase
    .from('tutor_conversations')
    .insert({ user_id: userId, category, messages: [] })
    .select()
    .single()
  return { data, error }
}

export async function getConversations(userId: string) {
  const { data, error } = await supabase
    .from('tutor_conversations')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
  return { data, error }
}

export async function getConversation(conversationId: string) {
  const { data, error } = await supabase
    .from('tutor_conversations')
    .select('*')
    .eq('id', conversationId)
    .single()
  return { data, error }
}

export async function updateConversationMessages(conversationId: string, messages: Array<{ role: string; content: string }>) {
  const { error } = await supabase
    .from('tutor_conversations')
    .update({ messages, updated_at: new Date().toISOString() })
    .eq('id', conversationId)
  return { error }
}

// ── User Progress ──
export async function getUserProgress(userId: string) {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .single()
  return { data, error }
}

export async function upsertUserProgress(userId: string, progress: UserProgress) {
  const { error } = await supabase
    .from('user_progress')
    .upsert({ user_id: userId, ...progress })
  return { error }
}

// ── Profile ──
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  return { data, error }
}

export async function updateProfile(userId: string, updates: Partial<{ full_name: string; avatar_url: string }>) {
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
  return { error }
}
