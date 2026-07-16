// ─── Types ─────────────────────────────────────────────────────────────────

export interface GuruKPIItem {
  label: string;
  value: string | number;
  sub: string;
  subIsAlert?: boolean;
  type: "siswa" | "verifikasi" | "hcs" | "perhatian";
}

export interface SubmissionItem {
  id: string;
  initials: string;
  name: string;
  projectTitle: string;
  timeAgo: string;
}

export interface SiswaPerhatianItem {
  id: string;
  name: string;
  kelas: string;
  hcs: number;
  trend: "turun" | "stagnan";
  trendDesc: string;
}

// ─── Data ──────────────────────────────────────────────────────────────────

export const guruKPIData: GuruKPIItem[] = [
  {
    label: "Siswa bimbingan",
    value: 14,
    sub: "Total siswa aktif",
    type: "siswa",
  },
  {
    label: "Menunggu verifikasi",
    value: 6,
    sub: "Butuh segera ditinjau",
    type: "verifikasi",
  },
  {
    label: "Rata-rata HCS",
    value: "77,1",
    sub: "Naik 2.4% bln ini",
    type: "hcs",
  },
  {
    label: "Perlu perhatian",
    value: 2,
    sub: "Intervensi diperlukan",
    subIsAlert: true,
    type: "perhatian",
  },
];

export const submissionsMenunggu: SubmissionItem[] = [
  { id: "1", initials: "AR", name: "Ariq Fadillah", projectTitle: "UMKM pemasaran digital", timeAgo: "2 jam lalu" },
  { id: "2", initials: "NA", name: "Nadhif Alfasya", projectTitle: "Observasi sampah rumah tangga", timeAgo: "1 hari lalu" },
  { id: "3", initials: "SP", name: "Siti Putri", projectTitle: "Revisi analisis wawancara", timeAgo: "2 hari lalu" },
  { id: "4", initials: "BS", name: "Beni Setiawan", projectTitle: "Sistem IoT penyiram tanaman", timeAgo: "3 hari lalu" },
  { id: "5", initials: "CC", name: "Clara Clarissa", projectTitle: "Redesign Aplikasi Sekolah Kita", timeAgo: "4 hari lalu" },
  { id: "6", initials: "DR", name: "Dewa Ruci", projectTitle: "Analisis Algoritma Pathfinding", timeAgo: "5 hari lalu" },
];

export const siswaPerhatianData: SiswaPerhatianItem[] = [
  { id: "1", name: "Bagas Wirawan", kelas: "Kelas XII · Teknik Industri", hcs: 54, trend: "turun", trendDesc: "Turun 8 poin" },
  { id: "2", name: "Cinta Ramadhani", kelas: "Kelas XII · Manajemen", hcs: 58, trend: "stagnan", trendDesc: "Stagnan" },
];

export const aiRecommendationDashboard =
  "\"Beri tantangan bertahap untuk Bagas agar motivasinya kembali meningkat.\"";
