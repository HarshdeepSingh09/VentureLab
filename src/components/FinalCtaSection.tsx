import React from 'react';
import { Play, MessageSquare, Sparkles } from 'lucide-react';

interface FinalCtaSectionProps {
  onOpenSimulation: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenSimulation }) => {
  const scrollToSchools = () => {
    const el = document.getElementById('for-schools');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-slate-800 p-8 sm:p-14 text-center overflow-hidden shadow-2xl">
        {/* Ambient subtle glow lights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            Shape the Future of Entrepreneurship Education
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Help Us Rethink How Students Experience Entrepreneurship.
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            We&rsquo;re developing an early-stage concept and want to learn from educators who understand what students and schools need.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenSimulation}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-950/60 hover:shadow-cyan-900/80 transition-all hover:scale-102 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Enter the Experience</span>
            </button>

            <button
              onClick={scrollToSchools}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-all hover:border-slate-600 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>Share Your Perspective</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
