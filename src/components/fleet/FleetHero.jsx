/**
 * FleetHero — dark premium hero section for the Fleet Directory page.
 * Includes animated gradient background, floating particles, shimmer title,
 * and a centered search input with aircraft count.
 */

import { Search, X, Plane } from 'lucide-react';
import GradientBackground from '@/components/home/GradientBackground';

export default function FleetHero({ search, onSearchChange, totalCount, title = 'Indian NSOP Fleet Directory', subtitle = 'Explore 133 non-scheduled operators and their aircraft fleets across India. Search by operator, registration, or aircraft model.', placeholder = 'Search by operator, registration (VT-XXX), or model...', counterLabel = 'operators registered', icon: Icon = Plane }) {
  return (
    <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 lg:py-28 overflow-hidden">
      <GradientBackground />

      <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
        {/* Label */}
        <div className="flex items-center justify-center gap-2 text-sky-400 text-sm mb-4">
          <Icon className="w-4 h-4" />
          <span>Fleet Directory</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
          {subtitle}
        </p>

        {/* Search */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />

          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-12 pl-11 pr-10 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/25 focus:outline-none text-sm shadow-inner"
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
          {totalCount} {counterLabel}
        </p>
      </div>
    </section>
  );
}
