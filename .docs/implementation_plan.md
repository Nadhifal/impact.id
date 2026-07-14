# Implementation Plan: Student Dashboard, Challenges, and Portfolio Pages (With Mobile Drawer)

We will implement the complete student experience (`/siswa`) by building the three main desktop views matching your design assets and adding a mobile sidebar drawer matching `Aside - Sidebar Drawer.png`.

## Proposed Changes

### 1. Shared Layouts

#### [NEW] [layout.tsx](file:///c:/Users/kzndi/kzn/frontend/src/app/siswa/layout.tsx)
- Sets up the parent layout wrapping all student routes with `Header` and `Footer`. Handles mobile drawer open/close state.

#### [MODIFY] [header.tsx](file:///c:/Users/kzndi/kzn/frontend/src/app/siswa/layouts/header.tsx)
- Desktop header: Logo, desktop nav links (`Dashboard`, `Challenges`, `Impact Map`, `Portofolio`), notification, settings, avatar.
- Mobile header: Hamburger menu button on the left, Logo, profile avatar on the right.
- Integrates the mobile sidebar drawer triggered by the hamburger button.

#### [MODIFY] [sidebar.tsx](file:///c:/Users/kzndi/kzn/frontend/src/app/siswa/layouts/sidebar.tsx)
- Implements the mobile drawer exactly matching `Aside - Sidebar Drawer.png`:
  - Avatar, Name ("Difal"), Role ("MAHASISWA").
  - Navigation menu list: `Dashboard`, `Challenges`, `Impact Map`, `Portofolio`.
  - "Growth Support" Section with purple `AI Mentor` banner ("AI Mentor", "Get Guidance").
  - Footer actions: `Settings`, `Logout`, and copyright text.

#### [MODIFY] [footer.tsx](file:///c:/Users/kzndi/kzn/frontend/src/app/siswa/layouts/footer.tsx)
- Implements the student portal footer and adds the green FAB `+` button in the bottom-right corner.

---

### 2. Pages and Data
We will create/update the pages under `/siswa`:
- **Dashboard** (`/siswa/dashboard`):
  - [data.ts](file:///c:/Users/kzndi/kzn/frontend/src/app/siswa/dashboard/data.ts)
  - [page.tsx](file:///c:/Users/kzndi/kzn/frontend/src/app/siswa/dashboard/page.tsx)
- **Challenges** (`/siswa/challenges`):
  - [data.ts](file:///c:/Users/kzndi/kzn/frontend/src/app/siswa/challenges/data.ts)
  - [page.tsx](file:///c:/Users/kzndi/kzn/frontend/src/app/siswa/challenges/page.tsx)
- **Portfolio** (`/siswa/portofolio`):
  - [data.ts](file:///c:/Users/kzndi/kzn/frontend/src/app/siswa/portofolio/data.ts)
  - [page.tsx](file:///c:/Users/kzndi/kzn/frontend/src/app/siswa/portofolio/page.tsx)

## Verification Plan
- Build and run check (`npm run build`).
- Verify drawer toggle works smoothly on mobile/responsive breakpoints.
