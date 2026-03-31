import { useParams, Link, Navigate } from 'react-router-dom'
import SEOHead from '../components/blog/SEOHead'
import { blogPosts } from '../data/blog/index'

function TableOfContents({ content }) {
  const headings = []
  const regex = /<h2[^>]*>(.*?)<\/h2>/gi
  let match
  while ((match = regex.exec(content)) !== null) {
    const text = match[1].replace(/<[^>]+>/g, '')
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    headings.push({ text, id })
  }

  if (headings.length < 3) return null

  return (
    <nav style={{
      background: 'var(--bg-light)',
      border: '1.5px solid var(--border)',
      borderRadius: 'var(--radius-card)',
      padding: '24px 28px',
      marginBottom: 40,
    }}>
      <p style={{
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: 'var(--muted)',
        marginBottom: 14,
      }}>
        In this article
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {headings.map((h) => (
          <li key={h.id} style={{ marginBottom: 8 }}>
            <a
              href={`#${h.id}`}
              style={{
                fontSize: '0.9rem',
                color: 'var(--gold)',
                textDecoration: 'none',
                lineHeight: 1.5,
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function addHeadingIds(html) {
  return html.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (match, attrs, text) => {
    const plainText = text.replace(/<[^>]+>/g, '')
    const id = plainText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    return `<h2${attrs} id="${id}">${text}</h2>`
  })
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) return <Navigate to="/blog" replace />

  const processedContent = addHeadingIds(post.content)

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3)

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.description}
        url={`https://tutorpro.ai/blog/${post.slug}`}
        type="article"
        publishedAt={post.publishedAt}
      />

      <article style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '80px 24px 120px',
      }}>
        {/* Breadcrumb */}
        <nav style={{ marginBottom: 32 }}>
          <Link to="/blog" style={{
            fontSize: '0.8rem',
            color: 'var(--muted)',
            textDecoration: 'none',
            letterSpacing: '0.04em',
          }}>
            &larr; Back to blog
          </Link>
        </nav>

        {/* Header */}
        <header style={{ marginBottom: 40 }}>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--gold)',
          }}>
            {post.category.replace('-', ' ')}
          </span>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
            fontWeight: 800,
            color: 'var(--white)',
            lineHeight: 1.15,
            marginTop: 12,
            marginBottom: 16,
          }}>
            {post.title}
          </h1>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: '0.85rem',
            color: 'var(--muted)',
          }}>
            <span>{post.author}</span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span>{post.readingTime} min read</span>
          </div>
        </header>

        {/* Table of contents */}
        <TableOfContents content={post.content} />

        {/* Article body */}
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: processedContent }}
          style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--white)' }}
        />

        {/* CTA Box */}
        {post.cta && (
          <div style={{
            marginTop: 56,
            padding: '36px 32px',
            background: 'linear-gradient(135deg, rgba(245,200,66,0.08), rgba(245,200,66,0.02))',
            border: '1.5px solid var(--gold-border)',
            borderRadius: 'var(--radius-card)',
            textAlign: 'center',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.3rem',
              color: 'var(--white)',
              marginBottom: 12,
            }}>
              {post.cta.text}
            </h3>
            <p style={{ color: 'var(--muted)', marginBottom: 20, fontSize: '0.95rem' }}>
              Take the free TutorPro diagnostic — 20 questions, personalized score breakdown, under 15 minutes.
            </p>
            <Link
              to={post.cta.url}
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
              {post.cta.text}
            </Link>
          </div>
        )}

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div style={{ marginTop: 64 }}>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.2rem',
              color: 'var(--white)',
              marginBottom: 20,
            }}>
              Keep reading
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.id}
                  to={`/blog/${rp.slug}`}
                  style={{
                    display: 'block',
                    padding: '18px 22px',
                    background: 'var(--card-bg)',
                    border: '1.5px solid var(--border)',
                    borderRadius: 'var(--radius-card)',
                    textDecoration: 'none',
                    transition: 'var(--transition)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--gold-border)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <p style={{ fontSize: '1rem', color: 'var(--white)', fontWeight: 500, marginBottom: 4 }}>
                    {rp.title}
                  </p>
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                    {rp.readingTime} min read
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </article>

      {/* Blog content styles */}
      <style>{`
        .blog-content h2 {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--white);
          margin: 48px 0 16px;
          line-height: 1.3;
          scroll-margin-top: 80px;
        }
        .blog-content h3 {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--white);
          margin: 32px 0 12px;
          line-height: 1.3;
        }
        .blog-content p {
          margin-bottom: 18px;
          color: rgba(250, 250, 249, 0.88);
        }
        .blog-content ul, .blog-content ol {
          margin: 0 0 20px 24px;
          color: rgba(250, 250, 249, 0.88);
        }
        .blog-content li {
          margin-bottom: 8px;
          line-height: 1.7;
        }
        .blog-content strong {
          color: var(--white);
          font-weight: 600;
        }
        .blog-content em {
          color: var(--gold);
          font-style: italic;
        }
        .blog-content a {
          color: var(--gold);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .blog-content a:hover {
          opacity: 0.8;
        }
        .blog-content blockquote {
          border-left: 3px solid var(--gold);
          padding: 12px 20px;
          margin: 24px 0;
          background: rgba(245, 200, 66, 0.04);
          border-radius: 0 var(--radius-input) var(--radius-input) 0;
          color: rgba(250, 250, 249, 0.8);
          font-style: italic;
        }
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 24px 0;
        }
        .blog-content th, .blog-content td {
          padding: 12px 16px;
          text-align: left;
          border-bottom: 1px solid var(--border);
          font-size: 0.95rem;
        }
        .blog-content th {
          color: var(--gold);
          font-weight: 600;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .blog-content td {
          color: rgba(250, 250, 249, 0.85);
        }
      `}</style>
    </>
  )
}
