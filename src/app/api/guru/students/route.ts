import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/guru/students — List students mentored by this teacher (via Verification)
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const teacherId = url.searchParams.get("teacherId");

    let whereClause: any = {};
    if (teacherId) {
      // Find the teacher's schoolName from their profile
      const teacherProfile = await prisma.profile.findUnique({
        where: { userId: teacherId },
        select: { schoolName: true },
      });
      if (teacherProfile?.schoolName) {
        whereClause = {
          profile: {
            schoolName: teacherProfile.schoolName,
          },
        };
      } else {
        // Fallback: if teacher has no profile or schoolName, find by verification
        const verifications = await prisma.verification.findMany({
          where: { teacherId },
          select: { submission: { select: { userId: true } } },
        });
        const studentIds = [...new Set(verifications.map((v) => v.submission.userId))];
        whereClause = { id: { in: studentIds } };
      }
    }

    // Default: get all students
    const students = await prisma.user.findMany({
      where: { role: "STUDENT", ...whereClause },
      include: {
        humanCapitalScore: true,
        profile: { select: { schoolName: true } },
        submissions: {
          select: { status: true },
        },
      },
      orderBy: { name: "asc" },
    });

    const mapped = students.map((s) => ({
      id: s.id,
      name: s.name,
      email: s.email,
      school: s.profile?.schoolName ?? "—",
      hcs: s.humanCapitalScore?.totalScore ?? 0,
      leadership: s.humanCapitalScore?.leadership ?? 0,
      creativity: s.humanCapitalScore?.creativity ?? 0,
      collaboration: s.humanCapitalScore?.collaboration ?? 0,
      communication: s.humanCapitalScore?.communication ?? 0,
      problemSolving: s.humanCapitalScore?.problemSolving ?? 0,
      totalSubmissions: s.submissions.length,
      completedSubmissions: s.submissions.filter((sub) => sub.status === "COMPLETED").length,
      initials: s.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase(),
    }));

    // KPIs
    const allHcs = mapped.filter((m) => m.hcs > 0).map((m) => m.hcs);
    const avgHcs =
      allHcs.length > 0
        ? Math.round((allHcs.reduce((a, b) => a + b, 0) / allHcs.length) * 10) / 10
        : 0;
    const needAttention = mapped.filter((m) => m.hcs < 60).length;

    return NextResponse.json({
      success: true,
      data: {
        students: mapped,
        kpis: {
          totalStudents: mapped.length,
          avgHcs,
          needAttention,
        },
      },
    });
  } catch (error: any) {
    console.error("GET /api/guru/students error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data siswa", details: error.message },
      { status: 500 }
    );
  }
}
