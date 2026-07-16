import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJWT } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("impact_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyJWT(token);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // All students
    const students = await prisma.user.findMany({
      where: { role: "STUDENT" },
      include: {
        humanCapitalScore: true,
        profile: true,
        submissions: {
          include: { challenge: true, verification: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    // KPI calculations
    const totalSiswa = students.length;
    const pendingSubmissions = await prisma.submission.findMany({
      where: { status: "SUBMITTED" },
      include: {
        user: true,
        challenge: true,
      },
      orderBy: { createdAt: "desc" },
    });
    const menungguVerifikasi = pendingSubmissions.length;

    // Average HCS
    const studentsWithHCS = students.filter(s => s.humanCapitalScore);
    const avgHCS = studentsWithHCS.length > 0
      ? studentsWithHCS.reduce((sum, s) => sum + (s.humanCapitalScore?.totalScore ?? 0), 0) / studentsWithHCS.length
      : 0;

    // Students needing attention (HCS < 60)
    const siswaPerhatian = students
      .filter(s => s.humanCapitalScore && s.humanCapitalScore.totalScore < 60)
      .map(s => ({
        id: s.id,
        name: s.name,
        kelas: s.profile?.schoolName
          ? `${s.profile.schoolName}${s.profile.city ? ` — ${s.profile.city}` : ""}`
          : "Belum ada data",
        hcs: Math.round(s.humanCapitalScore!.totalScore),
        trend: s.humanCapitalScore!.totalScore < 55 ? "turun" as const : "stagnan" as const,
        trendDesc: s.humanCapitalScore!.totalScore < 55 ? "Skor rendah" : "Perlu perhatian",
      }));

    // Submissions waiting for review
    const submissionsMenunggu = pendingSubmissions.map(sub => ({
      id: sub.id,
      initials: sub.user.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase(),
      name: sub.user.name,
      projectTitle: sub.challenge.title,
      timeAgo: getTimeAgo(sub.createdAt),
    }));

    return NextResponse.json({
      success: true,
      data: {
        teacherName: payload.name,
        kpi: [
          {
            label: "Siswa bimbingan",
            value: totalSiswa,
            sub: "Total siswa aktif semester ini",
            type: "siswa",
          },
          {
            label: "Menunggu verifikasi",
            value: menungguVerifikasi,
            sub: "Butuh segera ditinjau",
            type: "verifikasi",
          },
          {
            label: "Rata-rata HCS",
            value: avgHCS.toFixed(1).replace(".", ","),
            sub: avgHCS > 0 ? `Dari ${studentsWithHCS.length} siswa` : "Belum ada data",
            type: "hcs",
          },
          {
            label: "Perlu perhatian",
            value: siswaPerhatian.length,
            sub: siswaPerhatian.length > 0 ? "Intervensi diperlukan" : "Semua baik",
            subIsAlert: siswaPerhatian.length > 0,
            type: "perhatian",
          },
        ],
        submissionsMenunggu,
        siswaPerhatian,
      },
    });
  } catch (error) {
    console.error("[GURU STATS API ERROR]", error);
    return NextResponse.json({ error: "Gagal mengambil data statistik guru" }, { status: 500 });
  }
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 60) return `${diffMins} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays === 1) return "1 hari lalu";
  return `${diffDays} hari lalu`;
}
