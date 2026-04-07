import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export interface TagOption {
  value: string;
  label: string;
  description?: string;
}

interface CreatableTagSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: TagOption[];
  placeholder?: string;
  hasError?: boolean;
}

export default function CreatableTagSelect({
  value,
  onChange,
  options,
  placeholder,
  hasError,
}: CreatableTagSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch(''); // reset search when closed
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setSearch('');
    setIsOpen(false);
  };

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const exactMatch = options.find((opt) => opt.label.toLowerCase() === search.toLowerCase());

  return (
    <div className="relative" ref={wrapperRef}>
      <div
        className={`flex items-center justify-between w-full bg-white border ${
          hasError
            ? 'border-red-300 ring-1 ring-red-300'
            : isOpen
            ? 'border-blue-500 ring-1 ring-blue-500'
            : 'border-slate-300 hover:border-slate-400'
        } rounded-lg px-3 py-2 text-sm transition-all cursor-text`}
        onClick={() => setIsOpen(true)}
      >
        {isOpen ? (
          <input
            autoFocus
            type="text"
            className="w-full outline-none bg-transparent placeholder:text-slate-400"
            placeholder="Search or create..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        ) : (
          <div className={`w-full overflow-hidden text-ellipsis ${value ? 'text-slate-800' : 'text-slate-400'}`}>
            {value || placeholder || 'Select...'}
          </div>
        )}
        <ChevronDown size={15} className={`text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden flex flex-col max-h-60">
          <div className="overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`flex flex-col items-start w-full px-3 py-2 text-left group transition-colors ${
                    value === opt.value ? 'bg-blue-500 text-white' : 'text-slate-700 hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  <span className="text-sm font-medium">{opt.label}</span>
                  {opt.description && (
                    <span className={`text-xs ${value === opt.value ? 'text-blue-100' : 'text-slate-500 group-hover:text-blue-100'}`}>
                      {opt.description}
                    </span>
                  )}
                </button>
              ))
            ) : !search ? (
              <div className="px-3 py-2 text-sm text-slate-400 italic">No options available</div>
            ) : null}

            {search && !exactMatch && (
              <button
                type="button"
                onClick={() => handleSelect(search)}
                className="flex items-center w-full px-3 py-2 text-left text-sm text-blue-600 font-medium hover:bg-blue-50 border-t border-slate-100"
              >
                Create "{search}"
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
