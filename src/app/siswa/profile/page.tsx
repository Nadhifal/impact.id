"use client";

import React from "react";
import { ProfileSidebar } from "./components/section/ProfileSidebar";
import { ImpactGrowthCard } from "./components/section/ImpactGrowthCard";
import { GoalProgressCard } from "./components/section/GoalProgressCard";
import { SkillsCard } from "./components/section/SkillsCard";
import { CompletedChallenges } from "./components/section/CompletedChallenges";

export default function StudentProfilePage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10 md:py-16 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column - Sidebar (User info & Stats) */}
        <div className="lg:col-span-4 xl:col-span-3">
          <ProfileSidebar />
        </div>

        {/* Right Column - Main Profile Dashboard */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          {/* Top row cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            <div className="md:col-span-8">
              <ImpactGrowthCard />
            </div>
            <div className="md:col-span-4">
              <GoalProgressCard />
            </div>
          </div>

          {/* Middle row card - Skills */}
          <SkillsCard />

          {/* Bottom row card - Completed Challenges */}
          <CompletedChallenges />
        </div>
      </div>
    </div>
  );
}
