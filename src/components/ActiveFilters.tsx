import React from "react";
import { X } from "lucide-react";

interface ActiveFilter {
  id: string;
  label: string;
  category: string;
}

interface ActiveFiltersProps {
  filters: ActiveFilter[];
  onRemove: (filter: ActiveFilter) => void;
  onClearAll: () => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ filters, onRemove, onClearAll }) => {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((f) => (
        <button
          key={`${f.category}-${f.id}`}
          onClick={() => onRemove(f)}
          className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary/70 transition-colors min-h-0 min-w-0"
        >
          {f.label}
          <X className="size-3 text-muted-foreground" />
        </button>
      ))}
      <button
        onClick={onClearAll}
        className="text-xs font-medium text-primary hover:text-primary/80 transition-colors min-h-0 min-w-0 ml-1"
      >
        Clear all
      </button>
    </div>
  );
};

export { ActiveFilters };
export type { ActiveFilter };
