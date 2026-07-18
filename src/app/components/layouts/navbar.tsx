"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "../../data";
import { Button } from "@/app/shared/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/auth");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          {/* Logo & Hamburger Menu */}
          <div className="flex items-center gap-3">
            {!isAuthPage && (
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="md:hidden text-zinc-800 dark:text-zinc-200 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all"
                aria-label="Buka menu"
              >
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
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden sm:inline-flex text-zinc-800 dark:text-zinc-200"
                  >
                    Masuk
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-[#00473e] text-white"
                  >
                    Daftar
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Mobile Sidebar Drawer */}
      {!isAuthPage && (
        <>
          <div
            className={`fixed inset-y-0 left-0 z-50 w-[280px] max-w-full bg-white border-r border-zinc-200 shadow-xl p-6 transition-transform duration-300 md:hidden ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/"
                className="text-lg font-extrabold tracking-tight text-[#00473e]"
              >
                IMPACT.ID
              </Link>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 rounded-lg text-zinc-600 hover:bg-zinc-100 transition-all"
                aria-label="Tutup menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block rounded-2xl px-4 py-3 text-base font-medium text-zinc-700 hover:text-[#00473e] hover:bg-zinc-50 transition-all"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-8 border-t border-zinc-200 pt-6 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
                Akun
              </p>
              <Link
                href="/auth/login"
                onClick={() => setIsDrawerOpen(false)}
                className="block rounded-2xl px-4 py-3 text-base font-medium text-zinc-700 hover:text-[#00473e] hover:bg-zinc-50 transition-all"
              >
                Masuk
              </Link>
              <Link
                href="/auth/register"
                onClick={() => setIsDrawerOpen(false)}
                className="block rounded-2xl px-4 py-3 text-base font-medium text-white bg-[#00473e] hover:bg-[#0b5f45] transition-all"
              >
                Daftar
              </Link>
            </div>
          </div>

          {isDrawerOpen && (
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
              aria-label="Tutup overlay"
            />
          )}
        </>
      )}
    </>
  );
}
