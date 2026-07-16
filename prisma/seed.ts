import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🗑️  Membersihkan database...');
  await prisma.verification.deleteMany({});
  await prisma.submission.deleteMany({});
  await prisma.portfolio.deleteMany({});
  await prisma.humanCapitalScore.deleteMany({});
  await prisma.assessment.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.challenge.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('🌱 Mulai seeding...\n');

  // ───────────────────────────────────────────
  // CHALLENGES
  // ───────────────────────────────────────────
  const challenges = await Promise.all([
    prisma.challenge.create({ data: { id: 'challenge-1', title: 'Peta Gizi Desa Pandeglang', description: 'Memetakan gizi balita, sanitasi, pola asuh, dan akses layanan kesehatan di daerah terpencil.', category: 'Kesehatan, Sosial', location: 'Kabupaten Pandeglang', duration: 30, points: 500, target: 'Kader Posyandu' } }),
    prisma.challenge.create({ data: { id: 'challenge-2', title: 'Digitalisasi UMKM Perdesaan Lebak', description: 'Pendampingan katalog digital, QRIS, marketplace, dan pemasaran digital untuk UMKM.', category: 'Tech, Ekonomi', location: 'Kabupaten Lebak', duration: 14, points: 450, target: '50 UMKM' } }),
    prisma.challenge.create({ data: { id: 'challenge-3', title: 'UMKM Naik Kelas Kota Serang', description: 'Pendampingan Google Business Profile dan media sosial bisnis untuk pedagang pinggiran.', category: 'Tech, Bisnis', location: 'Kota Serang', duration: 21, points: 600, target: 'UMKM Pinggiran' } }),
    prisma.challenge.create({ data: { id: 'challenge-4', title: 'Literasi Keuangan Pesantren Cilegon', description: 'Edukasi keuangan dasar, manajemen tabungan, dan investasi syariah untuk santri.', category: 'Keuangan, Pendidikan', location: 'Kota Cilegon', duration: 10, points: 350, target: 'Santri Pesantren' } }),
    prisma.challenge.create({ data: { id: 'challenge-5', title: 'Daur Ulang Sampah Plastik Tangerang', description: 'Program pengolahan sampah plastik menjadi produk bernilai ekonomi di lingkungan RT/RW.', category: 'Lingkungan, Sosial', location: 'Kota Tangerang', duration: 45, points: 700, target: 'Komunitas RT/RW' } }),
    prisma.challenge.create({ data: { id: 'challenge-6', title: 'Aplikasi Pencatatan Kas BUMDes', description: 'Membangun aplikasi pencatatan keuangan sederhana berbasis web untuk BUMDes desa terpilih.', category: 'Tech, Ekonomi', location: 'Kabupaten Serang', duration: 20, points: 550, target: 'BUMDes' } }),
  ]);

  console.log(`✅ ${challenges.length} challenges dibuat`);

  // ───────────────────────────────────────────
  // ADMIN
  // ───────────────────────────────────────────
  const adminPassword = await bcrypt.hash('Admin@impact2026', 12);
  const admin = await prisma.user.create({
    data: {
      id: 'admin-1',
      email: 'admin@impact.id',
      password: adminPassword,
      name: 'Super Admin IMPACT.ID',
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin dibuat:', admin.email, '/ password: Admin@impact2026');

  // ───────────────────────────────────────────
  // GURU / TEACHERS
  // ───────────────────────────────────────────
  const teacherPassword = await bcrypt.hash('Guru@impact2026', 12);
  const teacher1 = await prisma.user.create({
    data: {
      id: 'teacher-1',
      email: 'bu.rani@sma1serang.sch.id',
      password: teacherPassword,
      name: 'Rani Kusumawati',
      role: 'TEACHER',
    },
  });
  const teacher2 = await prisma.user.create({
    data: {
      id: 'teacher-2',
      email: 'pak.budi@smkn2cilegon.sch.id',
      password: teacherPassword,
      name: 'Budi Santoso',
      role: 'TEACHER',
    },
  });
  console.log(`✅ 2 guru dibuat (password: Guru@impact2026)`);

  // ───────────────────────────────────────────
  // DINAS PENDIDIKAN
  // ───────────────────────────────────────────
  const dinasPassword = await bcrypt.hash('Dinas@impact2026', 12);
  const dinas1 = await prisma.user.create({
    data: {
      id: 'dinas-1',
      email: 'kepala@dindik-banten.go.id',
      password: dinasPassword,
      name: 'Ahmad Fauzi',
      role: 'DINAS',
    },
  });
  console.log('✅ Dinas dibuat:', dinas1.email, '/ password: Dinas@impact2026');

  // ───────────────────────────────────────────
  // SISWA / STUDENTS
  // ───────────────────────────────────────────
  const siswaPassword = await bcrypt.hash('Siswa@impact2026', 12);

  const students = await Promise.all([
    prisma.user.create({
      data: {
        id: 'student-1',
        email: 'nadhif@untirta.ac.id',
        password: siswaPassword,
        name: 'Nadhif Alfasya',
        role: 'STUDENT',
        profile: { create: { schoolName: 'Universitas Sultan Ageng Tirtayasa', province: 'Banten', city: 'Kota Serang', interests: JSON.stringify(['Tech', 'Bisnis']), talents: JSON.stringify(['Leadership', 'Problem Solving']) } },
        humanCapitalScore: { create: { leadership: 82, creativity: 74, collaboration: 88, communication: 79, problemSolving: 71, totalScore: 78.8 } },
      },
    }),
    prisma.user.create({
      data: {
        id: 'student-2',
        email: 'sari@untirta.ac.id',
        password: siswaPassword,
        name: 'Sari Dewi Putri',
        role: 'STUDENT',
        profile: { create: { schoolName: 'Universitas Sultan Ageng Tirtayasa', province: 'Banten', city: 'Kota Serang', interests: JSON.stringify(['Sosial', 'Kesehatan']), talents: JSON.stringify(['Komunikasi', 'Empati']) } },
        humanCapitalScore: { create: { leadership: 70, creativity: 85, collaboration: 91, communication: 88, problemSolving: 68, totalScore: 80.4 } },
      },
    }),
    prisma.user.create({
      data: {
        id: 'student-3',
        email: 'rizky@sman1serang.sch.id',
        password: siswaPassword,
        name: 'Rizky Maulana',
        role: 'STUDENT',
        profile: { create: { schoolName: 'SMA Negeri 1 Serang', province: 'Banten', city: 'Kota Serang', interests: JSON.stringify(['Lingkungan', 'Sains']), talents: JSON.stringify(['Riset', 'Analisis']) } },
        humanCapitalScore: { create: { leadership: 65, creativity: 90, collaboration: 75, communication: 72, problemSolving: 88, totalScore: 78.0 } },
      },
    }),
    prisma.user.create({
      data: {
        id: 'student-4',
        email: 'alya@smkn1cilegon.sch.id',
        password: siswaPassword,
        name: 'Alya Ramadhani',
        role: 'STUDENT',
        profile: { create: { schoolName: 'SMKN 1 Cilegon', province: 'Banten', city: 'Kota Cilegon', interests: JSON.stringify(['Bisnis', 'Tech']), talents: JSON.stringify(['Kreativitas', 'Marketing']) } },
        humanCapitalScore: { create: { leadership: 77, creativity: 92, collaboration: 83, communication: 86, problemSolving: 74, totalScore: 82.4 } },
      },
    }),
    prisma.user.create({
      data: {
        id: 'student-5',
        email: 'dimas@itats.ac.id',
        password: siswaPassword,
        name: 'Dimas Arya Pratama',
        role: 'STUDENT',
        profile: { create: { schoolName: 'Institut Teknologi Adhi Tama Surabaya', province: 'Jawa Timur', city: 'Surabaya', interests: JSON.stringify(['Tech', 'Ekonomi']), talents: JSON.stringify(['Coding', 'Data Analysis']) } },
        humanCapitalScore: { create: { leadership: 68, creativity: 80, collaboration: 70, communication: 65, problemSolving: 94, totalScore: 75.4 } },
      },
    }),
  ]);
  console.log(`✅ ${students.length} siswa dibuat (password: Siswa@impact2026)`);

  // ───────────────────────────────────────────
  // SUBMISSIONS
  // ───────────────────────────────────────────
  const sub1 = await prisma.submission.create({ data: { id: 'sub-1', userId: 'student-1', challengeId: 'challenge-2', status: 'SUBMITTED', proofUrl: 'https://example.com/proof/sub-1.pdf', report: 'Telah mendampingi 12 UMKM dalam pembuatan katalog digital dan aktivasi QRIS.' } });
  const sub2 = await prisma.submission.create({ data: { id: 'sub-2', userId: 'student-2', challengeId: 'challenge-1', status: 'COMPLETED', proofUrl: 'https://example.com/proof/sub-2.pdf', report: 'Berhasil memetakan gizi 45 balita di 3 dusun wilayah Pandeglang.' } });
  const sub3 = await prisma.submission.create({ data: { id: 'sub-3', userId: 'student-3', challengeId: 'challenge-5', status: 'IN_PROGRESS' } });
  const sub4 = await prisma.submission.create({ data: { id: 'sub-4', userId: 'student-4', challengeId: 'challenge-3', status: 'SUBMITTED', proofUrl: 'https://example.com/proof/sub-4.pdf', report: 'Mendampingi 8 UMKM dalam pembuatan Google Business Profile dan pelatihan media sosial.' } });
  const sub5 = await prisma.submission.create({ data: { id: 'sub-5', userId: 'student-5', challengeId: 'challenge-6', status: 'REVISION_REQUESTED', report: 'Aplikasi sudah dibuat namun masih ada bug pada modul laporan.' } });
  const sub6 = await prisma.submission.create({ data: { id: 'sub-6', userId: 'student-1', challengeId: 'challenge-4', status: 'COMPLETED', proofUrl: 'https://example.com/proof/sub-6.pdf', report: 'Memberikan 3 sesi literasi keuangan untuk 80 santri pesantren.' } });
  console.log('✅ 6 submissions dibuat');

  // ───────────────────────────────────────────
  // VERIFICATIONS
  // ───────────────────────────────────────────
  await prisma.verification.create({ data: { submissionId: 'sub-2', teacherId: 'teacher-1', isApproved: true, feedback: 'Laporan lengkap dan dampak terukur. Sangat bagus!' } });
  await prisma.verification.create({ data: { submissionId: 'sub-6', teacherId: 'teacher-2', isApproved: true, feedback: 'Kegiatan berjalan baik. Dokumentasi video sangat membantu.' } });
  await prisma.verification.create({ data: { submissionId: 'sub-5', teacherId: 'teacher-1', isApproved: false, feedback: 'Mohon perbaiki bug pada modul laporan dan tambahkan fitur export CSV.' } });
  console.log('✅ 3 verifikasi dibuat');

  // ───────────────────────────────────────────
  // PORTFOLIOS
  // ───────────────────────────────────────────
  await Promise.all([
    prisma.portfolio.create({ data: { userId: 'student-1', title: 'Digitalisasi UMKM Lebak — 12 Mitra', description: 'Berhasil mendampingi 12 UMKM perdesaan dalam transformasi digital dengan peningkatan omzet rata-rata 34%.', impactScore: 450, blockchainTx: '0xabc123def456' } }),
    prisma.portfolio.create({ data: { userId: 'student-1', title: 'Literasi Keuangan Pesantren Cilegon', description: 'Memberikan 3 sesi edukasi keuangan untuk 80 santri, dengan 72% peserta berhasil membuka tabungan baru.', impactScore: 350, blockchainTx: '0xdef789ghi012' } }),
    prisma.portfolio.create({ data: { userId: 'student-2', title: 'Pemetaan Gizi Balita Pandeglang', description: 'Memetakan status gizi 45 balita di 3 dusun, mengidentifikasi 8 kasus stunting yang kemudian ditangani puskesmas.', impactScore: 500, blockchainTx: '0xghi345jkl678' } }),
    prisma.portfolio.create({ data: { userId: 'student-4', title: 'UMKM Kota Serang Goes Digital', description: 'Mendampingi 8 pedagang kecil dalam pembuatan Google Business Profile, menghasilkan peningkatan pelanggan baru 25%.', impactScore: 420 } }),
  ]);
  console.log('✅ 4 portfolio dibuat');

  // ───────────────────────────────────────────
  // SUMMARY
  // ───────────────────────────────────────────
  console.log('\n📋 RINGKASAN AKUN SEED:\n');
  console.log('  ADMIN    → admin@impact.id           / Admin@impact2026');
  console.log('  DINAS    → kepala@dindik-banten.go.id / Dinas@impact2026');
  console.log('  GURU     → bu.rani@sma1serang.sch.id  / Guru@impact2026');
  console.log('  GURU     → pak.budi@smkn2cilegon.sch.id / Guru@impact2026');
  console.log('  SISWA    → nadhif@untirta.ac.id       / Siswa@impact2026');
  console.log('  SISWA    → sari@untirta.ac.id         / Siswa@impact2026');
  console.log('  SISWA    → rizky@sman1serang.sch.id   / Siswa@impact2026');
  console.log('  SISWA    → alya@smkn1cilegon.sch.id   / Siswa@impact2026');
  console.log('  SISWA    → dimas@itats.ac.id          / Siswa@impact2026');
  console.log('\n✅ Seeding selesai!\n');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
