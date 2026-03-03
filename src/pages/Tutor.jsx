import { useState, useEffect, useRef } from 'react'
import { useAuthStore } from '../stores/authStore'
import { useTutorStore } from '../stores/tutorStore'
import { renderContent } from '../lib/chatRenderer'

const categories = [
  { value: 'math', label: 'Math', color: 'var(--math-purple)' },
  { value: 'reading', label: 'Reading', color: 'var(--reading-green)' },
  { value: 'writing', label: 'Writing', color: 'var(--writing-yellow)' },
  { value: 'general', label: 'General', color: 'var(--muted)' },
]

/* ── Typing indicator ── */
function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '8px 0' }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{
          width: 7, height: 7, borderRadius: '50%', background: 'var(--muted)',
          animation: `typingBounce 1.2s ease-in-out ${i * 0.15}s infinite`,
        }} />
      ))}
      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-4px); }
        }
      `}</style>
    </div>
  )
}

/* ── Message bubble ── */
function MessageBubble({ role, content }) {
  const isUser = role === 'user'

  return (
    <div style={{
      display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: 16,
    }}>
      {!isUser && (
        <div style={{
          width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
          background: 'var(--gold-dim)', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          marginRight: 10, marginTop: 2,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
      )}
      <div style={{
        maxWidth: '75%', padding: '12px 16px',
        borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
        background: isUser ? 'var(--gold-dim)' : 'var(--card-bg)',
        border: isUser ? '1px solid var(--gold-border)' : '1px solid var(--border)',
        fontFamily: 'var(--font-body)', fontSize: '0.9rem',
        color: isUser ? 'var(--white)' : 'rgba(250,250,249,0.9)',
      }}>
        {isUser ? <p style={{ lineHeight: 1.6, margin: 0 }}>{content}</p> : renderContent(content)}
      </div>
    </div>
  )
}

/* ── Conversation list item ── */
function ConvoItem({ conversation, isActive, onClick }) {
  const catColor = {
    math: 'var(--math-purple)',
    reading: 'var(--reading-green)',
    writing: 'var(--writing-yellow)',
    general: 'var(--muted)',
  }

  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        width: '100%', padding: '10px 12px', borderRadius: 8,
        background: isActive ? 'var(--gold-dim)' : 'transparent',
        border: 'none', cursor: 'pointer', textAlign: 'left',
        transition: 'var(--transition)',
      }}
    >
      <div style={{
        width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
        background: catColor[conversation.category] || 'var(--muted)',
      }} />
      <div style={{ overflow: 'hidden' }}>
        <div style={{
          fontFamily: 'var(--font-body)', fontSize: '0.85rem',
          fontWeight: isActive ? 600 : 400,
          color: isActive ? 'var(--gold)' : 'var(--white)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {conversation.title || 'Untitled'}
        </div>
        <div style={{
          fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--muted)',
        }}>
          {new Date(conversation.updated_at || conversation.created_at).toLocaleDateString()}
        </div>
      </div>
    </button>
  )
}

/* ── Empty state ── */
function EmptyState() {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: 40,
      textAlign: 'center',
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: 'var(--gold-dim)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', marginBottom: 20,
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </div>
      <h3 style={{
        fontFamily: 'var(--font-heading)', fontWeight: 700,
        fontSize: '1.2rem', color: 'var(--white)', marginBottom: 8,
      }}>
        Start a conversation
      </h3>
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: '0.9rem',
        color: 'var(--muted)', maxWidth: 320, lineHeight: 1.6,
      }}>
        Ask your AI tutor anything about SAT or ACT prep. Select a category above and type your question below.
      </p>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   TUTOR PAGE
   ══════════════════════════════════════════════════════════════════ */
export default function Tutor() {
  const user = useAuthStore((s) => s.user)
  const {
    conversations, activeConversationId, messages, category, sending, error,
    loadConversations, selectConversation,
    sendMessage, setCategory, clearChat,
  } = useTutorStore()

  const [input, setInput] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Load conversations on mount
  useEffect(() => {
    if (user) loadConversations(user.id)
  }, [user, loadConversations])

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, sending])

  const handleSend = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || sending) return
    setInput('')
    await sendMessage(user.id, text)
    inputRef.current?.focus()
  }

  const handleNewChat = () => {
    clearChat()
    setSidebarOpen(false)
  }

  const handleSelectConvo = (id) => {
    selectConversation(id)
    setSidebarOpen(false)
  }

  return (
    <div style={{
      display: 'flex', height: 'calc(100vh - 64px)',
      marginTop: -32, marginLeft: -32, marginRight: -32, marginBottom: -32,
    }}>
      {/* ── Sidebar: conversation history ── */}
      <div
        className="tutor-sidebar"
        style={{
          width: 260, background: 'var(--bg)',
          borderRight: '1.5px solid var(--border)',
          display: 'flex', flexDirection: 'column',
          flexShrink: 0, overflow: 'hidden',
          position: sidebarOpen ? 'fixed' : 'relative',
          top: 0, left: sidebarOpen ? 0 : undefined,
          bottom: 0, zIndex: sidebarOpen ? 500 : 1,
          transform: sidebarOpen ? 'translateX(0)' : undefined,
        }}
      >
        <div style={{
          padding: '16px 12px', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontWeight: 700,
            fontSize: '0.9rem', color: 'var(--white)',
          }}>
            Conversations
          </span>
          <button
            onClick={handleNewChat}
            style={{
              background: 'var(--gold)', color: 'var(--bg)',
              border: 'none', borderRadius: 6, cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontWeight: 700,
              fontSize: '0.75rem', padding: '5px 10px',
            }}
          >
            + New
          </button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 8px' }}>
          {conversations.length === 0 ? (
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.8rem',
              color: 'var(--muted)', padding: 12, textAlign: 'center',
            }}>
              No conversations yet
            </p>
          ) : (
            conversations.map((c) => (
              <ConvoItem
                key={c.id}
                conversation={c}
                isActive={c.id === activeConversationId}
                onClick={() => handleSelectConvo(c.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 499,
            background: 'rgba(0,0,0,0.5)',
          }}
        />
      )}

      {/* ── Main chat area ── */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        minWidth: 0, background: 'var(--bg-light)',
      }}>
        {/* Top bar: category selector + mobile menu */}
        <div style={{
          padding: '12px 20px', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', gap: 12,
          background: 'var(--bg-light)',
        }}>
          {/* Mobile history toggle */}
          <button
            className="tutor-menu-btn"
            onClick={() => setSidebarOpen(true)}
            style={{
              display: 'none', background: 'none', border: 'none',
              color: 'var(--white)', cursor: 'pointer', padding: 4,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>

          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '0.8rem',
            color: 'var(--muted)', flexShrink: 0,
          }}>
            Category:
          </span>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                style={{
                  padding: '5px 14px', borderRadius: 100, border: 'none',
                  cursor: 'pointer', fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem', fontWeight: 600,
                  transition: 'var(--transition)',
                  background: category === cat.value ? cat.color + '22' : 'transparent',
                  color: category === cat.value ? cat.color : 'var(--muted)',
                  outline: category === cat.value ? `1px solid ${cat.color}44` : '1px solid transparent',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Messages area */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '24px 20px',
          display: 'flex', flexDirection: 'column',
        }}>
          {messages.length === 0 && !sending ? (
            <EmptyState />
          ) : (
            <>
              {messages.map((msg, i) => (
                <MessageBubble key={i} role={msg.role} content={msg.content} />
              ))}
              {sending && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 16 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                    background: 'var(--gold-dim)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div style={{
                    padding: '12px 16px', borderRadius: '16px 16px 16px 4px',
                    background: 'var(--card-bg)', border: '1px solid var(--border)',
                  }}>
                    <TypingIndicator />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Error banner */}
        {error && (
          <div style={{
            margin: '0 20px 8px', padding: '10px 14px', borderRadius: 8,
            background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)',
            fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--red)',
          }}>
            {error}
          </div>
        )}

        {/* Input bar */}
        <form
          onSubmit={handleSend}
          style={{
            padding: '16px 20px', borderTop: '1px solid var(--border)',
            display: 'flex', gap: 10, background: 'var(--bg-light)',
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={sending ? 'Tutor is thinking...' : 'Ask your tutor anything...'}
            disabled={sending}
            style={{
              flex: 1, padding: '12px 18px', borderRadius: 100,
              background: 'var(--bg)', border: '1.5px solid var(--border)',
              fontFamily: 'var(--font-body)', fontSize: '0.9rem',
              color: 'var(--white)', outline: 'none',
              transition: 'var(--transition)',
            }}
            onFocus={(e) => { e.target.style.borderColor = 'var(--gold-border)' }}
            onBlur={(e) => { e.target.style.borderColor = 'var(--border)' }}
          />
          <button
            type="submit"
            disabled={sending || !input.trim()}
            style={{
              width: 44, height: 44, borderRadius: '50%',
              background: input.trim() && !sending ? 'var(--gold)' : 'rgba(255,255,255,0.06)',
              border: 'none', cursor: input.trim() && !sending ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, transition: 'var(--transition)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke={input.trim() && !sending ? 'var(--bg)' : 'var(--muted)'}
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </form>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .tutor-sidebar {
            position: fixed !important;
            left: 0; top: 0; bottom: 0;
            z-index: 500 !important;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }
          .tutor-sidebar[style*="translateX(0)"] {
            transform: translateX(0) !important;
          }
          .tutor-menu-btn { display: flex !important; }
        }
      `}</style>
    </div>
  )
}
