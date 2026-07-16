"use client";

import React, { useState } from "react";
import { AnalitikKPIRow } from "./components/section/AnalitikKPIRow";
import { DaftarSiswaCard } from "./components/section/DaftarSiswaCard";
import { ProgresDetailPanel } from "./components/section/ProgresDetailPanel";
import { Plus } from "lucide-react";

export default function AnalitikProgresPage() {
  const [selectedId, setSelectedId] = useState("1");

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full relative">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">
          Analitik progres siswa
        </h2>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Pantau perkembangan kompetensi dan capaian HCS siswa bimbingan Anda secara real-time.
        </p>
      </div>

      {/* KPI Row */}
      <AnalitikKPIRow />

      {/* Main Content: Daftar Siswa + Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4">
          <DaftarSiswaCard selectedId={selectedId} onSelect={setSelectedId} />
        </div>
        <div className="lg:col-span-8">
          <ProgresDetailPanel selectedId={selectedId} />
        </div>
      </div>

      {/* FAB */}
      <button
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#00473e] hover:bg-[#003830] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all cursor-pointer z-40 group"
        aria-label="Input Penilaian"
      >
        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
      </button>
    </div>
  );
}
