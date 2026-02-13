import { useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plane, X } from 'lucide-react';
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

  const selectedModel = aircraft.find(a => a.id === selectedAircraft);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-semibold text-sm">
            {index + 1}
          </div>
          <span className="font-medium text-slate-700 text-sm">Aircraft {index + 1}</span>
        </div>
        {selectedAircraft && (
          <button
            onClick={onClear}
            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <Label className="text-xs text-slate-500 mb-1 block">Category</Label>
          <Select value={selectedCategory || ''} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-full bg-slate-50 border-slate-200">
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
          <Label className="text-xs text-slate-500 mb-1 block">Model</Label>
          <Select value={selectedAircraft || ''} onValueChange={onAircraftChange}>
            <SelectTrigger className="w-full bg-slate-50 border-slate-200">
              <SelectValue placeholder="Select aircraft" />
            </SelectTrigger>
            <SelectContent>
              {filteredAircraft.length === 0 ? (
                <div className="p-2 text-sm text-slate-500 text-center">No aircraft found</div>
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

      {/* Selected Aircraft Preview */}
      {selectedModel && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 p-3 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200"
        >
          <div className="flex items-center gap-3">
            {selectedModel.thumbnail_url ? (
              <img 
                src={selectedModel.thumbnail_url} 
                alt={selectedModel.model}
                className="w-16 h-10 object-cover rounded-md"
              />
            ) : (
              <div className="w-16 h-10 bg-slate-200 rounded-md flex items-center justify-center">
                <Plane className="w-5 h-5 text-slate-400" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-slate-900 text-sm truncate">
                {selectedModel.manufacturer} {selectedModel.model}
              </div>
              <div className="text-xs text-slate-500">{selectedModel.category}</div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}