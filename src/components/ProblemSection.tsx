import React from 'react';
import { BookOpen, Scale, ShieldAlert, Sparkles } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      number: '01',
      title: 'Learning Without Experience',
      tagline: 'Theory vs. Operational Reality',
      description:
        'Students can learn business concepts theoretically in textbooks without experiencing the practical decisions and friction involved in real-world operations.',
      pedagogicalImpact:
        'Memorizing terms like "gross margin" or "supply chain" does not build the intuition needed to decide between hiring kitchen staff or buying marketing ads.',
      icon: BookOpen,
      accentColor: 'text-cyan-400',
      borderColor: 'hover:border-cyan-500/40',
      bgGlow: 'bg-cyan-500/5',
    },
    {
      number: '02',
      title: 'Decisions Have Trade-offs',
      tagline: 'Interconnected Cause-and-Effect',
      description:
        'Pricing, spending, customer satisfaction, and growth are deeply interconnected. Students need structured opportunities to explore how a choice in one area ripples into another.',
      pedagogicalImpact:
        'If a student doubles marketing, they observe kitchen bottlenecks firsthand. If they cut prices too low, they discover cash burn before week three.',
      icon: Scale,
      accentColor: 'text-violet-400',
      borderColor: 'hover:border-violet-500/40',
      bgGlow: 'bg-violet-500/5',
    },
    {
      number: '03',
      title: 'Safe Experimentation Matters',
      tagline: 'Zero-Risk Failure Environment',
      description:
        'Students should be able to make mistakes, observe real consequences, and reflect on what went wrong without risking real capital or their personal reputation.',
      pedagogicalImpact:
        'Failing in a simulation builds strategic resilience and analytical thinking, turning unexpected crises into constructive classroom discussions.',
      icon: ShieldAlert,
      accentColor: 'text-emerald-400',
      borderColor: 'hover:border-emerald-500/40',
      bgGlow: 'bg-emerald-500/5',
    },
  ];

  return (
    <section id="our-approach" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-900/10 blur-3xl pointer-events-none -z-10 rounded-full" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs font-semibold uppercase tracking-wider text-cyan-400">
          <Sparkles className="w-3.5 h-3.5" />
          The Educational Opportunity
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          Understanding Business Is Different From Running One.
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          High school students possess immense creativity, but traditional curricula often separate business concepts into static isolated chapters. We are building an experiential simulation to bridge that gap.
        </p>
      </div>

      {/* 3-Card Problem Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {problems.map((p) => {
          const Icon = p.icon;

          return (
            <div
              key={p.number}
              className={`rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800/90 ${p.borderColor} transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden`}
            >
              <div className="space-y-4">
                {/* Number & Icon */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
                    Challenge {p.number}
                  </span>
                  <div className={`w-11 h-11 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center ${p.accentColor} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {p.title}
                  </h3>
                  <span className="text-xs font-medium text-slate-400 block">
                    {p.tagline}
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {p.description}
                </p>

                {/* Practical Impact Box */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-400 leading-relaxed space-y-1">
                  <strong className="text-slate-200 block font-semibold">
                    The Pedagogical Insight:
                  </strong>
                  <p>{p.pedagogicalImpact}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800/80 mt-6">
                <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Addressed directly in the VENTURELAB simulation
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
