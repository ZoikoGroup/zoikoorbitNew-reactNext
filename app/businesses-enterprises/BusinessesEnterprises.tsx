import React from 'react'
import Image from 'next/image'

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

            {/* BUSINESS SOLUTIONS */}
            <section className="bg-[#EAF4FA] py-16 sm:py-20 lg:py-24">

    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

    {/* HEADING */}
    <div className="text-center">
        <h2
        className="
          text-3xl
          font-bold
          leading-tight
          text-[#1E293B]
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
        shadow-sm
      "
                    >

        <div
        className="
          grid
          grid-cols-1
          divide-y
          divide-gray-300
          md:grid-cols-2
          md:divide-y-0
          lg:grid-cols-3
          lg:divide-x
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
          text-[#1E293B]">
          {item.title}
        </h3>
    <p
        className="
            mt-4
            text-[15px]
            leading-8
            text-[#475569]">
             {item.description}
             </p>
        </div>
    </div>
    ))}
            </div>
        </div>
    </div>
</section>

        <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">

  {/* BACKGROUND GRID */}
  <div
    className="
      absolute
      inset-0
      opacity-60
      pointer-events-none
      bg-[linear-gradient(to_right,#dbe4ec_1px,transparent_1px),linear-gradient(to_bottom,#dbe4ec_1px,transparent_1px)]
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
              "
            >
              {item.description}
            </p>

            {/* LINK */}
            <a
              href={item.link}
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                text-[16px]
                font-medium
                text-[#007C91]
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
        </>
    )
}
