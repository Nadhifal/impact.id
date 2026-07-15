"use client";

import React, { useState } from "react";
import { ChallengeDetailData, GuideTask, ResourceFile } from "./data";
import { ChallengeHeader } from "./components/section/ChallengeHeader";
import { DescriptionTab } from "./components/section/DescriptionTab";
import { GuideTab } from "./components/section/GuideTab";
import { AiMentorTab } from "./components/section/AiMentorTab";

interface ChallengeDetailClientProps {
  challenge: ChallengeDetailData;
  guideTasks: GuideTask[];
  resourceFiles: ResourceFile[];
}

export function ChallengeDetailClient({
  challenge,
  guideTasks,
  resourceFiles,
}: ChallengeDetailClientProps) {
  const [activeTab, setActiveTab] = useState("Deskripsi");

  return (
    <div className="py-10 px-6 md:px-12 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <ChallengeHeader
        title={challenge.title}
        category={challenge.category}
        imageUrl={challenge.imageUrl}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Tabs Content */}
      <div className="pt-2">
        {activeTab === "Deskripsi" && (
          <DescriptionTab
            challengeId={challenge.id}
            location={challenge.location}
            duration={challenge.duration}
            points={challenge.points}
            targetCount={challenge.targetCount}
            description={challenge.description}
            quote={challenge.quote}
            checkpoints={challenge.checkpoints}
            expectedImpact={challenge.expectedImpact}
          />
        )}

        {activeTab === "Panduan" && (
          <GuideTab
            challengeId={challenge.id}
            tasks={guideTasks}
            resources={resourceFiles}
          />
        )}

        {activeTab === "Mentor AI" && <AiMentorTab />}
      </div>
    </div>
  );
}
