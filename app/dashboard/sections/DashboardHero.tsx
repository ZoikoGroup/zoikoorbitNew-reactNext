"use client";

import React from "react";

interface DashboardHeroProps {
  userName?: string;
  totalOrders?: number;
  activeSims?: number;
  loading?: boolean;
}

function PulseSkeleton() {
  return <div className="h-8 w-16 bg-[#0d3759] rounded animate-pulse mx-auto" />;
}

export default function DashboardHero({
  userName = "Customer",
  totalOrders,
  activeSims,
  loading = false,
}: DashboardHeroProps) {
  const stats = [
    { title: "Account Status", value: "Active",           dynamic: false },
    { title: "Total Orders",   value: totalOrders ?? "—", dynamic: true  },
    { title: "Active SIMs",    value: activeSims ?? "—",  dynamic: true  },
  ];

  return (
    <section className="w-full">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div className="bg-[#10446C] dark:bg-gray-900 text-white text-center md:text-left py-4 px-6 sm:px-8 lg:px-20 lg:py-8 transition-colors duration-300">
        <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold leading-relaxed">
          Welcome back, {loading ? "…" : userName}
        </h2>
        <p className="mt-2 text-base md:text-xl text-white/90 dark:text-gray-300">
          Manage your SIMs, plans, orders and support from one place
        </p>
      </div>

      {/* ── Stats ─────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-gray-800 text-center md:text-left py-8 px-6 sm:px-8 lg:px-20 lg:py-12 transition-colors duration-300">
        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {stats.map((item, i) => (
            <li key={i}>
              <article className="h-full px-6 py-6 flex flex-col items-center justify-center gap-3 border border-[#f5c241]/40 dark:border-yellow-400/30 bg-[#fefbf4] dark:bg-gray-800 rounded-2xl transition">
                {loading && item.dynamic ? (
                  <PulseSkeleton />
                ) : (
                  <p className="text-base md:text-3xl font-semibold text-[#10446C] dark:text-white">
                    {item.value}
                  </p>
                )}
                <p className="text-base md:text-lg font-medium text-[#666666] dark:text-gray-400 leading-tight">
                  {item.title}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}