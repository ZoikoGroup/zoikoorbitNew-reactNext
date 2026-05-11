"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";

const faqData = {
  "eSIM Activation & Setup": [
    {
      question: "How do I activate my Zoiko Orbit eSIM on iOS or Android?",
      answer:
        "1. After purchasing a plan, you’ll receive a QR code and manual activation details via email. 2. On iOS: Go to Settings > Cellular > Add eSIM → Scan QR code. On Android: Settings > Network & Internet > Mobile Network > Add Carrier → Scan QR code. 3. Follow on-screen prompts and restart your phone after setup. 4. Your data plan will start once the eSIM connects to a supported network.",
    },
    {
      question: "Can I use Zoiko Orbit on multiple devices?",
      answer:
        "No, one eSIM profile can only be installed on one device at a time.",
    },
    {
      question: "How do I switch from a physical SIM to Zoiko Orbit’s eSIM?",
      answer:
        "1. Ensure your phone is eSIM-compatible and unlocked. 2. Back up your current data. 3. Insert Zoiko eSIM via QR or manual setup. 4. Remove the physical SIM after successful activation.",
    },
  ],

  "Plans & Compatibility": [
    {
      question: "What are the different plan types offered?",
      answer:
        "Zoiko Orbit offers: Regional Plans: For specific zones (e.g., Europe, Asia). Global Plans: Valid in 100+ countries. Unlimited/Fixed Data Plans: Choose based on usage needs and duration (1 day to 90 days).",
    },
    {
      question: "Is my device compatible with Zoiko Orbit eSIMs?",
      answer:
        "Most unlocked smartphones with eSIM support work, including iPhone XS and newer, Google Pixel 3+, Samsung S20+, and newer Android devices. A full compatibility list is available in our Help Center.",
    },
    {
      question: "How do I set up dual SIM (physical + eSIM)?",
      answer:
        "1. Activate Zoiko eSIM as secondary data line. 2. Use physical SIM for calls/SMS (if needed). 3. In settings, choose which SIM handles mobile data, calls, and messages.",
    },
  ],

  "Roaming & Usage": [
    {
      question: "How does Zoiko Orbit handle roaming?",
      answer:
        "Zoiko partners with tier-1 local carriers globally. When you land in a supported country, your device connects automatically to the strongest available network — no roaming fees or SIM swaps required.",
    },
    {
      question: "Can I track my data usage in real time?",
      answer:
        "Yes. Open the Zoiko Orbit app or dashboard → Go to Usage Analytics. You can view usage by country, category (streaming, social, etc.), or time period.",
    },
  ],

  "Troubleshooting & Support": [
    {
      question: "My QR code isn’t working — what should I do?",
      answer:
        "· Double-check if your camera is scanning correctly. · Make sure your device is connected to Wi-Fi. · Use the manual setup instructions provided in your email. · If issues persist, contact 24/7 live chat support.",
    },
    {
      question:
        "I’m not getting any signal. What are the steps to resolve this?",
      answer:
        "1. Make sure mobile data is enabled. 2. Go to settings and ensure Zoiko eSIM is the selected data source. 3. Restart your device. 4. Check coverage map to verify network availability. 5. Still stuck? Contact support with your location & error message.",
    },
  ],

  "Billing & Subscription": [
    {
      question: "How do I renew or extend my eSIM plan?",
      answer:
        "· Log into the Zoiko Orbit app/dashboard. · Select your active plan → Choose [Renew] or [Buy Add-on]. · Payment via card or wallet will auto-update your plan.",
    },
    {
      question: "Can I cancel my plan mid-way?",
      answer:
        "Prepaid plans are non-refundable once activated. However, you can choose not to renew at expiry — no auto-renewal unless enabled.",
    },
    {
      question: "What payment methods are supported?",
      answer:
        "We support all major credit/debit cards, Google Pay, Apple Pay, and region-specific wallets (like Paytm, UPI, etc. in India).",
    },
  ],

  "Privacy & Account Security": [
    {
      question: "How does Zoiko Orbit protect my data?",
      answer:
        "We’re GDPR and CCPA compliant. All user data is encrypted end-to-end, and we never sell or share personal information with third parties.",
    },
    {
      question: "What happens if I lose my phone with Zoiko eSIM?",
      answer:
        "Immediately log into your Zoiko account via another device and disable the eSIM. Contact support for remote deactivation and reissuance options.",
    },
  ],

  "Enterprise & IT FAQs": [
    {
      question: "How does MDM-based deployment work?",
      answer:
        "Zoiko Orbit supports MDM tools (Jamf, Intune, etc.) for bulk provisioning. IT admins receive activation profiles for all enrolled devices, reducing manual setup to <2 minutes per device.",
    },
    {
      question: "Can we generate GST/region-based invoices for employees?",
      answer:
        "Yes. Invoices can be auto-tagged per location, cost center, or GST number. Admins can download them in bulk from the dashboard.",
    },
    {
      question: "How do I manage multiple users on a shared account?",
      answer:
        "Use the Team Management module to: · Assign roles (Admin, Viewer, Finance Lead). · Add or remove users. · Monitor usage and enforce limits per employee.",
    },
  ],
};
const RightArrowIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const DownArrowIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export default function Faqs() {
  const categories = Object.keys(faqData);

  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };
  return (
    <>
      {/* Hero section */}
      <section className="relative w-full overflow-hidden">
        {/* Background Image */}
        <div className="relative w-full h-80 sm:h-100 md:h-125 lg:h-138">
          <Image
            src="/image/faq-heropic.png"
            alt="FAQ Banner"
            fill
            priority
            className="object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/55" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16">
              <div className="max-w-2xl">
                <h1 className="text-white font-bold leading-tight text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
                  Instant Answers —
                  <br />
                  Anytime, Anywhere
                </h1>

                <p className="mt-5 text-white/90 text-sm sm:text-base md:text-xl leading-relaxed">
                  Access clear, verified answers to the most frequently asked
                  questions about Zoiko Orbit’s global eSIM platform. Our
                  intelligent knowledge base is built to deliver immediate
                  clarity for both personal and enterprise users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faq's */}
      <section className="w-full bg-[#f5f5f5] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1f2937]">
              Got Questions? We’ve Got Answers
            </h2>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Sidebar */}
            <div className="lg:col-span-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase text-gray-400 mb-4">
                  Getting Started With Your eSIM
                </p>

                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveCategory(category);
                      setOpenFAQ(0);
                    }}
                    className={`w-full flex items-center justify-between border-b pb-2 pt-2 text-left transition-all duration-300
                  ${
                    activeCategory === category
                      ? "text-[#007b95] border-[#007b95] font-semibold"
                      : "text-gray-400 border-gray-300 hover:text-[#007b95]"
                  }`}
                  >
                    <span className="text-sm md:text-base">{category}</span>

                    <RightArrowIcon
                      className={`w-5 h-5 transition-transform duration-300 ${
                        activeCategory === category ? "translate-x-1" : ""
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right FAQ Content */}
            <div className="lg:col-span-8">
              <h3 className="text-xl sm:text-3xl font-bold text-[#007b95] mb-8">
                {activeCategory} FAQs
              </h3>

              <div className="space-y-2">
                {faqData[activeCategory as keyof typeof faqData].map(
                  (faq, index) => (
                    <div key={index} className="border-b border-gray-300 pb-4">
                      {/* Question */}
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full flex items-center justify-between gap-4 text-left py-2"
                      >
                        <span className="text-base sm:text-lg font-medium text-[#1f2937]">
                          {faq.question}
                        </span>

                        {openFAQ === index ? (
                          <DownArrowIcon className="w-5 h-5 shrink-0" />
                        ) : (
                          <RightArrowIcon className="w-5 h-5 shrink-0" />
                        )}
                      </button>

                      {/* Answer */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          openFAQ === index
                            ? "max-h-40 opacity-100 mt-3"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed pr-6">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Need more help */}
      <section className="w-full bg-[#f5f5f5] py-12 md:py-20 overflow-hidden">
        <div className=" ">
          {/* Main Wrapper */}
          <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch">
            {/* Left Image */}
            <div className="w-full relative z-10">
              <div className="w-full relative h-65 sm:h-87.5 md:h-105 lg:h-105 overflow-hidden shadow-md">
                <Image
                  src="/image/help-support.png"
                  alt="Support Team"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Card */}
            <div
              className="
          relative lg:absolute
          lg:right-0
          lg:top-1/2
          lg:-translate-y-1/2
          w-full
          lg:w-[40%]
          bg-white
          shadow-xl
          rounded-lg
          -mt-5
          sm:-mt-10
          lg:mt-10
          z-20
          lg:mr-12
        "
            >
              <div className="p-6 sm:p-8 md:p-10">
                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl font-bold text-[#007b95] mb-3">
                  Need More Help?
                </h2>

                {/* Description */}
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8">
                  Chat live with our experts or explore the full Knowledge Base.
                </p>

                {/* Support Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Chat Support */}
                  <div className="flex flex-col items-start">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-full bg-[#007b95] flex items-center justify-center mb-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="white"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4-.8L3 20l1.2-3.6A7.717 7.717 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </div>

                    {/* Content */}
                    <p className="text-gray-500 text-sm leading-relaxed mb-3">
                      Chat live with our multilingual support agents anytime,
                      anywhere.
                    </p>

                    <button className="text-[#007b95] font-semibold hover:underline">
                      Chat Now →
                    </button>
                  </div>

                  {/* Watch Videos */}
                  <div className="flex flex-col items-start">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-full bg-[#007b95] flex items-center justify-center mb-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="white"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 19h8a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>

                    {/* Content */}
                    <p className="text-gray-500 text-sm leading-relaxed mb-3">
                      Watch quick-start video tutorials and browse our
                      self-service library.
                    </p>

                    <button className="text-[#007b95] font-semibold hover:underline">
                      Watch Now →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
