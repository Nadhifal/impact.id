import React from "react";
import {
  bioProfile,
  summaryStats,
  coreSkills,
  portfolioProjects,
  aiRecommendations,
  verifiedCredentials,
} from "./data";
import { prisma } from "@/lib/prisma";
import { BioSection } from "./components/section/BioSection";
import { SidebarSection } from "./components/section/SidebarSection";
import { KaryaSection } from "./components/section/KaryaSection";
import { DEMO_USER_ID } from "@/lib/api";

export const dynamic = "force-dynamic";

// Server Component — query Prisma directly
export default async function SiswaPortfolioPage() {
  let liveCredentials: typeof verifiedCredentials = [];
  let liveBio = bioProfile;
  let liveStats = summaryStats;

  try {
    const user = await prisma.user.findUnique({
      where: { id: "demo-student-1" },
      include: {
        profile: true,
        humanCapitalScore: true,
        submissions: {
          where: { status: "COMPLETED" },
          include: { challenge: true, verification: true },
          orderBy: { updatedAt: "desc" },
        },
      },
    });

    console.log("=== Portfolio page.tsx debug ===");
    console.log("User found:", !!user);
    if (user) {
      console.log("Completed submissions count:", user.submissions.length);
      console.log("Submissions data:", JSON.stringify(user.submissions, null, 2));
    }

    if (user) {
      // Override bio with real DB data
      liveBio = {
        ...bioProfile,
        name: user.name ?? bioProfile.name,
        institution:
          user.profile?.schoolName ??
          user.profile?.city ??
          bioProfile.institution,
      };

      // Override stats from human capital score
      const hcs = user.humanCapitalScore;
      if (hcs) {
        liveStats = [
          { label: "Leadership", value: String(Math.round(hcs.leadership)), iconName: "impact" },
          { label: "Kreativitas", value: String(Math.round(hcs.creativity)), iconName: "projects" },
          { label: "Kolaborasi", value: String(Math.round(hcs.collaboration)), iconName: "hours" },
          { label: "Problem Solving", value: String(Math.round(hcs.problemSolving)), iconName: "partners" },
        ];
      }

      // Build credentials from completed+verified submissions
      if (user.submissions.length > 0) {
        liveCredentials = user.submissions.map((sub) => ({
          id: sub.id,
          type: "VERIFIED CREDENTIAL",
          title: sub.challenge.title,
          issuer: "IMPACT.ID",
          issuedDate: `Diterbitkan: ${new Date(sub.updatedAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}`,
        }));
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
