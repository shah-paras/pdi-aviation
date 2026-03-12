import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plane,
  Gauge,
  Ruler,
  DollarSign,
  Navigation,
  Zap,
  Users,
  Wind,
  BarChart3,
  Trophy,
} from 'lucide-react';
import { useCurrency } from '@/hooks/use-currency';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Pick the "best" value index from an array of numbers.
 *  `dir` = 'max' means higher is better, 'min' means lower is better.
 *  Returns an array of booleans aligned with `values`. */
function bestIndices(values, dir = 'max') {
  const nums = values.map(v => (typeof v === 'number' && !Number.isNaN(v) ? v : null));
  const validNums = nums.filter(n => n !== null);
  if (validNums.length < 2) return nums.map(() => false);

  const target = dir === 'max' ? Math.max(...validNums) : Math.min(...validNums);
  return nums.map(n => n !== null && n === target);
}

function fmtNum(value, unit = '') {
  if (value == null || value === '' || Number.isNaN(value)) return 'N/A';
  const formatted = typeof value === 'number' ? value.toLocaleString() : value;
  return unit ? `${formatted} ${unit}` : formatted;
}

// ---------------------------------------------------------------------------
// Spec section definitions
// ---------------------------------------------------------------------------

function buildSections(formatPrice) {
  return [
    {
      title: 'Performance',
      icon: Gauge,
      rows: [
        {
          label: 'Max Range',
          key: 'max_range_nm',
          format: v => fmtNum(v, 'nm'),
          best: 'max',
          icon: Navigation,
        },
        {
          label: 'Cruise Speed',
          key: 'cruise_speed_ktas',
          format: v => fmtNum(v, 'ktas'),
          best: 'max',
          icon: Zap,
        },
        {
          label: 'Engines',
          key: 'engines',
          format: v => v || 'N/A',
          best: null,
          icon: Wind,
        },
      ],
    },
    {
      title: 'Dimensions',
      icon: Ruler,
      rows: [
        {
          label: 'Max Passengers',
          key: 'max_pax',
          format: v => fmtNum(v),
          best: 'max',
          icon: Users,
        },
        {
          label: 'Cabin Height',
          key: 'cabin_height_ft',
          format: v => fmtNum(v, 'ft'),
          best: 'max',
          icon: Ruler,
        },
        {
          label: 'Cabin Width',
          key: 'cabin_width_ft',
          format: v => fmtNum(v, 'ft'),
          best: 'max',
          icon: Ruler,
        },
        {
          label: 'Cabin Length',
          key: 'cabin_length_ft',
          format: v => fmtNum(v, 'ft'),
          best: 'max',
          icon: Ruler,
        },
      ],
    },
    {
      title: 'Pricing',
      icon: DollarSign,
      rows: [
        {
          label: 'New Price',
          key: 'new_price_usd',
          format: v => (typeof v === 'number' ? formatPrice(v) : 'N/A'),
          best: 'min',
          icon: DollarSign,
        },
        {
          label: 'Pre-Owned Low',
          key: 'preowned_price_low_usd',
          format: v => (typeof v === 'number' ? formatPrice(v) : 'N/A'),
          best: 'min',
          icon: DollarSign,
        },
        {
          label: 'Pre-Owned High',
          key: 'preowned_price_high_usd',
          format: v => (typeof v === 'number' ? formatPrice(v) : 'N/A'),
          best: null,
          icon: DollarSign,
        },
        {
          label: 'Production Status',
          key: 'production_status',
          format: v => {
            if (v === 'in_production') return 'In Production';
            if (v === 'discontinued') return 'Discontinued';
            if (v === 'in_development') return 'In Development';
            return 'N/A';
          },
          best: null,
          icon: BarChart3,
        },
      ],
    },
  ];
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-24 px-6 text-center"
    >
      <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center mb-6">
        <Plane className="w-10 h-10 text-slate-500" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">
        No Aircraft Selected
      </h3>
      <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
        Select up to 3 aircraft from the panel on the left to see a detailed
        side-by-side comparison of their specifications.
      </p>
    </motion.div>
  );
}

