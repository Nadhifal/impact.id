"use client";

import React, { useState } from "react";
import { Search, Bell, HelpCircle, LogOut, ChevronDown } from "lucide-react";
import { useUser } from "@/app/shared/context/AuthContext";

export function Header() {
  const { user, logout } = useUser();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "??";

  const roleLabel = user?.role === "DINAS" ? "Dinas Pendidikan" : user?.role ?? "—";

  return (
    <header className="flex items-center justify-between py-4 px-8 bg-white border-b border-slate-200 sticky top-0 z-20">
      {/* Search */}
      <div className="relative w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Cari sekolah atau daerah..."
          className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#00473e]/20"
        />
      </div>

      {/* Action Icons & Profile */}
      <div className="flex items-center gap-4 text-slate-500">
        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer relative">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>
        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer">
          <HelpCircle className="w-5 h-5 text-slate-600" />
        </button>

        {/* User Dropdown */}
        <div className="relative pl-3 border-l border-slate-200">
          <button
            onClick={() => setShowUserMenu((p) => !p)}
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="text-right">
              <p className="text-sm font-bold text-slate-800 leading-tight">{user?.name ?? "—"}</p>
              <p className="text-[10px] text-slate-400 font-semibold">{roleLabel}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#e6f4f1] flex items-center justify-center font-bold text-[#00473e] text-sm border border-[#00473e]/20">
              {initials}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
              <div className="absolute right-0 top-12 z-50 w-52 bg-white border border-zinc-100 rounded-2xl shadow-lg py-2 overflow-hidden">
                <div className="px-4 py-3 border-b border-zinc-50">
                  <p className="text-sm font-bold text-slate-800 truncate">{user?.name ?? "—"}</p>
                  <p className="text-xs text-slate-400 truncate">{user?.email ?? "—"}</p>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Keluar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
