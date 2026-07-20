"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building2,
  CloudUpload,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import { AuthLayout } from "../../components/AuthLayout";

const jenisInstansiOptions = [
  { value: "", label: "Pilih Jenis Instansi" },
  { value: "dinas-kota", label: "Dinas Pendidikan Kota" },
  { value: "dinas-kabupaten", label: "Dinas Pendidikan Kabupaten" },
  { value: "dinas-provinsi", label: "Dinas Pendidikan Provinsi" },
  { value: "kemendikbud", label: "Kemendikbudristek" },
  { value: "lainnya", label: "Lainnya" }
];

const wilayahOptions = [
  { value: "", label: "Pilih provinsi/kabupaten/kota" },
  { value: "dki-jakarta", label: "DKI Jakarta" },
  { value: "jawa-barat", label: "Jawa Barat" },
  { value: "jawa-tengah", label: "Jawa Tengah" },
  { value: "jawa-timur", label: "Jawa Timur" },
  { value: "banten", label: "Banten" },
  { value: "sumatera-utara", label: "Sumatera Utara" },
  { value: "sulawesi-selatan", label: "Sulawesi Selatan" },
  { value: "kalimantan-timur", label: "Kalimantan Timur" },
  { value: "bali", label: "Bali" }
];

export default function RegisterDinasPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    namaPenanggung: "",
    jabatan: "",
    email: "",
    password: "",
    konfirmasi: "",
    jenisInstansi: "",
    namaInstansi: "",
    wilayahKerja: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
          name: form.namaPenanggung,
          email: form.email,
          password: form.password,
          role: "DINAS",
          jabatan: form.jabatan,
          jenisInstansi: form.jenisInstansi,
          namaInstansi: form.namaInstansi,
          wilayahKerja: form.wilayahKerja
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Registrasi gagal. Coba lagi.");
        return;
      }

      if (data.redirectTo) {
        router.push(data.redirectTo);
        return;
      }

      if (data.pending) {
        router.push("/auth/register/pending");
        return;
      }

      setError("Registrasi berhasil, tetapi tidak dapat menentukan tujuan.");
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
            <Building2 className="w-7 h-7 text-[#00473e]" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Daftar sebagai Dinas Pendidikan
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Akun akan langsung aktif dan otomatis dapat digunakan
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-xs font-semibold text-red-600">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Nama penanggung jawab
            </label>
            <input
              type="text"
              name="namaPenanggung"
              value={form.namaPenanggung}
              onChange={handleChange}
              placeholder="Sesuai KTP"
              required
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e]/40"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Jabatan
            </label>
            <input
              type="text"
              name="jabatan"
              value={form.jabatan}
              onChange={handleChange}
              placeholder="mis. Kepala Bidang Pendidikan Dasar"
              required
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e]/40"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Email dinas/institusi
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="nama@dindik.go.id"
                required
                className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e]/40"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Kata sandi
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimal 8 karakter"
                  required
                  className="w-full border border-slate-200 rounded-xl pl-10 pr-10 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e]/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Konfirmasi
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="konfirmasi"
                  value={form.konfirmasi}
                  onChange={handleChange}
                  placeholder="Ulangi sandi"
                  required
                  className="w-full border border-slate-200 rounded-xl px-4 pr-10 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e]/40"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showConfirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Jenis instansi
            </label>
            <div className="relative">
              <select
                name="jenisInstansi"
                value={form.jenisInstansi}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 appearance-none outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e]/40 bg-white cursor-pointer pr-8"
              >
                {jenisInstansiOptions.map((o) => (
                  <option
                    key={o.value}
                    value={o.value}
                    disabled={o.value === ""}
                  >
                    {o.label}
                  </option>
                ))}
              </select>
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">
                ▾
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Nama instansi
            </label>
            <input
              type="text"
              name="namaInstansi"
              value={form.namaInstansi}
              onChange={handleChange}
              placeholder="mis. Dinas Pendidikan Kota Serang"
              required
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e]/40"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Wilayah kerja
            </label>
            <div className="relative">
              <select
                name="wilayahKerja"
                value={form.wilayahKerja}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 appearance-none outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e]/40 bg-white cursor-pointer pr-8"
              >
                {wilayahOptions.map((o) => (
                  <option
                    key={o.value}
                    value={o.value}
                    disabled={o.value === ""}
                  >
                    {o.label}
                  </option>
                ))}
              </select>
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">
                ▾
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Surat penugasan resmi
            </label>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-full border-2 border-dashed border-slate-200 rounded-2xl py-8 flex flex-col items-center gap-2 hover:border-[#00473e]/40 hover:bg-[#e6f4f1]/20 transition-all cursor-pointer"
            >
              <CloudUpload className="w-8 h-8 text-slate-300" />
              <span className="text-sm font-semibold text-[#00473e]">
                {fileName ?? "Unggah SK penugasan atau surat resmi instansi"}
              </span>
              <span className="text-xs text-slate-400">PDF, maks 5 MB</span>
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf"
              onChange={handleFile}
              className="hidden"
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-[#00473e] cursor-pointer"
            />
            <span className="text-sm text-slate-500 leading-relaxed">
              Saya menyatakan data yang diisi benar dan mewakili instansi resmi
            </span>
          </label>

          <button
            type="submit"
            disabled={!agreed || isLoading}
            className="w-full bg-[#00473e] hover:bg-[#003830] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {isLoading ? "Mengirim..." : "Daftar dan kirim untuk verifikasi"}
            {!isLoading && <ChevronRight className="w-4 h-4" />}
          </button>

          <p className="text-center text-sm text-slate-500">
            Sudah punya akun?{" "}
            <Link
              href="/auth/login"
              className="font-bold text-[#00473e] hover:underline"
            >
              Masuk
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
