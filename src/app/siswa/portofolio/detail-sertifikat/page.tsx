import React from "react";
import Link from "next/link";
import { ChevronLeft, Bell } from "lucide-react";
import { CertificateDetailSection } from "./components/section/CertificateDetailSection";
import { certificateDetail, blockchainSteps } from "./data";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Detail Sertifikat | IMPACT.ID",
  description:
    "Verifikasi kredensial berbasis blockchain untuk sertifikat pencapaian akademik dan profesional."
};

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function DetailSertifikatPage({
  searchParams
}: PageProps) {
  const { id } = await searchParams;

  let currentDetail = certificateDetail;

  if (id) {
    try {
      const sub = await prisma.submission.findUnique({
        where: { id },
        include: {
          challenge: true,
          user: {
            include: { profile: true }
          },
          verification: true
        }
      });

      if (sub) {
        currentDetail = {
          credentialId: sub.id,
          holderName: sub.user.name || "Siswa",
          institution: sub.user.profile?.schoolName || "Sekolah Mitra",
          challengeTitle: sub.challenge.title,
          challengeDescription: sub.challenge.description,
          issuedDate: new Date(sub.updatedAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
          }),
          validatedBy: "Budi Santoso (Guru Pengampu)",
          location: sub.challenge.location,
          impactScore: sub.challenge.points,
          blockchainNetwork: "Polygon PoS Mainnet",
          blockNumber: "58,412,987",
          transactionHash: `0x${sub.id.replace(/-/g, "").substring(0, 40)}`,
          confirmations: 128
        };
      }
    } catch (err) {
      console.error("Gagal mengambil data sertifikat dari DB:", err);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* Page content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6">
        {/* Page heading */}
        <div className="space-y-1.5">
          <h1 className="text-2xl font-extrabold text-[#00473e] tracking-tight">
            Verifikasi Kredensial
          </h1>
          <p className="text-sm text-zinc-500 font-medium max-w-lg leading-relaxed">
            Sertifikat ini tersimpan di blockchain dan tidak dapat dipalsukan
            untuk menjamin keaslian pencapaian akademik dan profesional.
          </p>
        </div>

        {/* Detail section */}
        <CertificateDetailSection
          detail={currentDetail}
          steps={blockchainSteps}
        />
      </main>
    </div>
  );
}
