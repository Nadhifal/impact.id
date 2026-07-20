import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendUserApprovalEmail } from "@/lib/email";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// PUT /api/admin/users/[id] — Update user
export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { name, email, role, approvePending, adminId } = body;

    const currentUser = await prisma.user.findUnique({ where: { id } });
    if (!currentUser) {
      return NextResponse.json(
        { error: "Pengguna tidak ditemukan." },
        { status: 404 }
      );
    }

    let data: Record<string, any> = {
      ...(name && { name }),
      ...(email && { email }),
      ...(role && { role })
    };

    if (approvePending && currentUser.password.startsWith("PENDING_")) {
      data.password = currentUser.password.replace(/^PENDING_/, "");
    }

    const user = await prisma.user.update({
      where: { id },
      data
    });

    if (approvePending && currentUser.password.startsWith("PENDING_")) {
      await sendUserApprovalEmail(user.email, user.name, user.role);
    }

    if (adminId) {
      await prisma.adminLog.create({
        data: {
          adminId,
          activity: approvePending
            ? `menyetujui akun pending:`
            : `mengedit data pengguna:`,
          highlight: `${user.name} (${user.role})`,
          module: "USER"
        }
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
          module: "USER"
        }
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
