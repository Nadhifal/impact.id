export interface ChallengeDetailData {
  id: string;
  title: string;
  category: string;
  subCategory: string;
  location: string;
  duration: string;
  points: number;
  targetCount: string;
  imageUrl: string;
  description: string;
  quote: string;
  checkpoints: {
    id: string;
    text: string;
    completed: boolean;
  }[];
  expectedImpact: {
    title: string;
    description: string;
    iconName: "visibility" | "accuracy";
  }[];
}

export interface GuideTask {
  number: number;
  title: string;
  status: "SELESAI" | "AKTIF" | "TERKUNCI";
  description?: string;
  tips?: string;
  actionText?: string;
}

export interface ResourceFile {
  title: string;
  type: "pdf" | "link";
  url: string;
}

export interface ChatMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
  avatarUrl?: string;
  initials?: string;
}

export const challengeDetail: ChallengeDetailData = {
  id: "1",
  title: "Pemetaan UMKM Desa Cisauk",
  category: "EKONOMI DESA",
  subCategory: "Pemetaan & UMKM",
  location: "Tangerang, ID",
  duration: "14 Hari",
  points: 500,
  targetCount: "50 UMKM",
  imageUrl: "https://images.unsplash.com/photo-1596422846543-75c6fc18a523?auto=format&fit=crop&w=1200&h=400&q=80",
  description: "Desa Cisauk memiliki potensi ekonomi yang besar melalui sektor UMKM. Challenge ini bertujuan untuk melakukan pendataan menyeluruh dan pemetaan digital bagi para pelaku usaha lokal guna meningkatkan visibilitas mereka di pasar digital serta memudahkan penyaluran bantuan pemerintah daerah secara tepat sasaran.",
  quote: "Kolaborasi antara teknologi dan kearifan lokal adalah kunci pertumbuhan ekonomi berkelanjutan di era digital.",
  checkpoints: [
    { id: "1", text: "Validasi 50 titik lokasi UMKM", completed: true },
    { id: "2", text: "Wawancara kebutuhan digitalisasi", completed: false },
    { id: "3", text: "Pengunggahan foto produk & profil UMKM", completed: false },
  ],
  expectedImpact: [
    {
      title: "Visibilitas Digital",
      description: "Meningkatkan kehadiran UMKM di Google Maps dan platform direktori lokal.",
      iconName: "visibility"
    },
    {
      title: "Akurasi Data",
      description: "Data valid untuk kebutuhan perencanaan program subsidi desa mendatang.",
      iconName: "accuracy"
    }
  ]
};

export const guideTasks: GuideTask[] = [
  {
    number: 1,
    title: "Persiapan & Perizinan",
    status: "SELESAI"
  },
  {
    number: 2,
    title: "Wawancara Pemilik UMKM",
    status: "AKTIF",
    description: "Lakukan observasi langsung dan wawancara mendalam dengan pemilik usaha terkait rantai pasok untuk memahami tantangan operasional harian.",
    tips: "Fokus pada kendala pengadaan bahan baku utama. Tanyakan bagaimana mereka menangani fluktuasi harga.",
    actionText: "Mulai Wawancara"
  },
  {
    number: 3,
    title: "Analisis & Kategorisasi",
    status: "TERKUNCI"
  },
  {
    number: 4,
    title: "Penyusunan Laporan Akhir",
    status: "TERKUNCI"
  }
];

export const resourceFiles: ResourceFile[] = [
  { title: "Template Wawancara.pdf", type: "pdf", url: "#" },
  { title: "Panduan Etika Lapangan", type: "link", url: "#" },
  { title: "Daftar Istilah UMKM", type: "link", url: "#" }
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: "m1",
    sender: "ai",
    text: "Halo! Saya siap membantu Anda mempersiapkan diri untuk wawancara UMKM. Apa posisi yang sedang Anda lamar?",
    timestamp: "09:41 AM"
  },
  {
    id: "m2",
    sender: "user",
    text: "Saya melamar sebagai Staf Operasional di sebuah bisnis kopi lokal. Apa saja pertanyaan yang biasanya muncul?",
    timestamp: "09:42 AM",
    initials: "JD"
  },
  {
    id: "m3",
    sender: "ai",
    text: "Untuk operasional UMKM Kopi, biasanya pertanyaan fokus pada efisiensi dan keandalan:\n\n- Bagaimana Anda mengatur stok bahan baku agar tidak terbuang (waste)?\n- Jika ada supplier yang telat mengirim barang, apa langkah darurat yang Anda ambil?\n\nApakah Anda ingin mencoba mensimulasikan jawaban untuk salah satu pertanyaan di atas?",
    timestamp: "09:43 AM"
  }
];
