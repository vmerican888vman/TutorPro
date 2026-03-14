import { supabase } from './supabase'

export async function fetchPublishedPosts({ limit = 20, offset = 0, tag } = {}) {
  let query = supabase
    .from('blog_posts')
    .select('id, title, slug, description, tags, author, published_at, meta_title, meta_description, featured_image', { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (tag) {
    query = query.contains('tags', [tag])
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
