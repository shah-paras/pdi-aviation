import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import MembershipPassCard from '@/components/pricing/MembershipPassCard';
import { usePricingOffer } from '@/hooks/usePricingOffer';
import { useAuth } from '@/lib/auth/AuthProvider';
import { useSubscription } from '@/lib/auth/useSubscription';
import { supabase } from '@/lib/supabase';
import {
  TIERS,
  LIFETIME_TIER,
  COMPARISON_TIERS,
  COMPARISON_ROWS,
  FAQS,
} from '@/config/tiers';

// Razorpay's webhook activates access asynchronously; poll briefly after payment.
const ACTIVATION_POLL_ATTEMPTS = 8;
const ACTIVATION_POLL_INTERVAL_MS = 1500;
const LIFETIME_COLUMN = COMPARISON_TIERS.indexOf(LIFETIME_TIER);

// ─── Comparison cell renderer ──────────────────────────────────────────────
function CellValue({ val }) {
  if (val === true)     return <span className="text-sky-400">&#10003;</span>;
  if (val === false)    return <span className="text-slate-600/40">&#10005;</span>;
  return <span className="text-slate-400">{val}</span>;
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function Pricing() {
  const { user }  = useAuth();
  const { isActive, tier: currentTier, subscription, refetch } = useSubscription();
  const { offer, refetch: refetchOffer } = usePricingOffer();
  const isMember   = isActive && currentTier === LIFETIME_TIER;
  const navigate   = useNavigate();
  const [params]   = useSearchParams();
  const next       = params.get('next') || '/';

  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  // Members have nothing to buy — send them on their way
  useEffect(() => {
    if (isMember) navigate(decodeURIComponent(next), { replace: true });
  }, [isMember, navigate, next]);

  const waitForActivation = async () => {
    for (let i = 0; i < ACTIVATION_POLL_ATTEMPTS; i += 1) {
      const { data } = await refetch();
      if (data?.status === 'active' && data?.tier === LIFETIME_TIER) return;
      await new Promise((r) => setTimeout(r, ACTIVATION_POLL_INTERVAL_MS));
    }
  };

  const handlePurchase = async () => {
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

      const { data, error: fnError } = await supabase.functions.invoke('create-razorpay-order', {
        body: {},
      });
      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      if (!window.Razorpay) throw new Error('Razorpay SDK not loaded — please refresh');
      // The server picks the offer: a one-time order (founding lifetime) or a yearly subscription.
      const checkout = data.mode === 'subscription'
        ? { subscription_id: data.subscription_id, description: 'Annual membership' }
        : { order_id: data.order_id, amount: data.amount, currency: data.currency, description: 'Founding lifetime access' };

      const rzp = new window.Razorpay({
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        ...checkout,
        name: 'PDI Aviation',
        handler: async () => {
          setLoading(true);
          await waitForActivation();
          refetchOffer();
          setLoading(false);
          navigate(decodeURIComponent(next), { replace: true });
        },
        prefill: { email: user.email, name: user.user_metadata?.full_name || '' },
        theme: { color: '#0ea5e9' },
      });
      rzp.open();
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
            {offer.kind === 'lifetime'
              ? `Founding offer: the first ${offer.limit || 500} members pay ₹${offer.lifetimePriceInr} once and keep full access for life.`
              : `Full access to India's most comprehensive private aviation platform for ₹${offer.annualPriceInr} a year.`}
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div className="max-w-2xl mx-auto mb-6 text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-md px-4 py-2.5 flex items-center gap-2">
            <X className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        {/* ── Membership pass ── */}
        <div className="mb-24">
          <MembershipPassCard
            tier={TIERS[LIFETIME_TIER]}
            offer={offer}
            memberPlan={isMember ? subscription?.plan : null}
            onPurchase={handlePurchase}
            loading={loading}
          />
        </div>

        {/* ── Comparison table ── */}
        <div className="mb-20">
          <div className="text-[11px] tracking-[0.12em] uppercase text-slate-600 font-medium mb-8 text-center">
            Full feature comparison
          </div>
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full max-w-3xl mx-auto border-collapse text-[13px] min-w-[480px]">
              <thead>
                <tr>
                  <th className="sticky left-0 bg-slate-950 z-10 px-4 py-2.5 text-left text-xs font-medium text-slate-600 border-b border-white/[0.07]">
                    Feature
                  </th>
                  {COMPARISON_TIERS.map((id, i) => (
                    <th
                      key={id}
                      className={`px-4 py-2.5 text-center text-xs font-medium text-slate-400 border-b border-white/[0.07] ${
                        i === LIFETIME_COLUMN ? 'bg-sky-500/[0.04]' : ''
                      }`}
                    >
                      {id === LIFETIME_TIER ? TIERS[id].name : 'Free'}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) =>
                  row.section ? (
                    <tr key={i}>
                      <td
                        colSpan={COMPARISON_TIERS.length + 1}
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
                            j === LIFETIME_COLUMN ? 'bg-sky-500/[0.04]' : ''
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
          <button
            onClick={handlePurchase}
            disabled={loading || isMember}
            className="inline-block px-8 py-3 rounded-[10px] bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 transition-colors disabled:opacity-50"
          >
            {offer.kind === 'lifetime'
              ? `Claim founding lifetime · ₹${offer.lifetimePriceInr}`
              : `Become a member · ₹${offer.annualPriceInr}/year`} &rarr;
          </button>
          <p className="text-slate-600 text-[13px] mt-3">
            {offer.kind === 'lifetime'
              ? 'One-time payment · No renewals · Payments secured by Razorpay'
              : 'Renews yearly · Cancel anytime · Payments secured by Razorpay'}
          </p>
          <Link
            to="/AircraftComparison"
            className="inline-block mt-4 text-sm text-slate-500 hover:text-sky-400 transition-colors"
          >
            Continue with the free version &rarr;
          </Link>
        </div>

      </motion.div>
    </div>
  );
}
