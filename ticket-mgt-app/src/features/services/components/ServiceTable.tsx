import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';
import type { ServiceResponse } from '../types';
import ServiceStatusBadge from './ServiceStatusBadge';
import ServiceOwnerCell from './ServiceOwnerCell';
import ServiceAlertSourceCell from './ServiceAlertSourceCell';
import {
  ServiceIncidentsCell,
  ServiceMttaCell,
  ServiceMttrCell,
} from './ServiceMetricsCells';
import ServiceRowActions from './ServiceRowActions';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import EmptyState from '../../../components/ui/EmptyState';
import { Server } from 'lucide-react';

interface Props {
  data?: ServiceResponse[];
  isLoading: boolean;
  selectedIds: Set<string>;
  onSelectAll: (checked: boolean, rows: ServiceResponse[]) => void;
  onSelectRow: (id: string, checked: boolean) => void;
  onMaintenanceMode?: (service: ServiceResponse) => void;
  onUpdateTags?: (service: ServiceResponse) => void;
  emptyMessage?: string;
  emptyDescription?: string;
}

export default function ServiceTable({
  data = [],
  isLoading,
  selectedIds,
  onSelectAll,
  onSelectRow,
  onMaintenanceMode,
  onUpdateTags,
  emptyMessage = "Let's align your sources",
  emptyDescription = 'Add a new service to get started monitoring your infrastructure.',
}: Props) {
  const allChecked = data.length > 0 && data.every((s) => selectedIds.has(s.id!));
  const someChecked = data.some((s) => selectedIds.has(s.id!)) && !allChecked;

  const columns: ColumnDef<ServiceResponse>[] = [
    {
      id: 'select',
      header: () => (
        <input
          type="checkbox"
          id="service-select-all"
          checked={allChecked}
          ref={(el) => {
            if (el) el.indeterminate = someChecked;
          }}
          onChange={(e) => onSelectAll(e.target.checked, data)}
          className="w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          id={`service-select-${row.original.id}`}
          checked={selectedIds.has(row.original.id!)}
          onChange={(e) => onSelectRow(row.original.id!, e.target.checked)}
          className="w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer"
        />
      ),
      size: 48,
    },
    {
      accessorKey: 'name',
      header: 'NAME',
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-slate-800 hover:text-blue-600 cursor-pointer transition-colors">
            {row.original.name ?? '—'}
          </span>
          {/* {row.original.tags && row.original.tags.length > 0 && (
            <ServiceTagBadge tags={row.original.tags} />
          )} */}
        </div>
      ),
      size: 220,
    },
    {
      id: 'alertSource',
      header: 'ALERT SOURCE',
      cell: ({ row }) => <ServiceAlertSourceCell alertSources={row.original.alertSources} />,
      size: 180,
    },
    {
      id: 'ownerPolicy',
      header: 'OWNER & ESCALATION POLICY',
      cell: ({ row }) => (
        <ServiceOwnerCell
          owner={row.original.owner}
          escalationPolicy={row.original.escalationPolicy}
        />
      ),
      size: 220,
    },
    {
      id: 'openIncidents',
      header: 'OPEN INCIDENTS (LAST 30 DAYS)',
      cell: ({ row }) => <ServiceIncidentsCell metrics={row.original.metrics} />,
      size: 200,
    },
    {
      id: 'mtta',
      header: 'MTTA (LAST 30 DAYS)',
      cell: ({ row }) => <ServiceMttaCell metrics={row.original.metrics} />,
      size: 150,
    },
    {
      id: 'mttr',
      header: 'MTTR (LAST 30 DAYS)',
      cell: ({ row }) => <ServiceMttrCell metrics={row.original.metrics} />,
      size: 150,
    },
    {
      id: 'status',
      header: 'STATUS',
      cell: ({ row }) => (
        <div className="flex items-center justify-between gap-2">
          <ServiceStatusBadge status={row.original.healthStatus} />
          <ServiceRowActions
            service={row.original}
            onMaintenanceMode={onMaintenanceMode}
            onUpdateTags={onUpdateTags}
          />
        </div>
      ),
      size: 160,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner fullPage />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <EmptyState
        icon={<Server size={44} strokeWidth={1.5} />}
        title={emptyMessage}
        description={emptyDescription}
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
      <table className="w-full text-left border-collapse min-w-[900px]">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-slate-50 border-b border-slate-200">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{ width: header.getSize() }}
                  className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            const isSelected = selectedIds.has(row.original.id!);
            return (
              <tr
                key={row.id}
                className={`border-b border-slate-100 transition-colors hover:bg-slate-50 ${isSelected ? 'bg-blue-50/40' : 'bg-white'
                  }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                    className="px-4 py-3.5 align-top"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
