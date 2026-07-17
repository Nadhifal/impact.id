"use client";

import React, { useState } from "react";
import { Search, ChevronDown, Award, Zap, UserX, UserCheck, Settings, Circle } from "lucide-react";
import { Card } from "../../../layouts/ui/Card";
import { AdminLogItem } from "../../data";

interface ActivityFeedProps {
  logs: AdminLogItem[];
}

function ActionIcon({ type }: { type: AdminLogItem["actionType"] }) {
  const config = {
    "sertifikat": {
      bg: "bg-emerald-100",
      icon: <Award className="w-4 h-4 text-emerald-600" />,
    },
    "challenge": {
      bg: "bg-blue-100",
      icon: <Zap className="w-4 h-4 text-blue-600" />,
    },
    "user-ban": {
      bg: "bg-rose-100",
      icon: <UserX className="w-4 h-4 text-rose-600" />,
    },
    "user-approve": {
      bg: "bg-violet-100",
      icon: <UserCheck className="w-4 h-4 text-violet-600" />,
    },
    "pengaturan": {
      bg: "bg-slate-100",
      icon: <Settings className="w-4 h-4 text-slate-500" />,
    },
  };

  const c = config[type];
  return (
    <div className={`w-9 h-9 rounded-full ${c.bg} flex items-center justify-center shrink-0`}>
      {c.icon}
    </div>
  );
}

function highlightColor(type: AdminLogItem["actionType"]): string {
  if (type === "sertifikat") return "text-[#00473e] underline underline-offset-2";
  if (type === "challenge") return "font-bold text-slate-800";
  if (type === "user-ban") return "font-bold text-rose-600";
  if (type === "user-approve") return "font-bold text-slate-800";
  return "";
}

export function ActivityFeed({ logs }: ActivityFeedProps) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("7");

  const filteredLogs = logs.filter((l) => {
    const matchesSearch = l.adminName.toLowerCase().includes(search.toLowerCase()) ||
      l.activity.toLowerCase().includes(search.toLowerCase()) ||
      (l.highlight || "").toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || l.actionType === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs font-semibold px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e] cursor-pointer flex items-center gap-1"
          >
            <option value="all">Semua jenis aksi</option>
            <option value="sertifikat">Sertifikat</option>
            <option value="challenge">Challenge</option>
            <option value="user-ban">Nonaktifkan user</option>
            <option value="user-approve">Verifikasi user</option>
            <option value="pengaturan">Pengaturan</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="text-xs font-semibold px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e] cursor-pointer"
          >
            <option value="7">7 hari terakhir</option>
            <option value="30">30 hari terakhir</option>
            <option value="90">3 bulan terakhir</option>
          </select>
        </div>

        <span className="text-xs font-semibold text-slate-400">
          Menampilkan 1–{filteredLogs.length} dari {logs.length} aktivitas
        </span>
      </div>

      {/* Activity Card */}
      <Card className="p-0 overflow-hidden border-slate-200">
        {filteredLogs.length === 0 && (
          <div className="px-6 py-12 text-center text-xs text-slate-400 font-semibold">
            Tidak ada log ditemukan
          </div>
        )}

        <ul className="divide-y divide-slate-100">
          {filteredLogs.map((row) => (
            <li key={row.id} className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50/50 transition-colors">
              {/* Timestamp */}
              <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap pt-0.5 w-24 shrink-0">
                {row.timestamp}
              </span>

              {/* Icon */}
              <ActionIcon type={row.actionType} />

              {/* Text */}
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                <span className="font-bold text-slate-800">{row.adminName} </span>
                {row.activity}{" "}
                {row.highlight && (
                  <span className={highlightColor(row.actionType)}>
                    {row.highlight}
                  </span>
                )}
              </p>
            </li>
          ))}
        </ul>

        {/* Load More */}
        <div className="p-6 border-t border-slate-100 flex justify-center">
          <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-600 transition-all cursor-pointer">
            <span>Muat lebih banyak</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </Card>

      {/* System Status Footer */}
      <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 px-1">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="font-bold text-slate-500">STATUS SISTEM:</span>
            <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500" />
            <span className="text-emerald-600 font-bold">Operasional</span>
          </span>
          <span>
            <span className="font-bold text-slate-500">TERAKHIR SINKRONISASI:</span>{" "}
            17 Jul 2026, 11:00
          </span>
        </div>
        <span>© 2026 IMPACT.ID · Hubungi Dukungan</span>
      </div>
    </div>
  );
}
