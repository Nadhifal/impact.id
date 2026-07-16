"use client";

import React from "react";
import { Sparkles, ChevronRight } from "lucide-react";
import { Card } from "../ui/Card";
import { wilayahProgressData } from "../../data";
import type { WilayahProgress } from "../../data";

function getBarColor(color: WilayahProgress["color"]) {
  switch (color) {
    case "green":
      return "bg-[#00473e]";
    case "teal":
      return "bg-teal-400";
    case "gray":
      return "bg-slate-300";
    case "red":
      return "bg-rose-500";
  }
}

function getValueColor(color: WilayahProgress["color"]) {
  return color === "red" ? "text-rose-600 font-bold" : "text-slate-700 font-semibold";
}

export function WilayahProgressCard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Progress card – 2/3 */}
      <Card className="lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-bold text-slate-800">
            Progres Implementasi per Wilayah
          </h3>
          <button className="text-xs font-bold text-[#00473e] hover:underline cursor-pointer flex items-center gap-0.5">
            Detail Wilayah
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-5">
          {wilayahProgressData.map((item) => (
            <div key={item.name}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-semibold text-slate-600">
                  {item.name}
                </span>
                <span className={`text-sm ${getValueColor(item.color)}`}>
                  {item.percentage}%
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full transition-all duration-700 ${getBarColor(item.color)}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* AI Analytics card – 1/3 */}
      <div className="bg-[#00473e] rounded-2xl p-6 flex flex-col justify-between text-white">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-emerald-300" />
            <span className="text-emerald-300 text-xs font-bold uppercase tracking-wider">
              AI Insights
            </span>
          </div>
          <h3 className="text-xl font-bold leading-snug mb-3">
            Analitik Berbasis AI
          </h3>
          <p className="text-sm text-emerald-100 leading-relaxed">
            Sistem mendeteksi tren keterlambatan distribusi di wilayah Selatan.
            Segera tinjau laporan logistik.
          </p>
        </div>

        <button className="mt-6 w-full border border-emerald-500/50 bg-emerald-900/30 hover:bg-emerald-900/50 text-white rounded-xl py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer">
          Buka Rekomendasi
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
