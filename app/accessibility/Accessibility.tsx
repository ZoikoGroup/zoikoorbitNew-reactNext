import React from "react";
import Image from "next/image";

const platformFeatures = [
  {
    id: 1,
    icon: "/image/acc-icon1.png",
    title: "Full support for screen readers across mobile and desktop",
  },
  {
    id: 2,
    icon: "/image/acc-icon2.png",
    title:
      "High-contrast mode, adjustable font sizes, and visual hierarchy tools",
  },
  {
    id: 3,
    icon: "/image/acc-icon3.png",
    title: "Keyboard-only navigation for all critical functions",
  },
  {
    id: 4,
    icon: "/image/acc-icon4.png",
    title: "Captions and transcripts on all video content",
  },
  {
    id: 5,
    icon: "/image/acc-icon5.png",
    title:
      "The ability to submit and track service requests through your secure MyZoiko portal, with proper alt text and semantic markup for graphical elements",
  },
  {
    id: 6,
    icon: "/image/acc-icon6.png",
    title: "Clean, simplified layouts for neurodiverse users",
  },
  {
    id: 7,
    icon: "/image/acc-icon7.png",
    title:
      "Accessibility-tested dashboards for enterprise and reseller accounts",
  },
  {
    id: 8,
    icon: "/image/acc-icon8.png",
    title: "An open feedback channel at accessibility@zoikoorbit.com",
  },
];

export default function Accessibility() {
  return (
    <>
      {/* Hero section */}
      <section className="relative w-full overflow-hidden">
        {/* Background Image */}
        <div className="relative w-full h-70 sm:h-90 md:h-115 lg:h-128">
          <Image
            src="/image/accessibility-heropic.png"
            alt="Accessibility Banner"
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
              <div className="max-w-2xl">
                <h1 className="text-white font-bold leading-tight text-2xl sm:text-3xl md:text-4xl">
                  Designed for Everyone
                  <br />- Inclusion Without Compromise
                </h1>

                <p className="mt-5 text-white/90 text-sm sm:text-base md:text-xl leading-relaxed">
                  At Zoiko Orbit, we’re committed to ensuring that every user —
                  regardless of ability, geography, or device — can access our
                  services with ease and confidence. We design and continuously
                  test our platforms in accordance with WCAG 2.1 AA, the
                  Americans with Disabilities Act (ADA), and the UK Equality Act
                  2010.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-[#f7f7f7] py-8 md:py-12 overflow-hidden">
        {/* Grid Background */}
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1f2937]">
              Our platform includes
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-10">
            {platformFeatures.map((feature) => (
              <div
                key={feature.id}
                className="flex flex-col items-center text-center"
              >
                {/* Icon */}
                <div className="w-20 h-20 rounded-full bg-[#007b95] flex items-center justify-center mb-6 shadow-md">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={70}
                    height={70}
                    className="object-contain"
                  />
                </div>

                {/* Text */}
                <p className="text-[#2b2b2b] text-sm md:text-base leading-relaxed max-w-60">
                  {feature.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f5f5f5] py-8 md:py-10 overflow-hidden">
        <div className="w-full">
          {/* Main Wrapper */}
          <div className="relative">
            {/* Background Image */}
            <div className="relative w-full h-65 sm:h-95 md:h-120 lg:h-130 overflow-hidden">
              <Image
                src="/image/Access-sec.webp"
                alt="Accessibility Section"
                fill
                priority
                className="object-cover
    object-[25%_center]
    sm:object-center"
              />
            </div>

            {/* Overlay Card */}
            <div
              className="
          relative
          lg:absolute
          lg:right-[8%]
          lg:bottom-[8%]
          w-full
          lg:w-[45%]
          bg-[#007b95]
          rounded-none
          sm:rounded-xl
          shadow-xl
          z-20
        "
            >
              <div className="px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12">
                {/* Heading */}
                <h2
                  className="
              text-white
              font-bold
              leading-tight
              text-2xl
              sm:text-3xl
              md:text-4xl
              mb-6
            "
                >
                  Zoiko Orbit Accessibility
                  <br />— inclusion, engineered.
                </h2>

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
                  We believe digital freedom must be universal — and we welcome
                  your feedback to ensure our platform remains open, equitable,
                  and barrier-free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
