import { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORY_ORDER = [
  'Very Light Jet',
  'Light Jet',
  'Mid-Size Jet',
  'Super Mid-Size Jet',
  'Heavy Jet',
  'Long Range Jet',
  'Ultra Long Range Jet',
  'VIP Airliner',
];

export default function AircraftSelector({
  index,
  selectedAircraft,
  aircraft,
  onAircraftChange,
  onClear
}) {
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = useMemo(() =>
    CATEGORY_ORDER.filter(cat => aircraft.some(a => a.category === cat)),
    [aircraft]
  );

  const filteredAircraft = aircraft.filter(
    a => !selectedCategory || a.category === selectedCategory
  );

  const handleCategoryChange = (value) => {
    setSelectedCategory(value === '__all__' ? '' : value);
    onAircraftChange('');
  };

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
            onClick={() => { onClear(); setSelectedCategory(''); }}
            className="p-1 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-slate-300"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="space-y-2">
        <div>
          <Label className="text-xs text-slate-400 mb-1 block">Category</Label>
          <Select value={selectedCategory || '__all__'} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full bg-slate-900 border-slate-800 text-slate-200">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">All Categories</SelectItem>
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
                CATEGORY_ORDER
                  .filter(cat => filteredAircraft.some(a => a.category === cat))
                  .map(cat => (
                    <SelectGroup key={cat}>
                      <SelectLabel className="text-xs text-sky-400 uppercase tracking-wider">{cat}</SelectLabel>
                      {filteredAircraft.filter(a => a.category === cat).map(a => (
                        <SelectItem key={a.id} value={a.id}>
                          {a.manufacturer} {a.model}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.div>
  );
}
