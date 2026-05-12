"use client";

import Image from "next/image";
import { useRef } from "react";

export default function CorporatePage() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!carouselRef.current) return;
    const width = carouselRef.current.offsetWidth;

    carouselRef.current.scrollBy({
      left: dir === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  const features = [
    {
      img: "/image/Rectangle-908.webp",
      text: "Zero-touch provisioning through MDM, QR, or API workflows",
    },
    {
      img: "/image/Rectangle-909-1.webp",
      text: "Region-based data plans with country-specific tax compliance",
    },
    {
      img: "/image/Rectangle-910.webp",
      text: "Real-time dashboards with granular usage, cost center attribution, and policy enforcement",
    },
    {
      img: "/image/Rectangle-911.webp",
      text: "Multi-entity, multi-currency invoicing — audit-ready for finance and procurement",
    },
    {
      img: "/image/Rectangle-908-1.webp",
      text: "Role-based access for IT, operations, and mobility stakeholders",
    },
    {
      img: "/image/Rectangle-909-2.webp",
      text: "eKYC onboarding, encrypted eSIM delivery, and SOC 2–aligned infrastructure",
    },
    {
      img: "/image/Rectangle-910-1.webp",
      text: "Tier-1 global coverage with 24/7 multilingual enterprise support",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Thompson — New York, USA",
      text: "Seamless connectivity everywhere I’ve traveled.",
      img: "/image/user1.jpg",
    },
    {
      name: "James Fielding — London, UK",
      text: "Integrated effortlessly into our agency’s portfolio.",
      img: "/image/user2.jpg",
    },
    {
      name: "Rajeev Nair — Mumbai, India",
      text: "Retailers love the global reach and tech.",
      img: "/image/user3.jpg",
    },
  ];

  return (
    <div>

      {/* 🔹 HERO */}
      <section className="section text-center bg-[var(--section-bg)]">
        <div className="container-custom">
          <h1 className="heading">
            Global mobility,<br />secured and simplified
          </h1>

          <p className="text-muted mt-6 max-w-3xl mx-auto">
            Zoiko Orbit delivers enterprise-ready eSIM connectivity for organizations that move across borders and time zones.
          </p>

          <p className="text-muted mt-4 max-w-3xl mx-auto">
            Whether you manage 10 consultants or 10,000 users, your teams stay connected and protected.
          </p>
        </div>
      </section>

      {/* 🔹 FEATURES */}
      <section className="section">
        <div className="container-custom">
          <h2 className="heading text-center mb-10">
            Core Capabilities for Corporates
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item, i) => (
              <div key={i} className="card p-4 text-center">
                <Image
                  src={item.img}
                  alt="feature"
                  width={500}
                  height={300}
                  className="rounded-lg mb-4"
                />
                <p className="font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 CTA */}
      <section className="section bg-[var(--primary)] text-white text-center">
        <div className="container-custom">
          <h2 className="heading">
            Deploy, manage, and scale connectivity globally
          </h2>

          <p className="mt-4">
            Zoiko Orbit for Corporate Travel — business shouldn’t stop at the border.
          </p>
        </div>
      </section>

      {/* 🔹 TESTIMONIALS */}
      <section className="section">
        <div className="container-custom">

          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="heading">What Travelers Are Saying</h2>
              <p className="text-muted">Trust our customers</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => scroll("left")}
                className="btn-primary"
              >
                Prev
              </button>
              <button
                onClick={() => scroll("right")}
                className="btn-primary"
              >
                Next
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scroll-smooth"
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="min-w-[300px] card p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src={t.img}
                    alt="user"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div className="text-yellow-500">★★★★★</div>
                </div>

                <h4 className="font-semibold">{t.name}</h4>
                <p className="text-muted mt-2">{t.text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}