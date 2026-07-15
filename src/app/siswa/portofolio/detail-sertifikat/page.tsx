import React from "react";
import Link from "next/link";
import { ChevronLeft, Bell } from "lucide-react";
import { CertificateDetailSection } from "./components/section/CertificateDetailSection";
import { certificateDetail, blockchainSteps } from "./data";

export const metadata = {
  title: "Detail Sertifikat | IMPACT.ID",
  description:
    "Verifikasi kredensial berbasis blockchain untuk sertifikat pencapaian akademik dan profesional.",
};

export default function DetailSertifikatPage() {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* Top navbar */}
      <header className="sticky top-0 z-30 bg-white border-b border-zinc-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/siswa/portofolio"
              className="w-8 h-8 rounded-lg border border-zinc-200 hover:border-[#00473e] text-zinc-400 hover:text-[#00473e] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
            <span className="text-sm font-extrabold text-[#00473e] tracking-tight">IMPACT.ID</span>
          </div>
          <button className="w-8 h-8 rounded-lg border border-zinc-200 hover:border-[#00473e] text-zinc-400 hover:text-[#00473e] flex items-center justify-center transition-colors cursor-pointer">
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6">
        {/* Page heading */}
        <div className="space-y-1.5">
          <h1 className="text-2xl font-extrabold text-[#00473e] tracking-tight">
            Verifikasi Kredensial
          </h1>
          <p className="text-sm text-zinc-500 font-medium max-w-lg leading-relaxed">
            Sertifikat ini tersimpan di blockchain dan tidak dapat dipalsukan untuk menjamin keaslian
            pencapaian akademik dan profesional.
          </p>
        </div>

        {/* Detail section */}
        <CertificateDetailSection
          detail={certificateDetail}
          steps={blockchainSteps}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-100 bg-white mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 text-center space-y-3">
          <p className="text-[11px] text-zinc-400 font-semibold">
            © 2026 IMPACT.ID Foundation. Semua hak dilindungi.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="#"
              className="text-xs text-zinc-400 hover:text-[#00473e] font-semibold transition-colors"
            >
              Kebijakan Privasi
            </Link>
            <Link
              href="#"
              className="text-xs text-zinc-400 hover:text-[#00473e] font-semibold transition-colors"
            >
              Syarat &amp; Ketentuan
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
