import React from 'react';
import { 
  Users, School, MessageSquareText, Monitor, CheckCircle2, 
  GraduationCap, HeartHandshake 
} from 'lucide-react';


export const SchoolBenefitsSection: React.FC = () => {
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
