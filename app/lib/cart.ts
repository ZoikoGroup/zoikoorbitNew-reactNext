// Cart helpers — read/write the localStorage cart and notify listeners.
// The cart key must match whatever BuyPlanModal writes to. We currently use
// "zo_checkout" which is the BuyPlanModal default.

export const CART_KEY = "zo_checkout";

/** Raw shape of one cart line as written by BuyPlanModal. We're lenient about
 *  fields because users may have stale carts in their browser from earlier
 *  versions of the modal. */
export interface RawCartItem {
  planId?: number | string | null;
  bqPlanID?: string | null;
  planSlug?: string | null;
  planName?: string | null;
  planTitle?: string | null;
  price?: string | number | null;
  salePrice?: string | number | null;
  finalPrice?: number | null;
  durationDays?: number | null;
  category?: { id: number; name: string; slug: string } | null;
  features?: { id: number; title: string }[];

  // SIM-related
  simType?: string | null;          // "esim" | "psim"
  setupType?: string | null;        // "new-sim" | "keep-number"
  imei?: string | null;
  device?: unknown;
  esimCompatible?: boolean | null;

  // Misc
  qty?: number;
  timestamp?: number;
  [key: string]: unknown;
}

export function readCart(): RawCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as RawCartItem[]) : [];
  } catch {
    return [];
  }
}

export function writeCart(items: RawCartItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  // Notify other components in the same tab (header badge, etc.)
  window.dispatchEvent(new Event("cart:updated"));
}

export function clearCart(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event("cart:updated"));
}

export function removeCartLine(index: number): void {
  const items = readCart();
  if (index < 0 || index >= items.length) return;
  items.splice(index, 1);
  writeCart(items);
}

/** True if any line in the cart is a physical SIM (needs shipping). */
export function cartHasPhysicalSim(items: RawCartItem[]): boolean {
  return items.some((i) => (i.simType ?? "").toLowerCase() === "psim");
}