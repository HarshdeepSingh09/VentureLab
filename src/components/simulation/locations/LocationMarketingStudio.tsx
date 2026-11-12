import React from 'react';
import { 
  Megaphone, Users, Target, ArrowRight, 
  CheckCircle2, Info, DollarSign, Sparkles 
} from 'lucide-react';
import type { 
  SimulationState, 
  SimulationLocationId 
} from '../../../simulation/types';
import { ALL_SCENARIOS } from '../../../simulation/scenarioData';
import { ConceptTooltip } from '../ui/ConceptTooltip';
import { MODULE_MAP } from '../../../simulation/moduleData';
import { ModuleLearningHeader } from '../ui/ModuleLearningHeader';

interface LocationMarketingStudioProps {
  state: SimulationState;
  setState: React.Dispatch<React.SetStateAction<SimulationState>>;
  onNavigate: (locationId: SimulationLocationId) => void;
  onOpenAssumptions?: () => void;
}

export const LocationMarketingStudio: React.FC<LocationMarketingStudioProps> = ({
  state,
  setState,
  onNavigate,
  onOpenAssumptions,
}) => {
  const scenario = ALL_SCENARIOS[state.founder?.scenarioId || 'campus_meal'] || ALL_SCENARIOS.campus_meal;
  const totalMarketingBudget = state.budget.marketing;

  const currentModule = MODULE_MAP.mod_7_marketing_strategy;

  const handleSaveReflection = (text: string) => {
    setState((prev: SimulationState) => ({
      ...prev,
      studentReflections: {
        ...prev.studentReflections,
        mod_7_marketing_strategy: text,
      },
      completedModules: Array.from(new Set([...prev.completedModules, 'mod_7_marketing_strategy'])),
    }));
  };

  // Calculate sum of channel allocations
  const currentAllocated = Object.values(state.selectedMarketingChannels).reduce(
    (sum: number, val: number) => sum + val,
    0
  );
  const remainingMktBudget = Math.max(0, totalMarketingBudget - currentAllocated);

  const handleChannelBudgetChange = (chanId: string, value: number) => {
    setState((prev: SimulationState) => {
      const otherTotal = Object.entries(prev.selectedMarketingChannels)
        .filter(([k]) => k !== chanId)
        .reduce((sum: number, [, v]: [string, number]) => sum + v, 0);

      const maxPermitted = Math.max(0, totalMarketingBudget - otherTotal);
      const clamped = Math.max(0, Math.min(value, maxPermitted));

      return {
        ...prev,
        selectedMarketingChannels: {
          ...prev.selectedMarketingChannels,
          [chanId]: clamped,
        },
        completedLocations: prev.completedLocations.includes('marketing_studio')
          ? prev.completedLocations
          : [...prev.completedLocations, 'marketing_studio'],
      };
    });
  };

  // Metrics calculation
  let totalEstimatedReach = 0;
  let totalEstimatedConversions = 0;

  scenario.marketingChannels.forEach((chan) => {
    const allocated = state.selectedMarketingChannels[chan.id] || 0;
    if (allocated > 0) {
      const units = allocated / chan.costPerUnit;
      const reach = Math.round(units * chan.reachPerUnit);
      const conv = Math.round(reach * chan.conversionRate);
      totalEstimatedReach += reach;
      totalEstimatedConversions += conv;
    }
  });

  const estimatedInquiries = Math.round(totalEstimatedReach * 0.35);
  const calculatedCac = totalEstimatedConversions > 0 ? Math.round(currentAllocated / totalEstimatedConversions) : 0;

  return (
    <div className="space-y-8 text-left animate-in fade-in duration-200">
      {/* Module 7 Learning Header */}
      <ModuleLearningHeader
        module={currentModule}
        reflectionValue={state.studentReflections['mod_7_marketing_strategy'] || ''}
        onSaveReflection={handleSaveReflection}
        isCompleted={currentAllocated > 0}
        onOpenAssumptions={onOpenAssumptions}
      />

      {/* Location Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/80 border border-violet-800/60 text-[10px] font-mono font-bold uppercase tracking-widest text-violet-400">
              <Megaphone className="w-3.5 h-3.5" />
              LOCATION 05 // MARKETING STUDIO
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Campus Promotion & Acquisition Strategy
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Distribute your allocated marketing budget (₹{totalMarketingBudget.toLocaleString('en-IN')}) across proven campus acquisition channels.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-right shrink-0">
            <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">
              Marketing Funds Left:
            </div>
            <div className={`text-2xl font-black ${remainingMktBudget === 0 ? 'text-emerald-400' : 'text-cyan-400'}`}>
              ₹{remainingMktBudget.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] font-mono text-slate-500">
              Total Marketing Fund: ₹{totalMarketingBudget.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Telemetry Dashboard required by Prompt Section 10 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Estimated Reach */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Estimated Reach</span>
            <Users className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {totalEstimatedReach.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-slate-400">
            Students who view your campaign
          </div>
        </div>

        {/* Simulated Inquiries */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Simulated Inquiries</span>
            <Target className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-indigo-300">
            {estimatedInquiries.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-slate-400">
            Students asking for lunch menu details
          </div>
        </div>

        {/* Estimated Conversions */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Paying Customers</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">
            {totalEstimatedConversions.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-slate-400">
            Subscribed meal pass holders
          </div>
        </div>

        {/* CAC */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <ConceptTooltip termKey="CAC">
              <span>Estimated CAC</span>
            </ConceptTooltip>
            <DollarSign className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">
            ₹{calculatedCac}
          </div>
          <div className="text-[10px] text-slate-400">
            Marketing cost per customer
          </div>
        </div>
      </div>

      {/* Difference between Reach and Conversion Explainer required by Prompt Section 10 */}
      <div className="p-4 rounded-2xl bg-violet-950/20 border border-violet-800/40 text-xs text-violet-200 flex items-start gap-3">
        <Info className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-violet-300">Pedagogical Concept: Reach vs. Conversion: </strong>
          Putting up 500 flyers reaches thousands of eyeballs, but only 5% of passersby might actually pay. Peer ambassadors have lower reach but 3x higher trust and conversion. Marketing requires matching channel trust with acquisition cost.
        </div>
      </div>

      {/* Channel Allocation Sliders */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span>Select Marketing Channels</span>
          </h3>
          <p className="text-xs text-slate-400">
            Adjust the slider for each channel to allocate funds from your marketing budget.
          </p>
        </div>

        <div className="space-y-6">
          {scenario.marketingChannels.map((chan) => {
            const currentVal = state.selectedMarketingChannels[chan.id] || 0;
            const units = chan.costPerUnit > 0 ? Math.floor(currentVal / chan.costPerUnit) : 0;
            const reach = units * chan.reachPerUnit;
            const conversions = Math.round(reach * chan.conversionRate);

            return (
              <div key={chan.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-white">{chan.name}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{chan.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      ₹{currentVal.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      ({units} Units @ ₹{chan.costPerUnit.toLocaleString('en-IN')})
                    </span>
                  </div>
                </div>

                <input
                  type="range"
                  min={0}
                  max={totalMarketingBudget}
                  step={chan.costPerUnit}
                  value={currentVal}
                  onChange={(e) => handleChannelBudgetChange(chan.id, Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-400"
                />

                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                  <span>Reach: <strong className="text-slate-200">{reach} students</strong></span>
                  <span>Conversion Rate: <strong className="text-emerald-400">{(chan.conversionRate * 100).toFixed(0)}%</strong></span>
                  <span>Est. Customers: <strong className="text-white">{conversions}</strong></span>
                  <span>Setup Time: <strong className="text-slate-300">{chan.timeRequired}</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div className="text-xs text-slate-400">
          Next Milestone: <strong>Operations Center</strong> to balance kitchen throughput & manage capacity.
        </div>
        <button
          onClick={() => onNavigate('operations_center')}
          className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center gap-2"
        >
          <span>Continue to Operations Center</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
