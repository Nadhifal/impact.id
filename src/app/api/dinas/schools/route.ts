import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/dinas/schools — Aggregate school data from student/teacher profiles
export async function GET() {
  try {
    // Get all profiles with school info
    const profiles = await prisma.profile.findMany({
      where: { schoolName: { not: null } },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            role: true,
            humanCapitalScore: true,
            submissions: {
              select: { status: true },
            },
          },
        },
      },
    });

    // Group by school
    const schoolMap = new Map<string, {
      schoolName: string;
      province: string;
      city: string;
      students: number;
      teachers: number;
      avgHcs: number;
      totalSubmissions: number;
      completedSubmissions: number;
      hcsScores: number[];
    }>();

    for (const p of profiles) {
      const school = p.schoolName ?? "Unknown";
      if (!schoolMap.has(school)) {
        schoolMap.set(school, {
          schoolName: school,
          province: p.province ?? "—",
          city: p.city ?? "—",
          students: 0,
          teachers: 0,
          avgHcs: 0,
          totalSubmissions: 0,
          completedSubmissions: 0,
          hcsScores: [],
        });
      }
      const entry = schoolMap.get(school)!;
      if (p.user.role === "STUDENT") {
        entry.students++;
        if (p.user.humanCapitalScore) {
          entry.hcsScores.push(p.user.humanCapitalScore.totalScore);
        }
      } else if (p.user.role === "TEACHER") {
        entry.teachers++;
      }
      entry.totalSubmissions += p.user.submissions.length;
      entry.completedSubmissions += p.user.submissions.filter(
        (s) => s.status === "COMPLETED"
      ).length;
    }

    const schools = Array.from(schoolMap.values()).map((s) => ({
      ...s,
      avgHcs:
        s.hcsScores.length > 0
          ? Math.round(
              (s.hcsScores.reduce((a, b) => a + b, 0) / s.hcsScores.length) * 10
            ) / 10
          : 0,
      hcsScores: undefined,
    }));

    // Global KPIs
    const totalSchools = schools.length;
    const totalStudents = schools.reduce((a, s) => a + s.students, 0);
    const totalTeachers = schools.reduce((a, s) => a + s.teachers, 0);
    const globalAvgHcs =
      schools.length > 0
        ? Math.round(
            (schools.reduce((a, s) => a + s.avgHcs, 0) / schools.length) * 10
          ) / 10
        : 0;

    return NextResponse.json({
      success: true,
      data: {
        schools,
        kpis: {
          totalSchools,
          totalStudents,
          totalTeachers,
          globalAvgHcs,
        },
      },
    });
  } catch (error: any) {
    console.error("GET /api/dinas/schools error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data sekolah", details: error.message },
      { status: 500 }
    );
  }
}
