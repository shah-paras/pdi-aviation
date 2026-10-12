// ─── Tier definitions — single source of truth ─────────────────────────────

export const TIER_ORDER = ['curious', 'enthusiast', 'insider'];

export const PAID_TIERS = ['enthusiast', 'insider'];

// The only plan on sale: a one-time lifetime purchase that unlocks the
// top tier. Legacy 'enthusiast' stays defined so existing gating still works.
export const LIFETIME_TIER = 'insider';
export const LIFETIME_PRICE_INR = 999;
// Founding offer: first N members get lifetime; afterwards ₹999/year.
// Display defaults only — the server (FOUNDING_LIMIT secret) is authoritative.
export const FOUNDING_LIMIT = 500;

// ─── Per-tier metadata ──────────────────────────────────────────────────────

export const TIERS = {
  curious: {
    name: 'Curious',
    tagline: 'Just getting started',
    icon: '✦',        // ✦
    iconBg: 'rgba(68,85,119,0.3)',
    accentColor: 'slate',
    dotColor: '#334466',
    price: null,
    popular: false,
    btnLabel: 'Start free →',
    btnVariant: 'outline',
    features: {
      'Compare Aircraft': [
        { text: '1 aircraft slot', active: true },
        { text: 'PDF export', active: false },
      ],
      'Range Map': [
        { text: 'Default view only', active: true },
        { text: 'Select aircraft model', active: false },
      ],
      'Finance Calculator': [
        { text: 'Pre-selected demo aircraft', active: true },
        { text: 'Edit inputs & manual mode', active: false },
      ],
      'Fleet Directory': [{ text: 'All 137 operators', active: true }],
    },
  },

  enthusiast: {
    name: 'Enthusiast',
    tagline: 'Deep into aviation',
    icon: '✈',        // ✈
    iconBg: 'rgba(56,139,229,0.15)',
    accentColor: 'sky',
    dotColor: '#388be5',
    price: null,
    popular: true,
    btnLabel: 'Subscribe →',
    btnVariant: 'blue',
    features: {
      'Compare Aircraft': [
        { text: '3 aircraft, full specs', active: true },
        { text: 'PDF export', active: false },
      ],
      'Range Map': [
        { text: 'Any aircraft + any origin', active: true },
        { text: '50% + 100% range rings', active: true },
        { text: 'Destination search', active: true },
      ],
      'Finance Calculator': [
        { text: 'All inputs editable', active: true },
        { text: 'Full cost breakdown', active: true },
        { text: 'PDF & CSV export', active: false },
      ],
      'Fleet Directory': [
        { text: 'All 137 operators', active: true },
      ],
    },
  },

  insider: {
    name: 'Lifetime',
    tagline: 'One payment. Full access, forever.',
    icon: '◈',        // ◈
    iconBg: 'rgba(56,139,229,0.15)',
    accentColor: 'sky',
    dotColor: '#388be5',
    price: LIFETIME_PRICE_INR,
    popular: true,
    btnLabel: 'Get lifetime access →',
    btnVariant: 'blue',
    features: {
      'Compare Aircraft': [
        { text: '3 aircraft, full specs', active: true },
        { text: 'PDF export', active: true },
      ],
      'Range Map': [
        { text: 'Any aircraft + any origin', active: true },
        { text: '50% + 100% range rings', active: true },
        { text: 'Destination search', active: true },
        { text: 'Multi-city range planning', active: true },
      ],
      'Finance Calculator': [
        { text: 'All inputs editable', active: true },
        { text: 'Full cost breakdown', active: true },
        { text: 'PDF & CSV export', active: true },
      ],
      'Fleet Directory': [
        { text: 'All 137 operators', active: true },
        { text: 'Full fleet CSV export', active: true },
      ],
    },
  },
};

// ─── Comparison table rows ──────────────────────────────────────────────────

// Columns: [Free, Lifetime]
export const COMPARISON_TIERS = ['curious', LIFETIME_TIER];

