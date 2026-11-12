import React, { useState } from 'react';
import { Users, X, CheckCircle2, AlertTriangle, IndianRupee, ArrowRight, ShieldCheck, Briefcase } from 'lucide-react';
import type { InternCandidate } from '../../../simulation/types';

// ─── Exact Requirement 6 Intern Candidate Definitions ─────────────────────────────

export const INTERN_CANDIDATES: InternCandidate[] = [
  {
    id: 'aarav',
    name: 'Aarav Mehta',
    roleTitle: 'Focused Executor',
    age: 19,
    background: 'Second-year B.Com student at Symbiosis. Coordinated stage logistics for his college cultural festival.',
    avatar: '👨‍💼',
    qualities: {
      focusOrg: 5,
      creativity: 2,
      communication: 3,
      adaptability: 2,
    },
    skills: {
      research: 2,
      marketing: 2,
      finance: 3,
      operations: 5,
      creativity: 2,
    },
    monthlyStipend: 5000,
    strength: 'Organises tasks and schedules, tracks routine responsibilities, helps maintain operational consistency.',
    strengthsList: [
      'Organises tasks and schedules with checklists',
      'Tracks routine day-to-day responsibilities faithfully',
      'Helps maintain steady delivery consistency',
    ],
    limitation: 'Needs guidance when priorities change unexpectedly; less effective at generating unconventional ideas.',
    limitationsList: [
      'Needs guidance when priorities change unexpectedly',
      'Less effective at generating unconventional ideas',
    ],
    personality: 'Structured, reliable, system-focused. Follows protocols without deviation.',
    bestFor: ['Food & hospitality logistics', 'High-volume operations', 'Order fulfillment routines'],
    consequence: {
      operationsBonus: 0.25,
      marketingBonus: 0.0,
      researchBonus: 0.05,
      budgetDrain: 5000,
    },
  },
  {
    id: 'riya',
    name: 'Riya Kapoor',
    roleTitle: 'Creative Problem-Solver',
    age: 18,
    background: 'First-year BMS student at NMIMS. Active student marketer and social media campaign coordinator.',
    avatar: '👩‍💻',
    qualities: {
      focusOrg: 3,
      creativity: 5,
      communication: 4,
      adaptability: 5,
    },
    skills: {
      research: 4,
      marketing: 5,
      finance: 2,
      operations: 2,
      creativity: 5,
    },
    monthlyStipend: 5500,
    strength: 'Generates alternative ideas, explores different customer angles, and adapts quickly to new situations.',
    strengthsList: [
      'Generates creative alternative solutions under pressure',
      'Explores diverse customer segments & empathy angles',
      'Adapts quickly when market conditions shift',
    ],
    limitation: 'Occasionally loses track of repetitive operational tasks; may propose ideas that exceed current budget constraints.',
    limitationsList: [
      'Occasionally loses track of repetitive operational checklists',
      'May propose ambitious ideas that exceed current budget',
    ],
    personality: 'Curious, energetic, intuitive. Thrives on discovery and customer dialogue.',
    bestFor: ['EdTech interactive design', 'Customer acquisition campaigns', 'Value proposition testing'],
    consequence: {
      operationsBonus: 0.0,
      marketingBonus: 0.25,
      researchBonus: 0.15,
      budgetDrain: 5500,
    },
  },
  {
    id: 'kabir',
    name: 'Kabir Singh',
    roleTitle: 'Inexperienced Beginner',
    age: 18,
    background: 'First-year student eager to break into startups. Handled basic hostel inventory and spreadsheet logs.',
    avatar: '🧑‍🎓',
    qualities: {
      focusOrg: 2,
      creativity: 3,
      communication: 2,
      adaptability: 2,
    },
    skills: {
      research: 2,
      marketing: 2,
      finance: 3,
      operations: 2,
      creativity: 3,
    },
    monthlyStipend: 2500,
    strength: 'Highly enthusiastic, asks honest beginner questions challenging assumptions, lowest onboarding cost.',
    strengthsList: [
      'Highly enthusiastic and eager to absorb new skills',
      'Asks honest beginner questions challenging unexamined assumptions',
      'Lowest onboarding and monthly stipend cost (preserves runway)',
    ],
    limitation: 'Requires close supervision and structured guidance; takes longer to complete multi-step operational tasks.',
    limitationsList: [
      'Requires close supervision and step-by-step guidance',
      'Takes longer to complete multi-step operational tasks',
    ],
    personality: 'Humble, eager, impressionable. Wants to prove himself with mentorship.',
    bestFor: ['Bootstrapped ventures with tight cash runway', 'Simple standardized tasks', 'Founders willing to coach'],
    consequence: {
      operationsBonus: 0.05,
      marketingBonus: 0.05,
      researchBonus: 0.05,
      budgetDrain: 2500,
    },
  },
];

// ─── Quality Rating Bar Component (Restrained Palette) ─────────────────────────

const QualityBar: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="flex items-center gap-2">
    <span className="text-[11px] text-[#575952] w-32 shrink-0 font-medium">{label}</span>
    <div className="flex gap-1 flex-1">
      {[1, 2, 3, 4, 5].map((dot) => (
        <div
          key={dot}
          className={`h-1.5 flex-1 rounded-sm transition-all ${
            dot <= value ? 'bg-[#234B3A]' : 'bg-[#D9D5C9]'
          }`}
        />
      ))}
    </div>
    <span className="text-[11px] font-mono font-bold text-[#22251F] w-6 text-right">{value}/5</span>
  </div>
);

