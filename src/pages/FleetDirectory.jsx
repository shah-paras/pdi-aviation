/**
 * Fleet Directory — premium aircraft catalog page.
 * Browse ~66 business jets across 8 categories, filter, search, sort,
 * and select up to 3 for side-by-side comparison.
 */

import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import aircraftModels, { getAllCategories } from '@/data/aircraftModels';
import { useCompareSelection } from '@/hooks/useCompareSelection';

import FleetHero from '@/components/fleet/FleetHero';
import FleetCatalogStats from '@/components/fleet/FleetCatalogStats';
import CategoryTabs from '@/components/fleet/CategoryTabs';
import FleetToolbar from '@/components/fleet/FleetToolbar';
import AircraftCard from '@/components/fleet/AircraftCard';
import EmptyState from '@/components/fleet/EmptyState';
import CompareBar from '@/components/fleet/CompareBar';
import SpotlightCard from '@/components/home/SpotlightCard';
import { StaggerReveal, StaggerItem } from '@/components/home/StaggerReveal';

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const CATEGORIES = ['all', ...getAllCategories()];

/* ------------------------------------------------------------------ */
/* Sort comparators                                                    */
/* ------------------------------------------------------------------ */

function sortComparator(key) {
  switch (key) {
    case 'name-asc':
      return (a, b) =>
        `${a.manufacturer} ${a.model}`.localeCompare(
          `${b.manufacturer} ${b.model}`,
        );
    case 'name-desc':
      return (a, b) =>
        `${b.manufacturer} ${b.model}`.localeCompare(
          `${a.manufacturer} ${a.model}`,
        );
    case 'price-asc':
      return (a, b) =>
        (a.new_price_usd ?? Infinity) - (b.new_price_usd ?? Infinity);
    case 'price-desc':
      return (a, b) =>
        (b.new_price_usd ?? -1) - (a.new_price_usd ?? -1);
    case 'range-desc':
      return (a, b) => (b.max_range_nm ?? 0) - (a.max_range_nm ?? 0);
    case 'speed-desc':
      return (a, b) =>
        (b.cruise_speed_ktas ?? 0) - (a.cruise_speed_ktas ?? 0);
    case 'pax-desc':
      return (a, b) => (b.max_pax ?? 0) - (a.max_pax ?? 0);
    default:
      return () => 0;
  }
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function FleetDirectory() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');

  const { selected, isSelected, toggle, remove, clearAll, isFull, compareUrl } =
    useCompareSelection();

  /* ---- Filtered & sorted aircraft ---- */
  const filteredAircraft = useMemo(() => {
    let list = aircraftModels;

    // Category filter
    if (activeCategory !== 'all') {
      list = list.filter((a) => a.category === activeCategory);
    }

    // Search filter (fuzzy across manufacturer, model, category, engines)
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((a) => {
        const haystack =
          `${a.manufacturer} ${a.model} ${a.category} ${a.engines ?? ''}`.toLowerCase();
        return haystack.includes(q);
      });
    }

    return [...list].sort(sortComparator(sortBy));
  }, [search, activeCategory, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setActiveCategory('all');
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <FleetHero
        search={search}
        onSearchChange={setSearch}
        totalCount={aircraftModels.length}
      />

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <FleetCatalogStats aircraft={aircraftModels} />
      </div>

      {/* Category tabs */}
      <CategoryTabs
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        aircraft={aircraftModels}
      />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <FleetToolbar
          resultCount={filteredAircraft.length}
          totalCount={aircraftModels.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Aircraft grid */}
        {filteredAircraft.length > 0 ? (
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredAircraft.map((aircraft) => (
                <StaggerItem key={aircraft.id}>
                  <SpotlightCard>
                    <AircraftCard
                      aircraft={aircraft}
                      isSelected={isSelected(aircraft.id)}
                      onToggleCompare={(a) => toggle(a.id)}
                      isCompareFull={isFull}
                    />
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </AnimatePresence>
          </StaggerReveal>
        ) : (
          <EmptyState onClearFilters={clearFilters} />
        )}
      </main>

      {/* Compare bar */}
      <CompareBar
        selected={selected}
        aircraft={aircraftModels}
        onRemove={remove}
        onClearAll={clearAll}
        compareUrl={compareUrl}
      />
    </div>
  );
}
