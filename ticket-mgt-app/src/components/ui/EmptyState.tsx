import { InboxIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface Props {
  /** @deprecated Use `title` instead */
  message?: string;
  icon?: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({
  message,
  icon,
  title,
  description,
  action,
}: Props) {
  const displayTitle = title ?? message ?? 'No data found.';

  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-3">
      <div className="text-slate-300">
        {icon ?? <InboxIcon size={40} strokeWidth={1.5} />}
      </div>
      <p className="text-sm font-medium text-slate-500">{displayTitle}</p>
      {description && (
        <p className="text-xs text-slate-400 text-center max-w-xs">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
