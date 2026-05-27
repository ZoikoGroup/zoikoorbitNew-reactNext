"use client";
import Link from "next/link";

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
    img: "/image/ecosystem-retailers.webp",
    bullets: [
      "High-margin products/Custom POS kits",
      "Staff training & marketing toolkits",
    ],
    cta: "Become an Authorized Dealer",
     link: "#"
  },
  {
    title: "Travel Agencies & OTAs",
    img: "/image/ecosystem-travel.webp",
    bullets: [
      "API & white-label integrations",
      "Add eSIM to every booking",
    ],
    cta: "Integrate Zoiko Orbit",
     link: "/travel-agencies-otas"
  },
  {
    title: "Travel Insurance Providers",
    img: "/image/ecosystem-insurance.webp",
    bullets: [
      "Bundle eSIM into travel insurance",
      "Customisable client dashboards",
    ],
    cta: "Offer Seamless Coverage",
    link: "/travel-insurance-providers"
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
  {
   name: "Rajeev Nair",
   location: "Mumbai, India",
   rating: 5,
   text:"Retailers are thrilled to carry Zoiko Orbit — superior tech, global reach, and a wildlife cause that truly sells."
  },
  {
   name: "Camille Dupont",
   location: "Marseille, France",
   rating: 5,
   text:"Kept me connected across four continents. Knowing every MB helps wildlife makes it twice as rewarding."
  },
  {
   name: "Kenji Matsuda",
   location: "Osaka, Japan",
   rating: 5,
   text:"Cut our corporate travel comms costs by 30%. Staff love the brand's heart for conservation."
  },


];

const trustedBrands = [
  { name: "Global Travel Alliance", icon: "🌐" },
  { name: "orange", icon: null, logo: true },
  { name: "WWF", icon: "🐾" },
  { name: "Alliance", icon: null, logo: true },
];
const cards = [
  {
    icon: "/image/Content.png",
    title: "For Individuals",
    desc: "One eSIM, global coverage, no hidden fees.",
    location :"/personal-travelers",
  },
  {
    icon: "/image/Bag.png",
    title: "For Businesses",
    desc: "Retailers & Distributors, Travel Agencies & Tour Operators, Insurance & Loyalty Programs, Airlines & OTAs.",
    location :"/businesses-enterprises",
  },
];
const logos = [
  { src: "/image/logo1.png", alt: "Global Travel Alliance" },
  { src: "/image/logo2.png", alt: "Orange" },
  { src: "/image/logo3.png", alt: "WWF" },
  { src: "/image/logo4.png", alt: "Alliance Airlines" },
];


