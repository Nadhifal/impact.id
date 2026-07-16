export interface MapKPIData {
  title: string;
  value: string | number;
  iconName: "clipboard" | "store" | "globe" | "barChart";
  colorClass: string;
  iconBgClass: string;
}

export interface ProvinceRank {
  name: string;
  projectsCount: number;
  percentage: number;
}

export interface MapHighlight {
  id: string;
  region: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface ProvinceDetail {
  id: string;
  name: string;
  projects: number;
  successRate: number;
  status: "High Impact" | "In Progress";
  coordX: number;
  coordY: number;
}

export const mapKpiData: MapKPIData[] = [
  {
    title: "TOTAL PROJECTS",
    value: "9.124",
    iconName: "clipboard",
    colorClass: "text-blue-600",
    iconBgClass: "bg-blue-50",
  },
  {
    title: "UMKM DIBANTU",
    value: "3.487",
    iconName: "store",
    colorClass: "text-indigo-600",
    iconBgClass: "bg-indigo-50",
  },
  {
    title: "WILAYAH AKTIF",
    value: "27",
    iconName: "globe",
    colorClass: "text-amber-600",
    iconBgClass: "bg-amber-50",
  },
  {
    title: "RATA-RATA HCS",
    value: "76.8",
    iconName: "barChart",
    colorClass: "text-emerald-600",
    iconBgClass: "bg-emerald-50",
  },
];

export const provinceRankings: ProvinceRank[] = [
  { name: "Jawa Barat",  projectsCount: 2412, percentage: 100 },
  { name: "Jawa Timur",  projectsCount: 1980, percentage:  82 },
  { name: "Banten",      projectsCount: 1245, percentage:  52 },
  { name: "DKI Jakarta", projectsCount: 980,  percentage:  41 },
  { name: "Jawa Tengah", projectsCount: 874,  percentage:  36 },
];

export const mapHighlights: MapHighlight[] = [
  {
    id: "hl-1",
    region: "BANTEN — KOTA SERANG",
    title: "Digitalisasi UMKM Lebak & Serang",
    description: "Lebih dari 200 UMKM perdesaan telah didampingi mahasiswa & siswa dalam transformasi digital: QRIS, katalog online, dan media sosial bisnis.",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&h=250&q=80",
  },
  {
    id: "hl-2",
    region: "BANTEN — KAB. PANDEGLANG",
    title: "Pemetaan Gizi Balita Pandeglang",
    description: "Relawan siswa memetakan status gizi 1.200+ balita di 18 desa terpencil — mengidentifikasi kasus stunting untuk intervensi Puskesmas.",
    imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=400&h=250&q=80",
  },
  {
    id: "hl-3",
    region: "JAWA BARAT",
    title: "Literasi Digital Sekolah Pinggiran",
    description: "120+ sekolah di pedalaman Jawa Barat kini punya laboratorium komputer berkat program hibah dan pendampingan teknis dari siswa SMK.",
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=400&h=250&q=80",
  },
];

export const provincesMapData: ProvinceDetail[] = [
  { id: "prov-1",  name: "Sumatera Utara",  projects: 421,  successRate: 71.5, status: "In Progress",  coordX: 20, coordY: 30 },
  { id: "prov-2",  name: "Sumatera Barat",  projects: 310,  successRate: 74.8, status: "In Progress",  coordX: 23, coordY: 45 },
  { id: "prov-3",  name: "Riau",             projects: 290,  successRate: 72.0, status: "In Progress",  coordX: 26, coordY: 38 },
  { id: "prov-4",  name: "DKI Jakarta",      projects: 980,  successRate: 85.0, status: "High Impact",  coordX: 43, coordY: 70 },
  { id: "prov-5",  name: "Jawa Barat",       projects: 2412, successRate: 82.4, status: "High Impact",  coordX: 47, coordY: 74 },
  { id: "prov-6",  name: "Jawa Tengah",      projects: 874,  successRate: 78.2, status: "High Impact",  coordX: 52, coordY: 76 },
  { id: "prov-7",  name: "Jawa Timur",       projects: 1980, successRate: 79.1, status: "High Impact",  coordX: 58, coordY: 78 },
  { id: "prov-8",  name: "Banten",           projects: 1245, successRate: 76.8, status: "High Impact",  coordX: 38, coordY: 72 },
  { id: "prov-9",  name: "Bali",             projects: 280,  successRate: 81.0, status: "High Impact",  coordX: 63, coordY: 80 },
  { id: "prov-10", name: "Sulawesi Selatan", projects: 380,  successRate: 73.5, status: "In Progress",  coordX: 71, coordY: 55 },
  { id: "prov-11", name: "Kalimantan Timur", projects: 220,  successRate: 75.9, status: "In Progress",  coordX: 56, coordY: 42 },
  { id: "prov-12", name: "NTB",              projects: 145,  successRate: 68.4, status: "In Progress",  coordX: 67, coordY: 80 },
];
