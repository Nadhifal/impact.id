import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/users/[id]/notifications
export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    // Fetch submissions that are either COMPLETED or REVISION_REQUESTED
    const submissions = await prisma.submission.findMany({
      where: {
        userId: id,
        status: {
          in: ["COMPLETED", "REVISION_REQUESTED"],
        },
      },
      include: {
        challenge: true,
        verification: true,
      },
      orderBy: { updatedAt: "desc" },
    });

    // Map to NotificationItem shape
    const dbNotifications = submissions.map((sub) => {
      const isApproved = sub.status === "COMPLETED";
      return {
        id: sub.id,
        type: "challenges",
        title: isApproved ? "Your challenge was verified" : "Revision requested",
        description: isApproved
          ? `Congratulations! Your submission for "${sub.challenge.title}" has been reviewed and verified. You've earned ${sub.challenge.points} Impact Points.`
          : `Teacher requested a revision for "${sub.challenge.title}": "${sub.verification?.feedback || "Tidak ada catatan feedback."}"`,
        time: "Baru saja",
        isUnread: true,
        icon: isApproved ? "shield" : "mail",
        actionText: isApproved ? "View Badge >" : "Revisi Sekarang >",
        actionHref: `/siswa/challenges/${sub.challengeId}`,
      };
    });

    // Also include some general dummy notifications so the page isn't totally empty if no DB submissions
    const finalNotifications = [
      ...dbNotifications,
      {
        id: "d-1",
        type: "milestones",
        title: "Social Impact Level Up!",
        description: "You've reached Level 4: \"Community Advocate\". Your influence radius has expanded, unlocking new collaborative challenges.",
        time: "1 hari lalu",
        isUnread: false,
        icon: "trophy",
      }
    ];

    return NextResponse.json({
      success: true,
      data: finalNotifications,
    });
  } catch (error: any) {
    console.error("GET /api/users/[id]/notifications error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data notifikasi", details: error.message },
      { status: 500 }
    );
  }
}
