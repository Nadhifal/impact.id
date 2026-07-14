"use client";

import React from "react";
import Link from "next/link";
import { X, GraduationCap, School, Users, Zap } from "lucide-react";
import { AuthLayout } from "../components/AuthLayout";
import { RoleCard } from "../components/RoleCard";
import { ProgressIndicator } from "@/app/shared/components/ui/progress-indicator";

export default function RegisterStep1Page() {
  const roles = [
    {
      id: "siswa",
      title: "Siswa/Mahasiswa",
      description: "Akses kursus, sertifikasi, dan jejaring industri.",
      icon: GraduationCap,
      href: "/auth/register/step-2", // Links to Step 2 (Data Diri)
    },
    {
      id: "guru",
      title: "Guru/Dosen",
      description: "Bagikan ilmu, pantau progres, dan kelola kelas digital.",
      icon: Users,
      href: "#",
    },
    {
      id: "sekolah",
      title: "Sekolah/Dinas",
      description: "Integrasi data wilayah dan manajemen institusi terpadu.",
      icon: School,
      href: "#",
    },
  ];

  return (
    <AuthLayout showAbstractBackground={true}>
      <div className="w-full max-w-[640px] bg-white border border-zinc-100 rounded-3xl p-8 md:p-10 shadow-sm relative z-10">
        {/* Close Button */}
        <Link
          href="/"
          className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100/50 p-2 rounded-full transition-all cursor-pointer"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </Link>

        {/* Progress Indicator */}
        <ProgressIndicator steps={3} currentStep={1} className="max-w-[360px] mx-auto mb-8" />

        {/* Page Headers */}
        <h1 className="text-2xl md:text-[28px] font-bold text-primary tracking-tight mb-2 text-left">
          Bergabung dengan Impact Ecosystem
        </h1>
        <p className="text-zinc-500 text-sm mb-8 text-left leading-relaxed">
          Pilih peranmu untuk memulai perjalanan.
        </p>

        {/* Role selection card list */}
        <div className="space-y-4 mb-6">
          {roles.map((role) => (
            <RoleCard
              key={role.id}
              id={role.id}
              title={role.title}
              description={role.description}
              icon={role.icon}
              href={role.href}
            />
          ))}
        </div>

        {/* AI Mentor Insight Banner */}
        <div className="w-full bg-[#584FBC] text-white rounded-2xl p-5 relative overflow-hidden mb-8 shadow-sm">
          {/* Visual design embellishment representing the glowing background pattern */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-4 translate-y-4">
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" />
              <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-[#EEEDFE] shrink-0 mt-0.5">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[11px] font-extrabold tracking-widest text-[#EEEDFE] uppercase">
                AI Mentor Insight
              </h4>
              <p className="text-xs text-slate-100/90 leading-relaxed font-medium">
                Pilih peran akan menyesuaikan modul AI yang kami siapkan untuk membantu efisiensi dan personalisasi profil Anda di Impact Ecosystem.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Login Redirect */}
        <div className="text-center text-xs text-zinc-500">
          Sudah punya akun?{" "}
          <Link href="/auth/login" className="font-bold text-primary hover:underline">
            Masuk di sini
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
