import React from 'react';
import { 
  Wallet, HeartHandshake, Monitor, 
  Award, Users, X, RotateCcw, 
  ListChecks, Layers, Sparkles, ShieldCheck, Calculator, BookOpen
} from 'lucide-react';
import type { SimulationState, SimulationLocationId } from '../../../simulation/types';
import { calculateSimulationResults } from '../../../simulation/simulationEngine';


interface TelemetryNavbarProps {
  state: SimulationState;
  onExit: () => void;
  onReset: () => void;
  onToggleMode: () => void;
  onToggleObjectives: () => void;
  onToggleMentor: () => void;
  onOpenTeam: () => void;
  onOpenAchievements: () => void;
  onNavigate: (locationId: SimulationLocationId) => void;
  onOpenAssumptions?: () => void;
  onOpenJournal?: () => void;
}

export const TelemetryNavbar: React.FC<TelemetryNavbarProps> = ({
  state,
  onExit,
  onReset,
  onToggleMode,
  onToggleObjectives,
  onToggleMentor,
  onOpenTeam,
  onOpenAchievements,
  onNavigate,
  onOpenAssumptions,
  onOpenJournal,
}) => {
  const results = calculateSimulationResults(state);
  const unlockedBadges = state.achievements.filter((a) => a.unlocked).length;


  const locationsList: { id: SimulationLocationId; label: string }[] = [
    { id: 'startup_studio', label: '1. Studio' },
    { id: 'customer_discovery', label: '2. Discovery' },
    { id: 'customer_insights', label: '3. Insights' },
    { id: 'product_dev', label: '4. Product' },
    { id: 'finance_center', label: '5. Finance' },
    { id: 'marketing_studio', label: '6. Marketing' },
    { id: 'business_challenge', label: '7. Crisis' },
    { id: 'operations_center', label: '8. Operations' },
    { id: 'competition_hub', label: '9. Competition' },
    { id: 'investor_arena', label: '10. Pitch' },
    { id: 'reflection_review', label: '11. Reflect' },
  ];

  // Cash color based on runway health
  const cashColor = results.remainingCash > 40000
    ? 'text-emerald-400'
    : results.remainingCash > 15000
    ? 'text-amber-400'
    : 'text-red-400';

  return (
    <header className="sticky top-0 z-40 bg-[#0c0f17]/95 backdrop-blur-md border-b border-white/[0.07] px-4 sm:px-5">
      <div className="h-14 flex items-center gap-3">
        {/* Exit button */}
        <button
          onClick={onExit}
          className="p-2 rounded-lg hover:bg-slate-800/80 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer shrink-0"
          title="Exit to Landing Page"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand + venture */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-blue-600/15 border border-blue-500/25 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-bold text-white leading-tight truncate max-w-[160px]">
              {state.founder.ventureName || 'VentureLab'}
            </div>
            <div className="text-[10px] text-slate-500 leading-tight truncate max-w-[160px]">
              {state.founder.displayName} · {state.founder.category}
            </div>
          </div>
        </div>

        <div className="w-px h-5 bg-white/[0.06] shrink-0 mx-0.5" />

        {/* Location jump bar (desktop) */}
        <div className="hidden 2xl:flex items-center gap-0.5 overflow-x-auto flex-1">
          {locationsList.map((loc) => {
            const isActive = state.currentLocation === loc.id;
            const isDone = state.completedLocations.includes(loc.id);
            return (
              <button
                key={loc.id}
                onClick={() => onNavigate(loc.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                {isDone && !isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />}
                <span>{loc.label}</span>
              </button>
            );
          })}
        </div>

        {/* Spacer */}
        <div className="flex-1 2xl:flex-none" />

        {/* Metrics strip */}
        <div className="hidden md:flex items-center gap-1">
          {/* Cash */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-white/[0.06]">
            <Wallet className="w-3 h-3 text-slate-500" />
            <span className={`text-xs font-bold font-mono ${cashColor}`}>
              ₹{(results.remainingCash / 1000).toFixed(0)}k
            </span>
          </div>
          {/* Reputation */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-white/[0.06]">
            <ShieldCheck className="w-3 h-3 text-slate-500" />
            <span className="text-xs font-bold font-mono text-blue-400">
              {results.businessReputation}
            </span>
          </div>
          {/* Satisfaction */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-white/[0.06]">
            <HeartHandshake className="w-3 h-3 text-slate-500" />
            <span className="text-xs font-bold font-mono text-slate-300">
              {results.customerSatisfaction}%
            </span>
          </div>
        </div>

        <div className="hidden md:block w-px h-5 bg-white/[0.06] mx-0.5 shrink-0" />

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          {/* Mentor */}
          <button
            onClick={onToggleMentor}
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
            title="Mentor Priya — business guidance"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Mentor</span>
          </button>

          {/* Objectives */}
          <button
            onClick={onToggleObjectives}
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
            title="Objectives"
          >
            <ListChecks className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Goals</span>
          </button>

          {/* Team */}
          <button
            onClick={onOpenTeam}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 cursor-pointer transition-colors"
            title="Team Staffing"
          >
            <Users className="w-3.5 h-3.5" />
          </button>

          {/* Badges */}
          <button
            onClick={onOpenAchievements}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 cursor-pointer transition-colors relative"
            title={`Achievements (${unlockedBadges} unlocked)`}
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            {unlockedBadges > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-amber-500 text-[8px] font-bold text-slate-950 flex items-center justify-center">
                {unlockedBadges}
              </span>
            )}
          </button>

          {/* Journal */}
          {onOpenJournal && (
            <button
              onClick={onOpenJournal}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 cursor-pointer transition-colors relative"
              title="Decision Journal"
            >
              <BookOpen className="w-3.5 h-3.5 text-purple-400" />
              {state.decisionJournal && state.decisionJournal.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-purple-500 text-[8px] font-bold text-white flex items-center justify-center">
                  {state.decisionJournal.length}
                </span>
              )}
            </button>
          )}

          {/* Assumptions */}
          {onOpenAssumptions && (
            <button
              onClick={onOpenAssumptions}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 cursor-pointer transition-colors"
              title="Simulation Assumptions"
            >
              <Calculator className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          )}

          {/* Intern badge */}
          {state.internHired && (
            <div className="hidden xl:flex px-2 py-1 rounded-lg bg-amber-900/30 border border-amber-700/40 text-xs text-amber-300 items-center gap-1" title={`Intern: ${state.internHired.name}`}>
              <span className="text-sm">{state.internHired.avatar}</span>
              <span className="font-medium">{state.internHired.name.split(' ')[0]}</span>
            </div>
          )}

          <div className="w-px h-5 bg-white/[0.06] mx-0.5 shrink-0" />

          {/* Mode toggle */}
          <button
            onClick={onToggleMode}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors ${
              state.isDashboardOnlyMode
                ? 'bg-slate-800 text-slate-200'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
            }`}
            title="Toggle 3D / Dashboard mode"
          >
            {state.isDashboardOnlyMode ? (
              <Monitor className="w-3.5 h-3.5" />
            ) : (
              <Layers className="w-3.5 h-3.5" />
            )}
            <span className="hidden lg:inline">
              {state.isDashboardOnlyMode ? '2D' : '3D'}
            </span>
          </button>

          {/* Reset */}
          <button
            onClick={onReset}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800/80 cursor-pointer transition-colors"
            title="Restart Simulation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Location bar for smaller screens */}
      <div className="2xl:hidden border-t border-white/[0.05] overflow-x-auto flex items-center gap-0.5 py-1.5 -mx-4 sm:-mx-5 px-4 sm:px-5">
        {locationsList.map((loc) => {
          const isActive = state.currentLocation === loc.id;
          const isDone = state.completedLocations.includes(loc.id);
          return (
            <button
              key={loc.id}
              onClick={() => onNavigate(loc.id)}
              className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              {isDone && !isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />}
              <span>{loc.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
