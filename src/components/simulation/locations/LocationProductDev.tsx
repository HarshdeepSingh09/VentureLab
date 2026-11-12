import React from 'react';
import { 
  FlaskConical, CheckCircle2, ArrowRight, Info, Handshake, Star, Check
} from 'lucide-react';
import type { 
  SimulationState, 
  SimulationLocationId, 
  ProductFeature 
} from '../../../simulation/types';
import { ALL_SCENARIOS, ALL_SUPPLIER_OFFERS } from '../../../simulation/scenarioData';
import { MODULE_MAP } from '../../../simulation/moduleData';
import { ModuleLearningHeader } from '../ui/ModuleLearningHeader';

interface LocationProductDevProps {
  state: SimulationState;
  setState: React.Dispatch<React.SetStateAction<SimulationState>>;
  onNavigate: (locationId: SimulationLocationId) => void;
  onOpenAssumptions?: () => void;
}

const TOTAL_DEV_POINTS = 100;

export const LocationProductDev: React.FC<LocationProductDevProps> = ({
  state,
  setState,
  onNavigate,
  onOpenAssumptions,
}) => {
  const scenario = ALL_SCENARIOS[state.founder?.scenarioId || 'campus_meal'] || ALL_SCENARIOS.campus_meal;

  // Calculate used dev points
  const usedDevPoints = state.selectedFeatureIds.reduce((sum: number, featId: string) => {
    const feat = scenario.features.find((f: ProductFeature) => f.id === featId);
    return sum + (feat ? feat.devCost : 0);
  }, 0);

  const remainingDevPoints = TOTAL_DEV_POINTS - usedDevPoints;

  const toggleFeature = (feat: ProductFeature) => {
    const isSelected = state.selectedFeatureIds.includes(feat.id);
    if (isSelected) {
      setState((prev: SimulationState) => ({
        ...prev,
        selectedFeatureIds: prev.selectedFeatureIds.filter((id: string) => id !== feat.id),
      }));
    } else {
      if (feat.devCost > remainingDevPoints) {
        alert(`Not enough development points! This feature requires ${feat.devCost} points, but you only have ${remainingDevPoints} remaining. De-select another feature first.`);
        return;
      }
      setState((prev: SimulationState) => ({
        ...prev,
        selectedFeatureIds: [...prev.selectedFeatureIds, feat.id],
        completedLocations: prev.completedLocations.includes('product_dev')
          ? prev.completedLocations
          : [...prev.completedLocations, 'product_dev'],
      }));
    }
  };

  // Group features by Recommended Roadmap Phase
  const phases = [
    'Phase 1: First Version',
    'Phase 2: Customer Feedback',
    'Phase 3: Future Scale',
  ] as const;

  const currentModule = MODULE_MAP.mod_4_product_design;

  const handleSaveReflection = (text: string) => {
    setState((prev) => ({
      ...prev,
      studentReflections: {
        ...prev.studentReflections,
        mod_4_product_design: text,
      },
      completedModules: Array.from(new Set([...prev.completedModules, 'mod_4_product_design'])),
    }));
  };

  return (
    <div className="space-y-8 text-left animate-in fade-in duration-200">
      {/* Module 4 Learning Header */}
      <ModuleLearningHeader
        module={currentModule}
        reflectionValue={state.studentReflections['mod_4_product_design'] || ''}
        onSaveReflection={handleSaveReflection}
        isCompleted={state.selectedFeatureIds.length > 0}
        onOpenAssumptions={onOpenAssumptions}
      />

      {/* Location Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-600" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800/60 text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
              <FlaskConical className="w-3.5 h-3.5" />
              LOCATION 03 // PRODUCT DEVELOPMENT LAB
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Configure Your Minimum Viable Product (MVP)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Select key features within your limited development budget. Every feature introduces development cost, launch time, appeal, and operational complexity.
            </p>
          </div>

          {/* Dev Points Gauge */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-right shrink-0">
            <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">
              Dev Resources Remaining:
            </div>
            <div className={`text-2xl font-black ${remainingDevPoints < 20 ? 'text-amber-400' : 'text-cyan-400'}`}>
              {remainingDevPoints} <span className="text-xs text-slate-400 font-normal">/ {TOTAL_DEV_POINTS} Pts</span>
            </div>
            <div className="w-32 bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
              <div
                className="bg-cyan-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${(usedDevPoints / TOTAL_DEV_POINTS) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feature Selection Grid by Roadmap Phases */}
      <div className="space-y-6">
        {phases.map((phaseTitle) => {
          const phaseFeatures = scenario.features.filter((f: ProductFeature) => f.recommendedPhase === phaseTitle);
          if (phaseFeatures.length === 0) return null;

          return (
            <div key={phaseTitle} className="space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  {phaseTitle}
                </span>
                <span className="text-[10px] text-slate-400">
                  {phaseTitle.includes('Phase 1')
                    ? '&bull; Essential for initial launch validation'
                    : phaseTitle.includes('Phase 2')
                    ? '&bull; Ship after learning from first 50 customers'
                    : '&bull; Long-term moat once profitable'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {phaseFeatures.map((feat: ProductFeature) => {
                  const isSelected = state.selectedFeatureIds.includes(feat.id);
                  return (
                    <div
                      key={feat.id}
                      onClick={() => toggleFeature(feat)}
                      className={`p-5 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 border-amber-400 shadow-xl ring-1 ring-amber-400/50'
                          : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-800/60">
                            {feat.devCost} Dev Points
                          </span>
                          {isSelected ? (
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Included
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-400">Click to add</span>
                          )}
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-white">
                            {feat.name}
                          </h4>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            {feat.description}
                          </p>
                        </div>

                        {/* Trade-Off Matrix Metrics */}
                        <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 grid grid-cols-2 gap-2 text-[10px]">
                          <div>
                            <span className="text-slate-400 block">Launch Time:</span>
                            <span className="text-slate-200 font-bold">{feat.timeToLaunchWeeks} weeks</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Customer Appeal:</span>
                            <span className="text-cyan-400 font-bold">{'★'.repeat(feat.customerAppealImpact)}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Ops Complexity:</span>
                            <span className={`font-bold ${
                              feat.operationalComplexity === 'High' ? 'text-rose-400' : feat.operationalComplexity === 'Moderate' ? 'text-amber-400' : 'text-emerald-400'
                            }`}>
                              {feat.operationalComplexity}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Est. Cost:</span>
                            <span className="text-slate-200 font-bold">₹{feat.rupeeCost.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-bold text-amber-400 flex items-center justify-between">
                        <span>{isSelected ? 'Remove Feature' : 'Select Feature'}</span>
                        <span className="text-xs">{isSelected ? '✓' : '+'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pedagogical Roadmap Explainer Box */}
      <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-300">Why not build every feature immediately? </strong>
          Adding too many features pre-launch exhausts development budget, delays your launch date by months, and increases kitchen operational complexity before validating customer demand. Successful ventures ship a focused MVP first.
        </div>
      </div>

      {/* Supplier & Partner Terms Negotiation Activity (Requirement 7) */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400">
              <Handshake className="w-3.5 h-3.5" />
              <span>SUPPLIER & PARTNER NEGOTIATION</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Choose Key Sourcing & Packaging Partner
            </h3>
            <p className="text-xs text-slate-300">
              Compare payment credit terms, unit costs, minimum order commitments, and sustainability grades.
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Selected Supplier:</span>
            <span className="text-xs font-bold text-cyan-400 font-mono">
              {ALL_SUPPLIER_OFFERS.find((s) => s.id === state.selectedSupplierOfferId)?.partnerName || 'None Selected (Default ₹48/unit)'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ALL_SUPPLIER_OFFERS.map((offer) => {
            const isSelected = state.selectedSupplierOfferId === offer.id;

            return (
              <div
                key={offer.id}
                onClick={() => {
                  setState((prev) => ({
                    ...prev,
                    selectedSupplierOfferId: isSelected ? null : offer.id,
                  }));
                }}
                className={`p-5 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-950/40 border-blue-500 shadow-xl ring-1 ring-blue-500/50'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-blue-400 font-bold uppercase">
                      {offer.partnerType}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-black">
                      ₹{offer.unitCostRupees}/unit
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white">{offer.partnerName}</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-snug">{offer.headline}</p>
                  </div>

                  {/* Terms Specs */}
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-[11px] font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Payment Terms:</span>
                      <span className="text-slate-200 font-bold">{offer.paymentTerms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Min Order:</span>
                      <span className="text-slate-200 font-bold">{offer.minimumCommitmentUnits} units/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Sustainability:</span>
                      <span className="text-cyan-400 font-bold">Grade {offer.sustainabilityGrade}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Reliability:</span>
                      <span className="text-amber-400 flex items-center">
                        {Array.from({ length: offer.reliabilityRating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400 inline" />
                        ))}
                      </span>
                    </div>
                  </div>

                  {/* Tradeoff Summary */}
                  <p className="text-[11px] text-slate-400 italic leading-snug">
                    &bull; {offer.tradeoffSummary}
                  </p>
                </div>

                <button
                  type="button"
                  className={`mt-4 w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Agreement Signed</span>
                    </>
                  ) : (
                    <span>Sign Agreement</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div className="text-xs text-slate-400">
          Selected: <strong>{state.selectedFeatureIds.length} Features</strong> ({usedDevPoints} / {TOTAL_DEV_POINTS} points).
        </div>
        <button
          onClick={() => onNavigate('finance_center')}
          disabled={state.selectedFeatureIds.length === 0}
          className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            state.selectedFeatureIds.length > 0
              ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span>Continue to Finance Center</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
