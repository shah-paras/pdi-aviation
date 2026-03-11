/**
 * Dark-themed card displaying a single NSOP operator and its fleet.
 * Glassmorphic style with expandable fleet section.
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
  FW: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  RW: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  B: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
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

      {/* Expand toggle */}
      {fleet.length > 0 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-4 py-3 border-t border-white/5 text-xs font-medium text-slate-400 hover:bg-white/5 transition-colors"
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
            <div className="px-4 pb-3 space-y-2 border-t border-white/5 pt-3">
              {fleet.map((aircraft, idx) => (
                <div
                  key={aircraft.registration || idx}
                  className="flex items-center justify-between gap-2 py-1.5 px-2 rounded-lg bg-white/5"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <RegistrationBadge
                      registration={aircraft.registration}
                      type={aircraft.type}
                    />
                    <span className="text-xs text-slate-300 font-medium truncate">
                      {aircraft.model}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold border ${
                        typeBadgeClass[aircraft.type] ||
                        'bg-slate-500/20 text-slate-400 border-slate-500/30'
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
