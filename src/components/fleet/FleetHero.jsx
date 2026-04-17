/**
 * FleetHero — dark premium hero section for the Fleet Directory page.
 * Horizontal layout: title left, search right.
 */

import { Search, X } from 'lucide-react';
import GradientBackground from '@/components/home/GradientBackground';

export default function FleetHero({ search, onSearchChange, totalCount, title = 'Indian NSOP Fleet Directory', subtitle, placeholder = 'Search by operator, registration (VT-XXX), or model...' }) {
  return (
    <section className="relative bg-slate-950 py-10 lg:py-14 overflow-hidden border-b border-slate-800">
      <GradientBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          {/* Left: Title cluster */}
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-slate-500 font-medium">
              Fleet Directory
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mt-2">
              {title}
            </h1>
            <p className="text-slate-400 text-sm mt-2 max-w-md">
              {subtitle || `${totalCount} non-scheduled operators and their aircraft fleets`}
            </p>
          </div>

          {/* Right: Search */}
          <div className="relative w-full lg:w-96 flex-shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />

            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={placeholder}
              className="w-full h-11 pl-11 pr-10 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/25 focus:outline-none text-sm"
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
        </div>
      </div>
    </section>
  );
}
