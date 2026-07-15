"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Card } from "@/app/shared/components/ui/card";

interface ProjectItem {
  title: string;
  category: string;
  description: string;
  tags: string[];
  isVerified: boolean;
  imageUrl: string;
}

interface PortfolioProjectCardProps {
  project: ProjectItem;
}

export function PortfolioProjectCard({ project }: PortfolioProjectCardProps) {
  return (
    <Card className="overflow-hidden bg-white border border-zinc-100 shadow-md rounded-2xl flex flex-col justify-between min-h-[360px] hover:shadow-lg transition-all duration-300">
      <div>
        <div className="relative aspect-video w-full border-b border-zinc-100 bg-zinc-50">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-primary bg-surface-light px-2.5 py-1 rounded-md uppercase tracking-wider">
              {project.category}
            </span>
            {project.isVerified && (
              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 fill-current" />
            )}
          </div>
          <h3 className="text-base font-extrabold text-slate-900 leading-snug">{project.title}</h3>
          <p className="text-xs text-zinc-500 leading-relaxed font-medium line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-2 flex flex-col gap-3">
        {/* Project Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[9px] font-extrabold text-zinc-400 bg-zinc-50 border border-zinc-100 py-1 px-2.5 rounded-md">
              {tag}
            </span>
          ))}
        </div>
        <button className="w-full py-2.5 bg-[#00473e] hover:bg-[#003830] text-white text-xs font-bold rounded-xl transition-all cursor-pointer text-center border-none">
          Pelajari Selengkapnya
        </button>
      </div>
    </Card>
  );
}
