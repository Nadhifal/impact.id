import React from "react";
import { prisma } from "@/lib/prisma";
import { SiswaChallengesClient } from "./SiswaChallengesClient";
import {
  featuredChallenge as dummyFeatured,
  availableChallenges as dummyAvailable,
  smartRecommendation as dummyRec,
  specialChallenge as dummySpecial,
} from "./data";

// Always render at request time — queries DB directly (no HTTP round-trip)
export const dynamic = "force-dynamic";

// Default fallback images by category
const CATEGORY_IMAGES: Record<string, string> = {
  Kewirausahaan:
    "https://images.unsplash.com/photo-1596422846543-75c6fc18a523?auto=format&fit=crop&w=300&h=180&q=80",
  Lingkungan:
    "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=300&h=180&q=80",
  Sosial:
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=300&h=180&q=80",
  Edukasi:
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=300&h=180&q=80",
  Teknologi:
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=300&h=180&q=80",
  Kesehatan:
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=300&h=180&q=80",
  Pendidikan:
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=300&h=180&q=80",
};

// Server Component — directly queries Prisma (no HTTP layer, always fresh)
export default async function SiswaChallengesPage() {
  let dbChallenges: Awaited<ReturnType<typeof prisma.challenge.findMany>> = [];

  try {
    dbChallenges = await prisma.challenge.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { submissions: true } } },
    });
  } catch {
    // DB not available — will use dummy data below
  }

  // If DB has challenges, use them; otherwise fall back to dummy data
  if (dbChallenges.length > 0) {
    const displayChallenges = dbChallenges.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      category: c.category,
      subCategory: c.target ?? "Umum",
      points: c.points,
      imageUrl:
        CATEGORY_IMAGES[c.category] ??
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=300&h=180&q=80",
      participantsCount: (c as { _count?: { submissions: number } })._count?.submissions ?? 0,
    }));

    const featuredChallenge = displayChallenges[0];
    const availableChallenges = displayChallenges.slice(1);
    const specialChallenge =
      displayChallenges.length > 1
        ? [...displayChallenges].sort((a, b) => b.points - a.points)[0]
        : displayChallenges[0];

    return (
      <SiswaChallengesClient
        featuredChallenge={featuredChallenge}
        availableChallenges={availableChallenges}
        smartRecommendation={dummyRec}
        specialChallenge={specialChallenge}
      />
    );
  }

  // Fallback: DB is empty or unavailable — render dummy data
  return (
    <SiswaChallengesClient
      featuredChallenge={dummyFeatured}
      availableChallenges={dummyAvailable}
      smartRecommendation={dummyRec}
      specialChallenge={dummySpecial}
    />
  );
}
