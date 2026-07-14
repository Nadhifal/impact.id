export interface ChallengeItem {
  id: string;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  points: number;
  imageUrl: string;
  timeRemaining?: string;
  urgency?: "Urgent" | "Normal";
  participantsCount?: number;
}

export const featuredChallenge: ChallengeItem = {
  id: "featured-1",
  title: "Solusi Pengelolaan Sampah Cerdas 2.0",
  description: "Bantu kota-kota besar mengoptimalkan rute logistik pembersihan sampah menggunakan algoritma AI untuk mengurangi emisi karbon.",
  category: "Lingkungan",
  subCategory: "Logistik AI",
  points: 2500,
  imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&h=450&q=80",
  urgency: "Urgent",
};

export const smartRecommendation = {
  title: "Redesign EduTech Dashboard",
  rewardPoints: 1200,
  description: "Kami melihat Anda memiliki keahlian dalam UI/UX Design dan Frontend Development. Challenge ini sangat cocok untuk Anda!",
};

export const availableChallenges: ChallengeItem[] = [
  {
    id: "1",
    title: "Pemetaan UMKM Desa Cisauk",
    description: "Lakukan pendataan menyeluruh dan pemetaan digital bagi para pelaku usaha lokal guna meningkatkan visibilitas mereka.",
    category: "Teknologi",
    subCategory: "Pemetaan",
    points: 500,
    imageUrl: "https://images.unsplash.com/photo-1596422846543-75c6fc18a523?auto=format&fit=crop&w=300&h=180&q=80",
    participantsCount: 12,
  },
  {
    id: "challenge-2",
    title: "Modul Belajar Inklusif",
    description: "Kembangkan materi pembelajaran digital yang aksesibel untuk siswa dengan kebutuhan khusus di...",
    category: "Pendidikan",
    subCategory: "Curriculum",
    points: 850,
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=300&h=180&q=80",
    participantsCount: 5,
  },
  {
    id: "challenge-3",
    title: "Transparansi Donasi Sosial",
    description: "Gunakan teknologi ledger terdistribusi untuk memastikan setiap rupiah donasi sampai ke...",
    category: "Teknologi",
    subCategory: "Blockchain",
    points: 1500,
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=300&h=180&q=80",
    participantsCount: 28,
  },
  {
    id: "challenge-4",
    title: "Urban Farming Monitor",
    description: "Rancang sistem monitoring sensor tanah untuk kebun hidroponik di area rooftop perumahan.",
    category: "Agrikultur",
    subCategory: "IoT",
    points: 600,
    imageUrl: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=300&h=180&q=80",
    participantsCount: 8,
  },
];

export const specialChallenge: ChallengeItem = {
  id: "special-1",
  title: "Optimalisasi Microgrid Desa",
  description: "Bantu komunitas pedesaan mengatur penggunaan energi terbarukan mereka secara mandiri melalui dashboard manajemen daya yang sederhana namun efektif.",
  category: "Community Choice",
  subCategory: "Energy Systems",
  points: 2000,
  imageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&h=350&q=80",
  timeRemaining: "Ends in 4 days",
};