export const COMPARISON_ROWS = [
  { section: 'Aircraft Comparison' },
  { label: 'Aircraft slots', values: ['1', '3'] },
  { label: 'Full spec sheet', values: [true, true] },
  { label: 'PDF export', values: [false, true] },
  { section: 'Range Map' },
  { label: 'Select aircraft model', values: [false, true] },
  { label: '50% range ring', values: [false, true] },
  { label: 'Multi-city planning', values: [false, true] },
  { section: 'Finance Calculator' },
  { label: 'Edit inputs', values: [false, true] },
  { label: 'Amortisation schedule', values: [false, true] },
  { label: 'PDF export', values: [false, true] },
  { label: 'CSV export', values: [false, true] },
  { section: 'Fleet Directory' },
  { label: 'Operators visible', values: ['All 137', 'All 137'] },
  { label: 'CSV export', values: [false, true] },
];

// ─── FAQs ───────────────────────────────────────────────────────────────────

export const FAQS = [
  {
    q: 'What is the founding member offer?',
    a: `The first ${FOUNDING_LIMIT} members pay ₹${LIFETIME_PRICE_INR} once and get lifetime access — no renewals, ever. Once those spots are gone, membership becomes ₹${LIFETIME_PRICE_INR} per year.`,
  },
  {
    q: 'Can I cancel the yearly plan?',
    a: "Yes. The yearly plan renews automatically and you can cancel anytime — you keep access until the end of the year you've paid for. Founding lifetime members never pay again.",
  },
  {
    q: 'Is GST included in the price?',
    a: 'All prices shown are inclusive. No additional GST is charged at checkout.',
  },
  {
    q: 'Which payment methods are accepted?',
    a: "We accept all major UPI apps, credit/debit cards, net banking, and wallets via Razorpay — India's most trusted payment gateway.",
  },
  {
    q: 'Do I need to own or buy a jet to sign up?',
    a: 'Not at all. Most of our members are aviation enthusiasts, content followers, and dreamers. This platform is for anyone passionate about private aviation in India.',
  },
];

// ─── Tier color palette ─────────────────────────────────────────────────────

export const TIER_COLORS = {
  curious: {
    text: 'text-slate-400',
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/30',
    dot: '#334466',
  },
  enthusiast: {
    text: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-400/30',
    dot: '#388be5',
  },
  insider: {
    text: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-400/30',
    dot: '#388be5',
  },
};

// ─── Helpers ────────────────────────────────────────────────────────────────

export function getTierIndex(tierName) {
  const idx = TIER_ORDER.indexOf(tierName);
  return idx === -1 ? 0 : idx;
}

export function hasAccess(userTier, requiredTier) {
  return getTierIndex(userTier) >= getTierIndex(requiredTier);
}

// ─── Per-tier feature limits ──────────────────────────────────────────────────

export const TIER_LIMITS = {
  curious: {
    comparisonSlots: 1,
    comparisonFullSpecs: true,
    comparisonPdfExport: false,
    rangeSelectModel: false,
    rangeSelectOrigin: false,
    rangeRings50: false,
    rangeMultiCity: false,
    financeEditInputs: false,
    fleetSearchFilter: true,
    fleetCsvExport: false,
    blogArticlesPerMonth: Infinity,
    marketReports: false,
  },
  enthusiast: {
    comparisonSlots: 3,
    comparisonFullSpecs: true,
    comparisonPdfExport: false,
    rangeSelectModel: true,
    rangeSelectOrigin: true,
    rangeRings50: true,
    rangeMultiCity: false,
    financeEditInputs: true,
    fleetSearchFilter: true,
    fleetCsvExport: false,
    blogArticlesPerMonth: Infinity,
    marketReports: false,
  },
  insider: {
    comparisonSlots: 3,
    comparisonFullSpecs: true,
    comparisonPdfExport: true,
    rangeSelectModel: true,
    rangeSelectOrigin: true,
    rangeRings50: true,
    rangeMultiCity: true,
    financeEditInputs: true,
    financePdfExport: true,
    financeCsvExport: true,
    fleetSearchFilter: true,
    fleetCsvExport: true,
    blogArticlesPerMonth: Infinity,
    marketReports: false,
  },
};

export function getTierLimits(tierName) {
  return TIER_LIMITS[tierName] || TIER_LIMITS.curious;
}
