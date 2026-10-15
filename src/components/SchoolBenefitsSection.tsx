import React, { useState } from 'react';
import { 
  Users, School, MessageSquareText, Monitor, CheckCircle2, 
  GraduationCap, HeartHandshake, Clock, Calendar, Trophy 
} from 'lucide-react';


export const SchoolBenefitsSection: React.FC = () => {
  const [activeModality, setActiveModality] = useState<number>(0);

  const features = [
    {
      icon: Users,
      badge: 'Feature 01',
      title: 'Student Participation',
      description:
        'Students learn by making decisions inside structured simulations rather than passively reading case studies. Every student navigates dilemmas, justifies their rationale, and observes consequences in a risk-free environment.',
      curriculumFit: 'Active experiential learning for Classes 9–12',
    },
    {
      icon: School,
      badge: 'Feature 02',
      title: 'Classroom Integration',
      description:
        'The experience is designed to complement existing Commerce and Business Studies syllabi, entrepreneurship cells, Atal Tinkering Labs (ATLs), commerce clubs, and annual school innovation projects.',
      curriculumFit: 'Aligned with CBSE, ICSE, IB, and Cambridge frameworks',
    },
    {
      icon: MessageSquareText,
      badge: 'Feature 03',
      title: 'Reflection and Feedback',
      description:
        'Structured post-simulation dashboards allow educators to guide group debriefs. Students review why a specific cash allocation failed or how an operational bottleneck emerged, reinforcing conceptual clarity.',
      curriculumFit: 'Formative assessment and self-directed reflection',
    },
    {
      icon: Monitor,
      badge: 'Feature 04',
      title: 'Accessible Delivery',
      description:
        'The platform is being designed for cloud-based browser access across standard computer labs, laptops, desktops, and compatible tablets. No expensive VR headsets, specialized game consoles, or complex installations required.',
      curriculumFit: 'Frictionless school IT lab deployment',
    },
  ];

  const modalities = [
    {
      icon: Clock,
      title: 'Standard 40-Minute Class Period',
      tagline: 'Fits seamlessly into standard school timetables',
      breakdown: [
        { time: '00–10 min', phase: 'Context & Scenario Briefing', detail: 'Educator introduces the economic constraint or customer dilemma.' },
        { time: '10–30 min', phase: 'Active Student Simulation', detail: 'Students independently or in pairs test pricing, allocate budget, and execute choices.' },
        { time: '30–40 min', phase: 'Guided Classroom Debrief', detail: 'Teacher reviews cross-classroom consequence metrics and highlights core principles.' },
      ],
    },
    {
      icon: Calendar,
      title: 'Commerce & Innovation Club Sprints',
      tagline: 'Weekly 60–90 min co-curricular sessions',
      breakdown: [
        { time: 'Week 1–2', phase: 'Customer Discovery & Ideation', detail: 'Students evaluate simulated campus problems and craft differentiated value propositions.' },
        { time: 'Week 3–4', phase: 'Unit Economics & Capital Testing', detail: 'Multi-round working capital iterations and unexpected business challenge responses.' },
        { time: 'Week 5', phase: 'Venture Showcase Pitch Day', detail: 'Teams present interactive pitch decks evaluated by faculty and guest alumni mentors.' },
      ],
    },
    {
      icon: Trophy,
      title: 'Annual School Entrepreneurship Day',
      tagline: 'Inter-house or inter-school innovation competition',
      breakdown: [
        { time: 'Session 1', phase: 'Venture Incubation Marathon', detail: 'Concurrent student teams simulate competing against market disruptions in real time.' },
        { time: 'Session 2', phase: 'Boardroom Defense & Reasoning', detail: 'Students justify their financial runway resilience and operational pivot strategies.' },
        { time: 'Session 3', phase: 'Awards & Feedback Ceremony', detail: 'Recognition for best risk management, highest CSAT, and disciplined capital allocation.' },
      ],
    },
  ];

  return (
    <section id="schools" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background radial accent */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-cyan-900/10 blur-3xl pointer-events-none -z-10 rounded-full" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-4">
          <GraduationCap className="w-3.5 h-3.5" />
          Institutional Alignment
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
          Practical Entrepreneurship Learning, Designed for the Classroom.
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          How our proposed simulation model is envisioned to support high school educators, career counsellors, and academic leadership.
        </p>
      </div>

      {/* 4 Core Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800/90 hover:border-slate-700 transition-all duration-300 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-cyan-950/60 border border-cyan-800/50 flex items-center justify-center text-cyan-400">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                  {item.badge}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-xs font-medium text-cyan-400">{item.curriculumFit}</p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
            </div>
          );
        })}
      </div>

      {/* Classroom Timetable Integration Modalities */}
      <div className="mb-16 glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
              Flexible Implementation Formats
            </span>
            <h3 className="text-xl font-bold text-white">
              How Schools Could Schedule the Experience
            </h3>
          </div>
          {/* Modality switcher pills */}
          <div className="flex flex-wrap gap-2">
            {modalities.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveModality(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  activeModality === idx
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60 shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {idx === 0 ? '40-Min Period' : idx === 1 ? 'Club Sprint' : 'Annual Bootcamp'}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Modality Detail */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            {React.createElement(modalities[activeModality].icon, { className: 'w-5 h-5 text-cyan-400' })}
            <div>
              <h4 className="text-base font-bold text-white">{modalities[activeModality].title}</h4>
              <p className="text-xs text-slate-400">{modalities[activeModality].tagline}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {modalities[activeModality].breakdown.map((b, bIdx) => (
              <div key={bIdx} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1.5">
                <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/50 inline-block">
                  {b.time}
                </span>
                <h5 className="text-sm font-semibold text-slate-200 pt-1">{b.phase}</h5>
                <p className="text-xs text-slate-400 leading-relaxed">{b.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* "Built With Educators, Not Just For Them" Callout Box */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-cyan-950/30 border border-cyan-900/40 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-700/50 text-xs font-semibold text-cyan-300">
            <HeartHandshake className="w-3.5 h-3.5" />
            Educator-Led Co-Design
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Built With Educators, Not Just For Them
          </h3>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            We are seeking feedback from school principals, counsellors, and educators to understand classroom needs and shape the platform before full-scale development.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Timetable & period-length adaptability (35–45 min modules)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Teacher facilitation notes and guided inquiry questions</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Zero complex software or VR headset hardware dependencies</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
