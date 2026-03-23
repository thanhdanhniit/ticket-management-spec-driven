import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Trash2, X, Plus } from 'lucide-react';
import { useAddUsers } from '../../../hooks/useUsers';

const rowSchema = z.object({
  email: z.string().email('Valid email required'),
  role: z.string().min(1, 'Role required'),
});

const schema = z.object({
  users: z.array(rowSchema).min(1),
});

type FormData = z.infer<typeof schema>;

const ROLE_OPTIONS = ['Engineer', 'Product Manager', 'HR Business Partner', 'Contractor'];

interface Props {
  onClose: () => void;
}

export default function AddUsersModal({ onClose }: Props) {
  const { mutate: addUsers, isPending } = useAddUsers();

  const { register, control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { users: [{ email: '', role: 'Engineer' }] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'users' });

  const onSubmit = (data: FormData) => {
    addUsers(data, { onSuccess: onClose });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900">Add New User(s)</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>

        <p className="text-sm text-slate-500 mb-4">
          Invite users by entering their email addresses. They will receive an invitation link.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_1fr_auto] gap-3 mb-2 px-1">
            <span className="text-xs font-semibold text-slate-500 uppercase">Email</span>
            <span className="text-xs font-semibold text-slate-500 uppercase">User Type</span>
            <span />
          </div>

          {/* Invite rows */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {fields.map((field, idx) => (
              <div key={field.id} className="grid grid-cols-[1fr_1fr_auto] gap-3 items-start">
                <div>
                  <input
                    {...register(`users.${idx}.email`)}
                    type="email"
                    placeholder="Email"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.users?.[idx]?.email && (
                    <p className="text-xs text-red-500 mt-0.5">{errors.users[idx]?.email?.message}</p>
                  )}
                </div>
                <select
                  {...register(`users.${idx}.role`)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {ROLE_OPTIONS.map((r) => <option key={r}>{r}</option>)}
                </select>
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  disabled={fields.length === 1}
                  className="mt-2 text-red-400 hover:text-red-600 disabled:opacity-30"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Add row */}
          <button
            type="button"
            onClick={() => append({ email: '', role: 'Engineer' })}
            className="mt-3 flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
          >
            <Plus size={14} /> Add another
          </button>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 text-sm bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold disabled:opacity-60"
            >
              {isPending ? 'Sending...' : `Send ${fields.length} Invite(s)`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
