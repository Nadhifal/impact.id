import React from "react";
import { Card } from "../../../layouts/ui/Card";
import { Badge } from "../../../../shared/components/ui/badge";
import { UserKPI } from "../../data";

interface UserKPICardsProps {
  kpis: UserKPI[];
}

export function UserKPICards({ kpis }: UserKPICardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, idx) => {
        const badgeColors = {
          success: "bg-emerald-50 text-emerald-700 border-emerald-100",
          info: "bg-blue-50 text-blue-700 border-blue-100",
          danger: "bg-rose-50 text-rose-700 border-rose-100",
          neutral: "bg-slate-50 text-slate-700 border-slate-100"
        };

        return (
          <Card
            key={idx}
            className={`border-slate-200 ${kpi.accentColor || ""}`}
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {kpi.title}
              </span>
              {kpi.badgeText && (
                <Badge
                  variant={
                    kpi.badgeType === "danger"
                      ? "outline"
                      : kpi.badgeType === "info"
                        ? "outline"
                        : "secondary"
                  }
                  className={
                    kpi.badgeType === "danger"
                      ? "bg-rose-50 text-rose-700 border border-rose-100"
                      : kpi.badgeType === "info"
                        ? "bg-blue-50 text-blue-700 border border-blue-100"
                        : "bg-slate-50 text-slate-700 border border-slate-100"
                  }
                >
                  {kpi.badgeText}
                </Badge>
              )}
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span
                className={`text-3xl font-black tracking-tight ${kpi.accentColor ? "text-rose-600" : "text-slate-800"}`}
              >
                {kpi.value}
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-400 mt-1">
              {kpi.label}
            </p>
          </Card>
        );
      })}
    </div>
  );
}
