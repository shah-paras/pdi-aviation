// ─── Tier definitions — single source of truth ─────────────────────────────

export const TIER_ORDER = ['curious', 'enthusiast', 'insider', 'superfan'];

export const PAID_TIERS = ['enthusiast', 'insider', 'superfan'];

// ─── Per-tier metadata ──────────────────────────────────────────────────────

export const TIERS = {
  curious: {
    name: 'Curious',
    tagline: 'Just getting started',
    icon: '\u2726',        // ✦
    iconBg: 'rgba(68,85,119,0.3)',
    accentColor: 'slate',
    dotColor: '#334466',
    price: { monthly: null, annual: null },
    popular: false,
    btnLabel: 'Start free \u2192',
    btnVariant: 'outline',
    features: {
      'Compare Aircraft': [
        { text: '2 aircraft, basic specs', active: true },
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
      'Blog': [{ text: '3 articles / month', active: true }],
    },
  },

  enthusiast: {
    name: 'Enthusiast',
    tagline: 'Deep into aviation',
    icon: '\u2708',        // ✈
    iconBg: 'rgba(56,139,229,0.15)',
    accentColor: 'sky',
    dotColor: '#388be5',
    price: { monthly: 199, annual: 1990 },
    popular: true,
    btnLabel: 'Subscribe \u2192',
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
      ],
      'Finance Calculator': [
        { text: 'All inputs editable', active: true },
        { text: 'Full cost breakdown', active: true },
        { text: 'INR + USD toggle', active: true },
      ],
      'Fleet Directory': [
        { text: 'All 137 operators', active: true },
        { text: 'Search + state filter', active: true },
      ],
      'Blog': [{ text: 'Unlimited articles', active: true }],
    },
  },

  insider: {
    name: 'Insider',
    tagline: 'Obsessed with aviation',
    icon: '\u25C8',        // ◈
    iconBg: 'rgba(155,127,244,0.15)',
    accentColor: 'violet',
    dotColor: '#9b7ff4',
    price: { monthly: 499, annual: 4990 },
    popular: false,
    btnLabel: 'Subscribe \u2192',
    btnVariant: 'purple',
    features: {
      'Everything in Enthusiast, plus': [
        { text: 'Save & revisit comparisons', active: true },
        { text: 'Multi-city range planning', active: true },
        { text: 'Full fleet CSV export', active: true },
        { text: 'Early blog access', active: true },
        { text: 'Exclusive market reports', active: true },
        { text: 'Monthly Q&A with PDI team', active: true },
        { text: 'Members-only insights', active: true },
      ],
    },
  },

  superfan: {
    name: 'Superfan',
    tagline: 'The ultimate aviation nerd',
    icon: '\u2605',        // ★
    iconBg: 'rgba(245,166,35,0.15)',
    accentColor: 'amber',
    dotColor: '#f5a623',
    price: { monthly: 999, annual: 9990 },
    popular: false,
    btnLabel: 'Subscribe \u2192',
    btnVariant: 'amber',
    features: {
      'Everything in Insider, plus': [
        { text: 'Annual fleet industry report', active: true },
        { text: 'Behind-the-scenes content', active: true },
        { text: 'Private WhatsApp community', active: true },
        { text: 'Vote on new features', active: true },
        { text: 'Name in PDI credits', active: true },
        { text: '30-min annual call with PDI', active: true },
        { text: 'Merch discount (coming soon)', active: true },
      ],
    },
  },
};

// ─── Comparison table rows ──────────────────────────────────────────────────

export const COMPARISON_ROWS = [
  { section: 'Aircraft Comparison' },
  { label: 'Aircraft slots', values: ['2', '3', '3', '3'] },
  { label: 'Full spec sheet', values: [false, true, true, true] },
  { label: 'PDF export', values: [false, true, true, true] },
  { label: 'Save comparisons', values: [false, false, 'purple', 'amber'] },
  { section: 'Range Map' },
  { label: 'Select aircraft model', values: [false, true, true, true] },
  { label: '50% range ring', values: [false, true, true, true] },
  { label: 'Multi-city planning', values: [false, false, 'purple', 'amber'] },
  { section: 'Finance Calculator' },
  { label: 'Edit inputs', values: [false, true, true, true] },
  { label: 'Amortisation schedule', values: [false, true, true, true] },
  { label: 'INR \u2194 USD toggle', values: [false, true, true, true] },
  { section: 'Fleet Directory' },
  { label: 'Operators visible', values: ['Top 10', 'All 137', 'All 137', 'All 137'] },
  { label: 'Search + filter', values: [false, true, true, true] },
  { label: 'CSV export', values: [false, false, 'purple', 'amber'] },
  { section: 'Community & Content' },
  { label: 'Blog articles', values: ['3/month', 'Unlimited', 'Unlimited', 'Unlimited'] },
  { label: 'Market reports', values: [false, false, 'purple', 'amber'] },
  { label: 'Monthly PDI Q&A', values: [false, false, 'purple', 'amber'] },
  { label: 'Private WhatsApp group', values: [false, false, false, 'amber'] },
  { label: 'Annual call with PDI', values: [false, false, false, 'amber'] },
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
    a: "We accept all major UPI apps, credit/debit cards, net banking, and wallets via Razorpay \u2014 India's most trusted payment gateway.",
  },
  {
    q: 'Can I upgrade or downgrade my plan?',
    a: 'Absolutely. You can switch plans at any time. Upgrades take effect immediately; downgrades apply from your next billing cycle.',
  },
  {
    q: 'What is the PDI monthly Q&A?',
    a: 'Every month, Insider and Superfan members submit questions answered live by the PDI Aviation team \u2014 covering aircraft buying, market trends, and industry insights.',
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
  superfan: {
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-400/30',
    dot: '#f5a623',
  },
};

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Returns the index of `tierName` in TIER_ORDER, or 0 if not found. */
export function getTierIndex(tierName) {
  const idx = TIER_ORDER.indexOf(tierName);
  return idx === -1 ? 0 : idx;
}

/** Returns true when the user's tier meets or exceeds the required tier. */
export function hasAccess(userTier, requiredTier) {
  return getTierIndex(userTier) >= getTierIndex(requiredTier);
}
