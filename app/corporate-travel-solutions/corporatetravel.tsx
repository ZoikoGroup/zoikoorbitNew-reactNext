// page.tsx

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const coreCapabilities = [
  {
    img: "/image/core-1.png",
    text: "Zero-touch provisioning through MDM, QR, or API workflows",
  },
  {
    img: "/image/core-2.png",
    text: "Region-based data plans with country-specific tax compliance",
  },
  {
    img: "/image/core-3.png",
    text:
      "Real-time dashboards with granular usage, cost center distribution, and policy enforcement",
  },
  {
    img: "/image/core-4.png",
    text:
      "Multi-entity, multi-currency invoicing — audit-ready for finance and procurement",
  },
  {
    img: "/image/core-5.png",
    text:
      "Role-based access for IT operations and mobility stakeholders",
  },
  {
    img: "/image/core-6.png",
    text:
      "eKYC onboarding, encrypted eSIM delivery, and SOC 2-aligned infrastructure",
  },
  {
    img: "/image/core-7.png",
    text:
      "Tier-1 global coverage with 24/7 multilingual enterprise support",
  },
];

const testimonials = [
  {
    name: "Sarah Thompson",
    location: "New York, USA",
    image: "/image/Rectangle 729.png",
    rating: 5,
    message:
      "Seamless connectivity everywhere I've Seamless connectivity everywhere I’ve traveled — plus I’m helping save animals. Best travel choice I’ve made all year.. Our executives stay connected without interruptions.",
  },
  {
    name: "James Fielding",
    location: "London, UK",
    image: "/image/Rectangle 729 (1).png",
    rating: 5,
    message:
      "Zoiko Orbit transformed the way Zoiko Orbit integrated effortlessly into our agency’s portfolio. Clients love that it combines tech with a mission. enterprise handles global mobility.",
  },
  {
    name: "Nkechi Okafor",
    location: "Lagos, Nigeria",
    image: "/image/Rectangle 729 (2).png",
    rating: 4,
    message:
      "Reliable enterprise-grade connectivity with From Lagos to Dubai, my eSIM worked instantly. Proud to support a brand that helps animal shelters support worldwide.",
  },
];

