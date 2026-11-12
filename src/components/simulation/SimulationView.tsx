import React, { useState, useEffect } from 'react';
import type { 
  SimulationState, 
  SimulationLocationId, 
  FounderProfile,
  InternCandidate,
  DecisionJournalEntry
} from '../../simulation/types';
import { INITIAL_BUDGET } from '../../simulation/simulationEngine';
import { INITIAL_ACHIEVEMENTS } from '../../simulation/achievementsData';
import { INITIAL_MISSIONS } from '../../simulation/missionData';
import { ALL_SCENARIOS } from '../../simulation/scenarioData';

import { SimulationWorkspace2D } from './SimulationWorkspace2D';
import { FounderProfileModal } from './FounderProfileModal';
import { MentorDrawer } from './ui/MentorDrawer';
import { DynamicEventsModal } from './modules/DynamicEventsModal';
import { EndOfJourneyReportModal } from './modules/EndOfJourneyReportModal';
import { SimulationAssumptionsModal } from './modules/SimulationAssumptionsModal';
import { InternHiringModal } from './modules/InternHiringModal';
import { DecisionJournalModal } from './modules/DecisionJournalModal';

interface SimulationViewProps {
  onExit: () => void;
  initialLocation?: SimulationLocationId;
}

const STORAGE_KEY_STATE = 'venturelab_sim_state_v6';
const STORAGE_KEY_PROFILE = 'venturelab_founder_profile_v5';

