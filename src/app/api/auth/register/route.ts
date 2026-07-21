import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signJWT, ROLE_DASHBOARD } from "@/lib/auth";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

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

    const autoVerificationSetting = await prisma.landingPageContent.findUnique({
      where: { key: "autoVerificationEnabled" }
    });
    const autoVerificationEnabled = autoVerificationSetting
      ? JSON.parse(autoVerificationSetting.value)
      : false;

    const autoApprovalTeacherSetting =
      await prisma.landingPageContent.findUnique({
        where: { key: "autoApprovalTeacherAccountsEnabled" }
      });
    const autoApprovalDinasSetting = await prisma.landingPageContent.findUnique(
      {
        where: { key: "autoApprovalDinasAccountsEnabled" }
      }
    );

    const autoApprovalTeacherAccountsEnabled =
      autoApprovalTeacherSetting !== null
        ? JSON.parse(autoApprovalTeacherSetting.value)
        : autoVerificationEnabled;
    const autoApprovalDinasAccountsEnabled =
      autoApprovalDinasSetting !== null
        ? JSON.parse(autoApprovalDinasSetting.value)
        : autoVerificationEnabled;

    const shouldBePending =
      (role === "TEACHER" && !autoApprovalTeacherAccountsEnabled) ||
      (role === "DINAS" && !autoApprovalDinasAccountsEnabled);

    const hashedPassword = await bcrypt.hash(password, 10);
    const storedPassword = shouldBePending
      ? `PENDING_${hashedPassword}`
      : hashedPassword;

    const user = await prisma.user.create({
      data: {
        id: randomUUID(),
        email,
        password: storedPassword,
        name,
        role
      }
    });

    // Create Profile where applicable
    if (role === "STUDENT" || extraData.school || extraData.province) {
      await prisma.profile.create({
        data: {
          userId: user.id,
          schoolName: extraData.school || null,
          province: extraData.province || null,
          city: extraData.city || null,
          interests: JSON.stringify(extraData.interests || []),
          talents: JSON.stringify(
            extraData.skills ? extraData.skills.split(",") : []
          )
        }
      });
    }

    if (shouldBePending) {
      return NextResponse.json({
        success: true,
        pending: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    }

    const token = await signJWT({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isVerified: true
    });

    const response = NextResponse.json({
      success: true,
      pending: false,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      redirectTo: ROLE_DASHBOARD[role] ?? "/"
    });

    response.cookies.set("impact_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/"
    });

    return response;
  } catch (error) {
    console.error("[REGISTER ERROR]", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
