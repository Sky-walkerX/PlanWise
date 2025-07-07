"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Separator } from "@/app/components/ui/separator"
import { Alert, AlertDescription } from "@/app/components/ui/alert"
import { Eye, EyeOff, Mail, Lock, Sparkles, CheckCircle2, Timer, BarChart3, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

   const loginMutation = useMutation({
    mutationFn: async () => {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      // --- ADD THIS CONSOLE LOG ---
      console.log("SIGN-IN RESULT FROM SERVER:", result);
      // -----------------------------

      if (result?.error) {
        // The error property will contain the message from your `authorize` function
        throw new Error(result.error);
      }
      if (!result?.ok) {
        // Handle other non-ok but non-error scenarios if any
        throw new Error("Login failed. Please check your credentials.");
      }
      return result;
    },
    onSuccess: (data) => {
      // --- ADD THIS CONSOLE LOG ---
      console.log("Login successful on client, redirecting...", data);
      // -----------------------------
      router.push("/"); // Or ideally to a dashboard page like "/tasks"
    },
    onError: (err: Error) => {
      setError(err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    loginMutation.mutate()
  }

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primarybg)] via-[var(--primarybg)] to-[var(--secondarybg)] flex items-center justify-center p-4">

      {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fillRule=\"evenodd\"%3E%3Cg fill=\"%23F87777\" fillOpacity=\"0.03\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] dark:bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fillRule=\"evenodd\"%3E%3Cg fill=\"%23EF4444\" fillOpacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div> */}
      
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Branding & Features */}
        <div className="hidden lg:block space-y-8">
          {/* Logo & Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {/* <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent1bg)] to-[var(--accent1bg)]/80 flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div> */}
              <div>
                <h1 className="text-3xl font-bold text-[var(--accent2bg)] ">
                  PlanWise
                </h1>
                <p className="text-[var(--mutedbg)] dark:text-[var(--mutedbgdark)]">
                  Stay focused, get things done
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-[var(--accent2bg)] ">
                Welcome back to your productivity hub
              </h2>
              <p className="text-[var(--mutedbg)]  text-lg">
                Sign in to continue managing your tasks with AI-powered insights
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[var(--secondarybg)]  flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[var(--accent1bg)] " />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--accent2bg)] ">
                  Smart Task Management
                </h3>
                <p className="text-[var(--mutedbg)]  text-sm">
                  AI-powered task organization and prioritization
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[var(--secondarybg)]  flex items-center justify-center">
                <Timer className="w-5 h-5 text-[var(--accent1bg)] " />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--accent2bg)] ">
                  Pomodoro Timer
                </h3>
                <p className="text-[var(--mutedbg)]  text-sm">
                  Built-in focus sessions with productivity tracking
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[var(--secondarybg)] flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-[var(--accent1bg)] " />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--accent2bg)] ">
                  Analytics & Insights
                </h3>
                <p className="text-[var(--mutedbg)] text-sm">
                  Track your productivity patterns and achievements
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          {/* <div className="p-6 rounded-xl bg-[var(--secondarybg)]/30 border border-[var(--secondarybg)] dark:border-[var(--secondarybgdark)]">
            <p className="text-[var(--accent2bg)]  italic mb-3">
              "PlanWise transformed how I manage my daily tasks. The AI suggestions are incredibly helpful!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--accent1bg)]  flex items-center justify-center text-white text-sm font-semibold">
                S
              </div>
              <div>
                <p className="font-medium text-[var(--accent2bg)]  text-sm">
                  Sarah Chen
                </p>
                <p className="text-[var(--mutedbg)] text-xs">
                  Product Manager
                </p>
              </div>
            </div>
          </div> */}
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <Card className="bg-[var(--primarybg)]/80 backdrop-blur-sm border-[var(--secondarybg)] dark:border-[var(--secondarybgdark)] shadow-xl">
            <CardHeader className="space-y-1 text-center">
              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent1bg)] to-[var(--accent1bg)]/80 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-[var(--accent2bg)] ">
                  PlanWise
                </span>
              </div>

              <CardTitle className="text-2xl font-bold text-[var(--accent2bg)] ">
                Welcome back
              </CardTitle>
              <CardDescription className="text-[var(--mutedbg)] ">
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {error && (
                <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                  <AlertDescription className="text-red-800 dark:text-red-200">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-[var(--accent2bg)]">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--mutedbg)]" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="pl-10 bg-[var(--secondarybg)]/50 border-[var(--secondarybg)] text-[var(--accent2bg)]  placeholder:text-[var(--mutedbg)] focus:border-[var(--accent1bg)]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-[var(--accent2bg)] ">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--mutedbg)]" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 bg-[var(--secondarybg)]/50 border-[var(--secondarybg)]  text-[var(--accent2bg)] placeholder:text-[var(--mutedbg)] focus:border-[var(--accent1bg)] "
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-[var(--mutedbg)]" />
                      ) : (
                        <Eye className="w-4 h-4 text-[var(--mutedbg)]" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      id="remember"
                      type="checkbox"
                      className="w-4 h-4 text-[var(--accent1bg)] bg-[var(--secondarybg)] border-[var(--mutedbg)] rounded focus:ring-[var(--accent1bg)]"
                    />
                    <label htmlFor="remember" className="text-sm text-[var(--mutedbg)]">
                      Remember me
                    </label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-[var(--accent1bg)] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="w-full bg-[var(--accent1bg)] hover:bg-[var(--accent1bg)]/90 text-white font-medium py-2.5 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {loginMutation.isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Signing in...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Sign in
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full bg-[var(--secondarybg)]" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[var(--primarybg)] px-2 text-[var(--mutedbg)]">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                className="w-full border-[var(--secondarybg)] text-[var(--accent2bg)] hover:bg-[var(--secondarybg)]/50 transition-all duration-200 bg-transparent"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <div className="text-center">
                <p className="text-sm text-[var(--mutedbg)] ">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-[var(--accent1bg)] font-medium hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
