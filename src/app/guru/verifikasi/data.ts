export interface Submission {
  id: string;
  initials: string;
  name: string;
  projectTitle: string;
  timeAgo: string;
  status: "baru" | "revisi" | "normal";
  file: {
    name: string;
    size: string;
  };
  scores: {
    leadership: number;
    komunikasi: number;
    problemSolving: number;
    kreativitas: number;
    kolaborasi: number;
  };
  feedback: string;
}

export interface Stats {
  averageHcs: number;
  hcsChange: string;
  challengesCompleted: number;
  challengesTarget: number;
}

export const dummySubmissions: Submission[] = [
  {
    id: "1",
    initials: "NA",
    name: "Nadhif Alfasya",
    projectTitle: "Digitalisasi UMKM Lebak — Pendampingan 12 Mitra",
    timeAgo: "dikirim 1 jam lalu",
    status: "baru",
    file: { name: "Laporan_Digitalisasi_UMKM_Lebak.pdf", size: "3.2 MB" },
    scores: { leadership: 4, komunikasi: 5, problemSolving: 4, kreativitas: 4, kolaborasi: 5 },
    feedback: "",
  },
  {
    id: "2",
    initials: "SD",
    name: "Sari Dewi Putri",
    projectTitle: "Pemetaan Gizi Balita Pandeglang — 45 Balita 3 Dusun",
    timeAgo: "dikirim 3 jam lalu",
    status: "normal",
    file: { name: "Laporan_Gizi_Balita_Pandeglang.pdf", size: "4.1 MB" },
    scores: { leadership: 3, komunikasi: 5, problemSolving: 4, kreativitas: 4, kolaborasi: 5 },
    feedback: "Data sangat komprehensif. Tambahkan rekomendasi intervensi gizi di halaman penutup.",
  },
  {
    id: "3",
    initials: "AR",
    name: "Alya Ramadhani",
    projectTitle: "UMKM Naik Kelas — Google Business Profile",
    timeAgo: "dikirim 1 hari lalu",
    status: "revisi",
    file: { name: "UMKM_Naik_Kelas_Serang_Alya.pdf", size: "2.7 MB" },
    scores: { leadership: 4, komunikasi: 4, problemSolving: 3, kreativitas: 5, kolaborasi: 4 },
    feedback: "",
  },
  {
    id: "4",
    initials: "RM",
    name: "Rizky Maulana",
    projectTitle: "Kampanye Daur Ulang Plastik Tangerang",
    timeAgo: "dikirim 2 hari lalu",
    status: "normal",
    file: { name: "Daur_Ulang_Plastik_Tangerang_Rizky.pdf", size: "5.4 MB" },
    scores: { leadership: 4, komunikasi: 3, problemSolving: 5, kreativitas: 5, kolaborasi: 4 },
    feedback: "",
  },
  {
    id: "5",
    initials: "DA",
    name: "Dimas Arya Pratama",
    projectTitle: "Aplikasi Pencatatan Kas BUMDes Serang",
    timeAgo: "dikirim 3 hari lalu",
    status: "revisi",
    file: { name: "Aplikasi_Kas_BUMDes_Dimas_v2.pdf", size: "2.9 MB" },
    scores: { leadership: 3, komunikasi: 3, problemSolving: 5, kreativitas: 4, kolaborasi: 3 },
    feedback: "Mohon perbaiki bug pada modul laporan bulanan dan tambahkan fitur export CSV.",
  },
  {
    id: "6",
    initials: "FH",
    name: "Farah Hasanah",
    projectTitle: "Literasi Keuangan 80 Santri Pesantren Cilegon",
    timeAgo: "dikirim 4 hari lalu",
    status: "normal",
    file: { name: "Literasi_Keuangan_Pesantren_Farah.pdf", size: "1.8 MB" },
    scores: { leadership: 4, komunikasi: 5, problemSolving: 4, kreativitas: 3, kolaborasi: 5 },
    feedback: "Laporan sangat rapi. Dokumentasi foto kegiatan sangat membantu penilaian.",
  },
  {
    id: "7",
    initials: "YP",
    name: "Yoga Pratama",
    projectTitle: "Pelatihan Media Sosial 6 UMKM Cilegon",
    timeAgo: "dikirim 5 hari lalu",
    status: "baru",
    file: { name: "Medsos_UMKM_Cilegon_Yoga.pdf", size: "3.6 MB" },
    scores: { leadership: 3, komunikasi: 4, problemSolving: 3, kreativitas: 5, kolaborasi: 4 },
    feedback: "",
  },
];

export const dummyStats: Stats = {
  averageHcs: 79.4,
  hcsChange: "+3.1%",
  challengesCompleted: 54,
  challengesTarget: 70,
};
