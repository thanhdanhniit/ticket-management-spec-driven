import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Plus, X, ChevronRight, ExternalLink, Loader2 } from 'lucide-react';
import { useCreateService, useUpdateServiceTags, useServices } from '../hooks/useServices';
import CreatableTagSelect from '../components/CreatableTagSelect';
import type { TagOption } from '../components/CreatableTagSelect';
import { useEscalationPolicies } from '../../../hooks/useEscalationPolicies';
import { useUsers } from '../../../hooks/useUsers';

const serviceSchema = z.object({
  name: z.string().min(2, 'Service name must be at least 2 characters').max(100),
  description: z.string().max(255).optional(),
  escalationPolicyId: z.string().uuid('Please select an escalation policy').optional().or(z.literal('')),
  ownerId: z.string().uuid('Please select an owner').optional().or(z.literal('')),
  tags: z
    .array(
      z.object({
        key: z.string().min(1, 'Key is required'),
        value: z.string().min(1, 'Value is required'),
      })
    )
    .optional(),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

export default function ServiceCreatePage() {
  const navigate = useNavigate();
  
  // Queries
  const { data: policiesData, isLoading: isLoadingPolicies } = useEscalationPolicies({ size: 100 });
  const { data: usersData, isLoading: isLoadingUsers } = useUsers({ size: 100 });
  const { data: allServicesData } = useServices({ size: 100 });

  const tagMap = useMemo(() => {
    const map = new Map<string, Set<string>>();
    allServicesData?.content?.forEach((s) => {
      s.tags?.forEach((t) => {
        if (!map.has(t.key)) map.set(t.key, new Set());
        map.get(t.key)!.add(t.value);
      });
    });
    return map;
  }, [allServicesData]);

  const uniqueKeys: TagOption[] = useMemo(() => {
    return Array.from(tagMap.keys()).map((k) => {
      const count = tagMap.get(k)!.size;
      return {
        value: k,
        label: k,
        description: `${count} value${count > 1 ? 's' : ''}`,
      };
    });
  }, [tagMap]);
  
  // Mutations
  const { mutateAsync: createService } = useCreateService();
  const { mutateAsync: updateTags } = useUpdateServiceTags();

  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: '',
      description: '',
      escalationPolicyId: '',
      ownerId: '',
      tags: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  const watchedTags = watch('tags');

  const onSubmit = async (data: ServiceFormValues) => {
    try {
      setApiError(null);
      setIsSubmitting(true);

      const createdService = await createService({
        name: data.name,
        description: data.description,
        escalationPolicyId: data.escalationPolicyId || undefined,
        ownerId: data.ownerId || undefined,
      });

      if (createdService.id && data.tags && data.tags.length > 0) {
        await updateTags({
          id: createdService.id,
          data: { tags: data.tags },
        });
      }

      navigate('/services');
    } catch (error: any) {
      setApiError(error.response?.data?.message || 'An error occurred while creating the service');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-white">
      {/* Header */}
      <div className="px-6 md:px-8 pt-6 pb-5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <button
              onClick={() => navigate('/services')}
              className="p-1 -ml-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            Define Service
          </h1>
          <p className="text-sm text-slate-500 mt-1.5 pl-7">
            Create a service and add alert source integrations to begin receiving incidents
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        {/* Form Content */}
        <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6">
          <form id="define-service-form" onSubmit={handleSubmit(onSubmit)} className="max-w-2xl flex flex-col gap-6">
            
            {apiError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {apiError}
              </div>
            )}

            {/* Team Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Team Name</label>
              <input
                type="text"
                disabled
                value="Default Team"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-500 cursor-not-allowed"
              />
            </div>

            {/* Service Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Service Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register('name')}
                type="text"
                placeholder="e.g. Payment Service"
                className={`w-full bg-white border ${
                  errors.name ? 'border-red-300 ring-1 ring-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'
                } rounded-lg px-3 py-2.5 text-sm outline-none transition-all`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name.message}</p>}
            </div>

            {/* Service Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Service Description</label>
              <textarea
                {...register('description')}
                rows={3}
                placeholder="Briefly describe the service"
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-y"
              />
              {errors.description && <p className="text-red-500 text-xs mt-1.5">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Escalation Policy */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Escalation Policy <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('escalationPolicyId')}
                  disabled={isLoadingPolicies}
                  className={`w-full bg-white border ${
                    errors.escalationPolicyId ? 'border-red-300 ring-1 ring-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'
                  } rounded-lg px-3 py-2.5 text-sm outline-none transition-all appearance-none`}
                  style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394A3B8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.7rem top 50%', backgroundSize: '0.65rem auto' }}
                >
                  <option value="">Select an Escalation Policy</option>
                  {policiesData?.content?.map((policy: any) => (
                    <option key={policy.id} value={policy.id}>{policy.name}</option>
                  ))}
                </select>
                {errors.escalationPolicyId && <p className="text-red-500 text-xs mt-1.5">{errors.escalationPolicyId.message}</p>}
              </div>

              {/* Owner */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Owner <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('ownerId')}
                  disabled={isLoadingUsers}
                  className={`w-full bg-white border ${
                    errors.ownerId ? 'border-red-300 ring-1 ring-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'
                  } rounded-lg px-3 py-2.5 text-sm outline-none transition-all appearance-none`}
                  style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394A3B8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.7rem top 50%', backgroundSize: '0.65rem auto' }}
                >
                  <option value="">Select an Owner</option>
                  {usersData?.content?.map((u: any) => (
                    <option key={u.id} value={u.id}>{u.fullName || u.email}</option>
                  ))}
                </select>
                {errors.ownerId && <p className="text-red-500 text-xs mt-1.5">{errors.ownerId.message}</p>}
              </div>
            </div>

            {/* Tags */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-sm font-medium text-slate-700 mb-4">Tags</label>
              
              <div className="flex flex-col gap-3 mb-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-start gap-3">
                    <div className="flex-1">
                      <Controller
                        control={control}
                        name={`tags.${index}.key` as const}
                        render={({ field: { value, onChange } }) => (
                          <CreatableTagSelect
                            value={value || ''}
                            onChange={(val) => {
                              onChange(val);
                              // Reset value when key changes? Optional, keeping it simple for now.
                            }}
                            options={uniqueKeys}
                            placeholder="Key"
                            hasError={!!errors.tags?.[index]?.key}
                          />
                        )}
                      />
                      {errors.tags?.[index]?.key && <p className="text-red-500 text-xs mt-1">{errors.tags[index]?.key?.message}</p>}
                    </div>
                    
                    <div className="flex-1">
                      <Controller
                        control={control}
                        name={`tags.${index}.value` as const}
                        render={({ field: { value, onChange } }) => {
                          const currentKey = watchedTags?.[index]?.key || '';
                          const valueOptions: TagOption[] = currentKey && tagMap.has(currentKey)
                            ? Array.from(tagMap.get(currentKey)!).map(v => ({ value: v, label: v }))
                            : [];

                          return (
                            <CreatableTagSelect
                              value={value || ''}
                              onChange={onChange}
                              options={valueOptions}
                              placeholder="Value"
                              hasError={!!errors.tags?.[index]?.value}
                            />
                          );
                        }}
                      />
                      {errors.tags?.[index]?.value && <p className="text-red-500 text-xs mt-1">{errors.tags[index]?.value?.message}</p>}
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-0.5"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => append({ key: '', value: '' })}
                className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1.5 w-max"
              >
                <Plus size={16} />
                Add Tag
              </button>
            </div>

            {/* Footer Toolbar */}
            <div className="pt-8 pb-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/services')}
                disabled={isSubmitting}
                className="px-5 py-2.5 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Help Sidebar */}
        <div className="w-full md:w-80 border-l border-slate-100 bg-slate-50/50 p-6 overflow-y-auto shrink-0">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Help and Guide</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
                <ChevronRight size={16} className="text-slate-400" />
                What's a Service?
              </h3>
              <p className="text-xs text-slate-500 pl-5 leading-relaxed mb-1.5">
                Services represent logical entities or components within your infrastructure that can generate alerts.
              </p>
              <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-700 pl-5 flex items-center gap-1 w-max">
                Read More <ExternalLink size={12} />
              </a>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
                <ChevronRight size={16} className="text-slate-400" />
                How to pick an Owner?
              </h3>
              <p className="text-xs text-slate-500 pl-5 leading-relaxed mb-1.5">
                Select a user or team responsible for maintaining this service and addressing its core issues.
              </p>
              <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-700 pl-5 flex items-center gap-1 w-max">
                Read More <ExternalLink size={12} />
              </a>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
                <ChevronRight size={16} className="text-slate-400" />
                How to use Tags?
              </h3>
              <p className="text-xs text-slate-500 pl-5 leading-relaxed mb-1.5">
                Use key-value pairs to add custom metadata to your services for easier filtering and searching.
              </p>
              <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-700 pl-5 flex items-center gap-1 w-max">
                Read More <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
