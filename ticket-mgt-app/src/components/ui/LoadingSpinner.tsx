import { Loader2 } from 'lucide-react';

interface Props {
  fullPage?: boolean;
}

export default function LoadingSpinner({ fullPage = false }: Props) {
  if (fullPage) {
    return (
      <div className="flex items-center justify-center h-full w-full min-h-[200px]">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }
  return <Loader2 className="animate-spin text-primary" size={20} />;
}
