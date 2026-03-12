/**
 * Dark-themed card displaying a single NSOP operator.
 * Compact card with fleet type summary and "View Fleet" button.
 */

import { memo } from 'react';
import {
  MapPin,
  Plane,
  Users,
  Shield,
  CalendarDays,
  Eye,
} from 'lucide-react';

const typeBadgeClass = {
  FW: 'bg-blue-500/20 text-blue-400',
  RW: 'bg-emerald-500/20 text-emerald-400',
  B: 'bg-amber-500/20 text-amber-400',
};

const typeLabel = { FW: 'FW', RW: 'RW', B: 'B' };

function OperatorCard({ operator, onViewFleet }) {
  if (!operator) return null;

  const fleet = operator.fleet || [];
  const validDate = operator.validUpto
    ? new Date(operator.validUpto).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'N/A';

  // Fleet type summary
  const typeCounts = {};
  const uniqueModels = new Set();
  for (const a of fleet) {
    typeCounts[a.type] = (typeCounts[a.type] || 0) + 1;
    uniqueModels.add(a.model);
  }

  const modelNames = [...uniqueModels].slice(0, 2);

  return (
    <div
      className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden
        hover:border-sky-500/30 hover:shadow-lg hover:shadow-sky-500/10
        focus-within:ring-1 focus-within:ring-sky-500/30
        transition-all duration-300 group"
    >
      {/* Card header */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold text-white leading-snug">
            {operator.name}
          </h3>
          <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-400">
            <Plane className="w-3 h-3" />
            {operator.totalAircraft}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-slate-400 mb-1.5">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">
            {operator.city}, {operator.state}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <Shield className="w-3 h-3" />
            {operator.aopNo}
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="w-3 h-3" />
            Valid: {validDate}
          </span>
        </div>
      </div>

      {/* Fleet summary + View Fleet */}
      {fleet.length > 0 && (
        <div className="px-4 pb-3 pt-0 space-y-2">
          {/* Type badges */}
          <div className="flex items-center gap-2 flex-wrap">
            {Object.entries(typeCounts).map(([type, count]) => (
              <span
                key={type}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  typeBadgeClass[type] || 'bg-slate-500/20 text-slate-400'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {count} {typeLabel[type] || type}
              </span>
            ))}
          </div>

          {/* Top model names */}
          {modelNames.length > 0 && (
            <p className="text-[10px] text-slate-500 truncate">
              {modelNames.join(', ')}
              {uniqueModels.size > 2 && ` +${uniqueModels.size - 2} more`}
            </p>
          )}
        </div>
      )}

      {/* View Fleet button */}
      {fleet.length > 0 && (
        <button
          onClick={() => onViewFleet?.(operator)}
          className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 border-t border-white/5 text-xs font-medium text-sky-400 hover:bg-sky-500/10 transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          View Fleet ({fleet.length} aircraft)
        </button>
      )}
    </div>
  );
}

export default memo(OperatorCard);
