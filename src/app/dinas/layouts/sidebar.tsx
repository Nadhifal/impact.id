"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BarChart3, 
  Map, 
  Activity, 
  FileText
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dinas/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Analitik Sekolah / Daerah",
      href: "/dinas/analytics",
      icon: BarChart3,
    },
    {
      name: "Peta Dampak Nasional",
      href: "/dinas/impact-map",
      icon: Map,
    },
    {
      name: "Monitoring Program",
      href: "/dinas/monitoring",
      icon: Activity,
    },
    {
      name: "Laporan dan Ekspor",
      href: "/dinas/reports",
      icon: FileText,
    },
  ];

  // Dynamic user profile based on current active page for visual matches to the designs
  const getUserProfile = () => {
    if (pathname.includes("/dinas/impact-map") || pathname.includes("/dinas/analytics")) {
      return {
        name: "Admin Pusat",
        role: "Kemendikbudristek",
        avatarLetter: "AD",
        avatarBg: "bg-emerald-100 text-emerald-800"
      };
    }
    return {
      name: "Administrator",
      role: "SUPER ADMIN",
      avatarLetter: "A",
      avatarBg: "bg-teal-800 text-white"
    };
  };

  const user = getUserProfile();

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col h-screen fixed left-0 top-0 z-30">
      {/* Sidebar Brand Header */}
      <div className="p-6 border-b border-slate-100">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Impact Admin</h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">EDUCATION AUTHORITY</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dinas/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-slate-100 text-slate-900 shadow-xs"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-slate-800" : "text-slate-400 group-hover:text-slate-800"}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Profile Footer Section */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm select-none ${user.avatarBg}`}>
            {user.avatarLetter}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
            <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase truncate">{user.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
