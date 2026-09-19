"use client"
import { useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import toast from "react-hot-toast";

// ── API BASE ────────────────────────────────────────────────────────────────
// Resolve the backend origin from either env-var name, falling back to local
// Django. Strip trailing slash so joins can't produce "//". Posting an ABSOLUTE
// url straight to Django keeps the trailing slash intact — an empty base makes
// the request go same-origin through Next, which 308-strips the slash → 404.
const RAW_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";
const API_BASE = RAW_API_BASE.replace(/\/+$/, "");
const INQUIRY_URL = `${API_BASE}/api/business-enterprise/enterprise-inquiry/`;

const enterpriseFeatures = [
    {
        id: 1,
        icon: "/image/BE-icon1.png",
        title: "Predictable Billing",
        description:
            "Simplify your expenses with consolidated global billing, pooled data plans, and transparent cost tracking. Say goodbye to unpredictable roaming charges.",
    },
    {
        id: 2,
        icon: "/image/BE-icon2.png",
        title: "Tier-1 Network Security",
        description:
            "We provide enterprise-grade security and privacy. All connections are GDPR-compliant and powered by Tier-1 networks with SOC 2 and PCI DSS certifications.",
    },
    {
        id: 3,
        icon: "/image/BE-icon3.png",
        title: "Admin Dashboard",
        description:
            "Gain total control with a centralized platform to provision eSIMs, monitor data usage, and generate detailed reports for all your teams.",
    },
];

const businessSolutions = [
  {
    id: 1,
    image: "/image/plan-icon1.webp",
    title: "Corporate Travel Plans",
    description: "Pre-trip provisioning, data pools, expense integration.",
    link: "#",
  },
  {
    id: 2,
    image: "/image/plan-icon2.jpg",
    title: "Remote Worker Data",
    description: "Always-on connectivity for distributed teams.",
    link: "#",
  },
  {
    id: 3,
    image: "/image/plan-icon3.webp",
    title: "Bespoke Global Programs",
    description: "Tailored plans for industries like energy, consulting, etc.",
    link: "#",
  },
];

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

type FormData = {
  full_name: string;
  company_name: string;
  business_email: string;
  role: string;
  website: string;
  country_code: string;
  phone_number: string;
  enquiry_type: string;
  message: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;
type FocusableField = Exclude<keyof FormData, "country_code">;

const emptyForm: FormData = {
  full_name: "",
  company_name: "",
  business_email: "",
  role: "",
  website: "",
  country_code: "+44",
  phone_number: "",
  enquiry_type: "",
  message: "",
  consent: false,
};

// ── FIELD RULES ───────────────────────────────────────────────────────────────
// Single source of truth for what blocks submission. `enquiry_type` and
// `website` are intentionally absent: both are optional.
const REQUIRED_FIELDS: FocusableField[] = [
  "full_name",
  "company_name",
  "business_email",
  "role",
  "phone_number",
  "message",
  "consent",
];

// Visual order, used to jump the user to the first problem field on submit.
const FIELD_ORDER: FocusableField[] = [
  "full_name",
  "company_name",
  "business_email",
  "role",
  "website",
  "phone_number",
  "enquiry_type",
  "message",
  "consent",
];

const FIELD_LABELS: Record<FocusableField, string> = {
  full_name: "Full name",
  company_name: "Company / organisation",
  business_email: "Business email",
  role: "Role",
  website: "Website",
  phone_number: "Phone number",
  enquiry_type: "Type of enquiry",
  message: "Message",
  consent: "Contact consent",
};

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

  // Website is optional — only checked when something has been typed.
  const website = data.website.trim();
  if (website && !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#].*)?$/i.test(website))
    errors.website = "Enter a valid URL, e.g. example.com";

  if (!data.phone_number.trim()) {
    errors.phone_number = "Phone number is required.";
  } else if (!/^\d{6,14}$/.test(data.phone_number.replace(/\s+/g, ""))) {
    errors.phone_number = "Enter a valid number without country code (e.g. 7911123456).";
  }

  // NOTE: enquiry_type is optional and never blocks submission.

  if (!data.message.trim()) {
    errors.message = "Message is required.";
  } else if (data.message.trim().length < 10) {
    errors.message = "Please add a little more detail (at least 10 characters).";
  }

  if (!data.consent)
    errors.consent = "You must agree to be contacted before submitting.";

  return errors;
}

// ── STYLE HELPERS ─────────────────────────────────────────────────────────────
const inputBase =
  "h-11 w-full rounded-md border px-4 text-sm outline-none transition focus:bg-white dark:focus:bg-[#1f2937]";

const inputNormal =
  inputBase +
  " border-gray-300 bg-[#f3f3f3] focus:border-[#007C91] dark:border-gray-700 dark:bg-[#1f2937] dark:text-white";

const inputError =
  inputBase +
  " border-red-500 bg-red-50 focus:border-red-500 dark:border-red-500 dark:bg-[#1f2937] dark:text-white";

const selectNormal =
  inputBase +
  " border-gray-300 bg-[#f3f3f3] focus:border-[#007C91] dark:border-gray-700 dark:bg-[#1f2937] dark:text-white";

const selectError =
  inputBase +
  " border-red-500 bg-red-50 focus:border-red-500 dark:border-red-500 dark:bg-[#1f2937] dark:text-white";

function FieldError({ id, message }: { id?: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-xs text-red-500">
      {message}
    </p>
  );
}

function RequiredMark() {
  return <span className="ml-0.5 text-red-500">*</span>;
}

export default function BusinessesEnterprises() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const fieldRefs = useRef<Partial<Record<FocusableField, HTMLElement | null>>>({});
  const setFieldRef = (key: FocusableField) => (el: HTMLElement | null) => {
    fieldRefs.current[key] = el;
  };

  // Live validity — drives the disabled state of the submit button.
  const liveErrors = useMemo(() => validateForm(formData), [formData]);
  const isFormValid = Object.keys(liveErrors).length === 0;

  const missingRequired = REQUIRED_FIELDS.filter((key) => liveErrors[key]);

  const focusFirstError = (currentErrors: FormErrors) => {
    const firstKey = FIELD_ORDER.find((key) => currentErrors[key]);
    if (!firstKey) return;
    const el = fieldRefs.current[firstKey];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.focus({ preventScroll: true });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const key = name as keyof FormData;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    const updated = { ...formData, [key]: newValue } as FormData;
    setFormData(updated);

    // Re-check once the field has been visited, or once a submit was attempted.
    if (touched[key] || submitAttempted) {
      const newErrors = validateForm(updated);
      setErrors((prev) => ({ ...prev, [key]: newErrors[key] }));
    }
  };

  // digits-only handler for phone field
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    const updated = { ...formData, phone_number: digits };
    setFormData(updated);
    if (touched.phone_number || submitAttempted) {
      const newErrors = validateForm(updated);
      setErrors((prev) => ({ ...prev, phone_number: newErrors.phone_number }));
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setSubmitAttempted(true);

    const allTouched = Object.keys(emptyForm).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {} as Record<keyof FormData, boolean>
    );
    setTouched(allTouched);

    // Hard gate: nothing leaves the browser unless every required field passes.
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix the highlighted fields before submitting.");
      focusFirstError(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        phone_number: `${formData.country_code}${formData.phone_number}`,
        // Trim the free-text fields so trailing spaces don't reach the backend.
        full_name: formData.full_name.trim(),
        company_name: formData.company_name.trim(),
        business_email: formData.business_email.trim(),
        website: formData.website.trim(),
        message: formData.message.trim(),
        // Optional field: send an empty string when unset. The Django serializer
        // needs required=False / allow_blank=True on this one.
        enquiry_type: formData.enquiry_type || "",
      };
      // remove country_code from payload as it's merged into phone_number
   const { country_code, enquiry_type, ...rest } = payload;
void country_code;
const finalPayload = enquiry_type ? { ...rest, enquiry_type } : rest;
      const response = await fetch(INQUIRY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPayload),
      });

      // Read text first so a non-JSON page (404/redirect HTML) doesn't crash JSON.parse.
      const raw = await response.text();
      let data: unknown = null;
      try {
        data = raw ? JSON.parse(raw) : null;
      } catch {
        data = null;
      }

      if (response.ok) {
        toast.success("Inquiry submitted successfully");
        console.log(data);
        setFormData(emptyForm);
        setErrors({});
        setTouched({});
        setSubmitAttempted(false);
      } else if (data && typeof data === "object") {
        console.log("Backend error:", data);
        const backendErrors: FormErrors = {};
        for (const [field, messages] of Object.entries(data as Record<string, unknown>)) {
          const key = field as keyof FormData;
          backendErrors[key] = Array.isArray(messages)
            ? (messages as string[]).join(" ")
            : String(messages);
        }
        setErrors(backendErrors);
        focusFirstError(backendErrors);
        toast.error("Something went wrong");
      } else {
        // Non-JSON response — usually a wrong URL (404) or a redirect landing page.
        console.error(`HTTP ${response.status} from ${INQUIRY_URL}`, raw.slice(0, 200));
        toast.error(`Submission failed (HTTP ${response.status}). Check the API URL / trailing slash.`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }

    setLoading(false);
  };

    return (
        <>
            {/* HERO section */}
            <section className="relative h-[75vh] min-h-[500px]">
                <Image
                    src="/image/BE-hero.webp"
                    alt="Businesses-Enterprises hero"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 flex items-center">
                    <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
                        <div className="max-w-3xl">
                            <h1 className="mb-4 text-2xl font-extrabold leading-tight text-white md:text-4xl lg:text-[42px]">
                                Empower Your Global Teams{" "}
                                <br className="hidden md:block" />
                                with World-Class Connectivity.
                            </h1>
                            <p className="mb-8 text-lg leading-relaxed text-gray-200 md:text-2xl">
                                Tailored solutions for corporate travel, remote teams,<br className="hidden md:block" />
                                and global operations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Enterprises Choose Zoiko Orbit™ */}
            <section className="bg-[#EAF4FA] dark:bg-[#0F172A] py-4 sm:py-8 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold leading-tight text-[#1E293B] dark:text-white sm:text-4xl lg:text-[52px]">
                            Why Enterprises Choose Zoiko Orbit™
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-base text-[#334155] dark:text-slate-300 sm:text-lg">
                            Why thousands of travelers trust us every day
                        </p>
                    </div>

                    <div className="mt-12 overflow-hidden rounded-[24px] bg-white dark:bg-[#1E293B] shadow-sm dark:shadow-none dark:ring-1 dark:ring-white/10">
                        <div className="grid grid-cols-1 divide-y divide-gray-300 dark:divide-white/10 md:grid-cols-2 md:divide-y-0 lg:grid-cols-3 lg:divide-x lg:dark:divide-x">
                            {enterpriseFeatures.map((item) => (
                                <div key={item.id} className="flex flex-col p-8 sm:p-10 lg:p-12">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#007C91] dark:bg-[#0891A6]">
                                        <div className="relative h-20 w-20">
                                            <Image src={item.icon} alt={item.title} fill className="object-contain" />
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <h3 className="text-xl font-bold text-[#1E293B] dark:text-white">{item.title}</h3>
                                        <p className="mt-4 text-[15px] leading-8 text-[#475569] dark:text-slate-300">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Solutions Built for Your Business */}
            <section className="relative overflow-hidden bg-white dark:bg-[#0F172A] py-4 sm:py-8 lg:py-24">
                <div className="absolute inset-0 opacity-60 dark:opacity-40 pointer-events-none bg-[linear-gradient(to_right,#dbe4ec_1px,transparent_1px),linear-gradient(to_bottom,#dbe4ec_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:72px_72px]" />
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold leading-tight text-[#1E293B] dark:text-white sm:text-4xl lg:text-[52px]">
                            Solutions Built for Your Business.
                        </h2>
                        <p className="mx-auto mt-4 max-w-3xl text-base text-[#475569] dark:text-slate-300 sm:text-lg">
                            Scale from a few travelers to global workforce coverage—mix & match programs
                        </p>
                    </div>

                    <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        {businessSolutions.map((item) => (
                            <div key={item.id} className="group flex flex-col">
                                <div className="relative overflow-hidden rounded-2xl dark:ring-1 dark:ring-white/10">
                                    <div className="relative h-[240px] w-full sm:h-[260px]">
                                        <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <h3 className="text-xl md:text-2xl font-bold text-[#1E293B] dark:text-white">{item.title}</h3>
                                    <p className="mt-3 text-sm md:text-base leading-7 text-[#475569] dark:text-slate-300">{item.description}</p>
                                    <a href="/plans" className="mt-5 inline-flex items-center gap-2 text-[16px] font-medium text-[#007C91] dark:text-[#22D3EE] transition-all duration-300 hover:gap-3">
                                        Learn More <span>→</span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Seamless Integration */}
            <section className="bg-[#e3eff8] py-8 dark:bg-gray-900 dark:text-white">
                <div className="mx-auto max-w-7xl px-6 md:px-12">
                    <div className="grid items-center gap-12 md:grid-cols-2">
                        <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl dark:bg-gray-900 dark:text-white bg-teal-50">
                            <Image src="/image/seamless-integration.webp" alt="Seamless Integration" width={580} height={380} className="w-full object-contain" />
                        </div>
                        <div className="space-y-8">
                            <div className="mb-5 text-left">
                                <h2 className="mb-3 text-3xl font-bold dark:bg-gray-900 dark:text-white text-zinc-900 md:text-4xl">
                                    Seamless Integration with Your Existing Systems
                                </h2>
                                <p className="text-sm md:text-base text-gray-500 dark:bg-gray-900 dark:text-white">
                                    Zoiko Orbit APIs and connectors easily integrate with ERP, travel management, and reporting tools..
                                </p>
                            </div>
                            <div>
                                <h3 className="mb-3 text-lg md:text-xl font-bold dark:bg-gray-900 dark:text-white text-zinc-900">
                                    API: Plug &amp; Play
                                </h3>
                                <ul className="space-y-2 text-base md:text-lg dark:bg-gray-900 dark:text-white text-gray-600">
                                    <li className="flex items-start gap-2"><span className="mt-0.5 text-teal-600">•</span>REST API with real-time activation and reporting.</li>
                                    <li className="flex items-start gap-2"><span className="mt-0.5 text-teal-600">•</span>SSO & secure admin portals.</li>
                                    <li className="flex items-start gap-2"><span className="mt-0.5 text-teal-600">•</span>Multi-currency billing and cost center mapping.</li>
                                </ul>
                            </div>
                            <hr className="border-gray-200" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA / CONTACT FORM */}
            <section className="relative overflow-hidden bg-[#f5f5f5] dark:bg-gray-900">

                <div className="relative h-[260px] sm:h-[320px] md:h-[580px] w-full">
                    <Image src="/image/speak-to-our-enterprises.png" alt="Connectivity Program" fill priority className="object-cover object-center" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-2 gap-10">

                        {/* LEFT WORLD MAP */}
                        <div className="hidden lg:flex items-center justify-center min-h-[400px] pt-32">
                            <div className="relative h-[320px] w-full max-w-[400px] opacity-90">
                                <Image src="/image/map.png" alt="World Map" fill className="object-contain" />
                            </div>
                        </div>

                        {/* FORM CARD */}
                        <div className="
                            relative -mt-26 sm:-mt-30 lg:-mt-102 lg:ml-auto
                            w-full max-w-2xl rounded-[24px] border border-gray-200
                            bg-white p-5 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.12)]
                            dark:border-gray-700 dark:bg-gray-900
                        ">

                            <div className="mb-6">
                                <h2 className="text-[24px] sm:text-[30px] font-bold leading-tight text-[#1A1A1A] dark:text-white">
                                    Speak to Our Enterprise Team
                                </h2>
                                <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-500 dark:text-gray-300">
                                    Our specialists will respond within 24 hours to discuss tailored solutions for your business.
                                </p>
                                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                                    Fields marked <span className="text-red-500">*</span> are required. Website and type of enquiry are optional.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} noValidate className="space-y-5">

                                {/* ERROR SUMMARY — only after a submit attempt */}
                                {submitAttempted && missingRequired.length > 0 && (
                                    <div
                                        role="alert"
                                        aria-live="polite"
                                        className="rounded-md border border-red-300 bg-red-50 p-3 text-xs text-red-700 dark:border-red-500/50 dark:bg-red-500/10 dark:text-red-300"
                                    >
                                        <p className="font-semibold">
                                            {missingRequired.length} required{" "}
                                            {missingRequired.length === 1 ? "field needs" : "fields need"} attention:
                                        </p>
                                        <ul className="mt-1 list-disc space-y-0.5 pl-4">
                                            {missingRequired.map((key) => (
                                                <li key={key}>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const el = fieldRefs.current[key];
                                                            el?.scrollIntoView({ behavior: "smooth", block: "center" });
                                                            el?.focus({ preventScroll: true });
                                                        }}
                                                        className="underline underline-offset-2 hover:no-underline"
                                                    >
                                                        {FIELD_LABELS[key]}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* ROW 1 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="full_name" className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                                            Full Name<RequiredMark />
                                        </label>
                                        <input
                                            id="full_name"
                                            ref={setFieldRef("full_name")}
                                            type="text"
                                            placeholder="Enter Your Full Name"
                                            name="full_name"
                                            value={formData.full_name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            aria-required="true"
                                            aria-invalid={!!errors.full_name}
                                            aria-describedby={errors.full_name ? "full_name-error" : undefined}
                                            className={errors.full_name ? inputError : inputNormal}
                                        />
                                        <FieldError id="full_name-error" message={errors.full_name} />
                                    </div>

                                    <div>
                                        <label htmlFor="company_name" className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                                            Company / Organization<RequiredMark />
                                        </label>
                                        <input
                                            id="company_name"
                                            ref={setFieldRef("company_name")}
                                            type="text"
                                            placeholder="Enter Your Company Name"
                                            name="company_name"
                                            value={formData.company_name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            aria-required="true"
                                            aria-invalid={!!errors.company_name}
                                            aria-describedby={errors.company_name ? "company_name-error" : undefined}
                                            className={errors.company_name ? inputError : inputNormal}
                                        />
                                        <FieldError id="company_name-error" message={errors.company_name} />
                                    </div>
                                </div>

                                {/* ROW 2 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="business_email" className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                                            Business Email<RequiredMark />
                                        </label>
                                        <input
                                            id="business_email"
                                            ref={setFieldRef("business_email")}
                                            type="email"
                                            placeholder="Enter Business Email"
                                            name="business_email"
                                            value={formData.business_email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            aria-required="true"
                                            aria-invalid={!!errors.business_email}
                                            aria-describedby={errors.business_email ? "business_email-error" : undefined}
                                            className={errors.business_email ? inputError : inputNormal}
                                        />
                                        <FieldError id="business_email-error" message={errors.business_email} />
                                    </div>

                                    <div>
                                        <label htmlFor="role" className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                                            Role<RequiredMark />
                                        </label>
                                        <select
                                            id="role"
                                            ref={setFieldRef("role")}
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            aria-required="true"
                                            aria-invalid={!!errors.role}
                                            aria-describedby={errors.role ? "role-error" : undefined}
                                            className={errors.role ? selectError : selectNormal}
                                        >
                                            <option value="">Select Your Role</option>
                                            <option value="Owner">Owner</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Agent">Agent</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <FieldError id="role-error" message={errors.role} />
                                    </div>
                                </div>

                                {/* ROW 3 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="website" className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                                            Website <span className="text-gray-400">(optional)</span>
                                        </label>
                                        <input
                                            id="website"
                                            ref={setFieldRef("website")}
                                            type="text"
                                            placeholder="Enter Website URL"
                                            name="website"
                                            value={formData.website}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            aria-invalid={!!errors.website}
                                            aria-describedby={errors.website ? "website-error" : undefined}
                                            className={errors.website ? inputError : inputNormal}
                                        />
                                        <FieldError id="website-error" message={errors.website} />
                                    </div>

                                    {/* PHONE — country code dropdown + number input */}
                                    <div>
                                        <label htmlFor="phone_number" className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                                            Phone Number<RequiredMark />
                                        </label>
                                        <div className={`flex h-11 rounded-md border overflow-hidden transition ${
                                            errors.phone_number
                                                ? "border-red-500"
                                                : "border-gray-300 dark:border-gray-700 focus-within:border-[#007C91]"
                                        }`}>
                                            {/* Country code select */}
                                            <div className="relative flex-shrink-0">
                                                <select
                                                    name="country_code"
                                                    aria-label="Country calling code"
                                                    value={formData.country_code}
                                                    onChange={handleChange}
                                                    className="h-full pl-2 pr-6 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-xs border-r border-gray-300 dark:border-gray-600 focus:outline-none appearance-none cursor-pointer"
                                                >
                                                    {countryCodes.map((c) => (
                                                        <option key={c.code} value={c.code}>
                                                            {c.label} {c.code}
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="w-3 h-3 text-gray-500 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
                                            </div>
                                            {/* Number input — digits only */}
                                            <input
                                                id="phone_number"
                                                ref={setFieldRef("phone_number")}
                                                type="tel"
                                                name="phone_number"
                                                value={formData.phone_number}
                                                onChange={handlePhoneChange}
                                                onBlur={handleBlur}
                                                placeholder="7911 123456"
                                                aria-required="true"
                                                aria-invalid={!!errors.phone_number}
                                                aria-describedby={errors.phone_number ? "phone_number-error" : undefined}
                                                className="flex-1 px-3 text-sm bg-[#f3f3f3] dark:bg-[#1f2937] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                                            />
                                        </div>
                                        {errors.phone_number ? (
                                            <FieldError id="phone_number-error" message={errors.phone_number} />
                                        ) : formData.phone_number ? (
                                            <p className="mt-1 text-xs text-[#007C91] dark:text-teal-400">
                                                Full number: {formData.country_code} {formData.phone_number}
                                            </p>
                                        ) : (
                                            <p className="mt-1 text-xs text-gray-400">
                                                Select country code, then enter number without it.
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* ENQUIRY TYPE — optional, never blocks submission */}
                                <div>
                                    <label htmlFor="enquiry_type" className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                                        Type of Enquiry <span className="text-gray-400">(optional)</span>
                                    </label>
                                    <select
                                        id="enquiry_type"
                                        ref={setFieldRef("enquiry_type")}
                                        name="enquiry_type"
                                        value={formData.enquiry_type}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        aria-invalid={!!errors.enquiry_type}
                                        aria-describedby={errors.enquiry_type ? "enquiry_type-error" : undefined}
                                        className={errors.enquiry_type ? selectError : selectNormal}
                                    >
                                        <option value="">Select type of enquiry — or leave blank</option>
                                        <option value="Corporate Travel">Corporate Travel</option>
                                        <option value="Remote Workforce">Remote Workforce</option>
                                        <option value="API Integration">API Integration</option>
                                        <option value="Custom Program">Custom Program</option>
                                    </select>
                                    {/* Only ever shows a backend-returned message, since client-side
                                        validation never flags this field. */}
                                    <FieldError id="enquiry_type-error" message={errors.enquiry_type} />
                                </div>

                                {/* MESSAGE */}
                                <div>
                                    <label htmlFor="message" className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                                        Message<RequiredMark />
                                    </label>
                                    <textarea
                                        id="message"
                                        ref={setFieldRef("message")}
                                        rows={5}
                                        placeholder="Enter your message..."
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        aria-required="true"
                                        aria-invalid={!!errors.message}
                                        aria-describedby={errors.message ? "message-error" : undefined}
                                        className={
                                            errors.message
                                                ? "w-full resize-none rounded-md border border-red-500 bg-red-50 px-4 py-3 text-sm outline-none transition focus:border-red-500 dark:border-red-500 dark:bg-[#1f2937] dark:text-white"
                                                : "w-full resize-none rounded-md border border-gray-300 bg-[#f3f3f3] px-4 py-3 text-sm outline-none transition focus:border-[#007C91] focus:bg-white dark:border-gray-700 dark:bg-[#1f2937] dark:text-white dark:focus:bg-[#1f2937]"
                                        }
                                    />
                                    <FieldError id="message-error" message={errors.message} />
                                </div>

                                {/* CHECKBOX */}
                                <div>
                                    <div className="flex items-start gap-2">
                                        <input
                                            type="checkbox"
                                            id="consent"
                                            ref={setFieldRef("consent")}
                                            name="consent"
                                            checked={formData.consent}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            aria-required="true"
                                            aria-invalid={!!errors.consent}
                                            aria-describedby={errors.consent ? "consent-error" : undefined}
                                            className="mt-1 accent-[#007C91]"
                                        />
                                        <label htmlFor="consent" className="text-xs leading-relaxed text-gray-500 dark:text-gray-300">
                                            I agree to be contacted regarding partner opportunities.<RequiredMark />
                                        </label>
                                    </div>
                                    <FieldError id="consent-error" message={errors.consent} />
                                </div>

                                {/* BUTTON */}
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={loading || (submitAttempted && !isFormValid)}
                                        className="inline-flex items-center justify-center rounded-md bg-[#007C91] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#00697b] disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {loading ? "Submitting..." : "Submit & Schedule a Call"}
                                    </button>
                                    {submitAttempted && !isFormValid && (
                                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                            Complete the required fields above to enable submitting.
                                        </p>
                                    )}
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

                <div className="mt-12 h-[4px] w-full bg-[#007C91]" />
            </section>
        </>
    )
}