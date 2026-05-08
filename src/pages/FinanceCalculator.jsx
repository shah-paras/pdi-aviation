import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calculator, Download, RefreshCw, FileText, BarChart3, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import FinanceInputs from '@/components/finance/FinanceInputs';
import FinanceResults from '@/components/finance/FinanceResults';
import AmortizationTable from '@/components/finance/AmortizationTable';
import CurrencySwitcher from '@/components/CurrencySwitcher';
import { useCurrency } from '@/hooks/use-currency';
import FeatureGate from '@/components/auth/FeatureGate';
import { useTierLimits } from '@/hooks/useTierLimits';
import { FUEL_COST_PER_GALLON_USD, DEFAULT_ANNUAL_HOURS } from '@/data/aircraftFinanceData';

const defaultValues = {
  purchasePrice: 0,
  downPaymentPercent: 20,
  loanTermYears: 10,
  interestRate: 6.5,
  loanType: 'amortizing',
  residualPercent: 15,
  annualHours: 0,
  fuelCostPerGallon: FUEL_COST_PER_GALLON_USD,
  fuelBurnGPH: 0,
  maintenancePerHour: 0,
  insurancePerYear: 0,
  hangarPerYear: 0,
  crewPerYear: 0,
  managementPerYear: 0,
  tripDistanceNm: 0,
  fuelCapacityGallons: 0,
  landingFeesPerTrip: 0,
  tripsPerYear: 0,
  cateringPerYear: 0,
  cruiseSpeedKtas: 0,
};

