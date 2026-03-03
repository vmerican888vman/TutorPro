import { supabase } from './supabase'

/**
 * Create a Stripe Checkout session and redirect the user.
 */
export async function createCheckoutSession(priceId, promotionCode = null) {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error('Not authenticated')

  const body = { priceId }
  if (promotionCode) body.promotionCode = promotionCode

  const response = await supabase.functions.invoke('create-checkout', {
    body,
  })

  if (response.error) throw new Error(response.error.message)

  const { url } = response.data
  if (url) {
    window.location.href = url
  }
}

/**
 * Verify a Stripe Checkout session after redirect.
 */
export async function verifyCheckoutSession(sessionId) {
  const response = await supabase.functions.invoke('verify-session', {
    body: { sessionId },
  })

  if (response.error) throw new Error(response.error.message)
  return response.data
}

/**
 * Open the Stripe Customer Portal for subscription management.
 */
export async function openCustomerPortal() {
  const response = await supabase.functions.invoke('customer-portal', {
    body: {},
  })

  if (response.error) throw new Error(response.error.message)

  const { url } = response.data
  if (url) {
    window.location.href = url
  }
}
