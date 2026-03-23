import { InboxIcon } from 'lucide-react';

interface Props {
  message?: string;
}

export default function EmptyState({ message = 'No data found.' }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-3">
      <InboxIcon size={40} strokeWidth={1.5} />
      <p className="text-sm">{message}</p>
    </div>
  );
}
