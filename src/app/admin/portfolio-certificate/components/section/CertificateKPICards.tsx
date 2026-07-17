import React from "react";
import { Card } from "../../../layouts/ui/Card";
import { CertificateKPI } from "../../data";

interface CertificateKPICardsProps {
  kpis: CertificateKPI[];
}

export function CertificateKPICards({ kpis }: CertificateKPICardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {kpis.map((kpi, idx) => {
        const badgeColors = {
          success: "bg-emerald-50 text-emerald-700 border-emerald-100",
          info: "bg-blue-50 text-blue-700 border-blue-100",
          danger: "bg-rose-50 text-rose-700 border-rose-100",
          neutral: "bg-slate-50 text-slate-700 border-slate-100",
        };

        return (
          <Card key={idx} className={`border-slate-200 ${kpi.accentColor || ""}`}>
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {kpi.title}
              </span>
              {kpi.badgeText && (
                <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full border ${badgeColors[kpi.badgeType || "neutral"]}`}>
                  {kpi.badgeText}
                </span>
              )}
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className={`text-3xl font-black tracking-tight ${kpi.accentColor ? "text-rose-600" : "text-slate-800"}`}>
                {kpi.value}
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-400 mt-1">{kpi.label}</p>
          </Card>
        );
      })}
    </div>
  );
}
