import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  BarChart3, Download, Save, Loader2,
  Filter, RefreshCw
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import AircraftSelector from '@/components/comparison/AircraftSelector';
import ComparisonTable from '@/components/comparison/ComparisonTable';

export default function AircraftComparison() {
  const [selectedCategories, setSelectedCategories] = useState(['', '', '']);
  const [selectedAircraft, setSelectedAircraft] = useState(['', '', '']);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [comparisonName, setComparisonName] = useState('');
  const [saving, setSaving] = useState(false);

  const isLoading = false;
  const aircraft = [
    { id: '1', manufacturer: 'Gulfstream', model: 'G650ER', category: 'Ultra Long Range', max_range_nm: 7500, cruise_speed_ktas: 516, max_pax: 19, price_usd: 71500000, engines: '2x Rolls-Royce BR725', wingspan_ft: 99.7, cabin_length_ft: 53.6, baggage_volume_cuft: 195, max_altitude_ft: 51000, takeoff_distance_ft: 6000 },
    { id: '2', manufacturer: 'Bombardier', model: 'Global 7500', category: 'Ultra Long Range', max_range_nm: 7700, cruise_speed_ktas: 516, max_pax: 19, price_usd: 75000000, engines: '2x GE Passport', wingspan_ft: 104, cabin_length_ft: 54.4, baggage_volume_cuft: 195, max_altitude_ft: 51000, takeoff_distance_ft: 5800 },
    { id: '3', manufacturer: 'Dassault', model: 'Falcon 8X', category: 'Long Range', max_range_nm: 6450, cruise_speed_ktas: 460, max_pax: 16, price_usd: 58500000, engines: '3x PW307D', wingspan_ft: 86.3, cabin_length_ft: 42.8, baggage_volume_cuft: 140, max_altitude_ft: 51000, takeoff_distance_ft: 5880 },
    { id: '4', manufacturer: 'Cessna', model: 'Citation Longitude', category: 'Super Midsize', max_range_nm: 3500, cruise_speed_ktas: 476, max_pax: 12, price_usd: 28950000, engines: '2x Honeywell HTF7700L', wingspan_ft: 68.9, cabin_length_ft: 25.2, baggage_volume_cuft: 112, max_altitude_ft: 45000, takeoff_distance_ft: 4810 },
    { id: '5', manufacturer: 'Embraer', model: 'Praetor 600', category: 'Super Midsize', max_range_nm: 4018, cruise_speed_ktas: 466, max_pax: 12, price_usd: 21500000, engines: '2x Honeywell HTF7500E', wingspan_ft: 70.5, cabin_length_ft: 27.5, baggage_volume_cuft: 155, max_altitude_ft: 45000, takeoff_distance_ft: 4717 },
    { id: '6', manufacturer: 'Pilatus', model: 'PC-24', category: 'Light', max_range_nm: 2000, cruise_speed_ktas: 440, max_pax: 11, price_usd: 10700000, engines: '2x Williams FJ44-4A', wingspan_ft: 55.9, cabin_length_ft: 23.3, baggage_volume_cuft: 90, max_altitude_ft: 45000, takeoff_distance_ft: 2930 },
    { id: '7', manufacturer: 'Boeing', model: 'BBJ 737 MAX', category: 'VIP Airliner', max_range_nm: 6600, cruise_speed_ktas: 470, max_pax: 50, price_usd: 95000000, engines: '2x CFM LEAP-1B', wingspan_ft: 117.8, cabin_length_ft: 79.2, baggage_volume_cuft: 400, max_altitude_ft: 41000, takeoff_distance_ft: 5900 },
    { id: '8', manufacturer: 'Airbus', model: 'ACJ320neo', category: 'VIP Airliner', max_range_nm: 6000, cruise_speed_ktas: 460, max_pax: 50, price_usd: 110000000, engines: '2x CFM LEAP-1A', wingspan_ft: 117.5, cabin_length_ft: 85.3, baggage_volume_cuft: 450, max_altitude_ft: 41000, takeoff_distance_ft: 6100 },
  ];

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

  const handleExportCSV = () => {
    const models = selectedAircraft.map(id => aircraft.find(a => a.id === id)).filter(Boolean);
    if (models.length === 0) return;

    const headers = ['Spec', ...models.map(m => `${m.manufacturer} ${m.model}`)];
    const specs = [
      ['Category', ...models.map(m => m.category)],
      ['Price (New)', ...models.map(m => m.price_new_usd ? `$${m.price_new_usd.toLocaleString()}` : 'N/A')],
      ['Price (Used)', ...models.map(m => m.price_used_usd ? `$${m.price_used_usd.toLocaleString()}` : 'N/A')],
      ['Max Range (nm)', ...models.map(m => m.max_range_nm || 'N/A')],
      ['Cruise Speed (ktas)', ...models.map(m => m.cruise_speed_ktas || 'N/A')],
      ['Max Passengers', ...models.map(m => m.max_passengers || 'N/A')],
      ['Hourly Cost', ...models.map(m => m.operating_cost_per_hour ? `$${m.operating_cost_per_hour.toLocaleString()}` : 'N/A')]
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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sky-400 text-sm mb-3">
            <BarChart3 className="w-4 h-4" />
            <span>Comparison Tool</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">Aircraft Comparison</h1>
          <p className="text-slate-300 max-w-2xl">
            Compare up to 3 aircraft side-by-side. Analyze specs, pricing, performance, and features to make informed decisions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel - Selectors */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-600" />
                    <span className="font-semibold text-slate-900">Select Aircraft</span>
                  </div>
                  {activeSelections > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1"
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
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
                <Button
                  onClick={() => setSaveDialogOpen(true)}
                  disabled={activeSelections === 0}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Comparison
                </Button>
                <Button
                  onClick={handleExportCSV}
                  disabled={activeSelections === 0}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
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
              <label className="text-sm font-medium text-slate-700 block mb-1.5">
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
                className="bg-blue-600 hover:bg-blue-700 text-white"
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