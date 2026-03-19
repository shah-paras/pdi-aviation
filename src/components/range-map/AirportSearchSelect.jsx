import { useState, useMemo, useRef, useEffect } from 'react';
import { Check, ChevronsUpDown, Search, MapPin, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import airports from '@/data/airports';

const REGIONS = {
  India: a => a.country === 'India',
  'Middle East': a => ['United Arab Emirates', 'Qatar', 'Bahrain', 'Oman', 'Kuwait', 'Saudi Arabia', 'Israel', 'Jordan', 'Iraq', 'Iran', 'Turkey'].includes(a.country),
  'Southeast Asia': a => ['Singapore', 'Malaysia', 'Thailand', 'Indonesia', 'Philippines', 'Vietnam', 'Myanmar', 'Cambodia', 'Laos', 'Sri Lanka', 'Maldives'].includes(a.country),
  'East Asia': a => ['China', 'Japan', 'South Korea', 'Taiwan', 'Mongolia'].includes(a.country),
  Europe: a => ['United Kingdom', 'France', 'Germany', 'Netherlands', 'Switzerland', 'Italy', 'Spain', 'Portugal', 'Ireland', 'Denmark', 'Norway', 'Sweden', 'Finland', 'Austria', 'Czech Republic', 'Poland', 'Hungary', 'Greece', 'Belgium', 'Russia'].includes(a.country),
  Africa: a => ['South Africa', 'Kenya', 'Ethiopia', 'Egypt', 'Morocco', 'Nigeria', 'Ghana', 'Tanzania', 'Mauritius', 'Seychelles', 'Tunisia', 'Algeria', 'Mozambique', 'Namibia'].includes(a.country),
  Americas: a => ['United States', 'Canada', 'Mexico', 'Brazil', 'Argentina', 'Chile', 'Colombia', 'Peru', 'Ecuador', 'Venezuela', 'Uruguay', 'Panama'].includes(a.country),
  Oceania: a => ['Australia', 'New Zealand', 'Fiji', 'French Polynesia'].includes(a.country),
};

// Pre-compute grouped airports (done once at module level)
const groupedAirports = Object.entries(REGIONS).map(([region, predicate]) => ({
  region,
  airports: airports.filter(predicate),
})).filter(g => g.airports.length > 0);

export default function AirportSearchSelect({ value, onValueChange, placeholder = 'Search airports...', excludeCode }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 0);
    else setSearch('');
  }, [open]);

  const q = search.toLowerCase().trim();
  const isSearching = q.length >= 1;

  // When searching: flat filtered list. When browsing: grouped by region.
  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    return airports
      .filter(a => {
        if (excludeCode && a.code === excludeCode) return false;
        return (
          a.code.toLowerCase().includes(q) ||
          a.name.toLowerCase().includes(q) ||
          a.city.toLowerCase().includes(q) ||
          a.country.toLowerCase().includes(q)
        );
      })
      .slice(0, 20);
  }, [q, isSearching, excludeCode]);

  const browseGroups = useMemo(() => {
    if (isSearching) return [];
    if (!excludeCode) return groupedAirports;
    return groupedAirports.map(g => ({
      ...g,
      airports: g.airports.filter(a => a.code !== excludeCode),
    })).filter(g => g.airports.length > 0);
  }, [isSearching, excludeCode]);

  const handleSelect = (airport) => {
    onValueChange(airport);
    setOpen(false);
  };

  const AirportItem = ({ airport }) => {
    const isSelected = value && value.code === airport.code;
    return (
      <button
        type="button"
        onClick={() => handleSelect(airport)}
        className={cn(
          'group relative flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm outline-none transition-colors',
          'hover:bg-sky-500/15',
          isSelected && 'bg-sky-500/20',
        )}
      >
        {/* IATA badge */}
        <span className={cn(
          'flex-shrink-0 w-11 py-0.5 rounded text-center text-xs font-bold tracking-wider',
          isSelected
            ? 'bg-sky-500 text-white'
            : 'bg-slate-700/80 text-sky-300 group-hover:bg-slate-600/80',
        )}>
          {airport.code}
        </span>

        {/* Name + location */}
        <div className="flex-1 min-w-0 text-left">
          <div className="truncate text-slate-200 font-medium text-[13px]">
            {airport.city}
          </div>
          <div className="truncate text-[11px] text-slate-500">
            {airport.name}
          </div>
        </div>

        {/* Check mark */}
        {isSelected && (
          <Check className="flex-shrink-0 w-3.5 h-3.5 text-sky-400" />
        )}
      </button>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className={cn(
            'flex h-10 w-full items-center gap-2.5 rounded-lg border px-3 py-2 text-sm transition-colors',
            'bg-slate-800/80 border-slate-700 text-white hover:bg-slate-800 hover:border-slate-600',
            'focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:ring-offset-1 focus:ring-offset-slate-900',
          )}
        >
          {value ? (
            <>
              <span className="flex-shrink-0 bg-sky-500/20 text-sky-400 text-xs font-bold tracking-wider px-1.5 py-0.5 rounded">
                {value.code}
              </span>
              <span className="truncate text-slate-200">
                {value.city || value.name}
              </span>
            </>
          ) : (
            <>
              <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <span className="text-slate-400">{placeholder}</span>
            </>
          )}
          <ChevronsUpDown className="ml-auto h-3.5 w-3.5 shrink-0 text-slate-500" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0 border-slate-700 bg-slate-900 shadow-2xl shadow-black/40"
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {/* Search bar */}
        <div className="flex items-center gap-2 border-b border-slate-800 px-3">
          <Search className="h-3.5 w-3.5 shrink-0 text-slate-500" />
          <input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by city, code, or name..."
            className="flex h-10 w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500"
          />
        </div>

        {/* Scrollable list */}
        <div className="max-h-[340px] overflow-y-auto overflow-x-hidden p-1.5 scrollbar-thin">

          {/* Search results mode */}
          {isSearching && (
            <>
              {searchResults.length === 0 ? (
                <p className="py-8 text-center text-sm text-slate-500">
                  No airports match "{search}"
                </p>
              ) : (
                <div className="space-y-0.5">
                  {searchResults.map(airport => (
                    <AirportItem key={airport.code} airport={airport} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Browse mode — grouped by region */}
          {!isSearching && browseGroups.map(({ region, airports: regionAirports }) => (
            <div key={region} className="mb-1">
              <div className="flex items-center gap-1.5 px-2.5 py-2 sticky top-0 bg-slate-900/95 backdrop-blur-sm z-10">
                <Globe className="w-3 h-3 text-sky-500/70" />
                <span className="text-[11px] font-semibold uppercase tracking-widest text-sky-500/70">
                  {region}
                </span>
                <span className="text-[10px] text-slate-600 ml-auto">
                  {regionAirports.length}
                </span>
              </div>
              <div className="space-y-0.5">
                {regionAirports.map(airport => (
                  <AirportItem key={airport.code} airport={airport} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
