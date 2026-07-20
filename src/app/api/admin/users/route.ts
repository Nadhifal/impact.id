import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// GET /api/admin/users — List all users with KPI counts
export async function GET() {
  try {
    const [users, studentCount, teacherCount, dinasCount, adminCount] =
      await Promise.all([
        prisma.user.findMany({
          include: { profile: true },
          orderBy: { createdAt: "desc" }
        }),
        prisma.user.count({ where: { role: "STUDENT" } }),
        prisma.user.count({ where: { role: "TEACHER" } }),
        prisma.user.count({ where: { role: "DINAS" } }),
        prisma.user.count({ where: { role: "ADMIN" } })
      ]);

    return NextResponse.json({
      success: true,
      data: {
        users: users.map((u) => {
          const isPending = u.password.startsWith("PENDING_");
          return {
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role,
            school: u.profile?.schoolName ?? "—",
            status: isPending ? "MENUNGGU VERIFIKASI" : "AKTIF",
            isPending,
            joinDate: u.createdAt.toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric"
            }),
            createdAt: u.createdAt
          };
        }),
        kpis: {
          students: studentCount,
          teachers: teacherCount,
          dinas: dinasCount,
          admins: adminCount
        }
      }
    });
  } catch (error: any) {
    console.error("GET /api/admin/users error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data pengguna", details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/admin/users — Create a new user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role, adminId } = body;

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "Semua field wajib diisi (name, email, password, role)" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role }
    });

    // Log activity
    if (adminId) {
      await prisma.adminLog.create({
        data: {
          adminId,
          activity: `menambahkan pengguna baru:`,
          highlight: `${name} (${role})`,
          module: "USER"
        }
      });
    }

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/admin/users error:", error);
    return NextResponse.json(
      { error: "Gagal membuat pengguna", details: error.message },
      { status: 500 }
    );
  }
}
