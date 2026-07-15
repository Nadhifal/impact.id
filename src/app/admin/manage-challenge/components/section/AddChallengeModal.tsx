"use client";

import React, { useState, useEffect } from "react";
import { X, Upload, GripVertical, Plus, ChevronRight, Loader2 } from "lucide-react";
import { ApiChallenge, createChallenge, updateChallenge } from "@/lib/api";

interface AddChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: ApiChallenge | null;
  onSuccess?: () => void;   // called after create/update so parent can refresh
}

export function AddChallengeModal({ isOpen, onClose, initialData, onSuccess }: AddChallengeModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Kewirausahaan");
  const [difficulty, setDifficulty] = useState("Menengah");
  const [duration, setDuration] = useState("");
  const [problemDesc, setProblemDesc] = useState("");
  const [solutionGoal, setSolutionGoal] = useState("");
  const [stages, setStages] = useState<string[]>(["Observasi", "Wawancara", "Analisis"]);
  const [evidences, setEvidences] = useState<string[]>(["Dokumen laporan", "Foto kegiatan"]);
  const [audience, setAudience] = useState("Semua tingkat");
  const [publishStatus, setPublishStatus] = useState("Simpan sebagai draf");
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load initial data if editing
  useEffect(() => {
    if (initialData) {
      setName(initialData.title);
      setCategory(initialData.category);
      setDuration("2 minggu"); // dummy default
      setProblemDesc("Konteks dan deskripsi masalah detail untuk challenge ini.");
      setSolutionGoal("Hasil dan solusi nyata dari pengerjaan challenge.");
    } else {
      setName("");
      setCategory("Kewirausahaan");
      setDifficulty("Menengah");
      setDuration("");
      setProblemDesc("");
      setSolutionGoal("");
      setStages(["Observasi", "Wawancara", "Analisis"]);
      setEvidences(["Dokumen laporan", "Foto kegiatan"]);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleAddStage = () => {
    setStages([...stages, ""]);
  };

  const handleStageChange = (idx: number, val: string) => {
    const updated = [...stages];
    updated[idx] = val;
    setStages(updated);
  };

  const handleRemoveStage = (idx: number) => {
    setStages(stages.filter((_, i) => i !== idx));
  };

  const handleAddEvidence = () => {
    const newEvidence = prompt("Masukkan jenis bukti baru:");
    if (newEvidence) {
      setEvidences([...evidences, newEvidence]);
    }
  };

  const handleRemoveEvidence = (item: string) => {
    setEvidences(evidences.filter((e) => e !== item));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);

    const payload = {
      title: name,
      description: problemDesc || solutionGoal || name,
      category,
      location: audience,
      duration: Number(duration.replace(/\D/g, "")) || 14,
      points: difficulty === "Mudah" ? 100 : difficulty === "Menengah" ? 300 : 500,
      target: audience,
    };

    let result;
    if (initialData?.id) {
      result = await updateChallenge(initialData.id, payload);
    } else {
      result = await createChallenge(payload);
    }

    setSaving(false);

    if (result.success) {
      onSuccess?.();
      onClose();
    } else {
      setErrorMsg(result.error ?? "Terjadi kesalahan");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      {/* Modal Card container */}
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-slate-200/80 flex flex-col max-h-[90vh] overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-800">
            {initialData ? "Edit challenge" : "Tambah challenge baru"}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-50 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Cover photo field */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Foto cover (opsional)</label>
            <div className="border border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50/50 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors">
              <Upload className="w-8 h-8 text-slate-400 mb-2" />
              <p className="text-xs font-bold text-slate-700">Seret foto ke sini atau klik untuk unggah</p>
              <p className="text-[10px] text-slate-400 font-semibold mt-1">JPG atau PNG, rasio 16:9, maks 5 MB</p>
            </div>
            <p className="text-[10px] text-slate-400 font-semibold mt-1">
              Kosongkan untuk pakai gambar bawaan sesuai kategori
            </p>
          </div>

          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Nama challenge</label>
            <input
              type="text"
              placeholder="Contoh: UMKM pemasaran digital"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e]"
              required
            />
          </div>

          {/* Row of dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="Kewirausahaan">Kewirausahaan</option>
                <option value="Lingkungan">Lingkungan</option>
                <option value="Sosial">Sosial</option>
                <option value="Edukasi">Edukasi</option>
                <option value="Kesehatan">Kesehatan</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Tingkat kesulitan</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full text-xs px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="Mudah">Mudah</option>
                <option value="Menengah">Menengah</option>
                <option value="Sulit">Sulit</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Estimasi durasi</label>
              <input
                type="text"
                placeholder="mis. 2 minggu"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full text-xs px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e]"
                required
              />
            </div>
          </div>

          {/* Problem description textareas */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Deskripsi permasalahan</label>
            <textarea
              placeholder="Jelaskan konteks dan akar masalah nyata yang harus dipecahkan siswa"
              value={problemDesc}
              onChange={(e) => setProblemDesc(e.target.value)}
              rows={3}
              className="w-full text-xs p-3.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e] resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Tujuan penyelesaian</label>
            <textarea
              placeholder="Hasil apa yang diharapkan tercapai setelah challenge selesai"
              value={solutionGoal}
              onChange={(e) => setSolutionGoal(e.target.value)}
              rows={3}
              className="w-full text-xs p-3.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e] resize-none"
              required
            />
          </div>

          {/* Stages list */}
          <div className="space-y-3.5">
            <label className="text-xs font-bold text-slate-700 block">Tahapan pengerjaan</label>
            <div className="space-y-2">
              {stages.map((stage, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 select-none w-4">{idx + 1}</span>
                  <div className="flex-1 flex items-center border border-slate-200 rounded-lg px-3 py-2 text-xs">
                    <input
                      type="text"
                      value={stage}
                      onChange={(e) => handleStageChange(idx, e.target.value)}
                      className="w-full focus:outline-none bg-transparent"
                      required
                    />
                    <GripVertical className="w-4 h-4 text-slate-400 select-none" />
                  </div>
                  {stages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveStage(idx)}
                      className="text-xs text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      Hapus
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddStage}
              className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-600 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah tahap</span>
            </button>
          </div>

          {/* Evidence pills */}
          <div className="space-y-3.5">
            <label className="text-xs font-bold text-slate-700 block">Bukti yang wajib diunggah</label>
            <div className="flex flex-wrap gap-2">
              {evidences.map((e) => (
                <span
                  key={e}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold"
                >
                  <span>{e}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveEvidence(e)}
                    className="text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
              <button
                type="button"
                onClick={handleAddEvidence}
                className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-lg cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah jenis bukti</span>
              </button>
            </div>
          </div>

          {/* Row of target audience / status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Sasaran pengguna</label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full text-xs px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="Semua tingkat">Semua tingkat</option>
                <option value="Pemula">Pemula</option>
                <option value="Lanjutan">Lanjutan</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Status publikasi</label>
              <select
                value={publishStatus}
                onChange={(e) => setPublishStatus(e.target.value)}
                className="w-full text-xs px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="Simpan sebagai draf">Simpan sebagai draf</option>
                <option value="Publikasikan langsung">Publikasikan langsung</option>
              </select>
            </div>
          </div>
        </form>

        {/* Modal Actions Footer */}
        <div className="p-6 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/50">
          {errorMsg && (
            <p className="text-xs text-red-600 font-semibold mr-auto">{errorMsg}</p>
          )}
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="px-5 py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 text-xs font-bold rounded-xl transition-all cursor-pointer disabled:opacity-40"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-[#00473e] hover:bg-[#003830] disabled:bg-zinc-400 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ChevronRight className="w-3.5 h-3.5" />}
            <span>{saving ? "Menyimpan..." : "Simpan challenge"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
