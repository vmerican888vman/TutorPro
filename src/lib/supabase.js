import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Auth and database features will not work.')
}

// Capture the auth code from the URL BEFORE createClient() auto-processes
// and strips it. This lets AuthCallback retry the exchange if the automatic
// one fails silently.
const _params = new URLSearchParams(window.location.search)
export const pendingAuthCode = _params.get('code')
if (pendingAuthCode) {
  console.log('[Supabase] Auth code detected in URL before client init')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
)
