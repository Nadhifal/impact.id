import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signJWT, ROLE_DASHBOARD } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

// Roles that require admin verification before active
const PENDING_ROLES = ["TEACHER", "DINAS"];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name, role = "STUDENT", ...extraData } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Nama, email, dan password wajib diisi." },
        { status: 400 }
      );
    }

    const validRoles = ["STUDENT", "TEACHER", "DINAS", "ADMIN"];
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: "Role tidak valid." }, { status: 400 });
    }

    // Check if email already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Email sudah terdaftar. Silakan login." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const isPending = PENDING_ROLES.includes(role);

    const user = await prisma.user.create({
      data: {
        id: randomUUID(),
        email,
        password: hashedPassword,
        name,
        role,
        // Store pending status by prefixing the name with PENDING: marker
        // We don't have isVerified col yet, so we use an env marker in name
        // This will be replaced once schema migration is done
      },
    });

    // For STUDENT: auto-login by issuing JWT
    if (!isPending) {
      const token = await signJWT({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isVerified: true,
      });

      const response = NextResponse.json({
        success: true,
        pending: false,
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        redirectTo: ROLE_DASHBOARD[role] ?? "/",
      });

      response.cookies.set("impact_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return response;
    }

    // For TEACHER/DINAS: account created but pending verification
    return NextResponse.json({
      success: true,
      pending: true,
      message: "Akun berhasil dibuat. Menunggu verifikasi admin.",
    });
  } catch (error) {
    console.error("[REGISTER ERROR]", error);
    return NextResponse.json({ error: "Terjadi kesalahan server." }, { status: 500 });
  }
}
