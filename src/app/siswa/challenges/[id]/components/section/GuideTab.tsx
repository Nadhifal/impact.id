"use client";

import React from "react";
import Link from "next/link";
import { Check, Lock, Play, MessageSquare, Phone, Download, ExternalLink, Send, Lightbulb } from "lucide-react";
import { Card } from "@/app/shared/components/ui/card";
import { Button } from "@/app/shared/components/ui/button";

interface GuideTask {
  number: number;
  title: string;
  status: "SELESAI" | "AKTIF" | "TERKUNCI";
  description?: string;
  tips?: string;
  actionText?: string;
}

interface ResourceFile {
  title: string;
  type: "pdf" | "link";
  url: string;
}

interface GuideTabProps {
  challengeId: string;
  tasks: GuideTask[];
  resources: ResourceFile[];
}

export function GuideTab({ challengeId, tasks, resources }: GuideTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Progress & Timeline */}
      <div className="lg:col-span-8 space-y-6">
        {/* Top Progress bar */}
        <Card className="bg-white border border-zinc-100 shadow-sm p-6 sm:p-8 rounded-3xl space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                PROGRESS PROGRAM
              </span>
              <h3 className="text-2xl font-black text-[#00473e] tracking-tight">25% Selesai</h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#00473e] flex items-center justify-center text-white shadow-sm">
              <span className="text-xs font-bold font-serif">★</span>
            </div>
          </div>
          
          <div className="h-2 bg-zinc-100 rounded-full overflow-hidden w-full">
            <div className="h-full bg-[#00473e]" style={{ width: "25%" }} />
          </div>
          <p className="text-[10px] text-zinc-400 font-bold italic">
            "Satu langkah besar untuk UMKM lokal."
          </p>
        </Card>

        {/* Timeline Guide Steps */}
        <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-4 before:bottom-4 before:w-[2px] before:bg-zinc-100">
          {tasks.map((task) => {
            const isCompleted = task.status === "SELESAI";
            const isActive = task.status === "AKTIF";
            const isLocked = task.status === "TERKUNCI";

            return (
              <div key={task.number} className="relative space-y-3">
                {/* Bullet Node Indicator */}
                <div className={`absolute -left-[27px] top-1.5 w-6.5 h-6.5 rounded-full flex items-center justify-center border-2 z-10 shadow-sm ${
                  isCompleted
                    ? "bg-[#00473e] border-[#00473e] text-white"
                    : isActive
                    ? "bg-white border-[#00473e] text-[#00473e] scale-110 ring-4 ring-[#e6f4f1]"
                    : "bg-zinc-50 border-zinc-200 text-zinc-400"
                }`}>
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : isLocked ? (
                    <Lock className="w-3 h-3" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-[#00473e]" />
                  )}
                </div>

                {/* Step Content */}
                <div className="pl-4">
                  <div className="flex items-center gap-3">
                    <h4 className={`text-base font-extrabold ${
                      isLocked ? "text-zinc-400 font-bold" : "text-slate-800"
                    }`}>
                      {task.number}. {task.title}
                    </h4>
                    <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                      isCompleted
                        ? "bg-zinc-100 text-zinc-500"
                        : isActive
                        ? "bg-emerald-500 text-white"
                        : "bg-zinc-50 text-zinc-300"
                    }`}>
                      {task.status}
                    </span>
                  </div>

                  {/* Active Panel Details */}
                  {isActive && (
                    <Card className="mt-4 bg-white border border-zinc-100 shadow-md p-6 rounded-2xl space-y-4">
                      <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                        {task.description}
                      </p>

                      {/* AI tips box (colored lavender per AI assistant guidelines!) */}
                      {task.tips && (
                        <div className="p-4 bg-[#EEEDFE] text-[#584FBC] border border-[#EEEDFE] rounded-xl flex gap-3 items-start">
                          <Lightbulb className="w-5 h-5 shrink-0 text-[#584FBC]" />
                          <div className="space-y-1">
                            <span className="text-[9px] font-black tracking-widest uppercase block text-[#584FBC]">
                              TIPS MENTOR
                            </span>
                            <p className="text-xs font-semibold leading-relaxed">
                              {task.tips}
                            </p>
                          </div>
                        </div>
                      )}

                      {task.actionText && (
                        <Button className="bg-[#00473e] hover:bg-[#00362f] text-white py-2.5 px-5 rounded-xl flex items-center gap-1.5 text-xs font-bold shadow-sm cursor-pointer w-fit">
                          {task.actionText}
                          <Play className="w-3 h-3 fill-current mt-0.5" />
                        </Button>
                      )}
                    </Card>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Sidebar Resources & Action Help */}
      <div className="lg:col-span-4 space-y-6">
        {/* Need Help Card (colored purple `#584FBC` for AI assistant/mentorship support) */}
        <Card className="bg-[#584FBC] text-white p-6 sm:p-8 rounded-3xl border-none shadow-md space-y-5">
          <div className="space-y-2">
            <h3 className="text-lg font-extrabold tracking-tight">Butuh Bantuan?</h3>
            <p className="text-xs text-slate-100 font-medium leading-relaxed">
              Hubungi pendamping program jika Anda menemui kendala teknis saat melakukan wawancara.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-white/10 transition-all cursor-pointer">
              <MessageSquare className="w-4 h-4" />
              Buka Diskusi Kelompok
            </button>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-white/10 transition-all cursor-pointer">
              <Phone className="w-4 h-4" />
              Hubungi Admin
            </button>
          </div>
        </Card>

        {/* Resources Document List */}
        <Card className="bg-white border border-zinc-100 shadow-md p-6 sm:p-8 rounded-3xl space-y-5">
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest border-b border-zinc-50 pb-2">
            RESOURCES
          </h3>
          <div className="space-y-4">
            {resources.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 border border-zinc-100 rounded-xl bg-zinc-50/50 hover:bg-zinc-50 transition-colors"
              >
                <span className="text-xs font-bold text-slate-700">{file.title}</span>
                <button className="text-zinc-400 hover:text-slate-800 transition-colors">
                  {file.type === "pdf" ? <Download className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Impact Roadmap Card Banner */}
        <Card className="bg-white border border-zinc-100 shadow-md overflow-hidden rounded-3xl flex flex-col justify-end min-h-[160px] p-6 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent z-10" />
          {/* Mock image placeholder */}
          <div className="absolute inset-0 bg-zinc-200 bg-[url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&h=250&q=80')] bg-cover bg-center" />
          
          <div className="relative z-20 space-y-1">
            <h4 className="text-sm font-extrabold text-white">Impact Roadmap 2024</h4>
            <p className="text-[10px] text-zinc-300 font-semibold">Lihat kurikulum lengkap</p>
          </div>
        </Card>

        {/* Submit Challenge CTA */}
        <Link href={`/siswa/challenges/${challengeId}/submit`}>
          <Button className="w-full bg-[#00473e] hover:bg-[#00362f] text-white py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold shadow-md cursor-pointer">
            <Send className="w-4.5 h-4.5" />
            Submit Challenge
          </Button>
        </Link>
      </div>
    </div>
  );
}
