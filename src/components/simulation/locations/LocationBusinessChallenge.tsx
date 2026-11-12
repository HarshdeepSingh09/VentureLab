import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Heart,
  DollarSign,
  Scale,
  Sparkles,
  Zap,
} from 'lucide-react';
import type {
  SimulationState,
  SimulationLocationId,
  DynamicEvent,
} from '../../../simulation/types';
import { CRISIS_EVENTS, ALL_ETHICS_OPTIONS } from '../../../simulation/scenarioData';
import { MODULE_MAP } from '../../../simulation/moduleData';
import { ModuleLearningHeader } from '../ui/ModuleLearningHeader';

interface LocationBusinessChallengeProps {
  state: SimulationState;
  setState: React.Dispatch<React.SetStateAction<SimulationState>>;
  onNavigate: (locationId: SimulationLocationId) => void;
  onOpenAssumptions?: () => void;
}

export const LocationBusinessChallenge: React.FC<LocationBusinessChallengeProps> = ({
  state,
  setState,
  onNavigate,
  onOpenAssumptions,
}) => {
  const [selectedEventId, setSelectedEventId] = useState<string>(
    CRISIS_EVENTS[0]?.id || 'crisis-supplier-price'
  );
  const [activeTab, setActiveTab] = useState<'crises' | 'ethics'>('crises');

  const currentEvent =
    CRISIS_EVENTS.find((e) => e.id === selectedEventId) || CRISIS_EVENTS[0];

  const resolvedForCurrent = state.resolvedEvents.find(
    (r) => r.eventId === currentEvent.id
  );

  const handleChooseResolution = (choiceId: string) => {
    setState((prev) => {
      const filtered = prev.resolvedEvents.filter((r) => r.eventId !== currentEvent.id);
      const newResolved = [...filtered, { eventId: currentEvent.id, choiceId }];

      // Unlock Crisis Resilience achievement if at least 1 crisis resolved
      const updatedAchievements = prev.achievements.map((ach) =>
        ach.id === 'ach-resilient-crisis'
          ? { ...ach, unlocked: true, unlockedAt: new Date().toLocaleTimeString() }
          : ach
      );

      return {
        ...prev,
        resolvedEvents: newResolved,
        achievements: updatedAchievements,
        completedLocations: prev.completedLocations.includes('business_challenge')
          ? prev.completedLocations
          : [...prev.completedLocations, 'business_challenge'],
      };
    });
  };

  const handleToggleEthicsChoice = (category: string, choiceId: string) => {
    setState((prev) => {
      const isSelected = prev.selectedEthicsChoices[category] === choiceId;
      const updated = { ...prev.selectedEthicsChoices };
      if (isSelected) {
        delete updated[category];
      } else {
        updated[category] = choiceId;
      }

      // Unlock Ethical Steward achievement if at least 2 ethical choices made
      const updatedAchievements = prev.achievements.map((ach) =>
        ach.id === 'ach-ethical-steward' && Object.keys(updated).length >= 2
          ? { ...ach, unlocked: true, unlockedAt: new Date().toLocaleTimeString() }
          : ach
      );

      return {
        ...prev,
        selectedEthicsChoices: updated,
        achievements: updatedAchievements,
        completedLocations: prev.completedLocations.includes('business_challenge')
          ? prev.completedLocations
          : [...prev.completedLocations, 'business_challenge'],
      };
    });
  };

  const resolvedCrisisCount = state.resolvedEvents.length;
  const ethicsChoicesCount = Object.keys(state.selectedEthicsChoices || {}).length;

  const currentModule = MODULE_MAP.mod_5_business_model;

  const handleSaveReflection = (text: string) => {
    setState((prev) => ({
      ...prev,
      studentReflections: {
        ...prev.studentReflections,
        mod_5_business_model: text,
      },
      completedModules: Array.from(new Set([...prev.completedModules, 'mod_5_business_model'])),
    }));
  };

  return (
    <div className="space-y-8 text-left animate-in fade-in duration-200">
      {/* Module 5 Learning Header */}
      <ModuleLearningHeader
        module={currentModule}
        reflectionValue={state.studentReflections['mod_5_business_model'] || ''}
        onSaveReflection={handleSaveReflection}
        isCompleted={resolvedCrisisCount > 0}
        onOpenAssumptions={onOpenAssumptions}
      />

      {/* Location Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-amber-500 to-indigo-500" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-800/60 text-[10px] font-mono font-bold uppercase tracking-widest text-rose-400">
              <AlertTriangle className="w-3.5 h-3.5" />
              LOCATION 07 // BUSINESS CHALLENGE & CRISIS ROOM
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Navigate Unpredictable Shocks & Dilemmas
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Real ventures face supply bottlenecks, price hikes, sudden spikes, and ethical trade-offs. Your decisions here directly impact cash, customer trust, and operational resilience.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-right shrink-0">
            <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">
              Challenges Resolved:
            </div>
            <div className="text-2xl font-black text-rose-400">
              {resolvedCrisisCount} <span className="text-xs text-slate-400 font-normal">/ {CRISIS_EVENTS.length} Crises</span>
            </div>
            <div className="text-[10px] font-mono text-cyan-400">
              {ethicsChoicesCount} Ethical Stances Adopted
            </div>
          </div>
        </div>
      </div>

      {/* Mode Tabs: Crisis Events vs Ethics & Sustainability */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('crises')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'crises'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Operational & Market Crises ({CRISIS_EVENTS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('ethics')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'ethics'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Ethics, Governance & ESG ({ALL_ETHICS_OPTIONS.length})</span>
        </button>
      </div>

      {/* Tab 1: Operational & Market Crises */}
      {activeTab === 'crises' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Event List */}
          <div className="lg:col-span-4 space-y-2.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Select Crisis Scenario:
            </span>

            {CRISIS_EVENTS.map((ev) => {
              const isSelected = selectedEventId === ev.id;
              const isResolved = state.resolvedEvents.some((r) => r.eventId === ev.id);

              return (
                <div
                  key={ev.id}
                  onClick={() => setSelectedEventId(ev.id)}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-rose-500 shadow-xl ring-1 ring-rose-500/50'
                      : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold uppercase">
                      {ev.badge}
                    </span>
                    {isResolved && (
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Resolved</span>
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{ev.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-snug">
                    {ev.situation}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Crisis Workspace */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold">
                  {currentEvent.badge}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {currentEvent.title}
                </h3>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-400">
                Deterministic Simulator
              </span>
            </div>

            {/* Situation Explainer */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-200">The Situation:</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentEvent.situation}
              </p>
              <div className="text-xs text-amber-300 font-medium pt-2 border-t border-slate-800/80">
                <strong>Why it matters:</strong> {currentEvent.whyItMatters}
              </div>
            </div>

            {/* Strategic Choices */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block">
                Choose Strategic Response:
              </span>

              <div className="grid grid-cols-1 gap-3">
                {currentEvent.choices.map((choice) => {
                  const isSelected = resolvedForCurrent?.choiceId === choice.id;

                  return (
                    <div
                      key={choice.id}
                      onClick={() => handleChooseResolution(choice.id)}
                      className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-rose-950/40 border-rose-500 shadow-xl ring-1 ring-rose-500/50'
                          : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-white flex items-center gap-2">
                            <span>{choice.label}</span>
                            {isSelected && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            )}
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {choice.actionSummary}
                          </p>
                        </div>
                      </div>

                      {/* Consequences Badges */}
                      <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-3 text-[11px]">
                        <span
                          className={`font-mono font-bold flex items-center gap-1 ${
                            choice.cashEffect < 0
                              ? 'text-rose-400'
                              : choice.cashEffect > 0
                              ? 'text-emerald-400'
                              : 'text-slate-400'
                          }`}
                        >
                          <DollarSign className="w-3.5 h-3.5" />
                          <span>
                            Cash: {choice.cashEffect > 0 ? '+' : ''}₹{choice.cashEffect.toLocaleString('en-IN')}
                          </span>
                        </span>

                        <span
                          className={`font-mono font-bold flex items-center gap-1 ${
                            choice.satisfactionEffect < 0
                              ? 'text-rose-400'
                              : choice.satisfactionEffect > 0
                              ? 'text-cyan-400'
                              : 'text-slate-400'
                          }`}
                        >
                          <Heart className="w-3.5 h-3.5" />
                          <span>
                            Satisfaction: {choice.satisfactionEffect > 0 ? '+' : ''}{choice.satisfactionEffect}%
                          </span>
                        </span>

                        {choice.capacityEffect !== 0 && (
                          <span
                            className={`font-mono font-bold flex items-center gap-1 ${
                              choice.capacityEffect < 0 ? 'text-amber-400' : 'text-blue-400'
                            }`}
                          >
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>
                              Capacity: {choice.capacityEffect > 0 ? '+' : ''}{choice.capacityEffect} units
                            </span>
                          </span>
                        )}
                      </div>

                      {/* Pedagogical Takeaway */}
                      <div className="mt-2 text-[10px] text-slate-400 italic">
                        &bull; Takeaway: {choice.takeaway}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Ethics, Governance & ESG */}
      {activeTab === 'ethics' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-indigo-200">
            <strong>Pedagogical Objective:</strong> Entrepreneurship is not just about making money; it is about building enduring institutions with integrity. Choose ethical stances for your venture. Principled choices may carry minor cash costs upfront, but dramatically improve Business Reputation and student brand advocacy.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ALL_ETHICS_OPTIONS.map((opt) => {
              const isSelected = state.selectedEthicsChoices[opt.category] === opt.id;

              return (
                <div
                  key={opt.id}
                  onClick={() => handleToggleEthicsChoice(opt.category, opt.id)}
                  className={`p-5 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-950/50 border-indigo-500 shadow-xl ring-1 ring-indigo-500/50'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-indigo-400 font-bold uppercase">
                        {opt.category}
                      </span>
                      {isSelected ? (
                        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Active Policy</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-500">Click to Adopt</span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-white">{opt.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {opt.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
                    <div className="flex items-center gap-3 text-[11px] font-mono">
                      <span className="text-emerald-400 font-bold">
                        Reputation: +{opt.reputationImpact} pts
                      </span>
                      <span className="text-cyan-400 font-bold">
                        Satisfaction: +{opt.satisfactionImpact}%
                      </span>
                      {opt.costImpact !== 0 && (
                        <span className="text-rose-400 font-bold">
                          Cost: ₹{Math.abs(opt.costImpact).toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    <p className="text-[10px] text-slate-400 italic">
                      &bull; Consequence: {opt.consequenceExplanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div className="text-xs text-slate-400">
          Resolved: <strong>{resolvedCrisisCount} Crises</strong>, <strong>{ethicsChoicesCount} Ethical Policies</strong>.
        </div>
        <button
          onClick={() => onNavigate('competition_hub')}
          className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center gap-2"
        >
          <span>Continue to Competition Hub</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
