import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJWT } from "@/lib/auth";

// GET /api/dinas/analytics — HCS dimension breakdown + category distribution from real DB
export async function GET(req: NextRequest) {
  const token = req.cookies.get("impact_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyJWT(token);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // All student profiles + teacher profiles to get all registered schools
    const registeredProfiles = await prisma.profile.findMany({
      select: {
        schoolName: true,
        province: true,
        city: true,
        user: { select: { role: true, humanCapitalScore: true } },
      },
    });

    const students = await prisma.user.findMany({
      where: { role: "STUDENT" },
      include: {
        humanCapitalScore: true,
        profile: { select: { province: true, city: true, schoolName: true } },
      },
    });

    const completedSubmissions = await prisma.submission.findMany({
      where: { status: "COMPLETED" },
      include: { challenge: { select: { category: true } } },
    });

    const withHCS = students.filter((s) => s.humanCapitalScore);

    // ── Dimension Radar: avg per HCS dimension ─────────────────────────────
    const avgDimensions =
      withHCS.length > 0
        ? {
            leadership:
              withHCS.reduce((sum, s) => sum + (s.humanCapitalScore?.leadership ?? 0), 0) /
              withHCS.length,
            communication:
              withHCS.reduce((sum, s) => sum + (s.humanCapitalScore?.communication ?? 0), 0) /
              withHCS.length,
            problemSolving:
              withHCS.reduce((sum, s) => sum + (s.humanCapitalScore?.problemSolving ?? 0), 0) /
              withHCS.length,
            creativity:
              withHCS.reduce((sum, s) => sum + (s.humanCapitalScore?.creativity ?? 0), 0) /
              withHCS.length,
            collaboration:
              withHCS.reduce((sum, s) => sum + (s.humanCapitalScore?.collaboration ?? 0), 0) /
              withHCS.length,
          }
        : { leadership: 0, communication: 0, problemSolving: 0, creativity: 0, collaboration: 0 };

    // Build radar data (compare provinsi vs regional avg — here we use 85% of avg as "rata-rata prov" baseline)
    const dimensionsRadarData = [
      {
        subject: "Kepemimpinan",
        "RATA-RATA": Math.round(avgDimensions.leadership),
        "BENCHMARK (85)": 85,
      },
      {
        subject: "Komunikasi",
        "RATA-RATA": Math.round(avgDimensions.communication),
        "BENCHMARK (85)": 85,
      },
      {
        subject: "Pemecahan Masalah",
        "RATA-RATA": Math.round(avgDimensions.problemSolving),
        "BENCHMARK (85)": 85,
      },
      {
        subject: "Kreativitas",
        "RATA-RATA": Math.round(avgDimensions.creativity),
        "BENCHMARK (85)": 85,
      },
      {
        subject: "Kolaborasi",
        "RATA-RATA": Math.round(avgDimensions.collaboration),
        "BENCHMARK (85)": 85,
      },
    ];

    // ── Category Distribution (only completed challenges) ─────────────────
    const categoryMap = new Map<string, number>();
    for (const sub of completedSubmissions) {
      const cats = sub.challenge.category.split(",").map((c) => c.trim());
      for (const cat of cats) {
        categoryMap.set(cat, (categoryMap.get(cat) ?? 0) + 1);
      }
    }
    const categoryDistributionData = Array.from(categoryMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([category, projectsCount]) => ({ category, projectsCount }));

    // ── School Growth (comparison of registered schools) ──────────────────
    // Get HCS scores grouped by schoolName of all registered student profiles
    const schoolHcsMap = new Map<string, number[]>();
    for (const p of registeredProfiles) {
      if (p.schoolName && p.user?.humanCapitalScore) {
        if (!schoolHcsMap.has(p.schoolName)) {
          schoolHcsMap.set(p.schoolName, []);
        }
        schoolHcsMap.get(p.schoolName)!.push(p.user.humanCapitalScore.totalScore);
      }
    }
    const topSchoolsGrowth = Array.from(schoolHcsMap.entries())
      .map(([name, scores]) => ({
        name,
        score: Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10,
      }))
      .sort((a, b) => b.score - a.score);

    // ── Regional Insights (text, derived from data) ───────────────────────
    const topDimension = Object.entries(avgDimensions).sort((a, b) => b[1] - a[1])[0];
    const lowestDimension = Object.entries(avgDimensions).sort((a, b) => a[1] - b[1])[0];
    const dimLabel: Record<string, string> = {
      leadership: "Kepemimpinan",
      communication: "Komunikasi",
      problemSolving: "Pemecahan Masalah",
      creativity: "Kreativitas",
      collaboration: "Kolaborasi",
    };

    const regionalInsights = [
      {
        type: "KEUNGGULAN" as const,
        title: "KEUNGGULAN",
        description: `Dimensi ${dimLabel[topDimension[0]]} memiliki rata-rata tertinggi (${Math.round(topDimension[1])}) — didukung oleh program IMPACT Challenge yang aktif.`,
      },
      {
        type: "REKOMENDASI" as const,
        title: "REKOMENDASI",
        description: `Dimensi ${dimLabel[lowestDimension[0]]} perlu penguatan (rata-rata ${Math.round(lowestDimension[1])}). Rekomendasikan workshop dan program mentoring tambahan.`,
      },
    ];

    return NextResponse.json({
      success: true,
      data: {
        dimensionsRadarData,
        categoryDistributionData,
        topSchoolsGrowth,
        regionalInsights,
        totalStudents: students.length,
        studentsWithHCS: withHCS.length,
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("GET /api/dinas/analytics error:", msg);
    return NextResponse.json({ error: "Gagal mengambil data analitik" }, { status: 500 });
  }
}
