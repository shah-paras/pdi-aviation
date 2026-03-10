import { useMemo } from 'react';
import { motion } from 'framer-motion';

const LABEL_MAP = {
  all: 'All Aircraft',
};

export default function CategoryTabs({ categories, activeCategory, onCategoryChange, aircraft }) {
  const counts = useMemo(() => {
    const map = {};
    for (const cat of categories) {
      if (cat === 'all') {
        map[cat] = aircraft.length;
      } else {
        map[cat] = aircraft.filter((a) => a.category === cat).length;
      }
    }
    return map;
  }, [categories, aircraft]);

  return (
    <div className="sticky top-16 z-30 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex items-center gap-1.5 overflow-x-auto py-3"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style>{`
            .scrollbar-hide::-webkit-scrollbar { display: none; }
          `}</style>
          <div className="flex items-center gap-1.5 scrollbar-hide">
            {categories.map((cat) => {
              const label = LABEL_MAP[cat] || cat;
              const count = counts[cat] ?? 0;
              const isActive = cat === activeCategory;

              return (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={`relative px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-sky-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">
                    {label} ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
