import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get the token from cookies
  const token = request.cookies.get("sb-access-token")?.value

  // If accessing root path, redirect based on auth status
  if (pathname === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/crm/dashboard", request.url))
    } else {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  // Protected routes that require authentication
  const protectedRoutes = ["/crm", "/dashboard", "/minha-conta", "/financeiro"]
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // Auth routes that should redirect if already logged in
  const authRoutes = ["/auth/login", "/auth/register", "/login"]
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  // If trying to access protected route without token, redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/auth/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If trying to access auth routes with token, redirect to dashboard
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/crm/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
