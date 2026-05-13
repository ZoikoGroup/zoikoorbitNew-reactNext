import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface CacheEntry {
  body: unknown;
  expires: number;
}

let _cache: CacheEntry | null = null;
const TTL_MS = 60 * 60 * 1000; // 1 hour

export async function GET() {
  if (_cache && _cache.expires > Date.now()) {
    return NextResponse.json(_cache.body, { headers: { "x-cache": "HIT" } });
  }

  try {
    // Frankfurter: free, no key, actively maintained
    const res = await fetch(
      "https://api.frankfurter.app/latest?from=USD",
      { next: { revalidate: 3600 } } as RequestInit
    );

    if (!res.ok) throw new Error(`upstream ${res.status}`);

    const data = await res.json() as { base: string; rates: Record<string, number> };
    if (!data.rates || typeof data.rates !== "object") {
      throw new Error("malformed upstream response");
    }

    // Normalise keys to lowercase; Frankfurter already uses uppercase (EUR, GBP…)
    const normalisedRates: Record<string, number> = { usd: 1 }; // base is USD
    for (const [code, rate] of Object.entries(data.rates)) {
      normalisedRates[code.toLowerCase()] = rate;
    }

    const body = {
      base: "USD",
      rates: normalisedRates,
      fetchedAt: new Date().toISOString(),
      source: "frankfurter.app",
    };

    _cache = { body, expires: Date.now() + TTL_MS };
    return NextResponse.json(body, { headers: { "x-cache": "MISS" } });

  } catch (err) {
    console.error("[fx-rates] upstream error:", err);
    if (_cache) {
      return NextResponse.json(_cache.body, { headers: { "x-cache": "STALE" } });
    }
    return NextResponse.json(
      { base: "USD", rates: { usd: 1 }, fetchedAt: new Date().toISOString(), source: "fallback" },
      { status: 200 }
    );
  }
}