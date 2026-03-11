import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';

export default function EmptyState({ onClearFilters }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <Plane className="w-16 h-16 text-slate-700 mb-6" />
      <h3 className="text-xl font-semibold text-slate-300 mb-2">No operators found</h3>
      <p className="text-sm text-slate-500 max-w-md">
        Try adjusting your search or category filter to find what you&apos;re looking for.
      </p>
      {onClearFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="text-sky-400 hover:text-sky-300 text-sm font-medium mt-4 transition-colors"
        >
          Clear all filters
        </button>
      )}
    </motion.div>
  );
}
