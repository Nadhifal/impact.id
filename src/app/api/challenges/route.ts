import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

// GET /api/challenges?search=&category=
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") ?? "";
    const category = searchParams.get("category") ?? "";

    const challenges = await prisma.challenge.findMany({
      where: {
        ...(search ? { title: { contains: search } } : {}),
        ...(category && category !== "all" ? { category } : {}),
      },
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { submissions: true } },
      },
    });

    return NextResponse.json({ success: true, data: challenges });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("GET /api/challenges error:", msg);
    return NextResponse.json({ error: "Gagal mengambil data challenges" }, { status: 500 });
  }
}

// POST /api/challenges  — Admin create new challenge
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, category, location, duration, points, target } = body;

    if (!title || !description || !category) {
      return NextResponse.json(
        { error: "Field 'title', 'description', dan 'category' wajib diisi" },
        { status: 400 }
      );
    }

    const challenge = await prisma.challenge.create({
      data: {
        title,
        description: description ?? "",
        category,
        location: location ?? "Online",
        duration: Number(duration) || 14,
        points: Number(points) || 100,
        target: target ?? "Semua tingkat",
      },
    });

    // Revalidate the student challenges page so it shows the new challenge
    // on next navigation (purges Next.js Router Cache)
    revalidatePath("/siswa/challenges");
    revalidatePath("/admin/manage-challenge");

    return NextResponse.json({ success: true, data: challenge }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("POST /api/challenges error:", msg);
    return NextResponse.json({ error: "Gagal membuat challenge" }, { status: 500 });
  }
}
