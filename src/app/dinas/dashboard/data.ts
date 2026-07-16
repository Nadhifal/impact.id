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
  type: "SMA" | "SMP" | "SD" | "SMK";
}

export const kpiData: KPICardData[] = [
  {
    title: "Sekolah Terdaftar",
    value: 247,
    change: "+18%",
    isPositive: true,
    type: "school",
  },
  {
    title: "Siswa Aktif",
    value: "18.430",
    change: "+5.7%",
    isPositive: true,
    type: "student",
  },
  {
    title: "Tantangan Selesai",
    value: "9.124",
    change: "+11.4%",
    isPositive: true,
    type: "challenge",
  },
  {
    title: "Rata-rata Skor SDM",
    value: 76.8,
    change: "Target: 80.0",
    isPositive: false,
    type: "score",
  },
];

export const monthlyTrendData: TrendItem[] = [
  { name: "Nov", score: 65.2 },
  { name: "Des", score: 67.8 },
  { name: "Jan", score: 66.4 },
  { name: "Feb", score: 70.1 },
  { name: "Mar", score: 73.5 },
  { name: "Apr", score: 76.8 },
];

export const quarterlyTrendData: TrendItem[] = [
  { name: "Q1 2025", score: 68.1 },
  { name: "Q2 2025", score: 71.4 },
  { name: "Q3 2025", score: 74.0 },
  { name: "Q4 2025", score: 76.8 },
];

export const nationalImpactSummary: NationalImpactSummary[] = [
  { province: "Jawa Barat",    score: 82.4 },
  { province: "DKI Jakarta",   score: 85.1 },
  { province: "Jawa Timur",    score: 79.1 },
  { province: "Banten",        score: 76.8 },
];

export const schoolMonitoringData: SchoolMonitorItem[] = [
  {
    id: "1",
    name: "SMAN 1 Serang",
    district: "Kota Serang",
    activeStudents: 1240,
    completedChallenges: 942,
    sdmScore: 88.2,
    status: "SESUAI TARGET",
    type: "SMA",
  },
  {
    id: "2",
    name: "SMKN 1 Cilegon",
    district: "Kota Cilegon",
    activeStudents: 980,
    completedChallenges: 712,
    sdmScore: 82.4,
    status: "SESUAI TARGET",
    type: "SMK",
  },
  {
    id: "3",
    name: "SMPN 3 Serang",
    district: "Kota Serang",
    activeStudents: 860,
    completedChallenges: 521,
    sdmScore: 74.1,
    status: "PERLU PERHATIAN",
    type: "SMP",
  },
  {
    id: "4",
    name: "SMAN 2 Cibaliung",
    district: "Kab. Pandeglang",
    activeStudents: 620,
    completedChallenges: 210,
    sdmScore: 61.5,
    status: "DI BAWAH TARGET",
    type: "SMA",
  },
  {
    id: "5",
    name: "SMPN 4 Cimarga",
    district: "Kab. Lebak",
    activeStudents: 540,
    completedChallenges: 98,
    sdmScore: 54.2,
    status: "DI BAWAH TARGET",
    type: "SMP",
  },
  {
    id: "6",
    name: "SDN 1 Rangkasbitung",
    district: "Kab. Lebak",
    activeStudents: 760,
    completedChallenges: 445,
    sdmScore: 78.9,
    status: "SESUAI TARGET",
    type: "SD",
  },
  {
    id: "7",
    name: "SMKN 2 Tangerang",
    district: "Kota Tangerang",
    activeStudents: 1120,
    completedChallenges: 820,
    sdmScore: 83.7,
    status: "SESUAI TARGET",
    type: "SMK",
  },
];
