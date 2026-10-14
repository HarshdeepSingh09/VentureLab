import React, { useState } from 'react';
import { 
  ArrowRight, Monitor, TrendingUp, Users, 
  CheckCircle2, Activity, DollarSign
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'market' | 'decision'>('dashboard');

  const scrollToJourney = () => {
    const el = document.getElementById('journey');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPartnership = () => {
    const el = document.getElementById('partnership');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 lg:pt-36 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Ambient gradient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Core Value Proposition */}
        <div className="lg:col-span-6 space-y-6 text-left">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-bold tracking-widest text-cyan-400 uppercase shadow-inner">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            ENTREPRENEURSHIP, EXPERIENCED.
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Don&rsquo;t Just Learn Business.{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 bg-clip-text text-transparent">
              Experience Building One.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
            An interactive entrepreneurship journey where students discover real-world problems, build business ideas, manage simulated finances, navigate challenges, and experience the decisions behind running a business.
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={scrollToJourney}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-950/60 hover:shadow-cyan-900/80 transition-all group cursor-pointer"
            >
              <span>Explore the Journey</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={scrollToPartnership}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-sm transition-all hover:border-slate-600 cursor-pointer"
            >
              Partner With Us
            </button>
          </div>

          {/* Supporting Line */}
          <div className="pt-3 flex items-start gap-2.5 text-xs text-slate-400 max-w-md">
            <Monitor className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="leading-snug">
              Designed for experiential learning. Accessible through compatible web browsers. No VR headset required.
            </p>
          </div>

          {/* School Target Badges */}
          <div className="pt-4 border-t border-slate-900 flex flex-wrap gap-2 text-xs text-slate-400">
            <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">
              Classes 9–12
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">
              CBSE • ICSE • IB • Cambridge
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">
              Commerce & Innovation Labs
            </span>
          </div>
        </div>

        {/* Right Column: Visually Impressive 3D-Inspired Virtual Startup Environment */}
        <div className="lg:col-span-6 relative">
          {/* Subtle floating 3D cockpit perspective */}
          <div className="relative mx-auto max-w-lg lg:max-w-none">
            {/* Outer ambient glow and layered rings */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-sky-500/20 blur-xl opacity-70 group-hover:opacity-100 transition duration-1000" />

            <div className="relative rounded-3xl glass-panel p-5 sm:p-7 border border-slate-700/80 shadow-2xl space-y-5 animate-subtle-float">
              {/* Cockpit Window Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 pl-2">
                    SIMULATION-WORKSPACE::CAMPUS_VENTURE_V1
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-800/40 text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE RUNWAY
                </div>
              </div>

              {/* Viewport Mode Switcher */}
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800/80">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'dashboard'
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/50 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Founder&rsquo;s Desk
                </button>
                <button
                  onClick={() => setActiveTab('market')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'market'
                      ? 'bg-violet-950 text-violet-300 border border-violet-800/50 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Campus Market
                </button>
                <button
                  onClick={() => setActiveTab('decision')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'decision'
                      ? 'bg-amber-950 text-amber-300 border border-amber-800/50 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Live Decision
                </button>
              </div>

              {/* Cockpit Content Window */}
              {activeTab === 'dashboard' && (
                <div className="space-y-4">
                  {/* Financial Overview on Founder's Terminal */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                      <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                        <span>Working Capital</span>
                        <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <div className="text-xl font-bold font-mono text-white">₹1,00,000</div>
                      <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>Runway: 4.2 Months Buffer</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                      <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                        <span>Active Subscribers</span>
                        <Users className="w-3.5 h-3.5 text-violet-400" />
                      </div>
                      <div className="text-xl font-bold font-mono text-white">142 Hostellers</div>
                      <div className="text-[10px] text-cyan-400 mt-1">
                        <span>Daily Lunch SLA: 98.4%</span>
                      </div>
                    </div>
                  </div>

                  {/* Simulated Workspace Elements: Interactive Founder's Desk View */}
                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-cyan-400" />
                        Kitchen Partner Capacity Load
                      </span>
                      <span className="font-mono text-cyan-300 text-[11px]">85 / 100 boxes</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-[85%] rounded-full" />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Kitchen A: 48 packs</span>
                      <span>Kitchen B: 37 packs</span>
                      <span>Buffer: 15 packs</span>
                    </div>
                  </div>

                  {/* Simulated Student Persona Badge */}
                  <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-800/40 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-cyan-800/40 border border-cyan-500/50 flex items-center justify-center font-bold text-cyan-200 text-xs">
                        RK
                      </div>
                      <div>
                        <span className="font-semibold text-slate-200 block">Rohan K. (2nd Yr B.Com)</span>
                        <span className="text-[10px] text-slate-400">&ldquo;Warm lunch reached gate at 12:55 PM.&rdquo;</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-cyan-900/50 text-cyan-300 text-[10px] font-mono">
                      ⭐ 5.0
                    </span>
                  </div>
                </div>
              )}

              {activeTab === 'market' && (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-semibold">Campus Market Share</span>
                      <span className="font-mono text-violet-400">Target: 350 Hostellers</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Observing demand signals across 3 campus hostel clusters. Lunch recess timing constraint (35 mins) creates predictable recurring order peaks.
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                      <div className="p-2 rounded bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 block">Hostel Block A</span>
                        <span className="font-bold text-white">62 Active</span>
                      </div>
                      <div className="p-2 rounded bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 block">Hostel Block B</span>
                        <span className="font-bold text-white">80 Active</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-violet-950/20 border border-violet-800/40 text-xs text-violet-300">
                    💡 <strong>Market Observation:</strong> Students prioritize punctuality over expansive menus during weekday examination weeks.
                  </div>
                </div>
              )}

              {activeTab === 'decision' && (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block">
                      Active Dilemma in Simulation
                    </span>
                    <h4 className="text-xs font-bold text-white">
                      Packaging Supplier Hikes Rates by 15%
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Biodegradable container supplier costs increase by ₹4/meal. What does the student team choose?
                    </p>
                    <div className="space-y-1.5 pt-1 text-[11px]">
                      <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-between">
                        <span>• Absorb cost from emergency reserve</span>
                        <span className="text-cyan-400 font-mono">Conserves Volume</span>
                      </div>
                      <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-between">
                        <span>• Pass ₹5 increase to monthly subscribers</span>
                        <span className="text-amber-400 font-mono">Tests Elasticity</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Feature Pill: Zero VR Hardware */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  Cloud Simulated Environment
                </span>
                <span className="text-slate-400">Zero VR Gear Required</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
