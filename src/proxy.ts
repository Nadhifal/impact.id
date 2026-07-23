import { NextRequest, NextResponse } from "next/server";
import { verifyJWT, ROLE_DASHBOARD, getRoleForPath } from "@/lib/auth";

// Paths accessible by everyone (no auth required)
const PUBLIC_PATHS = [
  "/",
  "/auth/login",
  "/auth/register",
  "/auth/register/guru",
  "/auth/register/dinas",
  "/auth/register/step-2",
  "/auth/register/step-3",
  "/auth/register/pending",
  "/verify",
];

// Paths that start with these prefixes are also public
const PUBLIC_PREFIXES = ["/api/auth/", "/_next/", "/favicon", "/verify/"];

function isPublic(pathname: string): boolean {
  if (PUBLIC_PATHS.includes(pathname)) return true;
  return PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public landing page GET API
  if (pathname === "/api/admin/landing-page" && req.method === "GET") {
    return NextResponse.next();
  }

  // Allow public paths
  if (isPublic(pathname)) return NextResponse.next();

  // Check token
  const token = req.cookies.get("impact_token")?.value;

  if (!token) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const payload = await verifyJWT(token);
  if (!payload) {
    if (pathname.startsWith("/api/")) {
      const response = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      response.cookies.set("impact_token", "", { maxAge: 0, path: "/" });
      return response;
    }
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    const response = NextResponse.redirect(loginUrl);
    // Clear invalid cookie
    response.cookies.set("impact_token", "", { maxAge: 0, path: "/" });
    return response;
  }

  // Check if the route belongs to a specific role
  const requiredRole = getRoleForPath(pathname);

  if (requiredRole && payload.role !== requiredRole) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    // Redirect to user's own dashboard
    const dashboardUrl = new URL(
      ROLE_DASHBOARD[payload.role] ?? "/auth/login",
      req.url
    );
    return NextResponse.redirect(dashboardUrl);
  }

  // All good — pass through, add user info to request headers for SSR
  const response = NextResponse.next();
  response.headers.set("x-user-id", payload.id);
  response.headers.set("x-user-role", payload.role);
  return response;
}

export const config = {
  // Run middleware on all routes except static files
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};
