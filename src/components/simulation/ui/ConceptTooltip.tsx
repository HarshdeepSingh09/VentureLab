import React, { useState } from 'react';
import { HelpCircle, Info } from 'lucide-react';

export const BUSINESS_TERMS: Record<string, { term: string; definition: string; example: string }> = {
  REVENUE: {
    term: 'Revenue',
    definition: 'Total money earned from selling meals or services before subtracting any costs or expenses.',
    example: 'Selling 100 lunch boxes at ₹95 each produces ₹9,500 in daily gross revenue.',
  },
  EXPENSES: {
    term: 'Expenses',
    definition: 'All money spent operating the venture, including raw ingredients, cook wages, packaging, and marketing.',
    example: 'Spending ₹6,500 on vegetables, oil, packaging, and runner stipends.',
  },
  PROFIT_OR_LOSS: {
    term: 'Profit or Loss',
    definition: 'The net difference between revenue earned and total expenses spent. Positive is profit; negative is loss.',
    example: '₹9,500 revenue minus ₹6,500 expenses = ₹3,000 net operating profit.',
  },
  CASH_FLOW: {
    term: 'Cash Flow',
    definition: 'The real-time movement of cash entering and leaving your bank account over time.',
    example: 'Prepaid subscriptions bring cash in upfront on Day 1, whereas catering pay-later brings cash 30 days late.',
  },
  RUNWAY: {
    term: 'Cash Runway',
    definition: 'An estimate of how many months your business can continue operating with remaining cash if expenses stay constant.',
    example: '₹40,000 cash remaining divided by ₹10,000 monthly burn = 4.0 months of runway.',
  },
  CAC: {
    term: 'Customer Acquisition Cost (CAC)',
    definition: 'The average marketing money spent to acquire one newly paying customer.',
    example: 'Spending ₹5,000 on campus posters that attract 50 new paying subscribers = ₹100 CAC.',
  },
  UNIT_MARGIN: {
    term: 'Contribution Margin',
    definition: 'The percentage of the sale price kept after paying direct food and packaging delivery costs.',
    example: 'A ₹95 lunch box costing ₹70 in direct food/box costs leaves ₹25 (26%) to cover office rent and marketing.',
  },
};

interface ConceptTooltipProps {
  termKey: keyof typeof BUSINESS_TERMS;
  children?: React.ReactNode;
}

export const ConceptTooltip: React.FC<ConceptTooltipProps> = ({ termKey, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const data = BUSINESS_TERMS[termKey];

  if (!data) return <span>{children}</span>;

  return (
    <span className="relative inline-flex items-center gap-1 group cursor-help">
      <span className="border-b border-dotted border-[#234B3A] text-[#234B3A] font-medium group-hover:underline">
        {children || data.term}
      </span>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="text-[#22251F]/50 hover:text-[#234B3A] transition-colors"
        aria-label={`Definition of ${data.term}`}
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </button>

      {isOpen && (
        <span 
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 sm:w-72 p-3.5 rounded-xl bg-white border border-[#D9D5C9] shadow-lg z-50 text-left pointer-events-none block animate-in fade-in zoom-in-95 duration-150"
        >
          <span className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#234B3A] mb-1 block">
            <Info className="w-3.5 h-3.5" />
            {data.term}
          </span>
          <span className="text-xs text-[#22251F] block leading-relaxed mb-2">
            {data.definition}
          </span>
          <span className="text-[11px] text-[#22251F]/70 bg-[#F6F3EA] p-2 rounded-lg border border-[#D9D5C9] block leading-snug">
            <strong className="text-[#234B3A]">Campus Example: </strong>
            {data.example}
          </span>
        </span>
      )}
    </span>
  );
};
