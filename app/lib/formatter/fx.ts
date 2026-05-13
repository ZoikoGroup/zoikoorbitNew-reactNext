// FX rate client. Server-side cached via /api/fx-rates. We charge USD on
// Stripe, so this is for DISPLAY only — convert USD → user's chosen
// presentment currency for what they see on screen.

export interface FxRates {
  base: "USD";
  rates: Record<string, number>; // e.g. { eur: 0.92, gbp: 0.79, ... }
  fetchedAt: string;             // ISO timestamp
  source: string;                // provider name
}

/** Browser-side fetch with one-hour memory cache to avoid spamming the API. */
let _cache: { value: FxRates; expires: number } | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000;

export async function getRates(): Promise<FxRates> {
  if (_cache && _cache.expires > Date.now()) {
    return _cache.value;
  }
  const res = await fetch("/api/fx-rates");
  if (!res.ok) {
    throw new Error(`fx-rates fetch failed: ${res.status}`);
  }
  const value = (await res.json()) as FxRates;
  _cache = { value, expires: Date.now() + CACHE_TTL_MS };
  return value;
}

/** Convert a USD amount to the target currency. Returns USD if rate missing. */
export function convertFromUsd(
  usdAmount: number,
  targetCode: string,
  rates: FxRates
): number {
  if (targetCode === "usd") return usdAmount;
  const r = rates.rates[targetCode];
  if (!r || r <= 0) return usdAmount; // fallback: no conversion
  return usdAmount * r;
}