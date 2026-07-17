import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// PUT /api/admin/users/[id] — Update user
export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { name, email, role, adminId } = body;

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(role && { role }),
      },
    });

    if (adminId) {
      await prisma.adminLog.create({
        data: {
          adminId,
          activity: `mengedit data pengguna:`,
          highlight: `${user.name} (${user.role})`,
          module: "USER",
        },
      });
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error: any) {
    console.error("PUT /api/admin/users/[id] error:", error);
    return NextResponse.json(
      { error: "Gagal mengedit pengguna", details: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users/[id] — Delete user
export async function DELETE(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const url = new URL(request.url);
    const adminId = url.searchParams.get("adminId");

    const user = await prisma.user.delete({ where: { id } });

    if (adminId) {
      await prisma.adminLog.create({
        data: {
          adminId,
          activity: `menghapus akun pengguna:`,
          highlight: `${user.name} (${user.email})`,
          module: "USER",
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/admin/users/[id] error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus pengguna", details: error.message },
      { status: 500 }
    );
  }
}
