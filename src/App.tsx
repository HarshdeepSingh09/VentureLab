import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LearningConceptSection } from './components/LearningConceptSection';
import { JourneySection } from './components/JourneySection';
import { MiniDemoSection } from './components/MiniDemoSection';
import { SchoolBenefitsSection } from './components/SchoolBenefitsSection';
import { PartnershipSection } from './components/PartnershipSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Fixed Section Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: The Learning Concept */}
        <LearningConceptSection />

        {/* Section 3: The Six-Stage Entrepreneurship Journey */}
        <JourneySection />

        {/* Section 4: Interactive Mini Demonstration */}
        <MiniDemoSection />

        {/* Section 5: Designed for Schools */}
        <SchoolBenefitsSection />

        {/* Section 6: School Validation and Partnership */}
        <PartnershipSection />

        {/* Section 7: Final Call to Action */}
        <FinalCtaSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
