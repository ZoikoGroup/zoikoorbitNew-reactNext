"use client";

import Image from "next/image";

const partnershipPathways = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" stroke="white" strokeWidth="2" fill="none" />
        <path d="M24 12 C18 12 14 16 14 20 C14 26 20 28 24 30 C28 28 34 26 34 20 C34 16 30 12 24 12Z" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M20 20 L24 24 L28 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="34" r="3" stroke="white" strokeWidth="1.5" fill="none" />
        <circle cx="24" cy="38" r="3" stroke="white" strokeWidth="1.5" fill="none" />
        <circle cx="32" cy="34" r="3" stroke="white" strokeWidth="1.5" fill="none" />
        <line x1="19" y1="34" x2="21" y2="35" stroke="white" strokeWidth="1.5" />
        <line x1="27" y1="35" x2="29" y2="34" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
    title: "White-Label Solutions",
    desc: "Deliver connectivity under your own brand, backed by our Tier-1 Infrastructure",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" stroke="white" strokeWidth="2" fill="none" />
        <path d="M16 28 C16 28 18 32 24 32 C30 32 32 28 32 28" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="18" cy="20" r="4" stroke="white" strokeWidth="1.5" fill="none" />
        <circle cx="30" cy="20" r="4" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M18 24 L30 24" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Co-Branded Alliances",
    desc: "Amplify reach with shared brand equity and global support",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" stroke="white" strokeWidth="2" fill="none" />
        <circle cx="24" cy="20" r="5" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M14 34 C14 29 18 26 24 26 C30 26 34 29 34 34" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="33" cy="16" r="4" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M31 20 L29 23" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M30 14 L32 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M35 14 L37 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Reseller & Distribution Models",
    desc: "Earn recurring revenue with zero inventory risk",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" stroke="white" strokeWidth="2" fill="none" />
        <rect x="14" y="18" width="20" height="14" rx="2" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M18 22 L30 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 26 L26 26" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="32" cy="16" r="3" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M30 13 L26 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "OEM Integrations",
    desc: "Embed eSIM technology in hardware, IoT devices, or travel accessories",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" stroke="white" strokeWidth="2" fill="none" />
        <circle cx="24" cy="24" r="8" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M24 16 L24 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M24 36 L24 32" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 24 L12 24" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M36 24 L32 24" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18.3 18.3 L15.5 15.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M29.7 29.7 L32.5 32.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M29.7 18.3 L32.5 15.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18.3 29.7 L15.5 32.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Affiliate & Platform Partnerships",
    desc: "Integrate via secure API and earn performance-based commissions",
  },
];

const partnerAdvantages = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" stroke="white" strokeWidth="2" fill="none" />
        <ellipse cx="24" cy="24" rx="10" ry="14" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M14 24 Q19 20 24 24 Q29 28 34 24" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M14 24 Q19 28 24 24 Q29 20 34 24" stroke="white" strokeWidth="1.5" fill="none" />
        <line x1="24" y1="10" x2="24" y2="38" stroke="white" strokeWidth="1.5" />
        <line x1="10" y1="24" x2="38" y2="24" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
    label: "Access to 220+ countries and territories",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" stroke="white" strokeWidth="2" fill="none" />
        <rect x="15" y="15" width="18" height="18" rx="2" stroke="white" strokeWidth="1.5" fill="none" />
        <circle cx="24" cy="24" r="4" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M20 20 L17 17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M28 20 L31 17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M28 28 L31 31" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 28 L17 31" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "Geo-agnostic eSIM management tools with real-time analytics",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" stroke="white" strokeWidth="2" fill="none" />
        <circle cx="24" cy="24" r="8" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M24 18 L24 22 L27 25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 12 L20 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M30 12 L28 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 18 L16 20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M36 18 L32 20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "Multi-currency, consolidated billing & tax-compliant invoicing",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" stroke="white" strokeWidth="2" fill="none" />
        <circle cx="24" cy="24" r="8" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M21 24 C21 22.3 22.3 21 24 21 C25.7 21 27 22.3 27 24 C27 25.7 25.7 27 24 27" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M24 16 L24 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M24 34 L24 32" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 24 L14 24" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M34 24 L32 24" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "Self-service partner dashboard with provisioning controls",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" stroke="white" strokeWidth="2" fill="none" />
        <rect x="16" y="14" width="16" height="20" rx="2" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M20 20 L28 20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 24 L28 24" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 28 L24 28" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="30" cy="16" r="4" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M28.5 16 L29.5 17 L31.5 15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Priority onboarding, technical training, and 24/7 enterprise support",
  },
];

