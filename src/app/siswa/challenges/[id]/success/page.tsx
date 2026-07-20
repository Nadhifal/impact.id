"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Download,
  Home,
  Clock,
  ChevronRight
} from "lucide-react";
import { Card } from "@/app/shared/components/ui/card";
import { Button } from "@/app/shared/components/ui/button";

export default function SubmissionSuccessPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") ?? "COMPLETED";
  const isPending = status === "SUBMITTED";

  return (
    <div className="py-10 px-6 md:px-12 max-w-5xl mx-auto space-y-8 flex flex-col items-center">
      {/* Top Banner (Light Green Card Box) */}
      <Card className="bg-[#e6f4f1] text-[#00473e] p-8 sm:p-10 rounded-3xl border-none shadow-md w-full flex flex-col items-center justify-center text-center relative overflow-hidden">
        {/* Decorative background checks */}
        <div className="absolute right-0 top-0 opacity-5 pointer-events-none translate-x-8 -translate-y-8">
          <CheckCircle2 className="w-64 h-64 text-[#00473e]" />
        </div>

        <div className="space-y-4 relative z-10">
          <div
            className={`w-14 h-14 rounded-full ${isPending ? "bg-amber-500" : "bg-[#00473e]"} text-white flex items-center justify-center mx-auto shadow-md`}
          >
            <CheckCircle2 className="w-8 h-8 fill-current" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Submit Berhasil!
            </h1>
            <p
              className={`text-sm font-semibold max-w-md mx-auto leading-relaxed ${isPending ? "text-amber-900/90" : "text-emerald-900/80"}`}
            >
              {isPending
                ? "Laporan tantangan Anda telah berhasil dikirim. Data sedang menunggu verifikasi guru sebelum sertifikat diterbitkan."
                : "Laporan tantangan Anda telah berhasil dikirim dan diverifikasi secara otomatis. Sertifikat dapat langsung diterbitkan."}
            </p>
          </div>
        </div>
      </Card>

      {/* Verification Status Card */}
      <Card className="bg-white border border-zinc-100 shadow-sm p-4 sm:p-5 rounded-2xl w-full flex items-center justify-between">
        <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
          STATUS SAAT INI
        </span>
        <span
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold ${isPending ? "bg-amber-50 text-amber-600 border border-amber-100" : "bg-emerald-50 text-emerald-700 border border-emerald-100"}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full animate-pulse ${isPending ? "bg-amber-500" : "bg-emerald-500"}`}
          />
          {isPending ? "MENUNGGU VERIFIKASI" : "TERVERIFIKASI"}
        </span>
      </Card>

      {/* Grid: Upload Detail & Preview */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
        {/* Left column detail */}
        <div className="md:col-span-7 space-y-6">
          <Card className="bg-white border border-zinc-100 shadow-md p-6 sm:p-8 rounded-3xl space-y-5">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 border-b border-zinc-50 pb-2">
              <Download className="w-4 h-4 text-primary" />
              Ringkasan Pengiriman
            </h3>

            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  NAMA TANTANGAN
                </span>
                <h4 className="text-base font-extrabold text-slate-800 leading-snug">
                  Strategi Kepemimpinan & Keberlanjutan
                </h4>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                  DOKUMEN PENDUKUNG
                </span>
                <div className="flex items-center justify-between p-4 border border-zinc-100 rounded-2xl bg-zinc-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-xs font-black">PDF</span>
                    </div>
                    <div className="space-y-0.5">
                      <h5 className="text-xs font-bold text-slate-700">
                        Laporan_Final_Strategi_V1.pdf
                      </h5>
                      <p className="text-[10px] text-zinc-400 font-bold">
                        2.4 MB • SUBMITTED JUST NOW
                      </p>
                    </div>
                  </div>
                  <button className="text-zinc-400 hover:text-slate-700 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right column image preview */}
        <div className="md:col-span-5">
          <Card className="bg-white border border-zinc-100 shadow-md overflow-hidden rounded-3xl flex flex-col justify-end min-h-[220px] p-6 relative h-full">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent z-10" />
            <div className="absolute inset-0 bg-zinc-200 bg-[url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&h=250&q=80')] bg-cover bg-center" />
            <span className="relative z-20 text-xs font-extrabold text-white">
              Pratinjau Bukti Impact
            </span>
          </Card>
        </div>
      </div>

      {/* Next Steps card */}
      <Card className="bg-zinc-50/50 border border-zinc-100 shadow-sm p-6 sm:p-8 rounded-3xl w-full flex gap-5 items-start">
        <div className="w-10 h-10 bg-[#00473e] text-white rounded-xl flex items-center justify-center shrink-0">
          <Clock className="w-5 h-5" />
        </div>
        <div className="space-y-3">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
              Langkah Selanjutnya
            </span>
            <h4 className="text-base font-extrabold text-slate-800">
              Peninjauan oleh Mentor
            </h4>
          </div>
          <p className="text-xs text-zinc-500 font-semibold leading-relaxed">
            <span className="font-extrabold text-[#00473e]">
              Dr. Budi Santoso (Dosen Pembimbing)
            </span>{" "}
            akan melakukan peninjauan terhadap substansi laporan Anda dalam
            kurun waktu{" "}
            <span className="text-emerald-600 font-extrabold">
              1-3 hari kerja
            </span>
            . Mohon pantau notifikasi Anda secara berkala.
          </p>
        </div>
      </Card>

      {/* Back to Home Button */}
      <Link href="/siswa/dashboard" className="pt-4">
        <Button className="bg-[#00473e] hover:bg-[#00362f] text-white py-3.5 px-8 rounded-2xl flex items-center gap-2 text-sm font-extrabold shadow-md cursor-pointer">
          <Home className="w-4 h-4" />
          Kembali ke Beranda
        </Button>
      </Link>
    </div>
  );
}
