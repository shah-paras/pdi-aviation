import { ArrowUpDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name (A\u2013Z)' },
  { value: 'name-desc', label: 'Name (Z\u2013A)' },
  { value: 'price-asc', label: 'Price (Low\u2013High)' },
  { value: 'price-desc', label: 'Price (High\u2013Low)' },
  { value: 'range-desc', label: 'Range (Longest)' },
  { value: 'speed-desc', label: 'Speed (Fastest)' },
  { value: 'pax-desc', label: 'Passengers (Most)' },
];

export default function FleetToolbar({ resultCount, totalCount, sortBy, onSortChange }) {
  return (
    <div className="flex items-center justify-between py-3">
      <p className="text-sm text-slate-400">
        Showing {resultCount} of {totalCount} aircraft
      </p>

      <div className="flex items-center gap-2">
        <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="bg-white/5 border-white/10 text-slate-300 text-xs h-8 w-[160px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
