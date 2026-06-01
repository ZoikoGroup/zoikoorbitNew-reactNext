"use client"
import {useState} from 'react'
import Image from 'next/image'
import toast from "react-hot-toast";

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
    description:
      "Pre-trip provisioning, data pools, expense integration.",
    link: "#",
  },
  {
    id: 2,
    image: "/image/plan-icon2.jpg",
    title: "Remote Worker Data",
    description:
      "Always-on connectivity for distributed teams.",
    link: "#",
  },
  {
    id: 3,
    image: "/image/plan-icon3.webp",
    title: "Bespoke Global Programs",
    description:
      "Tailored plans for industries like energy, consulting, etc.",
    link: "#",
  },
];



export default function BusinessesEnterprises() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
  full_name: "",
  company_name: "",
  business_email: "",
  role: "",
  website: "",
  phone_number: "",
  enquiry_type: "",
  message: "",
  consent: false,
});

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {

  e.preventDefault();
  setLoading(true);

  try {

    const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/business-enterprise/enterprise-inquiry/`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (response.ok) {

      toast.success("Inquiry submitted successfully");

      console.log(data);

      setFormData({
        full_name: "",
        company_name: "",
        business_email: "",
        role: "",
        website: "",
        phone_number: "",
        enquiry_type: "",
        message: "",
        consent: false,
      });

    } else {

      // console.error(data);
      console.log("Backend error:", data);

      toast.error("Something went wrong");
    }

  } catch (error) {

    console.error(error);

    toast.error("Server error");
  }
  setLoading(false);
};

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

    return (
        <>
            {/*  HERO section */}
            <section className="relative h-[75vh] min-h-[500px]">
                <Image
                    src="/image/BE-hero.webp"
                    alt="Businesses-Enterprises hero"
                    fill
                    className="object-cover object-center"
                    priority
                />

                {/* Dark overlay */}
                {/* <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" /> */}

                {/* Hero Content */}
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

    {/* HEADING */}
    <div className="text-center">
        <h2
        className="
          text-3xl
          font-bold
          leading-tight
          text-[#1E293B]
          dark:text-white
          sm:text-4xl
          lg:text-[52px]
        ">
        Why Enterprises Choose Zoiko Orbit™
        </h2>
        <p
         className="
          mx-auto
          mt-4
          max-w-2xl
          text-base
          text-[#334155]
          dark:text-slate-300
          sm:text-lg
        ">
             Why thousands of travelers trust us every day
         </p>
     </div>

                    {/* CARD CONTAINER */}
                    <div
                        className="
        mt-12
        overflow-hidden
        rounded-[24px]
        bg-white
        dark:bg-[#1E293B]
        shadow-sm
        dark:shadow-none
        dark:ring-1
        dark:ring-white/10
      "
                    >

        <div
        className="
          grid
          grid-cols-1
          divide-y
          divide-gray-300
          dark:divide-white/10
          md:grid-cols-2
          md:divide-y-0
          lg:grid-cols-3
          lg:divide-x
          lg:dark:divide-x
        ">

        {enterpriseFeatures.map((item) => (

        <div key={item.id}
            className="
              flex
              flex-col
              p-8
              sm:p-10
              lg:p-12
            ">

            {/* ICON */}
            <div
                className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-[#007C91]
                dark:bg-[#0891A6]
              ">

        <div className="relative h-20 w-20">

         <Image
            src={item.icon}
            alt={item.title}
            fill
            className="object-contain"
         />
        </div>
        </div>

        {/* CONTENT */}
        <div className="mt-6">
         <h3
         className="
          text-xl
          font-bold
          text-[#1E293B]
          dark:text-white">
          {item.title}
        </h3>
    <p
        className="
            mt-4
            text-[15px]
            leading-8
            text-[#475569]
            dark:text-slate-300">
             {item.description}
             </p>
        </div>
    </div>
    ))}
            </div>
        </div>
    </div>
            </section>

          {/* Solutions Built for Your Business. */}
          <section className="relative overflow-hidden bg-white dark:bg-[#0F172A] py-4 sm:py-8 lg:py-24">

  {/* BACKGROUND GRID */}
  <div
    className="
      absolute
      inset-0
      opacity-60
      dark:opacity-40
      pointer-events-none
      bg-[linear-gradient(to_right,#dbe4ec_1px,transparent_1px),linear-gradient(to_bottom,#dbe4ec_1px,transparent_1px)]
      dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]
      bg-[size:72px_72px]
    "
  />

  <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

    {/* HEADING */}
    <div className="text-center">

      <h2
        className="
          text-3xl
          font-bold
          leading-tight
          text-[#1E293B]
          dark:text-white
          sm:text-4xl
          lg:text-[52px]
        "
      >
        Solutions Built for Your Business.
      </h2>

      <p
        className="
          mx-auto
          mt-4
          max-w-3xl
          text-base
          text-[#475569]
          dark:text-slate-300
          sm:text-lg
        "
      >
        Scale from a few travelers to global workforce coverage—mix & match
        programs
      </p>
    </div>

    {/* CARDS */}
    <div
      className="
        mt-14
        grid
        grid-cols-1
        gap-10
        sm:grid-cols-2
        lg:grid-cols-3
      "
    >

      {businessSolutions.map((item) => (

        <div
          key={item.id}
          className="
            group
            flex
            flex-col
          "
        >

          {/* IMAGE */}
          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              dark:ring-1
              dark:ring-white/10
            "
          >

            <div
              className="
                relative
                h-[240px]
                w-full
                sm:h-[260px]
              "
            >

              <Image
                src={item.image}
                alt={item.title}
                fill
                className="
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-105
                "
              />
            </div>
          </div>

          {/* CONTENT */}
          <div className="mt-6">

            <h3
              className="
                text-xl
                md:text-2xl
                font-bold
                text-[#1E293B]
                dark:text-white
              "
            >
              {item.title}
            </h3>

            <p
              className="
                mt-3
                text-sm
                md:text-base
                leading-7
                text-[#475569]
                dark:text-slate-300
              "
            >
              {item.description}
            </p>

            {/* LINK */}
            <a
              href="/plans"
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                text-[16px]
                font-medium
                text-[#007C91]
                dark:text-[#22D3EE]
                transition-all
                duration-300
                hover:gap-3
              "
            >
              Learn More
              <span>→</span>
            </a>

          </div>
        </div>
      ))}

    </div>
  </div>
            </section>

            {/* Seamless Integration with Your Existing Systems */}
             <section className="bg-[#e3eff8] py-8  dark:bg-gray-900 dark:text-white">
                <div className="mx-auto max-w-7xl px-6 md:px-12">
                  {/* <div className="mb-14 text-center">
                    <h2 className="mb-3 text-3xl font-bold  dark:bg-gray-900 dark:text-white text-zinc-900 md:text-4xl">
                      Built to Fit Your Workflow
                    </h2>
        
                    <p className="text-base text-gray-500  dark:bg-gray-900 dark:text-white">
                      From lightweight referral links to deep API integrations—
                      scale at your pace.
                    </p>
                  </div> */}
        
                  <div className="grid items-center gap-12 md:grid-cols-2">
                    {/* Left Illustration */}
                    <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl  dark:bg-gray-900 dark:text-white bg-teal-50">
                      <Image
                        src="/image/seamless-integration.webp"
                        alt="Seamless Integration"
                        width={580}
                        height={380}
                        className="w-full object-contain"
                      />
                    </div>
        
                    {/* Right Content */}
                    <div className="space-y-8">
                      <div className="mb-5 text-left">
                    <h2 className="mb-3 text-3xl font-bold  dark:bg-gray-900 dark:text-white text-zinc-900 md:text-4xl">
                      Seamless Integration with Your Existing Systems
                    </h2>
        
                    <p className="text-sm md:text-base text-gray-500  dark:bg-gray-900 dark:text-white">
                      Zoiko Orbit APIs and connectors easily integrate with ERP, travel management, and reporting tools..
                    </p>
                  </div>
                      <div>
                        <h3 className="mb-3 text-lg md:text-xl font-bold  dark:bg-gray-900 dark:text-white text-zinc-900">
                          API: Plug &amp; Play
                        </h3>
        
                        <ul className="space-y-2 text-base md:text-lg  dark:bg-gray-900 dark:text-white text-gray-600">
                          <li className="flex items-start gap-2">
                            <span className="mt-0.5 text-teal-600">•</span>
                            REST API with real-time activation and reporting.
                          </li>
        
                          <li className="flex items-start gap-2">
                            <span className="mt-0.5 text-teal-600">•</span>
                            SSO & secure admin portals.
                          </li>
        
                          <li className="flex items-start gap-2">
                            <span className="mt-0.5 text-teal-600">•</span>
                            Multi-currency billing and cost center mapping.
                          </li>
                        </ul>
                      </div>
        
                      <hr className="border-gray-200" />
                    </div>
                  </div>
                </div>
              </section>

             {/* CTA / CONTACT FORM */}
              <section className="relative overflow-hidden bg-[#f5f5f5] dark:bg-gray-900">
             
                     {/* HERO IMAGE */}
                     <div className="relative h-[260px] sm:h-[320px] md:h-[580px] w-full">
                       <Image
                         src="/image/speak-to-our-enterprises.png"
                         alt="Connectivity Program"
                         fill
                         priority
                         className="object-cover object-center"
                       />
                     </div>
             
                     {/* MAIN CONTENT */}
                     <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
             
                       <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-2 gap-10">
             
                         {/* LEFT WORLD MAP */}
                         <div className="hidden lg:flex items-center justify-center min-h-[400px] pt-32">
             
                           <div className="relative h-[320px] w-full max-w-[400px] opacity-90">
                             <Image
                               src="/image/map.png"
                               alt="World Map"
                               fill
                               className="object-contain"
                             />
                           </div>
             
                         </div>
             
                         {/* FORM CARD */}
                         <div
                           className="
                       relative
                       -mt-26
                       sm:-mt-30
                       lg:-mt-102
                       lg:ml-auto
                       w-full
                       max-w-2xl
                       rounded-[24px]
                       border
                       border-gray-200
                       bg-white
                       p-5
                       sm:p-8
                       shadow-[0_10px_40px_rgba(0,0,0,0.12)]
                       dark:border-gray-700
                       dark:bg-gray-900
                     "
                         >
             
                           {/* HEADING */}
                           <div className="mb-6">
                             <h2 className="text-[24px] sm:text-[30px] font-bold leading-tight text-[#1A1A1A] dark:text-white">
                               Speak to Our Enterprise Team
                             </h2>
             
                             <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-500 dark:text-gray-300">
                               Our specialists will respond within 24 hours to discuss tailored solutions for your business.
                             </p>
                           </div>
             
                           {/* FORM */}
                           <form onSubmit={handleSubmit} className="space-y-5">
             
                             {/* ROW 1 */}
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             
                               <div>
                                 <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                                   Full Name
                                 </label>
             
                                 <input
                                   type="text"
                                   placeholder="Enter Your Full Name"
                                   name="full_name"
                                   value={formData.full_name}
                                   onChange={handleChange}
                                   className="h-11 w-full rounded-md border border-gray-300 bg-[#f3f3f3] px-4 text-sm outline-none transition focus:border-[#007C91] focus:bg-white dark:border-gray-700 dark:bg-[#1f2937] dark:focus:bg-[#1f2937] dark:text-white"
                                 />
                               </div>
             
                               <div>
                                 <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                                   Company / Organization
                                 </label>
             
                                 <input
                                   type="text"
                                   placeholder="Enter Your Company Name"
                                   name="company_name"
                                   value={formData.company_name}
                                   onChange={handleChange}
                                   className="h-11 w-full rounded-md border border-gray-300 bg-[#f3f3f3] px-4 text-sm outline-none transition focus:border-[#007C91] focus:bg-white dark:border-gray-700 dark:bg-[#1f2937] dark:focus:bg-[#1f2937] dark:text-white"
                                 />
                               </div>
             
                             </div>
             
                             {/* ROW 2 */}
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             
                               <div>
                                 <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                                   Business Email
                                 </label>
             
                                 <input
                                   type="email"
                                   placeholder="Enter Business Email"
                                   name="business_email"
                                   value={formData.business_email}
                                   onChange={handleChange}
                                   className="h-11 w-full rounded-md border border-gray-300 bg-[#f3f3f3] px-4 text-sm outline-none transition focus:border-[#007C91] focus:bg-white dark:border-gray-700 dark:bg-[#1f2937] dark:focus:bg-[#1f2937] dark:text-white"
                                 />
                               </div>
                               <div>
                                 <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                                   Role
                                 </label>
             
                                 <select
                                   name="role"
                                   value={formData.role}
                                   onChange={handleChange}
                                   className="h-11 w-full rounded-md border border-gray-300 bg-[#f3f3f3] px-4 text-sm outline-none transition focus:border-[#007C91] focus:bg-white dark:border-gray-700 dark:bg-[#1f2937] dark:focus:bg-[#1f2937] dark:text-white"
                                 >
                                   <option value="">Select Your Role</option>
                                   <option value="Owner">Owner</option>
                                   <option value="Manager">Manager</option>
                                   <option value="Agent">Agent</option>
                                   <option value="Other">Other</option>
                                 </select>
                               </div>
             
                              
             
                             </div>
             
                             {/* ROW 3 */}
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             
                               <div>
                                 <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                                   Website (if any)
                                 </label>
             
                                 <input
                                   type="text"
                                   placeholder="Enter Website URL"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                   className="h-11 w-full rounded-md border border-gray-300 bg-[#f3f3f3] px-4 text-sm outline-none transition focus:border-[#007C91] focus:bg-white dark:border-gray-700 dark:bg-[#1f2937] dark:focus:bg-[#1f2937] dark:text-white"
                                 />
                               </div>
                                <div>
                                 <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                                   Phone (Intl friendly)
                                 </label>
             
                                 <input
                                   type="text"
                                   placeholder="Enter Phone Number"
                                    name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                   className="h-11 w-full rounded-md border border-gray-300 bg-[#f3f3f3] px-4 text-sm outline-none transition focus:border-[#007C91] focus:bg-white dark:border-gray-700 dark:bg-[#1f2937] dark:focus:bg-[#1f2937] dark:text-white"
                                 />
                               </div>
                             </div>
             
                             {/* PARTNERSHIP */}
                             <div>
                                 <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                                   Type of Enquiry
                                 </label>
             
                                 <select
                                   name="enquiry_type"
                                   value={formData.enquiry_type}
                                   onChange={handleChange}
                                   className="h-11 w-full rounded-md border border-gray-300 bg-[#f3f3f3] px-4 text-sm outline-none transition focus:border-[#007C91] focus:bg-white dark:border-gray-700 dark:bg-[#1f2937] dark:focus:bg-[#1f2937] dark:text-white"
                                 >
                                   <option value="">Select type of Enquiry</option>
                                   <option value="Corporate Travel">Corporate Travel</option>
                                   <option value="Remote Workforce">Remote Workforce</option>
                                   <option value="API Integration">API Integration</option>
                                   <option value="Custom Program">Custom Program</option>
                                 </select>
                               </div>
             
                             {/* MESSAGE */}
                             <div>
                               <textarea
                                 rows={5}
                                 placeholder="Enter your message..."
                                 name="message"
                                 value={formData.message}
                                 onChange={handleChange}
                                 className="w-full resize-none rounded-md border border-gray-300 bg-[#f3f3f3] px-4 py-3 text-sm outline-none transition focus:border-[#007C91] focus:bg-white dark:border-gray-700 dark:bg-[#1f2937] dark:focus:bg-[#1f2937] dark:text-white"
                               />
                             </div>
             
                             {/* CHECKBOX */}
                             <div className="flex items-start gap-2">
                               <input
                                 type="checkbox"
                                 id="consent"
                                 name="consent"
                                 checked={formData.consent}
                                 onChange={handleChange}
                                 className="mt-1 accent-[#007C91]"
                               />
             
                               <label
                                 htmlFor="consent"
                                 className="text-xs leading-relaxed text-gray-500 dark:text-gray-300"
                               >
                                 I agree to be contacted regarding partner opportunities.
                               </label>
                             </div>
             
                             {/* BUTTON */}
                             <div className="pt-2">
                               <button
                                 type="submit"
                                 className="
                             inline-flex
                             items-center
                             justify-center
                             rounded-md
                             bg-[#007C91]
                             px-6
                             py-3
                             text-sm
                             font-semibold
                             text-white
                             transition
                             hover:bg-[#00697b]
                           "
                               >
                                  {loading ? "Submitting..." : "Submit & Schedule a Call"}
                               </button>
                             </div>
             
                           </form>
                         </div>
                       </div>
                     </div>
             
                     {/* BOTTOM BORDER */}
                     <div className="mt-12 h-[4px] w-full bg-[#007C91]" />
              </section> 
        </>
    )
}
