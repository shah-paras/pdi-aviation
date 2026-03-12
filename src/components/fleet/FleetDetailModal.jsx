/**
 * FleetDetailModal — Dark-themed modal showing operator fleet details in a table.
 * Desktop: table layout | Mobile: stacked card list.
 * Includes currency integration for estimated aircraft values.
 */

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import RegistrationBadge from '@/components/fleet/RegistrationBadge';
import { useCurrency } from '@/hooks/use-currency';
import { lookupAircraftModel, getEstimatedValue } from '@/lib/utils/aircraftLookup';
import { MapPin, Shield, CalendarDays, Plane, Users } from 'lucide-react';

const typeBadgeClass = {
  FW: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  RW: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  B: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};

export default function FleetDetailModal({ operator, open, onOpenChange }) {
  const { formatPrice } = useCurrency();

  if (!operator) return null;

  const fleet = operator.fleet || [];
  const validDate = operator.validUpto
    ? new Date(operator.validUpto).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'N/A';

  // Compute estimated values for fleet
  const fleetWithValues = fleet.map((aircraft) => {
    const value = getEstimatedValue(aircraft.modelId, aircraft.model);
    const matchedModel = lookupAircraftModel(aircraft.modelId, aircraft.model);
    return { ...aircraft, estimatedValue: value, matchedModel };
  });

  const totalValue = fleetWithValues.reduce(
    (sum, a) => sum + (a.estimatedValue || 0),
    0
  );
  const matchedCount = fleetWithValues.filter((a) => a.estimatedValue).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white w-[95vw] max-w-3xl max-h-[85vh] p-0 gap-0">
        {/* Header */}
        <DialogHeader className="p-5 pb-3 border-b border-slate-800">
          <div className="flex items-start justify-between gap-3 pr-6">
            <div className="min-w-0">
              <DialogTitle className="text-lg font-bold text-white leading-snug">
                {operator.name}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Fleet details for {operator.name}
              </DialogDescription>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {operator.city}, {operator.state}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  {operator.aopNo}
                </span>
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="w-3 h-3" />
                  Valid: {validDate}
                </span>
              </div>
            </div>
            <span className="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-400">
              <Plane className="w-3.5 h-3.5" />
              {operator.totalAircraft} aircraft
            </span>
          </div>
        </DialogHeader>

        {/* Fleet content */}
        <ScrollArea className="max-h-[calc(85vh-10rem)]">
          {/* Desktop table — hidden on mobile */}
          <div className="hidden sm:block">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-800 hover:bg-transparent">
                  <TableHead className="text-slate-400 text-xs h-9 pl-5">Registration</TableHead>
                  <TableHead className="text-slate-400 text-xs h-9">Model</TableHead>
                  <TableHead className="text-slate-400 text-xs h-9">Type</TableHead>
                  <TableHead className="text-slate-400 text-xs h-9 text-center">Seats</TableHead>
                  <TableHead className="text-slate-400 text-xs h-9 text-right pr-5">Est. Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fleetWithValues.map((aircraft, idx) => (
                  <TableRow
                    key={aircraft.registration || idx}
                    className="border-slate-800/50 hover:bg-white/5"
                  >
                    <TableCell className="pl-5 py-2.5">
                      <RegistrationBadge
                        registration={aircraft.registration}
                        type={aircraft.type}
                      />
                    </TableCell>
                    <TableCell className="py-2.5 text-xs text-slate-300 font-medium">
                      {aircraft.model}
                    </TableCell>
                    <TableCell className="py-2.5">
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold border ${
                          typeBadgeClass[aircraft.type] ||
                          'bg-slate-500/20 text-slate-400 border-slate-500/30'
                        }`}
                      >
                        {aircraft.type}
                      </span>
                    </TableCell>
                    <TableCell className="py-2.5 text-center">
                      <span className="inline-flex items-center gap-0.5 text-xs text-slate-400">
                        <Users className="w-3 h-3" />
                        {aircraft.seatingCapacity}
                      </span>
                    </TableCell>
                    <TableCell className="py-2.5 text-right pr-5 text-xs text-slate-400">
                      {aircraft.estimatedValue
                        ? formatPrice(aircraft.estimatedValue)
                        : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile card list — hidden on desktop */}
          <div className="sm:hidden px-4 py-3 space-y-2">
            {fleetWithValues.map((aircraft, idx) => (
              <div
                key={aircraft.registration || idx}
                className="rounded-lg bg-white/5 p-3 space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <RegistrationBadge
                    registration={aircraft.registration}
                    type={aircraft.type}
                  />
                  <span
                    className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold border ${
                      typeBadgeClass[aircraft.type] ||
                      'bg-slate-500/20 text-slate-400 border-slate-500/30'
                    }`}
                  >
                    {aircraft.type}
                  </span>
                </div>
                <div className="text-xs text-slate-300 font-medium">
                  {aircraft.model}
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {aircraft.seatingCapacity} seats
                  </span>
                  <span>
                    {aircraft.estimatedValue
                      ? formatPrice(aircraft.estimatedValue)
                      : 'N/A'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Footer */}
        {matchedCount > 0 && (
          <div className="px-5 py-3 border-t border-slate-800 flex items-center justify-between gap-2">
            <p className="text-[10px] text-slate-500">
              Estimates based on published OEM/market pricing ({matchedCount}/{fleet.length} matched)
            </p>
            <p className="text-xs font-semibold text-sky-400">
              Fleet est. {formatPrice(totalValue)}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
