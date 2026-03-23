import { useState, useCallback } from 'react';
import { Search, UserPlus } from 'lucide-react';
import { useUsers } from '../../../hooks/useUsers';
import { useAuthStore } from '../../../store/authStore';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import ErrorBanner from '../../../components/ui/ErrorBanner';
import EmptyState from '../../../components/ui/EmptyState';
import UserRow from '../components/UserRow';
import AddUsersModal from '../components/AddUsersModal';
import type { ListUsersParams } from '../../../types/settings';

const STATUS_OPTIONS = [
  { label: 'All', value: '' },
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Pending', value: 'INVITATION_PENDING' },
  { label: 'Inactive', value: 'INACTIVE' },
];

export default function UsersPage() {
  const { user: currentUser } = useAuthStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [params, setParams] = useState<ListUsersParams>({ page: 0, size: 20 });

  const { data, isLoading, isError } = useUsers(params);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setParams((p) => ({ ...p, query: e.target.value || undefined, page: 0 }));
  }, []);

  const handleStatusFilter = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value as ListUsersParams['status'];
    setParams((p) => ({ ...p, status: v || undefined, page: 0 }));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Users{' '}
            <span className="text-slate-400 font-normal">
              ({data?.totalElements ?? 0})
            </span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage organizational users, roles, and access.{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Learn more about users here.
            </a>
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-2">
          <select
            onChange={handleStatusFilter}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2 text-sm text-slate-500 w-48">
            <Search size={14} />
            <input
              type="text"
              placeholder="Search users"
              onChange={handleSearch}
              className="bg-transparent outline-none w-full text-slate-700 placeholder:text-slate-400"
            />
            <kbd className="text-xs bg-white border border-slate-200 rounded px-1">/</kbd>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <UserPlus size={14} />
            Add Users
          </button>
        </div>
      </div>

      {/* Content */}
      {isError && <ErrorBanner message="Failed to load users." />}

      {isLoading ? (
        <LoadingSpinner fullPage />
      ) : !data?.content?.length ? (
        <EmptyState message="No users found." />
      ) : (
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
          {/* Table Header */}
          <div className="grid grid-cols-[2fr_2fr_1.5fr_1.5fr_auto] gap-4 px-5 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Name</span>
            <span>Email</span>
            <span>Phone</span>
            <span>Organization Role</span>
            <span></span>
          </div>
          {data.content.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              isCurrentUser={user.id === currentUser?.id}
            />
          ))}
        </div>
      )}

      {showAddModal && (
        <AddUsersModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}
