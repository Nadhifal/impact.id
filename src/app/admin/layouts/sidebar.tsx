"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Globe, 
  Users, 
  Zap, 
  Award, 
  History
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Globe,
    },
    {
      name: "Manage user",
      href: "/admin/manage-user",
      icon: Users,
    },
    {
      name: "Manage challenge",
      href: "/admin/manage-challenge",
      icon: Zap,
    },
    {
      name: "Portofolio dan sertifikat",
      href: "/admin/portfolio-certificate",
      icon: Award,
    },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col h-screen fixed left-0 top-0 z-30">
      {/* Sidebar Brand Header */}
      <div className="p-6 border-b border-slate-100">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">IMPACT.ID</h1>
        <p className="text-xs text-slate-500 font-semibold mt-0.5">Dashboard admin</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
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

      {/* Footer Log Aktivitas */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <Link
          href="/admin/logs"
          className={`flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
            pathname === "/admin/logs"
              ? "bg-slate-100 text-slate-900"
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <History className="w-5 h-5 text-slate-400" />
          <span>Log aktivitas</span>
        </Link>
      </div>
    </aside>
  );
}