// ─── Props ─────────────────────────────────────────────────────────────────────

interface InternHiringModalProps {
  onHire: (intern: InternCandidate) => void;
  onSkip: () => void;
  currentBudget: number;
}

// ─── Component ─────────────────────────────────────────────────────────────────

export const InternHiringModal: React.FC<InternHiringModalProps> = ({
  onHire,
  onSkip,
  currentBudget,
}) => {
  const [selected, setSelected] = useState<InternCandidate | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    if (selected) {
      setConfirmed(true);
      setTimeout(() => onHire(selected), 600);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#22251F]/60 backdrop-blur-sm animate-fade-in text-left">
      <div className="bg-[#FFFFFF] border border-[#D9D5C9] rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-[#D9D5C9] bg-[#F6F3EA] flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#E8F0EC] border border-[#C4D9CD] text-[10px] font-mono font-bold uppercase tracking-wider text-[#234B3A]">
              <Users className="w-3 h-3" />
              STAGE MILESTONE // INTERN RECRUITMENT
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#22251F]">
              Select Your Startup's First Intern
            </h2>
            <p className="text-xs text-[#575952]">
              Your product architecture is set. Now select exactly one intern candidate. Their strengths, weaknesses, and stipend will directly impact your upcoming operations and customer reach.
            </p>
          </div>
          <button
            onClick={onSkip}
            className="p-2 text-[#7E8078] hover:text-[#22251F] hover:bg-[#D9D5C9]/40 rounded-lg transition-colors cursor-pointer"
            aria-label="Skip hiring for now"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Candidate Cards Grid */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {INTERN_CANDIDATES.map((candidate) => {
              const isSelected = selected?.id === candidate.id;

              return (
                <div
                  key={candidate.id}
                  onClick={() => setSelected(candidate)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between text-left ${
                    isSelected
                      ? 'border-[#234B3A] bg-[#E8F0EC]/30 shadow-sm'
                      : 'border-[#D9D5C9] hover:border-[#B8B3A4] bg-[#FFFFFF]'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Candidate Top Profile */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{candidate.avatar}</span>
                        <div>
                          <h3 className="font-bold text-[#22251F] text-sm leading-tight">
                            {candidate.name}
                          </h3>
                          <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#F0EDE4] text-[#575952] mt-0.5">
                            {candidate.roleTitle}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-[#22251F] font-mono">
                          ₹{candidate.monthlyStipend.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-[#7E8078]">/ month</div>
                      </div>
                    </div>

                    <p className="text-xs text-[#575952] line-clamp-2">
                      {candidate.background}
                    </p>

                    {/* Qualities Bars */}
                    <div className="space-y-1.5 pt-2 border-t border-[#D9D5C9]">
                      <QualityBar label="Focus & Organisation" value={candidate.qualities.focusOrg} />
                      <QualityBar label="Creativity" value={candidate.qualities.creativity} />
                      <QualityBar label="Communication" value={candidate.qualities.communication} />
                      <QualityBar label="Adaptability" value={candidate.qualities.adaptability} />
                    </div>

                    {/* Key Strengths */}
                    <div className="space-y-1 pt-2 border-t border-[#D9D5C9]">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#234B3A] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Core Strengths
                      </div>
                      <ul className="text-[11px] text-[#22251F] space-y-0.5 list-disc pl-3.5">
                        {candidate.strengthsList.map((str, i) => (
                          <li key={i}>{str}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Limitations */}
                    <div className="space-y-1 pt-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#B9684D] flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Key Limitations
                      </div>
                      <ul className="text-[11px] text-[#575952] space-y-0.5 list-disc pl-3.5">
                        {candidate.limitationsList.map((lim, i) => (
                          <li key={i}>{lim}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Selection Indicator Button */}
                  <div className="pt-4">
                    <button
                      type="button"
                      className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#234B3A] text-[#F6F3EA]'
                          : 'bg-[#F0EDE4] text-[#22251F] hover:bg-[#D9D5C9]'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Candidate Selected</span>
                        </>
                      ) : (
                        <span>Choose {candidate.name.split(' ')[0]}</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trade-off summary note */}
          <div className="p-3.5 rounded-xl bg-[#F6F3EA] border border-[#D9D5C9] text-xs text-[#575952] flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#234B3A] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#22251F]">Pedagogical Trade-off:</strong> There is no single "correct" intern. Aarav guarantees logistics uptime during lunch surges; Riya generates creative marketing traction; Kabir protects scarce seed runway with minimal stipend burn. Your choice will carry forward into subsequent operations.
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div className="p-4 px-6 border-t border-[#D9D5C9] bg-[#F6F3EA] flex items-center justify-between gap-4">
          <button
            onClick={onSkip}
            className="text-xs text-[#575952] hover:text-[#22251F] font-medium underline underline-offset-4 cursor-pointer"
          >
            Skip for now (operate solo)
          </button>

          <div className="flex items-center gap-3">
            {selected && (
              <span className="text-xs text-[#575952] hidden sm:inline">
                Stipend ₹{selected.monthlyStipend.toLocaleString('en-IN')}/mo deducted from operations budget.
              </span>
            )}
            <button
              onClick={handleConfirm}
              disabled={!selected || confirmed}
              className="btn-primary text-xs"
            >
              <span>{confirmed ? 'Hiring Confirmed...' : 'Confirm Intern Selection'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
