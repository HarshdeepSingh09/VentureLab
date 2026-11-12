import React from 'react';
import { 
  Users, X, UserPlus, UserMinus 
} from 'lucide-react';
import type { TeamMember } from '../../../simulation/types';

interface TeamManagementModalProps {
  team: TeamMember[];
  onToggleAssignment: (memberId: string) => void;
  onClose: () => void;
}

const MAX_ASSIGNED = 3;

export const TeamManagementModal: React.FC<TeamManagementModalProps> = ({
  team,
  onToggleAssignment,
  onClose,
}) => {
  const assignedCount = team.filter((m) => m.assigned).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl p-6 sm:p-8 text-left space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">
              <Users className="w-3.5 h-3.5" />
              SECTION 15 // TEAM AND LEADERSHIP
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Venture Staffing & Role Allocation
            </h3>
            <p className="text-xs text-slate-400">
              Founders have limited staffing capacity. Assign up to {MAX_ASSIGNED} specialists to lead critical operations.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Capacity Indicator */}
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-300">
            Active Team Allocation: <strong>{assignedCount} of {MAX_ASSIGNED} Roles Filled</strong>
          </span>
          <span className={`font-mono text-xs font-bold ${assignedCount === MAX_ASSIGNED ? 'text-amber-400' : 'text-emerald-400'}`}>
            {MAX_ASSIGNED - assignedCount} Slots Remaining
          </span>
        </div>

        {/* Team Members List */}
        <div className="space-y-3">
          {team.map((member) => (
            <div
              key={member.id}
              className={`p-4 rounded-2xl border transition-all text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                member.assigned
                  ? 'bg-slate-950 border-cyan-400/90 shadow-md ring-1 ring-cyan-400/40'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                    {member.role}
                  </span>
                  <span className="text-sm font-bold text-white">{member.name}</span>
                  <span className="text-xs text-slate-400">({member.title})</span>
                </div>

                <div className="text-xs text-slate-300">
                  <strong className="text-emerald-400">Core Strength: </strong>
                  {member.strength}
                </div>

                <div className="text-xs text-slate-400">
                  <strong className="text-amber-400">Operational Trade-off: </strong>
                  {member.limitation}
                </div>
              </div>

              <button
                onClick={() => {
                  if (!member.assigned && assignedCount >= MAX_ASSIGNED) {
                    alert(`Maximum team capacity reached (${MAX_ASSIGNED} members). Unassign another specialist first.`);
                    return;
                  }
                  onToggleAssignment(member.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  member.assigned
                    ? 'bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-300'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md'
                }`}
              >
                {member.assigned ? (
                  <>
                    <UserMinus className="w-3.5 h-3.5" />
                    <span>Unassign</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Assign Role</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-colors cursor-pointer"
          >
            Confirm Staffing
          </button>
        </div>
      </div>
    </div>
  );
};
