import React from 'react';
import { 
  ShieldCheck, 
  Server, 
  Monitor, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  GraduationCap
} from 'lucide-react';

export const SchoolImplementationSection: React.FC = () => {
  return (
    <section id="school-implementation" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#D9D5C9] bg-[#F6F3EA] text-left">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EC] border border-[#C4D9CD] text-[10px] font-mono font-bold uppercase tracking-wider text-[#234B3A]">
            <Server className="w-3.5 h-3.5" />
            <span>INSTITUTIONAL DEPLOYMENT &amp; PRIVACY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#22251F] tracking-tight">
            School Implementation, Technical Architecture &amp; Privacy
          </h2>
          <p className="text-sm sm:text-base text-[#575952] leading-relaxed">
            A transparent overview for school principals, IT coordinators, and academic heads on how VENTURELAB deploys safely into existing school computer labs and networks.
          </p>
        </div>

        {/* 3-Column Technical Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Zero-Install Deployment */}
          <div className="card-clean p-6 bg-[#FFFFFF] border border-[#D9D5C9] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8F0EC] text-[#234B3A] flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#22251F]">Zero-Install Web Deployment</h3>
            <p className="text-xs text-[#575952] leading-relaxed">
              100% browser-based application running on standard web protocols. No executable files, no administrative installation rights required on school computers.
            </p>
            <div className="pt-2 border-t border-[#D9D5C9] text-[11px] text-[#22251F] font-mono space-y-1">
              <div>&bull; Bandwidth: ~4 Mbps per active classroom</div>
              <div>&bull; Browsers: Chrome 90+, Edge, Safari 15+, Firefox</div>
            </div>
          </div>

          {/* Card 2: 100% 2D Performance */}
          <div className="card-clean p-6 bg-[#FFFFFF] border border-[#D9D5C9] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8F0EC] text-[#234B3A] flex items-center justify-center">
              <Monitor className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#22251F]">Lightweight 2D Architecture</h3>
            <p className="text-xs text-[#575952] leading-relaxed">
              Pure 2D vector workspace without WebGL or 3D engine overhead. Fast initial load times and smooth rendering across low-spec computers and Chromebooks.
            </p>
            <div className="pt-2 border-t border-[#D9D5C9] text-[11px] text-[#22251F] font-mono space-y-1">
              <div>&bull; Tested on: Desktops, Chromebooks, Laptops, Tablets</div>
              <div>&bull; Fast load: Zero GPU driver crashes or freeze states</div>
            </div>
          </div>

          {/* Card 3: Privacy Architecture */}
          <div className="card-clean p-6 bg-[#FFFFFF] border border-[#D9D5C9] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8F0EC] text-[#234B3A] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#22251F]">Privacy-by-Design Architecture</h3>
            <p className="text-xs text-[#575952] leading-relaxed">
              No collection of personally identifiable information (PII) from students during demonstration. No third-party ad tracking, no public leaderboards, and no behavioral profiling.
            </p>
            <div className="pt-2 border-t border-[#D9D5C9] text-[11px] text-[#22251F] font-mono space-y-1">
              <div>&bull; Data Storage: Local session-bound persistence</div>
              <div>&bull; Compliance: Designed for DPDP/FERPA alignment</div>
            </div>
          </div>

        </div>

        {/* Feature Roadmap & Transparent Disclosure */}
        <div className="card-clean p-6 sm:p-8 bg-[#FFFFFF] border border-[#D9D5C9] space-y-6">
          <div className="border-b border-[#D9D5C9] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-[#234B3A] tracking-wider">
                TRANSPARENT PRODUCT DISCLOSURE
              </span>
              <h3 className="text-lg font-bold text-[#22251F]">
                Current Implementation Status vs. School Rollout Roadmap
              </h3>
            </div>
            <span className="text-xs text-[#575952] font-mono">
              Honest EdTech Disclosures
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            
            {/* Status 1: Current Implementation */}
            <div className="space-y-3 p-4 rounded-xl bg-[#FAF8F5] border border-[#D9D5C9]">
              <div className="flex items-center gap-1.5 text-[#234B3A] font-bold text-xs uppercase font-mono">
                <CheckCircle2 className="w-4 h-4 text-[#234B3A]" />
                <span>Available in Current Platform</span>
              </div>
              <ul className="space-y-1.5 text-[#575952] text-[11px]">
                <li className="flex items-start gap-1.5">
                  <span className="text-[#234B3A]">&bull;</span>
                  <span>11 structured entrepreneurship learning stages.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#234B3A]">&bull;</span>
                  <span>Pure 2D interactive workspace with bespoke flat vector illustrations.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#234B3A]">&bull;</span>
                  <span>Intern hiring stage with 3 distinct fictional candidates (Aarav, Riya, Kabir).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#234B3A]">&bull;</span>
                  <span>Deterministic business survival simulation engine.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#234B3A]">&bull;</span>
                  <span>Persistent decision journal and transparent assumptions disclosure.</span>
                </li>
              </ul>
            </div>

            {/* Status 2: Planned for Pilot */}
            <div className="space-y-3 p-4 rounded-xl bg-[#FAF8F5] border border-[#D9D5C9]">
              <div className="flex items-center gap-1.5 text-[#234B3A] font-bold text-xs uppercase font-mono">
                <Clock className="w-4 h-4 text-[#234B3A]" />
                <span>Planned for School Pilot Release</span>
              </div>
              <ul className="space-y-1.5 text-[#575952] text-[11px]">
                <li className="flex items-start gap-1.5">
                  <span className="text-[#234B3A]">&bull;</span>
                  <span>School Single Sign-On (Google Workspace &amp; Microsoft 365).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#234B3A]">&bull;</span>
                  <span>Teacher-controlled classroom roster management.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#234B3A]">&bull;</span>
                  <span>Customizable local business scenario generator for regional contexts.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#234B3A]">&bull;</span>
                  <span>Batch portfolio grading and automated gradebook export.</span>
                </li>
              </ul>
            </div>

            {/* Status 3: Prerequisites */}
            <div className="space-y-3 p-4 rounded-xl bg-[#FAF8F5] border border-[#D9D5C9]">
              <div className="flex items-center gap-1.5 text-[#B9684D] font-bold text-xs uppercase font-mono">
                <AlertCircle className="w-4 h-4 text-[#B9684D]" />
                <span>Prerequisites for Full Rollout</span>
              </div>
              <ul className="space-y-1.5 text-[#575952] text-[11px]">
                <li className="flex items-start gap-1.5">
                  <span className="text-[#B9684D]">&bull;</span>
                  <span>Institutional data protection agreements with school management.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#B9684D]">&bull;</span>
                  <span>Parental consent procedures for student participation.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#B9684D]">&bull;</span>
                  <span>School IT domain whitelisting verification.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#B9684D]">&bull;</span>
                  <span>Teacher professional development workshop (2 hours).</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Teacher Role Statement */}
        <div className="p-5 rounded-xl bg-[#FAF8F5] border-l-4 border-l-[#234B3A] border border-[#D9D5C9] text-xs text-[#575952] leading-relaxed flex items-start gap-3">
          <GraduationCap className="w-5 h-5 text-[#234B3A] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#22251F] block mb-0.5">Pedagogical Philosophy: Complements Teachers, Never Replaces Them</strong>
            VENTURELAB is built as an experiential sandbox to stimulate classroom debate, critical inquiry, and hands-on decision analysis. The platform provides simulated scenarios and telemetry so that educators can lead richer Socratic discussions, coach student squads, and evaluate evidence-based portfolios.
          </div>
        </div>

      </div>
    </section>
  );
};
