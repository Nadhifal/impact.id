"use client";

import React from "react";
import { ChevronRight, Brain, Sparkles, Check } from "lucide-react";
import { Card } from "@/app/shared/components/ui/card";
import { PortfolioProjectCard } from "../ui/PortfolioProjectCard";

interface ProjectItem {
  title: string;
  category: string;
  description: string;
  tags: string[];
  isVerified: boolean;
  imageUrl: string;
}

interface AdvisorRecommendation {
  text: string;
}

interface KaryaSectionProps {
  projects: ProjectItem[];
  recommendations: AdvisorRecommendation[];
}

export function KaryaSection({ projects, recommendations }: KaryaSectionProps) {
  return (
    <div className="lg:col-span-8 space-y-6">
      <div className="flex justify-between items-center border-b border-zinc-100 pb-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Rekam Jejak Karya</h2>
          <p className="text-zinc-400 text-xs mt-0.5 font-medium">
            Kumpulan inisiatif dan proyek yang telah diselesaikan dengan standar IMPACT.ID.
          </p>
        </div>
        <span className="text-xs font-bold text-primary hover:underline cursor-pointer flex items-center gap-0.5 shrink-0">
          Lihat Semua
          <ChevronRight className="w-4 h-4" />
        </span>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <PortfolioProjectCard key={idx} project={project} />
        ))}
      </div>

      <Card className="bg-[#584FBC] text-white p-6 sm:p-8 rounded-3xl border-none shadow-lg flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden">
        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-2 text-[10px] font-extrabold text-[#EEEDFE] uppercase tracking-widest">
            <span className="p-1 rounded-md bg-white/15">
              <Brain className="w-4 h-4 text-[#EEEDFE]" />
            </span>
            AI-Powered Advisor
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-white leading-tight">AI Career Strategist</h3>
            <p className="text-xs text-zinc-200 font-medium leading-relaxed max-w-md">
              Dapatkan rekomendasi jalur karir dan sertifikasi berdasarkan rekam jejak karyamu saat ini untuk memaksimalkan potensimu di industri masa depan.
            </p>
          </div>

          <button className="mt-2 w-fit bg-white hover:bg-zinc-100 text-[#584FBC] font-bold py-3 px-6 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-2 shadow-md">
            Analisis Portofolio Saya
            <Sparkles className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>

        {/* Checklist of top recommendations */}
        <div className="w-full md:w-[260px] p-5 bg-white/5 border border-white/10 rounded-2xl space-y-4 shrink-0">
          <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Rekomendasi Teratas:</h4>
          <ul className="space-y-2.5">
            {recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-100 font-semibold">
                <span className="p-0.5 rounded-full bg-emerald-500/25 text-emerald-400 shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </span>
                {rec.text}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}
