"use client";

import React, { useEffect, useState } from "react";
import { DashboardKPIRow } from "./components/section/DashboardKPIRow";
import { SubmissionReviewCard } from "./components/section/SubmissionReviewCard";
import { SiswaPerhatianCard } from "./components/section/SiswaPerhatianCard";
import { AksiCepatBar } from "./components/section/AksiCepatBar";
import { Calendar } from "lucide-react";
import { useUser } from "@/app/shared/context/AuthContext";
import type { GuruKPIItem, SubmissionItem, SiswaPerhatianItem } from "./data";

interface GuruStatsData {
  teacherName: string;
  kpi: GuruKPIItem[];
  submissionsMenunggu: SubmissionItem[];
  siswaPerhatian: SiswaPerhatianItem[];
}

export default function GuruDashboardPage() {
  const { user } = useUser();
  const [data, setData] = useState<GuruStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    fetch("/api/guru/stats")
      .then(r => r.json())
      .then(json => {
        if (json.success) {
          setData(json.data);
        }
      })
      .catch(err => console.error("Failed to fetch guru stats:", err))
      .finally(() => setLoading(false));
  }, []);

  const displayName = data?.teacherName ?? user?.name ?? "Guru";
  const firstName = displayName.split(" ")[0];

  if (loading) {
    return (
      <div className="space-y-8 max-w-7xl mx-auto w-full flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#00473e] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-zinc-500">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">
            Selamat datang, {firstName}
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Pantau progres belajar dan berikan feedback kepada siswa Anda hari ini.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 shrink-0 shadow-xs">
          <Calendar className="w-4 h-4 text-slate-400" />
          {today}
        </div>
      </div>

      {/* KPI Row */}
      <DashboardKPIRow kpiData={data?.kpi} />

      {/* Main Grid: Submission + Siswa Perhatian */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SubmissionReviewCard submissions={data?.submissionsMenunggu} />
        <SiswaPerhatianCard siswaData={data?.siswaPerhatian} />
      </div>

      {/* Quick Actions */}
      <AksiCepatBar />
    </div>
  );
}
