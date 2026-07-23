"use client";

import React from "react";
import { MoreVertical, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card } from "../ui/Card";

export interface ActivityLogItem {
  id: string;
  adminName: string;
  adminLetter: string;
  activity: string;
  time: string;
}

interface ActivityLogsProps {
  logs: ActivityLogItem[];
}

export function ActivityLogs({ logs }: ActivityLogsProps) {
  return (
    <Card className="p-0 overflow-hidden border-slate-200">
      {/* Header section */}
      <div className="flex items-center justify-between p-6 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Log aktivitas terbaru</h3>
          <p className="text-xs text-slate-400 font-medium mt-0.5">Data real dari database</p>
        </div>
        <Link
          href="/admin/logs"
          className="flex items-center gap-1 text-xs font-bold text-[#00473e] hover:text-[#003830] hover:underline"
        >
          <span>Lihat Semua</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Logs Table or Empty State */}
      {logs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-2">
          <span className="text-3xl">📋</span>
          <p className="text-sm font-semibold">Belum ada log aktivitas</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Administrator
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Aktivitas
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Waktu
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                  {/* Administrator Profile Name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs select-none">
                        {row.adminLetter}
                      </div>
                      <span className="text-sm font-bold text-slate-800">{row.adminName}</span>
                    </div>
                  </td>
                  {/* Action details */}
                  <td className="px-6 py-4 text-xs font-semibold text-slate-600">
                    {row.activity}
                  </td>
                  {/* Log time */}
                  <td className="px-6 py-4 text-xs font-semibold text-slate-400">
                    {row.time}
                  </td>
                  {/* Dropdown action */}
                  <td className="px-6 py-4 text-center">
                    <button className="p-1 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-600 transition-colors cursor-pointer inline-flex items-center justify-center">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
