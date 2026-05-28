# Artistry Online (Frontend)

Modern art marketplace frontend built with Next.js App Router, TypeScript, Material UI, Firebase, and Cloudinary.

## Project Overview

Artistry Online is a portfolio-ready marketplace where users can:
- sign up/sign in with Firebase Auth
- upload artworks with Cloudinary image hosting
- browse a dynamic Firestore-powered feed
- like, comment, and save artworks
- manage personal uploads from dashboard
- edit profile and view artist pages
- receive in-app notifications for likes/comments

## Core Features

- **Authentication:** Firebase email/password auth
- **Artwork Upload:** App Router upload API + Cloudinary
- **Dynamic Feed:** Firestore-backed homepage/explore cards
- **Artwork Details:** Firestore-driven detail page
- **Likes & Saved:** Firestore likes collection with realtime state
- **Comments:** Firestore comments by artwork
- **Notifications:** Firestore notifications with unread badge
- **Dashboard:** User-scoped uploads with edit/delete
- **Profiles:** Dynamic `/profile/[id]` artist pages + edit profile

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19
- **Language:** TypeScript
- **UI:** Material UI + Framer Motion
- **Backend Services:** Firebase Auth + Firestore
- **Media Hosting:** Cloudinary
- **Tooling:** ESLint

## Installation

1. Clone the repo
2. Install dependencies:

```bash
npm install
```

3. Create local env file:

```bash
cp .env.example .env.local
```

4. Fill all required environment variables (see below)
5. Start dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Add the following to `.env.local`:

```env
# Public Firebase config
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Server-only Cloudinary config
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Notes:
- `NEXT_PUBLIC_*` variables are exposed to browser by design.
- Keep Cloudinary secrets server-only (no `NEXT_PUBLIC_` prefix).

## Firestore Collections

- `artworks`
- `likes`
- `comments`
- `notifications`
- `users`

## Scripts

```bash
npm run dev    # start local development
npm run lint   # run lint checks
npm run build  # production build
npm run start  # run production server
```

## Deployment

Recommended: Vercel

1. Push repository to GitHub
2. Import project in Vercel
3. Set all environment variables in Vercel Project Settings
4. Deploy
5. Verify:
   - auth flow
   - artwork upload
   - likes/comments/notifications
   - profile edit and dashboard actions

## Production Safety Checklist

- Firebase Auth enabled
- Firestore security rules configured for ownership and read/write access
- Cloudinary credentials set as server-side secrets
- No secrets committed to repo
- Build succeeds with `npm run build`

## License

For academic and portfolio use. Add your preferred license before public release.
