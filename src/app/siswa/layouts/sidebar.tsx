"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Award,
  Contact,
  X,
  Settings,
  LogOut,
  Brain,
} from "lucide-react";
import { useUser } from "@/app/shared/context/AuthContext";

interface SidebarProps {
  onClose?: () => void;
  isOpen?: boolean;
}

export function Sidebar({ onClose, isOpen = false }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useUser();
  const [storedAvatar, setStoredAvatar] = useState<string | null>(null);

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

  const displayName = user?.name ?? "Siswa";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const menuItems = [
    { name: "Dashboard", href: "/siswa/dashboard", icon: LayoutGrid },
    { name: "Challenges", href: "/siswa/challenges", icon: Award },
    { name: "Portofolio", href: "/siswa/portofolio", icon: Contact },
  ];

  const handleLogout = async () => {
    localStorage.removeItem("hcs_scores");
    localStorage.removeItem("impact_avatar");
    await logout();
  };

  return (
    <>
      {/* Desktop Sidebar — always visible on md+ */}
      <aside className="hidden md:flex w-[300px] bg-white border-r border-zinc-100 flex-col h-screen fixed left-0 top-0 z-30 justify-between p-6">
        <div>
          {/* Brand */}
          <div className="mb-8">
            <Link href="/" className="text-xl font-black text-slate-900 tracking-tight">
              IMPACT.ID
            </Link>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Student Portal</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 mb-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/siswa/dashboard" && pathname.startsWith(item.href));
              return (
                <Link key={item.name} href={item.href}>
                  <span
                    className={`flex items-center gap-3.5 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 ${
                      isActive
                        ? "bg-zinc-50 text-[#00473e] border-l-4 border-[#00473e]"
                        : "text-zinc-500 hover:text-slate-800 hover:bg-zinc-50/50"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-[#00473e]" : "text-zinc-400"}`} />
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* AI Mentor CTA */}
          <div className="space-y-3">
            <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider block">
              GROWTH SUPPORT
            </span>
            <Link href="#">
              <div className="w-full bg-[#584FBC] text-white rounded-2xl p-4 flex items-center justify-between shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                    <Brain className="w-5 h-5 fill-current" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold tracking-wide">AI Mentor</h4>
                    <p className="text-[10px] text-white/80 font-medium">Get Guidance</p>
                  </div>
                </div>
                <span className="text-white/80 font-bold text-lg">&rsaquo;</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-6 border-t border-zinc-100 space-y-4">
          <Link
            href="/siswa/settings"
            className="flex items-center gap-3.5 py-2 px-4 rounded-xl text-sm font-bold text-zinc-500 hover:text-slate-800 hover:bg-zinc-50/50 transition-colors"
          >
            <Settings className="w-5 h-5 text-zinc-400" />
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3.5 py-2 px-4 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50/50 transition-colors w-full cursor-pointer"
          >
            <LogOut className="w-5 h-5 text-red-400" />
            Logout
          </button>
          <div className="text-[10px] font-bold text-zinc-400 px-4 flex justify-between items-center">
            <span>© 2024 IMPACT.ID</span>
            <div className="flex gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#00473e]" />
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[300px] bg-white border-r border-zinc-100 p-6 flex flex-col justify-between transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Close Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="p-1 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer"
              aria-label="Tutup Menu"
            >
              <X className="w-6 h-6 text-zinc-500" />
            </button>
          </div>

          {/* Profile Card — uses auth context data */}
          <div className="flex flex-col items-start space-y-3 mb-8">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-emerald-400">
              {storedAvatar ? (
                <Image
                  src={storedAvatar}
                  alt={`${displayName} Avatar`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-[#e6f4f1] flex items-center justify-center text-xl font-bold text-[#00473e]">
                  {initials}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 leading-tight">{displayName.split(" ")[0]}</h2>
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-0.5">
                MAHASISWA
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 mb-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/siswa/dashboard" && pathname.startsWith(item.href));
              return (
                <Link key={item.name} href={item.href} onClick={onClose}>
                  <span
                    className={`flex items-center gap-3.5 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 ${
                      isActive
                        ? "bg-zinc-50 text-[#00473e] border-l-4 border-[#00473e]"
                        : "text-zinc-500 hover:text-slate-800 hover:bg-zinc-50/50"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-[#00473e]" : "text-zinc-400"}`} />
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* AI Mentor CTA */}
          <div className="space-y-3">
            <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider block">
              GROWTH SUPPORT
            </span>
            <Link href="#" onClick={onClose}>
              <div className="w-full bg-[#584FBC] text-white rounded-2xl p-4 flex items-center justify-between shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                    <Brain className="w-5 h-5 fill-current" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold tracking-wide">AI Mentor</h4>
                    <p className="text-[10px] text-white/80 font-medium">Get Guidance</p>
                  </div>
                </div>
                <span className="text-white/80 font-bold text-lg">&rsaquo;</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-6 border-t border-zinc-100 space-y-4">
          <Link
            href="/siswa/settings"
            className="flex items-center gap-3.5 py-2 px-4 rounded-xl text-sm font-bold text-zinc-500 hover:text-slate-800 hover:bg-zinc-50/50 transition-colors"
            onClick={onClose}
          >
            <Settings className="w-5 h-5 text-zinc-400" />
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3.5 py-2 px-4 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50/50 transition-colors w-full cursor-pointer"
          >
            <LogOut className="w-5 h-5 text-red-400" />
            Logout
          </button>
          <div className="text-[10px] font-bold text-zinc-400 px-4 flex justify-between items-center">
            <span>© 2024 IMPACT.ID</span>
            <div className="flex gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#00473e]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
