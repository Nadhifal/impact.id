import React from "react";
import type { ReportFormat } from "../../data";

interface FormatBadgeProps {
  format: ReportFormat;
}

export function FormatBadge({ format }: FormatBadgeProps) {
  const styles: Record<ReportFormat, string> = {
    PDF: "bg-rose-50 text-rose-700 border-rose-100",
    Excel: "bg-emerald-50 text-emerald-700 border-emerald-100",
    CSV: "bg-slate-100 text-slate-600 border-slate-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold border rounded-md tracking-wider ${styles[format]}`}
    >
      <span className="text-[10px]">
        {format === "PDF" ? "🗎" : format === "Excel" ? "📊" : "☰"}
      </span>
      {format}
    </span>
  );
}
