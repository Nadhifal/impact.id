"use client";

import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#f8fafb] border-t border-zinc-100 py-8 px-6 md:px-12 mt-auto relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="text-sm font-black text-slate-900 tracking-tight">
            IMPACT.ID
          </Link>
          <p className="text-zinc-500 text-xs text-center md:text-left font-medium">
            © 2024 IMPACT.ID Educational Platform. All rights reserved.
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-zinc-500">
          <Link href="#" className="hover:text-slate-800 transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-slate-800 transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-slate-800 transition-colors">
            Help Center
          </Link>
          <Link href="#" className="hover:text-slate-800 transition-colors">
            Contact Us
          </Link>
        </div>
      </div>

      {/* Floating Action Button (FAB) */}
      <button
        className="fixed bottom-6 right-6 z-30 w-12 h-12 rounded-full bg-primary hover:bg-primary-hover text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="Tambah Challenge Baru"
        onClick={() => {
          window.location.href = "/siswa/challenges";
        }}
      >
        <Plus className="w-6 h-6" />
      </button>
    </footer>
  );
}
