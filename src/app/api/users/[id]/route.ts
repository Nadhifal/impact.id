import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/users/[id]
export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        humanCapitalScore: true,
        portfolios: { orderBy: { createdAt: "desc" } },
        submissions: {
          include: { challenge: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
    }

    // Parse JSON strings from Profile
    const interests: string[] = user.profile?.interests
      ? JSON.parse(user.profile.interests)
      : [];
    const talents: string[] = user.profile?.talents
      ? JSON.parse(user.profile.talents)
      : [];

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        schoolName: user.profile?.schoolName ?? null,
        province: user.profile?.province ?? null,
        city: user.profile?.city ?? null,
        interests,
        talents,
        humanCapitalScore: user.humanCapitalScore,
        totalPortfolios: user.portfolios.length,
        totalSubmissions: user.submissions.length,
        completedSubmissions: user.submissions.filter(
          (s) => s.status === "COMPLETED"
        ).length,
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("GET /api/users/[id] error:", msg);
    return NextResponse.json({ error: "Gagal mengambil data user" }, { status: 500 });
  }
}
