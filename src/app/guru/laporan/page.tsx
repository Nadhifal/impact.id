"use client";

import React, { useState } from "react";
import { BuatLaporanSiswaSection } from "./components/section/BuatLaporanSiswaSection";
import { RingkasanCapaianSection } from "./components/section/RingkasanCapaianSection";
import { RiwayatLaporanTable } from "./components/section/RiwayatLaporanTable";
import { siswaOptions } from "./data";

export default function LaporanCapaianPage() {
  const [selectedSiswaId, setSelectedSiswaId] = useState("1");
  const selectedSiswa = siswaOptions.find((s) => s.id === selectedSiswaId) ?? siswaOptions[0];

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">
          Laporan capaian
        </h2>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Kelola dan unduh laporan progres akademik siswa bimbingan Anda.
        </p>
      </div>

      {/* Buat Laporan Form */}
      <BuatLaporanSiswaSection />

      {/* Ringkasan Capaian */}
      <RingkasanCapaianSection siswaName={selectedSiswa.name} />

      {/* Riwayat Laporan */}
      <RiwayatLaporanTable />
    </div>
  );
}
