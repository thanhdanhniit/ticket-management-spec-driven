import { useState } from 'react';
import { MoreHorizontal, Plus, Lock, Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTeamRoles, useCreateTeamRole, useDeleteTeamRole } from '../../../hooks/useTeamRoles';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import EmptyState from '../../../components/ui/EmptyState';
import type { EntityPermissionMatrix } from '../../../types/settings';
import clsx from 'clsx';

const ENTITIES = ['escalation_policies', 'postmortems', 'runbooks', 'schedules', 'services', 'users', 'teams'];
const ENTITY_LABELS: Record<string, string> = {
  escalation_policies: 'Escalation Policies',
  postmortems: 'Postmortems',
  runbooks: 'Runbooks',
  schedules: 'Schedules',
  services: 'Services',
  users: 'Users',
  teams: 'Teams',
};
const CRUD = ['create', 'read', 'update', 'delete'] as const;

const schema = z.object({
  name: z.string().min(1, 'Role name is required'),
});
type FormData = z.infer<typeof schema>;

interface Props { teamId: string }

export default function RolesTab({ teamId }: Props) {
  const [search, setSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [permissions, setPermissions] = useState<EntityPermissionMatrix>({});
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const { data: roles, isLoading } = useTeamRoles(teamId);
  const { mutate: createRole, isPending } = useCreateTeamRole(teamId);
  const { mutate: deleteRole } = useDeleteTeamRole(teamId);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const togglePerm = (entity: string, cap: typeof CRUD[number]) => {
    setPermissions((prev) => ({
      ...prev,
      [entity]: { ...{ create: false, read: false, update: false, delete: false }, ...prev[entity], [cap]: !prev[entity]?.[cap] },
    }));
  };

  const onSubmit = (data: FormData) => {
    createRole({ name: data.name, permissions }, {
      onSuccess: () => {
        setShowAddForm(false);
        reset();
        setPermissions({});
      },
    });
  };

  const filtered = (roles ?? []).filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <LoadingSpinner fullPage />;

  return (
    <div className="flex flex-col gap-4">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <p className="text-sm italic text-slate-500">{roles?.length ?? 0} Roles in this team</p>
        <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2 text-sm text-slate-500 w-48">
          <Search size={14} />
          <input
            type="text"
            placeholder="Search roles"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none w-full text-slate-700 placeholder:text-slate-400"
          />
        </div>
      </div>

      {filtered.length === 0 && !showAddForm && (
        <EmptyState message="No roles found." />
      )}

      {/* Role Cards */}
      <div className="space-y-3">
        {filtered.map((role) => (
          <div
            key={role.id}
            className={clsx(
              'border rounded-xl p-4',
              role.isImmutable ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-200'
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-slate-900">{role.name}</p>
                {role.isImmutable && <Lock size={13} className="text-slate-400" />}
              </div>
              {!role.isImmutable && (
                <div className="relative">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === role.id ? null : role.id)}
                    className="p-1 rounded hover:bg-slate-100 text-slate-400"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                  {openMenuId === role.id && (
                    <div className="absolute right-0 mt-1 w-32 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-10">
                      <button className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Edit</button>
                      <button
                        onClick={() => { deleteRole(role.id); setOpenMenuId(null); }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Read-only permission pills */}
            <div className="space-y-1.5">
              {Object.entries(role.permissions ?? {}).map(([entity, perms]) => (
                <div key={entity} className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 w-40">{ENTITY_LABELS[entity] ?? entity}</span>
                  <div className="flex gap-1">
                    {CRUD.map((cap) => (
                      perms[cap] && (
                        <span key={cap} className="text-xs border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full capitalize">
                          {cap}
                        </span>
                      )
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Inline Add Form */}
        {showAddForm && (
          <form onSubmit={handleSubmit(onSubmit)} className="border-2 border-primary rounded-xl p-5 bg-white">
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Role Name</label>
              <input
                {...register('name')}
                placeholder="e.g. Responder"
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Permission matrix */}
            <div className="border border-slate-200 rounded-lg overflow-hidden mb-4">
              <div className="grid grid-cols-5 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-500 uppercase">
                <span>Entity</span>
                {CRUD.map((c) => <span key={c} className="text-center capitalize">{c}</span>)}
              </div>
              {ENTITIES.map((entity) => (
                <div key={entity} className="grid grid-cols-5 px-4 py-2.5 items-center border-t border-slate-100">
                  <span className="text-sm text-slate-700">{ENTITY_LABELS[entity]}</span>
                  {CRUD.map((cap) => (
                    <div key={cap} className="flex justify-center">
                      <input
                        type="checkbox"
                        checked={!!permissions[entity]?.[cap]}
                        onChange={() => togglePerm(entity, cap)}
                        className="w-4 h-4 accent-primary cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isPending}
                className="px-4 py-2 bg-primary text-white text-sm rounded-lg font-semibold hover:bg-primary-hover disabled:opacity-60"
              >
                {isPending ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                onClick={() => { setShowAddForm(false); reset(); setPermissions({}); }}
                className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Add role button */}
      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 text-sm text-primary font-medium hover:text-blue-700"
        >
          <Plus size={16} /> Add new team role
        </button>
      )}
    </div>
  );
}
