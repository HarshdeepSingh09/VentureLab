import React from 'react';
import { 
  FileText, Printer, CheckCircle2, 
  X, ShieldCheck, Award, 
  ArrowRight, RotateCcw, 
  TrendingUp, Users, BookOpen
} from 'lucide-react';
import type { SimulationState } from '../../../simulation/types';
import { calculateSimulationResults } from '../../../simulation/simulationEngine';
import { ALL_SCENARIOS, ALL_PROBLEMS, ALL_SUPPLIER_OFFERS } from '../../../simulation/scenarioData';
import { evaluateStudentAssessment } from '../../../simulation/assessmentEngine';
import { ALL_LEARNING_MODULES } from '../../../simulation/moduleData';

interface EndOfJourneyReportModalProps {
  state: SimulationState;
  onClose: () => void;
  onReset: () => void;
}

export const EndOfJourneyReportModal: React.FC<EndOfJourneyReportModalProps> = ({
  state,
  onClose,
  onReset,
}) => {
  const scenario = ALL_SCENARIOS[state?.founder?.scenarioId || 'campus_meal'] || ALL_SCENARIOS.campus_meal;
  const results = calculateSimulationResults(state);
  const assessment = evaluateStudentAssessment(state);
  const unlockedAchievements = (state?.achievements || []).filter((a) => a.unlocked);

  const selectedProblem = ALL_PROBLEMS.find((p) => p.id === state?.selectedProblemId) || scenario.problems[0];
  const selectedSupplier = ALL_SUPPLIER_OFFERS.find((s) => s.id === state?.selectedSupplierOfferId);
  const decisionJournal = state?.decisionJournal || [];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#22251F]/60 backdrop-blur-sm animate-fade-in text-left">
      <div className="relative w-full max-w-4xl rounded-2xl bg-[#FFFFFF] border border-[#D9D5C9] shadow-2xl p-6 sm:p-10 space-y-7 max-h-[92vh] overflow-y-auto print:max-h-none print:overflow-visible print:border-none print:shadow-none print:p-0">
        
        {/* Top Report Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#D9D5C9] pb-5 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#E8F0EC] border border-[#C4D9CD] text-[10px] font-mono font-bold uppercase tracking-wider text-[#234B3A] mb-1.5">
              <FileText className="w-3.5 h-3.5" />
              VENTURELAB SUMMATIVE ENTREPRENEURSHIP PORTFOLIO
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#22251F]">
              {state?.founder?.ventureName || 'VentureLab Startup'} &mdash; Capstone Report
            </h2>
            <p className="text-xs text-[#575952]">
              Student Founder: <strong className="text-[#22251F]">{state?.founder?.displayName || 'Student Founder'}</strong> &bull; Domain: <strong className="text-[#22251F]">{state?.founder?.category || 'Campus Venture'}</strong> &bull; Cohort: <strong className="text-[#22251F]">Classes 9–12</strong>
            </p>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="btn-primary text-xs py-2 px-3 flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#F6F3EA] border border-[#D9D5C9] text-[#575952] hover:text-[#22251F] transition-colors cursor-pointer"
              aria-label="Close Capstone Report"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Ending Outcome & Assessment Banner */}
        <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#D9D5C9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-[#234B3A] uppercase font-bold tracking-wider">
              VENTURE OUTCOME &amp; INVESTOR EVALUATION
            </span>
            <h3 className="text-lg font-bold text-[#22251F]">
              {results?.ending?.title || 'Sustainable Venture'}
            </h3>
            <p className="text-xs text-[#575952] max-w-xl leading-relaxed">
              {results?.ending?.description || 'Your disciplined execution built a viable campus venture.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <span className="text-[10px] font-mono text-[#7E8078] uppercase block">Investor Score</span>
              <span className="text-xl font-black font-mono text-[#234B3A]">
                {results?.investorScore ?? 85}/100
              </span>
            </div>
            <div className="text-right border-l border-[#D9D5C9] pl-3">
              <span className="text-[10px] font-mono text-[#7E8078] uppercase block">Rubric Level</span>
              <span className="text-sm font-bold text-[#B9684D]">
                {assessment?.overallLevel || 'Proficient'}
              </span>
            </div>
          </div>
        </div>

        {/* 1. Venture Overview & Value Proposition */}
        <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#D9D5C9] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#234B3A] uppercase font-bold tracking-wider">
              1. VENTURE OVERVIEW &amp; CORE PROPOSITION
            </span>
            <span className="text-xs font-mono text-[#575952]">
              {state?.founder?.category || 'Venture'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] text-[#7E8078] uppercase font-bold">Identified Problem</span>
              <p className="text-[#22251F] leading-relaxed font-medium">
                {selectedProblem?.title}: {selectedProblem?.description}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-[#7E8078] uppercase font-bold">Target Customer Segment</span>
              <p className="text-[#22251F] leading-relaxed font-medium">
                {state?.selectedCustomerSegmentId ? state.selectedCustomerSegmentId.replace('_', ' ').toUpperCase() : 'Campus Community'}
                {' &mdash; '}
                {state?.pitchDeck?.targetCustomer || 'Campus Hostellers'}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#D9D5C9] text-xs text-[#22251F]">
            <strong>Value Proposition: </strong>
            &ldquo;{state?.pitchDeck?.valueProposition || 'Punctual, healthy, and affordable daily meals tailored for students.'}&rdquo;
          </div>
        </div>

        {/* 2. Intern & Team Allocation */}
        <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#D9D5C9] space-y-2">
          <span className="text-[10px] font-mono text-[#234B3A] uppercase font-bold tracking-wider">
            2. INTERN HIRING &amp; TEAM GOVERNANCE
          </span>
          <div className="text-xs text-[#22251F]">
            {state?.internHired ? (
              <div className="space-y-1">
                <div>
                  Hired Candidate: <strong className="text-[#234B3A]">{state.internHired.name} ({state.internHired.roleTitle})</strong> &bull; Monthly Stipend: ₹{(state.internHired.monthlyStipend || 0).toLocaleString('en-IN')}/mo
                </div>
                <div className="text-[#575952]">
                  Strengths applied: {(state.internHired.strengthsList || ['Focused task execution']).join(', ')}.
                </div>
              </div>
            ) : (
              <div className="text-[#575952]">
                Operating as a solo founder without intern hire.
              </div>
            )}
          </div>
        </div>

        {/* 3. Deterministic Financial Results & Ledger */}
        <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#D9D5C9] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#234B3A] uppercase font-bold tracking-wider">
              3. SIMULATED FINANCIAL &amp; OPERATIONAL RESULTS
            </span>
            <span className="text-[10px] text-[#7E8078] font-mono">Deterministic Engine</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#D9D5C9]">
              <span className="text-[10px] text-[#7E8078] font-mono uppercase block">Total Revenue</span>
              <span className="text-base font-bold font-mono text-[#22251F]">
                ₹{(results?.estimatedRevenue || 0).toLocaleString('en-IN')}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#D9D5C9]">
              <span className="text-[10px] text-[#7E8078] font-mono uppercase block">Operating Expenses</span>
              <span className="text-base font-bold font-mono text-[#575952]">
                ₹{(results?.totalOperationalExpenses || 0).toLocaleString('en-IN')}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#D9D5C9]">
              <span className="text-[10px] text-[#7E8078] font-mono uppercase block">Gross Margin</span>
              <span className="text-base font-bold font-mono text-[#234B3A]">
                {results?.grossMarginPercentage || 0}%
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#D9D5C9]">
              <span className="text-[10px] text-[#7E8078] font-mono uppercase block">Customer Satisfaction</span>
              <span className="text-base font-bold font-mono text-[#234B3A]">
                {results?.customerSatisfaction || 0}%
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#D9D5C9]">
              <span className="text-[10px] text-[#7E8078] font-mono uppercase block">Remaining Cash</span>
              <span className="text-base font-bold font-mono text-[#234B3A]">
                ₹{(results?.remainingCash || 0).toLocaleString('en-IN')}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#D9D5C9]">
              <span className="text-[10px] text-[#7E8078] font-mono uppercase block">Cash Runway</span>
              <span className="text-base font-bold font-mono text-[#22251F]">
                {results?.runwayMonths || 0} Months
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#D9D5C9]">
              <span className="text-[10px] text-[#7E8078] font-mono uppercase block">Orders Fulfilled</span>
              <span className="text-base font-bold font-mono text-[#22251F]">
                {results?.ordersFulfilled || 0}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#D9D5C9]">
              <span className="text-[10px] text-[#7E8078] font-mono uppercase block">Reputation Score</span>
              <span className="text-base font-bold font-mono text-[#B9684D]">
                {results?.businessReputation || 0}/100
              </span>
            </div>
          </div>
        </div>

        {/* 4. Complete Decision Journal Log */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#22251F] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#234B3A]" />
              <span>Complete Decision Journal ({decisionJournal.length} Logged Decisions)</span>
            </h3>
          </div>

          <div className="space-y-2">
            {decisionJournal.length === 0 ? (
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#D9D5C9] text-xs text-[#7E8078] italic">
                No decisions recorded in journal yet. Complete simulation stages to log your strategic decisions and reflections.
              </div>
            ) : (
              decisionJournal.map((entry, idx) => (
                <div key={entry?.id || idx} className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#D9D5C9] text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#22251F]">
                      {idx + 1}. {entry?.decision || 'Strategic Choice'}
                    </span>
                    <span className="text-[10px] font-mono text-[#7E8078]">
                      {entry?.locationName || 'Stage'} &bull; {entry?.timestamp || ''}
                    </span>
                  </div>
                  <div className="text-[#575952] leading-relaxed">
                    <strong>Simulated Consequence:</strong> {entry?.consequence || 'Applied to venture state.'}
                  </div>
                  {entry?.tradeoff && (
                    <div className="text-[11px] text-[#7E8078]">
                      <strong>Trade-off:</strong> {entry.tradeoff}
                    </div>
                  )}
                  {entry?.reflection && (
                    <div className="text-[11px] text-[#234B3A] italic bg-[#E8F0EC]/40 p-2 rounded border border-[#C4D9CD]">
                      Student Reflection: &ldquo;{entry.reflection}&rdquo;
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#D9D5C9] pt-4 gap-4 text-xs text-[#7E8078] print:hidden">
          <div>
            VENTURELAB Experiential Entrepreneurship &bull; Verified Classroom Learning Sandbox
          </div>
          <div className="flex gap-2">
            <button
              onClick={onReset}
              className="btn-outline text-xs py-1.5 px-3 cursor-pointer"
            >
              Restart Simulation
            </button>
            <button
              onClick={onClose}
              className="btn-primary text-xs py-1.5 px-4 cursor-pointer"
            >
              Close Capstone
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
