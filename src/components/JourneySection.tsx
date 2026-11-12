import React, { useState } from 'react';
import { 
  Compass, Lightbulb, Hammer, Rocket, 
  Swords, TrendingUp, Presentation, ArrowRight, 
  CheckCircle2, ShieldCheck, Wallet, AlertTriangle, Users, BookOpen,
  Gauge
} from 'lucide-react';
import type { SimulationLocationId } from '../simulation/types';

interface JourneySectionProps {
  onOpenSimulation: (locationId?: SimulationLocationId) => void;
}

export const JourneySection: React.FC<JourneySectionProps> = ({ onOpenSimulation }) => {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      id: 'discover',
      stepNum: '01',
      title: 'DISCOVER',
      subtitle: 'Identify Real Problems',
      icon: Compass,
      badge: 'Step 1: Empathy',
      shortExpl: 'Investigate genuine customer friction points in a campus ecosystem before building a solution.',
      decisionExample: 'Compare 3 pain points: Do hostellers struggle more with high meal prices (₹200/meal), delayed deliveries missing 35-min lecture breaks, or a lack of clean nutrition?',
      takeaway: 'Great ventures start with urgent, recurring problems, not hypothetical assumptions.',
      locationId: 'customer_discovery' as SimulationLocationId,
      locationName: 'Customer Discovery Lab',
      locationNumber: 'Stage 01',
      simulatedScope: 'Problem Evaluation & Pain Point Matrix',
      scopeDetails: 'Analyze campus problem statements using a 5-step evaluation framework (Clarity, Target, Frequency, Alternatives, Utility) before writing code.',
      metrics: [
        { label: 'Severity Rating', value: '5 / 5', change: 'High Friction' },
        { label: 'Target Audience', value: '4,500', change: 'Undergraduates' },
        { label: 'Pain Frequency', value: 'Daily', change: 'Lunch & Dinner' },
      ],
      ctaText: 'Enter Discovery Lab',
    },
    {
      id: 'ideate',
      stepNum: '02',
      title: 'IDEATE',
      subtitle: 'Design Value Propositions',
      icon: Lightbulb,
      badge: 'Step 2: Solution Architecture',
      shortExpl: 'Explore potential business models and interview simulated customer personas to test enthusiasm.',
      decisionExample: 'Choose your solution: A scheduled monthly prepaid meal subscription, a verified local home-cook marketplace, or a cafeteria group-discount app?',
      takeaway: 'Different customer segments have conflicting needs. You cannot please everyone with one offering.',
      locationId: 'customer_insights' as SimulationLocationId,
      locationName: 'Customer Insights Lab',
      locationNumber: 'Stage 02',
      simulatedScope: 'Persona Interviews & Empathy Insights',
      scopeDetails: 'Interview simulated student personas (Riya, Vikram, Dr. Sharma) to unearth genuine blockers, meal timing constraints, and price sensitivity.',
      metrics: [
        { label: 'Empathy Score', value: '88%', change: '+15% Insight' },
        { label: 'Customer Personas', value: '3 Archetypes', change: 'Hostel & Day' },
        { label: 'Willingness to Pay', value: '₹80–₹95', change: 'Sweet Spot' },
      ],
      ctaText: 'Enter Insights Lab',
    },
    {
      id: 'build',
      stepNum: '03',
      title: 'BUILD',
      subtitle: 'MVP Feature Scope & Intern Hire',
      icon: Hammer,
      badge: 'Step 3: MVP Design & Team',
      shortExpl: 'Select core initial product features with limited development points, then recruit your first intern.',
      decisionExample: 'Prioritize feature tradeoffs: Core batch ordering vs live GPS tracking. Then select an organised intern (Aarav), creative problem solver (Riya), or low-cost beginner (Kabir).',
      takeaway: 'Starting with a focused MVP validates customer delight before exhausting scarce seed runway.',
      locationId: 'product_dev' as SimulationLocationId,
      locationName: 'Product Development Lab',
      locationNumber: 'Stage 03',
      simulatedScope: 'MVP Roadmap & Intern Hiring',
      scopeDetails: 'Allocate 100 dev points and evaluate 3 distinct fictional intern candidates to carry forward downstream operational advantages.',
      metrics: [
        { label: 'Dev Points Pool', value: '100 Pts', change: 'Fixed Budget' },
        { label: 'Intern Candidate', value: '3 Choices', change: 'Operations/Marketing' },
        { label: 'MVP Complexity', value: 'Lean Scope', change: 'Zero Bloat' },
      ],
      ctaText: 'Enter Product Dev Lab',
    },
    {
      id: 'finance',
      stepNum: '04',
      title: 'FINANCE',
      subtitle: 'Budget & Unit Economics',
      icon: Wallet,
      badge: 'Step 4: Financial Planning',
      shortExpl: 'Distribute ₹1,00,000 seed budget across product, marketing, operations, and cash emergency reserve.',
      decisionExample: 'Negotiate with suppliers: Local peri-urban farm co-op vs cheap wholesale mandi liquidation vs organic growers.',
      takeaway: 'Cash flow is the oxygen of a startup. Accounting profit is meaningless if your bank account hits zero.',
      locationId: 'finance_center' as SimulationLocationId,
      locationName: 'Finance Center',
      locationNumber: 'Stage 04',
      simulatedScope: 'Budget Allocation & Working Capital Ledger',
      scopeDetails: 'Model unit gross margins (35%), calculate burn rate, and establish a minimum 6-week operating cash runway.',
      metrics: [
        { label: 'Starting Seed Capital', value: '₹1,00,000', change: 'Fixed Grant' },
        { label: 'Gross Target Margin', value: '35%', change: 'Unit Economics' },
        { label: 'Emergency Reserve', value: '₹15,000', change: 'Crisis Buffer' },
      ],
      ctaText: 'Enter Finance Center',
    },
    {
      id: 'market',
      stepNum: '05',
      title: 'MARKET',
      subtitle: 'Acquisition & Reach',
      icon: Rocket,
      badge: 'Step 5: Go-To-Market',
      shortExpl: 'Deploy high-trust student acquisition channels: hostel ambassadors vs free tasting kiosks vs flyers.',
      decisionExample: 'Calculate Customer Acquisition Cost: Ambassadors generate 4x higher retention than mass glossy flyers.',
      takeaway: 'Acquiring customers is only half the battle; acquiring them within unit margin keeps you alive.',
      locationId: 'marketing_studio' as SimulationLocationId,
      locationName: 'Marketing Studio',
      locationNumber: 'Stage 05',
      simulatedScope: 'Channel Attribution & CAC Telemetry',
      scopeDetails: 'Track customer conversion and word-of-mouth coefficients across campus living blocks.',
      metrics: [
        { label: 'CAC Efficiency', value: '₹28 / user', change: 'Low Cost' },
        { label: 'Word of Mouth', value: '65%', change: 'Organic Pull' },
        { label: 'Active Subscribers', value: '180 Pass', change: 'Batch Volume' },
      ],
      ctaText: 'Enter Marketing Studio',
    },
    {
      id: 'operate',
      stepNum: '06',
      title: 'OPERATE',
      subtitle: 'Manage Bottlenecks & Shocks',
      icon: Gauge,
      badge: 'Step 6: Crisis Operations',
      shortExpl: 'Survive lunch rush bottlenecks where demand exceeds kitchen capacity by 50%, and navigate supply inflation.',
      decisionExample: '35% ingredient price shock: Do you absorb the loss from reserve, hike student prices, or re-engineer the menu with seasonal produce?',
      takeaway: 'Operational agility and ethical transparency build moats that competitors cannot copy.',
      locationId: 'operations_center' as SimulationLocationId,
      locationName: 'Operations Center',
      locationNumber: 'Stage 06',
      simulatedScope: 'Capacity Bottleneck & Crisis Dilemma',
      scopeDetails: 'Manage daily prep throughput and resolve sudden dynamic business events deterministically.',
      metrics: [
        { label: 'Rush Throughput', value: '240 meals', change: 'Safe Capacity' },
        { label: 'On-Time Rate', value: '98.5%', change: '35-min Window' },
        { label: 'Reputation Score', value: '88 / 100', change: 'High Trust' },
      ],
      ctaText: 'Enter Operations Center',
    },
    {
      id: 'pitch',
      stepNum: '07',
      title: 'PITCH',
      subtitle: 'Final Presentation & Review',
      icon: Presentation,
      badge: 'Step 7: Capstone Defense',
      shortExpl: 'Defend your business model, traction, and decision journal before the VentureLab investment committee.',
      decisionExample: 'Defend expansion: Launch evening dinner passes to double LTV vs expand into neighboring campuses.',
      takeaway: 'Great pitches are built on disciplined unit economics, validated customer empathy, and honest reflection.',
      locationId: 'investor_arena' as SimulationLocationId,
      locationName: 'Investor Arena',
      locationNumber: 'Stage 07',
      simulatedScope: 'Pitch Defense & Assessment Rubric',
      scopeDetails: 'Receive a transparent 4-level rubric evaluation across problem, financial reasoning, decision-making, and ethics.',
      metrics: [
        { label: 'Investor Score', value: '92 / 100', change: 'Full Honors' },
        { label: 'Unit Payback', value: '45 Days', change: 'Break-Even' },
        { label: 'Decisions Logged', value: '11 Records', change: 'Full Journal' },
      ],
      ctaText: 'Enter Investor Arena',
    },
  ];

  const current = stages[activeStage];
  const CurrentIcon = current.icon;

  return (
    <section id="the-journey" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#F6F3EA] text-left">
      
      {/* Section Header */}
      <div className="max-w-3xl mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EC] border border-[#C4D9CD] text-[11px] font-mono tracking-wider text-[#234B3A] uppercase font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Curriculum Journey &bull; Classes 9–12</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#22251F] tracking-tight">
          A Structured Entrepreneurship Lifecycle
        </h2>

        <p className="text-[#575952] text-base sm:text-lg leading-relaxed">
          Students do not memorize business theory from slides. They progress through the authentic lifecycle of a student venture, making consequential resource decisions at every gate.
        </p>
      </div>

      {/* 7-Stage Horizontal Pipeline Navigation */}
      <div className="mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = activeStage === idx;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(idx)}
                className={`p-3 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-[#234B3A] text-[#F6F3EA] border-[#234B3A] shadow-sm'
                    : 'bg-[#FFFFFF] border-[#D9D5C9] text-[#22251F] hover:bg-[#F0EDE4]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-mono font-bold ${isSelected ? 'text-[#F6F3EA]' : 'text-[#7E8078]'}`}>
                    {stage.stepNum}
                  </span>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isSelected ? 'bg-[#1A392C] text-[#F6F3EA]' : 'bg-[#F0EDE4] text-[#234B3A]'}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <div className={`font-bold text-xs ${isSelected ? 'text-[#F6F3EA]' : 'text-[#22251F]'}`}>
                    {stage.title}
                  </div>
                  <div className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-[#D9D5C9]' : 'text-[#575952]'}`}>
                    {stage.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Detailed Breakdown Panel */}
      <div className="card-clean p-6 sm:p-8 bg-[#FFFFFF] border border-[#D9D5C9]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Stage Decision Overview */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-[#234B3A] bg-[#E8F0EC] border border-[#C4D9CD]">
                {current.badge}
              </span>
              <span className="text-xs font-mono text-[#7E8078]">
                Stage {current.stepNum} of 07
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#22251F] flex items-center gap-2.5">
              <CurrentIcon className="w-6 h-6 text-[#234B3A]" />
              <span>{current.title} &mdash; {current.subtitle}</span>
            </h3>

            <p className="text-[#575952] text-sm leading-relaxed">
              {current.shortExpl}
            </p>

            {/* Decision Example Box */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#D9D5C9] space-y-1.5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#234B3A] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Example Decision Students Make:</span>
              </div>
              <p className="text-xs text-[#22251F] leading-relaxed italic">
                &ldquo;{current.decisionExample}&rdquo;
              </p>
            </div>

            {/* Core Pedagogical Takeaway */}
            <div className="p-3.5 rounded-xl bg-[#F8EFEA] border-l-4 border-l-[#B9684D] border border-[#E5C3B6] text-xs text-[#22251F]">
              <strong className="text-[#B9684D]">Educational Takeaway: </strong>
              {current.takeaway}
            </div>
          </div>

          {/* Right Column: Stage-Matched Simulation Module */}
          <div className="lg:col-span-5 p-5 rounded-xl bg-[#FAF8F5] border border-[#D9D5C9] space-y-4">
            <div className="flex items-center justify-between border-b border-[#D9D5C9] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#234B3A] font-bold block">
                  {current.locationNumber}
                </span>
                <span className="text-xs font-bold text-[#22251F]">
                  {current.locationName}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#234B3A] bg-[#E8F0EC] border border-[#C4D9CD] px-2 py-0.5 rounded-full font-bold">
                2D Interactive
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm font-bold text-[#22251F]">
                {current.simulatedScope}
              </div>
              <div className="text-xs text-[#575952] leading-relaxed">
                {current.scopeDetails}
              </div>
            </div>

            {/* Stage-Matched Telemetry Metrics */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#D9D5C9]">
              {current.metrics.map((m) => (
                <div key={m.label} className="p-2 rounded-lg bg-[#FFFFFF] border border-[#D9D5C9] space-y-0.5">
                  <div className="text-[10px] text-[#7E8078] truncate">{m.label}</div>
                  <div className="text-xs font-bold text-[#22251F] font-mono">{m.value}</div>
                  <div className="text-[9px] font-mono text-[#234B3A] truncate font-medium">{m.change}</div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div className="flex gap-1">
                {stages.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveStage(i)}
                    className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                      activeStage === i ? 'bg-[#234B3A] scale-125' : 'bg-[#D9D5C9]'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => onOpenSimulation(current.locationId)}
                className="btn-primary text-xs py-2 px-3"
              >
                <span>{current.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
