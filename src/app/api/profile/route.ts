import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJWT, signJWT } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("impact_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyJWT(token);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: payload.id },
    include: { profile: true },
  });

  if (!user) return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });

  return NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatarUrl: user.avatarUrl ?? null,
    profile: user.profile,
  });
}

export async function PATCH(req: NextRequest) {
  const token = req.cookies.get("impact_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyJWT(token);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { name, schoolName, province, city, interests, talents } = body;

    // Update user name
    const updatedUser = await prisma.user.update({
      where: { id: payload.id },
      data: {
        ...(name ? { name } : {}),
      },
    });

    // Upsert profile
    const hasProfileData = [schoolName, province, city, interests, talents].some(
      (v) => v !== undefined
    );

    if (hasProfileData) {
      await prisma.profile.upsert({
        where: { userId: payload.id },
        update: {
          ...(schoolName !== undefined ? { schoolName } : {}),
          ...(province !== undefined ? { province } : {}),
          ...(city !== undefined ? { city } : {}),
          ...(interests !== undefined
            ? { interests: JSON.stringify(Array.isArray(interests) ? interests : [interests]) }
            : {}),
          ...(talents !== undefined
            ? { talents: JSON.stringify(Array.isArray(talents) ? talents : [talents]) }
            : {}),
        },
        create: {
          userId: payload.id,
          schoolName: schoolName ?? "",
          province: province ?? "",
          city: city ?? "",
          interests: JSON.stringify(Array.isArray(interests) ? interests : []),
          talents: JSON.stringify(Array.isArray(talents) ? talents : []),
        },
      });
    }

    // Re-issue JWT with updated name so header reflects change immediately
    const newToken = await signJWT({
      id: payload.id,
      email: payload.email,
      name: updatedUser.name,
      role: payload.role,
      isVerified: payload.isVerified,
    });

    const response = NextResponse.json({ success: true, name: updatedUser.name });
    response.cookies.set("impact_token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[PROFILE UPDATE ERROR]", error);
    return NextResponse.json({ error: "Gagal memperbarui profil." }, { status: 500 });
  }
}
