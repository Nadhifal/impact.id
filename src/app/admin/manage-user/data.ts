export interface UserKPI {
  title: string;
  value: string;
  label: string;
  badgeText?: string;
  badgeType?: "info" | "success" | "danger" | "neutral";
  accentColor?: string;
}

export interface UserItem {
  id: string;
  name: string;
  email: string;
  role: "Siswa" | "Guru" | "Dinas" | "Admin";
  school: string;
  status: "AKTIF" | "MENUNGGU VERIFIKASI" | "NONAKTIF";
  joinDate: string;
}

export const userKpis: UserKPI[] = [
  {
    title: "Siswa",
    value: "15.902",
    label: "Siswa terdaftar aktif",
  },
  {
    title: "Guru",
    value: "2.184",
    label: "Fasilitator & guru pembimbing",
  },
  {
    title: "Dinas",
    value: "96",
    label: "Institusi dinas daerah",
  },
  {
    title: "Menunggu verifikasi",
    value: "18",
    label: "Pendaftaran guru & sekolah baru",
    badgeText: "Urgent",
    badgeType: "danger",
    accentColor: "border-l-4 border-rose-500",
  },
];

export const dummyUsers: UserItem[] = [
  {
    id: "usr-1",
    name: "Rani Puspita",
    email: "rani.puspita@smkn1serang.sch.id",
    role: "Guru",
    school: "SMKN 1 Serang",
    status: "MENUNGGU VERIFIKASI",
    joinDate: "17 Jul 2026",
  },
  {
    id: "usr-2",
    name: "Dinas Pendidikan Kota Serang",
    email: "disdik@serangkota.go.id",
    role: "Dinas",
    school: "—",
    status: "AKTIF",
    joinDate: "10 Mei 2026",
  },
  {
    id: "usr-3",
    name: "Ariq Fadillah",
    email: "ariq.fadillah@gmail.com",
    role: "Siswa",
    school: "SMKN 1 Serang",
    status: "AKTIF",
    joinDate: "12 Jul 2026",
  },
  {
    id: "usr-4",
    name: "Bagas Wirawan",
    email: "bagas.wirawan@gmail.com",
    role: "Siswa",
    school: "SMAN 3 Kota Serang",
    status: "NONAKTIF",
    joinDate: "05 Jun 2026",
  },
  {
    id: "usr-5",
    name: "Nadhif Alfasya",
    email: "nadhif@untirta.ac.id",
    role: "Siswa",
    school: "Universitas Sultan Ageng Tirtayasa",
    status: "AKTIF",
    joinDate: "12 Jul 2026",
  },
  {
    id: "usr-6",
    name: "Sari Dewi Putri",
    email: "sari@untirta.ac.id",
    role: "Siswa",
    school: "Universitas Sultan Ageng Tirtayasa",
    status: "AKTIF",
    joinDate: "10 Jul 2026",
  },
];
