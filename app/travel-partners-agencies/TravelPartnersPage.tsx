"use client";
import Image from "next/image";
import React from "react";

const TravelPartnersPage = () => {
  return (
    <div className="font-sans text-gray-800 bg-white dark:bg-gray-900 dark:text-white">

      {/* ============ HERO SECTION ============ */}
      <section className="relative min-h-[420px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/image/Rectangle 4 (8).png"
            alt="Travel partners hero"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Grow Your Business with<br />
              Premier Global eSIM Solutions.
            </h1>
            <p className="text-white text-base mb-8">
              Offer cutting-edge connectivity — and earn.
            </p>
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-md text-base transition-all shadow-lg">
              Become a Partner
            </button>
          </div>
        </div>
      </section>

      {/* ============ WHY PARTNER WITH ZOIKO ORBIT ============ */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Why Partner with Zoiko Orbit™
          </h2>
          <p className="text-gray-500 dark:text-white mb-12">
            Why travelers trust Zoiko Orbit for a hassle-free experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: "/image/Group 1597883248.png",
                title: "Attractive Commissions",
                desc: "Earn competitive payouts on every eSIM sold through your network.",
              },
              {
                icon: "/image/Group 1597883235 (1).png",
                title: "Tier-1 Coverage",
                desc: "Provide customers with high-speed, reliable data across 220+ countries.",
              },
              {
                icon: "/image/Group 1597883236 (1).png",
                title: "White-Label Options",
                desc: "Offer eSIMs under your brand with customizable storefronts.",
              },
              {
                icon: "/image/Group 1597883237 (1).png",
                title: "Dedicated Support",
                desc: "Access to partner success managers and 24/7 technical support.",
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center px-2">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-600">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 dark:text-white text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ INTEGRATE AND SELL EFFORTLESSLY ============ */}
      <section className="py-16 bg-[#eaf3fb] dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            {/* Left Image */}
            <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden">
              <Image
                src="/image/young-business-man-talking-on-smartphone-working-w-2025-02-13-00-11-27-utc 1.png"
                alt="Integrate and sell effortlessly"
                fill
                className="object-cover"
              />
            </div>

            {/* Right Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                Integrate and Sell<br />Effortlessly.
              </h2>
              <p className="text-gray-600 dark:text-white mb-6">
                Set up a ready-to-use storefront with your logo and brand colors.
              </p>

              <h3 className="font-bold text-gray-900 dark:text-white mb-3">API: Plug & Play</h3>
              <ul className="space-y-3 text-gray-600 dark:text-white text-sm">
                {[
                  "Easy plan customization.",
                  "Commission dashboard.",
                  "Marketing-ready assets.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-teal-700 dark:text-teal-400 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOW TO INSTALL AND ACTIVATE ============ */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            How to Install and Activate / Start eSIM
          </h2>
          <p className="text-gray-500 dark:text-white mb-12">
            Unlock new revenue and delight travelers with ready-to-activate global data.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                img: "/image/Rectangle 938.png",
                title: "Pick Destination & Data",
                desc: "Choose from Global, Regional, or Sub-Regional plans tailored for your travel zone.",
              },
              {
                img: "/image/Rectangle 939.png",
                title: "Activate in Minutes",
                desc: "Secure checkout → receive QR code → scan or enter details to install.",
              },
              {
                img: "/image/Rectangle 940.png",
                title: "Roam Globally",
                desc: "Connect to Tier-1 networks in 220+ countries instantly.",
              },
            ].map((item, i) => (
              <div key={i} className="text-left">
                <div className="relative w-full h-56 mb-4 flex items-center justify-center">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 dark:text-white text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ START YOUR PARTNERSHIP JOURNEY ============ */}
      <section className="relative bg-[#f5f5f5] dark:bg-gray-900 overflow-hidden">

        {/* Background Banner Image */}
        <div className="relative w-full h-[600px] md:h-[560px]">
          <Image
            src="/image/file.jpg"
            alt="Partnership journey"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Form Card Overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="md:ml-auto md:max-w-xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100 dark:border-gray-700">

              {/* Heading */}
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
                  Start Your Partnership Journey.
                </h2>
                <p className="text-sm text-gray-600 dark:text-white">
                  Fill in your details — our team will reach out within 48 hours.
                </p>
              </div>

              {/* Form */}
              <form className="space-y-4">

                {/* Row 1 */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-700 dark:text-white mb-1 block">
                      Full Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Full Name"
                      className="w-full bg-gray-100 dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-700 dark:text-white mb-1 block">
                      Company/Agency Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Company/Agency Name"
                      className="w-full bg-gray-100 dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-700 dark:text-white mb-1 block">
                      Business Email<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter Work Email"
                      className="w-full bg-gray-100 dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-700 dark:text-white mb-1 block">
                      Role<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="(Owner, Manager, Agent)"
                      className="w-full bg-gray-100 dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-700 dark:text-white mb-1 block">
                      Website (if any)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Website URL"
                      className="w-full bg-gray-100 dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-700 dark:text-white mb-1 block">
                      Type of Partnership<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="(API, White Label, Distributor, Other)"
                      className="w-full bg-gray-100 dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <textarea
                    rows={4}
                    placeholder="Enter your message..."
                    className="w-full bg-gray-100 dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md px-3 py-3 text-sm outline-none resize-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                {/* Checkbox */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    className="mt-1 accent-teal-700"
                  />
                  <p className="text-xs text-gray-600 dark:text-white">
                    I agree to be contacted by Zoiko Orbit regarding partner opportunities.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-teal-700 hover:bg-teal-800 transition text-white font-medium px-8 py-3 rounded-md shadow-md"
                >
                  Submit & Schedule Consultation
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default TravelPartnersPage;