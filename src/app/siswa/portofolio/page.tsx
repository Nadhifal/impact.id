"use client";

import React from "react";
import {
  bioProfile,
  verifiedCredential,
  summaryStats,
  coreSkills,
  portfolioProjects,
  aiRecommendations
} from "./data";
import { BioSection } from "./components/section/BioSection";
import { SidebarSection } from "./components/section/SidebarSection";
import { KaryaSection } from "./components/section/KaryaSection";

export default function SiswaPortfolioPage() {
  return (
    <div className="py-10 px-6 md:px-12 max-w-7xl mx-auto space-y-8">
      {/* Top Bio Profile Card Section */}
      <BioSection bio={bioProfile} />

      {/* Main Grid: Left Column Stats & Right Column Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column Sidebar */}
        <SidebarSection
          credential={verifiedCredential}
          stats={summaryStats}
          skills={coreSkills}
        />

        {/* Right Column Projects & AI Strategist */}
        <KaryaSection
          projects={portfolioProjects}
          recommendations={aiRecommendations}
        />
      </div>
    </div>
  );
}
