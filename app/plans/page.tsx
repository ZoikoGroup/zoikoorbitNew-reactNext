"use client";

import { useEffect, useMemo, useState } from "react";
import { ActiveFiltersBar, type ActiveChip } from "../components/active-filters-bar";
import { FilterSidebar } from "../components/filter-sidebar";
import { PlanCard } from "../components/plan-card";
import { SortSelect } from "../components/sort-select";
import { ThemeToggle } from "../components/theme-toggle";
import { applyFilters, sortVariations, type SortKey } from "../lib/filtering";
import { buildRegionsForData, REGIONS } from "../lib/regions";
import { DATA_BUCKETS, type Filters, type VariationsFile } from "../lib/types";
import { Pagination } from "../components/pagination";
import { BuyPlanModal, type Plan } from "../components/BuyPlanModal";
import { variationToPlan } from "../lib/variation-to-plan";
import { useSearchParams } from "next/navigation";

export default function PlansPage() {
  const searchParams = useSearchParams();

  const selectedCountry =
    searchParams.get("country");

  const selectedDuration =
    searchParams.get("duration");
    const [data, setData] = useState<VariationsFile | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const PAGE_SIZE = 6;
    const [filters, setFilters] = useState<Filters>({
                                                        region: null,
                                                        dataBucket: null,
                                                        duration: null,
                                                    });
    const [sortKey, setSortKey] = useState<SortKey>("price-asc");
    const [buyPlan, setBuyPlan] = useState<Plan | null>(null);
  // Load variations data
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

  // Derived filter options from the loaded data
  const regions = useMemo(
    () => (data ? buildRegionsForData(data.filter_options.countries) : []),
    [data]
  );
  const durations = useMemo(
    () => (data ? data.filter_options.duration : []),
    [data]
  );

  // Compute matching variations + group + sort
const cards = useMemo(() => {
  if (!data) return [];
  {/*const matching = applyFilters(data.variations, filters);
  return sortVariations(matching, sortKey);
}, [data, filters, sortKey]);*/}
const updatedFilters = {
    ...filters,
    region: filters.region || selectedCountry,
    duration: filters.duration || selectedDuration,
  };

  // Apply filters
  let matching = applyFilters(
    data.variations,
    updatedFilters
  );

  // Sort plans
  return sortVariations(
    matching,
    sortKey
  );
}, [
  data,
  filters,
  sortKey,
  selectedCountry,
  selectedDuration,
]);
// Reset to page 1 whenever filters or sort change
useEffect(() => {
  setPage(1);
}, [filters, sortKey]);

const totalPages = Math.max(1, Math.ceil(cards.length / PAGE_SIZE));
const safePage = Math.min(page, totalPages);
const pageStart = (safePage - 1) * PAGE_SIZE;
const visibleCards = cards.slice(pageStart, pageStart + PAGE_SIZE);

  // Build chip list for the top bar
  const chips: ActiveChip[] = useMemo(() => {
    const out: ActiveChip[] = [];
    if (filters.region) {
      const r = regions.find((x) => x.slug === filters.region) ??
        REGIONS.find((x) => x.slug === filters.region);
      if (r) out.push({ key: "region", facet: "region", label: r.label });
    }
    if (filters.dataBucket) {
      const b = DATA_BUCKETS.find((x) => x.slug === filters.dataBucket);
      if (b) out.push({ key: "dataBucket", facet: "dataBucket", label: b.label });
    }
    if (filters.duration) {
      const d = durations.find((x) => x.slug === filters.duration);
      if (d) out.push({ key: "duration", facet: "duration", label: d.label });
    }
    return out;
  }, [filters, regions, durations]);

  const setFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((f) => ({ ...f, [key]: value }));
  };

  const removeChip = (chip: ActiveChip) => {
    setFilter(chip.facet, null);
  };

  const clearAll = () => {
    setFilters({ region: null, dataBucket: null, duration: null });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Top bar 
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-linear-to-br from-teal-500 to-teal-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">Z</span>
            </div>
            <span className="font-bold text-lg tracking-tight">
              Zoiko<span className="text-teal-600 dark:text-teal-400">Orbit</span>
            </span>
          </div>
          <ThemeToggle />
        </div>
      </header>*/}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Active filters bar */}
        <ActiveFiltersBar
          chips={chips}
          onRemove={removeChip}
          onClearAll={clearAll}
        />

        {/* Body: sidebar + cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* Sidebar */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {data ? (
              <FilterSidebar
                regions={regions}
                durations={durations}
                filters={filters}
                setFilter={setFilter}
              />
            ) : (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-5 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
                </div>
              </div>
            )}
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Results header */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
              <div>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  {error
                    ? "Couldn't load plans"
                    : data
                    ? `${cards.length} ${cards.length === 1 ? "plan" : "plans"} found`
                    : "Loading…"}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  {error
                    ? error
                    : cards.length === 0 && data
                    ? "Try removing a filter to see more options."
                    : "Perfect for your travel needs"}
                </p>
              </div>
                {data && cards.length > 0 && (
                    <SortSelect value={sortKey} onChange={setSortKey} />
                )}
            </div>

            {/* Cards grid */}
            {data && cards.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                        {visibleCards.map((v) => (
                            <PlanCard
                                key={v.variation_id}
                                variation={v}
                                onBuy={(variation) => setBuyPlan(variationToPlan(variation))}
                            />
                            ))}
                        </div>
                        <Pagination
                        currentPage={safePage}
                        totalPages={totalPages}
                        onPageChange={(p) => {
                            setPage(p);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        />
                    </>
                    ) : data && cards.length === 0 ? (
              <EmptyState onClear={clearAll} />
            ) : !error ? (
              <CardsSkeleton />
            ) : null}
          </div>
        </div>
      </main>

        {buyPlan && (
        <BuyPlanModal
            plan={buyPlan}
            onClose={() => setBuyPlan(null)}
        />
        )}
    </div>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-10 text-center">
      <p className="text-lg font-semibold text-slate-900 dark:text-white">
        No plans match these filters
      </p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Some combinations of region, data and duration don&apos;t exist in our catalog.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-5 inline-flex items-center rounded-xl bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 px-4 py-2 text-sm font-semibold text-white transition"
      >
        Clear all filters
      </button>
    </div>
  );
}

function CardsSkeleton() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
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