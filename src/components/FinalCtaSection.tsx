import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FinalCtaSection: React.FC = () => {
  const scrollToForm = () => {
    const el = document.getElementById('partnership');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/95 to-cyan-950/40 border border-slate-800 p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-600/10 blur-3xl rounded-full pointer-events-none -z-0" />

        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            Experiential EdTech Exploration
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Let&rsquo;s Make Learning More Experiential.
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            We&rsquo;re looking to collaborate with educators who believe students should have opportunities to practise making decisions, explore business challenges, and learn through experience.
          </p>

          <div className="pt-2">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-base shadow-xl shadow-cyan-950/60 hover:shadow-cyan-900/80 transition-all group"
            >
              <span>Discuss a Potential School Pilot</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <p className="text-xs text-slate-500 pt-2">
            No long-term commitments • Designed for Classes 9–12 • Accessible on ordinary web browsers
          </p>
        </div>
      </div>
    </section>
  );
};
