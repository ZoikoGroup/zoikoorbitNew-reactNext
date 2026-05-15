"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUserEdit, FaShieldAlt, FaHeadset } from "react-icons/fa";

interface NavCard {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  cta: string;
}

export default function MyAccount() {
  const [userName, setUserName] = useState<string>("Customer");

  // Optional: read stored user, but no auth-gating happens here.
  useEffect(() => {
    try {
      const raw = localStorage.getItem("driverx_user");
      if (raw) {
        const user = JSON.parse(raw);
        const name =
          user?.first_name || user?.name || user?.username || "Customer";
        setUserName(name);
      }
    } catch {
      // ignore parse errors — fall back to default name
    }
  }, []);

  const cards: NavCard[] = [
    {
      title: "Edit Profile",
      description:
        "Update your personal details, name, and account password.",
      href: "/dashboard/edit-profile",
      icon: <FaUserEdit />,
      cta: "Edit profile",
    },
    {
      title: "Security",
      description:
        "Manage two-factor authentication, review login history, and report suspicious activity.",
      href: "/dashboard/security",
      icon: <FaShieldAlt />,
      cta: "Open security",
    },
    {
      title: "Support",
      description:
        "Create a ticket, start a live chat, or review your past support requests.",
      href: "/dashboard/support",
      icon: <FaHeadset />,
      cta: "Get support",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow dark:bg-gray-900 dark:text-white bg-gray-100 py-8 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Welcome banner */}
          <div className="bg-green-100 border border-green-400 text-green-800 text-center px-4 py-3 rounded mb-6 font-bold">
            👋 Welcome, {userName}!
          </div>

          {/* Header */}
          <div className="mb-6">
            <h4 className="text-xl font-bold">My Account</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Choose what you&apos;d like to manage.
            </p>
          </div>

          {/* Navigation cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-green-500 text-2xl">{card.icon}</div>
                  <h5 className="font-semibold text-base">{card.title}</h5>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-grow">
                  {card.description}
                </p>
                <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                  {card.cta} →
                </span>
              </Link>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
