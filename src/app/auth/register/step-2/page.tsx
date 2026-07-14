"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Mail, Phone, GraduationCap, Lock, Eye, EyeOff, ChevronRight } from "lucide-react";
import { AuthLayout } from "../../components/AuthLayout";
import { Input } from "@/app/shared/components/ui/input";
import { Select } from "@/app/shared/components/ui/select";
import { Button } from "@/app/shared/components/ui/button";
import { ProgressIndicator } from "@/app/shared/components/ui/progress-indicator";

export default function RegisterStep2Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    school: "",
    province: "",
    city: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "/auth/register/step-3";
  };

  const provinceOptions = [
    { value: "", label: "Pilih" },
    { value: "jawa-timur", label: "Jawa Timur" },
    { value: "jawa-tengah", label: "Jawa Tengah" },
    { value: "jawa-barat", label: "Jawa Barat" },
    { value: "dki-jakarta", label: "DKI Jakarta" },
  ];

  return (
    <AuthLayout showAbstractBackground={true}>
      <div className="w-full max-w-[800px] bg-white border border-zinc-100 rounded-3xl p-8 md:p-10 shadow-sm relative z-10">
        {/* Progress Indicator */}
        <ProgressIndicator steps={3} currentStep={2} className="max-w-[360px] mx-auto mb-8" />

        {/* Page Headers */}
        <h1 className="text-2xl md:text-[28px] font-bold text-primary tracking-tight mb-2 text-left">
          Data diri
        </h1>
        <p className="text-zinc-500 text-sm mb-8 text-left leading-relaxed">
          Isi informasi akunmu sebagai siswa.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nama lengkap"
              name="fullName"
              type="text"
              placeholder="Masukkan nama lengkap"
              icon={User}
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="contoh@email.com"
              icon={Mail}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="No. HP"
              name="phone"
              type="tel"
              placeholder="08123456789"
              icon={Phone}
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <Input
              label="Asal sekolah"
              name="school"
              type="text"
              placeholder="Nama sekolah anda"
              icon={GraduationCap}
              value={formData.school}
              onChange={handleChange}
              required
            />
            <Select
              label="Provinsi"
              name="province"
              options={provinceOptions}
              value={formData.province}
              onChange={handleChange}
              required
            />
            <Input
              label="Kab/Kota"
              name="city"
              type="text"
              placeholder="Kota"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <hr className="border-zinc-100 my-6" />

          {/* Password Field */}
          <Input
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Min. 8 karakter"
            icon={Lock}
            value={formData.password}
            onChange={handleChange}
            required
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
              </button>
            }
          />

          {/* Actions */}
          <div className="flex items-center justify-between pt-4">
            <Link href="/auth/register">
              <Button
                type="button"
                variant="outline"
                className="px-8 py-3 rounded-xl border border-primary text-primary hover:bg-primary/5"
              >
                Kembali
              </Button>
            </Link>
            <Button
              type="submit"
              className="px-8 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white gap-1.5"
            >
              Lanjut
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </form>

        {/* Bottom Login Redirect */}
        <div className="text-center text-xs text-zinc-500 mt-8">
          Sudah punya akun?{" "}
          <Link href="/auth/login" className="font-bold text-primary hover:underline">
            Masuk di sini
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
