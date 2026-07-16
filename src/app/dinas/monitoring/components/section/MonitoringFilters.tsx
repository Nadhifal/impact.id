"use client";

import React, { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { filterWilayahOptions, filterProgramOptions } from "../../data";

export function MonitoringFilters() {
  const [wilayah, setWilayah] = useState("all");
  const [program, setProgram] = useState("all");

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Wilayah dropdown */}
      <div className="relative">
        <select
          value={wilayah}
          onChange={(e) => setWilayah(e.target.value)}
          className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-[#00473e]/30 pr-8"
        >
          {filterWilayahOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▾</span>
      </div>

      {/* Program dropdown */}
      <div className="relative">
        <select
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-[#00473e]/30 pr-8"
        >
          {filterProgramOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▾</span>
      </div>

      {/* Filter button */}
      <button className="flex items-center gap-2 px-4 py-2.5 bg-[#00473e] hover:bg-[#003830] text-white rounded-xl text-sm font-bold transition-colors cursor-pointer">
        <SlidersHorizontal className="w-4 h-4" />
        Filter
      </button>
    </div>
  );
}
