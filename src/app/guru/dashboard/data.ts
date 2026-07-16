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
    value: 18,
    sub: "Total siswa aktif semester ini",
    type: "siswa",
  },
  {
    label: "Menunggu verifikasi",
    value: 7,
    sub: "Butuh segera ditinjau",
    type: "verifikasi",
  },
  {
    label: "Rata-rata HCS",
    value: "79,4",
    sub: "Naik 3.1% bulan ini",
    type: "hcs",
  },
  {
    label: "Perlu perhatian",
    value: 3,
    sub: "Intervensi diperlukan",
    subIsAlert: true,
    type: "perhatian",
  },
];

export const submissionsMenunggu: SubmissionItem[] = [
  { id: "1", initials: "NA", name: "Nadhif Alfasya", projectTitle: "Digitalisasi UMKM Lebak", timeAgo: "1 jam lalu" },
  { id: "2", initials: "SD", name: "Sari Dewi Putri", projectTitle: "Pemetaan Gizi Balita Pandeglang", timeAgo: "3 jam lalu" },
  { id: "3", initials: "AR", name: "Alya Ramadhani", projectTitle: "UMKM Naik Kelas Kota Serang", timeAgo: "1 hari lalu" },
  { id: "4", initials: "RM", name: "Rizky Maulana", projectTitle: "Kampanye Daur Ulang Plastik", timeAgo: "2 hari lalu" },
  { id: "5", initials: "DA", name: "Dimas Arya Pratama", projectTitle: "Aplikasi Kas BUMDes Serang", timeAgo: "3 hari lalu" },
  { id: "6", initials: "FH", name: "Farah Hasanah", projectTitle: "Literasi Keuangan Pesantren", timeAgo: "4 hari lalu" },
  { id: "7", initials: "YP", name: "Yoga Pratama", projectTitle: "Media Sosial UMKM Cilegon", timeAgo: "5 hari lalu" },
];

export const siswaPerhatianData: SiswaPerhatianItem[] = [
  { id: "1", name: "Bagas Wirawan", kelas: "Kelas XII · Teknik Industri — SMKN 1 Cilegon", hcs: 51, trend: "turun", trendDesc: "Turun 11 poin" },
  { id: "2", name: "Cinta Ramadhani", kelas: "Kelas XI · Manajemen Bisnis — SMAN 2 Serang", hcs: 56, trend: "stagnan", trendDesc: "Stagnan 2 bulan" },
  { id: "3", name: "Eko Prasetyo", kelas: "Semester 3 · Teknik Informatika — Untirta", hcs: 48, trend: "turun", trendDesc: "Turun 9 poin" },
];

export const aiRecommendationDashboard =
  `"Bagas dan Eko menunjukkan penurunan signifikan. Mulai dengan sesi 1-on-1 untuk mengidentifikasi hambatan, lalu assign challenge sosial ringan agar kepercayaan diri membangun kembali secara bertahap."`;
