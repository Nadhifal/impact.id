"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Camera, Edit3, Save, X, CheckCircle, Heart, Award, Star,
  MapPin, School, User, Tag, FileText, Gift, AlertCircle, Loader2
} from "lucide-react";
import { Card } from "@/app/guru/verifikasi/components/ui/Card";
import { useUser } from "@/app/shared/context/AuthContext";
import { CompletedChallenges } from "./components/section/CompletedChallenges";
import { ImpactGrowthCard } from "./components/section/ImpactGrowthCard";
import { GoalProgressCard } from "./components/section/GoalProgressCard";
import { SkillsCard } from "./components/section/SkillsCard";

interface ProfileData {
  name: string;
  email: string;
  avatarUrl: string | null;
  profile: {
    schoolName: string | null;
    province: string | null;
    city: string | null;
    interests: string;
    talents: string;
  } | null;
}

const AVATAR_KEY = "impact_avatar";

export default function StudentProfilePage() {
  const { user, refresh } = useUser();
  const fileRef = useRef<HTMLInputElement>(null);

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [saveMsg, setSaveMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [editForm, setEditForm] = useState({
    name: "",
    schoolName: "",
    province: "",
    city: "",
    interests: "",
    talents: "",
  });

  // Load avatar from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(AVATAR_KEY);
    if (stored) setAvatarPreview(stored);
  }, []);

  // Fetch profile data
  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        setProfileData(data);
        // Use DB avatarUrl first, then localStorage
        if (data.avatarUrl) {
          setAvatarPreview(data.avatarUrl);
          localStorage.setItem(AVATAR_KEY, data.avatarUrl);
        }
        setEditForm({
          name: data.name ?? "",
          schoolName: data.profile?.schoolName ?? "",
          province: data.profile?.province ?? "",
          city: data.profile?.city ?? "",
          interests: (() => {
            try { return JSON.parse(data.profile?.interests ?? "[]").join(", "); }
            catch { return data.profile?.interests ?? ""; }
          })(),
          talents: (() => {
            try { return JSON.parse(data.profile?.talents ?? "[]").join(", "); }
            catch { return data.profile?.talents ?? ""; }
          })(),
        });
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  // Avatar source — DB wins, then localStorage, then initials
  const avatarSrc = profileData?.avatarUrl ?? avatarPreview;
  const displayName = profileData?.name ?? user?.name ?? "—";
  const displayEmail = profileData?.email ?? user?.email ?? "—";
  const interests = (() => {
    try { return JSON.parse(profileData?.profile?.interests ?? "[]") as string[]; }
    catch { return profileData?.profile?.interests ? [profileData.profile.interests] : []; }
  })();
  const initials = displayName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  // Handle avatar upload
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setSaveMsg({ type: "error", text: "Ukuran foto maksimal 2MB." });
      return;
    }

    setIsUploadingAvatar(true);
    try {
      const fd = new FormData();
      fd.append("avatar", file);
      const res = await fetch("/api/profile/avatar", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.avatarUrl) {
        localStorage.setItem(AVATAR_KEY, data.avatarUrl);
        setAvatarPreview(data.avatarUrl);
        setSaveMsg({ type: "success", text: "Foto profil berhasil diperbarui!" });
      } else {
        setSaveMsg({ type: "error", text: data.error ?? "Gagal mengunggah foto." });
      }
    } catch {
      setSaveMsg({ type: "error", text: "Tidak dapat terhubung ke server." });
    } finally {
      setIsUploadingAvatar(false);
      setTimeout(() => setSaveMsg(null), 3000);
    }
  };

  // Handle save profile
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const interests = editForm.interests.split(",").map((s) => s.trim()).filter(Boolean);
      const talents = editForm.talents.split(",").map((s) => s.trim()).filter(Boolean);

      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editForm.name,
          schoolName: editForm.schoolName,
          province: editForm.province,
          city: editForm.city,
          interests,
          talents,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setSaveMsg({ type: "error", text: data.error ?? "Gagal menyimpan." });
        return;
      }

      await refresh();
      await fetchProfile();
      setIsEditing(false);
      setSaveMsg({ type: "success", text: "Profil berhasil disimpan!" });
    } catch {
      setSaveMsg({ type: "error", text: "Tidak dapat terhubung ke server." });
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMsg(null), 3000);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10 md:py-16 animate-fade-in">

      {/* Toast */}
      {saveMsg && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl shadow-lg text-sm font-semibold transition-all ${
          saveMsg.type === "success" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
        }`}>
          {saveMsg.type === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {saveMsg.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* ── LEFT COLUMN ─────────────────────────── */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-6">

          {/* Profile Card */}
          <Card className="p-6 text-center flex flex-col items-center border border-slate-100 shadow-xs">

            {/* Avatar */}
            <div className="relative w-24 h-24 rounded-full border-4 border-[#e6f4f1] mb-4 group">
              {avatarSrc ? (
                <Image src={avatarSrc} alt={displayName} fill className="object-cover rounded-full" unoptimized />
              ) : (
                <div className="w-full h-full rounded-full bg-[#e6f4f1] flex items-center justify-center text-2xl font-bold text-[#00473e]">
                  {initials}
                </div>
              )}

              {/* Upload overlay */}
              <button
                onClick={() => fileRef.current?.click()}
                disabled={isUploadingAvatar}
                className="absolute inset-0 rounded-full bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                {isUploadingAvatar
                  ? <Loader2 className="w-5 h-5 text-white animate-spin" />
                  : <Camera className="w-5 h-5 text-white" />}
                <span className="text-[10px] text-white font-bold mt-1">Ubah Foto</span>
              </button>

              {/* Verified badge */}
              <div className="absolute bottom-0 right-0 bg-[#00473e] text-white p-1 rounded-full border-2 border-white">
                <CheckCircle className="w-3.5 h-3.5 fill-white text-[#00473e]" />
              </div>
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />

            {/* Name & School */}
            {!isEditing ? (
              <>
                <h2 className="text-lg font-bold text-slate-800 leading-tight">{displayName}</h2>
                <p className="text-xs text-slate-400 font-semibold mt-1">{displayEmail}</p>
                {profileData?.profile?.schoolName && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-slate-500">
                    <School className="w-3 h-3" />
                    <span>{profileData.profile.schoolName}</span>
                  </div>
                )}
                {(profileData?.profile?.city || profileData?.profile?.province) && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                    <MapPin className="w-3 h-3" />
                    <span>{[profileData.profile?.city, profileData.profile?.province].filter(Boolean).join(", ")}</span>
                  </div>
                )}
                {interests.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                    {interests.map((tag, idx) => (
                      <span key={idx} className={`text-[9px] font-bold px-2 py-1 rounded ${
                        idx === 0 ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-slate-50 text-slate-600 border border-slate-100"
                      }`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-[#00473e] hover:bg-[#003830] text-white text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit Profil
                </button>
              </>
            ) : (
              /* ── EDIT FORM ── */
              <div className="w-full text-left space-y-3 mt-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Nama Lengkap</label>
                  <input value={editForm.name} onChange={(e) => setEditForm(p => ({ ...p, name: e.target.value }))}
                    className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-[#00473e]/20" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1"><School className="w-3 h-3" /> Sekolah / Kampus</label>
                  <input value={editForm.schoolName} onChange={(e) => setEditForm(p => ({ ...p, schoolName: e.target.value }))}
                    placeholder="mis. Universitas Sultan Ageng Tirtayasa"
                    className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-[#00473e]/20" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1"><MapPin className="w-3 h-3" /> Kota</label>
                    <input value={editForm.city} onChange={(e) => setEditForm(p => ({ ...p, city: e.target.value }))}
                      placeholder="Kota Serang"
                      className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-[#00473e]/20" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Provinsi</label>
                    <input value={editForm.province} onChange={(e) => setEditForm(p => ({ ...p, province: e.target.value }))}
                      placeholder="Banten"
                      className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-[#00473e]/20" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1"><Tag className="w-3 h-3" /> Minat (pisahkan koma)</label>
                  <input value={editForm.interests} onChange={(e) => setEditForm(p => ({ ...p, interests: e.target.value }))}
                    placeholder="Tech, Bisnis, Lingkungan"
                    className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-[#00473e]/20" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1"><User className="w-3 h-3" /> Keahlian (pisahkan koma)</label>
                  <input value={editForm.talents} onChange={(e) => setEditForm(p => ({ ...p, talents: e.target.value }))}
                    placeholder="Coding, Desain Grafis"
                    className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-[#00473e]/20" />
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#00473e] hover:bg-[#003830] disabled:opacity-60 text-white text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                    {isSaving ? "Menyimpan..." : "Simpan"}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 flex items-center justify-center gap-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" /> Batal
                  </button>
                </div>
              </div>
            )}
          </Card>

          {/* Impact Statistics */}
          <Card className="p-6 border border-slate-100 shadow-xs">
            <h3 className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase mb-4">
              Impact Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-[#f8fafb] hover:bg-slate-50 p-3.5 rounded-xl border border-slate-50 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 fill-emerald-600/10" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-slate-400 font-bold leading-none">Impact Score</p>
                  <h4 className="text-base font-extrabold text-slate-800 mt-1 leading-none">2.450</h4>
                </div>
                <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-1 rounded">+12%</span>
              </div>
              <div className="flex items-center gap-3 bg-[#f8fafb] hover:bg-slate-50 p-3.5 rounded-xl border border-slate-50 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-slate-400 font-bold leading-none">Projects Verified</p>
                  <h4 className="text-base font-extrabold text-slate-800 mt-1 leading-none">12</h4>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-[#f8fafb] hover:bg-slate-50 p-3.5 rounded-xl border border-slate-50 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 fill-indigo-600/10" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-slate-400 font-bold leading-none">Hours of Impact</p>
                  <h4 className="text-base font-extrabold text-slate-800 mt-1 leading-none">480 <span className="text-xs font-semibold text-slate-400">hrs</span></h4>
                </div>
              </div>
            </div>
          </Card>

          {/* Nav */}
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary text-white font-semibold text-xs rounded-xl transition-all cursor-pointer">
              <User className="w-4 h-4" /><span>Overview</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-slate-500 hover:text-slate-800 font-semibold text-xs rounded-xl transition-all cursor-pointer">
              <FileText className="w-4 h-4" /><span>Documents</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-slate-500 hover:text-slate-800 font-semibold text-xs rounded-xl transition-all cursor-pointer">
              <Gift className="w-4 h-4" /><span>Rewards</span>
            </button>
          </div>
        </div>

        {/* ── RIGHT COLUMN ────────────────────────── */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            <div className="md:col-span-8"><ImpactGrowthCard /></div>
            <div className="md:col-span-4"><GoalProgressCard /></div>
          </div>
          <SkillsCard />
          <CompletedChallenges />
        </div>
      </div>
    </div>
  );
}
