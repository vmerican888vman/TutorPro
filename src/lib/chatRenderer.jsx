/**
 * Simple markdown-ish renderer for AI tutor chat messages.
 * Shared between the full Tutor page and the floating practice chat.
 */
export function renderContent(text) {
  if (!text) return null

  const paragraphs = text.split(/\n\n+/)

  return paragraphs.map((p, i) => {
    // Code blocks
    if (p.startsWith('```')) {
      const code = p.replace(/^```\w*\n?/, '').replace(/```$/, '')
      return (
        <pre key={i} style={{
          background: 'rgba(255,255,255,0.04)', borderRadius: 8,
          padding: '12px 16px', marginBottom: 8, overflowX: 'auto',
          fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
          color: 'var(--white)', lineHeight: 1.6,
        }}>
          {code}
        </pre>
      )
    }

    // Bold, italic, inline code
    const formatted = p
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code style="background:rgba(255,255,255,0.06);padding:2px 6px;border-radius:4px;font-family:var(--font-mono);font-size:0.85em">$1</code>')

    // Bullet lists
    if (p.match(/^[-*] /m)) {
      const items = p.split(/\n/).filter(Boolean)
      return (
        <ul key={i} style={{ paddingLeft: 20, marginBottom: 8 }}>
          {items.map((item, j) => (
            <li key={j} style={{ marginBottom: 4, lineHeight: 1.6 }}
              dangerouslySetInnerHTML={{ __html: item.replace(/^[-*] /, '') }}
            />
          ))}
        </ul>
      )
    }

    return (
      <p key={i} style={{ marginBottom: 8, lineHeight: 1.7 }}
        dangerouslySetInnerHTML={{ __html: formatted }}
      />
    )
  })
}
