import React, { useState } from 'react';
import { 
  Users, CheckCircle2, ArrowRight, 
  ShieldCheck, Quote 
} from 'lucide-react';
import type { 
  SimulationState, 
  SimulationLocationId 
} from '../../../simulation/types';
import { ALL_SCENARIOS } from '../../../simulation/scenarioData';
import { MODULE_MAP } from '../../../simulation/moduleData';
import { ModuleLearningHeader } from '../ui/ModuleLearningHeader';

interface LocationCustomerInsightsProps {
  state: SimulationState;
  setState: React.Dispatch<React.SetStateAction<SimulationState>>;
  onNavigate: (locationId: SimulationLocationId) => void;
  onOpenAssumptions?: () => void;
}

export const LocationCustomerInsights: React.FC<LocationCustomerInsightsProps> = ({
  state,
  setState,
  onNavigate,
  onOpenAssumptions,
}) => {
  const scenario = ALL_SCENARIOS[state.founder?.scenarioId || 'campus_meal'] || ALL_SCENARIOS.campus_meal;
  const [activePersonaId, setActivePersonaId] = useState(scenario.personas[0]?.id || '');
  const [selectedQuestionId, setSelectedQuestionId] = useState(scenario.interviewQuestions[0]?.id || '');

  const activePersona = scenario.personas.find((p) => p.id === activePersonaId) || scenario.personas[0];
  const activeQuestion = scenario.interviewQuestions.find((q) => q.id === selectedQuestionId) || scenario.interviewQuestions[0];

  const currentAnswer = activeQuestion?.answerMap[activePersona?.id] || 'No response recorded.';

  const handleAskQuestion = (personaId: string, questionId: string) => {
    setActivePersonaId(personaId);
    setSelectedQuestionId(questionId);

    setState((prev) => {
      const alreadyAsked = prev.interviewedPersonaQuestions.some(
        (pair) => pair.personaId === personaId && pair.questionId === questionId
      );
      const newInterviews = alreadyAsked
        ? prev.interviewedPersonaQuestions
        : [...prev.interviewedPersonaQuestions, { personaId, questionId }];

      // Unlock Customer Champion achievement once at least 2 questions are asked
      const updatedAchievements = prev.achievements.map((ach) =>
        ach.id === 'ach-customer-champion' && newInterviews.length >= 2
          ? { ...ach, unlocked: true, unlockedAt: new Date().toLocaleTimeString() }
          : ach
      );

      return {
        ...prev,
        interviewedPersonaQuestions: newInterviews,
        achievements: updatedAchievements,
        completedLocations: prev.completedLocations.includes('customer_insights')
          ? prev.completedLocations
          : [...prev.completedLocations, 'customer_insights'],
      };
    });
  };

  const askedCount = state.interviewedPersonaQuestions.length;

  const currentModule = MODULE_MAP.mod_2_customer_research;

  const handleSaveReflection = (text: string) => {
    setState((prev) => ({
      ...prev,
      studentReflections: {
        ...prev.studentReflections,
        mod_2_customer_research: text,
      },
      completedModules: Array.from(new Set([...prev.completedModules, 'mod_2_customer_research'])),
    }));
  };

  return (
    <div className="space-y-8 text-left animate-in fade-in duration-200">
      {/* Module 2 Learning Header */}
      <ModuleLearningHeader
        module={currentModule}
        reflectionValue={state.studentReflections['mod_2_customer_research'] || ''}
        onSaveReflection={handleSaveReflection}
        isCompleted={state.interviewedPersonaQuestions.length >= 2}
        onOpenAssumptions={onOpenAssumptions}
      />

      {/* Location Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-400">
              <Users className="w-3.5 h-3.5" />
              LOCATION 07 // CUSTOMER INSIGHTS LAB
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Virtual Customer Persona Interviews
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Interview fictional campus customers to validate willingness to pay, discover friction points, and eliminate assumptions.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-right shrink-0">
            <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">
              Interviews Completed:
            </div>
            <div className="text-2xl font-black text-indigo-400">
              {askedCount} <span className="text-xs text-slate-500 font-normal">queries asked</span>
            </div>
            <div className="text-[10px] font-mono text-emerald-400">
              {askedCount >= 2 ? 'Customer Validation Validated' : 'Ask at least 2 questions'}
            </div>
          </div>
        </div>
      </div>

      {/* Label indicating fictional simulation characters as required by Prompt Section 11 */}
      <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            <strong>Educational Context:</strong> These characters are pre-modeled fictional personas illustrating diverse student archetypes. In real entrepreneurship, qualitative customer discovery requires speaking directly with actual users.
          </span>
        </div>
      </div>

      {/* Main Interactive Interview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Persona Selectors */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Select Customer Persona to Interview:
          </span>

          {scenario.personas.map((persona) => {
            const isSelected = activePersonaId === persona.id;
            const askedForThisPersona = state.interviewedPersonaQuestions.filter((p) => p.personaId === persona.id).length;

            return (
              <div
                key={persona.id}
                onClick={() => setActivePersonaId(persona.id)}
                className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-indigo-400 shadow-xl ring-1 ring-indigo-400/50'
                    : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs">
                      {persona.name[0]}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{persona.name}</h4>
                      <span className="text-[10px] text-indigo-300 font-mono block">{persona.role}</span>
                    </div>
                  </div>

                  {askedForThisPersona > 0 && (
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      {askedForThisPersona} Asked
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                  {persona.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Interactive Interview Terminal & Question Buttons */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800/60 flex items-center justify-center font-bold text-sm">
                {activePersona.name[0]}
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Interviewing: {activePersona.name} ({activePersona.role})
                </h3>
                <div className="text-xs text-slate-400">
                  Daily Workaround: {activePersona.currentAlternative}
                </div>
              </div>
            </div>

            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-800 px-2.5 py-1 rounded-full">
              Live Dialogue
            </span>
          </div>

          {/* Question Selector Buttons */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block">
              Choose Question to Ask {activePersona.name}:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {scenario.interviewQuestions.map((q) => {
                const isCurrentQ = selectedQuestionId === q.id;
                const wasAsked = state.interviewedPersonaQuestions.some(
                  (pair) => pair.personaId === activePersonaId && pair.questionId === q.id
                );

                return (
                  <button
                    key={q.id}
                    onClick={() => handleAskQuestion(activePersonaId, q.id)}
                    className={`p-3 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer flex items-center justify-between ${
                      isCurrentQ
                        ? 'bg-indigo-950 border-indigo-400 text-white shadow-md'
                        : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{q.questionText}</span>
                    {wasAsked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Persona's Simulated Response Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                <Quote className="w-3.5 h-3.5" />
                Response from {activePersona.name}:
              </span>
              <span className="text-[10px] text-slate-500">
                Pre-modeled Simulation Response
              </span>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed italic bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
              &ldquo;{currentAnswer}&rdquo;
            </p>

            {/* Strategic Summary for this Persona */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
              <div>
                <strong className="text-indigo-300">Ideal Solution: </strong>
                <span className="text-slate-300">{activePersona.idealSolution}</span>
              </div>
              <div>
                <strong className="text-indigo-300">Adoption Blocker: </strong>
                <span className="text-slate-300">{activePersona.blockersToAdoption}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Target Customer Segment Designation (Requirement 8) */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold">
              CUSTOMER SEGMENT VALIDATION
            </span>
            <h3 className="text-base font-bold text-white">
              Designate Primary Target Customer Segment
            </h3>
            <p className="text-xs text-slate-300">
              Based on your interview findings, choose which student segment your product will prioritize for launch.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 font-bold">
            {state.selectedCustomerSegmentId ? 'Segment Designated' : 'Select Segment Below'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {scenario.personas.map((persona) => {
            const isSelected = state.selectedCustomerSegmentId === persona.id;
            return (
              <button
                key={persona.id}
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    selectedCustomerSegmentId: persona.id,
                  }))
                }
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-indigo-950/60 border-indigo-400 shadow-md ring-1 ring-indigo-400/50'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-white">{persona.name}</div>
                  <div className="text-[10px] text-slate-400">{persona.role}</div>
                </div>
                {isSelected ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                ) : (
                  <span className="text-[10px] font-mono text-slate-500">Select</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div className="text-xs text-slate-400">
          Interview Queries Recorded: <strong>{askedCount}</strong> &bull; Segment: <strong>{state.selectedCustomerSegmentId || 'Pending'}</strong>
        </div>
        <button
          onClick={() => onNavigate('product_dev')}
          className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center gap-2"
        >
          <span>Continue to Product Lab</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
