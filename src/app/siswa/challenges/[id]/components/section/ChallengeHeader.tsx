"use client";

import React from "react";
import Image from "next/image";

interface ChallengeHeaderProps {
  title: string;
  category: string;
  imageUrl: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function ChallengeHeader({
  title,
  category,
  imageUrl,
  activeTab,
  setActiveTab
}: ChallengeHeaderProps) {
  const tabs = [
    { id: "Deskripsi", label: "Deskripsi" },
    { id: "Panduan", label: "Panduan" },
    { id: "Mentor AI", label: "Mentor AI" }
  ];

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-lg border border-zinc-100/50 bg-white">
      {/* Background Banner */}
      <div className="relative h-[280px] w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover brightness-[0.45]"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Banner Texts */}
        <div className="absolute bottom-16 left-6 md:left-10 right-6 md:right-10 space-y-3">
          <span className="bg-[#e6f4f1]/25 text-accent border border-[#e6f4f1]/20 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider w-fit block">
            {category}
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {title}
          </h1>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex px-6 md:px-10 border-b border-zinc-100 overflow-x-auto gap-8 h-14 items-center scrollbar-none bg-white">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-sm font-bold h-full relative border-b-2 flex items-center transition-all cursor-pointer ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-zinc-400 hover:text-zinc-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
