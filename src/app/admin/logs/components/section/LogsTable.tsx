"use client";

import React, { useState } from "react";
import { Search, ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";
import { Card } from "../../../layouts/ui/Card";
import { AdminLogItem } from "../../data";

interface LogsTableProps {
  logs: AdminLogItem[];
}

export function LogsTable({ logs }: LogsTableProps) {
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("all");

  const filteredLogs = logs.filter((l) => {
    const matchesSearch = l.adminName.toLowerCase().includes(search.toLowerCase()) || 
                          l.activity.toLowerCase().includes(search.toLowerCase());
    const matchesModule = moduleFilter === "all" || l.module === moduleFilter;
    return matchesSearch && matchesModule;
  });

  return (
    <Card className="p-0 overflow-hidden border-slate-200">
      {/* Search & Filter */}
      <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-slate-50/20">
        <div className="flex flex-wrap items-center gap-3.5 flex-1 min-w-0">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari admin atau aktivitas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e] transition-all"
            />
          </div>

          <select
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
            className="text-xs font-semibold px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e] cursor-pointer"
          >
            <option value="all">Semua Modul</option>
            <option value="CHALLENGE">Challenge</option>
            <option value="USER">User</option>
            <option value="SERTIFIKAT">Sertifikat</option>
            <option value="PENGATURAN">Pengaturan</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Administrator</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Aktivitas</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Modul</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Waktu</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredLogs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-xs text-slate-400 font-semibold">
                  Tidak ada log ditemukan
                </td>
              </tr>
            )}
            {filteredLogs.map((row) => {
              const moduleColors = {
                CHALLENGE: "bg-amber-50 text-amber-700 border-amber-100",
                USER: "bg-blue-50 text-blue-700 border-blue-100",
                SERTIFIKAT: "bg-emerald-50 text-emerald-700 border-emerald-100",
                PENGATURAN: "bg-purple-50 text-purple-700 border-purple-100",
                SISTEM: "bg-slate-100 text-slate-700 border-slate-200",
              };

              return (
                <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs select-none">
                        {row.adminLetter}
                      </div>
                      <span className="text-sm font-bold text-slate-800">{row.adminName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-600">{row.activity}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 text-[9px] font-bold border rounded-full ${moduleColors[row.module]}`}>
                      {row.module}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-400">{row.time}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-1 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between flex-wrap gap-4">
        <p className="text-xs font-semibold text-slate-400">
          Menampilkan {filteredLogs.length} dari {logs.length} log
        </p>
        <div className="flex items-center gap-1.5">
          <button className="p-1.5 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 cursor-pointer transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-lg text-xs font-bold bg-[#00473e] text-white flex items-center justify-center select-none">1</button>
          <button className="p-1.5 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 cursor-pointer transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}
