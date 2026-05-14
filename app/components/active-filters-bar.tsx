"use client";

import { CloseIcon } from "./icons";

export type ActiveChip = {
  key: string;            // unique per chip
  facet: "region" | "dataBucket" | "duration";
  label: string;
};

type Props = {
  chips: ActiveChip[];
  onRemove: (chip: ActiveChip) => void;
  onClearAll: () => void;
};

export function ActiveFiltersBar({ chips, onRemove, onClearAll }: Props) {
  const hasFilters = chips.length > 0;

  return (
    <div
      className={[
        "rounded-2xl border bg-white/70 dark:bg-slate-900/70 backdrop-blur",
        "border-teal-200/70 dark:border-teal-900/40",
        "shadow-[0_1px_0_rgba(0,0,0,0.02)] dark:shadow-none",
        "px-4 sm:px-5 py-3 sm:py-4",
      ].join(" ")}
      aria-live="polite"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">
          Active Filters:
        </span>

        {hasFilters ? (
          chips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={() => onRemove(chip)}
              className={[
                "group inline-flex items-center gap-1.5 rounded-lg",
                "border border-slate-200 dark:border-slate-700",
                "bg-white dark:bg-slate-800",
                "px-2.5 py-1 text-sm text-slate-700 dark:text-slate-100",
                "transition hover:border-teal-400 hover:text-teal-700",
                "dark:hover:border-teal-400 dark:hover:text-teal-300",
                "focus:outline-none focus:ring-2 focus:ring-teal-400/40",
              ].join(" ")}
              aria-label={`Remove filter ${chip.label}`}
            >
              <span className="font-medium">{chip.label}</span>
              <CloseIcon className="h-3.5 w-3.5 text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-300" />
            </button>
          ))
        ) : (
          <span className="text-sm text-slate-500 dark:text-slate-400">
            None — showing all plans
          </span>
        )}

        <span className="ml-auto" />

        <button
          type="button"
          onClick={onClearAll}
          disabled={!hasFilters}
          className={[
            "text-sm font-semibold whitespace-nowrap",
            "text-teal-700 hover:text-teal-800",
            "dark:text-teal-300 dark:hover:text-teal-200",
            "disabled:text-slate-300 dark:disabled:text-slate-600",
            "disabled:cursor-not-allowed",
            "transition",
          ].join(" ")}
        >
          Clear All
        </button>
      </div>
    </div>
  );
}