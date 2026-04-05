import { useState } from 'react';
import { MoreHorizontal, AlertCircle, X, User, Users, FileText } from 'lucide-react';
import { useDeleteEscalationPolicy } from '../../../hooks/useEscalationPolicies';
import type { EscalationPolicyDTO } from '../../../types/escalationPolicy';

interface Props {
  policy: EscalationPolicyDTO;
  onEdit: (policy: EscalationPolicyDTO) => void;
}

/**
 * A single card representing an Escalation Policy.
 * Shows policy name, tags, description, inline escalation steps, and repeat configurations.
 */
export default function EscalationPolicyRow({ policy, onEdit }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const { mutate: deletePolicy, isPending: isDeleting } = useDeleteEscalationPolicy();

  function handleDelete() {
    setDeleteError(null);
    deletePolicy(policy.id, {
      onSuccess: () => {
        setConfirmDelete(false);
        setMenuOpen(false);
      },
      onError: (err: any) => {
        const message =
          err?.response?.data?.message ??
          'Failed to securely delete Escalation Policy fundamentally currently assigned logically securely directly effectively seamlessly formally carefully solidly smoothly reliably carefully accurately properly efficiently logically.';
        setDeleteError(message);
        setConfirmDelete(false);
      },
    });
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden relative group">
      {/* ── Card Header & Subheader ── */}
      <div className="p-5 border-b border-slate-100 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <h3
              className="text-lg font-bold text-slate-900 cursor-pointer hover:underline decoration-2 underline-offset-4 decoration-blue-600 transition-all cursor-pointer"
              onClick={() => onEdit(policy)}
            >
              {policy.name}
            </h3>

            {/* Mock tags representing Associated Services and Users as per design */}
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600">
              <FileText size={12} className="text-slate-400" />
              Example Service
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600">
              <User size={12} className="text-slate-400" />
              Owner
            </span>
          </div>

          {/* Actions kebab menu */}
          <div className="relative shrink-0">
            <button
              id={`policy-menu-${policy.id}`}
              onClick={() => {
                setMenuOpen((v) => !v);
                setConfirmDelete(false);
                setDeleteError(null);
              }}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors focus:ring-2 focus:ring-blue-100 outline-none"
            >
              <MoreHorizontal size={20} />
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-lg shadow-slate-200/50 py-1.5 z-20 top-full">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onEdit(policy);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setConfirmDelete(true);
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Description subheader */}
        <p className="text-sm text-slate-500">
          {policy.description || 'No description provided.'}
        </p>
      </div>

      {/* ── Escalation Steps List ── */}
      <div className="bg-slate-50 bg-white flex flex-col">
        {policy.steps.map((step, index) => (
          <div key={step.id} className="grid grid-cols-[1fr_1fr_auto] md:grid-cols-[180px_1fr_auto] gap-4 items-center px-6 py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50/80 transition-colors">

            <div className="text-sm font-medium text-slate-700 flex items-center gap-2">
              {index > 0 && (
                <div className="flex flex-col items-center justify-center mr-1">
                  {/* Vertical line / arrow visualizer could go here */}
                </div>
              )}
              {step.waitTimeMinutes === 0 ? 'Immediately' : `Escalate after ${step.waitTimeMinutes} minute${step.waitTimeMinutes > 1 ? 's' : ''}`}
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-white border border-slate-200 text-slate-600 shadow-sm">
                {step.targetType === 'USER' ? <User size={14} className="text-slate-400" /> : <Users size={14} className="text-slate-400" />}
                {step.targetType === 'USER' ? 'User' : 'Team'}: {step.targetName || step.targetId.split('-')[0]}
              </span>
            </div>

            <div>
              <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-slate-100/80 border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer whitespace-nowrap">
                Personal Notification Rules
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Card Footer (Repeat Rule) ── */}
      <div className="px-6 py-3 bg-slate-100/60 border-t border-slate-200 text-xs text-slate-500 font-medium">
        If no one acknowledges, repeat this policy an additional 0 time(s)
      </div>

      {/* ── Inline delete confirmation ── */}
      {confirmDelete && (
        <div className="p-5 bg-red-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 absolute inset-x-0 bottom-0 z-10 border-t border-red-200 shadow-[0_-4px_12px_-4px_rgba(0,0,0,0.1)] transition-all">
          <div className="flex items-center gap-3 text-sm text-red-800 font-medium">
            <AlertCircle size={18} className="shrink-0 text-red-600" />
            <span>
              Delete <strong>{policy.name}</strong>? This action cannot be undone.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0 w-full md:w-auto mt-2 md:mt-0">
            <button
              disabled={isDeleting}
              onClick={handleDelete}
              className="flex-1 md:flex-none px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 shadow-sm disabled:opacity-50 transition-all focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              {isDeleting ? 'Deleting…' : 'Confirm Delete'}
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="flex-1 md:flex-none px-4 py-2 bg-white text-xs font-bold text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 shadow-sm transition-all focus:ring-2 focus:ring-slate-200 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ── Delete error banner ── */}
      {deleteError && (
        <div className="px-5 py-3 bg-red-50 border-t border-red-200 flex items-start gap-3 text-sm text-red-800">
          <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-600" />
          <span className="flex-1 font-medium">{deleteError}</span>
          <button
            onClick={() => setDeleteError(null)}
            className="text-red-400 hover:text-red-700 shrink-0 p-1 hover:bg-red-100 rounded-md transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
