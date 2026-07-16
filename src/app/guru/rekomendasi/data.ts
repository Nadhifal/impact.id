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
  { id: "1", initials: "NA", initialsBg: "bg-[#00473e] text-white",     name: "Nadhif Alfasya",    hcs: 89, label: "Kuat di kolaborasi & leadership" },
  { id: "2", initials: "SD", initialsBg: "bg-[#00473e] text-white",     name: "Sari Dewi Putri",   hcs: 86, label: "Komunikasi sangat baik" },
  { id: "3", initials: "AR", initialsBg: "bg-slate-200 text-slate-700", name: "Alya Ramadhani",    hcs: 82, label: "Kreativitas tinggi" },
  { id: "4", initials: "RM", initialsBg: "bg-slate-200 text-slate-700", name: "Rizky Maulana",     hcs: 78, label: "Problem solver andalan" },
  { id: "5", initials: "BW", initialsBg: "bg-red-100 text-red-700",     name: "Bagas Wirawan",     hcs: 51, label: "Perlu dorongan ekstra" },
  { id: "6", initials: "CR", initialsBg: "bg-orange-100 text-orange-700",name: "Cinta Ramadhani", hcs: 56, label: "Perlu stimulasi baru" },
  { id: "7", initials: "EP", initialsBg: "bg-red-100 text-red-700",     name: "Eko Prasetyo",      hcs: 48, label: "Prioritas intervensi" },
];

export const riwayatFeedbackData: Record<string, FeedbackRiwayat[]> = {
  "1": [
    { id: "f1", date: "10 Jul 2026", text: `"Nadhif, laporan UMKM Lebak sangat komprehensif. Coba tambahkan data perbandingan omzet sebelum-sesudah pendampingan untuk memperkuat dampak."` },
    { id: "f2", date: "15 Jun 2026", text: `"Kolaborasi dengan mitra UMKM terlihat solid. Tingkatkan dokumentasi foto dan video untuk portofolio yang lebih kuat."` },
  ],
  "2": [
    { id: "f3", date: "11 Jul 2026", text: `"Sari, data gizi balita sangat detail dan terstruktur. Tambahkan rekomendasi intervensi konkret di bab penutup agar laporan lebih actionable."` },
    { id: "f4", date: "20 Jun 2026", text: `"Komunikasi dengan kader posyandu sangat terlihat di kualitas data yang dikumpulkan. Pertahankan pendekatan humanis ini."` },
  ],
  "3": [
    { id: "f5", date: "12 Jul 2026", text: `"Alya, desain materi pelatihan media sosial sangat kreatif. Mohon tambahkan data pertumbuhan follower mitra UMKM sebagai bukti dampak."` },
  ],
  "4": [
    { id: "f6", date: "9 Jul 2026", text: `"Rizky, analisis kampanye daur ulang sangat kuat di sisi teknis. Lengkapi dengan dampak sosial yang sudah dirasakan komunitas RT/RW."` },
  ],
  "5": [
    { id: "f7", date: "5 Jul 2026", text: `"Tetap semangat, Bagas. Mulai dari target kecil yang bisa dicapai minggu ini. Kita coba sesi 1-on-1 besok pagi."` },
  ],
  "6": [
    { id: "f8", date: "3 Jul 2026", text: `"Cinta, challenge sosial sederhana mungkin lebih cocok sebagai titik mulai. Coba program edukasi di lingkungan sekolah dulu."` },
  ],
  "7": [
    { id: "f9", date: "1 Jul 2026", text: `"Eko, saya melihat potensi besar di kemampuan teknis kamu. Mari kita fokus satu challenge dulu sampai tuntas sebelum pindah ke proyek lain."` },
  ],
};

export const aiSuggestions: Record<string, AISuggestion> = {
  "1": { siswaId: "1", suggestion: "Nadhif siap untuk challenge kepemimpinan tingkat lanjut — rekomendasikan ia memimpin tim lintas sekolah dalam program digitalisasi UMKM skala kabupaten." },
  "2": { siswaId: "2", suggestion: "Sari memiliki kemampuan komunikasi luar biasa. Assign challenge advokasi kesehatan masyarakat yang membutuhkan presentasi ke stakeholder Puskesmas." },
  "3": { siswaId: "3", suggestion: "Alya cocok untuk challenge branding UMKM kreatif — gabungkan kemampuan desain dengan pemasaran digital untuk dampak yang lebih terukur." },
  "4": { siswaId: "4", suggestion: "Rizky unggul di problem solving. Challenge lingkungan berbasis teknologi (IoT sensor kualitas air sungai) sangat sesuai profilnya." },
  "5": { siswaId: "5", suggestion: "Bagas butuh challenge dengan struktur jelas dan dukungan peer. Rekomendasikan proyek bersama 2-3 siswa lain di lingkungan yang ia kenal." },
  "6": { siswaId: "6", suggestion: "Cinta perlu stimulus baru. Challenge komunitas ringan seperti bazar kreativitas di sekolah bisa membangun kepercayaan dirinya kembali." },
  "7": { siswaId: "7", suggestion: "Eko sangat perlu pendampingan intensif. Mulai dengan challenge mini 7 hari — pembinaan BUMDes sederhana yang terstruktur dan terukur." },
};
