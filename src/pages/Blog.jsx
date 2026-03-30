import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { blogPosts } from '../data/blog/index'

const categories = [
  { key: 'all', label: 'All Posts' },
  { key: 'sat-prep', label: 'SAT Prep' },
  { key: 'act-prep', label: 'ACT Prep' },
  { key: 'study-tips', label: 'Study Tips' },
  { key: 'comparison', label: 'Comparisons' },
  { key: 'parents', label: 'For Parents' },
]

const categoryColors = {
  'sat-prep': 'var(--math-purple)',
  'act-prep': 'var(--reading-green)',
  'study-tips': 'var(--writing-yellow)',
  'comparison': 'var(--gold)',
  'parents': '#F9A8D4',
  'digital-sat': '#60A5FA',
}

function CategoryBadge({ category }) {
  const color = categoryColors[category] || 'var(--muted)'
  return (
    <span style={{
      fontSize: '0.7rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: color,
      background: `${color}15`,
      padding: '4px 10px',
      borderRadius: 'var(--radius-pill)',
      border: `1px solid ${color}30`,
    }}>
      {category.replace('-', ' ')}
    </span>
  )
}

function PostCard({ post, featured }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      style={{
        display: 'block',
        background: 'var(--card-bg)',
        border: '1.5px solid var(--border)',
        borderRadius: 'var(--radius-card)',
        padding: featured ? '40px' : '28px',
        textDecoration: 'none',
        transition: 'var(--transition)',
        gridColumn: featured ? '1 / -1' : undefined,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--gold-border)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <CategoryBadge category={post.category} />
        <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
          {post.readingTime} min read
        </span>
      </div>

      <h2 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: featured ? '1.6rem' : '1.2rem',
        fontWeight: 700,
        color: 'var(--white)',
        marginBottom: 10,
        lineHeight: 1.3,
      }}>
        {post.title}
      </h2>

      <p style={{
        fontSize: '0.95rem',
        color: 'var(--muted)',
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
        {post.description}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 500 }}>
          Read article
        </span>
        <span style={{ color: 'var(--gold)', fontSize: '0.85rem' }}>&rarr;</span>
      </div>
    </Link>
  )
}

export default function Blog() {
  const publishedPosts = blogPosts
    .filter((p) => new Date(p.publishedAt) <= new Date())
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

  return (
    <>
      <SEO
        title="SAT & ACT Prep Blog"
        description="Expert SAT and ACT prep guides, study tips, score improvement strategies, and test-taking advice from TutorPro.ai."
        path="/blog"
      />

      <div style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '80px 24px 120px',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <Link to="/" style={{ fontSize: '0.8rem', color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            TutorPro.ai
          </Link>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 5vw, 2.8rem)',
            fontWeight: 800,
            color: 'var(--white)',
            marginTop: 12,
            marginBottom: 16,
          }}>
            The Prep Lab
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--muted)',
            maxWidth: 520,
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Strategies, guides, and insights for smarter SAT &amp; ACT prep.
          </p>
        </div>

        {/* Featured post */}
        {publishedPosts.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <PostCard post={publishedPosts[0]} featured />
          </div>
        )}

        {/* Post grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
        }}>
          {publishedPosts.slice(1).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          textAlign: 'center',
          marginTop: 80,
          padding: '48px 32px',
          background: 'var(--card-bg)',
          border: '1.5px solid var(--border)',
          borderRadius: 'var(--radius-card)',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.5rem',
            color: 'var(--white)',
            marginBottom: 12,
          }}>
            Ready to see where you stand?
          </h2>
          <p style={{ color: 'var(--muted)', marginBottom: 24, fontSize: '1rem' }}>
            Take a free 20-question diagnostic and get your estimated SAT score in under 15 minutes.
          </p>
          <Link
            to="/diagnostic"
            style={{
              display: 'inline-block',
              background: 'var(--gold)',
              color: '#07070F',
              fontWeight: 600,
              fontSize: '0.95rem',
              padding: '14px 32px',
              borderRadius: 'var(--radius-pill)',
              textDecoration: 'none',
              transition: 'var(--transition)',
            }}
          >
            Start Free Diagnostic
          </Link>
        </div>
      </div>
    </>
  )
}
