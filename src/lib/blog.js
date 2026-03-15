import { supabase } from './supabase'

export async function fetchPublishedPosts({ limit = 20, offset = 0, tag } = {}) {
  let query = supabase
    .from('blog_posts')
    .select('id, title, slug, meta_description, keywords, category, author, published_at', { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (tag) {
    query = query.contains('keywords', [tag])
  }

  const { data, error, count } = await query
  if (error) throw error
  return { posts: data || [], total: count || 0 }
}

export async function fetchPostBySlug(slug) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) throw error
  return data
}

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}
