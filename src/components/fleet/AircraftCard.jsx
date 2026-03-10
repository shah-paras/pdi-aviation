import { Plane, Users, Navigation, Gauge, Ruler, Check } from 'lucide-react';
import { useCurrency } from '@/hooks/use-currency';

const CATEGORY_COLORS = {
  'Very Light Jet': 'bg-emerald-500/90',
  'Light Jet': 'bg-sky-500/90',
  'Mid-Size Jet': 'bg-blue-500/90',
  'Super Mid-Size Jet': 'bg-indigo-500/90',
  'Heavy Jet': 'bg-purple-500/90',
  'Long Range Jet': 'bg-amber-500/90',
  'Ultra Long Range Jet': 'bg-rose-500/90',
  'VIP Airliner': 'bg-yellow-500/90',
};

const PRODUCTION_STATUS = {
  in_production: {
    label: 'In Production',
    classes: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  },
  discontinued: {
    label: 'Discontinued',
    classes: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  },
  in_development: {
    label: 'In Development',
    classes: 'bg-sky-500/20 text-sky-400 border border-sky-500/30',
  },
};

function formatCompactPrice(formatPrice, amount) {
  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    // Use formatPrice for currency symbol/locale, but we want compact display
    const formatted = formatPrice(amount, { maximumFractionDigits: 1, notation: 'compact' });
    return formatted;
  }
  return formatPrice(amount, { maximumFractionDigits: 0 });
}

export default function AircraftCard({ aircraft, isSelected, onToggleCompare, isCompareFull }) {
  const { formatPrice } = useCurrency();

  const {
    manufacturer,
    model,
    category,
    max_pax,
    max_range_nm,
    cruise_speed_ktas,
    cabin_height_ft,
    cabin_width_ft,
    production_status,
    new_price_usd,
    preowned_price_low_usd,
    thumbnail_url,
  } = aircraft;

  const categoryColor = CATEGORY_COLORS[category] || 'bg-slate-500/90';
  const status = PRODUCTION_STATUS[production_status];
  const hasCabinDimensions = cabin_height_ft && cabin_width_ft;

  const compareDisabled = isCompareFull && !isSelected;

  // Price display
  let priceLabel = null;
  if (new_price_usd) {
    priceLabel = (
      <p className="text-sm text-white font-medium">
        <span className="text-slate-500 text-xs font-normal">From </span>
        {formatCompactPrice(formatPrice, new_price_usd)}
      </p>
    );
  } else if (preowned_price_low_usd) {
    priceLabel = (
      <p className="text-sm text-white font-medium">
        <span className="text-slate-500 text-xs font-normal">Pre-owned from </span>
        {formatCompactPrice(formatPrice, preowned_price_low_usd)}
      </p>
    );
  } else {
    priceLabel = (
      <p className="text-sm text-slate-500 italic">Price on Request</p>
    );
  }

  return (
    <div
      className="bg-slate-900/80 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden
        hover:border-sky-500/30 hover:shadow-lg hover:shadow-sky-500/10 hover:-translate-y-1
        transition-all duration-300 group"
    >
      {/* Image area */}
      <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
        {thumbnail_url ? (
          <img
            src={thumbnail_url}
            alt={`${manufacturer} ${model}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Plane className="w-16 h-16 text-slate-700" />
          </div>
        )}

        {/* Category badge */}
        {category && (
          <span
            className={`absolute top-3 left-3 ${categoryColor}
              text-[10px] font-bold uppercase tracking-wider text-white
              px-2.5 py-1 rounded-full backdrop-blur-sm`}
          >
            {category}
          </span>
        )}

        {/* Compare checkbox */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (!compareDisabled) onToggleCompare?.(aircraft);
          }}
          disabled={compareDisabled}
          className={`absolute top-3 right-3 w-6 h-6 rounded-md flex items-center justify-center
            transition-colors border
            ${isSelected
              ? 'bg-sky-500 border-sky-500 text-white'
              : compareDisabled
                ? 'bg-white/5 border-white/10 text-slate-700 cursor-not-allowed opacity-40'
                : 'bg-white/5 border-white/20 text-slate-500 hover:border-white/40'
            }`}
          aria-label={isSelected ? 'Remove from comparison' : 'Add to comparison'}
        >
          {isSelected && <Check className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <p className="text-xs text-slate-500 uppercase tracking-wide">{manufacturer}</p>
        <h3 className="text-lg font-bold text-white leading-tight mt-0.5">{model}</h3>

        {/* Production status pill */}
        {status && (
          <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded-full inline-flex items-center gap-1 mt-2 ${status.classes}`}
          >
            {status.label}
          </span>
        )}

        {/* Specs grid */}
        <div className="grid grid-cols-2 gap-2.5 mt-4">
          {max_pax != null && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Users className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <span className="text-white font-medium">{max_pax}</span>
            </div>
          )}
          {max_range_nm != null && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Navigation className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <span className="text-white font-medium">{max_range_nm.toLocaleString()}</span>
              <span>nm</span>
            </div>
          )}
          {cruise_speed_ktas != null && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Gauge className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <span className="text-white font-medium">{cruise_speed_ktas}</span>
              <span>kts</span>
            </div>
          )}
          {hasCabinDimensions && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Ruler className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <span className="text-white font-medium">
                {cabin_height_ft}&times;{cabin_width_ft}
              </span>
              <span>ft</span>
            </div>
          )}
        </div>

        {/* Footer: price + compare */}
        <div className="border-t border-white/5 pt-3 mt-3 flex items-center justify-between">
          {priceLabel}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (!compareDisabled) onToggleCompare?.(aircraft);
            }}
            disabled={compareDisabled}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors flex-shrink-0
              ${isSelected
                ? 'bg-sky-500 text-white'
                : compareDisabled
                  ? 'bg-white/5 text-slate-600 cursor-not-allowed'
                  : 'bg-white/5 hover:bg-white/10 text-slate-400'
              }`}
          >
            {isSelected ? 'Selected' : 'Compare'}
          </button>
        </div>
      </div>
    </div>
  );
}
