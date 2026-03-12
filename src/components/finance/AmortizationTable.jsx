import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';
import { useCurrency } from '@/hooks/use-currency';

export default function AmortizationTable({ schedule, onExport }) {
  const { formatPrice } = useCurrency();
  const formatCurrency = (num) => formatPrice(num, { maximumFractionDigits: 2 });
  const [showAll, setShowAll] = useState(false);
  const displaySchedule = showAll ? schedule : schedule.slice(0, 12);

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
      <div className="px-5 py-4 bg-slate-900 border-b border-white/10 flex items-center justify-between">
        <h3 className="font-semibold text-white">Amortization Schedule</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          className="flex items-center gap-2 border-slate-700 text-slate-300 hover:bg-white/5"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-900/60 border-white/5">
              <TableHead className="w-16 text-slate-400">Month</TableHead>
              <TableHead className="text-right text-slate-400">Payment</TableHead>
              <TableHead className="text-right text-slate-400">Principal</TableHead>
              <TableHead className="text-right text-slate-400">Interest</TableHead>
              <TableHead className="text-right text-slate-400">Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displaySchedule.map((row) => (
              <TableRow key={row.month} className="hover:bg-white/5 border-white/5">
                <TableCell className="font-medium text-slate-200">{row.month}</TableCell>
                <TableCell className="text-right text-slate-300">{formatCurrency(row.payment)}</TableCell>
                <TableCell className="text-right text-emerald-400">{formatCurrency(row.principal)}</TableCell>
                <TableCell className="text-right text-sky-400">{formatCurrency(row.interest)}</TableCell>
                <TableCell className="text-right font-medium text-slate-200">{formatCurrency(row.balance)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {schedule.length > 12 && (
        <div className="p-4 border-t border-white/10 flex justify-center">
          <Button
            variant="ghost"
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-300 hover:bg-white/5"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show All {schedule.length} Months
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
