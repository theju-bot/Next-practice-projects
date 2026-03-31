import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname.startsWith('/dashboard')) {
    const session = getSessionCookie(req)
    if (!session) {
      const redirectUrl = new URL('/auth', req.url)
      redirectUrl.searchParams.set('redirect', req.url)
      return NextResponse.redirect(redirectUrl)
    }
  }

  return NextResponse.next()
}
