import React, { useState } from 'react';
import {
  GraduationCap,
  BarChart3,
  BookOpen,
  Printer,
  X,
  Play,
  AlertTriangle,
  Users,
  HelpCircle,
  Sparkles,
  Clock,
  Layers,
  MessageSquare
} from 'lucide-react';
import type { ClassroomChallengeScenario } from '../../../simulation/types';
import { CLASSROOM_CHALLENGES } from '../../../simulation/scenarioData';
import { ALL_LEARNING_MODULES } from '../../../simulation/moduleData';

interface EducatorPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchChallenge: (challengeId: string) => void;
}

interface DemoSquadData {
  id: string;
  squadName: string;
  founders: string;
  ventureName: string;
  category: string;
  completedModulesCount: number;
  investorScore: number;
  rubricLevel: 'Beginning' | 'Developing' | 'Proficient' | 'Advanced';
  availableCash: number;
  runwayMonths: number;
  keyDecision: string;
  reflectionSample: string;
  teacherSupportNeed: string;
}

const DEMO_SQUADS: DemoSquadData[] = [
  {
    id: 'squad-1',
    squadName: 'Squad Alpha',
    founders: 'Aarav Sharma & Priya Sen',
    ventureName: 'BiteCraft Labs',
    category: 'Food & Hospitality',
    completedModulesCount: 10,
    investorScore: 84,
    rubricLevel: 'Advanced',
    availableCash: 24500,
    runwayMonths: 3.8,
    keyDecision: 'Partnered with GreenRoots Organic under Net-30 terms; maintained ₹18,000 emergency buffer.',
    reflectionSample: 'Asking customers about what they ate yesterday revealed hostel meal dissatisfaction far more accurately than hypothetical interest questions.',
    teacherSupportNeed: 'Ready for cross-campus distribution scaling challenges.',
  },
  {
    id: 'squad-2',
    squadName: 'Squad Beta',
    founders: 'Kavya Nair & Rohan Varma',
    ventureName: 'EcoLoop Packaging',
    category: 'Sustainability',
    completedModulesCount: 8,
    investorScore: 71,
    rubricLevel: 'Proficient',
    availableCash: 12000,
    runwayMonths: 2.1,
    keyDecision: 'Selected BioPack circular containers; absorbed 22% supplier price spike without cutting hygiene.',
    reflectionSample: 'We realized that charging students a refundable deposit for reusable meal boxes reduced box loss by 85%.',
    teacherSupportNeed: 'Needs guidance on calculating realistic CAC across WhatsApp vs offline campus flyers.',
  },
  {
    id: 'squad-3',
    squadName: 'Squad Gamma',
    founders: 'Vikram Joshi & Ananya Bose',
    ventureName: 'TutorPeer Exchange',
    category: 'Education Technology',
    completedModulesCount: 10,
    investorScore: 88,
    rubricLevel: 'Advanced',
    availableCash: 31000,
    runwayMonths: 4.5,
    keyDecision: 'Kept dev features focused on peer booking calendar; negotiated student ambassador referral commission.',
    reflectionSample: 'Feature creep was our biggest risk. Cutting video streaming saved 35 dev points and let us launch two weeks earlier.',
    teacherSupportNeed: 'Strong analytical skills; encourage them to mentor Squad Delta on cash runway calculations.',
  },
  {
    id: 'squad-4',
    squadName: 'Squad Delta',
    founders: 'Sneha Patel & Arjun Mehta',
    ventureName: 'Campus Courier Lockers',
    category: 'Local Services',
    completedModulesCount: 6,
    investorScore: 59,
    rubricLevel: 'Developing',
    availableCash: 3200,
    runwayMonths: 0.9,
    keyDecision: 'Matched rival price cut to ₹45; exhausted emergency buffer when cold storage equipment failed.',
    reflectionSample: 'We learned the hard way that fighting a price war with low cash reserves is suicidal.',
    teacherSupportNeed: 'Requires intervention on unit economics: explain why gross margin must exceed fixed operating costs.',
  },
];

