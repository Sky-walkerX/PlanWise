// src/lib/authOptions.ts
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"; // For password comparison

// Import PrismaClient from your generated client
import { PrismaClient } from "@/app/generated/prisma";
const prisma = new PrismaClient(); // Instantiate Prisma Client

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt", // Use JWT strategy for stateless sessions
  },
  providers: [
    // --- Google OAuth Provider ---
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // --- Credentials Provider (for Email/Password Login) ---
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        // 1. Find user by email in your database using your Prisma User model
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        // If no user found or password field is empty (e.g., Google-only user)
        if (!user || !user.password) {
          throw new Error("No user found with this email or password not set");
        }

        // 2. Compare provided password with hashed password from database
        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Invalid credentials");
        }

        // 3. If credentials are valid, return the user object.
        // This object will be added to the JWT and session.
        // Only return properties you want exposed to the client.
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          // Do NOT return the password here!
        };
      },
    }),
  ],
  pages: {
    signIn: "/login", // Custom sign-in page
    // error: "/auth/error", // Optional: Custom error page
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // On initial sign-in, `user` object will be available from `authorize` or OAuth provider
      if (user) {
        token.id = user.id; // Add user ID to the token
        token.email = user.email; // Add email to token
        token.name = user.name; // Add name to token

        // If you need to store provider-specific tokens (e.g., Google accessToken), do it here
        if (account?.provider === "google" && account.access_token) {
          token.accessToken = account.access_token;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // The `token` object comes from the `jwt` callback
      // Populate session.user with data from the token
      if (token.id) {
        session.user.id = token.id as string;
      }
      if (token.email) {
        session.user.email = token.email as string;
      }
      if (token.name) {
        session.user.name = token.name as string;
      }
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  // If you want to link OAuth accounts to existing credential users, or use
  // database sessions (instead of JWT), you would uncomment and install an adapter:
  // adapter: PrismaAdapter(prisma), // Requires `npm install @next-auth/prisma-adapter`
};

// Optional: Type augmentation for session and user
// Extend the default NextAuth types to include your custom properties
declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add id to user in session
      name?: string | null;
      email?: string | null;
      image?: string | null; // For OAuth providers
    };
    accessToken?: string; // Add accessToken to session (e.g., from Google)
  }

  interface User {
    id: string; // Add id to user type
    name?: string | null;
    email?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string; // Add id to JWT
    email?: string | null; // Add email to JWT
    name?: string | null; // Add name to JWT
    accessToken?: string; // Add accessToken to JWT
  }
}