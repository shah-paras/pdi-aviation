import { useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AircraftSelector({
  index,
  selectedCategory,
  selectedAircraft,
  aircraft,
  onCategoryChange,
  onAircraftChange,
  onClear
}) {
  // Derive categories dynamically from the aircraft data
  const categories = useMemo(() =>
    [...new Set(aircraft.map(a => a.category))].sort(),
    [aircraft]
  );

  const filteredAircraft = aircraft.filter(
    a => !selectedCategory || a.category === selectedCategory
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-sky-500/30 hover:shadow-lg transition-all"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-sky-500/20 flex items-center justify-center text-sky-400 font-semibold text-xs">
            {index + 1}
          </div>
          <span className="font-medium text-slate-300 text-sm">Aircraft {index + 1}</span>
        </div>
        {selectedAircraft && (
          <button
            onClick={onClear}
            className="p-1 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-slate-300"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="space-y-2">
        <div>
          <Label className="text-xs text-slate-400 mb-1 block">Category</Label>
          <Select value={selectedCategory || ''} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-full bg-slate-900 border-slate-800 text-slate-200">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={null}>All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-xs text-slate-400 mb-1 block">Model</Label>
          <Select value={selectedAircraft || ''} onValueChange={onAircraftChange}>
            <SelectTrigger className="w-full bg-slate-900 border-slate-800 text-slate-200">
              <SelectValue placeholder="Select aircraft" />
            </SelectTrigger>
            <SelectContent>
              {filteredAircraft.length === 0 ? (
                <div className="p-2 text-sm text-slate-400 text-center">No aircraft found</div>
              ) : (
                filteredAircraft.map(a => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.manufacturer} {a.model}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

    </motion.div>
  );
}
