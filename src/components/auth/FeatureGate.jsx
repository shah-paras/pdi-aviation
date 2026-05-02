import { useSubscription } from '@/lib/auth/useSubscription';
import { hasAccess, TIERS, TIER_COLORS } from '@/config/tiers';
import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * @param {'enthusiast'|'insider'} requiredTier
 * @param {React.ReactNode} children - gated content
 * @param {React.ReactNode} [fallback] - optional custom fallback
 * @param {string} [feature] - label for upgrade prompt
 * @param {'blur'|'lock'|'hide'} [mode='lock']
 */
export default function FeatureGate({ requiredTier, children, fallback, feature, mode = 'lock' }) {
  const { tier, isLoading } = useSubscription();

  if (import.meta.env.VITE_DEV_UNLOCK === 'true') return children;
  if (isLoading) return null;
  if (hasAccess(tier, requiredTier)) return children;
  if (fallback) return fallback;
  if (mode === 'hide') return null;

  if (mode === 'blur') {
    return (
      <div className="relative">
        <div className="blur-sm pointer-events-none select-none">{children}</div>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/60 rounded-xl backdrop-blur-sm">
          <Lock className="w-5 h-5 text-slate-400 mb-2" />
          <p className="text-sm text-slate-300 mb-2">
            {feature || 'This feature'} requires {TIERS[requiredTier]?.name}
          </p>
          <Link to="/Pricing" className="text-sky-400 hover:text-sky-300 text-sm font-medium">
            Upgrade now &rarr;
          </Link>
        </div>
      </div>
    );
  }

  // mode === 'lock' (default)
  return (
    <div className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center">
      <Lock className="w-6 h-6 text-slate-500 mx-auto mb-2" />
      <p className="text-sm text-slate-400 mb-3">
        {feature || 'This feature'} requires{' '}
        <span className={TIER_COLORS[requiredTier]?.text || 'text-sky-400'}>
          {TIERS[requiredTier]?.name || requiredTier}
        </span>{' '}
        or higher
      </p>
      <Link
        to="/Pricing"
        className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm transition-colors"
      >
        View plans &rarr;
      </Link>
    </div>
  );
}
