import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { prisma } from "@/lib/prisma";

// Inisialisasi Google GenAI dengan API Key dari .env
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, challengeId, history = [] } = body;

    if (!message) {
      return NextResponse.json({ error: "Pesan tidak boleh kosong" }, { status: 400 });
    }

    // Ambil konteks challenge jika ada
    let context = "";
    if (challengeId) {
      const challenge = await prisma.challenge.findUnique({
        where: { id: challengeId },
      });
      if (challenge) {
        context = `
Konteks Challenge saat ini yang sedang dikerjakan siswa:
Judul: ${challenge.title}
Deskripsi: ${challenge.description}
Kategori: ${challenge.category}
Target: ${challenge.target}
        `;
      }
    }

    // Sistem prompt untuk membentuk persona "AI Mentor"
    const systemPrompt = `
Kamu adalah AI Mentor di platform IMPACT.ID, sebuah platform edukasi yang fokus pada Challenge-based learning dan portofolio dampak nyata.
Peranmu: Menjadi mentor yang suportif, analitis, dan solutif bagi siswa SMA/SMK atau mahasiswa.
Aturan:
1. Jangan langsung memberikan jawaban akhir, tapi berikan panduan (guide) atau pertanyaan pancingan agar siswa berpikir kritis.
2. Selalu ramah dan gunakan bahasa Indonesia yang mudah dipahami (kasual tapi profesional).
3. Ingat bahwa proyek mereka bertujuan memberikan dampak sosial/lingkungan nyata (contoh: membantu UMKM, edukasi stunting).
${context}
    `;

    // Buat riwayat chat yang dikirim ke Gemini
    const contents = [
      {
        role: "user",
        parts: [{ text: systemPrompt + "\n\nBerikut adalah pertanyaan dari siswa: " + message }],
      }
    ];

    // Panggil model Gemini
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contents,
    });

    const reply = response.text;

    return NextResponse.json({
      success: true,
      reply: reply,
    });

  } catch (error: any) {
    console.error("AI Mentor API Error:", error);
    return NextResponse.json(
      { error: "Gagal memproses respons AI Mentor", details: error.message },
      { status: 500 }
    );
  }
}
