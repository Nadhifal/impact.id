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
        verification: true
      },
      orderBy: { updatedAt: "desc" }
    });

    return NextResponse.json({
      success: true,
      data: submissions
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

    const autoVerificationSetting = await prisma.landingPageContent.findUnique({
      where: { key: "autoVerificationEnabled" }
    });

    const autoVerificationEnabled = autoVerificationSetting
      ? JSON.parse(autoVerificationSetting.value)
      : false;

    // Upsert submission (if already exists, update proof and status according to admin setting)
    // We search by userId + challengeId
    const existingSubmission = await prisma.submission.findFirst({
      where: { userId, challengeId }
    });

    let submission;
    if (existingSubmission) {
      submission = await prisma.submission.update({
        where: { id: existingSubmission.id },
        data: {
          proofUrl,
          report,
          status: autoVerificationEnabled ? "COMPLETED" : "SUBMITTED"
        }
      });

      if (!autoVerificationEnabled) {
        await prisma.verification.deleteMany({
          where: { submissionId: submission.id }
        });
      }
    } else {
      submission = await prisma.submission.create({
        data: {
          userId,
          challengeId,
          proofUrl,
          report,
          status: autoVerificationEnabled ? "COMPLETED" : "SUBMITTED"
        }
      });
    }

    if (autoVerificationEnabled) {
      const verifier =
        (await prisma.user.findFirst({ where: { role: "TEACHER" } })) ||
        (await prisma.user.findFirst({ where: { role: "ADMIN" } }));

      if (verifier) {
        await prisma.verification.upsert({
          where: { submissionId: submission.id },
          update: {
            teacherId: verifier.id,
            feedback: "Verifikasi otomatis saat submit challenge.",
            isApproved: true
          },
          create: {
            submissionId: submission.id,
            teacherId: verifier.id,
            feedback: "Verifikasi otomatis saat submit challenge.",
            isApproved: true
          }
        });
      }
    }

    // Purge cache to force Next.js to fetch fresh DB data
    revalidatePath("/siswa/portofolio");
    revalidatePath("/siswa/notifications");
    revalidatePath("/guru/verifikasi");

    return NextResponse.json({
      success: true,
      data: submission,
      pending: submission.status === "SUBMITTED",
      status: submission.status
    });
  } catch (error: any) {
    console.error("POST /api/submissions error:", error);
    return NextResponse.json(
      { error: "Gagal memproses submission", details: error.message },
      { status: 500 }
    );
  }
}
