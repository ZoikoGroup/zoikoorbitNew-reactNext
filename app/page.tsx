"use client";

import { useState } from "react";
import Image from "next/image";

// ─── DATA ────────────────────────────────────────────────────────────────────

const stats = [
  {
    value: "98%",
    label: "Customer satisfaction",
    sub: "achieved through seamless global connectivity and reliable eSIM solutions.",
  },
  {
    value: "500K+",
    label: "Travelers and partners",
    sub: "empowered with instant, secure mobile access across continents.",
  },
  {
    value: "50+",
    label: "Venue partnerships",
    sub: "built across airlines, travel brands, resorts and enterprises.",
  },
];

const ecosystemPartners = [
  {
    title: "Retailers & Dealers",
    img: "/ecosystem-retailers.jpg",
    bullets: [
      "High-margin products/Custom POS kits",
      "Staff training & marketing toolkits",
    ],
    cta: "Become an Authorized Dealer",
  },
  {
    title: "Travel Agencies & OTAs",
    img: "/ecosystem-travel.jpg",
    bullets: [
      "API & white-label integrations",
      "Add eSIM to every booking",
    ],
    cta: "Integrate Zoiko Orbit",
  },
  {
    title: "Travel Insurance Providers",
    img: "/ecosystem-insurance.jpg",
    bullets: [
      "Bundle eSIM into travel insurance",
      "Customisable client dashboards",
    ],
    cta: "Offer Seamless Coverage",
  },
];

const reviews = [
  {
    name: "Sarah Thompson",
    location: "New York, USA",
    rating: 5,
    text: "Seamless connectivity everywhere I've traveled – plus I'm helping save animals. Best travel choice I've made all year.",
  },
  {
    name: "James Fielding",
    location: "London, UK",
    rating: 5,
    text: "Zoiko Orbit integrated effortlessly into our agency's portfolio. Clients love that it combines tech with a mission.",
  },
  {
    name: "Nkechi Okafor",
    location: "Lagos, Nigeria",
    rating: 4,
    text: "From Lagos to Dubai, my eSIM worked instantly. Proud to support a brand that helps animal shelters.",
  },
];

