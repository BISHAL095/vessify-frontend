import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const hasAuthCookie = req.cookies
    .getAll()
    .some(c => c.name === 'better-auth.session_token')

  if (!hasAuthCookie) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}