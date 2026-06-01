"use client";

import Image from "next/image";
import { Check } from "lucide-react";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */

const buildFeatures = [
  "Instant eSIM activation at checkout or post-sale",
  "Dynamic region-aware pricing and usage controls",
  "QR and in-app provisioning with real-time status tracking",
  "Data top-up orchestration with intelligent auto-renew logic",
  "Role-based enterprise dashboards and billing integrations",
  "KYC/AML validation flows, reporting feeds, and account sync APIs",
];

const archFeatures = [
  "RESTful endpoints with JSON schema and version control",
  "Full developer portal with Swagger, API keys, and token lifecycle tools",
  "TLS 1.3 encryption, HMAC signature verification, and IP-restricted access",
  "Event-driven webhooks (activation, expiration, renewal, failure)",
  "Multi-tier staging: sandbox, UAT, production",
  "99.99% uptime SLA with real-time monitoring and audit trails",
];

/* ─────────────────────────────────────────
   BULLET COMPONENT
───────────────────────────────────────── */

function Bullet({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-500">
        <Check className="h-3 w-3 text-white" strokeWidth={3} />
      </span>

      <p className="text-[15px] md:text-[18px] leading-[1.2] text-gray-600 dark:text-gray-300">
        {text}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */

export default function ApiIntegrations() {
  return (
    <div className="w-full overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">

      {/* HERO SECTION */}
      <section className="relative w-full h-[430px] md:h-[500px] overflow-hidden">

        {/* MOBILE IMAGE */}
        <div className="block md:hidden absolute inset-0">
          <Image
            src="/image/Rectangle 4-mobile.png"
            alt="API Hero Mobile"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* DESKTOP IMAGE */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src="/image/eSIM.png"
            alt="API Hero Desktop"
            fill
            priority
            className="object-cover object-[55%_center]"
          />
        </div>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0033]/90 via-[#14004A]/80 to-transparent" />

        {/* CONTENT */}
        <div className="absolute inset-0 flex items-start md:items-center pt-6 md:pt-0 px-4 md:px-20 lg:px-28">

          <div className="w-full md:max-w-[60%] lg:max-w-[62%] text-white z-10">

            <h1 className="text-[18px] md:text-[36px] lg:text-[36px] leading-[1.3] font-extrabold mb-3 md:mb-6 max-w-[290px] md:max-w-full">
              Embed global eSIM infrastructure into your platform
              {" — with developer-first precision."}
            </h1>

            <p className="text-[10px] md:text-[16px] lg:text-[21px] leading-[1.45] text-gray-200 max-w-[290px] md:max-w-[640px]">
              Zoiko Orbit offers a secure, modular API framework designed for
              businesses that build at scale. Whether you're integrating
              into a travel booking flow, fintech wallet, or a global workforce
              management system — our API suite provides the tools, security,
              and support to deliver seamless eSIM experiences anywhere in the
              world.
            </p>

          </div>
        </div>

      </section>

      {/* BUILD WITH US */}
      <section className="bg-white dark:bg-gray-900 py-10 md:py-4 px-5 md:px-14 lg:px-20 transition-colors duration-300">

        <h2 className="text-center text-[26px] md:text-[42px] font-bold text-black dark:text-white mb-12 md:mb-16">
          Build With Us:
        </h2>

        <div className="flex flex-col md:flex-row items-start gap-10 md:gap-16 max-w-7xl mx-auto">

          {/* IMAGE */}
          <div className="relative w-full md:w-1/2 h-[220px] md:h-[380px]">

            {/* MOBILE */}
            <div className="block md:hidden absolute inset-0">
              <Image
                src="/image/7063891-mobile.png"
                alt="Build With Us Mobile"
                fill
                className="object-contain"
              />
            </div>

            {/* DESKTOP */}
            <div className="hidden md:block absolute inset-0">
              <Image
                src="/image/7063891.png"
                alt="Build With Us Desktop"
                fill
                className="object-contain"
              />
            </div>

          </div>

          {/* FEATURES */}
          <div className="w-full md:w-1/2 space-y-4 md:space-y-5">
            {buildFeatures.map((item) => (
              <Bullet key={item} text={item} />
            ))}
          </div>

        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="bg-sky-50 dark:bg-gray-800 py-4 md:py-24 px-5 md:px-16 lg:px-20 transition-colors duration-300">

        <div className="flex flex-col-reverse md:flex-row items-center gap-11 md:gap-20 max-w-[112rem] mx-auto">

          {/* TEXT */}
          <div className="w-full md:w-1/2 pl-2 md:pl-11">

            <h2 className="text-[20px] md:text-[29px] leading-[1.3] font-semibold text-[#3F3D56] dark:text-white mb-8">
              Developer-Grade Architecture
            </h2>

            <div className="space-y-4 md:space-y-5">
              {archFeatures.map((item) => (
                <Bullet key={item} text={item} />
              ))}
            </div>

          </div>

          {/* IMAGE */}
          <div className="relative w-full md:w-1/2 h-[240px] md:h-[420px]">

            {/* MOBILE */}
            <div className="block md:hidden absolute inset-0">
              <Image
                src="/image/API Integration Interface-mobile.png"
                alt="Architecture Mobile"
                fill
                className="object-contain"
              />
            </div>

            {/* DESKTOP */}
            <div className="hidden md:block absolute inset-0">
              <Image
                src="/image/API Integration Interface 1.png"
                alt="Architecture Desktop"
                fill
                className="object-contain"
              />
            </div>

          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative overflow-hidden">

        {/* DESKTOP */}
        <div className="hidden md:block relative h-[440px]">

          <Image
            src="/image/Rectangle 935.png"
            alt="Bottom Banner Desktop"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/10 dark:bg-black/40" />

          <div className="absolute bottom-0 right-10 lg:right-20 bg-cyan-500/25 dark:bg-cyan-900/60 backdrop-blur-md py-8 px-12 lg:py-19 lg:px-12 w-[510px] lg:w-[550px] shadow-xl rounded-xl">

            <p className="text-white text-[15px] lg:text-[20px] leading-[1.7] font-medium">
              Whether you&apos;re a digital-first travel agency, neobank, IoT
              platform, or telecom disruptor — Zoiko Orbit&apos;s APIs give you
              carrier-grade capabilities with zero telco complexity.
            </p>

          </div>
        </div>

        {/* MOBILE */}
        <div className="block md:hidden relative h-[280px]">

          <Image
            src="/image/Rectangle 41643.png"
            alt="Bottom Banner Mobile"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/45 dark:bg-black/60" />

          <div className="absolute bottom-5 left-4 right-4 bg-cyan-700/80 dark:bg-cyan-900/80 backdrop-blur-sm p-4 rounded-sm">

            <p className="text-white text-[13px] leading-[1.7]">
              Whether you&apos;re a digital-first travel agency, neobank, IoT
              platform, or telecom disruptor — Zoiko Orbit&apos;s APIs give you
              carrier-grade capabilities with zero telco complexity.
            </p>

          </div>
        </div>

      </section>

    </div>
  );
}