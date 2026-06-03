import Image from "next/image";

const provisions = [
  {
    bold: "Eligibility & Account Creation —",
    text: " who can use our services and how accounts are established",
  },
  {
    bold: "Service Access & Activation —",
    text: " how eSIM profiles are provisioned, paused, suspended, or revoked under defined conditions",
  },
  {
    bold: "Billing, Payments & Refunds —",
    text: " including billing cycles, auto-renewal options, chargebacks, and refund eligibility",
  },
  {
    bold: "Fair Usage & Network Management",
    text: " — policies on excessive consumption, throttling, or SIM misuse to protect all users",
  },
  {
    bold: "Device Requirements & Compatibility",
    text: " — what you need to use our services and limitations that may apply",
  },
  {
    bold: "Downtime, Interruptions & Service Levels",
    text: " — how planned maintenance or third-party carrier outages are handled",
  },
  {
    bold: "Limitations of Liability —",
    text: " boundaries of responsibility related to service delivery, connectivity quality, and third-party infrastructure",
  },
  {
    bold: "User Conduct & Acceptable Use",
    text: " — expected behavior, fraud prevention, security practices, and prohibited use cases",
  },
  {
    bold: "Intellectual Property —",
    text: " use of Zoiko Orbit logos, trademarks, applications, and all digital content",
  },
  {
    bold: "Governing Law & Jurisdiction",
    text: " — dispute resolution in accordance with UK, US, and international telecom frameworks",
  },
  {
    bold: "Contact Channels —",
    text: " for legal inquiries, regulatory escalations, or dispute notifications",
  },
];

export default function TermsOfService() {
  return (
    <div className="w-full font-sans bg-white dark:bg-gray-900 dark:text-white">

      {/*   HERO   */}
      <section className="relative w-full bg-[#0f1b2d] overflow-hidden min-h-[280px] md:min-h-[320px]">

        {/* Tablet / device image — right side */}
       <div className="absolute inset-0">
    <Image
      src="/image/Rectangle 4 (2).png"
      alt="Privacy Shield"
      fill
      priority
      className="object-cover object-center"
    />

    <div className="block sm:hidden w-[392px] h-[354px] absolute inset-0">
    <Image
      src="/image/mobile-banner.png"
      alt="Mobile Banner"
      fill
      priority
      className="object-cover  object-center"
    />
  </div>

    {/* Optional Dark Overlay */}
    <div className="absolute inset-0 " />
  </div>

        {/* Hero text — left side */}
        <div className="relative z-10 mx-auto max-w-7xl
                px-[20px] pt-[320px] pb-[25px]
                md:px-12 md:py-16">

  <div className="max-w-[379px] md:max-w-[520px]">

    <h1 className="
      mb-2
      text-[20px]
      leading-[121%]
      font-bold
      text-white
      md:text-4xl
      md:leading-tight
      md:font-extrabold
    ">
              Service Clarity. Global
              <br />
              Protection. Mutual Trust.
            </h1>
         <p
  className="
    text-[14px]
    leading-[1.25]
    text-white
    md:text-sm
    md:leading-relaxed
    md:text-gray-300
  "
>
              The Terms of Service define the legally binding agreement between you
              and Zoiko Orbit, a global connectivity brand under Zoiko Communications
              Group. These terms apply to your use of our eSIM services, mobile
              applications, online portals, and related platforms — whether you're an
              individual traveler or an enterprise client with international operations.
            </p>
          </div>
        </div>
      </section>

      {/*   CONTENT SECTION   */}
      <section className="bg-white py-14 dark:bg-gray-900 dark:text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8 space-y-8 text-sm md:text-base leading-relaxed text-gray-800 dark:text-gray-200">

          {/* Intro paragraph */}
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">
            Our goal is to deliver reliable, transparent service — and protect both your rights and
            ours — with fairness, precision, and full regulatory compliance.
          </p>

          {/* Key provisions */}
          <div className="space-y-3">
            <p className="text-base md:text-lg font-bold text-zinc-900 dark:text-white">
              Key provisions include:
            </p>

            {provisions.map((item, i) => (
              <p key={i} className="text-gray-700 dark:text-gray-300">
                <span className="font-bold text-zinc-900 dark:text-white">
                  {item.bold}
                </span>
                {item.text}
              </p>
            ))}
          </div>

          {/* Closing paragraph */}
          <p className="pt-2 text-gray-700 dark:text-gray-300">
            By using Zoiko Orbit, you acknowledge and accept these Terms — which are designed to uphold service excellence, operational fairness,
            and global compliance.
          </p>

          {/* Bold closing statement */}
          <p className="font-bold text-zinc-900 dark:text-white">
            Zoiko Orbit Terms of Service — engineered for transparency, enforced with integrity.
          </p>

        </div>
      </section>

    </div>
  );
}