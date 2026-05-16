"use client";

import { useState } from "react";

// ─────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────

const steps = [
  {
    num: "1",
    title: "Pick Destination & Data",
    desc: "Choose from Global, Regional, or sub-regional plans tailored for your travel zone.",
    image: "/image/Rectangle 908 (3).png",
    bg: "bg-[#007C91]",
  },
  {
    num: "2",
    title: "Activate in Minutes",
    desc: "Secure checkout, receive QR code, scan or enter details to install.",
    image: "/image/Rectangle 909 (3).png",
    bg: "bg-[#2B4A9B]",
  },
  {
    num: "3",
    title: "Roam Globally",
    desc: "Connect to Tier-1 networks in 220+ countries instantly.",
    image: "/image/Rectangle 910 (3).png",
    bg: "bg-[#007C91]",
  },
];

const features = [
  {
    title: "Tier-1 Network Quality",
    desc: "High-speed data and top coverage.",
    icon: "/image/Group 1597883234 (7).png",
  },
  {
    title: "Local Rates",
    desc: "Transparent pricing with no hidden charges.",
    icon: "/image/Group 1597883235 (2).png",
  },
  {
    title: "Supports Wildlife Protection",
    desc: "A share of every plan funds animal welfare programs.",
    icon: "/image/Group 1597883236 (2).png",
  },
  {
    title: "24/7 Support",
    desc: "Always-on global assistance.",
    icon: "/image/Group 1597883237 (2).png",
  },
];

const plans = [
  {
    name: "Regional Starter",
    region: "Europe",
    data: "5 GB",
    days: "15 Days",
    price: "$12.99",
    image: "/image/plan-europe.png",
    popular: false,
  },
  {
    name: "Global Traveler",
    region: "Worldwide",
    data: "10 GB",
    days: "30 Days",
    price: "$29.99",
    image: "/image/plan-global.png",
    popular: true,
  },
  {
    name: "Sub-Regional",
    region: "Southeast Asia",
    data: "8 GB",
    days: "20 Days",
    price: "$18.99",
    image: "/image/plan-asia.png",
    popular: false,
  },
  {
    name: "Unlimited Pro",
    region: "Worldwide",
    data: "Unlimited",
    days: "30 Days",
    price: "$49.99",
    image: "/image/plan-unlimited.png",
    popular: false,
  },
];

const testimonials = [
  {
    name: "Sarah Thompson",
    location: "New York, USA",
    avatar: "/image/Rectangle 729.png",
    quote:
      "Seamless connectivity everywhere I've traveled — plus I'm helping save animals. Best travel choice I've made all year.",
  },
  {
    name: "James Fielding",
    location: "London, UK",
    avatar: "/image/Rectangle 729 (3).png",
    quote:
      "Zoiko Orbit integrated effortlessly into our agency's portfolio. Clients love that it combines tech with a mission.",
  },
  {
    name: "Nkechi Okafor",
    location: "Nigeria",
    avatar: "/image/Rectangle 729 (2).png",
    quote:
      "From Lagos to Dubai, my eSIM worked instantly. Proud to support a brand that helps animal shelters.",
  },
];

const faqs = [
  {
    q: "How do I activate my Zoiko Orbit eSIM on iOS or Android?",
    a: "1. After purchasing a plan, you'll receive a QR code and manual activation details via email. 2. On iOS: Go to Settings > Cellular > Add eSIM > Scan QR code. On Android: Settings > Network & Internet > Mobile Network > Add Carrier > Scan QR code. 3. Follow on-screen prompts and restart your phone after setup. 4. Your data plan will start once the eSIM connects to a supported network.",
  },
  {
    q: "Can I keep my current number?",
    a: "Yes. Zoiko Orbit eSIM works alongside your primary line. Your existing number stays active for calls and SMS, while the eSIM handles data abroad.",
  },
  {
    q: "Can I use my SIM card and eSIM at the same time?",
    a: "Absolutely. Most modern smartphones support dual-SIM (physical + eSIM) operation, letting you stay reachable on your home number while using Zoiko Orbit for affordable travel data.",
  },
  {
    q: "Can I renew or extend my eSIM plan?",
    a: "Yes. You can top-up or renew any active plan directly from your My Orbit dashboard before or after expiry.",
  },
  {
    q: "How do I renew or extend my eSIM plan?",
    a: "Log in to My Orbit, head to 'My Plans', select the eSIM you want to extend, and choose a top-up option. Activation is instant, no need to re-scan a QR code.",
  },
];

