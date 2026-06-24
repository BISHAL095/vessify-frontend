import { createAuthClient } from 'better-auth/react'

// Client-side Better Auth instance — used in client components only
// Use a same-origin API base path so cookies are managed by the browser
export const authClient = createAuthClient({
  basePath: '/api/auth',
})

export const { signIn, signUp, signOut, useSession } = authClient