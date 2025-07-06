// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your Auth.js session by default
  function middleware(req) {
    // You can add more granular authorization logic here if needed,
    // e.g., role-based checks from req.nextauth.token.role
    // console.log("Middleware token:", req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Return true if the user is authorized (token exists), false otherwise.
        // If false, NextAuth will redirect to the sign-in page defined in `pages.signIn`
        return !!token;
      },
    },
    pages: {
        signIn: "/login", // Crucial: Make sure this matches your login page path
    }
  }
);

export const config = {
  // Specify which paths the middleware should run on.
  // This example protects all paths under /dashboard and /profile.
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    // Add other paths you want to protect here, e.g., "/settings", "/admin/:path*"
  ],
};