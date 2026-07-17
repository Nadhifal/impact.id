"use client";

import React, { useState, useEffect, useCallback } from "react";
import { CertificateKPICards } from "./components/section/CertificateKPICards";
import { CertificateTable } from "./components/section/CertificateTable";
import { CertificateKPI, CertificateItem } from "./data";
import { RefreshCw } from "lucide-react";

export default function AdminPortfolioCertificatePage() {
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [kpis, setKpis] = useState<CertificateKPI[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCertificates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/certificates");
      const json = await res.json();
      if (json.success) {
        setCertificates(json.data.certificates);
        const k = json.data.kpis;
        setKpis([
          {
            title: "Total Portofolio",
            value: k.totalPortfolios.toLocaleString("id-ID"),
            label: "Portofolio siswa terdaftar",
          },
          {
            title: "Menunggu Audit",
            value: k.pendingAudit.toLocaleString("id-ID"),
            label: "Perlu segera ditinjau",
            badgeText: k.pendingAudit > 0 ? "Urgent" : undefined,
            badgeType: "danger" as const,
            accentColor: k.pendingAudit > 0 ? "border-l-4 border-rose-500" : undefined,
          },
          {
            title: "Sertifikat Diterbitkan",
            value: k.published.toLocaleString("id-ID"),
            label: "Total sertifikat resmi terbit",
          },
        ]);
      }
    } catch (err) {
      console.error("Failed to fetch certificates:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Portofolio dan sertifikat</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Audit pengajuan portofolio siswa dan verifikasi penerbitan sertifikat program.
          </p>
        </div>
        <button
          onClick={fetchCertificates}
          disabled={loading}
          className="flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-sm font-semibold transition-colors cursor-pointer disabled:opacity-40"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* KPI Cards */}
      <CertificateKPICards kpis={kpis} />

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-400">
          <RefreshCw className="w-5 h-5 animate-spin mr-2" />
          <span className="text-sm font-semibold">Memuat data sertifikat...</span>
        </div>
      ) : (
        <CertificateTable certificates={certificates} onRefresh={fetchCertificates} />
      )}
    </div>
  );
}
