"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Zap, ChevronDown } from "lucide-react";
import { Card } from "@/app/shared/components/ui/card";
import { ChallengesCard } from "../ui/ChallengesCard";

interface ChallengeItem {
  id: string;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  points: number;
  imageUrl: string;
  participantsCount?: number;
}

interface SpecialChallengeItem {
  id: string;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  points: number;
  imageUrl: string;
  timeRemaining?: string;
}

interface AvailableSectionProps {
  challenges: ChallengeItem[];
  specialChallenge: SpecialChallengeItem;
}

export function AvailableSection({
  challenges,
  specialChallenge
}: AvailableSectionProps) {
  const [challengeLimit, setChallengeLimit] = useState(6);

  useEffect(() => {
    setChallengeLimit(6);
  }, [challenges]);

  const displayedChallenges = challenges.slice(0, challengeLimit);
  const canLoadMore = displayedChallenges.length < challenges.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900">
          Available Challenges
        </h2>
        <span className="text-xs font-bold text-zinc-400 hover:text-zinc-600 transition-colors flex items-center gap-1 cursor-pointer">
          View Archive
          <Clock className="w-3.5 h-3.5" />
        </span>
      </div>

      {/* Grid of regular challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedChallenges.map((challenge) => (
          <ChallengesCard key={challenge.id} challenge={challenge} />
        ))}
      </div>

      {/* Special community choice and load more button */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        <Card className="lg:col-span-8 overflow-hidden bg-white border border-zinc-100 shadow-md p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center gap-6 justify-between hover:shadow-lg transition-all duration-300 min-h-[220px]">
          <div className="relative w-full sm:w-[260px] h-[180px] rounded-2xl overflow-hidden shrink-0 border border-zinc-100">
            <Image
              src={specialChallenge.imageUrl}
              alt={specialChallenge.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="space-y-4 flex-1 flex flex-col justify-between h-full">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#e6f4f1] text-primary text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {specialChallenge.category}
                </span>
                <span className="text-zinc-500 text-[10px] font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {specialChallenge.timeRemaining}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 leading-snug">
                {specialChallenge.title}
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-medium line-clamp-2">
                {specialChallenge.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Link href={`/siswa/challenges/${specialChallenge.id}`}>
                <button className="bg-primary hover:bg-primary-hover text-white text-xs font-bold py-3 px-5 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all">
                  Ambil Tantangan Ini
                  <Zap className="w-3.5 h-3.5 fill-current" />
                </button>
              </Link>
              <span className="text-xs font-black text-slate-800 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                {specialChallenge.points} pts
              </span>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-4 flex items-center justify-center w-full">
          {canLoadMore ? (
            <button
              type="button"
              onClick={() =>
                setChallengeLimit((current) =>
                  Math.min(current + 6, challenges.length)
                )
              }
              className="w-full py-4 border-2 border-zinc-200 hover:border-zinc-300 text-zinc-500 hover:text-slate-800 rounded-2xl flex items-center justify-center gap-1 text-sm font-bold transition-all"
            >
              Load more challenges
              <ChevronDown className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-xs text-zinc-400">
              Semua tantangan telah ditampilkan.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