function AircraftHeader({ model, index }) {
  return (
    <motion.th
      key={model.id}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: index * 0.05 }}
      className="px-4 py-5 text-center align-top"
    >
      <div className="flex flex-col items-center gap-3">
        {model.thumbnail_url ? (
          <img
            src={model.thumbnail_url}
            alt={`${model.manufacturer} ${model.model}`}
            className="w-28 h-16 object-cover rounded-lg border border-white/10 shadow-sm"
            loading="lazy"
          />
        ) : (
          <div className="w-28 h-16 bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg flex items-center justify-center border border-white/10">
            <Plane className="w-7 h-7 text-slate-400" />
          </div>
        )}
        <div>
          <div className="font-semibold text-white text-sm leading-tight">
            {model.manufacturer}
          </div>
          <div className="font-bold text-white text-base leading-tight">
            {model.model}
          </div>
          <span className="inline-block mt-1.5 px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
            {model.category}
          </span>
        </div>
      </div>
    </motion.th>
  );
}

function SectionHeading({ section, colCount }) {
  const Icon = section.icon;
  return (
    <tr>
      <td
        colSpan={colCount + 1}
        className="px-4 pt-6 pb-2 bg-slate-900/60"
      >
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {section.title}
          </span>
        </div>
      </td>
    </tr>
  );
}

function SpecRow({ row, models, rowIndex }) {
  const values = models.map(m => m[row.key]);
  const best = row.best ? bestIndices(values, row.best) : values.map(() => false);
  const Icon = row.icon;

  return (
    <motion.tr
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.02 * rowIndex }}
      className="border-t border-white/5 hover:bg-white/5 transition-colors"
    >
      <td className="px-4 py-3 text-sm text-slate-300 font-medium whitespace-nowrap">
        <div className="flex items-center gap-2">
          <Icon className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
          {row.label}
        </div>
      </td>
      {models.map((model, i) => (
        <td key={model.id} className="px-4 py-3 text-sm text-center font-medium">
          <span className={best[i] ? 'text-emerald-400 font-semibold' : 'text-slate-200'}>
            {row.format(model[row.key])}
          </span>
          {best[i] && (
            <Trophy className="inline-block w-3 h-3 ml-1 text-emerald-400 -mt-0.5" />
          )}
        </td>
      ))}
    </motion.tr>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function ComparisonTable({ selectedAircraft, aircraft }) {
  const { formatPrice } = useCurrency();

  const models = useMemo(
    () =>
      selectedAircraft
        .map(id => aircraft.find(a => a.id === id))
        .filter(Boolean),
    [selectedAircraft, aircraft]
  );

  const sections = useMemo(() => buildSections(formatPrice), [formatPrice]);

  if (models.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-sm overflow-hidden">
        <EmptyState />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-sm overflow-hidden"
    >
      {/* Sticky heading bar */}
      <div className="px-5 py-3 bg-slate-900 border-b border-white/10 flex items-center gap-2">
        <BarChart3 className="w-4 h-4 text-slate-400" />
        <span className="text-sm font-semibold text-slate-300">
          Comparing {models.length} Aircraft
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-fixed min-w-[520px]">
          {/* Column widths */}
          <colgroup>
            <col className="w-44" />
            {models.map(m => (
              <col key={m.id} />
            ))}
          </colgroup>

          {/* Aircraft header row */}
          <thead>
            <tr className="border-b border-white/10 bg-slate-900/50">
              <th className="px-4 py-5" />
              <AnimatePresence mode="popLayout">
                {models.map((m, i) => (
                  <AircraftHeader key={m.id} model={m} index={i} />
                ))}
              </AnimatePresence>
            </tr>
          </thead>

          {/* Spec sections -- each section is its own <tbody> */}
          {sections.map(section => {
            // Only show section if at least one row has data
            const hasData = section.rows.some(row =>
              models.some(m => m[row.key] != null && m[row.key] !== '')
            );
            if (!hasData) return null;

            return (
              <tbody key={section.title}>
                <SectionHeading section={section} colCount={models.length} />
                {section.rows.map((row, ri) => (
                  <SpecRow
                    key={row.key}
                    row={row}
                    models={models}
                    rowIndex={ri}
                  />
                ))}
              </tbody>
            );
          })}
        </table>
      </div>
    </motion.div>
  );
}
