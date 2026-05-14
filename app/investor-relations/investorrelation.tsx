"use client";

import Image from "next/image";

export default function InvestorRelations() {
  return (
    <div className="w-full">

      {/* Hero Section */}
      <section className="bg-[#0b7285] text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Investor Relations
          </h1>

          <p className="text-lg md:text-xl leading-relaxed">
            At Zoiko Orbit, we value the trust and confidence of our global
            investors. As a subsidiary of Zoiko Communications Group Inc.,
            we are committed to financial transparency, strategic growth,
            and long-term value creation.
          </p>
        </div>
      </section>

      {/* Section 1 */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          {/* Text */}
          <div>
            <p className="text-lg leading-relaxed">
              We maintain open communication with institutional and private
              investors, guided by global best practices in financial
              governance and disclosure. Our leadership team delivers
              consistent performance updates, regulatory compliance reports,
              and stakeholder briefings to ensure investors are informed and
              aligned with our strategic objectives.
            </p>
          </div>

          {/* Image */}
          <div>
            <Image
              src="/image/vector-111.webp"
              alt="Investor Graphic 1"
              width={760}
              height={710}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          {/* Image */}
          <div className="order-2 md:order-1">
            <Image
              src="/image/vector-2.webp"
              alt="Investor Graphic 2"
              width={760}
              height={710}
              className="w-full h-auto"
            />
          </div>

          {/* Text */}
          <div className="order-1 md:order-2">
            <p className="text-lg leading-relaxed">
              From our pioneering work in sustainable eSIM connectivity to
              our expanding footprint across travel, telecom, and conservation
              markets, Zoiko Orbit represents a forward-thinking investment
              opportunity rooted in innovation, resilience, and responsible growth.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0b7285] text-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-6">

          <h2 className="text-xl md:text-2xl font-semibold leading-relaxed">
            We invite stakeholders and potential investors to connect with our
            Investor Relations team for access to quarterly reports, corporate
            filings, shareholder updates, and investor briefings.
          </h2>

          <h3 className="text-lg md:text-xl font-medium">
            For investment-related queries, please contact:
            <br />
            <span className="text-green-300">ir@zoikoorbit.com</span>
          </h3>

        </div>
      </section>

    </div>
  );
}