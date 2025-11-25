import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Admin routes - only allow ADMIN role
    if (path.startsWith("/admin")) {
      if (token?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect all dashboard, properties, settings, and admin routes
        const path = req.nextUrl.pathname;
        
        // Public routes
        if (
          path.startsWith("/auth") ||
          path === "/" ||
          path.startsWith("/api/auth")
        ) {
          return true;
        }

        // Protected routes require authentication
        if (
          path.startsWith("/dashboard") ||
          path.startsWith("/properties") ||
          path.startsWith("/compliance") ||
          path.startsWith("/settings") ||
          path.startsWith("/admin") ||
          path.startsWith("/onboarding")
        ) {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/properties/:path*",
    "/compliance/:path*",
    "/settings/:path*",
    "/admin/:path*",
    "/onboarding/:path*",
  ],
};

