// Supabase Edge Function: create a Stripe Checkout Session for a recurring subscription.
// Request: POST { billing: 'monthly' | 'annual', tier: 'enthusiast' | 'insider' | 'superfan', next?: string }
// Requires: STRIPE_SECRET_KEY, STRIPE_PRICE_<TIER>_<BILLING> env vars
//   (e.g. STRIPE_PRICE_ENTHUSIAST_MONTHLY), SITE_URL.
import { serve } from 'https://deno.land/std@0.208.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@14.25.0?target=deno&no-check';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { corsHeaders } from '../_shared/cors.ts';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', { apiVersion: '2024-06-20' });

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'Missing auth' }, 401);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } },
    );

    const { data: userRes, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userRes.user) return json({ error: 'Unauthenticated' }, 401);
    const user = userRes.user;

    const { billing = 'monthly', tier = 'enthusiast', next = '/' } = await req.json().catch(() => ({}));
    const validTiers = ['enthusiast', 'insider', 'superfan'];
    if (!validTiers.includes(tier)) return json({ error: 'Invalid tier' }, 400);

    const priceId = Deno.env.get(`STRIPE_PRICE_${tier.toUpperCase()}_${billing.toUpperCase()}`);
    if (!priceId) return json({ error: 'Price not configured' }, 500);

    const siteUrl = Deno.env.get('SITE_URL') ?? 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: user.email,
      client_reference_id: user.id,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}${next.startsWith('/') ? next : '/'}?checkout=success`,
      cancel_url: `${siteUrl}/Pricing?checkout=cancel`,
      metadata: { user_id: user.id, billing, tier },
      subscription_data: { metadata: { user_id: user.id, billing, tier } },
    });

    return json({ url: session.url });
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
