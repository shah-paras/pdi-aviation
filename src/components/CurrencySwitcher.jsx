import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCurrency } from '@/hooks/use-currency';
import { getCurrencyMeta } from '@/lib/currency-config';

export default function CurrencySwitcher({ className = '' }) {
  const { selectedCurrency, setSelectedCurrency, currencies } = useCurrency();
  const meta = getCurrencyMeta(selectedCurrency);

  return (
    <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
      <SelectTrigger className={`w-[100px] h-9 bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors text-sm ${className}`}>
        <SelectValue>
          <span className="flex items-center gap-1.5">
            <span>{meta.flag}</span>
            <span>{selectedCurrency}</span>
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {currencies.map((c) => (
          <SelectItem key={c.code} value={c.code}>
            <span className="flex items-center gap-2">
              <span>{c.flag}</span>
              <span>{c.code}</span>
              <span className="text-muted-foreground text-xs">({c.symbol})</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
