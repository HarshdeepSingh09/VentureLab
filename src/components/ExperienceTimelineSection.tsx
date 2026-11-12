import React, { useState } from 'react';
import { 
  Compass, Lightbulb, Layers, Wallet, AlertTriangle, 
  Presentation, Play, Sparkles, ChevronRight 
} from 'lucide-react';

interface ExperienceTimelineSectionProps {
  onOpenSimulation: () => void;
}

export const ExperienceTimelineSection: React.FC<ExperienceTimelineSectionProps> = ({ onOpenSimulation }) => {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      num: '01',
      title: 'Discover a Problem',
      shortExpl: 'Students explore a business scenario and identify an everyday problem that needs solving.',
      deepExpl:
        'Students explore real-world campus friction (expensive daily meals, delayed lunch deliveries during 30-min lecture breaks, repetitive canteen food) and validate customer urgency before writing a business plan.',
      interactiveVisual: 'Problem Urgency Radar (Cost vs. Frequency vs. Willingness to Pay)',
      badge: 'Empathy & Discovery',
      icon: Compass,
      color: 'from-cyan-500 to-blue-600',
      tagColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60',
    },
    {
      num: '02',
      title: 'Develop an Idea',
      shortExpl: 'Students select a possible solution, define their customers, and examine simulated customer feedback.',
      deepExpl:
        'Students evaluate three concrete business vectors: a pre-scheduled lunch subscription pass, a vetted local home tiffin aggregator, or a group-discount food portal, inspecting simulated persona reactions.',
      interactiveVisual: 'Solution Architecture Matrix & Customer Persona Feedback',
      badge: 'Value Proposition',
      icon: Lightbulb,
      color: 'from-blue-500 to-indigo-600',
      tagColor: 'text-blue-400 bg-blue-950/60 border-blue-800/60',
    },
    {
      num: '03',
      title: 'Build a Business Model',
      shortExpl: 'Students decide how the business will operate, earn revenue, and attract customers.',
      deepExpl:
        'Students configure unit economics: choosing meal price points (₹69 vs. ₹95 vs. ₹145), selecting customer acquisition channels (campus brand ambassadors vs. social drop groups), and selecting a kitchen fulfillment structure.',
      interactiveVisual: 'Unit Economics & Contribution Margin Calculator',
      badge: 'Unit Economics',
      icon: Layers,
      color: 'from-indigo-500 to-purple-600',
      tagColor: 'text-indigo-400 bg-indigo-950/60 border-indigo-800/60',
    },
    {
      num: '04',
      title: 'Manage Finances',
      shortExpl: 'Students allocate a virtual budget and make financial trade-offs.',
      deepExpl:
        'Starting with ₹1,00,000 in simulated seed capital, students distribute funds across Product R&D, Marketing, Kitchen Equipment, Customer Support, and Emergency Cash Reserves. Real-time zero-sum constraints teach financial trade-offs.',
      interactiveVisual: 'Interactive ₹1,00,000 Zero-Sum Portfolio Slider',
      badge: 'Capital Budgeting',
      icon: Wallet,
      color: 'from-purple-500 to-pink-600',
      tagColor: 'text-purple-400 bg-purple-950/60 border-purple-800/60',
    },
    {
      num: '05',
      title: 'Face Challenges',
      shortExpl: 'Students respond to realistic business situations and observe the consequences of their decisions.',
      deepExpl:
        'Demand surges to 240 orders/day while kitchen capacity is only 140. Students choose whether to invest emergency reserves, cap order volume to protect quality, or accept all orders and risk cold food.',
      interactiveVisual: 'Deterministic Crisis Branching Tree & Reputation Impact',
      badge: 'Operational Resilience',
      icon: AlertTriangle,
      color: 'from-amber-500 to-orange-600',
      tagColor: 'text-amber-400 bg-amber-950/60 border-amber-800/60',
    },
    {
      num: '06',
      title: 'Pitch the Business',
      shortExpl: 'Students review their performance and prepare a concise business pitch.',
      deepExpl:
        'Students review 30-day operating results, answer reflective prompts on their biggest decisions and strategic mistakes, and generate an executive 7-part founder pitch deck summarizing problem, economics, crisis response, and lessons learned.',
      interactiveVisual: 'Executive Pitch Deck Preview & Printable Synthesis',
      badge: 'Founder Pitch Brief',
      icon: Presentation,
      color: 'from-emerald-500 to-teal-600',
      tagColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60',
    },
  ];

  const current = stages[activeStage];
  const CurrentIcon = current.icon;

  return (
    <section id="the-experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background visual depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-gradient-to-r from-blue-900/10 via-violet-900/15 to-cyan-900/10 blur-3xl pointer-events-none -z-10 rounded-full" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs font-semibold uppercase tracking-wider text-cyan-400">
          <Sparkles className="w-3.5 h-3.5" />
          The Entrepreneurship Journey
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          Six Stages of Entrepreneurship.
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          A coherent six-stage simulation lifecycle that takes students from observing everyday problems to presenting a data-backed business pitch.
        </p>
      </div>

      {/* Staggered Timeline Stepper Navigation */}
      <div className="mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {stages.map((st, idx) => {
            const isSelected = activeStage === idx;
            const Icon = st.icon;

            return (
              <button
                key={st.num}
                type="button"
                onClick={() => setActiveStage(idx)}
                className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between group cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900/95 border-cyan-500/80 ring-1 ring-cyan-500/30 shadow-xl shadow-cyan-950/40 scale-102'
                    : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-slate-500 group-hover:text-cyan-400 transition-colors">
                      STAGE {st.num}
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
                  <h4 className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {st.title}
                  </h4>
                </div>
                <span className="text-[10px] text-slate-500 mt-2 block truncate">
                  {st.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Stage Interactive Spotlight Card */}
      <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-slate-700/80 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="flex items-center gap-3">
              <span className={`text-[11px] font-mono px-3 py-1 rounded-full font-bold border ${current.tagColor}`}>
                STAGE {current.num} • {current.badge}
              </span>
              <span className="text-xs text-slate-400 font-mono">Interactive Simulation Step</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {current.title}
            </h3>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              {current.shortExpl}
            </p>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <strong className="text-cyan-300 block mb-1 font-semibold">
                What Students Experience in this Stage:
              </strong>
              {current.deepExpl}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onOpenSimulation}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-950/60 transition-all hover:scale-102 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Enter the Simulation at Stage {current.num}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveStage((prev) => (prev + 1) % stages.length)}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium text-xs border border-slate-700 transition-colors cursor-pointer"
              >
                <span>Next Stage Preview</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Visual Representation */}
          <div className="lg:col-span-5 text-left">
            <div className="rounded-2xl bg-slate-950/80 border border-slate-800/90 p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${current.color} flex items-center justify-center text-white`}>
                    <CurrentIcon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold text-white">
                    STAGE PREVIEW // 0{activeStage + 1}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400">Live Architecture</span>
              </div>

              {/* Dynamic Mockup Visual */}
              <div className="space-y-3 py-2">
                <div className="text-xs font-bold text-slate-300">
                  {current.interactiveVisual}
                </div>

                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${current.color} rounded-full`}
                    style={{ width: `${((activeStage + 1) / stages.length) * 100}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                  <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800/80">
                    <span className="text-slate-500 block text-[10px]">Decision Type</span>
                    <span className="text-slate-200 font-semibold">Active Variable</span>
                  </div>
                  <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800/80">
                    <span className="text-slate-500 block text-[10px]">Feedback Loop</span>
                    <span className="text-emerald-400 font-semibold">Deterministic</span>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-slate-500 italic text-center pt-1 border-t border-slate-900">
                Directly accessible inside the 3D Virtual Workspace or Dashboard Mode.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
