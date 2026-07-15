import React from "react";

interface BadgeProps {
  status: "AKTIF" | "MENUNGGU REVIEW" | "DIARSIPKAN";
}

export function Badge({ status }: BadgeProps) {
  const styles = {
    AKTIF: "bg-emerald-50 text-emerald-700 border-emerald-100",
    "MENUNGGU REVIEW": "bg-rose-50 text-rose-700 border-rose-100",
    DIARSIPKAN: "bg-slate-100 text-slate-600 border-slate-200",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-[10px] font-bold border rounded-full tracking-wider ${styles[status]}`}
    >
      {status}
    </span>
  );
}
