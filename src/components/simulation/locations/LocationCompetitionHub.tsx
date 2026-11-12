import React from 'react';
import { 
  Swords, CheckCircle2, ArrowRight, Sparkles 
} from 'lucide-react';
import type { 
  SimulationState, 
  SimulationLocationId 
} from '../../../simulation/types';
import { ALL_SCENARIOS } from '../../../simulation/scenarioData';

interface LocationCompetitionHubProps {
  state: SimulationState;
  setState: React.Dispatch<React.SetStateAction<SimulationState>>;
  onNavigate: (locationId: SimulationLocationId) => void;
}

export const LocationCompetitionHub: React.FC<LocationCompetitionHubProps> = ({
  state,
  setState,
  onNavigate,
}) => {
  const scenario = ALL_SCENARIOS[state.founder?.scenarioId || 'campus_meal'] || ALL_SCENARIOS.campus_meal;
  const competitor = scenario.competitor;

  const handleSelectOption = (optId: 'price' | 'quality' | 'niche' | 'experience') => {
    setState((prev) => {
      // Unlock Strategic Thinker achievement
      const updatedAchievements = prev.achievements.map((ach) =>
        ach.id === 'ach-strategic-thinker'
          ? { ...ach, unlocked: true, unlockedAt: new Date().toLocaleTimeString() }
          : ach
      );

      return {
        ...prev,
        selectedCompetitionChoice: optId,
        achievements: updatedAchievements,
        completedLocations: prev.completedLocations.includes('competition_hub')
          ? prev.completedLocations
          : [...prev.completedLocations, 'competition_hub'],
      };
    });
  };

  return (
    <div className="space-y-8 text-left animate-in fade-in duration-200">
      {/* Location Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-800/60 text-[10px] font-mono font-bold uppercase tracking-widest text-rose-400">
              <Swords className="w-3.5 h-3.5" />
              LOCATION 08 // COMPETITION HUB
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Competitive Market Intelligence & Rival Moves
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              A business does not operate in a vacuum. Evaluate rival strategies and protect your venture with a defensible moat.
            </p>
          </div>

          {state.selectedCompetitionChoice && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800 text-xs font-bold text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Counter-Strategy Confirmed
            </span>
          )}
        </div>
      </div>

      {/* Competitor Threat Alert Box required by Prompt Section 13 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-950 text-rose-400 border border-rose-800/60 flex items-center justify-center font-black">
              <Swords className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>Rival Alert: {competitor.name}</span>
                <span className="text-[10px] font-mono text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                  Simulated Competitor
                </span>
              </div>
              <div className="text-xs text-slate-400">{competitor.tagline}</div>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">
              Market Impact
            </span>
            <span className="text-xs font-bold text-rose-400">
              Price Pressure in Freshman Hostels
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {competitor.threatDescription}
        </p>
      </div>

      {/* 4 Strategic Response Options required by Prompt Section 13 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Select Your Strategic Response Counter-Move:</span>
          </h3>
          <span className="text-xs text-slate-400">
            Deterministic consequences applied to your model
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {competitor.options.map((opt) => {
            const isSelected = state.selectedCompetitionChoice === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`p-5 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-rose-400 shadow-xl ring-1 ring-rose-400/50'
                    : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800/60">
                      Option {opt.id.toUpperCase()}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-rose-400" />}
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white">{opt.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {opt.description}
                    </p>
                  </div>

                  {/* Margin & Cost Impact */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-[11px]">
                    <div>
                      <strong className="text-slate-300">Budget Impact: </strong>
                      <span className="text-slate-400">-₹{opt.costImpact.toLocaleString('en-IN')}</span>
                    </div>
                    <div>
                      <strong className="text-slate-300">Unit Margin Effect: </strong>
                      <span className="text-rose-300">{opt.marginImpact}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-300 italic">
                    <strong className="text-cyan-300">Deterministic Result: </strong>
                    {opt.outcomeSummary}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-bold text-rose-400 flex items-center justify-between">
                  <span>{isSelected ? 'Counter-Strategy Active' : 'Execute Strategy'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div className="text-xs text-slate-400">
          Next Milestone: <strong>The Investor Arena</strong> for the final capstone presentation.
        </div>
        <button
          onClick={() => onNavigate('investor_arena')}
          disabled={!state.selectedCompetitionChoice}
          className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            state.selectedCompetitionChoice
              ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span>Proceed to Investor Arena</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
