# Ringkasan Tugas dan Perubahan

## Tugas yang sudah dikerjakan

- [2026-07-21] Mengidentifikasi dan memperbaiki beban halaman landing page dengan memindahkan logika dari client ke server.
- [2026-07-21] Menurunkan penggunaan client-side rendering pada halaman publik dan login.
- [2026-07-21] Memperbaiki masalah tombol pada HeroSection yang tidak responsif di desktop.
- [2026-07-21] Menstandarisasi semua toggle switch admin settings menjadi rounded switch dengan `bg-primary` saat aktif.
- [2026-07-21] Membagi halaman pengaturan admin menjadi section file terpisah untuk setiap tab.
- [2026-07-21] Memperbaiki potensi hydration mismatch pada login dengan stabilisasi form dan input.
- [2026-07-21] Memvalidasi perubahan dengan build Next.js menggunakan terminal `cmd`.
- [2026-07-22] Mengoptimalkan ukuran bundle JavaScript awal dengan penerapan dynamic import (`next/dynamic`) pada library chart (`recharts`).
- [2026-07-22] Menghilangkan blocking database queries pada SSR dengan menerapkan React `<Suspense>` dan *skeleton loader* untuk streaming HTML.
- [2026-07-22] Mempercepat otentikasi login dan registrasi dengan mengganti `bcryptjs` (pure JS) menjadi `bcrypt` (native C++) serta mengoptimalkan *salt rounds* ke 10.
- [2026-07-22] Menambahkan indeks database pada skema Prisma untuk mempercepat pencarian data pada PostgreSQL.
- [2026-07-22] Mengubah agregasi data manual di memori server menjadi query agregasi langsung di database (`_avg`, `_count`, `select`).
- [2026-07-24] Membuat Halaman Verifikasi Sertifikat Publik (`/verify/[id]` dan `/verify`) yang dapat diakses secara terbuka tanpa perlu login.
- [2026-07-24] Memperbarui Barcode / QR Code pada sertifikat agar dinamis (`window.location.origin`) dan secara akurat mengarahkan scanner hp ke halaman verifikasi sertifikat publik.
- [2026-07-24] Mengganti data statis (hardcoded) pada seluruh chart dan tabel di dashboard admin dengan data real yang diambil langsung dari database PostgreSQL via Prisma.
- [2026-07-24] Memperbaiki bug QR Code 404 di Vercel — URL QR code kini dibangun dari `headers()` di Server Component agar selalu menggunakan domain deployment yang benar (bukan hardcoded atau kosong).
- [2026-07-24] Menambahkan halaman "Sertifikat Tidak Ditemukan" yang jelas pada `/verify/[id]` jika ID tidak ada di database.

## Apa yang diubah

- [2026-07-21] `src/app/page.tsx`
  - Diubah dari client component menjadi server component.
  - Menghilangkan `use client`, `useState`, `useEffect`, dan fetch client-side ke `/api/admin/landing-page`.
  - Mengambil konten landing page langsung dari database dengan `prisma`.
- [2026-07-21] `src/app/layout.tsx`
  - Menghapus pembungkus `AuthProvider` dari root layout.
- [2026-07-21] `src/app/admin/layout.tsx`
  - Menambahkan `AuthProvider` pada layout admin.
- [2026-07-21] `src/app/guru/layout.tsx`
  - Menambahkan `AuthProvider` pada layout guru.
- [2026-07-21] `src/app/siswa/layout.tsx`
  - Menambahkan `AuthProvider` pada layout siswa.
- [2026-07-21] `src/app/dinas/layout.tsx`
  - Menambahkan `AuthProvider` pada layout dinas.
- [2026-07-21] `src/app/components/sections/HeroSection.tsx`
  - Menambahkan `pointer-events-none` pada elemen dekoratif latar belakang untuk mencegah overlay memblokir interaksi klik di desktop.
- [2026-07-21] `src/app/auth/login/page.tsx`
  - Menambahkan `autoComplete="on"` ke form.
  - Menambahkan `autoComplete="email"` pada email input.
  - Menambahkan `autoComplete="current-password"` pada password input.
