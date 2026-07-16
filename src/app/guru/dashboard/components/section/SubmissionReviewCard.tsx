"use client";

import React from "react";
import { CheckSquare, ChevronRight, ExternalLink } from "lucide-react";
import { Card } from "../ui/Card";
import { submissionsMenunggu as fallbackData } from "../../data";
import type { SubmissionItem } from "../../data";

const SHOW = 2;

interface SubmissionReviewCardProps {
  submissions?: SubmissionItem[];
}

export function SubmissionReviewCard({ submissions: propData }: SubmissionReviewCardProps) {
  const allSubmissions = propData ?? fallbackData;
  const displayed = allSubmissions.slice(0, SHOW);
  const total = allSubmissions.length;

  const avatarColors = [
    "bg-slate-300 text-slate-700",
    "bg-blue-100 text-blue-700",
    "bg-purple-100 text-purple-700",
  ];

  return (
    <Card className="p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center">
            <CheckSquare className="w-5 h-5 text-[#00473e]" />
          </div>
          <h3 className="text-base font-bold text-slate-800">Submission menunggu review</h3>
        </div>
        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
          {total} Total
        </span>
      </div>

      {/* List */}
      <div className="space-y-3">
        {total === 0 ? (
          <div className="p-4 rounded-xl border border-slate-100 text-center">
            <p className="text-sm text-slate-400 font-medium">Belum ada submission yang menunggu review.</p>
          </div>
        ) : (
          displayed.map((sub, idx) => (
            <div
              key={sub.id}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group border border-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${avatarColors[idx % avatarColors.length]}`}>
                  {sub.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{sub.name}</p>
                  <p className="text-xs text-slate-400 font-medium">{sub.projectTitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-xs font-medium">{sub.timeAgo}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* CTA */}
      {total > 0 && (
        <button className="w-full border border-dashed border-slate-300 rounded-xl py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-center gap-2">
          Lihat semua ({total})
          <ExternalLink className="w-4 h-4" />
        </button>
      )}
    </Card>
  );
}
