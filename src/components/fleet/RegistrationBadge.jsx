/**
 * Styled badge for VT-XXX aircraft registration codes.
 * Color-coded by aircraft type: FW (blue), RW (green), B (amber).
 */

const typeStyles = {
  FW: 'bg-blue-100 text-blue-700',
  RW: 'bg-emerald-100 text-emerald-700',
  B: 'bg-amber-100 text-amber-700',
};

export default function RegistrationBadge({ registration, type }) {
  const colorClass = typeStyles[type] || 'bg-slate-100 text-slate-700';

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono font-medium ${colorClass}`}
    >
      {registration}
    </span>
  );
}
