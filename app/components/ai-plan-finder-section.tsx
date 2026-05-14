"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { PlanCard } from "../components/plan-card";
import { BuyPlanModal, type Plan } from "../components/BuyPlanModal";
import { variationToPlan } from "../lib/variation-to-plan";
import type { VariationsFile } from "../lib/types";

/**
 * AI Plan Finder section for the home page.
 *
 * - User enters a destination (free text) and picks a duration.
 * - On submit, we filter variations and show matches in a horizontal slider.
 * - Before the user searches, we show a curated preview (first N plans).
 */
export function AIPlanFinderSection() {
  const [data, setData] = useState<VariationsFile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [destination, setDestination] = useState("");
  const [durationLabel, setDurationLabel] = useState("");
  const [searched, setSearched] = useState(false);
  const [buyPlan, setBuyPlan] = useState<Plan | null>(null);

  const scrollerRef = useRef<HTMLDivElement>(null);

  // Load variations
  useEffect(() => {
    let cancelled = false;
    fetch("/data/variations.json")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json: VariationsFile) => {
        if (!cancelled) setData(json);
      })
      .catch((e: unknown) => {
        const msg = e instanceof Error ? e.message : "Unknown error";
        if (!cancelled) setError(msg);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const durations = useMemo(
    () => (data ? data.filter_options.duration : []),
    [data]
  );

  // Filter variations based on search
  const matches = useMemo(() => {
    if (!data) return [];

    const destNeedle = destination.trim().toLowerCase();
    const durNeedle = durationLabel.trim().toLowerCase();

    // Before any search: show first 8 as a preview
    if (!searched || (!destNeedle && !durNeedle)) {
      return data.variations.slice(0, 8);
    }

    return data.variations.filter((v) => {
      let okDest = true;
      let okDur = true;

      if (destNeedle) {
        const hay: string[] = [];
        // Tolerate different shapes — swap these for your real fields
        // and remove @ts-expect-error once typed.
        // @ts-expect-error
        if (v.country_name) hay.push(String(v.country_name));
        // @ts-expect-error
        if (v.country) hay.push(String(v.country));
        // @ts-expect-error
        if (v.region_name) hay.push(String(v.region_name));
        // @ts-expect-error
        if (v.region) hay.push(String(v.region));
        // @ts-expect-error
        if (v.title) hay.push(String(v.title));
        // @ts-expect-error
        if (v.name) hay.push(String(v.name));
        // @ts-expect-error
        if (Array.isArray(v.countries)) {
          // @ts-expect-error
          v.countries.forEach((c: unknown) => {
            if (typeof c === "string") hay.push(c);
            else if (c && typeof c === "object") {
              // @ts-expect-error
              if (c.name) hay.push(String(c.name));
              // @ts-expect-error
              if (c.slug) hay.push(String(c.slug));
            }
          });
        }
        okDest = hay.join(" ").toLowerCase().includes(destNeedle);
      }

      if (durNeedle) {
        const durHay: string[] = [];
        // @ts-expect-error
        if (v.duration_label) durHay.push(String(v.duration_label));
        // @ts-expect-error
        if (v.duration_slug) durHay.push(String(v.duration_slug));
        // @ts-expect-error
        if (v.duration) durHay.push(String(v.duration));
        // @ts-expect-error
        if (v.duration_days) durHay.push(`${v.duration_days} days`);
        okDur = durHay.join(" ").toLowerCase().includes(durNeedle);
      }

      return okDest && okDur;
    });
  }, [data, destination, durationLabel, searched]);

  const handleSearch = () => {
    setSearched(true);
    // Reset slider to start
    if (scrollerRef.current) {
      scrollerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const handleClear = () => {
    setDestination("");
    setDurationLabel("");
    setSearched(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    // Scroll roughly one card width
    const card = el.querySelector<HTMLElement>("[data-slide]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section className="bg-slate-50 dark:bg-slate-950 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* AI Finder card */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              AI
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-slate-900 dark:text-white text-sm">
                AI Plan Finder
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-xs">
                Let AI suggest the perfect plan for your trip.
              </p>
            </div>
            {searched && (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs font-semibold text-teal-700 dark:text-teal-400 hover:underline shrink-0"
              >
                Reset
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 md:gap-4 md:items-end">
            <div>
              <label
                htmlFor="ai-destination"
                className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5"
              >
                Where are you traveling?
              </label>
              <input
                id="ai-destination"
                type="text"
                placeholder="Enter destination or country"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onKeyDown={onKeyDown}
                className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="ai-duration"
                className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5"
              >
                How long is your trip?
              </label>
              <select
                id="ai-duration"
                value={durationLabel}
                onChange={(e) => setDurationLabel(e.target.value)}
                className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">Select duration</option>
                {durations.map((d) => (
                  <option key={d.slug} value={d.label}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleSearch}
              className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors shadow-sm md:self-end whitespace-nowrap"
            >
              Find My Perfect Plan
            </button>
          </div>
        </div>

        {/* Results header */}
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {searched ? "Recommended for you" : "Popular plans"}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {error
                ? "Couldn't load plans"
                : !data
                ? "Loading…"
                : searched
                ? `${matches.length} ${matches.length === 1 ? "plan" : "plans"} matching${
                    destination ? ` "${destination}"` : ""
                  }${durationLabel ? ` · ${durationLabel}` : ""}`
                : "A quick look at travel plans travelers love"}
            </p>
          </div>

          {/* Slider arrows (hidden if nothing to slide) */}
          {data && matches.length > 0 && (
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                aria-label="Scroll left"
                onClick={() => scrollBy(-1)}
                className="h-9 w-9 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-teal-500 hover:text-teal-700 dark:hover:text-teal-400 transition flex items-center justify-center"
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                aria-label="Scroll right"
                onClick={() => scrollBy(1)}
                className="h-9 w-9 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-teal-500 hover:text-teal-700 dark:hover:text-teal-400 transition flex items-center justify-center"
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </div>

        {/* Slider */}
        {!data && !error ? (
          <SliderSkeleton />
        ) : data && matches.length > 0 ? (
          <div className="relative">
            <div
              ref={scrollerRef}
              className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-3 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 scroll-smooth no-scrollbar"
            >
              {matches.map((v) => (
                <div
                  key={v.variation_id}
                  data-slide
                  className="snap-start shrink-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-[32%] xl:w-[31%]"
                >
                  <PlanCard
                    variation={v}
                    onBuy={(variation) =>
                      setBuyPlan(variationToPlan(variation))
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ) : data && matches.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 text-center">
            <p className="text-base font-semibold text-slate-900 dark:text-white">
              No plans match your search
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Try a different destination or duration.
            </p>
            <button
              type="button"
              onClick={handleClear}
              className="mt-4 inline-flex items-center rounded-lg bg-teal-600 hover:bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition"
            >
              Reset search
            </button>
          </div>
        ) : null}
      </div>

      {buyPlan && (
        <BuyPlanModal plan={buyPlan} onClose={() => setBuyPlan(null)} />
      )}

      {/* hide native scrollbar for the slider */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

/* ----- icons ----- */
function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

/* ----- skeleton ----- */
function SliderSkeleton() {
  return (
    <div className="flex gap-5 overflow-hidden">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="shrink-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-[32%] xl:w-[31%] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
        >
          <div className="animate-pulse space-y-4">
            <div className="flex justify-between">
              <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-8 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-44 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-36 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
            <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}