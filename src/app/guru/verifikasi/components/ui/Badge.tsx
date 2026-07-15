import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "danger" | "info" | "success";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  className = "",
}) => {
  const getStyles = () => {
    switch (variant) {
      case "primary": // BARU
        return "bg-primary text-white text-[10px] font-bold px-2.5 py-0.5 rounded";
      case "danger": // REVISI
        return "bg-red-50 text-red-600 border border-red-200 text-[10px] font-bold px-2.5 py-0.5 rounded";
      case "info": // Menunggu review
        return "bg-[#e0f2fe] text-[#0369a1] text-xs font-semibold px-3 py-1 rounded-full";
      case "success":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded";
      default:
        return "bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded";
    }
  };

  return (
    <span className={`inline-flex items-center justify-center tracking-wider ${getStyles()} ${className}`}>
      {children}
    </span>
  );
};
