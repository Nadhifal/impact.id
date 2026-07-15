# Integrasi Frontend → Backend (Next.js API Routes + Prisma SQLite)

## Ringkasan

Seluruh halaman saat ini menggunakan data dummy dari file `data.ts` lokal di tiap folder page.
Tujuan integrasi ini adalah menghubungkan setiap halaman ke **API Routes yang sudah ada** (`/api/challenges`, `/api/portfolios`, `/api/mentor`) dan ke **database SQLite via Prisma**, serta menambahkan API baru yang diperlukan.

---

## Arsitektur yang Ada

```
Database (SQLite via Prisma)
       ↕
Next.js API Routes (/app/api/*)
       ↕
React Pages & Components
```

### API Routes yang Sudah Ada
| Route | Method | Fungsi |
|---|---|---|
| `/api/challenges/[id]` | GET | Detail satu challenge |
| `/api/challenges/recommendations` | GET | Rekomendasi challenge by userId |
| `/api/portfolios` | POST | Generate portofolio + simulasi blockchain hash |
| `/api/mentor` | POST | AI Mentor chat (Gemini) |

### API Routes yang Perlu Dibuat
| Route | Method | Fungsi | Untuk Halaman |
|---|---|---|---|
| `/api/challenges` | GET | List semua challenge + filter | Siswa Challenges, Admin Manage |
| `/api/challenges` | POST | Create challenge baru | Admin Add Modal |
| `/api/challenges/[id]` | PUT | Edit challenge | Admin Edit Modal |
| `/api/challenges/[id]` | DELETE | Hapus challenge | Admin Table |
| `/api/portfolios/[userId]` | GET | List portofolio/sertifikat user | Siswa Portfolio |
| `/api/admin/stats` | GET | KPI stats dashboard admin | Admin Dashboard |
| `/api/users/[id]` | GET | Profil + skills siswa | Siswa Portfolio |

---

## Proposed Changes

### Lapisan 1: API Routes Baru

#### [NEW] `/api/challenges/route.ts` (GET + POST)
- **GET**: `findMany` challenges dari DB, support query params `?category=&search=`
- **POST**: `create` challenge baru di DB dari form modal admin

#### [MODIFY] `/api/challenges/[id]/route.ts` (tambah PUT + DELETE)
- **PUT**: `update` challenge di DB
- **DELETE**: `delete` challenge dari DB
- Fix pre-existing Next.js 15 `params` type error (await `context.params`)

#### [NEW] `/api/portfolios/[userId]/route.ts` (GET)
- Ambil semua `Portfolio` records milik user dari DB
- Return list sertifikat + metadata untuk halaman siswa portfolio

#### [NEW] `/api/admin/stats/route.ts` (GET)
- Hitung total challenges, total users, total submissions
- Return KPI stats untuk admin dashboard

#### [NEW] `/api/users/[id]/route.ts` (GET)
- Return user profile, skills, bio untuk halaman portfolio siswa

---

### Lapisan 2: Shared API Client

#### [NEW] `src/lib/api.ts`
Helper functions fetch yang digunakan di semua page:
```ts
export async function fetchChallenges(params?) { ... }
export async function createChallenge(data) { ... }
export async function updateChallenge(id, data) { ... }
export async function deleteChallenge(id) { ... }
export async function fetchPortfolios(userId) { ... }
export async function fetchAdminStats() { ... }
```

---

### Lapisan 3: Halaman & Komponen

#### Siswa — Challenges (`/siswa/challenges/page.tsx`)
- Konversi ke **Server Component** yang fetch challenges dari `/api/challenges`
- Filter tab (Semua/Teknologi/Pendidikan) tetap client-side dari data yang sudah di-fetch
- Smart Recommendation block → fetch dari `/api/challenges/recommendations?userId=...`

#### Siswa — Portfolio (`/siswa/portofolio/page.tsx`)
- Fetch user profile dari `/api/users/[id]`
- Fetch portofolio/sertifikat dari `/api/portfolios/[userId]`
- Data tetap di-pass sebagai props ke child components

#### Admin — Manage Challenge (`/admin/manage-challenge/page.tsx`)
- Fetch list challenges dari `/api/challenges`
- **ChallengeTable**: hapus import `challengesData` dari `data.ts`, terima `challenges` sebagai prop
- **AddChallengeModal**: `handleSave` memanggil `POST /api/challenges` atau `PUT /api/challenges/[id]`
- **Delete button**: memanggil `DELETE /api/challenges/[id]`

#### Admin — Dashboard (`/admin/dashboard/page.tsx`)
- Fetch KPI stats dari `/api/admin/stats`
- Charts tetap dummy (tidak ada data historis di DB)

---

## Open Questions

> [!IMPORTANT]
> **Autentikasi**: Belum ada session/auth middleware. Sementara ini `userId` di-hardcode sebagai konstanta `DEMO_USER_ID` untuk keperluan demo. Apakah perlu integrasi auth session di tahap ini?

> [!NOTE]
> **Dinas & Guru pages**: Halaman `/dinas` dan `/guru` menggunakan data regional agregat yang tidak ada di schema DB saat ini. Halaman-halaman ini akan **tetap pakai dummy data** dan tidak diintegrasikan kali ini — butuh schema extension dulu.

> [!NOTE]
> **Admin Dashboard Charts**: Data growth chart (tren bulanan) tidak ada di DB. Chart akan tetap pakai data dummy dari `data.ts`, hanya KPI cards yang diintegrasikan ke backend.

---

## Verification Plan

### Automated
```bash
npx tsc --noEmit  # pastikan tidak ada type error baru
```

### Manual
1. Buka `/admin/manage-challenge` → list challenges dari DB tampil
2. Klik "Tambah Challenge" → isi form → Submit → challenge baru muncul di tabel
3. Klik Edit → modal terisi data dari DB → simpan → update berhasil
4. Klik Delete → challenge hilang dari tabel
5. Buka `/siswa/challenges` → challenges dari DB tampil di grid
6. Buka `/siswa/portofolio` → data profil user dari DB tampil
