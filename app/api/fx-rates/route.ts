import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface CacheEntry {
  body: unknown;
  expires: number;
}

let _cache: CacheEntry | null = null;
const TTL_MS = 60 * 60 * 1000;

interface UpstreamResponse {
  base?: string;
  rates?: Record<string, number>;
  date?: string;
}

/**
 * GET /api/fx-rates
 * Returns { base: "USD", rates: { eur: 0.92, ... }, fetchedAt, source }.
 * Used for DISPLAY only — Stripe charges USD; the user's bank does the conversion.
 */
export async function GET() {
  if (_cache && _cache.expires > Date.now()) {
    return NextResponse.json(_cache.body, { headers: { "x-cache": "HIT" } });
  }

  try {
    const key = process.env.FX_API_KEY;
    const url = new URL("https://api.exchangerate.host/latest");
    url.searchParams.set("base", "USD");
    if (key) url.searchParams.set("access_key", key);

    const res = await fetch(url.toString(), {
      ...({ next: { revalidate: 3600 } } as unknown as RequestInit),
    });

    if (!res.ok) throw new Error(`upstream ${res.status}`);
    const data = (await res.json()) as UpstreamResponse;
    if (!data.rates || typeof data.rates !== "object") {
      throw new Error("malformed upstream response");
    }

    const normalisedRates: Record<string, number> = {};
    for (const [code, rate] of Object.entries(data.rates)) {
      if (typeof rate === "number") normalisedRates[code.toLowerCase()] = rate;
    }

    const body = {
      base: "USD",
      rates: normalisedRates,
      fetchedAt: new Date().toISOString(),
      source: "exchangerate.host",
    };

    _cache = { body, expires: Date.now() + TTL_MS };
    return NextResponse.json(body, { headers: { "x-cache": "MISS" } });
  } catch (err) {
    console.error("[fx-rates] upstream error:", err);
    if (_cache) {
      return NextResponse.json(_cache.body, { headers: { "x-cache": "STALE" } });
    }
    // Fail open with empty rates — checkout still renders, displays USD verbatim.
    return NextResponse.json(
      {
        base: "USD",
        rates: {},
        fetchedAt: new Date().toISOString(),
        source: "fallback-empty",
      },
      { status: 200 }
    );
  }
}