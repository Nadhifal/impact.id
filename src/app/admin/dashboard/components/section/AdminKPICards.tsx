"use client";

import React from "react";
import { Users2, ClipboardList, Award, AlertTriangle } from "lucide-react";
import { Card } from "../ui/Card";
import { ApiAdminStats } from "@/lib/api";

interface KPIItem {
  title: string;
  value: string;
  badgeText: string;
  badgeType: "success" | "warning" | "danger";
  label: string;
  type: "users" | "challenges" | "certificates" | "reports";
}

interface AdminKPICardsProps {
  stats: ApiAdminStats | null;
}

export function AdminKPICards({ stats }: AdminKPICardsProps) {
  // Build KPI items from live data, fallback to "—" while loading/null
  const kpis: KPIItem[] = [
    {
      title: "TOTAL USER",
      value: stats ? stats.totalStudents.toLocaleString("id-ID") : "—",
      badgeText: stats ? `${stats.totalStudents} siswa` : "memuat...",
      badgeType: "success",
      label: "Siswa terdaftar",
      type: "users",
    },
    {
      title: "CHALLENGE AKTIF",
      value: stats ? stats.totalChallenges.toLocaleString("id-ID") : "—",
      badgeText: stats
        ? `${(stats.submissionsByStatus.find((s) => s.status === "IN_PROGRESS")?._count?.id ?? 0)} in progress`
        : "memuat...",
      badgeType: "warning",
      label: "Total di database",
      type: "challenges",
    },
    {
      title: "SERTIFIKAT TERBIT",
      value: stats ? stats.completedSubmissions.toLocaleString("id-ID") : "—",
      badgeText: stats ? `${stats.completionRate}% selesai` : "memuat...",
      badgeType: "success",
      label: "Submission completed",
      type: "certificates",
    },
    {
      title: "TOTAL SUBMISSION",
      value: stats ? stats.totalSubmissions.toLocaleString("id-ID") : "—",
      badgeText: stats
        ? `${(stats.submissionsByStatus.find((s) => s.status === "REVISION_REQUESTED")?._count?.id ?? 0)} revisi`
        : "memuat...",
      badgeType: "danger",
      label: "Semua pengerjaan",
      type: "reports",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "users": return <Users2 className="w-5 h-5 text-blue-600" />;
      case "challenges": return <ClipboardList className="w-5 h-5 text-amber-600" />;
      case "certificates": return <Award className="w-5 h-5 text-emerald-600" />;
      case "reports": return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default: return <Users2 className="w-5 h-5 text-slate-600" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case "users": return "bg-blue-50";
      case "challenges": return "bg-amber-50";
      case "certificates": return "bg-emerald-50";
      case "reports": return "bg-red-50";
      default: return "bg-slate-50";
    }
  };

  const getBadgeStyle = (badgeType: string) => {
    switch (badgeType) {
      case "success": return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "warning": return "bg-amber-50 text-amber-700 border-amber-100";
      case "danger": return "bg-rose-50 text-rose-700 border-rose-100";
      default: return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {kpis.map((kpi, idx) => (
        <Card key={idx} className="flex flex-col justify-between hover:shadow-md transition-shadow">
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
            <span className={`text-[10px] font-bold px-2 py-0.5 border rounded-full select-none ${getBadgeStyle(kpi.badgeType)}`}>
              {kpi.badgeText}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
