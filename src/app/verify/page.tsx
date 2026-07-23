"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/app/components/layouts/navbar";
import { GlobalFooter } from "@/app/shared/components/layouts/Footer";
import { Search, ShieldCheck, QrCode, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/app/shared/components/ui/button";

export default function VerificationSearchPage() {
  const [searchId, setSearchId] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    router.push(`/verify/${encodeURIComponent(searchId.trim())}`);
  };

  const sampleIds = [
    { label: "Sertifikat Sampel 1", id: "CERT-IMP-2026-8892" },
    { label: "Sertifikat Sampel 2", id: "CERT-IMP-2026-9901" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full flex flex-col justify-center space-y-8">
        {/* Header Hero */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-[#00473e] text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Pusat Verifikasi Publik IMPACT.ID
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Cek Keaslian Sertifikat &amp; Kredensial
          </h1>
          <p className="text-sm text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
            Masukkan ID Sertifikat atau hasil pindaian QR Code untuk memverifikasi keabsahan dokumen akademik &amp; dampak sosial siswa.
          </p>
        </div>

        {/* Verification Card Form */}
        <div className="bg-white border border-slate-200/80 shadow-xl rounded-3xl p-8 space-y-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="credential-id" className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block">
                Verification / Credential ID
              </label>
              <div className="relative">
                <input
                  id="credential-id"
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Masukkan ID (Contoh: CERT-IMP-2026-8892)"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00473e] focus:bg-white transition-all placeholder:text-slate-400"
                  required
                />
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-4 bg-[#00473e] hover:bg-[#003830] text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              Verifikasi Sekarang
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>

          {/* Sample quick test IDs */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Atau Uji Coba ID Sampel Berikut:
            </span>
            <div className="flex flex-wrap gap-2">
              {sampleIds.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => router.push(`/verify/${item.id}`)}
                  className="text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-[#00473e] border border-emerald-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  {item.label} ({item.id})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feature info banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-slate-600">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex items-start gap-3">
            <div className="p-2.5 bg-emerald-50 rounded-xl text-[#00473e] shrink-0">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-0.5">Barcode / QR Code Real-time</h4>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                Scan QR Code pada fisik/PDF sertifikat menggunakan kamera hp Anda untuk langsung membuka halaman ini.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex items-start gap-3">
            <div className="p-2.5 bg-emerald-50 rounded-xl text-[#00473e] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-0.5">Keaslian Terjamin</h4>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                Seluruh data pencapaian divalidasi oleh verifikator sekolah dan dicatat pada blockchain Polygon.
              </p>
            </div>
          </div>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}
