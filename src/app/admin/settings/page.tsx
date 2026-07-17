import React from "react";
import { LandingPageEditor } from "./components/section/LandingPageEditor";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Pengaturan</h2>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Kelola konten landing page, FAQ, kebijakan, dan pengaturan platform.
        </p>
      </div>

      {/* Tabbed Editor Panel */}
      <LandingPageEditor />
    </div>
  );
}
