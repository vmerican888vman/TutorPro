import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Anthropic from 'https://esm.sh/@anthropic-ai/sdk@0.24'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SYSTEM_PROMPT = `You are TutorPro, an expert SAT and ACT tutor. Your teaching style:

1. SOCRATIC METHOD: Guide students to answers through questions, don't just give answers
2. PATIENT & ENCOURAGING: Never make students feel dumb. Celebrate small wins
3. STEP-BY-STEP: Break complex problems into manageable steps
4. ADAPTIVE: If a student is struggling, simplify. If they're excelling, challenge them
5. FOCUSED: Keep conversations on-topic (SAT/ACT prep)
6. EXPLAIN WHY: Don't just say "the answer is B" — explain the reasoning

When discussing specific questions:
- First ask the student what they think and why
- Identify their misconception
- Guide them to the correct approach
- Verify understanding with a follow-up

IMPORTANT: Never guarantee specific score improvements. Use "score improvement" language.
You cover: SAT Math, SAT Reading & Writing, ACT Math, ACT English, ACT Reading, ACT Science.

Keep responses concise (2-4 paragraphs max). Use markdown for math expressions.`

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    // Check if user has Pro subscription or is within 7-day free trial
    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_status, created_at')
      .eq('id', user.id)
      .single()

    const isPro = profile?.subscription_status === 'pro'
    const createdAt = profile?.created_at ? new Date(profile.created_at) : new Date(user.created_at)
    const daysSinceCreation = Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24))
    const isTrialActive = daysSinceCreation < 7

    if (!isPro && !isTrialActive) {
      throw new Error('Your 7-day free trial has expired. Upgrade to Pro for unlimited access.')
    }

    const body = await req.json()

    // Support both formats:
    // iOS app sends: { messages: [...], category, questionContext }
    // Web app sends: { conversationId, message, category, questionContext }
    const { category, questionContext } = body

    let messages: Array<{ role: string; content: string }> = []

    if (body.messages && Array.isArray(body.messages)) {
      // iOS format: full messages array
      messages = body.messages.map((m: any) => ({
        role: m.role,
        content: m.content,
      }))
    } else {
      // Web format: conversationId + single message
      const { conversationId, message } = body
      if (conversationId) {
        const { data: conversation } = await supabase
          .from('tutor_conversations')
          .select('messages')
          .eq('id', conversationId)
          .single()
        if (conversation) {
          messages = conversation.messages || []
        }
      }
      if (message) {
        messages.push({ role: 'user', content: message })
      }
    }

    if (messages.length === 0) {
      throw new Error('No messages provided')
    }

    // Build system prompt with optional question context
    let systemPrompt = SYSTEM_PROMPT
    if (questionContext) {
      systemPrompt += `\n\nThe student is asking about this specific question:\n${JSON.stringify(questionContext)}`
    }
    if (category) {
      systemPrompt += `\n\nThe current tutoring category is: ${category}`
    }

    // Call Claude API
    const anthropic = new Anthropic({ apiKey: Deno.env.get('ANTHROPIC_API_KEY')! })

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    })

    const assistantMessage = response.content[0].type === 'text'
      ? response.content[0].text
      : ''

    // Save updated conversation
    messages.push({ role: 'assistant', content: assistantMessage })

    if (body.conversationId) {
      await supabase
        .from('tutor_conversations')
        .update({ messages })
        .eq('id', body.conversationId)
    }

    // Return both "reply" (for iOS) and "message" (for web) for compatibility
    return new Response(JSON.stringify({ reply: assistantMessage, message: assistantMessage, messages }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
