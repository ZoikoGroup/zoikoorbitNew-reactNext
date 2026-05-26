"use client";

import Image from "next/image";
import { Check, TrendingUp, Smartphone, GraduationCap, PackageCheck, Users, BarChart3, Sparkles, Heart, MessageSquare, Share2 } from "lucide-react";

export default function RetailersDealers() {
  const partnerBenefits = [
    {
      icon: <TrendingUp className="w-7 h-7 text-white" />,
      title: "Profitable by Design",
      description: "Earn up to 40% margins with globally preconfigured eSIM SKUs.",
    },
    {
      icon: <Smartphone className="w-7 h-7 text-white" />,
      title: "Branded POS & Promo Kits",
      description: "Eye-catching displays, QR promo cards, onboarding materials.",
    },
    {
      icon: <GraduationCap className="w-7 h-7 text-white" />,
      title: "Sales Support & Staff Training",
      description: "Retail-ready playbooks, videos, and regional launch managers.",
    },
  ];

  const turnkeyItems = [
    "Custom acrylic display stand",
    "Multi-language flyers",
    "Staff explainer cards",
    "Digital QR code panels for eSIM scan & activate",
    "Dealer dashboard preview",
  ];

  const supportFeatures = [
    {
      icon: <PackageCheck className="w-7 h-7 text-white" />,
      title: "Fast inventory replenishment",
    },
    {
      icon: <Users className="w-7 h-7 text-white" />,
      title: "Regional account managers",
    },
    {
      icon: <BarChart3 className="w-7 h-7 text-white" />,
      title: "API-enabled order tracking",
    },
    {
      icon: <Sparkles className="w-7 h-7 text-white" />,
      title: "Priority access to new SKUs and seasonal promotions",
    },
  ];

  const trustedLogos = [
    { name: "Global Travel Alliance", image: "/image/logo-global-travel.png" },
    { name: "Orange", image: "/image/logo-orange.png" },
    { name: "WWF", image: "/image/logo-wwf.png" },
    { name: "Alliance Airlines", image: "/image/logo-alliance.png" },
  ];

  const bonusFeatures = [
    "Free premium display stand",
    "Co-branded launch campaign assets",
    "Dedicated onboarding concierge",
  ];

  return (
    <main className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">

      {/* ── Hero Section ── */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 dark:from-black dark:via-gray-900 dark:to-teal-950">
        <div className="absolute inset-0 opacity-60">
          <Image
            src="/image/oop.png"
            alt="Retail partnership hero"
            fill
            className="object-cover object-right"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/85 to-transparent dark:from-black dark:via-black/85" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold tracking-wider uppercase">
              For Retailers & Dealers
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Maximize Every Square Foot <br />
              <span className="text-teal-400">with Zoiko Orbit Retail Partnerships</span>
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-xl leading-relaxed">
              Turn foot traffic into recurring revenue with our high-demand travel eSIMs,
              customized POS kits, and tiered dealer incentives.
            </p>
            <a href="/travel-insurance-providers-form">
              <button className="group inline-flex items-center gap-2 px-7 py-3.5 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-lg shadow-lg shadow-teal-500/30 hover:shadow-teal-400/40 transition-all duration-300 hover:-translate-y-0.5">
                Apply to Become an Authorized Dealer
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ── Why Leading Retailers Partner Section ── */}
      <section className="bg-slate-50 dark:bg-gray-900 py-20 md:py-28 transition-colors duration-300 relative overflow-hidden">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
          backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Why Leading Retailers <span className="text-teal-600 dark:text-teal-400">Partner with Us</span>
            </h2>
            <div className="w-20 h-1 bg-teal-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {partnerBenefits.map((benefit, index) => (
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

      {/* ── Your Turnkey Retail Kit Section ── */}
      <section className="bg-white dark:bg-gray-900 py-20 md:py-28 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image side — collage */}
            <div className="relative">
              <div className="relative aspect-[4/5] max-w-md mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-teal-100 to-blue-100 dark:from-teal-900/30 dark:to-blue-900/30 shadow-2xl">
                <Image
                  src="/image/Vector (9).png"
                  alt="Turnkey retail kit collage"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Content side */}
            <div>
              <span className="inline-block px-3 py-1 mb-4 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 text-xs font-semibold tracking-wide uppercase">
                What's Included
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Your Turnkey <br />
                <span className="text-teal-600 dark:text-teal-400">Retail Kit Includes</span>
              </h2>
              <ul className="space-y-4">
                {turnkeyItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center mt-0.5">
                      <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                    </span>
                    <span className="text-gray-700 dark:text-gray-200 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Join 1,000+ Retailers Banner ── */}
      <section className="relative w-full overflow-hidden bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 dark:from-teal-800 dark:via-teal-900 dark:to-gray-900 py-20 md:py-24">
        {/* World map background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 1200 600" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="1200" height="600" fill="url(#dots)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Image side */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/image/Vector .png"
                alt="Retailers meeting"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Content side */}
            <div className="text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
                Join <span className="text-teal-200">1,000+</span> <br />
                Retailers in <span className="text-teal-200">50+ Countries</span>
              </h2>
              <p className="text-lg text-teal-50 mb-8 max-w-lg leading-relaxed">
                Whether you're a single store or a multi-location franchise, Zoiko Orbit scales with you.
              </p>
              <a
                href="/dealer-application"
                className="inline-flex items-center gap-2 text-white font-semibold border-b-2 border-white pb-1 hover:gap-3 transition-all duration-300"
              >
                Apply to Become an Authorized Dealer
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── We've Got Your Back Section ── */}
      <section className="bg-slate-50 dark:bg-gray-900 py-20 md:py-28 transition-colors duration-300 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
          backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              We&apos;ve Got Your Back <span className="text-teal-600 dark:text-teal-400">— 24/7/365</span>
            </h2>
            <div className="w-20 h-1 bg-teal-500 mx-auto rounded-full" />
          </div>

          {/* Timeline-style support features */}
          <div className="relative">
            {/* Dotted connector line — hidden on mobile */}
            <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-0.5">
              <svg width="100%" height="2" className="overflow-visible">
                <line
                  x1="0" y1="1" x2="100%" y2="1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  className="text-teal-400 dark:text-teal-600"
                />
              </svg>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 relative">
              {supportFeatures.map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center group">
                  <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mb-4 shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform duration-300 z-10 ring-4 ring-slate-50 dark:ring-gray-900">
                    {feature.icon}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug max-w-[160px]">
                    {feature.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What Our Retail Partners Are Saying ── */}
      <section className="bg-white dark:bg-gray-900 py-20 md:py-28 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">
                What Our Retail <br />
                <span className="text-teal-600 dark:text-teal-400">Partners Are Saying</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-md">
                From airport terminals to tech stores, our partners around the world are growing
                with Zoiko Orbit. Here&apos;s how real retailers are turning foot traffic into profit
                with our high-demand travel eSIMs.
              </p>
            </div>

            {/* Right — Testimonial card */}
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                {/* Testimonial image */}
                <div className="relative aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                  <Image
                    src="/image/testimonial-retailer.png"
                    alt="Retail partner testimonial"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Trustpilot badge */}
                  <div className="absolute bottom-3 right-3 bg-white dark:bg-gray-900 rounded-lg px-3 py-1.5 shadow-md flex items-center gap-1.5">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">Excellent</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-3 h-3 bg-green-500 flex items-center justify-center">
                          <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="p-6">
                  <p className="text-base font-semibold text-gray-900 dark:text-white mb-2 leading-relaxed">
                    &quot;We sold out in 4 days during peak summer. Our average sale per transaction increased by 18%.&quot;
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic mb-5">
                    — Kiran D., Orbit Retail Partner
                  </p>

                  {/* Engagement bar */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-4">
                      <button className="text-red-500 hover:scale-110 transition-transform">
                        <Heart className="w-5 h-5 fill-current" />
                      </button>
                      <button className="text-gray-400 hover:text-teal-500 transition-colors">
                        <MessageSquare className="w-5 h-5" />
                      </button>
                      <button className="text-gray-400 hover:text-teal-500 transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      122 people viewed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trusted by Global Leaders ── */}
      <section className="bg-slate-50 dark:bg-gray-900 py-16 md:py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-10">
            Trusted by global leaders in travel & telecoms
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {trustedLogos.map((logo, index) => (
              <div
                key={index}
                className="relative aspect-[3/1.5] bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center justify-center p-6 hover:shadow-md transition-shadow duration-300"
              >
                <Image
                  src={logo.image}
                  alt={logo.name}
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Limited-Time Dealer Onboarding Bonus CTA ── */}
      <section className="bg-white dark:bg-gray-900 py-20 md:py-28 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="relative rounded-3xl bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-gray-800 dark:via-gray-800 dark:to-teal-950/30 border border-gray-100 dark:border-gray-700 overflow-hidden shadow-xl">
            <div className="grid md:grid-cols-2 items-stretch">
              {/* Content side */}
              <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center">
                <span className="inline-block w-fit px-3 py-1 mb-4 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-semibold tracking-wide uppercase">
                  Limited-Time Offer
                </span>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Limited-Time Dealer Onboarding Bonus
                </p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  First <span className="text-teal-600 dark:text-teal-400">50 sign-ups</span> <br />
                  this quarter get
                </h2>

                <ul className="space-y-2.5 mb-7">
                  {bonusFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-200">
                      <span className="text-teal-500 mt-0.5">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a href="/dealer-application">
                  <button className="group inline-flex items-center gap-2 px-7 py-3.5 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-lg shadow-lg shadow-teal-500/30 transition-all duration-300 hover:-translate-y-0.5">
                    Join Now — Claim Bonus Package
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </a>
              </div>

              {/* Image side — exclusive onboarding offer badge */}
              <div className="relative min-h-[280px] md:min-h-full bg-gradient-to-br from-slate-900 via-blue-900 to-blue-950 flex items-center justify-center p-6">
                <Image
                  src="/image/onboarding-offer-badge.png"
                  alt="Exclusive onboarding offer"
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