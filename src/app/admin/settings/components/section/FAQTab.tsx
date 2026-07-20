"use client";

import React, { useEffect, useState } from "react";
import { Card } from "../../../layouts/ui/Card";
import { Save } from "lucide-react";
import { useUser } from "@/app/shared/context/AuthContext";

interface FaqItem {
  question: string;
  answer: string;
}

export function FAQTab() {
  const { user } = useUser();
  const [items, setItems] = useState<FaqItem[]>([
    {
      question: "Apa itu IMPACT.ID?",
      answer:
        "Platform untuk membantu siswa mengembangkan portofolio berbasis proyek nyata."
    },
    {
      question: "Bagaimana cara bergabung?",
      answer:
        "Daftar sebagai siswa, guru, atau dinas, lalu lengkapi profil dan lanjutkan ke tantangan."
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/landing-page");
        const json = await res.json();
        if (json.success && Array.isArray(json.data.faqItems)) {
          setItems(json.data.faqItems);
        }
      } catch (err) {
        console.error("Failed to load FAQ items:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving("faqItems");
    try {
      const res = await fetch("/api/admin/landing-page", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "faqItems",
          value: items,
          adminId: user?.id || "admin-1"
        })
      });
      const json = await res.json();
      if (json.success) {
        setToast("FAQ berhasil disimpan.");
        setTimeout(() => setToast(null), 2500);
      } else {
        alert("Gagal menyimpan FAQ: " + (json.error || "Unknown error"));
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSaving(null);
    }
  };

  const addItem = () => {
    setItems([...items, { question: "", answer: "" }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, idx) => idx !== index));
  };

  return (
    <Card className="border-slate-200 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">FAQ</h3>
          <p className="text-sm text-slate-500">
            Kelola daftar pertanyaan umum yang ditampilkan pada halaman bantuan
            atau dokumentasi pengguna.
          </p>
        </div>
        <button
          onClick={addItem}
          className="rounded-xl bg-primary px-4 py-3 text-xs font-bold text-white transition hover:bg-primary-hover"
        >
          Tambah FAQ
        </button>
      </div>

      {loading ? (
        <div className="mt-8 text-sm text-slate-500">Memuat FAQ...</div>
      ) : (
        <div className="mt-8 space-y-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-semibold text-slate-700">
                  FAQ #{idx + 1}
                </p>
                <button
                  onClick={() => removeItem(idx)}
                  className="text-xs font-bold uppercase tracking-wider text-rose-600 hover:text-rose-700"
                >
                  Hapus
                </button>
              </div>
              <label className="mt-4 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Pertanyaan
              </label>
              <input
                type="text"
                value={item.question}
                onChange={(e) => {
                  const updated = [...items];
                  updated[idx].question = e.target.value;
                  setItems(updated);
                }}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <label className="mt-4 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Jawaban
              </label>
              <textarea
                rows={3}
                value={item.answer}
                onChange={(e) => {
                  const updated = [...items];
                  updated[idx].answer = e.target.value;
                  setItems(updated);
                }}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          ))}

          <button
            onClick={handleSave}
            disabled={saving === "faqItems"}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold text-white transition hover:bg-primary-hover disabled:opacity-50"
          >
            <Save className="w-4 h-4" />{" "}
            {saving === "faqItems" ? "Menyimpan..." : "Simpan FAQ"}
          </button>
        </div>
      )}
    </Card>
  );
}
