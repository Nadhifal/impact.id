"use client";

import React from "react";
import { MessageSquare, Flag, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { ApiAdminStats } from "@/lib/api";

interface ActionRequiredProps {
  stats: ApiAdminStats | null;
}

export function ActionRequired({ stats }: ActionRequiredProps) {
  const inProgress = stats?.submissionsByStatus.find((s) => s.status === "IN_PROGRESS")?._count?.id ?? 0;
  const revision = stats?.submissionsByStatus.find((s) => s.status === "REVISION_REQUESTED")?._count?.id ?? 0;
  const completed = stats?.completedSubmissions ?? 0;

  const actionRequiredItems = [
    {
      id: "act-1",
      text: `${inProgress} submission sedang in progress`,
      type: "review",
    },
    {
      id: "act-2",
      text: `${revision} submission perlu revisi`,
      type: "report",
    },
    {
      id: "act-3",
      text: `${completed} challenge telah diselesaikan`,
      type: "audit",
    },
  ];
  const getIcon = (type: string) => {
    switch (type) {
      case "review":
        return <MessageSquare className="w-4 h-4 text-blue-600" />;
      case "report":
        return <Flag className="w-4 h-4 text-red-600" />;
      case "audit":
        return <ShieldAlert className="w-4 h-4 text-emerald-600" />;
      default:
        return <MessageSquare className="w-4 h-4 text-slate-600" />;
    }
  };

  const getAlertStyle = (type: string) => {
    switch (type) {
      case "review":
        return "bg-blue-50 border-l-4 border-blue-500 text-blue-900";
      case "report":
        return "bg-red-50 border-l-4 border-red-500 text-red-900";
      case "audit":
        return "bg-emerald-50 border-l-4 border-emerald-500 text-emerald-900";
      default:
        return "bg-slate-50 border-l-4 border-slate-500 text-slate-900";
    }
  };

  const getLink = (type: string) => {
    switch (type) {
      case "review":
        return "/admin/manage-challenge";
      case "report":
        return "/admin/reports";
      case "audit":
        return "/admin/portfolio-certificate";
      default:
        return "/admin/dashboard";
    }
  };

  return (
    <div className="space-y-6 flex flex-col justify-between h-[400px]">
      <div className="space-y-3.5">
        <h3 className="text-lg font-bold text-slate-800">Perlu tindakan cepat</h3>

        {/* List of alert items */}
        <div className="space-y-3">
          {actionRequiredItems.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-r-xl flex items-center justify-between gap-3 shadow-xs ${getAlertStyle(item.type)}`}
            >
              <div className="flex items-center gap-3">
                <span className="shrink-0">{getIcon(item.type)}</span>
                <span className="text-xs font-bold leading-relaxed">{item.text}</span>
              </div>
              <Link
                href={getLink(item.type)}
                className="text-xs font-extrabold hover:underline shrink-0"
              >
                [Lihat]
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Server Uptime Card */}
      <div className="bg-[#003830] text-white rounded-2xl p-5 shadow-xs">
        <h4 className="text-sm font-bold">Status Server</h4>
        <div className="flex items-center gap-2 mt-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <p className="text-xs font-semibold text-emerald-100">
            Optimal <span className="opacity-70">(99.9% uptime)</span>
          </p>
        </div>
        {/* Progress Bar indicator */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-3.5">
          <div className="h-full bg-emerald-400 rounded-full w-[99.9%]" />
        </div>
      </div>
    </div>
  );
}
