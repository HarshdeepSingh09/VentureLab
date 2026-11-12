import React from 'react';
import { 
  Award, CheckCircle2, Lock, X, 
  Compass, Wallet, MessageSquare, 
  ShieldCheck, Target, Presentation 
} from 'lucide-react';
import type { Achievement } from '../../../simulation/types';

interface AchievementsModalProps {
  achievements: Achievement[];
  onClose: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Compass,
  Wallet,
  MessageSquare,
  ShieldCheck,
  Target,
  Presentation,
};

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  achievements,
  onClose,
}) => {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl p-6 sm:p-8 text-left space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800/60 text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
              <Award className="w-3.5 h-3.5" />
              SECTION 16 // ACHIEVEMENTS & REFLECTION
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Pedagogical Badges & Milestones
            </h3>
            <p className="text-xs text-slate-400">
              VENTURELAB rewards disciplined thinking, empathy, and strategic reflection &mdash; not artificial greed or paper net worth.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress summary banner */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
          <div className="space-y-0.5">
            <span className="text-white font-bold block">
              Founder Progression: {unlockedCount} of {achievements.length} Badges Earned
            </span>
            <span className="text-slate-400 text-[11px]">
              Every badge reinforces a fundamental mindset of successful problem-solvers.
            </span>
          </div>
          <span className="text-lg font-black text-amber-400 font-mono">
            {Math.round((unlockedCount / achievements.length) * 100)}%
          </span>
        </div>

        {/* Badge Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {achievements.map((ach) => {
            const Icon = ICON_MAP[ach.iconName] || Award;
            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-3 transition-all ${
                  ach.unlocked
                    ? 'bg-slate-950 border-amber-400/80 shadow-md ring-1 ring-amber-400/30'
                    : 'bg-slate-950/50 border-slate-800/80 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${ach.unlocked ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-slate-800 text-slate-500'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {ach.unlocked ? (
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Unlocked
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Locked
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-white">{ach.title}</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-snug">{ach.description}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-amber-200/90 leading-snug">
                  <strong className="text-amber-300 block mb-0.5">Mindset Value:</strong>
                  {ach.pedagogicalTakeaway}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors cursor-pointer"
          >
            Close Badges
          </button>
        </div>
      </div>
    </div>
  );
};
