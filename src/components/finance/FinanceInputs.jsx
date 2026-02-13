import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Percent, Fuel, Shield } from 'lucide-react';
import { useCurrency } from '@/hooks/use-currency';

export default function FinanceInputs({ values, onChange }) {
  const { currencySymbol } = useCurrency();
  const handleChange = (key, value) => {
    onChange({ ...values, [key]: value });
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const parseCurrency = (str) => {
    return parseFloat(str.replace(/[^0-9.-]+/g, '')) || 0;
  };

  return (
    <div className="space-y-6">
      {/* Purchase Price */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-slate-900">Purchase Details</h3>
        </div>
        
        <div>
          <Label className="text-sm text-slate-600 mb-1.5 block">Purchase Price (USD)</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{currencySymbol}</span>
            <Input
              type="text"
              value={formatCurrency(values.purchasePrice)}
              onChange={(e) => handleChange('purchasePrice', parseCurrency(e.target.value))}
              className="pl-7"
            />
          </div>
          <p className="text-xs text-slate-400 mt-1">All inputs in USD. Outputs converted via header currency switcher.</p>
        </div>
      </div>

      {/* Loan Terms */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Percent className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-slate-900">Loan Terms</h3>
        </div>
        
        <div className="space-y-5">
          <div>
            <div className="flex justify-between mb-1.5">
              <Label className="text-sm text-slate-600">Down Payment</Label>
              <span className="text-sm font-medium text-blue-600">{values.downPaymentPercent}%</span>
            </div>
            <Slider
              value={[values.downPaymentPercent]}
              onValueChange={([v]) => handleChange('downPaymentPercent', v)}
              min={10}
              max={50}
              step={5}
            />
            <div className="text-xs text-slate-500 mt-1">
              ${formatCurrency(values.purchasePrice * values.downPaymentPercent / 100)}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-slate-600 mb-1.5 block">Loan Term (Years)</Label>
              <Select value={values.loanTermYears.toString()} onValueChange={(v) => handleChange('loanTermYears', parseInt(v))}>
                <SelectTrigger>
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
              <Label className="text-sm text-slate-600 mb-1.5 block">Interest Rate (%)</Label>
              <Input
                type="number"
                step="0.1"
                value={values.interestRate}
                onChange={(e) => handleChange('interestRate', parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-slate-600 mb-1.5 block">Loan Type</Label>
              <Select value={values.loanType} onValueChange={(v) => handleChange('loanType', v)}>
                <SelectTrigger>
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
                <Label className="text-sm text-slate-600 mb-1.5 block">Residual Value (%)</Label>
                <Input
                  type="number"
                  step="5"
                  min="0"
                  max="50"
                  value={values.residualPercent}
                  onChange={(e) => handleChange('residualPercent', parseFloat(e.target.value) || 0)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Operating Costs */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Fuel className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-slate-900">Operating Costs</h3>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm text-slate-600 mb-1.5 block">Annual Flight Hours</Label>
            <Input
              type="number"
              value={values.annualHours}
              onChange={(e) => handleChange('annualHours', parseInt(e.target.value) || 0)}
            />
          </div>
          <div>
            <Label className="text-sm text-slate-600 mb-1.5 block">Fuel Cost ($/gal)</Label>
            <Input
              type="number"
              step="0.1"
              value={values.fuelCostPerGallon}
              onChange={(e) => handleChange('fuelCostPerGallon', parseFloat(e.target.value) || 0)}
            />
          </div>
          <div>
            <Label className="text-sm text-slate-600 mb-1.5 block">Fuel Burn (gal/hr)</Label>
            <Input
              type="number"
              value={values.fuelBurnGPH}
              onChange={(e) => handleChange('fuelBurnGPH', parseFloat(e.target.value) || 0)}
            />
          </div>
          <div>
            <Label className="text-sm text-slate-600 mb-1.5 block">Maintenance Reserve ($/hr)</Label>
            <Input
              type="number"
              value={values.maintenancePerHour}
              onChange={(e) => handleChange('maintenancePerHour', parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
      </div>

      {/* Fixed Annual Costs */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-slate-900">Fixed Annual Costs</h3>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm text-slate-600 mb-1.5 block">Insurance ($/year)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{currencySymbol}</span>
              <Input
                type="text"
                value={formatCurrency(values.insurancePerYear)}
                onChange={(e) => handleChange('insurancePerYear', parseCurrency(e.target.value))}
                className="pl-7"
              />
            </div>
          </div>
          <div>
            <Label className="text-sm text-slate-600 mb-1.5 block">Hangar ($/year)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{currencySymbol}</span>
              <Input
                type="text"
                value={formatCurrency(values.hangarPerYear)}
                onChange={(e) => handleChange('hangarPerYear', parseCurrency(e.target.value))}
                className="pl-7"
              />
            </div>
          </div>
          <div>
            <Label className="text-sm text-slate-600 mb-1.5 block">Crew ($/year)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{currencySymbol}</span>
              <Input
                type="text"
                value={formatCurrency(values.crewPerYear)}
                onChange={(e) => handleChange('crewPerYear', parseCurrency(e.target.value))}
                className="pl-7"
              />
            </div>
          </div>
          <div>
            <Label className="text-sm text-slate-600 mb-1.5 block">Management ($/year)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{currencySymbol}</span>
              <Input
                type="text"
                value={formatCurrency(values.managementPerYear)}
                onChange={(e) => handleChange('managementPerYear', parseCurrency(e.target.value))}
                className="pl-7"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}