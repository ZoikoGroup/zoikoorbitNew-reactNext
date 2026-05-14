"use client";

import Image from "next/image";

export default function CorporateResponsibility() {
  return (
    <div className="w-full">

      {/* Hero Section */}
      <section className="bg-[#0b7285] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Corporate Responsibility
          </h1>

          <p className="text-lg md:text-xl mb-6 leading-relaxed">
            Zoiko Orbit is deeply committed to responsible business
            practices that prioritize people, planet, and transparency.
            As part of Zoiko Group Inc, we align with global ESG frameworks
            and sustainability goals, embedding ethical governance,
            carbon awareness, and community engagement into every
            layer of our operations.
          </p>

          <p className="text-lg md:text-xl leading-relaxed">
            Our infrastructure runs on energy-efficient provisioning nodes,
            and our platform is designed to reduce SIM card waste by
            promoting 100% digital connectivity.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">

          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <Image
              src="/image/animal-welfare.webp"
              alt="Animal Welfare"
              width={533}
              height={323}
              className="w-full h-auto object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold leading-relaxed">
                We support animal welfare with every plan activated,
                reinvesting in partner organizations that protect wildlife,
                habitats, and endangered species.
              </h2>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <Image
              src="/image/corporate-responsibility.webp"
              alt="Corporate Responsibility"
              width={533}
              height={323}
              className="w-full h-auto object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold leading-relaxed">
                We hold ourselves accountable — not just for what we build,
                but how we build it. From data protection and accessibility
                to supply chain integrity and climate responsibility —
                corporate citizenship is integral to how we grow.
              </h2>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}