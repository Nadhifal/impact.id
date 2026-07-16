import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJWT } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("impact_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyJWT(token);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      include: {
        humanCapitalScore: true,
        profile: true,
        submissions: {
          include: { challenge: true },
          orderBy: { createdAt: "desc" },
        },
        portfolios: true,
        assessments: { orderBy: { createdAt: "desc" }, take: 1 },
      },
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const hcs = user.humanCapitalScore;
    const hasAssessment = !!hcs && hcs.totalScore > 0;

    // Quick stats
    const completedSubmissions = user.submissions.filter(s => s.status === "COMPLETED").length;
    const totalPoints = hcs ? Math.round(hcs.totalScore * 30) : 0; // Derive points from score

    // Active challenge (first IN_PROGRESS or SUBMITTED)
    const activeSub = user.submissions.find(s => s.status === "IN_PROGRESS" || s.status === "SUBMITTED");
    const activeChallenge = activeSub ? {
      title: activeSub.challenge.title,
      category: activeSub.challenge.category,
      deadline: new Date(activeSub.createdAt.getTime() + activeSub.challenge.duration * 24 * 60 * 60 * 1000)
        .toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
      progressPercent: activeSub.status === "SUBMITTED" ? 80 : 40,
      currentStep: activeSub.status === "SUBMITTED" ? 4 : 2,
      totalSteps: 5,
    } : null;

    // HCS scores for the radar chart
    const scores = hcs ? {
      SI: Math.round(hcs.collaboration), // Social Impact → collaboration
      LD: Math.round(hcs.leadership),
      IN: Math.round(hcs.creativity),    // Innovation → creativity
      RL: Math.round(hcs.problemSolving), // Reliability → problemSolving
    } : { SI: 0, LD: 0, IN: 0, RL: 0 };

    return NextResponse.json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        hasAssessment,
        scores,
        overallScore: hcs ? Math.round(hcs.totalScore) : 0,
        totalPoints,
        quickStats: {
          challengesCompleted: completedSubmissions,
          hoursOfImpact: completedSubmissions * 24, // Estimate
        },
        activeChallenge,
      },
    });
  } catch (error) {
    console.error("[SISWA DASHBOARD API ERROR]", error);
    return NextResponse.json({ error: "Gagal mengambil data dashboard" }, { status: 500 });
  }
}
