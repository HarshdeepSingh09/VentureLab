import React from 'react';

const CURRENT_YEAR = 2026;

export const Footer: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-[#D9D5C9] bg-[#FFFFFF] text-[#575952] text-xs py-12 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Brand */}
          <div className="space-y-1.5 max-w-sm">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#234B3A] text-[#F6F3EA] flex items-center justify-center font-bold text-xs">
                VL
              </div>
              <span className="font-extrabold text-[#22251F] text-sm tracking-tight">
                VENTURELAB
              </span>
            </div>
            <p className="text-[#575952] text-xs leading-relaxed">
              Experiential entrepreneurship simulation platform for secondary schools (Classes 9–12).
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-5 text-xs">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="text-[#575952] hover:text-[#22251F] transition-colors"
            >
              Overview
            </a>
            <a
              href="#the-journey"
              onClick={(e) => handleNavClick(e, '#the-journey')}
              className="text-[#575952] hover:text-[#22251F] transition-colors"
            >
              11 Stages
            </a>
            <a
              href="#weekly-dilemma"
              onClick={(e) => handleNavClick(e, '#weekly-dilemma')}
              className="text-[#575952] hover:text-[#22251F] transition-colors"
            >
              Weekly Dilemma
            </a>
            <a
              href="#school-implementation"
              onClick={(e) => handleNavClick(e, '#school-implementation')}
              className="text-[#575952] hover:text-[#22251F] transition-colors"
            >
              Architecture &amp; Privacy
            </a>
            <a
              href="#pilot-enquiry"
              onClick={(e) => handleNavClick(e, '#pilot-enquiry')}
              className="text-[#575952] hover:text-[#22251F] transition-colors"
            >
              School Pilot
            </a>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 border-t border-[#D9D5C9] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-[#7E8078]">
          <p>
            &copy; {CURRENT_YEAR} VENTURELAB. Built for educator evaluation and classroom demonstration.
          </p>
          <div className="flex gap-4">
            <span>Deterministic Financial Engine</span>
            <span>&bull;</span>
            <span>Zero WebGL Overhead</span>
            <span>&bull;</span>
            <span>Privacy by Design</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