export default function FinanceCalculator() {
  const [values, setValues] = useState(defaultValues);
  const [selectedAircraft, setSelectedAircraft] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');
  const [inputMode, setInputMode] = useState('aircraft');
  const [pdfLoading, setPdfLoading] = useState(false);
  const { formatNumber, currencySymbol, selectedCurrency, convertAmount } = useCurrency();
  const { limits } = useTierLimits();

  const handleAircraftSelect = (aircraft) => {
    setSelectedAircraft(aircraft);
    if (!aircraft) return;
    setValues(prev => ({
      ...prev,
      purchasePrice: aircraft.newPriceUSD || prev.purchasePrice,
      fuelBurnGPH: aircraft.fuelBurnGPH,
      maintenancePerHour: aircraft.maintenancePerHour,
      insurancePerYear: aircraft.insurancePerYear,
      hangarPerYear: aircraft.hangarPerYear,
      crewPerYear: aircraft.crewPerYear,
      managementPerYear: aircraft.managementPerYear,
      cruiseSpeedKtas: aircraft.speedKtas,
      annualHours: prev.annualHours || DEFAULT_ANNUAL_HOURS,
      fuelCostPerGallon: prev.fuelCostPerGallon || FUEL_COST_PER_GALLON_USD,
    }));
  };

  const calculations = useMemo(() => {
    const purchasePrice = values.purchasePrice || 0;
    const downPayment = purchasePrice * (values.downPaymentPercent / 100);
    const loanAmount = purchasePrice - downPayment;
    const monthlyRate = (values.interestRate / 100) / 12;
    const numPayments = values.loanTermYears * 12;

    let monthlyPayment = 0;
    let residualValue = 0;

    if (loanAmount > 0 && monthlyRate > 0 && numPayments > 0) {
      if (values.loanType === 'balloon') {
        residualValue = purchasePrice * (values.residualPercent / 100);
        const pv = loanAmount - residualValue / Math.pow(1 + monthlyRate, numPayments);
        monthlyPayment = pv * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
      } else {
        monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
      }
    }

    if (!isFinite(monthlyPayment)) monthlyPayment = 0;

    const totalLoanPayments = monthlyPayment * numPayments + residualValue;
    const totalInterest = Math.max(0, totalLoanPayments - loanAmount);

    const annualHours = values.annualHours || 0;
    const annualFuelCost = annualHours * values.fuelBurnGPH * values.fuelCostPerGallon;
    const annualMaintenanceCost = annualHours * values.maintenancePerHour;
    const annualFixedCosts = values.insurancePerYear + values.hangarPerYear + values.crewPerYear + values.managementPerYear;
    const totalAnnualCost = annualFuelCost + annualMaintenanceCost + annualFixedCosts;
    const costPerHour = annualHours > 0 ? totalAnnualCost / annualHours : 0;

    const landingFeesAnnual = values.landingFeesPerTrip * values.tripsPerYear;
    const totalAnnualCostUpdated = annualFuelCost + annualMaintenanceCost + annualFixedCosts + landingFeesAnnual + values.cateringPerYear;
    const maxRangeOnFuel = values.fuelCapacityGallons > 0 && values.fuelBurnGPH > 0
      ? Math.round((values.fuelCapacityGallons / values.fuelBurnGPH) * values.cruiseSpeedKtas)
      : null;
    const costPerHourUpdated = annualHours > 0 ? totalAnnualCostUpdated / annualHours : 0;

    let balance = loanAmount;
    const schedule = [];
    if (monthlyPayment > 0) {
      for (let month = 1; month <= numPayments; month++) {
        const interest = balance * monthlyRate;
        const principal = monthlyPayment - interest;
        balance = Math.max(0, balance - principal);
        schedule.push({ month, payment: monthlyPayment, principal, interest, balance });
      }
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
      residualValue,
      landingFeesAnnual,
      maxRangeOnFuel,
      totalAnnualCostUpdated,
      costPerHourUpdated,
    };
  }, [values]);

  const handleReset = () => {
    setValues(defaultValues);
    setSelectedAircraft(null);
  };

  const handleExportCSV = () => {
    const headers = ['Month', `Payment (${selectedCurrency})`, `Principal (${selectedCurrency})`, `Interest (${selectedCurrency})`, `Balance (${selectedCurrency})`];
    const rows = calculations.schedule.map(row => [
      row.month,
      convertAmount(row.payment).toFixed(2),
      convertAmount(row.principal).toFixed(2),
      convertAmount(row.interest).toFixed(2),
      convertAmount(row.balance).toFixed(2)
    ]);

    const csvContent = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'amortization-schedule.csv';
    a.click();
  };

  const handleExportPDF = async () => {
    setPdfLoading(true);
    try {
      const { jsPDF } = await import('jspdf');
      const { default: autoTable } = await import('jspdf-autotable');

      const doc = new jsPDF();

      // Title
      doc.setFontSize(18);
      doc.setTextColor(14, 165, 233); // sky-500
      doc.text('PDI Aviation \u2014 Aircraft Finance Report', 14, 20);
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Generated ${new Date().toLocaleDateString()}`, 14, 27);

      // Loan Summary
      autoTable(doc, {
        startY: 35,
        head: [['Loan Summary', `Amount (${selectedCurrency})`]],
        body: [
          ['Purchase Price', formatNumber(values.purchasePrice, { maximumFractionDigits: 2 })],
          ['Down Payment', formatNumber(calculations.downPayment, { maximumFractionDigits: 2 })],
          ['Loan Amount', formatNumber(calculations.loanAmount, { maximumFractionDigits: 2 })],
          ['Monthly Payment', formatNumber(calculations.monthlyPayment, { maximumFractionDigits: 2 })],
          ['Total Interest', formatNumber(calculations.totalInterest, { maximumFractionDigits: 2 })],
          ['Total Loan Cost', formatNumber(calculations.totalLoanCost, { maximumFractionDigits: 2 })],
          ...(values.loanType === 'balloon' ? [['Residual Value', formatNumber(calculations.residualValue, { maximumFractionDigits: 2 })]] : []),
        ],
        headStyles: { fillColor: [14, 165, 233], textColor: 255 },
        alternateRowStyles: { fillColor: [245, 245, 245] },
      });

      // Operating Cost Summary
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: [['Operating Costs (Annual)', `Amount (${selectedCurrency})`]],
        body: [
          ['Fuel Cost', formatNumber(calculations.annualFuelCost, { maximumFractionDigits: 2 })],
          ['Maintenance', formatNumber(calculations.annualMaintenanceCost, { maximumFractionDigits: 2 })],
          ['Insurance', formatNumber(values.insurancePerYear, { maximumFractionDigits: 2 })],
          ['Hangar', formatNumber(values.hangarPerYear, { maximumFractionDigits: 2 })],
          ['Crew', formatNumber(values.crewPerYear, { maximumFractionDigits: 2 })],
          ['Management', formatNumber(values.managementPerYear, { maximumFractionDigits: 2 })],
          ['Total Annual Cost', formatNumber(calculations.totalAnnualCost, { maximumFractionDigits: 2 })],
          ['Cost Per Flight Hour', formatNumber(calculations.costPerHour, { maximumFractionDigits: 2 })],
        ],
        headStyles: { fillColor: [14, 165, 233], textColor: 255 },
        alternateRowStyles: { fillColor: [245, 245, 245] },
      });

      // Amortization Schedule
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: [['Month', `Payment (${selectedCurrency})`, `Principal (${selectedCurrency})`, `Interest (${selectedCurrency})`, `Balance (${selectedCurrency})`]],
        body: calculations.schedule.map(row => [
          row.month,
          formatNumber(row.payment, { maximumFractionDigits: 2 }),
          formatNumber(row.principal, { maximumFractionDigits: 2 }),
          formatNumber(row.interest, { maximumFractionDigits: 2 }),
          formatNumber(row.balance, { maximumFractionDigits: 2 }),
        ]),
        headStyles: { fillColor: [14, 165, 233], textColor: 255 },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        styles: { fontSize: 8 },
      });

      doc.save('pdi-aviation-finance-report.pdf');
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <div className="h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-4rem)] bg-slate-950 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-950 border-b border-slate-800 text-white py-3 flex-shrink-0">
          <div className="px-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center">
                  <Calculator className="w-4 h-4 text-sky-400" />
                </div>
                <h1 className="text-lg font-semibold leading-tight">Finance Calculator</h1>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleExportPDF}
                  disabled={pdfLoading}
                  size="sm"
                  className="bg-sky-600 hover:bg-sky-700 text-white"
                >
                  {pdfLoading ? (
                    <Loader2 className="w-4 h-4 sm:mr-2 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4 sm:mr-2" />
                  )}
                  <span className="hidden sm:inline">Export PDF</span>
                </Button>
                <TabsList className="bg-slate-800 border border-slate-700 hidden sm:flex">
                  <TabsTrigger value="summary" className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white text-xs">
                    <BarChart3 className="w-3.5 h-3.5" />
                    Summary
                  </TabsTrigger>
                  <TabsTrigger value="schedule" className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white text-xs">
                    <FileText className="w-3.5 h-3.5" />
                    Schedule
                  </TabsTrigger>
                </TabsList>
                <CurrencySwitcher />
              </div>
            </div>
            {/* Mobile-only tabs row */}
            <TabsList className="w-full bg-slate-800 border border-slate-700 mt-3 sm:hidden">
              <TabsTrigger value="summary" className="flex-1 flex items-center justify-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white text-xs">
                <BarChart3 className="w-3.5 h-3.5" />
                Summary
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex-1 flex items-center justify-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white text-xs">
                <FileText className="w-3.5 h-3.5" />
                Schedule
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="px-6 py-4 flex-1 min-h-0 overflow-auto lg:overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-full">
            {/* Left Panel - Inputs */}
            <div className="lg:w-[300px] flex-shrink-0 min-h-0 flex flex-col">
              <FeatureGate requiredTier="enthusiast" feature="Edit calculator inputs" mode="blur" className="h-full overflow-hidden flex flex-col">
                {/* Sticky header — does not scroll */}
                <div className="flex-shrink-0 pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold text-white">Parameters</h2>
                    <Button variant="ghost" size="sm" onClick={handleReset} className="text-slate-400 hover:text-slate-300">
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Reset
                    </Button>
                  </div>
                  <Tabs value={inputMode} onValueChange={(mode) => {
                    setInputMode(mode);
                    if (mode === 'manual') {
                      setSelectedAircraft(null);
                    }
                  }}>
                    <TabsList className="w-full bg-slate-800 border border-slate-700">
                      <TabsTrigger value="aircraft" className="flex-1 text-xs data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400">
                        By Aircraft
                      </TabsTrigger>
                      <TabsTrigger value="manual" className="flex-1 text-xs data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400">
                        Manual
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                {/* Scrollable inputs */}
                <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin">
                  <FinanceInputs
                    values={values}
                    onChange={setValues}
                    selectedAircraft={selectedAircraft}
                    onAircraftSelect={handleAircraftSelect}
                    inputMode={inputMode}
                  />
                </div>
              </FeatureGate>
            </div>

            {/* Right Panel - Results */}
            <div className="flex-1 min-w-0 overflow-y-auto min-h-0 scrollbar-thin">
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
            </div>
          </div>
        </div>
      </div>
    </Tabs>
  );
}
