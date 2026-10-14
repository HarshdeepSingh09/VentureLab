import React from 'react';
import { Compass, Sliders, TrendingUp, Sparkles } from 'lucide-react';

export const LearningConceptSection: React.FC = () => {


  return (
    <section id="learning-concept" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background visual depth */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-violet-900/10 blur-3xl pointer-events-none -z-10 rounded-full" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs font-semibold uppercase tracking-wider text-violet-400 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          The Pedagogical Framework
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
          Experience the Decisions Behind Every Business.
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Entrepreneurship involves more than having an idea. It requires understanding customers, managing resources, making difficult decisions, and adapting when things do not go according to plan.
        </p>
        <p className="mt-3 text-slate-400 text-sm max-w-2xl mx-auto">
          Our proposed simulation gives students a safe environment in which to explore these challenges through interactive scenarios.
        </p>
      </div>

      {/* 3 Distinctive Feature Areas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CARD A: THINK LIKE A FOUNDER */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                Area A • Customer Empathy
              </span>
              <h3 className="text-xl font-bold text-white">Think Like a Founder</h3>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Students identify customer problems, evaluate opportunities, and decide which problems are worth solving.
            </p>

            {/* Custom Visual Graphic: Opportunity Assessment Matrix */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800/80">
                <span className="text-slate-400 font-mono">Opportunity Radar</span>
                <span className="text-cyan-400 font-semibold text-[11px] px-2 py-0.5 rounded bg-cyan-950/60">
                  Intended Experience
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Problem Urgency</span>
                    <span className="font-mono text-cyan-300 font-bold">92%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 w-[92%] rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Customer Willingness to Pay</span>
                    <span className="font-mono text-cyan-300 font-bold">84%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 w-[84%] rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Market Size Viability</span>
                    <span className="font-mono text-cyan-300 font-bold">78%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 w-[78%] rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800/80 mt-6">
            <span className="text-xs text-slate-400 block font-medium">
              Intended Learning: Discovery over assumptions, customer observation, validating real friction.
            </span>
          </div>
        </div>

        {/* CARD B: MAKE REAL DECISIONS */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800/90 hover:border-violet-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-950/80 border border-violet-800/50 flex items-center justify-center text-violet-400 group-hover:scale-105 transition-transform">
              <Sliders className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono font-semibold text-violet-400 uppercase tracking-wider">
                Area B • Resource Allocation
              </span>
              <h3 className="text-xl font-bold text-white">Make Real Decisions</h3>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Students choose pricing strategies, allocate a simulated budget, and decide how to respond to business challenges.
            </p>

            {/* Custom Visual Graphic: Trade-off Cockpit */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800/80">
                <span className="text-slate-400 font-mono">Resource Balance</span>
                <span className="text-violet-400 font-semibold text-[11px] px-2 py-0.5 rounded bg-violet-950/60">
                  Simulated Trade-offs
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                  <span className="text-[11px] text-slate-400 block mb-0.5">Pricing Model</span>
                  <span className="font-mono font-bold text-violet-300 text-sm">₹89/meal</span>
                  <span className="text-[10px] text-emerald-400 block mt-0.5">Recurring Sub</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                  <span className="text-[11px] text-slate-400 block mb-0.5">Simulated Runway</span>
                  <span className="font-mono font-bold text-amber-300 text-sm">₹1,00,000</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">4.2 Months Buffer</span>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-violet-950/30 border border-violet-900/40 text-[11px] text-violet-200">
                ⚡ Students experience the friction of choosing between marketing growth vs. operations capacity.
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800/80 mt-6">
            <span className="text-xs text-slate-400 block font-medium">
              Intended Learning: Working capital discipline, opportunity cost awareness, unit economics.
            </span>
          </div>
        </div>

        {/* CARD C: LEARN FROM CONSEQUENCES */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800/90 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                Area C • Adaptive Reflection
              </span>
              <h3 className="text-xl font-bold text-white">Learn From Consequences</h3>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Students observe how their decisions affect the simulated business, reflect on the outcomes, and explore alternative strategies.
            </p>

            {/* Custom Visual Graphic: Consequence Ripple Preview */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800/80">
                <span className="text-slate-400 font-mono">Consequence Cascade</span>
                <span className="text-emerald-400 font-semibold text-[11px] px-2 py-0.5 rounded bg-emerald-950/60">
                  Feedback Loop
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center text-[10px] font-bold">1</div>
                  <span className="text-slate-300">Decision: Invested in Insulated Bentos</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="w-5 h-5 rounded-full bg-violet-950 text-violet-400 flex items-center justify-center text-[10px] font-bold">2</div>
                  <span className="text-slate-300">Result: 0 Spills • 88% 2nd-Month Retention</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-950/40 border border-emerald-900/40">
                  <div className="w-5 h-5 rounded-full bg-emerald-900 text-emerald-300 flex items-center justify-center text-[10px] font-bold">3</div>
                  <span className="text-emerald-200">Reflection: Quality beats short-term price cuts</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800/80 mt-6">
            <span className="text-xs text-slate-400 block font-medium">
              Intended Learning: Safe failure analysis, hypothesis testing, resilient business adaptation.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
