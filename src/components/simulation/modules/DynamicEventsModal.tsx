import React from 'react';
import { Zap, X, ArrowRight, AlertTriangle } from 'lucide-react';
import type { DynamicEvent } from '../../../simulation/types';

interface DynamicEventsModalProps {
  event: DynamicEvent;
  onResolve: (choiceId: string) => void;
  onDismiss: () => void;
}

export const DynamicEventsModal: React.FC<DynamicEventsModalProps> = ({
  event,
  onResolve,
  onDismiss,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#22251F]/60 backdrop-blur-sm animate-fade-in text-left">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#FFFFFF] border border-[#D9D5C9] shadow-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#D9D5C9] pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#F8EFEA] border border-[#E5C3B6] text-[10px] font-mono font-bold uppercase tracking-wider text-[#B9684D]">
              <AlertTriangle className="w-3.5 h-3.5" />
              DYNAMIC BUSINESS CRISIS // {event.badge}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#22251F]">
              {event.title}
            </h3>
          </div>

          <button
            onClick={onDismiss}
            className="p-2 rounded-lg bg-[#F6F3EA] border border-[#D9D5C9] text-[#575952] hover:text-[#22251F] transition-colors cursor-pointer"
            aria-label="Dismiss Event"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* What happened & Why it matters */}
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#D9D5C9] space-y-1">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#234B3A]">
              Situation Breakdown:
            </div>
            <p className="text-xs sm:text-sm text-[#22251F] leading-relaxed">
              {event.situation}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F8EFEA] border border-[#E5C3B6] space-y-1">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#B9684D]">
              Strategic Trade-off:
            </div>
            <p className="text-xs text-[#575952] leading-relaxed">
              {event.whyItMatters}
            </p>
          </div>
        </div>

        {/* Choices Available */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#22251F]">
            Choose Your Strategic Response:
          </div>

          <div className="space-y-3">
            {event.choices.map((choice) => (
              <div
                key={choice.id}
                onClick={() => onResolve(choice.id)}
                className="p-4 rounded-xl bg-[#FFFFFF] border-2 border-[#D9D5C9] hover:border-[#234B3A] hover:bg-[#E8F0EC]/20 transition-all cursor-pointer text-left flex flex-col justify-between space-y-2 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-[#22251F] group-hover:text-[#234B3A] transition-colors">
                      {choice.label}
                    </h4>
                    <span className="text-xs font-bold text-[#234B3A] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      <span>Select</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <p className="text-xs text-[#575952] leading-relaxed">
                    {choice.actionSummary}
                  </p>
                </div>

                {/* Quantitative Impacts */}
                <div className="flex flex-wrap items-center gap-3 text-[11px] pt-2 border-t border-[#D9D5C9] font-mono">
                  <span className={choice.cashEffect < 0 ? 'text-[#B9684D]' : choice.cashEffect > 0 ? 'text-[#234B3A]' : 'text-[#575952]'}>
                    Cash: {choice.cashEffect < 0 ? `-₹${Math.abs(choice.cashEffect).toLocaleString('en-IN')}` : choice.cashEffect > 0 ? `+₹${choice.cashEffect.toLocaleString('en-IN')}` : '₹0'}
                  </span>
                  <span className={choice.satisfactionEffect > 0 ? 'text-[#234B3A]' : choice.satisfactionEffect < 0 ? 'text-[#B9684D]' : 'text-[#575952]'}>
                    Satisfaction: {choice.satisfactionEffect > 0 ? `+${choice.satisfactionEffect}%` : `${choice.satisfactionEffect}%`}
                  </span>
                  {choice.capacityEffect !== 0 && (
                    <span className="text-[#234B3A]">
                      Capacity: {choice.capacityEffect > 0 ? `+${choice.capacityEffect}` : `${choice.capacityEffect}`}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
