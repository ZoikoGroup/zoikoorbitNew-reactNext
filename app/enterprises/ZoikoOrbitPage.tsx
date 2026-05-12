"use client";
import Image from "next/image";
import React, { useState } from "react";

const ZoikoOrbitPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="font-sans text-gray-800 bg-white dark:bg-gray-900 dark:text-white">

      {/* HERO SECTION */}
      <section
        className="relative min-h-[420px] flex items-center"
        style={{ background: "linear-gradient(90deg, #0a2540 60%, #1a4a7a 100%)" }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/image/Rectangle 4 (7).png"
            alt="Travel background"
            className="w-full h-full object-cover opacity-90"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white dark:text-white leading-tight mb-4">
              Empower Your Teams<br />with Global Connectivity
            </h1>
            <p className="text-white dark:text-white text-lg mb-8 max-w-md">
              Enterprise eSIM solutions for corporate travel, remote teams, and global device deployments
            </p>
            <button className="bg-cyan-400 hover:bg-cyan-300 text-gray-900 font-bold px-8 py-3 rounded-full text-base transition-all shadow-lg">
              Get Your eSIM
            </button>
          </div>
      
        </div>
      </section>

      {/* WHY LEADING ENTERPRISES */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Why leading enterprises standardize on Zoiko Orbit™
          </h2>
          <p className="text-gray-500 dark:text-white mb-12">Unlock new revenue and delight travelers with ready-to-activate global data.</p>

          {/* Single grey container holding 3 feature blocks */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x md:divide-gray-200 dark:md:divide-gray-700">
              {[
                {
                  icon: "/image/Group 1597883246.png",
                  title: "Predictable Costs",
                  desc: "Consolidated global data spend. Pooled plans, volume pricing, cost center tagging.",
                },
                {
                  icon: "/image/Group 1597883256.png",
                  title: "Tier-1 Security & Compliance",
                  desc: "GDPR, SOC 2, PCI — enterprise data handling standards baked in.",
                },
                {
                  icon: "/image/Group 1597883257.png",
                  title: "Easy Central Admin",
                  desc: "Provision, reassign, and report on usage across teams in one dashboard.",
                },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-start text-left px-2 md:px-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-600/10 dark:bg-gray-900">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-500 dark:text-white text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONNECTIVITY BUILT AROUND */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Connectivity Built Around<br />How Your Organization Operates
          </h2>
          <p className="text-gray-500 dark:text-white mb-12">Scale from a few travelers to global workforce coverage — mix &amp; match programs</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                img: "/image/Rectangle 908 (2).png",
                title: "Corporate Travel Plans",
                desc: "Pre-trip provisioning tied to bookings; regional or global data pools; expense integration.",
              },
              {
                img: "/image/Rectangle 909 (2).png",
                title: "Remote & Hybrid Team Data",
                desc: "Always-on data for distributed teams; monthly top-ups; device-agnostic eSIM delivery.",
              },
              {
                img: "/image/Rectangle 910 (2).png",
                title: "Bespoke Global Programs",
                desc: "Custom coverage bundles for project deployments, maritime/energy crews, events, or high-security missions.",
              },
            ].map((item, i) => (
              <div key={i} className="text-left">
                <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-500 dark:text-white text-sm mb-3">{item.desc}</p>
                <a href="#" className="text-teal-700 dark:text-teal-400 text-sm font-semibold hover:underline">Learn More →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLUG INTO SYSTEMS */}
      <section className="py-16 bg-[#eaf3fb] dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            Plug Zoiko Orbit into the Systems You Already Use
          </h2>
          <p className="text-gray-500 dark:text-white text-center mb-12">APIs, SSO, reporting feeds, and travel platform connectors accelerate rollout</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="relative w-full h-72 rounded-2xl overflow-hidden shadow">
              <Image
                src="/image/multiracial-business-team-smiling-together-in-a-co-2025-02-22-04-24-03-utc 1.png"
                alt="Team integration"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4">Key Capability</h3>
              <ul className="space-y-3 text-gray-600 dark:text-white text-sm">
                {[
                  "REST + Webhook Events (activation, usage, thresholds)",
                  "SSO (SAML / OAuth) for admin portal",
                  "Multi-currency billing + cost center mapping",
                  "Usage exports (CSV / API) to ERP & expense tools",
                  "Policy-based auto provisioning via booking data",
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

      {/* PROVEN AT GLOBAL SCALE */}
    <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">Proven at Global Scale.</h2>
          <p className="text-gray-500 dark:text-white text-center mb-12">Enterprises reduce roaming spend and improve traveler experience with Zoiko Orbit™</p>

          {/* Case Study 1 - Image left, text right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
            <div className="relative w-full h-80 rounded-2xl overflow-hidden">
              <Image src="/image/Vector (7).png" alt="Legal case study" fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">
                Empowering Global Legal Excellence: How a Multinational Law Firm Reduced Roaming Costs by 62% While Enhancing Executive Mobility
              </h3>
              <p className="text-sm text-gray-500 dark:text-white font-semibold mb-2">Client Overview</p>
              <p className="text-sm text-gray-600 dark:text-white mb-3">
                One of the world's leading cross-border law firms, with over 3,400 partners and senior counsel operating in 20+ countries across North America, Europe, the Middle East, and Asia.
              </p>
              <p className="text-xs text-gray-500 dark:text-white mb-4">
                Industry: Legal Services, International Arbitration, Corporate Law<br />
                Use Case Focus: Executive Airport Mobility & Real-Time Connectivity
              </p>
              <a href="#" className="text-teal-700 dark:text-teal-400 text-sm font-semibold hover:underline">Read More →</a>
            </div>
          </div>

          {/* Case Study 2 - Text left, image right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">
                Luxury Reimagined: How a Global Hospitality Group Delivered Always-On VIP Connectivity Across 17 Countries
              </h3>
              <p className="text-sm text-gray-500 dark:text-white font-semibold mb-2">Client Overview</p>
              <p className="text-sm text-gray-600 dark:text-white mb-3">
                A premier hospitality chain operating over 200 properties across the Caribbean, LATAM, Europe, and Southeast Asia, catering to elite travellers and high-net-worth clientele.
              </p>
              <p className="text-xs text-gray-500 dark:text-white mb-4">
                Industry: Travel, Leisure & Hospitality<br />
                Use Case Focus: Guest eSIM Integration & Staff Mobility
              </p>
              <a href="#" className="text-teal-700 dark:text-teal-400 text-sm font-semibold hover:underline">Read More →</a>
            </div>
            <div className="relative w-full h-80 rounded-2xl overflow-hidden">
              <Image src="/image/x.png" alt="Hospitality case study" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

    {/* ================= CONTACT / CONSULTATION SECTION ================= */}
<section className="relative bg-[#f5f5f5] dark:bg-gray-900 overflow-hidden pb-24">

  {/* Top Banner Image */}
  <div className="relative w-full h-[320px] md:h-[420px]">
    <Image
      src="/image/test.jpg"
      alt="travel"
      fill
      className="object-cover"
      priority
    />

    {/* Soft Overlay */}
    <div className="absolute inset-0 bg-black/10"></div>
  </div>

  {/* World Map Background */}
  <div className="absolute left-0 bottom-10 w-[320px] md:w-[500px] opacity-20 pointer-events-none">
    <Image
      src="/image/map.png"
      alt="world map"
      width={500}
      height={500}
      className="object-contain"
    />
  </div>

  {/* Form Card */}
  <div className="relative max-w-7xl mx-auto px-6">
    
    <div className="bg-white dark:bg-gray-900 max-w-4xl ml-auto -mt-32 rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100 dark:border-gray-700">

      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
          Let's Transform Your <br />
          Global Travel & Mobility Program.
        </h2>

        <p className="text-gray-600 dark:text-white mt-3">
          Share a few details and our specialists will respond within 24 hours
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5">

        {/* Row 1 */}
        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="text-sm text-gray-700 dark:text-white mb-2 block">
              First Name <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="Enter First Name"
              className="w-full bg-gray-100 dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 dark:text-white mb-2 block">
              Last Name <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="Enter Last Name"
              className="w-full bg-gray-100 dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

        </div>

        {/* Row 2 */}
        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="text-sm text-gray-700 dark:text-white mb-2 block">
              Business Email <span className="text-red-500">*</span>
            </label>

            <input
              type="email"
              placeholder="Enter Work Email"
              className="w-full bg-gray-100 dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 dark:text-white mb-2 block">
              Company / Organization <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="Enter Company/Organization Name"
              className="w-full bg-gray-100 dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

        </div>

        {/* Row 3 */}
        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="text-sm text-gray-700 dark:text-white mb-2 block">
              Phone (If Needed)
            </label>

            <input
              type="text"
              placeholder="Enter Website URL"
              className="w-full bg-gray-100 dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 dark:text-white mb-2 block">
              Country / Region <span className="text-red-500">*</span>
            </label>

            <select
              className="w-full bg-gray-100 dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-teal-600 text-gray-600"
            >
              <option>Select Option</option>
              <option>India</option>
              <option>United States</option>
              <option>United Kingdom</option>
            </select>
          </div>

        </div>

        {/* Inquiry */}
        <div>
          <label className="text-sm text-gray-700 dark:text-white mb-2 block">
            Inquiry Type <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="Corporate Travel, Remote Workforce, Bulk Deployment, Security Review, Integration Other"
            className="w-full bg-gray-100 dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>

        {/* Message */}
        <div>
          <textarea
            rows={5}
            placeholder="Enter your message..."
            className="w-full bg-gray-100 dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md px-4 py-4 outline-none resize-none focus:ring-2 focus:ring-teal-600"
          />
        </div>

        {/* Checkbox */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-1 accent-teal-700"
          />

          <p className="text-sm text-gray-600 dark:text-white">
            I agree to be contacted by Zoiko Orbit regarding partner opportunities.
          </p>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-teal-700 hover:bg-teal-800 transition text-white font-medium px-8 py-3 rounded-lg shadow-md"
        >
          Submit & Schedule a Consultation
        </button>

      </form>
    </div>
  </div>
</section>

      {/* FAQ SECTION */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">Got Questions? We've Got Answers</h2>
          <div className="divide-y divide-gray-200 dark:divide-gray-700 border-t border-b border-gray-200 dark:border-gray-700">
            {[
              "Can we centrally manage data for all our travelers?",
              "Do you integrate with our travel booking tool?",
              "How secure is traveler data?",
              "How quickly can we roll out globally?",
            ].map((q, i) => (
              <div key={i}>
                <button
                  className="w-full flex justify-between items-center py-5 text-left text-gray-800 dark:text-white font-medium hover:text-blue-700 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{q}</span>
                  <span className="text-xl text-gray-400 dark:text-white">{openFaq === i ? "−" : "›"}</span>
                </button>
                {openFaq === i && (
                  <div className="pb-5 text-gray-500 dark:text-white text-sm">
                    Contact our enterprise team to learn more about this feature and how Zoiko Orbit can be tailored to your organization's needs.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ZoikoOrbitPage;