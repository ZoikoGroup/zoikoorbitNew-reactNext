"use client";

import type { SortKey } from "@/lib/filtering";
import { ChevronDownIcon } from "./icons";

type Props = {
  value: SortKey;
  onChange: (v: SortKey) => void;
};

const OPTIONS: { value: SortKey; label: string }[] = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "data-desc", label: "Data: High to Low" },
];

export function SortSelect({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2.5">
      <label
        htmlFor="sort-select"
        className="text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap"
      >
        Sort by:
      </label>
      <div className="relative">
        <select
          id="sort-select"
          value={value}
          onChange={(e) => onChange(e.target.value as SortKey)}
          className={[
            "appearance-none pr-9 pl-3 py-2 text-sm",
            "rounded-lg border bg-white dark:bg-slate-900",
            "border-slate-200 dark:border-slate-700",
            "text-slate-800 dark:text-slate-100",
            "hover:border-slate-300 dark:hover:border-slate-600",
            "focus:outline-none focus:ring-2 focus:ring-teal-400/40",
            "cursor-pointer",
          ].join(" ")}
        >
          {OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      </div>
    </div>
  );
}