import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  BarChart3, Loader2,
  RefreshCw, FileText, Lock
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import AircraftSelector from '@/components/comparison/AircraftSelector';
import ComparisonTable from '@/components/comparison/ComparisonTable';
import { useAircraftModels } from '@/hooks/useAircraftModels';
import FeatureGate from '@/components/auth/FeatureGate';
import { useTierLimits } from '@/hooks/useTierLimits';
import { hasAccess } from '@/config/tiers';

export default function AircraftComparison() {
  const { data: aircraftModels = [], isLoading: modelsLoading } = useAircraftModels();
  const { limits, tier: userTier } = useTierLimits();

  const [selectedAircraft, setSelectedAircraft] = useState(() => {
    try { return JSON.parse(localStorage.getItem('pdi-comparison-aircraft')) || ['', '', '']; }
    catch { return ['', '', '']; }
  });
  const [searchParams] = useSearchParams();

  const isLoading = modelsLoading;
  const aircraft = useMemo(() =>
    aircraftModels.filter(a =>
      a.type === 'FW' && a.max_range_nm && a.cruise_speed_ktas
    ),
    [aircraftModels]
  );

  // Clear gated slots so stale localStorage values don't leak into the table
  useEffect(() => {
    setSelectedAircraft(prev => {
      const cleaned = prev.map((id, i) => (i >= limits.comparisonSlots ? '' : id));
      if (cleaned.every((v, i) => v === prev[i])) return prev;
      return cleaned;
    });
  }, [limits.comparisonSlots]);

  // Only slots the user has access to — used for table, toolbar, PDF
  const visibleAircraft = useMemo(
    () => selectedAircraft.map((id, i) => (i < limits.comparisonSlots ? id : '')),
    [selectedAircraft, limits.comparisonSlots]
  );

  useEffect(() => {
    localStorage.setItem('pdi-comparison-aircraft', JSON.stringify(selectedAircraft));
  }, [selectedAircraft]);

  useEffect(() => {
    const idsParam = searchParams.get('ids');
    if (idsParam) {
      const ids = idsParam.split(',').slice(0, 3);
      setSelectedAircraft(ids.concat(Array(3 - ids.length).fill('')));
    }
  }, [searchParams]);

  const handleAircraftChange = (index, value) => {
    const newAircraft = [...selectedAircraft];
    newAircraft[index] = value;
    setSelectedAircraft(newAircraft);
  };

  const handleClear = (index) => {
    const newAircraft = [...selectedAircraft];
    newAircraft[index] = '';
    setSelectedAircraft(newAircraft);
  };

  const handleClearAll = () => {
    setSelectedAircraft(['', '', '']);
  };

  const handleExportPDF = async () => {
    const models = visibleAircraft.map(id => aircraft.find(a => a.id === id)).filter(Boolean);
    if (models.length === 0) return;

    const { jsPDF } = await import('jspdf');
    const { default: autoTable } = await import('jspdf-autotable');

    const doc = new jsPDF({ orientation: 'landscape' });

    doc.setFontSize(18);
    doc.setTextColor(14, 165, 233); // sky-500
    doc.text('PDI Aviation — Aircraft Comparison', 14, 18);

    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text(`Generated on ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`, 14, 25);

    const head = [['Spec', ...models.map(m => `${m.manufacturer} ${m.model}`)]];
    const body = [
      ['Category', ...models.map(m => m.category || 'N/A')],
      ['New Price (USD)', ...models.map(m => m.new_price_usd ? `$${m.new_price_usd.toLocaleString()}` : 'N/A')],
      ['Pre-Owned Low (USD)', ...models.map(m => m.preowned_price_low_usd ? `$${m.preowned_price_low_usd.toLocaleString()}` : 'N/A')],
      ['Pre-Owned High (USD)', ...models.map(m => m.preowned_price_high_usd ? `$${m.preowned_price_high_usd.toLocaleString()}` : 'N/A')],
      ['Production Status', ...models.map(m => m.production_status || 'N/A')],
      ['Max Range (nm)', ...models.map(m => m.max_range_nm || 'N/A')],
      ['Cruise Speed (ktas)', ...models.map(m => m.cruise_speed_ktas || 'N/A')],
      ['Max Passengers', ...models.map(m => m.max_pax || 'N/A')],
      ['Engines', ...models.map(m => m.engines || 'N/A')],
      ['Cabin Height (ft)', ...models.map(m => m.cabin_height_ft || 'N/A')],
      ['Cabin Width (ft)', ...models.map(m => m.cabin_width_ft || 'N/A')],
      ['Cabin Length (ft)', ...models.map(m => m.cabin_length_ft || 'N/A')],
    ];

    autoTable(doc, {
      startY: 30,
      head,
      body,
      theme: 'grid',
      headStyles: { fillColor: [14, 165, 233], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 247, 250] },
      styles: { fontSize: 9, cellPadding: 3 },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 45 } },
    });

    doc.save('aircraft-comparison.pdf');
  };

  const activeSelections = visibleAircraft.filter(Boolean).length;

  return (
    <div className="h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-4rem)] bg-slate-950 flex flex-col lg:flex-row overflow-hidden">
      {/* ── Left Sidebar ── */}
      <div className="lg:w-80 xl:w-96 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r border-slate-800 flex-shrink-0 overflow-y-auto max-h-[40vh] lg:max-h-full">
        {/* Sidebar header */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5 mb-1">
            <BarChart3 className="w-4 h-4 text-sky-400" />
            <h1 className="text-lg font-semibold text-white">Aircraft Comparison</h1>
          </div>
          <p className="text-xs text-slate-500">Compare up to 3 aircraft side-by-side</p>
        </div>

        {/* Aircraft selectors */}
        <div className="p-4 space-y-3">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
            </div>
          ) : (
            [0, 1, 2].map(index => {
              if (index >= limits.comparisonSlots) {
                return (
                  <FeatureGate key={index} requiredTier="enthusiast" feature={`Slot ${index + 1}`} mode="lock">
                    <AircraftSelector
                      index={index}
                      selectedAircraft={selectedAircraft[index]}
                      aircraft={aircraft}
                      onAircraftChange={(value) => handleAircraftChange(index, value)}
                      onClear={() => handleClear(index)}
                    />
                  </FeatureGate>
                );
              }
              return (
                <AircraftSelector
                  key={index}
                  index={index}
                  selectedAircraft={selectedAircraft[index]}
                  aircraft={aircraft}
                  onAircraftChange={(value) => handleAircraftChange(index, value)}
                  onClear={() => handleClear(index)}
                />
              );
            })
          )}
        </div>

      </div>

      {/* ── Right Main Panel — Comparison Results ── */}
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-2">
            {activeSelections > 0 && (
              <button
                onClick={handleClearAll}
                className="text-xs text-slate-400 hover:text-slate-300 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-white/5"
              >
                <RefreshCw className="w-3 h-3" />
                Clear All
              </button>
            )}
            <Button
              onClick={hasAccess(userTier, 'insider') ? handleExportPDF : undefined}
              disabled={!hasAccess(userTier, 'insider') || activeSelections === 0}
              size="sm"
              className="bg-sky-600 hover:bg-sky-700 text-white text-xs disabled:opacity-40"
              title={!hasAccess(userTier, 'insider') ? 'Requires Insider tier' : undefined}
            >
              {!hasAccess(userTier, 'insider') && <Lock className="w-3 h-3 mr-1" />}
              <FileText className="w-3.5 h-3.5 mr-1.5" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Comparison table */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <ComparisonTable
            selectedAircraft={visibleAircraft}
            aircraft={aircraft}
          />
        </div>
      </div>

    </div>
  );
}