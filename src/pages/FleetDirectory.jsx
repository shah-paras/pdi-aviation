/**
 * Fleet Directory — NSOP operator directory page.
 * Browse 137 Indian non-scheduled operators, filter by type/state,
 * search by operator name, registration, or model.
 */

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import operators from '@/data/operators';
import registrations from '@/data/registrations';
import { useReducedMotion } from '@/hooks/useReducedMotion';

import FleetHero from '@/components/fleet/FleetHero';
import FleetDirectoryStats from '@/components/fleet/FleetDirectoryStats';
import CategoryTabs from '@/components/fleet/CategoryTabs';
import FleetToolbar from '@/components/fleet/FleetToolbar';
import OperatorCard from '@/components/fleet/OperatorCard';
import EmptyState from '@/components/fleet/EmptyState';
import { StaggerReveal, StaggerItem } from '@/components/home/StaggerReveal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const TYPE_TABS = (() => {
  const all = operators.length;
  let fw = 0;
  let rw = 0;
  let balloon = 0;

  for (const op of operators) {
    const types = new Set((op.fleet || []).map((a) => a.type));
    if (types.has('FW')) fw++;
    if (types.has('RW')) rw++;
    if (types.has('B')) balloon++;
  }

  return [
    { key: 'all', label: 'All', count: all },
    { key: 'FW', label: 'Fixed Wing', count: fw },
    { key: 'RW', label: 'Rotary Wing', count: rw },
    { key: 'B', label: 'Balloon', count: balloon },
  ];
})();

const ALL_STATES = [...new Set(operators.map((op) => op.state))].sort();

/* ------------------------------------------------------------------ */
/* Sort comparators                                                    */
/* ------------------------------------------------------------------ */

function sortComparator(key) {
  switch (key) {
    case 'name-asc':
      return (a, b) => a.name.localeCompare(b.name);
    case 'name-desc':
      return (a, b) => b.name.localeCompare(a.name);
    case 'fleet-desc':
      return (a, b) => (b.totalAircraft ?? 0) - (a.totalAircraft ?? 0);
    case 'state-asc':
      return (a, b) => a.state.localeCompare(b.state);
    default:
      return () => 0;
  }
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function FleetDirectory() {
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const reducedMotion = useReducedMotion();

  /* ---- Filtered & sorted operators ---- */
  const filteredOperators = useMemo(() => {
    let list = operators;

    // Type filter — keep operators that have at least one aircraft of the selected type
    if (activeType !== 'all') {
      list = list.filter((op) =>
        (op.fleet || []).some((a) => a.type === activeType),
      );
    }

    // State filter
    if (selectedState !== 'all') {
      list = list.filter((op) => op.state === selectedState);
    }

    // Search filter (operator name, registration VT-XXX, model name)
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((op) => {
        // Match operator name
        if (op.name.toLowerCase().includes(q)) return true;
        // Match city or state
        if (op.city.toLowerCase().includes(q)) return true;
        if (op.state.toLowerCase().includes(q)) return true;
        // Match any fleet registration or model
        return (op.fleet || []).some(
          (a) =>
            a.registration?.toLowerCase().includes(q) ||
            a.model?.toLowerCase().includes(q),
        );
      });
    }

    return [...list].sort(sortComparator(sortBy));
  }, [search, activeType, selectedState, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setActiveType('all');
    setSelectedState('all');
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <FleetHero
        search={search}
        onSearchChange={setSearch}
        totalCount={operators.length}
      />

      {/* Stats */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10"
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <FleetDirectoryStats operators={operators} registrations={registrations} />
      </motion.div>

      {/* Type tabs */}
      <CategoryTabs
        tabs={TYPE_TABS}
        activeTab={activeType}
        onTabChange={setActiveType}
      />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        {/* Toolbar */}
        <motion.div
          className="flex items-center justify-between py-3"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-sm text-slate-400">
            Showing {filteredOperators.length} of {operators.length} operators
          </p>

          <div className="flex items-center gap-3">
            {/* State filter dropdown */}
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="bg-white/5 border-white/10 text-slate-300 text-xs h-9 sm:h-8 w-[160px]">
                <SelectValue placeholder="All States" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {ALL_STATES.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort dropdown */}
            <FleetToolbar
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>
        </motion.div>

        {/* Operator grid */}
        {filteredOperators.length > 0 ? (
          <StaggerReveal
            key={`${activeType}-${selectedState}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredOperators.map((operator) => (
              <StaggerItem key={operator.id}>
                <OperatorCard operator={operator} />
              </StaggerItem>
            ))}
          </StaggerReveal>
        ) : (
          <EmptyState onClearFilters={clearFilters} />
        )}
      </main>
    </div>
  );
}
