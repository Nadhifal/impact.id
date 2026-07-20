# Ringkasan Tugas dan Perubahan

## Tugas yang sudah dikerjakan

- Mengidentifikasi penyebab halaman landing page menjadi berat.
- Mengurangi bundle public dengan memindahkan logika auth dan meminimalkan client-side rendering.
- Memperbaiki masalah tombol/tautan pada HeroSection yang tidak berfungsi di desktop.
- Memvalidasi perubahan dengan build Next.js menggunakan terminal `cmd`.

## Apa yang diubah

- `src/app/page.tsx`
  - Diubah dari client component menjadi server component.
  - Menghilangkan `use client`, `useState`, `useEffect`, dan fetch client-side ke `/api/admin/landing-page`.
  - Mengambil konten landing page langsung dari database dengan `prisma`.
- `src/app/layout.tsx`
  - Menghapus pembungkus `AuthProvider` dari root layout.
- `src/app/admin/layout.tsx`
  - Menambahkan `AuthProvider` pada layout admin.
- `src/app/guru/layout.tsx`
  - Menambahkan `AuthProvider` pada layout guru.
- `src/app/siswa/layout.tsx`
  - Menambahkan `AuthProvider` pada layout siswa.
- `src/app/dinas/layout.tsx`
  - Menambahkan `AuthProvider` pada layout dinas.
- `src/app/components/sections/HeroSection.tsx`
  - Menambahkan `pointer-events-none` pada elemen dekoratif latar belakang untuk mencegah overlay memblokir interaksi klik di desktop.

## Apa yang ditambahkan

- Penanganan server-side data pada landing page untuk mengurangi beban client.
- `AuthProvider` hanya di area layout yang membutuhkan autentikasi, bukan pada seluruh aplikasi.
- Dokumentasi ringkas di file `task-summary.md`.

## Hasil

- Halaman landing page lebih ringan dan tidak lagi memuat data landing page dengan fetch klien.
- Pengguna desktop dapat kembali mengklik tombol pada HeroSection.
- Struktur dan visual UI/UX tetap dipertahankan.
