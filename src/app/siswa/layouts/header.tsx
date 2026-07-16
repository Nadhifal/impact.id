"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Bell, Settings, LogOut } from "lucide-react";
import { Sidebar } from "./sidebar";
import { useUser } from "@/app/shared/context/AuthContext";

export function Header() {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useUser();

  // Avatar initials fallback
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "??";

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-zinc-100 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Hamburger + Logo (mobile) */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="md:hidden p-2 text-zinc-500 hover:text-slate-800 hover:bg-zinc-50 rounded-lg transition-all cursor-pointer"
              aria-label="Buka Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link href="/" className="md:hidden text-xl font-black text-slate-900 tracking-tight">
              IMPACT.ID
            </Link>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-4 sm:gap-6 ml-auto">
            {/* Notifications */}
            <Link
              href="/siswa/notifications"
              className={`p-2 hover:bg-zinc-50 rounded-full transition-all cursor-pointer relative ${
                pathname === "/siswa/notifications" ? "text-[#00473e]" : "text-zinc-400 hover:text-slate-800"
              }`}
              aria-label="Notifikasi"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </Link>

            {/* Settings */}
            <Link
              href="/siswa/settings"
              className={`p-2 hover:bg-zinc-50 rounded-full transition-all cursor-pointer ${
                pathname === "/siswa/settings" ? "text-[#00473e]" : "text-zinc-400 hover:text-slate-800"
              }`}
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
            </Link>

            {/* Avatar Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu((p) => !p)}
                className="relative w-9 h-9 rounded-full overflow-hidden border border-zinc-200 hover:border-[#00473e] transition-all bg-[#e6f4f1] flex items-center justify-center text-xs font-bold text-[#00473e] cursor-pointer"
                aria-label="User menu"
              >
                {initials}
              </button>

              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 top-11 z-50 w-52 bg-white border border-zinc-100 rounded-2xl shadow-lg py-2 overflow-hidden">
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
        </div>
      </header>

      {/* Mobile Drawer */}
      <Sidebar isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      {isDrawerOpen && (
        <div
          onClick={() => setIsDrawerOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
        />
      )}
    </>
  );
}
