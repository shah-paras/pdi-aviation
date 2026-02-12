import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, TrendingUp, Clock, Fuel, 
  PiggyBank, BarChart3, Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';

const formatCurrency = (num) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
};

export default function FinanceResults({ values, calculations }) {
  const {
    loanAmount,
    monthlyPayment,
    totalInterest,
    totalLoanCost,
    annualFuelCost,
    annualMaintenanceCost,
    annualFixedCosts,
    totalAnnualCost,
    costPerHour
  } = calculations;

  const statCards = [
    {
      label: 'Monthly Payment',
      value: formatCurrency(monthlyPayment),
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Total Interest',
      value: formatCurrency(totalInterest),
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      label: 'Annual Operating Cost',
      value: formatCurrency(totalAnnualCost),
      icon: DollarSign,
      color: 'from-sky-500 to-sky-600',
      bgColor: 'bg-sky-50'
    },
    {
      label: 'Cost Per Hour',
      value: formatCurrency(costPerHour),
      icon: Clock,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className={`p-5 ${stat.bgColor} border-0`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Loan Summary */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900 flex items-center gap-2">
            <PiggyBank className="w-5 h-5 text-blue-600" />
            Loan Summary
          </h3>
        </div>
        <div className="p-5">
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Purchase Price</span>
              <span className="font-medium text-slate-900">{formatCurrency(values.purchasePrice)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Down Payment ({values.downPaymentPercent}%)</span>
              <span className="font-medium text-slate-900">{formatCurrency(values.purchasePrice * values.downPaymentPercent / 100)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Loan Amount</span>
              <span className="font-medium text-slate-900">{formatCurrency(loanAmount)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Interest Rate</span>
              <span className="font-medium text-slate-900">{values.interestRate}%</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Loan Term</span>
              <span className="font-medium text-slate-900">{values.loanTermYears} years ({values.loanTermYears * 12} months)</span>
            </div>
            <div className="flex justify-between py-2 bg-blue-50 -mx-5 px-5 rounded-lg">
              <span className="font-semibold text-slate-900">Total Loan Cost</span>
              <span className="font-bold text-blue-600">{formatCurrency(totalLoanCost)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Operating Costs Breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Annual Operating Costs
          </h3>
        </div>
        <div className="p-5">
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600 flex items-center gap-2">
                <Fuel className="w-4 h-4" />
                Fuel ({values.annualHours} hrs × {values.fuelBurnGPH} gal/hr × ${values.fuelCostPerGallon}/gal)
              </span>
              <span className="font-medium text-slate-900">{formatCurrency(annualFuelCost)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Maintenance Reserve ({values.annualHours} hrs × ${values.maintenancePerHour}/hr)</span>
              <span className="font-medium text-slate-900">{formatCurrency(annualMaintenanceCost)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Insurance</span>
              <span className="font-medium text-slate-900">{formatCurrency(values.insurancePerYear)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Hangar</span>
              <span className="font-medium text-slate-900">{formatCurrency(values.hangarPerYear)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Crew</span>
              <span className="font-medium text-slate-900">{formatCurrency(values.crewPerYear)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Management</span>
              <span className="font-medium text-slate-900">{formatCurrency(values.managementPerYear)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Annual Loan Payments</span>
              <span className="font-medium text-slate-900">{formatCurrency(monthlyPayment * 12)}</span>
            </div>
            <div className="flex justify-between py-2 bg-slate-900 text-white -mx-5 px-5 rounded-lg">
              <span className="font-semibold">Total Annual Cost</span>
              <span className="font-bold">{formatCurrency(totalAnnualCost + monthlyPayment * 12)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Analysis */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-4 text-center bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
          <p className="text-sm text-slate-600 mb-1">Cost Per Flight Hour</p>
          <p className="text-xl font-bold text-slate-900">{formatCurrency(costPerHour)}</p>
          <Badge className="mt-2 bg-slate-200 text-slate-700">Variable + Fixed</Badge>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <p className="text-sm text-slate-600 mb-1">5-Year Total Cost</p>
          <p className="text-xl font-bold text-blue-700">{formatCurrency((totalAnnualCost + monthlyPayment * 12) * 5)}</p>
          <Badge className="mt-2 bg-blue-200 text-blue-800">Ownership</Badge>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <p className="text-sm text-slate-600 mb-1">Monthly Outflow</p>
          <p className="text-xl font-bold text-emerald-700">{formatCurrency((totalAnnualCost / 12) + monthlyPayment)}</p>
          <Badge className="mt-2 bg-emerald-200 text-emerald-800">Cash Flow</Badge>
        </Card>
      </div>
    </div>
  );
}