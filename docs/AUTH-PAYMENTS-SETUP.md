# Auth + Payments Setup Guide

This guide walks through the external infra setup required to make the auth, subscription, and payment flows work end-to-end. Code is already scaffolded — the steps below are all account creation, key exchange, and deploy.

## Overview

- **Auth + DB + Backend**: Supabase (one project handles all three)
- **Payments (India)**: Razorpay — invoked from the Pricing page when the user selects "India"
- **Payments (global)**: Stripe — invoked when user selects "Other"
- **Frontend gate**: routes `/AircraftComparison`, `/RangeMap`, `/FinanceCalculator`, `/FleetDirectory` redirect to `/Pricing` unless the user has an active subscription

## 1. Supabase project

1. Go to https://supabase.com → **New project**. Pick a region close to your users (Mumbai for India).
2. Save the connection details — you'll need:
   - Project URL → `VITE_SUPABASE_URL`
   - `anon` public key → `VITE_SUPABASE_ANON_KEY`
   - `service_role` key (keep server-side only) → `SUPABASE_SERVICE_ROLE_KEY`
3. Run the schema:
   - Open **SQL Editor** → paste `supabase/migrations/0001_init.sql` → Run
   - Then paste `supabase/migrations/0002_add_tier.sql` → Run (adds `tier` column to subscriptions)
   - Confirm `public.profiles` and `public.subscriptions` exist with RLS enabled

## 2. Auth providers

In Supabase Dashboard → **Authentication → Providers**:

1. **Email** — leave enabled. Toggle "Confirm email" ON for production, OFF for quicker local testing.
2. **Google** — enable and paste:
   - A Google OAuth client ID + secret (create in Google Cloud Console → APIs & Services → Credentials → OAuth client ID → Web application)
   - Authorized redirect URI in Google Console: `https://<project>.supabase.co/auth/v1/callback`
   - Add your site URL to **Authentication → URL Configuration → Site URL** (e.g. `http://localhost:3000` in dev, your prod URL in prod) and to **Redirect URLs** (`http://localhost:3000/**`, etc.)

## 3. Stripe setup (global payments)

1. https://dashboard.stripe.com → create account (test mode is fine to start)
2. **Products → + Add product** — create 3 products with recurring prices:
   - **Enthusiast**: Monthly ($2.49) → `STRIPE_PRICE_ENTHUSIAST_MONTHLY`, Annual ($23.99) → `STRIPE_PRICE_ENTHUSIAST_ANNUAL`
   - **Insider**: Monthly ($5.99) → `STRIPE_PRICE_INSIDER_MONTHLY`, Annual ($59.99) → `STRIPE_PRICE_INSIDER_ANNUAL`
   - **Superfan**: Monthly ($11.99) → `STRIPE_PRICE_SUPERFAN_MONTHLY`, Annual ($119.99) → `STRIPE_PRICE_SUPERFAN_ANNUAL`
3. **Developers → API keys**:
   - Publishable key → `VITE_STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY` (server-side only)
4. **Developers → Webhooks → Add endpoint**:
   - URL: `https://<project>.supabase.co/functions/v1/stripe-webhook`
   - Events: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`
   - After creating, copy the **Signing secret** → `STRIPE_WEBHOOK_SECRET`
5. Enable the **Customer Portal** in Settings → Billing → Customer portal (so `/Account` → "Manage billing" works).

## 4. Razorpay setup (India payments)

1. https://dashboard.razorpay.com → sign up → complete KYC
2. **Subscriptions → Plans → Create Plan** — create 6 plans (3 tiers × 2 billing cycles):
   - **Enthusiast Monthly** (₹199/mo) → `RAZORPAY_PLAN_ENTHUSIAST_MONTHLY`
   - **Enthusiast Annual** (₹1,990/yr) → `RAZORPAY_PLAN_ENTHUSIAST_ANNUAL`
   - **Insider Monthly** (₹499/mo) → `RAZORPAY_PLAN_INSIDER_MONTHLY`
   - **Insider Annual** (₹4,990/yr) → `RAZORPAY_PLAN_INSIDER_ANNUAL`
   - **Superfan Monthly** (₹999/mo) → `RAZORPAY_PLAN_SUPERFAN_MONTHLY`
   - **Superfan Annual** (₹9,990/yr) → `RAZORPAY_PLAN_SUPERFAN_ANNUAL`
3. **Account & Settings → API Keys → Generate Key**:
   - Key ID → `VITE_RAZORPAY_KEY_ID`
   - Key Secret → `RAZORPAY_KEY_SECRET` (server-side only)
4. **Account & Settings → Webhooks → Add**:
   - URL: `https://<project>.supabase.co/functions/v1/razorpay-webhook`
   - Secret: generate one and record it → `RAZORPAY_WEBHOOK_SECRET`
   - Events: `subscription.activated`, `subscription.charged`, `subscription.cancelled`, `subscription.completed`, `subscription.halted`, `subscription.pending`

## 5. Deploy Edge Functions

Install the Supabase CLI once: `brew install supabase/tap/supabase` (or npm).

