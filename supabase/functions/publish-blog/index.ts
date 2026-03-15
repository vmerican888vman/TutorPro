import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // Verify API key
  const apiKey = req.headers.get('x-api-key')
  const expectedKey = Deno.env.get('BLOG_API_KEY')
  if (!expectedKey || apiKey !== expectedKey) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  try {
    const body = await req.json()
    const { title, content, keywords, category, topic, meta_description, author, status } = body

    if (!title || !content) {
      return new Response(JSON.stringify({ error: 'title and content are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Generate unique slug
    const baseSlug = slugify(title)
    let slug = baseSlug
    let counter = 1
    while (true) {
      const { data } = await supabase.from('blog_posts').select('id').eq('slug', slug).single()
      if (!data) break
      slug = `${baseSlug}-${counter++}`
    }

    // Count words
    const word_count = content.split(/\s+/).filter(Boolean).length

    const isPublished = status === 'published'
    const { data, error } = await supabase.from('blog_posts').insert({
      title,
      slug,
      content,
      site: 'tutorpro',
      keywords: keywords || [],
      category: category || null,
      topic: topic || null,
      author: author || 'TutorPro Team',
      meta_description: meta_description || null,
      word_count,
      status: isPublished ? 'published' : 'draft',
      published_at: isPublished ? new Date().toISOString() : null,
    }).select('id, slug').single()

    if (error) throw error

    return new Response(JSON.stringify({ id: data.id, slug: data.slug }), {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
