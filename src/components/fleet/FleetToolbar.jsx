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
  { value: 'fleet-desc', label: 'Fleet Size (Largest)' },
  { value: 'state-asc', label: 'State (A\u2013Z)' },
];

export default function FleetToolbar({ sortBy, onSortChange }) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="bg-white/5 border-white/10 text-slate-300 text-xs h-9 sm:h-8 flex-1 sm:flex-none sm:w-[160px]">
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
  );
}
