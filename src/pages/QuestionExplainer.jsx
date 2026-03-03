import { useState, useRef, useEffect } from 'react'
import { useAuthStore } from '../stores/authStore'
import { sendTutorMessage } from '../lib/tutor'
import { createConversation } from '../lib/database'
import { renderContent } from '../lib/chatRenderer'

/* ── Design tokens (match existing app) ── */
const gold = '#F5C842'
const bg = '#07070F'
const bgLight = '#0E0E1A'
const cardBg = '#0C0C18'
const white = '#FAFAF9'
const muted = '#9B9BAD'
const border = 'rgba(255,255,255,0.06)'
const goldDim = 'rgba(245,200,66,0.15)'
const goldBorder = 'rgba(245,200,66,0.25)'
const green = '#34D399'
const red = '#F87171'
const transition = 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
const heading = "'Playfair Display', serif"
const bodyFont = "'DM Sans', sans-serif"

const categoryOptions = [
  { value: 'math', label: 'Math', color: '#818CF8' },
  { value: 'reading', label: 'Reading', color: '#34D399' },
  { value: 'writing', label: 'Writing / English', color: '#FBBF24' },
  { value: 'science', label: 'Science (ACT)', color: '#60A5FA' },
]

/* ── Typing indicator ── */
function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '8px 0' }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{
          width: 7, height: 7, borderRadius: '50%', background: muted,
          animation: `explainerBounce 1.2s ease-in-out ${i * 0.15}s infinite`,
        }} />
      ))}
      <style>{`
        @keyframes explainerBounce {
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
          background: goldDim, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          marginRight: 10, marginTop: 2,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
      )}
      <div style={{
        maxWidth: '80%', padding: '14px 18px',
        borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
        background: isUser ? goldDim : cardBg,
        border: isUser ? `1px solid ${goldBorder}` : `1px solid ${border}`,
        fontFamily: bodyFont, fontSize: '0.9rem',
        color: isUser ? white : 'rgba(250,250,249,0.9)',
      }}>
        {isUser ? (
          <p style={{ lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>{content}</p>
        ) : (
          renderContent(content)
        )}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   QUESTION EXPLAINER PAGE
   ══════════════════════════════════════════════════════════════════ */
export default function QuestionExplainer() {
  const user = useAuthStore((s) => s.user)
  const [question, setQuestion] = useState('')
  const [category, setCategory] = useState('math')
  const [messages, setMessages] = useState([])
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const [conversationId, setConversationId] = useState(null)
  const [followUp, setFollowUp] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const messagesEndRef = useRef(null)
  const followUpRef = useRef(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, sending])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const text = question.trim()
    if (!text || sending) return

    setSubmitted(true)
    setSending(true)
    setError(null)

    // Build the prompt that tells the AI to explain this question
    const explainPrompt = `A student has pasted a test question and needs help understanding it. Please analyze the question, identify the correct answer, and explain step-by-step WHY the correct answer is correct and why each wrong answer is wrong. Be thorough but clear.\n\nHere is the question:\n\n${text}`

    const userMsg = { role: 'user', content: text }
    setMessages([userMsg])

    try {
      // Create a new conversation for this explanation
      let convId = conversationId
      if (!convId) {
        const { data } = await createConversation(user.id, category)
        if (data) {
          convId = data.id
          setConversationId(data.id)
        }
      }

      if (!convId) {
        throw new Error('Failed to create conversation')
      }

      const response = await sendTutorMessage({
        conversationId: convId,
        message: explainPrompt,
        category,
        questionContext: { type: 'question_explainer', originalQuestion: text },
      })

      const assistantMsg = { role: 'assistant', content: response.message }
      setMessages(prev => [...prev, assistantMsg])
    } catch (err) {
      setError(err.message || 'Failed to get explanation. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const handleFollowUp = async (e) => {
    e.preventDefault()
    const text = followUp.trim()
    if (!text || sending || !conversationId) return

    setSending(true)
    setError(null)
    setFollowUp('')

    const userMsg = { role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])

    try {
      const response = await sendTutorMessage({
        conversationId,
        message: text,
        category,
      })
      const assistantMsg = { role: 'assistant', content: response.message }
      setMessages(prev => [...prev, assistantMsg])
    } catch (err) {
      setError(err.message || 'Failed to send follow-up. Please try again.')
    } finally {
      setSending(false)
      followUpRef.current?.focus()
    }
  }

  const handleReset = () => {
    setQuestion('')
    setMessages([])
    setConversationId(null)
    setSubmitted(false)
    setError(null)
    setFollowUp('')
  }

  return (
    <div style={{ maxWidth: 800 }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{
          fontFamily: heading, fontWeight: 800,
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          color: white, marginBottom: 8,
        }}>
          Question Explainer
        </h1>
        <p style={{
          fontFamily: bodyFont, fontSize: '0.95rem', color: muted,
          lineHeight: 1.7, maxWidth: 600,
        }}>
          Paste any SAT or ACT question and our AI tutor will explain the correct answer step-by-step. Perfect for reviewing practice tests or official materials.
        </p>
      </div>

      {/* Input form — shown when not yet submitted */}
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          {/* Category selector */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              fontFamily: bodyFont, fontSize: '0.85rem', fontWeight: 600,
              color: muted, marginBottom: 8, display: 'block',
            }}>
              Subject
            </label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {categoryOptions.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  style={{
                    padding: '8px 20px', borderRadius: 100, border: 'none',
                    cursor: 'pointer', fontFamily: bodyFont,
                    fontSize: '0.85rem', fontWeight: 600, transition,
                    background: category === cat.value ? cat.color + '22' : 'rgba(255,255,255,0.04)',
                    color: category === cat.value ? cat.color : muted,
                    outline: category === cat.value ? `1.5px solid ${cat.color}44` : '1.5px solid transparent',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question textarea */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              fontFamily: bodyFont, fontSize: '0.85rem', fontWeight: 600,
              color: muted, marginBottom: 8, display: 'block',
            }}>
              Paste or type your question below
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={"Paste the full question here, including all answer choices (A, B, C, D).\n\nExample:\nWhat is the value of x if 3x + 7 = 22?\nA) 3\nB) 5\nC) 7\nD) 15"}
              rows={10}
              style={{
                width: '100%', padding: '16px 18px', borderRadius: 12,
                background: cardBg, border: `1.5px solid ${border}`,
                fontFamily: bodyFont, fontSize: '0.9rem',
                color: white, outline: 'none', resize: 'vertical',
                lineHeight: 1.7, transition,
                minHeight: 200, boxSizing: 'border-box',
              }}
              onFocus={(e) => { e.target.style.borderColor = goldBorder }}
              onBlur={(e) => { e.target.style.borderColor = border }}
            />
          </div>

          {/* Tips */}
          <div style={{
            background: 'rgba(245,200,66,0.04)', border: `1px solid ${goldBorder}`,
            borderRadius: 10, padding: '14px 18px', marginBottom: 24,
          }}>
            <div style={{
              fontFamily: bodyFont, fontSize: '0.8rem', fontWeight: 600,
              color: gold, marginBottom: 6,
            }}>
              💡 Tips for best results
            </div>
            <ul style={{
              fontFamily: bodyFont, fontSize: '0.8rem', color: muted,
              lineHeight: 1.7, margin: 0, paddingLeft: 18,
            }}>
              <li>Include the full question text and all answer choices</li>
              <li>If there's a passage, include relevant parts of it</li>
              <li>You can paste multiple related questions at once</li>
              <li>After the explanation, ask follow-up questions if anything is unclear</li>
            </ul>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={!question.trim() || sending}
            style={{
              padding: '14px 32px', borderRadius: 100, border: 'none',
              cursor: question.trim() && !sending ? 'pointer' : 'default',
              fontFamily: bodyFont, fontWeight: 700, fontSize: '0.95rem',
              background: question.trim() ? gold : 'rgba(255,255,255,0.06)',
              color: question.trim() ? bg : muted,
              transition, display: 'flex', alignItems: 'center', gap: 10,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            {sending ? 'Analyzing...' : 'Explain This Question'}
          </button>
        </form>
      ) : (
        /* Conversation view — shown after submission */
        <div>
          {/* Reset button */}
          <button
            onClick={handleReset}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 16px', borderRadius: 100, border: `1.5px solid ${border}`,
              background: 'transparent', color: muted, cursor: 'pointer',
              fontFamily: bodyFont, fontSize: '0.85rem', fontWeight: 600,
              marginBottom: 20, transition,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            New Question
          </button>

          {/* Messages */}
          <div style={{
            background: bgLight, border: `1.5px solid ${border}`,
            borderRadius: 16, padding: '24px 20px',
            maxHeight: 'calc(100vh - 300px)', overflowY: 'auto',
            marginBottom: 16,
          }}>
            {messages.map((msg, i) => (
              <MessageBubble key={i} role={msg.role} content={msg.content} />
            ))}
            {sending && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 16 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                  background: goldDim, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div style={{
                  padding: '12px 16px', borderRadius: '16px 16px 16px 4px',
                  background: cardBg, border: `1px solid ${border}`,
                }}>
                  <TypingIndicator />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Error banner */}
          {error && (
            <div style={{
              padding: '10px 14px', borderRadius: 8, marginBottom: 12,
              background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)',
              fontFamily: bodyFont, fontSize: '0.85rem', color: red,
            }}>
              {error}
            </div>
          )}

          {/* Follow-up input */}
          {!sending && messages.length >= 2 && (
            <form
              onSubmit={handleFollowUp}
              style={{ display: 'flex', gap: 10 }}
            >
              <input
                ref={followUpRef}
                type="text"
                value={followUp}
                onChange={(e) => setFollowUp(e.target.value)}
                placeholder="Ask a follow-up question..."
                style={{
                  flex: 1, padding: '12px 18px', borderRadius: 100,
                  background: cardBg, border: `1.5px solid ${border}`,
                  fontFamily: bodyFont, fontSize: '0.9rem',
                  color: white, outline: 'none', transition,
                }}
                onFocus={(e) => { e.target.style.borderColor = goldBorder }}
                onBlur={(e) => { e.target.style.borderColor = border }}
              />
              <button
                type="submit"
                disabled={!followUp.trim() || sending}
                style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: followUp.trim() ? gold : 'rgba(255,255,255,0.06)',
                  border: 'none', cursor: followUp.trim() ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, transition,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke={followUp.trim() ? bg : muted}
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}
