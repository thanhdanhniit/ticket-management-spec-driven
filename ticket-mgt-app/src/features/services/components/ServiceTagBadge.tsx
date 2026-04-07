import type { TagDTO } from '../types';

interface Props {
  tags: TagDTO[];
  maxVisible?: number;
}

export default function ServiceTagBadge({ tags, maxVisible = 2 }: Props) {
  if (!tags || tags.length === 0) return null;

  const visible = tags.slice(0, maxVisible);
  const overflow = tags.length - maxVisible;

  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {visible.map((tag, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200"
        >
          <span className="text-slate-400">{tag.key}:</span>
          <span className="font-semibold">{tag.value}</span>
        </span>
      ))}
      {overflow > 0 && (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200 cursor-pointer hover:bg-slate-200 transition-colors">
          +{overflow} more
        </span>
      )}
    </div>
  );
}
