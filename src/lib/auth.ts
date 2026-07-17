import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "impact-id-secret-key-change-in-production"
);

export type JWTPayload = {
  id: string;
  email: string;
  name: string;
  role: string;
  isVerified: boolean;
};

/** Sign a JWT token, expires in 7 days */
export async function signJWT(payload: JWTPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);
}

/** Verify a JWT token and return the payload */
export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

/** Role → default dashboard path mapping */
export const ROLE_DASHBOARD: Record<string, string> = {
  STUDENT: "/siswa/dashboard",
  TEACHER: "/guru/dashboard",
  DINAS: "/dinas/dashboard",
  ADMIN: "/admin/dashboard",
};

/** Role → protected path prefix mapping */
export const ROLE_PREFIX: Record<string, string> = {
  STUDENT: "/siswa",
  TEACHER: "/guru",
  DINAS: "/dinas",
  ADMIN: "/admin",
};

/** Get the role that owns a given pathname */
export function getRoleForPath(pathname: string): string | null {
  for (const [role, prefix] of Object.entries(ROLE_PREFIX)) {
    if (pathname.startsWith(prefix)) return role;
    if (pathname.startsWith(`/api${prefix}`)) return role;
  }
  return null;
}
