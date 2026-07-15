"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { nationalImpactSummary } from "../../data";

export function ImpactOverviewCard() {
  return (
    <div className="bg-[#003830] text-white rounded-2xl p-6 h-[400px] flex flex-col justify-between shadow-xs">
      <div>
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-bold">Peta Dampak Nasional</h3>
        </div>
        <p className="text-xs text-emerald-100/70 font-medium mt-1">
          Distribusi keberhasilan di seluruh wilayah Indonesia.
        </p>

        {/* List of Provinces */}
        <div className="mt-8 space-y-4">
          {nationalImpactSummary.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0 last:pb-0">
              <span className="text-sm font-semibold text-emerald-50">{item.province}</span>
              <span className="text-base font-bold text-white select-none">{item.score}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Button link to details map */}
      <Link
        href="/dinas/impact-map"
        className="w-full bg-[#82ece0] text-[#003830] font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#6edcd0] transition-colors mt-auto group"
      >
        <span>Buka Peta Detail</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
}
