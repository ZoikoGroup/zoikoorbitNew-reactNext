"use client";

import { useState, useEffect, Suspense, type SyntheticEvent } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import SocialButtons from "./SocialButtons";

function LoginPageContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const redirect = searchParams?.get("redirect");
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  // ✅ Check login using localStorage only
  useEffect(() => {
    const token = localStorage.getItem("zoikoorbit_token");
    if (token) {
      router.push(callbackUrl);
    }
  }, [callbackUrl, router]);

  const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    // ✅ Validate email before API call
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  setError("Please enter a valid email ID");
  setLoading(false);
  return;
}
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/accounts/login/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const text = await res.text();
      let data: any;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server error. Check API URL.");
      }

      if (!res.ok) throw new Error(data?.message || "Invalid credentials");

      // ✅ Save token
      localStorage.setItem("zoikoorbit_token", data.token);
      localStorage.setItem("zoikoorbit_user", JSON.stringify(data.user));

      window.dispatchEvent(new Event("authChanged"));

      router.replace(redirect || "/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex items-center justify-center px-4 py-10 dark:bg-gray-900 dark:text-white">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div className="w-full max-w-md mx-auto">

          <Link href="/" className="text-sm dark:bg-gray-900 dark:text-white text-gray-500 mb-4 inline-block">
            ← Back to Site
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/image/Rectangle 14.png"
              alt="Logo"
              width={140}
              height={40}
              priority
            />
          </div>

          <h1 className="text-3xl font-bold mb-2">
            Welcome back!
          </h1>

          <p className="text-gray-500 mb-6 text-sm">
            Enter your credentials to access your account.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-sm font-medium">
                Username or Email Address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Username or Email"
                className="w-full mt-1 px-4 py-3 rounded-lg border dark:bg-gray-900 dark:text-white bg-gray-50 focus:ring-2 focus:ring-teal-600"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center ">
                <label className="text-sm font-medium">
                  Password
                </label>
                <Link href="/forgot-password" className="text-sm text-teal-600">
                  Forgot Password?
                </Link>
              </div>

              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-10 rounded-lg border dark:bg-gray-900 dark:text-white bg-gray-50 focus:ring-2 focus:ring-teal-600"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-[#2f6f66] text-white font-semibold hover:bg-teal-500"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            {/* Footer */}
            <p className="text-center text-sm text-gray-500 mt-4">
              Don't have an account?{" "}
              <Link href="/register" className="text-teal-700 font-semibold">
                Sign Up
              </Link>
            </p>

            {/* Social login (Google + Facebook) */}
            <SocialButtons
              redirectTo={redirect || callbackUrl}
              onError={setError}
            />

          </form>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden md:flex justify-end">
          <div className="relative w-[420px] h-[560px] rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="/image/Group-1597883272.webp"
              alt="Login"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}