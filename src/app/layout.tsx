import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/app/shared/context/AuthContext";

export const metadata: Metadata = {
  title: "IMPACT.ID — Ekosistem Pendidikan Berbasis Dampak",
  description: "Platform pendidikan berbasis dampak nyata untuk siswa, guru, dan dinas pendidikan Indonesia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
