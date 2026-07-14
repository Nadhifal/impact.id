"use client";

import React, { useState } from "react";
import { challengeDetail, guideTasks, resourceFiles } from "./data";
import { ChallengeHeader } from "./components/section/ChallengeHeader";
import { DescriptionTab } from "./components/section/DescriptionTab";
import { GuideTab } from "./components/section/GuideTab";
import { AiMentorTab } from "./components/section/AiMentorTab";

export default function ChallengeDetailPage() {
  const [activeTab, setActiveTab] = useState("Deskripsi");

  return (
    <div className="py-10 px-6 md:px-12 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <ChallengeHeader
        title={challengeDetail.title}
        category={challengeDetail.category}
        imageUrl={challengeDetail.imageUrl}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Tabs Content */}
      <div className="pt-2">
        {activeTab === "Deskripsi" && (
          <DescriptionTab
            challengeId={challengeDetail.id}
            location={challengeDetail.location}
            duration={challengeDetail.duration}
            points={challengeDetail.points}
            targetCount={challengeDetail.targetCount}
            description={challengeDetail.description}
            quote={challengeDetail.quote}
            checkpoints={challengeDetail.checkpoints}
            expectedImpact={challengeDetail.expectedImpact}
          />
        )}

        {activeTab === "Panduan" && (
          <GuideTab
            challengeId={challengeDetail.id}
            tasks={guideTasks}
            resources={resourceFiles}
          />
        )}

        {activeTab === "Mentor AI" && <AiMentorTab />}
      </div>
    </div>
  );
}
