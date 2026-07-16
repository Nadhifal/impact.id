"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Terminal, Briefcase, Palette, Users, Leaf, Microscope,
  X, Plus, Info, ChevronRight, ArrowLeft
} from "lucide-react";
import { AuthLayout } from "../../components/AuthLayout";
import { Button } from "@/app/shared/components/ui/button";
import { ProgressIndicator } from "@/app/shared/components/ui/progress-indicator";

export default function RegisterStep3Page() {
  const router = useRouter();
  const [selectedMinat, setSelectedMinat] = useState<string>("teknologi");
  const [skills, setSkills] = useState<string[]>(["Desain Grafis", "Coding"]);
  const [inputValue, setInputValue] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const minatList = [
    { id: "teknologi", label: "Teknologi", icon: Terminal },
    { id: "bisnis", label: "Bisnis", icon: Briefcase },
    { id: "seni", label: "Seni & Kreatif", icon: Palette },
    { id: "sosial", label: "Sosial", icon: Users },
    { id: "lingkungan", label: "Lingkungan", icon: Leaf },
    { id: "sains", label: "Sains", icon: Microscope },
  ];

  const suggestedSkills = ["Public Speaking", "Penulisan Kreatif", "Manajemen Proyek"];

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleAddSkill = (skillToAdd: string) => {
    if (skillToAdd && !skills.includes(skillToAdd)) {
      setSkills([...skills, skillToAdd]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim()) {
        handleAddSkill(inputValue.trim());
        setInputValue("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Retrieve step-2 data
      const step2Raw = sessionStorage.getItem("register_step2");
      if (!step2Raw) {
        router.push("/auth/register/step-2");
        return;
      }
      const step2 = JSON.parse(step2Raw);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: step2.fullName,
          email: step2.email,
          password: step2.password,
          role: "STUDENT",
          phone: step2.phone,
          school: step2.school,
          province: step2.province,
          city: step2.city,
          interests: selectedMinat,
          skills: skills.join(","),
          hobbies,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Registrasi gagal. Coba lagi.");
        return;
      }

      sessionStorage.removeItem("register_step2");
      router.push(data.redirectTo ?? "/siswa/dashboard");
      router.refresh();
    } catch {
      setError("Tidak dapat terhubung ke server. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout showAbstractBackground={true}>
      <div className="w-full max-w-[800px] bg-white border border-zinc-100 rounded-3xl p-8 md:p-10 shadow-sm relative z-10">
        {/* Progress Indicator */}
        <ProgressIndicator steps={3} currentStep={3} className="max-w-[360px] mx-auto mb-8" />

        {/* Page Headers */}
        <h1 className="text-2xl md:text-[28px] font-bold text-primary tracking-tight mb-2 text-center mt-4">
          Minat & Keahlian
        </h1>
        <p className="text-zinc-500 text-sm mb-10 text-center leading-relaxed max-w-md mx-auto">
          Bantu kami menyesuaikan perjalanan belajarmu dengan mengenali potensimu.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              <p className="text-xs font-semibold text-red-600">{error}</p>
            </div>
          )}
          {/* Bidang Minat */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Bidang Minat</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {minatList.map((minat) => {
                const Icon = minat.icon;
                const isSelected = selectedMinat === minat.id;
                return (
                  <button
                    key={minat.id}
                    type="button"
                    onClick={() => setSelectedMinat(minat.id)}
                    className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300 gap-3 cursor-pointer ${
                      isSelected
                        ? "bg-surface-card border-primary text-primary"
                        : "bg-white border-zinc-100 hover:border-zinc-200 text-zinc-600 hover:text-zinc-800"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-xl transition-colors ${
                        isSelected ? "bg-primary/10 text-primary" : "bg-zinc-50 text-zinc-400"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold">{minat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Keahlian Utama */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Keahlian Utama</h3>
            
            {/* Input field with tags inside */}
            <div className="flex flex-wrap items-center gap-2 p-3 bg-surface-input border border-zinc-200 rounded-xl min-h-[50px] focus-within:ring-2 focus-within:ring-primary/10 focus-within:border-primary transition-all">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-bold py-1.5 px-3 rounded-full"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:bg-white/20 rounded-full p-0.5 transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <input
                type="text"
                placeholder={skills.length === 0 ? "Ketik keahlian utama..." : "Ketik keahlian lainnya..."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-sm text-zinc-800 focus:outline-none placeholder:text-zinc-400 min-w-[150px]"
              />
            </div>

            {/* Suggestions */}
            <div className="flex flex-wrap gap-2 pt-1">
              {suggestedSkills.map((skill) => {
                const isAdded = skills.includes(skill);
                if (isAdded) return null;
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleAddSkill(skill)}
                    className="inline-flex items-center gap-1 border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 text-zinc-600 text-xs font-bold py-1.5 px-3.5 rounded-full transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bakat & Hobi */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Bakat & Hobi</h3>
            <textarea
              placeholder="Ceritakan bakat unik atau hobi yang kamu geluti (misal: bermain alat musik, olahraga ekstrem, koleksi buku langka, dsb.)"
              value={hobbies}
              onChange={(e) => setHobbies(e.target.value)}
              rows={4}
              className="w-full p-4 bg-surface-input border border-zinc-200 rounded-2xl text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all placeholder:text-zinc-400 resize-none leading-relaxed"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
            <Link href="/auth/register/step-2" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-600 hover:text-zinc-800 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Link>
            <Button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white gap-1.5 disabled:opacity-50"
            >
              Selesaikan
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>

      {/* Info Alert Block */}
      <div className="w-full max-w-[800px] mt-6 bg-[#d9effc] text-[#1c64f2] border border-[#a4cafe]/30 rounded-2xl p-4 flex items-start gap-3 relative z-10 shadow-sm">
        <Info className="w-5 h-5 shrink-0 mt-0.5 text-[#1c64f2]" />
        <p className="text-xs font-semibold leading-relaxed text-[#1c64f2]/90">
          Data minat dan keahlianmu akan digunakan oleh sistem AI kami untuk memberikan rekomendasi kursus dan mentor yang paling relevan untukmu.
        </p>
      </div>
    </AuthLayout>
  );
}
