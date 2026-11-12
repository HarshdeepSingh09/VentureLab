import React, { useState } from 'react';
import { 
  ArrowRight, HeartHandshake, 
  TrendingUp, Wallet, ShieldCheck, CheckCircle2 
} from 'lucide-react';

interface DecisionsConsequencesSectionProps {
  onOpenSimulation: () => void;
}

export const DecisionsConsequencesSection: React.FC<DecisionsConsequencesSectionProps> = ({ onOpenSimulation }) => {
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C'>('A');

  const options = {
    A: {
      id: 'A',
      title: 'Option A: Product Quality First',
      subtitle: 'Commit 60% of budget to kitchen hygiene, food-grade thermal insulation, and peri-urban farm ingredients.',
      badge: 'Quality & Retention',
      icon: HeartHandshake,
      metricChanges: [
        { label: 'Customer Satisfaction', value: '92%', change: '+18%', note: 'High Retention' },
        { label: 'Estimated Daily Demand', value: '65 meals', change: 'Steady', note: 'Organic Growth' },
        { label: 'Market Awareness', value: '28%', change: 'Slow', note: 'Word of Mouth' },
        { label: 'Remaining Cash Buffer', value: '₹18,000', change: 'Modest', note: 'Disciplined' },
      ],
      consequenceSummary:
        'Food arrives piping hot. Early student customers love the taste and leave enthusiastic recommendations. With minimal marketing spend, customer growth is organic and word-of-mouth takes 3 weeks to spread.',
      lesson:
        'High quality creates strong customer retention, but a great product alone will not sell itself without deliberate customer discovery.',
    },
    B: {
      id: 'B',
      title: 'Option B: Aggressive Growth Marketing',
      subtitle: 'Allocate 60% of funds to campus ambassadors, social media campaigns, and deep promotional discounts.',
      badge: 'Growth-First Focus',
      icon: TrendingUp,
      metricChanges: [
        { label: 'Customer Satisfaction', value: '54%', change: '-24%', note: 'Bottleneck Crash' },
        { label: 'Estimated Daily Demand', value: '220 meals', change: '+180%', note: 'Surge Demand' },
        { label: 'Market Awareness', value: '88%', change: 'Viral', note: 'High Reach' },
        { label: 'Remaining Cash Buffer', value: '₹12,000', change: 'Low', note: 'Cash Drain' },
      ],
      consequenceSummary:
        'Demand explodes across all campus hostels. 220 students order on Day 2. But your small kitchen cannot keep up: deliveries arrive 40 minutes late, food is lukewarm, and disappointed students complain publicly.',
      lesson:
        'Marketing accelerates both success and failure. Spending heavily on acquisition before operational readiness burns customer trust rapidly.',
    },
    C: {
      id: 'C',
      title: 'Option C: Defensive Cash Preservation',
      subtitle: 'Keep 50% of capital in emergency cash reserves, operating with a lean initial batch launch setup.',
      badge: 'Cash-Disciplined',
      icon: Wallet,
      metricChanges: [
        { label: 'Customer Satisfaction', value: '78%', change: 'Stable', note: 'Controlled' },
        { label: 'Estimated Daily Demand', value: '75 meals', change: 'Predictable', note: 'Batch Orders' },
        { label: 'Market Awareness', value: '42%', change: 'Organic', note: 'Campus Focus' },
        { label: 'Remaining Cash Buffer', value: '₹50,000', change: 'Strong', note: '10+ Wks Runway' },
      ],
      consequenceSummary:
        'Your initial pace is modest and you serve 75 meals daily without chaos. When wholesale vegetable prices jump 35% in Week 2, your venture absorbs the cost easily while reckless competitors face cash panic.',
      lesson:
        'Cash buffer buys time to learn. Preserving runway lets you survive early market shocks and adapt to changing conditions.',
    },
  };

  const current = options[selectedOption];
  const CurrentIcon = current.icon;

  return (
    <section id="consequences" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left bg-[#F6F3EA]">
      <div className="max-w-3xl mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EC] border border-[#C4D9CD] text-[11px] font-mono tracking-wider text-[#234B3A] uppercase font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Interactive Decision Engine</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#22251F] tracking-tight">
          Every Decision Has Consequences
        </h2>
        <p className="text-[#575952] text-base sm:text-lg leading-relaxed">
          No cheat codes. No guaranteed outcomes. Every allocation choice shifts the delicate equilibrium between cash runway, product delight, brand trust, and operational strain.
        </p>
      </div>

      {/* Interactive Scenario Card */}
      <div className="card-clean p-6 sm:p-8 bg-[#FFFFFF] border border-[#D9D5C9]">
        
        {/* Scenario Header Question */}
        <div className="border-b border-[#D9D5C9] pb-5 mb-6 text-left">
          <div className="text-[10px] font-mono font-bold text-[#B9684D] uppercase tracking-wider mb-1">
            Founder Dilemma Preview &bull; Seed Stage Allocation
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#22251F]">
            &ldquo;You have limited seed capital (₹1,00,000). What do you prioritize for launch?&rdquo;
          </h3>
          <p className="text-xs text-[#575952] mt-1">
            Select a strategy below to stress-test market feedback and observe second-order consequences.
          </p>
        </div>

        {/* 3 Option Selector Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {(['A', 'B', 'C'] as const).map((optKey) => {
            const opt = options[optKey];
            const isSelected = selectedOption === optKey;
            const Icon = opt.icon;
            return (
              <button
                key={optKey}
                onClick={() => setSelectedOption(optKey)}
                className={`p-4 rounded-xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#E8F0EC]/40 border-[#234B3A] shadow-xs'
                    : 'bg-[#FFFFFF] border-[#D9D5C9] hover:border-[#B8B3A4]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F0EDE4] text-[#575952]">
                      {opt.badge}
                    </span>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isSelected ? 'bg-[#234B3A] text-[#F6F3EA]' : 'bg-[#FAF8F5] text-[#575952]'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="font-bold text-sm text-[#22251F] mb-1">
                    {opt.title}
                  </h4>
                  <p className="text-xs text-[#575952] leading-relaxed">
                    {opt.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Option Deep-Dive Breakdown */}
        <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#D9D5C9] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#234B3A] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#234B3A]" />
              <span>Simulated Consequence: {current.title}</span>
            </span>
            <span className="text-[10px] font-mono text-[#7E8078]">
              Deterministic Telemetry
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#22251F] leading-relaxed font-medium">
            {current.consequenceSummary}
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-[#D9D5C9]">
            {current.metricChanges.map((m) => (
              <div key={m.label} className="p-2.5 rounded-lg bg-[#FFFFFF] border border-[#D9D5C9] space-y-0.5">
                <div className="text-[10px] text-[#7E8078] truncate">{m.label}</div>
                <div className="text-sm font-bold font-mono text-[#22251F]">{m.value}</div>
                <div className="text-[10px] font-mono text-[#234B3A] font-semibold">{m.note}</div>
              </div>
            ))}
          </div>

          {/* Learning Takeaway */}
          <div className="p-3.5 rounded-lg bg-[#F8EFEA] border-l-4 border-l-[#B9684D] border border-[#E5C3B6] text-xs text-[#22251F]">
            <strong className="text-[#B9684D]">Pedagogical Principle: </strong>
            {current.lesson}
          </div>
        </div>

        {/* CTA Strip */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#D9D5C9]">
          <span className="text-xs text-[#575952]">
            Ready to test this with your own seed capital and business scenario?
          </span>
          <button
            onClick={onOpenSimulation}
            className="btn-primary text-xs py-2 px-4"
          >
            <span>Enter Decision Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
