import { useSubscription } from '@/lib/auth/useSubscription';
import { getTierLimits } from '@/config/tiers';

export function useTierLimits() {
  const { tier, isLoading } = useSubscription();
  return {
    limits: getTierLimits(tier),
    tier,
    isLoading,
  };
}
