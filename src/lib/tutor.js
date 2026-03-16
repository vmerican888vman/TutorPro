import { supabase } from './supabase'

/**
 * Send a message to the AI tutor and get a response.
 * If `image` is provided ({ data, mediaType }), it's sent to Claude Vision directly.
 */
export async function sendTutorMessage({ conversationId, message, category, questionContext, image }) {
  const response = await supabase.functions.invoke('tutor-chat', {
    body: { conversationId, message, category, questionContext, image },
  })

  if (response.error) throw new Error(response.error.message)
  return response.data
}
