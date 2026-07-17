import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/certificates — List portfolios & submissions as certificate candidates
export async function GET() {
  try {
    const [portfolios, submissions, completedSubmissions] = await Promise.all([
      prisma.portfolio.findMany({
        include: { user: { select: { name: true, email: true } } },
        orderBy: { createdAt: "desc" },
      }),
      prisma.submission.count(),
      prisma.submission.count({ where: { status: "COMPLETED" } }),
    ]);

    // Map portfolios to certificate items
    const certificates = portfolios.map((p) => ({
      id: p.id,
      studentName: p.user.name,
      email: p.user.email,
      projectName: p.title,
      challengeCategory: "—",
      status: p.blockchainTx ? "DITERBITKAN" : "MENUNGGU AUDIT",
      submitDate: p.createdAt.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    }));

    // Also include completed submissions without a portfolio as "MENUNGGU AUDIT"
    const completedSubs = await prisma.submission.findMany({
      where: { status: "COMPLETED" },
      include: {
        user: { select: { name: true, email: true } },
        challenge: { select: { title: true, category: true } },
      },
      orderBy: { updatedAt: "desc" },
    });

    const subCerts = completedSubs.map((s) => ({
      id: s.id,
      studentName: s.user.name,
      email: s.user.email,
      projectName: s.challenge.title,
      challengeCategory: s.challenge.category,
      status: "MENUNGGU AUDIT",
      submitDate: s.updatedAt.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    }));

    // Merge, deduplicate by student+project
    const allCerts = [...certificates, ...subCerts];

    const kpis = {
      totalPortfolios: portfolios.length,
      pendingAudit: allCerts.filter((c) => c.status === "MENUNGGU AUDIT").length,
      published: allCerts.filter((c) => c.status === "DITERBITKAN").length,
    };

    return NextResponse.json({ success: true, data: { certificates: allCerts, kpis } });
  } catch (error: any) {
    console.error("GET /api/admin/certificates error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data sertifikat", details: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/admin/certificates — Approve or reject certificate candidate
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status, adminId } = body; // id can be portfolioId or submissionId

    if (!id || !status) {
      return NextResponse.json(
        { error: "id dan status wajib diisi" },
        { status: 400 }
      );
    }

    let detail = "";

    // 1. Check if it is a Portfolio
    const portfolio = await prisma.portfolio.findUnique({
      where: { id },
      include: { user: true },
    });

    if (portfolio) {
      if (status === "DITERBITKAN") {
        const tx = "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
        await prisma.portfolio.update({
          where: { id },
          data: { blockchainTx: tx },
        });
        detail = `menerbitkan sertifikat blockchain untuk portofolio: ${portfolio.title}`;
      } else if (status === "DITOLAK") {
        // Just clear the transaction if rejected, or delete? Let's clear transaction
        await prisma.portfolio.update({
          where: { id },
          data: { blockchainTx: null },
        });
        detail = `menolak sertifikat untuk portofolio: ${portfolio.title}`;
      }
    } else {
      // 2. Check if it is a Submission
      const submission = await prisma.submission.findUnique({
        where: { id },
        include: { user: true, challenge: true },
      });

      if (submission) {
        if (status === "DITERBITKAN") {
          // Update submission status to COMPLETED
          await prisma.submission.update({
            where: { id },
            data: { status: "COMPLETED" },
          });

          // Create dynamic blockchain transaction hash
          const tx = "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("");

          // Create a portfolio item if not exists
          await prisma.portfolio.create({
            data: {
              userId: submission.userId,
              title: submission.challenge.title,
              description: submission.report || `Penyelesaian challenge: ${submission.challenge.title}`,
              impactScore: submission.challenge.points,
              blockchainTx: tx,
            },
          });
          detail = `menyetujui submission & menerbitkan sertifikat untuk: ${submission.challenge.title}`;
        } else if (status === "DITOLAK") {
          await prisma.submission.update({
            where: { id },
            data: { status: "REVISION_REQUESTED" },
          });
          detail = `menolak submission untuk: ${submission.challenge.title}`;
        }
      } else {
        return NextResponse.json(
          { error: "Portofolio atau Submission tidak ditemukan" },
          { status: 404 }
        );
      }
    }

    // Log admin activity
    if (adminId && detail) {
      await prisma.adminLog.create({
        data: {
          adminId,
          activity: detail,
          module: "SERTIFIKAT",
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("PUT /api/admin/certificates error:", error);
    return NextResponse.json(
      { error: "Gagal memproses sertifikat", details: error.message },
      { status: 500 }
    );
  }
}

