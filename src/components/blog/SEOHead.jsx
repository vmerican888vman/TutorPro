import { useEffect } from 'react'

export default function SEOHead({ title, description, url, type = 'website', publishedAt, image }) {
  useEffect(() => {
    // Set document title
    document.title = title ? `${title} | TutorPro.ai` : 'TutorPro.ai — AI-Powered SAT & ACT Tutoring'

    // Helper to set or create a meta tag
    const setMeta = (attr, key, content) => {
      if (!content) return
      let el = document.querySelector(`meta[${attr}="${key}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url || 'https://tutorpro.ai')
    setMeta('property', 'og:type', type)
    if (image) setMeta('property', 'og:image', image)
    setMeta('name', 'twitter:card', image ? 'summary_large_image' : 'summary')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url || 'https://tutorpro.ai')

    // JSON-LD for articles
    if (type === 'article' && publishedAt) {
      let script = document.querySelector('#blog-jsonld')
      if (!script) {
        script = document.createElement('script')
        script.id = 'blog-jsonld'
        script.type = 'application/ld+json'
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        author: { '@type': 'Organization', name: 'TutorPro.ai' },
        publisher: { '@type': 'Organization', name: 'TutorPro.ai' },
        datePublished: publishedAt,
        dateModified: publishedAt,
        ...(image && { image }),
      })
    }

    return () => {
      // Cleanup JSON-LD on unmount
      const script = document.querySelector('#blog-jsonld')
      if (script) script.remove()
    }
  }, [title, description, url, type, publishedAt, image])

  return null
}
