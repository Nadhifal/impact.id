import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/challenges/[id]
export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const challenge = await prisma.challenge.findUnique({ where: { id } });

    if (!challenge) {
      return NextResponse.json({ error: "Challenge tidak ditemukan" }, { status: 404 });
    }

    const guide = [
      { step: 1, title: "Pahami Masalah", description: "Lakukan wawancara singkat dengan 3 pihak terkait." },
      { step: 2, title: "Susun Solusi", description: "Buat dokumen perencanaan atau purwarupa (prototype) kasar." },
      { step: 3, title: "Implementasi & Validasi", description: "Presentasikan solusi kepada mentor atau klien (target)." },
    ];

    return NextResponse.json({ success: true, data: { ...challenge, guide } });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("GET /api/challenges/[id] error:", msg);
    return NextResponse.json({ error: "Terjadi kesalahan internal server" }, { status: 500 });
  }
}

// PUT /api/challenges/[id]  — Admin update challenge
export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { title, description, category, location, duration, points, target } = body;

    const existing = await prisma.challenge.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Challenge tidak ditemukan" }, { status: 404 });
    }

    const updated = await prisma.challenge.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(category !== undefined && { category }),
        ...(location !== undefined && { location }),
        ...(duration !== undefined && { duration: Number(duration) }),
        ...(points !== undefined && { points: Number(points) }),
        ...(target !== undefined && { target }),
      },
    });

    revalidatePath("/siswa/challenges");
    revalidatePath("/admin/manage-challenge");

    return NextResponse.json({ success: true, data: updated });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("PUT /api/challenges/[id] error:", msg);
    return NextResponse.json({ error: "Gagal mengupdate challenge" }, { status: 500 });
  }
}

// DELETE /api/challenges/[id]  — Admin delete challenge
export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const existing = await prisma.challenge.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Challenge tidak ditemukan" }, { status: 404 });
    }

    await prisma.challenge.delete({ where: { id } });

    revalidatePath("/siswa/challenges");
    revalidatePath("/admin/manage-challenge");

    return NextResponse.json({ success: true, message: "Challenge berhasil dihapus" });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("DELETE /api/challenges/[id] error:", msg);
    return NextResponse.json({ error: "Gagal menghapus challenge" }, { status: 500 });
  }
}
