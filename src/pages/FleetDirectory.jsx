/**
 * Fleet Directory — NSOP operator directory page.
 * Browse 137 Indian non-scheduled operators, filter by type/state,
 * search by operator name, registration, or model.
 */

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { useOperators } from '@/hooks/useOperators';
import { Loader2 } from 'lucide-react';

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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from '@/components/ui/pagination';

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

const PAGE_SIZE = 24;

function generatePageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1];
  if (current > 3) pages.push('ellipsis');
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i);
  }
  if (current < total - 2) pages.push('ellipsis');
  pages.push(total);
  return pages;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function FleetDirectory() {
  const { data: operators = [], isLoading: dataLoading } = useOperators();

  // Derive registrations from operators fleet data
  const registrations = useMemo(
    () =>
      operators.flatMap((op) =>
        (op.fleet || op.aircraft_fleet || []).map((ac) => ({
          registration: ac.registration,
          operatorId: op.id,
          operatorName: op.name,
          modelId: ac.modelId ?? ac.model_id,
          model: ac.model,
          seatingCapacity: ac.seatingCapacity ?? ac.seating_capacity,
          type: ac.type,
        })),
      ),
    [operators],
  );

  // Compute type tabs from operators data
  const TYPE_TABS = useMemo(() => {
    const all = operators.length;
    let fw = 0;
    let rw = 0;
    let balloon = 0;

    for (const op of operators) {
      const types = new Set((op.fleet || op.aircraft_fleet || []).map((a) => a.type));
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
  }, [operators]);

  const ALL_STATES = useMemo(
    () => [...new Set(operators.map((op) => op.state))].sort(),
    [operators],
  );

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [activeType, setActiveType] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [modalOperator, setModalOperator] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const debounceRef = useRef(null);
  const gridRef = useRef(null);

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
        (op.fleet || op.aircraft_fleet || []).some((a) => a.type === activeType),
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
        return (op.fleet || op.aircraft_fleet || []).some(
          (a) =>
            a.registration?.toLowerCase().includes(q) ||
            a.model?.toLowerCase().includes(q),
        );
      });
    }

    return [...list].sort(sortComparator(sortBy));
  }, [operators, debouncedSearch, activeType, selectedState, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, activeType, selectedState, sortBy]);

  useEffect(() => {
    if (currentPage > 1 && gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  const totalPages = Math.ceil(filteredOperators.length / PAGE_SIZE);
  const paginatedOperators = useMemo(
    () => filteredOperators.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filteredOperators, currentPage],
  );

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

  if (dataLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-sky-400" />
          <p className="text-sm text-slate-400">Loading fleet data...</p>
        </div>
      </div>
    );
  }

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

      {/* Type tabs + toolbar */}
      <CategoryTabs
        tabs={TYPE_TABS}
        activeTab={activeType}
        onTabChange={setActiveType}
      />

      {/* Toolbar — stacks on mobile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3">
          <p className="text-sm text-slate-400">
            Showing {Math.min((currentPage - 1) * PAGE_SIZE + 1, filteredOperators.length)}–{Math.min(currentPage * PAGE_SIZE, filteredOperators.length)} of {filteredOperators.length} operators
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
      </div>

      {/* Main content */}
      <main ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">

        {/* Operator grid — paginated, 24 cards per page */}
        {filteredOperators.length > 0 ? (
          <>
            <div
              key={`${activeType}-${selectedState}-${debouncedSearch}-${currentPage}`}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {paginatedOperators.map((operator, index) => (
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

            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50 text-slate-500' : 'cursor-pointer text-slate-400 hover:text-white'}
                      />
                    </PaginationItem>
                    {generatePageNumbers(currentPage, totalPages).map((page, i) =>
                      page === 'ellipsis' ? (
                        <PaginationItem key={`ellipsis-${i}`}>
                          <PaginationEllipsis className="text-slate-500" />
                        </PaginationItem>
                      ) : (
                        <PaginationItem key={page}>
                          <PaginationLink
                            isActive={page === currentPage}
                            onClick={() => setCurrentPage(page)}
                            className={page === currentPage
                              ? 'cursor-pointer bg-sky-500/20 text-sky-400 border-sky-500/30'
                              : 'cursor-pointer text-slate-400 hover:text-white'}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ),
                    )}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50 text-slate-500' : 'cursor-pointer text-slate-400 hover:text-white'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
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
