import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth/AuthProvider';
import { useDevTier } from '@/lib/auth/DevTierContext';

const ACTIVE_STATUSES = new Set(['active', 'trialing']);

export function useSubscription() {
  const { user, loading: authLoading } = useAuth();
  const devCtx = useDevTier();

  const query = useQuery({
    queryKey: ['subscription', user?.id ?? null],
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('status, plan, tier, provider, current_period_end')
        .eq('user_id', user.id)
        .maybeSingle();
      if (error) throw error;
      return data ?? { status: 'none', plan: null, tier: 'curious', provider: null, current_period_end: null };
    },
  });

  const subscription = query.data ?? null;
  const isActive = !!subscription && ACTIVE_STATUSES.has(subscription.status);
  const realTier = (isActive && subscription?.tier) || 'curious';
  const tier = devCtx?.devTier || realTier;

  return {
    subscription,
    isActive: devCtx?.devTier ? true : isActive,
    tier,
    isLoading: authLoading || query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}
