import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Sparkles, ArrowRight } from "lucide-react";
import { Card } from "@/app/shared/components/ui/card";
import { Button } from "@/app/shared/components/ui/button";
import { HcsSection } from "./components/section/HcsSection";
import { ActiveChallengeSection } from "./components/section/ActiveChallengeSection";
import { MilestonesSection } from "./components/section/MilestonesSection";
import { prisma } from "@/lib/prisma";
import { verifyJWT } from "@/lib/auth";
import { cookies } from "next/headers";

interface DashboardData {
  name: string;
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
    imageUrl: string;
  } | null;
}

async function getDashboardData(): Promise<DashboardData> {
  const cookieStore = await cookies();
  const token = cookieStore.get("impact_token")?.value;

  if (!token) {
    redirect("/auth/login");
  }

  const payload = await verifyJWT(token);
  if (!payload) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.id },
    include: {
      humanCapitalScore: true,
      submissions: {
        include: { challenge: true, verification: true },
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!user) {
    redirect("/auth/login");
  }

  const hcs = user.humanCapitalScore;
  const hasAssessment = !!hcs && hcs.totalScore > 0;
  if (!hasAssessment) {
    redirect("/assesment");
  }

  const completedSubmissions = user.submissions.filter(
    (s) => s.status === "COMPLETED"
  ).length;
  const totalPoints = hcs ? Math.round(hcs.totalScore * 30) : 0;
  const activeSub = user.submissions.find(
    (s) => s.status === "IN_PROGRESS" || s.status === "SUBMITTED"
  );

  const activeChallenge = activeSub
    ? {
        title: activeSub.challenge.title,
        category: activeSub.challenge.category,
        deadline: new Date(
          activeSub.createdAt.getTime() +
            activeSub.challenge.duration * 24 * 60 * 60 * 1000
        ).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric"
        }),
        progressPercent: activeSub.status === "SUBMITTED" ? 80 : 40,
        currentStep: activeSub.status === "SUBMITTED" ? 4 : 2,
        totalSteps: 5,
        imageUrl:
          "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&h=180&q=80"
      }
    : null;

  return {
    name: user.name,
    scores: hcs
      ? {
          SI: Math.round(hcs.collaboration),
          LD: Math.round(hcs.leadership),
          IN: Math.round(hcs.creativity),
          RL: Math.round(hcs.problemSolving)
        }
      : { SI: 0, LD: 0, IN: 0, RL: 0 },
    overallScore: hcs ? Math.round(hcs.totalScore) : 0,
    totalPoints,
    quickStats: {
      challengesCompleted: completedSubmissions,
      hoursOfImpact: completedSubmissions * 24
    },
    activeChallenge
  };
}

export default async function SiswaDashboardPage() {
  const dashData = await getDashboardData();
  const displayName = dashData.name.split(" ")[0] ?? "Siswa";

  const upcomingMilestones = [
    {
      date: "9 Nov",
      title: "Webinar Impact Strategy",
      iconName: "webinar" as const
    },
    { date: "12 Nov", title: "Laporan Challenge", iconName: "report" as const },
    {
      date: "15 Nov",
      title: "Batch 4 Certification",
      iconName: "cert" as const
    },
    {
      date: "20 Nov",
      title: "Networking Night",
      iconName: "networking" as const
    }
  ];

  return (
    <div className="py-10 px-6 md:px-12 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            {dashData.totalPoints.toLocaleString("id-ID")} Points
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Selamat Datang, {displayName}
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <HcsSection
          scores={dashData.scores}
          overallScore={dashData.overallScore}
        />

        <div className="lg:col-span-4 flex flex-col gap-6 w-full">
          <Card className="bg-[#00473e] text-white p-6 sm:p-8 rounded-3xl border-none shadow-md flex flex-col justify-between min-h-[170px] relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-4 translate-y-4">
              <Sparkles className="w-32 h-32" />
            </div>

            <div className="space-y-2 relative z-10">
              <h3 className="text-base font-bold text-accent">
                Rekomendasi Aksi
              </h3>
              <p className="text-xs text-slate-100 font-medium leading-relaxed">
                Tingkatkan skor Leadership Anda dengan mengikuti modul
                &quot;Strategic Planning for NGOs&quot;.
              </p>
            </div>

            <button
              type="button"
              className="mt-6 w-fit bg-white hover:bg-zinc-100 text-primary font-bold py-2.5 px-5 rounded-xl text-xs transition-all relative z-10 cursor-pointer shadow-sm"
            >
              Pelajari Sekarang
            </button>
          </Card>

          <Card className="bg-white border border-zinc-100 shadow-md p-6 sm:p-8 rounded-3xl space-y-5 flex-1 justify-between flex flex-col">
            <h3 className="text-sm font-bold text-slate-900">
              Statistik Cepat
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-zinc-500">
                  <span>Challenge Selesai</span>
                  <span className="text-slate-800">
                    {dashData.quickStats.challengesCompleted}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{
                      width: `${Math.min(dashData.quickStats.challengesCompleted * 10, 100)}%`
                    }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-zinc-500">
                  <span>Hours of Impact</span>
                  <span className="text-slate-800">
                    {dashData.quickStats.hoursOfImpact} Jam
                  </span>
                </div>
                <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{
                      width: `${Math.min(dashData.quickStats.hoursOfImpact / 2, 100)}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {dashData.activeChallenge && (
        <ActiveChallengeSection challenge={dashData.activeChallenge} />
      )}
      <MilestonesSection milestones={upcomingMilestones} />
    </div>
  );
}
