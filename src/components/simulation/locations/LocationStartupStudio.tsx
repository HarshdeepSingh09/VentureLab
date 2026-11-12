import React from 'react';
import { 
  Building2, User, CheckCircle2, Circle, 
  ArrowRight, Sparkles, Award 
} from 'lucide-react';
import type { SimulationState, SimulationLocationId } from '../../../simulation/types';

import { MODULE_MAP } from '../../../simulation/moduleData';
import { ModuleLearningHeader } from '../ui/ModuleLearningHeader';

interface LocationStartupStudioProps {
  state: SimulationState;
  setState?: React.Dispatch<React.SetStateAction<SimulationState>>;
  onNavigate: (locationId: SimulationLocationId) => void;
  onOpenTeam: () => void;
  onOpenAchievements: () => void;
  onOpenAssumptions?: () => void;
}

export const LocationStartupStudio: React.FC<LocationStartupStudioProps> = ({
  state,
  setState,
  onNavigate,
  onOpenTeam,
  onOpenAchievements,
  onOpenAssumptions,
}) => {
  const { founder, achievements } = state;

  const objectives = [
    {
      id: 'customer_discovery' as SimulationLocationId,
      label: 'Discover a Customer Problem & Choose Idea',
      done: !!state.selectedProblemId && !!state.selectedIdeaId,
    },
    {
      id: 'product_dev' as SimulationLocationId,
      label: 'Configure MVP Features & Product Roadmap',
      done: state.selectedFeatureIds.length > 0,
    },
    {
      id: 'finance_center' as SimulationLocationId,
      label: 'Allocate ₹1,00,000 Budget Across 5 Buckets',
      done:
        state.budget.productDevelopment +
          state.budget.marketing +
          state.budget.operations +
          state.budget.customerSupport +
          state.budget.emergencyReserve ===
        100000,
    },
    {
      id: 'marketing_studio' as SimulationLocationId,
      label: 'Deploy Acquisition Channels & Target Audience',
      done: Object.values(state.selectedMarketingChannels).some((v: number) => v > 0),
    },
    {
      id: 'customer_insights' as SimulationLocationId,
      label: 'Interview Customer Personas in Insights Lab',
      done: state.interviewedPersonaQuestions.length >= 2,
    },
    {
      id: 'operations_center' as SimulationLocationId,
      label: 'Resolve Capacity Bottleneck Dilemma',
      done: !!state.selectedOperationsChoice,
    },
    {
      id: 'competition_hub' as SimulationLocationId,
      label: 'Counter Rival Competitor Strategy',
      done: !!state.selectedCompetitionChoice,
    },
    {
      id: 'investor_arena' as SimulationLocationId,
      label: 'Deliver Final Pitch in Investor Arena',
      done: state.isPitchCompleted,
    },
  ];

  const completedCount = objectives.filter((o) => o.done).length;
  const progressPercent = Math.round((completedCount / objectives.length) * 100);

  const currentModule = MODULE_MAP.mod_3_idea_development;

  const handleSaveReflection = (text: string) => {
    if (setState) {
      setState((prev) => ({
        ...prev,
        studentReflections: {
          ...prev.studentReflections,
          mod_3_idea_development: text,
        },
        completedModules: Array.from(new Set([...prev.completedModules, 'mod_3_idea_development'])),
      }));
    }
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-200">
      {/* Module 3 Learning Header */}
      <ModuleLearningHeader
        module={currentModule}
        reflectionValue={state.studentReflections['mod_3_idea_development'] || ''}
        onSaveReflection={handleSaveReflection}
        isCompleted={Boolean(state.studentReflections['mod_3_idea_development'])}
        onOpenAssumptions={onOpenAssumptions}
      />

      {/* Location Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">
              <Building2 className="w-3.5 h-3.5" />
              LOCATION 01 // STARTUP STUDIO HEADQUARTERS
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {founder.ventureName || 'Your Venture'} HQ
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Founder: <strong>{founder.displayName || 'Student Founder'}</strong> &bull; Category: <strong>{founder.category}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenTeam}
              className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span>Team Staffing</span>
            </button>

            <button
              onClick={onOpenAchievements}
              className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Badges ({achievements.filter((a) => a.unlocked).length})</span>
            </button>
          </div>
        </div>

        {/* Venture Mission Statement */}
        <div className="mt-6 p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Core Venture Mission:
            </div>
            <p className="text-xs sm:text-sm text-slate-200 italic">
              &ldquo;Discover real customer problems, test sustainable business models, manage capital with discipline, and build an enduring enterprise.&rdquo;
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">
              Starting Seed Capital
            </span>
            <span className="text-lg font-black text-emerald-400">
              ₹1,00,000
            </span>
          </div>
        </div>
      </div>

      {/* Current Objectives Checklist required by Prompt Section 4 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Your Current Objectives</span>
            </h3>
            <p className="text-xs text-slate-400">
              Complete key milestones across the 9 business locations to prepare for your capstone investor pitch.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono font-bold text-cyan-400">
              {completedCount} / {objectives.length} Completed ({progressPercent}%)
            </span>
            <div className="w-32 bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
              <div
                className="bg-cyan-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Objective Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {objectives.map((obj) => (
            <div
              key={obj.id}
              onClick={() => onNavigate(obj.id)}
              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                obj.done
                  ? 'bg-slate-950/80 border-emerald-800/60 hover:border-emerald-600'
                  : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                {obj.done ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span className={`text-xs font-medium ${obj.done ? 'text-slate-200 line-through' : 'text-white'}`}>
                  {obj.label}
                </span>
              </div>

              <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1 hover:underline">
                <span>Go</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          ))}
        </div>

        {/* Primary Next Step CTA */}
        <div className="pt-2 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Suggested next step: <strong>Customer Discovery Lab</strong> to validate the problem.
          </div>
          <button
            onClick={() => onNavigate('customer_discovery')}
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-950/60 transition-colors cursor-pointer flex items-center gap-2"
          >
            <span>Proceed to Customer Discovery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
