import { useState, useEffect, useRef } from 'react'
import { useAuthStore } from '../stores/authStore'
import { sendTutorMessage } from '../lib/tutor'
import { createConversation } from '../lib/database'
import { renderContent } from '../lib/chatRenderer'

/* ── Typing indicator dots ── */
function TypingDots() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 0' }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{
          width: 6, height: 6, borderRadius: '50%', background: 'var(--muted)',
          animation: `ftcBounce 1.2s ease-in-out ${i * 0.15}s infinite`,
        }} />
      ))}
    </div>
  )
}

/* ── Single message bubble ── */
function ChatBubble({ role, content }) {
  const isUser = role === 'user'
  return (
    <div style={{
      display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: 12,
    }}>
      {!isUser && (
        <div style={{
          width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
          background: 'var(--gold-dim)', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          marginRight: 8, marginTop: 2,
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
      )}
      <div style={{
        maxWidth: '80%', padding: '10px 14px',
        borderRadius: isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
        background: isUser ? 'var(--gold-dim)' : 'rgba(255,255,255,0.04)',
        border: isUser ? '1px solid var(--gold-border)' : '1px solid var(--border)',
        fontFamily: 'var(--font-body)', fontSize: '0.85rem',
        color: isUser ? 'var(--white)' : 'rgba(250,250,249,0.9)',
      }}>
        {isUser
          ? <p style={{ lineHeight: 1.6, margin: 0 }}>{content}</p>
          : renderContent(content)
        }
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   FLOATING TUTOR CHAT
   ══════════════════════════════════════════════════════════════════ */
export default function FloatingTutorChat({ question }) {
  const user = useAuthStore((s) => s.user)
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const [conversationId, setConversationId] = useState(null)
  const [unread, setUnread] = useState(0)

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, sending])

  // Focus input when panel opens
  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [open])

  // Build question context string for the AI
  const buildContext = () => {
    if (!question) return undefined
    let ctx = `Current question: ${question.question}\n`
    if (question.passage) ctx += `Passage: ${question.passage}\n`
    if (question.options) {
      ctx += `Options:\n`
      question.options.forEach((o) => { ctx += `  ${o.letter}) ${o.text}\n` })
    }
    ctx += `Category: ${question.category}\n`
    ctx += `Correct answer: ${question.correct}`
    return ctx
  }

  const handleSend = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || sending || !user) return

    setInput('')
    setError(null)

    // Optimistically add user message
    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setSending(true)

    try {
      // Create conversation if needed
      let convId = conversationId
      if (!convId) {
        const { data } = await createConversation(user.id, question?.category || 'general')
        if (!data) throw new Error('Failed to start conversation')
        convId = data.id
        setConversationId(convId)
      }

      const response = await sendTutorMessage({
        conversationId: convId,
        message: text,
        category: question?.category || 'general',
        questionContext: buildContext(),
      })

      setMessages((prev) => [...prev, { role: 'assistant', content: response.message }])
      if (!open) setUnread((n) => n + 1)
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      {/* ── Chat Panel ── */}
      <div style={{
        position: 'fixed', bottom: 24, right: 24,
        width: open ? 370 : 0,
        height: open ? 520 : 0,
        maxHeight: 'calc(100vh - 120px)',
        borderRadius: 20,
        background: 'var(--bg)',
        border: open ? '1.5px solid var(--border)' : 'none',
        boxShadow: open ? '0 12px 48px rgba(0,0,0,0.5)' : 'none',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1), height 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease',
        opacity: open ? 1 : 0,
        zIndex: 900,
        pointerEvents: open ? 'auto' : 'none',
      }}>
        {/* Header */}
        <div style={{
          padding: '14px 18px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%',
              background: 'var(--gold-dim)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-body)', fontWeight: 700,
                fontSize: '0.9rem', color: 'var(--white)',
              }}>
                AI Tutor
              </div>
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--muted)',
              }}>
                Ask about this question
              </div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--muted)', padding: 4, display: 'flex',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '16px 14px',
          display: 'flex', flexDirection: 'column',
        }}>
          {messages.length === 0 && !sending ? (
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              textAlign: 'center', padding: '20px 10px',
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'var(--gold-dim)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', marginBottom: 14,
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                color: 'var(--muted)', lineHeight: 1.6, maxWidth: 240,
              }}>
                Need help? Ask me about this question and I'll guide you through it.
              </p>
              {/* Quick prompts */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 14, width: '100%' }}>
                {[
                  'Give me a hint',
                  'Explain this concept',
                  'Why is my answer wrong?',
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => { setInput(prompt); setTimeout(() => inputRef.current?.focus(), 50) }}
                    style={{
                      padding: '8px 14px', borderRadius: 100,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid var(--border)',
                      fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                      color: 'var(--gold)', cursor: 'pointer',
                      transition: 'all 0.2s ease', textAlign: 'left',
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <ChatBubble key={i} role={msg.role} content={msg.content} />
              ))}
              {sending && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 12 }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                    background: 'var(--gold-dim)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div style={{
                    padding: '10px 14px', borderRadius: '14px 14px 14px 4px',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                  }}>
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Error */}
        {error && (
          <div style={{
            margin: '0 14px 6px', padding: '8px 12px', borderRadius: 8,
            background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)',
            fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#F87171',
          }}>
            {error}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={handleSend}
          style={{
            padding: '12px 14px', borderTop: '1px solid var(--border)',
            display: 'flex', gap: 8, background: 'var(--bg)',
            flexShrink: 0,
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={sending ? 'Thinking...' : 'Ask about this question...'}
            disabled={sending}
            style={{
              flex: 1, padding: '10px 16px', borderRadius: 100,
              background: 'rgba(255,255,255,0.04)', border: '1.5px solid var(--border)',
              fontFamily: 'var(--font-body)', fontSize: '0.85rem',
              color: 'var(--white)', outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => { e.target.style.borderColor = 'var(--gold-border)' }}
            onBlur={(e) => { e.target.style.borderColor = 'var(--border)' }}
          />
          <button
            type="submit"
            disabled={sending || !input.trim()}
            style={{
              width: 38, height: 38, borderRadius: '50%',
              background: input.trim() && !sending ? 'var(--gold)' : 'rgba(255,255,255,0.06)',
              border: 'none', cursor: input.trim() && !sending ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, transition: 'all 0.2s ease',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke={input.trim() && !sending ? 'var(--bg)' : 'var(--muted)'}
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </form>
      </div>

      {/* ── Floating Toggle Button ── */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          position: 'fixed', bottom: 24, right: 24,
          width: open ? 0 : 56, height: open ? 0 : 56,
          borderRadius: '50%',
          background: 'var(--gold)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(245,200,66,0.3)',
          transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
          opacity: open ? 0 : 1,
          zIndex: 901,
          overflow: 'hidden',
          pointerEvents: open ? 'none' : 'auto',
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--bg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>

        {/* Unread badge */}
        {unread > 0 && !open && (
          <div style={{
            position: 'absolute', top: -2, right: -2,
            width: 20, height: 20, borderRadius: '50%',
            background: '#F87171', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-body)', fontSize: '0.65rem',
            fontWeight: 700, color: '#fff',
          }}>
            {unread}
          </div>
        )}
      </button>

      {/* Keyframe animation for typing dots */}
      <style>{`
        @keyframes ftcBounce {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-3px); }
        }
      `}</style>
    </>
  )
}
