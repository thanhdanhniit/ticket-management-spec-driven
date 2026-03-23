import { AlertTriangle } from 'lucide-react';

interface Props {
  message?: string;
}

export default function ErrorBanner({ message = 'Something went wrong. Please try again.' }: Props) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
      <AlertTriangle size={16} className="shrink-0" />
      <span>{message}</span>
    </div>
  );
}
