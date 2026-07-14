"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Compass, Zap, ArrowRight } from "lucide-react";
import { Card } from "@/app/shared/components/ui/card";
import { Button } from "@/app/shared/components/ui/button";

interface ChallengeItem {
  id: string;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  points: number;
  imageUrl: string;
  urgency?: "Urgent" | "Normal";
}

interface FeaturedSectionProps {
  featuredChallenge: ChallengeItem;
  smartRecommendation: {
    title: string;
    rewardPoints: number;
    description: string;
  };
}

export function FeaturedSection({ featuredChallenge, smartRecommendation }: FeaturedSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Hero Highlighted Card */}
      <Card className="lg:col-span-8 overflow-hidden border border-zinc-100 shadow-lg rounded-3xl relative flex flex-col min-h-[440px]">
        <div className="absolute inset-0 z-0">
          <Image
            src={featuredChallenge.imageUrl}
            alt={featuredChallenge.title}
            fill
            className="object-cover brightness-[0.4]"
            unoptimized
          />
        </div>

        <div className="relative z-10 p-8 sm:p-10 flex flex-col justify-between h-full flex-1">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider">
              {featuredChallenge.category}
            </span>
            {featuredChallenge.urgency && (
              <span className="bg-red-500 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider">
                {featuredChallenge.urgency}
              </span>
            )}
          </div>

          <div className="space-y-6 mt-16">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                {featuredChallenge.title}
              </h2>
              <p className="text-zinc-200/90 text-sm max-w-xl leading-relaxed">
                {featuredChallenge.description}
              </p>
            </div>

            <Button className="bg-white hover:bg-zinc-100 text-primary py-3 px-6 rounded-xl flex items-center gap-2 text-sm font-semibold cursor-pointer shadow-md">
              Lihat Detail Challenge
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Right Column: AI Smart Recommendation */}
      <Card className="lg:col-span-4 bg-[#002f29] text-white p-6 sm:p-8 rounded-3xl border-none shadow-lg flex flex-col justify-between relative overflow-hidden min-h-[440px]">
        <div className="absolute right-0 top-0 opacity-5 pointer-events-none translate-x-12 -translate-y-6">
          <Sparkles className="w-64 h-64 text-white" />
        </div>

        <div className="space-y-6 relative z-10">
          <div className="flex items-center gap-2 text-[10px] font-extrabold text-accent uppercase tracking-widest">
            <span className="p-1 rounded-md bg-accent/10">
              <Compass className="w-4 h-4 text-accent" />
            </span>
            REKOMENDASI PINTAR
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-extrabold leading-snug">
              Berdasarkan portofolio Anda...
            </h3>
            <p className="text-xs text-zinc-300 font-medium leading-relaxed">
              {smartRecommendation.description}
            </p>
          </div>

          {/* Inner Challenge Card */}
          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-3">
            <div className="p-2.5 bg-white/10 text-accent rounded-xl">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-white">{smartRecommendation.title}</h4>
              <p className="text-[10px] text-zinc-400 font-semibold">Reward: {smartRecommendation.rewardPoints} Points</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {}}
          className="mt-8 w-full bg-white hover:bg-zinc-100 text-[#002f29] font-bold py-3.5 px-6 rounded-xl text-sm transition-all cursor-pointer relative z-10 text-center shadow-md"
        >
          Ambil Challenge
        </button>
      </Card>
    </div>
  );
}
