import React from "react";
import { LucideIcon } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
  rightIcon?: React.ReactNode;
  headerAction?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className = "", label, icon: Icon, rightIcon, headerAction, ...props },
    ref
  ) => {
    return (
      <div className={className}>
        {(label || headerAction) && (
          <div className="flex justify-between items-center mb-2">
            {label && (
              <label
                htmlFor={props.id}
                className="block text-xs font-bold text-zinc-800 uppercase tracking-wider"
              >
                {label}
              </label>
            )}
            {headerAction && <div>{headerAction}</div>}
          </div>
        )}
        <div className="relative">
          {Icon && (
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
              <Icon className="w-[18px] h-[18px]" />
            </span>
          )}
          <input
            ref={ref}
            suppressHydrationWarning
            className={`
              w-full py-3 bg-surface-input border border-zinc-200 rounded-xl text-sm text-zinc-800 
              focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary 
              transition-all placeholder:text-zinc-400
              ${Icon ? "pl-11" : "pl-4"} 
              ${rightIcon ? "pr-11" : "pr-4"}
            `}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
