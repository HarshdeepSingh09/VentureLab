import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  Printer, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  FileText,
  Sliders,
  Check,
  Save,
  MessageSquare,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import type { SimulationState, SimulationLocationId } from '../../../simulation/types';
import { ALL_LEARNING_MODULES, MODULE_MAP } from '../../../simulation/moduleData';
import { evaluateStudentAssessment } from '../../../simulation/assessmentEngine';
import { ModuleLearningHeader } from '../ui/ModuleLearningHeader';

interface LocationReflectionReviewProps {
  state: SimulationState;
  setState: React.Dispatch<React.SetStateAction<SimulationState>>;
  onOpenReport: () => void;
  onNavigate: (locationId: SimulationLocationId) => void;
  onOpenAssumptions?: () => void;
}

export const LocationReflectionReview: React.FC<LocationReflectionReviewProps> = ({
  state,
  setState,
  onOpenReport,
  onNavigate,
  onOpenAssumptions,
}) => {
  const currentModule = MODULE_MAP.mod_10_reflection_review;
  const assessmentReport = evaluateStudentAssessment(state);
  const [capstoneText, setCapstoneText] = useState(
    state.studentReflections['mod_10_reflection_review'] || ''
  );
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveReflection = (text: string) => {
    setState((prev) => ({
      ...prev,
      studentReflections: {
        ...prev.studentReflections,
        mod_10_reflection_review: text,
      },
      completedModules: Array.from(new Set([...prev.completedModules, 'mod_10_reflection_review'])),
    }));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const completedReflectionsCount = Object.values(state.studentReflections).filter(
    (r) => r && r.trim().length > 10
  ).length;

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto pb-12">
      {/* Module 10 Learning Header */}
      <ModuleLearningHeader
        module={currentModule}
        reflectionValue={capstoneText}
        onSaveReflection={handleSaveReflection}
        isCompleted={Boolean(state.studentReflections['mod_10_reflection_review'])}
        onOpenAssumptions={onOpenAssumptions}
      />

      {/* Main Capstone Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: 4-Level Assessment Level */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-400">Classroom Rubric Rating</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-400 font-mono">
              {assessmentReport.averageLevel}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              ({assessmentReport.totalScore} / 28 pts)
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            {assessmentReport.overallEvaluationSummary}
          </p>
        </div>

        {/* Card 2: Modules & Reflection Completeness */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-400">Reflection Portfolios</span>
            <MessageSquare className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-indigo-400 font-mono">
              {completedReflectionsCount} / 10
            </span>
            <span className="text-xs text-slate-500 font-mono">Modules Logged</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            Each logged reflection records metacognitive reasoning into your venture portfolio.
          </p>
        </div>

        {/* Card 3: Final Venture Portfolio Ready */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-blue-950/60 to-indigo-950/60 border border-blue-800/60 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase font-bold text-blue-300">Summative Capstone</span>
              <FileText className="w-4 h-4 text-blue-400" />
            </div>
            <h4 className="text-sm font-bold text-white mt-1">
              Complete Venture Portfolio
            </h4>
            <p className="text-[11px] text-blue-200/80 leading-snug mt-1">
              Structured summary of problem, product MVP, financials, decisions, and rubric scoring.
            </p>
          </div>

          <button
            onClick={onOpenReport}
            className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-blue-600/20"
          >
            <Printer className="w-4 h-4" />
            <span>Generate & Export Portfolio (PDF)</span>
          </button>
        </div>
      </div>

      {/* Evidence-Based 4-Level Rubric Breakdown */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
          <div>
            <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 tracking-wider">
              EVIDENCE-BASED ASSESSMENT FRAMEWORK
            </span>
            <h3 className="text-base font-bold text-white">
              7 Core Entrepreneurship Competencies (Beginning to Advanced)
            </h3>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">
            * Proposed Classroom Rubric &bull; Non-Psychometric
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {assessmentReport.competencies.map((comp) => (
            <div key={comp.competencyId} className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{comp.title}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold ${
                  comp.level === 'Advanced'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : comp.level === 'Proficient'
                    ? 'bg-blue-950 text-blue-400 border border-blue-800'
                    : comp.level === 'Developing'
                    ? 'bg-amber-950 text-amber-400 border border-amber-800'
                    : 'bg-rose-950 text-rose-400 border border-rose-800'
                }`}>
                  {comp.level} ({comp.score}/4)
                </span>
              </div>

              <div className="text-[11px] text-slate-300 leading-snug">
                {comp.rubricDescriptor}
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/60 space-y-1 text-[11px]">
                <div className="text-cyan-300 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  <span>Observed Student Evidence:</span>
                </div>
                <p className="text-slate-400 italic">
                  {comp.supportingEvidence}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Module Reflections Review Matrix */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase font-bold text-indigo-400 tracking-wider">
              STUDENT REFLECTION LOGBOOK
            </span>
            <h3 className="text-base font-bold text-white">
              Responses across All 10 Learning Modules
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {completedReflectionsCount} of 10 Completed
          </span>
        </div>

        <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
          {ALL_LEARNING_MODULES.map((mod) => {
            const hasReflection = Boolean(state.studentReflections[mod.id]);
            const text = state.studentReflections[mod.id];

            return (
              <div 
                key={mod.id} 
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-blue-400">
                      M{mod.order}
                    </span>
                    <span>{mod.title}</span>
                  </span>

                  <button
                    onClick={() => onNavigate(mod.locationId)}
                    className="text-[11px] font-mono text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Jump to Lab</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="text-[11px] text-slate-400 italic">
                  Prompt: "{mod.reflectionQuestion}"
                </div>

                {hasReflection ? (
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-emerald-300 leading-relaxed">
                    "{text}"
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-slate-900/40 border border-dashed border-slate-800 text-[11px] text-slate-500 italic">
                    No reflection recorded yet for this module. Visit the lab to enter your notes.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Capstone Reflection Entry Card */}
      <div className="p-6 rounded-3xl bg-indigo-950/20 border border-indigo-800/40 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Module 10 Capstone Synthesis</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            {capstoneText.length} characters
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {currentModule.reflectionQuestion}
        </p>

        <textarea
          value={capstoneText}
          onChange={(e) => setCapstoneText(e.target.value)}
          placeholder={currentModule.reflectionPromptPlaceholder}
          rows={3}
          className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
        />

        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] text-slate-500 font-mono">
            Recorded in VentureLab Final Report
          </span>

          <button
            onClick={() => handleSaveReflection(capstoneText)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              isSaved
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Capstone Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Final Reflection</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
