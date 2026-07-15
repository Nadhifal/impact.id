"use client";

import React from "react";
import { Grid, Sparkles, AlertCircle, Archive } from "lucide-react";
import { Card } from "../ui/Card";
import { challengeKpis } from "../../data";

interface ChallengeKPICardsProps {
  totalChallenges: number;
}

export function ChallengeKPICards({ totalChallenges }: ChallengeKPICardsProps) {
  // Patch the total value from live data; others remain as estimates from data.ts
  const kpis = challengeKpis.map((kpi) =>
    kpi.type === "total" ? { ...kpi, value: totalChallenges } : kpi
  );
  const getIcon = (type: string) => {
    switch (type) {
      case "total":
        return <Grid className="w-5 h-5 text-teal-600" />;
      case "active":
        return <Sparkles className="w-5 h-5 text-blue-600" />;
      case "review":
        return <AlertCircle className="w-5 h-5 text-rose-600" />;
      case "archived":
        return <Archive className="w-5 h-5 text-slate-600" />;
      default:
        return <Grid className="w-5 h-5 text-slate-600" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case "total":
        return "bg-teal-50";
      case "active":
        return "bg-blue-50";
      case "review":
        return "bg-rose-50";
      case "archived":
        return "bg-slate-50";
      default:
        return "bg-slate-50";
    }
  };

  const getBadgeStyle = (badgeType?: string) => {
    switch (badgeType) {
      case "info":
        return "text-[#584FBC] bg-[#EEEDFE] border-[#584FBC]/15";
      case "danger":
        return "text-red-700 bg-red-50 border-red-150 animate-pulse";
      case "neutral":
        return "text-slate-500 bg-slate-100 border-slate-200";
      default:
        return "text-slate-400 bg-slate-50 border-slate-200";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {kpis.map((kpi, idx) => (
        <Card key={idx} className="flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">{kpi.title}</p>
              <h3 className="text-3xl font-black text-slate-800 select-none leading-none pt-1">
                {kpi.value}
              </h3>
            </div>
            <div className={`p-2.5 rounded-xl ${getIconBg(kpi.type)}`}>
              {getIcon(kpi.type)}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400">{kpi.label}</span>
            {kpi.badgeText && (
              <span className={`text-[10px] font-extrabold px-2 py-0.5 border rounded-full select-none ${getBadgeStyle(kpi.badgeType)}`}>
                {kpi.type === "review" ? "⚠️ Segera tindak" : kpi.badgeText}
              </span>
            )}
            {kpi.type === "active" && (
              <span className="text-[10px] font-extrabold px-2 py-0.5 border border-blue-200 bg-blue-50 text-blue-700 rounded-full select-none">
                Live
              </span>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
