import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "outline";
}

export function Badge({ children, className = "", variant = "primary", ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-all duration-300";
  
  const variantStyles = {
    primary: "bg-[#e6f4f1] text-[#00473e] dark:bg-[#002b25] dark:text-[#8ce1d5]",
    secondary: "bg-[#f4f4f5] text-[#18181b] dark:bg-[#27272a] dark:text-[#f4f4f5]",
    outline: "border border-[#00473e]/20 text-[#00473e] dark:border-[#8ce1d5]/20 dark:text-[#8ce1d5]",
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}
