"use client";

import React, { useState } from "react";

/* ─── DATA ─────────────────────────────────────────── */

const howItWorks = [
  {
    step: "1",
    img: "/image/Rectangle 908 (1).png",
    title: "Pick Your Destination & Plan",
    desc: "Select a sub-region and then your specific country to view coverage and pricing.",
  },
  {
    step: "2",
    img: "/image/Rectangle 909 (1).png",
    title: "Activate Instantly",
    desc: "After purchase, receive a QR code and simple instructions. Scan and connect in minutes.",
  },
  {
    step: "3",
    img: "/image/Rectangle 910 (1).png",
    title: "Roam Worldwide",
    desc: "Enjoy fast, reliable data across all countries in your chosen sub-region with automatic Tier-1 carrier switching.",
  },
];

const whyChoose = [
  {
    icon: "/image/Group 1597883239.png",
    title: "Tier-1 Global Coverage",
    desc: "Stay connected in 220+ countries.",
  },
  {
    icon: "/image/Group 1597883246.png",
    title: "Transparent Rates",
    desc: "No hidden fees, no surprises.",
  },
  {
    icon: "/image/Group 1597883248.png",
    title: "Supports Animal Welfare",
    desc: "A share of every plan goes to global causes.",
  },
  {
    icon: "/image/Group 1597883249.png",
    title: "24/7 Support",
    desc: "Multilingual assistance whenever you need it.",
  },
];

const destinations = [
  { flag: "https://flagcdn.com/w40/eu.png", label: "Europe & UK" },
  { flag: "https://flagcdn.com/w40/gb.png", label: "Rest of Europe" },
  { flag: "https://flagcdn.com/w40/us.png", label: "North America" },
  { flag: "https://flagcdn.com/w40/tt.png", label: "Central America & Caribbean" },
  { flag: "https://flagcdn.com/w40/br.png", label: "South America" },
  { flag: "https://flagcdn.com/w40/za.png", label: "Africa" },
  { flag: "https://flagcdn.com/w40/ke.png", label: "Rest of Africa" },
  { flag: "https://flagcdn.com/w40/in.png", label: "Asia" },
  { flag: "https://flagcdn.com/w40/cn.png", label: "Rest of Asia" },
  { flag: "https://flagcdn.com/w40/ae.png", label: "Middle East & CIS" },
  { flag: "https://flagcdn.com/w40/sa.png", label: "Rest of Middle East" },
  { flag: "https://flagcdn.com/w40/au.png", label: "Australia & New Zealand" },
  { flag: "https://flagcdn.com/w40/fj.png", label: "Pacific Islands" },
  { flag: "https://flagcdn.com/w40/un.png", label: "Global Premium & Ultra" },
];

const faqs = [
  "How do I install an eSIM?",
  "Does Zoiko Orbit work on my phone?",
  "Can I top up my plan?",
  "What if I face connectivity issues?",
];

/* ─── COMPONENT ─────────────────────────────────────── */

