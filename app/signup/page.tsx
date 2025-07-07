"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Sparkles,
  CheckCircle,
  Timer,
  BarChart3,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Checkbox } from "@/app/components/ui/checkbox";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!acceptTerms) {
      setError("Please accept the terms and conditions");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to register");
      } else {
        setSuccess(data.message || "Registration successful! Please log in.");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "An unexpected error occurred.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primarybg)] via-[var(--secondarybg)]/30 to-[var(--primarybg)] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--mutedbg) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left - Branding */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-16">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-8">
              <h1 className="text-3xl font-bold text-[var(--accent2bg)]">
                PlanWise
              </h1>
              <p className="text-[var(--mutedbg)] text-sm">
                Stay focused, get things done
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-4xl font-bold text-[var(--accent2bg)] mb-4">
                Join thousands of productive users
              </h2>
              <p className="text-lg text-[var(--mutedbg)] leading-relaxed">
                Start your productivity journey today with our intelligent task
                management system.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--secondarybg)] flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-[var(--accent1bg)]" />
                </div>
                <span className="text-[var(--accent2bg)] font-medium">
                  AI-powered task suggestions
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--secondarybg)] flex items-center justify-center">
                  <Timer className="w-4 h-4 text-[var(--accent1bg)]" />
                </div>
                <span className="text-[var(--accent2bg)] font-medium">
                  Built-in focus timer
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--secondarybg)] flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-[var(--accent1bg)]" />
                </div>
                <span className="text-[var(--accent2bg)] font-medium">
                  Detailed progress tracking
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Signup Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent1bg)] to-[var(--accent1bg)]/80 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-[var(--accent2bg)]">
                PlanWise
              </h1>
            </div>

            <div className="bg-white/70 dark:bg-[var(--primarybg)]/80 backdrop-blur-sm rounded-2xl shadow-xl border border-[var(--secondarybg)] p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[var(--accent2bg)] mb-2">
                  Create Account
                </h2>
                <p className="text-[var(--mutedbg)]">
                  Join PlanWise and boost your productivity
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 dark:bg-red-950 dark:border-red-800">
                  <p className="text-red-800 dark:text-red-200 text-sm font-medium">
                    {error}
                  </p>
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 dark:bg-green-950 dark:border-green-800">
                  <p className="text-green-800 dark:text-green-200 text-sm font-medium">
                    {success}
                  </p>
                </div>
              )}

              <form onSubmit={handleSignUp} className="space-y-6">
                <InputField
                  id="name"
                  label="Full Name"
                  value={name}
                  onChange={setName}
                  icon={<User />}
                  placeholder="Enter your full name"
                />
                <InputField
                  id="email"
                  label="Email Address"
                  value={email}
                  onChange={setEmail}
                  icon={<Mail />}
                  type="email"
                  placeholder="Enter your email"
                />
                <InputField
                  id="password"
                  label="Password"
                  value={password}
                  onChange={setPassword}
                  icon={<Lock />}
                  placeholder="Create a password"
                  passwordToggle
                  show={showPassword}
                  setShow={setShowPassword}
                />
                <InputField
                  id="confirmPassword"
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  icon={<Lock />}
                  placeholder="Confirm your password"
                  passwordToggle
                  show={showConfirmPassword}
                  setShow={setShowConfirmPassword}
                />

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) =>
                      setAcceptTerms(checked === true)
                    }
                    className="border-[var(--mutedbg)] data-[state=checked]:bg-[var(--accent1bg)] data-[state=checked]:border-[var(--accent1bg)] mt-1"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-[var(--accent2bg)] leading-relaxed"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-[var(--accent1bg)] hover:text-[var(--accent1bg)]/80 font-medium"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-[var(--accent1bg)] hover:text-[var(--accent1bg)]/80 font-medium"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-[var(--accent1bg)] hover:bg-[var(--accent1bg)]/90 text-white font-medium rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

              <p className="text-center mt-6 text-[var(--mutedbg)]">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[var(--accent1bg)] hover:text-[var(--accent1bg)]/80 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  passwordToggle = false,
  show,
  setShow,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  icon: React.ReactNode;
  type?: string;
  placeholder?: string;
  passwordToggle?: boolean;
  show?: boolean;
  setShow?: (val: boolean) => void;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[var(--accent2bg)] mb-2"
      >
        {label}
      </label>
      <div className="relative flex items-center">
        {/* <div className="absolute left-3 items-center flex -translate-y-1/2 w-4 h-4 text-[var(--mutedbg)]">
          {icon}
        </div> */}
        <Input
          id={id}
          type={passwordToggle ? (show ? "text" : "password") : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          placeholder={placeholder}
          className="pl-10 pr-10 h-12 border-[var(--secondarybg)] bg-[var(--primarybg)] text-[var(--accent2bg)] placeholder:text-[var(--mutedbg)] focus:border-[var(--accent1bg)] focus:ring-[var(--accent1bg)]"
        />
        {passwordToggle && setShow && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--mutedbg)] hover:text-[var(--accent2bg)] transition-colors"
          >
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
}
