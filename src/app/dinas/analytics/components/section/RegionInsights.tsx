"use client";

import React from "react";
import { Lightbulb, Info } from "lucide-react";
import { regionalInsights } from "../../data";

export function RegionInsights() {
  return (
    <div className="bg-[#003830] text-white rounded-2xl p-6 h-[400px] flex flex-col justify-between shadow-xs">
      <div className="space-y-5">
        <h3 className="text-lg font-bold">Insight Wilayah</h3>
        
        {/* Insight items */}
        <div className="space-y-4">
          {regionalInsights.map((insight, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-3">
              <div className="shrink-0 mt-0.5">
                {insight.type === "KEUNGGULAN" ? (
                  <Lightbulb className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Info className="w-4 h-4 text-teal-300" />
                )}
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-slate-300 tracking-wider uppercase block mb-1">
                  {insight.title}
                </span>
                <p className="text-xs font-semibold leading-relaxed text-emerald-50">
                  {insight.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full bg-white text-[#003830] font-bold text-sm py-3 px-4 rounded-xl hover:bg-slate-100 transition-colors mt-auto cursor-pointer text-center">
        Lihat Detail Wilayah
      </button>
    </div>
  );
}
