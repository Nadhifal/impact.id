"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShieldCheck,
  TrendingUp,
  MessageSquare,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/guru/dashboard" },
  { icon: ShieldCheck, label: "Verifikasi submission", href: "/guru/verifikasi" },
  { icon: TrendingUp, label: "Analitik progres siswa", href: "/guru/analitik" },
  { icon: MessageSquare, label: "Rekomendasi dan Feedback", href: "/guru/rekomendasi" },
  { icon: FileText, label: "Laporan capaian", href: "/guru/laporan" },
];

const bottomItems = [
  { icon: Settings, label: "Settings", href: "#" },
  { icon: LogOut, label: "Logout", href: "#" },
];

export function GuruSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 bg-white border-r border-slate-100 flex-col h-screen sticky top-0 shrink-0">
      {/* Brand */}
      <div className="px-6 pt-6 pb-5 border-b border-slate-100">
        <p className="text-lg font-extrabold tracking-wider text-slate-800">IMPACT.ID</p>
        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Teacher Portal</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-5 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/guru/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                isActive
                  ? "bg-[#e6f4f1] text-[#00473e]"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-[#00473e]" : "text-slate-400"}`} />
              <span className="leading-5">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-4 pb-4 border-t border-slate-100 pt-4 space-y-1">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-colors"
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Profile */}
        <div className="flex items-center gap-3 px-3 pt-3">
          <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs shrink-0">
            BR
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-800 truncate">Bu Rani</p>
            <p className="text-[10px] text-slate-400 font-medium truncate">Senior Mentor</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
