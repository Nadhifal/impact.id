"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Clock, Award, Target, CheckCircle2, Eye, FileSpreadsheet, Send } from "lucide-react";
import { Card } from "@/app/shared/components/ui/card";
import { Button } from "@/app/shared/components/ui/button";

interface DescriptionTabProps {
  challengeId: string;
  location: string;
  duration: string;
  points: number;
  targetCount: string;
  description: string;
  quote: string;
  checkpoints: { id: string; text: string; completed: boolean }[];
  expectedImpact: { title: string; description: string; iconName: "visibility" | "accuracy" }[];
}

export function DescriptionTab({
  challengeId,
  location,
  duration,
  points,
  targetCount,
  description,
  quote,
  checkpoints,
  expectedImpact
}: DescriptionTabProps) {
  const stats = [
    { label: "Lokasi", value: location, icon: MapPin, color: "text-primary bg-emerald-50" },
    { label: "Durasi", value: duration, icon: Clock, color: "text-indigo-500 bg-indigo-50" },
    { label: "Dampak", value: `${points} Poin`, icon: Award, color: "text-emerald-500 bg-emerald-50" },
    { label: "Target", value: targetCount, icon: Target, color: "text-blue-500 bg-blue-50" },
  ];

  return (
    <div className="space-y-8">
      {/* 4 Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card
            key={idx}
            className="bg-white border border-zinc-100 shadow-sm p-5 rounded-2xl flex items-center gap-4 min-h-[90px]"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                {stat.label}
              </span>
              <span className="text-base font-extrabold text-slate-800 block">
                {stat.value}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Grid: Description + Impact Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Detail texts */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="bg-white border border-zinc-100 shadow-md p-6 sm:p-8 rounded-3xl space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-extrabold text-slate-900 border-b border-zinc-50 pb-2">
                Tentang Challenge
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed font-medium">
                {description}
              </p>
            </div>

            {/* Blockquote */}
            <div className="border-l-4 border-primary bg-zinc-50 p-5 rounded-r-2xl">
              <p className="text-xs text-slate-700 italic font-medium leading-relaxed">
                "{quote}"
              </p>
            </div>
          </Card>

          {/* Target Capaian */}
          <Card className="bg-white border border-zinc-100 shadow-md p-6 sm:p-8 rounded-3xl space-y-6">
            <h2 className="text-lg font-extrabold text-slate-900 border-b border-zinc-50 pb-2">
              Target Capaian
            </h2>
            <div className="space-y-4">
              {checkpoints.map((cp) => (
                <div
                  key={cp.id}
                  className="flex items-center gap-4 p-4 border border-zinc-100 rounded-2xl bg-white"
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border ${
                    cp.completed
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : "border-zinc-200 bg-white text-zinc-400"
                  }`}>
                    {cp.completed && <CheckCircle2 className="w-4 h-4 text-white fill-current" />}
                  </div>
                  <span className={`text-sm font-bold ${
                    cp.completed ? "text-slate-800 line-through opacity-70" : "text-slate-800"
                  }`}>
                    {cp.text}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Side: Expected Impact Card */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-white border border-zinc-100 shadow-md p-6 sm:p-8 rounded-3xl space-y-6 flex flex-col justify-between min-h-[460px]">
            <div className="space-y-6">
              <h2 className="text-lg font-extrabold text-slate-900 border-b border-zinc-50 pb-2">
                Dampak Diharapkan
              </h2>
              <div className="space-y-5">
                {expectedImpact.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl flex flex-col gap-3.5 border ${
                      idx === 0
                        ? "bg-[#002f29] text-white border-none"
                        : "bg-indigo-50/50 text-indigo-900 border-indigo-100/50"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      idx === 0 ? "bg-white/10 text-white" : "bg-indigo-500/10 text-indigo-600"
                    }`}>
                      {item.iconName === "visibility" ? <Eye className="w-4.5 h-4.5" /> : <FileSpreadsheet className="w-4.5 h-4.5" />}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-extrabold">{item.title}</h4>
                      <p className={`text-xs leading-relaxed font-medium ${
                        idx === 0 ? "text-zinc-200" : "text-indigo-900/70"
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Submit Call Action */}
            <div className="space-y-3 pt-6 border-t border-zinc-50">
              <Link href={`/siswa/challenges/${challengeId}/submit`}>
                <Button className="w-full bg-[#00473e] hover:bg-[#00362f] text-white py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-bold shadow-md cursor-pointer">
                  <Send className="w-4.5 h-4.5" />
                  SUBMIT CHALLENGE
                </Button>
              </Link>
              <p className="text-[10px] text-zinc-400 font-bold text-center">
                Pastikan semua target telah divalidasi sebelum mengirim.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