- [2026-07-21] `src/app/shared/components/ui/input.tsx`
  - Menghapus `suppressHydrationWarning={true}` pada elemen input.
- [2026-07-21] `src/app/admin/settings/components/section/PlatformSettingsTab.tsx`
  - Menstandarisasi toggle switch menggunakan rounded switch UI.
- [2026-07-21] `src/app/admin/settings/components/section/NotificationsTab.tsx`
  - Mengubah checkbox notifikasi menjadi rounded switch UI.
- [2026-07-21] `src/app/api/admin/users/[id]/route.ts`
  - Mengirim email notifikasi ketika akun guru/dinas pending disetujui.
- [2026-07-21] `src/lib/email.ts`
  - Menambahkan util email SMTP untuk pengiriman notifikasi.
- [2026-07-22] `src/app/siswa/dashboard/components/section/HcsSection.tsx`
  - Mengubah impor statis `HcsRadarChart` menjadi `next/dynamic` dengan `{ ssr: false }`.
- [2026-07-22] `src/app/dinas/dashboard/page.tsx`
  - Mengubah impor statis `TrendChart` menjadi `next/dynamic` dengan `{ ssr: false }`.
- [2026-07-22] `src/app/dinas/analytics/page.tsx`
  - Mengubah impor statis `DimensionsRadarChart`, `ComparisonBarChart`, dan `CategoryDistributionChart` menjadi `next/dynamic` dengan `{ ssr: false }`.
- [2026-07-22] `src/app/admin/dashboard/page.tsx`
  - Mengubah `GrowthChart` menjadi dynamic import `nextDynamic`.
  - Ekstraksi logika data fetching ke komponen inner `AdminDashboardContent` yang dibungkus `<Suspense fallback={<AdminDashboardSkeleton />}>`.
- [2026-07-22] `src/app/siswa/challenges/page.tsx`
  - Ekstraksi query database ke komponen inner `ChallengesContent` yang dibungkus `<Suspense fallback={<ChallengesSkeleton />}>`.
- [2026-07-22] `src/app/siswa/portofolio/page.tsx`
  - Ekstraksi query database dan validasi JWT ke `PortfolioContent` yang dibungkus `<Suspense fallback={<PortfolioSkeleton />}>`.
- [2026-07-22] `src/app/api/auth/login/route.ts`
  - Mengganti impor `bcryptjs` dengan `bcrypt` native untuk mempercepat komparasi hash password.
- [2026-07-22] `src/app/api/auth/register/route.ts`
  - Mengganti impor `bcryptjs` dengan `bcrypt` native.
  - Mengubah salt rounds pembuatan password dari `12` menjadi `10`.
- [2026-07-22] `src/app/api/admin/users/route.ts`
  - Mengganti impor `bcryptjs` dengan `bcrypt` native dan menurunkan salt rounds ke `10`.
- [2026-07-22] `prisma/schema.prisma`
  - Menambahkan indeks `@@index([role])` pada model `User`.
  - Menambahkan indeks `@@index([status])`, `@@index([userId])`, `@@index([challengeId])` pada model `Submission`.
- [2026-07-22] `src/app/api/dinas/stats/route.ts`
  - Mendelegasikan hitungan dan nilai rata-rata HCS ke database via `prisma.user.count` dan `prisma.humanCapitalScore.aggregate`.
  - Menggunakan `select` terbatas pada pencarian profil siswa untuk menghemat memori.
- [2026-07-22] `src/app/api/dinas/analytics/route.ts`
  - Menggunakan `prisma.humanCapitalScore.aggregate` untuk menghitung rata-rata 5 dimensi HCS secara langsung di PostgreSQL.
  - Membatasi payload query `submissions` hanya pada kolom `category`.
- [2026-07-24] `src/app/siswa/portofolio/detail-sertifikat/components/ui/CertificateCard.tsx`
  - Mengubah penentuan `verifyUrl` agar mendeteksi `window.location.origin` secara dinamis di browser sehingga QR Code dapat di-scan secara nyata pada server lokal maupun production.
