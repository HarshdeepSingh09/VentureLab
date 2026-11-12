import React, { useState, useEffect } from 'react';
import { Menu, X, Play, GraduationCap } from 'lucide-react';

interface NavbarProps {
  onOpenSimulation: () => void;
  onOpenEducatorPortal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSimulation, onOpenEducatorPortal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#hero' },
    { label: '11 Stages', href: '#the-journey' },
    { label: 'Weekly Dilemma', href: '#weekly-dilemma' },
    { label: 'School Pilot', href: '#pilot-enquiry' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#FFFFFF] border-b border-[#D9D5C9] shadow-xs'
          : 'bg-[#F6F3EA] border-b border-[#D9D5C9]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, '#hero')} 
          className="flex items-center gap-2.5 group select-none text-left"
        >
          <div className="w-9 h-9 rounded-lg bg-[#234B3A] text-[#F6F3EA] flex items-center justify-center font-bold text-base shadow-xs">
            VL
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[#22251F] text-base tracking-tight">
                VENTURELAB
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#E8F0EC] text-[#234B3A] border border-[#C4D9CD]">
                Classes 9–12
              </span>
            </div>
            <span className="text-[11px] text-[#575952] block -mt-0.5 font-medium">
              Entrepreneurship Simulation Platform
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-3 py-1.5 rounded-md text-xs font-semibold text-[#575952] hover:text-[#22251F] hover:bg-[#F0EDE4] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Primary CTAs */}
        <div className="hidden md:flex items-center gap-2.5">
          {onOpenEducatorPortal && (
            <button
              onClick={onOpenEducatorPortal}
              className="btn-outline text-xs py-2 px-3 flex items-center gap-1.5"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#234B3A]" />
              <span>Educator Mode</span>
            </button>
          )}

          <button
            onClick={onOpenSimulation}
            className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Launch Simulation</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-[#D9D5C9] bg-[#FFFFFF] text-[#22251F] cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFFFF] border-b border-[#D9D5C9] p-4 space-y-3 text-left animate-fade-in shadow-lg">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 rounded-md text-xs font-semibold text-[#22251F] hover:bg-[#F0EDE4]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 border-t border-[#D9D5C9] flex flex-col gap-2">
            {onOpenEducatorPortal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEducatorPortal();
                }}
                className="btn-outline text-xs w-full py-2.5"
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#234B3A]" />
                <span>Educator Mode</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSimulation();
              }}
              className="btn-primary text-xs w-full py-2.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Launch Simulation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
