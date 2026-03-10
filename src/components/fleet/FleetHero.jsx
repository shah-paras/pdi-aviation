/**
 * FleetHero — dark premium hero section for the Fleet Directory page.
 * Includes animated gradient background, floating particles, shimmer title,
 * and a centered search input with aircraft count.
 */

import { Search, X, Plane } from 'lucide-react';
import GradientBackground from '@/components/home/GradientBackground';
import FloatingParticles from '@/components/home/FloatingParticles';
import TextShimmer from '@/components/home/TextShimmer';

export default function FleetHero({ search, onSearchChange, totalCount }) {
  return (
    <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 lg:py-28 overflow-hidden">
      <GradientBackground />
      <FloatingParticles />

      <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
        {/* Label */}
        <div className="flex items-center justify-center gap-2 text-sky-400 text-sm mb-4">
          <Plane className="w-4 h-4" />
          <span>Fleet Directory</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
          <TextShimmer>Premium Aircraft Catalog</TextShimmer>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
          Explore the world&apos;s finest business jets. Compare specifications,
          pricing, and performance across all categories.
        </p>

        {/* Search */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />

          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by manufacturer, model, or category..."
            className="w-full h-12 pl-11 pr-10 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/25 focus:outline-none text-sm backdrop-blur-sm"
          />

          {search && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Counter */}
        <p className="text-xs text-slate-500 mt-3 text-center">
          {totalCount} aircraft available
        </p>
      </div>
    </section>
  );
}
