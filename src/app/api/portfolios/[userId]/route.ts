import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

interface RouteContext {
  params: Promise<{ userId: string }>;
}

// GET /api/portfolios/[userId]
export async function GET(_request: Request, context: RouteContext) {
  try {
    const { userId } = await context.params;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true, humanCapitalScore: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
    }

    const portfolios = await prisma.portfolio.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    // If user has completed submissions, include them as credential sources
    const completedSubmissions = await prisma.submission.findMany({
      where: { userId, status: "COMPLETED" },
      include: { challenge: true, verification: true },
      orderBy: { updatedAt: "desc" },
    });

    // Map submissions to credentials shape
    const credentials = completedSubmissions.map((sub) => ({
      id: sub.id,
      type: "VERIFIED CREDENTIAL",
      title: sub.challenge.title,
      issuer: "IMPACT.ID",
      issuedDate: `Diterbitkan: ${new Date(sub.updatedAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}`,
      blockchainTx:
        sub.verification?.isApproved
          ? "0x" + crypto.createHash("sha256").update(sub.id).digest("hex").slice(0, 40)
          : null,
      isVerified: sub.verification?.isApproved ?? false,
    }));

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          profile: user.profile,
          humanCapitalScore: user.humanCapitalScore,
        },
        portfolios,
        credentials,
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("GET /api/portfolios/[userId] error:", msg);
    return NextResponse.json({ error: "Gagal mengambil data portofolio" }, { status: 500 });
  }
}
