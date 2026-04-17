import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, CreditCard, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthProvider';
import { useSubscription } from '@/lib/auth/useSubscription';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

function formatDate(iso) {
  if (!iso) return '—';
  try {
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function Account() {
  const { user, loading: authLoading, signOut } = useAuth();
  const { subscription, isActive, isLoading: subLoading } = useSubscription();
  const navigate = useNavigate();
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState(null);

  if (authLoading) return null;
  if (!user) return <Navigate to="/Login?next=/Account" replace />;

  const openPortal = async () => {
    setError(null);
    if (subscription?.provider === 'razorpay') {
      window.open('https://dashboard.razorpay.com/app/subscriptions', '_blank', 'noopener,noreferrer');
      return;
    }
    setPortalLoading(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('create-stripe-portal');
      if (fnError) throw fnError;
      if (data?.url) window.location.href = data.url;
    } catch (err) {
      setError(err?.message || 'Could not open billing portal');
    } finally {
      setPortalLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-16 bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="font-serif text-3xl font-semibold text-white tracking-tight">Account</h1>
        <p className="mt-2 text-sm text-slate-400">Manage your profile and subscription.</p>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Profile</h2>
          <dl className="mt-4 grid grid-cols-[120px,1fr] gap-y-3 text-sm">
            <dt className="text-slate-400">Name</dt>
            <dd className="text-white">{user.user_metadata?.full_name || '—'}</dd>
            <dt className="text-slate-400">Email</dt>
            <dd className="text-white">{user.email}</dd>
          </dl>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Subscription</h2>
              <div className="mt-3 flex items-center gap-3">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  isActive ? 'bg-sky-400/10 text-sky-300 border border-sky-400/30' : 'bg-slate-800 text-slate-400 border border-white/10'
                }`}>
                  {subscription?.status ?? (subLoading ? 'Loading…' : 'none')}
                </span>
                {subscription?.plan && <span className="text-sm text-slate-300">{subscription.plan}</span>}
              </div>
              {isActive && subscription?.current_period_end && (
                <p className="mt-3 text-xs text-slate-500">
                  Renews {formatDate(subscription.current_period_end)}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              {isActive ? (
                <Button
                  onClick={openPortal}
                  disabled={portalLoading}
                  variant="outline"
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
                >
                  {portalLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CreditCard className="w-4 h-4 mr-2" />}
                  Manage billing
                </Button>
              ) : (
                <Link
                  to="/Pricing"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm"
                >
                  Upgrade to Pro
                </Link>
              )}
            </div>
          </div>

          {error && (
            <div className="mt-4 text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-md px-3 py-2">
              {error}
            </div>
          )}
        </section>

        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
