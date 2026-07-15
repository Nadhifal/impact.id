import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export function Card({ children, className = "", hoverEffect = true, ...props }: CardProps) {
  return (
    <div
      className={`bg-white border border-zinc-100 rounded-3xl p-6 shadow-sm ${
        hoverEffect ? "hover:shadow-md hover:border-zinc-200/80 transition-all duration-300 hover:-translate-y-0.5" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