export default function PersonalTravelers() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="font-sans bg-white dark:bg-gray-900 text-gray-800 dark:text-white">


      {/* ── Hero ── */}
      <section className="relative w-full h-[480px] md:h-[520px] overflow-hidden">
        <img
          src="/image/Rectangle 4 (5).png"
          alt="Traveler at airport"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
        <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-20 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Travel Freely. Stay<br />Connected Across<br />220+ Countries
          </h1>
          <p className="text-sm md:text-base text-gray-200 mb-8">
            Instant eSIM activation. No roaming shocks. Every plan supports animal welfare.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 w-fit bg-teal-500 hover:bg-teal-600 text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1611/1611179.png"
              alt="eSIM icon"
              className="w-4 h-4"
              style={{ filter: "invert(1)" }}
            />
            Get Your eSIM
          </a>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-16 px-6 md:px-16 lg:px-28 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
            How It Works
          </h2>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-12">
            Unlock new revenue and delight travelers with ready-to-activate global data.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {howItWorks.map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <div className="relative w-36 h-56 mb-5">
                  <div className="absolute inset-0 rounded-3xl bg-teal-50 dark:bg-teal-900/30" />
                  <img
                    src={item.img}
                    alt={item.title}
                    className="absolute inset-2 rounded-2xl object-cover"
                    style={{ width: "calc(100% - 16px)", height: "calc(100% - 16px)" }}
                  />
                  <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-teal-600 text-white text-sm font-bold flex items-center justify-center shadow">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Zoiko Orbit ── */}
      <section className="py-16 px-6 md:px-16 lg:px-28 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
            Why Choose Zoiko Orbit
          </h2>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-10">
            Why thousands of travelers trust us every day
          </p>
          <div className="border border-gray-200 dark:border-gray-700 rounded-2xl grid grid-cols-2 md:grid-cols-4 overflow-hidden divide-x divide-gray-200 dark:divide-gray-700">
            {whyChoose.map((w) => (
              <div
                key={w.title}
                className="flex flex-col items-center text-center p-6 gap-3 bg-white dark:bg-gray-900"
              >
                <img
                  src={w.icon}
                  alt={w.title}
                  className="w-20 h-20 object-contain"
                  style={{
                    filter:
                      "invert(40%) sepia(80%) saturate(500%) hue-rotate(145deg)",
                  }}
                />
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">{w.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Destination Selector ── */}
      <section className="py-16 px-6 md:px-16 lg:px-28 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
            Only pay for what you need. Stay in control.
          </h2>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">
            Stay connected in over 220+ destinations worldwide, wherever you travel, at affordable rates
          </p>
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap">
              Select your destination Where you&apos;re traveling to
            </span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {destinations.map((d) => (
              <button
                key={d.label}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all text-left group"
              >
                <img
                  src={d.flag}
                  alt={d.label}
                  className="w-7 h-5 object-cover rounded-sm flex-shrink-0"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://cdn-icons-png.flaticon.com/512/616/616408.png";
                  }}
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-teal-700 dark:group-hover:text-teal-400 flex-1">
                  {d.label}
                </span>
                <svg
                  className="w-4 h-4 text-gray-400 group-hover:text-teal-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Loved by Travelers ── */}
      <section className="py-16 px-6 md:px-16 lg:px-28 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
              Loved by<br />Travelers Everywhere.
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Zoiko Orbit™ has earned the trust of global travelers who value simplicity, speed, and reliability. Real
              experiences, real journeys—here&apos;s a glimpse of what they love most.
            </p>
          </div>

          {/* Right: review card */}
          <div className="relative pb-10">
            <img
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80"
              alt="Happy travelers"
              className="rounded-2xl w-full h-52 object-cover shadow-lg"
            />
            <div className="absolute -bottom-2 left-4 right-4 bg-white dark:bg-gray-900 rounded-xl shadow-xl p-4 border border-gray-100 dark:border-gray-700">
              <p className="text-xs font-semibold text-gray-800 dark:text-white mb-1">
                &ldquo;Loved how simple activation was... no SIM swaps!&rdquo;
              </p>
              <p className="text-xs text-gray-400 mb-2">20 July 2025 | Erick Peters</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <img
                      key={i}
                      src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
                      alt="star"
                      className="w-3 h-3"
                      style={{
                        filter:
                          "invert(60%) sepia(100%) saturate(500%) hue-rotate(5deg)",
                      }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1 bg-green-600 px-2 py-0.5 rounded text-white text-xs font-bold">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
                    alt="trustpilot"
                    className="w-3 h-3"
                    style={{ filter: "invert(1)" }}
                  />
                  Trustpilot
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-1">122 people viewed</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6 md:px-16 lg:px-28 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
            Got Questions? We&apos;ve Got Answers
          </h2>
          <div className="border-t border-gray-200 dark:border-gray-700">
            {faqs.map((q, i) => (
              <div
                key={q}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-4 text-left text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  <span>{q}</span>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/271/271228.png"
                    alt="chevron"
                    className={`w-4 h-4 flex-shrink-0 transition-transform ${openFaq === i ? "rotate-90" : ""}`}
                    style={{ filter: "invert(60%)" }}
                  />
                </button>
                {openFaq === i && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 pb-4 leading-relaxed">
                    Please visit our Support Center or contact us at info@zoikoorbit.com for detailed guidance.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA Banner ── */}
      <section className="relative w-full overflow-hidden min-h-[320px] md:min-h-[380px]">
        <img
          src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1400&q=80"
          alt="Traveler on hilltop"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col md:flex-row items-stretch min-h-[320px] md:min-h-[380px]">
          <div className="hidden md:block md:w-1/2" />
          <div className="w-full md:w-1/2 bg-teal-700/90 p-10 md:p-14 flex flex-col justify-center">
            <h3 className="text-white text-lg md:text-xl font-bold leading-snug mb-4">
              Experience the future of travel connectivity—one eSIM for every destination.
            </h3>
            <p className="text-teal-100 text-sm leading-relaxed">
              Stay connected effortlessly across 220+ countries with a single Zoiko Orbit™ eSIM—no contracts, no SIM
              swaps, no hidden fees. Enjoy seamless, secure, high-speed data wherever your journey takes you.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}