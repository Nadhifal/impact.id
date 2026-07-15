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

            <Button className="bg-[#00473e] hover:bg-[#003830] text-white py-3 px-6 rounded-xl flex items-center gap-2 text-sm font-semibold cursor-pointer shadow-md border-none">
              Lihat Detail Challenge
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Right Column: AI Smart Recommendation */}
      <Card className="lg:col-span-4 bg-[#EEEDFE] text-[#584FBC] p-6 sm:p-8 rounded-3xl border-none shadow-lg flex flex-col justify-between relative overflow-hidden min-h-[440px]">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none translate-x-12 -translate-y-6">
          <Sparkles className="w-64 h-64 text-[#584FBC]" />
        </div>

        <div className="space-y-6 relative z-10">
          <div className="flex items-center gap-2 text-[10px] font-extrabold text-[#584FBC] uppercase tracking-widest">
            <span className="p-1 rounded-md bg-[#584FBC]/10">
              <Compass className="w-4 h-4 text-[#584FBC]" />
            </span>
            REKOMENDASI PINTAR
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-extrabold leading-snug text-[#3b338f]">
              Berdasarkan portofolio Anda...
            </h3>
            <p className="text-xs text-[#584fbc]/80 font-medium leading-relaxed">
              {smartRecommendation.description}
            </p>
          </div>

          {/* Inner Challenge Card */}
          <div className="p-4 bg-white border border-[#584fbc]/10 rounded-2xl flex items-start gap-3 shadow-xs">
            <div className="p-2.5 bg-[#EEEDFE] text-[#584FBC] rounded-xl">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-[#3b338f]">{smartRecommendation.title}</h4>
              <p className="text-[10px] text-[#584fbc]/70 font-semibold">Reward: {smartRecommendation.rewardPoints} Points</p>
            </div>
          </div>
        </div>

        <Button
          onClick={() => {}}
          className="mt-8 w-full bg-[#584FBC] hover:bg-[#473fa0] text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all cursor-pointer relative z-10 text-center shadow-md border-none"
        >
          Ambil Challenge
        </Button>
      </Card>
    </div>
  );
}
