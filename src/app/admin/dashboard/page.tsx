import React, { Suspense } from "react";
import { Download, Plus, RefreshCw } from "lucide-react";
import { AdminKPICards } from "./components/section/AdminKPICards";
import { ActionRequired } from "./components/section/ActionRequired";
import { ActivityLogs } from "./components/section/ActivityLogs";
import type { ActivityLogItem } from "./components/section/ActivityLogs";
import { prisma } from "@/lib/prisma";
import { ApiAdminStats } from "@/lib/api";
import nextDynamic from "next/dynamic";

const GrowthChart = nextDynamic(
  () => import("./components/section/GrowthChart").then((mod) => mod.GrowthChart)
);

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

// Helper: format relative time in Bahasa Indonesia
function relativeTime(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return "Baru saja";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} menit yang lalu`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour} jam yang lalu`;
  const diffDay = Math.floor(diffHour / 24);
  return `${diffDay} hari yang lalu`;
}

// Helper: Bahasa Indonesia month name
const ID_MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Ags", "Sep", "Okt", "Nov", "Des",
];

// Inner Server Component that handles DB queries
async function AdminDashboardContent() {
  let stats: ApiAdminStats | null = null;
  let byRole: { name: string; count: number }[] = [];
  let byMonth: { month: string; count: number }[] = [];
  let logs: ActivityLogItem[] = [];

  try {
    // ── KPI queries ──────────────────────────────────────────────────────
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

    // ── GrowthChart: user count per role ─────────────────────────────────
    const roleGroups = await prisma.user.groupBy({
      by: ["role"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
    });

    const ROLE_LABEL: Record<string, string> = {
      STUDENT: "Siswa",
      TEACHER: "Guru",
      DINAS: "Dinas",
      ADMIN: "Admin",
    };
    byRole = roleGroups.map((r) => ({
      name: ROLE_LABEL[r.role] ?? r.role,
      count: r._count.id,
    }));

    // ── GrowthChart: new users per month (last 12 months) ────────────────
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
    twelveMonthsAgo.setDate(1);
    twelveMonthsAgo.setHours(0, 0, 0, 0);

    const recentUsers = await prisma.user.findMany({
      where: { createdAt: { gte: twelveMonthsAgo } },
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    });

    // Aggregate by "MMM YYYY"
    const monthMap = new Map<string, number>();
    recentUsers.forEach((u) => {
      const d = new Date(u.createdAt);
      const key = `${ID_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
      monthMap.set(key, (monthMap.get(key) ?? 0) + 1);
    });
    byMonth = Array.from(monthMap.entries()).map(([month, count]) => ({
      month,
      count,
    }));

    // ── ActivityLogs: latest 8 admin logs ────────────────────────────────
    const adminLogs = await prisma.adminLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      include: { admin: { select: { name: true } } },
    });

    logs = adminLogs.map((log) => ({
      id: log.id,
      adminName: log.admin.name,
      adminLetter: log.admin.name.charAt(0).toUpperCase(),
      activity: log.activity,
      time: relativeTime(new Date(log.createdAt)),
    }));
  } catch {
    // DB unavailable — all stay at their defaults (empty arrays / null)
  }

  return (
    <>
      {/* KPI stats — pass live data from DB */}
      <AdminKPICards stats={stats} />

      {/* Growth Chart & Action Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GrowthChart byRole={byRole} byMonth={byMonth} />
        </div>
        <div className="lg:col-span-1">
          <ActionRequired stats={stats} />
        </div>
      </div>

      {/* Activity Logs Table */}
      <ActivityLogs logs={logs} />
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
