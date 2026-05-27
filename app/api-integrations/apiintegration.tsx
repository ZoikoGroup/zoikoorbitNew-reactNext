"use client";

import Image from "next/image";
import { Check } from "lucide-react";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */

const features1 = [
  "Instant eSIM activation at checkout or post-sale",
  "Dynamic region-aware pricing and usage controls",
  "QR and in-app provisioning with real-time status tracking",
  "Data top-up orchestration with intelligent auto-renew logic",
  "Role-based enterprise dashboards and billing integrations",
  "KYC/AML validation flows, reporting feeds, and account sync APIs",
];

const features2 = [
  "RESTful endpoints with JSON schema and version control",
  "Full developer portal with Swagger, API keys, and token lifecycle tools",
  "TLS 1.3 encryption, HMAC signature verification, and IP-restricted access",
  "Event-driven webhooks (activation, expiration, renewal, failure)",
  "Multi-tier staging: sandbox, UAT, production",
  "99.99% uptime SLA with real-time monitoring and audit trails",
];

export default function ApiIntegrationsPage() {
  return (
    <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-white">

      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden">

        {/* Desktop Image */}
        <div className="hidden md:block relative w-full h-[500px]">
          <Image
            src="/image/api-banner-desktop.png"
            alt="API Integration Banner"
            fill
            priority
            className="object-cover"
          />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-10 w-full">
              <div className="max-w-[600px] text-white">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Embed global eSIM infrastructure into your platform
                  — with developer-first precision.
                </h1>

                <p className="mt-6 text-base lg:text-lg text-gray-200 leading-relaxed">
                  Zoiko Orbit offers a secure, modular API framework designed for
                  businesses that build at scale. Whether you’re integrating into a
                  travel booking flow, a fintech wallet, or a global workforce
                  management system — our API suite provides the tools, security,
                  and support to deliver seamless eSIM experiences anywhere in the world.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Image */}
        <div className="block md:hidden relative w-full min-h-[650px]">
          <Image
            src="/image/api-banner-mobile.png"
            alt="API Integration Banner Mobile"
            fill
            priority
            className="object-cover"
          />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center px-6 py-12">
            <div className="text-white">
              <h1 className="text-3xl font-bold leading-tight">
                Embed global eSIM infrastructure into your platform
                — with developer-first precision.
              </h1>

              <p className="mt-5 text-sm text-gray-200 leading-relaxed">
                Zoiko Orbit offers a secure, modular API framework designed for
                businesses that build at scale. Whether you’re integrating into a
                travel booking flow, a fintech wallet, or a global workforce
                management system — our API suite provides the tools, security,
                and support to deliver seamless eSIM experiences anywhere in the world.
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* BUILD WITH US */}
      <section className="py-12 md:py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">
          Build With Us:
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">

          <Image
            src="/image/7063891 1.png"
            alt="API Integration"
            width={500}
            height={350}
            className="rounded-lg w-full h-auto"
          />

          <ul className="space-y-4">
            {features1.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-green-500 text-xl flex-shrink-0">
                  ✔
                </span>

                <span className="text-sm md:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>

        </div>
      </section>

      {/* DEVELOPER ARCHITECTURE */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          <Image
            src="/image/API Integration Interface 1.png"
            alt="Developer Architecture"
            width={500}
            height={400}
            className="rounded-lg w-full h-auto"
          />

          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Developer-Grade Architecture
            </h2>

            <ul className="space-y-4">
              {features2.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-green-500 text-xl flex-shrink-0">
                    ✔
                  </span>

                  <span className="text-sm md:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-12 md:py-16 px-4 md:px-6 text-center bg-[#0b7285] text-white">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold max-w-4xl mx-auto leading-relaxed">
          Whether you're a digital-first travel agency, neobank, IoT platform,
          or telecom disruptor — Zoiko Orbit’s APIs give you carrier-grade
          capabilities with zero telco complexity.
        </h2>
      </section>

    </div>
  );
}