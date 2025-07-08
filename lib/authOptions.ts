// src/lib/authOptions.ts
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"; // For password comparison

// IMPORT THE GLOBAL PRISMA CLIENT HERE
import prisma from "@/lib/prisma"; // <--- CHANGE THIS LINE

export const authOptions: NextAuthOptions = {
  // You already have 'session: { strategy: "jwt" }' which means no adapter is explicitly needed
  // for session management (JWTs are stateless).
  // However, the CredentialsProvider still needs Prisma to look up users in your DB.
  // adapter: PrismaAdapter(prisma), // REMOVED as per your request to not use adapter

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

        // Use the imported global prisma instance here
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          throw new Error("No user found with this email or password not set");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login", // Added for better error redirection
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.sub = user.id; // Explicitly set 'sub' as it's critical for getToken validation
        token.email = user.email;
        token.name = user.name;

        if (account?.provider === "google" && account.access_token) {
          token.accessToken = account.access_token;
        }
      }
      return token;
    },
    async session({ session, token }) {
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
};

// Type augmentations remain the same
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    accessToken?: string;
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string | null;
    name?: string | null;
    accessToken?: string;
  }
}