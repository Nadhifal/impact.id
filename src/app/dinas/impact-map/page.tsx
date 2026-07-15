"use client";

import React from "react";
import { MapKPICards } from "./components/section/MapKPICards";
import { InteractiveMap } from "./components/section/InteractiveMap";
import { RecentHighlights } from "./components/section/RecentHighlights";
import { Plus } from "lucide-react";

export default function NationalImpactMapPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">National Impact Overview</h2>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Real-time distribution of educational and social development projects across Indonesia.
        </p>
      </div>

      {/* KPI stats */}
      <MapKPICards />

      {/* Interactive Map & Rankings */}
      <InteractiveMap />

      {/* Recent Highlights */}
      <RecentHighlights />

      {/* Floating Action Button */}
      <button
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#00473e] hover:bg-[#003830] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all cursor-pointer z-40 group"
        aria-label="Add project"
      >
        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
      </button>
    </div>
  );
}
