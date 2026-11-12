import React from 'react';
import { 
  GraduationCap, Users, BookOpen, 
  ShieldCheck, CheckCircle2 
} from 'lucide-react';

export const ClassroomWorkflowSection: React.FC = () => {
  const learningObjectives = [
    {
      title: 'Financial Awareness',
      desc: 'Understanding cash flow vs. accounting profit, managing a ₹1,00,000 budget, opportunity costs, and runway calculation.',
    },
    {
      title: 'Critical Thinking',
      desc: 'Evaluating trade-offs between pricing, product features, marketing reach, and customer satisfaction.',
    },
    {
      title: 'Problem-Solving',
      desc: 'Responding to unforeseen supply chain shocks, viral demand surges, and aggressive rival pricing tactics.',
    },
    {
      title: 'Business Model Understanding',
      desc: 'Discovering unit economics, contribution margins, customer acquisition costs, and value propositions.',
    },
    {
      title: 'Leadership & Decision-Making',
      desc: 'Prioritizing scarce engineering and operational resources under real-world time and capital constraints.',
    },
    {
      title: 'Communication & Reflection',
      desc: 'Synthesizing performance into a 7-part founder pitch deck and articulating lessons learned honestly.',
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Teacher Introduces the Scenario',
      time: '5–10 mins',
      desc: 'The educator presents a business environment (Campus Meal Service, EdTech, or Circular Sustainability) and frames the core economic tension.',
    },
    {
      step: '02',
      title: 'Students Make Decisions in Teams',
      time: '20–25 mins',
      desc: 'Working individually or in small founder groups of 2–3, students investigate customer problems, configure models, allocate capital, and face events.',
    },
    {
      step: '03',
      title: 'Students Compare Their Approaches',
      time: '10 mins',
      desc: 'Teams compare their live metrics: Who prioritized kitchen capacity? Who spent heavily on marketing? Who preserved an emergency cash buffer?',
    },
    {
      step: '04',
      title: 'Facilitated Class Discussion',
      time: '10–15 mins',
      desc: 'The teacher guides a reflective debrief on trade-offs: Why did rapid growth without ops capacity cause delivery failures? What makes runway so critical?',
    },
    {
      step: '05',
      title: 'Students Present What They Learned',
      time: '10 mins',
      desc: 'Students present their capstone pitch slide decks and downloadable executive summaries, defending their choices before their peers.',
    },
  ];

  return (
    <section id="classroom-experience" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left bg-[#F6F3EA]">
      <div className="max-w-3xl mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EC] border border-[#C4D9CD] text-[11px] font-mono tracking-wider text-[#234B3A] uppercase font-semibold">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>45-Minute Classroom Integration</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#22251F] tracking-tight">
          Built for Standard Timetable Blocks
        </h2>
        <p className="text-[#575952] text-base sm:text-lg leading-relaxed">
          VENTURELAB integrates with existing high-school faculty: Economics, Commerce, Business Studies, and Atal Tinkering Labs &mdash; turning dry formulas into interactive discovery.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: 6 Core Learning Objectives */}
        <div className="lg:col-span-5 card-clean p-6 sm:p-8 bg-[#FFFFFF] border border-[#D9D5C9] space-y-5">
          <div className="flex items-center gap-2 border-b border-[#D9D5C9] pb-4">
            <BookOpen className="w-5 h-5 text-[#234B3A]" />
            <h3 className="text-lg font-bold text-[#22251F]">Core Learning Objectives</h3>
          </div>

          <p className="text-xs text-[#575952]">
            True financial intuition comes from making choices with consequences under scarce capital constraints.
          </p>

          <div className="space-y-3">
            {learningObjectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#FAF8F5] border border-[#D9D5C9]">
                <CheckCircle2 className="w-4 h-4 text-[#234B3A] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#22251F]">{obj.title}</div>
                  <div className="text-[11px] text-[#575952] mt-0.5 leading-snug">{obj.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: 5-Step Classroom Workflow */}
        <div className="lg:col-span-7 card-clean p-6 sm:p-8 bg-[#FFFFFF] border border-[#D9D5C9] space-y-5">
          <div className="flex items-center justify-between border-b border-[#D9D5C9] pb-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#234B3A]" />
              <h3 className="text-lg font-bold text-[#22251F]">Suggested Classroom Workflow</h3>
            </div>
            <span className="text-[10px] font-mono text-[#234B3A] bg-[#E8F0EC] border border-[#C4D9CD] px-2.5 py-0.5 rounded-full font-bold">
              45–60 Min Structure
            </span>
          </div>

          <div className="space-y-3">
            {workflowSteps.map((wf) => (
              <div key={wf.step} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#D9D5C9] flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#234B3A] text-[#F6F3EA] flex items-center justify-center font-mono font-bold text-xs shrink-0">
                  {wf.step}
                </div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#22251F]">{wf.title}</span>
                    <span className="text-[10px] font-mono text-[#575952] bg-[#FFFFFF] border border-[#D9D5C9] px-2 py-0.5 rounded">
                      {wf.time}
                    </span>
                  </div>
                  <p className="text-xs text-[#575952] leading-relaxed">
                    {wf.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Transparent Educational Disclaimer */}
          <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#D9D5C9] text-xs text-[#575952] flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#234B3A] shrink-0 mt-0.5" />
            <span>
              <strong className="text-[#22251F]">Educator Context:</strong> VENTURELAB is designed to assist educators rather than replace human classroom instruction.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
