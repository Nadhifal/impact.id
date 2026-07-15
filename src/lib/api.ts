/**
 * Shared API client for IMPACT.ID frontend ↔ Next.js API Routes
 *
 * DEMO_USER_ID: Sementara hardcode sampai auth session tersedia.
 * Ganti nilai ini dengan real session user ID saat auth diintegrasikan.
 */
export const DEMO_USER_ID = "demo-student-1";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ApiChallenge {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  duration: number;
  points: number;
  target: string;
  createdAt: string;
  _count?: { submissions: number };
}

export interface ApiAdminStats {
  totalChallenges: number;
  totalStudents: number;
  totalSubmissions: number;
  completedSubmissions: number;
  completionRate: number;
  challengesByCategory: { category: string; _count: { id: number } }[];
  submissionsByStatus: { status: string; _count: { id: number } }[];
}

export interface ApiCredential {
  id: string;
  type: string;
  title: string;
  issuer: string;
  issuedDate: string;
  blockchainTx: string | null;
  isVerified: boolean;
}

export interface ApiPortfolioData {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    profile: {
      schoolName?: string;
      province?: string;
      city?: string;
      interests: string;
      talents: string;
    } | null;
    humanCapitalScore: {
      leadership: number;
      creativity: number;
      collaboration: number;
      communication: number;
      problemSolving: number;
      totalScore: number;
    } | null;
  };
  portfolios: { id: string; title: string; description: string; impactScore: number }[];
  credentials: ApiCredential[];
}

export interface CreateChallengePayload {
  title: string;
  description: string;
  category: string;
  location?: string;
  duration?: number;
  points?: number;
  target?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<{ success: boolean; data?: T; error?: string }> {
  try {
    const method = options?.method ?? "GET";
    const res = await fetch(url, {
      ...options,
      headers: { "Content-Type": "application/json", ...options?.headers },
      // Always bypass Next.js fetch cache so Server Components (SSR pages)
      // always read fresh data from the DB after admin CRUD operations.
      cache: method === "GET" ? "no-store" : "no-store",
    });
    const json = await res.json();
    if (!res.ok) {
      return { success: false, error: json.error ?? `HTTP ${res.status}` };
    }
    return { success: true, data: json.data ?? json };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Network error";
    return { success: false, error: msg };
  }
}

// ─── Challenges ───────────────────────────────────────────────────────────────

export async function fetchChallenges(params?: {
  search?: string;
  category?: string;
}): Promise<ApiChallenge[]> {
  const qs = new URLSearchParams();
  if (params?.search) qs.set("search", params.search);
  if (params?.category && params.category !== "all") qs.set("category", params.category);
  const result = await apiFetch<ApiChallenge[]>(`/api/challenges?${qs.toString()}`);
  return result.data ?? [];
}

export async function fetchChallengeById(id: string): Promise<ApiChallenge | null> {
  const result = await apiFetch<ApiChallenge>(`/api/challenges/${id}`);
  return result.data ?? null;
}

export async function fetchRecommendedChallenges(userId: string): Promise<ApiChallenge[]> {
  const result = await apiFetch<ApiChallenge[]>(
    `/api/challenges/recommendations?userId=${userId}`
  );
  return result.data ?? [];
}

export async function createChallenge(payload: CreateChallengePayload): Promise<{
  success: boolean;
  data?: ApiChallenge;
  error?: string;
}> {
  return apiFetch<ApiChallenge>("/api/challenges", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateChallenge(
  id: string,
  payload: Partial<CreateChallengePayload>
): Promise<{ success: boolean; data?: ApiChallenge; error?: string }> {
  return apiFetch<ApiChallenge>(`/api/challenges/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteChallenge(id: string): Promise<{ success: boolean; error?: string }> {
  return apiFetch(`/api/challenges/${id}`, { method: "DELETE" });
}

// ─── Admin Stats ──────────────────────────────────────────────────────────────

export async function fetchAdminStats(): Promise<ApiAdminStats | null> {
  const result = await apiFetch<ApiAdminStats>("/api/admin/stats");
  return result.data ?? null;
}

// ─── Portfolio / Credentials ──────────────────────────────────────────────────

export async function fetchPortfolioByUserId(userId: string): Promise<ApiPortfolioData | null> {
  const result = await apiFetch<ApiPortfolioData>(`/api/portfolios/${userId}`);
  return result.data ?? null;
}

// ─── AI Mentor ────────────────────────────────────────────────────────────────

export async function sendMentorMessage(
  message: string,
  challengeId?: string,
  history?: { role: string; text: string }[]
): Promise<{ reply: string } | null> {
  const result = await apiFetch<{ reply: string }>("/api/mentor", {
    method: "POST",
    body: JSON.stringify({ message, challengeId, history }),
  });
  return result.data ?? null;
}
