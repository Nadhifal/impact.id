import React from "react";

export function Footer() {
  return (
    <footer className="py-6 px-8 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-400 font-medium">
      <p>© 2026 IMPACT.ID Education Analytics. All rights reserved.</p>
      <div className="flex gap-4">
        <a href="#" className="hover:underline">Kebijakan Privasi</a>
        <a href="#" className="hover:underline">Syarat & Ketentuan</a>
        <a href="#" className="hover:underline">Bantuan</a>
      </div>
    </footer>
  );
}
