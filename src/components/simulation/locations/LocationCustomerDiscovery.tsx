import React, { useState } from 'react';
import { 
  Compass, CheckCircle2, ArrowRight, Plus, 
  ChevronDown, ChevronUp 
} from 'lucide-react';
import type { 
  SimulationState, 
  SimulationLocationId 
} from '../../../simulation/types';
import { ALL_SCENARIOS } from '../../../simulation/scenarioData';
import { MODULE_MAP } from '../../../simulation/moduleData';
import { ModuleLearningHeader } from '../ui/ModuleLearningHeader';

interface LocationCustomerDiscoveryProps {
  state: SimulationState;
  setState: React.Dispatch<React.SetStateAction<SimulationState>>;
  onNavigate: (locationId: SimulationLocationId) => void;
  onOpenAssumptions?: () => void;
}

export const LocationCustomerDiscovery: React.FC<LocationCustomerDiscoveryProps> = ({
  state,
  setState,
  onNavigate,
  onOpenAssumptions,
}) => {
  const scenario = ALL_SCENARIOS[state.founder?.scenarioId || 'campus_meal'] || ALL_SCENARIOS.campus_meal;
  const [customIdeaInput, setCustomIdeaInput] = useState(state.customProblemText || '');
  const [showEvaluation, setShowEvaluation] = useState<string | null>(null);

  const handleSelectProblem = (probId: string) => {
    setState((prev) => {
      // Unlock Problem Finder achievement
      const updatedAchievements = prev.achievements.map((ach) =>
        ach.id === 'ach-problem-finder' ? { ...ach, unlocked: true, unlockedAt: new Date().toLocaleTimeString() } : ach
      );
      return {
        ...prev,
        selectedProblemId: probId,
        achievements: updatedAchievements,
        completedLocations: prev.completedLocations.includes('customer_discovery')
          ? prev.completedLocations
          : [...prev.completedLocations, 'customer_discovery'],
      };
    });
  };

  const handleSelectIdea = (ideaId: string) => {
    setState((prev) => ({
      ...prev,
      selectedIdeaId: ideaId,
    }));
  };

  const handleSaveCustomIdea = () => {
    setState((prev) => ({
      ...prev,
      customProblemText: customIdeaInput,
    }));
  };

  const currentModule = MODULE_MAP.mod_1_problem_discovery;

  const handleSaveReflection = (text: string) => {
    setState((prev) => ({
      ...prev,
      studentReflections: {
        ...prev.studentReflections,
        mod_1_problem_discovery: text,
      },
      completedModules: Array.from(new Set([...prev.completedModules, 'mod_1_problem_discovery'])),
    }));
  };

  return (
    <div className="space-y-8 text-left animate-in fade-in duration-200">
      {/* Module 1 Learning Header */}
      <ModuleLearningHeader
        module={currentModule}
        reflectionValue={state.studentReflections['mod_1_problem_discovery'] || ''}
        onSaveReflection={handleSaveReflection}
        isCompleted={Boolean(state.selectedProblemId)}
        onOpenAssumptions={onOpenAssumptions}
      />

      {/* Location Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-600" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">
              <Compass className="w-3.5 h-3.5" />
              LOCATION 02 // CUSTOMER DISCOVERY LAB
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Discover Problems & Explore Venture Ideas
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Active Scenario: <strong>{scenario.title}</strong> &bull; Challenge: {scenario.coreChallenge}
            </p>
          </div>

          {state.selectedProblemId && state.selectedIdeaId && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800 text-xs font-bold text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Problem & Solution Selected
            </span>
          )}
        </div>
      </div>

      {/* PART 1: CHOOSE A PROBLEM */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/60 flex items-center justify-center text-xs font-mono font-bold">1</span>
              <span>Identify a Customer Problem Worth Solving</span>
            </h3>
            <p className="text-xs text-slate-400">
              Select one of the observed friction points, or input your own custom hypothesis.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenario.problems.map((prob) => {
            const isSelected = state.selectedProblemId === prob.id;
            const evalOpen = showEvaluation === prob.id;
            return (
              <div
                key={prob.id}
                onClick={() => handleSelectProblem(prob.id)}
                className={`p-5 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-400 shadow-xl ring-1 ring-cyan-400/50'
                    : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                      Severity: {'★'.repeat(prob.severityRating)}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {prob.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {prob.description}
                    </p>
                  </div>

                  {/* Customer Quote */}
                  <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-[11px] text-slate-300 italic">
                    {prob.customerQuote}
                  </div>

                  <div className="text-[11px] text-slate-400">
                    <strong className="text-slate-300">Target Audience: </strong>
                    {prob.targetAudience}
                  </div>
                </div>

                {/* 5-Question Evaluation Accordion */}
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowEvaluation(evalOpen ? null : prob.id);
                    }}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 font-bold flex items-center justify-between w-full cursor-pointer"
                  >
                    <span>5-Question Evaluation Framework</span>
                    {evalOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {evalOpen && (
                    <div className="mt-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-[10px] text-slate-300">
                      <div>
                        <strong className="text-cyan-300">1. Understandable? </strong>
                        {prob.evaluationQuestions.understandable}
                      </div>
                      <div>
                        <strong className="text-cyan-300">2. Who experiences it? </strong>
                        {prob.evaluationQuestions.targetPersona}
                      </div>
                      <div>
                        <strong className="text-cyan-300">3. How frequent? </strong>
                        {prob.evaluationQuestions.frequency}
                      </div>
                      <div>
                        <strong className="text-cyan-300">4. Current alternatives? </strong>
                        {prob.evaluationQuestions.existingAlternatives}
                      </div>
                      <div>
                        <strong className="text-cyan-300">5. Why is a solution useful? </strong>
                        {prob.evaluationQuestions.whyUseful}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Idea Field required by Prompt Section 6 */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5 text-cyan-400" />
            Optional Custom Customer Problem Field (Recorded for your Capstone Deck):
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Students in evening shifts cannot find hot food after 8 PM..."
              value={customIdeaInput}
              onChange={(e) => setCustomIdeaInput(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
            <button
              onClick={handleSaveCustomIdea}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold cursor-pointer"
            >
              Save Idea Note
            </button>
          </div>
          <div className="text-[10px] text-slate-500 italic">
            Note: Custom text is stored for student reflection and final pitch slides.
          </div>
        </div>
      </div>

      {/* PART 2: SELECT A BUSINESS IDEA SOLUTION */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-800/60 flex items-center justify-center text-xs font-mono font-bold">2</span>
            <span>Choose Your Solution & Compare Business Ideas</span>
          </h3>
          <p className="text-xs text-slate-400">
            Compare solution vectors, revenue mechanics, and qualitative customer feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenario.ideas.map((idea) => {
            const isSelected = state.selectedIdeaId === idea.id;
            return (
              <div
                key={idea.id}
                onClick={() => handleSelectIdea(idea.id)}
                className={`p-5 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-indigo-400 shadow-xl ring-1 ring-indigo-400/50'
                    : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 border border-indigo-800/60 px-2 py-0.5 rounded">
                      {idea.badge}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {idea.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {idea.description}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1.5 text-[11px]">
                    <div>
                      <strong className="text-indigo-300">Revenue Model: </strong>
                      <span className="text-slate-300">{idea.revenueModel}</span>
                    </div>
                    <div>
                      <strong className="text-indigo-300">Operating Challenge: </strong>
                      <span className="text-slate-300">{idea.mainOperatingChallenge}</span>
                    </div>
                  </div>

                  {/* Customer Feedback Snippets */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                      Customer Persona Quotes:
                    </span>
                    {idea.simulatedCustomerFeedback.slice(0, 2).map((fb, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 text-[10px] text-slate-300 leading-snug">
                        <strong className="text-cyan-300">{fb.persona}: </strong>
                        &ldquo;{fb.quote}&rdquo;
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-400">
                  <span>{isSelected ? 'Solution Selected' : 'Select This Idea'}</span>
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
          Next Milestone: <strong>Product Development Lab</strong> to configure features.
        </div>
        <button
          onClick={() => onNavigate('product_dev')}
          disabled={!state.selectedProblemId || !state.selectedIdeaId}
          className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            state.selectedProblemId && state.selectedIdeaId
              ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span>Continue to Product Dev</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
