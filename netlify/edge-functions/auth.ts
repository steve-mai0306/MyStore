import type { Context } from "@netlify/edge-functions";
import jwt from "jsonwebtoken";

// Define protected and public routes
const protectedRoutes = ["/admin", "/vendor"];
const publicRoutes = ["/", "/authen"];

// Utility: parse cookies from request
function parseCookies(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  return Object.fromEntries(
    cookieHeader.split(";").map((c) => {
      const [k, ...v] = c.trim().split("=");
      return [k, decodeURIComponent(v.join("="))];
    })
  );
}

export default async function auth(request: Request, context: Context) {
  const url = new URL(request.url);
  const { pathname } = url;

  // Parse cookies
  const cookies = parseCookies(request);
  const rawToken =
    cookies["next-auth.session-token"] ||
    cookies["__Secure-next-auth.session-token"];

  let decoded: any = null;
  if (rawToken) {
    try {
      decoded = jwt.verify(rawToken, process.env.NEXTAUTH_SECRET!);
    } catch (err) {
      console.error("JWT verification failed:", err);
    }
  }

  const accessToken = decoded?.accessToken;
  const role = decoded?.role;

  console.log("Edge middleware role:", role);

  // No token
  if (!accessToken) {
    if (pathname.startsWith("/authen")) {
      return context.next();
    }

    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isProtectedRoute) {
      return Response.redirect(new URL("/authen", request.url));
    }

    if (publicRoutes.includes(pathname)) {
      return context.next();
    }

    return Response.redirect(new URL("/authen", request.url));
  }

  // Vendor restrictions
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
      return Response.redirect(new URL("/vendor/dashboard", request.url));
    }
  }

  // Admin restrictions
  if (role === "Admin") {
    if (pathname !== "/admin/dashboard" && pathname.startsWith("/admin")) {
      return Response.redirect(new URL("/vendor/dashboard", request.url));
    }
    if (!pathname.startsWith("/admin")) {
      return Response.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  // Prevent logged-in users from going back to auth pages
  if (accessToken && pathname.startsWith("/authen")) {
    if (role === "Vendor") {
      return Response.redirect(new URL("/vendor/dashboard", request.url));
    }
    return Response.redirect(new URL("/", request.url));
  }

  return context.next();
}

// Attach Edge function to routes
export const config = {
  path: "/*",
};
