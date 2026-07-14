export interface Question {
  id: number;
  text: string;
  category: "SI" | "LD" | "IN" | "RL"; // SI: Social Impact, LD: Leadership, IN: Innovation, RL: Reliability
  options: string[];
}

export const assessmentQuestions: Question[] = [
  {
    id: 1,
    text: "Seberapa nyaman kamu memimpin sebuah kelompok?",
    category: "LD",
    options: [
      "Sangat nyaman, saya sering berinisiatif",
      "Cukup nyaman jika diperlukan",
      "Biasa saja, lebih suka menjadi kontributor",
      "Masih dalam tahap belajar memimpin",
    ],
  },
  {
    id: 2,
    text: "Bagaimana cara kamu menyelesaikan konflik dalam tim?",
    category: "LD",
    options: [
      "Mengajak diskusi terbuka mencari win-win solution",
      "Mendengarkan semua pihak lalu mengambil keputusan tengah",
      "Meminta bantuan pihak ketiga untuk memediasi",
      "Menghindari konflik dan berharap masalah selesai sendiri",
    ],
  },
  {
    id: 3,
    text: "Seberapa sering kamu menggunakan data dalam mengambil keputusan?",
    category: "IN",
    options: [
      "Selalu, saya tidak membuat keputusan tanpa data kuantitatif",
      "Sering, dikombinasikan dengan intuisi dan pengalaman",
      "Kadang-kadang, hanya untuk keputusan yang sangat besar",
      "Jarang, saya lebih mempercayai intuisi pribadi",
    ],
  },
  {
    id: 4,
    text: "Apa reaksi pertamamu saat menghadapi kegagalan proyek?",
    category: "RL",
    options: [
      "Menganalisis penyebab kegagalan untuk belajar",
      "Mencari solusi alternatif secepat mungkin",
      "Merasa kecewa namun segera bangkit kembali",
      "Menyalahkan keadaan atau pihak lain yang kurang mendukung",
    ],
  },
  {
    id: 5,
    text: "Bagaimana kamu memprioritaskan tugas-tugas yang menumpuk?",
    category: "RL",
    options: [
      "Menggunakan matriks Eisenhower (Penting vs Mendesak)",
      "Mengerjakan yang paling cepat selesai terlebih dahulu",
      "Mengerjakan sesuai urutan deadline terdekat",
      "Mengerjakan secara acak sesuai mood saat itu",
    ],
  },
  {
    id: 6,
    text: "Seberapa siap kamu mengadopsi teknologi baru dalam pekerjaan?",
    category: "IN",
    options: [
      "Sangat siap, saya selalu mencari alat bantu digital terbaru",
      "Siap, jika teknologi tersebut terbukti meningkatkan efisiensi",
      "Cukup siap, namun butuh waktu pelatihan yang cukup lama",
      "Kurang siap, saya lebih nyaman dengan metode konvensional",
    ],
  },
  {
    id: 7,
    text: "Apa peran yang paling sering kamu ambil dalam diskusi kelompok?",
    category: "LD",
    options: [
      "Penggagas ide-ide baru dan strategi utama",
      "Penyusun rencana aksi praktis dan pembagi tugas",
      "Pendengar yang baik dan penyaring ide-ide terbaik",
      "Pelaksana tugas tanpa banyak terlibat dalam perdebatan",
    ],
  },
  {
    id: 8,
    text: "Bagaimana caramu menyampaikan umpan balik kritis ke rekan tim?",
    category: "LD",
    options: [
      "Menyampaikan langsung secara konstruktif beserta solusinya",
      "Menggunakan metode sandwich (pujian-kritik-pujian)",
      "Menyampaikan secara santai di luar jam kerja agar tidak kaku",
      "Memilih untuk diam agar tidak merusak hubungan kerja",
    ],
  },
  {
    id: 9,
    text: "Seberapa penting dampak sosial dari pekerjaan yang kamu lakukan?",
    category: "SI",
    options: [
      "Sangat penting, itu adalah motivasi utama saya bekerja",
      "Cukup penting, asalkan kompensasi finansial tetap terpenuhi",
      "Biasa saja, dampak sosial adalah bonus sekunder bagi saya",
      "Tidak penting, fokus utama saya adalah efisiensi operasional",
    ],
  },
  {
    id: 10,
    text: "Bagaimana kamu mengelola tingkat stres saat beban kerja meningkat?",
    category: "RL",
    options: [
      "Melakukan teknik relaksasi atau olahraga secara rutin",
      "Membuat daftar tugas terperinci dan mendelegasikannya",
      "Tetap bekerja ekstra keras hingga tugas selesai tanpa istirahat",
      "Mudah cemas dan kesulitan fokus pada pekerjaan",
    ],
  },
  {
    id: 11,
    text: "Bagaimana pandanganmu tentang kerja sama lintas disiplin ilmu?",
    category: "SI",
    options: [
      "Sangat krusial untuk menghasilkan inovasi yang komprehensif",
      "Bagus, membantu memperluas sudut pandang dalam memecahkan masalah",
      "Terkadang menyulitkan karena perbedaan istilah dan metode kerja",
      "Lebih efektif bekerja dalam lingkup disiplin ilmu yang sama",
    ],
  },
  {
    id: 12,
    text: "Seberapa konsisten kamu menyelesaikan proyek yang telah kamu mulai?",
    category: "RL",
    options: [
      "Selalu menyelesaikan tepat waktu dengan kualitas terbaik",
      "Menyelesaikan sebagian besar proyek meskipun kadang terlambat",
      "Sering kehilangan minat di tengah jalan jika tantangan terlalu sulit",
      "Jarang menyelesaikan proyek karena berpindah ke ide baru",
    ],
  },
  {
    id: 13,
    text: "Bagaimana cara kamu memotivasi anggota tim yang kinerjanya menurun?",
    category: "LD",
    options: [
      "Mengajak bicara pribadi untuk memahami hambatan mereka",
      "Memberikan apresiasi atas kontribusi kecil mereka sebelumnya",
      "Menetapkan target baru yang lebih realistis dan menantang",
      "Menegur secara tegas agar mereka segera memperbaiki kinerjanya",
    ],
  },
  {
    id: 14,
    text: "Apa fokus utamamu saat merancang solusi untuk sebuah masalah?",
    category: "IN",
    options: [
      "Kemudahan implementasi dan skalabilitas solusi jangka panjang",
      "Keunikan dan kreativitas dari ide yang ditawarkan",
      "Kebutuhan mendesak pengguna saat ini juga",
      "Biaya minimal yang diperlukan untuk mewujudkan solusi",
    ],
  },
  {
    id: 15,
    text: "Seberapa sering kamu mencari feedback setelah menyelesaikan tugas?",
    category: "RL",
    options: [
      "Selalu meminta evaluasi untuk perbaikan diri berkelanjutan",
      "Sering meminta feedback dari mentor atau rekan kerja senior",
      "Hanya meminta feedback jika merasa hasil kerja kurang maksimal",
      "Jarang meminta feedback karena yakin dengan hasil kerja sendiri",
    ],
  },
  {
    id: 16,
    text: "Bagaimana caramu mengalokasikan waktu belajar mandiri di luar kelas?",
    category: "RL",
    options: [
      "Memiliki jadwal belajar mandiri harian yang terstruktur",
      "Belajar secara berkala jika menemukan topik yang menarik",
      "Hanya belajar jika ada tugas, ujian, atau tuntutan proyek",
      "Hampir tidak pernah belajar mandiri karena keterbatasan waktu",
    ],
  },
  {
    id: 17,
    text: "Bagaimana kamu merespon perubahan strategi mendadak dari atasan?",
    category: "RL",
    options: [
      "Segera menyesuaikan rencana kerja dengan sikap adaptif",
      "Mencoba memahami alasan perubahan sebelum mengambil tindakan",
      "Merasa frustrasi namun tetap mengikuti arahan baru secara pasif",
      "Menolak perubahan dan tetap menjalankan rencana awal",
    ],
  },
  {
    id: 18,
    text: "Seberapa percaya diri kamu mempresentasikan ide di depan umum?",
    category: "IN",
    options: [
      "Sangat percaya diri, saya menikmati berbicara di depan audiens",
      "Cukup percaya diri, asalkan persiapan materi sudah matang",
      "Gugup, namun tetap bisa menyampaikan poin-poin utama dengan baik",
      "Sangat cemas dan berusaha menghindari presentasi publik",
    ],
  },
  {
    id: 19,
    text: "Bagaimana kamu menilai kemampuan riset dan analisismu?",
    category: "IN",
    options: [
      "Sangat kuat, saya terbiasa menyaring informasi dari berbagai sumber",
      "Cukup baik, mampu menyusun laporan riset sederhana secara mandiri",
      "Biasa saja, membutuhkan bimbingan untuk analisis yang mendalam",
      "Lemah, kesulitan membedakan data yang valid dan tidak valid",
    ],
  },
  {
    id: 20,
    text: "Apa yang kamu lakukan ketika melihat rekan tim melakukan kesalahan?",
    category: "LD",
    options: [
      "Membantu memperbaikinya secara langsung tanpa menghakimi",
      "Membicarakannya secara privat agar dia menyadari kesalahannya",
      "Melaporkannya langsung kepada ketua tim untuk ditindaklanjuti",
      "Membiarkannya saja karena bukan tanggung jawab pribadi saya",
    ],
  },
  {
    id: 21,
    text: "Bagaimana caramu menjaga keberlanjutan sebuah proyek sosial?",
    category: "SI",
    options: [
      "Membangun sistem kemitraan dengan komunitas lokal dan sponsor",
      "Melatih kader-kader baru yang akan meneruskan tongkat estafet",
      "Mengandalkan donasi berkala dari pihak eksternal secara pasif",
      "Fokus pada dampak instan tanpa memikirkan keberlanjutan",
    ],
  },
  {
    id: 22,
    text: "Seberapa sering kamu merefleksikan nilai-nilai pribadimu dalam bekerja?",
    category: "SI",
    options: [
      "Setiap saat, integritas pribadi adalah hal yang tidak bisa ditawar",
      "Sering, berusaha menyelaraskan nilai pribadi dengan target tim",
      "Kadang-kadang, jika situasi memungkinkan untuk idealis",
      "Jarang, pekerjaan adalah urusan profesional yang terpisah dari nilai pribadi",
    ],
  },
  {
    id: 23,
    text: "Bagaimana kamu mendefinisikan kesuksesan sebuah kolaborasi?",
    category: "SI",
    options: [
      "Tercapainya target bersama disertai pertumbuhan kapasitas tiap anggota",
      "Selesainya tugas tepat waktu sesuai spesifikasi proyek",
      "Minimnya konflik yang terjadi selama proses kolaborasi",
      "Pengakuan atau apresiasi positif yang diterima dari pihak luar",
    ],
  },
  {
    id: 24,
    text: "Bagaimana caramu mengidentifikasi peluang baru di lingkungan sekitar?",
    category: "IN",
    options: [
      "Sensitif terhadap masalah sosial dan memikirkannya sebagai solusi bisnis",
      "Aktif berdiskusi dan membaca tren perkembangan terkini",
      "Menunggu adanya instruksi atau ide yang datang dari pihak lain",
      "Lebih suka fokus pada tugas rutin yang sudah ada tanpa mencari peluang baru",
    ],
  },
  {
    id: 25,
    text: "Apa komitmen terbesarmu dalam mengembangkan kapasitas kepemimpinan?",
    category: "LD",
    options: [
      "Mengikuti program pelatihan kepemimpinan secara aktif",
      "Mengambil tanggung jawab baru di organisasi atau kepanitiaan",
      "Belajar dari buku-buku biografi tokoh pemimpin dunia",
      "Belum memiliki komitmen khusus, mengalir mengikuti alur saja",
    ],
  },
];
