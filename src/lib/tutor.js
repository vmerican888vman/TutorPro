import { supabase } from './supabase'

/**
 * Send a message to the AI tutor and get a response.
 */
export async function sendTutorMessage({ conversationId, message, category, questionContext }) {
  const response = await supabase.functions.invoke('tutor-chat', {
    body: { conversationId, message, category, questionContext },
  })

  if (response.error) throw new Error(response.error.message)
  return response.data
}
