import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { LIFETIME_PRICE_INR, FOUNDING_LIMIT } from '@/config/tiers';

// Shown until the server answers (or if it can't) — checkout re-decides server-side anyway.
const FALLBACK_OFFER = {
  kind: 'lifetime',
  limit: 0, // 0 hides the spots meter until real counts arrive
  claimed: 0,
  remaining: FOUNDING_LIMIT,
  lifetimePriceInr: LIFETIME_PRICE_INR,
  annualPriceInr: LIFETIME_PRICE_INR,
};

/** Current membership offer: founding lifetime (first N members) or annual. */
export function usePricingOffer() {
  const query = useQuery({
    queryKey: ['pricing-offer'],
    staleTime: 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('get-pricing-offer', { body: {} });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
  });

  return { offer: query.data ?? FALLBACK_OFFER, isLoading: query.isLoading, refetch: query.refetch };
}
