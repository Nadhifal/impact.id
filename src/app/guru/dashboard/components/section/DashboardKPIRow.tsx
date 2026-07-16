"use client";

import React from "react";
import { Users, Clock, TrendingUp, AlertTriangle } from "lucide-react";
import { Card } from "../ui/Card";
import { guruKPIData } from "../../data";
import type { GuruKPIItem } from "../../data";

function getIcon(type: GuruKPIItem["type"]) {
  switch (type) {
    case "siswa": return <Users className="w-5 h-5 text-slate-500" />;
    case "verifikasi": return <Clock className="w-5 h-5 text-slate-500" />;
    case "hcs": return <TrendingUp className="w-5 h-5 text-slate-500" />;
    case "perhatian": return <AlertTriangle className="w-5 h-5 text-rose-500" />;
  }
}

interface DashboardKPIRowProps {
  kpiData?: GuruKPIItem[];
}

export function DashboardKPIRow({ kpiData: propData }: DashboardKPIRowProps) {
  const data = propData ?? guruKPIData;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-slate-100 rounded-2xl overflow-hidden bg-white">
      {data.map((kpi, idx) => (
        <div
          key={idx}
          className={`p-6 ${idx < data.length - 1 ? "border-r border-slate-100" : ""} ${
            kpi.type === "perhatian" ? "border-l-4 border-l-rose-500" : ""
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            {getIcon(kpi.type)}
            <p className="text-sm font-semibold text-slate-500">{kpi.label}</p>
          </div>
          <p className={`text-4xl font-extrabold tracking-tight ${kpi.type === "perhatian" ? "text-rose-600" : "text-slate-800"}`}>
            {kpi.value}
          </p>
          <p className={`text-xs font-semibold mt-2 flex items-center gap-1 ${kpi.subIsAlert ? "text-rose-500" : "text-slate-400"}`}>
            {kpi.subIsAlert && <AlertTriangle className="w-3 h-3" />}
            {kpi.sub}
          </p>
        </div>
      ))}
    </div>
  );
}
