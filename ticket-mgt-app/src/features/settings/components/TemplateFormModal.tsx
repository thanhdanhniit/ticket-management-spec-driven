import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import {
  useCreatePostmortemTemplate,
  useUpdatePostmortemTemplate,
} from '../../../hooks/usePostmortemTemplates';
import type { PostmortemTemplate } from '../../../types/settings';

const schema = z.object({
  name: z.string().min(1, 'Template name is required'),
  content: z.string().min(1, 'Content is required'),
});
type FormData = z.infer<typeof schema>;

interface Props {
  template?: PostmortemTemplate;
  onClose: () => void;
}

export default function TemplateFormModal({ template, onClose }: Props) {
  const isEdit = !!template;
  const { mutate: create, isPending: creating } = useCreatePostmortemTemplate();
  const { mutate: update, isPending: updating } = useUpdatePostmortemTemplate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: template?.name ?? '', content: template?.content ?? '' },
  });

  const onSubmit = (data: FormData) => {
    if (isEdit) {
      update({ id: template!.id, payload: data }, { onSuccess: onClose });
    } else {
      create(data, { onSuccess: onClose });
    }
  };

  const isPending = creating || updating;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-900">
            {isEdit ? 'Edit Template' : 'Add New Template'}
          </h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Template Name</label>
            <input
              {...register('name')}
              placeholder="e.g. Standard Outage"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Content (Markdown)</label>
            <textarea
              {...register('content')}
              rows={8}
              placeholder="## Incident Summary&#10;..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 text-sm bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold disabled:opacity-60"
            >
              {isPending ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Template'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
