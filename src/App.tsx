import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection';
import { JourneySection } from './components/JourneySection';
import { BusinessWorldSection } from './components/BusinessWorldSection';
import { DecisionsConsequencesSection } from './components/DecisionsConsequencesSection';
import { StrategyMetricsSection } from './components/StrategyMetricsSection';
import { FinalPitchPreviewSection } from './components/FinalPitchPreviewSection';
import { WeeklyDilemmaSection } from './components/WeeklyDilemmaSection';
import { ClassroomWorkflowSection } from './components/ClassroomWorkflowSection';
import { ForSchoolsSection } from './components/ForSchoolsSection';
import { SchoolImplementationSection } from './components/SchoolImplementationSection';
import { PilotEnquirySection } from './components/PilotEnquirySection';
import { Footer } from './components/Footer';
import { SimulationView } from './components/simulation/SimulationView';
import { EducatorPortalModal } from './components/simulation/modules/EducatorPortalModal';
import { ErrorBoundary } from './components/ErrorBoundary';

import type { SimulationLocationId } from './simulation/types';

export const App: React.FC = () => {
  const [initialLocation, setInitialLocation] = useState<SimulationLocationId>('startup_studio');
  const [educatorModalOpen, setEducatorModalOpen] = useState(false);
  const [view, setView] = useState<'landing' | 'simulation'>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#simulation') {
      return 'simulation';
    }
    return 'landing';
  });

  // Support direct URL hash navigation (#simulation) and browser Back/Forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#simulation') {
        setView('simulation');
      } else {
        setView('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openSimulation = (locationId?: SimulationLocationId) => {
    if (locationId) {
      setInitialLocation(locationId);
    }
    window.location.hash = 'simulation';
    setView('simulation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeSimulation = () => {
    window.history.pushState(null, '', window.location.pathname);
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (view === 'simulation') {
    return (
      <ErrorBoundary fallbackTitle="VentureLab Simulation Safe Recovery" onReset={closeSimulation}>
        <SimulationView onExit={closeSimulation} initialLocation={initialLocation} />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary fallbackTitle="VentureLab Platform Recovery">
      <div className="min-h-screen bg-[#F6F3EA] text-[#22251F] flex flex-col font-sans">

        {/* Top Fixed Navigation */}
        <Navbar
          onOpenSimulation={openSimulation}
          onOpenEducatorPortal={() => setEducatorModalOpen(true)}
        />

      <main className="flex-1">
        {/* Section 2: Premium 3D Hero Section */}
        <HeroSection onOpenSimulation={openSimulation} />

        {/* Section 3A: The Entrepreneurship Journey (7 Stages) */}
        <JourneySection onOpenSimulation={openSimulation} />

        {/* Section 3B: Explore the Business World (7 Interactive 3D Cards) */}
        <BusinessWorldSection onOpenSimulation={openSimulation} />

        {/* Section 3C: Every Decision Has Consequences (Interactive Mini-Choice Preview) */}
        <DecisionsConsequencesSection onOpenSimulation={openSimulation} />

        {/* Section 3D: Your Business, Your Strategy (Live Metrics Telemetry Relationship) */}
        <StrategyMetricsSection onOpenSimulation={openSimulation} />

        {/* Section 3E: The Final Pitch (3D Stage Presentation Preview) */}
        <FinalPitchPreviewSection onOpenSimulation={openSimulation} />

        {/* Section: Featured Weekly Business Dilemma (Requirement 19) */}
        <div id="weekly-dilemma">
          <WeeklyDilemmaSection />
        </div>

        {/* Section 19: Classroom and Educator Experience */}
        <ClassroomWorkflowSection />

        {/* Section: Principal and Counsellor Validation Section */}
        <ForSchoolsSection />

        {/* Section: School Implementation, Technical Architecture & Privacy */}
        <SchoolImplementationSection />

        {/* Section: School Pilot Demonstration Enquiry Form */}
        <PilotEnquirySection />
      </main>

      {/* Educator Portal Modal (Requirement 18) */}
      <EducatorPortalModal
        isOpen={educatorModalOpen}
        onClose={() => setEducatorModalOpen(false)}
        onLaunchChallenge={(_challengeId) => openSimulation('startup_studio')}
      />

      {/* Footer */}
      <Footer />
    </div>
  </ErrorBoundary>
  );
};

export default App;
