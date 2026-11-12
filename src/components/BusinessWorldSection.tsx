import React from 'react';
import { 
  Building2, Users, Wallet, Megaphone, 
  FlaskConical, Presentation, Compass, 
  ArrowRight, ShieldCheck, AlertTriangle
} from 'lucide-react';
import type { SimulationLocationId } from '../simulation/types';

interface BusinessWorldSectionProps {
  onOpenSimulation: (locationId?: SimulationLocationId) => void;
}

export const BusinessWorldSection: React.FC<BusinessWorldSectionProps> = ({ onOpenSimulation }) => {
  const departments: {
    id: string;
    simLocationId: SimulationLocationId;
    title: string;
    category: string;
    icon: React.ElementType;
    description: string;
    keyMetrics: string[];
  }[] = [
    {
      id: 'startup-studio',
      simLocationId: 'startup_studio',
      title: 'Startup Studio',
      category: 'Vision & Mission',
      icon: Building2,
      description: 'Establish venture identity, founder role, initial business concept architecture, and track journey milestones.',
      keyMetrics: ['Venture Name', 'Mission Statement', 'Team Roster'],
    },
    {
      id: 'customer-discovery',
      simLocationId: 'customer_discovery',
      title: 'Problem Discovery Lab',
      category: 'Customer Friction',
      icon: Compass,
      description: 'Investigate urgent, recurring student pain points: high meal costs, late deliveries, or lack of clean nutrition.',
      keyMetrics: ['Severity Rating', 'Addressable Market', 'Frequency'],
    },
    {
      id: 'customer-insights',
      simLocationId: 'customer_insights',
      title: 'Customer Insights Lab',
      category: 'Empathy & Personas',
      icon: Users,
      description: 'Interview customer archetypes (Riya, Vikram, Dr. Sharma) to test pricing sensitivity and timetable constraints.',
      keyMetrics: ['Empathy Score', 'Willingness to Pay', 'Pain Points'],
    },
    {
      id: 'product-dev',
      simLocationId: 'product_dev',
      title: 'Product Development Lab',
      category: 'MVP & Intern Hire',
      icon: FlaskConical,
      description: 'Configure initial MVP features with 100 dev points, then recruit your first intern (Aarav, Riya, or Kabir).',
      keyMetrics: ['Dev Point Budget', 'Feature Scope', 'Intern Assigned'],
    },
    {
      id: 'finance-center',
      simLocationId: 'finance_center',
      title: 'Finance & Ledger Center',
      category: 'Unit Economics',
      icon: Wallet,
      description: 'Allocate ₹1,00,000 across operations and emergency reserve. Negotiate supplier sourcing for 35% gross margin.',
      keyMetrics: ['Cash Runway', 'Gross Margin %', 'Emergency Reserve'],
    },
    {
      id: 'marketing-studio',
      simLocationId: 'marketing_studio',
      title: 'Marketing Studio',
      category: 'Acquisition & Reach',
      icon: Megaphone,
      description: 'Deploy hostel floor student ambassadors, tasting kiosks, and referral passes with low customer acquisition cost.',
      keyMetrics: ['CAC Metric', 'Word-of-Mouth %', 'Batch Volume'],
    },
    {
      id: 'business-challenge',
      simLocationId: 'business_challenge',
      title: 'Crisis & Ethics Room',
      category: 'Dynamic Shocks',
      icon: AlertTriangle,
      description: 'Navigate sudden 35% wholesale price spikes, competitor price wars, and student data privacy choices.',
      keyMetrics: ['Reputation Score', 'Cash Impact', 'Customer Retention'],
    },
    {
      id: 'investor-arena',
      simLocationId: 'investor_arena',
      title: 'Pitch & Investor Arena',
      category: 'Capstone Defense',
      icon: Presentation,
      description: 'Defend your venture pitch deck before the investment committee and receive rubric assessment with honors.',
      keyMetrics: ['Valuation Rubric', 'Unit Economics', 'Full Portfolio'],
    },
  ];

  return (
    <section id="business-world" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left bg-[#F6F3EA]">
      
      {/* Section Header */}
      <div className="max-w-3xl mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EC] border border-[#C4D9CD] text-[11px] font-mono tracking-wider text-[#234B3A] uppercase font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Interactive 2D Workspace</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#22251F] tracking-tight">
          Eight Interactive Business Departments
        </h2>

        <p className="text-[#575952] text-base sm:text-lg leading-relaxed">
          Each department represents a real business function. Students make authentic decisions, balance budgets, and experience deterministic downstream consequences.
        </p>
      </div>

      {/* Grid of Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {departments.map((dept) => {
          const Icon = dept.icon;
          return (
            <div
              key={dept.id}
              onClick={() => onOpenSimulation(dept.simLocationId)}
              className="card-clean p-5 flex flex-col justify-between hover:border-[#234B3A] transition-all cursor-pointer group bg-[#FFFFFF]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#E8F0EC] text-[#234B3A]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F0EDE4] text-[#575952]">
                    {dept.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#22251F] group-hover:text-[#234B3A] transition-colors">
                    {dept.title}
                  </h3>
                  <p className="text-xs text-[#575952] mt-1.5 leading-relaxed">
                    {dept.description}
                  </p>
                </div>
              </div>

              {/* Bottom Metrics */}
              <div className="pt-4 border-t border-[#D9D5C9] mt-4 space-y-2.5">
                <div className="flex flex-wrap gap-1">
                  {dept.keyMetrics.map((m) => (
                    <span
                      key={m}
                      className="text-[10px] px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#D9D5C9] text-[#575952] font-mono"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                <div className="pt-1 flex items-center justify-between text-xs font-semibold text-[#234B3A]">
                  <span>Launch Department</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Institutional Note */}
      <div className="mt-10 p-4 sm:p-5 rounded-xl bg-[#FFFFFF] border border-[#D9D5C9] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#575952]">
        <div className="flex items-center gap-2.5 text-left">
          <ShieldCheck className="w-5 h-5 text-[#234B3A] shrink-0" />
          <span>
            <strong className="text-[#22251F]">Lightweight 2D Architecture:</strong> Zero WebGL overhead, zero lag. Runs smoothly on any school Chromebook, lab laptop, or mobile tablet.
          </span>
        </div>
        <button
          onClick={() => onOpenSimulation()}
          className="btn-primary text-xs py-2 px-4 shrink-0"
        >
          <span>Launch Simulation</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </section>
  );
};
