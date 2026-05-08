import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Fuel, PiggyBank, BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useCurrency } from '@/hooks/use-currency';

export default function FinanceResults({ values, calculations }) {
  const { formatPrice: formatCurrency } = useCurrency();
  const {
    loanAmount,
    monthlyPayment,
    totalInterest,
    totalLoanCost,
    annualFuelCost,
    annualMaintenanceCost,
    landingFeesAnnual,
    totalAnnualCostUpdated,
    costPerHourUpdated,
    maxRangeOnFuel,
  } = calculations;

  const hasInput = values.purchasePrice > 0 || values.annualHours > 0 ||
    values.fuelBurnGPH > 0 || values.insurancePerYear > 0;

  const statCards = [
    { label: 'Monthly Payment', value: formatCurrency(monthlyPayment), bgColor: 'bg-blue-500/10' },
    { label: 'Total Interest', value: formatCurrency(totalInterest), bgColor: 'bg-purple-500/10' },
    { label: 'Annual Operating Cost', value: formatCurrency(totalAnnualCostUpdated), bgColor: 'bg-sky-500/10' },
    { label: 'Cost Per Hour', value: costPerHourUpdated > 0 ? formatCurrency(costPerHourUpdated) : '—', bgColor: 'bg-emerald-500/10' },
  ];

  if (!hasInput) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-sky-400/50" />
          </div>
          <p className="text-slate-400 text-lg font-medium">Select an aircraft or enter values</p>
          <p className="text-slate-500 text-sm mt-1">Results will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Cost Analysis — key metrics at top */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card className="p-3 text-center bg-white/5 backdrop-blur-sm border-white/10">
          <p className="text-sm text-slate-400 mb-1">Cost Per Flight Hour</p>
          <p className="text-xl font-bold text-white">
            {costPerHourUpdated > 0 ? formatCurrency(costPerHourUpdated) : '—'}
          </p>
          <Badge className="mt-2 bg-slate-700 text-slate-300">Variable + Fixed</Badge>
        </Card>
        <Card className="p-3 text-center bg-blue-500/10 border-blue-500/20">
          <p className="text-sm text-slate-400 mb-1">5-Year Total Cost</p>
          <p className="text-xl font-bold text-sky-400">{formatCurrency((totalAnnualCostUpdated + monthlyPayment * 12) * 5)}</p>
          <Badge className="mt-2 bg-blue-500/20 text-blue-300">Ownership</Badge>
        </Card>
        <Card className="p-3 text-center bg-emerald-500/10 border-emerald-500/20">
          <p className="text-sm text-slate-400 mb-1">Monthly Outflow</p>
          <p className="text-xl font-bold text-emerald-400">{formatCurrency((totalAnnualCostUpdated / 12) + monthlyPayment)}</p>
          <Badge className="mt-2 bg-emerald-500/20 text-emerald-300">Cash Flow</Badge>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className={`p-5 ${stat.bgColor} border-white/10`}>
              <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {values.tripDistanceNm > 0 && maxRangeOnFuel != null && (
        <div className={`rounded-xl p-4 border flex items-start gap-3 ${
          values.tripDistanceNm <= maxRangeOnFuel
            ? 'bg-emerald-500/10 border-emerald-500/30'
            : 'bg-red-500/10 border-red-500/30'
        }`}>
          <span className="text-lg">{values.tripDistanceNm <= maxRangeOnFuel ? '✓' : '⚠'}</span>
          <div>
            <div className={`text-sm font-medium ${values.tripDistanceNm <= maxRangeOnFuel ? 'text-emerald-400' : 'text-red-400'}`}>
              {values.tripDistanceNm <= maxRangeOnFuel
                ? `Single-tank trip viable — fuel range: ${maxRangeOnFuel.toLocaleString()} nm`
                : `Fuel stop required — max fuel range ${maxRangeOnFuel.toLocaleString()} nm < trip ${values.tripDistanceNm.toLocaleString()} nm`}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Based on {values.fuelCapacityGallons} gal capacity at {values.fuelBurnGPH} gal/hr, {values.cruiseSpeedKtas} kt
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Loan Summary */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
          <div className="px-5 py-4 bg-slate-900 border-b border-white/10">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-sky-400" />
              Loan Summary
            </h3>
          </div>
          <div className="p-5">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-300">Purchase Price</span>
                <span className="font-medium text-white">{formatCurrency(values.purchasePrice)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-300">Down Payment ({values.downPaymentPercent}%)</span>
                <span className="font-medium text-white">{formatCurrency(values.purchasePrice * values.downPaymentPercent / 100)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-300">Loan Amount</span>
                <span className="font-medium text-white">{formatCurrency(loanAmount)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-300">Interest Rate</span>
                <span className="font-medium text-white">{values.interestRate}%</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-300">Loan Term</span>
                <span className="font-medium text-white">{values.loanTermYears} years ({values.loanTermYears * 12} months)</span>
              </div>
              <div className="flex justify-between py-2 bg-sky-500/10 -mx-5 px-5 rounded-lg">
                <span className="font-semibold text-white">Total Loan Cost</span>
                <span className="font-bold text-sky-400">{formatCurrency(totalLoanCost)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Operating Costs Breakdown */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
          <div className="px-5 py-4 bg-slate-900 border-b border-white/10">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-sky-400" />
              Annual Operating Costs
            </h3>
          </div>
          <div className="p-5">
            <div className="space-y-3">
              <div className="flex flex-wrap justify-between py-2 border-b border-white/5 gap-x-2">
                <span className="text-xs sm:text-sm text-slate-300 flex items-center gap-2 min-w-0">
                  <Fuel className="w-4 h-4 flex-shrink-0" />
                  <span className="break-words">Fuel ({values.annualHours} hrs x {values.fuelBurnGPH} gal/hr x ${values.fuelCostPerGallon}/gal)</span>
                </span>
                <span className="font-medium text-white flex-shrink-0">{formatCurrency(annualFuelCost)}</span>
              </div>
              <div className="flex flex-wrap justify-between py-2 border-b border-white/5 gap-x-2">
                <span className="text-xs sm:text-sm text-slate-300 min-w-0 break-words">Maintenance Reserve ({values.annualHours} hrs x ${values.maintenancePerHour}/hr)</span>
                <span className="font-medium text-white flex-shrink-0">{formatCurrency(annualMaintenanceCost)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-300">Insurance</span>
                <span className="font-medium text-white">{formatCurrency(values.insurancePerYear)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-300">Hangar</span>
                <span className="font-medium text-white">{formatCurrency(values.hangarPerYear)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-300">Crew</span>
                <span className="font-medium text-white">{formatCurrency(values.crewPerYear)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-300">Management</span>
                <span className="font-medium text-white">{formatCurrency(values.managementPerYear)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-300">Catering</span>
                <span className="font-medium text-white">{formatCurrency(values.cateringPerYear)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-300">Landing Fees</span>
                <span className="font-medium text-white">{formatCurrency(landingFeesAnnual)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-300">Annual Loan Payments</span>
                <span className="font-medium text-white">{formatCurrency(monthlyPayment * 12)}</span>
              </div>
              <div className="flex justify-between py-2 bg-sky-500/20 text-white -mx-5 px-5 rounded-lg">
                <span className="font-semibold">Total Annual Cost</span>
                <span className="font-bold">{formatCurrency(totalAnnualCostUpdated + monthlyPayment * 12)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
