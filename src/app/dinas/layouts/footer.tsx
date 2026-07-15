"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-6 px-8 text-xs text-slate-500 font-medium mt-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span>IMPACT.ID &copy; 2024 Education Analytics. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-slate-800 transition-colors">
            Kebijakan Privasi
          </Link>
          <Link href="/terms" className="hover:text-slate-800 transition-colors">
            Syarat &amp; Ketentuan
          </Link>
          <Link href="/help" className="hover:text-slate-800 transition-colors">
            Bantuan
          </Link>
        </div>
      </div>
    </footer>
  );
}
