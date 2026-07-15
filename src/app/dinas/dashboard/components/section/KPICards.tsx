"use client";

import React from "react";
import { GraduationCap, Users, CheckCircle2, TrendingUp } from "lucide-react";
import { Card } from "../ui/Card";
import { kpiData } from "../../data";

export function KPICards() {
  const getIcon = (type: string) => {
    switch (type) {
      case "school":
        return <GraduationCap className="w-6 h-6 text-teal-600" />;
      case "student":
        return <Users className="w-6 h-6 text-blue-600" />;
      case "challenge":
        return <CheckCircle2 className="w-6 h-6 text-emerald-600" />;
      case "score":
        return <TrendingUp className="w-6 h-6 text-indigo-600" />;
      default:
        return <Users className="w-6 h-6 text-slate-600" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case "school":
        return "bg-teal-50";
      case "student":
        return "bg-blue-50";
      case "challenge":
        return "bg-emerald-50";
      case "score":
        return "bg-indigo-50";
      default:
        return "bg-slate-50";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {kpiData.map((kpi, idx) => (
        <Card key={idx} className="flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">{kpi.title}</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2 select-none">{kpi.value}</h3>
            </div>
            <div className={`p-2.5 rounded-xl ${getIconBg(kpi.type)}`}>
              {getIcon(kpi.type)}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            {kpi.type === "score" ? (
              <>
                <span className="text-xs font-semibold text-slate-400">Target: 75.0</span>
                <span className="text-xs font-bold text-slate-600 select-none bg-slate-100 px-2 py-0.5 rounded-sm">
                  {kpi.change}
                </span>
              </>
            ) : (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-sm">
                {kpi.change}
              </span>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
