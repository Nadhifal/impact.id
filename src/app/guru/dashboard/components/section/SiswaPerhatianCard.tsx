"use client";

import React from "react";
import { AlertCircle, Lightbulb, ExternalLink } from "lucide-react";
import { Card } from "../ui/Card";
import { siswaPerhatianData, aiRecommendationDashboard } from "../../data";

export function SiswaPerhatianCard() {
  return (
    <Card className="p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center">
          <AlertCircle className="w-5 h-5 text-rose-500" />
        </div>
        <h3 className="text-base font-bold text-slate-800">Siswa perlu perhatian</h3>
      </div>

      {/* Siswa list */}
      <div className="space-y-2">
        {siswaPerhatianData.map((siswa) => (
          <div
            key={siswa.id}
            className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50"
          >
            <div>
              <p className="text-sm font-bold text-slate-800">{siswa.name}</p>
              <p className="text-xs text-slate-400 font-medium">{siswa.kelas}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-extrabold text-rose-600">HCS {siswa.hcs}</p>
              <p className={`text-[10px] font-bold ${siswa.trend === "turun" ? "text-rose-500" : "text-slate-400"}`}>
                {siswa.trend === "turun" ? "↘ " : "─ "}
                {siswa.trendDesc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* AI Recommendation */}
      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
        <p className="text-xs font-medium text-slate-600 italic leading-relaxed">
          {aiRecommendationDashboard}
        </p>
      </div>

      {/* CTA */}
      <button className="w-full bg-[#00473e] hover:bg-[#003830] text-white rounded-xl py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer">
        Lihat analitik
        <ExternalLink className="w-4 h-4" />
      </button>
    </Card>
  );
}
