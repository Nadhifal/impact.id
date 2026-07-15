import React from "react";
import { Download, Plus, RefreshCw } from "lucide-react";
import { AdminKPICards } from "./components/section/AdminKPICards";
import { GrowthChart } from "./components/section/GrowthChart";
import { ActionRequired } from "./components/section/ActionRequired";
import { ActivityLogs } from "./components/section/ActivityLogs";
import { prisma } from "@/lib/prisma";
import { ApiAdminStats } from "@/lib/api";

export const dynamic = "force-dynamic";

// Server Component — query Prisma directly (no HTTP layer)
export default async function AdminDashboardPage() {
  let stats: ApiAdminStats | null = null;

  try {
    const [totalChallenges, totalStudents, totalSubmissions, completedSubmissions] =
      await Promise.all([
        prisma.challenge.count(),
        prisma.user.count({ where: { role: "STUDENT" } }),
        prisma.submission.count(),
        prisma.submission.count({ where: { status: "COMPLETED" } }),
      ]);

    const [challengesByCategory, submissionsByStatus] = await Promise.all([
      prisma.challenge.groupBy({
        by: ["category"],
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
      }),
      prisma.submission.groupBy({
        by: ["status"],
        _count: { id: true },
      }),
    ]);

    stats = {
      totalChallenges,
      totalStudents,
      totalSubmissions,
      completedSubmissions,
      completionRate:
        totalSubmissions > 0
          ? Math.round((completedSubmissions / totalSubmissions) * 100)
          : 0,
      challengesByCategory: challengesByCategory.map((c) => ({
        category: c.category,
        _count: { id: c._count.id },
      })),
      submissionsByStatus: submissionsByStatus.map((s) => ({
        status: s.status,
        _count: { id: s._count.id },
      })),
    };
  } catch {
    // DB unavailable — stats stays null, components will show fallback values
  }

  const now = new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Ringkasan sistem</h2>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mt-1">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "6s" }} />
            <span>Diperbarui hari ini, {now}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-sm font-semibold text-slate-600 transition-colors cursor-pointer w-full sm:w-auto justify-center">
            <Download className="w-4 h-4" />
            <span>Unduh Laporan</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#00473e] hover:bg-[#003830] text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer w-full sm:w-auto justify-center shadow-md">
            <Plus className="w-4 h-4" />
            <span>Tambah Data</span>
          </button>
        </div>
      </div>

      {/* KPI stats — pass live data from DB */}
      <AdminKPICards stats={stats} />

      {/* Growth Chart & Action Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GrowthChart />
        </div>
        <div className="lg:col-span-1">
          <ActionRequired stats={stats} />
        </div>
      </div>

      {/* Activity Logs Table */}
      <ActivityLogs />
    </div>
  );
}
