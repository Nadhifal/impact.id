"use client";

import React from "react";
import { Play, Target, AlertTriangle, CreditCard } from "lucide-react";
import { Card } from "../ui/Card";
import { monitoringKPIData } from "../../data";
import type { MonitoringKPIItem } from "../../data";

function getIcon(type: MonitoringKPIItem["type"]) {
  switch (type) {
    case "running":
      return <Play className="w-5 h-5 text-teal-700" />;
    case "target":
      return <Target className="w-5 h-5 text-teal-700" />;
    case "attention":
      return <AlertTriangle className="w-5 h-5 text-rose-500" />;
    case "budget":
      return <CreditCard className="w-5 h-5 text-slate-500" />;
  }
}

function getIconBg(type: MonitoringKPIItem["type"]) {
  switch (type) {
    case "running":
      return "bg-teal-50 border border-teal-100";
    case "target":
      return "bg-teal-50 border border-teal-100";
    case "attention":
      return "bg-rose-50 border border-rose-100";
    case "budget":
      return "bg-slate-50 border border-slate-200";
  }
}

interface MonitoringKPICardsProps {
  kpis?: {
    totalSchools: number;
    totalStudents: number;
    totalTeachers: number;
    globalAvgHcs: number;
  };
}

export function MonitoringKPICards({ kpis }: MonitoringKPICardsProps) {
  const displayKPIData = kpis
    ? [
        {
          title: "Sekolah Aktif",
          value: `${kpis.totalSchools} Sekolah`,
          sub: "Terhubung di sistem",
          subIsPositive: true,
          type: "running" as const,
        },
        {
          title: "Skor SDM Global",
          value: `${kpis.globalAvgHcs.toFixed(1)}%`,
          sub: "Rata-rata HCS Nasional",
          type: "target" as const,
        },
        {
          title: "Siswa Aktif",
          value: kpis.totalStudents.toLocaleString("id-ID"),
          sub: "Talenta terdaftar",
          subIsPositive: true,
          type: "attention" as const, // displays as important
        },
        {
          title: "Guru Pembimbing",
          value: `${kpis.totalTeachers} Guru`,
          sub: "Fasilitator aktif",
          subIsPositive: true,
          type: "budget" as const,
        },
      ]
    : monitoringKPIData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {displayKPIData.map((kpi, idx) => (
        <Card
          key={idx}
          className="flex flex-col gap-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <p className="text-sm font-semibold text-slate-500">{kpi.title}</p>
            <div className={`p-2 rounded-lg ${getIconBg(kpi.type)}`}>
              {getIcon(kpi.type)}
            </div>
          </div>

          <div>
            <p
              className={`text-2xl font-extrabold tracking-tight ${
                kpi.type === "attention" ? "text-rose-600" : "text-slate-800"
              }`}
            >
              {kpi.value}
            </p>

            {kpi.type === "target" && (
              <div className="mt-3 w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-[#00473e] h-2 rounded-full"
                  style={{ width: "72%" }}
                />
              </div>
            )}

            {kpi.sub && (
              <p
                className={`text-xs font-semibold mt-2 ${
                  kpi.subIsPositive === true
                    ? "text-emerald-600"
                    : kpi.subIsPositive === false
                    ? "text-rose-600"
                    : "text-slate-400"
                }`}
              >
                {kpi.subIsPositive === true && "▲ "}
                {kpi.sub}
              </p>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
