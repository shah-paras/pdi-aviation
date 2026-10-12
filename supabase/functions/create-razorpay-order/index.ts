// Supabase Edge Function: start checkout for the current membership offer.
// Request: POST {} — the offer (and its price) is decided server-side, never by the client.
//   • Founding offer open  → one-time Razorpay Order for lifetime access.
//     Response: { mode: 'order', order_id, amount, currency }
//   • Founding offer closed → Razorpay Subscription on the yearly plan.
//     Response: { mode: 'subscription', subscription_id }
// Requires: RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_PLAN_ANNUAL (₹999/yr plan).
// Optional: FOUNDING_LIMIT (500), LIFETIME_PRICE_INR (999).
import { serve } from 'https://deno.land/std@0.208.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { corsHeaders } from '../_shared/cors.ts';
import { getOffer, MEMBER_TIER } from '../_shared/offer.ts';

// Razorpay requires a finite cycle count; 10 yearly renewals.
const ANNUAL_TOTAL_COUNT = 10;

const admin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'Missing auth' }, 401);

    const userClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: userRes, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userRes.user) return json({ error: 'Unauthenticated' }, 401);
    const user = userRes.user;

    // Block double purchases — lifetime and annual members already have full access.
    const { data: existing } = await admin
      .from('subscriptions')
      .select('status, tier')
      .eq('user_id', user.id)
      .maybeSingle();
    if (existing?.status === 'active' && existing?.tier === MEMBER_TIER) {
      return json({ error: 'You already have full access' }, 409);
    }

    const offer = await getOffer(admin);
    const auth = btoa(`${Deno.env.get('RAZORPAY_KEY_ID') ?? ''}:${Deno.env.get('RAZORPAY_KEY_SECRET') ?? ''}`);

    if (offer.kind === 'lifetime') {
      const data = await razorpay('orders', auth, {
        amount: Math.round(offer.lifetimePriceInr * 100), // paise
        currency: 'INR',
        receipt: `lt_${user.id.slice(0, 8)}_${Date.now()}`, // max 40 chars
        notes: { user_id: user.id, tier: MEMBER_TIER, plan: 'lifetime' },
      });
      return json({ mode: 'order', order_id: data.id, amount: data.amount, currency: data.currency });
    }

    const planId = Deno.env.get('RAZORPAY_PLAN_ANNUAL');
    if (!planId) return json({ error: 'Annual plan not configured' }, 500);

    const data = await razorpay('subscriptions', auth, {
      plan_id: planId,
      total_count: ANNUAL_TOTAL_COUNT,
      customer_notify: 1,
      notes: { user_id: user.id, tier: MEMBER_TIER, billing: 'annual' },
    });
    return json({ mode: 'subscription', subscription_id: data.id });
  } catch (err) {
    const status = err instanceof RazorpayError ? err.status : 500;
    return json({ error: (err as Error).message }, status);
  }
});

class RazorpayError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

async function razorpay(resource: 'orders' | 'subscriptions', auth: string, body: unknown) {
  const res = await fetch(`https://api.razorpay.com/v1/${resource}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Basic ${auth}` },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new RazorpayError(data?.error?.description ?? 'Razorpay error', res.status);
  return data;
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
