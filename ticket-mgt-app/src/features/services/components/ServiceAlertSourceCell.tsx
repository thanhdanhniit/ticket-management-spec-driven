import { Zap } from 'lucide-react';

interface Props {
  alertSources?: string[];
}

export default function ServiceAlertSourceCell({ alertSources }: Props) {
  if (!alertSources || alertSources.length === 0) {
    return <span className="text-sm text-slate-400 italic">—</span>;
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {alertSources.map((source, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200"
        >
          <Zap size={10} className="shrink-0" />
          {source}
        </span>
      ))}
    </div>
  );
}
