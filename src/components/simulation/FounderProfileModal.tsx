import React, { useState } from 'react';
import { Building2, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { FounderProfile, BusinessCategory, ScenarioId } from '../../simulation/types';

interface FounderProfileModalProps {
  initialProfile?: FounderProfile | null;
  onSaveProfile: (profile: FounderProfile) => void;
  onCancel?: () => void;
}

const PRIMARY_SCENARIOS: { label: BusinessCategory; scenarioId: ScenarioId; title: string; desc: string; icon: string; badge: string }[] = [
  {
    label: 'Food and hospitality',
    scenarioId: 'campus_meal',
    title: 'Food & Beverage',
    desc: 'Campus Meal Network — solve daily student lunch delays, menu pricing, kitchen batching, and rush hour capacity.',
    icon: '🍱',
    badge: 'Popular Simulation',
  },
  {
    label: 'Education',
    scenarioId: 'edtech',
    title: 'EdTech Platform',
    desc: 'PeerPrep EdTech — build visual micro-simulations, balance freemium vs school licensing, and optimize student retention.',
    icon: '🎓',
    badge: 'STEM Education',
  },
  {
    label: 'Sustainability',
    scenarioId: 'sustainability',
    title: 'Sustainable Products',
    desc: 'EcoLoop Circular Campus — eliminate single-use plastic takeaway containers with a smart deposit-return reusable network.',
    icon: '🌱',
    badge: 'Zero Waste',
  },
];

export const FounderProfileModal: React.FC<FounderProfileModalProps> = ({
  initialProfile,
  onSaveProfile,
  onCancel,
}) => {
  const [displayName, setDisplayName] = useState(initialProfile?.displayName || '');
  const [ventureName, setVentureName] = useState(initialProfile?.ventureName || '');
  const [selectedScenarioId, setSelectedScenarioId] = useState<ScenarioId>(
    initialProfile?.scenarioId || 'campus_meal'
  );
  const [error, setError] = useState('');

  const selectedItem = PRIMARY_SCENARIOS.find((c) => c.scenarioId === selectedScenarioId) || PRIMARY_SCENARIOS[0];

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      setError('Please enter your founder name to continue.');
      return;
    }
    if (!ventureName.trim()) {
      setError('Please give your venture a name (e.g. BiteCraft, QuickPrep, EcoLoop).');
      return;
    }

    const newProfile: FounderProfile = {
      displayName: displayName.trim(),
      ventureName: ventureName.trim(),
      category: selectedItem.label,
      scenarioId: selectedItem.scenarioId,
      createdAt: new Date().toISOString(),
    };
    onSaveProfile(newProfile);
  };

  const handlePresetSelect = (scenarioId: ScenarioId) => {
    setSelectedScenarioId(scenarioId);
    if (!ventureName || ventureName === 'BiteCraft Labs' || ventureName === 'PeerPrep Labs' || ventureName === 'EcoLoop Circular') {
      if (scenarioId === 'campus_meal') setVentureName('BiteCraft Labs');
      if (scenarioId === 'edtech') setVentureName('PeerPrep Labs');
      if (scenarioId === 'sustainability') setVentureName('EcoLoop Circular');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#22251F]/60 backdrop-blur-sm animate-fade-in text-left">
      <div className="bg-[#FFFFFF] border border-[#D9D5C9] rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Top Header */}
        <div className="p-6 border-b border-[#D9D5C9] bg-[#F6F3EA]">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#E8F0EC] border border-[#C4D9CD] text-[10px] font-mono font-bold uppercase tracking-wider text-[#234B3A] mb-2">
            <span>VENTURE SETUP // STEP 01</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#22251F]">
            Launch Your 2D Venture Simulation
          </h2>
          <p className="text-xs sm:text-sm text-[#575952] mt-1">
            Configure your founder identity and select your business domain. Every decision you make will produce deterministic financial and operational consequences.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleStart} className="p-6 overflow-y-auto flex-1 space-y-5 bg-[#FFFFFF]">
          {error && (
            <div className="p-3 rounded-lg bg-[#F8EFEA] border border-[#E5C3B6] text-xs text-[#B9684D] font-medium">
              {error}
            </div>
          )}

          {/* Name & Venture Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#22251F] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#234B3A]" />
                Founder Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => {
                  setDisplayName(e.target.value);
                  setError('');
                }}
                placeholder="e.g. Aarav Sharma"
                className="w-full px-3 py-2 text-sm rounded-lg border border-[#D9D5C9] bg-[#F6F3EA] text-[#22251F] focus:outline-none focus:border-[#234B3A] focus:bg-[#FFFFFF] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#22251F] flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#234B3A]" />
                Venture Name
              </label>
              <input
                type="text"
                value={ventureName}
                onChange={(e) => {
                  setVentureName(e.target.value);
                  setError('');
                }}
                placeholder="e.g. BiteCraft Labs"
                className="w-full px-3 py-2 text-sm rounded-lg border border-[#D9D5C9] bg-[#F6F3EA] text-[#22251F] focus:outline-none focus:border-[#234B3A] focus:bg-[#FFFFFF] transition-colors"
              />
            </div>
          </div>

          {/* Scenario Selection */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#22251F]">
                Select Business Category &amp; Scenario
              </label>
              <span className="text-[11px] text-[#7E8078]">
                Distinct decisions, constraints &amp; models
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PRIMARY_SCENARIOS.map((item) => {
                const isSelected = selectedScenarioId === item.scenarioId;
                return (
                  <div
                    key={item.scenarioId}
                    onClick={() => handlePresetSelect(item.scenarioId)}
                    className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between text-left ${
                      isSelected
                        ? 'border-[#234B3A] bg-[#E8F0EC]/40 shadow-xs'
                        : 'border-[#D9D5C9] hover:border-[#B8B3A4] bg-[#FFFFFF]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{item.icon}</span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-[#234B3A]" />
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-[#22251F]">{item.title}</h4>
                      <p className="text-[11px] text-[#575952] mt-1 line-clamp-3 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-[#D9D5C9]">
                      <span className="text-[10px] font-mono font-semibold text-[#234B3A]">
                        {item.badge}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scenario Preview Box */}
          <div className="p-3.5 rounded-xl bg-[#F6F3EA] border border-[#D9D5C9] text-xs text-[#575952]">
            <strong className="text-[#22251F]">Starting Capital:</strong> ₹1,00,000 seed budget &bull; <strong className="text-[#22251F]">Duration:</strong> 11 interactive stages with intern hiring and final investor evaluation.
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-between gap-3 border-t border-[#D9D5C9]">
            {onCancel ? (
              <button
                type="button"
                onClick={onCancel}
                className="text-xs text-[#575952] hover:text-[#22251F] font-medium cursor-pointer"
              >
                Back to Overview
              </button>
            ) : <div />}

            <button
              type="submit"
              className="btn-primary text-xs py-2.5 px-5 cursor-pointer"
            >
              <span>Enter 2D Simulation Lab</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
