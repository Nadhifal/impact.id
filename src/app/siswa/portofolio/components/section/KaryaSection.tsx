"use client";

import React, { useState } from "react";
import { ChevronRight, Brain, Sparkles, Check, Award, Calendar, Landmark, FileText } from "lucide-react";
import Link from "next/link";
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

interface CredentialItem {
  type: string;
  title: string;
  issuedDate: string;
  issuer: string;
}

interface KaryaSectionProps {
  projects: ProjectItem[];
  recommendations: AdvisorRecommendation[];
  credentials: CredentialItem[];
}

export function KaryaSection({ projects, recommendations, credentials }: KaryaSectionProps) {
  const [activeTab, setActiveTab] = useState<"karya" | "sertifikat">("karya");

  return (
    <div className="lg:col-span-8 space-y-6">
      {/* Menu Tabs Navigation */}
      <div className="flex items-end justify-between border-b border-zinc-100">
        <div className="flex items-end gap-0">
          <button
            onClick={() => setActiveTab("karya")}
            className={`px-1 pb-3 mr-6 text-sm font-bold tracking-tight transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeTab === "karya"
                ? "border-[#00473e] text-[#00473e]"
                : "border-transparent text-zinc-400 hover:text-slate-700"
            }`}
          >
            Rekam Jejak Karya
          </button>
          <button
            onClick={() => setActiveTab("sertifikat")}
            className={`px-1 pb-3 text-sm font-bold tracking-tight transition-all border-b-2 cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === "sertifikat"
                ? "border-[#00473e] text-[#00473e]"
                : "border-transparent text-zinc-400 hover:text-slate-700"
            }`}
          >
            Sertifikat &amp; Penghargaan
            <span className="text-[9px] font-extrabold bg-[#00473e]/10 text-[#00473e] px-1.5 py-0.5 rounded-full">
              {credentials.length}
            </span>
          </button>
        </div>

        {activeTab === "karya" && (
          <span className="text-xs font-bold text-[#00473e] hover:underline cursor-pointer flex items-center gap-0.5 shrink-0 pb-3">
            Lihat Semua
            <ChevronRight className="w-4 h-4" />
          </span>
        )}
      </div>

      {/* Tab: Projects Grid */}
      {activeTab === "karya" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <PortfolioProjectCard key={idx} project={project} />
          ))}
        </div>
      )}

      {/* Tab: Certificates Grid */}
      {activeTab === "sertifikat" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {credentials.map((cred, idx) => (
            <Card
              key={idx}
              className="bg-white border border-zinc-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div className="space-y-4">
                {/* Header row: icon + badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00473e]/5 text-[#00473e] flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-extrabold px-2 py-0.5 border rounded-full uppercase tracking-wider select-none bg-emerald-50 text-emerald-700 border-emerald-100">
                    VERIFIED CREDENTIAL
                  </span>
                </div>

                {/* Title & Meta */}
                <div className="space-y-2.5">
                  <h4 className="text-sm font-extrabold text-slate-800 leading-snug group-hover:text-[#00473e] transition-colors">
                    {cred.title}
                  </h4>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-semibold">
                      <Landmark className="w-3.5 h-3.5 shrink-0" />
                      <span>{cred.issuer}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-semibold">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>{cred.issuedDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button — links to detail page */}
              <Link
                href="/siswa/portofolio/detail-sertifikat"
                className="mt-5 w-full py-2.5 bg-[#00473e] hover:bg-[#003830] text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Lihat Sertifikat</span>
              </Link>
            </Card>
          ))}
        </div>
      )}

      {/* AI Career Strategist Banner */}
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
