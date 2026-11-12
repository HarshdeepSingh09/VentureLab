import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  term: string;
  explanation: string;
  children?: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ term, explanation, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="relative inline-flex items-center gap-1 group">
      {children || <span className="underline decoration-dotted decoration-slate-400 cursor-help font-medium">{term}</span>}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        aria-label={`What is ${term}?`}
        className="text-slate-400 hover:text-cyan-400 transition-colors p-0.5 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500"
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </button>

      {isOpen && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 p-3 bg-slate-900/95 backdrop-blur-md text-slate-200 text-xs rounded-xl border border-slate-700/80 shadow-2xl pointer-events-none transition-all duration-200 animate-in fade-in zoom-in-95"
        >
          <strong className="block text-cyan-300 font-bold mb-1 border-b border-slate-800 pb-1">
            {term}
          </strong>
          <span className="text-slate-300 leading-relaxed block font-normal">
            {explanation}
          </span>
          {/* Caret arrow */}
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800" />
        </span>
      )}
    </span>
  );
};
