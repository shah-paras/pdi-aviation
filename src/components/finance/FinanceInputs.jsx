import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Percent, Fuel, Shield } from 'lucide-react';
import { useCurrency } from '@/hooks/use-currency';
import { getCurrencyMeta } from '@/lib/currency-config';

export default function FinanceInputs({ values, onChange }) {
  const { currencySymbol, selectedCurrency } = useCurrency();
  const meta = getCurrencyMeta(selectedCurrency);
  const [rawInputs, setRawInputs] = useState({});
  const handleChange = (key, value) => {
    onChange({ ...values, [key]: value });
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat(meta.locale).format(num);
  };

  const parseCurrency = (str) => {
    return parseFloat(str.replace(/[^0-9.-]+/g, '')) || 0;
  };

  const handleCurrencyInput = (key, rawValue) => {
    const filtered = rawValue.replace(/[^0-9.,-]/g, '');
    setRawInputs(prev => ({ ...prev, [key]: filtered }));
    handleChange(key, parseCurrency(filtered));
  };

  const clearRawInput = (key) => {
    setRawInputs(prev => { const { [key]: _, ...rest } = prev; return rest; });
  };

  return (
    <div className="space-y-6">
      {/* Purchase Price */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-5 h-5 flex items-center justify-center text-sky-400 font-bold text-lg leading-none">{currencySymbol}</span>
          <h3 className="font-semibold text-white">Purchase Details</h3>
        </div>

        <div>
          <Label className="text-sm text-slate-300 mb-1.5 block">Purchase Price ({selectedCurrency})</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{currencySymbol}</span>
            <Input
              type="text"
              inputMode="decimal"
              value={rawInputs.purchasePrice !== undefined ? rawInputs.purchasePrice : formatCurrency(values.purchasePrice)}
              onChange={(e) => handleCurrencyInput('purchasePrice', e.target.value)}
              onBlur={() => clearRawInput('purchasePrice')}
              className="pl-7 bg-slate-900 border-slate-800 text-slate-200"
            />
          </div>
        </div>
      </div>

      {/* Loan Terms */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Percent className="w-5 h-5 text-sky-400" />
          <h3 className="font-semibold text-white">Loan Terms</h3>
        </div>

        <div className="space-y-5">
          <div>
            <div className="flex justify-between mb-1.5">
              <Label className="text-sm text-slate-300">Down Payment</Label>
              <span className="text-sm font-medium text-sky-400">{values.downPaymentPercent}%</span>
            </div>
            <Slider
              value={[values.downPaymentPercent]}
              onValueChange={([v]) => handleChange('downPaymentPercent', v)}
              min={10}
              max={50}
              step={5}
            />
            <div className="text-xs text-slate-400 mt-1">
              {currencySymbol}{formatCurrency(values.purchasePrice * values.downPaymentPercent / 100)}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-slate-300 mb-1.5 block">Loan Term (Years)</Label>
              <Select value={values.loanTermYears.toString()} onValueChange={(v) => handleChange('loanTermYears', parseInt(v))}>
                <SelectTrigger className="bg-slate-900 border-slate-800 text-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 7, 10, 12, 15, 20].map(y => (
                    <SelectItem key={y} value={y.toString()}>{y} Years</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Label className="text-sm text-slate-300">Interest Rate (%)</Label>
                <div className="group relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-slate-500 cursor-help" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-10">
                    Aviation rates typically range 6–12%
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
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
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
                      <p className="text-xs text-red-400 mt-1">Must be between 6% and 12%</p>
                    )}
                  </>
                );
              })()}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-slate-300 mb-1.5 block">Loan Type</Label>
              <Select value={values.loanType} onValueChange={(v) => handleChange('loanType', v)}>
                <SelectTrigger className="bg-slate-900 border-slate-800 text-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="amortizing">Fully Amortizing</SelectItem>
                  <SelectItem value="balloon">Balloon/Residual</SelectItem>
                </SelectContent>
              </Select>
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
      </div>

      {/* Operating Costs */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Fuel className="w-5 h-5 text-sky-400" />
          <h3 className="font-semibold text-white">Operating Costs</h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm text-slate-300 mb-1.5 block">Annual Flight Hours</Label>
            <Input
              type="number"
              value={values.annualHours}
              onChange={(e) => handleChange('annualHours', parseInt(e.target.value) || 0)}
              className="bg-slate-900 border-slate-800 text-slate-200"
            />
          </div>
          <div>
            <Label className="text-sm text-slate-300 mb-1.5 block">Fuel Cost ({currencySymbol}/gal)</Label>
            <Input
              type="number"
              step="0.1"
              value={values.fuelCostPerGallon}
              onChange={(e) => handleChange('fuelCostPerGallon', parseFloat(e.target.value) || 0)}
              className="bg-slate-900 border-slate-800 text-slate-200"
            />
          </div>
          <div>
            <Label className="text-sm text-slate-300 mb-1.5 block">Fuel Burn (gal/hr)</Label>
            <Input
              type="number"
              value={values.fuelBurnGPH}
              onChange={(e) => handleChange('fuelBurnGPH', parseFloat(e.target.value) || 0)}
              className="bg-slate-900 border-slate-800 text-slate-200"
            />
          </div>
          <div>
            <Label className="text-sm text-slate-300 mb-1.5 block">Maintenance Reserve ({currencySymbol}/hr)</Label>
            <Input
              type="number"
              value={values.maintenancePerHour}
              onChange={(e) => handleChange('maintenancePerHour', parseFloat(e.target.value) || 0)}
              className="bg-slate-900 border-slate-800 text-slate-200"
            />
          </div>
          <div>
            <Label className="text-sm text-slate-300 mb-1.5 block">Fuel Capacity (gal)</Label>
            <Input
              type="number"
              step="10"
              min="0"
              placeholder="0 = skip fuel check"
              value={values.fuelCapacityGallons}
              onChange={(e) => handleChange('fuelCapacityGallons', Number(e.target.value))}
              className="bg-slate-900 border-slate-800 text-slate-200"
            />
          </div>
          <div>
            <Label className="text-sm text-slate-300 mb-1.5 block">Cruise Speed (kt)</Label>
            <Input
              type="number"
              step="10"
              min="100"
              value={values.cruiseSpeedKtas}
              onChange={(e) => handleChange('cruiseSpeedKtas', Number(e.target.value))}
              className="bg-slate-900 border-slate-800 text-slate-200"
            />
          </div>
          <div>
            <Label className="text-sm text-slate-300 mb-1.5 block">Typical Trip Distance (nm)</Label>
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
          <h3 className="font-semibold text-white">Fixed Annual Costs</h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm text-slate-300 mb-1.5 block">Insurance ({currencySymbol}/year)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{currencySymbol}</span>
              <Input
                type="text"
                inputMode="decimal"
                value={rawInputs.insurancePerYear !== undefined ? rawInputs.insurancePerYear : formatCurrency(values.insurancePerYear)}
                onChange={(e) => handleCurrencyInput('insurancePerYear', e.target.value)}
                onBlur={() => clearRawInput('insurancePerYear')}
                className="pl-7 bg-slate-900 border-slate-800 text-slate-200"
              />
            </div>
          </div>
          <div>
            <Label className="text-sm text-slate-300 mb-1.5 block">Hangar ({currencySymbol}/year)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{currencySymbol}</span>
              <Input
                type="text"
                inputMode="decimal"
                value={rawInputs.hangarPerYear !== undefined ? rawInputs.hangarPerYear : formatCurrency(values.hangarPerYear)}
                onChange={(e) => handleCurrencyInput('hangarPerYear', e.target.value)}
                onBlur={() => clearRawInput('hangarPerYear')}
                className="pl-7 bg-slate-900 border-slate-800 text-slate-200"
              />
            </div>
          </div>
          <div>
            <Label className="text-sm text-slate-300 mb-1.5 block">Crew ({currencySymbol}/year)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{currencySymbol}</span>
              <Input
                type="text"
                inputMode="decimal"
                value={rawInputs.crewPerYear !== undefined ? rawInputs.crewPerYear : formatCurrency(values.crewPerYear)}
                onChange={(e) => handleCurrencyInput('crewPerYear', e.target.value)}
                onBlur={() => clearRawInput('crewPerYear')}
                className="pl-7 bg-slate-900 border-slate-800 text-slate-200"
              />
            </div>
          </div>
          <div>
            <Label className="text-sm text-slate-300 mb-1.5 block">Management ({currencySymbol}/year)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{currencySymbol}</span>
              <Input
                type="text"
                inputMode="decimal"
                value={rawInputs.managementPerYear !== undefined ? rawInputs.managementPerYear : formatCurrency(values.managementPerYear)}
                onChange={(e) => handleCurrencyInput('managementPerYear', e.target.value)}
                onBlur={() => clearRawInput('managementPerYear')}
                className="pl-7 bg-slate-900 border-slate-800 text-slate-200"
              />
            </div>
          </div>
          <div>
            <Label className="text-sm text-slate-300 mb-1.5 block">Catering ({currencySymbol}/year)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{currencySymbol}</span>
              <Input
                type="text"
                inputMode="decimal"
                value={rawInputs.cateringPerYear !== undefined ? rawInputs.cateringPerYear : formatCurrency(values.cateringPerYear)}
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
              <Label className="text-xs text-slate-400 mb-1 block">Per Trip ({currencySymbol})</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{currencySymbol}</span>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={rawInputs.landingFeesPerTrip !== undefined ? rawInputs.landingFeesPerTrip : formatCurrency(values.landingFeesPerTrip)}
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
            Annual total: {currencySymbol}{formatCurrency(values.landingFeesPerTrip * values.tripsPerYear)}
          </p>
        </div>
      </div>
    </div>
  );
}
