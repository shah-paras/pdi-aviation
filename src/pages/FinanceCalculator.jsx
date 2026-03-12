import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calculator, Download, RefreshCw, FileText, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import FinanceInputs from '@/components/finance/FinanceInputs';
import FinanceResults from '@/components/finance/FinanceResults';
import AmortizationTable from '@/components/finance/AmortizationTable';

const defaultValues = {
  purchasePrice: 5000000,
  downPaymentPercent: 20,
  loanTermYears: 10,
  interestRate: 6.5,
  loanType: 'amortizing',
  residualPercent: 15,
  annualHours: 300,
  fuelCostPerGallon: 6.50,
  fuelBurnGPH: 200,
  maintenancePerHour: 500,
  insurancePerYear: 50000,
  hangarPerYear: 48000,
  crewPerYear: 200000,
  managementPerYear: 36000
};

export default function FinanceCalculator() {
  const [values, setValues] = useState(defaultValues);
  const [activeTab, setActiveTab] = useState('summary');

  // Calculate loan and operating costs
  const calculations = useMemo(() => {
    const downPayment = values.purchasePrice * (values.downPaymentPercent / 100);
    const loanAmount = values.purchasePrice - downPayment;
    const monthlyRate = (values.interestRate / 100) / 12;
    const numPayments = values.loanTermYears * 12;

    let monthlyPayment;
    let residualValue = 0;

    if (values.loanType === 'balloon') {
      residualValue = values.purchasePrice * (values.residualPercent / 100);
      // Balloon payment formula
      const pv = loanAmount - residualValue / Math.pow(1 + monthlyRate, numPayments);
      monthlyPayment = pv * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else {
      // Standard amortization
      monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    }

    const totalLoanPayments = monthlyPayment * numPayments + residualValue;
    const totalInterest = totalLoanPayments - loanAmount;

    // Operating costs
    const annualFuelCost = values.annualHours * values.fuelBurnGPH * values.fuelCostPerGallon;
    const annualMaintenanceCost = values.annualHours * values.maintenancePerHour;
    const annualFixedCosts = values.insurancePerYear + values.hangarPerYear + values.crewPerYear + values.managementPerYear;
    const totalAnnualCost = annualFuelCost + annualMaintenanceCost + annualFixedCosts;
    const costPerHour = totalAnnualCost / values.annualHours;

    // Amortization schedule
    let balance = loanAmount;
    const schedule = [];
    for (let month = 1; month <= numPayments; month++) {
      const interest = balance * monthlyRate;
      const principal = monthlyPayment - interest;
      balance = Math.max(0, balance - principal);
      schedule.push({
        month,
        payment: monthlyPayment,
        principal,
        interest,
        balance
      });
    }

    return {
      downPayment,
      loanAmount,
      monthlyPayment,
      totalInterest,
      totalLoanCost: totalLoanPayments,
      annualFuelCost,
      annualMaintenanceCost,
      annualFixedCosts,
      totalAnnualCost,
      costPerHour,
      schedule,
      residualValue
    };
  }, [values]);

  const handleReset = () => {
    setValues(defaultValues);
  };

  const handleExportCSV = () => {
    const headers = ['Month', 'Payment', 'Principal', 'Interest', 'Balance'];
    const rows = calculations.schedule.map(row => [
      row.month,
      row.payment.toFixed(2),
      row.principal.toFixed(2),
      row.interest.toFixed(2),
      row.balance.toFixed(2)
    ]);

    const csvContent = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'amortization-schedule.csv';
    a.click();
  };

  const handleExportPDF = () => {
    // In production, would use a PDF library
    alert('PDF export requires additional setup. In production, this would generate a detailed PDF report.');
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sky-400 text-sm mb-3">
            <Calculator className="w-4 h-4" />
            <span>Finance Tools</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">Aircraft Finance Calculator</h1>
          <p className="text-slate-300 max-w-2xl">
            Calculate acquisition costs, monthly payments, and total cost of ownership for your aircraft purchase.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel - Inputs */}
          <div className="lg:w-[420px] flex-shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Parameters</h2>
                <Button variant="ghost" size="sm" onClick={handleReset} className="text-slate-400 hover:text-slate-300">
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Reset
                </Button>
              </div>
              <FinanceInputs values={values} onChange={setValues} />
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex items-center justify-between mb-6">
                  <TabsList className="bg-slate-800 border border-slate-700">
                    <TabsTrigger value="summary" className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white">
                      <BarChart3 className="w-4 h-4" />
                      Summary
                    </TabsTrigger>
                    <TabsTrigger value="schedule" className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white">
                      <FileText className="w-4 h-4" />
                      Schedule
                    </TabsTrigger>
                  </TabsList>

                  <Button
                    onClick={handleExportPDF}
                    className="bg-sky-600 hover:bg-sky-700 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                </div>

                <TabsContent value="summary" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <FinanceResults values={values} calculations={calculations} />
                  </motion.div>
                </TabsContent>

                <TabsContent value="schedule" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AmortizationTable
                      schedule={calculations.schedule}
                      onExport={handleExportCSV}
                    />
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
