import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/dinas/impact-map — Aggregate impact data per region from student accounts
export async function GET() {
  try {
    // Get all student profiles with location data
    const profiles = await prisma.profile.findMany({
      where: {
        user: { role: "STUDENT" },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            humanCapitalScore: { select: { totalScore: true } },
            submissions: {
              include: {
                challenge: { select: { title: true, category: true, location: true } },
                verification: { select: { isApproved: true } },
              },
            },
          },
        },
      },
    });

    // Aggregate by province
    const regionMap = new Map<string, {
      province: string;
      totalProjects: number;
      totalStudents: number;
      avgHcs: number;
      hcsScores: number[];
      completedProjects: number;
    }>();

    let totalActiveProjects = 0;
    let totalCompletedProjects = 0;

    for (const p of profiles) {
      const province = p.province ?? "Tidak Diketahui";

      if (!regionMap.has(province)) {
        regionMap.set(province, {
          province,
          totalProjects: 0,
          totalStudents: 0,
          avgHcs: 0,
          hcsScores: [],
          completedProjects: 0,
        });
      }

      const entry = regionMap.get(province)!;
      entry.totalStudents++;

      if (p.user.humanCapitalScore) {
        entry.hcsScores.push(p.user.humanCapitalScore.totalScore);
      }

      for (const sub of p.user.submissions) {
        entry.totalProjects++;
        totalActiveProjects++;
        if (sub.status === "COMPLETED") {
          entry.completedProjects++;
          totalCompletedProjects++;
        }
      }
    }

    const regions = Array.from(regionMap.values()).map((r) => ({
      province: r.province,
      totalProjects: r.totalProjects,
      totalStudents: r.totalStudents,
      completedProjects: r.completedProjects,
      avgHcs:
        r.hcsScores.length > 0
          ? Math.round(
              (r.hcsScores.reduce((a, b) => a + b, 0) / r.hcsScores.length) * 10
            ) / 10
          : 0,
    }));

    // Recent verified submissions as highlights
    const recentVerified = await prisma.verification.findMany({
      where: { isApproved: true },
      include: {
        submission: {
          include: {
            user: { select: { name: true } },
            challenge: { select: { title: true, category: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    const highlights = recentVerified.map((v) => ({
      id: v.id,
      studentName: v.submission.user.name,
      projectTitle: v.submission.challenge.title,
      category: v.submission.challenge.category,
      date: v.createdAt.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    }));

    return NextResponse.json({
      success: true,
      data: {
        regions,
        highlights,
        kpis: {
          totalProjects: totalActiveProjects,
          totalStudents: profiles.length,
          totalRegions: regions.length,
          completedProjects: totalCompletedProjects,
        },
      },
    });
  } catch (error: any) {
    console.error("GET /api/dinas/impact-map error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data peta dampak", details: error.message },
      { status: 500 }
    );
  }
}
