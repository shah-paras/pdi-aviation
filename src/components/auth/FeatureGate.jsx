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

  // mode === 'lock' (default) — show disabled content with tooltip on hover
  const tierName = TIERS[requiredTier]?.name || requiredTier;
  return (
    <div className="relative group/gate">
      <div className="opacity-40 pointer-events-none select-none" aria-disabled="true">{children}</div>
      <div
        className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-md
          bg-slate-800 border border-white/10 shadow-lg
          opacity-0 pointer-events-none group-hover/gate:opacity-100 group-hover/gate:pointer-events-auto
          transition-opacity duration-150 whitespace-nowrap text-center"
      >
        <span className="flex items-center gap-1.5 text-xs text-slate-300">
          <Lock className="w-3 h-3 text-slate-500" />
          Requires <span className={TIER_COLORS[requiredTier]?.text || 'text-sky-400'}>{tierName}</span>
          <span className="text-slate-600 mx-1">·</span>
          <Link to="/Pricing" className="text-sky-400 hover:text-sky-300">Upgrade</Link>
        </span>
      </div>
    </div>
  );
}
