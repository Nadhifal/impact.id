"use client";

import React, { useState } from "react";
import { FeaturedSection } from "./components/section/FeaturedSection";
import { AvailableSection } from "./components/section/AvailableSection";

interface ChallengeDisplay {
  id: string;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  points: number;
  imageUrl: string;
  participantsCount?: number;
  timeRemaining?: string;
  urgency?: "Urgent" | "Normal";
}

interface SmartRec {
  title: string;
  rewardPoints: number;
  description: string;
}

interface SiswaChallengesClientProps {
  featuredChallenge: ChallengeDisplay | null;
  availableChallenges: ChallengeDisplay[];
  smartRecommendation: SmartRec;
  specialChallenge: ChallengeDisplay | null;
}

export function SiswaChallengesClient({
  featuredChallenge,
  availableChallenges,
  smartRecommendation,
  specialChallenge,
}: SiswaChallengesClientProps) {
  const [activeTab, setActiveTab] = useState("Semua");

  const categories = ["Semua", ...Array.from(new Set(availableChallenges.map((c) => c.category)))];

  const filtered =
    activeTab === "Semua"
      ? availableChallenges
      : availableChallenges.filter((c) => c.category === activeTab);

  if (!featuredChallenge) {
    return (
      <div className="py-20 text-center text-slate-400 text-sm font-semibold">
        Belum ada challenge tersedia. Admin belum menambahkan challenge.
      </div>
    );
  }

  return (
    <div className="py-10 px-6 md:px-12 max-w-7xl mx-auto space-y-8">
      {/* Header and Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-100 pb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Ongoing Challenges
          </h1>
          <p className="text-zinc-500 text-sm">
            Scale your impact by solving real-world problems.
          </p>
        </div>

        {/* Tab Filters — built from live categories */}
        <div className="flex gap-2 p-1.5 bg-zinc-100 rounded-2xl w-fit flex-wrap">
          {categories.slice(0, 4).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-zinc-500 hover:text-slate-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Featured Challenge and Smart Recommendation Section */}
      <FeaturedSection
        featuredChallenge={featuredChallenge}
        smartRecommendation={smartRecommendation}
      />

      {/* Section: Available Challenges — always show, use featuredChallenge as fallback special */}
      <AvailableSection
        challenges={filtered}
        specialChallenge={specialChallenge ?? featuredChallenge}
      />
    </div>
  );
}
