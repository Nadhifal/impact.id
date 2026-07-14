"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Card } from "@/app/shared/components/ui/card";
import { Button } from "@/app/shared/components/ui/button";
import { quickStats, activeChallenge, upcomingMilestones } from "./data";
import { HcsSection } from "./components/section/HcsSection";
import { ActiveChallengeSection } from "./components/section/ActiveChallengeSection";
import { MilestonesSection } from "./components/section/MilestonesSection";

export default function SiswaDashboardPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [scores, setScores] = useState({ SI: 0, LD: 0, IN: 0, RL: 0 });

  useEffect(() => {
    setIsMounted(true);
    const storedScores = localStorage.getItem("hcs_scores");
    if (!storedScores) {
      window.location.href = "/assesment";
    } else {
      setScores(JSON.parse(storedScores));
    }
  }, []);

  const overallScore = Math.round((scores.SI + scores.LD + scores.IN + scores.RL) / 4);

  return (
    <div className="py-10 px-6 md:px-12 max-w-7xl mx-auto space-y-8">
      {/* Top Banner section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            2,450 Points
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Selamat Datang, Difal
          </h1>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Siap untuk menciptakan dampak positif hari ini?
          </p>
        </div>

        <Link href="/siswa/challenges">
          <Button className="bg-[#00473e] hover:bg-[#00362f] text-white py-3 px-6 rounded-xl flex items-center gap-2 text-sm font-semibold shadow-md cursor-pointer">
            Mulai Challenge Baru
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Grid Layout: Main Stats & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Card: Human Capital Score (HCS) Section */}
        <HcsSection scores={scores} overallScore={overallScore} isMounted={isMounted} />

        {/* Right side: Action Recommendations & Quick Stats */}
        <div className="lg:col-span-4 flex flex-col gap-6 w-full">
          {/* Action Recommendation Card */}
          <Card className="bg-[#00473e] text-white p-6 sm:p-8 rounded-3xl border-none shadow-md flex flex-col justify-between min-h-[170px] relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-4 translate-y-4">
              <Sparkles className="w-32 h-32" />
            </div>

            <div className="space-y-2 relative z-10">
              <h3 className="text-base font-bold text-accent">Rekomendasi Aksi</h3>
              <p className="text-xs text-slate-100 font-medium leading-relaxed">
                Tingkatkan skor Leadership Anda dengan mengikuti modul "Strategic Planning for NGOs".
              </p>
            </div>

            <button
              onClick={() => {}}
              className="mt-6 w-fit bg-white hover:bg-zinc-100 text-primary font-bold py-2.5 px-5 rounded-xl text-xs transition-all relative z-10 cursor-pointer shadow-sm"
            >
              Pelajari Sekarang
            </button>
          </Card>

          {/* Quick Stats Card */}
          <Card className="bg-white border border-zinc-100 shadow-md p-6 sm:p-8 rounded-3xl space-y-5 flex-1 justify-between flex flex-col">
            <h3 className="text-sm font-bold text-slate-900">Statistik Cepat</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-zinc-500">
                  <span>Challenge Selesai</span>
                  <span className="text-slate-800">{quickStats.challengesCompleted}</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "80%" }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-zinc-500">
                  <span>Hours of Impact</span>
                  <span className="text-slate-800">{quickStats.hoursOfImpact} Jam</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "65%" }} />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Section: Active Challenge */}
      <ActiveChallengeSection challenge={activeChallenge} />

      {/* Section: Upcoming Milestones */}
      <MilestonesSection milestones={upcomingMilestones} />
    </div>
  );
}
