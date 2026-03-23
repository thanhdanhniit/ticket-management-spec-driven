import { useState } from 'react';
import { Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuditLogs } from '../../../hooks/useAuditLogs';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import ErrorBanner from '../../../components/ui/ErrorBanner';
import EmptyState from '../../../components/ui/EmptyState';
import type { ListAuditLogsParams } from '../../../types/settings';

type Tab = 'live' | 'export';

const PAGE_SIZE_OPTIONS = [10, 20, 50];

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

export default function AuditLogsPage() {
  const [tab, setTab] = useState<Tab>('live');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [params] = useState<ListAuditLogsParams>({});

  const { data, isLoading, isError } = useAuditLogs({ ...params, page, size: pageSize });

  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">Audit Logs</h1>
        <p className="text-sm text-slate-500 mt-1">
          A chronological record of all user activities, status changes, and configuration modifications.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-200">
        {(['live', 'export'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
              tab === t
                ? 'border-primary text-primary'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {t === 'live' ? 'Live logs' : 'Export history'}
          </button>
        ))}
      </div>

      {tab === 'export' ? (
        <EmptyState message="No export history available." />
      ) : (
        <>
          {/* Filter & Export bar */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing all logs &mdash; <span className="text-slate-400 text-xs">Timezone: Asia/Ho_Chi_Minh</span>
            </p>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 border border-slate-200 text-slate-600 text-sm px-3 py-1.5 rounded-lg hover:bg-slate-50">
                <Filter size={14} /> Filter
              </button>
              <button className="flex items-center gap-1.5 bg-primary text-white text-sm px-3 py-1.5 rounded-lg hover:bg-primary-hover">
                <Download size={14} /> Export
              </button>
            </div>
          </div>

          {isError && <ErrorBanner message="Failed to load audit logs." />}

          {isLoading ? (
            <LoadingSpinner fullPage />
          ) : !data?.content?.length ? (
            <EmptyState message="No activity logged for this period." />
          ) : (
            <>
              {/* Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                <div className="grid grid-cols-[1.5fr_2fr_1.5fr_1.5fr_1fr_0.8fr] gap-3 px-5 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <span>Resource</span>
                  <span>Type of Action</span>
                  <span>Actors</span>
                  <span>Timestamp</span>
                  <span>Team</span>
                  <span>Client</span>
                </div>

                {data.content.map((log) => (
                  <div
                    key={log.id}
                    className="grid grid-cols-[1.5fr_2fr_1.5fr_1.5fr_1fr_0.8fr] gap-3 items-center px-5 py-3.5 border-b border-slate-100 last:border-0 hover:bg-slate-50 text-sm"
                  >
                    <span className="font-medium text-slate-700 capitalize">{log.actee}</span>
                    <span className="text-slate-600">{log.action}</span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-xs font-bold shrink-0">
                        {getInitials(log.actorName)}
                      </div>
                      <span className="text-slate-700 truncate">{log.actorName}</span>
                    </div>
                    <span className="text-slate-500 text-xs">
                      {new Date(log.timestamp).toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </span>
                    <span className="text-slate-500">Default Team</span>
                    <span className="text-slate-400 text-xs">web</span>
                  </div>
                ))}
              </div>

              {/* Pagination Footer */}
              <div className="flex items-center justify-end gap-4 pt-1">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span>Rows per page:</span>
                  <select
                    value={pageSize}
                    onChange={(e) => { setPageSize(Number(e.target.value)); setPage(0); }}
                    className="border border-slate-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {PAGE_SIZE_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-1 text-sm text-slate-500">
                  <span>{page * pageSize + 1}–{Math.min((page + 1) * pageSize, data.totalElements)} of {data.totalElements}</span>
                  <button
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="p-1 rounded hover:bg-slate-100 disabled:opacity-40"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={page >= totalPages - 1}
                    className="p-1 rounded hover:bg-slate-100 disabled:opacity-40"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
