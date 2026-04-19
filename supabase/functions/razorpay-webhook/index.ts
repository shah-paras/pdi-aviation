// Supabase Edge Function: receive Razorpay webhook events, verify signature, upsert subscription.
// Requires: RAZORPAY_WEBHOOK_SECRET, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.
// Point Razorpay Dashboard webhook at: https://<project>.supabase.co/functions/v1/razorpay-webhook
// Subscribe to events: subscription.activated, subscription.charged, subscription.cancelled, subscription.completed, subscription.halted.
import { serve } from 'https://deno.land/std@0.208.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const webhookSecret = Deno.env.get('RAZORPAY_WEBHOOK_SECRET') ?? '';

const admin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

serve(async (req) => {
  const signature = req.headers.get('x-razorpay-signature') ?? '';
  const body = await req.text();
  const valid = await verifySignature(body, signature, webhookSecret);
  if (!valid) return new Response('Bad signature', { status: 400 });

  const event = JSON.parse(body) as RazorpayEvent;
  try {
    const sub = event.payload?.subscription?.entity;
    if (!sub) return new Response(JSON.stringify({ ignored: true }), { status: 200 });

    const userId = sub.notes?.user_id;
    if (!userId) return new Response(JSON.stringify({ missing_user: true }), { status: 200 });

    const status = mapStatus(sub.status);
    await admin.from('subscriptions').upsert({
      user_id: userId,
      status,
      plan: sub.notes?.billing ?? null,
      tier: sub.notes?.tier ?? 'enthusiast',
      provider: 'razorpay',
      provider_customer_id: sub.customer_id ?? null,
      provider_subscription_id: sub.id,
      current_period_end: sub.current_end ? new Date(sub.current_end * 1000).toISOString() : null,
      updated_at: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(`Handler error: ${(err as Error).message}`, { status: 500 });
  }
});

function mapStatus(razorpayStatus: string): string {
  switch (razorpayStatus) {
    case 'active':
    case 'authenticated':
      return 'active';
    case 'pending':
    case 'created':
      return 'incomplete';
    case 'halted':
      return 'past_due';
    case 'cancelled':
    case 'completed':
    case 'expired':
      return 'canceled';
    default:
      return 'none';
  }
}

async function verifySignature(body: string, signature: string, secret: string) {
  if (!secret || !signature) return false;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sigBuf = await crypto.subtle.sign('HMAC', key, enc.encode(body));
  const hex = Array.from(new Uint8Array(sigBuf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return timingSafeEqual(hex, signature);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

interface RazorpayEvent {
  event: string;
  payload?: {
    subscription?: {
      entity: {
        id: string;
        status: string;
        customer_id?: string;
        current_end?: number;
        notes?: { user_id?: string; billing?: string; tier?: string };
      };
    };
  };
}
