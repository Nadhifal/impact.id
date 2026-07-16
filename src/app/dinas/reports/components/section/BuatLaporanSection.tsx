"use client";

import React, { useState } from "react";
import { Calendar, Download } from "lucide-react";
import { Card } from "../ui/Card";
import {
  wilayahOptions,
  periodeOptions,
  jenisLaporanList,
} from "../../data";
import type { ReportFormat, JenisLaporan } from "../../data";

export function BuatLaporanSection() {
  const [wilayah, setWilayah] = useState("all");
  const [periode, setPeriode] = useState("genap-2026");
  const [format, setFormat] = useState<ReportFormat>("PDF");
  const [selectedJenis, setSelectedJenis] = useState<JenisLaporan[]>([]);

  const toggleJenis = (jenis: JenisLaporan) => {
    setSelectedJenis((prev) =>
      prev.includes(jenis) ? prev.filter((j) => j !== jenis) : [...prev, jenis]
    );
  };

  const formatOptions: ReportFormat[] = ["PDF", "Excel", "CSV"];

  const formatStyles: Record<ReportFormat, string> = {
    PDF: "bg-[#00473e] text-white border-[#00473e]",
    Excel: "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
    CSV: "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
  };

  const formatIcons: Record<ReportFormat, string> = {
    PDF: "🗎",
    Excel: "📊",
    CSV: "☰",
  };

  return (
    <Card>
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-6 h-6 rounded-full bg-[#00473e] flex items-center justify-center">
          <span className="text-white text-xs font-bold">+</span>
        </div>
        <h3 className="text-base font-bold text-slate-800">Buat laporan baru</h3>
      </div>

      {/* Row 1: Wilayah + Periode + Format */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        {/* Wilayah */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-2">
            Wilayah
          </label>
          <div className="relative">
            <select
              value={wilayah}
              onChange={(e) => setWilayah(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 bg-white appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-[#00473e]/30 pr-10"
            >
              {wilayahOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▾</span>
          </div>
        </div>

        {/* Periode */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-2">
            Periode
          </label>
          <div className="relative">
            <select
              value={periode}
              onChange={(e) => setPeriode(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 bg-white appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-[#00473e]/30 pr-10"
            >
              {periodeOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Format */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-2">
            Format
          </label>
          <div className="flex gap-2">
            {formatOptions.map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`flex-1 flex items-center justify-center gap-1.5 border rounded-xl py-3 text-sm font-bold transition-all cursor-pointer ${
                  format === f
                    ? "bg-[#00473e] text-white border-[#00473e]"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span>{formatIcons[f]}</span>
                <span>{f}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Jenis Laporan */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-500 mb-3">
          Jenis laporan (Pilih data)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {jenisLaporanList.map((jenis) => {
            const isChecked = selectedJenis.includes(jenis);
            return (
              <label
                key={jenis}
                className="flex items-center gap-2.5 border border-slate-200 rounded-xl px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleJenis(jenis)}
                  className="w-4 h-4 accent-[#00473e] cursor-pointer"
                />
                <span className="text-sm font-semibold text-slate-700">{jenis}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* CTA Button */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-6 py-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl text-sm font-bold transition-colors cursor-pointer">
          <Download className="w-4 h-4" />
          Buat dan unduh laporan
        </button>
      </div>
    </Card>
  );
}
