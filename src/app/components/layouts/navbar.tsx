"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "../../data";
import { Button } from "@/app/shared/components/ui/button";
import { Menu } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/auth");

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-900/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Logo & Hamburger Menu */}
        <div className="flex items-center gap-3">
          {!isAuthPage && (
            <button className="md:hidden text-zinc-800 dark:text-zinc-200 p-1 -ml-1 cursor-pointer" aria-label="Menu">
              <Menu className="w-6 h-6" />
            </button>
          )}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight text-[#00473e] dark:text-[#8ce1d5]">
              IMPACT.ID
            </span>
          </Link>
        </div>

        {!isAuthPage && (
          <>
            {/* Desktop Nav Items */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-zinc-600 hover:text-[#00473e] dark:text-zinc-400 dark:hover:text-[#8ce1d5] transition-colors relative group py-2"
                >
                  {item.label}
                  {item.label === "Features" && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00473e] dark:bg-[#8ce1d5]" />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA Actions */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-zinc-800 dark:text-zinc-200">
                  Masuk
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="primary" size="sm" className="bg-[#00473e] text-white">
                  Daftar
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

