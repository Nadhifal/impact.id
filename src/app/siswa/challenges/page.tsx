import React, { Suspense } from "react";
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

// Skeleton Component
function ChallengesSkeleton() {
  return (
    <div className="py-10 px-6 md:px-12 max-w-7xl mx-auto space-y-8 animate-pulse">
      {/* Featured Challenge Skeleton */}
      <div className="h-96 bg-slate-100 rounded-3xl border border-slate-200" />
      {/* Three grid cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-64 bg-slate-100 rounded-2xl border border-slate-200" />
        ))}
      </div>
    </div>
  );
}

// Inner Server Component that queries database
async function ChallengesContent() {
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

export default function SiswaChallengesPage() {
  return (
    <Suspense fallback={<ChallengesSkeleton />}>
      <ChallengesContent />
    </Suspense>
  );
}
