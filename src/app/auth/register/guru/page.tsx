"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users, Mail, Lock, Eye, EyeOff,
  Search, ImagePlus, ChevronRight, AlertCircle,
} from "lucide-react";
import { AuthLayout } from "../../components/AuthLayout";

import { INDONESIA_PROVINCES } from "../../provinces";

export default function RegisterGuruPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    namaLengkap: "", email: "", password: "", konfirmasi: "",
    namaSekolah: "", nip: "", mataPelajaran: "",
    province: "", city: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFileName(f.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.konfirmasi) {
      setError("Kata sandi dan konfirmasi tidak cocok.");
      return;
    }
    if (form.password.length < 8) {
      setError("Kata sandi minimal 8 karakter.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.namaLengkap,
          email: form.email,
          password: form.password,
          role: "TEACHER",
          school: form.namaSekolah,
          province: form.province,
          city: form.city,
          nip: form.nip,
          mataPelajaran: form.mataPelajaran,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Registrasi gagal. Coba lagi.");
        return;
      }

      router.push("/auth/register/pending");
    } catch {
      setError("Tidak dapat terhubung ke server. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout showAbstractBackground={true}>
      <div className="w-full max-w-[640px] bg-white border border-zinc-100 rounded-3xl p-8 md:p-10 shadow-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-full bg-[#e6f4f1] flex items-center justify-center mb-4">
            <Users className="w-7 h-7 text-[#00473e]" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Daftar sebagai Guru</h1>
          <p className="text-sm text-slate-500 mt-1">Akun akan diverifikasi admin sebelum aktif</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-xs font-semibold text-red-600">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nama lengkap</label>
            <input type="text" name="namaLengkap" value={form.namaLengkap} onChange={handleChange} placeholder="Sesuai KTP" required className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e]/40" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email aktif</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="nama@email.com" required className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e]/40" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Kata sandi</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} placeholder="Minimal 8 karakter" required className="w-full border border-slate-200 rounded-xl pl-10 pr-10 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e]/40" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Konfirmasi</label>
              <div className="relative">
                <input type={showConfirm ? "text" : "password"} name="konfirmasi" value={form.konfirmasi} onChange={handleChange} placeholder="Ulangi sandi" required className="w-full border border-slate-200 rounded-xl px-4 pr-10 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e]/40" />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">{showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nama sekolah/institusi</label>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" name="namaSekolah" value={form.namaSekolah} onChange={handleChange} placeholder="Cari dan pilih sekolah" className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e]/40" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Provinsi</label>
              <select
                name="province"
                value={form.province}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none bg-white focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e]/40"
              >
                <option value="">Pilih Provinsi</option>
                {INDONESIA_PROVINCES.map((prov) => (
                  <option key={prov.value} value={prov.value}>
                    {prov.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Kab/Kota</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Kota"
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e]/40"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">NIP / NUPTK</label>
              <input type="text" name="nip" value={form.nip} onChange={handleChange} placeholder="Opsional" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e]/40" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mata pelajaran</label>
              <input type="text" name="mataPelajaran" value={form.mataPelajaran} onChange={handleChange} placeholder="mis. Kewirausahaan" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e]/40" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Bukti status mengajar</label>
            <button type="button" onClick={() => fileRef.current?.click()} className="w-full border-2 border-dashed border-slate-200 rounded-2xl py-8 flex flex-col items-center gap-2 hover:border-[#00473e]/40 hover:bg-[#e6f4f1]/20 transition-all cursor-pointer">
              <ImagePlus className="w-8 h-8 text-slate-300" />
              <span className="text-sm font-semibold text-[#00473e]">{fileName ?? "Unggah SK mengajar atau kartu pegawai"}</span>
              <span className="text-xs text-slate-400">PDF atau JPG, maks 5 MB</span>
            </button>
            <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg" onChange={handleFile} className="hidden" />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 w-4 h-4 accent-[#00473e] cursor-pointer" />
            <span className="text-sm text-slate-500 leading-relaxed">Saya menyatakan data yang diisi benar dan menyetujui <Link href="#" className="font-semibold text-[#00473e] hover:underline">syarat &amp; ketentuan</Link></span>
          </label>

          <button type="submit" disabled={!agreed || isLoading} className="w-full bg-[#00473e] hover:bg-[#003830] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer">
            {isLoading ? "Mengirim..." : "Daftar dan kirim untuk verifikasi"}
            {!isLoading && <ChevronRight className="w-4 h-4" />}
          </button>

          <p className="text-center text-sm text-slate-500">
            Sudah punya akun?{" "}
            <Link href="/auth/login" className="font-bold text-[#00473e] hover:underline">Masuk</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
