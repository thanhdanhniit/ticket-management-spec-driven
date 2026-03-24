import { useState } from 'react';
import { useTeams } from '../../../hooks/useTeams';
import ErrorBanner from '../../../components/ui/ErrorBanner';
import EmptyState from '../../../components/ui/EmptyState';
import TeamsSidebar from '../components/TeamsSidebar';
import MembersTab from '../components/MembersTab';
import RolesTab from '../components/RolesTab';
import type { Team } from '../../../types/settings';

type Tab = 'members' | 'roles';

export default function TeamsPage() {
  const [activeTeam, setActiveTeam] = useState<Team | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('members');

  const { data: teamsData, isLoading, isError } = useTeams({ size: 50 });

  return (
    <div className="flex gap-0 -mx-6 -my-6 h-full">
      {/* Teams Sidebar */}
      <TeamsSidebar
        teams={teamsData?.content ?? []}
        isLoading={isLoading}
        activeTeam={activeTeam}
        onSelectTeam={setActiveTeam}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {isError && <ErrorBanner message="Failed to load teams." />}

        {!activeTeam ? (
          <EmptyState message="Select a team from the left to manage its members and roles." />
        ) : (
          <div className="flex flex-col gap-4">
            {/* Team Header */}
            <div>
              <h1 className="text-xl font-bold text-slate-900">{activeTeam.name}</h1>
              <p className="text-sm text-slate-500 mt-0.5">{activeTeam.description}</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-slate-200">
              {(['members', 'roles'] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'members' ? (
              <MembersTab teamId={activeTeam.id} />
            ) : (
              <RolesTab teamId={activeTeam.id} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
