# Supabase Setup Guide

## 1. Create Supabase Project

1. Go to https://supabase.com and create a new project
2. Note your **Project URL** and **anon public key** from Settings → API

## 2. Run Database Migration

1. Go to SQL Editor in the Supabase Dashboard
2. Copy and paste the contents of `migrations/001_initial_schema.sql`
3. Click "Run" to create all tables, RLS policies, triggers, and indexes

## 3. Configure Auth

### Email/Password
- Enabled by default in Supabase

### Google OAuth (optional)
1. Go to Authentication → Providers → Google
2. Enable Google provider
3. Add your Google OAuth Client ID and Secret
4. Set redirect URL to: `https://tutorpro.ai/dashboard`

## 4. Set Environment Variables

### Frontend (.env)
```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here
VITE_STRIPE_PRICE_ID=price_your_pro_plan_price_id
```

### Edge Functions (set via Supabase Dashboard → Edge Functions → Secrets)
```
STRIPE_SECRET_KEY=sk_live_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
ANTHROPIC_API_KEY=sk-ant-your_key_here
```

## 5. Deploy Edge Functions

```bash
supabase functions deploy create-checkout
supabase functions deploy stripe-webhook
supabase functions deploy verify-session
supabase functions deploy customer-portal
supabase functions deploy tutor-chat
```

## 6. Configure Stripe Webhook

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://YOUR_PROJECT.supabase.co/functions/v1/stripe-webhook`
3. Listen for events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Copy the webhook signing secret to the `STRIPE_WEBHOOK_SECRET` env var
