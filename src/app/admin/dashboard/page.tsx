import React, { Suspense } from "react";
import { Download, Plus, RefreshCw } from "lucide-react";
import { AdminKPICards } from "./components/section/AdminKPICards";
import { ActionRequired } from "./components/section/ActionRequired";
import { ActivityLogs } from "./components/section/ActivityLogs";
import { prisma } from "@/lib/prisma";
import { ApiAdminStats } from "@/lib/api";
import nextDynamic from "next/dynamic";

const GrowthChart = nextDynamic(() => import("./components/section/GrowthChart").then(mod => mod.GrowthChart));

export const dynamic = "force-dynamic";

// Skeleton Loader for Admin Dashboard
function AdminDashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 bg-slate-100 rounded-2xl border border-slate-200/60" />
        ))}
      </div>
      {/* Charts & Actions Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[400px] bg-slate-100 rounded-2xl border border-slate-200/60" />
        <div className="lg:col-span-1 h-[400px] bg-slate-100 rounded-2xl border border-slate-200/60" />
      </div>
      {/* Table Skeleton */}
      <div className="h-64 bg-slate-100 rounded-2xl border border-slate-200/60" />
    </div>
  );
}

// Inner Server Component that handles DB queries
async function AdminDashboardContent() {
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

  return (
    <>
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
    </>
  );
}

// Shell Page Component
export default async function AdminDashboardPage() {
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

      {/* Dynamic Content wrapped in Suspense */}
      <Suspense fallback={<AdminDashboardSkeleton />}>
        <AdminDashboardContent />
      </Suspense>
    </div>
  );
}
