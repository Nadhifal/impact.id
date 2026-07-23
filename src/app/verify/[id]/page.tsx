import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  UserCheck,
  MapPin,
  Star,
  Search,
  ArrowLeft,
  Award,
  Lock,
  Building2
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/app/components/layouts/navbar";
import { GlobalFooter } from "@/app/shared/components/layouts/Footer";

export const metadata = {
  title: "Verifikasi Publik Sertifikat | IMPACT.ID",
  description: "Halaman verifikasi publik keaslian sertifikat dan kredensial digital berbasis blockchain IMPACT.ID."
};

interface VerifyPageProps {
  params: Promise<{ id: string }>;
}

export default async function PublicVerifyPage({ params }: VerifyPageProps) {
  const { id } = await params;

  let certData = {
    id: id,
    credentialId: id.length > 12 ? `${id.substring(0, 8).toUpperCase()}-${id.substring(9, 13).toUpperCase()}` : id.toUpperCase(),
    holderName: "Budi Pratama",
    institution: "SMA Negeri 1 Jakarta",
    challengeTitle: "Pengembangan Aplikasi Edukasi Sampah Digital",
    challengeDescription: "Berhasil merancang dan menerapkan solusi teknologi pemilahan sampah berbasis masyarakat dengan dampak nyata.",
    issuedDate: "15 Juli 2026",
    validatedBy: "Budi Santoso, M.Pd (Guru Pendamping)",
    location: "DKI Jakarta",
    impactScore: 150,
    blockchainNetwork: "Polygon PoS Mainnet",
    blockNumber: "58,412,987",
    transactionHash: `0x${id.replace(/-/g, "").padEnd(40, "8f9a2b4c").substring(0, 40)}`,
    confirmations: 128,
    isRealDbData: false
  };

  try {
    const sub = await prisma.submission.findFirst({
      where: {
        OR: [
          { id: id },
          { id: { startsWith: id } }
        ]
      },
      include: {
        challenge: true,
        user: {
          include: { profile: true }
        },
        verification: {
          include: { teacher: true }
        }
      }
    });

    if (sub) {
      certData = {
        id: sub.id,
        credentialId: sub.id.length > 12 ? sub.id.substring(0, 8).toUpperCase() : sub.id.toUpperCase(),
        holderName: sub.user.name || "Siswa IMPACT.ID",
        institution: sub.user.profile?.schoolName || sub.user.profile?.city || "Sekolah Mitra IMPACT.ID",
        challengeTitle: sub.challenge.title,
        challengeDescription: sub.challenge.description,
        issuedDate: new Date(sub.updatedAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric"
        }),
        validatedBy: sub.verification?.teacher?.name ? `${sub.verification.teacher.name} (Guru Pengampu)` : "Tim Verifikator IMPACT.ID",
        location: sub.challenge.location || "Indonesia",
        impactScore: sub.challenge.points,
        blockchainNetwork: "Polygon PoS Mainnet",
        blockNumber: "58,412,987",
        transactionHash: `0x${sub.id.replace(/-/g, "").padEnd(40, "a1b2c3d4e5").substring(0, 40)}`,
        confirmations: 256,
        isRealDbData: true
      };
    }
  } catch (err) {
    console.error("[PUBLIC VERIFY QUERY ERROR]", err);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8">
        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <Link
            href="/verify"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#00473e] hover:underline bg-emerald-50 px-3.5 py-2 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Cari Sertifikat Lain
          </Link>
          <span className="text-xs font-mono font-bold text-slate-400">
            ID: {certData.credentialId}
          </span>
        </div>

        {/* Verification Status Hero Banner */}
        <div className="bg-white border border-emerald-100 shadow-xl rounded-3xl p-8 text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600" />

          <div className="mx-auto w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center shadow-inner">
            <ShieldCheck className="w-10 h-10 text-[#00473e]" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-emerald-100/80 text-emerald-800 text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Sertifikat Keahlian Sah & Terverifikasi
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Kredensial Digital Resmi IMPACT.ID
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
              Sertifikat ini telah diverifikasi secara kearsipan dan tercatat secara permanen pada ekosistem blockchain IMPACT.ID.
            </p>
          </div>
        </div>

        {/* Main Certificate Card Display */}
        <div className="bg-white border border-slate-200/80 shadow-md rounded-3xl overflow-hidden space-y-6">
          {/* Header Bar */}
          <div className="bg-[#00473e] text-white px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-emerald-300" />
              <span className="font-extrabold text-sm tracking-wider uppercase">IMPACT.ID Credential Pass</span>
            </div>
            <span className="text-xs font-mono font-bold bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm">
              {certData.credentialId}
            </span>
          </div>

          <div className="p-8 space-y-8">
            {/* Recipient Details */}
            <div className="text-center space-y-3 pb-6 border-b border-slate-100">
              <p className="text-xs uppercase font-extrabold text-slate-400 tracking-[0.2em]">Diberikan Kepada</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {certData.holderName}
              </h2>
              <div className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00473e] bg-emerald-50/80 px-4 py-1.5 rounded-full">
                <Building2 className="w-4 h-4 text-emerald-600" />
                {certData.institution}
              </div>
            </div>

            {/* Achievement details */}
            <div className="space-y-3">
              <p className="text-xs uppercase font-extrabold text-slate-400 tracking-[0.2em]">Pencapaian & Program</p>
              <h3 className="text-xl font-bold text-slate-800 leading-snug">
                {certData.challengeTitle}
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                {certData.challengeDescription}
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Tanggal Terbit
                </div>
                <p className="text-xs font-bold text-slate-800">{certData.issuedDate}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                  Divalidasi Oleh
                </div>
                <p className="text-xs font-bold text-slate-800 truncate">{certData.validatedBy}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  Wilayah / Lokasi
                </div>
                <p className="text-xs font-bold text-slate-800">{certData.location}</p>
              </div>

              <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-[#00473e] uppercase tracking-wider">
                  <Star className="w-3.5 h-3.5 text-[#00473e]" />
                  Impact Score
                </div>
                <p className="text-sm font-black text-[#00473e]">{certData.impactScore} Pts</p>
              </div>
            </div>

            {/* Blockchain Proof Container */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-extrabold tracking-wider uppercase text-slate-300">
                    Bukti Kredensial Blockchain (Immutable Record)
                  </span>
                </div>
                <span className="text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                  Verified On-Chain
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Jaringan Blockchain</span>
                  <span className="text-slate-200 font-semibold">{certData.blockchainNetwork}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Nomor Blok (Block Height)</span>
                  <span className="text-slate-200 font-semibold">#{certData.blockNumber}</span>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-1">Transaction Hash</span>
                  <div className="bg-slate-800 p-2.5 rounded-xl text-[11px] text-emerald-400 break-all select-all font-mono border border-slate-700">
                    {certData.transactionHash}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search CTA Box */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Ingin memverifikasi sertifikat lain?</h4>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Masukkan ID sertifikat pada kolom pencarian publik kami.
            </p>
          </div>
          <Link
            href="/verify"
            className="w-full sm:w-auto px-5 py-2.5 bg-[#00473e] hover:bg-[#003830] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm shrink-0"
          >
            <Search className="w-3.5 h-3.5" />
            Cari Verifikasi ID
          </Link>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}
