import React from 'react';
import { 
  Presentation, Award, Printer, 
  FileText, RotateCcw, Edit3, ArrowRight 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { 
  SimulationState, 
  PitchDeckData,
  SimulationLocationId 
} from '../../../simulation/types';
import { 
  calculateSimulationResults, 
  INVESTOR_PERSONAS 
} from '../../../simulation/simulationEngine';
import { MODULE_MAP } from '../../../simulation/moduleData';
import { ModuleLearningHeader } from '../ui/ModuleLearningHeader';

interface LocationInvestorArenaProps {
  state: SimulationState;
  setState: React.Dispatch<React.SetStateAction<SimulationState>>;
  onOpenReport: () => void;
  onReset: () => void;
  onNavigate?: (locationId: SimulationLocationId) => void;
  onOpenAssumptions?: () => void;
}

export const LocationInvestorArena: React.FC<LocationInvestorArenaProps> = ({
  state,
  setState,
  onOpenReport,
  onReset,
  onNavigate,
  onOpenAssumptions,
}) => {
  const results = calculateSimulationResults(state);
  const currentModule = MODULE_MAP.mod_9_pitch_presentation;

  const handleSaveReflection = (text: string) => {
    setState((prev) => ({
      ...prev,
      studentReflections: {
        ...prev.studentReflections,
        mod_9_pitch_presentation: text,
      },
      completedModules: Array.from(new Set([...prev.completedModules, 'mod_9_pitch_presentation'])),
    }));
  };
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [deckForm, setDeckForm] = useState<PitchDeckData>(() => ({
    businessName: state.pitchDeck.businessName || state.founder.ventureName || 'My Venture',
    problem: state.pitchDeck.problem || 'Students struggle to find affordable, punctual, healthy meals during short class breaks.',
    solution: state.pitchDeck.solution || 'A scheduled campus lunch subscription delivered directly to campus lockers with thermal insulation.',
    targetCustomer: state.pitchDeck.targetCustomer || '4,500 undergraduate hostellers and day scholars with tight lecture schedules.',
    valueProposition: state.pitchDeck.valueProposition || 'Guaranteed hot meals within 2 minutes of class dismissal under ₹95.',
    businessModel: state.pitchDeck.businessModel || 'Prepaid 5-day / 20-day passes with automated kitchen batch preparation.',
    pricingStrategy: state.pitchDeck.pricingStrategy || 'Tiered subscription pricing at ₹95/meal with 28% gross margin.',
    budgetAllocation: state.pitchDeck.budgetAllocation || `Allocated ₹1,00,000 seed budget with ₹${state.budget.emergencyReserve.toLocaleString('en-IN')} emergency contingency buffer.`,
    acquisitionStrategy: state.pitchDeck.acquisitionStrategy || 'Hostel student ambassadors, WhatsApp broadcast lists, and free lunch sampling kiosks.',
    mainRisks: state.pitchDeck.mainRisks || 'Mid-semester wholesale ingredient inflation and kitchen throughput bottlenecks during lunch break.',
    financialResults: state.pitchDeck.financialResults || `Projected monthly revenue of ₹${results.estimatedRevenue.toLocaleString('en-IN')} with ${results.runwayMonths} months runway.`,
    futurePlans: state.pitchDeck.futurePlans || 'Expand into dinner subscriptions and launch EcoLoop reusable thermal containers.',
  }));

  const [hasPresented, setHasPresented] = useState(state.isPitchCompleted);

  // Evaluate the 3 Investor Personas
  const advocateEval = INVESTOR_PERSONAS[0].evaluate(state);
  const thinkerEval = INVESTOR_PERSONAS[1].evaluate(state);
  const builderEval = INVESTOR_PERSONAS[2].evaluate(state);

  const averageScore = results.investorScore || Math.round((advocateEval.score + thinkerEval.score + builderEval.score) / 3);

  const handleDeliverPitch = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    setState((prev) => {
      const updatedAchievements = prev.achievements.map((ach) =>
        ach.id === 'ach-pitch-ready'
          ? { ...ach, unlocked: true, unlockedAt: new Date().toLocaleTimeString() }
          : ach
      );

      return {
        ...prev,
        isPitchCompleted: true,
        pitchDeck: deckForm,
        finalResults: results,
        achievements: updatedAchievements,
        completedLocations: prev.completedLocations.includes('investor_arena')
          ? prev.completedLocations
          : [...prev.completedLocations, 'investor_arena'],
        completedModules: Array.from(new Set([...prev.completedModules, 'mod_9_pitch_presentation'])),
      };
    });

    setHasPresented(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const slides = [
    { label: '1. Venture Identity', key: 'businessName' as const, sub: 'Company & Vision', content: deckForm.businessName },
    { label: '2. The Problem', key: 'problem' as const, sub: 'Customer Pain Point', content: deckForm.problem },
    { label: '3. Target Customer', key: 'targetCustomer' as const, sub: 'Customer Persona', content: deckForm.targetCustomer },
    { label: '4. The Solution', key: 'solution' as const, sub: 'Product Architecture', content: deckForm.solution },
    { label: '5. Value Proposition', key: 'valueProposition' as const, sub: 'Unique Advantage', content: deckForm.valueProposition },
    { label: '6. Business Model', key: 'businessModel' as const, sub: 'Revenue Architecture', content: deckForm.businessModel },
    { label: '7. Pricing Strategy', key: 'pricingStrategy' as const, sub: 'Unit Economics', content: deckForm.pricingStrategy },
    { label: '8. Budget Allocation', key: 'budgetAllocation' as const, sub: 'Capital Management', content: deckForm.budgetAllocation },
    { label: '9. Customer Acquisition', key: 'acquisitionStrategy' as const, sub: 'Go-To-Market', content: deckForm.acquisitionStrategy },
    { label: '10. Main Risks & Bottlenecks', key: 'mainRisks' as const, sub: 'Risk Mitigation', content: deckForm.mainRisks },
    { label: '11. Financial Results & Future Plans', key: 'financialResults' as const, sub: 'Runway & Growth', content: `${deckForm.financialResults} Next Step: ${deckForm.futurePlans}` },
  ];

  return (
    <div className="space-y-8 text-left animate-in fade-in duration-200">
      {/* Module 9 Learning Header */}
      <ModuleLearningHeader
        module={currentModule}
        reflectionValue={state.studentReflections['mod_9_pitch_presentation'] || ''}
        onSaveReflection={handleSaveReflection}
        isCompleted={hasPresented || state.isPitchCompleted}
        onOpenAssumptions={onOpenAssumptions}
      />

      {/* Location Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">
              <Presentation className="w-3.5 h-3.5" />
              LOCATION 09 // THE INVESTOR ARENA & CAPSTONE
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Defend Your Venture to the Investor Panel
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Present your business model, defend your financial trade-offs, and receive structured diagnostic feedback.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isEditing ? 'Preview Mode' : 'Edit Slides'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-indigo-400" />
              <span>Print Deck</span>
            </button>
          </div>
        </div>
      </div>

      {/* Disclaimers required by Prompt Section 17 */}
      <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Educational Evaluation Standard:</strong> Simulated panel feedback does not represent a real commercial investment decision or guaranteed funding. The goal is to strengthen strategic reasoning, capital discipline, and articulate communication.
          </span>
        </div>
      </div>

      {/* 3D Tiered Presentation Screen Container */}
      <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
              Venture Presentation Pitch Deck
            </span>
            <h3 className="text-xl font-bold text-white">
              {deckForm.businessName} &bull; Executive Pitch Narrative
            </h3>
          </div>

          {/* Slide Tab Buttons */}
          <div className="flex flex-wrap gap-1.5">
            {slides.map((s, idx) => (
              <button
                key={s.label}
                onClick={() => setActiveSlideIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeSlideIndex === idx
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Slide 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Current Slide Display / Edit Form */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono text-cyan-400 uppercase font-bold">
              Slide 0{activeSlideIndex + 1} &mdash; {slides[activeSlideIndex].label}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {slides[activeSlideIndex].sub}
            </span>
          </div>

          {isEditing ? (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-mono uppercase font-bold">
                  Edit Content for {slides[activeSlideIndex].label}:
                </label>
                <textarea
                  rows={4}
                  value={deckForm[slides[activeSlideIndex].key as keyof PitchDeckData]}
                  onChange={(e) =>
                    setDeckForm({
                      ...deckForm,
                      [slides[activeSlideIndex].key]: e.target.value,
                    })
                  }
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
                &ldquo;{slides[activeSlideIndex].content}&rdquo;
              </p>

              {slides[activeSlideIndex].customer && (
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                  <strong className="text-cyan-300">Target Segment: </strong>
                  {slides[activeSlideIndex].customer}
                </div>
              )}

              {slides[activeSlideIndex].future && (
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                  <strong className="text-cyan-300">Future Direction & Scaling: </strong>
                  {slides[activeSlideIndex].future}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Deliver Pitch Action */}
        {!hasPresented && (
          <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-cyan-200">
              Ready to present to the simulated investor panel? Click below to finalize your capstone evaluation.
            </div>
            <button
              onClick={handleDeliverPitch}
              className="px-7 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-cyan-950/60 transition-transform hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <Presentation className="w-4 h-4" />
              <span>Deliver Presentation to Panel</span>
            </button>
          </div>
        )}
      </div>

      {/* The 3 Investor Personas Panel Feedback required by Prompt Section 17 */}
      {hasPresented && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                Evaluation Synthesis
              </span>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>Simulated Investor Panel Verdict: {averageScore} / 100</span>
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onReset}
                className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer flex items-center gap-2"
                title="Reset simulation and start a fresh venture"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>Start New Venture</span>
              </button>

              <button
                onClick={onOpenReport}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>View Comprehensive Report</span>
              </button>
            </div>
          </div>

          {/* Grid of 3 Personas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Persona 1: Customer Advocate */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{INVESTOR_PERSONAS[0].name}</h4>
                  <span className="text-[10px] text-cyan-400 font-mono block">{INVESTOR_PERSONAS[0].archetype}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-emerald-400 font-mono">{advocateEval.score}/100</span>
                  <span className="text-[10px] text-slate-500 block">{advocateEval.sentiment}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-snug">
                <strong className="text-cyan-300 block mb-1">Key Observation:</strong>
                {advocateEval.keyObservation}
              </div>

              <div className="text-[11px] text-slate-400 leading-snug">
                <strong className="text-slate-300">Actionable Advice: </strong>
                {advocateEval.actionableAdvice}
              </div>
            </div>

            {/* Persona 2: Financial Thinker */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{INVESTOR_PERSONAS[1].name}</h4>
                  <span className="text-[10px] text-indigo-400 font-mono block">{INVESTOR_PERSONAS[1].archetype}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-cyan-400 font-mono">{thinkerEval.score}/100</span>
                  <span className="text-[10px] text-slate-500 block">{thinkerEval.sentiment}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-snug">
                <strong className="text-indigo-300 block mb-1">Key Observation:</strong>
                {thinkerEval.keyObservation}
              </div>

              <div className="text-[11px] text-slate-400 leading-snug">
                <strong className="text-slate-300">Actionable Advice: </strong>
                {thinkerEval.actionableAdvice}
              </div>
            </div>

            {/* Persona 3: Strategic Builder */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{INVESTOR_PERSONAS[2].name}</h4>
                  <span className="text-[10px] text-violet-400 font-mono block">{INVESTOR_PERSONAS[2].archetype}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-emerald-400 font-mono">{builderEval.score}/100</span>
                  <span className="text-[10px] text-slate-500 block">{builderEval.sentiment}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-snug">
                <strong className="text-violet-300 block mb-1">Key Observation:</strong>
                {builderEval.keyObservation}
              </div>

              <div className="text-[11px] text-slate-400 leading-snug">
                <strong className="text-slate-300">Actionable Advice: </strong>
                {builderEval.actionableAdvice}
              </div>
            </div>
          </div>

          {/* Business Ending Badge & Verdict (Requirement 11) */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border border-blue-800/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-blue-900/80 text-blue-300 font-bold uppercase tracking-wider">
                Simulation Outcome: {results.ending.badge}
              </span>
              <span className="text-xs font-mono font-bold text-cyan-400">
                {results.ending.title}
              </span>
            </div>
            <p className="text-sm font-semibold text-white">
              {results.ending.summary}
            </p>
            <p className="text-xs text-slate-300 italic pt-1 border-t border-slate-800/80">
              &bull; Pedagogical Verdict: {results.ending.pedagogicalVerdict}
            </p>
          </div>

          {/* 6 Structured Evaluation Categories (Requirement 13) */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Transparent 6-Category Pitch Evaluation Rubric</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Comprehensive assessment across problem understanding, unit economics, execution, and ethics.
                </p>
              </div>
              <span className="text-xs font-mono font-black text-emerald-400">
                Total Score: {averageScore} / 100
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {results.rubricBreakdown.map((category) => {
                const scorePercent = Math.round((category.achievedScore / category.maxScore) * 100);

                return (
                  <div
                    key={category.id}
                    className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{category.name}</span>
                      <span className="text-xs font-mono font-black text-cyan-400">
                        {category.achievedScore} / {category.maxScore} pts
                      </span>
                    </div>

                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-cyan-400 h-full rounded-full transition-all duration-300"
                        style={{ width: `${scorePercent}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-400 leading-snug">
                      {category.criteriaDescription}
                    </p>

                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-amber-200/90 italic leading-snug">
                      &bull; Investor Note: {category.feedback}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Navigation to Module 10: Capstone Reflection & Portfolio Review */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="text-xs text-slate-400">
          Capstone Milestone: <strong>Module 10 (Reflection & Review)</strong> to evaluate your 4-level rubric assessment and export the Venture Portfolio.
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onOpenReport}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Open Portfolio Modal</span>
          </button>
          {onNavigate && (
            <button
              onClick={() => onNavigate('reflection_review')}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Continue to Module 10 Review</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
