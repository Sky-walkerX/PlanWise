// app/dashboard/page.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession(); // status can be "loading", "authenticated", "unauthenticated"
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>Loading session...</p>
      </div>
    );
  }

  if (session) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Welcome to your Dashboard, {session.user?.name || session.user?.email}!</h1>
        <p>You are signed in as: {session.user?.email}</p>
        <p>Your User ID: {session.user?.id}</p>
        {session.accessToken && <p>Access Token (example): {session.accessToken.substring(0, 10)}...</p>} {/* Show a snippet if you store it */}
        
        <button
          onClick={() => signOut({ callbackUrl: '/login' })} // Redirect to login after sign out
          style={{ padding: "10px 20px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "20px" }}
        >
          Sign Out
        </button>
      </div>
    );
  }

  // This part might not be reached if the useEffect handles redirect, but good for fallback
  return null;
}