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

// PUT /api/users/[id]
export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { scores } = body; // Expecting { SI, LD, IN, RL }

    if (!scores) {
      return NextResponse.json({ error: "Data skor tidak boleh kosong" }, { status: 400 });
    }

    const { SI, LD, IN, RL } = scores;

    const leadership = Number(LD) || 0;
    const creativity = Number(IN) || 0;
    const problemSolving = Number(RL) || 0;
    const collaboration = Number(SI) || 0;
    const communication = Number(SI) || 0;
    const totalScore = Math.round((leadership + creativity + problemSolving + collaboration + communication) / 5);

    const hcs = await prisma.humanCapitalScore.upsert({
      where: { userId: id },
      update: {
        leadership,
        creativity,
        problemSolving,
        collaboration,
        communication,
        totalScore,
      },
      create: {
        userId: id,
        leadership,
        creativity,
        problemSolving,
        collaboration,
        communication,
        totalScore,
      },
    });

    return NextResponse.json({
      success: true,
      data: hcs,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("PUT /api/users/[id] error:", msg);
    return NextResponse.json({ error: "Gagal menyimpan hasil asesmen", details: msg }, { status: 500 });
  }
}
