import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Loader2, Sparkles, X } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthProvider';
import { useSubscription } from '@/lib/auth/useSubscription';
import { supabase } from '@/lib/supabase';
import { TIERS, TIER_ORDER, COMPARISON_ROWS, FAQS } from '@/config/tiers';

// ─── USD prices for non-India users ────────────────────────────────────────
const USD_PRICES = {
  enthusiast: { monthly: 2.49, annual: 24.90 },
  insider:    { monthly: 5.99, annual: 59.90 },
  superfan:   { monthly: 11.99, annual: 119.90 },
};

// ─── Country detection ─────────────────────────────────────────────────────
function detectInitialCountry() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.startsWith('Asia/Kolkata') || tz.startsWith('Asia/Calcutta')) return 'IN';
  } catch { /* no-op */ }
  return 'OTHER';
}

// ─── Button style map ──────────────────────────────────────────────────────
const BTN_CLASSES = {
  outline: 'bg-transparent border border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-300',
  blue:    'bg-sky-500 text-white hover:bg-sky-600',
  purple:  'bg-violet-500/15 border border-violet-400/30 text-violet-400 hover:bg-violet-500/25',
  amber:   'bg-amber-500/12 border border-amber-400/25 text-amber-400 hover:bg-amber-500/20',
};

// ─── Comparison cell renderer ──────────────────────────────────────────────
function CellValue({ val }) {
  if (val === true)     return <span className="text-sky-400">&#10003;</span>;
  if (val === 'purple') return <span className="text-violet-400">&#10003;</span>;
  if (val === 'amber')  return <span className="text-amber-400">&#10003;</span>;
  if (val === false)    return <span className="text-slate-600/40">&#10005;</span>;
  return <span className="text-slate-400">{val}</span>;
}

// ─── Stagger container variant ─────────────────────────────────────────────
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

