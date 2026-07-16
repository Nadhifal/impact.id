"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Bell, Settings } from "lucide-react";
import { Sidebar } from "./sidebar";
import { useUser } from "@/app/shared/context/AuthContext";
import Image from "next/image";

export function Header() {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [storedAvatar, setStoredAvatar] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    // Try localStorage first for immediate display
    const cached = localStorage.getItem("impact_avatar");
    if (cached) setStoredAvatar(cached);

    // Then sync from DB
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        if (data?.avatarUrl) {
          setStoredAvatar(data.avatarUrl);
          localStorage.setItem("impact_avatar", data.avatarUrl);
        }
      })
      .catch(() => {/* ignore */});
  }, []);

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

            {/* Avatar - langsung ke halaman profil */}
            <Link
              href="/siswa/profile"
              className={`relative w-9 h-9 rounded-full overflow-hidden border transition-all bg-[#e6f4f1] flex items-center justify-center text-xs font-bold text-[#00473e] cursor-pointer ${
                pathname === "/siswa/profile"
                  ? "border-[#00473e] ring-2 ring-[#00473e]/20"
                  : "border-zinc-200 hover:border-[#00473e]"
              }`}
              aria-label="Profil"
            >
              {storedAvatar ? (
                <Image src={storedAvatar} alt="Avatar" fill className="object-cover" unoptimized />
              ) : (
                initials
              )}
            </Link>
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