- [2026-07-24] `src/app/siswa/portofolio/detail-sertifikat/page.tsx`
  - Mengirimkan `sub.id` utuh sebagai `credentialId` agar QR Code mengodekan ID yang dapat dicari di database.
- [2026-07-24] `src/app/components/sections/VerificationSection.tsx`
  - Menghubungkan tombol "Verifikasi Sekarang" dan "Scan QR Code" di Landing Page langsung ke rute verifikasi publik `/verify`.

## Apa yang ditambahkan

- [2026-07-21] Penanganan server-side data pada landing page untuk mengurangi beban client.
- [2026-07-21] `AuthProvider` hanya di area layout yang memerlukan autentikasi.
- [2026-07-21] Rounded toggle switch UI pada admin settings.
- [2026-07-21] Autocomplete form login yang lebih stabil.
- [2026-07-21] Mekanisme notifikasi email approval untuk akun guru/dinas.
- [2026-07-21] Dokumentasi ringkas di file `task-summary.md`.
- [2026-07-22] Komponen skeleton loader (`AdminDashboardSkeleton`, `ChallengesSkeleton`, `PortfolioSkeleton`) untuk streaming UI.
- [2026-07-22] Dependensi `bcrypt` (native) dan tipe `@types/bcrypt` serta `@types/nodemailer`.
- [2026-07-22] Indeks database pada `User` dan `Submission` melalui `prisma db push`.
- [2026-07-24] Halaman Verifikasi Publik Sertifikat di `src/app/verify/[id]/page.tsx` untuk menampilkan bukti keabsahan sertifikat, perincian siswa, serta rekaman bukti blockchain secara terbuka.
- [2026-07-24] Halaman Pencarian Verifikasi Publik di `src/app/verify/page.tsx` untuk melakukan pencarian ID sertifikat secara publik.
- [2026-07-24] Tipe `ActivityLogItem` dan `RoleGrowth` / `MonthlyGrowth` sebagai kontrak data antar Server Component dan Client Chart Component pada dashboard admin.
- [2026-07-24] Prop `verifyUrl` pada `CertificateCard` dan `CertificateDetailSection` sebagai mekanisme server-side URL injection untuk QR Code.

## Apa yang dihapus

- [2026-07-21] `AuthProvider` dari `src/app/layout.tsx` agar tidak diterapkan secara global.
- [2026-07-21] `suppressHydrationWarning={true}` pada `src/app/shared/components/ui/input.tsx`.
- [2026-07-22] Ketergantungan pada `bcryptjs` pure JS pada modul otentikasi utama.
- [2026-07-22] Query pencarian penuh seluruh objek siswa (*in-memory aggregation*) pada API statistik dan analitik dinas.
- [2026-07-24] Hardcoded URL `https://impact.id` pada QR code generator sertifikat.
- [2026-07-24] Data dummy / fiktif (nama, sekolah, data palsu) yang digunakan sebagai fallback pada halaman `/verify/[id]` saat ID tidak ditemukan di database.
- [2026-07-24] `src/app/admin/dashboard/page.tsx`
  - Menambahkan query `user.groupBy(role)` untuk data distribusi user per role.
  - Menambahkan query `user.findMany` 12 bulan terakhir dan agregasi per bulan untuk tren registrasi.
  - Menambahkan query `adminLog.findMany` 8 terbaru beserta relasi nama admin.
  - Meneruskan semua data sebagai props ke `GrowthChart` dan `ActivityLogs`.
- [2026-07-24] `src/app/admin/dashboard/components/section/GrowthChart.tsx`
  - Dihapus impor data statis `userGrowthData` dari `data.ts`.
  - Ditambahkan props `byRole: RoleGrowth[]` dan `byMonth: MonthlyGrowth[]`.
  - Ditambahkan mode tampilan kedua: **Line Chart bulanan** (12 bulan terakhir) dengan selector dropdown antara "Per Role" dan "Bulanan".
  - Menggunakan tipe unified `ChartEntry` agar recharts tidak gagal saat type-checking.
