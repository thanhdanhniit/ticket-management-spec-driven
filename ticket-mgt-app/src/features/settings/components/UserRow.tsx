import { BadgeCheck, Clock, XCircle, CreditCard } from 'lucide-react';
import type { User } from '../../../types/settings';
import clsx from 'clsx';

interface Props {
  user: User;
  isCurrentUser: boolean;
}

const statusConfig = {
  ACTIVE: { label: 'Active', icon: BadgeCheck, color: 'text-green-600 bg-green-50' },
  INVITATION_PENDING: { label: 'Pending', icon: Clock, color: 'text-amber-600 bg-amber-50' },
  INACTIVE: { label: 'Inactive', icon: XCircle, color: 'text-slate-400 bg-slate-50' },
};

export default function UserRow({ user, isCurrentUser }: Props) {
  const status = statusConfig[user.status];
  const StatusIcon = status.icon;

  return (
    <div className="grid grid-cols-[2fr_2fr_1.5fr_1.5fr_auto] gap-4 items-center px-5 py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
      {/* Name */}
      <div>
        <p className="text-sm font-medium text-slate-900">
          {user.fullName}
          {isCurrentUser && (
            <span className="ml-1.5 text-xs text-slate-400 font-normal">— you</span>
          )}
        </p>
        <div className="flex items-center gap-1 mt-0.5 text-xs text-slate-400">
          <CreditCard size={11} />
          <span>workspace</span>
        </div>
      </div>

      {/* Email */}
      <p className="text-sm text-slate-600 truncate">{user.email}</p>

      {/* Phone — placeholder */}
      <div>
        <p className="text-sm text-slate-400 italic">–</p>
      </div>

      {/* Org Role */}
      <p className="text-sm text-slate-600">{user.organizationRole}</p>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <span className={clsx('flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium', status.color)}>
          <StatusIcon size={11} />
          {status.label}
        </span>
        <button className="text-xs border border-slate-200 px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
          View Profile
        </button>
      </div>
    </div>
  );
}
