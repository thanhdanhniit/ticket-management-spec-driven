import EscalationPolicyRow from './EscalationPolicyRow';
import type { EscalationPolicyDTO, EscalationPolicyListResponse } from '../../../types/escalationPolicy';

interface Props {
  data: EscalationPolicyListResponse | undefined;
  isLoading: boolean;
  search: string;
  onEdit: (policy: EscalationPolicyDTO) => void;
}

const SKELETON_ROWS = 3;

/**
 * Full escalation policy list.
 * - Shows skeleton card loaders while fetching.
 * - Shows empty states for zero results and zero search results.
 * - Delegates card rendering to EscalationPolicyRow (representing a card).
 */
export default function EscalationPolicyTable({ data, isLoading, search, onEdit }: Props) {
  const policies = data?.content ?? [];
  const isEmpty = !isLoading && policies.length === 0;

  return (
    <div className="flex flex-col gap-4">
      {/* Loading skeletons */}
      {isLoading && (
        <div className="flex flex-col gap-6">
          {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-4 animate-pulse shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div className="h-5 bg-slate-200 rounded w-1/3 mb-2" />
                <div className="h-6 w-6 bg-slate-200 rounded" />
              </div>
              <div className="h-4 bg-slate-200 rounded w-1/2" />
              <div className="bg-slate-50 rounded-lg p-4 flex flex-col gap-3 mt-2">
                <div className="h-4 bg-slate-200 rounded w-full" />
                <div className="h-4 bg-slate-200 rounded w-3/4" />
              </div>
              <div className="h-4 bg-slate-200 rounded w-1/4 mt-4" />
            </div>
          ))}
        </div>
      )}

      {/* Empty state — no policies at all */}
      {isEmpty && !search && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center bg-white border border-slate-200 rounded-xl shadow-sm">
          <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-3xl shadow-inner">
            🔀
          </div>
          <p className="text-base font-semibold text-slate-800">No escalation policies yet</p>
          <p className="text-sm text-slate-500 max-w-sm">
            Create your first escalation policy to connect services to on-call schedules and start routing incidents.
          </p>
        </div>
      )}

      {/* Empty state — search yielded no results */}
      {isEmpty && search && (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-center bg-white border border-slate-200 rounded-xl shadow-sm">
          <p className="text-base font-semibold text-slate-800">No escalation policies found matching criteria</p>
          <p className="text-sm text-slate-500">
            No policies matching <strong>"{search}"</strong>. Try a different search term.
          </p>
        </div>
      )}

      {/* Data rows (Rendered as Cards) */}
      {!isLoading && (
        <div className="flex flex-col gap-6">
          {policies.map((policy) => (
            <EscalationPolicyRow key={policy.id} policy={policy} onEdit={onEdit} />
          ))}
        </div>
      )}
    </div>
  );
}
