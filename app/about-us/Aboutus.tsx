import Image from "next/image";

export default function Aboutus() {
  return (
    <div className="w-full dark:text-white dark:bg-gray-900">

      {/* ================= HERO ================= */}
       <section
      className="
        relative w-full overflow-hidden
        min-h-[600px] md:min-h-[85vh]
        bg-neutral-900 dark:bg-black
      "
      aria-label="Hero - Your World. Always Connected. Always Compassionate."
    >
      {/* Background image */}
      <Image
        src="/image/Rectangle 4 (1).png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        style={{ objectPosition: '80% 50%' }}
      />
      <div
        className="
          absolute inset-0
          bg-gradient-to-b from-black/80 via-black/55 to-black/20
          md:bg-gradient-to-r md:from-black/80 md:via-black/55 md:to-black/10
        "
        aria-hidden="true"
      />
 
      {/* Subtle dark-mode tint for extra contrast in dark mode */}
      <div
        className="absolute inset-0 hidden dark:block bg-black/20"
        aria-hidden="true"
      />
 
      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div
          className="
            flex min-h-[600px] md:min-h-[85vh]
            items-start md:items-center
            pt-16 md:pt-0
          "
        >
          <div className=" text-white">
            <h1
              className="
                font-bold tracking-tight leading-[1.1]
                text-2xl sm:text-3xl md:text-5xl lg:text-6xl
                mb-5 md:mb-6 max-w-[18ch] md:max-w-none
              "
            >
              Your World.
              Always Connected. <br />
              Always Compassionate.
            </h1>
 
            <div className="space-y-4 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-gray-100/90">
              <p>
                At Zoiko Orbit, we believe travel is more than moving from one
                place to another — it&apos;s about deep connections. Connections
                to people. To cultures. And to the breathtaking natural world
                that makes every journey unforgettable.
              </p>
              <p>
                We exist to keep you connected everywhere you go, while
                championing a richer, more compassionate planet for all who
                call it home.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* ================= WHO WE ARE ================= */}
       <section className="bg-white dark:bg-gray-900 py-8 md:py-16 lg:py-18">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image column — single composite image */}
          <div className="relative w-full">
            <div className="relative w-full aspect-[4/3] md:aspect-[5/4] rounded-2xl overflow-hidden">
              <Image
                src="/image/Group 1597883160.png"
                alt="Zoiko Orbit — global travel connectivity illustration"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                priority={false}
              />
            </div>
          </div>
 
          {/* Text column */}
          <div className="max-w-xl">
            {/* Desktop heading — hidden on mobile since it's rendered above the image */}
            <h2 className=" text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-5">
              Who We Are
            </h2>
 
            <div className="space-y-5 text-base md:text-[15px] lg:text-base leading-relaxed text-gray-700 dark:text-gray-300">
              <p>
                <span className="font-medium text-zinc-900 dark:text-white">
                  Zoiko Orbit™
                </span>{" "}
                is the premier global travel connectivity platform under Zoiko
                Communications Group Inc., part of the dynamic Zoiko Group — a
                diversified multinational enterprise spanning telecommunications,
                fintech, healthcare, technology, and consumer brands.
              </p>
              <p>
                Born from the robust telecom foundation of Zoiko Mobile, we draw
                on decades of engineering world-class networks. Yet as a proud
                brand in the Zoiko family, we also carry forward something
                deeper: a shared promise to uplift lives and protect the
                remarkable diversity of our world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

  {/* ================= WHY WE EXIST ================= */}
<section className="py-20 bg-gray-100  dark:text-white dark:bg-gray-900">
  <div className="max-w-7xl mx-auto px-6">

    {/* Top Heading */}
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold  dark:text-white dark:bg-gray-900 text-gray-900 mb-4">
        Why We Exist
      </h2>
      <p className= " dark:text-white dark:bg-gray-900 text-gray-600 max-w-3xl mx-auto leading-relaxed">
        In an age where travelers cross borders more than ever, staying connected should be effortless. Yet too often, it’s complicated, costly, or unreliable. We created Zoiko Orbit to change that.
      </p>
    </div>

    {/* Content Grid */}
    <div className="grid md:grid-cols-2 gap-12 items-center  dark:text-white dark:bg-gray-900">
      
      {/* Left Image */}
      <div>
        <Image
          src="/image/Rectangle 890.png"
          width={600}
          height={400}
          alt="traveler"
          className="rounded-xl object-cover w-full"
        />
      </div>

      {/* Right Content */}
      <div>
        <h3 className="text-xl md:text-2xl font-semibold  dark:text-white dark:bg-gray-900 text-gray-900 mb-4">
          Our mission is clear:
        </h3>

        <p className="text-gray-600 leading-relaxed mb-4  dark:text-white dark:bg-gray-900">
         “To give travelers — and the entire travel ecosystem — instant, secure, seamless mobile connectivity across 220+ countries, backed by Tier-1 infrastructure, transparent pricing, and unmatched global support.”
        </p>

        <p className="text-gray-600 leading-relaxed  dark:text-white dark:bg-gray-900">
         But we didn’t stop there. As passionate advocates for the animal kingdom, we’ve woven impact directly into our model. Every Zoiko Orbit purchase supports animal shelters, wildlife sanctuaries, and conservation initiatives worldwide — helping protect endangered species, fund vital rescues, and sustain habitats for generations to come.
        </p>
      </div>

    </div>
  </div>
</section>

      {/* ================= UNIQUE FOCUS ================= */}
      <section className="py-20 bg-white  dark:text-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-6 items-center">
          
          <div>
            <h2 className="text-3xl font-bold mb-4  dark:text-white dark:bg-gray-900 text-gray-900">
           A Unique Focus
