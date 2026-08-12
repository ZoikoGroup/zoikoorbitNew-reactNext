import Image from "next/image";

export default function CookiePreferences() {
  return (
    <div className="w-full font-sans bg-white dark:bg-gray-900 dark:text-white">

      {/* ================= HERO ================= */}
 <section className="relative w-full  overflow-hidden min-h-[260px] md:min-h-[300px]">

        {/* Full background image */}
        <div className="absolute inset-0">
          <Image
            src="/image/Rectangle 4 (3).png"
            alt="Cookies Settings UI"
            fill
            priority
            className="object-cover object-center"
          />
            <Image
                src="/image/cookie-settingmobile.png"
                alt="cookie settings"
                fill
                priority
                className="block md:hidden object-cover object-center"
              />
          {/* Dark overlay */}
          <div className="absolute inset-0 " />
        </div>

        {/* Hero text — left side */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-16 pt-[220px]  pb-[25px]">
          <div className="max-w-[500px]">
            <h1 className="mb-2 md:mb-5 text-xl font-extrabold leading-tight text-white md:text-4xl">
              Engineered for Transparency.
              <br />
              Powered by Consent
            </h1>
            <p className="text-[14px]
                leading-[1.25]
                text-white
                md:text-sm
                md:leading-relaxed
                md:text-gray-300">
              At Zoiko Orbit, we treat your data with the same precision as we deliver your
              connectivity. Our use of cookies and similar technologies is guided by
              global privacy law, ethical design, and your absolute right to control how
              your data is collected and used online.
            </p>
          </div>
        </div>

      </section>

      {/*   CONTENT SECTION   */}
      <section className="bg-white py-12 dark:bg-gray-900 dark:text-white">
        <div className="mx-auto max-w-6xl px-6 md:px-12 space-y-8 text-l leading-relaxed text-gray-700 dark:text-gray-300">

          {/* Intro */}
          <p>
            Whether you're browsing, managing an account, or activating an eSIM — we ensure every tracking mechanism is lawful, transparent,
            and fully configurable.
          </p>

          {/* Our Use of Cookies */}
          <div className="space-y-5">
            <h2 className="font-bold text-zinc-900 dark:text-white text-base">
              Our Use of Cookies Includes:
            </h2>

            {/* Cookie 1 */}
            <div className="space-y-1">
              <p className="font-bold text-zinc-900 dark:text-white">
                1. Essential Cookies
              </p>
              <p>
                Required to enable secure access, account authentication, fraud prevention, and core service delivery. These are active by default and
                do not require consent.
              </p>
            </div>

            {/* Cookie 2 */}
            <div className="space-y-1">
              <p className="font-bold text-zinc-900 dark:text-white">
                2. Performance &amp; Analytics Cookies
              </p>
              <p>
                Help us understand how our platform is used — including page load times, navigation paths, error rates, and device/browser trends. All
                analytics are pseudonymized.
              </p>
            </div>

            {/* Cookie 3 */}
            <div className="space-y-1">
              <p className="font-bold text-zinc-900 dark:text-white">
                3. Functionality Cookies
              </p>
              <p>
                Store your preferences for language, currency, timezone, accessibility, and device type to deliver a personalized experience across
                sessions and devices.
              </p>
            </div>

            {/* Cookie 4 */}
            <div className="space-y-1">
              <p className="font-bold text-zinc-900 dark:text-white">
                4. Marketing &amp; Personalization Cookies
              </p>
              <p>
                Used — only with your explicit consent — to show relevant offers, retarget ads, and measure marketing effectiveness across platforms.
                No profiling occurs without opt-in.
              </p>
            </div>
          </div>

          {/* Global Legal Compliance */}
          <div className="space-y-3 pt-2">
            <h2 className="font-bold text-zinc-900 dark:text-white text-base">
              Global Legal Compliance
            </h2>
            <p>
              Zoiko Orbit's cookie framework is engineered for international trust. Our consent infrastructure aligns with:
            </p>
            <div className="space-y-1 text-gray-700 dark:text-gray-300">
              {[
                "UK GDPR and DPA 2018",
                "EU ePrivacy Directive",
                "California CCPA & CPRA",
                "Canada's PIPEDA, Brazil's LGPD, and other emerging global laws",
              ].map((item, i) => (
                <p key={i}>- {item}</p>
              ))}
            </div>
            <p>
              We deploy geo-specific banners and consent layers to ensure lawful interaction by jurisdiction — including full support for multilingual
              preferences, Do Not Track (DNT) signals, and mobile OS-level settings.
            </p>
          </div>

          {/* How to Manage */}
          <div className="space-y-3 pt-2">
            <h2 className="font-bold text-zinc-900 dark:text-white text-base">
              How to Manage Your Preferences
            </h2>
            <p>You can update or revoke your cookie preferences anytime via:</p>
            <div className="space-y-1 text-gray-700 dark:text-gray-300">
              {[
                "The Zoiko Orbit Cookie Control Center",
                "Browser privacy settings and extensions",
                "MyZoiko account dashboards (for enterprise clients)",
                "System-level controls (Android/iOS tracking permissions)",
              ].map((item, i) => (
                <p key={i}>- {item}</p>
              ))}
            </div>
            <p>
              We store your choices securely and never infer consent based on inactivity or site usage.
            </p>
          </div>

          {/* Ethical Commitment */}
          <div className="space-y-3 pt-2">
            <h2 className="font-bold text-zinc-900 dark:text-white text-base">
              Our Ethical Commitment
            </h2>
            <div className="space-y-1 text-gray-700 dark:text-gray-300">
              {[
                "We do not use hidden trackers.",
                "We do not sell personal data.",
                "We do not deploy third-party cookies without your informed consent.",
                "We regularly audit and monitor all data scripts for compliance and integrity.",
              ].map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
          </div>

          {/* Closing */}
          <p className="pt-2 text-gray-700 dark:text-gray-300">
            Zoiko Orbit Cookie Preferences — your privacy, your pace, your platform.
          </p>

        </div>
      </section>

    </div>
  );
}