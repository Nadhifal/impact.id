"use client";

import React from "react";
import { Clock, Download, ChevronRight } from "lucide-react";
import { Card } from "../ui/Card";
import { FormatBadge } from "../ui/FormatBadge";
import { reportHistoryData } from "../../data";

export function RiwayatLaporanSection() {
  return (
    <Card className="p-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-500" />
          <h3 className="text-base font-bold text-slate-800">Riwayat laporan</h3>
        </div>
        <button className="text-xs font-bold text-[#00473e] hover:underline cursor-pointer flex items-center gap-0.5">
          Lihat semua
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100">
              <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Nama laporan
              </th>
              <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Periode
              </th>
              <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Format
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
            {reportHistoryData.map((report) => (
              <tr
                key={report.id}
                className="hover:bg-slate-50/50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-slate-800">
                    {report.name}
                  </p>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-500">
                  {report.periode}
                </td>
                <td className="px-6 py-4">
                  <FormatBadge format={report.format} />
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-500">
                  {report.createdAt}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                    aria-label="Unduh laporan"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
