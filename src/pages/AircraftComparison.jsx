import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  BarChart3, Download, Save, Loader2,
  RefreshCw, FileText
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useSearchParams } from 'react-router-dom';
import AircraftSelector from '@/components/comparison/AircraftSelector';
import ComparisonTable from '@/components/comparison/ComparisonTable';
import { useCurrency } from '@/hooks/use-currency';
import CurrencySwitcher from '@/components/CurrencySwitcher';
import { useAircraftModels } from '@/hooks/useAircraftModels';
import FeatureGate from '@/components/auth/FeatureGate';
import { useTierLimits } from '@/hooks/useTierLimits';
import { hasAccess } from '@/config/tiers';
import { Lock } from 'lucide-react';

export default function AircraftComparison() {
  const { formatPrice, formatNumber, currencySymbol, convertAmount } = useCurrency();
  const { data: aircraftModels = [], isLoading: modelsLoading } = useAircraftModels();
  const { limits, tier: userTier } = useTierLimits();

  const [selectedCategories, setSelectedCategories] = useState(() => {
    try { return JSON.parse(localStorage.getItem('pdi-comparison-categories')) || ['', '', '']; }
    catch { return ['', '', '']; }
  });
  const [selectedAircraft, setSelectedAircraft] = useState(() => {
    try { return JSON.parse(localStorage.getItem('pdi-comparison-aircraft')) || ['', '', '']; }
    catch { return ['', '', '']; }
  });
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [comparisonName, setComparisonName] = useState('');
  const [saving, setSaving] = useState(false);

  const [searchParams] = useSearchParams();

  const isLoading = modelsLoading;
  // Filter to comparable aircraft types (jets, turboprops, VIP airliners)
  const aircraft = useMemo(() =>
    aircraftModels.filter(a =>
      a.type === 'FW' && a.max_range_nm && a.cruise_speed_ktas
    ),
    [aircraftModels]
  );

  // Persist selections to localStorage
  useEffect(() => {
    localStorage.setItem('pdi-comparison-aircraft', JSON.stringify(selectedAircraft));
    localStorage.setItem('pdi-comparison-categories', JSON.stringify(selectedCategories));
  }, [selectedAircraft, selectedCategories]);

  // Pre-populate from URL params (e.g., ?ids=id1,id2,id3)
  useEffect(() => {
    const idsParam = searchParams.get('ids');
    if (idsParam) {
      const ids = idsParam.split(',').slice(0, 3);
      setSelectedAircraft(ids.concat(Array(3 - ids.length).fill('')));
      // Set categories for each pre-populated aircraft
      const newCategories = ids.map(id => {
        const model = aircraft.find(a => a.id === id);
        return model?.category || '';
      }).concat(Array(3 - ids.length).fill(''));
      setSelectedCategories(newCategories);
    }
  }, [searchParams, aircraft]);

  const handleCategoryChange = (index, value) => {
    const newCategories = [...selectedCategories];
    newCategories[index] = value;
    setSelectedCategories(newCategories);
    
    // Clear aircraft selection if category changed
    const newAircraft = [...selectedAircraft];
    newAircraft[index] = '';
    setSelectedAircraft(newAircraft);
  };

  const handleAircraftChange = (index, value) => {
    const newAircraft = [...selectedAircraft];
    newAircraft[index] = value;
    setSelectedAircraft(newAircraft);
  };

  const handleClear = (index) => {
    const newCategories = [...selectedCategories];
    const newAircraft = [...selectedAircraft];
    newCategories[index] = '';
    newAircraft[index] = '';
    setSelectedCategories(newCategories);
    setSelectedAircraft(newAircraft);
  };

  const handleClearAll = () => {
    setSelectedCategories(['', '', '']);
    setSelectedAircraft(['', '', '']);
  };

  const handleSaveComparison = async () => {
    if (!comparisonName.trim()) return;
    
    setSaving(true);
    const activeAircraft = selectedAircraft.filter(Boolean);

    // Saved locally (no backend)
    alert('Comparison saved locally!');
    console.log('Saved comparison:', { name: comparisonName, aircraft_ids: activeAircraft });

    setSaving(false);
    setSaveDialogOpen(false);
    setComparisonName('');
  };

  const handleExportPDF = async () => {
    const models = selectedAircraft.map(id => aircraft.find(a => a.id === id)).filter(Boolean);
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
      [`New Price (${selectedCurrency})`, ...models.map(m => m.new_price_usd ? formatNumber(m.new_price_usd) : 'N/A')],
      [`Pre-Owned Low (${selectedCurrency})`, ...models.map(m => m.preowned_price_low_usd ? formatNumber(m.preowned_price_low_usd) : 'N/A')],
      [`Pre-Owned High (${selectedCurrency})`, ...models.map(m => m.preowned_price_high_usd ? formatNumber(m.preowned_price_high_usd) : 'N/A')],
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

  const handleExportCSV = () => {
    const models = selectedAircraft.map(id => aircraft.find(a => a.id === id)).filter(Boolean);
    if (models.length === 0) return;

    const headers = ['Spec', ...models.map(m => `${m.manufacturer} ${m.model}`)];
    const specs = [
      ['Category', ...models.map(m => m.category)],
      [`New Price (${selectedCurrency})`, ...models.map(m => m.new_price_usd ? convertAmount(m.new_price_usd).toFixed(0) : 'N/A')],
      [`Pre-Owned Low (${selectedCurrency})`, ...models.map(m => m.preowned_price_low_usd ? convertAmount(m.preowned_price_low_usd).toFixed(0) : 'N/A')],
      [`Pre-Owned High (${selectedCurrency})`, ...models.map(m => m.preowned_price_high_usd ? convertAmount(m.preowned_price_high_usd).toFixed(0) : 'N/A')],
      ['Production Status', ...models.map(m => m.production_status || 'N/A')],
      ['Max Range (nm)', ...models.map(m => m.max_range_nm || 'N/A')],
      ['Cruise Speed (ktas)', ...models.map(m => m.cruise_speed_ktas || 'N/A')],
      ['Max Passengers', ...models.map(m => m.max_pax || 'N/A')],
      ['Engines', ...models.map(m => m.engines || 'N/A')],
      ['Cabin Height (ft)', ...models.map(m => m.cabin_height_ft || 'N/A')],
      ['Cabin Width (ft)', ...models.map(m => m.cabin_width_ft || 'N/A')],
      ['Cabin Length (ft)', ...models.map(m => m.cabin_length_ft || 'N/A')],
      ['Notes', ...models.map(m => m.notes || 'N/A')],
    ];

    const csvContent = [headers, ...specs].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aircraft-comparison.csv';
    a.click();
  };

  const activeSelections = selectedAircraft.filter(Boolean).length;

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
                const requiredTier = index >= 2 ? 'insider' : 'enthusiast';
                return (
                  <FeatureGate key={index} requiredTier={requiredTier} feature={`Slot ${index + 1}`} mode="lock">
                    <AircraftSelector
                      index={index}
                      selectedCategory={selectedCategories[index]}
                      selectedAircraft={selectedAircraft[index]}
                      aircraft={aircraft}
                      onCategoryChange={(value) => handleCategoryChange(index, value)}
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
                  selectedCategory={selectedCategories[index]}
                  selectedAircraft={selectedAircraft[index]}
                  aircraft={aircraft}
                  onCategoryChange={(value) => handleCategoryChange(index, value)}
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
              onClick={hasAccess(userTier, 'enthusiast') ? handleExportPDF : undefined}
              disabled={!hasAccess(userTier, 'enthusiast') || activeSelections === 0}
              size="sm"
              className="bg-sky-600 hover:bg-sky-700 text-white text-xs disabled:opacity-40"
              title={!hasAccess(userTier, 'enthusiast') ? 'Requires Enthusiast tier' : undefined}
            >
              {!hasAccess(userTier, 'enthusiast') && <Lock className="w-3 h-3 mr-1" />}
              <FileText className="w-3.5 h-3.5 mr-1.5" />
              Export PDF
            </Button>
            <div className="relative group/save">
              <Button
                onClick={hasAccess(userTier, 'insider') ? () => setSaveDialogOpen(true) : undefined}
                disabled={!hasAccess(userTier, 'insider') || activeSelections === 0}
                size="sm"
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-white/5 text-xs disabled:opacity-40"
              >
                {!hasAccess(userTier, 'insider') && <Lock className="w-3 h-3 mr-1" />}
                <Save className="w-3.5 h-3.5 mr-1.5" />
                Save
              </Button>
              {!hasAccess(userTier, 'insider') && (
                <div className="absolute z-50 top-full left-1/2 -translate-x-1/2 pt-1 opacity-0 pointer-events-none group-hover/save:opacity-100 group-hover/save:pointer-events-auto transition-opacity duration-150">
                  <div className="px-3 py-1.5 rounded-md bg-slate-800 border border-white/10 shadow-lg whitespace-nowrap">
                    <span className="flex items-center gap-1.5 text-xs text-slate-300">
                      <Lock className="w-3 h-3 text-slate-500" />
                      Requires <span className="text-violet-400">Insider</span>
                      <span className="text-slate-600">·</span>
                      <a href="/Pricing" className="text-sky-400 hover:text-sky-300">Upgrade &rarr;</a>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <CurrencySwitcher />
        </div>

        {/* Comparison table */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <ComparisonTable
            selectedAircraft={selectedAircraft}
            aircraft={aircraft}
          />
        </div>
      </div>

      {/* Save Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Comparison</DialogTitle>
            <DialogDescription>
              Save this comparison to access it later or share with others.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <label className="text-sm font-medium text-slate-300 block mb-1.5">
                Comparison Name
              </label>
              <Input
                placeholder="e.g., Light Jets for Short Trips"
                value={comparisonName}
                onChange={(e) => setComparisonName(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSaveComparison}
                disabled={!comparisonName.trim() || saving}
                className="bg-sky-600 hover:bg-sky-700 text-white"
              >
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}