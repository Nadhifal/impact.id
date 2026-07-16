export interface FilterOption {
  value: string;
  label: string;
}

export interface RadarDimensionItem {
  subject: string;
  "KOTA SERANG": number;
  "RATA-RATA PROV": number;
}

export interface SchoolGrowthItem {
  name: string;
  score: number;
}

export interface CategoryChallengeItem {
  category: string;
  projectsCount: number;
  highlighted?: boolean;
}

export interface RegionalInsight {
  type: "KEUNGGULAN" | "REKOMENDASI";
  title: string;
  description: string;
}

export const filterDistricts: FilterOption[] = [
  { value: "all-banten",    label: "Provinsi Banten (Semua)" },
  { value: "kota-serang",   label: "Kota Serang" },
  { value: "kota-cilegon",  label: "Kota Cilegon" },
  { value: "kota-tangerang",label: "Kota Tangerang" },
  { value: "kab-serang",    label: "Kabupaten Serang" },
  { value: "kab-pandeglang",label: "Kabupaten Pandeglang" },
  { value: "kab-lebak",     label: "Kabupaten Lebak" },
];

export const filterLevels: FilterOption[] = [
  { value: "all", label: "Semua Jenjang" },
  { value: "sd",  label: "Sekolah Dasar (SD)" },
  { value: "smp", label: "Sekolah Menengah Pertama (SMP)" },
  { value: "sma", label: "Sekolah Menengah Atas (SMA)" },
  { value: "smk", label: "Sekolah Menengah Kejuruan (SMK)" },
];

export const filterSemesters: FilterOption[] = [
  { value: "ganjil-24-25", label: "Ganjil 2024/2025" },
  { value: "genap-24-25",  label: "Genap 2024/2025" },
  { value: "ganjil-25-26", label: "Ganjil 2025/2026" },
  { value: "genap-25-26",  label: "Genap 2025/2026" },
];

export const dimensionsRadarData: RadarDimensionItem[] = [
  { subject: "Kepemimpinan",      "KOTA SERANG": 81, "RATA-RATA PROV": 67 },
  { subject: "Komunikasi",        "KOTA SERANG": 88, "RATA-RATA PROV": 70 },
  { subject: "Pemecahan Masalah", "KOTA SERANG": 74, "RATA-RATA PROV": 61 },
  { subject: "Kreativitas",       "KOTA SERANG": 79, "RATA-RATA PROV": 65 },
  { subject: "Kolaborasi",        "KOTA SERANG": 91, "RATA-RATA PROV": 72 },
];

export const topSchoolsGrowth: SchoolGrowthItem[] = [
  { name: "SMAN 1 Serang",       score: 91 },
  { name: "SMKN 1 Cilegon",      score: 88 },
  { name: "SMKN 2 Tangerang",    score: 86 },
  { name: "SDN 1 Rangkasbitung", score: 81 },
  { name: "SMPN 3 Serang",       score: 77 },
];

export const categoryDistributionData: CategoryChallengeItem[] = [
  { category: "UMKM",      projectsCount: 612 },
  { category: "Lingkungan",projectsCount: 480 },
  { category: "Sosial",    projectsCount: 710, highlighted: true },
  { category: "Edukasi",   projectsCount: 394 },
  { category: "Kesehatan", projectsCount: 280 },
  { category: "Keuangan",  projectsCount: 210 },
];

export const regionalInsights: RegionalInsight[] = [
  {
    type: "KEUNGGULAN",
    title: "KEUNGGULAN",
    description: "Kota Serang unggul 19% pada dimensi Kolaborasi dibandingkan rata-rata Provinsi Banten — didukung program IMPACT Challenge yang aktif di 8 sekolah.",
  },
  {
    type: "REKOMENDASI",
    title: "REKOMENDASI",
    description: "Kab. Lebak dan Kab. Pandeglang perlu penguatan kategori Kesehatan dan Literasi Digital. Rekomendasikan kemitraan dengan Puskesmas dan pelatihan guru pengampu.",
  },
];
