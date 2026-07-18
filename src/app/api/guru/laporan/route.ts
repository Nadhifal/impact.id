import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJWT } from "@/lib/auth";

// GET /api/guru/laporan — Summary capaian siswa for laporan page
export async function GET(req: NextRequest) {
  const token = req.cookies.get("impact_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyJWT(token);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const url = new URL(req.url);
    const studentId = url.searchParams.get("studentId");

    // Base: all students or single student
    const whereClause = studentId ? { id: studentId } : {};

    const students = await prisma.user.findMany({
      where: { role: "STUDENT", ...whereClause },
      include: {
        humanCapitalScore: true,
        submissions: {
          where: { status: "COMPLETED" },
          include: { challenge: { select: { title: true, points: true } } },
          orderBy: { updatedAt: "desc" },
        },
        portfolios: { orderBy: { createdAt: "desc" } },
      },
      orderBy: { name: "asc" },
    });

    // Build per-student capaian summary
    const summaries = students.map((s) => {
      const hcs = s.humanCapitalScore;
      const completedCount = s.submissions.length;
      const sertifikatCount = s.portfolios.filter((p) => p.blockchainTx).length;

      return {
        id: s.id,
        name: s.name,
        capaian: {
          challengesCompleted: completedCount,
          hcsTerkini: hcs ? Math.round(hcs.totalScore * 10) / 10 : 0,
          sertifikatTerbit: sertifikatCount,
        },
        recentSubmissions: s.submissions.slice(0, 5).map((sub) => ({
          id: sub.id,
          title: sub.challenge.title,
          points: sub.challenge.points,
          completedAt: sub.updatedAt.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        })),
      };
    });

    // Riwayat laporan — derived from completed submissions, one entry per student per period
    const riwayat = students.flatMap((s) =>
      s.submissions.slice(0, 3).map((sub, idx) => ({
        id: `${s.id}-${idx}`,
        format: "PDF" as const,
        name: `Capaian ${s.name}`,
        periode: sub.updatedAt.toLocaleDateString("id-ID", { month: "long", year: "numeric" }),
        createdAt: sub.updatedAt.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        studentId: s.id,
        studentName: s.name,
      }))
    );

    return NextResponse.json({
      success: true,
      data: {
        summaries,
        riwayat: riwayat.slice(0, 20),
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("GET /api/guru/laporan error:", msg);
    return NextResponse.json({ error: "Gagal mengambil data laporan" }, { status: 500 });
  }
}
