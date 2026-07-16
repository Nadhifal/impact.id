# Implementasi Autentikasi & Middleware IMPACT.ID

## Latar Belakang

Saat ini login hanya mock (hardcode email siswa → redirect). Tidak ada session, tidak ada token, tidak ada proteksi rute. Backend menggunakan **Next.js API Routes + Prisma + SQLite**. Database `User` sudah memiliki kolom `role` (`STUDENT`, `TEACHER`, `DINAS`, `ADMIN`).

Tidak ada paket auth (NextAuth, jose, jsonwebtoken) yang terinstall. Kita akan menggunakan **`jose`** (pure ESM, edge-compatible) untuk JWT serta **HTTP-only cookie** sebagai session storage — sehingga middleware Next.js (`middleware.ts`) dapat memvalidasi token tanpa hit database.

---

## User Review Required

> [!IMPORTANT]
> **Strategi Token**: Kita pakai **JWT di HTTP-only cookie** (bukan localStorage) agar aman dari XSS dan dapat dibaca oleh middleware Edge Runtime Next.js. Cookie bernama `impact_token`.

> [!IMPORTANT]
> **Role Mapping ke URL**: Setiap role memiliki prefix rute sendiri:
> - `STUDENT` → `/siswa/*`
> - `TEACHER` → `/guru/*`
> - `DINAS` → `/dinas/*`
> - `ADMIN` → `/admin/*`
>
> Middleware akan memblokir akses lintas role dan redirect ke `/auth/login` jika tidak terautentikasi.

> [!WARNING]
> **Registrasi Guru & Dinas** memerlukan verifikasi admin sebelum aktif. Setelah submit, akun dibuat dengan status `pendingVerification`. Login tidak bisa dilakukan sampai admin menyetujui.

> [!NOTE]
> **Bcrypt vs. Native**: Karena kita berada di Node.js API routes (bukan Edge), kita bisa pakai `bcryptjs` untuk hash password. Middleware (Edge) hanya verifikasi JWT, tidak perlu bcrypt.

---

## Open Questions

> [!IMPORTANT]
> Apakah role untuk Guru saat ini bernama `TEACHER` di database (sesuai migration SQL) atau nama lain? Saya asumsikan: `STUDENT`, `TEACHER`, `DINAS`, `ADMIN`.

---

## Proposed Changes

### 1. Install Dependencies

```
npm install jose bcryptjs
npm install --save-dev @types/bcryptjs
```

---

### 2. API Routes — Auth Endpoints

#### [NEW] `/api/auth/login/route.ts`
- `POST`: Validasi email+password via Prisma, buat JWT, set HTTP-only cookie `impact_token`
- Response: `{ user: { id, name, role }, redirectTo: "/siswa/dashboard" }`

#### [NEW] `/api/auth/register/route.ts`
- `POST`: Buat user baru di database (hash password dengan bcryptjs)
  - Role `STUDENT` → langsung aktif
  - Role `TEACHER` / `DINAS` → status pending, butuh verifikasi admin
- Response: `{ success: true, pending: boolean }`

#### [NEW] `/api/auth/logout/route.ts`
- `POST`: Hapus cookie `impact_token` (set max-age=0)

#### [NEW] `/api/auth/me/route.ts`
- `GET`: Baca cookie, decode JWT, return data user saat ini (untuk client-side `useUser` hook)

---

### 3. Lib — JWT & Auth Helpers

#### [NEW] `src/lib/auth.ts`
- `signJWT(payload)` → sign token dengan `jose`, expire 7 hari
- `verifyJWT(token)` → verify & decode token
- `getSessionFromCookies(request)` → helper untuk middleware

#### [MODIFY] `src/lib/prisma.ts`
- Tidak ada perubahan, sudah ada

---

### 4. Middleware

#### [NEW] `src/middleware.ts` (di root `src/`)
Logika proteksi rute:

