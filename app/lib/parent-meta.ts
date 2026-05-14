/**
 * Parent product metadata. Each variation in the data only carries pricing
 * and attribute values — these per-product fields (features, savings %)
 * come from the parent product's postmeta (the first JSON you extracted).
 *
 * Keep this in code so the UI can render rich cards even though the
 * variations JSON is intentionally lean.
 */

export type ParentMeta = {
  id: number;
  name: string;
  slug: string;
  tagline: string;
  features: string[];
  badges: string[];       // small chips under the title
  saveVsRoaming: number;  // percent
};

export const PARENT_META: Record<number, ParentMeta> = {
  586: {
    id: 586,
    name: "Orbit Explore",
    slug: "orbit-explore",
    tagline: "Perfect for short trips, city breaks and quick reunions.",
    features: [
      "5G Ready",
      "Instant activation (eSIM)",
      "24/7 Support",
      "Data Only",
      "No Contract",
      "Top-up Anytime",
    ],
    badges: ["eSIM", "pSIM"],
    saveVsRoaming: 64,
  },
  616: {
    id: 616,
    name: "Orbit Roam",
    slug: "orbit-roam",
    tagline: "Ideal for multi-country tours and long stays.",
    features: [
      "5G Ready",
      "Instant activation (eSIM)",
      "24/7 Support",
      "Data Only",
      "No Contract",
      "Top-up Anytime",
    ],
    badges: ["eSIM", "pSIM"],
    saveVsRoaming: 45,
  },
  628: {
    id: 628,
    name: "Orbit Wild",
    slug: "orbit-wild",
    tagline: "Tailored for safaris, jungle treks, and remote eco-retreats.",
    features: [
      "5G Ready",
      "Instant activation (eSIM)",
      "24/7 Support",
      "Data Only",
      "No Contract",
      "Top-up Anytime",
    ],
    badges: ["eSIM", "pSIM"],
    saveVsRoaming: 38,
  },
  720: {
    id: 720,
    name: "Orbit Group",
    slug: "orbit-group",
    tagline: "Pooled data for groups — up to 5 devices.",
    features: [
      "5G Ready",
      "Instant activation (eSIM)",
      "24/7 Support",
      "Data Only",
      "No Contract",
      "Top-up Anytime",
    ],
    badges: ["eSIM", "pSIM"],
    saveVsRoaming: 26,
  },
};