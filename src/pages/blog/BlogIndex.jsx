import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchPublishedPosts } from '@/lib/blog'
import BlogNav from '@/components/blog/BlogNav'
import BlogCard from '@/components/blog/BlogCard'
import SEOHead from '@/components/blog/SEOHead'
import { BottomCTA } from '@/components/blog/BlogCTA'

const gold = '#F5C842'
const white = '#FAFAF9'
const muted = '#9B9BAD'
const border = 'rgba(255,255,255,0.06)'
const goldDim = 'rgba(245,200,66,0.15)'
const transition = 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
const heading = "'Playfair Display', serif"
const body = "'DM Sans', sans-serif"

const PILLARS = ['SAT Prep', 'ACT Prep', 'College Admissions', 'Study Skills', 'AI in Education']
const PER_PAGE = 12

export default function BlogIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTag = searchParams.get('tag')
  const [posts, setPosts] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchPublishedPosts({ limit: PER_PAGE, offset: (page - 1) * PER_PAGE, tag: activeTag })
      .then(({ posts, total }) => { setPosts(posts); setTotal(total) })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [page, activeTag])

  const pages = Math.ceil(total / PER_PAGE)

  return (
    <>
      <SEOHead
        title="Blog — SAT & ACT Prep Tips"
        description="Expert SAT and ACT prep tips, study guides, college admissions advice, and AI tutoring insights from TutorPro.ai."
        url="https://tutorpro.ai/blog"
      />
      <BlogNav />

      <div style={{ minHeight: '100vh', paddingTop: 100, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
          <h1 style={{
            fontFamily: heading, fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 3rem)', color: white, marginBottom: 8,
          }}>
            The <span style={{ color: gold, fontStyle: 'italic' }}>TutorPro</span> Blog
          </h1>
          <p style={{
            fontFamily: body, fontSize: '1.1rem', color: muted,
            maxWidth: 600, lineHeight: 1.6, marginBottom: 32,
          }}>
            Expert study tips, test strategies, and college admissions advice to help you score higher.
          </p>

          {/* Pillar filters */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}>
            <button
              onClick={() => { setSearchParams({}); setPage(1) }}
              style={{
                background: !activeTag ? gold : 'transparent',
                color: !activeTag ? '#07070F' : muted,
                border: `1px solid ${!activeTag ? gold : border}`,
                padding: '8px 18px', borderRadius: 100, cursor: 'pointer',
                fontFamily: body, fontWeight: 600, fontSize: '0.85rem', transition,
              }}
            >
              All
            </button>
            {PILLARS.map(pillar => (
              <button
                key={pillar}
                onClick={() => { setSearchParams({ tag: pillar }); setPage(1) }}
                style={{
                  background: activeTag === pillar ? gold : 'transparent',
                  color: activeTag === pillar ? '#07070F' : muted,
                  border: `1px solid ${activeTag === pillar ? gold : border}`,
                  padding: '8px 18px', borderRadius: 100, cursor: 'pointer',
                  fontFamily: body, fontWeight: 600, fontSize: '0.85rem', transition,
                }}
              >
                {pillar}
              </button>
            ))}
          </div>

          {/* Posts grid */}
          {loading ? (
            <p style={{ fontFamily: body, color: muted, textAlign: 'center', padding: '60px 0' }}>
              Loading posts...
            </p>
          ) : posts.length === 0 ? (
            <p style={{ fontFamily: body, color: muted, textAlign: 'center', padding: '60px 0' }}>
              No posts yet. Check back soon!
            </p>
          ) : (
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 24,
            }}>
              {posts.map(post => <BlogCard key={post.id} post={post} />)}
            </div>
          )}

          {/* Pagination */}
          {pages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 48 }}>
              {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  style={{
                    background: p === page ? gold : 'transparent',
                    color: p === page ? '#07070F' : muted,
                    border: `1px solid ${p === page ? gold : border}`,
                    width: 36, height: 36, borderRadius: 8, cursor: 'pointer',
                    fontFamily: body, fontWeight: 600, fontSize: '0.85rem',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          <BottomCTA />
        </div>
      </div>
    </>
  )
}
