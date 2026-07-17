import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/logs — Fetch admin activity logs
export async function GET() {
  try {
    const logs = await prisma.adminLog.findMany({
      include: { admin: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    const mapped = logs.map((log) => ({
      id: log.id,
      adminName: log.admin.name,
      adminLetter: log.admin.name.charAt(0).toUpperCase(),
      activity: log.activity,
      highlight: log.highlight,
      module: log.module,
      timestamp: log.createdAt.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
      time: getRelativeTime(log.createdAt),
    }));

    return NextResponse.json({ success: true, data: mapped });
  } catch (error: any) {
    console.error("GET /api/admin/logs error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil log aktivitas", details: error.message },
      { status: 500 }
    );
  }
}

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Baru saja";
  if (diffMins < 60) return `${diffMins} menit yang lalu`;
  if (diffHours < 24) return `${diffHours} jam yang lalu`;
  if (diffDays === 1) return "Kemarin";
  return `${diffDays} hari yang lalu`;
}
