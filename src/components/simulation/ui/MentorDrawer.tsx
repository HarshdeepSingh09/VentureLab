import React from 'react';
import {
  Lightbulb,
  BookOpen,
  ArrowRight,
  X,
  Compass,
  MessageCircleQuestion,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';
import type { SimulationState, SimulationLocationId } from '../../../simulation/types';
import { getContextualMentorFeedback, MENTOR_PERSONA, LOCATION_MENTOR_TIPS } from '../../../simulation/mentorData';

interface MentorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  state: SimulationState;
  onNavigate?: (locationId: SimulationLocationId) => void;
}

export const MentorDrawer: React.FC<MentorDrawerProps> = ({
  isOpen,
  onClose,
  state,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const currentFeedback = getContextualMentorFeedback(state);
  const locationTip = LOCATION_MENTOR_TIPS.find((t) => t.locationId === state.currentLocation);

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#FFFFFF] border-l border-[#D9D5C9] shadow-2xl p-6 flex flex-col justify-between text-left animate-slide-in-right">
      <div className="space-y-5 overflow-y-auto pr-1">
        
        {/* Mentor Header Card */}
        <div className="flex items-center justify-between border-b border-[#D9D5C9] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#234B3A] flex items-center justify-center text-[#F6F3EA] font-bold text-sm">
              MP
            </div>
            <div>
              <div className="text-[10px] font-mono text-[#234B3A] uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Lightbulb className="w-3 h-3 text-[#B9684D]" />
                <span>BUSINESS MENTOR GUIDANCE</span>
              </div>
              <h3 className="text-base font-bold text-[#22251F] leading-tight">
                {MENTOR_PERSONA.name}
              </h3>
              <p className="text-[11px] text-[#575952]">
                {MENTOR_PERSONA.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#F6F3EA] border border-[#D9D5C9] text-[#575952] hover:text-[#22251F] transition-colors cursor-pointer"
            aria-label="Close Mentor Drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mentor Quote Banner */}
        <div className="p-3.5 rounded-xl bg-[#F6F3EA] border border-[#D9D5C9] text-[#22251F] text-xs italic leading-relaxed">
          "{MENTOR_PERSONA.quote}"
        </div>

        {/* Current Location Context Box */}
        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#D9D5C9] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#234B3A] uppercase font-bold tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Current Stage Context</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E8F0EC] text-[#234B3A] font-mono font-bold">
              {state.currentLocation.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          <h4 className="text-sm font-bold text-[#22251F]">
            {locationTip?.headline || currentFeedback.headline}
          </h4>

          <p className="text-xs text-[#575952] leading-relaxed">
            {locationTip?.explanation || currentFeedback.explanation}
          </p>
        </div>

        {/* Concept Definition / Beginner Vocabulary */}
        {locationTip?.conceptDefinition && (
          <div className="p-4 rounded-xl bg-[#E8F0EC] border border-[#C4D9CD] space-y-2">
            <div className="flex items-center gap-2 text-[#234B3A] text-xs font-bold">
              <BookOpen className="w-4 h-4 text-[#234B3A]" />
              <span>Core Concept: {locationTip.conceptDefinition.term}</span>
            </div>
            <p className="text-xs text-[#22251F] leading-relaxed">
              {locationTip.conceptDefinition.explanation}
            </p>
          </div>
        )}

        {/* Strategic Trade-off Hint */}
        <div className="p-4 rounded-xl bg-[#F8EFEA] border-l-4 border-l-[#B9684D] border border-[#E5C3B6] space-y-2">
          <div className="flex items-center gap-2 text-[#B9684D] text-xs font-bold uppercase tracking-wider font-mono">
            <HelpCircle className="w-4 h-4 text-[#B9684D]" />
            <span>Mentor Hint</span>
          </div>
          <p className="text-xs text-[#22251F] leading-relaxed">
            {locationTip?.hint || currentFeedback.hint}
          </p>
        </div>

        {/* Reflective Question */}
        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#D9D5C9] space-y-2">
          <div className="flex items-center gap-2 text-[#234B3A] text-xs font-bold font-mono uppercase">
            <MessageCircleQuestion className="w-4 h-4 text-[#234B3A]" />
            <span>Reflective Question</span>
          </div>
          <p className="text-xs text-[#575952] italic leading-relaxed">
            "{locationTip?.reflectiveQuestion || currentFeedback.reflectiveQuestion}"
          </p>
        </div>

      </div>

      {/* Footer Note */}
      <div className="pt-4 border-t border-[#D9D5C9] text-[11px] text-[#7E8078] flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#234B3A]" />
          Pedagogical guidance only
        </span>
        <button
          onClick={onClose}
          className="btn-outline text-xs py-1 px-3"
        >
          Got it
        </button>
      </div>

    </div>
  );
};
