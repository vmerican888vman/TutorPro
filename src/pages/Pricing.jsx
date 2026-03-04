import { Link } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { createCheckoutSession } from '../lib/stripe-client'
import { validatePromoCode } from '../lib/database'
import { useState } from 'react'

const gold = '#F5C842'
const bg = '#07070F'

const MONTHLY_PRICE = 39
const YEARLY_TOTAL = 374
const YEARLY_MONTHLY = Math.round(YEARLY_TOTAL / 12)
const YEARLY_SAVINGS = MONTHLY_PRICE * 12 - YEARLY_TOTAL

function CheckIcon({ color = '#34D399' }) {
  return <span style={{ color, fontWeight: 700, marginRight: 8, fontSize: '1.1rem' }}>&#10003;</span>
}

export default function Pricing() {
  const { user, isPro } = useAuthStore()
  const [loadingPlan, setLoadingPlan] = useState(null)
  const [promoOpen, setPromoOpen] = useState(false)
  const [promoInput, setPromoInput] = useState('')
  const [promoStatus, setPromoStatus] = useState(null) // null | { valid, discountPercent, code } | { valid: false }
  const [promoLoading, setPromoLoading] = useState(false)

  const handleApplyPromo = async () => {
    if (!promoInput.trim()) return
    setPromoLoading(true)
    try {
      const result = await validatePromoCode(promoInput.trim())
      setPromoStatus(result)
    } catch {
      setPromoStatus({ valid: false })
    }
    setPromoLoading(false)
  }

  const handleClearPromo = () => {
    setPromoStatus(null)
    setPromoInput('')
  }

  const appliedDiscount = promoStatus?.valid ? promoStatus.discountPercent : 0
  const discountedMonthly = appliedDiscount ? Math.round(MONTHLY_PRICE * (1 - appliedDiscount / 100)) : MONTHLY_PRICE
  const discountedYearly = appliedDiscount ? Math.round(YEARLY_TOTAL * (1 - appliedDiscount / 100)) : YEARLY_TOTAL

  const handleStartPro = async (plan) => {
    if (!user) {
      window.location.href = '/signup'
      return
    }
    setLoadingPlan(plan)
    try {
      const priceId = plan === 'yearly'
        ? import.meta.env.VITE_STRIPE_YEARLY_PRICE_ID
        : import.meta.env.VITE_STRIPE_PRICE_ID
      await createCheckoutSession(priceId, promoStatus?.valid ? promoStatus.code : null)
    } catch {
      setLoadingPlan(null)
    }
  }

  const proFeatures = [
    'Unlimited AI tutoring sessions',
    'Full-length practice tests',
    'Personalized study plans',
    'Performance analytics',
    'SAT + ACT coverage',
    '24/7 availability',
    '7-day money-back guarantee',
  ]

  return (
    <div style={{
      minHeight: '100vh', padding: '80px 24px 80px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <div style={{ maxWidth: 1100, width: '100%', textAlign: 'center' }}>
        {/* Header */}
        <h1 style={{
          fontFamily: 'var(--font-heading)', fontWeight: 800,
          fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: 'var(--white)', marginBottom: 12,
        }}>
          Your 7-day free trial{' '}
          <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>has ended</span>
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--muted)',
          maxWidth: 480, margin: '0 auto 48px',
        }}>
          Subscribe to keep full access to AI tutoring, practice tests, and progress tracking.
        </p>

        {/* 2 Cards */}
        <div className="pricing-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 24, maxWidth: 720, margin: '0 auto',
        }}>
          {/* ── Pro Monthly ── */}
          <div style={{
            background: 'var(--card-bg)', border: '1.5px solid var(--gold-border)',
            borderRadius: 14, padding: '36px 28px', textAlign: 'left',
            position: 'relative', display: 'flex', flexDirection: 'column',
          }}>
            <div style={{
              position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
              background: gold, color: bg, fontSize: '0.75rem', fontWeight: 700,
              fontFamily: 'var(--font-body)', padding: '4px 16px', borderRadius: 100,
              textTransform: 'uppercase', letterSpacing: 1, whiteSpace: 'nowrap',
            }}>
              Most popular
            </div>
            <div style={{
              fontFamily: 'var(--font-body)', fontWeight: 600,
              fontSize: '1rem', color: gold, marginBottom: 4,
            }}>
              Pro Monthly
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
              {appliedDiscount > 0 && (
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: '1.2rem',
                  color: 'var(--muted)', textDecoration: 'line-through', marginRight: 4,
                }}>
                  ${MONTHLY_PRICE}
                </span>
              )}
              <span style={{
                fontFamily: 'var(--font-heading)', fontWeight: 800,
                fontSize: '2.5rem', color: 'var(--white)',
              }}>
                ${discountedMonthly}
              </span>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--muted)',
              }}>
                /month
              </span>
            </div>
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: '0.9rem',
              color: 'var(--muted)', marginBottom: 28,
            }}>
              Everything you need to improve
            </div>
            <div style={{ flex: 1 }}>
              {[...proFeatures, 'Cancel anytime'].map((f) => (
                <div key={f} style={{
                  display: 'flex', alignItems: 'center', marginBottom: 12,
                  fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--muted)',
                }}>
                  <CheckIcon color={gold} />
                  {f}
                </div>
              ))}
            </div>
            <button
              onClick={() => handleStartPro('monthly')}
              disabled={loadingPlan || isPro()}
              style={{
                display: 'block', width: '100%', textAlign: 'center', marginTop: 28,
                padding: '14px 24px', borderRadius: 100, fontWeight: 700,
                fontSize: '0.95rem', fontFamily: 'var(--font-body)',
                background: isPro() ? 'var(--muted)' : gold,
                color: bg, border: 'none', cursor: isPro() ? 'default' : 'pointer',
                transition: 'var(--transition)',
                opacity: loadingPlan === 'monthly' ? 0.6 : 1,
              }}
            >
              {isPro() ? 'Current Plan' : loadingPlan === 'monthly' ? 'Loading...' : `Start Pro — $${discountedMonthly}/mo`}
            </button>
          </div>

          {/* ── Pro Yearly ── */}
          <div style={{
            background: 'var(--card-bg)', border: '1.5px solid rgba(52,211,153,0.35)',
            borderRadius: 14, padding: '36px 28px', textAlign: 'left',
            position: 'relative', display: 'flex', flexDirection: 'column',
          }}>
            <div style={{
              position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
              background: '#34D399', color: bg, fontSize: '0.75rem', fontWeight: 700,
              fontFamily: 'var(--font-body)', padding: '4px 16px', borderRadius: 100,
              textTransform: 'uppercase', letterSpacing: 1, whiteSpace: 'nowrap',
            }}>
              Save 20%
            </div>
            <div style={{
              fontFamily: 'var(--font-body)', fontWeight: 600,
              fontSize: '1rem', color: '#34D399', marginBottom: 4,
            }}>
              Pro Yearly
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '1.2rem',
                color: 'var(--muted)', textDecoration: 'line-through', marginRight: 4,
              }}>
                ${appliedDiscount > 0 ? YEARLY_TOTAL : MONTHLY_PRICE * 12}
              </span>
              <span style={{
                fontFamily: 'var(--font-heading)', fontWeight: 800,
                fontSize: '2.5rem', color: 'var(--white)',
              }}>
                ${discountedYearly}
              </span>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--muted)',
              }}>
                /year
              </span>
            </div>
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: '0.9rem',
              color: '#34D399', marginBottom: 28, fontWeight: 600,
            }}>
              ${Math.round(discountedYearly / 12)}/mo &middot; Save ${MONTHLY_PRICE * 12 - discountedYearly}/year
            </div>
            <div style={{ flex: 1 }}>
              {[...proFeatures, 'Paid in full — best value'].map((f) => (
                <div key={f} style={{
                  display: 'flex', alignItems: 'center', marginBottom: 12,
                  fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--muted)',
                }}>
                  <CheckIcon color="#34D399" />
                  {f}
                </div>
              ))}
            </div>
            <button
              onClick={() => handleStartPro('yearly')}
              disabled={loadingPlan || isPro()}
              style={{
                display: 'block', width: '100%', textAlign: 'center', marginTop: 28,
                padding: '14px 24px', borderRadius: 100, fontWeight: 700,
                fontSize: '0.95rem', fontFamily: 'var(--font-body)',
                background: isPro() ? 'var(--muted)' : '#34D399',
                color: bg, border: 'none', cursor: isPro() ? 'default' : 'pointer',
                transition: 'var(--transition)',
                opacity: loadingPlan === 'yearly' ? 0.6 : 1,
              }}
            >
              {isPro() ? 'Current Plan' : loadingPlan === 'yearly' ? 'Loading...' : `Start Pro — $${discountedYearly}/yr`}
            </button>
          </div>
        </div>

        {/* Promo Code Section */}
        <div style={{ maxWidth: 420, margin: '32px auto 0' }}>
          {!promoOpen ? (
            <button
              onClick={() => setPromoOpen(true)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                color: 'var(--muted)', textDecoration: 'underline',
              }}
            >
              Have a promo code?
            </button>
          ) : (
            <div style={{
              background: 'var(--card-bg)', border: '1.5px solid var(--border)',
              borderRadius: 12, padding: '16px 20px',
            }}>
              {promoStatus?.valid ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#34D399', fontWeight: 700, fontSize: '1.1rem' }}>&#10003;</span>
                    <span style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                      color: '#34D399', fontWeight: 600,
                    }}>
                      {promoStatus.discountPercent}% off applied!
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                      color: 'var(--muted)', background: 'rgba(255,255,255,0.05)',
                      padding: '2px 8px', borderRadius: 4,
                    }}>
                      {promoStatus.code}
                    </span>
                  </div>
                  <button
                    onClick={handleClearPromo}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                      color: 'var(--muted)', textDecoration: 'underline',
                    }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => { setPromoInput(e.target.value); setPromoStatus(null) }}
                      onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                      placeholder="Enter promo code"
                      style={{
                        flex: 1, background: 'rgba(255,255,255,0.05)',
                        border: `1.5px solid ${promoStatus && !promoStatus.valid ? '#ef4444' : 'var(--border)'}`,
                        borderRadius: 8, padding: '10px 14px',
                        fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                        color: 'var(--white)', outline: 'none',
                        textTransform: 'uppercase',
                      }}
                    />
                    <button
                      onClick={handleApplyPromo}
                      disabled={promoLoading || !promoInput.trim()}
                      style={{
                        padding: '10px 20px', borderRadius: 8, border: 'none',
                        background: gold, color: bg, fontWeight: 700,
                        fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                        cursor: promoLoading || !promoInput.trim() ? 'default' : 'pointer',
                        opacity: promoLoading || !promoInput.trim() ? 0.5 : 1,
                      }}
                    >
                      {promoLoading ? '...' : 'Apply'}
                    </button>
                  </div>
                  {promoStatus && !promoStatus.valid && (
                    <p style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                      color: '#ef4444', marginTop: 8, marginBottom: 0,
                    }}>
                      Invalid or expired promo code
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Responsive: stack on mobile */}
        <style>{`
          @media (max-width: 768px) {
            .pricing-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>

        {/* Back link */}
        <div style={{ marginTop: 40 }}>
          <Link to="/" style={{
            fontFamily: 'var(--font-body)', fontSize: '0.9rem',
            color: 'var(--muted)', textDecoration: 'underline',
          }}>
            &larr; Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
