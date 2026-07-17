"use client";

import React, { useState } from "react";
import { Download, Eye, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "../ui/Card";
import { StatusBadge } from "../ui/StatusBadge";
import { schoolProgramData, filterWilayahOptions, filterProgramOptions, SchoolProgramStatus } from "../../data";

const ITEMS_PER_PAGE = 3;

interface SchoolProgramTableProps {
  schools?: any[];
}

export function SchoolProgramTable({ schools }: SchoolProgramTableProps) {
  const [wilayah, setWilayah] = useState("all");
  const [program, setProgram] = useState("all");
  const [page, setPage] = useState(1);

  const displaySchools = schools
    ? schools.map((s, idx) => ({
        id: String(idx + 1),
        schoolName: s.schoolName,
        schoolId: `ID: ${20200000 + idx}`,
        wilayah: s.city || s.province || "—",
        program: s.totalSubmissions > 0 ? "IMPACT Challenge Semester" : "Kurikulum Merdeka",
        status: (s.avgHcs >= 75 ? "Sesuai Jadwal" : s.avgHcs >= 60 ? "Terhambat" : "Belum Mulai") as SchoolProgramStatus,
        progress: s.totalSubmissions > 0 ? Math.round((s.completedSubmissions / s.totalSubmissions) * 100) : 0,
      }))
    : schoolProgramData;

  const filtered = displaySchools.filter((item) => {
    const matchWilayah =
      wilayah === "all" ||
      item.wilayah.toLowerCase().replace(/\s/g, "-") === wilayah;
    const matchProgram =
      program === "all" ||
      item.program.toLowerCase().replace(/\s/g, "-").includes(program);
    return matchWilayah && matchProgram;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <Card className="p-0 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-800">
            Daftar Sekolah &amp; Program Tindak Lanjut
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Menampilkan {paginated.length} dari {filtered.length} institusi perlu perhatian
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Excel
          </button>
          <button className="px-4 py-2 bg-[#00473e] hover:bg-[#003830] rounded-lg text-sm font-semibold text-white transition-colors cursor-pointer">
            Tambah Laporan
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <select
          value={wilayah}
          onChange={(e) => { setWilayah(e.target.value); setPage(1); }}
          className="text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg px-3 py-2 bg-white cursor-pointer outline-none focus:ring-2 focus:ring-[#00473e]/30"
        >
          {filterWilayahOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <select
          value={program}
          onChange={(e) => { setProgram(e.target.value); setPage(1); }}
          className="text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg px-3 py-2 bg-white cursor-pointer outline-none focus:ring-2 focus:ring-[#00473e]/30"
        >
          {filterProgramOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nama Sekolah</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Wilayah</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Program</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Progres</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginated.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-slate-800">{row.schoolName}</p>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">{row.schoolId}</p>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-600">{row.wilayah}</td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-700">{row.program}</td>
                <td className="px-6 py-4 text-center">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-6 py-4 min-w-[140px]">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          row.progress === 0
                            ? "bg-slate-300"
                            : row.progress < 40
                            ? "bg-slate-400"
                            : "bg-[#00473e]"
                        }`}
                        style={{ width: `${row.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-600 w-8 text-right">
                      {row.progress}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                    aria-label="Detail"
                  >
                    {row.status === "Sesuai Jadwal" ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between p-4 border-t border-slate-100 bg-slate-50/30">
        <p className="text-xs font-medium text-slate-400">
          Menampilkan {paginated.length} dari {filtered.length} institusi perlu perhatian
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-1.5 rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || totalPages === 0}
            className="p-1.5 rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}
