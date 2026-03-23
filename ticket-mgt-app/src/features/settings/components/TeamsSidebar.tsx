import { Plus, ChevronLeft } from 'lucide-react';
import clsx from 'clsx';
import type { Team } from '../../../types/settings';

interface Props {
  teams: Team[];
  isLoading: boolean;
  activeTeam: Team | null;
  onSelectTeam: (t: Team) => void;
}

export default function TeamsSidebar({ teams, isLoading, activeTeam, onSelectTeam }: Props) {
  return (
    <div className="w-52 shrink-0 border-r border-slate-200 bg-white flex flex-col">
      <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <ChevronLeft size={16} />
          Teams
        </div>
        <button className="text-primary hover:text-blue-700"><Plus size={16} /></button>
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        {isLoading ? (
          <div className="px-4 py-2 text-xs text-slate-400">Loading...</div>
        ) : (
          teams.map((team) => (
            <button
              key={team.id}
              onClick={() => onSelectTeam(team)}
              className={clsx(
                'w-full text-left px-4 py-2.5 text-sm transition-colors',
                activeTeam?.id === team.id
                  ? 'bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-600'
                  : 'text-slate-600 hover:bg-slate-50'
              )}
            >
              {team.name}
            </button>
          ))
        )}
      </nav>
    </div>
  );
}
