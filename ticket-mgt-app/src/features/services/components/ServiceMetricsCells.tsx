import type { ServiceMetrics } from '../types';

interface Props {
  metrics?: ServiceMetrics;
}

function formatMtta(minutes?: number): string {
  if (minutes === undefined || minutes === null) return '—';
  if (minutes === 0) return '0 sec';
  if (minutes < 1) return `${Math.round(minutes * 60)} sec`;
  return `${minutes.toFixed(2)} min`;
}

function formatMttr(hours?: number): string {
  if (hours === undefined || hours === null) return '—';
  if (hours === 0) return '—';
  return `${hours.toFixed(2)} hr`;
}

export function ServiceIncidentsCell({ metrics }: Props) {
  const triggered = metrics?.openIncidentsTriggered ?? 0;
  const acknowledged = metrics?.openIncidentsAcknowledged ?? 0;

  return (
    <div className="flex flex-col gap-1 text-sm">
      <div className="flex items-center gap-2">
        <span className="w-5 text-right font-semibold text-slate-700">{triggered}</span>
        <span className="text-slate-500">Triggered</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-5 text-right font-semibold text-slate-700">{acknowledged}</span>
        <span className="text-slate-500">Acknowledged</span>
      </div>
    </div>
  );
}

export function ServiceMttaCell({ metrics }: Props) {
  return (
    <span className="text-sm font-medium text-slate-700">
      {formatMtta(metrics?.mttaMinutes)}
    </span>
  );
}

export function ServiceMttrCell({ metrics }: Props) {
  return (
    <span className="text-sm font-medium text-slate-700">
      {formatMttr(metrics?.mttrHours)}
    </span>
  );
}
