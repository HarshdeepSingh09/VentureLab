import React, { useState } from 'react';
import { 
  Lightbulb, Compass, FileSpreadsheet, Wallet, AlertTriangle, 
  Presentation, CheckCircle2, ArrowLeft, ArrowRight,
  Sparkles, Layers, BookOpen, type LucideIcon
} from 'lucide-react';
import { JOURNEY_STAGES } from '../data/journeyData';
import { JourneyInteractivePreview } from './JourneyInteractivePreview';

export const JourneySection: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeStage = JOURNEY_STAGES[activeStageIndex];

  const stageIcons: Record<string, LucideIcon> = {
    'stage-1': Compass,
    'stage-2': Lightbulb,
    'stage-3': FileSpreadsheet,
    'stage-4': Wallet,
    'stage-5': AlertTriangle,
    'stage-6': Presentation,
  };

  const ActiveIcon = stageIcons[activeStage.id] || Sparkles;

  return (
    <section id="journey" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-gradient-to-r from-blue-900/10 via-violet-900/15 to-cyan-900/10 blur-3xl pointer-events-none -z-10 rounded-full" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-4">
          <Layers className="w-3.5 h-3.5" />
          Structured Experiential Arc
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
          The Six-Stage Entrepreneurship Journey
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Students do not merely read business textbooks—they step into a progressive, connected venture lifecycle from initial observation through to executive pitching.
        </p>
      </div>

      {/* Connected Journey Navigation Map (Horizontal on desktop, responsive scroll/pills on mobile) */}
      <div className="mb-10">
        <div className="relative">
          {/* Connecting line behind icons on desktop */}
          <div className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-slate-800 -z-0">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-violet-500 to-amber-500 transition-all duration-500"
              style={{ width: `${(activeStageIndex / (JOURNEY_STAGES.length - 1)) * 100}%` }}
            />
          </div>

          {/* Stepper buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
            {JOURNEY_STAGES.map((stage, idx) => {
              const isSelected = activeStageIndex === idx;
              const isPassed = activeStageIndex > idx;
              const Icon = stageIcons[stage.id] || Sparkles;

              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageIndex(idx)}
                  className={`group relative flex flex-col items-center p-3 sm:p-4 rounded-2xl transition-all duration-300 text-center border text-left ${
                    isSelected
                      ? 'bg-slate-900/90 border-cyan-500/80 shadow-xl shadow-cyan-950/40 scale-102 ring-1 ring-cyan-500/30'
                      : isPassed
                      ? 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      : 'bg-slate-950/40 border-slate-900 text-slate-500 hover:border-slate-800 hover:text-slate-300'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center mb-2.5 transition-all ${
                      isSelected
                        ? 'bg-gradient-to-tr from-cyan-600 to-violet-600 text-white shadow-md shadow-cyan-900/50'
                        : isPassed
                        ? 'bg-slate-800 text-slate-300'
                        : 'bg-slate-900 text-slate-500 group-hover:text-slate-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[10px] font-mono tracking-wider font-semibold mb-0.5 ${
                      isSelected ? 'text-cyan-400' : 'text-slate-400'
                    }`}
                  >
                    {stage.stageNumber}
                  </span>
                  <span
                    className={`text-xs font-semibold line-clamp-1 ${
                      isSelected ? 'text-white' : 'text-slate-400'
                    }`}
                  >
                    {stage.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Stage Deep Dive Showcase */}
      <div className="rounded-3xl glass-panel p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative stage background watermark */}
        <div className="absolute top-2 right-4 text-8xl font-black font-mono text-slate-900/40 select-none pointer-events-none">
          {activeStage.stageNumber.replace('STAGE ', '')}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Pedagogical Details & Concept */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-cyan-300 text-xs font-mono font-medium">
                <ActiveIcon className="w-3.5 h-3.5" />
                {activeStage.stageNumber} • {activeStage.tagline}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {activeStage.title}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {activeStage.description}
              </p>
            </div>

            {/* Example Student Decision Scenario */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Representative Student Decision
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-normal">
                {activeStage.exampleScenario}
              </p>
            </div>

            {/* Expected Learning Concepts & Skills */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <BookOpen className="w-4 h-4 text-violet-400" />
                Curricular Learning Concept
              </div>
              <p className="text-sm font-semibold text-violet-300 bg-violet-950/30 border border-violet-900/40 p-3 rounded-xl">
                {activeStage.learningConcept}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {activeStage.keySkills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300"
                  >
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Prev / Next Stage Stepper */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
              <button
                disabled={activeStageIndex === 0}
                onClick={() => setActiveStageIndex(c => Math.max(0, c - 1))}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors border border-slate-800"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Previous Stage
              </button>

              <span className="text-xs font-mono text-slate-500">
                Stage {activeStageIndex + 1} of {JOURNEY_STAGES.length}
              </span>

              <button
                disabled={activeStageIndex === JOURNEY_STAGES.length - 1}
                onClick={() => setActiveStageIndex(c => Math.min(JOURNEY_STAGES.length - 1, c + 1))}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-600 text-white hover:bg-cyan-500 disabled:opacity-30 disabled:pointer-events-none transition-colors shadow-sm shadow-cyan-900/40"
              >
                Next Stage
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic Interactive Preview for this stage */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-slate-950/80 border border-slate-800/90 p-5 sm:p-6 shadow-xl relative">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    {activeStage.interactionTitle}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {activeStage.interactionDescription}
                  </p>
                </div>
              </div>

              {/* Renders stage-specific interactive preview */}
              <JourneyInteractivePreview stageId={activeStage.id} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
