import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, CreditCard, Loader2, Pencil, Shield, X, Check, Mail } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthProvider';
import { useSubscription } from '@/lib/auth/useSubscription';
import { useProfile } from '@/hooks/useProfile';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TIERS, TIER_COLORS } from '@/config/tiers';
import PasswordSection from '@/components/auth/PasswordSection';

function formatDate(iso) {
  if (!iso) return '—';
  try {
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(iso));
  } catch {
    return iso;
  }
}

/* ── Inline-editable field ────────────────────────────────────────────────── */

function EditableField({ label, value, fieldKey, onSave, saving }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value || '');
  const [error, setError] = useState(null);

  const handleSave = async () => {
    setError(null);
    try {
      await onSave({ [fieldKey]: draft.trim() });
      setEditing(false);
    } catch (err) {
      setError(err?.message || 'Update failed');
    }
  };

  const handleCancel = () => {
    setDraft(value || '');
    setError(null);
    setEditing(false);
  };

  if (editing) {
    return (
      <>
        <dt className="text-slate-400 pt-2">{label}</dt>
        <dd className="pt-1">
          <div className="flex items-center gap-2">
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="h-8 max-w-[200px] bg-white/5 border-white/10 text-white text-sm"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') handleCancel();
              }}
            />
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 transition-colors disabled:opacity-50"
              title="Save"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleCancel}
              className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-white/5 text-slate-400 hover:bg-white/10 transition-colors"
              title="Cancel"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
        </dd>
      </>
    );
  }

  return (
    <>
      <dt className="text-slate-400">{label}</dt>
      <dd className="text-white flex items-center gap-2">
        <span>{value || '—'}</span>
        <button
          onClick={() => { setDraft(value || ''); setEditing(true); }}
          className="inline-flex items-center justify-center w-6 h-6 rounded-md text-slate-500 hover:text-sky-400 hover:bg-white/5 transition-colors"
          title={`Edit ${label.toLowerCase()}`}
        >
          <Pencil className="w-3 h-3" />
        </button>
      </dd>
    </>
  );
}

/* ── Email change row ─────────────────────────────────────────────────────── */

function EmailField({ email }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [status, setStatus] = useState(null); // { type, message }
  const [submitting, setSubmitting] = useState(false);

  const handleSave = async () => {
    if (!draft.trim()) return;
    setStatus(null);
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.updateUser({ email: draft.trim() });
      if (error) throw error;
      setStatus({ type: 'success', message: 'Verification email sent to your new address' });
      setEditing(false);
      setDraft('');
    } catch (err) {
      setStatus({ type: 'error', message: err?.message || 'Could not update email' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <dt className="text-slate-400">Email</dt>
      <dd>
        <div className="flex items-center gap-2">
          <span className="text-white">{email}</span>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="text-xs text-sky-400 hover:text-sky-300 transition-colors"
            >
              Change email
            </button>
          )}
        </div>

        {editing && (
          <div className="flex items-center gap-2 mt-2">
            <Input
              type="email"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="new@email.com"
              className="h-8 max-w-[220px] bg-white/5 border-white/10 text-white text-sm placeholder:text-slate-500"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') { setEditing(false); setDraft(''); setStatus(null); }
              }}
            />
            <button
              onClick={handleSave}
              disabled={submitting}
              className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 transition-colors disabled:opacity-50"
              title="Save"
            >
              {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Mail className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => { setEditing(false); setDraft(''); setStatus(null); }}
              className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-white/5 text-slate-400 hover:bg-white/10 transition-colors"
              title="Cancel"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {status && (
          <p className={`text-xs mt-1.5 ${status.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
            {status.message}
          </p>
        )}
      </dd>
    </>
  );
}

/* ── Main Account page ────────────────────────────────────────────────────── */

export default function Account() {
  const { user, loading: authLoading, signOut } = useAuth();
  const { subscription, isActive, tier, isLoading: subLoading } = useSubscription();
  const { profile, isLoading: profileLoading, updateProfile } = useProfile();
  const navigate = useNavigate();
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState(null);

  if (authLoading) return null;
  if (!user) return <Navigate to="/Login?next=/Account" replace />;

  const hasGoogleIdentity = user?.identities?.some((i) => i.provider === 'google');

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

  const handleProfileSave = async (updates) => {
    await updateProfile.mutateAsync(updates);
  };

  const displayName = profile?.full_name || user.user_metadata?.full_name || '';
  const displayCountry = profile?.country || user.user_metadata?.country || '';

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-16 bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="font-serif text-3xl font-semibold text-white tracking-tight">Account</h1>
        <p className="mt-2 text-sm text-slate-400">Manage your profile, security, and subscription.</p>

        {/* ── Profile section ──────────────────────────────────────────────── */}
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Profile</h2>

          {profileLoading ? (
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading profile…
            </div>
          ) : (
            <dl className="mt-4 grid grid-cols-[120px,1fr] gap-y-3 text-sm">
              <EditableField
                label="Name"
                value={displayName}
                fieldKey="full_name"
                onSave={handleProfileSave}
                saving={updateProfile.isPending}
              />
              <EditableField
                label="Country"
                value={displayCountry}
                fieldKey="country"
                onSave={handleProfileSave}
                saving={updateProfile.isPending}
              />
              <EmailField email={user.email} />
            </dl>
          )}
        </section>

        {/* ── Security section ─────────────────────────────────────────────── */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-slate-400" />
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Security</h2>
          </div>

          {hasGoogleIdentity && (
            <div className="flex items-center gap-2 mt-4">
              <span className="text-xs text-slate-400">Linked accounts:</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-xs text-slate-300">
                Google
              </span>
            </div>
          )}

          <PasswordSection />
        </section>

        {/* ── Subscription section ─────────────────────────────────────────── */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Subscription</h2>
              <div className="mt-3 flex items-center gap-3">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  isActive
                    ? `${TIER_COLORS[tier]?.bg ?? 'bg-sky-400/10'} ${TIER_COLORS[tier]?.text ?? 'text-sky-300'} border ${TIER_COLORS[tier]?.border ?? 'border-sky-400/30'}`
                    : 'bg-slate-800 text-slate-400 border border-white/10'
                }`}>
                  {subLoading ? 'Loading…' : (TIERS[tier]?.name ?? 'Free')}
                </span>
                {isActive && subscription?.plan && (
                  <span className="text-sm text-slate-300 capitalize">{subscription.plan}</span>
                )}
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
                  View plans
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

        {/* ── Sign out ─────────────────────────────────────────────────────── */}
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
