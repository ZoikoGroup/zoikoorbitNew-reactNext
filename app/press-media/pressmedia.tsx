"use client";

import Image from "next/image";

export default function PressMedia() {
  return (
    <div className="w-full bg-white dark:text-white dark:bg-gray-900">
      {/* HERO SECTION */}
      <div className="relative w-full h-[600px] md:h-[420px]">
        <Image
          src="/image/Rectangle 41582.png"
          alt="press"
          fill
          className="object-cover"
        />
        <Image
              src="/image/press-mobile.png"
              alt="press"
              fill
              priority
              className="block md:hidden object-cover"
            />

        {/* overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/20" />

        {/* text */}
        <div className="absolute top-10 left-6 md:right-10 md:left-auto md:top-1/2 md:-translate-y-1/2 text-white max-w-md">          
        <h1 className="text-[42px] md:text-4xl font-bold mb-4 leading-tight">
            Press & Media
          </h1>
          <p className="text-[15px] leading-8  text-gray-200 max-w-[320px]">
            Stay informed with the latest developments from Zoiko Orbit —
            including product innovations, global rollouts, strategic alliances,
            sustainability initiatives, and thought leadership from our executive team.
          </p>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-4 grid md:grid-cols-2 gap-10 items-center dark:text-white dark:bg-gray-900">
        {/* Left Image */}
        <div className="w-full">
          <Image
            src="/image/vector.png"
            alt="news"
            width={500}
            height={400}
            className="rounded-md object-cover w-full"
          />
          
        </div>

        {/* Right Content */}
        <div>
          <p className=" dark:text-white dark:bg-gray-900 text-gray-600 text-sm leading-relaxed mb-6">
            Our dedicated Press & Media Center provides accredited journalists,
            editors, and analysts with access to official press releases,
            multimedia assets, leadership profiles, and high-resolution imagery
            across our global operations.
          </p>

          <p className="text-gray-600 text-sm mb-4 dark:text-white dark:bg-gray-900">
            We welcome media inquiries for:
          </p>

          <ul className="space-y-3 text-sm dark:text-white dark:bg-gray-900 text-gray-700">
            {[
              "Interviews with executives and technical leads",
              "Industry commentary on eSIM, travel connectivity, and telecom evolution",
              "Press briefings and event coverage",
              "Feature articles and trend analysis",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* BOTTOM TEXT */}
      <div className="max-w-6xl mx-auto px-6 pb-16 text-gray-600 text-sm leading-relaxed space-y-6 dark:text-white dark:bg-gray-900">
        <p>
          Our team offers timely responses, factual verification, and on-the-record
          perspectives to support high-quality reporting and global syndication
        </p>

        <p>
          Media Contact:
          <br />
          press@zoikoorbit.com
        </p>

        <p>
          For brand guidelines, logos, approved photography, and editorial assets,
          please visit our Brand Resources page.
        </p>
      </div>
    </div>
  );
} 