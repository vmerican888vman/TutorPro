import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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

    // Use service role for cross-user reads
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

    const { action, params } = await req.json()

    let result: unknown

    switch (action) {
      case 'users': {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, email, full_name, subscription_status, role, created_at, stripe_customer_id')
          .order('created_at', { ascending: false })
        if (error) throw error
        result = data
        break
      }

      case 'discount-codes': {
        const { data, error } = await supabase
          .from('discount_codes')
          .select('*')
          .order('created_at', { ascending: false })
        if (error) throw error
        result = data
        break
      }

      case 'stats': {
        // Total users
        const { count: totalUsers } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })

        // Pro users
        const { count: proUsers } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('subscription_status', 'pro')

        // Active discount codes
        const { count: activeCodes } = await supabase
          .from('discount_codes')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true)

        // Total code uses
        const { data: codeStats } = await supabase
          .from('discount_codes')
          .select('times_used')
        const totalCodeUses = (codeStats || []).reduce((sum: number, c: { times_used: number }) => sum + (c.times_used || 0), 0)

        result = { totalUsers, proUsers, activeCodes, totalCodeUses }
        break
      }

      case 'toggle-code': {
        const { codeId, isActive } = params || {}
        if (!codeId) throw new Error('Missing codeId')
        const { error } = await supabase
          .from('discount_codes')
          .update({ is_active: isActive })
          .eq('id', codeId)
        if (error) throw error
        result = { success: true }
        break
      }

      default:
        throw new Error(`Unknown action: ${action}`)
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
