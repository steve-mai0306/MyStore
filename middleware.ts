import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected routes
const protectedRoutes = [{ path: "/admin" }, { path: "/vendor" }];

// Define public routes
const publicRoutes = ["/", "/authen"];

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const accessToken = token?.accessToken;
  const role = token?.role;
  const { pathname } = request.nextUrl;

  console.log("Middleware role:", role);

  // If no token and trying to access protected routes, redirect to login
  if (!accessToken) {
    if (pathname.startsWith("/authen")) {
      return NextResponse.next(); // Allow access to login/signup
    }

    // Check if trying to access protected route
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route.path)
    );
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/authen", request.url));
    }

    // Allow access to public routes without token
    if (publicRoutes.includes(pathname)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/authen", request.url));
  }

  if (role === "Vendor") {
    const allowedVendorPaths = [
      "/vendor/dashboard",
      "/vendor/profile",
      "/vendor/[slug]",
    ];
    const isAllowed = allowedVendorPaths.some(
      (path) => pathname === path || pathname.startsWith("/vendor/")
    );

    if (!isAllowed) {
      return NextResponse.redirect(new URL("/vendor/dashboard", request.url));
    }
  }

  if (role === "Admin") {
    if (pathname !== "/admin/dashboard" && pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/vendor/dashboard", request.url));
    }
    // Prevent access to non-vendor routes
    if (!pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  // If user has token and tries to access auth pages, redirect to home
  if (accessToken && pathname.startsWith("/authen")) {
    if (role === "Vendor") {
      return NextResponse.redirect(new URL("/vendor/dashboard", request.url));
    }
    // Default: customer or other roles go to home
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/authen", "/admin/:path*", "/vendor/:path*"],
};
