export interface AdminLogItem {
  id: string;
  adminName: string;
  adminLetter: string;
  activity: string;
  highlight?: string;       // teks bold/link di dalam activity
  module: "CHALLENGE" | "USER" | "SERTIFIKAT" | "SISTEM" | "PENGATURAN";
  actionType: "sertifikat" | "challenge" | "user-ban" | "user-approve" | "pengaturan";
  timestamp: string;        // "17 Jul, 10:42"
  time: string;             // "Baru saja"
}

export const dummyLogs: AdminLogItem[] = [
  {
    id: "log-1",
    adminName: "Admin Rani",
    adminLetter: "R",
    activity: "menerbitkan sertifikat untuk",
    highlight: "12 siswa (batch UMKM pemasaran digital)",
    module: "SERTIFIKAT",
    actionType: "sertifikat",
    timestamp: "17 Jul, 10:42",
    time: "Baru saja",
  },
  {
    id: "log-2",
    adminName: "Admin Dimas",
    adminLetter: "D",
    activity: "menambahkan challenge baru:",
    highlight: "Literasi digital lansia",
    module: "CHALLENGE",
    actionType: "challenge",
    timestamp: "17 Jul, 09:15",
    time: "15 menit yang lalu",
  },
  {
    id: "log-3",
    adminName: "Admin Rani",
    adminLetter: "R",
    activity: "menonaktifkan akun",
    highlight: "Bagas Wirawan (dilaporkan pengguna lain)",
    module: "USER",
    actionType: "user-ban",
    timestamp: "17 Jul, 08:30",
    time: "1 jam yang lalu",
  },
  {
    id: "log-4",
    adminName: "Admin Dimas",
    adminLetter: "D",
    activity: "menyetujui registrasi guru",
    highlight: "Rani Puspita (SMKN 1 Serang)",
    module: "USER",
    actionType: "user-approve",
    timestamp: "16 Jul, 14:02",
    time: "Kemarin",
  },
  {
    id: "log-5",
    adminName: "Admin Rani",
    adminLetter: "R",
    activity: "mengubah teks FAQ pada halaman pengaturan",
    module: "PENGATURAN",
    actionType: "pengaturan",
    timestamp: "16 Jul, 11:20",
    time: "Kemarin",
  },
  {
    id: "log-6",
    adminName: "Admin Budi",
    adminLetter: "B",
    activity: "menghapus akun spam",
    highlight: "user-9892@gmail.com",
    module: "USER",
    actionType: "user-ban",
    timestamp: "15 Jul, 09:00",
    time: "2 hari yang lalu",
  },
];
