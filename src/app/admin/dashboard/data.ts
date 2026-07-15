export interface AdminKPIData {
  title: string;
  value: string;
  badgeText: string;
  badgeType: "success" | "warning" | "danger";
  label: string;
  type: "users" | "challenges" | "certificates" | "reports";
}

export interface RoleGrowth {
  name: string;
  count: number;
}

export interface ActionItem {
  id: string;
  text: string;
  type: "review" | "report" | "audit";
}

export interface ActivityLog {
  id: string;
  adminName: string;
  adminLetter: string;
  activity: string;
  time: string;
}

export const adminKpis: AdminKPIData[] = [
  {
    title: "TOTAL USER",
    value: "18.204",
    badgeText: "+312 minggu ini",
    badgeType: "success",
    label: "Siswa, Guru & Sekolah",
    type: "users",
  },
  {
    title: "CHALLENGE AKTIF",
    value: "112",
    badgeText: "9 menunggu review",
    badgeType: "warning",
    label: "Sedang berjalan",
    type: "challenges",
  },
  {
    title: "SERTIFIKAT TERBIT",
    value: "4.821",
    badgeText: "3 menunggu audit",
    badgeType: "success",
    label: "Total terverifikasi",
    type: "certificates",
  },
  {
    title: "LAPORAN MASUK",
    value: "5",
    badgeText: "Perlu tindakan",
    badgeType: "danger",
    label: "Aduan dari pengguna",
    type: "reports",
  },
];

export const userGrowthData: RoleGrowth[] = [
  { name: "Siswa", count: 15204 },
  { name: "Guru", count: 2100 },
  { name: "Sekolah", count: 850 },
  { name: "Admin", count: 50 },
];

export const actionRequiredItems: ActionItem[] = [
  { id: "act-1", text: "9 challenge menunggu review", type: "review" },
  { id: "act-2", text: "5 laporan konten dari user", type: "report" },
  { id: "act-3", text: "3 sertifikat menunggu audit", type: "audit" },
];

export const activityLogsData: ActivityLog[] = [
  {
    id: "log-1",
    adminName: "Admin Rani",
    adminLetter: "R",
    activity: "Menerbitkan sertifikat untuk 12 siswa",
    time: "Baru saja",
  },
  {
    id: "log-2",
    adminName: "Admin Dimas",
    adminLetter: "D",
    activity: "Menambahkan challenge baru: Literasi digital lansia",
    time: "15 menit yang lalu",
  },
  {
    id: "log-3",
    adminName: "Admin Siti",
    adminLetter: "S",
    activity: "Mengaudit 5 laporan sekolah di Jawa Barat",
    time: "1 jam yang lalu",
  },
  {
    id: "log-4",
    adminName: "Admin Budi",
    adminLetter: "B",
    activity: "Menghapus komentar melanggar pada Challenge Lingkungan",
    time: "3 jam yang lalu",
  },
];
