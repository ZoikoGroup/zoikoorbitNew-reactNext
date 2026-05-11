"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<any>({});
  const [success, setSuccess] = useState<string | null>(null);

  // ✅ Check login via localStorage
  useEffect(() => {
    const token = localStorage.getItem("zoikoorbit_token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const validate = () => {
    const errors: any = {};
    if (!name.trim()) errors.name = "Name is required";
    if (!email.trim()) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    return errors;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    if (!agreedToTerms) {
      setError("Please agree to the terms & policy.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/accounts/register/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: name.trim(),
            email: email.trim(),
            password,
            password2: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const msg =
          typeof data === "object"
            ? Object.values(data).flat().join(" | ")
            : data.message;
        throw new Error(msg || "Registration failed");
      }

      // ✅ AUTO LOGIN after register (if API returns token)
      if (data.token) {
        localStorage.setItem("zoikoorbit_token", data.token);
        localStorage.setItem("zoikoorbit_user", JSON.stringify(data.user));
        router.replace("/dashboard");
        return;
      }

      // ✅ If no token → redirect to login
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 1500);

    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex items-center justify-center px-4 py-10 dark:bg-gray-900 dark:text-white">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-6">Get Started Now</h1>

          <form onSubmit={handleRegister}>

            {/* Name */}
            <div className="mb-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full px-4 py-3 border rounded-lg"
              />
              {fieldErrors.name && <p className="text-red-500 text-xs">{fieldErrors.name}</p>}
            </div>

            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 border rounded-lg"
              />
              {fieldErrors.email && <p className="text-red-500 text-xs">{fieldErrors.email}</p>}
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-lg"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3"
              >
                {showPassword ? "🙈" : "👁"}
              </button>
              {fieldErrors.password && <p className="text-red-500 text-xs">{fieldErrors.password}</p>}
            </div>

            {/* Terms */}
            <div className="flex gap-2 mb-4">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
              />
              <span className="text-sm">Agree to terms</span>
            </div>

            {/* Messages */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#2f6f66] text-white rounded-lg mt-3"
            >
              {loading ? "Signing up..." : "Signup"}
            </button>

            {/* Footer */}
            <p className="text-sm mt-4">
              Have an account?{" "}
              <Link href="/login" className="text-teal-600">
                Login
              </Link>
            </p>

          </form>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden md:flex justify-end">
          <div className="relative w-[420px] h-[560px]">
            <Image
              src="/images/register-bg.webp"
              alt="Register"
              fill
              className="object-cover"
            />
          </div>
        </div>

      </div>
    </div>
  );
}