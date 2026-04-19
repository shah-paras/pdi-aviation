// Supabase Edge Function: create a Razorpay subscription for the current user.
// Request: POST { billing: 'monthly' | 'annual', tier: 'enthusiast' | 'insider' | 'superfan' }
// Requires: RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET,
//   RAZORPAY_PLAN_<TIER>_<BILLING> env vars (e.g. RAZORPAY_PLAN_ENTHUSIAST_MONTHLY).
import { serve } from 'https://deno.land/std@0.208.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { corsHeaders } from '../_shared/cors.ts';

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

    const { billing = 'monthly', tier = 'enthusiast' } = await req.json().catch(() => ({}));
    const validTiers = ['enthusiast', 'insider', 'superfan'];
    if (!validTiers.includes(tier)) return json({ error: 'Invalid tier' }, 400);

    const planId = Deno.env.get(`RAZORPAY_PLAN_${tier.toUpperCase()}_${billing.toUpperCase()}`);
    if (!planId) return json({ error: 'Plan not configured' }, 500);

    const keyId = Deno.env.get('RAZORPAY_KEY_ID') ?? '';
    const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET') ?? '';
    const auth = btoa(`${keyId}:${keySecret}`);

    const res = await fetch('https://api.razorpay.com/v1/subscriptions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Basic ${auth}` },
      body: JSON.stringify({
        plan_id: planId,
        total_count: billing === 'annual' ? 5 : 60,
        customer_notify: 1,
        notes: { user_id: user.id, billing, tier },
      }),
    });

    const data = await res.json();
    if (!res.ok) return json({ error: data?.error?.description ?? 'Razorpay error' }, res.status);

    return json({ subscription_id: data.id });
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
