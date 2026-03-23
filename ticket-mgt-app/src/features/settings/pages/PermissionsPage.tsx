import { useState, useMemo, useCallback } from 'react';
import { Search, Mail, CreditCard, User, Loader2 } from 'lucide-react';
import { useOrganizationRoles, useUpdateOrganizationRole } from '../../../hooks/useOrganizationRoles';
import { useUsers } from '../../../hooks/useUsers';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import ErrorBanner from '../../../components/ui/ErrorBanner';
import EmptyState from '../../../components/ui/EmptyState';
import type { OrganizationRole, EntityPermissionMatrix } from '../../../types/settings';

const ENTITY_COLUMNS = ['users', 'teams', 'postmortem_templates', 'audit_logs'];
const ENTITY_LABELS: Record<string, string> = {
  users: 'Users',
  teams: 'Teams',
  postmortem_templates: 'Postmortem Templates',
  audit_logs: 'Audit Logs',
};

export default function PermissionsPage() {
  const [search, setSearch] = useState('');
  // Track which (roleId + entity) is currently saving so we can show a spinner per-cell
  const [savingKey, setSavingKey] = useState<string | null>(null);

  const { data: roles, isLoading: rolesLoading, isError: rolesError } = useOrganizationRoles();
  const { data: users, isLoading: usersLoading } = useUsers({ size: 100 });
  const { mutate: updateRole } = useUpdateOrganizationRole();

  const isLoading = rolesLoading || usersLoading;

  const filteredUsers = useMemo(() => {
    if (!users?.content) return [];
    if (!search) return users.content;
    const q = search.toLowerCase();
    return users.content.filter(
      (u) => u.fullName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [users?.content, search]);

  // Map org-role name → OrganizationRole object
  const roleMap = useMemo(() => {
    const map: Record<string, OrganizationRole> = {};
    roles?.forEach((r) => { map[r.name] = r; });
    return map;
  }, [roles]);

  /**
   * Called when an entity checkbox is toggled for a specific role.
   * Per the UI spec, this is auto-save (no Submit button).
   * Toggling grants or revokes ALL CRUD capabilities for that entity on the role.
   */
  const handleToggle = useCallback(
    (role: OrganizationRole, entity: string, currentlyGranted: boolean) => {
      const key = `${role.id}:${entity}`;
      setSavingKey(key);

      // Build the new full permission matrix with the toggled entity
      const newPermissions: EntityPermissionMatrix = {
        ...role.permissions,
        [entity]: {
          create: !currentlyGranted,
          read: !currentlyGranted,
          update: !currentlyGranted,
          delete: !currentlyGranted,
        },
      };

      updateRole(
        { id: role.id, payload: { permissions: newPermissions } },
        {
          onSettled: () => setSavingKey(null),
        }
      );
    },
    [updateRole]
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Organization Level Permissions</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage feature-level access for all users.{' '}
            <a href="#" className="text-blue-600 hover:underline">Learn more about permissions here.</a>
          </p>
        </div>
        {/* Search */}
        <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2 text-sm text-slate-500 w-56">
          <Search size={14} />
          <input
            type="text"
            placeholder="Search users"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none w-full text-slate-700 placeholder:text-slate-400"
          />
          <kbd className="text-xs bg-white border border-slate-200 rounded px-1">/</kbd>
        </div>
      </div>

      {rolesError && <ErrorBanner message="Failed to load permissions." />}

      {isLoading ? (
        <LoadingSpinner fullPage />
      ) : filteredUsers.length === 0 ? (
        <EmptyState message="No users match your search." />
      ) : (
        <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-64">
                  Name
                </th>
                {ENTITY_COLUMNS.map((col) => (
                  <th key={col} className="text-center px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {ENTITY_LABELS[col]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const role = roleMap[user.organizationRole];
                const isImmutable = role?.isImmutable ?? false;

                return (
                  <tr key={user.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                    {/* Name cell */}
                    <td className="px-5 py-4 align-top">
                      <p className="font-semibold text-slate-900">{user.fullName}</p>
                      <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                        <Mail size={11} /><span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                        <CreditCard size={11} /><span>workspace</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                        <User size={11} />
                        <span>{user.organizationRole}</span>
                        {isImmutable && (
                          <span className="ml-1 text-xs bg-slate-100 text-slate-400 border border-slate-200 px-1.5 rounded-full">
                            system
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Permission checkbox cells — one per entity */}
                    {ENTITY_COLUMNS.map((col) => {
                      const perms = role?.permissions?.[col];
                      const allGranted = !!(perms?.create && perms?.read && perms?.update && perms?.delete);
                      const key = `${role?.id}:${col}`;
                      const isSaving = savingKey === key;

                      return (
                        <td key={col} className="px-3 py-4 text-center align-middle">
                          {isSaving ? (
                            // Show spinner in the cell while the API call is in-flight
                            <Loader2 size={16} className="animate-spin text-primary mx-auto" />
                          ) : (
                            <input
                              type="checkbox"
                              checked={allGranted}
                              disabled={isImmutable || !role}
                              onChange={() => {
                                if (role && !isImmutable) {
                                  handleToggle(role, col, allGranted);
                                }
                              }}
                              className="w-4 h-4 accent-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                              title={
                                isImmutable
                                  ? 'This system role cannot be modified'
                                  : !role
                                    ? 'No role assigned'
                                    : `Toggle ${ENTITY_LABELS[col]} access`
                              }
                            />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
