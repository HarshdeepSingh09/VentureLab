import React from 'react';
import { 
  Building2, Compass, FlaskConical, Wallet, 
  Megaphone, Gauge, Users, Swords, Presentation, 
  CheckCircle2, AlertTriangle, BookOpen 
} from 'lucide-react';

import type { 
  SimulationState, 
  SimulationLocationId 
} from '../../simulation/types';

import { LocationStartupStudio } from './locations/LocationStartupStudio';
import { LocationCustomerDiscovery } from './locations/LocationCustomerDiscovery';
import { LocationProductDev } from './locations/LocationProductDev';
import { LocationFinanceCenter } from './locations/LocationFinanceCenter';
import { LocationMarketingStudio } from './locations/LocationMarketingStudio';
import { LocationOperationsCenter } from './locations/LocationOperationsCenter';
import { LocationCustomerInsights } from './locations/LocationCustomerInsights';
import { LocationBusinessChallenge } from './locations/LocationBusinessChallenge';
import { LocationCompetitionHub } from './locations/LocationCompetitionHub';
import { LocationInvestorArena } from './locations/LocationInvestorArena';
import { LocationReflectionReview } from './locations/LocationReflectionReview';

interface DashboardModeViewProps {
  state: SimulationState;
  setState: React.Dispatch<React.SetStateAction<SimulationState>>;
  onOpenTeam: () => void;
  onOpenAchievements: () => void;
  onOpenReport: () => void;
  onReset: () => void;
  onOpenAssumptions: () => void;
}

export const DashboardModeView: React.FC<DashboardModeViewProps> = ({
  state,
  setState,
  onOpenTeam,
  onOpenAchievements,
  onOpenReport,
  onReset,
  onOpenAssumptions,
}) => {
  const setLocation = (locId: SimulationLocationId) => {
    setState((prev) => ({
      ...prev,
      currentLocation: locId,
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuItems = [
    { id: 'startup_studio' as SimulationLocationId, label: '1. Startup Studio', icon: Building2, desc: 'Mission & objectives' },
    { id: 'customer_discovery' as SimulationLocationId, label: '2. Customer Discovery', icon: Compass, desc: 'Problem & idea selection' },
    { id: 'customer_insights' as SimulationLocationId, label: '3. Customer Insights', icon: Users, desc: 'Persona interview queries' },
    { id: 'product_dev' as SimulationLocationId, label: '4. Product Development', icon: FlaskConical, desc: 'Features & MVP roadmap' },
    { id: 'finance_center' as SimulationLocationId, label: '5. Finance Center', icon: Wallet, desc: 'Budget & survival ledger' },
    { id: 'marketing_studio' as SimulationLocationId, label: '6. Marketing Studio', icon: Megaphone, desc: 'Channels & CAC reach' },
    { id: 'business_challenge' as SimulationLocationId, label: '7. Crisis Room', icon: AlertTriangle, desc: 'Dynamic events & ethics' },
    { id: 'operations_center' as SimulationLocationId, label: '8. Operations Center', icon: Gauge, desc: 'Capacity bottleneck dilemma' },
    { id: 'competition_hub' as SimulationLocationId, label: '9. Competition Hub', icon: Swords, desc: 'Rival moves & counter-moat' },
    { id: 'investor_arena' as SimulationLocationId, label: '10. Investor Arena', icon: Presentation, desc: 'Capstone deck & panel verdict' },
    { id: 'reflection_review' as SimulationLocationId, label: '11. Reflection & Review', icon: BookOpen, desc: 'Portfolio & capstone analysis' },
  ];

  return (
    <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto p-4 sm:p-5 lg:p-6 gap-5 text-left">

      {/* Left Navigation Sidebar */}
      <aside className="w-full lg:w-64 shrink-0 space-y-3">
        <div className="px-3 py-2.5 rounded-xl bg-[#111520] border border-white/[0.07] text-xs text-slate-500">
          Navigate directly between all 11 departments.
        </div>

        {/* Navigation Menu */}
        <nav className="rounded-xl bg-[#111520] border border-white/[0.07] overflow-hidden">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            const isCurrent = state.currentLocation === item.id;
            const isCompleted = state.completedLocations.includes(item.id);

            return (
              <button
                key={item.id}
                onClick={() => setLocation(item.id)}
                className={`w-full px-3 py-2.5 text-left transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                  idx < menuItems.length - 1 ? 'border-b border-white/[0.05]' : ''
                } ${
                  isCurrent
                    ? 'bg-blue-600/15 border-l-2 border-l-blue-500'
                    : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-blue-400' : 'text-slate-500'}`} />
                  <div className="truncate">
                    <div className={`text-xs font-medium ${isCurrent ? 'text-white' : ''}`}>{item.label}</div>
                    <div className="text-[10px] text-slate-600 truncate">{item.desc}</div>
                  </div>
                </div>

                {isCompleted && (
                  <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-blue-400' : 'text-emerald-500'}`} />
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Working Panel */}
      <main className="flex-1 min-w-0">
        {state.currentLocation === 'startup_studio' && (
          <LocationStartupStudio
            state={state}
            setState={setState}
            onNavigate={setLocation}
            onOpenTeam={onOpenTeam}
            onOpenAchievements={onOpenAchievements}
            onOpenAssumptions={onOpenAssumptions}
          />
        )}

        {state.currentLocation === 'customer_discovery' && (
          <LocationCustomerDiscovery
            state={state}
            setState={setState}
            onNavigate={setLocation}
            onOpenAssumptions={onOpenAssumptions}
          />
        )}

        {state.currentLocation === 'product_dev' && (
          <LocationProductDev
            state={state}
            setState={setState}
            onNavigate={setLocation}
            onOpenAssumptions={onOpenAssumptions}
          />
        )}

        {state.currentLocation === 'finance_center' && (
          <LocationFinanceCenter
            state={state}
            setState={setState}
            onNavigate={setLocation}
            onOpenAssumptions={onOpenAssumptions}
          />
        )}

        {state.currentLocation === 'marketing_studio' && (
          <LocationMarketingStudio
            state={state}
            setState={setState}
            onNavigate={setLocation}
            onOpenAssumptions={onOpenAssumptions}
          />
        )}

        {state.currentLocation === 'customer_insights' && (
          <LocationCustomerInsights
            state={state}
            setState={setState}
            onNavigate={setLocation}
            onOpenAssumptions={onOpenAssumptions}
          />
        )}

        {state.currentLocation === 'business_challenge' && (
          <LocationBusinessChallenge
            state={state}
            setState={setState}
            onNavigate={setLocation}
            onOpenAssumptions={onOpenAssumptions}
          />
        )}

        {state.currentLocation === 'operations_center' && (
          <LocationOperationsCenter
            state={state}
            setState={setState}
            onNavigate={setLocation}
            onOpenAssumptions={onOpenAssumptions}
          />
        )}

        {state.currentLocation === 'competition_hub' && (
          <LocationCompetitionHub
            state={state}
            setState={setState}
            onNavigate={setLocation}
          />
        )}

        {state.currentLocation === 'investor_arena' && (
          <LocationInvestorArena
            state={state}
            setState={setState}
            onOpenReport={onOpenReport}
            onReset={onReset}
            onNavigate={setLocation}
            onOpenAssumptions={onOpenAssumptions}
          />
        )}

        {state.currentLocation === 'reflection_review' && (
          <LocationReflectionReview
            state={state}
            setState={setState}
            onOpenReport={onOpenReport}
            onNavigate={setLocation}
          />
        )}
      </main>
    </div>
  );
};
