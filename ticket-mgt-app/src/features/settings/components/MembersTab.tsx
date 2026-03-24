import { useState } from 'react';
import {
  MoreHorizontal, Search, Plus, AlertCircle, X, Trash2, ChevronDown,
} from 'lucide-react';
import {
  useTeamMembers,
  useRemoveTeamMember,
  useAddTeamMembers,
  useUpdateTeamMemberRoles,
} from '../../../hooks/useTeamMembers';
import { useTeamRoles } from '../../../hooks/useTeamRoles';
import { useUsers } from '../../../hooks/useUsers';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import EmptyState from '../../../components/ui/EmptyState';
import type { TeamMember } from '../../../types/settings';

interface Props {
  teamId: string;
}

export default function MembersTab({ teamId }: Props) {
  const [search, setSearch] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [removeError, setRemoveError] = useState<string | null>(null);

  // Inline form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);

  // Add-form state
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [addRoleIds, setAddRoleIds] = useState<string[]>([]);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Edit-form state
  const [editRoleIds, setEditRoleIds] = useState<string[]>([]);

  // Data
  const { data, isLoading } = useTeamMembers(teamId, { query: search || undefined });
  const { data: rolesData } = useTeamRoles(teamId);
  const { data: usersData } = useUsers({ query: userSearchQuery || undefined, status: 'ACTIVE' });

  const { mutate: removeMember, isPending: isRemoving } = useRemoveTeamMember(teamId);
  const { mutate: addMembers, isPending: isAdding } = useAddTeamMembers(teamId);
  const { mutate: updateRoles, isPending: isUpdating } = useUpdateTeamMemberRoles(teamId);

  if (isLoading) return <LoadingSpinner fullPage />;

  const members = data?.content ?? [];
  const teamRoles = rolesData ?? [];

  // Users not already in the team
  const existingUserIds = new Set(members.map((m) => m.userId));
  const availableUsers = (usersData?.content ?? []).filter(
    (u) => !existingUserIds.has(u.id),
  );

  /* ─── Handlers ─── */

  function openEditForm(member: TeamMember) {
    setEditingMemberId(member.userId);
    setEditRoleIds([...member.teamRoles]);
    setOpenMenuId(null);
  }

  function closeEditForm() {
    setEditingMemberId(null);
    setEditRoleIds([]);
  }

  function handleSaveEdit(member: TeamMember) {
    updateRoles(
      { userId: member.userId, payload: { teamRoleIds: editRoleIds } },
      { onSuccess: () => closeEditForm() },
    );
  }

  function openAddForm() {
    setShowAddForm(true);
    setSelectedUserIds([]);
    setAddRoleIds([]);
    setUserSearchQuery('');
  }

  function closeAddForm() {
    setShowAddForm(false);
    setSelectedUserIds([]);
    setAddRoleIds([]);
    setUserSearchQuery('');
  }

  function handleAddMembers() {
    if (selectedUserIds.length === 0) return;
    addMembers(
      { userIds: selectedUserIds, teamRoleIds: addRoleIds },
      { onSuccess: () => closeAddForm() },
    );
  }

  function toggleUserId(id: string) {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function toggleRoleId(id: string, bag: string[], setBag: (v: string[]) => void) {
    setBag(bag.includes(id) ? bag.filter((x) => x !== id) : [...bag, id]);
  }

  /* ─── Render ─── */

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
            onChange={(e) => { setSearch(e.target.value); setRemoveError(null); }}
            className="bg-transparent outline-none w-full text-slate-700 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Inline error banner */}
      {removeError && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span className="flex-1">{removeError}</span>
          <button onClick={() => setRemoveError(null)} className="text-red-400 hover:text-red-600 shrink-0">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Roster */}
      {members.length === 0 && !showAddForm ? (
        <EmptyState message="No members in this team yet." />
      ) : (
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
          {members.map((member) =>
            editingMemberId === member.userId ? (
              /* ── EDIT ROW ── */
              <div
                key={member.userId}
                className="border-b border-slate-100 last:border-0 bg-slate-50 px-5 py-4"
              >
                <div className="flex items-start gap-6">
                  {/* Left: identity (locked) */}
                  <div className="min-w-[160px]">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-slate-900">{member.user.fullName}</p>
                      {member.isDefaultUser && (
                        <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full font-medium">
                          DEFAULT USER
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{member.user.email}</p>
                  </div>

                  {/* Right: role checkboxes */}
                  <div className="flex-1">
                    <p className="text-xs font-medium text-slate-500 mb-2">Team Roles</p>
                    {teamRoles.length === 0 ? (
                      <p className="text-xs text-slate-400">No team roles defined.</p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {teamRoles.map((role) => {
                          const checked = editRoleIds.includes(role.id);
                          return (
                            <label
                              key={role.id}
                              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border cursor-pointer transition-colors ${checked
                                ? 'bg-blue-50 border-blue-300 text-blue-700'
                                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                                }`}
                            >
                              <input
                                type="checkbox"
                                className="accent-blue-600"
                                checked={checked}
                                onChange={() => toggleRoleId(role.id, editRoleIds, setEditRoleIds)}
                              />
                              {role.name}
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Far right: trash */}
                  <button
                    title="Remove member"
                    disabled={isRemoving}
                    onClick={() => {
                      setRemoveError(null);
                      removeMember(member.userId, {
                        onSuccess: () => closeEditForm(),
                        onError: (err: any) =>
                          setRemoveError(
                            err?.response?.data?.message ?? 'Failed to remove team member.',
                          ),
                      });
                    }}
                    className="p-1.5 rounded text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Default-user systemic warning */}
                {member.isDefaultUser && (
                  <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-lg px-3 py-2.5">
                    <AlertCircle size={14} className="mt-0.5 shrink-0 text-amber-500" />
                    <span>
                      <strong>Systemic Warning:</strong> This is the team's Default User. Removing
                      them requires re-assigning ownership to prevent a routing void.
                    </span>
                  </div>
                )}

                {/* Edit actions */}
                <div className="flex items-center gap-2 mt-4">
                  <button
                    disabled={isUpdating}
                    onClick={() => handleSaveEdit(member)}
                    className="px-4 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {isUpdating ? 'Saving…' : 'Save'}
                  </button>
                  <button
                    onClick={closeEditForm}
                    className="px-4 py-1.5 text-xs text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* ── READ ROW ── */
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
                    {member.teamRoles.map((roleId) => {
                      const roleName = teamRoles.find((r) => r.id === roleId)?.name ?? roleId.slice(0, 8);
                      return (
                        <span key={roleId} className="text-xs border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                          {roleName}
                        </span>
                      );
                    })}
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
                    <div className="right-0 mt-1 w-36 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-10">
                      <button
                        onClick={() => openEditForm(member)}
                        className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setRemoveError(null);
                          removeMember(member.userId, {
                            onError: (err: any) =>
                              setRemoveError(
                                err?.response?.data?.message ?? 'Failed to remove team member.',
                              ),
                          });
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
            ),
          )}

          {/* ── ADD MEMBER INLINE FORM (inside the roster card) ── */}
          {showAddForm && (
            <div className="border-t border-slate-100 bg-slate-50 px-5 py-5">
              <div className="flex items-start gap-6">
                {/* Left: user multi-select */}
                <div className="flex-1 min-w-0">
                  <label className="text-xs font-medium text-slate-500 mb-1.5 block">
                    Name
                  </label>
                  {/* Selected user pills */}
                  {selectedUserIds.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {selectedUserIds.map((uid) => {
                        const u = availableUsers.find((x) => x.id === uid);
                        return (
                          <span key={uid} className="flex items-center gap-1 text-xs bg-blue-50 border border-blue-200 text-blue-700 px-2 py-1 rounded-full">
                            {u?.fullName ?? uid.slice(0, 8)}
                            <button onClick={() => toggleUserId(uid)} className="ml-0.5 hover:text-blue-900">
                              <X size={10} />
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  )}
                  {/* Dropdown trigger */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowUserDropdown((v) => !v)}
                      className="flex items-center justify-between w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white hover:border-slate-300 focus:outline-none"
                    >
                      <span className="text-slate-400">Select users…</span>
                      <ChevronDown size={14} className="text-slate-400" />
                    </button>
                    {showUserDropdown && (
                      <div className="z-20 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg">
                        <div className="p-2 border-b border-slate-100">
                          <input
                            autoFocus
                            type="text"
                            placeholder="Search users…"
                            value={userSearchQuery}
                            onChange={(e) => setUserSearchQuery(e.target.value)}
                            className="w-full text-xs border border-slate-200 rounded-md px-2 py-1.5 outline-none"
                          />
                        </div>
                        <div className="max-h-44 overflow-y-auto">
                          {availableUsers.length === 0 ? (
                            <p className="px-4 py-3 text-xs text-slate-400">No users found.</p>
                          ) : (
                            availableUsers.map((u) => (
                              <label
                                key={u.id}
                                className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  className="accent-blue-600"
                                  checked={selectedUserIds.includes(u.id)}
                                  onChange={() => toggleUserId(u.id)}
                                />
                                <div>
                                  <p className="text-xs font-medium text-slate-800">{u.fullName}</p>
                                  <p className="text-xs text-slate-400">{u.email}</p>
                                </div>
                              </label>
                            ))
                          )}
                        </div>
                        <div className="p-2 border-t border-slate-100">
                          <button
                            onClick={() => setShowUserDropdown(false)}
                            className="w-full text-xs text-slate-500 hover:text-slate-700 py-1"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: team roles checkboxes */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-500 mb-1.5">Team Roles</p>
                  {teamRoles.length === 0 ? (
                    <p className="text-xs text-slate-400">No team roles defined.</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {teamRoles.map((role) => {
                        const checked = addRoleIds.includes(role.id);
                        return (
                          <label
                            key={role.id}
                            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border cursor-pointer transition-colors ${checked
                              ? 'bg-blue-50 border-blue-300 text-blue-700'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                              }`}
                          >
                            <input
                              type="checkbox"
                              className="accent-blue-600"
                              checked={checked}
                              onChange={() => toggleRoleId(role.id, addRoleIds, setAddRoleIds)}
                            />
                            {role.name}
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Add-form actions */}
              <div className="flex items-center gap-2 mt-5">
                <button
                  disabled={selectedUserIds.length === 0 || isAdding}
                  onClick={handleAddMembers}
                  className="px-4 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {isAdding
                    ? 'Adding…'
                    : `Add ${selectedUserIds.length > 0 ? selectedUserIds.length : ''} member${selectedUserIds.length !== 1 ? 's' : ''}`}
                </button>
                <button
                  onClick={closeAddForm}
                  className="px-4 py-1.5 text-xs text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add member button */}
      {!showAddForm && (
        <button
          onClick={openAddForm}
          className="flex items-center gap-2 text-sm text-primary hover:text-blue-700 font-medium mt-1"
        >
          <Plus size={16} />
          Add new members
        </button>
      )}
    </div>
  );
}
