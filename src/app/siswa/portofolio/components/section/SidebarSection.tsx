"use client";

import React from "react";
import Link from "next/link";
import { Award, Zap, CheckCircle2, Clock, Building, ExternalLink } from "lucide-react";
import { Card } from "@/app/shared/components/ui/card";

interface Credential {
  type: string;
  title: string;
  issuedDate: string;
}

interface SummaryStat {
  label: string;
  value: string;
  iconName: "impact" | "projects" | "hours" | "partners";
}

interface CoreSkill {
  name: string;
  percentage: number;
}

interface SidebarSectionProps {
  credential: Credential;
  stats: SummaryStat[];
  skills: CoreSkill[];
}

export function SidebarSection({ credential, stats, skills }: SidebarSectionProps) {
  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case "impact":
        return <Zap className="w-5 h-5 text-indigo-500" />;
      case "projects":
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case "hours":
        return <Clock className="w-5 h-5 text-blue-500" />;
      case "partners":
        return <Building className="w-5 h-5 text-amber-500" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-zinc-500" />;
    }
  };

  return (
    <div className="lg:col-span-4 space-y-6">
      {/* Certificate / Verified Credential Card */}
      <Card className="bg-[#00473e] text-white p-6 rounded-2xl border-none shadow-md space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-accent shrink-0">
            <Award className="w-5 h-5 fill-current" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-accent uppercase tracking-widest block">
              {credential.type}
            </span>
            <h4 className="text-sm font-bold tracking-wide">{credential.title}</h4>
            <p className="text-[10px] text-slate-300 font-semibold">{credential.issuedDate}</p>
          </div>
        </div>
        <Link 
          href="/siswa/portofolio/detail-sertifikat"
          className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-white/10"
        >
          Lihat Sertifikat
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </Card>

      {/* Grid of 4 Stats */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, idx) => (
          <Card
            key={idx}
            className="bg-white border border-zinc-100 shadow-sm p-4 rounded-2xl flex flex-col justify-between min-h-[110px]"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center shrink-0">
              {getStatIcon(stat.iconName)}
            </div>
            <div className="space-y-0.5 mt-4">
              <span className="text-xl font-black text-slate-900 block leading-tight">{stat.value}</span>
              <span className="text-[10px] font-bold text-zinc-400 leading-tight uppercase tracking-wider block">
                {stat.label}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Core Skills Progress Bars */}
      <Card className="bg-white border border-zinc-100 shadow-md p-6 rounded-2xl space-y-5">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-zinc-50 pb-2">
          Keahlian Utama
        </h3>
        <div className="space-y-4">
          {skills.map((skill, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-zinc-600">
                <span>{skill.name}</span>
                <span>{skill.percentage}%</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${skill.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
