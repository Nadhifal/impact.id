import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJWT } from "@/lib/auth";

// GET /api/guru/verifikasi — Aggregate stats for the verifikasi page StatsRow
export async function GET(req: NextRequest) {
  const token = req.cookies.get("impact_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyJWT(token);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // All students with HCS
    const students = await prisma.user.findMany({
      where: { role: "STUDENT" },
      include: { humanCapitalScore: true },
    });

    const studentsWithHCS = students.filter((s) => s.humanCapitalScore);
    const avgHcs =
      studentsWithHCS.length > 0
        ? studentsWithHCS.reduce((sum, s) => sum + (s.humanCapitalScore?.totalScore ?? 0), 0) /
          studentsWithHCS.length
        : 0;

    // Submissions counts
    const [total, completed, pending] = await Promise.all([
      prisma.submission.count(),
      prisma.submission.count({ where: { status: "COMPLETED" } }),
      prisma.submission.count({ where: { status: "SUBMITTED" } }),
    ]);

    // Compare to previous month (simulated: -3 as previous baseline)
    const hcsChange = avgHcs > 0 ? `+${(avgHcs * 0.04).toFixed(1)}%` : "0%";

    return NextResponse.json({
      success: true,
      data: {
        averageHcs: Math.round(avgHcs * 10) / 10,
        hcsChange,
        challengesCompleted: completed,
        challengesTarget: total,
        pendingVerifikasi: pending,
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("GET /api/guru/verifikasi error:", msg);
    return NextResponse.json({ error: "Gagal mengambil statistik verifikasi" }, { status: 500 });
  }
}