```bash
# Link this repo to your Supabase project (one-time)
supabase link --project-ref <your-project-ref>

# Set all server-side secrets (one-time per environment)
supabase secrets set \
  SUPABASE_SERVICE_ROLE_KEY=... \
  STRIPE_SECRET_KEY=sk_test_... \
  STRIPE_WEBHOOK_SECRET=whsec_... \
  STRIPE_PRICE_ENTHUSIAST_MONTHLY=price_... \
  STRIPE_PRICE_ENTHUSIAST_ANNUAL=price_... \
  STRIPE_PRICE_INSIDER_MONTHLY=price_... \
  STRIPE_PRICE_INSIDER_ANNUAL=price_... \
  STRIPE_PRICE_SUPERFAN_MONTHLY=price_... \
  STRIPE_PRICE_SUPERFAN_ANNUAL=price_... \
  RAZORPAY_KEY_ID=rzp_test_... \
  RAZORPAY_KEY_SECRET=... \
  RAZORPAY_WEBHOOK_SECRET=... \
  RAZORPAY_PLAN_ENTHUSIAST_MONTHLY=plan_SfQbvrAx9RSBd0 \
  RAZORPAY_PLAN_ENTHUSIAST_ANNUAL=plan_... \
  RAZORPAY_PLAN_INSIDER_MONTHLY=plan_SfQcjPTbNlXnVc \
  RAZORPAY_PLAN_INSIDER_ANNUAL=plan_... \
  RAZORPAY_PLAN_SUPERFAN_MONTHLY=plan_SfQdtEpUHuSltp \
  RAZORPAY_PLAN_SUPERFAN_ANNUAL=plan_... \
  SITE_URL=http://localhost:3000

# Deploy all functions
supabase functions deploy create-stripe-checkout
supabase functions deploy create-stripe-portal
supabase functions deploy stripe-webhook --no-verify-jwt   # webhooks must be public
supabase functions deploy create-razorpay-order
supabase functions deploy razorpay-webhook --no-verify-jwt
```

Re-run `supabase functions deploy <name>` whenever the function code changes.

## 6. Frontend env vars

Copy `.env.example` → `.env.local` and fill the `VITE_*` values.

```bash
cp .env.example .env.local
# edit .env.local
npm run dev
```

Only `VITE_*` vars reach the browser; everything else must stay in `supabase secrets`.

## 7. End-to-end test

### Stripe (international flow)
1. Visit `/Pricing`, select "Other" as country.
2. Click Subscribe on any tier (Enthusiast / Insider / Superfan) → redirects to Stripe Checkout.
3. Use test card `4242 4242 4242 4242`, any future expiry, any CVC.
4. Complete checkout → you land back on the next route.
5. Check Supabase → `subscriptions` table → row with `status='active'`, `provider='stripe'`, correct `tier`.
6. Visit `/FinanceCalculator` — should render (gate lifts).
7. On `/Account` — badge shows tier name (e.g. "Enthusiast") with tier-specific color. Click "Manage billing" → Stripe Customer Portal.

### Razorpay (India flow)
1. Visit `/Pricing`, select "India".
2. Click Subscribe on any tier → Razorpay modal opens.
3. Use test card `4111 1111 1111 1111`, CVV `100`, any future expiry, or test UPI `success@razorpay`.
4. Complete payment → modal closes.
5. Wait for webhook → `subscriptions` row updates to `status='active'`, `provider='razorpay'`, correct `tier`.
6. Gated routes unlock. `/Account` shows correct tier badge.

### Tier testing matrix

Test each combination to ensure correct plan ID mapping and webhook processing:

| Tier | Billing | Razorpay Plan ID | Stripe Price ID |
|------|---------|-----------------|-----------------|
| Enthusiast | Monthly | `plan_SfQbvrAx9RSBd0` | `STRIPE_PRICE_ENTHUSIAST_MONTHLY` |
| Enthusiast | Annual | `RAZORPAY_PLAN_ENTHUSIAST_ANNUAL` | `STRIPE_PRICE_ENTHUSIAST_ANNUAL` |
| Insider | Monthly | `plan_SfQcjPTbNlXnVc` | `STRIPE_PRICE_INSIDER_MONTHLY` |
| Insider | Annual | `RAZORPAY_PLAN_INSIDER_ANNUAL` | `STRIPE_PRICE_INSIDER_ANNUAL` |
| Superfan | Monthly | `plan_SfQdtEpUHuSltp` | `STRIPE_PRICE_SUPERFAN_MONTHLY` |
| Superfan | Annual | `RAZORPAY_PLAN_SUPERFAN_ANNUAL` | `STRIPE_PRICE_SUPERFAN_ANNUAL` |

For each row: subscribe → verify `subscriptions.tier` in Supabase → verify tool page access → verify `/Account` badge.

### Negative tests
1. In SQL editor: `update public.subscriptions set status='canceled' where user_id='<you>';`
2. Visit `/FinanceCalculator` → you should be bounced to `/Pricing`.
3. Sign out → gated routes bounce to `/Login`.
4. Subscribe as Enthusiast → verify Insider/Superfan features remain locked (future feature gating).

## 8. Production deploy

- Set the same env vars on Vercel (or Netlify/CF Pages).
- Set `SITE_URL` in Supabase secrets to the prod domain.
- Add the prod domain to Supabase **Authentication → URL Configuration → Site URL + Redirect URLs**.
- Add the prod domain to Google OAuth client → Authorized JavaScript origins + redirect URIs.
- Switch Stripe and Razorpay from test mode → live mode (new keys + new webhook URLs).

## Troubleshooting

- **"Missing auth" from Edge Functions** — browser session isn't sending JWT. Confirm `supabase.auth.getSession()` returns a session before calling `supabase.functions.invoke()`.
- **Webhook 400 "Bad signature"** — wrong `STRIPE_WEBHOOK_SECRET` / `RAZORPAY_WEBHOOK_SECRET` in secrets, or webhook URL points to the wrong function.
- **Row not updating after checkout** — check Edge Function logs in Supabase Dashboard → Functions → Logs.
- **Google sign-in redirects to `localhost` in prod** — Site URL in Supabase Auth → URL Configuration is still set to localhost.
