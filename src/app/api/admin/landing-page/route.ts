import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/landing-page — Get all landing page content
export async function GET() {
  try {
    const contents = await prisma.landingPageContent.findMany();
    const result: Record<string, any> = {};
    for (const c of contents) {
      try {
        result[c.key] = JSON.parse(c.value);
      } catch {
        result[c.key] = c.value;
      }
    }
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("GET /api/admin/landing-page error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data landing page", details: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/admin/landing-page — Upsert landing page content
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { key, value, adminId } = body;

    if (!key || value === undefined) {
      return NextResponse.json(
        { error: "key dan value wajib diisi" },
        { status: 400 }
      );
    }

    const content = await prisma.landingPageContent.upsert({
      where: { key },
      update: { value: typeof value === "string" ? value : JSON.stringify(value) },
      create: { key, value: typeof value === "string" ? value : JSON.stringify(value) },
    });

    if (adminId) {
      await prisma.adminLog.create({
        data: {
          adminId,
          activity: `mengubah konten landing page:`,
          highlight: key,
          module: "PENGATURAN",
        },
      });
    }

    return NextResponse.json({ success: true, data: content });
  } catch (error: any) {
    console.error("PUT /api/admin/landing-page error:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan data landing page", details: error.message },
      { status: 500 }
    );
  }
}
