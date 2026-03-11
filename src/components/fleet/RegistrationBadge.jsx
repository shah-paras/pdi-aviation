/**
 * Dark-themed badge for VT-XXX aircraft registration codes.
 * Color-coded by aircraft type: FW (blue), RW (green), B (amber).
 */

const typeStyles = {
  FW: 'bg-blue-500/20 text-blue-400',
  RW: 'bg-emerald-500/20 text-emerald-400',
  B: 'bg-amber-500/20 text-amber-400',
};

export default function RegistrationBadge({ registration, type }) {
  const colorClass = typeStyles[type] || 'bg-slate-500/20 text-slate-400';

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono font-medium ${colorClass}`}
    >
      {registration}
    </span>
  );
}