on Nature & Safaris
            </h2>
            <p className="text-gray-600 leading-relaxed  dark:text-white dark:bg-gray-900">
        We’re especially proud to stand with travelers who explore the natural wonders of our planet. 
            </p>
            <br />

             <p className="text-gray-600 leading-relaxed  dark:text-white dark:bg-gray-900">
       Those headed on safaris or wildlife expeditions receive exclusive Zoiko Orbit discounts, plus the knowledge that part of every purchase directly funds global efforts to care for and protect the very creatures they’ve journeyed to see
            </p>
          </div>

          <Image src="/image/Rectangle 891.png" width={500} height={300} className="rounded-xl" alt="" />
        </div>
      </section>

   
 {/* ================= ECOSYSTEM ================= */}
<section className="py-20 bg-gray-100  dark:text-white dark:bg-gray-900" >
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

    {/* LEFT IMAGE */}
    <div className="relative w-full h-full">
      <Image
        src="/image/Vector (1).png"
        alt="ecosystem"
        fill
        className="h-full w-full"
      />
    </div>

    {/* RIGHT CONTENT */}
    <div>
      <h2 className="text-3xl font-bold mb-4  dark:text-white dark:bg-gray-900 text-gray-900">
        Powering a Global Travel Ecosystem
      </h2>

      <p className="text-gray-600 mb-6  dark:text-white dark:bg-gray-900">
       Zoiko Orbit is more than just a travel SIM. We’re a critical partner to the entire travel industry, seamlessly integrating global connectivity into:
      </p>

      <ul className="space-y-4 text-gray-700  dark:text-white dark:bg-gray-900">
        <li className="flex items-start gap-3">
          <span className="text-green-500 mt-1">●</span>
          <span>
            Retailers & Duty-Free Networks: Equipping stores worldwide with premium, high-margin travel essentials that attract foot traffic and build loyalty.

          </span>
        </li>

        <li className="flex items-start gap-3">
          <span className="text-green-500 mt-1">●</span>
          <span>
          Travel Agencies & OTAs: Embedding our eSIM solutions into booking flows so customers secure seamless data alongside their flights, hotels, and excursions.
          </span>
        </li>

        <li className="flex items-start gap-3">
          <span className="text-green-500 mt-1">●</span>
          <span>
           Travel Insurance Providers: Offering bundled policies that pair world-class protection with instant global mobile service..
          </span>
        </li>

        <li className="flex items-start gap-3">
          <span className="text-green-500 mt-1">●</span>
          <span>
           Travel Insurance Providers: Offering bundled policies that pair world-class protection with instant global mobile service.
          </span>
        </li>
      </ul>
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
          <Image src="/image/icon1.png" width={94} height={94} alt="icon" />
        </div>
        <h3 className="font-semibold text-lg mb-2 dark:text-teal-400 text-teal-700">
          Engineered for Global Trust
        </h3>
        <p className="text-gray-600 text-sm md:text-base max-w-xs  dark:text-white dark:bg-gray-900">
          Our advanced eSIM platform runs on Tier-1 carrier partnerships across 220+ countries, safeguarded by PCI DSS, GDPR, and rigorous data privacy standards. You get local-quality speeds and secure transactions wherever your journey takes you.
        </p>
      </div>

      {/* CARD 2 */}
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 mb-4">
          <Image src="/image/icon2.png" width={94} height={94} alt="icon" className="w-16 h-16" />
        </div>
        <h3 className="font-semibold text-lg mb-2 dark:text-teal-400 text-teal-700">
          Built to Give Back
        </h3>
        <p className="text-gray-600 text-sm md:text-base max-w-xs  dark:text-white dark:bg-gray-900">
         Unlike typical travel SIM providers, we embed impact at the core of every connection. Each Zoiko Orbit purchase actively supports animal rescue centers, wildlife rehabilitation programs, and community conservation efforts — so your travels help sustain the beauty you’ve come to explore.
        </p>
      </div>

      {/* CARD 3 */}
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 mb-4">
          <Image src="/image/icon3.png" width={94} height={94} alt="icon" />
        </div>
        <h3 className="font-semibold text-lg mb-2 dark:text-teal-400 text-teal-700">
          Part of the Zoiko Promise
        </h3>
        <p className="text-gray-600 text-sm md:text-base max-w-xs  dark:text-white dark:bg-gray-900">
          As a member of Zoiko Group, we uphold a legacy of operational excellence, cultural intelligence, and meaningful innovation — dedicated to improving lives and safeguarding the world we all share.
        </p>
      </div>

    </div>
  </div>
</section>

<section className="relative py-20">
  
  {/* Background Image */}
  <div className="absolute inset-0">
    <Image
      src="/image/Rectangle 19.png" // replace with your actual image
      alt="travel"
      fill
      className="object-cover"
    />
    <div className="absolute inset-0 bg-black/20"></div>
  </div>

  {/* Content */}
  <div className="relative max-w-7xl mx-auto px-6 md:px-8 flex justify-end">
    
    {/* Glass Card */}
    <div className="bg-teal-600/80 backdrop-blur-md text-white p-8 md:p-10 rounded-xl max-w-xl shadow-xl">
      
      <h3 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6">
        Join Us in Redefining Travel
      </h3>

      <p className="text-sm md:text-base leading-relaxed mb-4 md:mb-6">
      Whether you’re planning your next international adventure, 
managing a retail chain seeking premium travel products, 
or operating a travel agency or insurance platform eager to 
integrate instant global connectivity — Zoiko Orbit is here to
help you succeed.

      </p>

      <p className="text-sm md:text-base leading-relaxed dark:text-gray-300">
        Together, we can build a world where you’re always connected, 
and where every trip leaves a legacy of care, compassion, and a 
better tomorrow.
      </p>

    </div>
  </div>
</section>


    </div>
  );
}