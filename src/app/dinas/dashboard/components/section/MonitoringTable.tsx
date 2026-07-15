"use client";

import React from "react";
import { Filter, Download, ChevronRight } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { schoolMonitoringData } from "../../data";

export function MonitoringTable() {
  return (
    <Card className="p-0 overflow-hidden">
      {/* Table Title and Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Monitoring Program per Sekolah/Daerah</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Update status aktivitas program terakhir.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#00473e] rounded-lg text-sm font-semibold text-white hover:bg-[#003830] transition-colors cursor-pointer">
            <Download className="w-4 h-4" />
            <span>Ekspor</span>
          </button>
        </div>
      </div>

      {/* Table Element */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Sekolah / Daerah
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">
                Siswa Aktif
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">
                Tantangan Selesai
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">
                Skor SDM
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">
                Status
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {schoolMonitoringData.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-600 select-none">
                      {row.type}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{row.name}</p>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">{row.district}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-700 text-right select-none">
                  {row.activeStudents.toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-700 text-right select-none">
                  {row.completedChallenges.toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-4 text-sm font-extrabold text-slate-900 text-right select-none">
                  {row.sdmScore.toFixed(1)}
                </td>
                <td className="px-6 py-4 text-center">
                  <Badge status={row.status} />
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    className="p-1 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-700 transition-colors cursor-pointer inline-flex items-center justify-center"
                    aria-label="Lihat detail"
                  >
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/30 text-center">
        <button className="text-xs font-bold text-slate-600 hover:text-slate-800 hover:underline cursor-pointer">
          Lihat Semua Sekolah
        </button>
      </div>
    </Card>
  );
}
