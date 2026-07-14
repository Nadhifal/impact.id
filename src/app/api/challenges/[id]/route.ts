import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const challengeId = params.id;

    if (!challengeId) {
      return NextResponse.json(
        { error: "Parameter 'id' challenge diperlukan" },
        { status: 400 }
      );
    }

    // Ambil detail challenge dari database
    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId },
    });

    if (!challenge) {
      return NextResponse.json({ error: "Challenge tidak ditemukan" }, { status: 404 });
    }

    // Berikan data guide/langkah-langkah tiruan (karena saat ini belum ada kolom di DB)
    // Di masa depan, ini bisa disimpan di tabel terpisah 'ChallengeStep' atau kolom JSON
    const guide = [
      { step: 1, title: "Pahami Masalah", description: "Lakukan wawancara singkat dengan 3 pihak terkait." },
      { step: 2, title: "Susun Solusi", description: "Buat dokumen perencanaan atau purwarupa (prototype) kasar." },
      { step: 3, title: "Implementasi & Validasi", description: "Presentasikan solusi kepada mentor atau klien (target)." }
    ];

    return NextResponse.json({
      success: true,
      data: {
        ...challenge,
        guide: guide,
      }
    });
  } catch (error: any) {
    console.error("Challenge Detail API Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal server" },
      { status: 500 }
    );
  }
}
