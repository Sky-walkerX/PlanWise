import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextAuthSessionProvider from "./components/Providers";
import { Providers } from "./components/QueryProviders";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "next-themes"; // Import ThemeProvider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlanWise",
  description: "A smart task management tool to help you plan and execute your tasks efficiently.",
  icons:{
    icon: "favicon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Add suppressHydrationWarning to the <html> tag
    // This tells React to suppress the hydration warning for this element and its attributes.
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--primarybg)] text-[var(--primarytext)]`}
      >
        <NextAuthSessionProvider>
          <Providers>
            {/* ThemeProvider correctly wraps your components */}
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Navbar />
              {children}
            </ThemeProvider>
          </Providers>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}