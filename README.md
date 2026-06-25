# Vessify Frontend

> Multi-tenant personal finance transaction extractor — Next.js 15 frontend with Better Auth session management.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Auth | Better Auth client |
| UI | shadcn/ui + Tailwind CSS |
| Deployment | Vercel |

## Live URL

```
https://your-app.vercel.app
```

## Setup

### 1. Clone and install

```bash
git clone https://github.com/yourusername/vessify-frontend
cd vessify-frontend
npm install
```

### 2. Environment variables

```bash
cp .env.local.example .env.local
```

Fill in `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
BETTER_AUTH_SECRET=same-secret-as-backend
```

> `BETTER_AUTH_SECRET` must be identical to the backend secret.

### 3. Run the dev server

```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

> The backend must be running on port 3001 before starting the frontend.

## Deploying to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Add environment variables in Vercel dashboard:
```
   NEXT_PUBLIC_API_URL=https://your-render-url.onrender.com
   BETTER_AUTH_SECRET=same-secret-as-backend
```
4. Deploy — Vercel auto-detects Next.js, no build config needed

> After deploying, update `trustedOrigins` in the backend `src/lib/auth.ts`
> to include your Vercel URL, then redeploy the backend.

## Project Structure

```
app/
├── page.tsx              # Protected home — Server Component, checks session
├── login/
│   └── page.tsx          # Login form — Client Component
└── register/
    └── page.tsx          # Register form — calls custom /api/auth/register
components/
├── TransactionForm.tsx   # Textarea + Parse & Save — Client Component
└── TransactionTable.tsx  # Paginated table with Load More — Client Component
lib/
├── auth-client.ts        # Better Auth browser client (signIn, signOut, useSession)
└── auth-server.ts        # Better Auth server instance (getSession in Server Components)
middleware.ts             # Edge middleware — redirects unauthenticated users to /login
```

## How Auth Works

```
Register → Custom /api/auth/register (creates User + Org atomically)
Login    → Better Auth /api/auth/sign-in/email (sets httpOnly session cookie)
Protected pages → middleware checks cookie → Server Component validates session
API calls → credentials: 'include' sends cookie → backend verifies via getSession()
```

## Test Credentials

```
User 1: alice@test.com  /  Pass123!  (Alice Org)
User 2: bob@test.com    /  Pass123!  (Bob Org)
```

Open User 2 in an incognito window to test data isolation between orgs.

## AI Tools Used

Claude (claude.ai) was used for component architecture, debugging React
rendering issues, and Better Auth frontend integration.
All generated code was reviewed and understood line by line before committing.