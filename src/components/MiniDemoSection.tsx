import React, { useState } from 'react';
import { 
  Calculator, RotateCcw, AlertTriangle, CheckCircle2, Scale, Info
} from 'lucide-react';
import type { BudgetAllocation, ChallengeOptionId } from '../types';


const INITIAL_BUDGET = 100000;

const DEFAULT_ALLOCATION: BudgetAllocation = {
  productDevelopment: 25000,
  marketing: 25000,
  operations: 35000,
  emergencyReserve: 15000,
};

export const MiniDemoSection: React.FC = () => {
  const [allocation, setAllocation] = useState<BudgetAllocation>(DEFAULT_ALLOCATION);
  const [selectedDecision, setSelectedDecision] = useState<ChallengeOptionId | null>(null);

  const totalAllocated =
    allocation.productDevelopment +
    allocation.marketing +
    allocation.operations +
    allocation.emergencyReserve;

  const remainingBudget = INITIAL_BUDGET - totalAllocated;

  const handleSliderChange = (field: keyof BudgetAllocation, requestedValue: number) => {
    // Current value for this field
    const currentVal = allocation[field];
    // Remaining available outside this field
    const otherAllocations = totalAllocated - currentVal;
    const maxPermitted = INITIAL_BUDGET - otherAllocations;

    // Prevent spending beyond the available budget
    const clampedValue = Math.max(0, Math.min(requestedValue, maxPermitted));

    setAllocation(prev => ({
      ...prev,
      [field]: clampedValue,
    }));
  };

  const resetSimulation = () => {
    setAllocation(DEFAULT_ALLOCATION);
    setSelectedDecision(null);
  };

  const formatRupees = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getPercentage = (amount: number) => {
    return ((amount / INITIAL_BUDGET) * 100).toFixed(0);
  };

  return (
    <section id="mini-demo" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background radial accent */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-900/10 blur-3xl pointer-events-none -z-10 rounded-full" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-4">
          <Calculator className="w-3.5 h-3.5" />
          Interactive Prototype Demonstration
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-3">
          EXPERIENCE A SAMPLE BUSINESS DECISION
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Try a simplified example of the decisions students could make inside the entrepreneurship simulation.
        </p>
        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs">
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          <span>Illustrative simulation values for school demonstration • Runs locally in your browser</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Financial Budgeting Dashboard */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                Scenario: Campus Meal-Subscription Venture
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Initial Working Capital Allocation
              </h3>
            </div>
            <button
              onClick={resetSimulation}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 border border-slate-700/80 transition-colors"
              title="Reset allocations to default"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              Reset
            </button>
          </div>

          {/* Budget Overview KPI Banner */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80">
            <div>
              <span className="text-[11px] text-slate-400 block mb-0.5">Total Seed Capital</span>
              <span className="text-sm sm:text-lg font-bold font-mono text-white">
                {formatRupees(INITIAL_BUDGET)}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block mb-0.5">Total Allocated</span>
              <span className="text-sm sm:text-lg font-bold font-mono text-cyan-400">
                {formatRupees(totalAllocated)}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block mb-0.5">Remaining Reserve</span>
              <span
                className={`text-sm sm:text-lg font-bold font-mono ${
                  remainingBudget === 0
                    ? 'text-emerald-400'
                    : remainingBudget > 0
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}
              >
                {formatRupees(remainingBudget)}
              </span>
            </div>
          </div>

          {/* Visual Segmented Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Capital Distribution Breakdown</span>
              <span className="font-mono">{getPercentage(totalAllocated)}% utilized</span>
            </div>
            <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden flex p-0.5 gap-0.5 border border-slate-800">
              <div
                style={{ width: `${(allocation.productDevelopment / INITIAL_BUDGET) * 100}%` }}
                className="bg-indigo-500 rounded-l-full transition-all duration-300"
                title={`Product: ${formatRupees(allocation.productDevelopment)}`}
              />
              <div
                style={{ width: `${(allocation.marketing / INITIAL_BUDGET) * 100}%` }}
                className="bg-cyan-500 transition-all duration-300"
                title={`Marketing: ${formatRupees(allocation.marketing)}`}
              />
              <div
                style={{ width: `${(allocation.operations / INITIAL_BUDGET) * 100}%` }}
                className="bg-emerald-500 transition-all duration-300"
                title={`Operations: ${formatRupees(allocation.operations)}`}
              />
              <div
                style={{ width: `${(allocation.emergencyReserve / INITIAL_BUDGET) * 100}%` }}
                className="bg-amber-500 rounded-r-full transition-all duration-300"
                title={`Emergency: ${formatRupees(allocation.emergencyReserve)}`}
              />
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="space-y-4">
            {/* Slider 1: Product Development */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-indigo-500" />
                  <label htmlFor="productDevSlider" className="text-sm font-semibold text-slate-200">
                    Product Development
                  </label>
                </div>
                <span className="text-sm font-mono font-bold text-indigo-400">
                  {formatRupees(allocation.productDevelopment)} ({getPercentage(allocation.productDevelopment)}%)
                </span>
              </div>
              <input
                id="productDevSlider"
                type="range"
                min="0"
                max={INITIAL_BUDGET}
                step="2500"
                value={allocation.productDevelopment}
                onChange={(e) => handleSliderChange('productDevelopment', Number(e.target.value))}
                className="w-full h-2 bg-slate-800 accent-indigo-500 rounded-lg cursor-pointer"
                aria-label="Allocate Product Development Budget"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Ordering website, automated WhatsApp bot, kitchen recipe specs</span>
                <span>Max: {formatRupees(INITIAL_BUDGET - (totalAllocated - allocation.productDevelopment))}</span>
              </div>
            </div>

            {/* Slider 2: Marketing */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-cyan-500" />
                  <label htmlFor="marketingSlider" className="text-sm font-semibold text-slate-200">
                    Marketing & Acquisition
                  </label>
                </div>
                <span className="text-sm font-mono font-bold text-cyan-400">
                  {formatRupees(allocation.marketing)} ({getPercentage(allocation.marketing)}%)
                </span>
              </div>
              <input
                id="marketingSlider"
                type="range"
                min="0"
                max={INITIAL_BUDGET}
                step="2500"
                value={allocation.marketing}
                onChange={(e) => handleSliderChange('marketing', Number(e.target.value))}
                className="w-full h-2 bg-slate-800 accent-cyan-500 rounded-lg cursor-pointer"
                aria-label="Allocate Marketing Budget"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Campus ambassador blitz, cafeteria banners, introductory vouchers</span>
                <span>Max: {formatRupees(INITIAL_BUDGET - (totalAllocated - allocation.marketing))}</span>
              </div>
            </div>

            {/* Slider 3: Operations */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <label htmlFor="operationsSlider" className="text-sm font-semibold text-slate-200">
                    Operations & Fulfilment
                  </label>
                </div>
                <span className="text-sm font-mono font-bold text-emerald-400">
                  {formatRupees(allocation.operations)} ({getPercentage(allocation.operations)}%)
                </span>
              </div>
              <input
                id="operationsSlider"
                type="range"
                min="0"
                max={INITIAL_BUDGET}
                step="2500"
                value={allocation.operations}
                onChange={(e) => handleSliderChange('operations', Number(e.target.value))}
                className="w-full h-2 bg-slate-800 accent-emerald-500 rounded-lg cursor-pointer"
                aria-label="Allocate Operations Budget"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Insulated bento boxes, student delivery stipend, kitchen pre-orders</span>
                <span>Max: {formatRupees(INITIAL_BUDGET - (totalAllocated - allocation.operations))}</span>
              </div>
            </div>

            {/* Slider 4: Emergency Reserve */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <label htmlFor="emergencyReserveSlider" className="text-sm font-semibold text-slate-200">
                    Emergency Contingency Reserve
                  </label>
                </div>
                <span className="text-sm font-mono font-bold text-amber-400">
                  {formatRupees(allocation.emergencyReserve)} ({getPercentage(allocation.emergencyReserve)}%)
                </span>
              </div>
              <input
                id="emergencyReserveSlider"
                type="range"
                min="0"
                max={INITIAL_BUDGET}
                step="2500"
                value={allocation.emergencyReserve}
                onChange={(e) => handleSliderChange('emergencyReserve', Number(e.target.value))}
                className="w-full h-2 bg-slate-800 accent-amber-500 rounded-lg cursor-pointer"
                aria-label="Allocate Emergency Reserve Budget"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Buffer for spoiled batches, supplier price spikes, and refund requests</span>
                <span>Max: {formatRupees(INITIAL_BUDGET - (totalAllocated - allocation.emergencyReserve))}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: The Consequence Challenge */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/60 text-xs font-semibold uppercase tracking-wider text-amber-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                Live Business Incident
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                The Unexpected Demand Surge
              </h3>
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/40 text-xs sm:text-sm text-slate-200 leading-relaxed">
                &ldquo;Your marketing campaign has attracted more customers than expected, but your operations budget is limited. What would you do?&rdquo;
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                Choose Student Strategic Response:
              </span>

              {/* Option A */}
              <button
                onClick={() => setSelectedDecision('A')}
                className={`w-full p-4 rounded-2xl text-left transition-all border ${
                  selectedDecision === 'A'
                    ? 'bg-cyan-950/50 border-cyan-500 shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-500'
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-cyan-400 block">OPTION A</span>
                    <h4 className="text-sm font-bold text-white">Increase operational capacity.</h4>
                    <p className="text-xs text-slate-400">
                      Hire auxiliary delivery helpers and purchase extra thermal containers immediately.
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      selectedDecision === 'A'
                        ? 'border-cyan-400 bg-cyan-400 text-slate-950'
                        : 'border-slate-700'
                    }`}
                  >
                    {selectedDecision === 'A' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </button>

              {/* Option B */}
              <button
                onClick={() => setSelectedDecision('B')}
                className={`w-full p-4 rounded-2xl text-left transition-all border ${
                  selectedDecision === 'B'
                    ? 'bg-violet-950/50 border-violet-500 shadow-lg shadow-violet-950/50 ring-1 ring-violet-500'
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-violet-400 block">OPTION B</span>
                    <h4 className="text-sm font-bold text-white">
                      Reduce marketing expenditure and grow more slowly.
                    </h4>
                    <p className="text-xs text-slate-400">
                      Pause campus promotional booths and throttle daily sign-ups to match current kitchen output.
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      selectedDecision === 'B'
                        ? 'border-violet-400 bg-violet-400 text-slate-950'
                        : 'border-slate-700'
                    }`}
                  >
                    {selectedDecision === 'B' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </button>

              {/* Option C */}
              <button
                onClick={() => setSelectedDecision('C')}
                className={`w-full p-4 rounded-2xl text-left transition-all border ${
                  selectedDecision === 'C'
                    ? 'bg-rose-950/50 border-rose-500 shadow-lg shadow-rose-950/50 ring-1 ring-rose-500'
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-rose-400 block">OPTION C</span>
                    <h4 className="text-sm font-bold text-white">
                      Accept more orders without changing capacity.
                    </h4>
                    <p className="text-xs text-slate-400">
                      Stretch kitchen staff and current couriers to capture immediate maximum revenue.
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      selectedDecision === 'C'
                        ? 'border-rose-400 bg-rose-400 text-slate-950'
                        : 'border-slate-700'
                    }`}
                  >
                    {selectedDecision === 'C' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </button>
            </div>

            {/* Educational Trade-off Analysis */}
            {selectedDecision ? (
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-cyan-400" />
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Pedagogical Trade-off Analysis (Option {selectedDecision})
                  </h5>
                </div>

                {selectedDecision === 'A' && (
                  <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                    <p>
                      <strong>Strategic Impact:</strong> Increasing operational capacity protects order fulfilment and preserves student trust.
                    </p>
                    <p className="text-amber-300">
                      <strong>Financial Constraint:</strong> However, it consumes additional cash upfront. With your current Emergency Reserve of{' '}
                      <span className="font-mono font-bold text-white">{formatRupees(allocation.emergencyReserve)}</span>,
                      you must ensure you do not exhaust liquidity before recurring subscription renewals clear.
                    </p>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-cyan-300">
                      💡 <strong>Concept Practiced:</strong> Working capital elasticity and scaling before positive unit economics.
                    </div>
                  </div>
                )}

                {selectedDecision === 'B' && (
                  <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                    <p>
                      <strong>Strategic Impact:</strong> Slowing marketing reduces incoming demand, giving your kitchen partners breathing room to refine packaging and maintain punctual delivery.
                    </p>
                    <p className="text-violet-300">
                      <strong>Financial Constraint:</strong> While this protects quality and conserves cash, it allows rival food stalls to capture unserved student traffic during crucial early weeks.
                    </p>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-cyan-300">
                      💡 <strong>Concept Practiced:</strong> Deliberate paced growth vs. land-grab market dynamics.
                    </div>
                  </div>
                )}

                {selectedDecision === 'C' && (
                  <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                    <p>
                      <strong>Strategic Impact:</strong> Accepting orders without added capacity maximizes short-term cash collections and revenue numbers.
                    </p>
                    <p className="text-rose-300">
                      <strong>Reputational Risk:</strong> Without expanded logistics, meals arrive 20–30 minutes late to dorms. Dissatisfied students post negative campus reviews, creating long-term churn that damages future renewals.
                    </p>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-rose-300">
                      ⚠️ <strong>Concept Practiced:</strong> Operational bottleneck risks and the true cost of customer dissatisfaction.
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 italic">
                  * In the full simulation, no choice is labelled as universally &ldquo;right.&rdquo; Students reflect on how their constraints and prior budget allocation dictate the most resilient path.
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-dashed border-slate-800 text-center text-xs text-slate-400">
                Click one of the three strategic options above to see how students evaluate the trade-offs.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
