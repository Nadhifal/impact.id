"use client";

import React, { useState } from "react";
import { Sparkles, Send, Pencil, Clock } from "lucide-react";
import { Card } from "../ui/Card";
import {
  siswaFeedbackList,
  riwayatFeedbackData,
  aiSuggestions,
} from "../../data";

interface FeedbackPanelProps {
  selectedId: string;
}

export function FeedbackPanel({ selectedId }: FeedbackPanelProps) {
  const [feedbackText, setFeedbackText] = useState("");
  const [sent, setSent] = useState(false);

  const siswa = siswaFeedbackList.find((s) => s.id === selectedId) ?? siswaFeedbackList[0];
  const riwayat = riwayatFeedbackData[selectedId] ?? [];
  const ai = aiSuggestions[selectedId];

  const now = new Date();
  const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")} ${now.getHours() >= 12 ? "PM" : "AM"}`;

  const handleSend = () => {
    if (!feedbackText.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFeedbackText("");
    }, 2000);
  };

  return (
    <Card className="p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-800">
            Rekomendasi untuk {siswa.name}
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Terakhir diupdate: {timeStr}
          </p>
        </div>
      </div>

      {/* AI Saran */}
      <div className="border border-slate-100 rounded-2xl p-5 bg-slate-50/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎯</span>
            <p className="text-sm font-bold text-slate-700">Saran challenge berikutnya (AI)</p>
          </div>
          <Sparkles className="w-4 h-4 text-slate-300" />
        </div>
        <p className="text-sm font-semibold text-slate-800 leading-relaxed">
          {ai?.suggestion ?? "Tidak ada saran tersedia."}
        </p>
      </div>

      {/* Feedback Personal */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-bold text-slate-700">Feedback Personal</p>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Markdown Didukung
          </span>
        </div>
        <div className="border border-slate-200 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-[#00473e]/20">
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Tulis feedback personal untuk siswa ini..."
            rows={5}
            className="w-full p-4 text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none resize-none bg-white"
          />
          <div className="flex justify-end p-3 border-t border-slate-100 bg-slate-50/50">
            <button
              onClick={handleSend}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                sent
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-[#00473e] hover:bg-[#003830] text-white"
              }`}
            >
              <Send className="w-4 h-4" />
              {sent ? "Terkirim!" : "Kirim ke siswa"}
            </button>
          </div>
        </div>
      </div>

      {/* Riwayat Feedback */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-slate-400" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Riwayat Feedback
          </p>
        </div>

        {riwayat.length === 0 ? (
          <p className="text-sm text-slate-400 font-medium italic px-2">
            Belum ada riwayat feedback untuk siswa ini.
          </p>
        ) : (
          <div className="space-y-3">
            {riwayat.map((item) => (
              <div
                key={item.id}
                className="border-l-4 border-slate-200 pl-4 py-2 relative group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {item.date}
                  </span>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-slate-100 rounded-lg cursor-pointer">
                    <Pencil className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
                <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