// ─────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────

export default function TravelersPage() {
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () =>
    setActiveTestimonial((i) => (i + 1) % testimonials.length);
  const prevTestimonial = () =>
    setActiveTestimonial((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <main className="bg-white dark:bg-gray-900 dark:text-white">

      {/* ─── HERO ───────────────────────────────────── */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[500px] md:h-[560px] w-full">
          <img
            src="/image/traveler.png"
            alt="Travelers planning their trip with eSIM"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Stay Connected <br />
                Across 220+ Countries
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-md">
                Instant eSIM activation. No roaming shocks. Every plan supports
                animal welfare.
              </p>
              <a
                href="/plans"
                className="inline-block bg-[#2B4A9B] hover:bg-[#1f3a7d] text-white font-semibold px-8 py-3 rounded-md transition-colors"
              >
                Get Your eSIM
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3 SIMPLE STEPS ─────────────────────────── */}
      <section className="relative py-20 px-6 md:px-12 bg-white dark:bg-gray-900 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] dark:text-white mb-3">
              Get Online in 3 Simple Steps.
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Unlock new revenue and delight travelers with ready-to-activate
              global data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 relative h-[380px] flex items-center justify-center overflow-hidden">
                
                 
                  <img
                    src={step.image}
                    alt={step.title}
                    className="relative z-10 h-[380px] object-contain"
                  />
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-[#1F2937] dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE ZOIKO ORBIT ─────────────────── */}
      <section className="relative py-20 px-6 md:px-12 bg-white dark:bg-gray-900 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] dark:text-white mb-3">
              Why Choose Zoiko Orbit
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Why travelers trust Zoiko Orbit for a hassle-free experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, idx) => (
              <div key={idx} className="text-left">
                <div>
                  <img
                    src={feature.icon}
                    alt=""
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold text-[#1F2937] dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

   

      {/* ─── WHAT TRAVELERS ARE SAYING ──────────────── */}
      <section className="relative py-20 px-6 md:px-12 bg-[#eef2f7] dark:bg-gray-800 overflow-hidden">
        <div className="hidden lg:block absolute right-12 top-24 z-0">
          <div
            className="w-56 h-56"
            style={{
              backgroundImage:
                "radial-gradient(circle, #d1d5db 1.5px, transparent 1.5px)",
              backgroundSize: "16px 16px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0d2e4e] dark:text-white mb-3">
                What Travelers Are Saying
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Don&apos;t take our word for it. Trust our customers
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={prevTestimonial}
                className="px-5 py-2 bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
              >
                &lsaquo; Previous
              </button>
              <button
                onClick={nextTestimonial}
                className="px-5 py-2 bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
              >
                Next &rsaquo;
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className={`bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm transition-all ${
                  idx === activeTestimonial
                    ? "scale-100"
                    : "scale-100 opacity-90"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex gap-1 text-[#2B4A9B] text-lg">
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                  </div>
                </div>
                <h3 className="font-bold text-[#0d2e4e] dark:text-white mb-3">
                  {t.name} &mdash; {t.location}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  &quot;{t.quote}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] dark:text-white text-center mb-12">
            Got Questions? We&apos;ve Got Answers
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border-b border-gray-200 dark:border-gray-700 pb-3"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full flex justify-between items-center text-left py-3"
                >
                  <span className="font-medium text-[#1F2937] dark:text-white pr-4">
                    {faq.q}
                  </span>
                  <span className="text-gray-400 text-xl flex-shrink-0">
                    {openFaq === idx ? "−" : "›"}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="pb-3 px-1">
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE THE FUTURE BANNER ───────────── */}
      <section className="relative w-full">
        <div className="relative h-[400px] md:h-[440px] w-full overflow-hidden">
          <img
            src="/image/Rectangle 19 (3).png"
            alt="Traveler with phone overlooking a city"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="relative z-10 max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center justify-end">
            <div className="bg-[#007C91]/90 backdrop-blur-sm text-white max-w-xl p-8 md:p-10 rounded-md">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-snug">
                Experience the future of travel <br />
                connectivity&mdash;one eSIM for every destination.
              </h3>
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                Stay connected effortlessly across 190+ countries with a single
                Zoiko Orbit&trade; eSIM&mdash;no contracts, no SIM swaps, no
                hidden fees. Enjoy seamless, secure, high-speed data wherever
                your journey takes you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}