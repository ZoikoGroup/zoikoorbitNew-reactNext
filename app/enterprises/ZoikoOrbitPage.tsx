"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const countryCodes = [
  { code: "+1",   flag: "🇺🇸", label: "US" },
  { code: "+44",  flag: "🇬🇧", label: "UK" },
  { code: "+91",  flag: "🇮🇳", label: "IN" },
  { code: "+61",  flag: "🇦🇺", label: "AU" },
  { code: "+49",  flag: "🇩🇪", label: "DE" },
  { code: "+33",  flag: "🇫🇷", label: "FR" },
  { code: "+971", flag: "🇦🇪", label: "AE" },
  { code: "+65",  flag: "🇸🇬", label: "SG" },
  { code: "+81",  flag: "🇯🇵", label: "JP" },
  { code: "+86",  flag: "🇨🇳", label: "CN" },
  { code: "+55",  flag: "🇧🇷", label: "BR" },
  { code: "+27",  flag: "🇿🇦", label: "ZA" },
  { code: "+234", flag: "🇳🇬", label: "NG" },
  { code: "+254", flag: "🇰🇪", label: "KE" },
  { code: "+92",  flag: "🇵🇰", label: "PK" },
  { code: "+880", flag: "🇧🇩", label: "BD" },
  { code: "+7",   flag: "🇷🇺", label: "RU" },
  { code: "+82",  flag: "🇰🇷", label: "KR" },
  { code: "+39",  flag: "🇮🇹", label: "IT" },
  { code: "+34",  flag: "🇪🇸", label: "ES" },
];

// ── TYPES ─────────────────────────────────────────────────────────────────────
interface FormData {
  first_name: string;
  last_name: string;
  business_email: string;
  company_name: string;
  country_code: string;
  phone: string;
  country: string;
  inquiry_type: string;
  message: string;
  consent: boolean;
}

interface FormErrors {
  first_name?: string;
  last_name?: string;
  business_email?: string;
  company_name?: string;
  phone?: string;
  country?: string;
  inquiry_type?: string;
  message?: string;
  consent?: string;
}

type TouchedFields = Partial<Record<keyof FormData, boolean>>;

const emptyForm: FormData = {
  first_name: "",
  last_name: "",
  business_email: "",
  company_name: "",
  country_code: "+44",
  phone: "",
  country: "",
  inquiry_type: "",
  message: "",
  consent: false,
};

// ── VALIDATION ────────────────────────────────────────────────────────────────
function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.first_name.trim())
    errors.first_name = "First name is required.";

  if (!data.last_name.trim())
    errors.last_name = "Last name is required.";

  if (!data.business_email.trim()) {
    errors.business_email = "Business email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.business_email.trim())) {
    errors.business_email = "Enter a valid email address.";
  }

  if (!data.company_name.trim())
    errors.company_name = "Company / organisation is required.";

  // Phone is optional — only validate format if filled
  if (data.phone.trim() && !/^\d{6,14}$/.test(data.phone.replace(/\s+/g, "")))
    errors.phone = "Enter a valid number without country code (e.g. 7911123456).";

  if (!data.country)
    errors.country = "Please select a country / region.";

  if (!data.inquiry_type.trim())
    errors.inquiry_type = "Inquiry type is required.";

  if (!data.message.trim())
    errors.message = "Message is required.";

  if (!data.consent)
    errors.consent = "You must agree to be contacted before submitting.";

  return errors;
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-500">{message}</p>;
}

function RequiredMark() {
  return <span className="text-red-500 ml-0.5">*</span>;
}

const inputNormal =
  "w-full bg-gray-100 dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-teal-600 transition";

const inputError =
  "w-full bg-red-50 dark:bg-gray-900 dark:text-white border border-red-500 dark:border-red-500 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-red-400 transition";

const selectNormal =
  "w-full bg-gray-100 dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-teal-600 transition dark:[&>option]:bg-gray-800 dark:[&>option]:text-white";

const selectError =
  "w-full bg-red-50 dark:bg-gray-900 dark:text-white border border-red-500 dark:border-red-500 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-red-400 transition dark:[&>option]:bg-gray-800 dark:[&>option]:text-white";

