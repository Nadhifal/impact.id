"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShieldCheck,
  TrendingUp,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/guru/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Verifikasi submission",
      href: "/guru/verifikasi",
      icon: ShieldCheck,
    },
    {
      name: "Analitik progres siswa",
      href: "/guru/analitik",
      icon: TrendingUp,
    },
    {
      name: "Laporan capaian",
      href: "/guru/laporan",
      icon: FileText,
    },
    {
      name: "Rekomendasi dan Feedback",
      href: "/guru/rekomendasi",
      icon: MessageSquare,
    },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col h-screen fixed left-0 top-0 z-30 justify-between">
      <div>
        {/* Sidebar Brand Header */}
        <div className="p-6">
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">IMPACT.ID</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Teacher Portal</p>
        </div>

        {/* Navigation Menu */}
        <nav className="px-4 py-3 space-y-1.5">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/guru/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#e6f4f1] text-[#00473e] border-r-4 border-[#00473e] rounded-r-none"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-[#00473e]" : "text-slate-400"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Menu */}
      <div className="p-4 border-t border-slate-100 space-y-1.5">
        <Link
          href="#"
          className="flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200"
        >
          <Settings className="w-5 h-5 text-slate-400" />
          <span>Settings</span>
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200"
        >
          <LogOut className="w-5 h-5 text-slate-400" />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}
