"use client";

import React, { useState } from "react";
import { Search, ChevronLeft, ChevronRight, Check, X } from "lucide-react";
import { Card } from "../../../layouts/ui/Card";
import { Badge } from "../../../layouts/ui/Badge";
import { CertificateItem } from "../../data";
import { useUser } from "@/app/shared/context/AuthContext";

interface CertificateTableProps {
  certificates: CertificateItem[];
  onRefresh?: () => void;
}

export function CertificateTable({ certificates: initialCerts, onRefresh }: CertificateTableProps) {
  const [certs, setCerts] = useState<CertificateItem[]>(initialCerts);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { user } = useUser();

  // Keep internal state synchronized with props
  React.useEffect(() => {
    setCerts(initialCerts);
  }, [initialCerts]);

  const filteredCerts = certs.filter((c) => {
    const matchesSearch = c.studentName.toLowerCase().includes(search.toLowerCase()) || 
                          c.projectName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAudit = async (id: string, newStatus: "DITERBITKAN" | "DITOLAK") => {
    try {
      const res = await fetch("/api/admin/certificates", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          status: newStatus,
          adminId: user?.id || "admin-1", // Fallback to seed admin if session loading
        }),
      });
      const json = await res.json();
      if (json.success) {
        if (onRefresh) {
          onRefresh();
        } else {
          setCerts(certs.map((c) => c.id === id ? { ...c, status: newStatus } : c));
        }
      } else {
        alert("Error: " + (json.error || "Gagal melakukan audit"));
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <Card className="p-0 overflow-hidden border-slate-200">
      {/* Search & Filter Bar */}
      <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-slate-50/20">
        <div className="flex flex-wrap items-center gap-3.5 flex-1 min-w-0">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama siswa atau project..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e] transition-all"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e] cursor-pointer"
          >
            <option value="all">Semua status</option>
            <option value="DITERBITKAN">Diterbitkan</option>
            <option value="MENUNGGU AUDIT">Menunggu audit</option>
            <option value="DITOLAK">Ditolak</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nama siswa</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Project portfolio</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kategori</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tanggal masuk</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Aksi audit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredCerts.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-xs text-slate-400 font-semibold">
                  Tidak ada data portofolio ditemukan
                </td>
              </tr>
            )}
            {filteredCerts.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <span className="text-sm font-bold text-slate-800">{row.studentName}</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">{row.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs font-semibold text-slate-600">{row.projectName}</td>
                <td className="px-6 py-4 text-xs font-semibold text-slate-400">{row.challengeCategory}</td>
                <td className="px-6 py-4">
                  <Badge status={row.status} />
                </td>
                <td className="px-6 py-4 text-xs font-semibold text-slate-400">{row.submitDate}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
                    {row.status === "MENUNGGU AUDIT" ? (
                      <>
                        <button
                          onClick={() => handleAudit(row.id, "DITERBITKAN")}
                          className="p-1 hover:bg-emerald-50 rounded-full text-emerald-600 transition-colors cursor-pointer"
                          title="Setujui"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleAudit(row.id, "DITOLAK")}
                          className="p-1 hover:bg-rose-50 rounded-full text-rose-600 transition-colors cursor-pointer"
                          title="Tolak"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-semibold">—</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between flex-wrap gap-4">
        <p className="text-xs font-semibold text-slate-400">
          Menampilkan {filteredCerts.length} dari {certs.length} data
        </p>
        <div className="flex items-center gap-1.5">
          <button className="p-1.5 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 cursor-pointer transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-lg text-xs font-bold bg-[#00473e] text-white flex items-center justify-center select-none">1</button>
          <button className="p-1.5 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 cursor-pointer transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}
