"use client";

import React from "react";
import { ClipboardList, Store, Globe2, BarChart2 } from "lucide-react";
import { Card } from "../ui/Card";
import { mapKpiData } from "../../data";

interface MapKPICardsProps {
  kpis?: {
    totalProjects: number;
    totalStudents: number;
    totalRegions: number;
    completedProjects: number;
  };
}

export function MapKPICards({ kpis }: MapKPICardsProps) {
  const displayKPIData = kpis
    ? [
        {
          title: "TOTAL PROYEK",
          value: kpis.totalProjects.toLocaleString("id-ID"),
          iconName: "clipboard" as const,
          colorClass: "text-blue-600",
          iconBgClass: "bg-blue-50",
        },
        {
          title: "SISWA BERKARYA",
          value: kpis.totalStudents.toLocaleString("id-ID"),
          iconName: "store" as const,
          colorClass: "text-indigo-600",
          iconBgClass: "bg-indigo-50",
        },
        {
          title: "WILAYAH AKTIF",
          value: kpis.totalRegions.toLocaleString("id-ID"),
          iconName: "globe" as const,
          colorClass: "text-amber-600",
          iconBgClass: "bg-amber-50",
        },
        {
          title: "PROYEK SELESAI",
          value: kpis.completedProjects.toLocaleString("id-ID"),
          iconName: "barChart" as const,
          colorClass: "text-emerald-600",
          iconBgClass: "bg-emerald-50",
        },
      ]
    : mapKpiData;

  const getIcon = (iconName: string, colorClass: string) => {
    switch (iconName) {
      case "clipboard":
        return <ClipboardList className={`w-6 h-6 ${colorClass}`} />;
      case "store":
        return <Store className={`w-6 h-6 ${colorClass}`} />;
      case "globe":
        return <Globe2 className={`w-6 h-6 ${colorClass}`} />;
      case "barChart":
        return <BarChart2 className={`w-6 h-6 ${colorClass}`} />;
      default:
        return <ClipboardList className={`w-6 h-6 ${colorClass}`} />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {mapKpiData.map((kpi, idx) => (
        <Card key={idx} className="flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className={`p-3.5 rounded-xl ${kpi.iconBgClass} shrink-0`}>
            {getIcon(kpi.iconName, kpi.colorClass)}
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase">
              {kpi.title}
            </p>
            <h3 className="text-2xl font-black text-slate-800 mt-1 select-none leading-none">
              {kpi.value}
            </h3>
          </div>
        </Card>
      ))}
    </div>
  );
}
