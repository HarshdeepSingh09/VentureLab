import React from 'react';
import { 
  ArrowRight, Play, Laptop, 
  ShieldCheck, CheckCircle2 
} from 'lucide-react';
import { SimulationHeroPreview2D } from './SimulationHeroPreview2D';

interface HeroSectionProps {
  onOpenSimulation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenSimulation }) => {
  const scrollToJourney = () => {
    const el = document.getElementById('the-journey');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-32 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden text-left bg-[#F6F3EA]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        
        {/* Left Column: Core Value Proposition */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Institutional Audience Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EC] border border-[#C4D9CD] text-[11px] font-mono tracking-wider text-[#234B3A] uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#234B3A]" />
            <span>Classes 9–12 &bull; CBSE / ICSE / IB Entrepreneurship Sandbox</span>
          </div>

          {/* Headline: Confident, Editorial, Clean */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#22251F] leading-[1.12]">
            Step Into the World of{' '}
            <span className="text-[#234B3A] block">
              Entrepreneurship.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-[#575952] text-base sm:text-lg leading-relaxed max-w-xl">
            Build your first venture, make difficult decisions under scarce capital, recruit your first intern, and discover what it truly takes to turn an idea into a sustainable enterprise.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={onOpenSimulation}
              className="btn-primary text-sm py-3 px-6 shadow-sm cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Enter 2D Simulation Lab</span>
            </button>

            <button
              onClick={scrollToJourney}
              className="btn-outline text-sm py-3 px-5 cursor-pointer"
            >
              <span>Explore Curriculum</span>
              <ArrowRight className="w-4 h-4 text-[#575952]" />
            </button>
          </div>

          {/* Technical Spec & Classroom Fit */}
          <div className="pt-2 flex items-center gap-2 text-xs text-[#575952]">
            <div className="flex items-center gap-1.5 text-[#22251F] font-mono font-medium text-[11px]">
              <Laptop className="w-3.5 h-3.5 text-[#234B3A]" />
              <span>100% In-Browser</span>
            </div>
            <span>&bull;</span>
            <span>Runs on school Chromebooks &amp; lab laptops</span>
            <span>&bull;</span>
            <span>Zero install</span>
          </div>

          {/* Educational Trust Indicators */}
          <div className="pt-4 border-t border-[#D9D5C9] flex flex-wrap items-center gap-4 text-xs text-[#575952]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#234B3A]" />
              <span className="font-medium text-[#22251F]">Deterministic Financial Engine</span>
            </div>
            <span>&bull;</span>
            <div>45–60 Min Timetable Blocks</div>
            <span>&bull;</span>
            <div>Commerce &amp; Atal Tinkering Labs</div>
          </div>
        </div>

        {/* Right Column: Interactive 2D Simulation Preview */}
        <div className="lg:col-span-6 relative">
          <div className="relative mx-auto max-w-lg lg:max-w-none">
            <SimulationHeroPreview2D onOpenSimulation={onOpenSimulation} />
          </div>
        </div>

      </div>
    </section>
  );
};
