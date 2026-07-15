import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// GET /api/submissions
export async function GET() {
  try {
    const submissions = await prisma.submission.findMany({
      include: {
        user: {
          include: { profile: true }
        },
        challenge: true,
        verification: true,
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: submissions,
    });
  } catch (error: any) {
    console.error("GET /api/submissions error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data submission", details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/submissions
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, challengeId, proofUrl, report } = body;

    if (!userId || !challengeId) {
      return NextResponse.json(
        { error: "userId dan challengeId wajib diisi" },
        { status: 400 }
      );
    }

    // Upsert submission (if already exists, update proof and status to SUBMITTED)
    // We search by userId + challengeId
    const existingSubmission = await prisma.submission.findFirst({
      where: { userId, challengeId },
    });

    let submission;
    if (existingSubmission) {
      submission = await prisma.submission.update({
        where: { id: existingSubmission.id },
        data: {
          proofUrl,
          report,
          status: "SUBMITTED",
        },
      });
    } else {
      submission = await prisma.submission.create({
        data: {
          userId,
          challengeId,
          proofUrl,
          report,
          status: "SUBMITTED",
        },
      });
    }

    // Purge cache to force Next.js to fetch fresh DB data
    revalidatePath("/siswa/portofolio");
    revalidatePath("/siswa/notifications");
    revalidatePath("/guru/verifikasi");

    return NextResponse.json({
      success: true,
      data: submission,
    });
  } catch (error: any) {
    console.error("POST /api/submissions error:", error);
    return NextResponse.json(
      { error: "Gagal memproses submission", details: error.message },
      { status: 500 }
    );
  }
}
