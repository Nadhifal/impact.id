import React from "react";
import type { SchoolProgramStatus } from "../../data";

interface StatusBadgeProps {
  status: SchoolProgramStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<SchoolProgramStatus, string> = {
    "Belum Mulai": "bg-rose-50 text-rose-600 border-rose-100",
    Terhambat: "bg-blue-50 text-blue-600 border-blue-100",
    "Sesuai Jadwal": "bg-emerald-700 text-white border-emerald-700",
  };

  const dots: Record<SchoolProgramStatus, string> = {
    "Belum Mulai": "bg-rose-500",
    Terhambat: "bg-blue-500",
    "Sesuai Jadwal": "bg-white",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border rounded-lg ${styles[status]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status]}`} />
      {status}
    </span>
  );
}
