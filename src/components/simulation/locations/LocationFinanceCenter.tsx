import React from 'react';
import { 
  Wallet, AlertTriangle, TrendingUp, ShieldAlert, 
  ArrowRight, Sparkles, RotateCcw, CheckCircle2, DollarSign 
} from 'lucide-react';
import type { 
  SimulationState, 
  SimulationLocationId, 
  BudgetAllocation 
} from '../../../simulation/types';
import { calculateSimulationResults, TOTAL_BUDGET } from '../../../simulation/simulationEngine';
import { ALL_PIVOT_OPTIONS } from '../../../simulation/scenarioData';
import { ConceptTooltip } from '../ui/ConceptTooltip';
import { MODULE_MAP } from '../../../simulation/moduleData';
import { ModuleLearningHeader } from '../ui/ModuleLearningHeader';

interface LocationFinanceCenterProps {
  state: SimulationState;
  setState: React.Dispatch<React.SetStateAction<SimulationState>>;
  onNavigate: (locationId: SimulationLocationId) => void;
  onOpenAssumptions?: () => void;
}

export const LocationFinanceCenter: React.FC<LocationFinanceCenterProps> = ({
  state,
  setState,
  onNavigate,
  onOpenAssumptions,
}) => {
  const { budget } = state;
  const results = calculateSimulationResults(state);

  const totalAllocated =
    budget.productDevelopment +
    budget.marketing +
    budget.operations +
    budget.customerSupport +
    budget.emergencyReserve;

  const remainingToAllocate = TOTAL_BUDGET - totalAllocated;

  const handleSliderChange = (key: keyof BudgetAllocation, value: number) => {
    const currentVal = budget[key];
    const diff = value - currentVal;
    if (diff > remainingToAllocate) {
      value = currentVal + remainingToAllocate;
    }
    value = Math.max(0, value);

    setState((prev) => {
      const newBudget = { ...prev.budget, [key]: value };
      const sum =
        newBudget.productDevelopment +
        newBudget.marketing +
        newBudget.operations +
        newBudget.customerSupport +
        newBudget.emergencyReserve;

      // Unlock Budget Planner achievement if fully allocated
      const updatedAchievements = prev.achievements.map((ach) =>
        ach.id === 'ach-budget-planner' && sum === TOTAL_BUDGET
          ? { ...ach, unlocked: true, unlockedAt: new Date().toLocaleTimeString() }
          : ach
      );

      return {
        ...prev,
        budget: newBudget,
        achievements: updatedAchievements,
        completedLocations:
          sum === TOTAL_BUDGET && !prev.completedLocations.includes('finance_center')
            ? [...prev.completedLocations, 'finance_center']
            : prev.completedLocations,
      };
    });
  };

  const setPreset = (preset: 'balanced' | 'growth' | 'operations' | 'defensive') => {
    let newBudget: BudgetAllocation;
    if (preset === 'balanced') {
      newBudget = {
        productDevelopment: 25000,
        marketing: 25000,
        operations: 35000,
        customerSupport: 10000,
        emergencyReserve: 5000,
      };
    } else if (preset === 'growth') {
      newBudget = {
        productDevelopment: 20000,
        marketing: 45000,
        operations: 25000,
        customerSupport: 8000,
        emergencyReserve: 2000,
      };
    } else if (preset === 'operations') {
      newBudget = {
        productDevelopment: 20000,
        marketing: 15000,
        operations: 45000,
        customerSupport: 12000,
        emergencyReserve: 8000,
      };
    } else {
      newBudget = {
        productDevelopment: 15000,
        marketing: 15000,
        operations: 30000,
        customerSupport: 10000,
        emergencyReserve: 30000,
      };
    }

    setState((prev) => ({
      ...prev,
      budget: newBudget,
      completedLocations: prev.completedLocations.includes('finance_center')
        ? prev.completedLocations
        : [...prev.completedLocations, 'finance_center'],
    }));
  };

  // 30-Day Simulated Cash-Flow Projection Timeline (Weeks 1 to 4)
  const timelineWeeks = [
    {
      week: 'Week 1: Setup & Launch',
      cash: TOTAL_BUDGET - Math.round(totalAllocated * 0.6),
      burn: -Math.round(totalAllocated * 0.6),
      desc: 'Initial equipment leasing, ingredient inventory, and launch ambassador kits.',
    },
    {
      week: 'Week 2: Operations Ramp',
      cash: TOTAL_BUDGET - Math.round(totalAllocated * 0.85) + Math.round(results.estimatedRevenue * 0.18),
      burn: -Math.round(totalAllocated * 0.25),
      desc: 'First customer orders arrive. Daily revenue begins offsetting variable kitchen costs.',
    },
    {
      week: 'Week 3: Bottleneck / Event',
      cash: results.remainingCash + 8000,
      burn: -12000,
      desc: 'Demand surge and supplier price adjustments tested emergency reserves.',
    },
    {
      week: 'Week 4: Month 1 Close',
      cash: results.remainingCash,
      burn: results.netFinancialOutcome,
      desc: `Finished Month 1 with ₹${results.remainingCash.toLocaleString('en-IN')} cash and estimated ${results.runwayMonths} months runway.`,
    },
  ];

  const currentModule = MODULE_MAP.mod_6_financial_planning;

  const handleSaveReflection = (text: string) => {
    setState((prev) => ({
      ...prev,
      studentReflections: {
        ...prev.studentReflections,
        mod_6_financial_planning: text,
      },
      completedModules: Array.from(new Set([...prev.completedModules, 'mod_6_financial_planning'])),
    }));
  };

  return (
    <div className="space-y-8 text-left animate-in fade-in duration-200">
      {/* Module 6 Learning Header */}
      <ModuleLearningHeader
        module={currentModule}
        reflectionValue={state.studentReflections['mod_6_financial_planning'] || ''}
        onSaveReflection={handleSaveReflection}
        isCompleted={state.budget.emergencyReserve > 0}
        onOpenAssumptions={onOpenAssumptions}
      />

      {/* Location Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
              <Wallet className="w-3.5 h-3.5" />
              LOCATION 04 // FINANCE CENTER
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Capital Budgeting & Runway Telemetry
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Allocate your simulated ₹1,00,000 seed fund. Understand the real difference between cash balance, profit, and monthly runway.
            </p>
          </div>

          {/* Seed Fund Indicator */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-right shrink-0">
            <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">
              Unallocated Balance:
            </div>
            <div className={`text-2xl font-black ${remainingToAllocate === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
              ₹{remainingToAllocate.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              Total Budget: ₹1,00,000 (Simulated)
            </div>
          </div>
        </div>
      </div>

      {/* Financial Health Alerts (Warnings when strategy creates pressure) */}
      {budget.emergencyReserve === 0 && (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800 text-xs text-rose-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-rose-300 font-bold">Zero Emergency Reserve Warning: </strong>
            You have allocated ₹0 to contingency reserves. If an ingredient supplier raises prices or equipment breaks down during Week 2, your business will face sudden cash insolvency.
          </div>
        </div>
      )}

      {budget.marketing > budget.operations * 1.5 && (
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300 font-bold">Imbalance Warning: </strong>
            Marketing spend heavily exceeds kitchen operations. You risk generating student demand that your delivery runners cannot fulfill punctually.
          </div>
        </div>
      )}

      {/* Top 4 Telemetry Concept Cards with beginner tooltips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Estimated Revenue */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <ConceptTooltip termKey="REVENUE">
              <span>Estimated Revenue</span>
            </ConceptTooltip>
            <span className="text-[10px] font-mono text-slate-500">30-Day Cycle</span>
          </div>
          <div className="text-2xl font-black text-white">
            ₹{results.estimatedRevenue.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-slate-400">
            Based on ~{results.ordersFulfilled} meals/day @ ₹95
          </div>
        </div>

        {/* Estimated Expenses */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <ConceptTooltip termKey="EXPENSES">
              <span>Total Expenses</span>
            </ConceptTooltip>
            <span className="text-[10px] font-mono text-slate-500">Budget + COGS</span>
          </div>
          <div className="text-2xl font-black text-rose-400">
            ₹{results.estimatedExpenses.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-slate-400">
            Fixed capital + raw ingredient food costs
          </div>
        </div>

        {/* Profit or Loss */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <ConceptTooltip termKey="PROFIT_OR_LOSS">
              <span>Net Financial Outcome</span>
            </ConceptTooltip>
            <span className="text-[10px] font-mono text-slate-500">Month 1 Net</span>
          </div>
          <div className={`text-2xl font-black ${results.netFinancialOutcome >= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {results.netFinancialOutcome >= 0 ? '+' : ''}₹{results.netFinancialOutcome.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-slate-400">
            {results.netFinancialOutcome >= 0 ? 'Operating with positive unit margin' : 'Initial burn during launch phase'}
          </div>
        </div>

        {/* Cash Runway */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <ConceptTooltip termKey="RUNWAY">
              <span>Cash Runway</span>
            </ConceptTooltip>
            <span className="text-[10px] font-mono text-cyan-400">Survival Time</span>
          </div>
          <div className="text-2xl font-black text-cyan-300">
            {results.runwayMonths} <span className="text-xs text-slate-400 font-normal">months</span>
          </div>
          <div className="text-[10px] text-slate-400">
            Remaining Cash: ₹{results.remainingCash.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Budget Allocation Sliders Across 5 Buckets */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Interactive Budget Allocation (₹1,00,000 Portfolio)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Distribute funds across the 5 core functions of your business. Zero-sum constraint ensures realistic trade-offs.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setPreset('balanced')}
              className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-[11px] text-slate-300 font-medium cursor-pointer"
            >
              Balanced
            </button>
            <button
              onClick={() => setPreset('growth')}
              className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-[11px] text-slate-300 font-medium cursor-pointer"
            >
              Growth Focus
            </button>
            <button
              onClick={() => setPreset('operations')}
              className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-[11px] text-slate-300 font-medium cursor-pointer"
            >
              Operations First
            </button>
            <button
              onClick={() => setPreset('defensive')}
              className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-[11px] text-slate-300 font-medium cursor-pointer"
            >
              Cash Fortress
            </button>
          </div>
        </div>

        {/* 5 Sliders */}
        <div className="space-y-5">
          {/* 1. Product Development */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">1. Product & Ordering Software R&D</span>
              <span className="font-mono text-cyan-400 font-bold">
                ₹{budget.productDevelopment.toLocaleString('en-IN')} ({(budget.productDevelopment / 1000).toFixed(0)}%)
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={60000}
              step={2000}
              value={budget.productDevelopment}
              onChange={(e) => handleSliderChange('productDevelopment', Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="text-[11px] text-slate-400">
              Web app ordering flow, menu scheduling systems, and digital meal pass integrations.
            </div>
          </div>

          {/* 2. Marketing */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">2. Marketing & Customer Acquisition</span>
              <span className="font-mono text-cyan-400 font-bold">
                ₹{budget.marketing.toLocaleString('en-IN')} ({(budget.marketing / 1000).toFixed(0)}%)
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={60000}
              step={2000}
              value={budget.marketing}
              onChange={(e) => handleSliderChange('marketing', Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="text-[11px] text-slate-400">
              Campus student ambassadors, tasting trials outside dorms, social media reels, and launch flyers.
            </div>
          </div>

          {/* 3. Operations */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">3. Kitchen Operations & Dispatch Logistics</span>
              <span className="font-mono text-cyan-400 font-bold">
                ₹{budget.operations.toLocaleString('en-IN')} ({(budget.operations / 1000).toFixed(0)}%)
              </span>
            </div>
            <input
              type="range"
              min={10000}
              max={70000}
              step={2000}
              value={budget.operations}
              onChange={(e) => handleSliderChange('operations', Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="text-[11px] text-slate-400">
              Commercial kitchen equipment, thermal food-grade containers, dispatch table, and runner stipends.
            </div>
          </div>

          {/* 4. Customer Support */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">4. Customer Support & Hygiene Guarantees</span>
              <span className="font-mono text-cyan-400 font-bold">
                ₹{budget.customerSupport.toLocaleString('en-IN')} ({(budget.customerSupport / 1000).toFixed(0)}%)
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={30000}
              step={1000}
              value={budget.customerSupport}
              onChange={(e) => handleSliderChange('customerSupport', Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="text-[11px] text-slate-400">
              Instant meal replacement refunds, WhatsApp chat resolution, and food safety quality audits.
            </div>
          </div>

          {/* 5. Emergency Reserve */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">5. Emergency Cash Contingency Reserve</span>
              <span className="font-mono text-cyan-400 font-bold">
                ₹{budget.emergencyReserve.toLocaleString('en-IN')} ({(budget.emergencyReserve / 1000).toFixed(0)}%)
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={50000}
              step={1000}
              value={budget.emergencyReserve}
              onChange={(e) => handleSliderChange('emergencyReserve', Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="text-[11px] text-slate-400">
              Unallocated cash held in reserve to absorb wholesale vegetable inflation and equipment repairs.
            </div>
          </div>
        </div>
      </div>

      {/* Interactive 30-Day Cash-Flow Timeline required by Prompt Section 9 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl space-y-4">
        <div className="border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span>Simulated 30-Day Cash Flow Progression</span>
          </h3>
          <p className="text-xs text-slate-400">
            Observe how money moves in and out of the bank account across the initial launch month.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {timelineWeeks.map((t, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase">
                {t.week}
              </div>
              <div className="text-lg font-black text-white">
                ₹{t.cash.toLocaleString('en-IN')}
              </div>
              <div className="text-[10px] text-slate-400 leading-snug">
                {t.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Business Survival Accounting Ledger (Requirement 5) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl space-y-4">
        <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
              <DollarSign className="w-3.5 h-3.5" />
              <span>BUSINESS SURVIVAL LEDGER</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              Unit Economics & Cash vs Accounting Profit
            </h3>
            <p className="text-xs text-slate-400">
              Distinguishing top-line revenue from net profit, and accounting profit from actual remaining bank cash.
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Estimated Runway:</span>
            <span className="text-sm font-black text-emerald-400 font-mono">
              {results.runwayMonths} Months
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">1. Gross Revenue</span>
            <span className="text-base font-black text-white font-mono">₹{results.estimatedRevenue.toLocaleString('en-IN')}</span>
            <span className="text-[10px] text-slate-500 block">Total monthly billings</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">2. Cost of Goods (COGS)</span>
            <span className="text-base font-black text-rose-400 font-mono">-₹{results.costOfGoodsSold.toLocaleString('en-IN')}</span>
            <span className="text-[10px] text-slate-500 block">Ingredients & packaging</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">3. Gross Profit (Margin)</span>
            <span className="text-base font-black text-cyan-400 font-mono">₹{results.grossProfit.toLocaleString('en-IN')} ({results.grossMarginPercentage}%)</span>
            <span className="text-[10px] text-slate-500 block">Revenue minus direct COGS</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">4. Net Profit / (Loss)</span>
            <span className={`text-base font-black font-mono ${results.netFinancialOutcome >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {results.netFinancialOutcome >= 0 ? '+' : ''}₹{results.netFinancialOutcome.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-slate-500 block">After all fixed overheads</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-blue-950/30 border border-blue-800/40 text-xs text-blue-200 leading-relaxed">
          <strong>Key Entrepreneurship Principle:</strong> Revenue is what customers pay you. Profit is what remains after paying expenses. Cash is the physical liquidity in your bank account today. A startup can be profitable on paper but still fail if it runs out of cash to pay workers or suppliers.
        </div>
      </div>

      {/* Strategic Business Pivot Activity (Requirement 9) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl space-y-4">
        <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-400">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>STRATEGIC BUSINESS PIVOT</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              Reconsider Business Model or Customer Segment
            </h3>
            <p className="text-xs text-slate-400">
              When market evidence reveals friction, adapt your strategy. A pivot incurs an implementation cost but can dramatically improve margins and demand.
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Current Pivot:</span>
            <span className="text-xs font-bold text-indigo-400 font-mono">
              {state.activePivot ? state.activePivot.title : 'Original Model'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ALL_PIVOT_OPTIONS.map((pivot) => {
            const isSelected = state.activePivot?.id === pivot.id;

            return (
              <div
                key={pivot.id}
                onClick={() => {
                  setState((prev) => {
                    const nextPivot = isSelected ? null : pivot;
                    const updatedAchievements = prev.achievements.map((ach) =>
                      ach.id === 'ach-pivot-master' && nextPivot
                        ? { ...ach, unlocked: true, unlockedAt: new Date().toLocaleTimeString() }
                        : ach
                    );
                    return {
                      ...prev,
                      activePivot: nextPivot,
                      achievements: updatedAchievements,
                    };
                  });
                }}
                className={`p-5 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-950/50 border-indigo-500 shadow-xl ring-1 ring-indigo-500/50'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-indigo-400 font-bold uppercase">
                      {pivot.badge}
                    </span>
                    <span className="text-xs font-mono text-rose-400 font-bold">
                      Cost: ₹{pivot.implementationCost.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white">{pivot.title}</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-snug">{pivot.description}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1 text-[11px] font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Margin Shift:</span>
                      <span className="text-emerald-400 font-bold">+{(pivot.marginAdjustment * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Appeal Shift:</span>
                      <span className="text-cyan-400 font-bold">+{pivot.appealAdjustment} pts</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Capacity Shift:</span>
                      <span className={pivot.capacityAdjustment >= 0 ? 'text-blue-400 font-bold' : 'text-amber-400 font-bold'}>
                        {pivot.capacityAdjustment > 0 ? '+' : ''}{pivot.capacityAdjustment} units
                      </span>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-400 italic">
                    &bull; Rationale: {pivot.reasoning}
                  </p>
                </div>

                <button
                  type="button"
                  className={`mt-4 w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Active Pivot</span>
                    </>
                  ) : (
                    <span>Execute Pivot</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div className="text-xs text-slate-400">
          Budget Status: <strong>{totalAllocated === TOTAL_BUDGET ? 'Fully Allocated (₹1,00,000)' : `₹${remainingToAllocate.toLocaleString('en-IN')} Remaining`}</strong>
        </div>
        <button
          onClick={() => onNavigate('marketing_studio')}
          className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center gap-2"
        >
          <span>Continue to Marketing Studio</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
