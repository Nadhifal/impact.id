export interface Submission {
  id: string;
  initials: string;
  name: string;
  projectTitle: string;
  timeAgo: string;
  status: "baru" | "revisi" | "normal";
  file: {
    name: string;
    size: string;
  };
  scores: {
    leadership: number;
    komunikasi: number;
    problemSolving: number;
    kreativitas: number;
    kolaborasi: number;
  };
  feedback: string;
}

export interface Stats {
  averageHcs: number;
  hcsChange: string;
  challengesCompleted: number;
  challengesTarget: number;
}

export const dummySubmissions: Submission[] = [
  {
    id: "1",
    initials: "AF",
    name: "Ariq Fadillah",
    projectTitle: "UMKM pemasaran digital",
    timeAgo: "dikirim 2 jam lalu",
    status: "baru",
    file: {
      name: "Laporan_Final_Project.pdf",
      size: "2.4 MB",
    },
    scores: {
      leadership: 4,
      komunikasi: 5,
      problemSolving: 4,
      kreativitas: 3,
      kolaborasi: 4,
    },
    feedback: "",
  },
  {
    id: "2",
    initials: "NA",
    name: "Nadhif Alfasya",
    projectTitle: "Observasi sampah rumah tangga",
    timeAgo: "1 hari lalu",
    status: "normal",
    file: {
      name: "Observasi_Sampah_Final.pdf",
      size: "3.1 MB",
    },
    scores: {
      leadership: 3,
      komunikasi: 4,
      problemSolving: 5,
      kreativitas: 4,
      kolaborasi: 3,
    },
    feedback: "Analisis sampah cukup komprehensif, namun tolong tambahkan data grafik di lampiran.",
  },
  {
    id: "3",
    initials: "SP",
    name: "Siti Putri",
    projectTitle: "Revisi analisis wawancara",
    timeAgo: "2 hari lalu",
    status: "revisi",
    file: {
      name: "Wawancara_Revisi_V2.pdf",
      size: "1.8 MB",
    },
    scores: {
      leadership: 4,
      komunikasi: 3,
      problemSolving: 3,
      kreativitas: 5,
      kolaborasi: 4,
    },
    feedback: "",
  },
  {
    id: "4",
    initials: "BS",
    name: "Beni Setiawan",
    projectTitle: "Sistem IoT penyiram tanaman otomatis",
    timeAgo: "3 hari lalu",
    status: "normal",
    file: {
      name: "Proposal_IoT_Beni.pdf",
      size: "4.2 MB",
    },
    scores: {
      leadership: 4,
      komunikasi: 4,
      problemSolving: 4,
      kreativitas: 4,
      kolaborasi: 4,
    },
    feedback: "",
  },
  {
    id: "5",
    initials: "CC",
    name: "Clara Clarissa",
    projectTitle: "Redesign Aplikasi Sekolah Kita",
    timeAgo: "4 hari lalu",
    status: "normal",
    file: {
      name: "UIUX_Redesign_Clara.pdf",
      size: "5.5 MB",
    },
    scores: {
      leadership: 5,
      komunikasi: 4,
      problemSolving: 3,
      kreativitas: 5,
      kolaborasi: 3,
    },
    feedback: "Desain visual luar biasa, sangat premium.",
  },
  {
    id: "6",
    initials: "DR",
    name: "Dewa Ruci",
    projectTitle: "Analisis Algoritma Pathfinding",
    timeAgo: "5 hari lalu",
    status: "revisi",
    file: {
      name: "Pathfinding_A_Star_Dewa.pdf",
      size: "2.9 MB",
    },
    scores: {
      leadership: 3,
      komunikasi: 3,
      problemSolving: 5,
      kreativitas: 4,
      kolaborasi: 3,
    },
    feedback: "Silakan perbaiki kompleksitas ruang pada implementasi DFS.",
  },
];

export const dummyStats: Stats = {
  averageHcs: 77.1,
  hcsChange: "+2.4%",
  challengesCompleted: 42,
  challengesTarget: 60,
};
