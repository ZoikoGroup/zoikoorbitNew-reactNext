import React from "react";

export default function InvestorRelations() {
  return (
    <main className="font-sans text-gray-800 bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[420px] overflow-hidden bg-gray-900">
        {/* Background image placeholder – swap src for real asset */}
        <img
          src="image/Rectangle 41582 (1).png"
          alt="Investor Relations hero"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
        />
        <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-20 max-w-lg">
          <h1 className="text-3xl md:text-4xl font-extrabold  text-white leading-tight mb-4">
            Investor Relations
          </h1>
          <p className="text-sm md:text-base text-gray-200 leading-relaxed">
            At Zoiko Orbit, we value the trust and confidence of our global
            investors. As a subsidiary of Zoiko Communications Group Inc., we
            are committed to financial transparency, strategic growth, and
            long-term value creation.
          </p>
        </div>
      </section>

      {/* Open Communication Section */}
      <section className="w-full py-10 px-6 md:px-16 lg:px-28 dark:bg-gray-900 dark:text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="text-center md:text-right">
            <p className=" dark:bg-gray-900 dark:text-white text-gray-600 text-sm md:text-base leading-relaxed">
              We maintain open communication with instiutional
and private investors, guided by global best
practices in financial governance and disclosure.
Our leadership team delivers consistent
performance updates, regulatory compliance
reports, and stakeholder briefings to ensure
investors are informed and aligned with our
strategic objectives.
            </p>
          </div>

          {/* Image collage */}
         {/* Single Image */}
<div className="w-full">
  <img
    src="image/Vector (5).png"
    alt="Investor meeting"
    className="rounded-lg object-cover w-full h-[420px]"
  />
</div>
        </div>
      </section>

      {/* eSIM / Investment Opportunity Section */}
      <section className="w-full py-8 px-6 md:px-16 lg:px-28 dark:bg-gray-900 dark:text-white bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Phone image */}
          <div className="flex justify-center">
            <div className="relative w-56 h-72 rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <img
                src="/image/Vector (6).png"
                alt="eSIM on phone"
                className="w-full h-full object-cover"
              />
              {/* eSIM badge overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow">
                eSim™
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="dark:bg-gray-900 dark:text-white">
            <p className="text-gray-600 dark:bg-gray-900 dark:text-white text-sm md:text-base leading-relaxed">
              From our pioneering work in sustainable eSIM
connectivity to our expanding footprint across travel,
telecom, and conservation markets, Zoiko Orbit
represents a forward-thinking investment
opportunity rooted in innovation, resilience, and
responsible growth.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="relative w-full overflow-hidden">
        {/* Background */}
        <img
          src="/image/Rectangle 935 (2).png"
          alt="Team background"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gray-900/70" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-stretch min-h-[360px]">
          {/* Left: photo takes natural space */}
          <div className="hidden md:block md:w-1/2" />

          {/* Right: teal card */}
          <div className="w-full md:w-1/2 bg-teal-700/90 p-10 md:p-14 flex flex-col justify-center">
            <p className="text-white text-base md:text-lg font-semibold leading-relaxed mb-6">

We invite stakeholders and potential investors to connect with our Investor Relations team for access to quarterly reports, corporate filings, shareholder updates, and investor briefings.
            </p>
            <p className="text-white text-base font-semibold">
           For investment-related queries, please contact: 
            </p>
            <a
              href="mailto:ir@zoikoorbit.com"
              className="text-white text-base font-bold underline underline-offset-4 mt-1 hover:text-teal-200 transition-colors"
            >
              ir@zoikoorbit.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}