// ── COMPONENT ─────────────────────────────────────────────────────────────────
const ZoikoOrbitPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [showMore, setShowMore] = useState(false);
  const [showMore2, setShowMore2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // ── HANDLE CHANGE ────────────────────────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const key = name as keyof FormData;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    const updated = { ...formData, [key]: newValue } as FormData;
    setFormData(updated);
    if (touched[key]) {
      setErrors(validateForm(updated));
    }
  };

  // ── HANDLE BLUR ──────────────────────────────────────────────────────────────
  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validateForm(formData));
  };

  // Phone: digits-only enforced
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    const updated = { ...formData, phone: digits };
    setFormData(updated);
    if (touched.phone) {
      setErrors(validateForm(updated));
    }
  };

  // ── HANDLE SUBMIT ────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");

    const allTouched = Object.keys(emptyForm).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {} as TouchedFields
    );
    setTouched(allTouched);

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      const payload = {
        ...formData,
        phone: formData.phone.trim() ? `${formData.country_code}${formData.phone}` : null,
        country_code: undefined,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/enterprise-inquiry/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Form submitted successfully! Our specialists will respond within 24 hours.");
        setFormData(emptyForm);
        setErrors({});
        setTouched({});
      } else {
        if (data && typeof data === "object") {
          const fieldMap: Record<string, keyof FormErrors> = {
            first_name: "first_name",
            last_name: "last_name",
            business_email: "business_email",
            company_name: "company_name",
            phone: "phone",
            country: "country",
            inquiry_type: "inquiry_type",
            message: "message",
            consent: "consent",
          };
          const backendErrors: FormErrors = {};
          for (const [field, messages] of Object.entries(data)) {
            const key = fieldMap[field];
            if (key) {
              backendErrors[key] = Array.isArray(messages)
                ? (messages as string[]).join(" ")
                : String(messages);
            }
          }
          setErrors(backendErrors);
        }
      }
    } catch (error) {
      console.error(error);
      setErrors({ message: "Server error. Please check your connection and try again." });
    }

    setLoading(false);
  };

  return (
    <div className="font-sans text-gray-800 bg-white dark:bg-gray-900 dark:text-white">

      {/* HERO SECTION */}
      <section
        className="relative min-h-[420px] flex items-center"
        style={{ background: "linear-gradient(90deg, #0a2540 60%, #1a4a7a 100%)" }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img src="/image/Rectangle 4 (7).png" alt="Travel background" className="hidden md:block w-full h-full object-cover object-center opacity-90" />
          <img src="/image/Rectangle893(2).jpg" alt="Travel background" className="block md:hidden w-full h-full object-cover object-center opacity-90" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Empower Your Teams<br />with Global Connectivity
            </h1>
            <p className="text-white text-lg mb-8 max-w-md">
              Enterprise eSIM solutions for corporate travel, remote teams, and global device deployments
            </p>
            <a href="/plans">
              <button className="bg-[#0B7285] text-white font-bold px-8 md:px-10 py-2.5 md:py-3 rounded-lg text-base transition-all shadow-lg hover:bg-[#0a6577]">
                Get Your eSIM
              </button>
            </a>
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
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x md:divide-gray-200 dark:md:divide-gray-700">
              {[
                { icon: "/image/Group 1597883246.png", title: "Predictable Costs", desc: "Consolidated global data spend. Pooled plans, volume pricing, cost center tagging." },
                { icon: "/image/Group 1597883256.png", title: "Tier-1 Security & Compliance", desc: "GDPR, SOC 2, PCI — enterprise data handling standards baked in." },
                { icon: "/image/Group 1597883257.png", title: "Easy Central Admin", desc: "Provision, reassign, and report on usage across teams in one dashboard." },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-start text-left px-2 md:px-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-600/10 dark:bg-gray-900">
                    <Image src={item.icon} alt={item.title} width={80} height={80} className="object-contain" />
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
      <section className="py-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Connectivity Built Around<br />How Your Organization Operates
          </h2>
          <p className="text-gray-500 dark:text-white mb-12">Scale from a few travelers to global workforce coverage — mix &amp; match programs</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: "/image/Rectangle 908 (2).png", title: "Corporate Travel Plans", desc: "Pre-trip provisioning tied to bookings; regional or global data pools; expense integration." },
              { img: "/image/Rectangle 909 (2).png", title: "Remote & Hybrid Team Data", desc: "Always-on data for distributed teams; monthly top-ups; device-agnostic eSIM delivery." },
              { img: "/image/Rectangle 910 (2).png", title: "Bespoke Global Programs", desc: "Custom coverage bundles for project deployments, maritime/energy crews, events, or high-security missions." },
            ].map((item, i) => (
              <div key={i} className="text-left">
                <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4">
                  <Image src={item.img} alt={item.title} fill className="object-cover" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-500 dark:text-white text-sm mb-3">{item.desc}</p>
                <a href="/plans" className="text-teal-700 dark:text-teal-400 text-sm font-semibold hover:underline">Learn More →</a>
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
              <Image src="/image/multiracial-business-team-smiling-together-in-a-co-2025-02-22-04-24-03-utc 1.png" alt="Team integration" fill className="object-cover" />
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

          {/* Case Study 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
            <div className="relative w-full max-w-[520px] h-80">
              <Image src="/image/image-11.png" alt="Legal case study" fill className="object-contain" />
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
              {showMore && (
                <div className="mt-5">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">The Challenge</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-white space-y-2 mb-5">
                    <li>Excessive roaming charges across international transit hubs.</li>
                    <li>Inconsistent network access during executive travel.</li>
                    <li>Unreliable video-call quality during urgent legal proceedings.</li>
                    <li>Fragmented IT controls for global mobile device usage.</li>
                  </ul>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">The Zoiko Orbit™ Solution</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-white space-y-2 mb-5">
                    <li>Enterprise-grade eSIM deployment across 20+ countries.</li>
                    <li>Smart regional network routing for low latency connectivity.</li>
                    <li>Centralized policy-driven authentication and billing controls.</li>
                    <li>SLA-backed roaming plans with geo-fencing support.</li>
                    <li>Automated onboarding with GDPR & ISO 27001 compliance.</li>
                  </ul>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">The Results</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-white space-y-2 mb-5">
                    <li>62% reduction in roaming costs.</li>
                    <li>89% improvement in HD video-call stability.</li>
                    <li>Zero downtime during urgent legal transactions.</li>
                    <li>Full deployment completed in less than 2 weeks.</li>
                  </ul>
                  <p className="italic text-sm text-gray-600 dark:text-white mb-5">
                    "Zoiko Orbit redefined how our partners connect globally — seamless, compliant, and always-on."
                  </p>
                </div>
              )}
              <button onClick={() => setShowMore(!showMore)} className="text-teal-700 dark:text-teal-400 text-sm font-semibold hover:underline">
                {showMore ? "Read less →" : "Read More →"}
              </button>
            </div>
          </div>

          {/* Case Study 2 */}
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
              {showMore2 && (
                <>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">The Challenge</h3>
                  <p className="text-sm text-gray-600 dark:text-white mb-3">Guests arriving from international markets faced:</p>
                  <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-white space-y-2 mb-5">
                    <li>Costly and complex SIM-swapping</li>
                    <li>Unreliable roaming with inconsistent speeds</li>
                    <li>Delayed concierge communications and check-in friction</li>
                  </ul>
                  <p className="text-sm text-gray-600 dark:text-white mb-3">Internal staff relied on local SIM cards that led to:</p>
                  <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-white space-y-2 mb-5">
                    <li>Frequent disconnections</li>
                    <li>Missed VIP engagements</li>
                    <li>Lack of visibility into staff communication uptime</li>
                  </ul>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">The Zoiko Orbit™ Solution</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-white space-y-2 mb-5">
                    <li>Instant eSIM activation via QR codes at check-in</li>
                    <li>Dedicated VIP mobile plans with high-speed roaming in 190+ countries</li>
                    <li>Regional management dashboards to track usage per property</li>
                    <li>eSIM-based roaming for guest services teams with failover protection</li>
                    <li>Multi-language setup interface for global guest accessibility</li>
                  </ul>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">The Results</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-white space-y-2 mb-5">
                    <li>41% boost in VIP satisfaction metrics across SEA and the Caribbean</li>
                    <li>96% reduction in guest mobile complaints</li>
                    <li>30% increase in staff response time efficiency</li>
                    <li>Introduced new $29.99 revenue stream per eSIM at flagship properties</li>
                    <li>100% guest services staff fully migrated in under 4 weeks</li>
                  </ul>
                  <p className="italic text-sm text-gray-600 dark:text-white mb-5">
                    "Zoiko Orbit gave our brand a connectivity edge — guests feel the luxury from the moment they land, and our teams never miss a beat."
                  </p>
                </>
              )}
              <button onClick={() => setShowMore2(!showMore2)} className="text-teal-700 dark:text-teal-400 text-sm font-semibold hover:underline">
                {showMore2 ? "Read Less →" : "Read More →"}
              </button>
            </div>
            <div className="relative w-full max-w-[520px] h-80">
              <Image src="/image/image-12.png" alt="Hospitality case study" fill className="object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT / CONSULTATION SECTION */}
      <section className="relative bg-[#f5f5f5] dark:bg-gray-900 overflow-hidden pb-24">

        <div className="relative w-full h-[320px] md:h-[420px]">
          <Image src="/image/Rectangle 19.png" alt="travel" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="absolute left-0 bottom-10 w-[320px] md:w-[500px] opacity-20 pointer-events-none">
          <Image src="/image/map.png" alt="world map" width={500} height={500} className="object-contain" />
        </div>

        {/* Form Card */}
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="bg-white dark:bg-gray-900 max-w-4xl ml-auto -mt-32 rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100 dark:border-gray-700">

            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                Let's Transform Your <br />
                Global Travel & Mobility Program.
              </h2>
              <p className="text-gray-600 dark:text-white mt-3">
                Share a few details and our specialists will respond within 24 hours
              </p>
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                Fields marked <span className="text-red-500">*</span> are required.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>

              {/* Row 1 */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm text-gray-700 dark:text-white mb-2 block">
                    First Name<RequiredMark />
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    onBlur={() => handleBlur("first_name")}
                    placeholder="Enter First Name"
                    className={errors.first_name ? inputError : inputNormal}
                  />
                  <FieldError message={errors.first_name} />
                </div>
                <div>
                  <label className="text-sm text-gray-700 dark:text-white mb-2 block">
                    Last Name<RequiredMark />
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    onBlur={() => handleBlur("last_name")}
                    placeholder="Enter Last Name"
                    className={errors.last_name ? inputError : inputNormal}
                  />
                  <FieldError message={errors.last_name} />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm text-gray-700 dark:text-white mb-2 block">
                    Business Email<RequiredMark />
                  </label>
                  <input
                    type="email"
                    name="business_email"
                    value={formData.business_email}
                    onChange={handleChange}
                    onBlur={() => handleBlur("business_email")}
                    placeholder="Enter Work Email"
                    className={errors.business_email ? inputError : inputNormal}
                  />
                  <FieldError message={errors.business_email} />
                </div>
                <div>
                  <label className="text-sm text-gray-700 dark:text-white mb-2 block">
                    Company / Organization<RequiredMark />
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    onBlur={() => handleBlur("company_name")}
                    placeholder="Enter Company/Organization Name"
                    className={errors.company_name ? inputError : inputNormal}
                  />
                  <FieldError message={errors.company_name} />
                </div>
              </div>

              {/* Row 3 — Phone + Country */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm text-gray-700 dark:text-white mb-2 block">
                    Phone (If Needed)
                  </label>
                  <div className={`flex rounded-md border overflow-hidden transition ${
                    errors.phone
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-teal-600"
                  }`}>
                    <div className="relative flex-shrink-0">
                      <select
                        name="country_code"
                        value={formData.country_code}
                        onChange={handleChange}
                        className="h-12 pl-2 pr-6 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-xs border-r border-gray-300 dark:border-gray-600 focus:outline-none appearance-none cursor-pointer"
                      >
                        {countryCodes.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.label} {c.code}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3 h-3 text-gray-500 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      onBlur={() => handleBlur("phone")}
                      placeholder="7911 123456"
                      className={`h-12 flex-1 px-3 text-sm focus:outline-none ${
                        errors.phone
                          ? "bg-red-50 dark:bg-gray-900 dark:text-white"
                          : "bg-gray-100 dark:bg-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                      }`}
                    />
                  </div>
                  {errors.phone ? (
                    <FieldError message={errors.phone} />
                  ) : formData.phone && !errors.phone ? (
                    <p className="mt-1 text-xs text-teal-600 dark:text-teal-400">
                      Full number: {formData.country_code} {formData.phone}
                    </p>
                  ) : (
                    <p className="mt-1 text-xs text-gray-400">
                      Select country code, then enter number without it.
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-700 dark:text-white mb-2 block">
                    Country / Region<RequiredMark />
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    onBlur={() => handleBlur("country")}
                    className={errors.country ? selectError : selectNormal}
                  >
                    <option value="">Select Option</option>
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                  <FieldError message={errors.country} />
                </div>
              </div>

              {/* Inquiry */}
              <div>
                <label className="text-sm text-gray-700 dark:text-white mb-2 block">
                  Inquiry Type<RequiredMark />
                </label>
                <input
                  type="text"
                  name="inquiry_type"
                  value={formData.inquiry_type}
                  onChange={handleChange}
                  onBlur={() => handleBlur("inquiry_type")}
                  placeholder="Corporate Travel, Remote Workforce, Bulk Deployment, Security Review, Integration Other"
                  className={errors.inquiry_type ? inputError : inputNormal}
                />
                <FieldError message={errors.inquiry_type} />
              </div>

              {/* Message */}
              <div>
                <label className="text-sm text-gray-700 dark:text-white mb-2 block">
                  Message<RequiredMark />
                </label>
                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={() => handleBlur("message")}
                  placeholder="Enter your message..."
                  className={`resize-none ${errors.message
                    ? "w-full bg-red-50 dark:bg-gray-900 dark:text-white border border-red-500 dark:border-red-500 rounded-md px-4 py-4 outline-none focus:ring-2 focus:ring-red-400 transition"
                    : "w-full bg-gray-100 dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md px-4 py-4 outline-none focus:ring-2 focus:ring-teal-600 transition"
                  }`}
                />
                <FieldError message={errors.message} />
              </div>

              {/* Consent Checkbox */}
              <div>
                <div className="flex items-start gap-3">
                  <input
                    id="consent"
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    onBlur={() => handleBlur("consent")}
                    className="mt-1 accent-teal-700"
                  />
                  <label htmlFor="consent" className="text-sm text-gray-600 dark:text-white cursor-pointer">
                    I agree to be contacted by Zoiko Orbit regarding partner opportunities.<RequiredMark />
                  </label>
                </div>
                <FieldError message={errors.consent} />
              </div>

              {successMessage && (
                <p className="text-sm font-medium text-green-600 dark:text-green-400">{successMessage}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="bg-teal-700 hover:bg-teal-800 transition text-white font-medium px-8 py-3 rounded-lg shadow-md disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Submitting..." : "Submit & Schedule a Consultation"}
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
              { id: 1, question: "Can we centrally manage data for all our travelers?", answer: "Contact our enterprise team to learn more about this feature and how Zoiko Orbit can be tailored to your organization's needs." },
              { id: 2, question: "Do you integrate with our travel booking tool?", answer: "Yes, Zoiko Orbit is designed to seamlessly integrate with popular travel booking platforms." },
              { id: 3, question: "How secure is traveler data?", answer: "We prioritize the security and privacy of traveler data, implementing industry-standard measures to protect it." },
              { id: 4, question: "How quickly can we roll out globally?", answer: "Our global infrastructure allows for rapid deployment across multiple markets." },
            ].map((q, i) => (
              <div key={i}>
                <button
                  className="w-full flex justify-between items-center py-5 text-left text-gray-800 dark:text-white font-medium hover:text-blue-700 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{q.question}</span>
                  <span className="text-xl text-gray-400 dark:text-white">{openFaq === i ? "−" : "›"}</span>
                </button>
                {openFaq === i && (
                  <div className="pb-5 text-gray-500 dark:text-white text-sm">{q.answer}</div>
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