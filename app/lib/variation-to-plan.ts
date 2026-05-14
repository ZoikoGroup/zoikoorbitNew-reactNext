import type { Variation } from "./types";
import type { Plan } from "@/components/BuyPlanModal";
import { PARENT_META } from "./parent-meta";

/**
 * Convert one of our WooCommerce variation rows into the `Plan` shape
 * expected by BuyPlanModal. Lossy by design — we keep the variation_id
 * as the unique plan id and stuff the attribute combo into the name so
 * the modal/cart show what the user actually picked.
 */
export function variationToPlan(v: Variation): Plan {
  const meta = PARENT_META[v.parent_id];
  const price = (v.price ?? 0).toString();
  const regular = (v.regular_price ?? v.price ?? 0).toString();
  const sale = v.sale_price != null ? v.sale_price.toString() : null;

  // Duration in days, parsed from the duration label ("8 days" → 8)
  const durationMatch = v.attributes.duration.label.match(/(\d+)/);
  const durationDays = durationMatch ? parseInt(durationMatch[1], 10) : 0;

  const fullName = [
    v.parent_name,
    "—",
    v.attributes.data_allowance.label,
    "•",
    v.attributes.countries.label,
    "•",
    v.attributes.duration.label,
  ].join(" ");

  return {
    id: v.variation_id,
    bqPlanID: String(v.variation_id),
    slug: `${v.parent_slug}-${v.variation_id}`,
    name: fullName,
    short_description: meta?.tagline ?? "",
    price: regular,
    sale_price: sale,
    price_24: null,
    final_price: v.price ?? 0,
    duration_days: durationDays,
    is_popular: false,
    is_active: v.stock_status === "instock",
    category: {
      id: v.parent_id,
      name: v.parent_name,
      slug: v.parent_slug,
    },
    features: (meta?.features ?? []).map((title, i) => ({
      id: i + 1,
      title,
    })),
  };
}