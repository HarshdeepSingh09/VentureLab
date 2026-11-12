import React from 'react';
import { 
  Gauge, AlertTriangle, CheckCircle2, 
  ArrowRight, ShieldCheck, Zap, Flame 
} from 'lucide-react';
import type { 
  SimulationState, 
  SimulationLocationId 
} from '../../../simulation/types';
import { calculateSimulationResults } from '../../../simulation/simulationEngine';
import { MODULE_MAP } from '../../../simulation/moduleData';
import { ModuleLearningHeader } from '../ui/ModuleLearningHeader';

interface LocationOperationsCenterProps {
  state: SimulationState;
  setState: React.Dispatch<React.SetStateAction<SimulationState>>;
  onNavigate: (locationId: SimulationLocationId) => void;
  onOpenAssumptions?: () => void;
}

export const LocationOperationsCenter: React.FC<LocationOperationsCenterProps> = ({
  state,
  setState,
  onNavigate,
  onOpenAssumptions,
}) => {
  const results = calculateSimulationResults(state);
  const currentModule = MODULE_MAP.mod_8_business_operations;

  const handleSaveReflection = (text: string) => {
    setState((prev) => ({
      ...prev,
      studentReflections: {
        ...prev.studentReflections,
        mod_8_business_operations: text,
      },
      completedModules: Array.from(new Set([...prev.completedModules, 'mod_8_business_operations'])),
    }));
  };

  const choices = [
    {
      id: 'expand' as const,
      title: 'Option A: Expand Kitchen Capacity Immediately',
      subtitle: 'Invest ₹15,000 from cash reserves to lease a secondary kitchen prep shift, buy 4 extra thermal hot-boxes, and hire 2 student runners.',
      badge: 'Aggressive Scaling',
      color: 'border-emerald-500/80 text-emerald-400',
      icon: Zap,
      costImpact: '-₹15,000 from cash',
      capacityImpact: '+55% capacity increase (220 meals/day)',
      satisfactionImpact: 'High satisfaction (88%) maintained',
      tradeoff: 'Burns cash reserves quickly, but captures peak surge demand and cements reputation for flawless on-time fulfillment.',
    },
    {
      id: 'cap' as const,
      title: 'Option B: Cap Daily Orders & Introduce a VIP Waitlist',
      subtitle: 'Limit daily orders strictly to 140 meals. Create an exclusive waiting list for remaining students while keeping food pristine.',
      badge: 'Quality & Runway Protection',
      color: 'border-cyan-500/80 text-cyan-400',
      icon: ShieldCheck,
      costImpact: '-₹2,000 waitlist management',
      capacityImpact: 'Preserves 140 meals/day baseline',
      satisfactionImpact: 'Very high satisfaction (92%) for served students',
      tradeoff: 'Sacrifices immediate surge revenue, but protects kitchen peace, preserves working capital runway, and creates anticipation.',
    },
    {
      id: 'optimize' as const,
      title: 'Option C: Streamline Prep Process & Simplify Menu',
      subtitle: 'Spend ₹6,000 on pre-portioned packaging and standardize menu to 2 core daily choices instead of 5 complex recipes.',
      badge: 'Lean Process Engineering',
      color: 'border-indigo-500/80 text-indigo-400',
      icon: Gauge,
      costImpact: '-₹6,000 process tooling',
      capacityImpact: '+25% throughput (175 meals/day)',
      satisfactionImpact: 'Good satisfaction (82%) with minor menu fatigue',
      tradeoff: 'Balanced middle path: reduces menu variety slightly, but boosts kitchen speed without massive capital expenses.',
    },
    {
      id: 'overload' as const,
      title: 'Option D: Accept All Orders and Push Capacity to Maximum',
      subtitle: 'Accept all 240 orders without hiring extra staff or spending reserve cash. Mandate overtime across current cooks and delivery runners.',
      badge: 'High Risk Overload',
      color: 'border-rose-500/80 text-rose-400',
      icon: Flame,
      costImpact: '-₹3,000 emergency overtime stipends',
      capacityImpact: 'Forces 210 meals/day through overburdened lines',
      satisfactionImpact: 'Severe drop to 48% satisfaction due to cold food and delays',
      tradeoff: 'Captures short-term gross revenue, but burns out staff, delivers meals 35 minutes late during lectures, and sparks campus WhatsApp boycott.',
    },
  ];

  const handleSelectChoice = (choiceId: 'expand' | 'cap' | 'optimize' | 'overload') => {
    setState((prev) => {
      // Unlock Resilient Founder achievement
      const updatedAchievements = prev.achievements.map((ach) =>
        ach.id === 'ach-resilient-founder'
          ? { ...ach, unlocked: true, unlockedAt: new Date().toLocaleTimeString() }
          : ach
      );

      return {
        ...prev,
        selectedOperationsChoice: choiceId,
        achievements: updatedAchievements,
        completedLocations: prev.completedLocations.includes('operations_center')
          ? prev.completedLocations
          : [...prev.completedLocations, 'operations_center'],
      };
    });
  };

  return (
    <div className="space-y-8 text-left animate-in fade-in duration-200">
      {/* Module 8 Learning Header */}
      <ModuleLearningHeader
        module={currentModule}
        reflectionValue={state.studentReflections['mod_8_business_operations'] || ''}
        onSaveReflection={handleSaveReflection}
        isCompleted={Boolean(state.selectedOperationsChoice)}
        onOpenAssumptions={onOpenAssumptions}
      />

      {/* Location Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-red-600" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800/60 text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
              <Gauge className="w-3.5 h-3.5" />
              LOCATION 06 // OPERATIONS CENTER
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Operations Telemetry & Bottleneck Dilemma
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Discover how supply chains, kitchen throughput, and dispatch logistics dictate business survival.
            </p>
          </div>

          {state.selectedOperationsChoice && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800 text-xs font-bold text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Operational Strategy Selected
            </span>
          )}
        </div>
      </div>

      {/* Simplified Operations Dashboard required by Prompt Section 12 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
          <div className="text-[10px] font-mono text-slate-400">Kitchen Capacity</div>
          <div className="text-xl font-black text-cyan-400">{results.operationalCapacity}</div>
          <div className="text-[10px] text-slate-500">meals/day max</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
          <div className="text-[10px] font-mono text-slate-400">Daily Order Demand</div>
          <div className="text-xl font-black text-amber-400">{results.demandGenerated}</div>
          <div className="text-[10px] text-slate-500">requests/day</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
          <div className="text-[10px] font-mono text-slate-400">Fulfillment Rate</div>
          <div className="text-xl font-black text-emerald-400">{results.fulfillmentRate}%</div>
          <div className="text-[10px] text-slate-500">orders on-time</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
          <div className="text-[10px] font-mono text-slate-400">Service Quality</div>
          <div className="text-xl font-black text-violet-400">{results.customerSatisfaction}%</div>
          <div className="text-[10px] text-slate-500">food warmth & taste</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
          <div className="text-[10px] font-mono text-slate-400">Dispatch Runners</div>
          <div className="text-xl font-black text-white">{state.team.some(t => t.role === 'Operations' && t.assigned) ? '4 active' : '2 active'}</div>
          <div className="text-[10px] text-slate-500">student couriers</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
          <div className="text-[10px] font-mono text-slate-400">Support Workload</div>
          <div className="text-xl font-black text-slate-300">{state.budget.customerSupport >= 10000 ? 'Manageable' : 'Under Pressure'}</div>
          <div className="text-[10px] text-slate-500">complaint buffer</div>
        </div>
      </div>

      {/* The Operations Bottleneck Challenge required by Prompt Section 12 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold uppercase tracking-widest mb-1">
            <AlertTriangle className="w-4 h-4" />
            CRISIS ALERT // WEEK 2 BOTTLENECK
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            &ldquo;Demand has surged, but your operational capacity has not.&rdquo;
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Your initial campus promotion spread virally through student hostel WhatsApp groups. Daily lunch requests have spiked to 240 meals/day. However, your kitchen setup and delivery runners can only punctually dispatch 140 meals within the 35-minute class break. How do you respond?
          </p>
        </div>

        {/* 4 Choices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {choices.map((choice) => {
            const isSelected = state.selectedOperationsChoice === choice.id;
            const Icon = choice.icon;
            return (
              <div
                key={choice.id}
                onClick={() => handleSelectChoice(choice.id)}
                className={`p-5 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-400 shadow-xl ring-1 ring-cyan-400/50'
                    : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${choice.color} bg-slate-950`}>
                      {choice.badge}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{choice.title}</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {choice.subtitle}
                    </p>
                  </div>

                  {/* Impact Breakdown */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-[11px]">
                    <div>
                      <strong className="text-slate-300">Cash Impact: </strong>
                      <span className="text-slate-400">{choice.costImpact}</span>
                    </div>
                    <div>
                      <strong className="text-slate-300">Throughput Impact: </strong>
                      <span className="text-cyan-400">{choice.capacityImpact}</span>
                    </div>
                    <div>
                      <strong className="text-slate-300">Satisfaction: </strong>
                      <span className="text-emerald-400">{choice.satisfactionImpact}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-300 italic">
                    <strong className="text-cyan-300">Strategic Trade-off: </strong>
                    {choice.tradeoff}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-bold text-cyan-400 flex items-center justify-between">
                  <span>{isSelected ? 'Current Decision' : 'Choose This Strategy'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="text-xs text-slate-400">
          Next Milestone: <strong>Module 9 (Investor Arena)</strong> or analyze rivals in the <strong>Competition Hub</strong>.
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('competition_hub')}
            disabled={!state.selectedOperationsChoice}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              state.selectedOperationsChoice
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                : 'bg-slate-800/50 text-slate-600 cursor-not-allowed'
            }`}
          >
            <span>Competition Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate('investor_arena')}
            disabled={!state.selectedOperationsChoice}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              state.selectedOperationsChoice
                ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md font-extrabold'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>Proceed to Investor Arena</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
