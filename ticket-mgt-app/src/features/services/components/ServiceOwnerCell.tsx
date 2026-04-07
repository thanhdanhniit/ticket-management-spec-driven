import { Shield } from 'lucide-react';
import type { OwnerSummary, PolicySummary } from '../types';
import { useUsers } from '../../../hooks/useUsers';
import { useEscalationPolicies } from '../../../hooks/useEscalationPolicies';

interface Props {
  owner?: OwnerSummary;
  escalationPolicy?: PolicySummary;
}

function OwnerAvatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold shrink-0">
      {initials}
    </span>
  );
}

export default function ServiceOwnerCell({ owner, escalationPolicy }: Props) {
  const { data: usersData } = useUsers({ size: 100 });
  const { data: policiesData } = useEscalationPolicies({ size: 100 });

  const ownerName = owner?.name || (owner?.id ? usersData?.content?.find((u: any) => u.id === owner.id)?.fullName : undefined);
  const policyName = escalationPolicy?.name || (escalationPolicy?.id ? policiesData?.content?.find((p: any) => p.id === escalationPolicy.id)?.name : undefined);

  return (
    <div className="flex flex-col gap-1.5">
      {ownerName ? (
        <div className="flex items-center gap-2">
          <OwnerAvatar name={ownerName} />
          <span className="text-sm text-slate-700 font-medium truncate max-w-[140px]">
            {ownerName}
          </span>
        </div>
      ) : (
        <span className="text-sm text-slate-400 italic">No owner</span>
      )}

      {policyName ? (
        <div className="flex items-center gap-2 pl-0.5">
          <Shield size={14} className="text-slate-400 shrink-0" />
          <span
            className="text-xs text-blue-600 hover:text-blue-700 cursor-pointer truncate max-w-[140px]"
            title={policyName}
          >
            {policyName}
          </span>
        </div>
      ) : (
        <span className="text-xs text-slate-400 italic pl-0.5">No policy</span>
      )}
    </div>
  );
}
