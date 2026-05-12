"use client";

import Image from "next/image";

const offers = [
  {
    title: "Embedded eSIM Solutions",
    description:
      "Offer data plans directly at checkout, post-booking, or via custom portals",
    image: "/image/ota1.png",
  },
  {
    title: "Flexible Integration",
    description:
      "API, widget, and plug-in options for mobile apps, CRM platforms, and confirmation emails",
    image: "/image/ota2.png",
  },
  {
    title: "Instant Delivery",
    description:
      "Secure QR codes or in-app activation — no hardware shipping, or wait times",
    image: "/image/ota3.png",
  },
  {
    title: "Multi-Tier Revenue Models",
    description:
      "Choose from affiliate, revenue share, white-label, or direct licensing model",
    image: "/image/ota4.png",
  },
  {
    title: "Real-Time Reporting",
    description:
      "Monitor transactions, redemptions, and commissions via your partner dashboard",
    image: "/image/ota5.png",
  },
  {
    title: "Global Customer Support",
    description:
      "24/7 enterprise-grade support with multilingual capabilities",
    image: "/image/ota6.png",
  },
];

export default function Travelagency() {
  return (
    <main className="w-full bg-white dark:bg-black overflow-hidden transition-colors duration-300">

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-white dark:bg-black overflow-hidden py-10 md:py-24 transition-colors duration-300">

        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">

          {/* LEFT CONTENT */}
          <div className="max-w-[560px] md:text-left order-2 lg:order-1">

            <h2 className="text-[20px] sm:text-[36px] lg:text-[42px] font-semibold text-[#0C7687] leading-tight dark:text-blue-200
">
              Power every itinerary <br />
              with frictionless global <br />
              connectivity.
            </h2>

            <p className="mt-4 md:mt-6 text-[13px] md:text-[16px] text-gray-700 dark:text-gray-300 leading-relaxed">
              Zoiko Orbit enables Online Travel Agencies (OTAs),
              booking platforms, metasearch engines, and digital
              tour operators to embed eSIM activation into their
              customer journey — seamlessly, securely, and profitably.
            </p>

            <p className="mt-4 md:mt-6 text-[13px] md:text-[16px] text-gray-700 dark:text-gray-300 leading-relaxed">
              Our infrastructure spans 220+ countries and territories,
              giving your travellers reliable mobile data from the
              moment they arrive — without roaming shocks, SIM swaps,
              or connectivity gaps.
            </p>

          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center lg:justify-start lg:ml-6 lg:mr-12 order-1 lg:order-2">

            {/* Desktop Image */}
            <Image
              src="/image/ota-hero.png"
              alt="Global travel connectivity"
              width={980}
              height={980}
              className="hidden md:block w-[540px] sm:w-[700px] lg:w-[980px] object-contain"
            />

            {/* Mobile Image */}
            <Image
              src="/image/mobile-ota-hero.png"
              alt="Global travel connectivity"
              width={420}
              height={520}
              className="block md:hidden w-full max-w-[260px] object-contain"
            />

          </div>

        </div>

      </section>

      {/* ================= WHAT WE OFFER ================= */}
      <section className="relative bg-[#F7FBFE] dark:bg-[#0b0d12]  pt-16 pb-24 md:pt-2 pb-16 overflow-hidden transition-colors duration-300">

        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-16">

          {/* Heading */}
          <div className="text-center mb-16">

            <h2 className="text-[30px] md:text-[36px] font-semibold text-gray-900 dark:text-white">
              What We Offer
            </h2>

            <p className="mt-3 text-[15px] text-gray-600 dark:text-gray-400">
              Zoiko Orbit Support Center — always on, always with you.
            </p>

          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12 text-center justify-items-center">

            {offers.map((offer, index) => (
              <div key={index} className="max-w-[260px] text-left">

                {/* Icon Circle */}
                <div className="w-[88px] h-[88px] mx-auto rounded-full bg-[#0C7687] flex items-center justify-center mb-6">

                  <Image
                    src={offer.image}
                    alt={offer.title}
                    width={38}
                    height={38}
                    className="w-[88px] h-[88px] object-contain"
                  />

                </div>

                {/* Title */}
                <h3 className="text-[16px] font-semibold text-gray-900 dark:text-white mb-2">
                  {offer.title}
                </h3>

                {/* Description */}
                <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-relaxed">
                  {offer.description}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
<section className="w-full bg-white dark:bg-black pt-8 py-0 md:py-4 transition-colors duration-300">
        <div className="max-w-[1600px] mx-auto">

          {/* IMAGE + CARD WRAPPER */}
          <div className="relative overflow-hidden">

            {/* Desktop Background */}
            <Image
              src="/image/support-bg.png"
              alt="Join us in redefining travel"
              width={1600}
              height={480}
              className="hidden md:block w-full h-[420px] md:h-[480px] object-cover"
            />

            {/* Mobile Background */}
            <Image
              src="/image/mobile-support-bg.png"
              alt="Join us in redefining travel"
              width={500}
              height={700}
              className="block md:hidden w-full h-[320px] object-cover"
            />

            {/* OVERLAY CARD */}
            <div
              className="
                absolute
                left-1/2 -translate-x-1/2
                md:right-10 lg:right-35
                md:left-auto md:translate-x-0
                bottom-1 md:top-85
                md:-translate-y-26
                bg-[#0a7a8f]/70
                backdrop-blur-sm
                text-white
                rounded-2xl
                p-3 md:p-12
                w-[90%] max-w-[240px] md:max-w-[480px]
                min-h-[180px] md:min-h-[280px]
                shadow-xl

              "
            >

              <p className="text-[11px] md:text-[15px] leading-relaxed text-white/90">
                Whether you're serving budget backpackers or premium
                globe-trotters, Zoiko Orbit lets you add high-margin digital
                products that travellers love — and that require zero fulfilment
                effort on your part.
              </p>

              <p className="mt-3 md:mt-4 text-[11px] md:text-[16px] leading-relaxed text-white/90 font-bold">
                Connect your travellers. Monetize your bookings.
                Build brand loyalty.
              </p>

            </div>

          </div>
        </div>
      </section>

    </main>
  );
}