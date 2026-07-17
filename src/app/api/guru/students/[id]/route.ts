import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/guru/students/[id] — Detail HCS for a specific student (radar chart + trend)
export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const student = await prisma.user.findUnique({
      where: { id },
      include: {
        humanCapitalScore: true,
        assessments: {
          orderBy: { createdAt: "asc" },
        },
        submissions: {
          include: {
            challenge: { select: { title: true, category: true } },
            verification: {
              select: { feedback: true, isApproved: true, createdAt: true },
            },
          },
          orderBy: { createdAt: "desc" },
        },
        profile: true,
      },
    });

    if (!student) {
      return NextResponse.json({ error: "Siswa tidak ditemukan" }, { status: 404 });
    }

    // Radar chart data from HumanCapitalScore
    const hcs = student.humanCapitalScore;
    const radarData = hcs
      ? [
          { subject: "Leadership", value: Math.round(hcs.leadership), fullMark: 100 },
          { subject: "Komunikasi", value: Math.round(hcs.communication), fullMark: 100 },
          { subject: "Kolaborasi", value: Math.round(hcs.collaboration), fullMark: 100 },
          { subject: "Kreativitas", value: Math.round(hcs.creativity), fullMark: 100 },
          { subject: "Problem Solving", value: Math.round(hcs.problemSolving), fullMark: 100 },
        ]
      : [];

    // Trend data from assessments (simulate monthly HCS progression)
    const trendData = student.assessments.map((a, idx) => {
      const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
      const monthIdx = a.createdAt.getMonth();
      return {
        bulan: months[monthIdx],
        hcs: Math.round(a.score),
      };
    });

    // If no assessments but HCS exists, provide a single data point
    if (trendData.length === 0 && hcs) {
      trendData.push({ bulan: "Jul", hcs: Math.round(hcs.totalScore) });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: student.id,
        name: student.name,
        email: student.email,
        school: student.profile?.schoolName ?? "—",
        totalScore: hcs?.totalScore ?? 0,
        radarData,
        trendData,
        submissions: student.submissions.map((s) => ({
          id: s.id,
          title: s.challenge.title,
          category: s.challenge.category,
          status: s.status,
          feedback: s.verification?.feedback ?? null,
          isApproved: s.verification?.isApproved ?? null,
        })),
      },
    });
  } catch (error: any) {
    console.error("GET /api/guru/students/[id] error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil detail siswa", details: error.message },
      { status: 500 }
    );
  }
}
