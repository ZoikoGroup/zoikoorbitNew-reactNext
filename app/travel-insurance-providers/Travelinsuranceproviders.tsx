"use client";

import Image from "next/image";
import { Check, ShieldCheck, Globe2, LayoutDashboard, Clock, MapPin, Wifi } from "lucide-react";

export default function TravelInsuranceProviders() {
  const partnerStats = [
    {
      name: "InsureGlobe",
      description: "increased conversion rates by 31% with bundled eSIM packages.",
      image: "/image/Group 1597883251.png",
    },
    {
      name: "SkyProtect",
      description: "reduced roaming-related claims by 45%.",
      image: "/image/Group 1597883335.png",
    },
    {
      name: "NomadSure",
      description: "improved customer NPS from 7.3 to 9.0 after launching with Zoiko Orbit.",
      image: "/image/Group 1597883336.png",
    },
  ];

  const benefits = [
    {
      icon:"/image/Group 1597883239 (1).png",
      title: "Embedded eSIM Access",
      description: "Launch eSIMs alongside digital travel policies with one-click activation.",
    },
    {
      icon: "/image/Group 1597883239 (1).png",
      title: "Global Coverage Across 220+ Countries",
      description: "Offer reliable mobile connectivity through 500+ Tier-1 carrier partnerships.",
    },
    {
      icon: "/image/Group 1597883239 (1).png",
      title: "Insurer Control Panel",
      description: "Use our real-time dashboard to monitor activations, engagement, and performance.",
    },
  ];

  const enablementCards = [
    {
   
      title: "Reduce emergency assistance lag times",
      image: "/image/Rectangle 908 (4).png",
    },
    {
  
      title: "Enable real-time location-aware support",
      image: "/image/Rectangle 909 (4).png",
    },
    {
      
      title: "Improve claims satisfaction with constant connectivity",
      image: "/image/Rectangle 910 (4).png",
    },
  ];

  const apiFeatures = [
    "REST APIs and secure webhook triggers",
    "White-labeled activation journeys",
    "Tiered billing & usage tracking",
    "Fast time-to-market — integration in under 14 days",
  ];

  return (
    <main className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 dark:from-black dark:via-gray-900 dark:to-teal-950">
        <div className="absolute inset-0 opacity-70">
          {/* Image placeholder — hero background */}
          <div className="relative w-full h-full">
            <Image
              src="/image/ttrs.png"
              alt="Travel insurance hero"
              fill
              className="object-cover object-right"
              sizes="100vw"
              priority
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent dark:from-black dark:via-black/80" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold tracking-wider uppercase">
              For Travel Insurance Providers
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Insure Their Trip. <br />
              <span className="text-teal-400">Connect Their World.</span>
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-xl leading-relaxed">
              Deliver bundled global connectivity with every policy — seamless eSIM activation,
              real-time data, and a smarter insurance experience.
            </p>
            <button className="group inline-flex items-center gap-2 px-7 py-3.5 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-lg shadow-lg shadow-teal-500/30 hover:shadow-teal-400/40 transition-all duration-300 hover:-translate-y-0.5">
              Request Integration Demo
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Why Leading Insurers Partner Section */}
      <section className="bg-slate-50 dark:bg-gray-900 py-20 md:py-28 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Why Leading Insurers Partner with <span className="text-teal-600 dark:text-teal-400">Zoiko Orbit</span>
            </h2>
            <div className="w-20 h-1 bg-teal-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-500 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mb-5 shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* From Just Coverage to Total Traveler Enablement */}
      <section className="bg-white dark:bg-gray-900 py-20 md:py-28 transition-colors duration-300 relative overflow-hidden">
        {/* Decorative grid background */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
          backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              From Just Coverage to <br className="hidden md:block" />
              <span className="text-teal-600 dark:text-teal-400">Total Traveler Enablement</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Modern travelers expect more. By bundling Zoiko Orbit eSIM with your policies, you provide
              practical protection — and real utility — from the moment they depart.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {enablementCards.map((card, index) => (
              <div key={index} className="group">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 mb-5 shadow-md group-hover:shadow-xl transition-shadow duration-300">
                  {/* Image placeholder */}
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
              
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-snug">
                  {card.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise-Ready APIs Section */}
      <section className="bg-slate-50 dark:bg-gray-900 py-20 md:py-28 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image side */}
            <div className="relative">
              <div className="relative aspect-[4/5] max-w-md mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-teal-100 to-blue-100 dark:from-teal-900/30 dark:to-blue-900/30 shadow-2xl">
                {/* Image placeholder — travel insurance */}
                <Image
                  src="/image/Vector (8).png"
                  alt="Travel insurance documents"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Decorative floating badge */}
             
            </div>

            {/* Content side */}
            <div>
              <span className="inline-block px-3 py-1 mb-4 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 text-xs font-semibold tracking-wide uppercase">
                Developer-Friendly
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Enterprise-Ready APIs. <br />
                <span className="text-teal-600 dark:text-teal-400">Built for Insurance Workflows.</span>
              </h2>
              <ul className="space-y-4">
                {apiFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center mt-0.5">
                      <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                    </span>
                    <span className="text-gray-700 dark:text-gray-200 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Proven Impact Section */}
      <section className="bg-gradient-to-b from-blue-50 to-slate-50 dark:from-gray-900 dark:to-gray-900 py-20 md:py-28 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Proven Impact. <span className="text-teal-600 dark:text-teal-400">Trusted By Leaders.</span>
            </h2>
            <div className="w-20 h-1 bg-teal-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {partnerStats.map((partner, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                  {/* Image placeholder */}
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
             
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Co-Create CTA Section */}
      <section className="bg-white dark:bg-gray-900 py-20 md:py-28 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="relative rounded-3xl bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-gray-800 dark:via-gray-800 dark:to-teal-950/30 border border-gray-100 dark:border-gray-700 overflow-hidden shadow-xl">
            <div className="grid md:grid-cols-2 items-center">
              {/* Content side */}
              <div className="p-8 md:p-14">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  Let's Co-Create the Future of <br />
                  <span className="text-teal-600 dark:text-teal-400">Connected Travel Insurance</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-7 leading-relaxed">
                  Schedule a strategy call or explore how Zoiko Orbit can increase your plan conversion,
                  reduce operational friction, and enhance customer protection.
                </p>
                <button className="group inline-flex items-center gap-2 px-7 py-3.5 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-lg shadow-lg shadow-teal-500/30 transition-all duration-300 hover:-translate-y-0.5">
                  Talk to a Solutions Consultant
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

              {/* Image side */}
              <div className="relative h-64 md:h-full min-h-[300px] bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/40 dark:to-cyan-900/40">
                {/* Image placeholder — passport/travel */}
                <Image
                  src="/image/Rectangle 41601.png"
                  alt="Connected travel insurance"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}