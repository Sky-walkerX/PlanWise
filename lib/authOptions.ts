// src/lib/authOptions.ts
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"; // For password comparison

// IMPORT THE GLOBAL PRISMA CLIENT HERE
import prisma from "@/lib/prisma"; // Your global Prisma client instance

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

        // Use the imported global prisma instance here to find the user
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

        // Return the user object from the database for credentials login
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
    error: "/login", // Redirect to login page on error for better UX
  },
  callbacks: {
    // --- IMPORTANT: This signIn callback is crucial for OAuth when NOT using PrismaAdapter ---
    async signIn({ user, account, profile }) {
      // This callback runs after a successful authentication with any provider
      // 'user' here is the object returned by the provider (e.g., Google profile for GoogleProvider)

      if (account?.provider === "google") {
        // This block handles users signing in via Google OAuth
        try {
          // Check if a user with this email already exists in your database
          let existingUser = await prisma.user.findUnique({
            where: { email: user.email as string },
          });

          if (!existingUser) {
            // If the user does NOT exist in your database, create a new User record
            console.log(`Creating new user in DB for OAuth: ${user.email}`);
            existingUser = await prisma.user.create({
              data: {
                // Use the ID provided by NextAuth.js/OAuth. This ID will be used as token.sub.
                // It's crucial that this ID matches the one NextAuth.js expects for the JWT.
                id: user.id,
                email: user.email as string,
                name: user.name,
                // Do NOT set a password for OAuth users here
                // Consider setting emailVerified if you trust the OAuth provider's verification
                // emailVerified: new Date(),
                // image: user.image, // If your User model has an 'image' field
              },
            });
          } else {
            // If the user already exists, you might want to update their details
            // (e.g., name, image) if they've changed on the OAuth provider's side.
            console.log(`Existing user found in DB for OAuth: ${user.email}`);
            // Example: Update name if it's different
            // if (existingUser.name !== user.name) {
            //   await prisma.user.update({
            //     where: { id: existingUser.id },
            //     data: { name: user.name },
            //   });
            // }
          }

          // Crucially, ensure the 'user' object passed to the 'jwt' callback
          // contains the 'id' from your database.
          // For OAuth, NextAuth.js provides an ID, and we've now ensured it's in our DB.
          // For credentials, 'user.id' already comes from the DB in 'authorize'.
          user.id = existingUser.id; // Make sure the ID is the one from your DB
          return true; // Allow the sign-in to proceed
        } catch (error) {
          console.error("Error in signIn callback (OAuth user DB handling):", error);
          return false; // Prevent sign-in if there's a database error
        }
      }

      // For Credentials Provider, the 'authorize' function already returns a user with a DB ID,
      // so we can simply allow the sign-in to proceed.
      return true;
    },

    async jwt({ token, user, account }) {
      // 'user' object is only present on the first sign-in or if using a database adapter.
      // After the 'signIn' callback, 'user.id' will be the ID from your database.
      if (user) {
        token.id = user.id;
        token.sub = user.id; // Explicitly set 'sub' as it's critical for getToken validation
        token.email = user.email;
        token.name = user.name;

        // Store OAuth-specific tokens if needed for API calls
        if (account?.provider === "google" && account.access_token) {
          token.accessToken = account.access_token;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Populate session.user with data from the token (which comes from the JWT callback)
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

// --- Type augmentations (remain the same) ---
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
    id: string; // The ID of the user in your database
    name?: string | null;
    email?: string | null;
    // Add any other user properties you return from `authorize` or expect from OAuth providers
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