// ─── HELPERS ─────────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s}>
          {s <= rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

// ─── SECTIONS ────────────────────────────────────────────────────────────────

/** 1. HERO */
function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a1a3a]">
      {/* ─── Background image ─── */}
      <Image
        src="/image/Rectangle 4 (6).png"
        alt="Global travel landmarks at dusk"
        fill
        className="absolute inset-0 w-full h-full object-cover object-center opacity-95"
      />

      {/* ─── Deep-blue gradient overlay ─── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05145099]/55 via-[#081e6499]/45 to-[#041237aa]/65" />

      {/* ─── Main content ─── */}
      <div className="relative z-10 flex flex-col items-center text-center text-white px-4 sm:px-6 pt-14 sm:pt-20 md:pt-24 pb-0">
        <h1 className="font-extrabold leading-tight tracking-tight mb-3 sm:mb-4 text-[clamp(1.75rem,4.5vw,3.25rem)] [text-shadow:0_2px_14px_rgba(0,0,0,0.45)]">
          Stay Connected Everywhere
        </h1>

        <p className="text-blue-100/90 mb-6 sm:mb-8 max-w-md sm:max-w-lg px-2    text-[clamp(0.85rem,1.4vw,1rem)]">
          Your global eSIM. Trusted by travelers, enterprises, and travel brands
          worldwide.
        </p>

        {/* ─── CTA buttons ─── */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-16 md:mb-24">
          <a href="/plans"><button className="font-semibold text-xs sm:text-sm px-6 sm:px-8 py-2.5 rounded-full text-white transition-all hover:brightness-110 hover:-translate-y-0.5 bg-[#584edc]/95 shadow-[0_6px_18px_rgba(60,50,200,0.35)] border-none">
            Get Your eSIM
          </button></a>
         <a href="/partner-with-us"> <button className="font-semibold text-xs sm:text-sm px-6 sm:px-8 py-2.5 rounded-full text-white transition-all hover:bg-white/10 hover:-translate-y-0.5 bg-transparent border border-white/60">
            Partner with Us
          </button></a>
        </div>
      </div>

      {/* ─── Info Cards ─── */}
     <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pb-6 sm:pb-8 -mt-4 sm:-mt-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
    {cards.map((card) => (
      <Link
        key={card.title}
        href={card.location}
        className="group flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-xl bg-white/[0.98] rounded-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.06)]"
      >
        {/* Icon container */}
        <div className="flex-shrink-0 flex items-center justify-center rounded-full w-[56px] h-[56px] bg-[#2850b4]/10">
          <Image
            src={card.icon}
            alt={card.title}
            width={60}
            height={60}
            unoptimized
            className="object-contain"
          />
        </div>

        {/* Text */}
        <div className="flex-1 text-left min-w-0">
          <p className="font-bold leading-snug text-[clamp(0.95rem,1.4vw,1.05rem)] text-[#2a3a8c]">
            {card.title}
          </p>
          <p className="text-gray-500 leading-relaxed mt-1 text-[clamp(0.75rem,1.1vw,0.85rem)]">
            {card.desc}
          </p>
        </div>

        {/* SVG Arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0 w-[18px] h-[18px] text-[#2a3a8c] group-hover:translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
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
    <section className="bg-gray-50   dark:bg-gray-900 dark:text-white   pt-16 pb-10 px-4 md:px-16">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold  dark:bg-gray-900 dark:text-white  text-gray-900 text-center mb-2">
          Choose Your Perfect Travel Plan
        </h2>
        <p className="text-gray-500 text-center text-sm mb-8">
          Connect all Our SIM and eSIM packages. "Yes" is the only tool for your destination so stay
          connected worldwide
        </p>

        {/* AI Plan Finder card */}
        <div className="bg-white border  dark:bg-gray-900 dark:text-white  border-gray-200 rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-bold">
              AI
            </div>
            <div>
              <p className="font-bold  dark:bg-gray-900 dark:text-white  text-gray-800 text-sm">AI Plan Finder</p>
              <p className="text-gray-400  dark:bg-gray-900 dark:text-white  text-xs">Let AI suggest the perfect plan for your trip.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold  dark:bg-gray-900 dark:text-white  text-gray-600 mb-1">
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
              <label className="block text-xs font-semibold  dark:bg-gray-900 dark:text-white  text-gray-600 mb-1">
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
    <section className="py-16 px-4 md:px-16  dark:bg-gray-900 dark:text-white  bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold  dark:bg-gray-900 dark:text-white  text-gray-900 mb-2">
            Empowering Global Connectivity Through Innovation
          </h2>
          <p className="text-teal-600 font-medium text-sm">
            Pioneering seamless eSIM solutions that connect people, businesses, and
            journeys—anytime, anywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Image with overlay quote */}
          <div className="relative rounded-2xl overflow-hidden min-h-[300px]  dark:bg-gray-900 dark:text-white  bg-gray-200">
            <img
              src="/image/Vector-4.webp"
              alt="eSIM Innovation"
              className="w-full h-full object-cover"
            />
            {/* Quote overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-5">
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
                  <p className="text-white font-semibold text-xs  dark:bg-gray-900 dark:text-white ">James Carter</p>
                  <p className="text-gray-300 text-xs  dark:bg-gray-900 dark:text-white ">Chief Technology Officer, Zoiko Orbit™</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="space-y-1">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold  dark:bg-gray-900 dark:text-white  text-gray-400 uppercase tracking-wider">
                Value Gained
              </p>
              {/*<button className="text-teal-600 text-xs font-semibold hover:underline">
                Show Us Why →
              </button>*/}
            </div>

            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-gray-50 border  dark:bg-gray-900 dark:text-white  border-gray-100 rounded-xl p-4 flex gap-4 items-start"
              >
                <div className="min-w-[70px]">
                  <p className="text-2xl font-extrabold text-teal-600">{stat.value}</p>
                </div>
                <div>
                  <p className="text-sm font-bold  dark:bg-gray-900 dark:text-white  text-gray-800">{stat.label}</p>
                  <p className="text-xs  dark:bg-gray-900 dark:text-white  text-gray-500 leading-relaxed mt-0.5">{stat.sub}</p>
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
    <section className="py-16 px-4 md:px-16  dark:bg-gray-900 dark:text-white  bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold  dark:bg-gray-900 dark:text-white  text-gray-900">Ecosystem Partners</h2>
          <div className="flex gap-2">
            <button className="border border-gray-300  dark:bg-gray-900 dark:text-white  text-gray-600 text-xs px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
              ‹ Previous
            </button>
            <button className="border border-teal-600 text-teal-600 text-xs px-3 py-1.5 rounded-md  dark:bg-gray-900 dark:text-white  dark:hover:bg-gray-700  hover:bg-teal-50 transition-all">
              Next ›
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ecosystemPartners.map((partner, i) => (
            <div
              key={i}
              className=" dark:bg-gray-900 dark:text-white  rounded-2xl overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* ─── Image with teal gradient overlay + title ─── */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={partner.img}
                  alt={partner.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Teal-blue gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-teal-700/90  via-teal-800/60 to-teal-700/40" />

                {/* Title overlaid at bottom-left */}
                <div className="absolute bottom-0 left-0 right-0 px-5 py-4">
                  <h3 className="text-white font-bold text-lg leading-snug drop-shadow-sm   dark:text-white ">
                    {partner.title}
                  </h3>
                </div>
              </div>

              {/* ─── Card body ─── */}
              <div className="flex flex-col flex-1  dark:bg-gray-900 dark:text-white  bg-white px-5 py-4 gap-4">
                {/* Bullet points */}
                <ul className="flex flex-col gap-2 flex-1">
                  {partner.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm  dark:bg-gray-900 dark:text-white  text-gray-600">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Divider */}
                <div className="border-t  dark:bg-gray-900 dark:text-white  border-gray-100" />

                {/* CTA link */}
                <Link
                    href={partner.link}
                  className="text-teal-600 text-sm font-semibold hover:text-teal-700 flex items-center gap-1.5 transition-colors"
                >
                  {partner.cta}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel dots */}
        <div className="flex justify-center gap-1.5 mt-6">
          {[0, 1, 2].map((d) => (
            <div
              key={d}
              className={`h-2 rounded-full transition-all ${d === 0 ? "w-6 bg-teal-600" : "w-2  dark:bg-gray-900 dark:text-white  bg-gray-300"
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
    <section className="py-16 px-4 md:px-16  dark:bg-gray-900 dark:text-white  bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left text */}
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold  dark:bg-gray-900 dark:text-white  text-gray-900 mb-2">
              Global Coverage
            </h2>
            <p className="text-teal-600 font-semibold text-base mb-4">
              Seamless Connectivity in 220+ Countries
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Stay connected effortlessly across the globe. With Zoiko Orbit you never need to swap
              SIMs or face roaming charges.
            </p>
            <a href="/plans"><button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-all">
              Get Your eSIM
            </button></a>
          </div>

          {/* Right: World map illustration */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md relative">
              <img
                src="/image/world-map-teal.webp"
                alt="Global Coverage Map"
                className="w-full h-auto md:h-80 opacity-90"
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
     <section className="bg-white dark:bg-gray-900 py-8 md:py-12">
      <div className=" w-full">
        {/*
          MOBILE (default): stacked column — card on top, image below.
          DESKTOP (md+):    single relative box — image fills, card overlays on right.
        */}
        <div className="relative flex flex-col md:block rounded-2xl overflow-hidden md:overflow-visible">
          {/* Card — appears first on mobile (top), absolutely positioned on desktop */}
          <div
            className="
              order-1 md:order-none
              md:absolute md:right-6 lg:right-12 md:top-1/2 md:-translate-y-1/2
              z-10
              bg-teal-700/95 dark:bg-teal-800/95 backdrop-blur-sm
              text-white
              rounded-t-2xl md:rounded-2xl
              p-6 md:p-7 lg:p-8
              w-full md:max-w-md lg:max-w-lg
              shadow-xl md:shadow-2xl
            "
          >
            <h3 className="font-bold text-lg md:text-xl lg:text-2xl leading-snug mb-3 md:mb-4">
              Experience the future of travel connectivity—one eSIM for every destination.
            </h3>
            <p className="text-teal-50/95 text-sm md:text-[15px] leading-relaxed">
              Stay connected effortlessly across 190+ countries with a single
              Zoiko Orbit™ eSIM—no contracts, no SIM swaps, no hidden fees.
              Enjoy seamless, secure, high-speed data wherever your journey
              takes you.
            </p>
          </div>
 
          {/* Image — appears second on mobile (below card), full bleed on desktop */}
          <div
            className="
              order-2 md:order-none
              relative w-full
              h-64 sm:h-80
              md:h-[360px] lg:h-[420px]
              overflow-hidden
            "
          >
            <Image
              src="/image/Rectangle 19 (2).png"
              alt="Traveler on a mountainside using a phone"
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              className="object-cover object-[20%_30%] md:object-center"
            />
            {/* Subtle dark overlay only on desktop, so the card has better contrast against the image */}
            <div
              className="hidden md:block absolute inset-0 bg-black/10"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/** 7. CUSTOMER FEEDBACK */
function CustomerFeedback() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = 3;

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0
        ? reviews.length - itemsPerPage
        : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev >= reviews.length - itemsPerPage
        ? 0
        : prev + 1
    );
  };

  const visibleReviews = reviews.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );
  return (
    <section className="py-16 px-4 md:px-16  dark:bg-gray-900 dark:text-white  bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold  dark:bg-gray-900 dark:text-white  text-gray-900">Our Customer Feedback</h2>
            <p className="text-gray-400 text-sm mt-1">Don't take our word for it. Trust our customers</p>
          </div>
          <div className="flex gap-2">
            <button 
             onClick={handlePrev}
            className="border border-gray-300 text-gray-600 text-xs px-3 py-1.5 rounded-md  dark:bg-gray-900 dark:text-white  hover:bg-gray-50 transition-all">
              ‹ Previous
            </button>
            <button 
             onClick={handleNext}
            className="border border-teal-600 text-teal-600 text-xs px-3 py-1.5 rounded-md  dark:bg-gray-900 dark:text-white  hover:bg-teal-50 transition-all">
              Next ›
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5  dark:bg-gray-900 dark:text-white ">
          {visibleReviews.map((r, i) => (
            <div
              key={i}
              className="bg-white border  dark:bg-gray-900 dark:text-white  border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-sm shrink-0">
                  {r.name[0]}
                </div>
                <div className="flex-1">
                  <p className="font-bold  dark:bg-gray-900 dark:text-white  text-gray-800 text-sm leading-tight">
                    {r.name} — {r.location}
                  </p>
                </div>
                <StarRating rating={r.rating} />
              </div>
              <p className="text-gray-500  dark:bg-gray-900 dark:text-white  text-xs leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-6">
          {[0, 1, 2].map((d) => (
            <div
              key={d}
              className={`h-2 rounded-full transition-all ${d === 1 ? "w-6 bg-teal-600" : "w-2  dark:bg-gray-900 dark:text-white  bg-gray-300"
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
     <section className="py-12 px-4 md:px-16 bg-white border-t  dark:bg-gray-900 dark:text-white  border-gray-100">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-center  dark:bg-gray-900 dark:text-white  text-gray-800 text-xl md:text-2xl font-bold mb-10">
          Trusted by Global Leaders in Travel &amp; Telecoms
        </h2>
 
        {/* Logo cards */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {logos.map((logo) => (
            <div
              key={logo.alt}
              className="flex items-center justify-center  dark:bg-gray-900 dark:text-white  bg-gray-100 rounded-2xl px-6 py-4 w-58 h-20 hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-16 max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 9. CTA BANNER */
function CtaBanner() {
  return (
    <section
      className="py-16 px-4 md:px-16 text-center dark:bg-gray-900 dark:text-white  text-white"
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
       <a href="/plans">   <button className="bg-white text-teal-700 font-bold px-8 py-3 rounded-full hover:bg-teal-50 transition-all shadow-lg text-sm">
            Get Your eSIM
          </button></a>
       <a href="/partner-with-us">   <button className="border border-white/70 text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition-all text-sm">
            Partner with Us
          </button></a>
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