import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJWT } from "@/lib/auth";

// GET /api/dinas/reports — Fetch reports dynamically generated from real DB activities
export async function GET(req: NextRequest) {
  const token = req.cookies.get("impact_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyJWT(token);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const schools = await prisma.profile.groupBy({
      by: ["schoolName"],
      _count: { userId: true },
    });

    const completedSubmissions = await prisma.submission.findMany({
      where: { status: "COMPLETED" },
      include: { user: { select: { name: true } } },
      orderBy: { updatedAt: "desc" },
      take: 10,
    });

    const reportHistory = completedSubmissions.map((sub, idx) => ({
      id: sub.id,
      name: `Laporan Capaian ${sub.user.name}`,
      periode: sub.updatedAt.toLocaleDateString("id-ID", { month: "long", year: "numeric" }),
      format: (idx % 2 === 0 ? "PDF" : "Excel") as "PDF" | "Excel",
      createdAt: sub.updatedAt.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    }));

    // Add aggregate reports
    const aggregateReports = schools.map((school, idx) => ({
      id: `agg-${idx}`,
      name: `Rekap Kualitas SDM — ${school.schoolName ?? "Institusi"}`,
      periode: "Semester genap 2026",
      format: "Excel" as const,
      createdAt: new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    }));

    return NextResponse.json({
      success: true,
      data: [...aggregateReports, ...reportHistory],
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("GET /api/dinas/reports error:", msg);
    return NextResponse.json({ error: "Gagal mengambil data laporan" }, { status: 500 });
  }
}
