import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Check, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthProvider';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const setPasswordSchema = z
  .object({
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

function PasswordInput({ id, label, register, error }) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-slate-300">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={show ? 'text' : 'password'}
          autoComplete="new-password"
          className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 pr-10"
          {...register}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
          tabIndex={-1}
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {error && <p className="text-xs text-rose-400">{error.message}</p>}
    </div>
  );
}

export default function PasswordSection() {
  const { user } = useAuth();
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message }

  const hasEmailIdentity = user?.identities?.some((i) => i.provider === 'email');
  const hasGoogleIdentity = user?.identities?.some((i) => i.provider === 'google');

  const isChangeMode = hasEmailIdentity;
  const schema = isChangeMode ? changePasswordSchema : setPasswordSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values) => {
    setStatus(null);

    try {
      if (isChangeMode) {
        // Verify current password first
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: user.email,
          password: values.currentPassword,
        });
        if (signInError) {
          setStatus({ type: 'error', message: 'Current password is incorrect' });
          return;
        }
      }

      const { error } = await supabase.auth.updateUser({
        password: values.newPassword,
      });

      if (error) throw error;

      setStatus({
        type: 'success',
        message: isChangeMode
          ? 'Password changed successfully'
          : 'Password set successfully',
      });
      reset();
    } catch (err) {
      setStatus({
        type: 'error',
        message: err?.message || 'Something went wrong',
      });
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-white mb-3">
        {isChangeMode ? 'Change password' : 'Set a password'}
      </h3>

      {!isChangeMode && hasGoogleIdentity && (
        <p className="text-xs text-slate-500 mb-3">
          You signed up with Google. Set a password to also sign in with email.
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 max-w-sm">
        {isChangeMode && (
          <PasswordInput
            id="currentPassword"
            label="Current password"
            register={register('currentPassword')}
            error={errors.currentPassword}
          />
        )}

        <PasswordInput
          id="newPassword"
          label="New password"
          register={register('newPassword')}
          error={errors.newPassword}
        />

        <PasswordInput
          id="confirmPassword"
          label="Confirm password"
          register={register('confirmPassword')}
          error={errors.confirmPassword}
        />

        {status && (
          <div
            className={`text-sm rounded-md px-3 py-2 ${
              status.type === 'success'
                ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                : 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
            }`}
          >
            {status.type === 'success' && (
              <Check className="w-3.5 h-3.5 inline-block mr-1.5 -mt-0.5" />
            )}
            {status.message}
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-sky-500 hover:bg-sky-600 text-white"
        >
          {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {isChangeMode ? 'Update password' : 'Set password'}
        </Button>
      </form>
    </div>
  );
}