- [2026-07-24] `src/app/admin/dashboard/components/section/ActivityLogs.tsx`
  - Dihapus impor data statis `activityLogsData` dari `data.ts`.
  - Ditambahkan props `logs: ActivityLogItem[]` yang berisi log aktivitas nyata dari tabel `AdminLog`.
  - Ditambahkan *empty state* jika belum ada log di database.
  - Waktu ditampilkan secara relatif otomatis ("Baru saja", "X menit/jam/hari yang lalu").
- [2026-07-24] `src/app/siswa/portofolio/detail-sertifikat/page.tsx`
  - Menambahkan import `headers` dari `next/headers`.
  - Membangun `baseUrl` server-side dari HTTP request header `host` — bekerja akurat di localhost, Vercel preview, maupun production.
  - Meneruskan `verifyUrl` lengkap sebagai prop ke `CertificateDetailSection`.
- [2026-07-24] `src/app/siswa/portofolio/detail-sertifikat/components/section/CertificateDetailSection.tsx`
  - Menambahkan prop `verifyUrl: string` dan meneruskannya ke `CertificateCard`.
- [2026-07-24] `src/app/siswa/portofolio/detail-sertifikat/components/ui/CertificateCard.tsx`
  - Menambahkan prop opsional `verifyUrl?: string` — jika disediakan server, langsung dipakai sebagai nilai QR code tanpa menunggu `useEffect`.
  - Menghapus dependensi `NEXT_PUBLIC_VERCEL_URL` dan fallback yang tidak reliabel.
- [2026-07-24] `src/app/verify/[id]/page.tsx`
  - Mengganti `findFirst` dengan `findUnique` untuk pencarian tepat berdasarkan UUID.
  - Menghapus seluruh data dummy fallback (nama, sekolah, dan data fiktif).
  - Menambahkan halaman *Not Found* dengan `ShieldX` icon, pesan panduan, dan tombol aksi jika ID tidak ditemukan di database.

## Hasil

- [2026-07-21] Halaman landing page lebih ringan dan lebih cepat karena data diambil dari server.
- [2026-07-21] Form login lebih stabil terhadap hydration mismatch.
- [2026-07-21] Toggle di admin settings konsisten secara visual.
- [2026-07-21] Pengguna desktop bisa berinteraksi kembali dengan tombol HeroSection.
- [2026-07-21] Aplikasi lebih modular dengan section file pengaturan admin yang terpisah.
- [2026-07-22] Ukuran JavaScript awal lebih kecil karena library chart (`recharts`) dimuat secara *lazy-loading*.
- [2026-07-22] Rendering halaman tantangan, portofolio, dan admin dashboard menjadi non-blocking menggunakan React `<Suspense>` streaming.
- [2026-07-22] Verifikasi login dan pendaftaran akun menjadi instan dengan native `bcrypt`.
- [2026-07-22] Query API statistik & analitik dinas berjalan sangat cepat dan hemat memori karena kalkulasi dilakukan langsung oleh PostgreSQL.
- [2026-07-24] Barcode / QR Code pada sertifikat fisik/PDF dan tampilan web berfungsi penuh saat di-scan oleh kamera smartphone.
- [2026-07-24] Halaman verifikasi publik `/verify/[id]` menampilkan data resmi dari Prisma dan bukti keaslian di blockchain secara publik tanpa mengharuskan login.
- [2026-07-24] Chart distribusi user per role dan tren bulanan pada dashboard admin kini menampilkan angka nyata dari database, bukan data fiktif.
- [2026-07-24] Tabel log aktivitas admin menampilkan riwayat aksi nyata dari tabel `AdminLog` dengan waktu relatif otomatis.
- [2026-07-24] Bug QR Code 404 di Vercel telah diperbaiki — QR code kini selalu encode URL domain Vercel yang tepat karena URL dibangun dari `headers()` di server, bukan dari `window.location.origin` client-side yang belum tersedia saat render.
- [2026-07-24] Halaman `/verify/[id]` menampilkan pesan "Sertifikat Tidak Ditemukan" yang jelas dan profesional jika ID tidak ada di database, menghilangkan potensi miskomunikasi dari data dummy yang terlihat valid.
