import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
