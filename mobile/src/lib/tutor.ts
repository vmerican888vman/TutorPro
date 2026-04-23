import { supabase } from './supabase'

interface TutorMessageParams {
  conversationId: string
  message: string
  category: string
  questionContext?: any
}

export async function sendTutorMessage({ conversationId, message, category, questionContext }: TutorMessageParams) {
  const { data, error } = await supabase.functions.invoke('tutor-chat', {
    body: { conversationId, message, category, questionContext },
  })

  if (error) throw error
  return data as { message: string }
}
