import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("impact_token")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const payload = await verifyJWT(token);
  if (!payload) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      role: payload.role,
      isVerified: payload.isVerified,
    },
  });
}