export const EducatorPortalModal: React.FC<EducatorPortalModalProps> = ({
  isOpen,
  onClose,
  onLaunchChallenge,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'squads' | 'implementation' | 'challenges' | 'prompts'>('overview');
  const [selectedSquadId, setSelectedSquadId] = useState<string>('squad-1');
  const [selectedChallenge, setSelectedChallenge] = useState<ClassroomChallengeScenario>(
    CLASSROOM_CHALLENGES[0]
  );

  if (!isOpen) return null;

  const selectedSquad = DEMO_SQUADS.find((s) => s.id === selectedSquadId) || DEMO_SQUADS[0];

  const handlePrintSummary = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#22251F]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl rounded-3xl bg-[#FFFFFF] border border-[#D9D5C9] shadow-2xl p-6 sm:p-10 text-left space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#D9D5C9] pb-5 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#234B3A]/10 border border-[#234B3A]/20 text-[10px] font-mono font-bold uppercase tracking-widest text-[#234B3A] mb-1">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>EDUCATOR & ACADEMIC COORDINATOR DASHBOARD</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#22251F]">
              Classroom Entrepreneurship Telemetry
            </h2>
            <p className="text-xs text-[#22251F]/70">
              Demonstration Classroom: <strong>Class 11-B Entrepreneurship Cohort</strong> &bull; 8 Student Squads (Sample Data)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintSummary}
              className="px-4 py-2 rounded-xl bg-[#F6F3EA] hover:bg-[#D9D5C9]/50 border border-[#D9D5C9] text-[#22251F] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export Summary</span>
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-[#F6F3EA] hover:bg-[#D9D5C9]/50 border border-[#D9D5C9] text-[#22251F]/70 hover:text-[#22251F] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Fictional Sample Data Notice */}
        <div className="p-3.5 rounded-2xl bg-[#F6F3EA] border border-[#D9D5C9] text-[11px] text-[#22251F]/80 flex items-center gap-2.5">
          <HelpCircle className="w-4 h-4 text-[#B9684D] shrink-0" />
          <span>
            <strong className="text-[#22251F]">Demonstration Classroom Notice: </strong>
            Populated with illustrative sample student squads for school evaluation. VENTURELAB does not store unauthenticated student PII.
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 border-b border-[#D9D5C9] pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-[#234B3A] text-white shadow-sm'
                : 'bg-[#F6F3EA] text-[#22251F]/70 hover:text-[#22251F] border border-[#D9D5C9]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Class Telemetry</span>
          </button>

          <button
            onClick={() => setActiveTab('squads')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'squads'
                ? 'bg-[#234B3A] text-white shadow-sm'
                : 'bg-[#F6F3EA] text-[#22251F]/70 hover:text-[#22251F] border border-[#D9D5C9]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Squad Work & Reflections ({DEMO_SQUADS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('implementation')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'implementation'
                ? 'bg-[#234B3A] text-white shadow-sm'
                : 'bg-[#F6F3EA] text-[#22251F]/70 hover:text-[#22251F] border border-[#D9D5C9]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Classroom Implementation & Lesson Flow</span>
          </button>

          <button
            onClick={() => setActiveTab('challenges')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'challenges'
                ? 'bg-[#234B3A] text-white shadow-sm'
                : 'bg-[#F6F3EA] text-[#22251F]/70 hover:text-[#22251F] border border-[#D9D5C9]'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Challenge Scenarios ({CLASSROOM_CHALLENGES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('prompts')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'prompts'
                ? 'bg-[#234B3A] text-white shadow-sm'
                : 'bg-[#F6F3EA] text-[#22251F]/70 hover:text-[#22251F] border border-[#D9D5C9]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Socratic Debrief Prompts</span>
          </button>
        </div>

        {/* TAB 1: Class Overview & Telemetry */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-[#F6F3EA] border border-[#D9D5C9] space-y-1">
                <span className="text-[10px] font-mono text-[#22251F]/60 uppercase">Enrolled Students</span>
                <span className="text-2xl font-black text-[#22251F] font-mono block">32</span>
                <span className="text-[10px] text-[#22251F]/60 block">8 Venture Squads</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#F6F3EA] border border-[#D9D5C9] space-y-1">
                <span className="text-[10px] font-mono text-[#22251F]/60 uppercase">Module Completion</span>
                <span className="text-2xl font-black text-[#234B3A] font-mono block">85%</span>
                <span className="text-[10px] text-[#22251F]/60 block">7 / 8 Completed Final Pitch</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#F6F3EA] border border-[#D9D5C9] space-y-1">
                <span className="text-[10px] font-mono text-[#22251F]/60 uppercase">Avg Rubric Score</span>
                <span className="text-2xl font-black text-[#B9684D] font-mono block">75.5 / 100</span>
                <span className="text-[10px] text-[#22251F]/60 block">4-Level Rubric Weighted</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#F6F3EA] border border-[#D9D5C9] space-y-1">
                <span className="text-[10px] font-mono text-[#22251F]/60 uppercase">Top Ending Outcome</span>
                <span className="text-sm font-black text-[#234B3A] block pt-1">Sustainable Venture</span>
                <span className="text-[10px] text-[#22251F]/60 block">5 Squads Achieved</span>
              </div>
            </div>

            {/* Identified Learning Struggles & Pedagogical Interventions */}
            <div className="p-5 rounded-2xl bg-[#F6F3EA] border border-[#D9D5C9] space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#B9684D] flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-[#B9684D]" />
                <span>Identified Class Learning Gaps & Student Tendencies:</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-white border border-[#D9D5C9] space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-[#B9684D] font-bold">Price War Trap</span>
                    <span className="text-[#22251F]/60">65% of squads</span>
                  </div>
                  <p className="text-[11px] text-[#22251F]/80 leading-snug">
                    Students instinctively match rival discounts without checking if unit margin drops below zero.
                  </p>
                  <span className="text-[10px] text-[#234B3A] font-semibold block pt-1">Teacher Action: Contrast price vs quality moat.</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#D9D5C9] space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-[#B9684D] font-bold">Emergency Buffer Neglect</span>
                    <span className="text-[#22251F]/60">48% of squads</span>
                  </div>
                  <p className="text-[11px] text-[#22251F]/80 leading-snug">
                    Allocated zero funds to cash reserves; face insolvency when supplier prices spike +22%.
                  </p>
                  <span className="text-[10px] text-[#234B3A] font-semibold block pt-1">Teacher Action: Teach cash runway vs paper profit.</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#D9D5C9] space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-[#B9684D] font-bold">Feature Bloat Risk</span>
                    <span className="text-[#22251F]/60">42% of squads</span>
                  </div>
                  <p className="text-[11px] text-[#22251F]/80 leading-snug">
                    Exhausted dev points on 6+ features before validating willingness to pay in interviews.
                  </p>
                  <span className="text-[10px] text-[#234B3A] font-semibold block pt-1">Teacher Action: Enforce 2-feature MVP constraint.</span>
                </div>
              </div>
            </div>

            {/* 10 Module Completion Tracker Across Cohort */}
            <div className="p-5 rounded-2xl bg-[#F6F3EA] border border-[#D9D5C9] space-y-3">
              <span className="text-xs font-mono uppercase font-bold text-[#22251F]/70 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#234B3A]" />
                <span>10-Module Curriculum Progression:</span>
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                {ALL_LEARNING_MODULES.map((m) => (
                  <div key={m.id} className="p-2.5 rounded-xl bg-white border border-[#D9D5C9] text-center space-y-1">
                    <span className="text-[10px] font-mono text-[#22251F]/60 block font-bold">M{m.order}: {m.shortTitle}</span>
                    <span className="text-[#234B3A] font-mono font-bold text-sm block">100%</span>
                    <span className="text-[9px] text-[#22251F]/60 block">8 / 8 Completed</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Switchable Squad Work & Submitted Reflections */}
        {activeTab === 'squads' && (
          <div className="space-y-5">
            {/* Squad Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {DEMO_SQUADS.map((squad) => (
                <button
                  key={squad.id}
                  onClick={() => setSelectedSquadId(squad.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap border ${
                    selectedSquadId === squad.id
                      ? 'bg-[#234B3A] text-white border-[#234B3A] shadow-sm'
                      : 'bg-[#F6F3EA] text-[#22251F]/70 hover:text-[#22251F] border-[#D9D5C9]'
                  }`}
                >
                  <span>{squad.squadName}: {squad.ventureName}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    selectedSquadId === squad.id ? 'bg-white/20 text-white' : 'bg-[#D9D5C9] text-[#22251F]'
                  }`}>
                    {squad.rubricLevel}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected Squad Detail Inspection Card */}
            <div className="p-6 rounded-3xl bg-[#F6F3EA] border border-[#D9D5C9] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#D9D5C9] pb-3 gap-2">
                <div>
                  <h3 className="text-lg font-bold text-[#22251F] flex items-center gap-2">
                    <span>{selectedSquad.ventureName}</span>
                    <span className="text-xs font-mono text-[#22251F]/60 font-normal">({selectedSquad.category})</span>
                  </h3>
                  <p className="text-xs text-[#22251F]/70">
                    Founders: <strong>{selectedSquad.founders}</strong> &bull; Progress: <strong>{selectedSquad.completedModulesCount}/10 Modules Completed</strong>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-[#22251F]/60 uppercase block">Rubric Assessment</span>
                    <span className="text-sm font-black text-[#B9684D] font-mono">{selectedSquad.rubricLevel} ({selectedSquad.investorScore}/100)</span>
                  </div>
                </div>
              </div>

              {/* Financial Snapshot */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white border border-[#D9D5C9]">
                  <span className="text-[10px] text-[#22251F]/60 uppercase block">Cash Balance</span>
                  <span className="font-bold text-[#234B3A] font-mono">₹{selectedSquad.availableCash.toLocaleString('en-IN')}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#D9D5C9]">
                  <span className="text-[10px] text-[#22251F]/60 uppercase block">Runway</span>
                  <span className="font-bold text-[#22251F] font-mono">{selectedSquad.runwayMonths} Months</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#D9D5C9] col-span-2">
                  <span className="text-[10px] text-[#22251F]/60 uppercase block">Key Strategic Move</span>
                  <span className="text-[#22251F] text-[11px] leading-snug block mt-0.5">{selectedSquad.keyDecision}</span>
                </div>
              </div>

              {/* Submitted Student Reflection */}
              <div className="p-4 rounded-2xl bg-white border border-[#D9D5C9] space-y-1.5 text-xs">
                <span className="text-[10px] font-mono uppercase font-bold text-[#234B3A] flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#234B3A]" />
                  <span>Submitted Reflection Sample (From Student Portfolio)</span>
                </span>
                <p className="text-[#22251F]/90 italic leading-relaxed">
                  &ldquo;{selectedSquad.reflectionSample}&rdquo;
                </p>
              </div>

              {/* Teacher Support Area */}
              <div className="p-3.5 rounded-xl bg-[#B9684D]/10 border border-[#B9684D]/30 text-xs flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#B9684D] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#B9684D]">Targeted Teacher Coaching Recommendation: </strong>
                  <span className="text-[#22251F]/80">{selectedSquad.teacherSupportNeed}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Classroom Implementation & 45-Minute Lesson Flow */}
        {activeTab === 'implementation' && (
          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-[#F6F3EA] border border-[#D9D5C9] space-y-3">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#234B3A] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#234B3A]" />
                <span>Proposed 45-Minute Classroom Lesson Flow (Example):</span>
              </h3>
              <p className="text-xs text-[#22251F]/70 leading-relaxed">
                VENTURELAB is designed to complement teacher instruction in commerce, economics, and entrepreneurship classes.
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-[#D9D5C9] flex items-start gap-3">
                  <span className="w-20 shrink-0 font-mono font-bold text-[#234B3A]">00–10 Min</span>
                  <div>
                    <h5 className="font-bold text-[#22251F]">Teacher Hook & Problem Discovery</h5>
                    <p className="text-[#22251F]/70 text-[11px] leading-snug">
                      Teacher frames the day's challenge: "Why do campus food stalls fail within 6 months?" Students launch into Module 1 (Problem Discovery).
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#D9D5C9] flex items-start gap-3">
                  <span className="w-20 shrink-0 font-mono font-bold text-[#234B3A]">10–25 Min</span>
                  <div>
                    <h5 className="font-bold text-[#22251F]">Squad Collaborative Lab (Modules 2–4)</h5>
                    <p className="text-[#22251F]/70 text-[11px] leading-snug">
                      Squads of 2–3 students interview fictional personas, allocate 100 dev points, and negotiate supplier credit terms.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#D9D5C9] flex items-start gap-3">
                  <span className="w-20 shrink-0 font-mono font-bold text-[#234B3A]">25–35 Min</span>
                  <div>
                    <h5 className="font-bold text-[#22251F]">Crisis Injection & Strategic Pivot</h5>
                    <p className="text-[#22251F]/70 text-[11px] leading-snug">
                      Teacher triggers the "Supply Chain Inflation" crisis. Squads deliberate whether to absorb costs or adjust batch sizing.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#D9D5C9] flex items-start gap-3">
                  <span className="w-20 shrink-0 font-mono font-bold text-[#234B3A]">35–45 Min</span>
                  <div>
                    <h5 className="font-bold text-[#22251F]">Socratic Debrief & Written Reflection</h5>
                    <p className="text-[#22251F]/70 text-[11px] leading-snug">
                      Whole-class debrief contrasting cash runway vs accounting profit. Students submit their module reflection exit ticket.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-[#22251F]/60 italic pt-1">
                * Note: Lesson plans, timings, and learning objectives are proposed examples for school evaluation and subject to classroom customization.
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Classroom Challenge Scenarios */}
        {activeTab === 'challenges' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CLASSROOM_CHALLENGES.map((challenge) => {
                const isSelected = selectedChallenge.id === challenge.id;
                return (
                  <div
                    key={challenge.id}
                    onClick={() => setSelectedChallenge(challenge)}
                    className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#F6F3EA] border-[#234B3A] shadow-md ring-1 ring-[#234B3A]'
                        : 'bg-white border-[#D9D5C9] hover:border-[#22251F]/40'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#234B3A]/10 text-[#234B3A] font-bold uppercase">
                          {challenge.difficulty}
                        </span>
                        <span className="text-[10px] font-mono text-[#234B3A] font-bold">
                          Seed: ₹{challenge.startingBudget.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#22251F]">{challenge.title}</h4>
                      <p className="text-xs text-[#22251F]/70 leading-snug">{challenge.description}</p>
                    </div>

                    <div className="pt-3 border-t border-[#D9D5C9] mt-3 text-[11px] text-[#B9684D]">
                      <strong>Constraint: </strong>
                      {challenge.specialConstraint}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 rounded-2xl bg-[#F6F3EA] border border-[#D9D5C9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#234B3A] font-bold block">Selected Scenario</span>
                <h4 className="text-sm font-bold text-[#22251F]">{selectedChallenge.title}</h4>
                <p className="text-xs text-[#22251F]/70">{selectedChallenge.targetGoal}</p>
              </div>

              <button
                onClick={() => {
                  onLaunchChallenge(selectedChallenge.id);
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl bg-[#234B3A] hover:bg-[#1a382b] text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm transition-colors shrink-0"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Launch Challenge in Simulation</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: Socratic Discussion Prompts */}
        {activeTab === 'prompts' && (
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-[#F6F3EA] border border-[#D9D5C9] space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#234B3A] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Discussion Prompts for Post-Simulation Debrief:</span>
              </h4>

              <div className="space-y-2.5 text-xs text-[#22251F]/80">
                <div className="p-3.5 rounded-xl bg-white border border-[#D9D5C9] space-y-1">
                  <span className="text-[#234B3A] font-bold">1. On Unit Economics & Pricing:</span>
                  <p className="italic text-[#22251F]/80">
                    &ldquo;When a competitor slashes prices by 40%, why is matching their discount often a death spiral for a bootstrapped venture? What alternative moats exist besides being the cheapest?&rdquo;
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#D9D5C9] space-y-1">
                  <span className="text-[#234B3A] font-bold">2. On Working Capital & Cash Runway:</span>
                  <p className="italic text-[#22251F]/80">
                    &ldquo;Why can a venture show a healthy paper profit on its income statement and still shut down next Tuesday because it cannot pay the kitchen supplier?&rdquo;
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#D9D5C9] space-y-1">
                  <span className="text-[#234B3A] font-bold">3. On Operational Scaling:</span>
                  <p className="italic text-[#22251F]/80">
                    &ldquo;What happens to customer satisfaction when daily orders double but your kitchen throughput stays the same? Is a waitlist a sign of failure or smart capacity management?&rdquo;
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#D9D5C9] space-y-1">
                  <span className="text-[#B9684D] font-bold">4. On Business Ethics & Brand Equity:</span>
                  <p className="italic text-[#22251F]/80">
                    &ldquo;When wholesale ingredient prices spiked, what were the second-order consequences of cutting food quality vs slightly increasing meal price? Which protected customer trust in the long run?&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-3 border-t border-[#D9D5C9] flex items-center justify-between text-xs text-[#22251F]/60">
          <span>VENTURELAB Educator Portal &bull; Fictional Demonstration Cohort</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#234B3A] hover:bg-[#1a382b] text-white font-semibold cursor-pointer transition-colors"
          >
            Close Portal
          </button>
        </div>
      </div>
    </div>
  );
};
