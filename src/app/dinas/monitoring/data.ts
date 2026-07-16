// ─── Types ───────────────────────────────────────────────────────────────────

export interface MonitoringKPIItem {
  title: string;
  value: string;
  sub: string;
  subIsPositive?: boolean;
  type: "running" | "target" | "attention" | "budget";
}

export interface WilayahProgress {
  name: string;
  percentage: number;
  color: "green" | "teal" | "gray" | "red";
}

export type SchoolProgramStatus =
  | "Belum Mulai"
  | "Terhambat"
  | "Sesuai Jadwal";

export interface SchoolProgramItem {
  id: string;
  schoolName: string;
  schoolId: string;
  wilayah: string;
  program: string;
  status: SchoolProgramStatus;
  progress: number;
}

export interface FilterOption {
  value: string;
  label: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

export const monitoringKPIData: MonitoringKPIItem[] = [
  {
    title: "Program Berjalan",
    value: "210 / 247",
    sub: "+21 bulan ini",
    subIsPositive: true,
    type: "running",
  },
  {
    title: "Target Semester Ini",
    value: "78%",
    sub: "Progress keseluruhan wilayah Banten",
    type: "target",
  },
  {
    title: "Perlu Perhatian",
    value: "19",
    sub: "Membutuhkan tindak lanjut segera",
    subIsPositive: false,
    type: "attention",
  },
  {
    title: "Anggaran Terserap",
    value: "68%",
    sub: "Rp 18.7M · Diperbarui 1 jam lalu",
    type: "budget",
  },
];

export const wilayahProgressData: WilayahProgress[] = [
  { name: "Kota Serang",     percentage: 91, color: "green" },
  { name: "Kota Cilegon",   percentage: 84, color: "green" },
  { name: "Kota Tangerang",  percentage: 76, color: "teal" },
  { name: "Kab. Serang",    percentage: 62, color: "teal" },
  { name: "Kab. Pandeglang",percentage: 39, color: "gray" },
  { name: "Kab. Lebak",     percentage: 21, color: "red" },
];

export const filterWilayahOptions: FilterOption[] = [
  { value: "all",           label: "Semua wilayah Banten" },
  { value: "kota-serang",   label: "Kota Serang" },
  { value: "kota-cilegon",  label: "Kota Cilegon" },
  { value: "kota-tangerang",label: "Kota Tangerang" },
  { value: "kab-serang",    label: "Kab. Serang" },
  { value: "kab-pandeglang",label: "Kab. Pandeglang" },
  { value: "kab-lebak",     label: "Kab. Lebak" },
];

export const filterProgramOptions: FilterOption[] = [
  { value: "all",                label: "Semua program" },
  { value: "bos-afirmasi",       label: "BOS Afirmasi 2026" },
  { value: "digitalisasi",       label: "Digitalisasi Sekolah" },
  { value: "kurikulum-merdeka",  label: "Kurikulum Merdeka Phase C" },
  { value: "impact-challenge",   label: "IMPACT Challenge Semester" },
];

export const schoolProgramData: SchoolProgramItem[] = [
  {
    id: "1",
    schoolName: "SMPN 4 Cimarga",
    schoolId: "ID: 20204123",
    wilayah: "Kab. Lebak",
    program: "BOS Afirmasi 2026",
    status: "Belum Mulai",
    progress: 0,
  },
  {
    id: "2",
    schoolName: "SMAN 2 Cibaliung",
    schoolId: "ID: 20204882",
    wilayah: "Kab. Pandeglang",
    program: "Digitalisasi Sekolah",
    status: "Terhambat",
    progress: 28,
  },
  {
    id: "3",
    schoolName: "SDN 1 Rangkasbitung",
    schoolId: "ID: 20203311",
    wilayah: "Kab. Lebak",
    program: "Kurikulum Merdeka Phase C",
    status: "Sesuai Jadwal",
    progress: 88,
  },
  {
    id: "4",
    schoolName: "SMPN 3 Serang",
    schoolId: "ID: 20201045",
    wilayah: "Kota Serang",
    program: "BOS Afirmasi 2026",
    status: "Sesuai Jadwal",
    progress: 94,
  },
  {
    id: "5",
    schoolName: "SMAN 1 Pandeglang",
    schoolId: "ID: 20203760",
    wilayah: "Kab. Pandeglang",
    program: "Digitalisasi Sekolah",
    status: "Terhambat",
    progress: 22,
  },
  {
    id: "6",
    schoolName: "SMKN 1 Cilegon",
    schoolId: "ID: 20205012",
    wilayah: "Kota Cilegon",
    program: "IMPACT Challenge Semester",
    status: "Sesuai Jadwal",
    progress: 82,
  },
  {
    id: "7",
    schoolName: "SMAN 1 Serang",
    schoolId: "ID: 20200188",
    wilayah: "Kota Serang",
    program: "IMPACT Challenge Semester",
    status: "Sesuai Jadwal",
    progress: 96,
  },
  {
    id: "8",
    schoolName: "SMPN 2 Malingping",
    schoolId: "ID: 20204556",
    wilayah: "Kab. Lebak",
    program: "Kurikulum Merdeka Phase C",
    status: "Belum Mulai",
    progress: 4,
  },
];
