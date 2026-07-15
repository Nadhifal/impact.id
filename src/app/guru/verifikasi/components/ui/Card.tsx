import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  isActive = false,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border transition-all duration-200 ${
        onClick ? "cursor-pointer" : ""
      } ${
        isActive
          ? "border-primary shadow-sm ring-1 ring-primary/20"
          : "border-slate-100 shadow-xs hover:border-slate-300"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
