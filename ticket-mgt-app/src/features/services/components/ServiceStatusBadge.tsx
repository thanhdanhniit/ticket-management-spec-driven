import type { HealthStatus } from '../types';

interface Props {
  status?: HealthStatus;
}

const statusConfig: Record<HealthStatus, { label: string; dotClass: string; textClass: string }> = {
  HEALTHY: {
    label: 'Healthy',
    dotClass: 'bg-green-500',
    textClass: 'text-green-700',
  },
  DEGRADED: {
    label: 'Degraded',
    dotClass: 'bg-yellow-500',
    textClass: 'text-yellow-700',
  },
  CRITICAL: {
    label: 'Critical',
    dotClass: 'bg-red-500',
    textClass: 'text-red-700',
  },
  MAINTENANCE: {
    label: 'Maintenance',
    dotClass: 'bg-blue-500',
    textClass: 'text-blue-700',
  },
};

export default function ServiceStatusBadge({ status }: Props) {
  if (!status) return <span className="text-slate-400 text-sm">—</span>;

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${config.textClass}`}>
      <span className={`w-2 h-2 rounded-full ${config.dotClass}`} />
      {config.label}
    </span>
  );
}
