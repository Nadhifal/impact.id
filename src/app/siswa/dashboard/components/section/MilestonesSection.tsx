"use client";

import React from "react";
import { FileText, Video, Award, Users } from "lucide-react";
import { Card } from "@/app/shared/components/ui/card";

interface Milestone {
  date: string;
  title: string;
  iconName: "webinar" | "report" | "cert" | "networking";
}

interface MilestonesSectionProps {
  milestones: Milestone[];
}

export function MilestonesSection({ milestones }: MilestonesSectionProps) {
  const getMilestoneIcon = (iconName: string) => {
    switch (iconName) {
      case "webinar":
        return <Video className="w-5 h-5 text-indigo-500" />;
      case "report":
        return <FileText className="w-5 h-5 text-emerald-500" />;
      case "cert":
        return <Award className="w-5 h-5 text-amber-500" />;
      case "networking":
        return <Users className="w-5 h-5 text-blue-500" />;
      default:
        return <FileText className="w-5 h-5 text-zinc-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900">Upcoming Milestones</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {milestones.map((milestone, idx) => (
          <Card
            key={idx}
            className="bg-white border border-zinc-100 shadow-sm hover:shadow-md p-6 rounded-2xl flex flex-col justify-between min-h-[130px] hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center shrink-0 mb-4">
              {getMilestoneIcon(milestone.iconName)}
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                {milestone.date}
              </span>
              <h4 className="text-sm font-bold text-slate-900">{milestone.title}</h4>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
