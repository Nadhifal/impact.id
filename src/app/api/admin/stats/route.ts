import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/stats
export async function GET() {
  try {
    const [totalChallenges, totalUsers, totalSubmissions, completedSubmissions] =
      await Promise.all([
        prisma.challenge.count(),
        prisma.user.count({ where: { role: "STUDENT" } }),
        prisma.submission.count(),
        prisma.submission.count({ where: { status: "COMPLETED" } }),
      ]);

    // Challenges by category breakdown
    const challengesByCategory = await prisma.challenge.groupBy({
      by: ["category"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
    });

    // Submissions by status
    const submissionsByStatus = await prisma.submission.groupBy({
      by: ["status"],
      _count: { id: true },
    });

    const completionRate =
      totalSubmissions > 0
        ? Math.round((completedSubmissions / totalSubmissions) * 100)
        : 0;

    return NextResponse.json({
      success: true,
      data: {
        totalChallenges,
        totalStudents: totalUsers,
        totalSubmissions,
        completedSubmissions,
        completionRate,
        challengesByCategory,
        submissionsByStatus,
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("GET /api/admin/stats error:", msg);
    return NextResponse.json({ error: "Gagal mengambil statistik admin" }, { status: 500 });
  }
}
