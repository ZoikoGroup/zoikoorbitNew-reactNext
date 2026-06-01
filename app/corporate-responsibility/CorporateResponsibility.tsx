import React from "react";
import Image from "next/image";
/* dhddhash */
const responsibilityCards = [
  {
    id: 1,
    image: "/image/corp-icon1.webp",
    description:
      "We support animal welfare with every plan activated, reinvesting in partner organizations that protect wildlife, habitats, and endangered species.",
  },
  {
    id: 2,
    image: "/image/corp-icon2.webp",
    description:
      "We hold ourselves accountable — not just for what we build, but how we build it. From data protection and accessibility to supply chain integrity and climate responsibility — corporate citizenship is integral to how we grow.",
  },
];

export default function CorporateResponsibility() {
  return (
    <>
      {/* Hero section */}
      <section className="relative w-full overflow-hidden">
        {/* Background Image */}
        <div className="relative w-full h-[620px] sm:h-[720px] md:h-[520px] lg:h-[560px]">
          <Image
            src="/image/Corporate-sec-heropic.webp"
            alt="Corporate Responsibility"
            fill
            priority
            className="
        object-cover
        object-[30%_center]
        
      "
          />
          <Image
                              src="/image/corporate-responsibilitymobile.png"
                              alt="Privacy Shield"
                              fill
                              priority
                              className="block md:hidden object-cover object-center"
                            />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 md:bg-white/55" />

          {/* Content */}
          <div className="absolute inset-0 z-10">
            <div
              className="
          h-full
          max-w-7xl
          mx-auto
          px-6
          sm:px-8
          lg:px-12
          flex
          items-start
          md:items-center
          justify-end
        "
            >
              {/* Text Box */}
              <div
                className="
            w-full
            md:w-[48%]
            pt-10
            md:pt-0
          "
              >
                <h2
  className="
    text-white
    md:text-[#2b2b2b]
    font-bold
    text-[25px]
    md:text-5xl
    leading-[117%]
     whitespace-nowrap
    mb-3
    md:mb-6
  "
>
  Corporate Responsibility
</h2>

<div
  className="
    text-white
    md:text-[#2b2b2b]
    text-[15px]
    md:text-lg
    leading-[120%]
    space-y-3
    md:space-y-6
    max-w-[320px]
    md:max-w-none
  "
>
  <p>
    Zoiko Orbit is deeply committed to responsible business
    practices that prioritize people, planet, and transparency.
    As part of Zoiko Group Inc., we align with global ESG
    frameworks and sustainability goals, embedding ethical
    governance, carbon awareness, and community engagement into
    every layer of our operations.
  </p>

  <p>
    Our infrastructure runs on energy-efficient provisioning
    nodes, and our platform is designed to reduce SIM card waste
    by promoting 100% digital connectivity.
  </p>
</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-[#f7f7f7] py-14 md:py-8 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
              linear-gradient(to right, #d9dde3 1px, transparent 1px),
              linear-gradient(to bottom, #d9dde3 1px, transparent 1px)
            `,
              backgroundSize: "120px 120px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            {responsibilityCards.map((card) => (
              <div key={card.id}>
                {/* Image */}
                <div className="relative w-full h-60 sm:h-80 md:h-75 lg:h-85 overflow-hidden rounded-2xl shadow-md">
                  <Image
                    src={card.image}
                    alt="Responsibility"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>

                {/* Text */}
                <div className="pt-6">
                  <p
                    className="
                    text-[#2b2b2b]
                    text-lg
                    sm:text-xl
                    leading-relaxed
                  "
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
