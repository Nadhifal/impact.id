"use client";

import React, { useState } from "react";
import { Search, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "../ui/Card";
import { riwayatLaporanData } from "../../data";
import type { LaporanFormat } from "../../data";

const ITEMS_PER_PAGE = 3;

function FormatIcon({ format }: { format: LaporanFormat }) {
  return (
    <div
      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-extrabold shrink-0 ${
        format === "PDF"
          ? "bg-rose-50 text-rose-600"
          : "bg-emerald-50 text-emerald-700"
      }`}
    >
      {format === "PDF" ? "📄" : "📊"}
    </div>
  );
}

export function RiwayatLaporanTable() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = riwayatLaporanData.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-slate-800">Riwayat laporan siswa ini</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="Cari laporan..."
            className="pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#00473e]/20 w-56"
          />
        </div>
      </div>

      {/* Table */}
      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Nama laporan
              </th>
              <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Periode
              </th>
              <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Dibuat
              </th>
              <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginated.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <FormatIcon format={r.format} />
                    <p className="text-sm font-bold text-slate-800">{r.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-500">{r.periode}</td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-500">{r.createdAt}</td>
                <td className="px-6 py-4 text-center">
                  <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer">
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/30">
          <p className="text-xs font-medium text-slate-400">
            Menampilkan {paginated.length} dari {filtered.length} laporan
          </p>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  page === p
                    ? "bg-[#00473e] text-white"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
