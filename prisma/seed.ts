import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('Seeding database...');

  // 1. Buat beberapa Challenges (berdasarkan proposal LIDM wilayah Banten)
  const challenge1 = await prisma.challenge.create({
    data: {
      title: 'Peta Gizi Desa Pandeglang',
      description: 'Memetakan gizi balita, sanitasi, pola asuh, dan akses layanan kesehatan.',
      category: 'Kesehatan, Sosial',
      location: 'Kabupaten Pandeglang',
      duration: 30,
      points: 500,
      target: 'Kader Posyandu',
    },
  });

  const challenge2 = await prisma.challenge.create({
    data: {
      title: 'Digitalisasi UMKM Perdesaan Lebak',
      description: 'Pendampingan katalog digital, QRIS, marketplace, dan pemasaran digital.',
      category: 'Tech, Ekonomi',
      location: 'Kabupaten Lebak',
      duration: 14,
      points: 450,
      target: '50 UMKM',
    },
  });

  const challenge3 = await prisma.challenge.create({
    data: {
      title: 'UMKM Naik Kelas Kota Serang',
      description: 'Pendampingan Google Business Profile dan media sosial bisnis.',
      category: 'Tech, Bisnis',
      location: 'Kota Serang',
      duration: 21,
      points: 600,
      target: 'UMKM Pinggiran',
    },
  });

  // 2. Buat User dummy (Siswa)
  const user = await prisma.user.create({
    data: {
      email: 'siswa@example.com',
      password: 'hashed_password_dummy',
      name: 'Nadhif Alfasya',
      role: 'STUDENT',
      profile: {
        create: {
          schoolName: 'Universitas Sultan Ageng Tirtayasa',
          province: 'Banten',
          city: 'Kota Serang',
          interests: JSON.stringify(['Tech', 'Bisnis']),
          talents: JSON.stringify(['Leadership']),
        },
      },
      humanCapitalScore: {
        create: {
          leadership: 60,
          creativity: 70,
          collaboration: 80,
          communication: 65,
          problemSolving: 40, // Problem solving rendah -> AI akan dorong tech challenge
          totalScore: 63,
        },
      },
    },
  });

  console.log('Seeding selesai!');
  console.log('User ID untuk testing:', user.id);
  console.log('Challenge ID untuk testing:', challenge2.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
