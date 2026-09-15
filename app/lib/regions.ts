import type { SlugLabel } from "./types";

/**
 * The screenshot shows a "Regions" facet with friendly names like
 * "Rest of Africa", "Asia", "Rest of Asia", "Middle East & CIS",
 * "Rest of Middle East", "Australia & New Zealand", "Pacific Islands" etc.
 *
 * Our underlying variation data uses WordPress slugs like
 * "africa-main", "premium-africa", "middle-east-cis-main", "premium-middle-east".
 *
 * This module presents a single, clean Regions list to the UI and exposes a
 * helper to map a region slug -> the underlying country slugs it covers.
 */

export type Region = {
  slug: string;
  label: string;
  count: string;
  countrySlugs: string[];
};

export const REGIONS: Region[] = [
  { slug: "europe-uk", label: "Europe & UK", count: "31 countries", countrySlugs: ["europe-uk"] },
  { slug: "rest-of-europe", label: "Rest of Europe", count: "2 countries", countrySlugs: ["rest-of-europe-switzerland-andorra"] },
  { slug: "north-america", label: "North America", count: "3 countries", countrySlugs: ["north-america-usa-canada-mexico"] },
  { slug: "central-america-caribbean", label: "Central America & Caribbean", count: "35+ countries", countrySlugs: ["central-america-caribbean-main", "central-america-caribbean-premium-rest"] },
  { slug: "south-america", label: "South America", count: "12 countries", countrySlugs: ["south-america-main", "south-america-rest"] },
  { slug: "africa", label: "Africa", count: "30+ countries", countrySlugs: ["africa-main"] },
  { slug: "rest-of-africa", label: "Rest of Africa", count: "7+ countries", countrySlugs: ["premium-africa"] },
  { slug: "asia", label: "Asia", count: "15+ countries", countrySlugs: ["asia-main"] },
  { slug: "rest-of-asia", label: "Rest of Asia", count: "5 countries", countrySlugs: ["premium-asia"] },
  { slug: "middle-east-cis", label: "Middle East & CIS", count: "15+ countries", countrySlugs: ["middle-east-cis-main"] },
  { slug: "rest-of-middle-east", label: "Rest of Middle East", count: "3 countries", countrySlugs: ["premium-middle-east"] },
  { slug: "australia-new-zealand", label: "Australia & New Zealand", count: "2 countries", countrySlugs: ["australia-new-zealand"] },
  { slug: "pacific-islands", label: "Pacific Islands", count: "15+ countries", countrySlugs: ["pacific-islands"] },
];

export function regionBySlug(slug: string | null): Region | null {
  if (!slug) return null;
  return REGIONS.find((r) => r.slug === slug || r.countrySlugs.includes(slug)) ?? null;
}

/**
 * Given the country slugs that actually appear in the variations data,
 * return only the regions for which we have at least one mapped slug present.
 * Also annotate each region with the count of underlying countries it covers.
 */
export function buildRegionsForData(countryOptions: SlugLabel[]): Region[] {
  const present = new Set(countryOptions.map((c) => c.slug));
  return REGIONS.filter((r) => r.countrySlugs.some((s) => present.has(s)));
}