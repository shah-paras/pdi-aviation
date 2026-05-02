// ─── Tier definitions — single source of truth ─────────────────────────────

export const TIER_ORDER = ['curious', 'enthusiast', 'insider'];

export const PAID_TIERS = ['enthusiast', 'insider'];

// ─── Per-tier metadata ──────────────────────────────────────────────────────

export const TIERS = {
  curious: {
    name: 'Curious',
    tagline: 'Just getting started',
    icon: '✦',        // ✦
    iconBg: 'rgba(68,85,119,0.3)',
    accentColor: 'slate',
    dotColor: '#334466',
    price: { monthly: null, annual: null },
    popular: false,
    btnLabel: 'Start free →',
    btnVariant: 'outline',
    features: {
      'Compare Aircraft': [
        { text: '1 aircraft, basic specs', active: true },
        { text: 'PDF export', active: false },
      ],
      'Range Map': [
        { text: 'Default view only', active: true },
        { text: 'Select aircraft model', active: false },
      ],
      'Finance Calculator': [
        { text: 'View sample output', active: true },
        { text: 'Edit inputs', active: false },
      ],
      'Fleet Directory': [{ text: 'Top 10 operators', active: true }],
    },
  },

  enthusiast: {
    name: 'Enthusiast',
    tagline: 'Deep into aviation',
    icon: '✈',        // ✈
    iconBg: 'rgba(56,139,229,0.15)',
    accentColor: 'sky',
    dotColor: '#388be5',
    price: { monthly: 299, annual: 2990 },
    popular: true,
    btnLabel: 'Subscribe →',
    btnVariant: 'blue',
    features: {
      'Compare Aircraft': [
        { text: '2 aircraft, full specs', active: true },
        { text: 'PDF export', active: true },
      ],
      'Range Map': [
        { text: 'Any aircraft + any origin', active: true },
        { text: '50% + 100% range rings', active: true },
        { text: 'Destination search', active: true },
      ],
      'Finance Calculator': [
        { text: 'All inputs editable', active: true },
        { text: 'Full cost breakdown', active: true },
      ],
      'Fleet Directory': [
        { text: 'All 137 operators', active: true },
      ],
    },
  },

  insider: {
    name: 'Insider',
    tagline: 'Obsessed with aviation',
    icon: '◈',        // ◈
    iconBg: 'rgba(155,127,244,0.15)',
    accentColor: 'violet',
    dotColor: '#9b7ff4',
    price: { monthly: 499, annual: 4990 },
    popular: false,
    btnLabel: 'Subscribe →',
    btnVariant: 'purple',
    features: {
      'Compare Aircraft': [
        { text: '2 aircraft, full specs', active: true },
        { text: 'PDF export', active: true },
        { text: '3rd comparison slot', active: true, isNew: true },
        { text: 'Save & revisit comparisons', active: true, isNew: true },
      ],
      'Range Map': [
        { text: 'Any aircraft + any origin', active: true },
        { text: '50% + 100% range rings', active: true },
        { text: 'Destination search', active: true },
        { text: 'Multi-city range planning', active: true, isNew: true },
      ],
      'Finance Calculator': [
        { text: 'All inputs editable', active: true },
        { text: 'Full cost breakdown', active: true },
      ],
      'Fleet Directory': [
        { text: 'All 137 operators', active: true },
        { text: 'Full fleet CSV export', active: true, isNew: true },
      ],
    },
  },
};

// ─── Comparison table rows ──────────────────────────────────────────────────

export const COMPARISON_ROWS = [
  { section: 'Aircraft Comparison' },
  { label: 'Aircraft slots', values: ['1', '2', '3'] },
  { label: 'Full spec sheet', values: [false, true, true] },
  { label: 'PDF export', values: [false, true, true] },
  { label: 'Save comparisons', values: [false, false, 'purple'] },
  { section: 'Range Map' },
  { label: 'Select aircraft model', values: [false, true, true] },
  { label: '50% range ring', values: [false, true, true] },
  { label: 'Multi-city planning', values: [false, false, 'purple'] },
  { section: 'Finance Calculator' },
  { label: 'Edit inputs', values: [false, true, true] },
  { label: 'Amortisation schedule', values: [false, true, true] },
  { section: 'Fleet Directory' },
  { label: 'Operators visible', values: ['Top 10', 'All 137', 'All 137'] },
  { label: 'CSV export', values: [false, false, 'purple'] },
];

// ─── FAQs ───────────────────────────────────────────────────────────────────

export const FAQS = [
  {
    q: 'Can I cancel anytime?',
    a: "Yes. You can cancel your subscription at any time from your account settings. You'll retain access until the end of your current billing period.",
  },
  {
    q: 'Is GST included in the price?',
    a: 'GST is charged additionally at 18% on all paid plans as required by Indian tax regulations. Your invoice will reflect the GST amount separately.',
  },
  {
    q: 'Which payment methods are accepted?',
    a: "We accept all major UPI apps, credit/debit cards, net banking, and wallets via Razorpay — India's most trusted payment gateway.",
  },
  {
    q: 'Can I upgrade or downgrade my plan?',
    a: 'Absolutely. You can switch plans at any time. Upgrades take effect immediately; downgrades apply from your next billing cycle.',
  },
  {
    q: 'Do I need to own or buy a jet to subscribe?',
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
    text: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-400/30',
    dot: '#9b7ff4',
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
    comparisonFullSpecs: false,
    comparisonPdfExport: false,
    comparisonSave: false,
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
    comparisonSlots: 2,
    comparisonFullSpecs: true,
    comparisonPdfExport: true,
    comparisonSave: false,
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
    comparisonSave: true,
    rangeSelectModel: true,
    rangeSelectOrigin: true,
    rangeRings50: true,
    rangeMultiCity: true,
    financeEditInputs: true,
    fleetSearchFilter: true,
    fleetCsvExport: true,
    blogArticlesPerMonth: Infinity,
    marketReports: false,
  },
};

export function getTierLimits(tierName) {
  return TIER_LIMITS[tierName] || TIER_LIMITS.curious;
}
