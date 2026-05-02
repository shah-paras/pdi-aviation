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

  // mode === 'lock' (default) — dimmed content with lock badge + centered hover tooltip
  const tierName = TIERS[requiredTier]?.name || requiredTier;
  const tierColor = TIER_COLORS[requiredTier]?.text || 'text-sky-400';
  return (
    <div className="relative group/gate cursor-default">
      <div className="opacity-40 pointer-events-none select-none" aria-disabled="true">{children}</div>
      <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800/90 border border-white/10 text-[10px] text-slate-400">
        <Lock className="w-2.5 h-2.5" />
        <span className={tierColor}>{tierName}</span>
      </div>
      <Link
        to="/Pricing"
        className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover/gate:opacity-100 transition-opacity duration-150"
      >
        <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/95 border border-white/10 shadow-xl text-xs text-slate-300 backdrop-blur-sm">
          <Lock className="w-3 h-3 text-slate-500" />
          Requires <span className={tierColor}>{tierName}</span>
          <span className="text-slate-600">·</span>
          <span className="text-sky-400">Upgrade &rarr;</span>
        </span>
      </Link>
    </div>
  );
}
