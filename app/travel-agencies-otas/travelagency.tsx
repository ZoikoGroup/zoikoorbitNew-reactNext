"use client";

import Image from "next/image";

const offers = [
  {
    title: "Embedded eSIM Solutions",
    description:
      "Offer data plans directly at checkout, post-booking, or via customer portals",
    image: "/image/offer-1.png",
  },
  {
    title: "Flexible Integration",
    description:
      "API, widget, and plug-in options for mobile apps, CRM platforms, and confirmation emails",
    image: "/image/offer-2.png",
  },
  {
    title: "Instant Delivery",
    description:
      "Secure QR codes or in-app activation — no hardware, shipping, or wait times",
    image: "/image/offer-3.png",
  },
  {
    title: "Multi-Tier Revenue Models",
    description:
      "Choose from affiliate, revenue share, white-label, or direct licensing model",
    image: "/image/offer-4.png",
  },
  {
    title: "Real-Time Reporting",
    description:
      "Monitor transactions, redemptions, and commissions via your partner dashboard",
    image: "/image/offer-5.png",
  },
  {
    title: "Global Customer Support",
    description:
      "24/7 enterprise-grade support with multilingual capabilities",
    image: "/image/offer-6.png",
  },
];

export default function TravelAgenciesPage() {
  return (
    <main className="bg-white overflow-hidden">

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-[#f7f7f7]">
        <div className="container-custom">

          <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[720px] gap-10">

            {/* LEFT CONTENT */}
            <div className="relative z-10 pt-16 lg:pt-0">

              {/* Background Grid */}
              <div className="absolute left-0 top-0 opacity-20 hidden lg:block">
                <Image
                  src="/image/grid-pattern.png"
                  alt="grid"
                  width={320}
                  height={320}
                />
              </div>

              <div className="relative">
                <h1 className="text-[42px] lg:text-[72px] leading-[1.05] font-bold text-[var(--primary)] mb-8">
                  Power every itinerary
                  <br />
                  with frictionless global
                  <br />
                  connectivity.
                </h1>

                <p className="text-[20px] leading-[1.7] text-[#303030] mb-8 max-w-[720px]">
                  Zoiko Orbit enables Online Travel Agencies (OTAs),
                  booking platforms, metasearch engines, and digital
                  tour operators to embed eSIM activation into their
                  customer journey — seamlessly, securely, and profitably.
                </p>

                <p className="text-[20px] leading-[1.7] text-[#303030] max-w-[720px]">
                  Our infrastructure spans 220+ countries and territories,
                  giving your travellers reliable mobile data from the
                  moment they arrive — without roaming shocks, SIM swaps,
                  or connectivity gaps.
                </p>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative flex justify-center items-end h-full">

              <Image
                src="/image/itinerary.png"
                alt="Travel Banner"
                width={900}
                height={900}
                priority
                className="w-full max-w-[850px] h-auto object-contain"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ================= WHAT WE OFFER ================= */}
      <section className="py-24 bg-white">

        <div className="container-custom">

          {/* HEADING */}
          <div className="text-center mb-20">
            <h2 className="text-[48px] font-bold text-[var(--primary)] mb-6">
              What We Offer
            </h2>

            <h3 className="text-[28px] font-semibold text-[#202020] leading-relaxed">
              Zoiko Orbit Support Center — always on,
              <br className="hidden md:block" />
              always with you.
            </h3>
          </div>

          {/* CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {offers.map((offer, index) => (
              <div
                key={index}
                className="bg-white border border-[#e5e7eb] rounded-[24px] p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="mb-8">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    width={95}
                    height={95}
                    className="w-[95px] h-[95px] object-contain"
                  />
                </div>

                <h3 className="text-[28px] font-bold text-[var(--primary)] mb-5 leading-tight">
                  {offer.title}
                </h3>

                <p className="text-[18px] leading-[1.8] text-[#4b5563]">
                  {offer.description}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="relative py-28 overflow-hidden">

        {/* BACKGROUND */}
        <div className="absolute inset-0">
          <Image
            src="/image/connect-bg.png"
            alt="background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0f6c7b]/85"></div>
        </div>

        {/* CONTENT */}
        <div className="container-custom relative z-10 text-center text-white">

          <h2 className="text-[34px] lg:text-[52px] font-bold leading-[1.4] max-w-6xl mx-auto mb-12">
            Whether you’re serving budget backpackers or premium
            globe-trotters, Zoiko Orbit lets you add high-margin
            digital products that travellers love — and that require
            zero fulfilment effort on your part.
          </h2>

          <h3 className="text-[28px] lg:text-[40px] font-semibold text-white leading-[1.6]">
            Connect your travellers. Monetize your bookings.
            <br />
            Build brand loyalty.
          </h3>

        </div>
      </section>
    </main>
  );
}