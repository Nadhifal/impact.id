export interface KPICardData {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  target?: string;
  type: "school" | "student" | "challenge" | "score";
}

export interface TrendItem {
  name: string;
  score: number;
}

export interface NationalImpactSummary {
  province: string;
  score: number;
}

export interface SchoolMonitorItem {
  id: string;
  name: string;
  district: string;
  activeStudents: number;
  completedChallenges: number;
  sdmScore: number;
  status: "SESUAI TARGET" | "PERLU PERHATIAN" | "DI BAWAH TARGET";
  type: "SMA" | "SMP" | "SD";
}

export const kpiData: KPICardData[] = [
  {
    title: "Sekolah Terdaftar",
    value: 184,
    change: "+12%",
    isPositive: true,
    type: "school",
  },
  {
    title: "Siswa Aktif",
    value: "12,480",
    change: "+3.2%",
    isPositive: true,
    type: "student",
  },
  {
    title: "Tantangan Selesai",
    value: "6,732",
    change: "+8.1%",
    isPositive: true,
    type: "challenge",
  },
  {
    title: "Rata-rata Skor SDM",
    value: 73.2,
    change: "Target: 75.0",
    isPositive: false,
    type: "score",
  },
];

export const monthlyTrendData: TrendItem[] = [
  { name: "Nov", score: 62.1 },
  { name: "Des", score: 64.5 },
  { name: "Jan", score: 63.2 },
  { name: "Feb", score: 68.9 },
  { name: "Mar", score: 71.2 },
  { name: "Apr", score: 73.2 }, // Highlights
];

export const quarterlyTrendData: TrendItem[] = [
  { name: "Q1 2025", score: 65.4 },
  { name: "Q2 2025", score: 67.8 },
  { name: "Q3 2025", score: 70.5 },
  { name: "Q4 2025", score: 73.2 }, // Highlights
];

export const nationalImpactSummary: NationalImpactSummary[] = [
  { province: "Jawa Barat", score: 82.4 },
  { province: "Jawa Timur", score: 79.1 },
  { province: "Sumatera Utara", score: 71.5 },
];

export const schoolMonitoringData: SchoolMonitorItem[] = [
  {
    id: "1",
    name: "SMA Negeri 1 Jakarta",
    district: "Jakarta Pusat",
    activeStudents: 1240,
    completedChallenges: 842,
    sdmScore: 85.4,
    status: "SESUAI TARGET",
    type: "SMA",
  },
  {
    id: "2",
    name: "SMP Global Prestasi",
    district: "Bekasi",
    activeStudents: 860,
    completedChallenges: 412,
    sdmScore: 71.2,
    status: "PERLU PERHATIAN",
    type: "SMP",
  },
  {
    id: "3",
    name: "SD Al-Azhar 1",
    district: "Jakarta Selatan",
    activeStudents: 1120,
    completedChallenges: 210,
    sdmScore: 58.9,
    status: "DI BAWAH TARGET",
    type: "SD",
  },
  {
    id: "4",
    name: "SMA Taruna Nusantara",
    district: "Magelang",
    activeStudents: 1450,
    completedChallenges: 1120,
    sdmScore: 92.8,
    status: "SESUAI TARGET",
    type: "SMA",
  },
];
