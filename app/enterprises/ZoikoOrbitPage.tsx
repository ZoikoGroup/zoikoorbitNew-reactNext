"use client";
import React, { useState } from "react";

const ZoikoOrbitPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="font-sans text-gray-800 bg-white">

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
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Empower Your Teams<br />with Global Connectivity
            </h1>
            <p className="text-white text-lg mb-8 max-w-md">
              Enterprise eSIM solutions for corporate travel, remote teams, and global device deployments
            </p>
            <button className="bg-cyan-400 hover:bg-cyan-300 text-gray-900 font-bold px-8 py-3 rounded-full text-base transition-all shadow-lg">
              Get Your eSIM
            </button>
          </div>
      
        </div>
      </section>

      {/* WHY LEADING ENTERPRISES */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Why leading enterprises standardize on Zoiko Orbit™
          </h2>
          <p className="text-gray-500 mb-12">Unlock new revenue and delight travelers with ready-to-activate eSIM</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "/image/Group 1597883246.png",
                title: "Predictable Costs",
                desc: "Consolidated global data pools, expense reporting, cost center tagging.",
              },
              {
                icon: "/image/Group 1597883246.png",
                title: "Tier-1 Security & Compliance",
                desc: "SOC 2, PCI + industry-leading security handling standards built-in.",
              },
              {
                icon: "/image/Group 1597883246.png",
                title: "Easy Central Admin",
                desc: "Provision, manage and report on all travelers from one dashboard.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow">
                <span className="text-4xl mb-4">{item.icon}</span>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm text-center">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONNECTIVITY BUILT AROUND */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Connectivity Built Around<br />How Your Organization Operates
          </h2>
          <p className="text-gray-500 mb-12">Scale from a few travelers to global workforce coverage: mix & match programs</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                img: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=80",
                title: "Corporate Travel Plans",
                desc: "The trip provisioning tool for bookings: regional or global data pools, expense management.",
              },
              {
                img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80",
                title: "Remote & Hybrid Team Data",
                desc: "Always on data for distributed teams. Monthly top-ups, device-agnostic eSIM delivery.",
              },
              {
                img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80",
                title: "Bespoke Global Programs",
                desc: "Custom coverage bundles for project deployments, maritime/energy crews, or high-security industries.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow text-left">
                <img src={item.img} alt={item.title} className="w-full h-44 object-cover" />
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm mb-3">{item.desc}</p>
                  <a href="#" className="text-blue-600 text-sm font-semibold hover:underline">Learn More →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLUG INTO SYSTEMS */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Plug Zoiko Orbit into the Systems You Already Use
          </h2>
          <p className="text-gray-500 text-center mb-12">APIs, SSO, reporting feeds, and travel platform connectors accelerate rollout</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80"
              alt="Office integration"
              className="rounded-2xl w-full h-64 object-cover shadow"
            />
            <div>
              <h3 className="font-bold text-xl text-gray-900 mb-4">Key Capability</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                {[
                  "REST + Webhook Events (activation, usage, thresholds)",
                  "SSO (SAML / OAuth) for admin portal",
                  "Multi-currency + cost center mapping",
                  "Usage exports (CSV / API) to ERP & expense tools",
                  "Policy-based auto provisioning via booking data",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROVEN AT GLOBAL SCALE */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Proven at Global Scale.</h2>
          <p className="text-gray-500 text-center mb-12">Enterprises reduce roaming spend and improve traveler experience with Zoiko Orbit™</p>

          {/* Case Study 1 */}
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Empowering Global Legal Excellence: How a Multinational Law Firm Reduced Roaming Costs by 62% While Enhancing Executive Mobility
              </h3>
              <p className="text-sm text-gray-500 font-semibold mb-2">Client Overview</p>
              <p className="text-sm text-gray-600 mb-4">
                One of the world's leading cross-border law firms, with over 3,400 partners and senior counsel operating in 30+ countries across North America, Europe, the Middle East, and Asia.
              </p>
              <p className="text-xs text-gray-400 mb-4">
                Industry: Legal Services, International Arbitration, Corporate Law<br />
                Use Case Focus: Executive Airport Mobility & Real-Time Connectivity
              </p>
              <a href="#" className="text-blue-600 text-sm font-semibold hover:underline">Read More</a>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
                "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=300&q=80",
                "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=300&q=80",
                "https://images.unsplash.com/photo-1560264280-88b68371db39?w=300&q=80",
              ].map((src, i) => (
                <img key={i} src={src} alt="Case study" className="rounded-lg w-full h-24 object-cover" />
              ))}
            </div>
          </div>

          {/* Case Study 2 */}
          <div className="bg-white rounded-2xl shadow-sm p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80"
                alt="Hospitality"
                className="rounded-xl w-full h-52 object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Luxury Reimagined: How a Global Hospitality Group Delivered Always-On VIP Connectivity Across 17 Countries
              </h3>
              <p className="text-sm text-gray-500 font-semibold mb-2">Client Overview</p>
              <p className="text-sm text-gray-600 mb-4">
                A premier hospitality chain operating over 200 properties across the Caribbean, LATAM, Europe, and Southeast Asia, catering to ultra-travelers and high-net-worth clientele.
              </p>
              <p className="text-xs text-gray-400 mb-4">
                Industry: Travel, Leisure & Hospitality<br />
                Use Case Focus: Corporate eSIM Integration & Staff Mobility
              </p>
              <a href="#" className="text-blue-600 text-sm font-semibold hover:underline">Read More</a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT / TRANSFORM SECTION */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a2540 60%, #1a4a7a 100%)" }}
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&q=80"
            alt="Background"
            className="w-full h-full object-cover opacity-15"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Let's Transform Your<br />Global Travel & Mobility Program.
            </h2>
            <p className="text-blue-200 text-sm">Share a few details and our specialists will respond within 24 hours.</p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="First Name" />
              <input className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Last Name" />
            </div>
            <input className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Business Email" />
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Company Name" />
              <input className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Travel Program Size" />
            </div>
            <input className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="City" />
            <select className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500">
              <option value="">Country</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>India</option>
              <option>Other</option>
            </select>
            <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition-colors text-sm">
              Submit & Schedule a Consultation
            </button>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Got Questions? We've Got Answers</h2>
          <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {[
              "Can we centrally manage data for all our travelers?",
              "Do you integrate with our travel booking tool?",
              "How secure is traveler data?",
              "How quickly can we roll out globally?",
            ].map((q, i) => (
              <div key={i}>
                <button
                  className="w-full flex justify-between items-center py-5 text-left text-gray-800 font-medium hover:text-blue-700 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{q}</span>
                  <span className="text-xl text-gray-400">{openFaq === i ? "−" : "›"}</span>
                </button>
                {openFaq === i && (
                  <div className="pb-5 text-gray-500 text-sm">
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