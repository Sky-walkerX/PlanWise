// app/login/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/dashboard"); // Redirect to a protected page on success
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google"); // Triggers Google OAuth flow
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleCredentialsSignIn}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: "100%", padding: "8px" }} />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: "100%", padding: "8px" }} />
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Sign In with Email
        </button>
      </form>

      <div style={{ textAlign: "center", margin: "20px 0" }}>OR</div>

      <button
        onClick={handleGoogleSignIn}
        style={{ width: "100%", padding: "10px", backgroundColor: "#DB4437", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
      >
        Sign In with Google
      </button>

      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Don't have an account? <Link href="/signup">Sign Up</Link>
      </p>
    </div>
  );
}