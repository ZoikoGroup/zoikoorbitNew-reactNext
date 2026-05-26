"use client";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina",
  "Armenia", "Australia", "Austria", "Bahrain", "Bangladesh", "Belgium",
  "Bhutan", "Brazil", "Bulgaria", "Canada", "China", "Denmark", "Egypt",
  "Finland", "France", "Germany", "India", "Indonesia", "Italy", "Japan",
  "Malaysia", "Nepal", "Netherlands", "New Zealand", "Pakistan", "Qatar",
  "Russia", "Saudi Arabia", "Singapore", "South Africa", "Spain",
  "Sri Lanka", "Sweden", "Switzerland", "Thailand", "UAE",
  "United Kingdom", "United States", "Vietnam",
];

const emptyForm = {
  first_name: "",
  last_name: "",
  work_email: "",
  company_name: "",
  website: "",
  country_region: "",
  role_function: "",
  monthly_traveler_volume: "",
  partnership_interest: "",
  message: "",
  consent: false,
};

export default function TravelEcosystemPartners() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  // ── HANDLE CHANGE ──────────────────────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // ── HANDLE SUBMIT ──────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.consent) {
      toast.error("Please agree to be contacted before submitting.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        website: formData.website.trim() ? formData.website : null,
      };

      const response = await fetch(
        "http://127.0.0.1:8000/api/travel-ecosystem-partner/travel-ecosystem-inquiry/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Form submitted successfully!");
        setFormData(emptyForm);
      } else {
        console.error("Backend Errors:", data);
        toast.error("Validation failed. Please check your inputs.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error. Please try again later.");
    }

    setLoading(false);
  };

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div className="w-full font-sans dark:bg-gray-900 dark:text-white">

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative h-[75vh] min-h-[500px]">
        <Image
          src="/image/Rectangle 4d.png"
          alt="Partners hero"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
            <div className="max-w-lg">
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-white md:text-5xl">
                Grow Your Business with{" "}
                <br className="hidden md:block" />
                Global eSIM Connectivity
              </h1>

              <p className="mb-8 text-base leading-relaxed text-gray-200 md:text-lg">
                Seamless eSIM solutions for travel agencies, OTAs, tour
                operators, and distributors.
              </p>

              <a
                href="/partner-with-us"
                className="inline-block rounded-md bg-teal-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
              >
                Become a Partner
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ WHY PARTNER WITH US ═══════════════════════ */}
      <section className="relative overflow-hidden bg-white py-20 dark:bg-gray-900 dark:text-white">
        <div className="relative mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-14 text-center">
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
              Why Partner with Us
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-500 dark:text-gray-300 md:text-base">
              Unlock new revenue and delight travelers with ready-to-activate global data.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-10">

            {/* Card 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-5 h-20 w-20">
                <Image src="/image/Group 1597883234.png" alt="Attractive Commissions" fill className="object-contain" />
              </div>
              <h3 className="mb-2 text-base font-bold leading-snug text-zinc-900 dark:text-white md:text-lg">
                Attractive Commissions
              </h3>
              <p className="max-w-[180px] text-sm leading-relaxed text-gray-500 dark:text-gray-300 md:text-base">
                Earn competitive margins on every traveler you activate—recurring revenue options available.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-5 h-20 w-20">
                <Image src="/image/Group 1597883235.png" alt="Tier-1 Global Data" fill className="object-contain" />
              </div>
              <h3 className="mb-2 text-base font-bold leading-snug text-zinc-900 dark:text-white md:text-lg">
                Tier-1 Global Data
              </h3>
              <p className="max-w-[180px] text-sm leading-relaxed text-gray-500 dark:text-gray-300 md:text-base">
                Backed by top carrier networks across 190+ countries for dependable, high-speed coverage.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-5 h-20 w-20">
                <Image src="/image/Group 1597883236.png" alt="White-Label & Co-Brand Ready" fill className="object-contain" />
              </div>
              <h3 className="mb-2 text-base font-bold leading-snug text-zinc-900 dark:text-white md:text-lg">
                White-Label &amp; Co-Brand Ready
              </h3>
              <p className="max-w-[200px] text-sm leading-relaxed text-gray-500 dark:text-gray-300 md:text-base">
                Offer eSIM in your brand: customizable storefronts, bundles, email templates, and upsell flows.
              </p>
            </div>

            {/* Card 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-5 h-20 w-20">
                <Image src="/image/Group 1597883237.png" alt="Fast Onboarding & Support" fill className="object-contain" />
              </div>
              <h3 className="mb-2 text-base font-bold leading-snug text-zinc-900 dark:text-white md:text-lg">
                Fast Onboarding &amp; Support
              </h3>
              <p className="max-w-[190px] text-sm leading-relaxed text-gray-500 dark:text-gray-300 md:text-base">
                API plug-and-play, guided setup, partner enablement kits, dedicated success team.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════ BUILT TO FIT YOUR WORKFLOW ═══════════════════════ */}
      <section className="bg-gray-50 py-20 dark:bg-gray-900 dark:text-white">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-14 text-center">
            <h2 className="mb-3 text-3xl font-bold text-zinc-900 dark:text-white md:text-4xl">
              Built to Fit Your Workflow
            </h2>
            <p className="text-base text-gray-500 dark:text-gray-300">
              From lightweight referral links to deep API integrations— scale at your pace.
            </p>
          </div>

          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Left Illustration */}
            <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl bg-teal-50 dark:bg-gray-800">
              <Image
                src="/image/cuate.png"
                alt="Workflow illustration"
                width={520}
                height={380}
                className="w-full object-contain"
              />
            </div>

            {/* Right Content */}
            <div className="space-y-8">
              <div>
                <h3 className="mb-3 text-lg font-bold text-zinc-900 dark:text-white md:text-xl">
                  API: Plug &amp; Play
                </h3>
                <ul className="space-y-2 text-base text-gray-600 dark:text-gray-300 md:text-lg">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-teal-600">•</span>
                    REST/GraphQL endpoints for offer retrieval, activation, balance, status.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-teal-600">•</span>
                    Sandbox access in minutes.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-teal-600">•</span>
                    Sample code in JS, PHP, Python.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-teal-600">•</span>
                    Multi-currency &amp; localization support.
                  </li>
                </ul>
              </div>

              <hr className="border-gray-200 dark:border-gray-700" />

              <div>
                <h3 className="mb-3 text-lg font-bold text-zinc-900 dark:text-white md:text-xl">
                  Co-Branded Storefronts &amp; Portals
                </h3>
                <ul className="space-y-2 text-base text-gray-600 dark:text-gray-300 md:text-lg">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-teal-600">•</span>
                    Ready-to-launch hosted storefront branded with your logo/colors.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-teal-600">•</span>
                    Bundle eSIM into booking confirmations &amp; post-booking emails.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-teal-600">•</span>
                    Analytics dashboard (attach rates, revenue per PNR).
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TRUSTED BY LEADING BRANDS ═══════════════════════ */}
      <section className="bg-white py-20 dark:bg-gray-900 dark:text-white">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-16 text-center">
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
              Trusted by Leading Travel &amp; Mobility Brands.
            </h2>
            <p className="mx-auto max-w-4xl text-sm leading-relaxed text-gray-500 dark:text-gray-300 md:text-base">
              See how agencies, OTAs, and loyalty programs increase ancillary revenue and traveler
              satisfaction with Zoiko Orbit™.
            </p>
          </div>

          {/* Case Study 1 */}
          <div className="mb-24 grid items-center gap-14 md:grid-cols-2">
            <div className="flex justify-center md:justify-start">
              <div className="relative h-[340px] w-full max-w-[520px] overflow-hidden">
                <Image src="/image/image-11.png" alt="Airline Case Study" fill className="object-contain" />
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold leading-snug text-zinc-900 dark:text-white md:text-xl">
                Boosting Ancillary Revenue for a Major Airline
              </h3>
              <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg">
                A prominent global airline was seeking innovative ways to enhance its passenger
                experience while simultaneously driving new ancillary revenue streams. By integrating
                Zoiko Orbit's eSIM solutions directly into their booking and check-in flows, they
                provided travelers with instant, seamless mobile connectivity from the moment they
                booked their flight.
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg">
                This not only improved customer satisfaction by eliminating the hassle of sourcing
                local SIMs but also created a significant new revenue channel for the airline,
                showcasing the power of integrated travel solutions.
              </p>
            </div>
          </div>

          {/* Case Study 2 */}
          <div className="grid items-center gap-14 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <h3 className="mb-4 text-lg font-bold leading-snug text-zinc-900 dark:text-white md:text-xl">
                Elevating Customer Loyalty for a Global Hotel Group
              </h3>
              <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg">
                A leading international hotel group aimed to deepen its relationship with guests and
                boost loyalty program engagement. By partnering with Zoiko Orbit, they offered
                exclusive, discounted eSIM plans to their loyalty members, providing unparalleled
                global connectivity as a premium perk.
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg">
                This initiative differentiated their loyalty program, added tangible value for their
                most frequent travelers, and reinforced the hotel group's commitment to a truly
                connected and compassionate travel experience, leading to increased member
                satisfaction and repeat bookings.
              </p>
            </div>
            <div className="order-1 flex justify-center md:order-2 md:justify-end">
              <div className="relative h-[340px] w-full max-w-[520px] overflow-hidden">
                <Image src="/image/image-12.png" alt="Hotel Case Study" fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ WHAT SETS US APART ═══════════════════════ */}
      <section className="bg-white py-20 text-center dark:bg-gray-900 dark:text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-3xl font-bold text-gray-900 dark:text-white">
            What Sets Us Apart
          </h2>

          <div className="grid gap-10 md:grid-cols-3">

            {/* Card 1 */}
            <div className="flex flex-col items-center">
              <div className="mb-4 h-16 w-16 md:h-26 md:w-26">
                <Image src="/image/icon1.png" width={104} height={104} alt="icon" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-teal-700 dark:text-teal-400 md:text-lg">
                Engineered for Global Trust
              </h3>
              <p className="max-w-xs text-sm text-gray-600 dark:text-gray-300 md:text-base">
                Our advanced eSIM platform runs on Tier-1 carrier partnerships across 220+ countries,
                safeguarded by PCI DSS, GDPR, and rigorous data privacy standards. You get local-quality
                speeds and secure transactions wherever your journey takes you.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center">
              <div className="mb-4 h-16 w-16 md:h-26 md:w-26">
                <Image src="/image/icon2.png" width={104} height={104} alt="icon" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-teal-700 dark:text-teal-400 md:text-lg">
                Built to Give Back
              </h3>
              <p className="max-w-xs text-sm text-gray-600 dark:text-gray-300 md:text-base">
                Unlike typical travel SIM providers, we embed impact at the core of every connection.
                Each Zoiko Orbit purchase actively supports animal rescue centers, wildlife rehabilitation
                programs, and community conservation efforts — so your travels help sustain the beauty
                you've come to explore.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center">
              <div className="mb-4 h-16 w-16 md:h-26 md:w-26">
                <Image src="/image/icon3.png" width={104} height={104} alt="icon" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-teal-700 dark:text-teal-400 md:text-lg">
                Part of the Zoiko Promise
              </h3>
              <p className="max-w-xs text-sm text-gray-600 dark:text-gray-300 md:text-base">
                As a member of Zoiko Group, we uphold a legacy of operational excellence, cultural
                intelligence, and meaningful innovation — dedicated to improving lives and safeguarding
                the world we all share.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════ CTA / CONTACT FORM ═══════════════════════ */}
      <section className="relative overflow-hidden bg-[#f5f5f5] dark:bg-gray-900">

        {/* Hero Image */}
        <div className="relative h-[260px] w-full sm:h-[320px] md:h-[580px]">
          <Image
            src="/image/Rectangle 19 (1).png"
            alt="Connectivity Program"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Main Content */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex flex-col gap-10 lg:grid lg:grid-cols-2">

            {/* Left World Map */}
            <div className="hidden items-center justify-center pt-32 lg:flex min-h-[400px]">
              <div className="relative h-[320px] w-full max-w-[400px] opacity-90">
                <Image src="/image/map.png" alt="World Map" fill className="object-contain" />
              </div>
            </div>

            {/* Form Card */}
            <div className="
              relative
              -mt-26
              sm:-mt-30
              lg:-mt-102
              lg:ml-auto
              w-full
              max-w-2xl
              rounded-[24px]
              border border-gray-200
              bg-white
              p-5 sm:p-8
              shadow-[0_10px_40px_rgba(0,0,0,0.12)]
              dark:border-gray-700
              dark:bg-gray-900
            ">
              {/* Heading */}
              <div className="mb-6">
                <h2 className="text-[24px] font-bold leading-tight text-[#1A1A1A] dark:text-white sm:text-[30px]">
                  Let's Build Your Connectivity Program
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-500 dark:text-gray-300">
                  Tell us a bit about your organization and we'll tailor the right partnership path.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Row 1 — First / Last Name */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      placeholder="Enter Your First Name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      className="h-11 w-full rounded-md border border-gray-300 bg-[#f3f3f3] px-4 text-sm outline-none transition focus:border-[#007C91] focus:bg-white dark:border-gray-700 dark:bg-[#1f2937] dark:text-white dark:focus:bg-[#1f2937]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      placeholder="Enter Your Last Name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                      className="h-11 w-full rounded-md border border-gray-300 bg-[#f3f3f3] px-4 text-sm outline-none transition focus:border-[#007C91] focus:bg-white dark:border-gray-700 dark:bg-[#1f2937] dark:text-white dark:focus:bg-[#1f2937]"
                    />
                  </div>
                </div>

                {/* Row 2 — Work Email / Company */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                      Work Email
                    </label>
                    <input
                      type="email"
                      name="work_email"
                      placeholder="Enter Work Email"
                      value={formData.work_email}
                      onChange={handleChange}
                      required
                      className="h-11 w-full rounded-md border border-gray-300 bg-[#f3f3f3] px-4 text-sm outline-none transition focus:border-[#007C91] focus:bg-white dark:border-gray-700 dark:bg-[#1f2937] dark:text-white dark:focus:bg-[#1f2937]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      name="company_name"
                      placeholder="Enter Company Name"
                      value={formData.company_name}
                      onChange={handleChange}
                      required
                      className="h-11 w-full rounded-md border border-gray-300 bg-[#f3f3f3] px-4 text-sm outline-none transition focus:border-[#007C91] focus:bg-white dark:border-gray-700 dark:bg-[#1f2937] dark:text-white dark:focus:bg-[#1f2937]"
                    />
                  </div>
                </div>

                {/* Row 3 — Website / Country */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                      Website (if any)
                    </label>
                    <input
                      type="text"
                      name="website"
                      placeholder="Enter Website URL"
                      value={formData.website}
                      onChange={handleChange}
                      className="h-11 w-full rounded-md border border-gray-300 bg-[#f3f3f3] px-4 text-sm outline-none transition focus:border-[#007C91] focus:bg-white dark:border-gray-700 dark:bg-[#1f2937] dark:text-white dark:focus:bg-[#1f2937]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                      Country / Region
                    </label>
                    <select
                      name="country_region"
                      value={formData.country_region}
                      onChange={handleChange}
                      required
                      className="h-11 w-full rounded-md border border-gray-300 bg-[#f3f3f3] px-4 text-sm outline-none transition focus:border-[#007C91] focus:bg-white dark:border-gray-700 dark:bg-[#1f2937] dark:text-white dark:focus:bg-[#1f2937]"
                    >
                      <option value="">Select Option</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 4 — Role / Monthly Volume */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                      Role / Function
                    </label>
                    <input
                      type="text"
                      name="role_function"
                      placeholder="Travel Agency Owner..."
                      value={formData.role_function}
                      onChange={handleChange}
                      className="h-11 w-full rounded-md border border-gray-300 bg-[#f3f3f3] px-4 text-sm outline-none transition focus:border-[#007C91] focus:bg-white dark:border-gray-700 dark:bg-[#1f2937] dark:text-white dark:focus:bg-[#1f2937]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                      Monthly Traveler Volume
                    </label>
                    <select
                      name="monthly_traveler_volume"
                      value={formData.monthly_traveler_volume}
                      onChange={handleChange}
                      className="h-11 w-full rounded-md border border-gray-300 bg-[#f3f3f3] px-4 text-sm outline-none transition focus:border-[#007C91] focus:bg-white dark:border-gray-700 dark:bg-[#1f2937] dark:text-white dark:focus:bg-[#1f2937]"
                    >
                      <option value="">Select Option</option>
                      <option value="0-1K">0–1K</option>
                      <option value="1K-10K">1K–10K</option>
                      <option value="10K-50K">10K–50K</option>
                      <option value="50K-100K">50K–100K</option>
                      <option value="100K-200K">100K–200K</option>
                      <option value="200K+">200K+</option>
                    </select>
                  </div>
                </div>

                {/* Partnership Interest */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                    Partnership Interest
                  </label>
                  <input
                    type="text"
                    name="partnership_interest"
                    placeholder="Reseller, API Integration..."
                    value={formData.partnership_interest}
                    onChange={handleChange}
                    className="h-11 w-full rounded-md border border-gray-300 bg-[#f3f3f3] px-4 text-sm outline-none transition focus:border-[#007C91] focus:bg-white dark:border-gray-700 dark:bg-[#1f2937] dark:text-white dark:focus:bg-[#1f2937]"
                  />
                </div>

                {/* Message */}
                <div>
                  <textarea
                    rows={5}
                    name="message"
                    placeholder="Enter your message..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full resize-none rounded-md border border-gray-300 bg-[#f3f3f3] px-4 py-3 text-sm outline-none transition focus:border-[#007C91] focus:bg-white dark:border-gray-700 dark:bg-[#1f2937] dark:text-white dark:focus:bg-[#1f2937]"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 accent-[#007C91]"
                  />
                  <label htmlFor="consent" className="text-xs leading-relaxed text-gray-500 dark:text-gray-300">
                    I agree to be contacted regarding partner opportunities.
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-md bg-[#007C91] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#00697b] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Submitting..." : "Submit & Schedule a Consultation"}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-12 h-[4px] w-full bg-[#007C91]" />
      </section>
    </div>
  );
}