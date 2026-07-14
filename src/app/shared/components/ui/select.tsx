import React from "react";
import { ChevronDown } from "lucide-react";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", label, options, ...props }, ref) => {
    return (
      <div className={className}>
        {label && (
          <label htmlFor={props.id} className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className="w-full py-3 pl-4 pr-10 bg-surface-input border border-zinc-200 rounded-xl text-sm text-zinc-800 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-400">
            <ChevronDown className="w-[18px] h-[18px]" />
          </div>
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";
