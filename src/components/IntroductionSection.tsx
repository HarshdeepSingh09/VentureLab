import React, { useState } from 'react';
import { 
  Lightbulb, Layers, Wallet, AlertTriangle, Presentation, 
  ArrowRight, Sparkles, CheckCircle2 
} from 'lucide-react';

interface IntroductionSectionProps {
  onOpenSimulation: () => void;
}

export const IntroductionSection: React.FC<IntroductionSectionProps> = ({ onOpenSimulation }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 'idea',
      stepNumber: '01',
      title: 'IDEA',
      subtitle: 'Identify Real Problems',
      description: 'Students explore everyday friction on campus and select a problem genuinely worth solving.',
      outcome: 'Customer Empathy & Problem Validation',
      icon: Lightbulb,
      color: 'from-cyan-500 to-blue-500',
      badgeColor: 'text-cyan-400 bg-cyan-950/80 border-cyan-800/60',
    },
    {
      id: 'model',
      stepNumber: '02',
      title: 'BUSINESS MODEL',
      subtitle: 'Structure Unit Economics',
      description: 'Students decide how the venture will operate, choose pricing tiers, and select customer acquisition channels.',
      outcome: 'Revenue Architecture & Margin Control',
      icon: Layers,
      color: 'from-blue-500 to-indigo-500',
      badgeColor: 'text-blue-400 bg-blue-950/80 border-blue-800/60',
    },
    {
      id: 'finances',
      stepNumber: '03',
      title: 'FINANCES',
      subtitle: 'Allocate ₹1,00,000 Budget',
      description: 'Students distribute limited seed capital across R&D, marketing, kitchen capacity, customer support, and emergency reserves.',
      outcome: 'Zero-Sum Resource Discipline',
      icon: Wallet,
      color: 'from-indigo-500 to-purple-500',
      badgeColor: 'text-indigo-400 bg-indigo-950/80 border-indigo-800/60',
    },
    {
      id: 'challenges',
      stepNumber: '04',
      title: 'CHALLENGES',
      subtitle: 'Survive Unexpected Bottlenecks',
      description: 'Demand surges to 240 orders while kitchen capacity is 140. Students make hard operational trade-offs with deterministic outcomes.',
      outcome: 'Crisis Management & Strategic Resilience',
      icon: AlertTriangle,
      color: 'from-amber-500 to-orange-500',
      badgeColor: 'text-amber-400 bg-amber-950/80 border-amber-800/60',
    },
    {
      id: 'pitch',
      stepNumber: '05',
      title: 'PITCH',
      subtitle: 'Synthesize & Reflect',
      description: 'Students evaluate financial metrics, customer NPS, reflect on trade-offs, and generate a structured executive pitch brief.',
      outcome: 'Founder Pitch Brief & Metacognitive Reflection',
      icon: Presentation,
      color: 'from-emerald-500 to-teal-500',
      badgeColor: 'text-emerald-400 bg-emerald-950/80 border-emerald-800/60',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Ambient background lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-80 bg-blue-950/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs font-semibold uppercase tracking-wider text-cyan-400">
          <Sparkles className="w-3.5 h-3.5" />
          The Core Concept
        </div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          What If Students Could Experience Business Before Building One?
        </h2>
        
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Students enter a simulated business environment where their decisions directly shape a virtual enterprise. They experiment with ideas, learn about cash flow, navigate trade-offs, and reflect on the consequences of their choices.
        </p>
      </div>

      {/* Visual Composition: IDEA → BUSINESS MODEL → FINANCES → CHALLENGES → PITCH */}
      <div className="mb-12">
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-3">
          {steps.map((st, idx) => {
            const isSelected = activeStep === idx;
            const Icon = st.icon;

            return (
              <React.Fragment key={st.id}>
                <button
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`flex-1 p-5 rounded-2xl border transition-all text-left flex flex-col justify-between group cursor-pointer relative ${
                    isSelected
                      ? 'bg-slate-900/95 border-cyan-500 ring-1 ring-cyan-500/40 shadow-xl shadow-cyan-950/50 scale-102'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold tracking-wider text-slate-500 group-hover:text-cyan-400 transition-colors">
                        STEP {st.stepNumber}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-cyan-500 text-slate-950'
                            : 'bg-slate-900 text-slate-400 group-hover:text-slate-200'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div>
                      <h3 className={`text-xs font-mono font-black tracking-wide ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {st.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                        {st.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-cyan-400">
                      {isSelected ? 'Active View' : 'Click to inspect'}
                    </span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                </button>

                {/* Arrow connector between steps (visible on desktop) */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center text-slate-600 px-1">
                    <ArrowRight className="w-4 h-4 text-slate-600 animate-pulse" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Featured Step Inspection Box */}
      <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-slate-700/80 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <span className={`text-[11px] font-mono px-3 py-1 rounded-full font-bold border ${steps[activeStep].badgeColor}`}>
                PHASE {steps[activeStep].stepNumber} • {steps[activeStep].title}
              </span>
              <span className="text-xs text-slate-400 font-mono">Connected Simulation Pipeline</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {steps[activeStep].subtitle}
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {steps[activeStep].description}
            </p>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-1">
              <strong className="text-cyan-400 block font-semibold">
                Pedagogical Outcome:
              </strong>
              <p>{steps[activeStep].outcome}</p>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                type="button"
                onClick={onOpenSimulation}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-950/60 transition-all hover:scale-102 cursor-pointer"
              >
                <span>Experience this in Simulation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
              >
                Next Concept →
              </button>
            </div>
          </div>

          {/* Visual Step Simulator Display */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-slate-950/90 border border-slate-800 p-6 space-y-4 shadow-xl text-left">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-slate-300">
                  DECISION SIMULATION MATRIX
                </span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-800/60">
                  Deterministic Logic
                </span>
              </div>

              <div className="space-y-3 py-2 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Pipeline Stage:</span>
                  <span className="font-mono text-white font-bold">{steps[activeStep].title}</span>
                </div>

                <div className="flex items-center justify-between text-slate-400">
                  <span>Student Decision:</span>
                  <span className="text-cyan-300 font-semibold">{steps[activeStep].subtitle}</span>
                </div>

                <div className="flex items-center justify-between text-slate-400">
                  <span>Downstream Impact:</span>
                  <span className="text-emerald-400 font-semibold">Updates Finances & Satisfaction</span>
                </div>

                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden mt-3">
                  <div
                    className={`h-full bg-gradient-to-r ${steps[activeStep].color} rounded-full transition-all duration-300`}
                    style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 italic">
                "No generative AI guesswork: students experience a transparent, mathematically coherent cause-and-effect loop."
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
