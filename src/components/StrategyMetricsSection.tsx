import React, { useState } from 'react';
import { 
  Wallet, HeartHandshake, Award, 
  Megaphone, Gauge, Info, ArrowRight, ShieldCheck 
} from 'lucide-react';

interface StrategyMetricsSectionProps {
  onOpenSimulation: () => void;
}

export const StrategyMetricsSection: React.FC<StrategyMetricsSectionProps> = ({ onOpenSimulation }) => {
  const [strategyPreset, setStrategyPreset] = useState<'balanced' | 'growth' | 'quality' | 'cash'>('balanced');

  const presets = {
    balanced: {
      name: 'Balanced Strategy',
      tagline: 'Equal balance between marketing reach, kitchen ops, and cash buffer',
      cash: 65000,
      cashMax: 100000,
      satisfaction: 82,
      quality: 80,
      awareness: 60,
      capacity: 140,
      capacityMax: 250,
      runway: '4.5 months',
      description: 'Maintains healthy equilibrium. Customer churn is low, deliveries are punctual, and burn rate is sustainable.',
    },
    growth: {
      name: 'Hyper-Growth Mode',
      tagline: 'Prioritizes viral reach, aggressive discounts, and student signups',
      cash: 22000,
      cashMax: 100000,
      satisfaction: 58,
      quality: 68,
      awareness: 94,
      capacity: 110,
      capacityMax: 250,
      runway: '1.4 months',
      description: 'Market awareness surges across all hostel corridors. However, high customer demand severely strains kitchen prep, leading to delivery delays and declining satisfaction.',
    },
    quality: {
      name: 'Craft & Quality First',
      tagline: 'Focuses on culinary excellence, thermal insulation, and customer care',
      cash: 42000,
      cashMax: 100000,
      satisfaction: 95,
      quality: 96,
      awareness: 38,
      capacity: 190,
      capacityMax: 250,
      runway: '3.2 months',
      description: 'Exceptional word-of-mouth sentiment. Served customers become fierce brand advocates. Growth is steady and organic without burning money on paid ads.',
    },
    cash: {
      name: 'Resilient Cash Buffer',
      tagline: 'Defensive, high-reserve posture designed to survive supplier shocks',
      cash: 85000,
      cashMax: 100000,
      satisfaction: 74,
      quality: 72,
      awareness: 32,
      capacity: 120,
      capacityMax: 250,
      runway: '8.5 months',
      description: 'Maximal safety margin. The business can survive multiple crises or market shocks, though student market awareness grows at a slower pace.',
    },
  };

  const active = presets[strategyPreset];

  return (
    <section id="metrics" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left bg-[#F6F3EA]">
      <div className="max-w-3xl mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EC] border border-[#C4D9CD] text-[11px] font-mono tracking-wider text-[#234B3A] uppercase font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Simulation Telemetry</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#22251F] tracking-tight">
          Your Strategy Drives Real Metrics
        </h2>
        <p className="text-[#575952] text-base sm:text-lg leading-relaxed">
          Tweak your operational levers below to observe the interconnected relationship between available cash, customer satisfaction, and operational capacity.
        </p>
      </div>

      <div className="card-clean p-6 sm:p-8 bg-[#FFFFFF] border border-[#D9D5C9] space-y-6">
        
        {/* Preset Selector Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D9D5C9] pb-5">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#575952] block">
              Strategic Posture Presets:
            </span>
            <span className="text-sm font-bold text-[#22251F]">
              {active.name} &mdash; <span className="font-normal text-[#575952] text-xs">{active.tagline}</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(['balanced', 'growth', 'quality', 'cash'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setStrategyPreset(key)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  strategyPreset === key
                    ? 'bg-[#234B3A] text-[#F6F3EA]'
                    : 'bg-[#F0EDE4] text-[#575952] hover:bg-[#D9D5C9]'
                }`}
              >
                {presets[key].name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* 5 Core Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Metric 1: Cash Runway */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#D9D5C9] space-y-2">
            <div className="flex items-center justify-between text-xs text-[#575952]">
              <span className="flex items-center gap-1 font-semibold text-[#22251F]">
                <Wallet className="w-3.5 h-3.5 text-[#234B3A]" />
                Cash Runway
              </span>
              <span className="text-[10px] font-mono text-[#234B3A] font-bold">
                {active.runway}
              </span>
            </div>
            <div className="text-xl font-bold font-mono text-[#22251F]">
              ₹{active.cash.toLocaleString('en-IN')}
            </div>
            <div className="w-full bg-[#D9D5C9] rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#234B3A] h-full rounded-full transition-all duration-300"
                style={{ width: `${(active.cash / active.cashMax) * 100}%` }}
              />
            </div>
            <div className="text-[10px] text-[#7E8078]">
              Available buffer before break-even.
            </div>
          </div>

          {/* Metric 2: Customer Satisfaction */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#D9D5C9] space-y-2">
            <div className="flex items-center justify-between text-xs text-[#575952]">
              <span className="flex items-center gap-1 font-semibold text-[#22251F]">
                <HeartHandshake className="w-3.5 h-3.5 text-[#234B3A]" />
                Satisfaction
              </span>
              <span className="text-[10px] font-mono text-[#234B3A] font-bold">
                NPS Metric
              </span>
            </div>
            <div className="text-xl font-bold font-mono text-[#22251F]">
              {active.satisfaction}%
            </div>
            <div className="w-full bg-[#D9D5C9] rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#234B3A] h-full rounded-full transition-all duration-300"
                style={{ width: `${active.satisfaction}%` }}
              />
            </div>
            <div className="text-[10px] text-[#7E8078]">
              Percentage of repeat customers.
            </div>
          </div>

          {/* Metric 3: Product Quality */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#D9D5C9] space-y-2">
            <div className="flex items-center justify-between text-xs text-[#575952]">
              <span className="flex items-center gap-1 font-semibold text-[#22251F]">
                <Award className="w-3.5 h-3.5 text-[#B9684D]" />
                Quality Score
              </span>
              <span className="text-[10px] font-mono text-[#B9684D] font-bold">
                Audited
              </span>
            </div>
            <div className="text-xl font-bold font-mono text-[#22251F]">
              {active.quality}%
            </div>
            <div className="w-full bg-[#D9D5C9] rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#B9684D] h-full rounded-full transition-all duration-300"
                style={{ width: `${active.quality}%` }}
              />
            </div>
            <div className="text-[10px] text-[#7E8078]">
              Temperature &amp; hygiene score.
            </div>
          </div>

          {/* Metric 4: Market Awareness */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#D9D5C9] space-y-2">
            <div className="flex items-center justify-between text-xs text-[#575952]">
              <span className="flex items-center gap-1 font-semibold text-[#22251F]">
                <Megaphone className="w-3.5 h-3.5 text-[#234B3A]" />
                Awareness
              </span>
              <span className="text-[10px] font-mono text-[#234B3A] font-bold">
                Reach
              </span>
            </div>
            <div className="text-xl font-bold font-mono text-[#22251F]">
              {active.awareness}%
            </div>
            <div className="w-full bg-[#D9D5C9] rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#234B3A] h-full rounded-full transition-all duration-300"
                style={{ width: `${active.awareness}%` }}
              />
            </div>
            <div className="text-[10px] text-[#7E8078]">
              Hostel students recognizing brand.
            </div>
          </div>

          {/* Metric 5: Operational Capacity */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#D9D5C9] space-y-2">
            <div className="flex items-center justify-between text-xs text-[#575952]">
              <span className="flex items-center gap-1 font-semibold text-[#22251F]">
                <Gauge className="w-3.5 h-3.5 text-[#B9684D]" />
                Capacity
              </span>
              <span className="text-[10px] font-mono text-[#B9684D] font-bold">
                Daily Prep
              </span>
            </div>
            <div className="text-xl font-bold font-mono text-[#22251F]">
              {active.capacity} <span className="text-xs font-normal text-[#575952]">units/day</span>
            </div>
            <div className="w-full bg-[#D9D5C9] rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#B9684D] h-full rounded-full transition-all duration-300"
                style={{ width: `${(active.capacity / active.capacityMax) * 100}%` }}
              />
            </div>
            <div className="text-[10px] text-[#7E8078]">
              Safe output without rush delays.
            </div>
          </div>

        </div>

        {/* Narrative Strategic Interpretation */}
        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#D9D5C9] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-[10px] font-mono font-bold text-[#234B3A] uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              Strategic Trade-off Analysis:
            </div>
            <p className="text-xs text-[#22251F] leading-relaxed">
              {active.description}
            </p>
          </div>

          <button
            onClick={onOpenSimulation}
            className="btn-primary text-xs py-2 px-4 shrink-0"
          >
            <span>Test Your Own Strategy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
