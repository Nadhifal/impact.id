"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Card } from "@/app/shared/components/ui/card";
import { Button } from "@/app/shared/components/ui/button";
import { HcsSection } from "./components/section/HcsSection";
import { ActiveChallengeSection } from "./components/section/ActiveChallengeSection";
import { MilestonesSection } from "./components/section/MilestonesSection";
import { useUser } from "@/app/shared/context/AuthContext";

interface DashboardData {
  name: string;
  hasAssessment: boolean;
  scores: { SI: number; LD: number; IN: number; RL: number };
  overallScore: number;
  totalPoints: number;
  quickStats: { challengesCompleted: number; hoursOfImpact: number };
  activeChallenge: {
    title: string;
    category: string;
    deadline: string;
    progressPercent: number;
    currentStep: number;
    totalSteps: number;
  } | null;
}

export default function SiswaDashboardPage() {
  const { user } = useUser();
  const [isMounted, setIsMounted] = useState(false);
  const [dashData, setDashData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);

    fetch("/api/siswa/dashboard")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data) {
          const data = json.data as DashboardData;
          // If user has not completed assessment, redirect
          if (!data.hasAssessment) {
            window.location.href = "/assesment";
            return;
          }
          setDashData(data);
          // Cache scores in localStorage for immediate display on next visit
          localStorage.setItem("hcs_scores", JSON.stringify(data.scores));
        } else {
          // Fallback: check localStorage
          const storedScores = localStorage.getItem("hcs_scores");
          if (!storedScores) {
            window.location.href = "/assesment";
          }
        }
      })
      .catch(() => {
        // Fallback: check localStorage
        const storedScores = localStorage.getItem("hcs_scores");
        if (!storedScores) {
          window.location.href = "/assesment";
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const scores = dashData?.scores ?? { SI: 0, LD: 0, IN: 0, RL: 0 };
  const overallScore = dashData?.overallScore ?? Math.round((scores.SI + scores.LD + scores.IN + scores.RL) / 4);
  const displayName = dashData?.name ?? user?.name ?? "Siswa";
  const totalPoints = dashData?.totalPoints ?? 0;
  const quickStats = dashData?.quickStats ?? { challengesCompleted: 0, hoursOfImpact: 0 };

  // Active challenge — from API or null
  const activeChallenge = dashData?.activeChallenge
    ? {
        title: dashData.activeChallenge.title,
        category: dashData.activeChallenge.category,
        deadline: dashData.activeChallenge.deadline,
        progressPercent: dashData.activeChallenge.progressPercent,
        currentStep: dashData.activeChallenge.currentStep,
        totalSteps: dashData.activeChallenge.totalSteps,
        imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&h=180&q=80",
      }
    : null;

  // Static milestones (keep as-is since these aren't user-specific data)
  const upcomingMilestones = [
    { date: "9 Nov", title: "Webinar Impact Strategy", iconName: "webinar" as const },
    { date: "12 Nov", title: "Laporan Challenge", iconName: "report" as const },
    { date: "15 Nov", title: "Batch 4 Certification", iconName: "cert" as const },
    { date: "20 Nov", title: "Networking Night", iconName: "networking" as const },
  ];

  if (loading) {
    return (
      <div className="py-10 px-6 md:px-12 max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#00473e] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-zinc-500">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-6 md:px-12 max-w-7xl mx-auto space-y-8">
      {/* Top Banner section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            {totalPoints.toLocaleString("id-ID")} Points
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Selamat Datang, {displayName.split(" ")[0]}
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
                Tingkatkan skor Leadership Anda dengan mengikuti modul &quot;Strategic Planning for NGOs&quot;.
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
                  <div className="h-full bg-primary" style={{ width: `${Math.min(quickStats.challengesCompleted * 10, 100)}%` }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-zinc-500">
                  <span>Hours of Impact</span>
                  <span className="text-slate-800">{quickStats.hoursOfImpact} Jam</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${Math.min(quickStats.hoursOfImpact / 2, 100)}%` }} />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Section: Active Challenge */}
      {activeChallenge && <ActiveChallengeSection challenge={activeChallenge} />}

      {/* Section: Upcoming Milestones */}
      <MilestonesSection milestones={upcomingMilestones} />
    </div>
  );
}
