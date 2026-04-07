import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, List, Grid, AlertCircle, RefreshCw, RotateCcw } from 'lucide-react';
import { useServices } from '../hooks/useServices';
import ServiceTable from '../components/ServiceTable';
import type { ServiceResponse, GetServicesParams } from '../types';

const PAGE_SIZES = [10, 25, 50];
const DEFAULT_PAGE_SIZE = 10;

type ViewMode = 'list' | 'grid';
type ActiveTab = 'overview' | 'graph';

// ── View Toggle ───────────────────────────────────────────────────────────────
function ViewToggle({
  mode,
  onChange,
}: {
  mode: ViewMode;
  onChange: (m: ViewMode) => void;
}) {
  return (
    <div className="inline-flex rounded-md border border-slate-200 overflow-hidden shadow-sm bg-white">
      <button
        id="view-toggle-list"
        onClick={() => onChange('list')}
        title="List view"
        className={`p-2 transition-colors ${mode === 'list'
          ? 'bg-blue-600 text-white'
          : 'text-slate-400 hover:bg-slate-50 hover:text-slate-700'
          }`}
      >
        <List size={16} />
      </button>
      <button
        id="view-toggle-grid"
        onClick={() => onChange('grid')}
        title="Grid view"
        className={`p-2 transition-colors border-l border-slate-200 ${mode === 'grid'
          ? 'bg-blue-600 text-white'
          : 'text-slate-400 hover:bg-slate-50 hover:text-slate-700'
          }`}
      >
        <Grid size={16} />
      </button>
    </div>
  );
}

/**
 * ServiceListPage — Services List screen
 *
 * Matches: specs/services/services_list_ui_spec.md
 *
 * Sections:
 *   1. Notify banner (dismissible)
 *   2. Page header — title, description, Search/Filter/Add actions
 *   3. Navigation tabs — Overview | Graph
 *   4. Toolbar — showing count + view toggle
 *   5. Service data table
 *   6. Pagination — page size selector + prev/next
 */