const trustedBrands = [
  { name: "Global Travel Alliance", icon: "🌐" },
  { name: "orange", icon: null, logo: true },
  { name: "WWF", icon: "🐾" },
  { name: "Alliance", icon: null, logo: true },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-4 h-4 ${s <= rating ? "text-amber-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── SECTIONS ────────────────────────────────────────────────────────────────

/** 1. HERO */
function HeroSection() {
  return (
    <section
      className="relative min-h-[560px] flex flex-col items-center justify-center text-center text-white overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a1628 0%, #0d2f4f 40%, #0f3d5c 70%, #0a2d45 100%)",
      }}
    >
      {/* Decorative dots / bokeh */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: Math.random() * 6 + 2 + "px",
              height: Math.random() * 6 + 2 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
          />
        ))}
      </div>

      {/* Announcement bar */}
      <div className="absolute top-0 left-0 right-0 bg-amber-400 text-gray-900 text-xs py-1.5 text-center font-medium">
        🌸 Happy Mother's Day — Celebrating The Mum Who Connects Our World with 15% Off |{" "}
        <span className="underline cursor-pointer font-semibold">Update Global Plans</span>
      </div>

      <div className="relative z-10 px-4 pt-10 pb-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 leading-tight drop-shadow-lg">
          Stay Connected Everywhere
        </h1>
        <p className="text-base md:text-lg text-blue-100 mb-8 max-w-xl mx-auto">
          Your global eSIM Trusted by travelers, enterprises, and travel brands worldwide.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button className="bg-teal-500 hover:bg-teal-400 text-white font-semibold px-7 py-2.5 rounded-full transition-all shadow-lg">
            Get Your eSIM
          </button>
          <button className="border border-white/60 hover:bg-white/10 text-white font-semibold px-7 py-2.5 rounded-full transition-all">
            Partner with Us
          </button>
        </div>
      </div>

      {/* Hero image strip */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 mt-6">
        <div className="w-full h-48 md:h-64 rounded-2xl overflow-hidden bg-gradient-to-b from-blue-900/40 to-teal-900/40 flex items-center justify-center">
          <img
            src="/hero-landmarks.jpg"
            alt="World landmarks"
            className="w-full h-full object-cover opacity-70 rounded-2xl"
          />
        </div>
      </div>

      {/* For Individuals / For Businesses cards */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 -mb-8 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: "👤",
              title: "For Individuals",
              desc: "Simple, affordable coverage. No hidden fees",
            },
            {
              icon: "🏢",
              title: "For Businesses",
              desc: "Resellers, Distributors, Travel agencies, travel agencies & Country Registries, Airlines & OTAs",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 flex items-start gap-3 hover:bg-white/15 transition-all cursor-pointer"
            >
              <span className="text-2xl mt-0.5">{card.icon}</span>
              <div className="flex-1 text-left">
                <p className="font-bold text-white text-sm">{card.title}</p>
                <p className="text-blue-200 text-xs mt-0.5 leading-relaxed">{card.desc}</p>
              </div>
              <span className="text-white/60 text-lg self-center">→</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 2. TRAVEL PLAN CHOOSER */
function TravelPlanChooser() {
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");

  return (
    <section className="bg-gray-50 pt-16 pb-10 px-4 md:px-16">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center mb-2">
          Choose Your Perfect Travel Plan
        </h2>
        <p className="text-gray-500 text-center text-sm mb-8">
          Connect all Our SIM and eSIM packages. "Yes" is the only tool for your destination so stay
          connected worldwide
        </p>

        {/* AI Plan Finder card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-bold">
              AI
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">AI Plan Finder</p>
              <p className="text-gray-400 text-xs">Let AI suggest the perfect plan for your trip.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Where are you traveling?
              </label>
              <input
                type="text"
                placeholder="Enter destination or country"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                How long is Your Trip?
              </label>
              <input
                type="text"
                placeholder="Select Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-all">
              Find My Perfect Plan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 3. EMPOWERING GLOBAL CONNECTIVITY */
function EmpoweringSection() {
  return (
    <section className="py-16 px-4 md:px-16 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
            Empowering Global Connectivity Through Innovation
          </h2>
          <p className="text-teal-600 font-medium text-sm">
            Pioneering seamless eSIM solutions that connect people, businesses, and
            journeys—anytime, anywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Image with overlay quote */}
          <div className="relative rounded-2xl overflow-hidden min-h-[300px] bg-gray-200">
            <img
              src="/innovation-globe.jpg"
              alt="eSIM Innovation"
              className="w-full h-full object-cover"
            />
            {/* Quote overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5">
              <p className="text-white text-xs leading-relaxed italic mb-3">
                "At Zoiko Orbit™, we empower people and businesses with seamless, secure global
                connectivity. Our mission is to deliver smart, scalable eSIM solutions that enhance
                every journey and help partners thrive in a connected world."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-xs">
                  JC
                </div>
                <div>
                  <p className="text-white font-semibold text-xs">James Carter</p>
                  <p className="text-gray-300 text-xs">Chief Technology Officer, Zoiko Orbit™</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="space-y-1">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Value Gained
              </p>
              <button className="text-teal-600 text-xs font-semibold hover:underline">
                Show Us Why →
              </button>
            </div>

            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex gap-4 items-start"
              >
                <div className="min-w-[70px]">
                  <p className="text-2xl font-extrabold text-teal-600">{stat.value}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{stat.label}</p>
                  <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** 4. ECOSYSTEM PARTNERS */
function EcosystemPartners() {
  return (
    <section className="py-16 px-4 md:px-16 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900">Ecosystem Partners</h2>
          <div className="flex gap-2">
            <button className="border border-gray-300 text-gray-600 text-xs px-3 py-1.5 rounded-md hover:bg-gray-100 transition-all">
              ‹ Previous
            </button>
            <button className="border border-teal-600 text-teal-600 text-xs px-3 py-1.5 rounded-md hover:bg-teal-50 transition-all">
              Next ›
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ecosystemPartners.map((partner, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 group hover:shadow-md transition-all"
            >
              {/* Image */}
              <div className="h-44 bg-gray-200 relative overflow-hidden">
                <img
                  src={partner.img}
                  alt={partner.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <p className="absolute bottom-3 left-4 text-white font-bold text-base">
                  {partner.title}
                </p>
              </div>

              {/* Body */}
              <div className="p-4">
                <ul className="space-y-1 mb-4">
                  {partner.bullets.map((b, j) => (
                    <li key={j} className="text-xs text-gray-600 flex items-start gap-1.5">
                      <span className="text-teal-500 mt-0.5">•</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="text-teal-600 text-xs font-semibold hover:underline flex items-center gap-1"
                >
                  {partner.cta} <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel dots */}
        <div className="flex justify-center gap-1.5 mt-6">
          {[0, 1, 2].map((d) => (
            <div
              key={d}
              className={`h-2 rounded-full transition-all ${
                d === 0 ? "w-6 bg-teal-600" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/** 5. GLOBAL COVERAGE */
function GlobalCoverage() {
  return (
    <section className="py-16 px-4 md:px-16 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left text */}
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
              Global Coverage
            </h2>
            <p className="text-teal-600 font-semibold text-base mb-4">
              Seamless Connectivity in 220+ Countries
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Stay connected effortlessly across the globe. With Zoiko Orbit you never need to swap
              SIMs or face roaming charges.
            </p>
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-all">
              Get Your eSIM
            </button>
          </div>

          {/* Right: World map illustration */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md relative">
              <img
                src="/world-map-teal.png"
                alt="Global Coverage Map"
                className="w-full h-auto opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 6. EXPERIENCE BANNER */
function ExperienceBanner() {
  return (
    <section className="relative overflow-hidden">
      <div className="w-full h-80 md:h-96 relative">
        <img
          src="/banner-cityview.jpg"
          alt="Travel banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Overlay card — bottom right */}
      <div className="absolute right-8 bottom-8 md:right-16 md:bottom-10 bg-teal-700/95 backdrop-blur-sm text-white rounded-xl p-5 max-w-xs md:max-w-sm shadow-2xl">
        <h3 className="font-extrabold text-base md:text-lg mb-2 leading-snug">
          Experience the future of travel connectivity—use eSIM for every destination.
        </h3>
        <p className="text-teal-100 text-xs leading-relaxed mb-3">
          Stay connected effortlessly across 190+ countries. Use eSIM with a single tap—eliminate
          roaming costs, no SIM swaps, enjoy high-speed WiFi wherever your journey takes you.
        </p>
        <p className="text-teal-200 text-xs leading-relaxed">
          Enjoy seamless top-ups, high-speed WiFi wherever your journey takes you.
        </p>
      </div>
    </section>
  );
}

/** 7. CUSTOMER FEEDBACK */
function CustomerFeedback() {
  return (
    <section className="py-16 px-4 md:px-16 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">Our Customer Feedback</h2>
            <p className="text-gray-400 text-sm mt-1">Don't take our word for it. Trust our customers</p>
          </div>
          <div className="flex gap-2">
            <button className="border border-gray-300 text-gray-600 text-xs px-3 py-1.5 rounded-md hover:bg-gray-50 transition-all">
              ‹ Previous
            </button>
            <button className="border border-teal-600 text-teal-600 text-xs px-3 py-1.5 rounded-md hover:bg-teal-50 transition-all">
              Next ›
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-sm flex-shrink-0">
                  {r.name[0]}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-800 text-sm leading-tight">
                    {r.name} — {r.location}
                  </p>
                </div>
                <StarRating rating={r.rating} />
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-6">
          {[0, 1, 2].map((d) => (
            <div
              key={d}
              className={`h-2 rounded-full transition-all ${
                d === 1 ? "w-6 bg-teal-600" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/** 8. TRUSTED BY */
function TrustedBy() {
  return (
    <section className="py-12 px-4 md:px-16 bg-gray-50 border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-gray-500 text-sm font-medium mb-8">
          Trusted by global leaders in travel &amp; telecoms
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {/* Global Travel Alliance */}
          <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all cursor-pointer">
            <div className="w-8 h-8 rounded-full border-2 border-blue-600 flex items-center justify-center text-blue-600 font-bold text-xs">
              GT
            </div>
            <span className="text-sm font-semibold text-gray-700">Global Travel<br />Alliance</span>
          </div>

          {/* orange */}
          <div className="grayscale hover:grayscale-0 transition-all cursor-pointer">
            <span
              className="text-2xl font-black"
              style={{ color: "#FF7900", fontFamily: "Helvetica, sans-serif" }}
            >
              orange
            </span>
          </div>

          {/* WWF */}
          <div className="flex items-center gap-1.5 grayscale hover:grayscale-0 transition-all cursor-pointer">
            <div className="w-9 h-9 bg-black rounded flex items-center justify-center">
              <span className="text-white font-extrabold text-xs">WWF</span>
            </div>
          </div>

          {/* Alliance */}
          <div className="grayscale hover:grayscale-0 transition-all cursor-pointer">
            <div className="flex items-center gap-1">
              <div className="w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white" />
              </div>
              <span className="text-sm font-bold text-gray-700">Alliance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 9. CTA BANNER */
function CtaBanner() {
  return (
    <section
      className="py-16 px-4 md:px-16 text-center text-white"
      style={{
        background: "linear-gradient(135deg, #0d2f4f 0%, #0f766e 100%)",
      }}
    >
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-2 leading-tight">
          Connect your journey.
          <br />
          Empower your business
        </h2>
        <p className="text-teal-200 text-sm mb-8">
          Whether you're a traveler, retailer, or enterprise — Zoiko Orbit has a plan for you.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button className="bg-white text-teal-700 font-bold px-8 py-3 rounded-full hover:bg-teal-50 transition-all shadow-lg text-sm">
            Get Your eSIM
          </button>
          <button className="border border-white/70 text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition-all text-sm">
            Partner with Us
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="min-h-screen font-sans">
      <HeroSection />
      <TravelPlanChooser />
      <EmpoweringSection />
      <EcosystemPartners />
      <GlobalCoverage />
      <ExperienceBanner />
      <CustomerFeedback />
      <TrustedBy />
      <CtaBanner />
    </main>
  );
}