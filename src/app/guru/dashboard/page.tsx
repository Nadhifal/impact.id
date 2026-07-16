"use client";

import React from "react";
import { DashboardKPIRow } from "./components/section/DashboardKPIRow";
import { SubmissionReviewCard } from "./components/section/SubmissionReviewCard";
import { SiswaPerhatianCard } from "./components/section/SiswaPerhatianCard";
import { AksiCepatBar } from "./components/section/AksiCepatBar";
import { Calendar } from "lucide-react";

export default function GuruDashboardPage() {
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">
            Selamat datang, Bu Rani
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
      <DashboardKPIRow />

      {/* Main Grid: Submission + Siswa Perhatian */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SubmissionReviewCard />
        <SiswaPerhatianCard />
      </div>

      {/* Quick Actions */}
      <AksiCepatBar />
    </div>
  );
}
