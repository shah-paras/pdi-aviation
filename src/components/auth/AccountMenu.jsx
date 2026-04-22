import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, CreditCard, ChevronDown } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthProvider';
import { useSubscription } from '@/lib/auth/useSubscription';
import { TIERS, TIER_COLORS } from '@/config/tiers';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function initials(user) {
  const name = user?.user_metadata?.full_name || user?.email || '';
  return name
    .split(/\s+|@/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? '')
    .join('') || 'U';
}

export default function AccountMenu({ variant = 'desktop' }) {
  const { user, signOut } = useAuth();
  const { isActive, tier } = useSubscription();
  const navigate = useNavigate();

  if (!user) {
    return (
      <Link
        to="/Login"
        className={
          variant === 'desktop'
            ? 'px-3 py-1.5 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors'
            : 'flex items-center justify-center gap-2 w-full px-4 py-3 border border-white/10 text-white rounded-lg font-semibold text-sm'
        }
      >
        Log in
      </Link>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (variant === 'mobile') {
    return (
      <div className="pt-3 mt-3 border-t border-white/10 space-y-2">
        <div className="px-4 py-2 text-xs text-slate-400">
          {user.email}
          <span className={`ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide ${TIER_COLORS[tier]?.bg || 'bg-sky-400/10'} ${TIER_COLORS[tier]?.text || 'text-sky-300'}`}>
            {TIERS[tier]?.name || 'Free'}
          </span>
        </div>
        <Link
          to="/Account"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10"
        >
          <User className="w-5 h-5" />
          Account
        </Link>
        {!isActive && (
          <Link
            to="/Pricing"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10"
          >
            <CreditCard className="w-5 h-5" />
            Upgrade
          </Link>
        )}
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10"
        >
          <LogOut className="w-5 h-5" />
          Sign out
        </button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
        >
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold">
            {initials(user)}
          </span>
          <ChevronDown className="w-4 h-4 text-slate-300" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 bg-slate-950/95 backdrop-blur-xl border-white/10 text-slate-200"
      >
        <DropdownMenuLabel className="text-xs font-normal text-slate-400 truncate">
          {user.email}
        </DropdownMenuLabel>
        <div className="px-2 pb-2">
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide ${TIER_COLORS[tier]?.bg || 'bg-sky-400/10'} ${TIER_COLORS[tier]?.text || 'text-sky-300'} border ${TIER_COLORS[tier]?.border || 'border-sky-400/30'}`}>
            {TIERS[tier]?.name || 'Free'}
          </span>
        </div>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem asChild className="cursor-pointer focus:bg-white/10 focus:text-white">
          <Link to="/Account"><User className="w-4 h-4 mr-2" /> Account</Link>
        </DropdownMenuItem>
        {!isActive && (
          <DropdownMenuItem asChild className="cursor-pointer focus:bg-white/10 focus:text-white">
            <Link to="/Pricing"><CreditCard className="w-4 h-4 mr-2" /> Upgrade to Pro</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem
          onSelect={handleSignOut}
          className="cursor-pointer focus:bg-white/10 focus:text-white"
        >
          <LogOut className="w-4 h-4 mr-2" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
