"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Shield, Zap, ChevronRight, AlertCircle } from "lucide-react";
import { AuthLayout } from "../components/AuthLayout";
import { BenefitCard } from "../components/BenefitCard";
import { Input } from "@/app/shared/components/ui/input";
import { Button } from "@/app/shared/components/ui/button";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Login gagal. Coba lagi.");
        return;
      }

      // Redirect to "from" param if present, otherwise role dashboard
      const from = searchParams.get("from");
      router.push(from ?? data.redirectTo);
      router.refresh();
    } catch {
      setError("Tidak dapat terhubung ke server. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <p className="text-xs font-semibold text-red-600">{error}</p>
        </div>
      )}

      {/* Email field */}
      <Input
        id="email"
        name="email"
        type="email"
        label="Alamat Email"
        icon={Mail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="nama@email.com"
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
        disabled={isLoading}
        className="w-full mt-6 rounded-xl gap-1.5 py-3"
      >
        {isLoading ? "Masuk..." : "Sign In"}
        {!isLoading && <ChevronRight className="w-4 h-4 mt-0.5" />}
      </Button>
    </form>
  );
}

export default function LoginPage() {
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
          <React.Suspense fallback={<div className="py-12 text-center text-zinc-500 text-sm">Memuat form login...</div>}>
            <LoginForm />
          </React.Suspense>

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
