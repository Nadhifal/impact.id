import React from "react";
import { CertificateKPICards } from "./components/section/CertificateKPICards";
import { CertificateTable } from "./components/section/CertificateTable";
import { certKpis, dummyCertificates } from "./data";

export default function AdminPortfolioCertificatePage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Portofolio dan sertifikat</h2>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Audit pengajuan portofolio siswa dan verifikasi penerbitan sertifikat program.
        </p>
      </div>

      {/* KPI Cards */}
      <CertificateKPICards kpis={certKpis} />

      {/* Table */}
      <CertificateTable certificates={dummyCertificates} />
    </div>
  );
}
