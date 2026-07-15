"use client";

import React from "react";
import { Search, Bell, Settings } from "lucide-react";
import Image from "next/image";

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
          placeholder="Cari data, user, atau laporan..."
          className="w-full text-sm pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e] transition-all"
        />
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-6">
        <button
          className="p-2 hover:bg-slate-50 rounded-lg text-slate-500 hover:text-slate-800 transition-all cursor-pointer relative"
          aria-label="Notifikasi"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <button
          className="p-2 hover:bg-slate-50 rounded-lg text-slate-500 hover:text-slate-800 transition-all cursor-pointer border-r border-slate-200 pr-4"
          aria-label="Pengaturan"
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* Profile Avatar Card */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-800">Administrator</p>
            <p className="text-[10px] font-semibold text-slate-400">Super Admin</p>
          </div>
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-slate-200">
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Admin Profile Photo"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </div>
    </header>
  );
}
