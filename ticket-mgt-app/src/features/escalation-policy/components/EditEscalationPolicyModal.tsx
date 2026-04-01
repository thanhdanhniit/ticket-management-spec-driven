import { useState, useEffect, useCallback } from 'react';
import { X, Plus, AlertCircle, Loader2 } from 'lucide-react';
import {
  useEscalationPolicy,
  useUpdateEscalationPolicy,
} from '../../../hooks/useEscalationPolicies';
import EscalationStepRow from './EscalationStepRow';
import type {
  EscalationPolicyDTO,
  EscalationPolicyMutationRequest,
  EscalationStepRequest,
} from '../../../types/escalationPolicy';

interface Props {
  policy: EscalationPolicyDTO | null;
  onClose: () => void;
}

type StepErrors = Partial<Record<keyof EscalationStepRequest, string>>;

/**
 * Centered modal overlay for editing an existing Escalation Policy.
 * - Pre-populates form from a fresh API fetch (useEscalationPolicy) once policy.id is set.
 * - Shows a loading spinner while the policy loads.
 * - Enforces minimum 1 step (Remove button disabled when only 1 step remains).
 * - Server-side errors displayed inline.
 * - Backdrop click and Escape key close the modal discarding unsaved changes.
 */
export default function EditEscalationPolicyModal({ policy, onClose }: Props) {
  const isOpen = !!policy;
  const policyId = policy?.id;

  // Fresh fetch so form always reflects latest DB state
  const { data: freshPolicy, isLoading: isFetching } = useEscalationPolicy(policyId);
  const { mutate: updatePolicy, isPending } = useUpdateEscalationPolicy();

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState<EscalationStepRequest[]>([]);

  // Validation state
  const [nameError, setNameError] = useState('');
  const [stepErrors, setStepErrors] = useState<StepErrors[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  // Populate form once fresh data arrives
  useEffect(() => {
    if (freshPolicy) {
      setName(freshPolicy.name);
      setDescription(freshPolicy.description ?? '');
      setSteps(
        freshPolicy.steps.map((s) => ({
          waitTimeMinutes: s.waitTimeMinutes,
          targetType: s.targetType,
          targetId: s.targetId,
        })),
      );
      setNameError('');
      setStepErrors([]);
      setServerError(null);
    }
  }, [freshPolicy]);

  // Escape key closes modal
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  // ── Step helpers ──

  const handleStepChange = useCallback((index: number, updated: EscalationStepRequest) => {
    setSteps((prev) => prev.map((s, i) => (i === index ? updated : s)));
    setStepErrors((prev) => prev.map((e, i) => (i === index ? {} : e)));
  }, []);

  const handleAddStep = useCallback(() => {
    setSteps((prev) => [...prev, { waitTimeMinutes: 0, targetType: 'USER', targetId: '' }]);
    setStepErrors((prev) => [...prev, {}]);
  }, []);

  const handleRemoveStep = useCallback((index: number) => {
    setSteps((prev) => prev.filter((_, i) => i !== index));
    setStepErrors((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleMoveUp = useCallback((index: number) => {
    if (index === 0) return;
    setSteps((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  }, []);

  const handleMoveDown = useCallback((index: number) => {
    setSteps((prev) => {
      if (index >= prev.length - 1) return prev;
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  }, []);

  // ── Validation ──

  function validate(): boolean {
    let valid = true;

    if (!name.trim()) {
      setNameError('Policy name is required.');
      valid = false;
    } else {
      setNameError('');
    }

    const newStepErrors: StepErrors[] = steps.map((step) => {
      const errs: StepErrors = {};
      if (!step.targetId.trim()) {
        errs.targetId = 'Target UUID is required.';
        valid = false;
      }
      if (step.waitTimeMinutes < 0) {
        errs.waitTimeMinutes = 'Wait time cannot be negative.';
        valid = false;
      }
      return errs;
    });
    setStepErrors(newStepErrors);

    return valid;
  }

  // ── Submit ──

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    if (!policyId || !validate()) return;

    const payload: EscalationPolicyMutationRequest = {
      name: name.trim(),
      description: description.trim() || undefined,
      steps,
    };

    updatePolicy(
      { id: policyId, payload },
      {
        onSuccess: () => handleClose(),
        onError: (err: any) => {
          setServerError(
            err?.response?.data?.message ?? 'Failed to update escalation policy. Please try again.',
          );
        },
      },
    );
  }

  function handleClose() {
    setServerError(null);
    onClose();
  }

  if (!isOpen) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      {/* Dialog */}
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 shrink-0">
          <h2 className="text-base font-bold text-slate-900">Edit Escalation Policy</h2>
          <button
            id="edit-policy-modal-close"
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Loading state while fetching policy */}
        {isFetching ? (
          <div className="flex-1 flex items-center justify-center py-16">
            <Loader2 size={28} className="animate-spin text-blue-500" />
          </div>
        ) : (
          /* Scrollable body */
          <form
            id="edit-escalation-policy-form"
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5"
          >
            {/* Server error */}
            {serverError && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                <AlertCircle size={15} className="mt-0.5 shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Name */}
            <div>
              <label
                htmlFor="edit-policy-name"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="edit-policy-name"
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setNameError(''); }}
                placeholder="e.g. Standard On-Call Escalation"
                className={`w-full border rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  nameError ? 'border-red-400' : 'border-slate-200'
                }`}
              />
              {nameError && <p className="text-xs text-red-500 mt-1">{nameError}</p>}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="edit-policy-description"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Description{' '}
                <span className="text-xs text-slate-400 font-normal">(optional)</span>
              </label>
              <textarea
                id="edit-policy-description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe when and how this policy escalates incidents"
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Minimum step constraint hint */}
            {steps.length === 1 && (
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-lg px-4 py-3">
                <AlertCircle size={14} className="shrink-0 text-amber-500" />
                A policy must always have at least one escalation step.
              </div>
            )}

            {/* Steps */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-700">
                  Escalation Steps
                  <span className="ml-2 text-xs font-normal text-slate-400">
                    (min. 1 required)
                  </span>
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                {steps.map((step, index) => (
                  <EscalationStepRow
                    key={index}
                    step={step}
                    index={index}
                    total={steps.length}
                    onChange={handleStepChange}
                    onRemove={handleRemoveStep}
                    onMoveUp={handleMoveUp}
                    onMoveDown={handleMoveDown}
                    error={stepErrors[index]}
                  />
                ))}
              </div>

              <button
                type="button"
                id="edit-add-escalation-step-btn"
                onClick={handleAddStep}
                className="mt-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                <Plus size={15} />
                Add Escalation Step
              </button>
            </div>
          </form>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl shrink-0">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="edit-escalation-policy-form"
            disabled={isPending || isFetching}
            className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isPending ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
