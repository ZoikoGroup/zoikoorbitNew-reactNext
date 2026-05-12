"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "./icons";
import { DATA_BUCKETS } from "../lib/types";
import type { Filters } from "../lib/types";
import type { Region } from "../lib/regions";


type Props = {
  regions: Region[];
  durations: { slug: string; label: string }[];
  filters: Filters;
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
};

export function FilterSidebar({ regions, durations, filters, setFilter }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <aside
      className={[
        "rounded-2xl border bg-white dark:bg-slate-900",
        "border-slate-200 dark:border-slate-800",
        "shadow-sm",
        "overflow-hidden",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={[
          "w-full flex items-center justify-between gap-3",
          "px-5 py-4",
          "text-left",
          "border-b border-slate-100 dark:border-slate-800",
        ].join(" ")}
        aria-expanded={open}
      >
        <span className="text-lg font-semibold text-slate-900 dark:text-white">
          Filter Plans
        </span>
        <span
          className={[
            "h-7 w-7 rounded-md flex items-center justify-center",
            "text-slate-500 dark:text-slate-400",
            "hover:bg-slate-100 dark:hover:bg-slate-800",
          ].join(" ")}
        >
          {open ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </span>
      </button>

      {open && (
        <div className="px-5 py-5 space-y-7">
          {/* Regions */}
          <FilterSection
            title="Regions"
            onClear={
              filters.region ? () => setFilter("region", null) : undefined
            }
          >
            <div
              className={[
                "max-h-[260px] overflow-y-auto pr-2 -mr-2",
                "scrollbar-thin",
              ].join(" ")}
            >
              <ul className="space-y-2.5">
                {regions.map((r) => (
                  <li key={r.slug}>
                    <RadioOption
                      name="region"
                      checked={filters.region === r.slug}
                      onChange={() =>
                        setFilter(
                          "region",
                          filters.region === r.slug ? null : r.slug
                        )
                      }
                      label={r.label}
                      hint={`(${r.count})`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </FilterSection>

          {/* Data Allowance */}
          <FilterSection
            title="Data Allowance"
            onClear={
              filters.dataBucket
                ? () => setFilter("dataBucket", null)
                : undefined
            }
          >
            <ul className="space-y-2.5">
              {DATA_BUCKETS.map((b) => (
                <li key={b.slug}>
                  <RadioOption
                    name="dataBucket"
                    checked={filters.dataBucket === b.slug}
                    onChange={() =>
                      setFilter(
                        "dataBucket",
                        filters.dataBucket === b.slug ? null : b.slug
                      )
                    }
                    label={b.label}
                  />
                </li>
              ))}
            </ul>
          </FilterSection>

          {/* Duration */}
          <FilterSection
            title="Duration"
            onClear={
              filters.duration ? () => setFilter("duration", null) : undefined
            }
          >
            <ul className="space-y-2.5">
              {durations.map((d) => (
                <li key={d.slug}>
                  <RadioOption
                    name="duration"
                    checked={filters.duration === d.slug}
                    onChange={() =>
                      setFilter(
                        "duration",
                        filters.duration === d.slug ? null : d.slug
                      )
                    }
                    label={d.label}
                  />
                </li>
              ))}
            </ul>
          </FilterSection>
        </div>
      )}
    </aside>
  );
}

// ---------- internal pieces ----------

function FilterSection({
  title,
  onClear,
  children,
}: {
  title: string;
  onClear?: () => void;
  children: React.ReactNode;
}) {
  return (
    <section>
      <header className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-200">
          {title}
        </h3>
        <button
          type="button"
          onClick={onClear}
          disabled={!onClear}
          className={[
            "text-xs font-semibold",
            "text-teal-700 hover:text-teal-800",
            "dark:text-teal-300 dark:hover:text-teal-200",
            "disabled:text-slate-300 dark:disabled:text-slate-600",
            "disabled:cursor-not-allowed",
            "transition",
          ].join(" ")}
        >
          Clear
        </button>
      </header>
      {children}
    </section>
  );
}

function RadioOption({
  name,
  checked,
  onChange,
  label,
  hint,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  hint?: string;
}) {
  return (
    <label
      className={[
        "group flex items-start gap-3 cursor-pointer select-none",
        "rounded-lg px-1 py-0.5 -mx-1",
        "hover:bg-slate-50 dark:hover:bg-slate-800/50",
      ].join(" ")}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        onClick={(e) => {
          // Allow click to also un-check the currently selected radio
          if (checked) {
            e.preventDefault();
            onChange();
          }
        }}
        className="sr-only"
      />
      <span
        aria-hidden
        className={[
          "mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 transition",
          "flex items-center justify-center",
          checked
            ? "border-teal-600 dark:border-teal-400"
            : "border-slate-300 dark:border-slate-600 group-hover:border-slate-400 dark:group-hover:border-slate-500",
        ].join(" ")}
      >
        {checked && (
          <span className="h-2 w-2 rounded-full bg-teal-600 dark:bg-teal-400" />
        )}
      </span>
      <span className="text-sm leading-tight text-slate-700 dark:text-slate-200">
        <span className="font-medium">{label}</span>
        {hint && (
          <span className="ml-1.5 text-slate-400 dark:text-slate-500">
            {hint}
          </span>
        )}
      </span>
    </label>
  );
}