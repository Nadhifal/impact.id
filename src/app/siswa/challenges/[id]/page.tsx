import React from "react";
import { prisma } from "@/lib/prisma";
import { ChallengeDetailClient } from "./ChallengeDetailClient";
import { challengeDetail as dummyDetail, guideTasks, resourceFiles } from "./data";

export const dynamic = "force-dynamic";

const CATEGORY_IMAGES: Record<string, string> = {
  Kewirausahaan:
    "https://images.unsplash.com/photo-1596422846543-75c6fc18a523?auto=format&fit=crop&w=1200&h=400&q=80",
  Lingkungan:
    "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&h=400&q=80",
  Sosial:
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&h=400&q=80",
  Edukasi:
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&h=400&q=80",
  Teknologi:
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&h=400&q=80",
  Kesehatan:
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&h=400&q=80",
  Pendidikan:
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&h=400&q=80",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ChallengeDetailPage({ params }: PageProps) {
  const { id } = await params;

  let detail = dummyDetail;

  try {
    const dbChallenge = await prisma.challenge.findUnique({
      where: { id },
    });

    if (dbChallenge) {
      // Map database categories (comma-separated or single)
      const primaryCategory = dbChallenge.category.split(",")[0].trim();
      
      detail = {
        id: dbChallenge.id,
        title: dbChallenge.title,
        category: dbChallenge.category.toUpperCase(),
        subCategory: dbChallenge.target || "Umum",
        location: dbChallenge.location || "Indonesia",
        duration: `${dbChallenge.duration} Hari`,
        points: dbChallenge.points,
        targetCount: dbChallenge.target || "Umum",
        imageUrl:
          CATEGORY_IMAGES[primaryCategory] ||
          "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&h=400&q=80",
        description: dbChallenge.description,
        quote: "Kolaborasi antara teknologi dan kearifan lokal adalah kunci pertumbuhan ekonomi berkelanjutan di era digital.",
        checkpoints: [
          { id: "1", text: "Analisis awal lapangan & koordinasi", completed: true },
          { id: "2", text: "Pelaksanaan program aksi sosial", completed: false },
          { id: "3", text: "Penyusunan laporan dampak akhir", completed: false },
        ],
        expectedImpact: [
          {
            title: "Dampak Sosial Terukur",
            description: "Meningkatkan kontribusi positif bagi pengembangan masyarakat lokal.",
            iconName: "visibility",
          },
          {
            title: "Akurasi Hasil",
            description: "Data yang valid dan andal untuk kepentingan monitoring program.",
            iconName: "accuracy",
          },
        ],
      };
    }
  } catch (err) {
    console.error("Gagal mengambil detail challenge dari DB:", err);
  }

  return (
    <ChallengeDetailClient
      challenge={detail}
      guideTasks={guideTasks}
      resourceFiles={resourceFiles}
    />
  );
}
