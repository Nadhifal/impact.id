"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { Card } from "@/app/shared/components/ui/card";
import dynamic from "next/dynamic";

const HcsRadarChart = dynamic(() => import("../ui/HcsRadarChart").then(mod => mod.HcsRadarChart), { ssr: false });


interface HcsSectionProps {
  scores: { SI: number; LD: number; IN: number; RL: number };
  overallScore: number;
}

export function HcsSection({ scores, overallScore }: HcsSectionProps) {
  const hcsStats = [
    { label: "SOCIAL IMPACT", value: `${scores.SI}%` },
    { label: "LEADERSHIP", value: `${scores.LD}%` },
    { label: "INNOVATION", value: `${scores.IN}%` },
    { label: "RELIABILITY", value: `${scores.RL}%` }
  ];

  const chartData = [
    { subject: "Social Impact", A: scores.SI },
    { subject: "Leadership", A: scores.LD },
    { subject: "Reliability", A: scores.RL },
    { subject: "Innovation", A: scores.IN }
  ];

  return (
    <Card className="lg:col-span-8 bg-white border border-zinc-100 shadow-md p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 md:gap-12">
      <div className="flex-1 space-y-6 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 leading-tight">
              Human Capital Score (HCS)
            </h2>
            <p className="text-zinc-400 text-xs mt-0.5 font-medium">
              Berdasarkan aktivitas 30 hari terakhir
            </p>
          </div>
          <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 text-xs font-bold px-2.5 py-1 rounded-lg">
            <TrendingUp className="w-3.5 h-3.5" />
            {overallScore}/100
          </span>
        </div>

        {/* Sub-metrics */}
        <div className="grid grid-cols-2 gap-4">
          {hcsStats.map((stat) => (
            <div
              key={stat.label}
              className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 flex flex-col justify-between min-h-[90px]"
            >
              <span className="text-[10px] font-bold text-zinc-400 tracking-wider">
                {stat.label}
              </span>
              <span className="text-xl font-black text-slate-900 mt-2">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Radar Chart wrapper */}
      <HcsRadarChart data={chartData} />
    </Card>
  );
}
