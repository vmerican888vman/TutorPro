import { Link } from 'react-router-dom'

const gold = '#F5C842'
const white = '#FAFAF9'
const muted = '#9B9BAD'
const cardBg = '#0C0C18'
const border = 'rgba(255,255,255,0.06)'
const goldDim = 'rgba(245,200,66,0.15)'
const transition = 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
const heading = "'Playfair Display', serif"
const body = "'DM Sans', sans-serif"

export default function BlogCard({ post }) {
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : ''

  return (
    <Link
      to={`/blog/${post.slug}`}
      style={{
        display: 'block',
        background: cardBg,
        border: `1px solid ${border}`,
        borderRadius: 16,
        padding: 28,
        textDecoration: 'none',
        transition,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(245,200,66,0.25)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = border
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {post.keywords?.length > 0 && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          {post.keywords.slice(0, 3).map(tag => (
            <span key={tag} style={{
              background: goldDim, color: gold, fontSize: '0.75rem',
              fontWeight: 600, padding: '4px 10px', borderRadius: 100,
              fontFamily: body,
            }}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <h3 style={{
        fontFamily: heading, fontWeight: 700, fontSize: '1.25rem',
        color: white, lineHeight: 1.3, marginBottom: 10,
      }}>
        {post.title}
      </h3>

      {post.meta_description && (
        <p style={{
          fontFamily: body, fontSize: '0.9rem', color: muted,
          lineHeight: 1.6, marginBottom: 16,
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {post.meta_description}
        </p>
      )}

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: body, fontSize: '0.8rem', color: muted,
      }}>
        <span>{date}</span>
        <span style={{ color: gold, fontWeight: 600 }}>Read more &rarr;</span>
      </div>
    </Link>
  )
}
