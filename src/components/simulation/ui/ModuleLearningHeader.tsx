import React, { useState, useEffect } from 'react';
import { 
  Target, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Save,
  Check
} from 'lucide-react';
import type { LearningModuleDefinition } from '../../../simulation/types';

interface ModuleLearningHeaderProps {
  module: LearningModuleDefinition;
  reflectionValue: string;
  onSaveReflection: (text: string) => void;
  isCompleted: boolean;
  feedbackMessage?: string;
  onOpenAssumptions?: () => void;
}

export const ModuleLearningHeader: React.FC<ModuleLearningHeaderProps> = ({
  module,
  reflectionValue,
  onSaveReflection,
  isCompleted,
  feedbackMessage,
  onOpenAssumptions,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [reflectionText, setReflectionText] = useState(reflectionValue || '');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setReflectionText(reflectionValue || '');
  }, [reflectionValue]);

  const handleSave = () => {
    onSaveReflection(reflectionText);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="mb-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden transition-all duration-200">
      {/* Top Banner: Module Number, Title, Objective & Status */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80">
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-950 border border-blue-800 text-blue-400 font-mono text-[10px] font-bold uppercase tracking-wider">
              MODULE {module.order} OF 10
            </span>
            <span className="text-xs font-mono text-slate-400">
              {module.shortTitle}
            </span>
            {isCompleted ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                <span>TASK COMPLETED</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-400 bg-amber-950/80 border border-amber-800/60 px-2 py-0.5 rounded-full">
                <Clock className="w-3 h-3" />
                <span>ACTIVE DECISION</span>
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span>{module.title}</span>
          </h3>

          <div className="text-xs text-cyan-300 font-medium flex items-start gap-1.5 pt-0.5">
            <Target className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
            <span><strong>Learning Objective:</strong> {module.learningObjective}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          {onOpenAssumptions && (
            <button
              onClick={onOpenAssumptions}
              className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Inspect Simulation Engine Assumptions & Formulas"
            >
              <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden md:inline">Assumptions</span>
            </button>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isExpanded ? 'Hide Pedagogy' : 'Explanation & Reflection'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded Educational Panel */}
      {isExpanded && (
        <div className="p-5 sm:p-6 bg-slate-950/60 space-y-5 text-left border-b border-slate-800 animate-in slide-in-from-top-2 duration-200">
          {/* Beginner-Friendly Explanation */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800/90 space-y-1.5">
            <span className="text-[10px] font-mono uppercase font-bold text-indigo-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Beginner-Friendly Concept (Classes 9–12)</span>
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {module.beginnerExplanation}
            </p>
          </div>

          {/* Interactive Decision Task & Guidance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800/80 space-y-1">
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">Current Decision Task</span>
              <p className="text-xs text-slate-300 leading-snug">
                {module.meaningfulDecisionTask}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800/80 space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Feedback & Trade-off Guidance</span>
              <p className="text-xs text-slate-300 leading-snug">
                {feedbackMessage || module.feedbackGuidance}
              </p>
            </div>
          </div>

          {/* Module Reflection Question & Interactive Input */}
          <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-800/40 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                <span>Student Metacognitive Reflection</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                {reflectionText.length} characters (Saved to Portfolio)
              </span>
            </div>

            <p className="text-xs text-slate-300 italic">
              "{module.reflectionQuestion}"
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <textarea
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                placeholder={module.reflectionPromptPlaceholder}
                rows={2}
                className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
              />

              <button
                onClick={handleSave}
                className={`self-end sm:self-stretch px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 ${
                  isSaved
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                }`}
              >
                {isSaved ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Reflection</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Pedagogy Disclaimer */}
          <div className="text-[10px] text-slate-500 leading-tight">
            * Aligned with foundational high-school entrepreneurship competencies. Formal curriculum alignments (e.g. CBSE/state boards) are illustrative and subject to classroom teacher customization.
          </div>
        </div>
      )}
    </div>
  );
};
