import type { Filters, Variation } from "./types";
import { bucketForVariation } from "./types";
import { regionBySlug } from "./regions";

/** Apply the three active filters to the full variations list. */
export function applyFilters(
  variations: Variation[],
  filters: Filters
): Variation[] {
  const region = regionBySlug(filters.region);
  const allowedCountrySlugs = region ? new Set(region.countrySlugs) : null;

  return variations.filter((v) => {
    if (allowedCountrySlugs && !allowedCountrySlugs.has(v.attributes.countries.slug)) {
      return false;
    }
    if (filters.dataBucket) {
      const b = bucketForVariation(v);
      if (!b || b.slug !== filters.dataBucket) return false;
    }
    if (filters.duration && v.attributes.duration.slug !== filters.duration) {
      return false;
    }
    return true;
  });
}

export type SortKey = "price-asc" | "price-desc" | "data-desc";

export function sortVariations(variations: Variation[], key: SortKey): Variation[] {
  const arr = [...variations];
  const gb = (v: Variation) => {
    const m = v.attributes.data_allowance.label.match(/^([\d.]+)/);
    return m ? parseFloat(m[1]) : 0;
  };
  switch (key) {
    case "price-asc":
      arr.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      break;
    case "price-desc":
      arr.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      break;
    case "data-desc":
      arr.sort((a, b) => gb(b) - gb(a));
      break;
  }
  return arr;
}