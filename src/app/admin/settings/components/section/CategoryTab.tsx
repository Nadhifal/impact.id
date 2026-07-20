"use client";

import React, { useEffect, useState } from "react";
import { Card } from "../../../layouts/ui/Card";
import { Save } from "lucide-react";
import { useUser } from "@/app/shared/context/AuthContext";

interface ChallengeCategory {
  name: string;
  description: string;
}

export function CategoryTab() {
  const { user } = useUser();
  const [categories, setCategories] = useState<ChallengeCategory[]>([
    {
      name: "Tech",
      description: "Challenge untuk pengembangan teknologi dan produk digital."
    },
    {
      name: "Sosial",
      description:
        "Challenge dengan fokus pada dampak sosial dan pemberdayaan komunitas."
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/landing-page");
        const json = await res.json();
        if (json.success && Array.isArray(json.data.challengeCategories)) {
          setCategories(json.data.challengeCategories);
        }
      } catch (err) {
        console.error("Failed to load challenge categories:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving("challengeCategories");
    try {
      const res = await fetch("/api/admin/landing-page", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "challengeCategories",
          value: categories,
          adminId: user?.id || "admin-1"
        })
      });
      const json = await res.json();
      if (!json.success) {
        alert("Gagal menyimpan kategori: " + (json.error || "Unknown error"));
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSaving(null);
    }
  };

  const addCategory = () => {
    setCategories([...categories, { name: "", description: "" }]);
  };

  const removeCategory = (index: number) => {
    setCategories(categories.filter((_, idx) => idx !== index));
  };

  return (
    <Card className="border-slate-200 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Kategori challenge
          </h3>
          <p className="text-sm text-slate-500">
            Atur kategori tantangan yang dapat dipilih oleh siswa dan guru saat
            membuat challenge.
          </p>
        </div>
        <button
          onClick={addCategory}
          className="rounded-xl bg-primary px-4 py-3 text-xs font-bold text-white transition hover:bg-primary-hover"
        >
          Tambah Kategori
        </button>
      </div>

      {loading ? (
        <div className="mt-8 text-sm text-slate-500">Memuat kategori...</div>
      ) : (
        <div className="mt-8 space-y-6">
          {categories.map((category, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Kategori #{idx + 1}
                  </p>
                  <p className="text-xs text-slate-400">
                    Isi nama dan deskripsi kategori challenge.
                  </p>
                </div>
                <button
                  onClick={() => removeCategory(idx)}
                  className="text-xs font-bold uppercase tracking-wider text-rose-600 hover:text-rose-700"
                >
                  Hapus
                </button>
              </div>
              <label className="mt-4 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Nama kategori
              </label>
              <input
                type="text"
                value={category.name}
                onChange={(e) => {
                  const updated = [...categories];
                  updated[idx].name = e.target.value;
                  setCategories(updated);
                }}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <label className="mt-4 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Deskripsi kategori
              </label>
              <textarea
                rows={3}
                value={category.description}
                onChange={(e) => {
                  const updated = [...categories];
                  updated[idx].description = e.target.value;
                  setCategories(updated);
                }}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          ))}

          <button
            onClick={handleSave}
            disabled={saving === "challengeCategories"}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold text-white transition hover:bg-primary-hover disabled:opacity-50"
          >
            <Save className="w-4 h-4" />{" "}
            {saving === "challengeCategories"
              ? "Menyimpan..."
              : "Simpan Kategori"}
          </button>
        </div>
      )}
    </Card>
  );
}
