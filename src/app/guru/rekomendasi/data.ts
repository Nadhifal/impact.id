// ─── Types ─────────────────────────────────────────────────────────────────

export interface SiswaFeedback {
  id: string;
  initials: string;
  initialsBg: string;
  name: string;
  hcs: number;
  label: string;
}

export interface FeedbackRiwayat {
  id: string;
  date: string;
  text: string;
}

export interface AISuggestion {
  siswaId: string;
  suggestion: string;
}

// ─── Data ──────────────────────────────────────────────────────────────────

export const siswaFeedbackList: SiswaFeedback[] = [
  { id: "1", initials: "AR", initialsBg: "bg-[#00473e] text-white", name: "Ariq Fadillah", hcs: 81, label: "Kuat di komunikasi" },
  { id: "2", initials: "BW", initialsBg: "bg-slate-200 text-slate-700", name: "Bagas Wirawan", hcs: 54, label: "Perlu dorongan" },
  { id: "3", initials: "SP", initialsBg: "bg-slate-200 text-slate-700", name: "Siti Putri", hcs: 75, label: "Konsisten" },
];

export const riwayatFeedbackData: Record<string, FeedbackRiwayat[]> = {
  "1": [
    { id: "f1", date: "2 Jul 2024", text: "\"Tingkatkan detail data pada analisis wawancara. Fokus pada kutipan langsung dari responden untuk memperkuat argumen.\"" },
    { id: "f2", date: "18 Jun 2024", text: "\"Presentasi sudah baik, coba tambah studi kasus lokal untuk memberikan konteks yang lebih nyata pada audiens.\"" },
  ],
  "2": [
    { id: "f3", date: "5 Jul 2024", text: "\"Tetap semangat, Bagas. Coba fokus pada satu skill dulu sebelum pindah ke skill lain.\"" },
  ],
  "3": [
    { id: "f4", date: "10 Jul 2024", text: "\"Siti sudah menunjukkan konsistensi yang baik. Tingkatkan kreativitas dengan mencoba format laporan yang berbeda.\"" },
  ],
};

export const aiSuggestions: Record<string, AISuggestion> = {
  "1": { siswaId: "1", suggestion: "Kampanye hemat energi — topik ini cocok dengan kekuatan komunikasi dan kolaborasi yang ditunjukkan Ariq dalam tugas sebelumnya." },
  "2": { siswaId: "2", suggestion: "Proyek sosial sederhana di lingkungan sekolah — membantu membangun kepercayaan diri Bagas secara bertahap." },
  "3": { siswaId: "3", suggestion: "Siti siap mencoba challenge tingkat lanjut di bidang kepemimpinan proyek tim kecil." },
};
