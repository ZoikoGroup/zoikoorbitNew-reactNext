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
    icon: "/image/icon-adaptive-roaming.png",
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

// ─── COVERAGE CHECKER ──────────────────────────────────────────────────────────

function CoverageChecker() {
  const [country, setCountry] = useState("");

  return (
    <section className="w-full bg-white dark:bg-gray-900 px-4 sm:px-6 md:px-16 py-10 sm:py-12">
      <div className="mx-auto max-w-4xl rounded-2xl bg-gray-50 dark:bg-gray-800 px-5 sm:px-8 py-10 sm:py-12">
        <h2 className="text-center font-extrabold text-gray-900 dark:text-white text-[clamp(1.25rem,3vw,1.6rem)]">
          Going somewhere? Let&rsquo;s check your coverage.
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          Enter the Country you&rsquo;re Traveling to and check coverage &amp; sub region
        </p>

        {/* input + button: stacked on mobile, inline on larger screens */}
        <div className="mx-auto mt-6 flex max-w-2xl flex-col gap-3 sm:flex-row sm:gap-0">
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Over 220+ Countries Covered"
            className="w-full rounded-lg border border-teal-500/60 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-700 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:rounded-r-none"
          />
          <button
            type="button"
            className="w-full whitespace-nowrap rounded-lg bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-800 sm:w-auto sm:rounded-l-none"
          >
            Check Coverage
          </button>
        </div>
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