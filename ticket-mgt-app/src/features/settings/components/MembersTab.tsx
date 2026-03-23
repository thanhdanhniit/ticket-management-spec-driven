import { useState } from 'react';
import { MoreHorizontal, Search, Plus } from 'lucide-react';
import { useTeamMembers, useRemoveTeamMember } from '../../../hooks/useTeamMembers';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import EmptyState from '../../../components/ui/EmptyState';

interface Props {
  teamId: string;
}

export default function MembersTab({ teamId }: Props) {
  const [search, setSearch] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const { data, isLoading } = useTeamMembers(teamId, { query: search || undefined });
  const { mutate: removeMember } = useRemoveTeamMember(teamId);

  if (isLoading) return <LoadingSpinner fullPage />;

  const members = data?.content ?? [];

  return (
    <div className="flex flex-col gap-4">
      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {data?.totalElements ?? 0} member(s) in this team
        </p>
        <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2 text-sm text-slate-500 w-48">
          <Search size={14} />
          <input
            type="text"
            placeholder="Search members"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none w-full text-slate-700 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Roster */}
      {members.length === 0 ? (
        <EmptyState message="No members in this team yet." />
      ) : (
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
          {members.map((member) => (
            <div
              key={member.userId}
              className="flex items-center justify-between px-5 py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50"
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-slate-900">{member.user.fullName}</p>
                  {member.isDefaultUser && (
                    <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full font-medium">
                      DEFAULT USER
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{member.user.email}</p>
                <div className="flex gap-1 mt-1">
                  {member.teamRoles.map((roleId) => (
                    <span key={roleId} className="text-xs border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                      {roleId.slice(0, 8)}…
                    </span>
                  ))}
                </div>
              </div>

              {/* Kebab menu */}
              <div className="relative">
                <button
                  onClick={() => setOpenMenuId(openMenuId === member.userId ? null : member.userId)}
                  className="p-1.5 rounded hover:bg-slate-100 text-slate-400"
                >
                  <MoreHorizontal size={16} />
                </button>
                {openMenuId === member.userId && (
                  <div className="absolute right-0 mt-1 w-36 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-10">
                    <button className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        removeMember(member.userId);
                        setOpenMenuId(null);
                      }}
                      disabled={member.isDefaultUser}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add member button */}
      <button className="flex items-center gap-2 text-sm text-primary hover:text-blue-700 font-medium mt-1">
        <Plus size={16} />
        Add new members
      </button>
    </div>
  );
}
