/**
 * Compact card displaying a single NSOP operator and its fleet.
 * Includes an expandable section with aircraft details.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  MapPin,
  ChevronDown,
  Plane,
  Users,
  Shield,
  CalendarDays,
} from 'lucide-react';
import RegistrationBadge from './RegistrationBadge';

const typeLabel = { FW: 'Fixed Wing', RW: 'Rotary Wing', B: 'Balloon' };
const typeBadgeClass = {
  FW: 'bg-blue-50 text-blue-700 border-blue-200',
  RW: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  B: 'bg-amber-50 text-amber-700 border-amber-200',
};

export default function OperatorCard({ operator }) {
  const [expanded, setExpanded] = useState(false);

  if (!operator) return null;

  const fleet = operator.fleet || [];
  const validDate = operator.validUpto
    ? new Date(operator.validUpto).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'N/A';

  return (
    <div className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
      {/* Card header */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold text-slate-900 leading-snug">
            {operator.name}
          </h3>
          <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-700">
            <Plane className="w-3 h-3" />
            {operator.totalAircraft}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-slate-500 mb-1.5">
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

      {/* Expand toggle */}
      {fleet.length > 0 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-4 py-2.5 border-t border-slate-100 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <span>
            {expanded ? 'Hide' : 'Show'} Fleet ({fleet.length} aircraft)
          </span>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </button>
      )}

      {/* Fleet details */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 space-y-2 border-t border-slate-100 pt-3">
              {fleet.map((aircraft, idx) => (
                <div
                  key={aircraft.registration || idx}
                  className="flex items-center justify-between gap-2 py-1.5 px-2 rounded-lg bg-slate-50"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <RegistrationBadge
                      registration={aircraft.registration}
                      type={aircraft.type}
                    />
                    <span className="text-xs text-slate-700 font-medium truncate">
                      {aircraft.model}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold border ${
                        typeBadgeClass[aircraft.type] ||
                        'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {aircraft.type}
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-[10px] text-slate-500">
                      <Users className="w-3 h-3" />
                      {aircraft.seatingCapacity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
