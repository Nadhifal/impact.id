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
    value: "184 / 210",
    sub: "+12 bulan ini",
    subIsPositive: true,
    type: "running",
  },
  {
    title: "Target Semester Ini",
    value: "72%",
    sub: "Progress keseluruhan",
    type: "target",
  },
  {
    title: "Perlu Perhatian",
    value: "14",
    sub: "Membutuhkan tindak lanjut segera",
    subIsPositive: false,
    type: "attention",
  },
  {
    title: "Anggaran Terserap",
    value: "61%",
    sub: "Rp 12.4M · Diperbarui 2 jam lalu",
    type: "budget",
  },
];

export const wilayahProgressData: WilayahProgress[] = [
  { name: "Kota Serang", percentage: 88, color: "green" },
  { name: "Kab. Serang", percentage: 64, color: "teal" },
  { name: "Kab. Pandeglang", percentage: 41, color: "gray" },
  { name: "Kab. Lebak", percentage: 23, color: "red" },
];

export const filterWilayahOptions: FilterOption[] = [
  { value: "all", label: "Semua wilayah" },
  { value: "kota-serang", label: "Kota Serang" },
  { value: "kab-serang", label: "Kab. Serang" },
  { value: "kab-pandeglang", label: "Kab. Pandeglang" },
  { value: "kab-lebak", label: "Kab. Lebak" },
];

export const filterProgramOptions: FilterOption[] = [
  { value: "all", label: "Semua program" },
  { value: "bos-afirmasi", label: "BOS Afirmasi 2024" },
  { value: "digitalisasi", label: "Digitalisasi Sekolah" },
  { value: "kurikulum-merdeka", label: "Kurikulum Merdeka Phase B" },
];

export const schoolProgramData: SchoolProgramItem[] = [
  {
    id: "1",
    schoolName: "SMPN 4 Cimarga",
    schoolId: "ID: 20204123",
    wilayah: "Kab. Lebak",
    program: "BOS Afirmasi 2024",
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
    progress: 32,
  },
  {
    id: "3",
    schoolName: "SDN 1 Rangkasbitung",
    schoolId: "ID: 20203311",
    wilayah: "Kab. Lebak",
    program: "Kurikulum Merdeka Phase B",
    status: "Sesuai Jadwal",
    progress: 85,
  },
  {
    id: "4",
    schoolName: "SMPN 3 Serang",
    schoolId: "ID: 20201045",
    wilayah: "Kota Serang",
    program: "BOS Afirmasi 2024",
    status: "Sesuai Jadwal",
    progress: 91,
  },
  {
    id: "5",
    schoolName: "SMAN 1 Pandeglang",
    schoolId: "ID: 20203760",
    wilayah: "Kab. Pandeglang",
    program: "Digitalisasi Sekolah",
    status: "Terhambat",
    progress: 18,
  },
];
