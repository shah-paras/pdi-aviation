/**
 * Fleet Directory page -- browse Indian NSOP fleet data.
 * Supports search by operator name, VT-XXX registration, or aircraft model,
 * filtering by aircraft type and state.
 */

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Plane,
  Navigation,
  Wind,
  LayoutGrid,
  X,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import operators from '@/data/operators';
import registrations from '@/data/registrations';
import aircraftModels from '@/data/aircraftModels';
import FleetStats from '@/components/fleet/FleetStats';
import OperatorCard from '@/components/fleet/OperatorCard';
import RegistrationBadge from '@/components/fleet/RegistrationBadge';

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const TYPE_FILTERS = [
  { key: 'all', label: 'All', icon: LayoutGrid },
  { key: 'FW', label: 'Fixed Wing', icon: Plane },
  { key: 'RW', label: 'Rotary Wing', icon: Navigation },
  { key: 'B', label: 'Balloon', icon: Wind },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** True when the query looks like a VT-XXX registration search. */
const isRegistrationQuery = (q) => /^vt[-\s]?/i.test(q.trim());

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function FleetDirectory() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');

  // Unique states from operators, sorted alphabetically
  const allStates = useMemo(
    () =>
      [...new Set((operators || []).map((o) => o.state))]
        .filter(Boolean)
        .sort(),
    []
  );

  // ----- Registration search results -----
  const registrationResults = useMemo(() => {
    if (!search || !isRegistrationQuery(search)) return [];
    const q = search.trim().toUpperCase();
    return (registrations || []).filter((r) =>
      r.registration.toUpperCase().includes(q)
    );
  }, [search]);

  // ----- Filtered operators -----
  const filteredOperators = useMemo(() => {
    let list = operators || [];
    const q = search.trim().toLowerCase();

    // Type filter: keep only operators that have at least one matching aircraft
    if (typeFilter !== 'all') {
      list = list
        .map((op) => {
          const matchingFleet = (op.fleet || []).filter(
            (a) => a.type === typeFilter
          );
          if (matchingFleet.length === 0) return null;
          return { ...op, fleet: matchingFleet, totalAircraft: matchingFleet.length };
        })
        .filter(Boolean);
    }

    // State filter
    if (stateFilter !== 'all') {
      list = list.filter((op) => op.state === stateFilter);
    }

    // Search filter
    if (q) {
      list = list.filter((op) => {
        const nameMatch = op.name.toLowerCase().includes(q);
        const regMatch = (op.fleet || []).some((a) =>
          a.registration.toLowerCase().includes(q)
        );
        const modelMatch = (op.fleet || []).some((a) =>
          a.model.toLowerCase().includes(q)
        );
        return nameMatch || regMatch || modelMatch;
      });
    }

    return list;
  }, [search, typeFilter, stateFilter]);

  const hasActiveFilters =
    search.trim() !== '' || typeFilter !== 'all' || stateFilter !== 'all';

  const clearFilters = () => {
    setSearch('');
    setTypeFilter('all');
    setStateFilter('all');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sky-400 text-sm mb-3">
            <Plane className="w-4 h-4" />
            <span>Fleet Directory</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">
            Indian NSOP Fleet Directory
          </h1>
          <p className="text-slate-300 max-w-2xl">
            Browse non-scheduled operator permits, fleet compositions, and
            aircraft registrations across India.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Stats */}
        <FleetStats operators={operators} registrations={registrations} />

        {/* Filters bar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search operator, registration (VT-XXX), or aircraft model..."
              className="pl-10 h-11"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Type tabs */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {TYPE_FILTERS.map((tf) => {
                const Icon = tf.icon;
                const active = typeFilter === tf.key;
                return (
                  <Button
                    key={tf.key}
                    variant={active ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTypeFilter(tf.key)}
                    className={
                      active
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'text-slate-600'
                    }
                  >
                    <Icon className="w-4 h-4 mr-1.5" />
                    {tf.label}
                  </Button>
                );
              })}
            </div>

            {/* State filter */}
            <div className="sm:ml-auto w-full sm:w-56">
              <Select
                value={stateFilter}
                onValueChange={setStateFilter}
              >
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="All States" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {allStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clear filters */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-slate-500 hover:text-slate-700"
              >
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Registration quick results */}
        {registrationResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-blue-200 shadow-sm p-4 sm:p-6"
          >
            <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Search className="w-4 h-4 text-blue-600" />
              Registration Matches ({registrationResults.length})
            </h3>
            <div className="grid gap-2">
              {registrationResults.map((r) => (
                <div
                  key={r.registration}
                  className="flex items-center justify-between gap-3 py-2 px-3 rounded-lg bg-slate-50 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <RegistrationBadge
                      registration={r.registration}
                      type={r.type}
                    />
                    <span className="text-sm text-slate-700 font-medium truncate">
                      {r.model}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 flex-shrink-0">
                    {r.operatorName}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Operator grid */}
        {filteredOperators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOperators.map((op) => (
              <motion.div
                key={op.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <OperatorCard operator={op} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Plane className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 mb-1">
              No operators found
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Try adjusting your search query or filters to find what you are
              looking for.
            </p>
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="mt-4"
              >
                Clear all filters
              </Button>
            )}
          </div>
        )}

        {/* Result count */}
        {filteredOperators.length > 0 && (
          <p className="text-xs text-slate-400 text-center pt-2">
            Showing {filteredOperators.length} of {(operators || []).length}{' '}
            operators
          </p>
        )}
      </div>
    </div>
  );
}
