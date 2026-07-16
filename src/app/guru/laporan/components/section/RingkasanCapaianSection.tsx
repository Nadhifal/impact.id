"use client";

import React from "react";
import { CheckSquare, TrendingUp, Award } from "lucide-react";
import { capaianKPIData } from "../../data";
import type { CapaianKPI } from "../../data";

function getIcon(type: CapaianKPI["icon"]) {
  switch (type) {
    case "challenge": return <CheckSquare className="w-6 h-6 text-slate-500" />;
    case "hcs": return <TrendingUp className="w-6 h-6 text-slate-500" />;
    case "sertifikat": return <Award className="w-6 h-6 text-slate-500" />;
  }
}

export function RingkasanCapaianSection({ siswaName }: { siswaName: string }) {
  return (
    <div>
      <h3 className="text-base font-bold text-slate-800 mb-4">
        Ringkasan capaian {siswaName}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {capaianKPIData.map((kpi, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-100 rounded-2xl p-5 relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                {getIcon(kpi.icon)}
              </div>
              {kpi.badge && (
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                    kpi.badgeColor === "green"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {kpi.badge}
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-slate-500 mb-1">{kpi.label}</p>
            <p className="text-4xl font-extrabold text-slate-800">{kpi.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
