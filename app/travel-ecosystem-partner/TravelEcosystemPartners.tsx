  "use client";

import Image from "next/image";
import { useState } from "react";

export default function TravelEcosystemPartners() {

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    work_email: "",
    company_name: "",
    website: "",
    country: "",
    role: "",
    monthly_volume: "",
    partnership_interest: "",
    message: "",
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setLoading(true);
  setSuccessMessage("");
  setErrorMessage("");

  try {

    const payload = {
      ...formData,
      website: formData.website.trim()
        ? formData.website
        : null,
    };

    const response = await fetch(
      "http://127.0.0.1:8000/api/partner-leads/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setSuccessMessage("Form submitted successfully!");

      setFormData({
        first_name: "",
        last_name: "",
        work_email: "",
        company_name: "",
        website: "",
        country: "",
        role: "",
        monthly_volume: "",
        partnership_interest: "",
        message: "",
        consent: false,
      });
    } else {
      console.log(data);
      setErrorMessage(JSON.stringify(data));
    }

  } catch (error) {
    console.log(error);
    setErrorMessage("Server error.");
  }

  setLoading(false);
};
  return (
    
      <div className="w-full font-sans dark:bg-gray-900 dark:text-white">
        {/* ================= HERO ================= */}
        <section className="relative h-[75vh] min-h-[500px]">
          <Image
            src="/image/Rectangle 4d.png"
            alt="Partners hero"
            fill
            className="object-cover object-center"
            priority
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

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
                  Seamless eSIM solutions for travel agencies, OTAs,
                  tour operators, and distributors.
                </p>

                <a
                  href="#"
                  className="inline-block rounded-md bg-teal-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
                >
                  Become a Partner
                </a>
              </div>
            </div>
          </div>
        </section>

      {/* ================= WHY PARTNER WITH US ================= */}
  <section className="relative overflow-hidden bg-white py-20  dark:bg-gray-900 dark:text-white">
    {/* Background Grid */}
    <div className="absolute inset-0 opacity-40  dark:bg-gray-900 dark:text-white">
      <div className="h-full w-full   " />
    </div>

    <div className="relative mx-auto max-w-7xl px-6 md:px-12">
      {/* Heading */}
      <div className="mb-14 text-center">
        <h2 className="mb-3 text-3xl font-bold tracking-tight  dark:bg-gray-900 dark:text-white text-zinc-900 md:text-4xl">
          Why Partner with Us
        </h2>

        <p className="mx-auto max-w-2xl text-sm leading-relaxed  dark:bg-gray-900 dark:text-white text-gray-500 md:text-base">
          Unlock new revenue and delight travelers with
          ready-to-activate global data.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-10">
        
        {/* Card 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-5 h-20 w-20">
            <Image
              src="/image/Group 1597883234.png"
              alt="Attractive Commissions"
              fill
              className="object-contain"
            />
          </div>

          <h3  className="  dark:bg-gray-900 dark:text-white mb-2 text-sm font-bold leading-snug text-zinc-900 md:text-base">
            Attractive Commissions
          </h3>

          <p className="  dark:bg-gray-900 dark:text-white max-w-[180px] text-xs leading-relaxed text-gray-500 md:text-sm">
            Earn competitive margins on every traveler you
            activate—recurring revenue options available.
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-5 h-20 w-20">
            <Image
              src="/image/Group 1597883235.png"
              alt="Tier-1 Global Data"
              fill
              className="object-contain"
            />
          </div>

          <h3 className="mb-2 text-sm font-bold leading-snug  dark:bg-gray-900 dark:text-white text-zinc-900 md:text-base">
            Tier-1 Global Data
          </h3>

          <p className="max-w-[180px] text-xs leading-relaxed  dark:bg-gray-900 dark:text-white text-gray-500 md:text-sm">
            Backed by top carrier networks across 190+ countries
            for dependable, high-speed coverage.
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-5 h-20 w-20">
            <Image
              src="/image/Group 1597883236.png"
              alt="White-Label & Co-Brand Ready"
              fill
              className="object-contain"
            />
          </div>

          <h3 className="mb-2 text-sm font-bold leading-snug  dark:bg-gray-900 dark:text-white text-zinc-900 md:text-base">
            White-Label &amp; Co-Brand Ready
          </h3>
  
          <p className="max-w-[200px] text-xs leading-relaxed  dark:bg-gray-900 dark:text-white text-gray-500 md:text-sm">
            Offer eSIM in your brand: customizable storefronts,
            bundles, email templates, and upsell flows.
          </p>
        </div>

        {/* Card 4 */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-5 h-20 w-20">
            <Image
              src="/image/Group 1597883237.png"
              alt="Fast Onboarding & Support"
              fill
              className="object-contain"
            />
          </div>

          <h3 className="mb-2 text-sm font-bold leading-snug  dark:bg-gray-900 dark:text-white text-zinc-900 md:text-base">
            Fast Onboarding &amp; Support
          </h3>

          <p className="max-w-[190px] text-xs leading-relaxed  dark:bg-gray-900 dark:text-white text-gray-500 md:text-sm">
            API plug-and-play, guided setup, partner enablement kits,
            dedicated success team.
          </p>
        </div>
      </div>
    </div>
  </section>

        {/* ================= BUILT TO FIT YOUR WORKFLOW ================= */}
        <section className="bg-gray-50 py-20  dark:bg-gray-900 dark:text-white">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <div className="mb-14 text-center">
              <h2 className="mb-3 text-3xl font-bold  dark:bg-gray-900 dark:text-white text-zinc-900 md:text-4xl">
                Built to Fit Your Workflow
              </h2>

              <p className="text-base text-gray-500  dark:bg-gray-900 dark:text-white">
                From lightweight referral links to deep API integrations—
                scale at your pace.
              </p>
            </div>

            <div className="grid items-center gap-12 md:grid-cols-2">
              {/* Left Illustration */}
              <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl  dark:bg-gray-900 dark:text-white bg-teal-50">
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
                  <h3 className="mb-3 text-lg font-bold  dark:bg-gray-900 dark:text-white text-zinc-900">
                    API: Plug &amp; Play
                  </h3>

                  <ul className="space-y-2 text-sm  dark:bg-gray-900 dark:text-white text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-teal-600">•</span>
                      REST/GraphQL endpoints for offer retrieval,
                      activation, balance, status.
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

                <hr className="border-gray-200" />

                <div>
                  <h3 className="mb-3 text-lg font-bold  dark:bg-gray-900 dark:text-white text-zinc-900">
                    Co-Branded Storefronts &amp; Portals
                  </h3>

                  <ul className="space-y-2 text-sm  dark:bg-gray-900 dark:text-white text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-teal-600">•</span>
                      Ready-to-launch hosted storefront branded with your
                      logo/colors.
                    </li>

                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-teal-600">•</span>
                      Bundle eSIM into booking confirmations &amp;
                      post-booking emails.
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


        {/* ================= TRUSTED BY LEADING BRANDS ================= */}
  <section className="bg-white py-20  dark:bg-gray-900 dark:text-white">
    <div className="mx-auto max-w-7xl px-6 md:px-12">
      
      {/* Heading */}
      <div className="mb-16 text-center">
        <h2 className="mb-3 text-3xl font-bold tracking-tight  dark:bg-gray-900 dark:text-white text-zinc-900 md:text-4xl">
          Trusted by Leading Travel &amp; Mobility Brands.
        </h2>

        <p className="mx-auto max-w-4xl text-sm leading-relaxed  dark:bg-gray-900 dark:text-white text-gray-500 md:text-base">
          See how agencies, OTAs, and loyalty programs increase ancillary
          revenue and traveler satisfaction with Zoiko Orbit™.
        </p>
      </div>

      {/* ================= CASE STUDY 1 ================= */}
      <div className="mb-24 grid items-center gap-14 md:grid-cols-2">
        
        {/* Left Image */}
        <div className="flex justify-center md:justify-start">
          <div className="relative h-[340px] w-full max-w-[520px] overflow-hidden">
            <Image
              src="/image/Vector (2).png"
              alt="Airline Case Study"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Right Content */}
        <div>
          <h3 className="mb-4 text-xl font-bold leading-snug  dark:bg-gray-900 dark:text-white text-zinc-900">
            Boosting Ancillary Revenue for a Major Airline
          </h3>

          <p className="text-sm leading-relaxed  dark:bg-gray-900 dark:text-white text-gray-600 md:text-[15px]">
            A prominent global airline was seeking innovative ways to
            enhance its passenger experience while simultaneously driving
            new ancillary revenue streams. By integrating Zoiko Orbit's
            eSIM solutions directly into their booking and check-in flows,
            they provided travelers with instant, seamless mobile
            connectivity from the moment they booked their flight.
          </p>

          <p className="mt-4 text-sm leading-relaxed  dark:bg-gray-900 dark:text-white text-gray-600 md:text-[15px]">
            This not only improved customer satisfaction by eliminating
            the hassle of sourcing local SIMs but also created a
            significant new revenue channel for the airline, showcasing
            the power of integrated travel solutions.
          </p>
        </div>
      </div>

      {/* ================= CASE STUDY 2 ================= */}
      <div className="grid items-center gap-14 md:grid-cols-2">
        
        {/* Left Content */}
        <div className="order-2 md:order-1">
          <h3 className="mb-4 text-xl font-bold leading-snug  dark:bg-gray-900 dark:text-white text-zinc-900">
            Elevating Customer Loyalty for a Global Hotel Group
          </h3>

          <p className="text-sm leading-relaxed text-gray-600   dark:bg-gray-900 dark:text-white md:text-[15px]">
            A leading international hotel group aimed to deepen its
            relationship with guests and boost loyalty program engagement.
            By partnering with Zoiko Orbit, they offered exclusive,
            discounted eSIM plans to their loyalty members, providing
            unparalleled global connectivity as a premium perk.
          </p>

          <p className="mt-4 text-sm leading-relaxed  dark:bg-gray-900 dark:text-white text-gray-600 md:text-[15px]">
            This initiative differentiated their loyalty program, added
            tangible value for their most frequent travelers, and
            reinforced the hotel group's commitment to a truly connected
            and compassionate travel experience, leading to increased
            member satisfaction and repeat bookings.
          </p>
        </div>

        {/* Right Image */}
        <div className="order-1 flex justify-center md:order-2 md:justify-end">
          <div className="relative h-[340px] w-full max-w-[520px] overflow-hidden">
            <Image
              src="/image/Vector (3).png"
              alt="Hotel Case Study"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* ================= WHAT SETS US APART ================= */}
  <section className="py-20 bg-white text-center  dark:text-white dark:bg-gray-900">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-3xl font-bold mb-12  dark:text-white dark:bg-gray-900 text-gray-900">
        What Sets Us Apart
      </h2>

      <div className="grid md:grid-cols-3 gap-10">

        {/* CARD 1 */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 mb-4">
            <Image src="/image/icon1.png" width={64} height={64} alt="icon" />
          </div>
          <h3 className="font-semibold text-lg mb-2 dark:text-teal-400 text-teal-700">
            Engineered for Global Trust
          </h3>
          <p className="text-gray-600 text-sm max-w-xs  dark:text-white dark:bg-gray-900">
            Secure connectivity across 200+ countries with high reliability.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 mb-4">
            <Image src="/image/icon2.png" width={64} height={64} alt="icon" />
          </div>
          <h3 className="font-semibold text-lg mb-2 dark:text-teal-400 text-teal-700">
            Built to Give Back
          </h3>
          <p className="text-gray-600 text-sm max-w-xs  dark:text-white dark:bg-gray-900">
            Every purchase supports environmental and wildlife protection.
          </p>
        </div>

        {/* CARD 3 */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 mb-4">
            <Image src="/image/icon3.png" width={64} height={64} alt="icon" />
          </div>
          <h3 className="font-semibold text-lg mb-2 dark:text-teal-400 text-teal-700">
            Part of the Zoiko Promise
          </h3>
          <p className="text-gray-600 text-sm max-w-xs  dark:text-white dark:bg-gray-900">
            Innovation-driven solutions for smarter global travel.
          </p>
        </div>

      </div>
    </div>
  </section>



 {/* ================= CTA / CONTACT FORM ================= */}
<section className="relative overflow-hidden bg-[#f7f7f7] pt-0 dark:bg-gray-950 dark:text-white">
  
  {/* Top Banner Image */}
  <div className="relative h-[280px] w-full md:h-[340px]">
    <Image
      src="/image/Rectangle 19 (1).png"
      alt="Connectivity Program"
      fill
      priority
      className="object-cover"
    />
  </div>

  {/* Content Wrapper */}
  <div className="relative mx-auto -mt-20 max-w-7xl px-6 pb-20 md:px-12">
    
    <div className="grid gap-10 md:grid-cols-2 md:items-start">
      
      {/* LEFT SIDE IMAGE */}
      <div className="relative hidden min-h-[520px] md:flex items-center justify-center">
        <div className="relative h-[600px] w-full opacity-100 dark:opacity-80">
          <Image
            src="/image/map.png"
            alt="World Map"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* RIGHT FORM CARD */}
      <div className="relative z-10 rounded-2xl bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.12)] dark:bg-gray-900 dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] dark:ring-1 dark:ring-gray-800 md:p-10">
        
        {/* Heading */}
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Let's Build Your Connectivity Program
          </h2>

          <p className="max-w-lg text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            Tell us a bit about your organization and we'll tailor the
            right partnership path.
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Row 1 */}
          <div className="grid gap-4 md:grid-cols-2">
            
            {/* First Name */}
            <div>
              <label className="mb-1 block text-[11px] font-medium text-gray-500 dark:text-gray-300">
                First Name*
              </label>

              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Enter First Name"
                required
                className="h-11 w-full rounded-md border border-gray-200 bg-[#f5f5f5] px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-teal-400 dark:focus:bg-gray-800"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="mb-1 block text-[11px] font-medium text-gray-500 dark:text-gray-300">
                Last Name*
              </label>

              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Enter Last Name"
                required
                className="h-11 w-full rounded-md border border-gray-200 bg-[#f5f5f5] px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-teal-400 dark:focus:bg-gray-800"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid gap-4 md:grid-cols-2">

            {/* Work Email */}
            <div>
              <label className="mb-1 block text-[11px] font-medium text-gray-500 dark:text-gray-300">
                Work Email*
              </label>

              <input
                type="email"
                name="work_email"
                value={formData.work_email}
                onChange={handleChange}
                placeholder="Enter Work Email"
                required
                className="h-11 w-full rounded-md border border-gray-200 bg-[#f5f5f5] px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-teal-400 dark:focus:bg-gray-800"
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="mb-1 block text-[11px] font-medium text-gray-500 dark:text-gray-300">
                Company / Organization*
              </label>

              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="Enter Company/Organization Name"
                required
                className="h-11 w-full rounded-md border border-gray-200 bg-[#f5f5f5] px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-teal-400 dark:focus:bg-gray-800"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid gap-4 md:grid-cols-2">

            {/* Website */}
            <div>
              <label className="mb-1 block text-[11px] font-medium text-gray-500 dark:text-gray-300">
                Website (if any)
              </label>

              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="Enter Website URL"
                className="h-11 w-full rounded-md border border-gray-200 bg-[#f5f5f5] px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-teal-400 dark:focus:bg-gray-800"
              />
            </div>

            {/* Country */}
            <div>
              <label className="mb-1 block text-[11px] font-medium text-gray-500 dark:text-gray-300">
                Country / Region*
              </label>

              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="h-11 w-full rounded-md border border-gray-200 bg-[#f5f5f5] px-4 text-sm text-gray-500 outline-none transition focus:border-teal-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-teal-400 dark:focus:bg-gray-800 dark:[&>option]:bg-gray-800 dark:[&>option]:text-white"
              >
                <option value="">Select Country</option>
                
  <option>Afghanistan</option>
  <option>Albania</option>
  <option>Algeria</option>
  <option>Andorra</option>
  <option>Angola</option>
  <option>Antigua and Barbuda</option>
  <option>Argentina</option>
  <option>Armenia</option>
  <option>Australia</option>
  <option>Austria</option>
  <option>Azerbaijan</option>

  <option>Bahamas</option>
  <option>Bahrain</option>
  <option>Bangladesh</option>
  <option>Barbados</option>
  <option>Belarus</option>
  <option>Belgium</option>
  <option>Belize</option>
  <option>Benin</option>
  <option>Bhutan</option>
  <option>Bolivia</option>
  <option>Bosnia and Herzegovina</option>
  <option>Botswana</option>
  <option>Brazil</option>
  <option>Brunei</option>
  <option>Bulgaria</option>
  <option>Burkina Faso</option>
  <option>Burundi</option>

  <option>Cabo Verde</option>
  <option>Cambodia</option>
  <option>Cameroon</option>
  <option>Canada</option>
  <option>Central African Republic</option>
  <option>Chad</option>
  <option>Chile</option>
  <option>China</option>
  <option>Colombia</option>
  <option>Comoros</option>
  <option>Congo</option>
  <option>Costa Rica</option>
  <option>Croatia</option>
  <option>Cuba</option>
  <option>Cyprus</option>
  <option>Czech Republic</option>

  <option>Denmark</option>
  <option>Djibouti</option>
  <option>Dominica</option>
  <option>Dominican Republic</option>

  <option>Ecuador</option>
  <option>Egypt</option>
  <option>El Salvador</option>
  <option>Equatorial Guinea</option>
  <option>Eritrea</option>
  <option>Estonia</option>
  <option>Eswatini</option>
  <option>Ethiopia</option>

  <option>Fiji</option>
  <option>Finland</option>
  <option>France</option>

  <option>Gabon</option>
  <option>Gambia</option>
  <option>Georgia</option>
  <option>Germany</option>
  <option>Ghana</option>
  <option>Greece</option>
  <option>Grenada</option>
  <option>Guatemala</option>
  <option>Guinea</option>
  <option>Guinea-Bissau</option>
  <option>Guyana</option>

  <option>Haiti</option>
  <option>Honduras</option>
  <option>Hungary</option>

  <option>Iceland</option>
  <option>India</option>
  <option>Indonesia</option>
  <option>Iran</option>
  <option>Iraq</option>
  <option>Ireland</option>
  <option>Israel</option>
  <option>Italy</option>

  <option>Jamaica</option>
  <option>Japan</option>
  <option>Jordan</option>

  <option>Kazakhstan</option>
  <option>Kenya</option>
  <option>Kiribati</option>
  <option>Kuwait</option>
  <option>Kyrgyzstan</option>

  <option>Laos</option>
  <option>Latvia</option>
  <option>Lebanon</option>
  <option>Lesotho</option>
  <option>Liberia</option>
  <option>Libya</option>
  <option>Liechtenstein</option>
  <option>Lithuania</option>
  <option>Luxembourg</option>

  <option>Madagascar</option>
  <option>Malawi</option>
  <option>Malaysia</option>
  <option>Maldives</option>
  <option>Mali</option>
  <option>Malta</option>
  <option>Marshall Islands</option>
  <option>Mauritania</option>
  <option>Mauritius</option>
  <option>Mexico</option>
  <option>Micronesia</option>
  <option>Moldova</option>
  <option>Monaco</option>
  <option>Mongolia</option>
  <option>Montenegro</option>
  <option>Morocco</option>
  <option>Mozambique</option>
  <option>Myanmar</option>

  <option>Namibia</option>
  <option>Nauru</option>
  <option>Nepal</option>
  <option>Netherlands</option>
  <option>New Zealand</option>
  <option>Nicaragua</option>
  <option>Niger</option>
  <option>Nigeria</option>
  <option>North Korea</option>
  <option>North Macedonia</option>
  <option>Norway</option>

  <option>Oman</option>

  <option>Pakistan</option>
  <option>Palau</option>
  <option>Panama</option>
  <option>Papua New Guinea</option>
  <option>Paraguay</option>
  <option>Peru</option>
  <option>Philippines</option>
  <option>Poland</option>
  <option>Portugal</option>

  <option>Qatar</option>

  <option>Romania</option>
  <option>Russia</option>
  <option>Rwanda</option>

  <option>Saint Kitts and Nevis</option>
  <option>Saint Lucia</option>
  <option>Saint Vincent and the Grenadines</option>
  <option>Samoa</option>
  <option>San Marino</option>
  <option>Sao Tome and Principe</option>
  <option>Saudi Arabia</option>
  <option>Senegal</option>
  <option>Serbia</option>
  <option>Seychelles</option>
  <option>Sierra Leone</option>
  <option>Singapore</option>
  <option>Slovakia</option>
  <option>Slovenia</option>
  <option>Solomon Islands</option>
  <option>Somalia</option>
  <option>South Africa</option>
  <option>South Korea</option>
  <option>South Sudan</option>
  <option>Spain</option>
  <option>Sri Lanka</option>
  <option>Sudan</option>
  <option>Suriname</option>
  <option>Sweden</option>
  <option>Switzerland</option>
  <option>Syria</option>

  <option>Taiwan</option>
  <option>Tajikistan</option>
  <option>Tanzania</option>
  <option>Thailand</option>
  <option>Timor-Leste</option>
  <option>Togo</option>
  <option>Tonga</option>
  <option>Trinidad and Tobago</option>
  <option>Tunisia</option>
  <option>Turkey</option>
  <option>Turkmenistan</option>
  <option>Tuvalu</option>

  <option>Uganda</option>
  <option>Ukraine</option>
  <option>United Arab Emirates</option>
  <option>United Kingdom</option>
  <option>United States</option>
  <option>Uruguay</option>
  <option>Uzbekistan</option>

  <option>Vanuatu</option>
  <option>Vatican City</option>
  <option>Venezuela</option>
  <option>Vietnam</option>

  <option>Yemen</option>

  <option>Zambia</option>
  <option>Zimbabwe</option>
              </select>
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid gap-4 md:grid-cols-2">

            {/* Role */}
            <div>
              <label className="mb-1 block text-[11px] font-medium text-gray-500 dark:text-gray-300">
                Role/Function*
              </label>

              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Travel Agency Owner, OTA Product..."
                required
                className="h-11 w-full rounded-md border border-gray-200 bg-[#f5f5f5] px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-teal-400 dark:focus:bg-gray-800"
              />
            </div>

            {/* Monthly Volume */}
            <div>
              <label className="mb-1 block text-[11px] font-medium text-gray-500 dark:text-gray-300">
                Monthly Traveler Volume Estimate*
              </label>

              <select
                name="monthly_volume"
                value={formData.monthly_volume}
                onChange={handleChange}
                required
                className="h-11 w-full rounded-md border border-gray-200 bg-[#f5f5f5] px-4 text-sm text-gray-500 outline-none transition focus:border-teal-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-teal-400 dark:focus:bg-gray-800 dark:[&>option]:bg-gray-800 dark:[&>option]:text-white"
              >
                <option value="">Select Volume</option>
                <option>0-1K</option>
                <option>1K-10K</option>
                <option>10K-50K</option>
                <option>50K-100K</option>
                <option>100K-200K</option>
              </select>
            </div>
          </div>

          {/* Partnership Interest */}
          <div>
            <label className="mb-1 block text-[11px] font-medium text-gray-500 dark:text-gray-300">
              Partnership Interest*
            </label>

            <input
              type="text"
              name="partnership_interest"
              value={formData.partnership_interest}
              onChange={handleChange}
              placeholder="Reseller, API Integration, White-Label Storefront..."
              required
              className="h-11 w-full rounded-md border border-gray-200 bg-[#f5f5f5] px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-teal-400 dark:focus:bg-gray-800"
            />
          </div>

          {/* Message */}
          <div>
            <textarea
              rows={5}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message..."
              className="w-full resize-none rounded-md border border-gray-200 bg-[#f5f5f5] px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-teal-400 dark:focus:bg-gray-800"
            />
          </div>

          {/* Consent */}
          <div className="flex items-start gap-2">
            <input
              id="consent"
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="mt-1 accent-teal-600 dark:accent-teal-400"
            />

            <label
              htmlFor="consent"
              className="text-xs leading-relaxed text-gray-500 dark:text-gray-400"
            >
              I agree to be contacted by Zoiko Orbit regarding partner
              opportunities.
            </label>
          </div>

          {/* Success Message */}
          {successMessage && (
            <p className="text-sm font-medium text-green-600 dark:text-green-400">
              {successMessage}
            </p>
          )}

          {/* Error Message */}
          {errorMessage && (
            <p className="text-sm font-medium text-red-600 dark:text-red-400">
              {errorMessage}
            </p>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-[#007C91] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#00697b] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-teal-500 dark:hover:bg-teal-400"
            >
              {loading
                ? "Submitting..."
                : "Submit & Schedule a Consultation"}
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>

  {/* Bottom Border */}
  <div className="h-[4px] w-full bg-[#007C91] dark:bg-teal-500" />
</section>

      </div>
    );
  }