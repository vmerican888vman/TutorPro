import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@13?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2023-10-16' })
const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  const body = await req.text()

  console.log('Webhook received, signature present:', !!signature)
  console.log('Webhook secret present:', !!webhookSecret)
  console.log('Body length:', body.length)

  if (!signature) {
    return new Response(`Webhook Error: No stripe-signature header value was provided.`, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  console.log('Webhook event verified:', event.type)

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.subscription
        ? (await stripe.subscriptions.retrieve(session.subscription as string)).metadata.supabase_user_id
        : null

      if (userId) {
        await supabase
          .from('profiles')
          .update({
            subscription_status: 'pro',
            subscription_id: session.subscription as string,
            stripe_customer_id: session.customer as string,
          })
          .eq('id', userId)

        // Track discount code usage if a promo code was applied
        const discountCodeId = session.metadata?.discount_code_id
        if (discountCodeId) {
          console.log(`Tracking discount code usage: ${discountCodeId} for user ${userId}`)

          // Insert usage record
          await supabase.from('discount_code_usage').insert({
            discount_code_id: discountCodeId,
            user_id: userId,
            user_email: session.customer_details?.email || null,
            stripe_session_id: session.id,
          })

          // Increment usage count
          await supabase.rpc('increment_discount_uses', { code_id: discountCodeId })
        }
      }
      break
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      const userId = subscription.metadata.supabase_user_id
      if (userId) {
        const status = subscription.status === 'active' ? 'pro' : 'cancelled'
        await supabase
          .from('profiles')
          .update({
            subscription_status: status,
            subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString(),
          })
          .eq('id', userId)
      }
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      const userId = subscription.metadata.supabase_user_id
      if (userId) {
        await supabase
          .from('profiles')
          .update({
            subscription_status: 'cancelled',
            subscription_id: null,
            subscription_end_date: new Date().toISOString(),
          })
          .eq('id', userId)
      }
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      const subscriptionId = invoice.subscription as string
      if (subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId)
        const userId = subscription.metadata.supabase_user_id
        if (userId) {
          // Keep status as pro but the next webhook for subscription.updated
          // will handle the actual status change if Stripe cancels
          console.log(`Payment failed for user ${userId}, subscription ${subscriptionId}`)
        }
      }
      break
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
