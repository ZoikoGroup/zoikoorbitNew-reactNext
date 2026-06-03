// app/lib/search-index.ts
export type SearchEntry = {
  name: string;
  slug: string;
  keywords?: string[];
  group?: string;
};

export const searchIndex: SearchEntry[] = [
  { name: "Home", slug: "/", group: "Pages" },
  { name: "About Us", slug: "/about-us", group: "Pages" },
  { name: "Plans", slug: "/plans", keywords: ["pricing", "esim", "packages"], group: "Pages" },
  { name: "Support", slug: "/support", keywords: ["help", "contact", "faq"], group: "Pages" },
  { name: "For Personal Travelers", slug: "/personal-travelers", keywords: ["individuals"], group: "Solutions" },
  { name: "For Enterprises", slug: "/enterprises", keywords: ["business", "enterprise"], group: "Solutions" },
  { name: "For Ecosystem Partners", slug: "/travel-ecosystem-partner", group: "Solutions" },
  { name: "Travelers", slug: "/travelers", group: "Ecosystem Partners" },
  { name: "Businesses & Enterprises", slug: "/businesses-enterprises", group: "Ecosystem Partners" },
  { name: "Travel Partner & Agencies", slug: "/travel-partners-agencies", group: "Ecosystem Partners" },
  { name: "Our Impact", slug: "/our-impact", group: "Ecosystem Partners" },
  { name: "Checkout", slug: "/checkout", keywords: ["cart"], group: "Pages" },
];