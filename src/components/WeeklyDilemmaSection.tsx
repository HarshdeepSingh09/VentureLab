import React, { useState } from 'react';
import {
  Vote,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  Users
} from 'lucide-react';

interface DilemmaChoice {
  id: string;
  title: string;
  description: string;
  initialVotePercent: number;
  tradeoffSummary: string;
  pedagogicalTakeaway: string;
}

export const WeeklyDilemmaSection: React.FC = () => {
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  const dilemma = {
    weekNumber: 'WEEK 42',
    topic: 'Operations vs Customer Experience',
    title: 'The Exam-Week Kitchen Breakdown & 40-Minute Lunch Rush',
    situation:
      'Mid-term exams have scheduled 400 students across 3 campus blocks for an identical 35-minute lunch break. Your prep kitchen is operating at 160% capacity. Your primary meal warmers just tripped a circuit breaker, threatening delivery temperature.',
    challengePrompt:
      'As founder, what operational stance do you enforce right now?',
    choices: [
      {
        id: 'refund-honest',
        title: 'Option A: Pause Orders Immediately & Issue Instant Refunds',
        description:
          'Halt incoming orders, notify waiting students on WhatsApp, and refund the 45 affected meals (₹4,275 cost). Offer a 20% future discount token.',
        initialVotePercent: 44,
        tradeoffSummary:
          'Protects customer trust and eliminates food safety risks, but sacrifices ₹4,275 in direct working capital.',
        pedagogicalTakeaway:
          'Proactive transparency and instant refunds convert a potential disaster into long-term customer loyalty.',
      },
      {
        id: 'speed-compromise',
        title: 'Option B: Deploy Fast Ambient Packs with Free Hot Chai',
        description:
          'Deploy meals immediately at ambient temperature with free hot chai thermoses outside lecture halls without warming cycle.',
        initialVotePercent: 36,
        tradeoffSummary:
          'Fulfills 100% of order commitments punctually, but slightly compromises warmth and culinary standards.',
        pedagogicalTakeaway:
          'Creative improvisations solve time-critical bottlenecks when punctuality is non-negotiable for student schedules.',
      },
      {
        id: 'outsource-canteen',
        title: 'Option C: Subcontract Kitchen Overflow to College Canteen',
        description:
          'Pay the campus canteen ₹35/meal to quickly warm and plate remaining batches under your supervision.',
        initialVotePercent: 20,
        tradeoffSummary:
          'Preserves delivery temperature, but costs ₹1,575 and hands sensitive prep over to a potential rival.',
        pedagogicalTakeaway:
          'Partnership outsourcing can bridge sudden capacity spikes, but requires strict quality oversight.',
      },
    ],
  };

  const handleVote = (choiceId: string) => {
    setSelectedChoiceId(choiceId);
    setHasVoted(true);
  };

  return (
    <section id="weekly-dilemma" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left bg-[#F6F3EA]">
      <div className="max-w-3xl mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EC] border border-[#C4D9CD] text-[11px] font-mono tracking-wider text-[#234B3A] uppercase font-semibold">
          <Vote className="w-3.5 h-3.5" />
          <span>Classroom Discussion &bull; Weekly Case Dilemma</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#22251F] tracking-tight">
          Weekly Entrepreneurship Dilemma
        </h2>

        <p className="text-[#575952] text-base sm:text-lg leading-relaxed">
          Every Monday, schools across the country deliberate the same real-world business dilemma. Cast your vote below to see how student founders nationwide decided.
        </p>
      </div>

      <div className="card-clean p-6 sm:p-8 bg-[#FFFFFF] border border-[#D9D5C9] space-y-6">
        
        {/* Dilemma Header Banner */}
        <div className="border-b border-[#D9D5C9] pb-5 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#B9684D]">
              {dilemma.weekNumber} &bull; {dilemma.topic}
            </span>
            <span className="text-xs font-mono font-semibold text-[#575952] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#234B3A]" />
              3,420 Student Founders Voted
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#22251F]">
            {dilemma.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#575952] leading-relaxed">
            {dilemma.situation}
          </p>
        </div>

        {/* Challenge Prompt */}
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#22251F]">
          {dilemma.challengePrompt}
        </div>

        {/* Choices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dilemma.choices.map((choice) => {
            const isSelected = selectedChoiceId === choice.id;
            const displayVote = hasVoted
              ? isSelected
                ? choice.initialVotePercent + 2
                : choice.initialVotePercent - 1
              : choice.initialVotePercent;

            return (
              <div
                key={choice.id}
                onClick={() => handleVote(choice.id)}
                className={`p-4 rounded-xl border-2 text-left cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#E8F0EC]/40 border-[#234B3A] shadow-xs'
                    : 'bg-[#FFFFFF] border-[#D9D5C9] hover:border-[#B8B3A4]'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-bold text-[#22251F] leading-tight">
                      {choice.title}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-[#234B3A] shrink-0 ml-2" />
                    )}
                  </div>

                  <p className="text-xs text-[#575952] leading-relaxed">
                    {choice.description}
                  </p>

                  {/* Voting Results Bar */}
                  {hasVoted && (
                    <div className="space-y-1 pt-2 border-t border-[#D9D5C9]">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-[#575952]">National Votes:</span>
                        <span className="font-bold text-[#234B3A]">{displayVote}%</span>
                      </div>
                      <div className="w-full bg-[#D9D5C9] rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-[#234B3A] h-full rounded-full transition-all duration-500"
                          style={{ width: `${displayVote}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-[#D9D5C9] space-y-1 text-[11px]">
                  <p className="text-[#575952]">
                    <strong className="text-[#22251F]">Trade-off: </strong>
                    {choice.tradeoffSummary}
                  </p>
                  {hasVoted && (
                    <p className="text-[#234B3A] italic font-medium">
                      &bull; Lesson: {choice.pedagogicalTakeaway}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {!hasVoted && (
          <div className="text-center pt-2 text-xs text-[#7E8078]">
            Click one of the 3 strategies above to submit your vote and reveal how student founders nationwide responded.
          </div>
        )}

      </div>
    </section>
  );
};
