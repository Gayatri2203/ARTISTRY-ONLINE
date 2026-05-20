# Artistry Online — Navigation & Auth Integration

Integration applied to your existing project at `frontend/`.

## What changed

- **Zustand auth store** — `src/store/authStore.ts` (login, register, logout, persisted session)
- **API clients** — `src/lib/api/` (Spring Boot at `NEXT_PUBLIC_API_URL`)
- **Middleware** — `frontend/middleware.ts` protects `/dashboard`, `/upload`, `/profile/edit`
- **Navbar** — Profile avatar + MUI dropdown (Profile, Dashboard, Upload, Logout) when logged in
- **Login / Signup** — Wired to real API (with redirect after login)
- **Upload** — Publishes to API and redirects to `/artwork/[id]`
- **AppShell** — Navbar + Footer on dashboard, upload, profile, artwork pages
- **Links** — Explore/home cards → `/artwork/[id]`; artist name → `/profile/[username]`

## Setup

```powershell
cd C:\Users\Admin\Documents\ARTISTRY-ONLINE\frontend
copy .env.example .env.local
# Edit NEXT_PUBLIC_API_URL=http://localhost:8080/api
npm run dev
```

## Spring Boot API

Ensure CORS allows `http://localhost:3000` and endpoints match `src/lib/api/*.ts`.
