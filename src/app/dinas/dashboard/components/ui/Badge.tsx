import React from "react";

interface BadgeProps {
  status: "SESUAI TARGET" | "PERLU PERHATIAN" | "DI BAWAH TARGET";
}

export function Badge({ status }: BadgeProps) {
  const styles = {
    "SESUAI TARGET": "bg-emerald-50 text-emerald-700 border-emerald-100",
    "PERLU PERHATIAN": "bg-amber-50 text-amber-700 border-amber-100",
    "DI BAWAH TARGET": "bg-rose-50 text-rose-700 border-rose-100",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-bold border rounded-full tracking-wider ${styles[status]}`}
    >
      {status}
    </span>
  );
}
