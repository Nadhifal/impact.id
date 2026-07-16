import React from "react";
import Link from "next/link";
import { AuthLayout } from "../../components/AuthLayout";
import { CheckCircle2, Mail } from "lucide-react";

export default function RegisterPendingPage() {
  return (
    <AuthLayout showAbstractBackground={true}>
      <div className="w-full max-w-[540px] bg-white border border-zinc-100 rounded-3xl p-10 shadow-sm flex flex-col items-center text-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-[#e6f4f1] flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8 text-[#00473e]" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-3">
          Pendaftaran Dikirim!
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-[400px]">
          Akun Anda telah berhasil dibuat dan sedang dalam proses tinjauan oleh tim admin IMPACT.ID. 
          Kami akan menghubungi Anda melalui email setelah verifikasi selesai.
        </p>

        {/* Info card */}
        <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-8 flex items-start gap-4 text-left">
          <div className="w-9 h-9 rounded-xl bg-[#e6f4f1] flex items-center justify-center shrink-0 mt-0.5">
            <Mail className="w-4 h-4 text-[#00473e]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-700 mb-1">Cek Email Anda</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Notifikasi persetujuan akan dikirim ke email yang Anda daftarkan. 
              Proses verifikasi biasanya memakan waktu <span className="font-semibold text-slate-700">1–3 hari kerja</span>.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            href="/"
            className="flex-1 border border-slate-200 text-slate-600 font-bold py-3 rounded-xl text-sm text-center hover:bg-slate-50 transition-colors"
          >
            Kembali ke Beranda
          </Link>
          <Link
            href="/auth/login"
            className="flex-1 bg-[#00473e] hover:bg-[#003830] text-white font-bold py-3 rounded-xl text-sm text-center transition-colors"
          >
            Masuk ke Akun
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
