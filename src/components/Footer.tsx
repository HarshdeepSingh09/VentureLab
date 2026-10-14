import React from 'react';
import { Info } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {

  return (
    <footer className="border-t border-slate-900 bg-slate-950/80 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Module */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-sm">
                V
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">
                VenturEd Labs
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400">
                Concept Preview
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              A proposed cloud-based experiential learning platform empowering school students (Classes 9–12) to experience the complete journey of building and running a business.
            </p>
            <div className="text-slate-400 text-xs font-medium">
              Featured Experience: <strong className="text-slate-200">Entrepreneurship Journey</strong>
            </div>
          </div>

          {/* Institutional Contact Placeholder */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Institutional Contact
            </h4>
            <p className="text-slate-400 leading-relaxed text-xs">
              Direct all school leadership & pilot queries to:
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-cyan-300">
              contact [at] venturexrlabs.edu.in
              <span className="block text-[10px] text-slate-400 mt-0.5">(Institutional Communications Placeholder)</span>
            </div>
          </div>

          {/* Governance & Privacy Notice Placeholder */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Institutional Governance
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <span className="hover:text-slate-300 cursor-pointer">
                  • Institutional Data Privacy & School Pilot Terms (Draft Framework)
                </span>
              </li>
              <li>
                <span className="hover:text-slate-300 cursor-pointer">
                  • Student Safety & Minor Protection Guidelines
                </span>
              </li>
              <li>
                <span className="hover:text-slate-300 cursor-pointer">
                  • Cloud Infrastructure & Browser Security Standards
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Clear Disclaimer and Honest Positioning Notice */}
        <div className="pt-8 border-t border-slate-900 space-y-3">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-start gap-3 text-[11px] text-slate-400 leading-relaxed">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-300 block mb-0.5">Product Stage & Disclosure:</strong>
              This website serves as a product presentation and conceptual validation framework intended for school principals, educators, and institutional partners. VenturEd is an early-stage initiative currently under exploration for Indian secondary schools. All financial models, student personas, and simulations displayed are illustrative educational exercises designed to demonstrate proposed learning methodologies without requiring VR headsets.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
            <span>© {CURRENT_YEAR} VenturEd Labs. All rights reserved.</span>
            <span>Cloud-Accessible Experiential Education • No VR Headset Required</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
