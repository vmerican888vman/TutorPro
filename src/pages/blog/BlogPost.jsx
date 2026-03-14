import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { fetchPostBySlug } from '@/lib/blog'
import BlogNav from '@/components/blog/BlogNav'
import SEOHead from '@/components/blog/SEOHead'
import { InlineCTA, BottomCTA } from '@/components/blog/BlogCTA'

const gold = '#F5C842'
const white = '#FAFAF9'
const muted = '#9B9BAD'
const border = 'rgba(255,255,255,0.06)'
const goldDim = 'rgba(245,200,66,0.15)'
const heading = "'Playfair Display', serif"
const body = "'DM Sans', sans-serif"

/* Markdown component overrides to match TutorPro design */
const markdownComponents = {
  h2: ({ children }) => (
    <h2 style={{ fontFamily: heading, fontWeight: 700, fontSize: '1.5rem', color: white, marginTop: 40, marginBottom: 16 }}>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 style={{ fontFamily: body, fontWeight: 700, fontSize: '1.15rem', color: white, marginTop: 28, marginBottom: 12 }}>
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p style={{ fontFamily: body, fontSize: '1rem', color: muted, lineHeight: 1.8, marginBottom: 16 }}>
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul style={{ fontFamily: body, fontSize: '1rem', color: muted, lineHeight: 1.8, paddingLeft: 24, marginBottom: 16 }}>
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol style={{ fontFamily: body, fontSize: '1rem', color: muted, lineHeight: 1.8, paddingLeft: 24, marginBottom: 16 }}>
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li style={{ marginBottom: 6 }}>{children}</li>
  ),
  strong: ({ children }) => (
    <strong style={{ color: white, fontWeight: 600 }}>{children}</strong>
  ),
  a: ({ href, children }) => (
    <a href={href} style={{ color: gold, textDecoration: 'underline', textUnderlineOffset: 3 }} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote style={{
      borderLeft: `3px solid ${gold}`, paddingLeft: 20, margin: '24px 0',
      fontStyle: 'italic', color: muted,
    }}>
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    if (className) {
      return (
        <pre style={{
          background: '#0E0E1A', border: `1px solid ${border}`, borderRadius: 12,
          padding: 20, overflowX: 'auto', marginBottom: 16,
        }}>
          <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: '#e0e0e0' }}>
            {children}
          </code>
        </pre>
      )
    }
    return (
      <code style={{
        background: 'rgba(245,200,66,0.1)', color: gold, padding: '2px 6px',
        borderRadius: 4, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem',
      }}>
        {children}
      </code>
    )
  },
}

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchPostBySlug(slug)
      .then(setPost)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <>
        <BlogNav />
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontFamily: body, color: muted }}>Loading...</p>
        </div>
      </>
    )
  }

  if (error || !post) {
    return (
      <>
        <BlogNav />
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
          <p style={{ fontFamily: heading, fontSize: '1.5rem', color: white }}>Post not found</p>
          <Link to="/blog" style={{ fontFamily: body, color: gold, textDecoration: 'none' }}>&larr; Back to blog</Link>
        </div>
      </>
    )
  }

  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : ''

  // Split content to insert inline CTA at ~40%
  const lines = post.content.split('\n')
  const splitAt = Math.floor(lines.length * 0.4)
  const contentBefore = lines.slice(0, splitAt).join('\n')
  const contentAfter = lines.slice(splitAt).join('\n')

  return (
    <>
      <SEOHead
        title={post.meta_title || post.title}
        description={post.meta_description || post.description || post.title}
        url={`https://tutorpro.ai/blog/${post.slug}`}
        type="article"
        publishedAt={post.published_at}
        image={post.featured_image}
      />
      <BlogNav />

      <article style={{ minHeight: '100vh', paddingTop: 100, paddingBottom: 80 }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
          {/* Breadcrumbs */}
          <nav style={{ fontFamily: body, fontSize: '0.8rem', color: muted, marginBottom: 24 }}>
            <Link to="/" style={{ color: muted, textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <Link to="/blog" style={{ color: muted, textDecoration: 'none' }}>Blog</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: white }}>{post.title}</span>
          </nav>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              {post.tags.map(tag => (
                <Link
                  key={tag}
                  to={`/blog?tag=${encodeURIComponent(tag)}`}
                  style={{
                    background: goldDim, color: gold, fontSize: '0.75rem',
                    fontWeight: 600, padding: '4px 12px', borderRadius: 100,
                    fontFamily: body, textDecoration: 'none',
                  }}
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 style={{
            fontFamily: heading, fontWeight: 800,
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: white,
            lineHeight: 1.2, marginBottom: 16,
          }}>
            {post.title}
          </h1>

          {/* Meta */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 16,
            fontFamily: body, fontSize: '0.85rem', color: muted,
            marginBottom: 40, paddingBottom: 24, borderBottom: `1px solid ${border}`,
          }}>
            <span>{post.author || 'TutorPro Team'}</span>
            {date && <span>&middot;</span>}
            {date && <span>{date}</span>}
          </div>

          {/* Article body */}
          <div>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {contentBefore}
            </ReactMarkdown>

            <InlineCTA />

            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {contentAfter}
            </ReactMarkdown>
          </div>

          <BottomCTA />
        </div>
      </article>
    </>
  )
}
