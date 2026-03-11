import { useState, useMemo, useRef, useEffect } from 'react';
import { Check, ChevronsUpDown, Plane, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function AircraftSearchSelect({ aircraft, value, onValueChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef(null);

  const selected = aircraft.find((a) => a.id === value);

  // Focus input when popover opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setSearch('');
    }
  }, [open]);

  // Filter aircraft by search query
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return aircraft;
    return aircraft.filter(
      (a) =>
        a.manufacturer.toLowerCase().includes(q) ||
        a.model.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q),
    );
  }, [aircraft, search]);

  // Group filtered aircraft by category
  const grouped = useMemo(() => {
    const groups = {};
    for (const a of filtered) {
      (groups[a.category] = groups[a.category] || []).push(a);
    }
    return Object.entries(groups);
  }, [filtered]);

  const handleSelect = (id) => {
    onValueChange(id);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className={cn(
            'flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm',
            'bg-blue-800 border-blue-700 text-white hover:bg-blue-800/80',
            'focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-blue-900',
          )}
        >
          <span className="truncate">
            {selected
              ? `${selected.manufacturer} ${selected.model}`
              : 'Select aircraft'}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0"
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {/* Search input */}
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search aircraft..."
            className="flex h-11 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        {/* Scrollable list */}
        <div className="max-h-[300px] overflow-y-auto overflow-x-hidden p-1">
          {grouped.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No aircraft found.
            </p>
          )}
          {grouped.map(([category, models]) => (
            <div key={category} className="overflow-hidden">
              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                {category}
              </div>
              {models.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => handleSelect(a.id)}
                  className={cn(
                    'relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
                    'hover:bg-accent hover:text-accent-foreground',
                    value === a.id && 'bg-accent text-accent-foreground',
                  )}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === a.id ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  <Plane className="mr-2 h-3 w-3 text-muted-foreground" />
                  <span className="truncate">
                    {a.manufacturer} {a.model}
                  </span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {a.max_range_nm?.toLocaleString()} nm
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
