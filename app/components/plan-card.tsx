"use client";

import type { Variation } from "@/lib/types";
import { PARENT_META } from "@/lib/parent-meta";
import {
  ArrowRightIcon,
  BoltIcon,
  DatabaseIcon,
  PiggyBankIcon,
  SignalIcon,
  StarIcon,
  SupportIcon,
} from "./icons";

type Props = {
  variation: Variation;
  onBuy: (variation: Variation) => void;
};

export function PlanCard({ variation, onBuy }: Props) {
  const meta = PARENT_META[variation.parent_id];
  const dataLabel = variation.attributes.data_allowance.label;
  const durationLabel = variation.attributes.duration.label;

  return (
    <article
      className={[
        "group relative flex flex-col",
        "rounded-2xl border bg-white dark:bg-slate-900",
        "border-slate-200 dark:border-slate-800",
        "shadow-sm hover:shadow-md transition-shadow",
        "overflow-hidden",
      ].join(" ")}
    >
      <div className="p-6 pb-5">
        {/* Title row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {meta?.name ?? variation.parent_name}
            </h3>
            <div className="mt-2 flex items-center gap-1.5">
              {meta?.badges.map((b) => (
                <Pill key={b} variant={b === "eSIM" ? "teal" : "amber"}>
                  {b}
                </Pill>
              ))}
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="flex items-baseline justify-end gap-0.5">
              <span className="text-lg font-bold text-teal-700 dark:text-teal-300 leading-none">
                $
              </span>
              <span className="text-4xl font-extrabold text-teal-700 dark:text-teal-300 leading-none">
                {variation.price ?? "—"}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400 ml-0.5">
                /{durationLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Feature list */}
        <ul className="mt-5 space-y-2.5">
          <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
            <DatabaseIcon className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
            <span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {dataLabel}
              </span>{" "}
              high-speed data
            </span>
          </li>
          <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
            <SignalIcon className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
            <span>5G Ready</span>
          </li>
          <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
            <BoltIcon className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
            <span>Instant activation (eSIM)</span>
          </li>
          <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
            <SupportIcon className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
            <span>24/7 Support</span>
          </li>
          <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
            <StarIcon className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
            <span>Data Only</span>
          </li>
          <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
            <StarIcon className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
            <span>No Contract</span>
          </li>
          <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
            <StarIcon className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
            <span>Top-up Anytime</span>
          </li>
        </ul>

        {/* Savings banner */}
        {meta && (
          <div
            className={[
              "mt-5 flex items-center gap-2.5",
              "rounded-xl px-3.5 py-2.5",
              "bg-teal-50 dark:bg-teal-950/40",
              "border border-teal-100 dark:border-teal-900/50",
            ].join(" ")}
          >
            <PiggyBankIcon className="h-4 w-4 text-teal-700 dark:text-teal-300 shrink-0" />
            <p className="text-sm text-teal-900 dark:text-teal-100">
              Save{" "}
              <span className="font-bold">{meta.saveVsRoaming}%</span>{" "}
              <span className="text-teal-700/80 dark:text-teal-200/80">vs roaming</span>
            </p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="px-6 pb-6 mt-auto">
        <button
            type="button"
            onClick={() => onBuy(variation)}
            className={[
                "flex items-center justify-center gap-2",
                "w-full rounded-xl",
                "bg-teal-700 hover:bg-teal-800 active:bg-teal-900",
                "dark:bg-teal-600 dark:hover:bg-teal-500",
                "text-white font-semibold py-3",
                "transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2",
                "focus:ring-offset-white dark:focus:ring-offset-slate-950",
            ].join(" ")}
            >
            <span>Buy Now</span>
            <ArrowRightIcon className="h-4 w-4" />
            </button>
      </div>
    </article>
  );
}

function Pill({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "teal" | "amber";
}) {
  const styles =
    variant === "teal"
      ? "bg-teal-50 text-teal-700 dark:bg-teal-900/40 dark:text-teal-200"
      : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200";
  return (
    <span
      className={[
        "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold",
        styles,
      ].join(" ")}
    >
      {children}
    </span>
  );
}