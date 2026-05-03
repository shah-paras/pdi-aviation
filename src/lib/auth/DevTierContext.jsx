import { createContext, useContext, useState, useCallback } from 'react';
import { TIER_ORDER, TIERS, TIER_COLORS, TIER_LIMITS } from '@/config/tiers';
import { Lock, Unlock, ChevronDown, ChevronUp, X } from 'lucide-react';

const DevTierContext = createContext(null);

const STORAGE_KEY = 'pdi-dev-tier';

export function DevTierProvider({ children }) {
  if (!import.meta.env.DEV) return children;

  const [devTier, setDevTierState] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  });

  const setDevTier = useCallback((tier) => {
    setDevTierState(tier);
    try {
      if (tier) localStorage.setItem(STORAGE_KEY, tier);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  return (
    <DevTierContext.Provider value={{ devTier, setDevTier }}>
      {children}
      <DevTierSwitcher devTier={devTier} setDevTier={setDevTier} />
    </DevTierContext.Provider>
  );
}

export function useDevTier() {
  return useContext(DevTierContext);
}

function DevTierSwitcher({ devTier, setDevTier }) {
  const [expanded, setExpanded] = useState(false);
  const [showLimits, setShowLimits] = useState(false);

  const activeTier = devTier || 'curious';
  const tierMeta = TIERS[activeTier];
  const colorMap = { curious: '#64748b', enthusiast: '#38bdf8', insider: '#a78bfa' };

  return (
    <div className="fixed bottom-4 right-4 z-[9999] font-sans text-xs select-none">
      {expanded ? (
        <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-72 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2.5 border-b border-slate-700/50">
            <span className="text-slate-400 font-medium tracking-wide uppercase text-[10px]">
              Dev Tier Switcher
            </span>
            <div className="flex items-center gap-1.5">
              {devTier && (
                <button
                  onClick={() => setDevTier(null)}
                  className="text-[10px] text-slate-500 hover:text-red-400 transition-colors px-1.5 py-0.5 rounded bg-slate-800"
                >
                  Reset
                </button>
              )}
              <button onClick={() => setExpanded(false)} className="text-slate-500 hover:text-white p-0.5">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Tier buttons */}
          <div className="p-2 flex gap-1.5">
            {TIER_ORDER.map((tier) => {
              const meta = TIERS[tier];
              const isActive = activeTier === tier;
              const color = colorMap[tier];
              return (
                <button
                  key={tier}
                  onClick={() => setDevTier(tier)}
                  className={`flex-1 rounded-lg px-2 py-2.5 text-center transition-all border ${
                    isActive
                      ? 'border-current bg-white/5'
                      : 'border-transparent bg-slate-800/50 hover:bg-slate-800'
                  }`}
                  style={{ color }}
                >
                  <div className="text-base mb-0.5">{meta.icon}</div>
                  <div className="font-semibold text-[11px]">{meta.name}</div>
                  <div className="text-[9px] text-slate-500 mt-0.5">
                    {meta.price.monthly ? `$${meta.price.monthly}/mo` : 'Free'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Limits toggle */}
          <button
            onClick={() => setShowLimits(!showLimits)}
            className="w-full flex items-center justify-between px-3 py-1.5 text-slate-500 hover:text-slate-300 transition-colors border-t border-slate-800"
          >
            <span className="text-[10px]">Feature limits for {TIERS[activeTier].name}</span>
            {showLimits ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {showLimits && (
            <div className="px-3 pb-2.5 space-y-1 max-h-48 overflow-y-auto scrollbar-thin">
              {Object.entries(TIER_LIMITS[activeTier]).map(([key, value]) => {
                const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
                const isBoolean = typeof value === 'boolean';
                return (
                  <div key={key} className="flex items-center justify-between py-0.5">
                    <span className="text-slate-400 text-[10px]">{label}</span>
                    {isBoolean ? (
                      value ? (
                        <Unlock className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Lock className="w-3 h-3 text-red-400/60" />
                      )
                    ) : (
                      <span className="text-white font-medium text-[10px]">
                        {value === Infinity ? '∞' : value}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => setExpanded(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/95 border border-slate-700 shadow-lg hover:border-slate-600 transition-colors backdrop-blur-sm"
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: colorMap[activeTier] }}
          />
          <span className="text-slate-300 font-medium">{tierMeta.icon} {tierMeta.name}</span>
          {devTier && <span className="text-[9px] text-amber-400/80 ml-1">DEV</span>}
        </button>
      )}
    </div>
  );
}
