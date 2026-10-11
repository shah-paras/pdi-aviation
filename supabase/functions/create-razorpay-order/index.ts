// Supabase Edge Function: create a one-time Razorpay order for lifetime access.
// Request: POST {} — amount and tier are fixed server-side, never trusted from the client.
// Requires: RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET.
// Optional: LIFETIME_PRICE_INR (defaults to 999) — change the price without a redeploy.
import { serve } from 'https://deno.land/std@0.208.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { corsHeaders } from '../_shared/cors.ts';

const LIFETIME_TIER = 'insider';
const DEFAULT_PRICE_INR = 999;

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

    // Block double purchases — RLS lets users read their own row.
    const { data: existing } = await userClient
      .from('subscriptions')
      .select('status, tier')
      .eq('user_id', user.id)
      .maybeSingle();
    if (existing?.status === 'active' && existing?.tier === LIFETIME_TIER) {
      return json({ error: 'You already have lifetime access' }, 409);
    }

    const priceInr = Number(Deno.env.get('LIFETIME_PRICE_INR') ?? DEFAULT_PRICE_INR);
    if (!Number.isFinite(priceInr) || priceInr <= 0) return json({ error: 'Price not configured' }, 500);

    const keyId = Deno.env.get('RAZORPAY_KEY_ID') ?? '';
    const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET') ?? '';
    const auth = btoa(`${keyId}:${keySecret}`);

    const res = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Basic ${auth}` },
      body: JSON.stringify({
        amount: Math.round(priceInr * 100), // paise
        currency: 'INR',
        receipt: `lt_${user.id.slice(0, 8)}_${Date.now()}`, // max 40 chars
        notes: { user_id: user.id, tier: LIFETIME_TIER, plan: 'lifetime' },
      }),
    });

    const data = await res.json();
    if (!res.ok) return json({ error: data?.error?.description ?? 'Razorpay error' }, res.status);

    return json({ order_id: data.id, amount: data.amount, currency: data.currency });
  } catch (err) {
    return json({ error: (err as Error).message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
