import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Calculator,
  Check,
  Globe2,
  Infinity as InfinityIcon,
  Loader2,
  Plane,
  Radar,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import SpotlightCard from '@/components/home/SpotlightCard';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const GROUP_ICONS = {
  'Compare Aircraft': Plane,
  'Range Map': Radar,
  'Finance Calculator': Calculator,
  'Fleet Directory': Globe2,
};

const PERKS = [
  { icon: InfinityIcon, text: 'No renewals, ever' },
  { icon: Sparkles, text: 'Every future feature included' },
  { icon: ShieldCheck, text: 'UPI, cards & net banking via Razorpay' },
];

const groupList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const groupItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

/**
 * Single-plan "boarding pass" card: price stub on the left, everything it
 * unlocks on the right, separated by a perforated tear line.
 */
export default function LifetimePassCard({ tier, isOwned, onPurchase, loading }) {
  const reduced = useReducedMotion();
  const reveal = reduced ? {} : { variants: groupList, initial: 'hidden', animate: 'show' };
  const revealItem = reduced ? {} : { variants: groupItem };

  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Ambient sky glow behind the pass */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -top-16 h-72 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.18),transparent_65%)] blur-2xl"
      />

      {/* Gradient hairline border */}
      <div className="relative rounded-[28px] p-px bg-gradient-to-br from-sky-400/60 via-white/10 to-blue-600/40 shadow-[0_30px_80px_-20px_rgba(14,165,233,0.35)]">
        <SpotlightCard className="rounded-[27px] bg-[#070f1f]">
          <div className="grid lg:grid-cols-[minmax(0,5fr)_auto_minmax(0,7fr)]">
            {/* ── Stub: price + CTA ── */}
            <section
              aria-labelledby="lifetime-pass-heading"
              className="relative flex flex-col p-8 sm:p-10 bg-[radial-gradient(120%_80%_at_0%_0%,rgba(14,165,233,0.16),transparent_60%)]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-300">
                  <Plane className="w-3 h-3 -rotate-45" aria-hidden />
                  Lifetime pass
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-slate-600">PDI · ∞</span>
              </div>

              <h2
                id="lifetime-pass-heading"
                className="mt-8 font-serif text-3xl sm:text-4xl italic text-slate-50 leading-tight"
              >
                Pay once.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-500">
                  Fly forever.
                </span>
              </h2>

              <div className="mt-8 flex items-end gap-3">
                <div className="flex items-start text-slate-50 leading-none">
                  <span className="mt-2 mr-1 text-2xl font-light text-sky-300">₹</span>
                  <span className="text-7xl font-extralight tracking-tighter tabular-nums">
                    {tier.price.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="pb-2 text-xs leading-snug text-slate-500">
                  one-time
                  <br />
                  incl. GST
                </div>
              </div>

              <ul className="mt-8 space-y-3">
                {PERKS.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-[13px] text-slate-300">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                      <Icon className="w-3.5 h-3.5 text-sky-300" aria-hidden />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>

              <div className="mt-10 lg:mt-auto lg:pt-10">
                {isOwned ? (
                  <div className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 py-3.5 text-sm font-medium text-emerald-300">
                    <BadgeCheck className="w-4 h-4" aria-hidden />
                    You have lifetime access
                  </div>
                ) : (
                  <button
                    onClick={onPurchase}
                    disabled={loading}
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(56,189,248,0.6)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-8px_rgba(56,189,248,0.75)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070f1f] disabled:opacity-60 disabled:hover:translate-y-0 cursor-pointer"
                  >
                    {!reduced && (
                      <span
                        aria-hidden
                        className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/25 blur-md transition-transform duration-700 group-hover:translate-x-[400%]"
                      />
                    )}
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" aria-label="Starting checkout" />
                    ) : (
                      <>
                        Get lifetime access
                        <ArrowRight
                          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                          aria-hidden
                        />
                      </>
                    )}
                  </button>
                )}
                <p className="mt-3 text-center text-[11px] text-slate-600">
                  Secure checkout · Instant activation
                </p>
              </div>
            </section>

            {/* ── Perforation ── */}
            <div aria-hidden className="relative lg:w-0.5">
              {/* Horizontal tear on mobile */}
              <div className="lg:hidden mx-8 border-t-2 border-dashed border-white/10" />
              <span className="lg:hidden absolute -left-3 -top-3 h-6 w-6 rounded-full bg-slate-950" />
              <span className="lg:hidden absolute -right-3 -top-3 h-6 w-6 rounded-full bg-slate-950" />
              {/* Vertical tear on desktop */}
              <div className="hidden lg:block absolute inset-y-8 left-0 border-l-2 border-dashed border-white/10" />
              <span className="hidden lg:block absolute -top-3 -left-[11px] h-6 w-6 rounded-full bg-slate-950" />
              <span className="hidden lg:block absolute -bottom-3 -left-[11px] h-6 w-6 rounded-full bg-slate-950" />
            </div>

            {/* ── Manifest: what's unlocked ── */}
            <section aria-label="Included features" className="p-8 sm:p-10">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Everything unlocked
                </h3>
                <span className="text-[11px] text-slate-600">4 tools · full access</span>
              </div>

              <motion.div {...reveal} className="mt-6 grid gap-3 sm:grid-cols-2">
                {Object.entries(tier.features).map(([label, items]) => {
                  const Icon = GROUP_ICONS[label] ?? Sparkles;
                  return (
                    <motion.div
                      key={label}
                      {...revealItem}
                      className="group/tool rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5 transition-colors duration-200 hover:border-sky-400/25 hover:bg-sky-400/[0.04]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400/20 to-blue-600/10 ring-1 ring-sky-400/20 transition-transform duration-200 group-hover/tool:scale-105">
                          <Icon className="w-4 h-4 text-sky-300" aria-hidden />
                        </span>
                        <span className="text-sm font-medium text-slate-100">{label}</span>
                      </div>
                      <ul className="mt-4 space-y-2">
                        {items.map((item) => (
                          <li key={item.text} className="flex items-start gap-2 text-[12.5px] leading-snug text-slate-400">
                            <Check className="mt-0.5 w-3.5 h-3.5 shrink-0 text-sky-400" aria-hidden />
                            {item.text}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </motion.div>
            </section>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}
