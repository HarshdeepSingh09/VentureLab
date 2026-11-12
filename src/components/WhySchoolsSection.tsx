import React from 'react';
import { 
  Compass, DollarSign, BrainCircuit, RotateCcw, 
  Users, Clock, Sparkles 
} from 'lucide-react';

export const WhySchoolsSection: React.FC = () => {
  const objectives = [
    {
      title: 'Decision-Making',
      tagline: 'Trade-offs & Constraints',
      description:
        'Understand that every business decision involves trade-offs. Allocating more resources to one area inherently leaves fewer funds available for others.',
      icon: BrainCircuit,
      color: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60',
    },
    {
      title: 'Financial Awareness',
      tagline: 'Budgets, Cash & Margins',
      description:
        'Explore budgets, spending categories, unit costs, projected revenue, and available cash balances in a hands-on ₹1,00,000 virtual sandbox.',
      icon: DollarSign,
      color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60',
    },
    {
      title: 'Problem-Solving',
      tagline: 'Empathy Before Solutions',
      description:
        'Identify genuine everyday problems, evaluate multiple possible business solutions, and align products to real customer needs.',
      icon: Compass,
      color: 'text-violet-400 bg-violet-950/60 border-violet-800/60',
    },
    {
      title: 'Reflection',
      tagline: 'Learning From Outcomes',
      description:
        'Examine the consequences of decisions, analyze unexpected bottlenecks, and consider alternative approaches for future iterations.',
      icon: RotateCcw,
      color: 'text-amber-400 bg-amber-950/60 border-amber-800/60',
    },
  ];

  const classroomWorkflow = [
    {
      step: '01',
      title: 'A Teacher Introduces the Business Scenario',
      duration: '10 mins',
      desc: 'The teacher introduces the campus food friction scenario, reviews the ₹1,00,000 budget constraint, and outlines key business concepts.',
    },
    {
      step: '02',
      title: 'Students Complete the Simulation',
      duration: '20–25 mins',
      desc: 'Students complete the simulation individually or in small groups on school laptops, testing pricing models, managing cash, and resolving challenges.',
    },
    {
      step: '03',
      title: 'Students Compare Decisions & Outcomes',
      duration: '10 mins',
      desc: 'Students compare their final results, analyzing who prioritized operations vs. marketing, and examining customer satisfaction ratings.',
    },
    {
      step: '04',
      title: 'A Teacher Facilitates a Guided Discussion',
      duration: '10–15 mins',
      desc: 'A teacher facilitates a structured discussion about what students learned regarding trade-offs, cash reserves, and operational capacity.',
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-900/10 blur-3xl pointer-events-none -z-10 rounded-full" />

      {/* Part 1: Educational Objectives */}
      <div className="space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            Educational Objectives
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Learning by Making Decisions.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            VENTURELAB is designed to provide experiential entrepreneurship education for school students in Classes 9–12, focusing on practical decision-making rather than passive theory.
          </p>
          <div className="text-xs font-mono text-slate-400 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80 max-w-xl mx-auto">
            Note: Presented as intended educational learning objectives, not proven or validated scientific outcomes.
          </div>
        </div>

        {/* 4 Objectives Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {objectives.map((b) => {
            const Icon = b.icon;

            return (
              <div
                key={b.title}
                className="rounded-3xl glass-panel p-6 border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div className="space-y-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${b.color} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                      {b.tagline}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {b.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Part 2: Classroom Experience */}
        <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-slate-700/80 shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                Classroom Experience
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                How a School Might Use the Platform
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Proposed 45–60 Minute Session Format</span>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            A 45–60 minute session is a proposed workflow format we are validating with educators. The platform is designed to complement classroom teaching rather than replace teachers or career counsellors:
          </p>

          {/* 4 Step Classroom Workflow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {classroomWorkflow.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-3 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-cyan-400">
                    STAGE {step.step}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                    {step.duration}
                  </span>
                </div>

                <h4 className="font-bold text-white text-sm">
                  {step.title}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Honest Educator Pilot Exploration Note */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
            <Users className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Proposed Validation Note:</strong> A 45–60 minute session is a proposed format to validate, not a confirmed or tested duration. VENTURELAB is intended to complement classroom teaching rather than replace teachers or career counsellors. We do not claim curriculum approval or existing school adoption.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