export default function ServiceListPage() {
  const navigate = useNavigate();
  // ── UI State ──

  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // ── Pagination State ──
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  // ── Debounce ref ──
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Query params ──
  const params: GetServicesParams = {
    page,
    size: pageSize,
    sort: 'createdAt,desc',
    search: debouncedSearch || undefined,
  };

  const { data, isLoading, isError, refetch } = useServices(params);

  const services = data?.content ?? [];
  const totalElements = data?.totalElements ?? 0;
  const totalPages = data?.totalPages ?? 0;
  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  // ── Handlers ──
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(value);
      setPage(0);
    }, 300);
  }, []);

  const handleSelectAll = useCallback(
    (checked: boolean, rows: ServiceResponse[]) => {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        rows.forEach((r) => {
          if (r.id) checked ? next.add(r.id) : next.delete(r.id);
        });
        return next;
      });
    },
    []
  );

  const handleSelectRow = useCallback((id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
  }, []);

  const handleMaintenanceMode = useCallback((_service: ServiceResponse) => {
    // TODO: open maintenance mode modal
    console.log('Open maintenance mode for', _service.name);
  }, []);

  const handleUpdateTags = useCallback((_service: ServiceResponse) => {
    // TODO: open update tags modal
    console.log('Open update tags for', _service.name);
  }, []);

  const handlePageSizeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setPage(0);
  }, []);

  // ── Compute empty message for search ──
  const emptyMessage =
    debouncedSearch
      ? 'No services match your criteria'
      : "Let's align your sources";

  const emptyDescription =
    debouncedSearch
      ? 'Try clearing filters or searching for a different term.'
      : 'Add a new service to get started monitoring your infrastructure.';

  return (
    <div className="flex flex-col min-h-full bg-white">
      {/* ── 2. Page Header ── */}
      <div className="px-6 md:px-8 pt-6 pb-4 border-b border-slate-100">
        <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4">
          {/* Title + Description */}
          <div className="flex-1 max-w-3xl">
            <h1 className="text-2xl font-bold text-slate-900">Services</h1>
            <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
              Services are logical units of your product/service and are mapped to alert sources.
              Choose from the Catalog and Graph view to understand your services, health metrics and
              their dependencies in detail.{' '}
              <a href="#" className="text-blue-600 hover:underline font-medium">
                Read More
              </a>
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Search toggle & inline input */}
            {searchOpen ? (
              <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-500 w-64 shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                <Search size={15} className="text-slate-400 shrink-0" />
                <input
                  id="service-search-input"
                  type="text"
                  autoFocus
                  placeholder="Search by name or tags..."
                  value={searchInput}
                  onChange={handleSearchChange}
                  onBlur={() => {
                    if (!searchInput) setSearchOpen(false);
                  }}
                  className="bg-transparent outline-none w-full text-slate-700 placeholder:text-slate-400"
                />
                {searchInput && (
                  <button
                    onClick={() => {
                      setSearchInput('');
                      setDebouncedSearch('');
                      setPage(0);
                    }}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <RotateCcw size={13} />
                  </button>
                )}
              </div>
            ) : (
              <button
                id="service-search-btn"
                onClick={() => setSearchOpen(true)}
                title="Search services"
                className="p-2.5 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors bg-white shadow-sm"
              >
                <Search size={16} />
              </button>
            )}

            <button
              id="service-filter-btn"
              title="Filter services"
              className="p-2.5 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors bg-white shadow-sm"
            >
              <Filter size={16} />
            </button>

            <button
              id="add-new-service-btn"
              onClick={() => navigate('/services/new')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-sm shrink-0 whitespace-nowrap"
            >
              <Plus size={16} />
              Add New Service
            </button>
          </div>
        </div>

        {/* ── 3. Navigation Tabs ── */}
        <div className="flex gap-0 mt-5 -mb-px">
          {(['overview', 'graph'] as ActiveTab[]).map((tab) => (
            <button
              key={tab}
              id={`service-tab-${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-sm font-medium border-b-2 capitalize transition-colors ${activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="flex-1 px-6 md:px-8 py-5 flex flex-col gap-4">

        {/* ── API error state ── */}
        {isError && (
          <div className="flex items-center justify-between gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            <div className="flex items-center gap-2">
              <AlertCircle size={15} className="shrink-0" />
              <span>Failed to load services. Please try again.</span>
            </div>
            <button
              id="service-retry-btn"
              onClick={() => refetch()}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-red-300 rounded-md text-red-700 hover:bg-red-100 transition-colors text-xs font-medium"
            >
              <RefreshCw size={13} />
              Retry Request
            </button>
          </div>
        )}

        {/* ── 4. Toolbar ── */}
        {activeTab === 'overview' && (
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-slate-400 italic">Data updated every ~10 minutes</p>
            <div className="flex items-center gap-3">
              {!isLoading && (
                <span className="text-sm text-slate-500">
                  Showing{' '}
                  <span className="font-semibold text-slate-700">{services.length}</span> of{' '}
                  <span className="font-semibold text-slate-700">{totalElements}</span>
                </span>
              )}
              <ViewToggle mode={viewMode} onChange={setViewMode} />
            </div>
          </div>
        )}

        {/* ── 5. Table (Overview tab) ── */}
        {activeTab === 'overview' ? (
          <ServiceTable
            data={services}
            isLoading={isLoading}
            selectedIds={selectedIds}
            onSelectAll={handleSelectAll}
            onSelectRow={handleSelectRow}
            onMaintenanceMode={handleMaintenanceMode}
            onUpdateTags={handleUpdateTags}
            emptyMessage={emptyMessage}
            emptyDescription={emptyDescription}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-2">
            <p className="text-lg font-semibold text-slate-500">Graph View</p>
            <p className="text-sm">Dependency graph visualization coming soon.</p>
          </div>
        )}

        {/* ── 6. Pagination ── */}
        {!isLoading && totalElements > 0 && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
            {/* Rows per page */}
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <label htmlFor="rows-per-page" className="whitespace-nowrap">
                Show rows per page
              </label>
              <select
                id="rows-per-page"
                value={pageSize}
                onChange={handlePageSizeChange}
                className="border border-slate-200 rounded-md px-2 py-1.5 text-sm text-slate-700 bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
              >
                {PAGE_SIZES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Page controls */}
            {totalPages > 1 && (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span>
                  Page {page + 1} of {totalPages}
                </span>
                <div className="flex gap-1">
                  <button
                    id="pagination-prev"
                    disabled={!canPrev}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-white shadow-sm text-xs font-medium"
                  >
                    Previous
                  </button>
                  <button
                    id="pagination-next"
                    disabled={!canNext}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-white shadow-sm text-xs font-medium"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
