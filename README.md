# Vessify Frontend

Minimal Next.js app for Vessify with authenticated transaction parsing and management.

## Overview

- `app/login/page.tsx` - login UI using Better Auth
- `app/register/page.tsx` - registration flow with org creation
- `app/page.tsx` - protected transaction dashboard
- `middleware.ts` - protects app routes and allows auth API access
- `lib/auth-client.ts` - Better Auth client configuration
- `lib/auth-server.ts` - server-side session validation

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open the frontend in your browser:

```text
http://localhost:3000
```

## Environment

Copy or create `.env.local` with:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
BETTER_AUTH_SECRET="your-better-auth-secret"
```

The frontend uses a Next.js rewrite to proxy `/api/*` requests to the backend on `http://localhost:3001`.

## Auth flow

- Frontend uses same-origin auth routes under `/api/auth`
- Login and register requests are proxied to the backend
- Session cookie is managed by Better Auth
- The protected homepage checks session state server-side and redirects unauthenticated users to `/login`

## Run build

```bash
npm run build
```

## Notes

- Backend must be running at `http://localhost:3001`
- The backend needs `DATABASE_URL` and `BETTER_AUTH_URL` configured
