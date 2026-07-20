import React from "react";
import {
  bioProfile,
  summaryStats,
  coreSkills,
  portfolioProjects as fallbackPortfolioProjects,
  aiRecommendations,
  verifiedCredentials
} from "./data";
import { prisma } from "@/lib/prisma";
import { verifyJWT } from "@/lib/auth";
import { cookies } from "next/headers";
import { BioSection } from "./components/section/BioSection";
import { SidebarSection } from "./components/section/SidebarSection";
import { KaryaSection } from "./components/section/KaryaSection";

export const dynamic = "force-dynamic";

const DEFAULT_PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1511974035430-5de47d3b95da?auto=format&fit=crop&w=400&h=250&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&h=250&q=80",
  "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&h=250&q=80"
];

function parseProfileTags(raw?: string | null) {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.filter(Boolean);
    if (typeof parsed === "string")
      return parsed
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
  } catch {
    if (typeof raw === "string")
      return raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
  }

  return [];
}

function getProjectImage(seed: string) {
  const index = seed?.length ? seed.length % DEFAULT_PROJECT_IMAGES.length : 0;
  return DEFAULT_PROJECT_IMAGES[index];
}

// Server Component — query Prisma directly using logged-in user
export default async function SiswaPortfolioPage() {
  let liveCredentials: typeof verifiedCredentials = [];
  let liveBio = bioProfile;
  let liveStats = summaryStats;
  let portfolioProjects = fallbackPortfolioProjects;

  // Get user ID from auth cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("impact_token")?.value;
  let userId: string | null = null;

  if (token) {
    const payload = await verifyJWT(token);
    if (payload) {
      userId = payload.id;
    }
  }

  try {
    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          profile: true,
          humanCapitalScore: true,
          submissions: {
            where: { status: "COMPLETED" },
            include: { challenge: true, verification: true },
            orderBy: { updatedAt: "desc" }
          },
          portfolios: true
        }
      });

      if (user) {
        const profileTags = [
          ...parseProfileTags(user.profile?.interests),
          ...parseProfileTags(user.profile?.talents)
        ].slice(0, 4);

        liveBio = {
          ...bioProfile,
          name: user.name ?? bioProfile.name,
          role: user.role === "STUDENT" ? "" : user.role,
          institution:
            user.profile?.schoolName ??
            user.profile?.city ??
            bioProfile.institution,
          tags: profileTags.length > 0 ? profileTags : bioProfile.tags,
          avatarUrl: user.avatarUrl ?? ""
        };

        // Override stats from human capital score
        const hcs = user.humanCapitalScore;
        if (hcs) {
          liveStats = [
            {
              label: "Leadership",
              value: String(Math.round(hcs.leadership)),
              iconName: "impact"
            },
            {
              label: "Kreativitas",
              value: String(Math.round(hcs.creativity)),
              iconName: "projects"
            },
            {
              label: "Kolaborasi",
              value: String(Math.round(hcs.collaboration)),
              iconName: "hours"
            },
            {
              label: "Problem Solving",
              value: String(Math.round(hcs.problemSolving)),
              iconName: "partners"
            }
          ];
        } else {
          // No HCS yet — show empty stats
          liveStats = [
            { label: "Leadership", value: "—", iconName: "impact" },
            { label: "Kreativitas", value: "—", iconName: "projects" },
            { label: "Kolaborasi", value: "—", iconName: "hours" },
            { label: "Problem Solving", value: "—", iconName: "partners" }
          ];
        }

        // Build project cards from portfolio records and completed challenges
        const portfolioProjectsFromDb = user.portfolios.map((item) => ({
          title: item.title,
          category: "Portofolio",
          description: item.description,
          tags: [
            item.blockchainTx ? "Blockchain Verified" : "Portofolio",
            `Impact ${item.impactScore}`
          ],
          isVerified: !!item.blockchainTx,
          imageUrl: getProjectImage(item.title)
        }));

        const challengeProjects = user.submissions.map((sub) => ({
          title: sub.challenge.title,
          category: sub.challenge.category,
          description: sub.challenge.description,
          tags: [sub.challenge.target ?? "Umum", `${sub.challenge.points} pts`],
          isVerified: sub.verification?.isApproved ?? false,
          imageUrl: getProjectImage(
            sub.challenge.category ?? sub.challenge.title
          )
        }));

        const liveProjects = [...portfolioProjectsFromDb, ...challengeProjects];

        if (liveProjects.length > 0) {
          portfolioProjects = liveProjects;
        }

        if (user.submissions.length > 0) {
          liveCredentials = user.submissions.map((sub) => ({
            id: sub.id,
            type: "VERIFIED CREDENTIAL",
            title: sub.challenge.title,
            issuer: "IMPACT.ID",
            issuedDate: `Diterbitkan: ${new Date(
              sub.updatedAt
            ).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric"
            })}`
          }));
        }
      }
    }
  } catch (err) {
    console.error("Gagal mengambil data portofolio dari DB:", err);
  }

  // Only display real database-verified credentials, do not fall back to dummy
  const credentials = liveCredentials;

  return (
    <div className="py-10 px-6 md:px-12 max-w-7xl mx-auto space-y-8">
      {/* Top Bio Profile Card Section */}
      <BioSection bio={liveBio} />

      {/* Main Grid: Left Column Stats & Right Column Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column Sidebar */}
        <SidebarSection
          credential={credentials[0]}
          stats={liveStats}
          skills={coreSkills}
        />

        {/* Right Column Projects & AI Strategist */}
        <KaryaSection
          projects={portfolioProjects}
          recommendations={aiRecommendations}
          credentials={credentials}
        />
      </div>
    </div>
  );
}
