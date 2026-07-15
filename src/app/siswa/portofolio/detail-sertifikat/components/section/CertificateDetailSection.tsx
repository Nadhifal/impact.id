"use client";

import React, { useRef } from "react";
import { BlockchainBanner } from "../ui/BlockchainBanner";
import { CertificateCard } from "../ui/CertificateCard";
import { BlockchainSidebar } from "../ui/BlockchainSidebar";
import { CertificateDetail, BlockchainStep } from "../../data";

interface CertificateDetailSectionProps {
  detail: CertificateDetail;
  steps: BlockchainStep[];
}

export function CertificateDetailSection({ detail, steps }: CertificateDetailSectionProps) {
  const certRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!certRef.current) return;

    // Dynamically import to keep bundle size small (client-only)
    const { toPng } = await import("html-to-image");
    const { jsPDF } = await import("jspdf");

    const imgData = await toPng(certRef.current, {
      pixelRatio: 3,         // 3x resolution for crisp output
      backgroundColor: "#ffffff",
    });

    // Load image to get original dimensions for correct PDF scaling
    const img = new globalThis.Image();
    img.src = imgData;
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    // A4 page in mm: 210 × 297
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();

    // Scale image to fit within A4 with margin
    const margin = 10;
    const maxW = pageW - margin * 2;
    const maxH = pageH - margin * 2;

    const imgW = img.width;
    const imgH = img.height;
    const ratio = Math.min(maxW / (imgW / 3.7795), maxH / (imgH / 3.7795));

    const finalW = (imgW / 3.7795) * ratio;
    const finalH = (imgH / 3.7795) * ratio;

    const x = (pageW - finalW) / 2;
    const y = (pageH - finalH) / 2;

    pdf.addImage(imgData, "PNG", x, y, finalW, finalH);
    pdf.save(`sertifikat-${detail.credentialId}.pdf`);
  };

  return (
    <div className="space-y-6">
      {/* Blockchain status banner */}
      <BlockchainBanner
        network={detail.blockchainNetwork}
        blockNumber={detail.blockNumber}
      />

      {/* Main two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
        {/* Left — Certificate card (captured for PDF) */}
        <CertificateCard
          ref={certRef}
          credentialId={detail.credentialId}
          holderName={detail.holderName}
          institution={detail.institution}
          challengeTitle={detail.challengeTitle}
          challengeDescription={detail.challengeDescription}
          issuedDate={detail.issuedDate}
          validatedBy={detail.validatedBy}
          location={detail.location}
          impactScore={detail.impactScore}
        />

        {/* Right — Blockchain sidebar with download trigger */}
        <BlockchainSidebar
          credentialId={detail.credentialId}
          transactionHash={detail.transactionHash}
          confirmations={detail.confirmations}
          network={detail.blockchainNetwork}
          steps={steps}
          onDownload={handleDownload}
        />
      </div>
    </div>
  );
}
