import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// POST /api/submissions/[id]/verify
export async function POST(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { teacherId, feedback, isApproved } = body;

    if (!teacherId) {
      return NextResponse.json(
        { error: "teacherId wajib diisi" },
        { status: 400 }
      );
    }

    const submissionStatus = isApproved ? "COMPLETED" : "REVISION_REQUESTED";

    // 1. Update submission status
    const submission = await prisma.submission.update({
      where: { id },
      data: {
        status: submissionStatus,
      },
    });

    // 2. Create or update Verification record
    const verification = await prisma.verification.upsert({
      where: { submissionId: id },
      update: {
        teacherId,
        feedback,
        isApproved,
      },
      create: {
        submissionId: id,
        teacherId,
        feedback,
        isApproved,
      },
    });

    // Purge cache to force Next.js to fetch fresh DB data
    revalidatePath("/siswa/portofolio");
    revalidatePath("/siswa/notifications");
    revalidatePath("/guru/verifikasi");

    return NextResponse.json({
      success: true,
      data: {
        submission,
        verification,
      },
    });
  } catch (error: any) {
    console.error("POST /api/submissions/[id]/verify error:", error);
    return NextResponse.json(
      { error: "Gagal memproses verifikasi", details: error.message },
      { status: 500 }
    );
  }
}
