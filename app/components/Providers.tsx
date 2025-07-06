// app/providers.tsx
"use client"; // This directive makes it a Client Component

import { SessionProvider } from "next-auth/react";
import React from "react";

export default function NextAuthSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}