import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  BarChart3, Download, Save, Loader2,
  Filter, RefreshCw, FileText
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
import aircraftModels from '@/data/aircraftModels';

export default function AircraftComparison() {
  const { formatPrice } = useCurrency();
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

  const isLoading = false;
  // Filter to comparable aircraft types (jets, turboprops, VIP airliners)
  const aircraft = useMemo(() =>
    aircraftModels.filter(a =>
      a.type === 'FW' && a.max_range_nm && a.cruise_speed_ktas
    ),
    []
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
      ['New Price (USD)', ...models.map(m => m.new_price_usd ? formatPrice(m.new_price_usd) : 'N/A')],
      ['Pre-Owned Low (USD)', ...models.map(m => m.preowned_price_low_usd ? formatPrice(m.preowned_price_low_usd) : 'N/A')],
      ['Pre-Owned High (USD)', ...models.map(m => m.preowned_price_high_usd ? formatPrice(m.preowned_price_high_usd) : 'N/A')],
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
      ['New Price (USD)', ...models.map(m => m.new_price_usd ? formatPrice(m.new_price_usd) : 'N/A')],
      ['Pre-Owned Low (USD)', ...models.map(m => m.preowned_price_low_usd ? formatPrice(m.preowned_price_low_usd) : 'N/A')],
      ['Pre-Owned High (USD)', ...models.map(m => m.preowned_price_high_usd ? formatPrice(m.preowned_price_high_usd) : 'N/A')],
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
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-sky-400 text-sm mb-3">
                <BarChart3 className="w-4 h-4" />
                <span>Comparison Tool</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-3">Aircraft Comparison</h1>
              <p className="text-slate-300 max-w-2xl">
                Compare up to 3 aircraft side-by-side. Analyze specs, pricing, performance, and features to make informed decisions.
              </p>
            </div>
            <CurrencySwitcher />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel - Selectors */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-sm overflow-hidden">
                <div className="p-4 bg-slate-900 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <span className="font-semibold text-white">Select Aircraft</span>
                  </div>
                  {activeSelections > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="text-xs text-slate-400 hover:text-slate-300 flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Clear All
                    </button>
                  )}
                </div>
                
                <div className="p-4 space-y-4">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                    </div>
                  ) : (
                    [0, 1, 2].map(index => (
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
                    ))
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-sm p-4 space-y-3">
                <Button
                  onClick={handleExportPDF}
                  disabled={activeSelections === 0}
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>
          </div>

          {/* Right Panel - Comparison Table */}
          <div className="flex-1 min-w-0">
            <ComparisonTable 
              selectedAircraft={selectedAircraft}
              aircraft={aircraft}
            />
          </div>
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