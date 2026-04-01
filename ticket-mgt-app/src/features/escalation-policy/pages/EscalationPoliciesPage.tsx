import { useState, useCallback, useRef } from 'react';
import { Search, AlertCircle, Filter } from 'lucide-react';
import { useEscalationPolicies } from '../../../hooks/useEscalationPolicies';
import EscalationPolicyTable from '../components/EscalationPolicyTable';
import AddEscalationPolicyModal from '../components/AddEscalationPolicyModal';
import EditEscalationPolicyModal from '../components/EditEscalationPolicyModal';
import type { EscalationPolicyDTO, EscalationPolicyListParams } from '../../../types/escalationPolicy';

const PAGE_SIZE = 20;

/**
 * Main Escalation Policies list page.
 *
 * Layout (matches escalation_policy_list_ui_spec.md):
 *   - Page header with title + "New Escalation Policy" button
 *   - Search bar (300ms debounce) + pagination controls
 *   - EscalationPolicyTable (loading skeletons, empty states, rows)
 *   - AddEscalationPolicyModal (controlled by showAdd state)
 *   - EditEscalationPolicyModal (controlled by selectedPolicy state)
 */
export default function EscalationPoliciesPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<EscalationPolicyDTO | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);

  // 300ms debounce ref
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const params: EscalationPolicyListParams = {
    page,
    size: PAGE_SIZE,
    sort: 'name,asc',
    search: debouncedSearch || undefined,
  };

  const { data, isLoading, isError } = useEscalationPolicies(params);

  // ── Search with debounce ──
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(value);
      setPage(0); // reset to first page on new search
    }, 300);
  }, []);

  // ── Pagination ──
  const totalPages = data?.totalPages ?? 0;
  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 bg-white min-h-screen">
      {/* ── Page Header ── */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Escalation Policies{' '}
            <span className="text-slate-500 font-medium">
              ({data?.totalElements ?? 0})
            </span>
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-3xl">
            Escalation policies allow you to connect services to on-call schedules, and ensure that the right people are notified at the right time. Learn more about escalation policies here.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            title="Filter policies"
            className="p-2.5 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors bg-white shrink-0 shadow-sm"
          >
            <Filter size={18} />
          </button>
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-500 w-72 md:w-80 shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
            <Search size={16} className="text-slate-400" />
            <input
              id="escalation-policy-search"
              type="text"
              placeholder="Search escalation policy by name or service"
              value={search}
              onChange={handleSearch}
              className="bg-transparent outline-none w-full text-slate-700 placeholder:text-slate-400"
            />
          </div>
          <button
            id="new-escalation-policy-btn"
            onClick={() => setShowAdd(true)}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-sm shrink-0 whitespace-nowrap"
          >
            Add Escalation Policy
          </button>
        </div>
      </div>

      {/* ── API error banner ── */}
      {isError && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          <AlertCircle size={15} className="shrink-0" />
          Failed to load escalation policies. Please refresh and try again.
        </div>
      )}

      {/* ── Pagination controls ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-3 text-sm text-slate-500 w-full mb-2">
          <span>
            Page {page + 1} of {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button
              id="pagination-prev"
              disabled={!canPrev}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-white shadow-sm"
            >
              Previous
            </button>
            <button
              id="pagination-next"
              disabled={!canNext}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-white shadow-sm"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* ── Table ── */}
      <EscalationPolicyTable
        data={data}
        isLoading={isLoading}
        search={debouncedSearch}
        onEdit={(policy) => setSelectedPolicy(policy)}
      />

      {/* ── Modals ── */}
      <AddEscalationPolicyModal
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
      />

      <EditEscalationPolicyModal
        policy={selectedPolicy}
        onClose={() => setSelectedPolicy(null)}
      />
    </div>
  );
}
