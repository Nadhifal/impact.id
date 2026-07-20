"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Share2, Edit, CheckCircle2 } from "lucide-react";
import { Card } from "@/app/shared/components/ui/card";
import { Button } from "@/app/shared/components/ui/button";

interface BioProfile {
  name: string;
  role: string;
  institution: string;
  tags: string[];
  avatarUrl?: string;
}

interface BioSectionProps {
  bio: BioProfile;
}

export function BioSection({ bio }: BioSectionProps) {
  const router = useRouter();
  const [shareStatus, setShareStatus] = useState<string | null>(null);

  const handleShare = async () => {
    const profileUrl = `${window.location.origin}/siswa/portofolio`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${bio.name} — Profil IMPACT.ID`,
          text: "Lihat profil IMPACT.ID saya",
          url: profileUrl
        });
        setShareStatus("Link profil dibagikan.");
        return;
      }

      await navigator.clipboard.writeText(profileUrl);
      setShareStatus("Link profil disalin ke clipboard.");
    } catch {
      setShareStatus("Tidak dapat membagikan profil saat ini.");
    }
  };

  const handleEdit = () => {
    router.push("/siswa/profile");
  };

  return (
    <Card className="bg-white border border-zinc-100 shadow-md p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto text-center md:text-left">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-emerald-400/30 shrink-0 bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-700">
          {bio.avatarUrl ? (
            <Image
              src={bio.avatarUrl}
              alt={bio.name}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <span>
              {bio.name
                .split(" ")
                .map((part) => part[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </span>
          )}
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {bio.name}
            </h1>
            <p className="text-sm font-semibold text-zinc-500">
              {bio.role ? `${bio.role} • ${bio.institution}` : bio.institution}
            </p>
          </div>

          {/* Tags/Badges */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {bio.tags.map((tag, idx) => (
              <span
                key={idx}
                className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                  idx === 0
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                    : idx === 1
                      ? "bg-indigo-50 text-indigo-600 border border-indigo-100"
                      : "bg-zinc-50 text-zinc-600 border border-zinc-100"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center gap-3 w-full md:w-auto justify-center">
        <div className="flex items-center gap-3 w-full md:w-auto justify-center">
          <Button
            type="button"
            onClick={handleShare}
            className="bg-primary hover:bg-primary-hover text-white py-3 px-5 rounded-xl flex items-center gap-2 text-xs font-bold shadow-md"
          >
            <Share2 className="w-4 h-4" />
            Bagikan Profil
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border border-zinc-200 hover:border-zinc-300 text-slate-800 py-3 px-5 rounded-xl flex items-center gap-2 text-xs font-bold"
            onClick={handleEdit}
          >
            <Edit className="w-4 h-4" />
            Edit Profil
          </Button>
        </div>
        {shareStatus && (
          <p className="text-xs text-slate-500 mt-1">{shareStatus}</p>
        )}
      </div>
    </Card>
  );
}
