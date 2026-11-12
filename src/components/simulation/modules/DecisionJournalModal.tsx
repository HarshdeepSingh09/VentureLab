import React, { useState } from 'react';
import { BookOpen, X, Clock, ChevronDown, ChevronUp, Pencil, Check, Sparkles } from 'lucide-react';
import type { DecisionJournalEntry } from '../../../simulation/types';

interface DecisionJournalModalProps {
  entries: DecisionJournalEntry[];
  onClose: () => void;
  onAddReflection: (entryId: string, reflection: string) => void;
}

interface JournalEntryCardProps {
  entry: DecisionJournalEntry;
  index: number;
  onAddReflection: (id: string, text: string) => void;
}

const JournalEntryCard: React.FC<JournalEntryCardProps> = ({ entry, index, onAddReflection }) => {
  const [expanded, setExpanded] = useState(true);
  const [editingReflection, setEditingReflection] = useState(false);
  const [reflectionText, setReflectionText] = useState(entry.reflection || '');

  const handleSave = () => {
    onAddReflection(entry.id, reflectionText);
    setEditingReflection(false);
  };

  return (
    <div className="rounded-xl border border-[#D9D5C9] bg-[#FFFFFF] overflow-hidden text-left shadow-sm">
      {/* Entry Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 text-left flex items-start gap-3 cursor-pointer hover:bg-[#F6F3EA]/70 transition-colors"
      >
        <div className="w-7 h-7 rounded-full bg-[#E8F0EC] border border-[#C4D9CD] flex items-center justify-center text-xs font-bold text-[#234B3A] shrink-0 mt-0.5 font-mono">
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-[#F0EDE4] text-[#575952] border border-[#D9D5C9]">
              {entry.locationName}
            </span>
            <span className="text-[10px] text-[#7E8078] flex items-center gap-1 font-mono">
              <Clock className="w-2.5 h-2.5" />
              {entry.timestamp}
            </span>
          </div>
          <p className="text-sm font-semibold text-[#22251F]">{entry.decision}</p>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-[#7E8078] shrink-0 mt-1" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[#7E8078] shrink-0 mt-1" />
        )}
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-[#D9D5C9] bg-[#FAF8F5]">
          <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#D9D5C9]">
              <div className="text-[10px] font-mono uppercase font-bold text-[#234B3A] mb-1">
                Simulated Consequence
              </div>
              <p className="text-xs text-[#22251F] leading-relaxed">{entry.consequence}</p>
            </div>
            <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#D9D5C9]">
              <div className="text-[10px] font-mono uppercase font-bold text-[#B9684D] mb-1">
                Trade-off Analysis
              </div>
              <p className="text-xs text-[#575952] leading-relaxed">{entry.tradeoff}</p>
            </div>
          </div>

          {/* Student Reflection */}
          <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#D9D5C9]">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] font-mono uppercase font-bold text-[#575952]">
                Your Strategic Reflection
              </div>
              {!editingReflection && (
                <button
                  onClick={() => setEditingReflection(true)}
                  className="text-[11px] text-[#234B3A] hover:underline flex items-center gap-1 cursor-pointer font-medium"
                >
                  <Pencil className="w-3 h-3" />
                  {entry.reflection ? 'Edit reflection' : 'Add your thoughts'}
                </button>
              )}
            </div>
            {editingReflection ? (
              <div className="space-y-2">
                <textarea
                  value={reflectionText}
                  onChange={(e) => setReflectionText(e.target.value)}
                  placeholder="Why did you make this decision? What trade-off did you consider?"
                  className="w-full text-xs p-2.5 rounded-lg border border-[#D9D5C9] bg-[#F6F3EA] text-[#22251F] focus:outline-none focus:border-[#234B3A] resize-none h-20"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditingReflection(false)}
                    className="text-xs px-2.5 py-1 text-[#575952] hover:text-[#22251F] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn-primary text-xs py-1 px-3"
                  >
                    <Check className="w-3 h-3" /> Save Reflection
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#575952] italic">
                {entry.reflection ? `"${entry.reflection}"` : 'No reflection recorded yet. Click above to record why you made this choice.'}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const DecisionJournalModal: React.FC<DecisionJournalModalProps> = ({
  entries,
  onClose,
  onAddReflection,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#22251F]/60 backdrop-blur-sm animate-fade-in text-left">
      <div className="bg-[#FFFFFF] border border-[#D9D5C9] rounded-2xl max-w-3xl w-full max-h-[88vh] flex flex-col shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-[#D9D5C9] bg-[#F6F3EA] flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#E8F0EC] border border-[#C4D9CD] text-[10px] font-mono font-bold uppercase tracking-wider text-[#234B3A]">
              <BookOpen className="w-3 h-3" />
              PORTFOLIO // DECISION JOURNAL
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#22251F]">
              Your Entrepreneurship Decision History
            </h2>
            <p className="text-xs text-[#575952]">
              Every meaningful choice you make updates the simulation and is recorded here with its trade-offs and consequences.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#7E8078] hover:text-[#22251F] hover:bg-[#D9D5C9]/40 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3 bg-[#F6F3EA]">
          {entries.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-xl border border-dashed border-[#D9D5C9] bg-[#FFFFFF]">
              <BookOpen className="w-8 h-8 text-[#B8B3A4] mx-auto mb-3" />
              <p className="text-sm font-semibold text-[#22251F] mb-1">No Decisions Logged Yet</p>
              <p className="text-xs text-[#575952] max-w-sm mx-auto">
                As you navigate through problem discovery, feature design, pricing, and operations, your decisions will appear here automatically.
              </p>
            </div>
          ) : (
            entries.map((entry, idx) => (
              <JournalEntryCard
                key={entry.id}
                entry={entry}
                index={idx}
                onAddReflection={onAddReflection}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-[#D9D5C9] bg-[#FFFFFF] flex items-center justify-between text-xs text-[#575952]">
          <div>
            Total decisions recorded: <strong className="text-[#22251F] font-mono">{entries.length}</strong>
          </div>
          <button onClick={onClose} className="btn-primary text-xs py-1.5 px-4">
            Close Journal
          </button>
        </div>

      </div>
    </div>
  );
};
