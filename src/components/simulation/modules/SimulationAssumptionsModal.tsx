import React, { useState } from 'react';
import { 
  Calculator, 
  ShieldCheck, 
  X, 
  Sliders, 
  AlertCircle
} from 'lucide-react';
import { 
  SIMULATION_ASSUMPTIONS_DATA, 
  CORE_FINANCIAL_FORMULAS, 
  PEDAGOGICAL_DISCLAIMER_TEXT 
} from '../../../simulation/assumptionsData';

interface SimulationAssumptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SimulationAssumptionsModal: React.FC<SimulationAssumptionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'Illustrative Input', 'Fixed Assumption', 'Student Variable', 'Simplified Condition'];

  const filteredItems = filterCategory === 'All'
    ? SIMULATION_ASSUMPTIONS_DATA
    : SIMULATION_ASSUMPTIONS_DATA.filter((item) => item.category === filterCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#22251F]/60 backdrop-blur-sm animate-fade-in text-left">
      <div className="relative w-full max-w-4xl rounded-2xl bg-[#FFFFFF] border border-[#D9D5C9] shadow-2xl p-6 sm:p-8 space-y-5 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#D9D5C9] pb-4 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F0EC] border border-[#C4D9CD] text-[10px] font-mono font-bold uppercase tracking-wider text-[#234B3A] mb-1.5">
              <Calculator className="w-3.5 h-3.5" />
              <span>TRANSPARENT SIMULATION ENGINE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#22251F]">
              Simulation Assumptions, Rules &amp; Formulas
            </h2>
            <p className="text-xs text-[#575952]">
              Complete disclosure of starting variables, fixed constraints, student-controlled levers, and deterministic math.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#F6F3EA] border border-[#D9D5C9] text-[#575952] hover:text-[#22251F] transition-colors cursor-pointer"
            aria-label="Close Assumptions Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Educational Disclaimer Banner */}
        <div className="p-3.5 rounded-xl bg-[#F8EFEA] border border-[#E5C3B6] flex items-start gap-3 text-xs text-[#22251F]">
          <AlertCircle className="w-4 h-4 text-[#B9684D] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#B9684D]">Notice for Educators &amp; Academic Coordinators: </span>
            {PEDAGOGICAL_DISCLAIMER_TEXT}
          </div>
        </div>

        {/* Core Formulas Section */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#234B3A] flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-[#234B3A]" />
            <span>Deterministic Business Formulas</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CORE_FINANCIAL_FORMULAS.map((formula, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#D9D5C9] space-y-1">
                <div className="text-xs font-bold text-[#22251F]">{formula.name}</div>
                <div className="p-1.5 rounded bg-[#FFFFFF] border border-[#D9D5C9] font-mono text-[11px] text-[#234B3A] font-bold">
                  {formula.formula}
                </div>
                <div className="text-[11px] text-[#575952]">{formula.explanation}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Assumptions Filter and Table */}
        <div className="space-y-3 pt-2 border-t border-[#D9D5C9]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#575952]">
              Assumptions Registry ({filteredItems.length})
            </h3>
            <div className="flex flex-wrap gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                    filterCategory === cat
                      ? 'bg-[#234B3A] text-[#F6F3EA]'
                      : 'bg-[#F0EDE4] text-[#575952] hover:bg-[#D9D5C9]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {filteredItems.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#FFFFFF] border border-[#D9D5C9] text-xs space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-[#22251F]">{item.variableName}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#F0EDE4] text-[#575952]">
                    {item.category}
                  </span>
                </div>
                <div className="text-[#575952]">{item.description}</div>
                <div className="text-[11px] text-[#7E8078] italic">
                  <strong>Source / Pedagogical Rationale:</strong> {item.pedagogicalRationale}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#D9D5C9] flex justify-end">
          <button
            onClick={onClose}
            className="btn-primary text-xs py-1.5 px-4"
          >
            Close Assumptions
          </button>
        </div>

      </div>
    </div>
  );
};
