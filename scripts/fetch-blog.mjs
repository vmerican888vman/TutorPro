// Build-time fetch: pulls published tutorpro blog posts from Supabase and
// writes them to src/data/blog/generated.json + public/sitemap.xml.
//
// Runs as `prebuild` so `npm run build` always ships fresh content.
// Required env vars (load via .env locally; Cloudflare Pages env not used since
// deployment is wrangler direct-upload built locally):
//   SUPABASE_URL
//   SUPABASE_ANON_KEY
//
// Falls back to writing an empty array if env vars are missing AND
// ALLOW_EMPTY_BLOG=1 is set, so partial dev environments don't crash the build.

import { createClient } from '@supabase/supabase-js'
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

// Lightweight .env loader (no dotenv dep needed)
try {
  const envPath = resolve(ROOT, '.env')
  const raw = readFileSync(envPath, 'utf8')
  for (const line of raw.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
  }
} catch {
  // .env optional
}

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY
const SITE_ORIGIN = process.env.SITE_ORIGIN || 'https://tutorpro.ai'

const OUT_JSON = resolve(ROOT, 'src/data/blog/generated.json')
const OUT_SITEMAP = resolve(ROOT, 'public/sitemap.xml')

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  if (process.env.ALLOW_EMPTY_BLOG === '1') {
    console.warn('[fetch-blog] SUPABASE_URL/ANON_KEY missing — writing empty stubs (ALLOW_EMPTY_BLOG=1).')
    mkdirSync(dirname(OUT_JSON), { recursive: true })
    writeFileSync(OUT_JSON, '[]\n')
    mkdirSync(dirname(OUT_SITEMAP), { recursive: true })
    writeFileSync(OUT_SITEMAP, buildSitemap([]))
    process.exit(0)
  }
  console.error('[fetch-blog] Missing SUPABASE_URL or SUPABASE_ANON_KEY. Set them in .env or export them. (Set ALLOW_EMPTY_BLOG=1 to bypass.)')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
})

console.log('[fetch-blog] Fetching tutorpro blog posts from Supabase…')

// Page through in case of large result sets (Supabase default cap ~1000).
const PAGE = 500
let allRows = []
let from = 0
for (;;) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, slug, title, meta_description, content, keywords, category, topic, author, published_at, created_at, updated_at, word_count')
    .eq('site', 'tutorpro')
    .eq('status', 'published')
    .order('published_at', { ascending: false, nullsFirst: false })
    .range(from, from + PAGE - 1)
  if (error) {
    console.error('[fetch-blog] Supabase error:', error)
    process.exit(1)
  }
  if (!data || data.length === 0) break
  allRows = allRows.concat(data)
  if (data.length < PAGE) break
  from += PAGE
}

console.log(`[fetch-blog] Got ${allRows.length} published posts.`)

// Map Supabase row → shape that Blog.jsx / BlogPost.jsx expect.
const CATEGORY_SLUG = {
  'sat prep': 'sat-prep',
  'act prep': 'act-prep',
  'study tips': 'study-tips',
  'comparison': 'comparison',
  'comparisons': 'comparison',
  'parents': 'parents',
  'for parents': 'parents',
  'digital sat': 'digital-sat',
}

function categoryToSlug(raw) {
  if (!raw) return 'study-tips'
  const k = String(raw).trim().toLowerCase()
  if (CATEGORY_SLUG[k]) return CATEGORY_SLUG[k]
  return k.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'study-tips'
}

function readingTimeFromWords(wc, content) {
  if (typeof wc === 'number' && wc > 0) return Math.max(1, Math.round(wc / 220))
  if (typeof content === 'string' && content.length) {
    const words = content.split(/\s+/).filter(Boolean).length
    return Math.max(1, Math.round(words / 220))
  }
  return 5
}

const posts = allRows.map((row) => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  description: row.meta_description || '',
  category: categoryToSlug(row.category),
  type: 'article',
  author: row.author || 'TutorPro Team',
  publishedAt: row.published_at || row.created_at,
  updatedAt: row.updated_at || row.published_at || row.created_at,
  readingTime: readingTimeFromWords(row.word_count, row.content),
  keywords: Array.isArray(row.keywords) ? row.keywords : [],
  topic: row.topic || null,
  cta: { text: 'Start Free Diagnostic', url: '/diagnostic' },
  content: row.content || '',
}))

mkdirSync(dirname(OUT_JSON), { recursive: true })
writeFileSync(OUT_JSON, JSON.stringify(posts, null, 2) + '\n')
console.log(`[fetch-blog] Wrote ${OUT_JSON}`)

// Sitemap
function buildSitemap(postList) {
  const staticRoutes = [
    { loc: '/', changefreq: 'weekly', priority: '1.0' },
    { loc: '/blog', changefreq: 'daily', priority: '0.9' },
    { loc: '/pricing', changefreq: 'monthly', priority: '0.8' },
    { loc: '/diagnostic', changefreq: 'monthly', priority: '0.8' },
    { loc: '/login', changefreq: 'yearly', priority: '0.3' },
    { loc: '/signup', changefreq: 'yearly', priority: '0.3' },
  ]
  const today = new Date().toISOString().slice(0, 10)
  const urls = []
  for (const r of staticRoutes) {
    urls.push(
      `  <url>\n    <loc>${SITE_ORIGIN}${r.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
    )
  }
  for (const p of postList) {
    const lastmod = (p.updatedAt || p.publishedAt || new Date().toISOString()).slice(0, 10)
    urls.push(
      `  <url>\n    <loc>${SITE_ORIGIN}/blog/${p.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
    )
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
}

mkdirSync(dirname(OUT_SITEMAP), { recursive: true })
writeFileSync(OUT_SITEMAP, buildSitemap(posts))
console.log(`[fetch-blog] Wrote ${OUT_SITEMAP} (${posts.length} post URLs + static routes)`)
