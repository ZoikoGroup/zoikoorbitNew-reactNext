"use client";
import Image from "next/image";
import React, { useState } from "react";

// ── API BASE ─────────────────────────────────────────────────────────────────
// Resolve backend origin from either env-var name, fall back to local Django,
// strip trailing slash. Absolute url straight to Django keeps the trailing slash
// intact (an empty base goes same-origin through Next, which 308-strips it → 404).
const RAW_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";
const API_BASE = RAW_API_BASE.replace(/\/+$/, "");
const INQUIRY_URL = `${API_BASE}/api/travel-partners/`;

// ── TYPES ─────────────────────────────────────────────────────────────────────
type FormData = {
  full_name: string;
  company_name: string;
  business_email: string;
  role: string;
  website: string;
  message: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const emptyForm: FormData = {
  full_name: "",
  company_name: "",
  business_email: "",
  role: "",
  website: "",
  message: "",
  consent: false,
};

// ── VALIDATION ────────────────────────────────────────────────────────────────
function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.full_name.trim())
    errors.full_name = "Full name is required.";

  if (!data.company_name.trim())
    errors.company_name = "Company / organisation is required.";

  if (!data.business_email.trim()) {
    errors.business_email = "Business email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.business_email.trim())) {
    errors.business_email = "Enter a valid email address.";
  }

  if (!data.role)
    errors.role = "Please select a role.";

  if (data.website.trim()) {
    try {
      const url = data.website.trim();
      new URL(url.startsWith("http") ? url : `https://${url}`);
    } catch {
      errors.website = "Enter a valid URL (e.g. https://example.com).";
    }
  }

  if (!data.message.trim())
    errors.message = "Message is required.";

  if (!data.consent)
    errors.consent = "You must agree to be contacted before submitting.";

  return errors;
}

// ── STYLE HELPERS ─────────────────────────────────────────────────────────────
const inputNormal =
  "w-full bg-gray-100 dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-600";

const inputError =
  "w-full bg-red-50 dark:bg-gray-900 dark:text-white border border-red-500 rounded-md px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500";

const selectNormal =
  "w-full bg-gray-100 dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-600 dark:[&>option]:bg-gray-800 dark:[&>option]:text-white";

const selectError =
  "w-full bg-red-50 dark:bg-gray-900 dark:text-white border border-red-500 rounded-md px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500 dark:[&>option]:bg-gray-800 dark:[&>option]:text-white";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-500">{message}</p>;
}

