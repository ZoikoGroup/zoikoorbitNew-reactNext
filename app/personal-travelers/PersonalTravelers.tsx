"use client";

import React, { useState } from "react";
import { Heart, MessageSquare, Share2 } from "lucide-react";

/* ─── DATA ─────────────────────────────────────────── */

const howItWorks = [
  {
    step: "1",
    img: "/image/Rectangle 908 (1).png",
    title: "Pick Your Destination & Plan",
    desc: "Choose from Global, Regional, or Sub-Regional plans tailored for your travel zone.",
  },
  {
    step: "2",
    img: "/image/Rectangle 909 (1).png",
    title: "Activate Instantly",
    desc: "Secure checkout → receive QR code → scan or enter details to install",
  },
  {
    step: "3",
    img: "/image/Rectangle 910 (1).png",
    title: "Roam Worldwide",
    desc: "Connect to Tier-1 networks in 220+ countries instantly.",
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
  {
    icon: "/image/destinations/Group 1597883214.png",
    alt: "Europe & UK",
    label: "Europe & UK",
  },
  {
    icon: "/image/destinations/Group.png",
    alt: "Rest of Europe",
    label: "Rest of Europe",
  },
  {
    icon: "/image/destinations/Camada 1.png",
    alt: "North America",
    label: "North America",
  },
  {
    icon: "/image/destinations/Vector.png",
    alt: "Central America & Caribbean",
    label: "Central America & Caribbean",
  },
  {
    icon: "/image/destinations/Vector (1).png",
    alt: "South America",
    label: "South America",
  },
  {
    icon: "/image/destinations/Group 1597883188.png",
    alt: "Africa",
    label: "Africa",
  },
  {
    icon: "/image/destinations/Rectangle 902.png",
    alt: "Rest of Africa",
    label: "Rest of Africa",
  },
  {
    icon: "/image/destinations/Group (1).png",
    alt: "Asia",
    label: "Asia",
  },
  {
    icon: "/image/destinations/Vector (2).png",
    alt: "Rest of Asia",
    label: "Rest of Asia",
  },
  {
    icon: "/image/destinations/Group 1597883212.png",
    alt: "Middle East & CIS",
    label: "Middle East & CIS",
  },
  {
    icon: "/image/destinations/Group (2).png",
    alt: "Rest of Middle East",
    label: "Rest of Middle East",
  },
  {
    icon: "/image/destinations/Group 1597883188 (1).png",
    alt: "Australia & New Zealand",
    label: "Australia & New Zealand",
  },
  {
    icon: "/image/destinations/Group 1597883215.png",
    alt: "Pacific Islands",
    label: "Pacific Islands",
  },
  {
    icon: "/image/destinations/Group (4).png",
    alt: "Global Premium & Ultra",
    label: "Global Premium & Ultra",
  },
];

const faqs = [
  {
    id: 1,
    question:"How do I install an eSIM?",
    answer:"After purchase, you will receive a QR code and simple instructions. Just scan the code or enter the details to install your eSIM and connect in minutes."
  },
  {
    id: 2,
    question:"Does Zoiko Orbit work on my phone?",
    answer:"Yes, Zoiko Orbit is compatible with most smartphones and tablets."
  },
  {
    id: 3,
    question:"Can I top up my plan?",
    answer:"Yes, you can top up your plan at any time through our mobile app or website."
  },
  {
    id: 4,
    question:"What if I face connectivity issues?",
    answer:"Our 24/7 support team is available to assist you with any connectivity issues you may encounter."
  },
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
          className="hidden md:block absolute inset-0 w-full h-full object-cover object-center"
        />
        <img
          src="/image/Rectangle893.jpg"
          alt="Traveler at airport"
          className="block md:hidden absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/50 to-transparent" />
        <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-20 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Travel Freely. Stay<br />Connected Across<br />220+ Countries
          </h1>
          <p className="text-sm md:text-base text-gray-200 mb-8">
            Instant eSIM activation. No roaming shocks. Every plan supports animal welfare.
          </p>
          <a
            href="/plans"
            className="inline-flex items-center gap-2 w-fit bg-[#0B7285] hover:bg-teal-600 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
          >
            {/*<img
              src="https://cdn-icons-png.flaticon.com/512/1611/1611179.png"
              alt="eSIM icon"
              className="w-4 h-4"
              style={{ filter: "invert(1)" }}
            />*/}
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
                  //style={{
                 //   filter:
                  //    "invert(40%) sepia(80%) saturate(500%) hue-rotate(145deg)",
                 // }}
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
            <span className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-400 whitespace-nowrap  underline underline-offset-6 decoration-[#0B7285] decoration-4">
              Select your destination Where you&apos;re traveling to
            </span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-12">
            {destinations.map((d) => (
              <button
                key={d.label}
                className="flex items-center gap-3 px-2 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all text-left group"
              >
                <img
                  src={d.icon}
                  alt={d.label}
                  className="w-7 h-5 object-cover rounded-sm shrink-0"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://cdn-icons-png.flaticon.com/512/616/616408.png";
                  }}
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-teal-700 dark:group-hover:text-teal-400 flex-1">
                  {d.label}
                </span>
                <svg
                  className="w- h-2 object-cover text-gray-400 group-hover:text-teal-500 shrink-0"
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
          <section className="bg-[#FAFAFA] py-16 px-6 md:px-16 lg:px-28 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">

        {/* Mobile: Card First, Desktop: 2 Columns */}
        <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* LEFT CONTENT */}
          <div className="text-center md:text-left">
            <h2
              className="
                text-[40px]
                md:text-[44px]
                font-extrabold
                leading-[110%]
                text-[#333333]
              "
            >
              Loved by
              <br />
              Travelers Everywhere.
            </h2>

            <p
              className="
                mt-4
                text-[16px]
                text-[#555555]
                leading-relaxed
                max-w-[440px]
                mx-auto
                md:mx-0
              "
            >
              Zoiko Orbit™ has earned the trust of global travelers who value
              simplicity, speed, and reliability. Real experiences, real
              journeys—here&apos;s a glimpse of what they love most.
            </p>
          </div>

          {/* REVIEW CARD */}
          <div className="relative flex justify-center w-full">
            <div
              className="
                relative
                bg-white
                rounded-[20px]
                shadow-xl
                w-full
                max-w-[397px]
                p-4
              "
            >
              {/* Top Image */}
              <img
                src="/image/review-card-image.png"
                alt="Happy Travelers" 
                className="
                  w-full
                  h-auto
                  rounded-[13px]
                  object-cover
                "
              />

              {/* Review Text */}
              <h3
                className="
                  mt-4
                  text-[22px]
                  font-extrabold
                  leading-tight
                  text-black
                "
              >
                Loved how simple activation was.
                <br />
                No SIM swaps!
              </h3>

              {/* Date */}
              <p className="mt-2 text-[14px] text-[#8B8AA7]">
                20 July 2025 | Erick Peters
              </p>

              {/* Icons */}
              <div className="flex gap-4 mt-5">
                <button className="w-11 h-11 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                  <Heart className="w-5 h-5 text-[#FF4B55] fill-[#FF4B55]" />
                </button>

                <button className="w-11 h-11 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-[#8B8AA7]" />
                </button>

                <button className="w-11 h-11 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-[#8B8AA7]" />
                </button>
              </div>

              {/* Viewed Count */}
              <p className="mt-6 text-[14px] text-[#8B8AA7]">
                122 people viewed
              </p>

              {/* Trustpilot Badge */}
              <img
                src="/image/trustpilot-badge.png"
                alt="Trustpilot"
                className="
                  absolute
                  w-[150px]
                  md:w-[220px]
                  right-[-20px]
                  md:right-[-70px]
                  top-[210px]
                  md:top-[300px]
                  rotate-[-1deg]
                "
              />
            </div>
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
            {faqs.map((faq, i) => (
              <div
                key={faq.id}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-4 text-left text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  <span>{faq.question}</span>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/271/271228.png"
                    alt="chevron"
                    className={`w-4 h-4 shrink-0 transition-transform ${openFaq === i ? "rotate-90" : ""}`}
                    style={{ filter: "invert(60%)" }}
                  />
                </button>
                {openFaq === i && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 pb-4 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA Banner ── */}
      <section className="relative w-full h-[606px] md:h-[500px] overflow-hidden">
  {/* Desktop Image */}
  <img
    src="/image/personal-traveller.png"
    alt="Traveler"
    className="hidden md:block absolute inset-0 w-full h-full object-cover"
  />

  {/* Mobile Image */}
  <img
    src="/image/personal-travellermobile.png"
    alt="Traveler"
    className="block md:hidden absolute inset-0 w-full h-full object-cover"
  />

  {/* Desktop Content */}
  <div className="hidden md:flex absolute inset-0 z-20 items-center justify-end pr-22">
    <div className="w-[564px] h-[359px] bg-[#00718A]/80 rounded-[10px] p-10 flex flex-col justify-center mt-32">
      <h3 className="text-white text-[20px] font-bold mb-4">
        Experience the future of travel connectivity—one eSIM for every
        destination.
      </h3>

      <p className="text-white text-[14px] leading-relaxed">
        Stay connected effortlessly across 220+ countries with a single
        Zoiko Orbit™ eSIM—no contracts, no SIM swaps, no hidden fees.
        Enjoy seamless, secure, high-speed data wherever your journey
        takes you.
      </p>
    </div>
  </div>

  {/* Mobile Content */}
  <div className="md:hidden absolute bottom-5 left-5 right-5 z-20">
    <div className="bg-[#00718A]/80 rounded-[5px] p-4">
      <h3 className="text-white text-[18px] font-bold mb-2 leading-tight">
        Experience the future of travel connectivity—one eSIM for every
        destination.
      </h3>

      <p className="text-white text-[12px] leading-relaxed">
        Stay connected effortlessly across 220+ countries with a single
        Zoiko Orbit™ eSIM—no contracts, no SIM swaps, no hidden fees.
        Enjoy seamless, secure, high-speed data wherever your journey
        takes you.
      </p>
    </div>
  </div>
</section>
    </main>
  );
}