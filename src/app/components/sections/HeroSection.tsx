import React from "react";
import Image from "next/image";
import { Button } from "@/app/shared/components/ui/button";
import { Card } from "@/app/shared/components/ui/card";
import { StatCard } from "../ui/StatCard";
import { HighlightCard } from "../ui/HighlightCard";
import { Badge } from "@/app/shared/components/ui/badge";
import { stats as defaultStats } from "../../data";
import { Sparkles, ArrowRight } from "lucide-react";

export function HeroSection({ stats = defaultStats }: { stats?: typeof defaultStats }) {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-[#f0f8f7] via-[#f7fcfb] to-white">
      {/* Subtle background glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00473e]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00473e]/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Hero Left */}
        <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left space-y-6">
          <Badge variant="outline" className="animate-fade-in bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-900/30 px-4 py-1.5 font-semibold text-xs tracking-wide">
            Empowering Future Skills
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.2] lg:leading-[1.1] text-slate-900">
            Belajar dengan{" "}
            <span className="text-[#00473e] relative inline-block">
              berkarya
            </span>
            ,<br className="hidden sm:inline" />
            <span className="inline lg:block"> bertumbuh dengan </span>
            <span className="text-[#00473e] relative inline-block">
              berdampak
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-md lg:max-w-xl leading-relaxed">
            Bangun portofolio profesional berbasis proyek nyata dan dapatkan pengakuan
            global melalui teknologi blockchain.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-6 pt-2 w-full">
            <Button variant="primary" size="lg" className="group w-full sm:w-auto justify-center bg-[#00473e] text-white">
              Mulai Sekarang
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>

            {/* Members Avatars (hidden on mobile, flex on desktop/tablet) */}
            <div className="hidden md:flex items-center gap-3 bg-[#e6f4f1]/50 dark:bg-[#002b25]/10 px-4 py-2 rounded-full border border-slate-100">
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
                ].map((src, i) => (
                  <div
                    key={i}
                    className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                  >
                    <Image
                      src={src}
                      alt="Avatar"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-700">
                +2k Leaders bergabung
              </span>
            </div>
          </div>
        </div>

        {/* Hero Right: Stats Grid */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <StatCard value={stats[0].value} label={stats[0].label} />
            <StatCard value={stats[1].value} label={stats[1].label} />
          </div>

          {/* AI Career Mentor Card - light theme on mobile, dark green on desktop */}
          <HighlightCard value={stats[2].value} label={stats[2].label} />
        </div>
      </div>
    </section>
  );
}
