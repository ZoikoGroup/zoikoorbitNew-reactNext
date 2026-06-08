"use client";

import { useState } from "react";
import { ChevronDown, CheckCircle2, AlertCircle, X } from "lucide-react";

interface FormData {
  fullName: string;
  jobTitle: string;
  companyName: string;
  businessEmail: string;
  phoneNumber: string;
  businessWebsite: string;
  integrationInterests: string[];
  operatingRegions: string;
  travelerVolume: string;
  distributionChannels: string[];
  businessObjective: string;
  agreed: boolean;
}

interface Toast {
  type: "success" | "error" | "warning";
  title: string;
  message: string;
}

export default function IntegrationInterestForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    jobTitle: "",
    companyName: "",
    businessEmail: "",
    phoneNumber: "",
    businessWebsite: "",
    integrationInterests: [],
    operatingRegions: "",
    travelerVolume: "1K-5K",
    distributionChannels: [],
    businessObjective: "",
    agreed: false,
  });

  const [toast, setToast] = useState<Toast | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState<string>("");

  const showToast = (toastData: Toast) => {
    setToast(toastData);
    setTimeout(() => setToast(null), 5000);
  };

  const integrationInterestOptions = [
    "Embed eSIM with digital travel policies",
    "One-click activation integration",
    "Dashboard for activations & performance",
    "Embedded REST APIs + Webhooks",
    "White-label activation journeys",
    "Tiered billing & usage tracking",
    "Partnership strategy call request",
  ];

  const distributionChannelOptions = [
    "Mobile App",
    "Website",
    "Agent Network",
    "Travel Agency Partnerships",
  ];

  const operatingRegionOptions = [
    "Europe",
    "Asia Pacific",
    "Middle East & Africa",
    "Americas",
  ];

  const travelerVolumeOptions = ["1K-5K", "5K-20K", "20K+"];

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxToggle = (
    field: "integrationInterests" | "distributionChannels",
    value: string
  ) => {
    setFormData((prev) => {
      const current = prev[field];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [field]: updated };
    });
  };

  const validatePhone = (value: string) => {
    const cleaned = value.replace(/\s+/g, "");
    if (!cleaned) {
      setPhoneError("Phone number is required.");
    } else if (!/^\+?[1-9]\d{6,14}$/.test(cleaned)) {
      setPhoneError("Enter a valid international number (e.g. +44 7911 123456).");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreed) {
      showToast({
        type: "warning",
        title: "Consent Required",
        message: "Please agree to be contacted by Zoiko Orbit before submitting.",
      });
      return;
    }

    if (phoneError || !formData.phoneNumber) {
      showToast({
        type: "warning",
        title: "Invalid Phone Number",
        message: "Please enter a valid international phone number.",
      });
      return;
    }

    setIsSubmitting(true);
    const integration_interest_url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/integration-interest/`;
    try {
      const response = await fetch(integration_interest_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          job_title: formData.jobTitle,
          company_name: formData.companyName,
          business_email: formData.businessEmail,
          phone_number: formData.phoneNumber,
          business_website: formData.businessWebsite,
          integration_interests: formData.integrationInterests,
          operating_regions: formData.operatingRegions,
          traveler_volume: formData.travelerVolume,
          distribution_channels: formData.distributionChannels,
          business_objective: formData.businessObjective,
          agreed: formData.agreed,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast({
          type: "success",
          title: "Request Submitted Successfully!",
          message: "Thank you for your interest. Our team will reach out to you within 24 hours.",
        });
        console.log(data);
        setFormData({
          fullName: "",
          jobTitle: "",
          companyName: "",
          businessEmail: "",
          phoneNumber: "",
          businessWebsite: "",
          integrationInterests: [],
          operatingRegions: "",
          travelerVolume: "1K-5K",
          distributionChannels: [],
          businessObjective: "",
          agreed: false,
        });
        setPhoneError("");
      } else {
        console.error(data);
        showToast({
          type: "error",
          title: "Submission Failed",
          message: "We couldn't process your request. Please verify your details and try again.",
        });
      }
    } catch (error) {
      console.error(error);
      showToast({
        type: "error",
        title: "Connection Error",
        message: "Unable to reach our servers. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getToastStyles = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return {
          bg: "bg-emerald-50 dark:bg-emerald-950/40",
          border: "border-emerald-200 dark:border-emerald-800",
          iconBg: "bg-emerald-500",
          icon: <CheckCircle2 className="w-5 h-5 text-white" />,
          titleColor: "text-emerald-900 dark:text-emerald-100",
          messageColor: "text-emerald-700 dark:text-emerald-300",
        };
      case "error":
        return {
          bg: "bg-red-50 dark:bg-red-950/40",
          border: "border-red-200 dark:border-red-800",
          iconBg: "bg-red-500",
          icon: <AlertCircle className="w-5 h-5 text-white" />,
          titleColor: "text-red-900 dark:text-red-100",
          messageColor: "text-red-700 dark:text-red-300",
        };
      case "warning":
        return {
          bg: "bg-amber-50 dark:bg-amber-950/40",
          border: "border-amber-200 dark:border-amber-800",
          iconBg: "bg-amber-500",
          icon: <AlertCircle className="w-5 h-5 text-white" />,
          titleColor: "text-amber-900 dark:text-amber-100",
          messageColor: "text-amber-700 dark:text-amber-300",
        };
    }
  };

  return (
    <main className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 min-h-screen">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in-right">
          <div
            className={`flex items-start gap-3 max-w-md p-4 rounded-xl border ${getToastStyles(toast.type).bg} ${getToastStyles(toast.type).border} shadow-2xl backdrop-blur-sm`}
            role="alert"
          >
            <div
              className={`flex-shrink-0 w-9 h-9 rounded-lg ${getToastStyles(toast.type).iconBg} flex items-center justify-center shadow-md`}
            >
              {getToastStyles(toast.type).icon}
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <h4
                className={`font-semibold text-sm ${getToastStyles(toast.type).titleColor} mb-0.5`}
              >
                {toast.title}
              </h4>
              <p
                className={`text-xs ${getToastStyles(toast.type).messageColor} leading-relaxed`}
              >
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => setToast(null)}
              className={`flex-shrink-0 ${getToastStyles(toast.type).titleColor} hover:opacity-70 transition-opacity`}
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

      <section className="max-w-5xl mx-auto px-6 lg:px-12 py-4 md:py-8">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            Let&apos;s Co-Create the Future of{" "}
            <span className="text-teal-600 dark:text-teal-400">Connected Travel Insurance</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Apply today to Discover how Zoiko Orbit can boost policy engagement, reduce claims
            friction, and deliver real-time traveler protection.
          </p>
          <div className="w-20 h-1 bg-teal-500 mx-auto rounded-full mt-5" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800/50 rounded-2xl md:p-10 p-6 md:shadow-sm md:border md:border-gray-100 md:dark:border-gray-700"
        >
          {/* Row 1: Full Name + Job Title */}
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Full Name<span className="text-red-500 ml-0.5">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="Enter Full Name"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Job Title<span className="text-red-500 ml-0.5">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                placeholder="Enter Your Job Title"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Row 2: Company + Business Email */}
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Company / Insurer Name<span className="text-red-500 ml-0.5">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                placeholder="Enter Company / Insurer Name"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Business Email Address<span className="text-red-500 ml-0.5">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.businessEmail}
                onChange={(e) => handleInputChange("businessEmail", e.target.value)}
                placeholder="Enter Business Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Row 3: Phone + Website */}
          <div className="grid md:grid-cols-2 gap-5 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Phone Number<span className="text-red-500 ml-0.5">*</span>
              </label>
              <div className="flex">
                <div className="flex items-center gap-1.5 px-3 py-3 rounded-l-lg bg-gray-50 dark:bg-gray-900 border border-r-0 border-gray-200 dark:border-gray-700">
                  <span className="text-lg leading-none">🇺🇸</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={(e) => {
                    handleInputChange("phoneNumber", e.target.value);
                    validatePhone(e.target.value);
                  }}
                  placeholder="Enter Phone Number"
                  className={`flex-1 px-4 py-3 rounded-r-lg bg-gray-50 dark:bg-gray-900 border text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                    phoneError
                      ? "border-red-400 focus:ring-red-400"
                      : "border-gray-200 dark:border-gray-700 focus:ring-teal-500"
                  }`}
                />
              </div>
              {phoneError && (
                <p className="mt-1.5 text-xs text-red-500">{phoneError}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Business Website{" "}
                <span className="text-gray-400 font-normal">(if any)</span>
              </label>
              <input
                type="url"
                value={formData.businessWebsite}
                onChange={(e) => handleInputChange("businessWebsite", e.target.value)}
                placeholder="Enter Business Website"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Integration Interests */}
          <div className="mb-8">
            <h3 className="text-center text-base font-semibold text-gray-900 dark:text-white mb-5">
              Integration Interests{" "}
              <span className="font-normal text-gray-500 dark:text-gray-400">
                (Select all that apply):
              </span>
            </h3>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 max-w-3xl mx-auto">
              {integrationInterestOptions.map((option) => (
                <label key={option} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.integrationInterests.includes(option)}
                    onChange={() => handleCheckboxToggle("integrationInterests", option)}
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-teal-600 focus:ring-2 focus:ring-teal-500 cursor-pointer accent-teal-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Row 4: Operating Regions + Traveler Volume */}
          <div className="grid md:grid-cols-2 gap-5 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Operating Regions<span className="text-red-500 ml-0.5">*</span>
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.operatingRegions}
                  onChange={(e) => handleInputChange("operatingRegions", e.target.value)}
                  className="w-full px-4 py-3 pr-10 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select Operating Regions
                  </option>
                  {operatingRegionOptions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Typical Traveler Volume per Month<span className="text-red-500 ml-0.5">*</span>
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.travelerVolume}
                  onChange={(e) => handleInputChange("travelerVolume", e.target.value)}
                  className="w-full px-4 py-3 pr-10 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                >
                  {travelerVolumeOptions.map((volume) => (
                    <option key={volume} value={volume}>
                      {volume}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Current Distribution Channels */}
          <div className="mb-8">
            <h3 className="text-center text-base font-semibold text-gray-900 dark:text-white mb-5">
              Current Distribution Channels{" "}
              <span className="font-normal text-gray-500 dark:text-gray-400">
                (Select all that apply):
              </span>
            </h3>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {distributionChannelOptions.map((channel) => (
                <label key={channel} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.distributionChannels.includes(channel)}
                    onChange={() => handleCheckboxToggle("distributionChannels", channel)}
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-teal-600 focus:ring-2 focus:ring-teal-500 cursor-pointer accent-teal-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {channel}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Business Objective / Note */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Business Objective / Note
            </label>
            <textarea
              rows={5}
              value={formData.businessObjective}
              onChange={(e) => handleInputChange("businessObjective", e.target.value)}
              placeholder="describe what you're aiming to achieve with eSIM integration..."
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Consent checkbox */}
          <div className="mb-7">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.agreed}
                onChange={(e) => handleInputChange("agreed", e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-gray-300 dark:border-gray-600 text-teal-600 focus:ring-2 focus:ring-teal-500 cursor-pointer accent-teal-600"
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                I agree to be contacted by Zoiko Orbit regarding integration opportunities.
              </span>
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-teal-500 hover:bg-teal-400 disabled:bg-teal-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg shadow-teal-500/30 hover:shadow-teal-400/40 transition-all duration-300 hover:-translate-y-0.5 disabled:hover:translate-y-0"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Submitting...
              </>
            ) : (
              <>
                Request Integration Demo
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </>
            )}
          </button>
        </form>
      </section>
    </main>
  );
}