import { useState, useCallback } from 'react';
import { ChevronUp, ChevronDown, Trash2 } from 'lucide-react';
import type { EscalationStepRequest } from '../../../types/escalationPolicy';

interface Props {
  step: EscalationStepRequest;
  index: number;
  total: number;
  onChange: (index: number, updated: EscalationStepRequest) => void;
  onRemove: (index: number) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  error?: Partial<Record<keyof EscalationStepRequest, string>>;
}

/**
 * A single escalation step row used inside both Add and Edit modals.
 * Handles waitTimeMinutes, targetType (USER | TEAM), and targetId.
 * Up/Down buttons reorder steps; Trash removes the step (minimum 1 enforced by parent).
 */
export default function EscalationStepRow({
  step,
  index,
  total,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  error,
}: Props) {
  const stepNumber = index + 1;

  const handleChange = useCallback(
    <K extends keyof EscalationStepRequest>(key: K, value: EscalationStepRequest[K]) => {
      onChange(index, { ...step, [key]: value });
    },
    [index, step, onChange],
  );

  return (
    <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
      {/* Step badge */}
      <div className="flex flex-col items-center gap-1 pt-1 shrink-0">
        <span className="text-xs font-bold text-slate-400 w-5 text-center">
          {stepNumber}
        </span>
        {/* Reorder buttons */}
        <button
          type="button"
          title="Move up"
          disabled={index === 0}
          onClick={() => onMoveUp(index)}
          className="p-0.5 text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronUp size={14} />
        </button>
        <button
          type="button"
          title="Move down"
          disabled={index === total - 1}
          onClick={() => onMoveDown(index)}
          className="p-0.5 text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronDown size={14} />
        </button>
      </div>

      {/* Fields */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Wait Time */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Wait (minutes)
          </label>
          <input
            type="number"
            min={0}
            value={step.waitTimeMinutes}
            onChange={(e) => handleChange('waitTimeMinutes', Number(e.target.value))}
            placeholder="0"
            className={`w-full border rounded-lg px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error?.waitTimeMinutes ? 'border-red-400' : 'border-slate-200'
            }`}
          />
          {error?.waitTimeMinutes && (
            <p className="text-xs text-red-500 mt-1">{error.waitTimeMinutes}</p>
          )}
        </div>

        {/* Target Type */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Target Type
          </label>
          <select
            value={step.targetType}
            onChange={(e) =>
              handleChange('targetType', e.target.value as 'USER' | 'TEAM')
            }
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="USER">User</option>
            <option value="TEAM">Team</option>
          </select>
        </div>

        {/* Target ID */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Target UUID
          </label>
          <input
            type="text"
            value={step.targetId}
            onChange={(e) => handleChange('targetId', e.target.value)}
            placeholder="Enter User or Team UUID"
            className={`w-full border rounded-lg px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error?.targetId ? 'border-red-400' : 'border-slate-200'
            }`}
          />
          {error?.targetId && (
            <p className="text-xs text-red-500 mt-1">{error.targetId}</p>
          )}
        </div>
      </div>

      {/* Remove button */}
      <button
        type="button"
        title={total === 1 ? 'A policy must have at least one step' : 'Remove step'}
        disabled={total === 1}
        onClick={() => onRemove(index)}
        className="mt-1 p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
