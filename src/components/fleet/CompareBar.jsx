import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CompareBar({ selected, aircraft, onRemove, onClearAll, compareUrl }) {
  return (
    <AnimatePresence>
      {selected.length > 0 && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >
          <div className="bg-slate-900/95 backdrop-blur-xl border-t border-white/10 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex items-center justify-between gap-4">
                {/* Left — selected aircraft pills */}
                <div className="flex items-center gap-2 flex-wrap">
                  {selected.map((id) => {
                    const model = aircraft.find((a) => a.id === id);
                    return (
                      <div
                        key={id}
                        className="flex items-center gap-1.5 bg-sky-500/20 text-sky-300 pl-3 pr-1.5 py-1 rounded-full text-xs font-medium"
                      >
                        {model?.manufacturer} {model?.model}
                        <button
                          onClick={() => onRemove(id)}
                          className="p-0.5 hover:bg-sky-500/30 rounded-full"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Right — actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={onClearAll}
                    className="text-xs text-slate-400 hover:text-slate-200"
                  >
                    Clear
                  </button>
                  {compareUrl ? (
                    <Link
                      to={compareUrl}
                      className="bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      Compare ({selected.length}/3)
                    </Link>
                  ) : (
                    <span className="bg-sky-500 text-white text-xs font-semibold px-4 py-2 rounded-lg opacity-50 pointer-events-none">
                      Compare ({selected.length}/3)
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
