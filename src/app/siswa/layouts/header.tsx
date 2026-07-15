"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Bell, Settings } from "lucide-react";
import { Sidebar } from "./sidebar";

export function Header() {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", href: "/siswa/dashboard" },
    { name: "Challenges", href: "/siswa/challenges" },
    { name: "Portofolio", href: "/siswa/portofolio" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-zinc-100 px-6 py-4 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Desktop Nav */}
          <div className="flex items-center gap-12">
            <Link href="/" className="text-xl font-black text-slate-900 tracking-tight">
              IMPACT.ID
            </Link>

            {/* Desktop Links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-semibold tracking-wide py-1.5 border-b-2 transition-all ${isActive
                        ? "border-[#00473e] text-[#00473e]"
                        : "border-transparent text-zinc-500 hover:text-slate-800"
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/siswa/notifications"
              className={`p-2 hover:bg-zinc-50 rounded-full transition-all cursor-pointer relative ${
                pathname === "/siswa/notifications"
                  ? "text-primary"
                  : "text-zinc-400 hover:text-slate-800"
              }`}
              aria-label="Notifikasi"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </Link>

            <Link
              href="/siswa/settings"
              className={`p-2 hover:bg-zinc-50 rounded-full transition-all cursor-pointer ${
                pathname === "/siswa/settings"
                  ? "text-primary border-b-2 border-primary rounded-none pb-0.5"
                  : "text-zinc-400 hover:text-slate-800"
              }`}
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
            </Link>

            {/* Profile Avatar */}
            <Link
              href="/siswa/profile"
              className={`relative w-9 h-9 rounded-full overflow-hidden border transition-all ${
                pathname === "/siswa/profile"
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-zinc-200"
              }`}
            >
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"
                alt="Profile Avatar"
                fill
                className="object-cover"
                unoptimized
              />
            </Link>

            {/* Hamburger Button for Mobile Drawer */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="md:hidden p-2 text-zinc-500 hover:text-slate-800 hover:bg-zinc-50 rounded-lg transition-all cursor-pointer"
              aria-label="Buka Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Sidebar */}
      <Sidebar isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div
          onClick={() => setIsDrawerOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
        />
      )}
    </>
  );
}
