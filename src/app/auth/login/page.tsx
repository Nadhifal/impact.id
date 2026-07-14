"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Shield, Zap, ChevronRight } from "lucide-react";
import { AuthLayout } from "../components/AuthLayout";
import { BenefitCard } from "../components/BenefitCard";
import { Input } from "@/app/shared/components/ui/input";
import { Button } from "@/app/shared/components/ui/button";

import { studentAccount } from "@/app/shared/data";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === studentAccount.email) {
      window.location.href = "/siswa/dashboard";
    } else {
      alert("Email salah! Gunakan akun siswa terdaftar: " + studentAccount.email);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-[460px] flex flex-col items-center">
        {/* Header Texts */}
        <h1 className="text-3xl md:text-[34px] font-bold text-primary text-center tracking-tight mb-3">
          Selamat Datang
        </h1>
        <p className="text-zinc-500 text-sm text-center mb-8 max-w-[380px] leading-relaxed">
          Buat dan kembangkan perjalanan pertumbuhan Anda melalui karya dan solusi nyata
        </p>

        {/* Form Card */}
        <div className="bg-white border border-zinc-100 rounded-3xl p-8 shadow-sm w-full mb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email field */}
            <Input
              id="email"
              name="email"
              type="email"
              label="Alamat Email"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@company.com"
              required
            />

            {/* Password field */}
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              headerAction={
                <Link href="#" className="text-xs font-bold text-primary hover:underline">
                  Lupa password?
                </Link>
              }
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-zinc-400 hover:text-zinc-600 transition-colors"
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
              }
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full mt-6 rounded-xl gap-1.5 py-3"
            >
              Sign In
              <ChevronRight className="w-4 h-4 mt-0.5" />
            </Button>
          </form>

          {/* Register Link */}
          <div className="mt-8 text-center text-xs text-zinc-500">
            Belum Punya Akun?{" "}
            <Link href="/auth/register" className="font-bold text-primary hover:underline">
              Buat Akun
            </Link>
          </div>
        </div>

        {/* Benefit Cards */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <BenefitCard
            title="Aman"
            description="Enkripsi Data 256-bit"
            icon={Shield}
          />
          <BenefitCard
            title="Cepat"
            description="Akses Instan Dashboard"
            icon={Zap}
          />
        </div>
      </div>
    </AuthLayout>
  );
}
