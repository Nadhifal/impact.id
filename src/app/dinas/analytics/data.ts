export interface FilterOption {
  value: string;
  label: string;
}

export interface RadarDimensionItem {
  subject: string;
  "KOTA BANDUNG": number;
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
  { value: "all-jabar", label: "Provinsi Jawa Barat (Semua)" },
  { value: "kota-bandung", label: "Kota Bandung" },
  { value: "kab-bandung", label: "Kabupaten Bandung" },
  { value: "kota-bekasi", label: "Kota Bekasi" },
  { value: "kota-depok", label: "Kota Depok" },
];

export const filterLevels: FilterOption[] = [
  { value: "all", label: "Semua Jenjang" },
  { value: "sd", label: "Sekolah Dasar (SD)" },
  { value: "smp", label: "Sekolah Menengah Pertama (SMP)" },
  { value: "sma", label: "Sekolah Menengah Atas (SMA)" },
  { value: "smk", label: "Sekolah Menengah Kejuruan (SMK)" },
];

export const filterSemesters: FilterOption[] = [
  { value: "ganjil-23-24", label: "Ganjil 2023/2024" },
  { value: "genap-23-24", label: "Genap 2023/2024" },
  { value: "ganjil-24-25", label: "Ganjil 2024/2025" },
];

export const dimensionsRadarData: RadarDimensionItem[] = [
  { subject: "Kepemimpinan", "KOTA BANDUNG": 78, "RATA-RATA PROV": 64 },
  { subject: "Komunikasi", "KOTA BANDUNG": 82, "RATA-RATA PROV": 71 },
  { subject: "Pemecahan Masalah", "KOTA BANDUNG": 70, "RATA-RATA PROV": 60 },
  { subject: "Kreativitas", "KOTA BANDUNG": 75, "RATA-RATA PROV": 66 },
  { subject: "Kolaborasi", "KOTA BANDUNG": 88, "RATA-RATA PROV": 73 }, // high gap
];

export const topSchoolsGrowth: SchoolGrowthItem[] = [
  { name: "SMAN 3 Bandung", score: 88 },
  { name: "SMAN 5 Bandung", score: 86 },
  { name: "SMAS Taruna Bakti", score: 84 },
  { name: "SMKN 1 Bandung", score: 82 },
  { name: "SMA Aloysius", score: 80 },
];

export const categoryDistributionData: CategoryChallengeItem[] = [
  { category: "UMKM", projectsCount: 420 },
  { category: "Lingkungan", projectsCount: 320 },
  { category: "Sosial", projectsCount: 480, highlighted: true }, // Highest
  { category: "Edukasi", projectsCount: 280 },
  { category: "Kesehatan", projectsCount: 200 },
];

export const regionalInsights: RegionalInsight[] = [
  {
    type: "KEUNGGULAN",
    title: "KEUNGGULAN",
    description: "Wilayah ini unggul 15% pada dimensi Kolaborasi dibandingkan rata-rata nasional.",
  },
  {
    type: "REKOMENDASI",
    title: "REKOMENDASI",
    description: "Perlu penguatan pada kategori Kesehatan melalui kemitraan dengan Puskesmas setempat.",
  },
];
