import React, { useState } from 'react';
import { 
  Presentation, Play, CheckCircle2, ShieldCheck, ArrowRight 
} from 'lucide-react';

interface FinalPitchPreviewSectionProps {
  onOpenSimulation: () => void;
}

export const FinalPitchPreviewSection: React.FC<FinalPitchPreviewSectionProps> = ({ onOpenSimulation }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      num: '01',
      title: 'The Problem & Target Customer',
      badge: 'Market Opportunity',
      content: {
        headline: 'Hostel Students Spend ₹200+ Daily on Delayed, Unhealthy Meals',
        bullets: [
          '4,500 campus hostellers with strict 35-minute lunchtime breaks between lectures.',
          'Commercial delivery apps consistently arrive 45–60 minutes late at campus gates.',
          'Canteen food is repetitive and oily, causing daily digestive fatigue.',
        ],
        quote: '"By the 20th of every month, my allowance is gone, and I cannot afford ₹200 lunch."',
      },
    },
    {
      num: '02',
      title: 'Our Solution: Campus Tiffin Subscription Pass',
      badge: 'Value Proposition',
      content: {
        headline: 'Punctual, Wholesome Lunch Ready at Campus Lockers at 1:12 PM Sharp',
        bullets: [
          'Prepaid 20-day subscription pass with pause and rollover guarantees.',
          'Thermal insulated collection points outside academic departments keeping food hot.',
          'Simple home-style recipes with clean ingredients and direct farmer co-op sourcing.',
        ],
        quote: '180 hostellers subscribed in Week 1 with a 92% renewal rate intent.',
      },
    },
    {
      num: '03',
      title: 'Unit Economics & Financial Summary',
      badge: 'Financial Engine',
      content: {
        headline: '₹85 Average Selling Price with 35% Gross Contribution Margin',
        bullets: [
          '₹1,00,000 Seed Capital allocated across Kitchen Ops, Marketing, and Emergency Reserve.',
          'Break-even reached at 85 daily meal orders; currently fulfilling 160 meals/day.',
          'Finished launch period with ₹42,000 cash balance and positive operating cash flow.',
        ],
        quote: 'Zero debt and disciplined cash buffer absorbed unexpected 35% vegetable inflation spike.',
      },
    },
    {
      num: '04',
      title: 'Major Challenge Navigated & Lessons Learned',
      badge: 'Founder Reflection',
      content: {
        headline: 'Surviving the 1:15 PM Demand Surge Without Compromising Quality',
        bullets: [
          'Demand spiked to 240 orders during university fest, exceeding 160-meal kitchen capacity.',
          'Cap orders or scale? We scaled decisively with second burner and intern coordination.',
          '100% on-time delivery maintained; earned trusted reputation across student body.',
        ],
        quote: 'Protecting punctuality and food quality always beats chasing greedy volume that collapses kitchen operations.',
      },
    },
  ];

  const currentSlide = slides[activeSlide];

  return (
    <section id="pitch-preview" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left bg-[#F6F3EA]">
      <div className="max-w-3xl mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EC] border border-[#C4D9CD] text-[11px] font-mono tracking-wider text-[#234B3A] uppercase font-semibold">
          <Presentation className="w-3.5 h-3.5" />
          <span>Capstone Milestone &bull; The Final Pitch Deck</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#22251F] tracking-tight">
          Pitch to the Investment Committee
        </h2>

        <p className="text-[#575952] text-base sm:text-lg leading-relaxed">
          Students do not write abstract business essays. They pitch their venture's simulated traction, unit economics, and crisis learnings to a virtual investment panel.
        </p>
      </div>

      <div className="card-clean p-6 sm:p-8 bg-[#FFFFFF] border border-[#D9D5C9] space-y-6">
        
        {/* Slide Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-[#D9D5C9] pb-5">
          {slides.map((s, idx) => (
            <button
              key={s.num}
              onClick={() => setActiveSlide(idx)}
              className={`p-3 rounded-lg text-left transition-all cursor-pointer border ${
                activeSlide === idx
                  ? 'bg-[#234B3A] text-[#F6F3EA] border-[#234B3A]'
                  : 'bg-[#FAF8F5] text-[#575952] border-[#D9D5C9] hover:bg-[#F0EDE4]'
              }`}
            >
              <div className="text-[10px] font-mono font-bold mb-0.5">SLIDE {s.num}</div>
              <div className="text-xs font-bold truncate">{s.title.split(':')[0]}</div>
            </button>
          ))}
        </div>

        {/* Pitch Deck Main Slide Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Slide Main Body */}
          <div className="lg:col-span-8 p-6 rounded-xl bg-[#FAF8F5] border border-[#D9D5C9] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#E8F0EC] text-[#234B3A]">
                {currentSlide.badge}
              </span>
              <span className="text-xs font-mono text-[#7E8078]">
                Slide {currentSlide.num} of 04
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#22251F]">
              {currentSlide.content.headline}
            </h3>

            <ul className="space-y-2 text-xs sm:text-sm text-[#575952]">
              {currentSlide.content.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#234B3A] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>

            <div className="text-xs text-[#22251F] italic border-l-2 border-l-[#B9684D] pl-3 py-0.5 bg-[#FFFFFF] p-2 rounded">
              {currentSlide.content.quote}
            </div>
          </div>

          {/* Simulated Investor Feedback */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#575952]">
              Investment Panel Rubric Evaluation:
            </div>

            <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#D9D5C9] space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#22251F]">Dr. Ananya Roy</span>
                <span className="text-[10px] font-mono font-bold text-[#234B3A]">88/100 Bullish</span>
              </div>
              <div className="text-[10px] font-mono text-[#575952]">Customer Empathy Lead</div>
              <p className="text-[11px] text-[#575952] leading-snug">
                &ldquo;Deep empathy for student budget anxiety. Capping orders to preserve food temperature was the right ethical call.&rdquo;
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#D9D5C9] space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#22251F]">Vikram Singhania</span>
                <span className="text-[10px] font-mono font-bold text-[#234B3A]">84/100 Strong</span>
              </div>
              <div className="text-[10px] font-mono text-[#575952]">Venture Capitalist</div>
              <p className="text-[11px] text-[#575952] leading-snug">
                &ldquo;Prudent runway management. Finishing with positive unit margins proves capital discipline.&rdquo;
              </p>
            </div>
          </div>

        </div>

        {/* CTA Footer */}
        <div className="pt-4 border-t border-[#D9D5C9] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#575952]">
            Ready to build your venture and defend your capstone pitch?
          </span>
          <button
            onClick={onOpenSimulation}
            className="btn-primary text-xs py-2 px-4"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Launch VentureLab</span>
          </button>
        </div>

      </div>
    </section>
  );
};
