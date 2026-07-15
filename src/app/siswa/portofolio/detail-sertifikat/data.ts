export interface CertificateDetail {
  credentialId: string;
  holderName: string;
  institution: string;
  challengeTitle: string;
  challengeDescription: string;
  issuedDate: string;
  validatedBy: string;
  location: string;
  impactScore: number;
  blockchainNetwork: string;
  blockNumber: string;
  transactionHash: string;
  confirmations: number;
}

export interface BlockchainStep {
  label: string;
  detail: string;
  timestamp: string;
  txShort?: string;
}

export const certificateDetail: CertificateDetail = {
  credentialId: "IMPACT-ID-8821-2024-CISAUK",
  holderName: "Nadhif Alfasya",
  institution: "Mahasiswa Universitas Sultan Ageng Tirtayasa",
  challengeTitle: "Strategi Kepemimpinan & Keberlanjutan",
  challengeDescription:
    "Telah menyelesaikan tantangan dampak sosial dengan hasil luar biasa dan menunjukkan dedikasi tinggi dalam pengembangan komunitas.",
  issuedDate: "14 Juni 2024",
  validatedBy: "Dr. Budi Santoso",
  location: "Cisauk, Tangerang",
  impactScore: 842,
  blockchainNetwork: "Polygon Network",
  blockNumber: "#47,821,334",
  transactionHash:
    "0xf8c2a14d93e5b761024fc98d3a2e4710b6d3cc7a8f291054e7b4a6d18c349ab2c",
  confirmations: 12450,
};

export const blockchainSteps: BlockchainStep[] = [
  {
    label: "Challenge selesai",
    detail: "Data proyek dikumpulkan oleh siswa",
    timestamp: "10 Jun 2024 • 09:41",
  },
  {
    label: "Verifikasi guru/dosen",
    detail: "Disetujui oleh Dr. Budi Santoso",
    timestamp: "12 Jun 2024 • 14:22",
  },
  {
    label: "Hash data dibuat",
    detail: "0x3a7f ... c291e",
    timestamp: "14 Jun 2024 • 07:55",
    txShort: "0x3a7f...c291e",
  },
  {
    label: "Tertulis di Blockchain",
    detail: "Polygon • Tx 0xf8c2...49ab",
    timestamp: "14 Jun 2024 • 08:07",
    txShort: "0xf8c2...49ab",
  },
  {
    label: "Sertifikat diterbitkan",
    detail: "Credential ID issued successfully",
    timestamp: "14 Jun 2024 • 08:10",
  },
];
