import Image from "next/image";

export default function PrivacyPolicy() {
  return (
    <div className="w-full font-sans bg-white dark:bg-gray-900 dark:text-white">

      {/* ================= HERO ================= */}
      <section className="relative w-full overflow-hidden bg-[#0f1b2d] min-h-[320px] md:min-h-[420px]">

        {/* Full Background Image */}
        <div className="absolute inset-2">
          <Image
            src="/image/c.png"
            alt="Privacy Shield"
            fill
            priority
            className="hidden md:block object-cover object-center"  
          />
            <Image
                    src="/image/Group 1597883429.png"
                    alt="Privacy Shield"
                    fill
                    priority
                    className="block md:hidden object-cover object-center"
                  />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-[#0f1b2d]/60" />
        </div>

        {/* Hero Content */}
<div className="relative z-10 mx-auto flex min-h-[620px] items-end px-5 pb-8 md:min-h-[420px] md:max-w-7xl md:items-center md:px-12 md:py-16">
            <div className="max-w-2xl">
<h1 className="mb-4 text-[24px] leading-[1.1] font-extrabold text-white md:text-5xl">
                Privacy by Design
              <br />
              — Protection Without Compromise
            </h1>
<p className="max-w-xl text-[14px] leading-[1.4] text-gray-200 md:text-base">
                At Zoiko Orbit, protecting your privacy isn't just a regulatory obligation —
              it's a core part of our infrastructure. As a global eSIM and connectivity
              platform serving users across more than 220 countries and territories,
              we are fully committed to data protection frameworks including the UK
              Data Protection Act (2018), EU GDPR, California CCPA &amp; CPRA,
              and relevant international laws governing cross-border data transfers.
            </p>
          </div>
        </div>
      </section>

      {/* ================= POLICY CONTENT ================= */}
      <section className="bg-white py-14 dark:bg-gray-900 dark:text-white">
        <div className="mx-auto max-w-5xl px-5 md:px-2 space-y-5 text-l text-gray-800 dark:text-gray-200 leading-relaxed">

          {/* Intro line */} 
          <p className="font-bold text-zinc-900 dark:text-white">
            Our Privacy Policy clearly explains how your data is:
          </p>

          {/* Data usage list with images */}
          <div className="space-y-4">
            {[
              {
                //img: "/image/Group 1597883246.png",
                alt: "Collected",
                bold: "Collected —",
                text: " including personal identifiers, device metadata, SIM/eSIM profile details, and real-time network diagnostics",
              },
              {
                //img: "/image/used.png",
                alt: "Used",
                bold: "Used",
                text: " — for service activation, account management, network optimization, fraud prevention, and personalized support",
              },
              {
               // img: "/image/shared.png",
                alt: "Shared",
                bold: "Shared —",
                text: " only with vetted processors and regulatory authorities where required by law",
              },
              {
               // img: "/image/protected.png",
                alt: "Protected",
                bold: "Protected",
                text: " — using zero-trust access controls, end-to-end encryption, and geographically distributed, SOC 2-compliant data centers",
              },
              {
               // img: "/image/stored.png",
                alt: "Stored",
                bold: "Stored & Retained —",
                text: " only for as long as necessary to meet legal, billing, and service continuity requirements",
              },
              {
               // img: "/image/deleted.png",
                alt: "Deleted",
                bold: "Deleted or Ported",
                text: " — upon request, in accordance with your data rights",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
               
                <p>
                  <span className="font-bold text-zinc-900 dark:text-white">{item.bold}</span>
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="pt-2" />

          {/* You'll also find */}
          <div>
            <p className="font-bold text-zinc-900 dark:text-white mb-3">
              You'll also find clear guidance on:
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              {[
                {
                  //img: "/image/access.png",
                  alt: "Access",
                  text: "How to access, correct, restrict, or delete your personal information",
                },
                {
                  //img: "/image/object.png",
                  alt: "Object",
                  text: "Your right to object to data profiling or direct marketing",
                },
                {
                  //img: "/image/lawful.png",
                  alt: "Lawful",
                  text: "Our lawful bases for data processing (consent, contract, legal obligation, legitimate interest)",
                },
                {
                  //img: "/image/children.png",
                  alt: "Children",
                  text: "How we handle children's data and ensure age-appropriate safeguards",
                },
                {
                 // img: "/image/dpo.png",
                  alt: "DPO",
                  text: "How to file a concern with our Data Protection Officer (DPO) or local supervisory authority",
                },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                 
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="pt-2" />

          {/* Closing paragraphs */}
          <p className="text-gray-700 dark:text-gray-300">
            We do not sell your personal data. We do not use your information for profiling without your clear
            consent. And we never hide behind jargon or legalese.
          </p>

          <p className="font-bold text-zinc-900 dark:text-white">
            Zoiko Orbit — engineering digital trust, globally.
          </p>

        </div>
      </section>

    </div>
  );
}