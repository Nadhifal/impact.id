"use client";

import React, { useEffect, useState } from "react";
import { Card } from "../../../layouts/ui/Card";
import { Save } from "lucide-react";
import { useUser } from "@/app/shared/context/AuthContext";

interface PolicyDocuments {
  privacyPolicy: string;
  termsOfService: string;
  communityGuidelines: string;
}

const defaultPolicy: PolicyDocuments = {
  privacyPolicy:
    "Tuliskan kebijakan privasi platform di sini. Jelaskan data apa yang dikumpulkan dan bagaimana digunakan.",
  termsOfService:
    "Tuliskan syarat dan ketentuan penggunaan layanan di sini. Sertakan hak dan kewajiban pengguna.",
  communityGuidelines:
    "Tuliskan pedoman komunitas, etika pengunaan, dan larangan untuk pengguna platform."
};

export function PolicyTab() {
  const { user } = useUser();
  const [policy, setPolicy] = useState<PolicyDocuments>(defaultPolicy);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/landing-page");
        const json = await res.json();
        if (json.success && json.data.policyDocuments) {
          setPolicy(json.data.policyDocuments);
        }
      } catch (err) {
        console.error("Failed to load policy documents:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving("policyDocuments");
    try {
      const res = await fetch("/api/admin/landing-page", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "policyDocuments",
          value: policy,
          adminId: user?.id || "admin-1"
        })
      });
      const json = await res.json();
      if (!json.success) {
        alert("Gagal menyimpan kebijakan: " + (json.error || "Unknown error"));
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSaving(null);
    }
  };

  return (
    <Card className="border-slate-200 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Kebijakan</h3>
          <p className="text-sm text-slate-500">
            Kelola teks Kebijakan Privasi, Syarat & Ketentuan, dan Pedoman
            Komunitas.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="mt-8 text-sm text-slate-500">Memuat kebijakan...</div>
      ) : (
        <div className="mt-8 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Kebijakan Privasi
            </label>
            <textarea
              rows={6}
              value={policy.privacyPolicy}
              onChange={(e) =>
                setPolicy({ ...policy, privacyPolicy: e.target.value })
              }
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Syarat & Ketentuan
            </label>
            <textarea
              rows={6}
              value={policy.termsOfService}
              onChange={(e) =>
                setPolicy({ ...policy, termsOfService: e.target.value })
              }
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Pedoman Komunitas
            </label>
            <textarea
              rows={6}
              value={policy.communityGuidelines}
              onChange={(e) =>
                setPolicy({ ...policy, communityGuidelines: e.target.value })
              }
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving === "policyDocuments"}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold text-white transition hover:bg-primary-hover disabled:opacity-50"
          >
            <Save className="w-4 h-4" />{" "}
            {saving === "policyDocuments" ? "Menyimpan..." : "Simpan Kebijakan"}
          </button>
        </div>
      )}
    </Card>
  );
}
