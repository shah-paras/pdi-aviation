// Supabase Edge Function: receive Stripe webhook events, verify signature, upsert subscriptions row.
// Requires: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.
// Point Stripe Dashboard webhook at: https://<project>.supabase.co/functions/v1/stripe-webhook
import { serve } from 'https://deno.land/std@0.208.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@14.25.0?target=deno&no-check';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', { apiVersion: '2024-06-20' });
const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? '';

const admin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  if (!signature) return new Response('No signature', { status: 400 });

  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
  } catch (err) {
    return new Response(`Bad signature: ${(err as Error).message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id || (session.metadata?.user_id as string | undefined);
        if (userId && session.subscription) {
          const sub = await stripe.subscriptions.retrieve(session.subscription as string);
          await upsertSubscription(userId, sub);
        }
        break;
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        const userId = (sub.metadata?.user_id as string | undefined) ?? (await lookupUserByCustomer(sub.customer as string));
        if (userId) await upsertSubscription(userId, sub);
        break;
      }
      default:
        break;
    }
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(`Handler error: ${(err as Error).message}`, { status: 500 });
  }
});

async function upsertSubscription(userId: string, sub: Stripe.Subscription) {
  const status = sub.status === 'canceled' && sub.cancel_at_period_end
    ? 'active'
    : (sub.status as string);
  await admin.from('subscriptions').upsert({
    user_id: userId,
    status,
    plan: (sub.metadata?.billing as string) || sub.items?.data?.[0]?.price?.nickname || null,
    provider: 'stripe',
    provider_customer_id: typeof sub.customer === 'string' ? sub.customer : sub.customer?.id,
    provider_subscription_id: sub.id,
    current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  });
}

async function lookupUserByCustomer(customerId: string) {
  const { data } = await admin
    .from('subscriptions')
    .select('user_id')
    .eq('provider_customer_id', customerId)
    .maybeSingle();
  return data?.user_id as string | undefined;
}