// ─── Pricing Card (inline component) ───────────────────────────────────────
function PricingCard({ tierId, tier, billing, country, currentTier, onSubscribe, loading, user }) {
  const isFree    = tier.price.monthly === null;
  const isCurrent = currentTier === tierId;

  // Price display
  let priceLabel, priceNote;
  if (isFree) {
    priceLabel = 'Free';
    priceNote  = 'Forever free';
  } else if (country === 'IN') {
    const amt = billing === 'annual' ? tier.price.annual : tier.price.monthly;
    priceLabel = `₹${amt.toLocaleString('en-IN')}`;
    priceNote  = billing === 'annual' ? 'per year + GST · 2 months free' : 'per month + GST';
  } else {
    const usd = USD_PRICES[tierId];
    const amt = billing === 'annual' ? usd.annual : usd.monthly;
    priceLabel = `$${amt.toFixed(2)}`;
    priceNote  = billing === 'annual' ? 'per year · 2 months free' : 'per month';
  }

  return (
    <motion.div
      variants={cardVariant}
      className={`relative flex flex-col rounded-2xl p-7 backdrop-blur-xl ${
        tier.popular
          ? 'bg-[#0a1628] border border-sky-500/50 shadow-[0_0_40px_rgba(56,139,229,0.08)]'
          : 'bg-[#0d1526] border border-white/[0.07]'
      }`}
    >
      {/* Popular badge */}
      {tier.popular && (
        <span className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-wider text-sky-400 bg-sky-500/15 border border-sky-500/30 rounded-full px-2.5 py-0.5">
          Most popular
        </span>
      )}

      {/* Icon */}
      <div
        className="w-9 h-9 rounded-[10px] flex items-center justify-center text-base mb-4"
        style={{ background: tier.iconBg }}
      >
        {tier.icon}
      </div>

      {/* Name + tagline */}
      <div className="text-base font-medium text-slate-50 mb-0.5">{tier.name}</div>
      <div className="text-xs text-slate-600 font-light mb-5">{tier.tagline}</div>

      {/* Price block */}
      <div className="mb-6 pb-6 border-b border-white/[0.07]">
        <div className="text-[32px] font-light text-slate-50 tracking-tight leading-none">
          {!isFree && (
            <sup className="text-base font-normal align-super mr-0.5">
              {country === 'IN' ? '₹' : '$'}
            </sup>
          )}
          {isFree ? 'Free' : priceLabel.replace(/^[₹$]/, '')}
        </div>
        <div className={`text-xs mt-1 ${billing === 'annual' && !isFree ? 'text-emerald-400' : 'text-slate-600'}`}>
          {priceNote}
        </div>
      </div>

      {/* Feature list */}
      {Object.entries(tier.features).map(([label, items]) => (
        <div key={label}>
          <div className="text-[10px] font-semibold tracking-widest uppercase text-slate-600 mt-4 mb-2">
            {label}
          </div>
          {items.map((item) => (
            <div
              key={item.text}
              className={`flex items-start gap-2 text-[12.5px] leading-snug mb-1.5 ${
                item.active ? 'text-slate-400' : 'text-slate-600 line-through opacity-40'
              }`}
            >
              <span
                className="w-[5px] h-[5px] rounded-full shrink-0 mt-[5px]"
                style={{ background: item.active ? tier.dotColor : '#334466' }}
              />
              {item.text}
            </div>
          ))}
        </div>
      ))}

      {/* CTA button */}
      <div className="mt-auto pt-6">
        {isCurrent ? (
          <div className="w-full text-center py-2.5 rounded-[10px] text-sm font-medium text-slate-500 bg-white/5 border border-white/[0.07] cursor-default">
            Current plan
          </div>
        ) : isFree ? (
          <Link
            to="/Signup"
            className={`block w-full text-center py-2.5 rounded-[10px] text-[13px] font-medium transition-colors ${BTN_CLASSES.outline}`}
          >
            {tier.btnLabel}
          </Link>
        ) : (
          <button
            onClick={() => onSubscribe(tierId)}
            disabled={loading}
            className={`w-full py-2.5 rounded-[10px] text-[13px] font-medium cursor-pointer transition-colors disabled:opacity-50 ${BTN_CLASSES[tier.btnVariant]}`}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : tier.btnLabel}
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function Pricing() {
  const { user }  = useAuth();
  const { isActive, tier: currentTier } = useSubscription();
  const navigate   = useNavigate();
  const [params]   = useSearchParams();
  const next       = params.get('next') || '/';

  const [billing, setBilling]   = useState('monthly');
  const [country, setCountry]   = useState(detectInitialCountry);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  // Redirect if already subscribed
  useEffect(() => {
    if (isActive) {
      navigate(decodeURIComponent(next), { replace: true });
    }
  }, [isActive, navigate, next]);

  // ── handleSubscribe (now accepts tier) ─────────────────────────────────
  const handleSubscribe = async (selectedTier) => {
    if (!user) {
      navigate(`/Signup?next=${encodeURIComponent(`/Pricing?next=${encodeURIComponent(next)}`)}`);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) {
        navigate(`/Login?next=${encodeURIComponent(`/Pricing?next=${encodeURIComponent(next)}`)}`);
        return;
      }

      const fn = country === 'IN' ? 'create-razorpay-order' : 'create-stripe-checkout';
      const { data, error: fnError } = await supabase.functions.invoke(fn, {
        body: { billing, tier: selectedTier, next },
      });
      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      if (country === 'IN') {
        if (!window.Razorpay) throw new Error('Razorpay SDK not loaded — please refresh');
        const rzp = new window.Razorpay({
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          subscription_id: data.subscription_id,
          name: 'PDI Aviation',
          description: `${TIERS[selectedTier].name} — ${billing}`,
          handler: () => navigate(decodeURIComponent(next), { replace: true }),
          prefill: { email: user.email, name: user.user_metadata?.full_name || '' },
          theme: { color: '#0ea5e9' },
        });
        rzp.open();
      } else {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err?.message || 'Could not start checkout');
    } finally {
      setLoading(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-[1200px] mx-auto"
      >
        {/* ── Hero ── */}
        <div className="text-center pt-8 pb-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] uppercase text-sky-400 mb-5">
            <span className="block w-7 h-px bg-sky-500 opacity-50" />
            PDI Aviation Membership
            <span className="block w-7 h-px bg-sky-500 opacity-50" />
          </div>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-light tracking-tight leading-tight text-slate-50 mb-3">
            Explore the world of<br />
            <em className="font-serif italic text-sky-400">private aviation</em>
          </h1>
          <p className="text-slate-500 text-base max-w-lg mx-auto font-light mb-8">
            Full access to India's most comprehensive private aviation platform — for enthusiasts, dreamers, and future owners.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3.5 bg-[#0d1526] border border-white/[0.07] rounded-full py-1.5 pl-5 pr-1.5 text-[13px] text-slate-500 mb-4">
            <span className={billing === 'monthly' ? 'text-slate-200' : ''}>Monthly</span>
            <button
              onClick={() => setBilling((b) => (b === 'monthly' ? 'annual' : 'monthly'))}
              role="switch"
              aria-checked={billing === 'annual'}
              className="relative w-11 h-6 rounded-full bg-sky-500/20 border border-sky-500/30 cursor-pointer shrink-0"
            >
              <div
                className="absolute top-[3px] w-4 h-4 rounded-full bg-sky-500 transition-[left] duration-200"
                style={{ left: billing === 'annual' ? '21px' : '3px' }}
              />
            </button>
            <span className={billing === 'annual' ? 'text-slate-200' : ''}>Annual</span>
            <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 rounded-full px-2.5 py-0.5 text-[11px] font-medium">
              Save 2 months
            </span>
          </div>

          {/* Country selector */}
          <div className="flex justify-center">
            <label className="inline-flex items-center gap-2 text-xs text-slate-500">
              Pay from
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="bg-slate-900 border border-white/10 rounded-md px-2 py-1 text-slate-200"
              >
                <option value="IN">India (Razorpay, UPI/cards)</option>
                <option value="OTHER">Other (Stripe, card)</option>
              </select>
            </label>
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="max-w-2xl mx-auto mb-6 text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-md px-4 py-2.5 flex items-center gap-2">
            <X className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        {/* ── Pricing cards ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-20"
        >
          {TIER_ORDER.map((id) => (
            <PricingCard
              key={id}
              tierId={id}
              tier={TIERS[id]}
              billing={billing}
              country={country}
              currentTier={currentTier}
              onSubscribe={handleSubscribe}
              loading={loading}
              user={user}
            />
          ))}
        </motion.div>

        {/* ── Comparison table ── */}
        <div className="mb-20">
          <div className="text-[11px] tracking-[0.12em] uppercase text-slate-600 font-medium mb-8 text-center">
            Full feature comparison
          </div>
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full border-collapse text-[13px] min-w-[640px]">
              <thead>
                <tr>
                  <th className="sticky left-0 bg-slate-950 z-10 px-4 py-2.5 text-left text-xs font-medium text-slate-600 border-b border-white/[0.07]">
                    Feature
                  </th>
                  {TIER_ORDER.map((id, i) => (
                    <th
                      key={id}
                      className={`px-4 py-2.5 text-center text-xs font-medium text-slate-400 border-b border-white/[0.07] ${
                        i === 1 ? 'bg-sky-500/[0.04]' : ''
                      }`}
                    >
                      {TIERS[id].name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) =>
                  row.section ? (
                    <tr key={i}>
                      <td
                        colSpan={5}
                        className="px-4 pt-4 pb-1.5 text-[10px] font-semibold tracking-widest uppercase text-slate-600 bg-white/[0.01]"
                      >
                        {row.section}
                      </td>
                    </tr>
                  ) : (
                    <tr key={i}>
                      <td className="sticky left-0 bg-slate-950 z-10 px-4 py-3 border-b border-white/[0.03] text-slate-400 text-left">
                        {row.label}
                      </td>
                      {row.values.map((val, j) => (
                        <td
                          key={j}
                          className={`px-4 py-3 border-b border-white/[0.03] text-center ${
                            j === 1 ? 'bg-sky-500/[0.04]' : ''
                          }`}
                        >
                          <CellValue val={val} />
                        </td>
                      ))}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="mb-20">
          <div className="text-[11px] tracking-[0.12em] uppercase text-slate-600 font-medium mb-8 text-center">
            Frequently asked questions
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="bg-[#0d1526] border border-white/[0.07] rounded-xl p-5"
              >
                <div className="text-[13px] font-medium text-slate-50 mb-2">{faq.q}</div>
                <div className="text-[12.5px] text-slate-600 leading-relaxed font-light">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer CTA ── */}
        <div className="text-center py-16 border-t border-white/[0.07]">
          <h2 className="text-2xl font-light text-slate-50 mb-5">
            Start your{' '}
            <em className="font-serif italic text-sky-400">aviation journey</em>{' '}
            today
          </h2>
          <Link
            to="/Signup"
            className="inline-block px-8 py-3 rounded-[10px] bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 transition-colors"
          >
            Get started free &rarr;
          </Link>
          <p className="text-slate-600 text-[13px] mt-3">
            No credit card required &middot; Cancel anytime &middot; Payments secured by Razorpay
          </p>
        </div>

        {/* Manage plan link */}
        {user && (
          <p className="text-center text-sm text-slate-500 pb-8">
            Already subscribed?{' '}
            <Link to="/Account" className="text-sky-300 hover:text-sky-200 font-medium">
              Manage your plan
            </Link>
          </p>
        )}
      </motion.div>
    </div>
  );
}