| Path Pattern | Akses |
|---|---|
| `/`, `/auth/*` | Publik (semua orang) |
| `/siswa/*` | Hanya `STUDENT` |
| `/guru/*` | Hanya `TEACHER` |
| `/dinas/*` | Hanya `DINAS` |
| `/admin/*` | Hanya `ADMIN` |

Jika tidak ada token → redirect ke `/auth/login?from={pathname}`
Jika role tidak cocok → redirect ke dashboard role yang benar

---

### 5. Auth Context (Client-Side)

#### [NEW] `src/app/shared/context/AuthContext.tsx`
- React Context yang expose `useUser()` hook
- Fetch dari `/api/auth/me` saat mount
- Simpan `{ user, isLoading, logout }`

#### [MODIFY] `src/app/layout.tsx`
- Bungkus `children` dengan `<AuthProvider>`

---

### 6. Update Halaman Login

#### [MODIFY] `src/app/auth/login/page.tsx`
- Ganti mock hardcode → `fetch('/api/auth/login', { method: 'POST', body: ... })`
- Handle response: redirect sesuai role dari response API
- Tampilkan error message jika login gagal

---

### 7. Update Halaman Register (Siswa, Guru, Dinas)

#### [MODIFY] `src/app/auth/register/step-2/page.tsx` (Siswa)
- Hubungkan form submit ke `POST /api/auth/register` dengan `role: "STUDENT"`

#### [MODIFY] `src/app/auth/register/guru/page.tsx`
- Hubungkan form submit ke `POST /api/auth/register` dengan `role: "TEACHER"`
- Tampilkan halaman konfirmasi "Akun dikirim untuk verifikasi"

#### [MODIFY] `src/app/auth/register/dinas/page.tsx`
- Hubungkan form submit ke `POST /api/auth/register` dengan `role: "DINAS"`
- Tampilkan halaman konfirmasi "Akun dikirim untuk verifikasi"

---

### 8. Halaman Konfirmasi Pending

#### [NEW] `src/app/auth/register/pending/page.tsx`
- Halaman statis yang muncul setelah registrasi Guru/Dinas berhasil
- Pesan: "Akun Anda sedang ditinjau. Kami akan menghubungi via email."

---

### 9. Perbarui Schema Prisma (opsional tapi direkomendasikan)

#### [MODIFY] `prisma/schema.prisma`
- Tambah field `isVerified Boolean @default(true)` pada User
- Untuk Guru/Dinas, set `isVerified: false` saat register
- Setelah admin approve → set `isVerified: true`

---

## Verification Plan

### Automated Tests
Tidak ada test runner terpasang. Verifikasi manual.

### Manual Verification

1. **Login Siswa**: Daftar akun STUDENT → login → redirect ke `/siswa/dashboard` ✓
2. **Login Guru**: Daftar akun TEACHER → akun pending → tidak bisa login → admin approve → login → redirect `/guru/dashboard` ✓  
3. **Middleware Block**: Akses `/admin/dashboard` tanpa login → redirect ke `/auth/login` ✓
4. **Cross-role Block**: Login sebagai STUDENT → akses `/guru/dashboard` → redirect ke `/siswa/dashboard` ✓
5. **Logout**: Klik logout → cookie dihapus → redirect ke `/` ✓
6. **Persistent Session**: Reload halaman → tetap login (cookie masih ada) ✓

---

## Urutan Eksekusi

```
[ ] 1. Install jose + bcryptjs
[ ] 2. Buat src/lib/auth.ts (JWT helpers)
[ ] 3. Buat POST /api/auth/login
[ ] 4. Buat POST /api/auth/register
[ ] 5. Buat POST /api/auth/logout
[ ] 6. Buat GET /api/auth/me
[ ] 7. Buat src/middleware.ts
[ ] 8. Buat AuthContext + useUser hook
[ ] 9. Update layout.tsx dengan AuthProvider
[10. Update login/page.tsx (hubungkan ke API)
[11. Update register pages (siswa, guru, dinas)
[12. Buat halaman /auth/register/pending
[13. Verifikasi end-to-end
```
