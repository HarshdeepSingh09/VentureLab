import React, { useState } from 'react';
import { Play, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Building2, Users } from 'lucide-react';
import { ScenarioIllustration } from './simulation/ui/ScenarioIllustrations';
import type { ScenarioId } from '../simulation/types';

interface SimulationHeroPreview2DProps {
  onOpenSimulation: () => void;
}

const HERO_SCENARIOS = [
  {
    id: 'campus_meal' as ScenarioId,
    label: 'Food & Beverage',
    ventureName: 'BiteCraft Labs',
    category: 'Campus Meal Network',
    stage: 'Stage 01: Discover a Problem',
    challenge: 'Students have strict 35-min lecture breaks. Outside delivery apps arrive 45 minutes late and charge ₹200+. Canteens are overcrowded.',
    options: [
      { id: '1', title: 'Wholesome ₹85 Thali Subscription', benefit: 'Predictable 1:12 PM batch drop', margin: '35% margin' },
      { id: '2', title: 'On-Demand Flexible Fast-Food', benefit: 'Appeals to impulse snacks', margin: 'High kitchen waste' },
    ],
  },
  {
    id: 'edtech' as ScenarioId,
    label: 'EdTech Platform',
    ventureName: 'PeerPrep Labs',
    category: 'Interactive STEM Learning',
    stage: 'Stage 04: MVP Solution Design',
    challenge: 'Secondary students get left behind in 90-person coaching batches. Passive video lectures have a 78% dropout rate.',
    options: [
      { id: '1', title: 'Visual Micro-Simulation Sandbox', benefit: 'Interactive variable sliders', margin: 'Near-zero unit cost' },
      { id: '2', title: 'Pre-recorded 45-min Video Library', benefit: 'Cheap to license', margin: 'Low retention' },
    ],
  },
  {
    id: 'sustainability' as ScenarioId,
    label: 'Sustainable Products',
    ventureName: 'EcoLoop Circular',
    category: 'Reusable Packaging Loop',
    stage: 'Stage 05: Build a Business Model',
    challenge: '15,000+ single-use styrofoam boxes are discarded on campus weekly. Vendors pay ₹5.50 for disposable packaging.',
    options: [
      { id: '1', title: 'Smart NFC Deposit-Return Network', benefit: '500+ wash durability', margin: 'Vendor saves ₹2/meal' },
      { id: '2', title: 'Single-Use Compostable Paper Trays', benefit: 'Zero return required', margin: 'Expensive recurring cost' },
    ],
  },
];

export const SimulationHeroPreview2D: React.FC<SimulationHeroPreview2DProps> = ({ onOpenSimulation }) => {
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState('1');

  const scenario = HERO_SCENARIOS[selectedScenarioIdx];

  return (
    <div className="card-clean overflow-hidden text-left shadow-lg border border-[#D9D5C9] bg-[#FFFFFF]">
      
      {/* Top Bar with Scenario Tabs */}
      <div className="p-3 bg-[#F6F3EA] border-b border-[#D9D5C9] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#B9684D]" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#234B3A]">
            SIMULATION LAB PREVIEW
          </span>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="flex items-center gap-1">
          {HERO_SCENARIOS.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => {
                setSelectedScenarioIdx(idx);
                setSelectedOpt('1');
              }}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                selectedScenarioIdx === idx
                  ? 'bg-[#234B3A] text-[#F6F3EA] font-semibold'
                  : 'bg-[#FFFFFF] text-[#575952] border border-[#D9D5C9] hover:bg-[#F0EDE4]'
              }`}
            >
              {sc.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Preview Workspace */}
      <div className="p-4 sm:p-5 space-y-4">
        
        {/* Venture Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-[#22251F]">
              {scenario.ventureName}
            </h3>
            <span className="text-[11px] text-[#575952]">
              {scenario.category} &bull; <strong className="text-[#234B3A]">{scenario.stage}</strong>
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E8F0EC] text-[#234B3A] font-bold">
            100% 2D Simulation
          </span>
        </div>

        {/* 2D Vector Illustration */}
        <div className="rounded-lg overflow-hidden border border-[#D9D5C9]">
          <ScenarioIllustration
            scenarioId={scenario.id}
            stageId="customer_discovery"
            className="w-full h-44 sm:h-52"
          />
        </div>

        {/* Dilemma Challenge Box */}
        <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#D9D5C9] text-xs space-y-1">
          <div className="text-[10px] font-mono font-bold uppercase text-[#B9684D]">
            The Strategic Dilemma:
          </div>
          <p className="text-[#22251F] text-[11px] leading-relaxed">
            {scenario.challenge}
          </p>
        </div>

        {/* Selectable Decision Options */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase text-[#575952] block">
            Make Your Choice:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {scenario.options.map((opt) => {
              const isSelected = selectedOpt === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setSelectedOpt(opt.id)}
                  className={`p-2.5 rounded-lg border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#234B3A] bg-[#E8F0EC]/40'
                      : 'border-[#D9D5C9] hover:border-[#B8B3A4] bg-[#FFFFFF]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <span className="text-xs font-bold text-[#22251F]">{opt.title}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#234B3A] shrink-0" />}
                  </div>
                  <div className="text-[10px] text-[#234B3A]">{opt.benefit}</div>
                  <div className="text-[10px] text-[#7E8078]">{opt.margin}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Launch Button */}
        <div className="pt-2 border-t border-[#D9D5C9] flex items-center justify-between">
          <span className="text-[11px] text-[#575952] hidden sm:inline">
            Includes intern hiring, financial ledger &amp; decision journal
          </span>
          <button
            onClick={onOpenSimulation}
            className="btn-primary text-xs py-2 px-4 w-full sm:w-auto"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Launch VentureLab Simulation</span>
          </button>
        </div>

      </div>

    </div>
  );
};
