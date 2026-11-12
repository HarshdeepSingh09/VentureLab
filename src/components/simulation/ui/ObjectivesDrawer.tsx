import React from 'react';
import {
  CheckCircle2,
  Circle,
  Lock,
  ArrowRight,
  X,
  Target,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import type { SimulationState, SimulationLocationId, MissionId, MissionStatus } from '../../../simulation/types';
import { ALL_MISSIONS } from '../../../simulation/missionData';

interface ObjectivesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  state: SimulationState;
  onNavigate: (locationId: SimulationLocationId) => void;
}

export const ObjectivesDrawer: React.FC<ObjectivesDrawerProps> = ({
  isOpen,
  onClose,
  state,
  onNavigate,
}) => {
  if (!isOpen) return null;

  // Determine dynamic mission status based on actual state if not yet marked in state.missions
  const getDynamicMissionStatus = (id: MissionId, index: number): MissionStatus => {
    // Check state.missions if defined
    if (state.missions && state.missions[id] === 'completed') return 'completed';

    switch (id) {
      case 'find_problem':
        return state.selectedProblemId ? 'completed' : 'active';
      case 'interview_customers':
        if (state.interviewedPersonaQuestions.length >= 2 || state.selectedCustomerSegmentId) return 'completed';
        return state.selectedProblemId ? 'active' : 'locked';
      case 'design_product':
        if (state.selectedFeatureIds.length > 0 && state.selectedSupplierOfferId) return 'completed';
        if (state.selectedFeatureIds.length > 0) return 'active';
        return state.interviewedPersonaQuestions.length >= 1 ? 'active' : 'locked';
      case 'plan_budget':
        const totalBudgetAllocated =
          state.budget.productDevelopment +
          state.budget.marketing +
          state.budget.operations +
          state.budget.customerSupport +
          state.budget.emergencyReserve;
        if (totalBudgetAllocated > 0 && state.selectedFeatureIds.length > 0) return 'completed';
        return state.selectedFeatureIds.length > 0 ? 'active' : 'locked';
      case 'first_customers':
        if (Object.values(state.selectedMarketingChannels).some((v) => v > 0)) return 'completed';
        return state.budget.marketing > 0 ? 'active' : 'locked';
      case 'business_crisis':
        if (state.resolvedEvents.length > 0) return 'completed';
        return Object.values(state.selectedMarketingChannels).some((v) => v > 0) ? 'active' : 'locked';
      case 'respond_competitor':
        if (state.selectedCompetitionChoice) return 'completed';
        return state.resolvedEvents.length > 0 ? 'active' : 'locked';
      case 'prepare_pitch':
        if (state.isPitchCompleted) return 'completed';
        return state.selectedCompetitionChoice ? 'active' : 'locked';
      default:
        return 'locked';
    }
  };

  const missionsWithStatus = ALL_MISSIONS.map((mission, idx) => ({
    ...mission,
    status: getDynamicMissionStatus(mission.id, idx),
  }));

  const completedCount = missionsWithStatus.filter((m) => m.status === 'completed').length;
  const progressPercent = Math.round((completedCount / ALL_MISSIONS.length) * 100);

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-slate-950/95 backdrop-blur-xl border-l border-slate-800 shadow-2xl p-6 flex flex-col justify-between text-left animate-in slide-in-from-right duration-200">
      <div className="space-y-5 overflow-y-auto pr-1">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5" />
              <span>VENTURELAB MISSION SYSTEM</span>
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mt-0.5">
              <span>8 Entrepreneurial Milestones</span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Overview Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Venture Launch Readiness</span>
            </span>
            <span className="font-mono text-cyan-400 font-bold">
              {completedCount} / {ALL_MISSIONS.length} Completed ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-300 shadow-sm shadow-cyan-500/50"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>Classroom curriculum roadmap</span>
            <span className="text-slate-500 font-mono">Classes 9–12</span>
          </div>
        </div>

        {/* Missions List */}
        <div className="space-y-3">
          {missionsWithStatus.map((mission) => {
            const isCompleted = mission.status === 'completed';
            const isActive = mission.status === 'active';
            const isLocked = mission.status === 'locked';

            return (
              <div
                key={mission.id}
                onClick={() => {
                  if (!isLocked) {
                    onNavigate(mission.locationId);
                    onClose();
                  }
                }}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col gap-2 group ${
                  isCompleted
                    ? 'bg-slate-900/60 border-emerald-900/50 hover:border-emerald-600/80 cursor-pointer'
                    : isActive
                    ? 'bg-blue-950/30 border-blue-600/60 hover:border-blue-400 shadow-lg shadow-blue-950/40 cursor-pointer'
                    : 'bg-slate-900/30 border-slate-800/60 opacity-65 cursor-not-allowed'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : isActive ? (
                      <Circle className="w-4 h-4 text-blue-400 shrink-0 animate-pulse" />
                    ) : (
                      <Lock className="w-4 h-4 text-slate-600 shrink-0" />
                    )}
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 mr-2">
                        STEP 0{mission.stepNumber}
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          isCompleted
                            ? 'text-slate-300'
                            : isActive
                            ? 'text-white'
                            : 'text-slate-500'
                        }`}
                      >
                        {mission.title}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                        : isActive
                        ? 'bg-blue-950 text-blue-300 border border-blue-800 animate-pulse'
                        : 'bg-slate-800/80 text-slate-500 border border-slate-700/50'
                    }`}
                  >
                    {mission.status}
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed pl-6.5">
                  {mission.objective}
                </p>

                {/* Pedagogical Takeaway Pill */}
                <div className="ml-6.5 pt-1 border-t border-slate-800/60 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400 flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-cyan-400" />
                    <span className="italic">{mission.learningTakeaway}</span>
                  </span>
                  {!isLocked && (
                    <span className="text-cyan-400 font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shrink-0 ml-2">
                      <span>Enter</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Drawer Footer */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-500">Objective-Based Simulation</span>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold cursor-pointer transition-colors"
        >
          Close Roadmap
        </button>
      </div>
    </div>
  );
};

