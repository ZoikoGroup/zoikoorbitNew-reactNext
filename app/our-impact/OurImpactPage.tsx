"use client";

import { useState } from "react";

// ─────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────

const giveBackItems = [
  {
    image: "/image/giveback-ngos.png",
    title: "2% of Sales to NGOs",
    desc: "We donate a % of every eSIM purchase to trusted wildlife protection organizations.",
  },
  {
    image: "/image/giveback-sanctuary.png",
    title: "Direct Sanctuary Support",
    desc: "From feeding programs to medical care, we directly fund wildlife sanctuaries.",
  },
  {
    image: "/image/giveback-education.png",
    title: "Education & Anti-Poaching",
    desc: "Supporting on-ground educational initiatives and anti-poaching patrols in vulnerable regions.",
  },
];

const stories = [
  {
    image: "/image/story-rangers.png",
    text: "Funding ranger patrols in Maasai Mara to protect elephants and lions",
  },
  {
    image: "/image/story-rhinos.png",
    text: "Supported the rehabilitation of injured orangutans in Borneo",
  },
  {
    image: "/image/story-trees.png",
    text: "Contributing to the preservation of 50,000 hectares of rainforest",
  },
];

const stats = [
  { value: "30+", label: "Countries supported through wildlife programs." },
  { value: "12", label: "Sanctuaries funded globally." },
  { value: "2%", label: "Of our gross revenue donated to environmental causes." },
  { value: "50,000+ hectares", label: "Protected forest areas." },
];

const testimonials = [
  {
    avatar: "/image/avatar-partner-1.png",
    name: "Wildlife NGO Director.",
    quote:
      "Zoiko Orbit's contributions have helped us expand our anti-poaching units.",
    rating: 5,
  },
  {
    avatar: "/image/avatar-partner-2.png",
    name: "Sanctuary Manager.",
    quote:
      "Their consistent donations fund sanctuary food and veterinary care.",
    rating: 5,
  },
  {
    avatar: "/image/avatar-partner-3.png",
    name: "NGO Partner.",
    quote:
      "It's inspiring to see a tech company driving real-world conservation.",
    rating: 4,
  },
];

// ─────────────────────────────────────────────────────────
// Star Rating helper (no emojis — uses ★ glyph)
// ─────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 text-[#2B4A9B] text-lg">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "" : "opacity-30"}>
          &#9733;
        </span>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────

export default function OurImpactPage() {
  const [testimonialPage, setTestimonialPage] = useState(0);

  const nextTestimonial = () =>
    setTestimonialPage((i) => (i + 1) % testimonials.length);
  const prevTestimonial = () =>
    setTestimonialPage((i) =>
      i === 0 ? testimonials.length - 1 : i - 1
    );

  return (
    <main className="bg-white dark:bg-gray-900 dark:text-white">

      {/* ─── HERO ───────────────────────────────────── */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[420px] md:h-[480px] w-full">
          <img
            src="/image/impact-hero.png"
            alt="Hands holding a small grass globe representing Earth"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark gradient overlay for left-side text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">
                Every Connection <br />
                Protects Our Planet.
              </h1>
              <p className="text-base md:text-lg text-white/90">
                A portion of every plan supports wildlife and habitats worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW WE GIVE BACK ───────────────────────── */}
      <section className="relative py-20 px-6 md:px-12 bg-white dark:bg-gray-900 overflow-hidden">
        {/* Faint grid background — same atmospheric feel as other Orbit pages */}
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
              How We Give Back
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Every eSIM purchase drives meaningful change on the ground.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {giveBackItems.map((item, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="w-full h-44 md:h-52 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-bold text-[#1F2937] dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REAL STORIES. REAL CHANGE. ─────────────── */}
      <section className="py-20 px-6 md:px-12 bg-[#eaf3fb] dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] dark:text-white">
              Real Stories. Real Change.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.map((story, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden flex flex-col"
              >
                <div className="w-full h-72 bg-gray-100 dark:bg-gray-800">
                  <img
                    src={story.image}
                    alt={story.text}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[#1F2937] dark:text-white font-semibold text-sm leading-snug">
                    {story.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── IMPACT YOU'RE PART OF ──────────────────── */}
      <section className="relative py-20 px-6 md:px-12 bg-white dark:bg-gray-900 overflow-hidden">
        {/* Atmospheric grid hint */}
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] dark:text-white">
              Impact You&rsquo;re Part Of.
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="border-l-2 border-[#007C91] pl-4 md:pl-6"
              >
                <p className="text-3xl md:text-4xl font-bold text-[#007C91] mb-2 leading-tight">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT OUR PARTNERS SAY ──────────────────── */}
      <section className="relative py-20 px-6 md:px-12 bg-[#eef2f7] dark:bg-gray-800 overflow-hidden">
        {/* Decorative dot grid */}
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
                What Our Partners Say.
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Don&rsquo;t take our word for it. Trust our customers
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prevTestimonial}
                className="px-5 py-2 bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
              >
                &lsaquo; Previous
              </button>
              <button
                type="button"
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
                  idx === testimonialPage ? "scale-100" : "scale-100 opacity-90"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <StarRating rating={t.rating} />
                </div>
                <h3 className="font-bold text-[#0d2e4e] dark:text-white mb-3">
                  {t.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {t.quote}
                </p>
              </div>
            ))}
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setTestimonialPage(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === testimonialPage
                    ? "w-6 bg-[#0d2e4e] dark:bg-white"
                    : "w-2 bg-gray-400 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}