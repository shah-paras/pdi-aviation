export function OperatorsIcon({ className }) {
  return (
    <svg className={className} width="28" height="28" viewBox="-22 -20 44 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="-9" y="-18" width="18" height="11" rx="2.5" fill="#38BDF8" />
      <line x1="0" y1="-7" x2="0" y2="-1" stroke="#38BDF8" strokeWidth="1.8" />
      <line x1="-13" y1="-1" x2="13" y2="-1" stroke="#38BDF8" strokeWidth="1.8" />
      <line x1="-13" y1="-1" x2="-13" y2="4" stroke="#38BDF8" strokeWidth="1.8" />
      <line x1="13" y1="-1" x2="13" y2="4" stroke="#38BDF8" strokeWidth="1.8" />
      <rect x="-20" y="4" width="14" height="10" rx="2.5" stroke="#38BDF8" strokeWidth="1.8" fill="none" />
      <rect x="6" y="4" width="14" height="10" rx="2.5" stroke="#38BDF8" strokeWidth="1.8" fill="none" />
    </svg>
  );
}

export function AircraftIcon({ className }) {
  return (
    <svg className={className} width="28" height="28" viewBox="-28 -24 56 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 -22 Q4 -12 4 0 Q4 13 0 22 Q-4 13 -4 0 Q-4 -12 0 -22Z" fill="#38BDF8" />
      <path d="M-3 -5 L-26 5 L-26 10 L-3 3Z" fill="rgba(56,189,248,0.45)" stroke="#38BDF8" strokeWidth="1.5" />
      <path d="M3 -5 L26 5 L26 10 L3 3Z" fill="rgba(56,189,248,0.45)" stroke="#38BDF8" strokeWidth="1.5" />
      <path d="M-2 14 L-12 19 L-12 22 L-2 18Z" fill="rgba(56,189,248,0.6)" stroke="#38BDF8" strokeWidth="1.3" />
      <path d="M2 14 L12 19 L12 22 L2 18Z" fill="rgba(56,189,248,0.6)" stroke="#38BDF8" strokeWidth="1.3" />
    </svg>
  );
}

export function FixedWingIcon({ className }) {
  return (
    <svg className={className} width="28" height="28" viewBox="-30 -18 58 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M-22 2 Q-12 -3 0 -2 L18 -2 Q23 -2 25 2 Q23 6 18 6 L0 6 Q-12 7 -22 2Z" fill="rgba(56,189,248,0.18)" stroke="#38BDF8" strokeWidth="1.8" />
      <path d="M18 0.5 L27 2 L18 3.5" fill="#38BDF8" />
      <path d="M2 -2 L-18 -16 L-10 -16 L5 -2" fill="rgba(56,189,248,0.55)" stroke="#38BDF8" strokeWidth="1.5" />
      <path d="M2 6 L-18 18 L-10 18 L5 6" fill="rgba(56,189,248,0.3)" stroke="#38BDF8" strokeWidth="1.3" />
      <path d="M-20 -2 L-27 -12 L-19 -7" fill="rgba(56,189,248,0.5)" stroke="#38BDF8" strokeWidth="1.4" />
      <line x1="-22" y1="2" x2="-28" y2="-1" stroke="#38BDF8" strokeWidth="1.5" />
      <line x1="-22" y1="2" x2="-28" y2="5" stroke="#38BDF8" strokeWidth="1.5" />
    </svg>
  );
}

export function StatesCoveredIcon({ className }) {
  return (
    <svg className={className} width="28" height="28" viewBox="-24 -24 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M-20 -6 L-22 -16 L-10 -22 L2 -19 L12 -22 L22 -14 L20 -4 L22 6 L12 14 L4 20 L-4 18 L-14 12 L-22 4 Z" fill="rgba(56,189,248,0.1)" stroke="#38BDF8" strokeWidth="1.6" />
      <circle cx="8" cy="-2" r="11" stroke="rgba(56,189,248,0.28)" strokeWidth="1.2" strokeDasharray="3 2.5" />
      <circle cx="8" cy="-2" r="6" stroke="rgba(56,189,248,0.55)" strokeWidth="1.2" />
      <circle cx="8" cy="-2" r="3.5" fill="#38BDF8" />
      <line x1="8" y1="1.5" x2="8" y2="8" stroke="#38BDF8" strokeWidth="2" />
      <circle cx="8" cy="8" r="1.8" fill="#38BDF8" />
    </svg>
  );
}
