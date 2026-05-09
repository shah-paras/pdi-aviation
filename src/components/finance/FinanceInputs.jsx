import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Percent, Fuel, Shield, Plane, Search, ChevronDown, RefreshCw, Lock } from 'lucide-react';
import { useCurrency } from '@/hooks/use-currency';
import { getCurrencyMeta } from '@/lib/currency-config';
import { AIRCRAFT_DATA, AIRCRAFT_CATEGORIES } from '@/data/aircraftFinanceData';

export default function FinanceInputs({ values, onChange, selectedAircraft, onAircraftSelect, inputMode = 'aircraft', disabled = false }) {
  const { currencySymbol, selectedCurrency, reverseConvertAmount, convertAmount } = useCurrency();
  const meta = getCurrencyMeta(selectedCurrency);
  const [rawInputs, setRawInputs] = useState({});
  const [aircraftSearch, setAircraftSearch] = useState('');
  const [aircraftExpanded, setAircraftExpanded] = useState(!selectedAircraft);
  const isManual = inputMode === 'manual';

  const handleChange = (key, value) => {
    onChange({ ...values, [key]: value });
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat(meta.locale).format(num);
  };

  const displayValue = (usdValue) => {
    return formatCurrency(isManual ? convertAmount(usdValue) : usdValue);
  };

  const parseCurrency = (str) => {
    return parseFloat(str.replace(/[^0-9.-]+/g, '')) || 0;
  };

  const handleCurrencyInput = (key, rawValue) => {
    const filtered = rawValue.replace(/[^0-9.,-]/g, '');
    setRawInputs(prev => ({ ...prev, [key]: filtered }));
    const parsed = parseCurrency(filtered);
    handleChange(key, isManual ? reverseConvertAmount(parsed) : parsed);
  };

  const clearRawInput = (key) => {
    setRawInputs(prev => { const { [key]: _, ...rest } = prev; return rest; });
  };

  const filteredAircraft = useMemo(() => {
    if (!aircraftSearch.trim()) return AIRCRAFT_DATA;
    const q = aircraftSearch.toLowerCase();
    return AIRCRAFT_DATA.filter(a =>
      a.name.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)
    );
  }, [aircraftSearch]);

  const groupedAircraft = useMemo(() => {
    const groups = {};
    for (const cat of AIRCRAFT_CATEGORIES) {
      const items = filteredAircraft.filter(a => a.category === cat);
      if (items.length > 0) groups[cat] = items;
    }
    return groups;
  }, [filteredAircraft]);

  return (
    <div className="space-y-6">
      {/* Aircraft Selection — hidden in manual mode */}
      {!isManual && (
        <div className="bg-sky-500/5 backdrop-blur-sm rounded-xl border border-sky-500/20 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Plane className="w-5 h-5 text-sky-400" />
              <h3 className="font-semibold text-white">{disabled ? 'Aircraft' : 'Select Aircraft'}</h3>
            </div>
            {!disabled && selectedAircraft && !aircraftExpanded && (
              <button
                type="button"
                onClick={() => setAircraftExpanded(true)}
                className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Change
              </button>
            )}
          </div>

          {/* Collapsed: show selected aircraft summary */}
          {selectedAircraft && (disabled || !aircraftExpanded) && (
            <div
              className={`w-full text-left p-3 rounded-lg bg-sky-500/10 border border-sky-500/20 ${disabled ? '' : 'hover:bg-sky-500/15 cursor-pointer'} transition-colors group`}
              onClick={disabled ? undefined : () => setAircraftExpanded(true)}
            >
              <div className="text-sm font-medium text-sky-300">{selectedAircraft.name}</div>
              {!disabled && (
                <div className="flex items-center justify-between mt-1">
                  <div className="text-xs text-slate-400 grid grid-cols-2 gap-x-3 gap-y-0.5">
                    <span>{selectedAircraft.passengers} pax</span>
                    <span>{selectedAircraft.rangeNm.toLocaleString()} nm</span>
                    <span>{selectedAircraft.speedKtas} ktas</span>
                    <span>{selectedAircraft.fuelBurnGPH} gal/hr</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-slate-400 transition-colors" />
                </div>
              )}
            </div>
          )}

          {/* Expanded: search + list */}
          {!disabled && (aircraftExpanded || !selectedAircraft) && (
            <>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search aircraft..."
                  value={aircraftSearch}
                  onChange={(e) => setAircraftSearch(e.target.value)}
                  className="pl-9 bg-slate-900 border-slate-800 text-slate-200"
                />
              </div>

              <div className="max-h-48 overflow-y-auto scrollbar-thin rounded-lg border border-slate-800 bg-slate-900/50">
                {Object.entries(groupedAircraft).map(([category, aircraft]) => (
                  <div key={category}>
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-sky-400 uppercase tracking-wider bg-slate-900 sticky top-0 z-10 border-b border-slate-800">
                      {category}
                    </div>
                    {aircraft.map(a => (
                      <button
                        key={a.name}
                        type="button"
                        onClick={() => {
                          onAircraftSelect(a);
                          setAircraftSearch('');
                          setAircraftExpanded(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-sky-500/10 transition-colors flex items-center justify-between ${
                          selectedAircraft?.name === a.name
                            ? 'bg-sky-500/15 text-sky-300'
                            : 'text-slate-300'
                        }`}
                      >
                        <span>{a.name}</span>
                        <span className="text-xs text-slate-500">{a.passengers} pax</span>
                      </button>
                    ))}
                  </div>
                ))}
                {filteredAircraft.length === 0 && (
                  <div className="px-3 py-4 text-sm text-slate-500 text-center">No aircraft found</div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      <div className={disabled ? 'relative' : ''}>
      {disabled && (
        <div className="sticky top-0 z-10 mx-auto mb-4 flex flex-col items-center text-center bg-slate-900/95 border border-white/10 rounded-xl px-5 py-4 shadow-lg backdrop-blur-sm">
          <Lock className="w-5 h-5 text-slate-400 mb-2" />
          <p className="text-sm text-white font-medium mb-1">Select multiple aircraft & edit costs</p>
          <p className="text-xs text-slate-400 mb-3">Upgrade to compare jets, customise loan terms, operating costs, and fuel estimates</p>
          <a href="/Pricing" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium transition-colors">
            Upgrade now &rarr;
          </a>
        </div>
      )}
      <div className={disabled ? 'blur-[2px] pointer-events-none select-none space-y-6' : 'space-y-6'}>
      {/* Purchase Price */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-5 h-5 flex items-center justify-center text-sky-400 font-bold text-lg leading-none">{currencySymbol}</span>
          <h3 className="font-semibold text-white">Purchase Details</h3>
        </div>

        <div>
          <Label className="text-sm text-slate-300 mb-1.5 block">Purchase Price ({isManual ? selectedCurrency : 'USD'})</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{isManual ? currencySymbol : '$'}</span>
            <Input
              type="text"
              inputMode="decimal"
              value={rawInputs.purchasePrice !== undefined ? rawInputs.purchasePrice : displayValue(values.purchasePrice)}
              onChange={(e) => handleCurrencyInput('purchasePrice', e.target.value)}
              onBlur={() => clearRawInput('purchasePrice')}
              className="pl-7 bg-slate-900 border-slate-800 text-slate-200"
            />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {isManual ? `Enter values in ${selectedCurrency} — converted internally` : 'All values in USD — converted in results'}
          </p>
        </div>
      </div>

      {/* Loan Terms */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Percent className="w-5 h-5 text-sky-400" />
          <h3 className="font-semibold text-white">Loan Terms</h3>
        </div>

        <div className="space-y-5">
          {/* Slider: Down Payment */}
          <div>
            <div className="flex justify-between mb-1.5">
              <Label className="text-sm text-slate-300">Down Payment</Label>
              <span className="text-sm font-medium text-sky-400">{values.downPaymentPercent}%</span>
            </div>
            <Slider
              value={[values.downPaymentPercent]}
              onValueChange={([v]) => handleChange('downPaymentPercent', v)}
              min={20}
              max={50}
              step={1}
            />
            <div className="text-xs text-slate-400 mt-1">
              {isManual ? currencySymbol : '$'}{displayValue(values.purchasePrice * values.downPaymentPercent / 100)}
            </div>
          </div>

          {/* Slider: Loan Term */}
          <div>
            <div className="flex justify-between mb-1.5">
              <Label className="text-sm text-slate-300">Loan Term</Label>
              <span className="text-sm font-medium text-sky-400">{values.loanTermYears} yrs</span>
            </div>
            <Slider
              value={[values.loanTermYears]}
              onValueChange={([v]) => handleChange('loanTermYears', v)}
              min={1}
              max={10}
              step={1}
            />
            <div className="text-xs text-slate-400 mt-1">
              {values.loanTermYears * 12} monthly payments
            </div>
          </div>

          {/* Row: Interest Rate + Loan Type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Label className="text-xs text-slate-300">Interest Rate</Label>
                <div className="group relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-slate-500 cursor-help" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-10">
                    Aviation rates typically 6–12%
                  </div>
                </div>
              </div>
              {(() => {
                const raw = rawInputs.interestRate;
                const val = raw !== undefined ? parseFloat(raw) : values.interestRate;
                const isError = raw !== undefined && (isNaN(val) || val < 6 || val > 12);
                return (
                  <>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">%</span>
                      <Input
                        type="text"
                        inputMode="decimal"
                        value={rawInputs.interestRate !== undefined ? rawInputs.interestRate : values.interestRate}
                        onChange={(e) => {
                          const filtered = e.target.value.replace(/[^0-9.]/g, '');
                          setRawInputs(prev => ({ ...prev, interestRate: filtered }));
                          const parsed = parseFloat(filtered);
                          if (!isNaN(parsed) && parsed >= 6 && parsed <= 12) {
                            handleChange('interestRate', parsed);
                          }
                        }}
                        onBlur={() => {
                          const r = rawInputs.interestRate;
                          const v = parseFloat(r);
                          if (r !== undefined) {
                            if (isNaN(v) || v < 6) handleChange('interestRate', 6);
                            else if (v > 12) handleChange('interestRate', 12);
                          }
                          setRawInputs(prev => { const { interestRate: _, ...rest } = prev; return rest; });
                        }}
                        className={`pl-7 bg-slate-900 text-slate-200 ${isError ? 'border-red-500 focus-visible:ring-red-500/30' : 'border-slate-800'}`}
                      />
                    </div>
                    {isError && (
                      <p className="text-xs text-red-400 mt-1">6–12%</p>
                    )}
                  </>
                );
              })()}
            </div>
            <div>
              <Label className="text-xs text-slate-300 mb-1.5 block">Loan Type</Label>
              <Select value={values.loanType} onValueChange={(v) => handleChange('loanType', v)}>
                <SelectTrigger className="bg-slate-900 border-slate-800 text-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="amortizing">Amortizing</SelectItem>
                  <SelectItem value="balloon">Balloon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {values.loanType === 'balloon' && (
            <div>
              <Label className="text-sm text-slate-300 mb-1.5 block">Residual Value (%)</Label>
              <Input
                type="number"
                step="5"
                min="0"
                max="50"
                value={values.residualPercent}
                onChange={(e) => handleChange('residualPercent', parseFloat(e.target.value) || 0)}
                className="bg-slate-900 border-slate-800 text-slate-200"
              />
            </div>
          )}
        </div>
      </div>

      {/* Operating Costs */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Fuel className="w-5 h-5 text-sky-400" />
          <h3 className="font-semibold text-white">Operating Costs</h3>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-sm text-slate-300 mb-1.5 block">Annual Flight Hours</Label>
            <Input
              type="number"
              value={values.annualHours}
              onChange={(e) => handleChange('annualHours', parseInt(e.target.value) || 0)}
              className="bg-slate-900 border-slate-800 text-slate-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-slate-300 mb-1.5 block">Fuel Cost ({isManual ? currencySymbol : '$'}/gal)</Label>
              <Input
                type="number"
                step="0.1"
                value={isManual ? Math.round(convertAmount(values.fuelCostPerGallon) * 100) / 100 : values.fuelCostPerGallon}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  handleChange('fuelCostPerGallon', isManual ? reverseConvertAmount(val) : val);
                }}
                className="bg-slate-900 border-slate-800 text-slate-200"
              />
            </div>
            <div>
              <Label className="text-xs text-slate-300 mb-1.5 block">Fuel Burn (gal/hr)</Label>
              <Input
                type="number"
                value={values.fuelBurnGPH}
                onChange={(e) => handleChange('fuelBurnGPH', parseFloat(e.target.value) || 0)}
                className="bg-slate-900 border-slate-800 text-slate-200"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm text-slate-300 mb-1.5 block">Maintenance Reserve ({isManual ? currencySymbol : '$'}/hr)</Label>
            <Input
              type="number"
              value={isManual ? Math.round(convertAmount(values.maintenancePerHour) * 100) / 100 : values.maintenancePerHour}
              onChange={(e) => {
                const val = parseFloat(e.target.value) || 0;
                handleChange('maintenancePerHour', isManual ? reverseConvertAmount(val) : val);
              }}
              className="bg-slate-900 border-slate-800 text-slate-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-slate-300 mb-1.5 block">Fuel Capacity (gal)</Label>
              <Input
                type="number"
                step="10"
                min="0"
                placeholder="0 = skip"
                value={values.fuelCapacityGallons}
                onChange={(e) => handleChange('fuelCapacityGallons', Number(e.target.value))}
                className="bg-slate-900 border-slate-800 text-slate-200"
              />
            </div>
            <div>
              <Label className="text-xs text-slate-300 mb-1.5 block">Cruise Speed (kt)</Label>
              <Input
                type="number"
                step="10"
                min="0"
                value={values.cruiseSpeedKtas}
                onChange={(e) => handleChange('cruiseSpeedKtas', Number(e.target.value))}
                className="bg-slate-900 border-slate-800 text-slate-200"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm text-slate-300 mb-1.5 block">Trip Distance (nm)</Label>
            <Input
              type="number"
              step="50"
              min="0"
              placeholder="0 = skip range check"
              value={values.tripDistanceNm}
              onChange={(e) => handleChange('tripDistanceNm', Number(e.target.value))}
              className="bg-slate-900 border-slate-800 text-slate-200"
            />
          </div>
        </div>
      </div>

      {/* Fixed Annual Costs */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-sky-400" />
          <h3 className="font-semibold text-white">Fixed Annual Costs ({isManual ? selectedCurrency : 'USD'})</h3>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-slate-300 mb-1.5 block">Insurance (/yr)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{isManual ? currencySymbol : '$'}</span>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={rawInputs.insurancePerYear !== undefined ? rawInputs.insurancePerYear : displayValue(values.insurancePerYear)}
                  onChange={(e) => handleCurrencyInput('insurancePerYear', e.target.value)}
                  onBlur={() => clearRawInput('insurancePerYear')}
                  className="pl-7 bg-slate-900 border-slate-800 text-slate-200"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs text-slate-300 mb-1.5 block">Hangar (/yr)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{isManual ? currencySymbol : '$'}</span>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={rawInputs.hangarPerYear !== undefined ? rawInputs.hangarPerYear : displayValue(values.hangarPerYear)}
                  onChange={(e) => handleCurrencyInput('hangarPerYear', e.target.value)}
                  onBlur={() => clearRawInput('hangarPerYear')}
                  className="pl-7 bg-slate-900 border-slate-800 text-slate-200"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-slate-300 mb-1.5 block">Crew (/yr)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{isManual ? currencySymbol : '$'}</span>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={rawInputs.crewPerYear !== undefined ? rawInputs.crewPerYear : displayValue(values.crewPerYear)}
                  onChange={(e) => handleCurrencyInput('crewPerYear', e.target.value)}
                  onBlur={() => clearRawInput('crewPerYear')}
                  className="pl-7 bg-slate-900 border-slate-800 text-slate-200"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs text-slate-300 mb-1.5 block">Management (/yr)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{isManual ? currencySymbol : '$'}</span>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={rawInputs.managementPerYear !== undefined ? rawInputs.managementPerYear : displayValue(values.managementPerYear)}
                  onChange={(e) => handleCurrencyInput('managementPerYear', e.target.value)}
                  onBlur={() => clearRawInput('managementPerYear')}
                  className="pl-7 bg-slate-900 border-slate-800 text-slate-200"
                />
              </div>
            </div>
          </div>
          <div>
            <Label className="text-xs text-slate-300 mb-1.5 block">Catering (/yr)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{isManual ? currencySymbol : '$'}</span>
              <Input
                type="text"
                inputMode="decimal"
                value={rawInputs.cateringPerYear !== undefined ? rawInputs.cateringPerYear : displayValue(values.cateringPerYear)}
                onChange={(e) => handleCurrencyInput('cateringPerYear', e.target.value)}
                onBlur={() => clearRawInput('cateringPerYear')}
                className="pl-7 bg-slate-900 border-slate-800 text-slate-200"
              />
            </div>
          </div>
        </div>

        {/* Landing Fees — full-width row */}
        <div className="mt-4">
          <Label className="text-sm text-slate-300 mb-1.5 block">Landing Fees</Label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-slate-400 mb-1 block">Per Trip ({isManual ? currencySymbol : '$'})</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{isManual ? currencySymbol : '$'}</span>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={rawInputs.landingFeesPerTrip !== undefined ? rawInputs.landingFeesPerTrip : displayValue(values.landingFeesPerTrip)}
                  onChange={(e) => handleCurrencyInput('landingFeesPerTrip', e.target.value)}
                  onBlur={() => clearRawInput('landingFeesPerTrip')}
                  className="pl-7 bg-slate-900 border-slate-800 text-slate-200"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs text-slate-400 mb-1 block">Trips/yr</Label>
              <Input
                type="number"
                min="0"
                step="1"
                value={values.tripsPerYear}
                onChange={(e) => handleChange('tripsPerYear', Number(e.target.value))}
                className="bg-slate-900 border-slate-800 text-slate-200"
              />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-1.5">
            Annual total: {isManual ? currencySymbol : '$'}{displayValue(values.landingFeesPerTrip * values.tripsPerYear)}
          </p>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}
