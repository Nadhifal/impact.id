import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 cursor-pointer focus:outline-none disabled:opacity-50 disabled:pointer-events-none";
  
  const variantStyles = {
    primary: "bg-primary hover:bg-primary-hover text-white rounded-full shadow-sm shadow-primary/10 hover:shadow-md hover:shadow-primary/20 active:scale-[0.98]",
    secondary: "bg-surface-light hover:bg-[#d5ebe7] text-primary rounded-full active:scale-[0.98]",
    outline: "border-2 border-primary text-primary hover:bg-primary/5 rounded-full active:scale-[0.98] dark:border-accent dark:text-accent dark:hover:bg-accent/5",
    ghost: "text-zinc-600 hover:text-primary hover:bg-zinc-100/50 rounded-full dark:text-zinc-400 dark:hover:text-accent",
  };

  const sizeStyles = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <button
      suppressHydrationWarning
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
