import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';

const formatCurrency = (num) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(num);
};

export default function AmortizationTable({ schedule, onExport }) {
  const [showAll, setShowAll] = useState(false);
  const displaySchedule = showAll ? schedule : schedule.slice(0, 12);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">Amortization Schedule</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onExport}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="w-16">Month</TableHead>
              <TableHead className="text-right">Payment</TableHead>
              <TableHead className="text-right">Principal</TableHead>
              <TableHead className="text-right">Interest</TableHead>
              <TableHead className="text-right">Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displaySchedule.map((row) => (
              <TableRow key={row.month} className="hover:bg-slate-50/50">
                <TableCell className="font-medium">{row.month}</TableCell>
                <TableCell className="text-right">{formatCurrency(row.payment)}</TableCell>
                <TableCell className="text-right text-emerald-600">{formatCurrency(row.principal)}</TableCell>
                <TableCell className="text-right text-blue-600">{formatCurrency(row.interest)}</TableCell>
                <TableCell className="text-right font-medium">{formatCurrency(row.balance)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {schedule.length > 12 && (
        <div className="p-4 border-t border-slate-200 flex justify-center">
          <Button
            variant="ghost"
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 text-slate-600"
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