import Image from "next/image";

const whatYouCanDo = [
  {
    icon: "/image/fi_2450485.png",
    title: "Access step-by-step setup guides for iOS, Android, Windows, and MDM platforms",
  },
  {
    icon: "/image/T.png",
    title: "Activate your eSIM with real-time provisioning assistance",
  },
  {
    icon: "/image/Layer 2.png",
    title: "Troubleshoot connection issues with AI-guided diagnostics",
  },
  {
    icon: "/image/Group (1).png",
    title: "Chat live with our multilingual support agents anytime, anywhere",
  },
  {
    icon: "/image/Layer 2 (1).png",
    title: "Submit and track service requests through your secure MyZoiko portal",
  },
  {
    icon: "/image/Vector (4).png",
    title: "Request enterprise onboarding and remote deployment support",
  },
  {
    icon: "/image/fi_2205548.png",
    title: "Watch quick-start video tutorials and browse our self-service library",
  },
];

export default function SupportCenter() {
  return (
    <div className="w-full font-sans bg-white dark:bg-gray-900 dark:text-white">

      {/*   HERO   */}
      <section className="relative h-[320px] md:h-[380px] w-full overflow-hidden">
        <Image
          src="/image/Rectangle 4 (1)3.png"
          alt="24/7 Expert Support"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark gradient overlay — stronger on left for text */}
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/55 to-black/10" />

        {/* Hero Text */}
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
            <div className="max-w-md">
              <h1 className="mb-4 text-2xl font-extrabold leading-tight text-white md:text-[2rem]">
                24/7 Expert Support — Wherever
                <br />
                You Are, Worldwide
              </h1>
              <p className="text-[11px] leading-relaxed text-gray-300 md:text-xs">
                The Zoiko Orbit Support Center is your dedicated hub for fast,
                intelligent, and reliable assistance — available 24/7, across every
                timezone. Whether you're activating a personal eSIM for travel or
                managing a fleet of enterprise devices, our global team is here to
                ensure your connectivity remains seamless.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*   WHAT YOU CAN DO   */}
      <section className="bg-white py-4 dark:bg-gray-900 dark:text-white">
        <div className="mx-auto max-w-5xl px-6 md:px-12">

          {/* Heading */}
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white md:text-3xl">
              What you can do
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Zoiko Orbit Support Center — always on, always with you.
            </p>
          </div>

          {/* Row 1 — 4 items */}
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4 mb-10">
            {whatYouCanDo.slice(0, 4).map((item, i) => (
              <FeatureCard key={i} icon={item.icon} title={item.title} />
            ))}
          </div>

          {/* Row 2 — 3 items centered */}
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-10 md:grid-cols-3 md:w-3/4">
              {whatYouCanDo.slice(4).map((item, i) => (
                <FeatureCard key={i} icon={item.icon} title={item.title} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/*   CTA BANNER   */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[300px] md:h-[360px] w-full">
          <Image
            src="/image/Rectangle 935 (1).png"
            alt="Support Team"
            fill
            className="object-cover object-center"
          />

          {/* Light dark wash over entire image */}
          <div className="absolute inset-0 bg-black/25" />

          {/* Teal card — right aligned, vertically centered */}
          <div className="absolute inset-0 flex items-center justify-end px-8 md:px-16">
            <div className="max-w-[280px] md:max-w-[340px] rounded-2xl bg-[#007C91]/80 backdrop-blur-sm p-6 md:p-8 text-white shadow-xl">
              <p className="text-xs leading-relaxed md:text-sm">
                Designed for travelers, teams, and businesses
                alike — the Support Center brings together
                human expertise and intelligent automation to
                keep you connected without compromise.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

/* ── Helper: Feature Card ── */
function FeatureCard({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-[#007C91]">
        <div className="relative h-7 w-7">
          <Image
            src={icon}
            alt={title}
            fill
            className="object-contain brightness-0 invert"
          />
        </div>
      </div>
      <p className="max-w-[150px] text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">
        {title}
      </p>
    </div>
  );
}