export default function page() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const next = () => {
    setIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      <div className="w-full bg-white dark:bg-black transition-colors duration-300 overflow-hidden">

        {/* ───────── HERO SECTION ───────── */}
        <section className="relative w-full h-[520px] overflow-hidden">
          
          {/* Desktop Image */}
          <Image
            src="/image/corp-1.png"
            alt="Corporate Travel Solutions"
            fill
            className="hidden md:block object-cover object-center"
            priority
          />

          {/* Mobile Image */}
          <Image
            src="/image/mobile-corp-1.png"
            alt="Corporate Travel Solutions Mobile"
            fill
            className="block md:hidden object-cover"
            priority
          />

          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/55 to-transparent" />

          <div className="absolute inset-0 flex items-center">
            <div className="px-6 md:px-16 max-w-3xl text-white">

              <h1 className="text-[34px] md:text-[52px] font-bold leading-tight">
                Global mobility,
                <br />
                secured and simplified.
              </h1>

              <p className="mt-6 text-[15px] md:text-[17px] leading-relaxed text-gray-200">
                Zoiko Orbit delivers enterprise-ready eSIM connectivity for organizations that move — across borders, sectors, and time zones. Our platform is engineered for global workforces, traveling executives, field teams, and remote-first operations that demand security, visibility, and compliance — at scale.


              </p>

              <p className="mt-4 text-[15px] md:text-[17px] leading-relaxed text-gray-300">
              Whether you manage 10 consultants or 10,000 mobile users, Zoiko Orbit ensures your teams stay connected, protected, and in-policy — without the delays, logistics, or costs of traditional SIM provisioning.

              </p>

             {/* <button className="mt-8 bg-[#0d6e7a] hover:bg-[#095762] transition-all duration-300 text-white px-8 py-3 rounded-full text-sm font-semibold">
                Explore Solutions
              </button>*/}

            </div>
          </div>
        </section>

        {/* ───────── CORE CAPABILITIES ───────── */}
        <section className="py-8 px-6 bg-[#f5f7f8] dark:bg-[#0f1115] transition-colors duration-300">

          <div className="max-w-7xl mx-auto">

            <h2 className="text-center text-[32px] md:text-[40px] font-bold text-gray-900 dark:text-white mb-14">
              Core Capabilities for Corporates
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">

              {coreCapabilities.slice(0, 4).map((item, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-[#151821] rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="h-[220px] relative">
                    <Image
                      src={item.img}
                      alt="Capability"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <p className="text-[15px] leading-relaxed text-gray-600 dark:text-gray-300">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 max-w-5xl mx-auto mt-7">

              {coreCapabilities.slice(4).map((item, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-[#151821] rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="h-[220px] relative">
                    <Image
                      src={item.img}
                      alt="Capability"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <p className="text-[15px] leading-relaxed text-gray-600 dark:text-gray-300">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}

            </div>

          </div>
        </section>

        {/* ───────── ENTERPRISE SECTION ───────── */}
        <section className="relative w-full h-[620px] md:h-[420px] overflow-hidden">

          {/* Desktop Image */}
          <Image
            src="/image/corp-2.png"
            alt="Enterprise eSIM"
            fill
            className="hidden md:block object-cover"
          />

          {/* Mobile Image */}
          <Image
            src="/image/mobile-corp-2.png"
            alt="Enterprise eSIM Mobile"
            fill
            className="block md:hidden object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-r from-[#14004A]/95 via-[#1B0560]/75 to-transparent" />

          <div className="absolute inset-0 flex items-center">

            <div className="px-6 md:px-11 max-w-xl text-white">

             {/* <h2 className="text-[30px] md:text-[44px] font-bold leading-tight">
                Enterprise eSIM
                <br />
                infrastructure built
                <br />
                for scale.
              </h2>*/}

              <p className="mt-6 text-[15px] md:text-[17px] leading-relaxed text-gray-200">
              Our enterprise eSIM architecture enables central control with local flexibility — so you can deploy, manage, and scale travel connectivity as a secure extension of your corporate infrastructure.
              </p>

              <p className="mt-5 text-[15px] md:text-[17px] font-medium font-bold text-white">
               Zoiko Orbit for Corporate Travel — because business shouldn’t stop at the border.
              </p>

            </div>
          </div>
        </section>

        {/* ───────── TESTIMONIALS ───────── */}
        <section className="py-24 px-6 bg-[#f4f7fb] dark:bg-[#0b0d12] transition-colors duration-300">

          <div className="max-w-7xl mx-auto">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-14">

              <div>
                <h2 className="text-[32px] md:text-[40px] font-bold text-gray-900 dark:text-white">
                  What Enterprises Are Saying
                </h2>

                <p className="mt-3 text-[16px] text-gray-600 dark:text-gray-400">
                  Trusted by global teams and corporate travelers worldwide.
                </p>
              </div>

              <div className="flex gap-3">

                <button
                  onClick={prev}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white hover:bg-white dark:hover:bg-[#151821] transition-all"
                >
                  <FiChevronLeft />
                  Previous
                </button>

                <button
                  onClick={next}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white hover:bg-white dark:hover:bg-[#151821] transition-all"
                >
                  Next
                  <FiChevronRight />
                </button>

              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {(isMobile
                ? [testimonials[index]]
                : testimonials
              ).map((item, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-[#151821] rounded-3xl p-7 border border-gray-100 dark:border-gray-800 shadow-sm"
                >

                  <div className="flex items-center justify-between mb-5">

                    <div className="flex items-center gap-4">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />

                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-[15px]">
                          {item.name}
                        </h3>

                        <p className="text-[13px] text-gray-500 dark:text-gray-400">
                          {item.location}
                        </p>
                      </div>

                    </div>

                    <div className="flex gap-1 text-[#2f4f9e]">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <FaStar
                          key={idx}
                          className={idx < item.rating ? "" : "opacity-30"}
                        />
                      ))}
                    </div>

                  </div>

                  <p className="text-[14px] leading-relaxed text-gray-600 dark:text-gray-300">
                    {item.message}
                  </p>

                </div>
              ))}

            </div>

            <div className="mt-10 flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <span
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full ${
                    i === index
                      ? "bg-gray-800 dark:bg-white"
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}
                />
              ))}
            </div>

          </div>
        </section>

      </div>
    </>
  );
}