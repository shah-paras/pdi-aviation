// Founding-member offer: the first FOUNDING_LIMIT buyers get lifetime access
// for a one-time payment; after that, membership is a yearly subscription.
// Single source of truth for both the public offer endpoint and checkout.
import type { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

export const MEMBER_TIER = 'insider';

export interface Offer {
  kind: 'lifetime' | 'annual';
  limit: number;
  claimed: number;
  remaining: number;
  lifetimePriceInr: number;
  annualPriceInr: number;
}

function envNumber(name: string, fallback: number): number {
  const value = Number(Deno.env.get(name) ?? fallback);
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

/** `admin` must use the service-role key — counting spans every user's row. */
export async function getOffer(admin: SupabaseClient): Promise<Offer> {
  const limit = envNumber('FOUNDING_LIMIT', 500);

  const { count, error } = await admin
    .from('subscriptions')
    .select('user_id', { count: 'exact', head: true })
    .eq('plan', 'lifetime')
    .eq('status', 'active');
  if (error) throw error;

  const claimed = count ?? 0;
  return {
    kind: claimed < limit ? 'lifetime' : 'annual',
    limit,
    claimed,
    remaining: Math.max(limit - claimed, 0),
    lifetimePriceInr: envNumber('LIFETIME_PRICE_INR', 999),
    annualPriceInr: envNumber('ANNUAL_PRICE_INR', 999),
  };
}
