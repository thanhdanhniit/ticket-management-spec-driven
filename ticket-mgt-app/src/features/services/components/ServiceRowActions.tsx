import { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Wrench, Tag } from 'lucide-react';
import type { ServiceResponse } from '../types';

interface Props {
  service: ServiceResponse;
  onMaintenanceMode?: (service: ServiceResponse) => void;
  onUpdateTags?: (service: ServiceResponse) => void;
}

export default function ServiceRowActions({ service, onMaintenanceMode, onUpdateTags }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        id={`service-row-actions-${service.id}`}
        onClick={() => setOpen((v) => !v)}
        className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        title="Row actions"
      >
        <MoreHorizontal size={16} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 bg-white border border-slate-200 rounded-lg shadow-lg py-1 min-w-[180px]">
          <button
            id={`service-maintenance-${service.id}`}
            onClick={() => {
              setOpen(false);
              onMaintenanceMode?.(service);
            }}
            className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Wrench size={14} className="text-slate-400" />
            Maintenance
          </button>
          <button
            id={`service-update-tags-${service.id}`}
            onClick={() => {
              setOpen(false);
              onUpdateTags?.(service);
            }}
            className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Tag size={14} className="text-slate-400" />
            Update Tag(s)
          </button>
        </div>
      )}
    </div>
  );
}
