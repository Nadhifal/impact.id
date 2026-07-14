"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Upload, HelpCircle, Check, Send, Sparkles, AlertCircle } from "lucide-react";
import { Card } from "@/app/shared/components/ui/card";
import { Button } from "@/app/shared/components/ui/button";

export default function SubmitChallengePage() {
  const [validatedUmkm, setValidatedUmkm] = useState(0);
  const [communityReach, setCommunityReach] = useState(0);
  const [duration, setDuration] = useState(0);
  const [reflection, setReflection] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleEnhance = () => {
    if (!reflection.trim()) {
      alert("Masukkan draf tulisan refleksi Anda terlebih dahulu sebelum mengoptimalkan dengan AI.");
      return;
    }
    setIsEnhancing(true);
    setTimeout(() => {
      setIsEnhancing(false);
      setReflection(
        "Melalui inisiatif pemetaan digital ini, kami berhasil memvalidasi titik lokasi UMKM serta mengidentifikasi kendala utama dalam digitalisasi operasional mereka. Penemuan ini membantu merancang strategi intervensi bantuan modal yang lebih tepat sasaran bagi pemerintah desa."
      );
    }, 1500);
  };

  return (
    <div className="py-10 px-6 md:px-12 max-w-7xl mx-auto space-y-8">
      {/* Title Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Submit Challenge Progress
        </h1>
        <p className="text-zinc-500 text-sm">
          Laporkan hasil kegiatan dan dampak yang telah Anda ciptakan.
        </p>
      </div>

      {/* Main Grid: Form left, Info right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Upload & Inputs */}
        <div className="lg:col-span-8 space-y-6">
          {/* Upload Bukti */}
          <Card className="bg-white border border-zinc-100 shadow-md p-6 sm:p-8 rounded-3xl space-y-5">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Upload className="w-4 h-4 text-primary" />
              Upload Bukti
            </h3>

            <div
              onClick={() => setIsUploaded(true)}
              className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all ${
                isUploaded
                  ? "border-emerald-500 bg-emerald-50/20"
                  : "border-zinc-200 hover:border-zinc-300 bg-zinc-50/30"
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isUploaded ? "bg-emerald-100 text-emerald-600" : "bg-zinc-100 text-zinc-400"
              }`}>
                <Upload className="w-5 h-5" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-xs font-bold text-slate-700">
                  {isUploaded ? "Dokumen_Laporan_Selesai.pdf Berhasil Diupload!" : "Tap to upload or drag & drop project photos, documents, or screenshots."}
                </p>
                {!isUploaded && (
                  <p className="text-[10px] text-zinc-400 font-bold">PDF, PNG, JPG up to 10MB</p>
                )}
              </div>

              {!isUploaded ? (
                <button
                  type="button"
                  className="bg-primary hover:bg-primary-hover text-white text-xs font-bold py-2.5 px-5 rounded-xl cursor-pointer"
                >
                  Browse Files ›
                </button>
              ) : (
                <span className="text-[10px] text-emerald-600 font-bold">Klik kembali untuk mengganti file</span>
              )}
            </div>
          </Card>

          {/* Impact Data inputs */}
          <Card className="bg-white border border-zinc-100 shadow-md p-6 sm:p-8 rounded-3xl space-y-5">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-primary" />
              Impact Data
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="p-4 border border-zinc-100 rounded-2xl bg-zinc-50/50 flex flex-col justify-between min-h-[110px]">
                <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-wider">
                  UMKM Tervalidasi
                </span>
                <input
                  type="number"
                  value={validatedUmkm}
                  onChange={(e) => setValidatedUmkm(Number(e.target.value))}
                  className="text-2xl font-black text-slate-800 bg-transparent border-b border-zinc-200 focus:border-primary focus:outline-none w-full pb-1 mt-3"
                />
              </div>

              {/* Card 2 */}
              <div className="p-4 border border-zinc-100 rounded-2xl bg-zinc-50/50 flex flex-col justify-between min-h-[110px]">
                <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-wider">
                  Jangkauan Komunitas
                </span>
                <input
                  type="number"
                  value={communityReach}
                  onChange={(e) => setCommunityReach(Number(e.target.value))}
                  className="text-2xl font-black text-slate-800 bg-transparent border-b border-zinc-200 focus:border-primary focus:outline-none w-full pb-1 mt-3"
                />
              </div>

              {/* Card 3 */}
              <div className="p-4 border border-zinc-100 rounded-2xl bg-zinc-50/50 flex flex-col justify-between min-h-[110px]">
                <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-wider">
                  Durasi (Hari)
                </span>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="text-2xl font-black text-slate-800 bg-transparent border-b border-zinc-200 focus:border-primary focus:outline-none w-full pb-1 mt-3"
                />
              </div>
            </div>
          </Card>

          {/* Reflection with AI help */}
          <Card className="bg-white border border-zinc-100 shadow-md p-6 sm:p-8 rounded-3xl space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-50 pb-2">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4.5 h-4.5 text-primary" />
                Refleksi dengan Bantuan AI
              </h3>
              
              {/* AI helper button (colored purple `#584FBC` for AI assistant guideline) */}
              <button
                type="button"
                onClick={handleEnhance}
                disabled={isEnhancing}
                className="bg-[#584FBC] hover:bg-[#4940a2] text-white text-[10px] font-extrabold py-2 px-3 rounded-lg flex items-center gap-1 transition-all cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-3 h-3 fill-current" />
                {isEnhancing ? "Mengoptimalkan..." : "Enhance with AI"}
              </button>
            </div>

            <div className="border border-zinc-200 rounded-2xl overflow-hidden">
              <div className="bg-zinc-50/50 px-4 py-2 border-b border-zinc-100 flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-zinc-400">Field Findings & Insights</span>
                <div className="flex gap-2 text-xs font-bold text-zinc-400">
                  <span>B</span>
                  <span className="italic">I</span>
                  <span className="underline">U</span>
                </div>
              </div>
              <textarea
                rows={6}
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Apa saja tantangan utama yang Anda hadapi? Bagaimana UMKM lokal mendapat manfaat dari pemetaan digital Anda?"
                className="w-full p-4 text-xs font-semibold text-slate-700 placeholder-zinc-400 focus:outline-none resize-none"
              />
            </div>
            <p className="text-[9px] text-zinc-400 font-bold">
              AI akan membantu merapikan kalimat refleksi Anda untuk hasil yang lebih profesional.
            </p>
          </Card>
        </div>

        {/* Right Side: Pro Tips & Checklist */}
        <div className="lg:col-span-4 space-y-6">
          {/* Pro Tip Card (colored purple `#584FBC` and `#EEEDFE` per instructions!) */}
          <Card className="bg-[#584FBC] text-white p-6 sm:p-8 rounded-3xl border-none shadow-md space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-black text-[#EEEDFE] uppercase tracking-widest">
              <Sparkles className="w-4.5 h-4.5 text-[#EEEDFE] fill-current" />
              PRO TIP
            </div>
            <p className="text-xs text-slate-100 font-medium leading-relaxed italic">
              "Kemajuan yang luar biasa! Saat menjelaskan refleksi Anda, fokuslah pada perubahan kualitatif dalam tingkat kepercayaan pemilik bisnis. Data tersebut sama berharganya dengan angka-angka."
            </p>
          </Card>

          {/* Success Checklist */}
          <Card className="bg-[#e6f4f1] text-[#00473e] p-6 sm:p-8 rounded-3xl border-none shadow-md space-y-5">
            <h3 className="text-xs font-extrabold uppercase tracking-widest border-b border-[#00473e]/10 pb-2">
              Checklist Keberhasilan
            </h3>
            <ul className="space-y-3">
              {[
                "Minimal 3 foto dokumentasi lapangan yang jelas.",
                "Angka dampak sudah sesuai dengan logbook harian.",
                "Refleksi mencakup kendala dan solusi yang diterapkan."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs font-bold leading-relaxed">
                  <span className="p-0.5 rounded-full bg-[#00473e]/15 text-[#00473e] shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          {/* Mini Image Preview */}
          <Card className="bg-white border border-zinc-100 shadow-md overflow-hidden rounded-3xl flex flex-col justify-end min-h-[160px] p-6 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent z-10" />
            <div className="absolute inset-0 bg-zinc-200 bg-[url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&h=250&q=80')] bg-cover bg-center" />
          </Card>
        </div>
      </div>

      {/* Bottom Submit Action buttons */}
      <div className="flex items-center justify-end gap-4 pt-6 border-t border-zinc-100">
        <Link href={`/siswa/challenges/1`}>
          <button className="py-3 px-6 border border-zinc-200 hover:border-zinc-300 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer bg-white">
            Simpan Draft
          </button>
        </Link>

        <Link href={`/siswa/challenges/1/success`}>
          <Button className="bg-[#00473e] hover:bg-[#00362f] text-white py-3.5 px-6 rounded-xl flex items-center gap-2 text-xs font-bold shadow-md cursor-pointer">
            Submit Challenge
            <Send className="w-4 h-4 mt-0.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
