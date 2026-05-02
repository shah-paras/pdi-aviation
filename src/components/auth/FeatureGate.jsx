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

  // mode === 'lock' (default) — show disabled content with lock overlay
  return (
    <div className="relative group">
      <div className="opacity-50 pointer-events-none select-none">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-slate-900/95 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 text-center shadow-xl">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Lock className="w-3 h-3" />
            Requires {TIERS[requiredTier]?.name || requiredTier}
          </div>
          <Link to="/Pricing" className="text-[11px] text-sky-400 hover:text-sky-300">
            View plans &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
