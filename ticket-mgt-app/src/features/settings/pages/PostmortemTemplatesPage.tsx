import { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { usePostmortemTemplates, useDeletePostmortemTemplate } from '../../../hooks/usePostmortemTemplates';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import ErrorBanner from '../../../components/ui/ErrorBanner';
import EmptyState from '../../../components/ui/EmptyState';
import TemplateFormModal from '../components/TemplateFormModal';
import type { PostmortemTemplate } from '../../../types/settings';

export default function PostmortemTemplatesPage() {
  const [editTarget, setEditTarget] = useState<PostmortemTemplate | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const { data: templates, isLoading, isError } = usePostmortemTemplates();
  const { mutate: deleteTemplate } = useDeletePostmortemTemplate();

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Postmortem Templates{' '}
            <span className="text-slate-400 font-normal">({templates?.length ?? 0})</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage structured templates used during incident postmortem reviews.
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 border border-slate-300 text-slate-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <Plus size={15} />
          Add New Template
        </button>
      </div>

      {isError && <ErrorBanner message="Failed to load postmortem templates." />}

      {isLoading ? (
        <LoadingSpinner fullPage />
      ) : !templates?.length ? (
        <EmptyState message="No templates yet. Create your first postmortem template." />
      ) : (
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
          {templates.map((tpl, idx) => (
            <div
              key={tpl.id}
              className="flex items-center justify-between px-5 py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <p className="text-sm font-medium text-slate-900">{tpl.name}</p>
                {idx === 0 && (
                  <span className="text-xs text-slate-400 italic">Default template</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditTarget(tpl)}
                  className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                  title="Edit"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => deleteTemplate(tpl.id)}
                  className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showCreate && (
        <TemplateFormModal onClose={() => setShowCreate(false)} />
      )}

      {/* Edit Modal */}
      {editTarget && (
        <TemplateFormModal template={editTarget} onClose={() => setEditTarget(null)} />
      )}
    </div>
  );
}
