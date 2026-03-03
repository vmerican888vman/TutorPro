import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@13?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2023-10-16' })

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Authenticate caller
    const supabaseAuth = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )
    const { data: { user } } = await supabaseAuth.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    // Use service role for admin checks and writes
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Verify admin role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      throw new Error('Unauthorized: admin access required')
    }

    const { code, affiliateName, affiliateEmail, discountPercent, commissionPercent, maxUses, expiresAt } = await req.json()

    if (!code || !affiliateName || !discountPercent) {
      throw new Error('Missing required fields: code, affiliateName, discountPercent')
    }

    // 1. Create Stripe Coupon
    const coupon = await stripe.coupons.create({
      percent_off: discountPercent,
      duration: 'once',
      name: `${affiliateName} - ${code}`,
    })

    // 2. Create Stripe Promotion Code (user-facing code)
    const promoCode = await stripe.promotionCodes.create({
      coupon: coupon.id,
      code: code.toUpperCase(),
      ...(maxUses ? { max_redemptions: maxUses } : {}),
      ...(expiresAt ? { expires_at: Math.floor(new Date(expiresAt).getTime() / 1000) } : {}),
    })

    // 3. Save to database
    const { data: discountCode, error: dbError } = await supabase
      .from('discount_codes')
      .insert({
        code: code.toUpperCase(),
        affiliate_name: affiliateName,
        affiliate_email: affiliateEmail || null,
        discount_percent: discountPercent,
        commission_percent: commissionPercent || 0,
        max_uses: maxUses || null,
        expires_at: expiresAt || null,
        stripe_coupon_id: coupon.id,
        stripe_promotion_code_id: promoCode.id,
      })
      .select()
      .single()

    if (dbError) throw new Error(`Database error: ${dbError.message}`)

    return new Response(JSON.stringify({ discountCode }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
