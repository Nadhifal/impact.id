import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJWT } from "@/lib/auth";

// GET /api/dinas/monitoring — School program monitoring from real DB
export async function GET(req: NextRequest) {
  const token = req.cookies.get("impact_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyJWT(token);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const url = new URL(req.url);
    const wilayahFilter = url.searchParams.get("wilayah") ?? "all";

    // Get all student profiles with submissions
    const profiles = await prisma.profile.findMany({
      where: {
        schoolName: { not: null },
        user: { role: "STUDENT" },
      },
      include: {
        user: {
          select: {
            id: true,
            humanCapitalScore: { select: { totalScore: true } },
            submissions: { select: { status: true, challengeId: true } },
          },
        },
      },
    });

    // Group by school
    interface SchoolEntry {
      schoolName: string;
      city: string;
      province: string;
      students: number;
      totalSubmissions: number;
      completedSubmissions: number;
      hcsScores: number[];
    }
    const schoolMap = new Map<string, SchoolEntry>();

    for (const p of profiles) {
      const school = p.schoolName ?? "Unknown";
      // Apply wilayah filter
      if (wilayahFilter !== "all") {
        const cityNorm = (p.city ?? "").toLowerCase().replace(/\s+/g, "-");
        if (!cityNorm.includes(wilayahFilter.replace("kota-", "").replace("kab-", ""))) continue;
      }

      if (!schoolMap.has(school)) {
        schoolMap.set(school, {
          schoolName: school,
          city: p.city ?? "—",
          province: p.province ?? "—",
          students: 0,
          totalSubmissions: 0,
          completedSubmissions: 0,
          hcsScores: [],
        });
      }
      const entry = schoolMap.get(school)!;
      entry.students++;
      entry.totalSubmissions += p.user.submissions.length;
      entry.completedSubmissions += p.user.submissions.filter(
        (s) => s.status === "COMPLETED"
      ).length;
      if (p.user.humanCapitalScore) {
        entry.hcsScores.push(p.user.humanCapitalScore.totalScore);
      }
    }

    // Map to SchoolProgramItem shape
    const schoolProgramData = Array.from(schoolMap.values()).map((s, idx) => {
      const avgHcs =
        s.hcsScores.length > 0
          ? s.hcsScores.reduce((a, b) => a + b, 0) / s.hcsScores.length
          : 0;
      const progress =
        s.totalSubmissions > 0
          ? Math.round((s.completedSubmissions / s.totalSubmissions) * 100)
          : 0;
      let status: "Belum Mulai" | "Terhambat" | "Sesuai Jadwal" = "Sesuai Jadwal";
      if (progress === 0) status = "Belum Mulai";
      else if (progress < 50) status = "Terhambat";

      return {
        id: String(idx + 1),
        schoolName: s.schoolName,
        schoolId: `ID: ${String(20200000 + idx + 1).padStart(8, "0")}`,
        wilayah: s.city,
        province: s.province,
        program: "IMPACT Challenge Semester",
        status,
        progress,
        avgHcs: Math.round(avgHcs * 10) / 10,
        students: s.students,
        completedChallenges: s.completedSubmissions,
      };
    });

    // Wilayah progress — aggregate by city
    const cityMap = new Map<string, { total: number; completed: number }>();
    for (const entry of Array.from(schoolMap.values())) {
      const city = entry.city;
      if (!cityMap.has(city)) cityMap.set(city, { total: 0, completed: 0 });
      const c = cityMap.get(city)!;
      c.total += entry.totalSubmissions;
      c.completed += entry.completedSubmissions;
    }
    const wilayahProgressData = Array.from(cityMap.entries()).map(([name, { total, completed }]) => {
      const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
      let color: "green" | "teal" | "gray" | "red" = "gray";
      if (pct >= 80) color = "green";
      else if (pct >= 60) color = "teal";
      else if (pct < 30) color = "red";
      return { name, percentage: pct, color };
    });

    // KPI stats: calculated from actual database records
    const studentsWithHcs = await prisma.user.findMany({
      where: { role: "STUDENT" },
      include: { humanCapitalScore: true },
    });
    
    const validScores = studentsWithHcs.filter(s => s.humanCapitalScore);
    const globalAvgHcs = validScores.length > 0
      ? validScores.reduce((sum, s) => sum + (s.humanCapitalScore?.totalScore ?? 0), 0) / validScores.length
      : 0;

    const teacherCount = await prisma.user.count({
      where: { role: "TEACHER" },
    });

    const totalSubmissions = await prisma.submission.count();
    const completedSubmissions = await prisma.submission.count({ where: { status: "COMPLETED" } });
    const pendingCount = await prisma.submission.count({
      where: { status: { in: ["IN_PROGRESS", "SUBMITTED", "REVISION_REQUESTED"] } },
    });
    const overallProgress =
      totalSubmissions > 0 ? Math.round((completedSubmissions / totalSubmissions) * 100) : 0;

    const kpiData = [
      {
        title: "Program Berjalan",
        value: `${completedSubmissions} / ${totalSubmissions}`,
        sub: `${pendingCount} masih dalam proses`,
        subIsPositive: pendingCount < totalSubmissions * 0.5,
        type: "running" as const,
      },
      {
        title: "Skor SDM Global",
        value: `${globalAvgHcs.toFixed(1)}%`,
        sub: "Rata-rata HCS seluruh siswa",
        type: "target" as const,
      },
      {
        title: "Perlu Perhatian",
        value: String(schoolProgramData.filter((s) => s.status === "Terhambat" || s.status === "Belum Mulai").length),
        sub: "Sekolah membutuhkan tindak lanjut",
        subIsPositive: false,
        type: "attention" as const,
      },
      {
        title: "Jumlah Guru",
        value: `${teacherCount} Guru`,
        sub: "Fasilitator bimbingan terdaftar",
        type: "budget" as const,
      },
    ];

    return NextResponse.json({
      success: true,
      data: {
        kpiData,
        wilayahProgressData,
        schoolProgramData,
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("GET /api/dinas/monitoring error:", msg);
    return NextResponse.json({ error: "Gagal mengambil data monitoring" }, { status: 500 });
  }
}
