// Types matching the structure of /public/data/variations.json

export type SlugLabel = {
  slug: string;
  label: string;
};

export type ProductOption = {
  id: number;
  name: string;
};

export type Variation = {
  variation_id: number;
  parent_id: number;
  parent_name: string;
  parent_slug: string;
  menu_order: number;
  link: string;
  sku_excerpt: string;
  stock_status: string;
  price: number | null;
  regular_price: number | null;
  sale_price: number | null;
  india_price: number | null;
  thumbnail_id: number | null;
  attributes: {
    countries: SlugLabel;
    data_allowance: SlugLabel;
    duration: SlugLabel;
  };
};

export type VariationsFile = {
  meta: {
    source: string;
    parents: number[];
    variation_count: number;
  };
  filter_options: {
    countries: SlugLabel[];
    data_allowance: SlugLabel[];
    duration: SlugLabel[];
    products: ProductOption[];
  };
  variations: Variation[];
};

// UI-level filter state. Single-select per facet (matching the screenshot's radio behaviour)
export type Filters = {
  region: string | null;        // country slug (e.g. "europe-uk")
  dataBucket: string | null;    // bucket slug (e.g. "1-5gb")
  duration: string | null;      // duration slug (e.g. "15-days")
};

// Data-allowance buckets — the screenshot groups individual sizes into ranges
export type DataBucket = {
  slug: string;
  label: string;
  min: number;   // GB, inclusive
  max: number;   // GB, inclusive
};

export const DATA_BUCKETS: DataBucket[] = [
  { slug: "1-5gb",   label: "1-5 GB",   min: 0,  max: 5  },
  { slug: "6-10gb",  label: "6-10 GB",  min: 6,  max: 10 },
  { slug: "11-20gb", label: "11-20 GB", min: 11, max: 20 },
  { slug: "21-30gb", label: "21-30 GB", min: 21, max: 30 },
];

// Convert "0.5GB", "1GB", "12GB" etc. into a GB number
export function dataLabelToGB(label: string): number {
  const m = label.match(/^([\d.]+)\s*GB$/i);
  return m ? parseFloat(m[1]) : 0;
}

export function bucketForVariation(v: Variation): DataBucket | null {
  const gb = dataLabelToGB(v.attributes.data_allowance.label);
  return DATA_BUCKETS.find((b) => gb >= b.min && gb <= b.max) ?? null;
}