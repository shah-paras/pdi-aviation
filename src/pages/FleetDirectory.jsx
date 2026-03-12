/**
 * Fleet Directory — NSOP operator directory page.
 * Browse 137 Indian non-scheduled operators, filter by type/state,
 * search by operator name, registration, or model.
 */

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import operators from '@/data/operators';
import registrations from '@/data/registrations';

import FleetHero from '@/components/fleet/FleetHero';
import FleetDirectoryStats from '@/components/fleet/FleetDirectoryStats';
import CategoryTabs from '@/components/fleet/CategoryTabs';
import FleetToolbar from '@/components/fleet/FleetToolbar';
import OperatorCard from '@/components/fleet/OperatorCard';
import EmptyState from '@/components/fleet/EmptyState';
import FleetDetailModal from '@/components/fleet/FleetDetailModal';
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
/* CSS animation keyframes (injected once)                             */
/* ------------------------------------------------------------------ */

const FADE_STYLE_ID = 'fleet-fade-in-style';

function ensureFadeStyle() {
  if (document.getElementById(FADE_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = FADE_STYLE_ID;
  style.textContent = `
    @keyframes fleetFadeInUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fleet-card-animate {
      opacity: 0;
      animation: fleetFadeInUp 0.4s ease-out forwards;
    }
  `;
  document.head.appendChild(style);
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function FleetDirectory() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [activeType, setActiveType] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [modalOperator, setModalOperator] = useState(null);
  const debounceRef = useRef(null);

  // Inject CSS animation keyframes
  useEffect(() => {
    ensureFadeStyle();
  }, []);

  // Debounce search input (200ms)
  const handleSearchChange = useCallback((value) => {
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(value);
    }, 200);
  }, []);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

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
    const q = debouncedSearch.trim().toLowerCase();
    if (q) {
      list = list.filter((op) => {
        if (op.name.toLowerCase().includes(q)) return true;
        if (op.city.toLowerCase().includes(q)) return true;
        if (op.state.toLowerCase().includes(q)) return true;
        return (op.fleet || []).some(
          (a) =>
            a.registration?.toLowerCase().includes(q) ||
            a.model?.toLowerCase().includes(q),
        );
      });
    }

    return [...list].sort(sortComparator(sortBy));
  }, [debouncedSearch, activeType, selectedState, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setDebouncedSearch('');
    setActiveType('all');
    setSelectedState('all');
  };

  // Stable callback for OperatorCard memo
  const handleViewFleet = useCallback((operator) => {
    setModalOperator(operator);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <FleetHero
        search={search}
        onSearchChange={handleSearchChange}
        totalCount={operators.length}
      />

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <FleetDirectoryStats operators={operators} registrations={registrations} />
      </div>

      {/* Type tabs */}
      <CategoryTabs
        tabs={TYPE_TABS}
        activeTab={activeType}
        onTabChange={setActiveType}
      />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        {/* Toolbar — stacks on mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3">
          <p className="text-sm text-slate-400">
            Showing {filteredOperators.length} of {operators.length} operators
          </p>

          <div className="flex items-center gap-3">
            {/* State filter dropdown */}
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="bg-white/5 border-white/10 text-slate-300 text-xs h-9 sm:h-8 flex-1 sm:flex-none sm:w-[160px]">
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
        </div>

        {/* Operator grid — CSS animation instead of 137 motion.divs */}
        {filteredOperators.length > 0 ? (
          <div
            key={`${activeType}-${selectedState}-${debouncedSearch}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredOperators.map((operator, index) => (
              <div
                key={operator.id}
                className="fleet-card-animate"
                style={{
                  animationDelay: index < 12 ? `${index * 50}ms` : '0ms',
                }}
              >
                <OperatorCard
                  operator={operator}
                  onViewFleet={handleViewFleet}
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState onClearFilters={clearFilters} />
        )}
      </main>

      {/* Fleet detail modal */}
      <FleetDetailModal
        operator={modalOperator}
        open={!!modalOperator}
        onOpenChange={(open) => {
          if (!open) setModalOperator(null);
        }}
      />
    </div>
  );
}
