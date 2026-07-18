"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/app/shared/components/ui/card";
import { Button } from "@/app/shared/components/ui/button";

interface ActiveChallengeSectionProps {
  challenge: {
    title: string;
    category: string;
    deadline: string;
    progressPercent: number;
    currentStep: number;
    totalSteps: number;
    imageUrl: string;
  };
}

export function ActiveChallengeSection({ challenge }: ActiveChallengeSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900">Active Challenge</h2>
        <Link href="/siswa/challenges" className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">
          Lihat Semua
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <Card className="bg-white border border-zinc-100 shadow-md p-6 rounded-3xl flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="flex flex-col md:flex-row items-center gap-5 w-full md:w-auto">
          <div className="relative w-28 h-20 rounded-2xl overflow-hidden shrink-0 border border-zinc-100">
            <Image
              src={challenge.imageUrl}
              alt={challenge.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="space-y-2 w-full">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-emerald-50 text-emerald-600 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
                {challenge.category}
              </span>
              <span className="text-zinc-400 text-xs font-medium">
                • Deadline: {challenge.deadline}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900">{challenge.title}</h3>
            <div className="flex items-center gap-4 w-full max-w-[400px]">
              <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden flex-1">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${challenge.progressPercent}%` }}
                />
              </div>
              <span className="text-[10px] text-zinc-500 font-bold shrink-0">
                {challenge.progressPercent}% Selesai ({challenge.currentStep} dari {challenge.totalSteps} Tahapan)
              </span>
            </div>
          </div>
        </div>

        <Button className="w-full md:w-auto bg-[#00473e] hover:bg-[#00362f] text-white py-3 px-6 rounded-xl flex items-center gap-2 text-sm font-semibold cursor-pointer">
          Lanjutkan Challenge
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Card>
    </div>
  );
}
