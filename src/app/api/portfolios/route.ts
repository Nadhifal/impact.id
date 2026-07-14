import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, challengeId, completionNotes } = body;

    if (!userId || !challengeId) {
      return NextResponse.json(
        { error: "Parameter 'userId' dan 'challengeId' diperlukan" },
        { status: 400 }
      );
    }

    // 1. Pastikan challenge dan user valid
    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId },
    });

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!challenge || !user) {
      return NextResponse.json({ error: "Data User atau Challenge tidak valid" }, { status: 404 });
    }

    // 2. SIMULASI BLOCKCHAIN: Membuat Transaction Hash palsu untuk Sertifikat Digital
    // Di dunia nyata, ini akan berinteraksi dengan Smart Contract (misal via Ethers.js atau Web3.js)
    const simulatedBlockchainHash = "0x" + crypto.createHash("sha256").update(`${userId}-${challengeId}-${Date.now()}`).digest("hex");

    // 3. Simpan data portofolio ini (jika kita sudah buat tabel Portfolio di masa depan)
    // Untuk saat ini, kita kembalikan saja objek mock response
    const portfolioResult = {
      studentName: user.name,
      challengeTitle: challenge.title,
      dateCompleted: new Date().toISOString(),
      notes: completionNotes || "Telah menyelesaikan tantangan dengan baik.",
      skillsGained: challenge.category,
      blockchainVerification: {
        network: "Polygon (Simulasi)",
        transactionHash: simulatedBlockchainHash,
        status: "Verified",
      }
    };

    return NextResponse.json({
      success: true,
      message: "Portofolio dan sertifikat digital berhasil digenerate!",
      data: portfolioResult,
    });
  } catch (error: any) {
    console.error("Portfolios API Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal server" },
      { status: 500 }
    );
  }
}
