"use client";

import React, { useState, useEffect } from "react";
import { BuatLaporanSection } from "./components/section/BuatLaporanSection";
import { RiwayatLaporanSection } from "./components/section/RiwayatLaporanSection";
import { APIAccessSection } from "./components/section/APIAccessSection";

export default function LaporanEksporPage() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/dinas/reports")
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setReports(json.data);
      })
      .catch((err) => console.error("Failed to load reports:", err));
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">
          Laporan dan ekspor data
        </h2>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Kelola dan unduh data agregat pendidikan nasional secara real-time.
        </p>
      </div>

      {/* Buat Laporan Baru */}
      <BuatLaporanSection />

      {/* Riwayat Laporan */}
      <RiwayatLaporanSection reports={reports} />

      {/* API Access */}
      <APIAccessSection />
    </div>
  );
}
