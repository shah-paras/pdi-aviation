import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth/AuthProvider';

const ACTIVE_STATUSES = new Set(['active', 'trialing']);

export function useSubscription() {
  const { user, loading: authLoading } = useAuth();

  const query = useQuery({
    queryKey: ['subscription', user?.id ?? null],
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('status, plan, provider, current_period_end')
        .eq('user_id', user.id)
        .maybeSingle();
      if (error) throw error;
      return data ?? { status: 'none', plan: null, provider: null, current_period_end: null };
    },
  });

  const subscription = query.data ?? null;
  const isActive = !!subscription && ACTIVE_STATUSES.has(subscription.status);

  return {
    subscription,
    isActive,
    isLoading: authLoading || query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}
