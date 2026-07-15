"use client";

import React from "react";
import { Search, Bell, Settings } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 sticky top-0 z-20">
      {/* Brand Label/Logo for header */}
      <div className="flex items-center gap-2">
        <span className="text-lg font-black text-slate-800 tracking-tight">IMPACT.ID</span>
      </div>

      {/* Center Search Input */}
      <div className="w-96 relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Cari sekolah atau daerah..."
          className="w-full text-sm pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e] transition-all"
        />
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4">
        <button
          className="p-2 hover:bg-slate-50 rounded-lg text-slate-500 hover:text-slate-800 transition-all cursor-pointer relative"
          aria-label="Notifikasi"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <button
          className="p-2 hover:bg-slate-50 rounded-lg text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
          aria-label="Pengaturan"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
