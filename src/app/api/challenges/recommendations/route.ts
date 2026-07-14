import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Parameter 'userId' diperlukan" },
        { status: 400 }
      );
    }

    // 1. Ambil data Profile dan HumanCapitalScore dari user
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        humanCapitalScore: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
    }

    const { profile, humanCapitalScore } = user;
    
    // Default nilai jika belum ada data (fallback)
    const interests = profile?.interests ? JSON.parse(profile.interests) : [];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const score = humanCapitalScore || {
      leadership: 0,
      creativity: 0,
      collaboration: 0,
      communication: 0,
      problemSolving: 0,
    };

    // 2. Ambil semua Challenges yang aktif
    const challenges = await prisma.challenge.findMany({
      orderBy: { createdAt: "desc" },
    });

    // 3. Sistem Rekomendasi Berbasis Aturan (Rule-based Filtering & Scoring)
    const recommended = challenges.map((challenge) => {
      let matchScore = 0;

      // a. Minat (Interests) Match: Jika kategori challenge cocok dengan minat siswa, tambah bobot tinggi
      if (interests.includes(challenge.category)) {
        matchScore += 50;
      }

      // b. Kesenjangan Kompetensi (Skill Gap Analysis)
      // Misalnya, jika poin challenge besar, rekomendasikan pada siswa yang memiliki kompetensi rendah (untuk belajar)
      // Ini adalah simulasi sederhana. Pada AI sejati, ini akan memanggil Model.
      if (score.problemSolving < 50 && challenge.category.includes("Tech")) {
        matchScore += 20; // Dorong siswa yang problem solving-nya rendah untuk ambil Tech challenge
      }
      if (score.leadership < 50 && challenge.category.includes("Sosial")) {
        matchScore += 20;
      }

      return {
        ...challenge,
        matchScore,
      };
    });

    // 4. Urutkan berdasarkan matchScore tertinggi
    recommended.sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json({
      success: true,
      message: "Berhasil mendapatkan rekomendasi challenge",
      data: recommended,
    });
  } catch (error: any) {
    console.error("Recommendations API Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal server" },
      { status: 500 }
    );
  }
}
