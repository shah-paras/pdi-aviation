import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthProvider';
import { useSubscription } from '@/lib/auth/useSubscription';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

const BENEFITS = [
  'Full Aircraft Comparison with unlimited side-by-side specs',
  'Complete Fleet Directory — all Indian non-scheduled operators',
  'Advanced Finance Calculator with loan, fuel, insurance modeling',
  'Range Map with flight path overlays and export',
  'Priority email support',
];

function detectInitialCountry() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.startsWith('Asia/Kolkata') || tz.startsWith('Asia/Calcutta')) return 'IN';
  } catch { /* no-op */ }
  return 'OTHER';
}

export default function Pricing() {
  const { user } = useAuth();
  const { isActive } = useSubscription();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get('next') || '/';
  const [billing, setBilling] = useState('monthly');
  const [country, setCountry] = useState(detectInitialCountry);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isActive) navigate(decodeURIComponent(next), { replace: true });
  }, [isActive, navigate, next]);

  const priceDisplay = country === 'IN'
    ? (billing === 'monthly' ? '₹2,499/mo' : '₹24,999/yr')
    : (billing === 'monthly' ? '$29/mo' : '$290/yr');

  const priceNote = billing === 'annual' ? '2 months free vs monthly' : 'Cancel any time';

  const handleSubscribe = async () => {
    if (!user) {
      navigate(`/Signup?next=${encodeURIComponent(`/Pricing?next=${encodeURIComponent(next)}`)}`);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const fn = country === 'IN' ? 'create-razorpay-order' : 'create-stripe-checkout';
      const { data, error: fnError } = await supabase.functions.invoke(fn, {
        body: { billing, next },
      });
      if (fnError) throw fnError;

      if (country === 'IN') {
        if (!window.Razorpay) throw new Error('Razorpay not loaded');
        const rzp = new window.Razorpay({
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          subscription_id: data.subscription_id,
          name: 'PDI Aviation',
          description: billing === 'monthly' ? 'Pro — monthly' : 'Pro — annual',
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

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-16 bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 px-3 py-1 text-xs text-sky-300 mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Pro plan
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-white tracking-tight">
            One plan. Every tool.
          </h1>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto">
            Unlock the full aviation toolkit — comparison, fleet data, finance modeling, and range mapping.
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1">
            {['monthly', 'annual'].map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={`px-4 py-1.5 text-sm rounded-full transition-colors ${
                  billing === b ? 'bg-sky-500 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                {b === 'monthly' ? 'Monthly' : 'Annual'}
                {b === 'annual' && <span className="ml-1.5 text-[10px] uppercase tracking-wide text-sky-300">-17%</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <label className="inline-flex items-center gap-2 text-xs text-slate-400">
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

        <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
          <div className="text-center">
            <div className="text-5xl font-serif text-white tracking-tight">{priceDisplay}</div>
            <p className="mt-2 text-xs uppercase tracking-wide text-slate-400">{priceNote}</p>
          </div>

          <ul className="mt-8 space-y-3">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-slate-300">
                <Check className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {error && (
            <div className="mt-6 text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-md px-3 py-2">
              {error}
            </div>
          )}

          <Button
            onClick={handleSubscribe}
            disabled={loading}
            className="mt-8 w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold h-11"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : user ? 'Subscribe' : 'Create account & subscribe'}
          </Button>

          <p className="mt-4 text-center text-xs text-slate-500">
            {country === 'IN'
              ? 'Secure checkout via Razorpay. Supports UPI, cards, and net banking.'
              : 'Secure checkout via Stripe. Cards accepted.'}
          </p>
        </div>

        <p className="text-center text-sm text-slate-400 mt-6">
          Already subscribed?{' '}
          <Link to="/Account" className="text-sky-300 hover:text-sky-200 font-medium">
            Manage your plan
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
