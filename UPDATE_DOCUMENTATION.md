# Dokumentasi Update Sistem & Integrasi Database — IMPACT.ID

Dokumen ini mencakup seluruh riwayat perubahan, penambahan fitur, integrasi API backend, serta perbaikan bug (*bug fixes*) yang telah berhasil diterapkan pada platform **IMPACT.ID**.

---

## 📅 Tanggal Pembaruan
**Jumat, 17 Juli 2026**

---

## 🛠️ Ringkasan Perubahan Sistem

### 1. Database & Skema Baru (Prisma)
- **Model `AdminLog`**: Ditambahkan untuk mencatat histori aktivitas admin secara rinci (Modul User, Challenge, Sertifikat, Pengaturan).
- **Model `LandingPageContent`**: Ditambahkan untuk menyimpan konfigurasi data landing page dinamis (statistik, fitur AI unggulan, langkah proses belajar, testimoni, dan status verifikasi ledger).
- **Seeding Database (`prisma/seed.ts`)**: Diperbarui untuk mendukung pembersihan model-model baru serta seeding konten awal landing page.
- **Git Safety**: Menambahkan `prisma/dev.db` dan journal log-nya ke `.gitignore` agar database pengujian lokal tidak bocor ke repositori Git.

### 2. Modul Admin — Integrasi API & UI
- **Otomatisasi Otorisasi API**: Menambahkan deteksi rute API `/api/admin` agar secara otomatis hanya dapat diakses oleh peran `ADMIN`.
- **Manage Users**: Halaman `/admin/manage-user` sepenuhnya terhubung ke `/api/admin/users` untuk CRUD data pengguna.
- **Portofolio & Sertifikat**: Halaman `/admin/portfolio-certificate` terhubung ke `/api/admin/certificates` untuk persetujuan sertifikat dengan tx hash blockchain acak.
- **Log Aktivitas**: Menampilkan data histori log riil dari tabel `AdminLog` di halaman `/admin/logs`.
- **Landing Page Editor**: Menghubungkan halaman `/admin/settings` ke API `/api/admin/landing-page` (GET & PUT) untuk mengedit konten landing page publik secara langsung dari dashboard admin.

### 3. Modul Dinas Pendidikan — Integrasi API & UI
- **Monitoring Sekolah**: Halaman `/dinas/monitoring` terhubung ke `/api/dinas/schools` untuk mengagregasi data sekolah, jumlah siswa aktif, guru, rata-rata HCS, dan progres dari database riil.
- **Peta Dampak Nasional**: Halaman `/dinas/impact-map` terhubung ke `/api/dinas/impact-map` untuk memetakan koordinat sebaran, detail wilayah interaktif, ranking provinsi, dan sorotan project riil.

### 4. Modul Guru — Integrasi API & UI
- **Analitik Progres Siswa**: Halaman `/guru/analitik` terhubung ke `/api/guru/students` & `/api/guru/students/[id]` untuk memetakan grafik Radar Chart (Kompetensi HCS) dan Line Chart (Tren Capaian) dari siswa bimbingan.
- **Laporan Capaian**: Dropdown opsi pilihan siswa ditarik secara dinamis dari database siswa bimbingan guru yang login.

---

## 🐛 Bug Fixes & Stabilitas

### 1. Perbaikan Redirection API di Middleware
- **Masalah**: Sebelumnya, jika autentikasi gagal/token kedaluwarsa pada request `/api/...`, middleware mengalihkan request ke `/auth/login` (mengembalikan HTML halaman login). Hal ini menyebabkan error konsol `Unexpected token '<', "<!DOCTYPE "... is not valid JSON` pada client.
- **Solusi**: Memperbarui middleware agar mengembalikan respon JSON terstruktur (status `401 Unauthorized` atau `403 Forbidden`) untuk request API, serta mengecualikan request `GET /api/admin/landing-page` agar dapat diakses publik oleh guest tanpa token.

### 2. Migrasi Konvensi Next.js 16 (Middleware → Proxy)
- **Masalah**: Next.js versi 16 mendepresiasi file `middleware.ts` dan mengharuskan penggunaan `proxy.ts`. Akibatnya, server dev memicu error `Could not parse module '[project]/src/proxy.ts', file not found`.
- **Solusi**: Mengubah nama file dari `src/middleware.ts` ke `src/proxy.ts` dan mengubah struktur fungsinya menjadi `export default async function proxy(req: NextRequest)`.

### 3. Pembuatan Profile Saat Registrasi Murid & Guru
- **Masalah**: Proses registrasi akun murid/guru berhasil, tetapi data asal sekolah, kota, dan provinsi tidak tersimpan ke database karena tabel `Profile` tidak dibuat. Di dashboard Dinas, data murid dikelompokkan sebagai `"SMA tidak diketahui"`.
- **Solusi**: Menambahkan logika auto-create model `Profile` pada API `/api/auth/register` ketika pengguna ber-role `STUDENT` atau memiliki metadata sekolah berhasil didaftarkan.

### 4. Crash Halaman Profil Siswa (`interests.map`)
- **Masalah**: Terjadi crash runtime `TypeError: interests.map is not a function` pada halaman `/siswa/profile` jika format properti `interests` di database berupa string teks biasa terpisah koma dan bukan string JSON array.
- **Solusi**: Mengimplementasikan *flat array parser* tahan error pada logika pengambilan data di file `src/app/siswa/profile/page.tsx` untuk menjamin tipe data yang di-map selalu berupa array datar.

### 5. Error Import `bcryptjs` pada `seed.ts`
- **Masalah**: IDE menampilkan tanda error merah pada baris import default `bcryptjs` akibat ketidaksesuaian opsi `moduleResolution` di editor.
- **Solusi**: Mengubah import default menjadi namespace import `import * as bcrypt from 'bcryptjs'`.

---

## 🔒 Status Pengujian & Kompilasi
- **TypeScript & Build Check**: Kompilasi produksi berjalan 100% sukses tanpa error tipe data:
  ```bash
  npm run build
  ```
- **Database Seeding Status**: Berhasil di-seed ulang dengan lancar:
  ```bash
  npx prisma db seed
  ```