const footerExplore = ["Coverage", "Plans", "Ecosystem", "About Us"];
const footerSupport = ["Support Center", "FAQs", "Accessibility Options"];
const footerLegal = ["Privacy Policy", "Terms of Service", "Cookie Preferences"];
const footerBusiness = [
  "Partner With Us",
  "Travel Agencies & OTAs",
  "Corporate Travel Solutions",
  "API Integrations",
];
const footerCorporate = [
  "Corporate Responsibility",
  "Investor Relations",
  "Press & Media",
];

export default function PartnerWithUs() {
  return (
    
    <>
    
    <div className="w-full bg-white font-sans">
   
        
    
      {/* ── HERO SECTION ── */}
      <div className="relative w-full h-[420px] overflow-hidden">
        {/* Background image placeholder — replace src with actual image */}
        <Image
          src="/image/Rectangle 4.png"
          alt="Partner With Us Hero"
          fill
          className="object-cover object-top"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-[#0a2a2e]/90 via-[#0d6e7a]/60 to-transparent" />

        {/* Hero text */}
        <div className="absolute inset-0 flex items-center">
          <div className="px-4 md:px-8 max-w-xl text-white">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Co-create the future
              <br />
              of global connectivity.
            </h1>
            <p className="text-sm leading-relaxed  text-gray-200 mb-7">
              The Zoiko Orbit Partner Network is a high-performance ecosystem
              designed for scale, trust, and mutual growth. Whether you&apos;re a
              telecom disruptor, enterprise platform, or international reseller,
              we empower you to deliver world-class eSIM solutions — tailored to
              your business model and brand vision.
            </p>
           <a href="/travel-insurance-providers-form"><button className="bg-[#0d6e7a] hover:bg-[#0a5a65] text-white text-sm font-semibold px-7 py-3 rounded-full transition-colors">
              Partner with Us
            </button></a> 
          </div>
        </div>
      </div>

      {/* ── PARTNERSHIP PATHWAYS ── */}
      <section className="py-4 px-6 dark:bg-gray-900 dark:text-white bg-white">
        <h2 className="text-2xl md:text-3xl font-bold text-center dark:bg-gray-900 dark:text-white text-gray-800 mb-12">
          Partnership Pathways
        </h2>

        {/* Row 1 — 3 cards */}
        <div className="max-w-5xl dark:bg-gray-900 dark:text-white mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {partnershipPathways.slice(0, 3).map((p) => (
            <PathwayCard key={p.title} {...p} />
          ))}
        </div>

        {/* Row 2 — 2 cards centered */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {partnershipPathways.slice(3).map((p) => (
            <PathwayCard  key={p.title} {...p} />
          ))}
        </div>
      </section>

      {/* ── PARTNER ADVANTAGES ── */}
      <section className="py-4 px-6 dark:bg-gray-900 dark:text-white bg-[#f0f7f8]">
        <h2 className="text-2xl md:text-3xl font-bold text-center dark:bg-gray-900 dark:text-white text-gray-800 mb-12">
          Partner Advantages
        </h2> 
        <div className="max-w-5xl mx-auto dark:bg-gray-900 dark:text-white bg-white rounded-2xl shadow-sm p-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {partnerAdvantages.map((adv) => (
              <div key={adv.label} className="flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[#0d6e7a] flex items-center justify-center shrink-0">
                  {adv.icon}
                </div>
                <p className="text-xs dark:bg-gray-900 dark:text-white text-gray-600 leading-snug">{adv.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative w-full h-[300px] overflow-hidden">
        <Image
          src="/image/Rectangle 19 (2).png"
          alt="Go Global Together"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0a2a2e]/70" />
        <div className="absolute inset-0 flex items-center justify-end px-10 md:px-20">
          <div className="bg-[#0d6e7a]/80 backdrop-blur-sm rounded-2xl p-8 max-w-md text-white">
            <p className="text-sm md:text-base font-medium leading-relaxed mb-4">
              We don&apos;t just offer a product — we deliver an infrastructure,
              commercial engine, and trusted reputation that scales with you.
            </p>
            <a
              href="/travel-insurance-providers-form"
              className="inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              Let&apos;s connect — and go global together
              <span className="text-lg">→</span>
            </a>
          </div>
        </div>
      </section>

    </div>
    </>
  );
}

/* ── Helper: Pathway Card ── */
function PathwayCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 border border-gray-100 rounded-2xl hover:shadow-md transition-shadow">
      <div className="w-16 h-16 rounded-full bg-[#0d6e7a] flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-bold dark:text-white dark:bg-gray-900 text-gray-800 text-sm mb-2">{title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed dark:text-white dark:bg-gray-900 ">{desc}</p>
    </div>
  );
}

