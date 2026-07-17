import React from "react";

interface BadgeProps {
  status: "AKTIF" | "MENUNGGU VERIFIKASI" | "NONAKTIF" | "DITERBITKAN" | "MENUNGGU AUDIT" | "DITOLAK";
}

export function Badge({ status }: BadgeProps) {
  const styles = {
    AKTIF: "bg-emerald-50 text-emerald-700 border-emerald-100",
    "MENUNGGU VERIFIKASI": "bg-amber-50 text-amber-600 border-amber-100",
    NONAKTIF: "bg-slate-100 text-slate-500 border-slate-200",
    DITERBITKAN: "bg-emerald-50 text-emerald-700 border-emerald-100",
    "MENUNGGU AUDIT": "bg-rose-50 text-rose-700 border-rose-100",
    DITOLAK: "bg-slate-100 text-slate-600 border-slate-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-[10px] font-bold border rounded-full tracking-wider ${styles[status] || styles.NONAKTIF}`}
    >
      {status}
    </span>
  );
}
