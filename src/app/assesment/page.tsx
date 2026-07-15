"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, ChevronRight, ArrowLeft } from "lucide-react";
import { assessmentQuestions } from "./data";
import { Button } from "@/app/shared/components/ui/button";

export default function AssessmentPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    Array(assessmentQuestions.length).fill(null)
  );

  const currentQuestion = assessmentQuestions[currentIndex];
  const totalQuestions = assessmentQuestions.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const handleOptionSelect = (optionIndex: number) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentIndex] = optionIndex;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNext = async () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Calculate HCS scores
      // Map option indexes to scores: index 0 = 4, index 1 = 3, index 2 = 2, index 3 = 1
      const categoryScores = { SI: 0, LD: 0, IN: 0, RL: 0 };
      const categoryCounts = { SI: 0, LD: 0, IN: 0, RL: 0 };

      assessmentQuestions.forEach((q, idx) => {
        const answerIndex = selectedAnswers[idx];
        const score = answerIndex !== null ? 4 - answerIndex : 0; // 0 index -> 4, 3 index -> 1
        categoryScores[q.category] += score;
        categoryCounts[q.category] += 1;
      });

      const SI = Math.round((categoryScores.SI / (categoryCounts.SI * 4)) * 100);
      const LD = Math.round((categoryScores.LD / (categoryCounts.LD * 4)) * 100);
      const IN = Math.round((categoryScores.IN / (categoryCounts.IN * 4)) * 100);
      const RL = Math.round((categoryScores.RL / (categoryCounts.RL * 4)) * 100);

      localStorage.setItem("hcs_scores", JSON.stringify({ SI, LD, IN, RL }));

      try {
        await fetch("/api/users/demo-student-1", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ scores: { SI, LD, IN, RL } }),
        });
      } catch (err) {
        console.error("Database sync failed for assessment scores:", err);
      }

      window.location.href = "/siswa/dashboard";
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafb]">
      {/* Assessment Header Navbar */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-zinc-100 px-6 py-4 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/siswa/dashboard"
              className="p-1.5 text-zinc-400 hover:text-slate-800 hover:bg-zinc-50 rounded-full transition-all"
              aria-label="Tutup Asesmen"
            >
              <X className="w-5 h-5" />
            </Link>
            <span className="text-xl font-black text-slate-900 tracking-tight">
              IMPACT.ID
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Card container */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-[720px] bg-white border border-zinc-100 rounded-3xl p-8 md:p-10 shadow-sm relative">
          {/* Page Headers */}
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1 text-left">
            Asesmen awal
          </h1>
          <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-8 text-left">
            Bantu kami mengenal potensimu.
          </p>

          {/* Progress Indicator */}
          <div className="space-y-2 mb-8">
            <div className="flex justify-between text-[10px] font-extrabold text-zinc-400 tracking-wider">
              <span>PERTANYAAN {currentIndex + 1} DARI {totalQuestions}</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question and Options Area */}
          <div className="space-y-6 min-h-[320px]">
            <h2 className="text-xl font-extrabold text-slate-900 leading-snug">
              {currentQuestion.text}
            </h2>

            {/* Options list */}
            <div className="space-y-3.5">
              {currentQuestion.options.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentIndex] === optIdx;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleOptionSelect(optIdx)}
                    className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-all duration-200 text-left cursor-pointer ${
                      isSelected
                        ? "bg-surface-card border-primary text-primary"
                        : "bg-white border-zinc-100 hover:border-zinc-200 text-zinc-600 hover:text-slate-800"
                    }`}
                  >
                    {/* Custom Radio Ring */}
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        isSelected ? "border-primary" : "border-zinc-300"
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                      )}
                    </div>
                    <span className="text-sm font-bold">{option}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="border-zinc-100 my-8" />

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </button>
            <Button
              onClick={handleNext}
              disabled={selectedAnswers[currentIndex] === null}
              className="px-8 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white gap-1.5 disabled:opacity-50 disabled:pointer-events-none"
            >
              {currentIndex === totalQuestions - 1 ? "Selesai" : "Lanjut"}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#f8fafb] border-t border-zinc-100 py-6 px-6 md:px-12 text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-zinc-500">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-slate-900 font-black">IMPACT.ID</span>
            <p className="font-medium text-[10px]">
              © 2024 IMPACT.ID. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-slate-800 transition-colors">Syarat & Ketentuan</Link>
            <Link href="#" className="hover:text-slate-800 transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-slate-800 transition-colors">Bantuan</Link>
            <Link href="#" className="hover:text-slate-800 transition-colors">Kontak</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
