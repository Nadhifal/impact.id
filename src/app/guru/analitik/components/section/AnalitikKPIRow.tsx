"use client";

import React from "react";
import { TrendingUp, Users, AlertTriangle } from "lucide-react";
import { Card } from "../ui/Card";
import { analyticsKPI } from "../../data";

export function AnalitikKPIRow() {
  const items = [
    {
      label: "Rata-rata HCS bimbingan",
      value: `${analyticsKPI.rataHcs}`,
      sub: analyticsKPI.hcsChange,
      color: "text-slate-800",
      icon: <TrendingUp className="w-5 h-5 text-slate-400" />,
      border: "",
    },
    {
      label: "Siswa bimbingan aktif",
      value: `${analyticsKPI.siswaBimbinganAktif}`,
      sub: "",
      color: "text-slate-800",
      icon: <Users className="w-5 h-5 text-slate-400" />,
      border: "",
    },
    {
      label: "Perlu perhatian",
      value: `${analyticsKPI.perluPerhatian}`,
      sub: "",
      color: "text-rose-600",
      icon: <AlertTriangle className="w-5 h-5 text-rose-400" />,
      border: "border-l-4 border-l-rose-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-slate-100 rounded-2xl overflow-hidden bg-white">
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`p-6 ${idx < items.length - 1 ? "border-r border-slate-100" : ""} ${item.border}`}
        >
          <div className="flex items-center gap-2 mb-2">
            {item.icon}
            <p className="text-sm font-semibold text-slate-500">{item.label}</p>
          </div>
          <p className={`text-4xl font-extrabold tracking-tight ${item.color}`}>
            {item.value}
          </p>
          {item.sub && (
            <p className="text-xs font-semibold text-emerald-600 mt-2">{item.sub}</p>
          )}
        </div>
      ))}
    </div>
  );
}
