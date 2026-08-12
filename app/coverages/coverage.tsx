"use client";

import Image from "next/image";
import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: "/image/Group 1597883234 (8).png",
    label: "Data Protected Globally",
  },
  {
    icon: "/image/Group 1597883774.png",
    label: "Adaptive Roaming Across Time Zones",
  },
  {
    icon: "/image/Group 1597883234 (10).png",
    label: "24/7 Intelligent Support",
  },
  {
    icon: "/image/Group 1597883234 (11).png",
    label: "Enterprise-grade Network Switching",
  },
];

// ─── TYPES ───────────────────────────────────────────────────────────────────

type CheckStatus = "idle" | "loading" | "available" | "unavailable" | "error";

interface CoverageData {
  state?: string;
  city?: string;
  zip_code?: string;
  is_ebb?: string;
  is_lifeline?: string;
  is_tribal?: string;
  allowed_enrollment_type?: string;
  enrollment_type_default_value?: string;
}

interface CoverageResult {
  success: boolean;
  available: boolean;
  message: string;
  data?: CoverageData | null;
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function CoverageHero() {
  return (
    <section className="w-full bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-16 pt-12 sm:pt-16 md:pt-20 pb-10">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10">
          {/* Text — comes first on mobile */}
          <div className="order-1">
            <h1 className="font-extrabold leading-tight tracking-tight text-gray-800 dark:text-white text-[clamp(1.9rem,5vw,3rem)]">
              One eSIM. Every Destination. Every Journey
            </h1>
            <p className="mt-4 max-w-md text-gray-500 dark:text-gray-300 leading-relaxed text-[clamp(0.9rem,1.4vw,1.05rem)]">
              Connect seamlessly in 220+ countries with Tier-1 speed, security,
              and reliability. Backed by BT Wholesale and 90+ global partners.
            </p>
          </div>

          {/* World map — space reserved via aspect-ratio box so layout never shifts */}
          <div className="order-2">
            <div className="relative w-full aspect-[7/5]">
              <Image
                src="/image/Group 1597883152.png"
                alt="Global eSIM coverage map across 220+ countries"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-16">
        <hr className="border-gray-200 dark:border-gray-700" />
      </div>
    </section>
  );
}

// ─── COVERAGE RESULT CARD ─────────────────────────────────────────────────────

function CoverageResultCard({
  status,
  result,
}: {
  status: CheckStatus;
  result: CoverageResult | null;
}) {
  if (status === "idle") return null;

  if (status === "loading") {
    return (
      <div className="mt-6 flex items-center justify-center gap-3 rounded-xl border border-teal-200 bg-teal-50 dark:border-teal-800 dark:bg-teal-950/40 px-6 py-5">
        {/* Spinner */}
        <svg
          className="h-5 w-5 animate-spin text-teal-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <p className="text-sm font-medium text-teal-700 dark:text-teal-300">
          Checking coverage…
        </p>
      </div>
    );
  }

  if (status === "error" || !result) {
    return (
      <div className="mt-6 rounded-xl border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/40 px-6 py-5">
        <div className="flex items-start gap-3">
          {/* Error icon */}
          <svg
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="font-semibold text-red-700 dark:text-red-400">
              Something went wrong
            </p>
            <p className="mt-0.5 text-sm text-red-600 dark:text-red-300">
              {result?.message ?? "Unable to check coverage. Please try again."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "available" && result.data) {
    const d = result.data;
    const enrollmentTypes = d.allowed_enrollment_type?.split(",").map((t) => t.trim()) ?? [];

    return (
      <div className="mt-6 rounded-xl border border-teal-300 bg-teal-50 dark:border-teal-700 dark:bg-teal-950/40 px-6 py-6">
        {/* Header */}
        <div className="flex items-start gap-3">
          <svg
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-600"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="font-semibold text-teal-800 dark:text-teal-200">
              Service available
              {d.city && d.state ? ` in ${d.city}, ${d.state}` : ""}
            </p>
            {d.zip_code && (
              <p className="mt-0.5 text-sm text-teal-600 dark:text-teal-400">
                ZIP {d.zip_code}
              </p>
            )}
          </div>
        </div>

        {/* Detail pills */}
        {enrollmentTypes.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-teal-700 dark:text-teal-400">
              Available programs
            </p>
            <div className="flex flex-wrap gap-2">
              {enrollmentTypes.map((type) => (
                <span
                  key={type}
                  className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800 dark:bg-teal-900 dark:text-teal-200"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Flags grid */}
        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
          {[
            { label: "ACP / EBB", value: d.is_ebb === "1" ? "Supported" : "Not available" },
            { label: "Lifeline", value: d.is_lifeline === "1" ? "Supported" : "Not available" },
            { label: "Tribal benefit", value: d.is_tribal === "Y" ? "Eligible" : "Not applicable" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-teal-600 dark:text-teal-400">{label}</p>
              <p className="text-sm font-medium text-teal-900 dark:text-teal-100">{value}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // unavailable
  return (
    <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40 px-6 py-5">
      <div className="flex items-start gap-3">
        <svg
          className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
        <div>
          <p className="font-semibold text-amber-700 dark:text-amber-400">
            Service not yet available here
          </p>
          <p className="mt-0.5 text-sm text-amber-600 dark:text-amber-300">
            {result.message || "We don't currently cover this ZIP code. Check back soon."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── COVERAGE CHECKER ──────────────────────────────────────────────────────────

function CoverageChecker() {
  const [zipCode, setZipCode] = useState("");
  const [status, setStatus] = useState<CheckStatus>("idle");
  const [result, setResult] = useState<CoverageResult | null>(null);

  async function handleCheck() {
    const trimmed = zipCode.trim();
    if (!trimmed) return;

    setStatus("loading");
    setResult(null);

    try {
      const res = await fetch("/api/malima/check-coverage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zip_code: trimmed }),
      });

      const json = (await res.json().catch(() => null)) as CoverageResult | null;

      if (!json) {
        setStatus("error");
        setResult({ success: false, available: false, message: "Unexpected response from server." });
        return;
      }

      setResult(json);
      setStatus(json.available ? "available" : json.success === false ? "error" : "unavailable");
    } catch (err) {
      setStatus("error");
      setResult({
        success: false,
        available: false,
        message: err instanceof Error ? err.message : "Network error — please try again.",
      });
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleCheck();
  }

  return (
    <section className="w-full bg-white dark:bg-gray-900 px-4 sm:px-6 md:px-16 py-10 sm:py-12">
      <div className="mx-auto max-w-4xl rounded-2xl bg-gray-50 dark:bg-gray-800 px-5 sm:px-8 py-10 sm:py-12">
        <h2 className="text-center font-extrabold text-gray-900 dark:text-white text-[clamp(1.25rem,3vw,1.6rem)]">
          Going somewhere? Let&rsquo;s check your coverage.
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          Enter a US ZIP code to check service availability and eligible programs.
        </p>

        {/* Input + button */}
        <div className="mx-auto mt-6 flex max-w-2xl flex-col gap-3 sm:flex-row sm:gap-0">
          <input
            type="text"
            value={zipCode}
            onChange={(e) => {
              setZipCode(e.target.value);
              if (status !== "idle") { setStatus("idle"); setResult(null); }
            }}
            onKeyDown={handleKeyDown}
            placeholder="Enter your ZIP or postal code"
            aria-label="ZIP or postal code"
            className="w-full rounded-lg border border-teal-500/60 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-700 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:rounded-r-none"
          />
          <button
            type="button"
            disabled={status === "loading" || !zipCode.trim()}
            onClick={handleCheck}
            className="w-full whitespace-nowrap rounded-lg bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-800 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto sm:rounded-l-none"
          >
            {status === "loading" ? "Checking…" : "Check Coverage"}
          </button>
        </div>

        {/* Result */}
        <CoverageResultCard status={status} result={result} />
      </div>
    </section>
  );
}

// ─── WHY IT WORKS GLOBALLY ──────────────────────────────────────────────────────

function WhyItWorks() {
  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-gray-900 px-4 sm:px-6 md:px-16 py-14 sm:py-20">
      {/* faint grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] dark:opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0d9488 1px, transparent 1px), linear-gradient(to bottom, #0d9488 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <h2 className="text-center font-extrabold uppercase tracking-tight text-gray-700 dark:text-white text-[clamp(1.4rem,4vw,2.25rem)]">
          Why Zoiko Orbit Works Globally
        </h2>

        {/* 1 col mobile → 2 cols tablet → 4 cols desktop */}
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.label}
              className="flex flex-col items-center text-center sm:items-start sm:text-left"
            >
              {/* blue logo kept as an image only */}
              <div className="relative h-16 w-16 flex-shrink-0">
                <Image
                  src={feature.icon}
                  alt={feature.label}
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>
              <p className="mt-4 max-w-[12rem] text-sm leading-snug text-gray-600 dark:text-gray-300">
                {feature.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function coverage() {
  return (
    <main className="font-sans">
      <CoverageHero />
      <CoverageChecker />
      <WhyItWorks />
    </main>
  );
}