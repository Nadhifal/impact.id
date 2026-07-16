"use client";

import React, { useState } from "react";
import { Download } from "lucide-react";
import { Card } from "../ui/Card";
import { siswaOptions, periodeOptions } from "../../data";

export function BuatLaporanSiswaSection() {
  const [siswa, setSiswa] = useState("1");
  const [periode, setPeriode] = useState("genap-2026");
  const [format, setFormat] = useState<"PDF" | "Excel">("PDF");
  const [loading, setLoading] = useState(false);

  const handleBuat = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <Card className="p-6">
      <h3 className="text-base font-bold text-slate-800 mb-5">Buat laporan siswa</h3>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
        {/* Siswa */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Siswa Bimbingan
          </label>
          <div className="relative">
            <select
              value={siswa}
              onChange={(e) => setSiswa(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 bg-white appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-[#00473e]/20 pr-8"
            >
              {siswaOptions.map((o) => (
                <option key={o.id} value={o.id}>{o.name}</option>
              ))}
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▾</span>
          </div>
        </div>

        {/* Periode */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Periode
          </label>
          <div className="relative">
            <select
              value={periode}
              onChange={(e) => setPeriode(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 bg-white appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-[#00473e]/20 pr-8"
            >
              {periodeOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▾</span>
          </div>
        </div>

        {/* Format */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Format
          </label>
          <div className="relative">
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as "PDF" | "Excel")}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 bg-white appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-[#00473e]/20 pr-8"
            >
              <option value="PDF">PDF</option>
              <option value="Excel">Excel</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▾</span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleBuat}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#00473e] hover:bg-[#003830] disabled:opacity-60 text-white rounded-xl text-sm font-bold transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
          {loading ? "Membuat..." : "Buat dan unduh"}
        </button>
      </div>
    </Card>
  );
}