export const SimulationView: React.FC<SimulationViewProps> = ({ onExit, initialLocation }) => {
  // Load initial founder profile
  const [profile, setProfile] = useState<FounderProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });

  const [showProfileModal, setShowProfileModal] = useState(!profile);

  // Master Simulation State
  const [state, setState] = useState<SimulationState>(() => {
    // Try restoring state from localStorage
    try {
      const savedState = localStorage.getItem(STORAGE_KEY_STATE);
      if (savedState) {
        const parsed = JSON.parse(savedState);
        if (parsed && parsed.founder && parsed.budget) {
          return {
            ...parsed,
            isDashboardOnlyMode: true,
          };
        }
      }
    } catch {
      // ignore
    }

    const validScenarioId = (profile?.scenarioId && ALL_SCENARIOS[profile.scenarioId])
      ? profile.scenarioId
      : 'campus_meal';
    const activeScenario = ALL_SCENARIOS[validScenarioId];

    const founderData: FounderProfile = (profile && profile.displayName && profile.ventureName) ? {
      ...profile,
      scenarioId: validScenarioId,
    } : {
      displayName: 'Aarav Sharma',
      ventureName: 'BiteCraft Labs',
      category: 'Food and hospitality',
      scenarioId: 'campus_meal',
      createdAt: new Date().toISOString(),
    };

    return {
      founder: founderData,
      currentLocation: initialLocation || 'customer_discovery',
      completedLocations: ['startup_studio'],
      isDashboardOnlyMode: true,
      missions: INITIAL_MISSIONS,
      selectedProblemId: null,
      customProblemText: '',
      selectedIdeaId: null,
      interviewedPersonaQuestions: [],
      selectedCustomerSegmentId: null,
      selectedFeatureIds: ['feat-order-app', 'feat-flexi-pass'],
      availableDevPoints: 100,
      selectedSupplierOfferId: null,
      budget: INITIAL_BUDGET,
      selectedMarketingChannels: {
        'mkt-ambassadors': 10000,
        'mkt-social-whatsapp': 7500,
        'mkt-tasting-booth': 5000,
        'mkt-flyers': 2500,
      },
      activeEvent: null,
      resolvedEvents: [],
      selectedOperationsChoice: null,
      selectedCompetitionChoice: null,
      selectedEthicsChoices: {},
      activePivot: null,
      businessReputation: 78,
      team: activeScenario.teamRoster,
      achievements: INITIAL_ACHIEVEMENTS,
      pitchDeck: {
        businessName: profile?.ventureName || 'BiteCraft Labs',
        problem: 'Students struggle with high daily food expenses and long delivery delays missing 35-min lecture breaks.',
        solution: 'Scheduled campus lunchbox subscription delivered directly to insulated building lockers.',
        targetCustomer: '4,500 undergraduate hostellers and day scholars with tight lecture schedules.',
        valueProposition: 'Guaranteed hot meals within 2 minutes of class dismissal under ₹85.',
        businessModel: 'Prepaid 20-day lunch passes with automated kitchen batch preparation.',
        pricingStrategy: 'Tiered subscription pricing at ₹85/meal with 35% gross margin.',
        budgetAllocation: 'Seed budget of ₹1,00,000 allocated across operations, marketing, and emergency buffer.',
        acquisitionStrategy: 'Hostel student floor ambassadors and free lunch tasting kiosks.',
        mainRisks: 'Mid-semester wholesale ingredient inflation and kitchen throughput bottlenecks during lunch break.',
        financialResults: 'Projected monthly operating break-even within 45 days with positive unit cash flow.',
        futurePlans: 'Expand into dinner subscriptions and launch EcoLoop reusable thermal containers.',
      },
      isPitchCompleted: false,
      finalResults: null,
      selectedChallengeId: null,
      activeMentorTipId: null,
      completedModules: ['mod_1_problem_discovery'],
      studentReflections: {
        mod_1_problem_discovery: 'Targeting a daily, recurring problem like the campus lunch break rush provides a steady customer base.',
      },
      graphicsQuality: 'balanced',
      internHired: null,
      internHiringComplete: false,
      decisionJournal: [],
    };
  });

  // Modal states
  const [mentorOpen, setMentorOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [assumptionsModalOpen, setAssumptionsModalOpen] = useState(false);
  const [internHiringOpen, setInternHiringOpen] = useState(false);
  const [journalOpen, setJournalOpen] = useState(false);

  // Sync initialLocation if passed from landing page journey stage clicks
  useEffect(() => {
    if (initialLocation) {
      setState((prev) => ({
        ...prev,
        currentLocation: initialLocation,
      }));
    }
  }, [initialLocation]);

  // Persist state updates to local session storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(state));
    } catch {
      // storage fallback
    }
  }, [state]);

  const handleSaveProfile = (newProfile: FounderProfile) => {
    setProfile(newProfile);
    setShowProfileModal(false);
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(newProfile));
    } catch {
      // storage fallback
    }

    const scenario = ALL_SCENARIOS[newProfile.scenarioId] || ALL_SCENARIOS.campus_meal;

    setState((prev) => ({
      ...prev,
      founder: newProfile,
      team: scenario.teamRoster,
      pitchDeck: {
        ...prev.pitchDeck,
        businessName: newProfile.ventureName,
      },
    }));
  };

  const handleResolveEvent = (choiceId: string) => {
    if (!state.activeEvent) return;
    const eventId = state.activeEvent.id;
    setState((prev) => ({
      ...prev,
      activeEvent: null,
      resolvedEvents: [...prev.resolvedEvents, { eventId, choiceId }],
    }));
  };

  const handleReset = () => {
    if (window.confirm('Restart the simulation from the beginning? All your selections will be reset.')) {
      try {
        localStorage.removeItem(STORAGE_KEY_PROFILE);
        localStorage.removeItem(STORAGE_KEY_STATE);
      } catch {
        // ignore
      }
      setProfile(null);
      setShowProfileModal(true);
      setInternHiringOpen(false);
      setJournalOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleHireIntern = (intern: InternCandidate) => {
    setState((prev) => ({
      ...prev,
      internHired: intern,
      internHiringComplete: true,
      // Deduct one month stipend from operations budget
      budget: {
        ...prev.budget,
        operations: Math.max(0, prev.budget.operations - intern.consequence.budgetDrain),
      },
      // Record intern hiring in decision journal
      decisionJournal: [
        ...prev.decisionJournal,
        {
          id: `journal-intern-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          location: 'product_dev',
          locationName: 'Intern Recruitment',
          decision: `Hired Intern: ${intern.name} (${intern.roleTitle})`,
          consequence: `Stipend of ₹${intern.monthlyStipend.toLocaleString('en-IN')}/mo committed. Core strengths: ${intern.strengthsList.join(', ')}.`,
          tradeoff: intern.limitation,
        },
      ],
    }));
    setInternHiringOpen(false);
  };

  const handleSkipInternHiring = () => {
    setState((prev) => ({ ...prev, internHiringComplete: true }));
    setInternHiringOpen(false);
  };

  const handleAddJournalReflection = (entryId: string, reflection: string) => {
    setState((prev) => ({
      ...prev,
      decisionJournal: prev.decisionJournal.map((e) =>
        e.id === entryId ? { ...e, reflection } : e
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-[#F6F3EA] text-[#22251F] flex flex-col font-sans">

      {/* Onboarding Founder Profile Modal */}
      {showProfileModal && (
        <FounderProfileModal
          initialProfile={profile}
          onSaveProfile={handleSaveProfile}
          onCancel={onExit}
        />
      )}

      {/* 100% 2D Interactive Simulation Workspace */}
      <SimulationWorkspace2D
        state={state}
        setState={setState}
        onExit={onExit}
        onReset={handleReset}
        onOpenJournal={() => setJournalOpen(true)}
        onOpenAssumptions={() => setAssumptionsModalOpen(true)}
        onToggleMentor={() => setMentorOpen(!mentorOpen)}
        onOpenReport={() => setReportModalOpen(true)}
        onOpenInternHiring={() => setInternHiringOpen(true)}
      />

      {/* Contextual Business Mentor Drawer */}
      <MentorDrawer
        isOpen={mentorOpen}
        onClose={() => setMentorOpen(false)}
        state={state}
      />

      {/* Dynamic Business Events Modal */}
      {state.activeEvent && (
        <DynamicEventsModal
          event={state.activeEvent}
          onResolve={handleResolveEvent}
          onDismiss={() => setState((prev) => ({ ...prev, activeEvent: null }))}
        />
      )}

      {/* End of Journey Capstone Report Modal */}
      {reportModalOpen && (
        <EndOfJourneyReportModal
          state={state}
          onClose={() => setReportModalOpen(false)}
          onReset={handleReset}
        />
      )}

      {/* Transparent Simulation Assumptions & Formulas Modal */}
      <SimulationAssumptionsModal
        isOpen={assumptionsModalOpen}
        onClose={() => setAssumptionsModalOpen(false)}
      />

      {/* Intern Hiring Modal (Exactly 3 Candidates) */}
      {internHiringOpen && (
        <InternHiringModal
          onHire={handleHireIntern}
          onSkip={handleSkipInternHiring}
          currentBudget={
            state.budget.operations +
            state.budget.productDevelopment +
            state.budget.emergencyReserve
          }
        />
      )}

      {/* Decision Journal Modal */}
      {journalOpen && (
        <DecisionJournalModal
          entries={state.decisionJournal}
          onClose={() => setJournalOpen(false)}
          onAddReflection={handleAddJournalReflection}
        />
      )}
    </div>
  );
};