function RequiredMark() {
  return <span className="ml-0.5 text-red-500">*</span>;
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────
const TravelPartnersPage = () => {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const key = name as keyof FormData;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    const updated = { ...formData, [key]: newValue } as FormData;
    setFormData(updated);

    // clear the top-level banners as soon as the user starts fixing things
    if (errorMessage) setErrorMessage("");
    if (successMessage) setSuccessMessage("");

    if (touched[key]) {
      const newErrors = validateForm(updated);
      setErrors((prev) => ({ ...prev, [key]: newErrors[key] }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const key = e.target.name as keyof FormData;
    setTouched((prev) => ({ ...prev, [key]: true }));
    const newErrors = validateForm(formData);
    setErrors((prev) => ({ ...prev, [key]: newErrors[key] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const allTouched = Object.keys(emptyForm).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {} as Record<keyof FormData, boolean>
    );
    setTouched(allTouched);

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setErrorMessage("Please fix the highlighted fields before submitting.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        website: formData.website.trim() ? formData.website : null,
      };

      const response = await fetch(INQUIRY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Read text first so a non-JSON page (404 / redirect HTML) doesn't crash JSON.parse.
      const raw = await response.text();
      let data: unknown = null;
      try {
        data = raw ? JSON.parse(raw) : null;
      } catch {
        data = null;
      }

      if (response.ok) {
        setSuccessMessage("Form submitted successfully! Our team will reach out within 48 hours.");
        setFormData(emptyForm);
        setErrors({});
        setTouched({});
      } else if (data && typeof data === "object") {
        // Map backend field errors onto the form and show a summary banner.
        const backendErrors: FormErrors = {};
        for (const [field, messages] of Object.entries(data as Record<string, unknown>)) {
          const key = field as keyof FormData;
          backendErrors[key] = Array.isArray(messages)
            ? (messages as string[]).join(" ")
            : String(messages);
        }
        setErrors(backendErrors);
        setErrorMessage("Please check the highlighted fields and try again.");
      } else {
        // Non-JSON response — wrong URL (404) or a redirect landing page.
        console.error(`HTTP ${response.status} from ${INQUIRY_URL}`, raw.slice(0, 200));
        setErrorMessage(
          `Submission failed (HTTP ${response.status}). Please try again or contact support.`
        );
      }
    } catch (error) {
      // Network-level failure (server down, DNS, CORS).
      console.error(error);
      setErrorMessage("Server error. Please check your connection and try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="font-sans text-gray-800 bg-white dark:bg-gray-900 dark:text-white">

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[420px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/image/Rectangle 4 (8).png" alt="Travel partners hero" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 w-full">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Grow Your Business with<br />Premier Global eSIM Solutions.
            </h1>
            <p className="text-white text-base mb-8">Offer cutting-edge connectivity — and earn.</p>
            <a href="/partner-with-us">
              <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-md text-base transition-all shadow-lg">
                Become a Partner
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ===== WHY PARTNER WITH ZOIKO ORBIT ===== */}
      <section className="py-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Why Partner with Zoiko Orbit™</h2>
          <p className="text-gray-500 dark:text-white mb-12">Why travelers trust Zoiko Orbit for a hassle-free experience.</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: "/image/Group 1597883248.png", title: "Attractive Commissions", desc: "Earn competitive payouts on every eSIM sold through your network." },
              { icon: "/image/Group 1597883235 (1).png", title: "Tier-1 Coverage", desc: "Provide customers with high-speed, reliable data across 220+ countries." },
              { icon: "/image/Group 1597883236 (1).png", title: "White-Label Options", desc: "Offer eSIMs under your brand with customizable storefronts." },
              { icon: "/image/Group 1597883237 (1).png", title: "Dedicated Support", desc: "Access to partner success managers and 24/7 technical support." },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center px-2">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-600">
                  <Image src={item.icon} alt={item.title} width={80} height={80} className="object-contain" />
                </div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-500 dark:text-white text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INTEGRATE AND SELL EFFORTLESSLY ===== */}
      <section className="py-4 bg-[#eaf3fb] dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden">
              <Image src="/image/young-business-man-talking-on-smartphone-working-w-2025-02-13-00-11-27-utc 1.png" alt="Integrate and sell effortlessly" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                Integrate and Sell<br />Effortlessly.
              </h2>
              <p className="text-gray-600 dark:text-white mb-6">Set up a ready-to-use storefront with your logo and brand colors.</p>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">API: Plug & Play</h3>
              <ul className="space-y-3 text-gray-600 dark:text-white text-sm">
                {["Easy plan customization.", "Commission dashboard.", "Marketing-ready assets."].map((item, i) => (
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

      {/* ===== HOW TO INSTALL AND ACTIVATE ===== */}
      <section className="py-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">How to Install and Activate / Start eSIM</h2>
          <p className="text-gray-500 dark:text-white mb-12">Unlock new revenue and delight travelers with ready-to-activate global data.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: "/image/Rectangle 938.png", title: "Pick Destination & Data", desc: "Choose from Global, Regional, or Sub-Regional plans tailored for your travel zone." },
              { img: "/image/Rectangle 939.png", title: "Activate in Minutes", desc: "Secure checkout → receive QR code → scan or enter details to install." },
              { img: "/image/Rectangle 940.png", title: "Roam Globally", desc: "Connect to Tier-1 networks in 220+ countries instantly." },
            ].map((item, i) => (
              <div key={i} className="text-left">
                <div className="relative w-full h-56 mb-4 flex items-center justify-center">
                  <Image src={item.img} alt={item.title} fill className="object-contain" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-500 dark:text-white text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== START YOUR PARTNERSHIP JOURNEY ===== */}
      <section className="relative bg-[#f5f5f5] dark:bg-gray-900 overflow-hidden">

        <div className="absolute inset-0">
          <Image src="/image/fjgghjfghhj.png" alt="Partnership journey" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 flex justify-end">
          <div className="w-full md:max-w-xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100 dark:border-gray-700">

            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
                Start Your Partnership Journey.
              </h2>
              <p className="text-sm text-gray-600 dark:text-white">
                Fill in your details — our team will reach out within 48 hours.
              </p>
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                Fields marked <span className="text-red-500">*</span> are required.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit} noValidate>

              {/* Row 1 */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-700 dark:text-white mb-1 block">
                    Full Name<RequiredMark />
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Full Name"
                    className={errors.full_name ? inputError : inputNormal}
                  />
                  <FieldError message={errors.full_name} />
                </div>
                <div>
                  <label className="text-xs text-gray-700 dark:text-white mb-1 block">
                    Company / Organization<RequiredMark />
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Company/Organization Name"
                    className={errors.company_name ? inputError : inputNormal}
                  />
                  <FieldError message={errors.company_name} />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-700 dark:text-white mb-1 block">
                    Business Email<RequiredMark />
                  </label>
                  <input
                    type="email"
                    name="business_email"
                    value={formData.business_email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Business Email"
                    className={errors.business_email ? inputError : inputNormal}
                  />
                  <FieldError message={errors.business_email} />
                </div>
                <div>
                  <label className="text-xs text-gray-700 dark:text-white mb-1 block">
                    Role<RequiredMark />
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.role ? selectError : selectNormal}
                  >
                    <option value="">- Select Role -</option>
                    <option value="Owner">Owner</option>
                    <option value="Manager">Manager</option>
                    <option value="Agent">Agent</option>
                    <option value="Other">Other</option>
                  </select>
                  <FieldError message={errors.role} />
                </div>
              </div>

              {/* Row 3 — Website */}
              <div>
                <label className="text-xs text-gray-700 dark:text-white mb-1 block">
                  Website (if any)
                </label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Website URL"
                  className={errors.website ? inputError : inputNormal}
                />
                <FieldError message={errors.website} />
              </div>

              {/* Message */}
              <div>
                <label className="text-xs text-gray-700 dark:text-white mb-1 block">
                  Message<RequiredMark />
                </label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your message....."
                  className={
                    errors.message
                      ? "w-full bg-red-50 dark:bg-gray-900 dark:text-white border border-red-500 rounded-md px-3 py-3 text-sm outline-none resize-none focus:ring-2 focus:ring-red-500"
                      : "w-full bg-gray-100 dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md px-3 py-3 text-sm outline-none resize-none focus:ring-2 focus:ring-teal-600"
                  }
                />
                <FieldError message={errors.message} />
              </div>

              {/* Checkbox */}
              <div>
                <div className="flex items-start gap-2">
                  <input
                    id="consent"
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 accent-teal-700"
                  />
                  <label htmlFor="consent" className="text-xs text-gray-600 dark:text-white">
                    I agree to be contacted by Zoiko Orbit regarding partner opportunities.<RequiredMark />
                  </label>
                </div>
                <FieldError message={errors.consent} />
              </div>

              {/* Success / Error banners */}
              {successMessage && (
                <div className="rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:border-green-700 dark:bg-green-900/20 dark:text-green-400">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-700 dark:bg-red-900/20 dark:text-red-400">
                  {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-700 hover:bg-teal-800 transition text-white font-medium px-8 py-3 rounded-md shadow-md disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Submitting..." : "Submit & Schedule Consultation"}
              </button>

            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default TravelPartnersPage;