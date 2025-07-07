"use client"

import type React from "react"
import { useState } from "react"
import { Mail, ArrowLeft, CheckCircle} from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Failed to send reset email")
      } else {
        setIsSuccess(true)
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "An unexpected error occurred.")
      } else {
        setError("An unexpected error occurred.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primarybg)] via-[var(--secondarybg)]/30 to-[var(--primarybg)] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--mutedbg) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {/* <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent1bg)] to-[var(--accent1bg)]/80 flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div> */}
            <div>
              <h1 className="text-3xl font-bold text-[var(--accent2bg)]">PlanWise</h1>
              <p className="text-[var(--mutedbg)] text-sm">Stay focused, get things done</p>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white/70 dark:bg-[var(--primarybg)]/80 backdrop-blur-sm rounded-2xl shadow-xl border border-[var(--secondarybg)] p-8">
            {!isSuccess ? (
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-full bg-[var(--secondarybg)] flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-[var(--accent1bg)]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--accent2bg)] mb-2">Forgot Password?</h2>
                  <p className="text-[var(--mutedbg)] leading-relaxed">
                    No worries! Enter your email address and we&apos;ll send you a link to reset your password.
                  </p>
                </div>

                {error && (
                  <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 dark:bg-red-950 dark:border-red-800">
                    <p className="text-red-800 dark:text-red-200 text-sm font-medium">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--accent2bg)] mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--mutedbg)]" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email address"
                        className="pl-10 h-12 border-[var(--secondarybg)] bg-[var(--primarybg)] text-[var(--accent2bg)] placeholder:text-[var(--mutedbg)] focus:border-[var(--accent1bg)] focus:ring-[var(--accent1bg)]"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-[var(--accent1bg)] hover:bg-[var(--accent1bg)]/90 text-white font-medium rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending reset link...
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <Link
                    href="/login"
                    className="inline-flex items-center text-[var(--accent1bg)] hover:text-[var(--accent1bg)]/80 font-medium transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Sign In
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 dark:bg-green-900">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-300" />
                </div>
                <h2 className="text-2xl font-bold text-[var(--accent2bg)] mb-2">Check Your Email</h2>
                <p className="text-[var(--mutedbg)] mb-6 leading-relaxed">
                  We&apos;ve sent a password reset link to{" "}
                  <strong className="text-[var(--accent2bg)]">{email}</strong>
                </p>
                <div className="space-y-4">
                  <p className="text-sm text-[var(--mutedbg)]">
                    Didn&apos;t receive the email? Check your spam folder or try again.
                  </p>
                  <Button
                    onClick={() => {
                      setIsSuccess(false)
                      setEmail("")
                    }}
                    variant="outline"
                    className="w-full border-[var(--secondarybg)] text-[var(--accent2bg)] hover:bg-[var(--secondarybg)]/50"
                  >
                    Try Again
                  </Button>
                  <Link
                    href="/login"
                    className="inline-flex items-center text-[var(--accent1bg)] hover:text-[var(--accent1bg)]/80 font-medium transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Sign In
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-sm text-[var(--mutedbg)]">
              Need help? Contact our{" "}
              <Link
                href="/support"
                className="text-[var(--accent1bg)] hover:text-[var(--accent1bg)]/80 font-medium"
              >
                support team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
