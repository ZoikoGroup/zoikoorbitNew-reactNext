import React from "react";
import Image from "next/image";

export default function InvestorRelations() {
  return (
    <>
      {/* Hero section */}
      <section className="relative w-full overflow-hidden">
        {/* Background Image */}
        <div className="relative w-full h-70 sm:h-90 md:h-115 lg:h-128">
          <Image
            src="/image/investor-heropic(dv).webp"
            alt="Investor Relations"
            fill
            priority
            className="object-cover
        object-[55%_center]
        sm:object-center"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/35" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16">
              <div className="max-w-lg">
                <h1 className="text-white font-bold leading-tight text-2xl sm:text-3xl md:text-4xl">
                  Investor Relations
                </h1>

                <p className="mt-5 text-white/90 text-sm sm:text-base md:text-xl leading-relaxed">
                  At Zoiko Orbit, we value the trust and confidence of our
                  global investors. As a subsidiary of Zoiko Communications
                  Group Inc., we are committed to financial transparency,
                  strategic growth, and long-term value creation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section 1*/}
      <section className="relative w-full bg-[#f7f7f7] dark:bg-[#0F172A] py-16 md:py-24 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-40 dark:opacity-30 pointer-events-none">
          <div
            className="w-full h-full dark:hidden"
            style={{
              backgroundImage: `
              linear-gradient(to right, #d9dde3 1px, transparent 1px),
              linear-gradient(to bottom, #d9dde3 1px, transparent 1px)
            `,
              backgroundSize: "120px 120px",
            }}
          />
          <div
            className="w-full h-full hidden dark:block"
            style={{
              backgroundImage: `
              linear-gradient(to right, #1e293b 1px, transparent 1px),
              linear-gradient(to bottom, #1e293b 1px, transparent 1px)
            `,
              backgroundSize: "120px 120px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="max-w-2xl text-center lg:text-right">
                <p
                  className="
                  text-[#2b2b2b]
                  dark:text-gray-200
                  text-lg
                  sm:text-xl
                  leading-relaxed
                "
                >
                  We maintain open communication with institutional and private
                  investors, guided by global best practices in financial
                  governance and disclosure.
                </p>

                <p
                  className="
                  mt-4
                  text-[#2b2b2b]
                  dark:text-gray-200
                  text-lg
                  sm:text-xl
                  leading-relaxed
                "
                >
                  Our leadership team delivers consistent performance updates,
                  regulatory compliance reports, and stakeholder briefings to
                  ensure investors are informed and aligned with our strategic
                  objectives.
                </p>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative flex justify-center order-1 lg:order-2">
              {/* Image Wrapper */}
              <div className="relative w-full max-w-110 h-70 sm:h-95 md:h-115">
                {/* Main Image */}
                <div className="absolute inset-0 overflow-hidden shadow-lg dark:shadow-none dark:ring-1 dark:ring-white/10">
                  <Image
                    src="/image/investor-Vector-1.webp"
                    alt="Investor Communication"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section 2*/}
      <section className="relative w-full bg-[#f7f7f7] dark:bg-[#0F172A] py-16 md:py-24 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-40 dark:opacity-30 pointer-events-none">
          <div
            className="w-full h-full dark:hidden"
            style={{
              backgroundImage: `
              linear-gradient(to right, #d9dde3 1px, transparent 1px),
              linear-gradient(to bottom, #d9dde3 1px, transparent 1px)
            `,
              backgroundSize: "120px 120px",
            }}
          />
          <div
            className="w-full h-full hidden dark:block"
            style={{
              backgroundImage: `
              linear-gradient(to right, #1e293b 1px, transparent 1px),
              linear-gradient(to bottom, #1e293b 1px, transparent 1px)
            `,
              backgroundSize: "120px 120px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="relative flex justify-center order-1 lg:order-1">
              {/* Image Wrapper */}
              <div className="relative w-full max-w-110 h-70 sm:h-95 md:h-115">
                {/* Main Image */}
                <div className="absolute inset-0 overflow-hidden shadow-lg dark:shadow-none dark:ring-1 dark:ring-white/10">
                  <Image
                    src="/image/investor-Vector-2.webp"
                    alt="Investor Communication"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center lg:justify-start order-2 lg:order-2">
              <div className="max-w-2xl text-center lg:text-left">
                <p
                  className="
                  text-[#2b2b2b]
                  dark:text-gray-200
                  text-lg
                  sm:text-xl
                  leading-relaxed
                "
                >
                  From our pioneering work in sustainable eSIM connectivity to
                  our expanding footprint across travel, telecom, and
                  conservation markets, Zoiko Orbit represents a
                  forward-thinking investment opportunity rooted in innovation,
                  resilience, and responsible growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f5f5f5] dark:bg-[#0F172A] py-8 md:py-10 overflow-hidden">
        <div className="w-full">
          {/* Main Wrapper */}
          <div className="relative">
            {/* Background Image */}
            <div className="relative w-full h-65 sm:h-95 md:h-120 lg:h-130 overflow-hidden">
              <Image
                src="/image/Rectangle(dv).webp"
                alt="Accessibility Section"
                fill
                priority
                className="object-cover
          object-[45%_center]
          sm:object-center"
              />
            </div>

            {/* Overlay Card */}
            <div
              className="
                relative
                lg:absolute
                lg:right-[3%]
                lg:bottom-[0%]
                w-full
                lg:w-[45%]
                bg-[#007b95]/70
                dark:bg-[#0891A6]/80
                rounded-none
                sm:rounded-xl
                shadow-xl
                dark:shadow-none
                dark:ring-1
                dark:ring-white/10
                z-20
              "
            >
              <div className="px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12">

                {/* Description */}
                <p
                  className="
                    text-white/90
                    text-sm
                    sm:text-base
                    md:text-lg
                    leading-relaxed
                    max-w-2xl
                  "
                >
                  We invite stakeholders and potential investors to connect with
                  our Investor Relations team for access to quarterly reports,
                  corporate filings, shareholder updates, and investor
                  briefings. <br/>
                  <br/>
                  For investment-related queries, please contact:
                  <a href="mailto:ir@zoikoorbit.com" className="text-white underline">
                    ir@zoikoorbit.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
