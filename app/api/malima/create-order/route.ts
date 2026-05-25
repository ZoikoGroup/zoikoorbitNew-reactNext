import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

/**
 * Malima / Orange IoT — Create Product Order
 * ------------------------------------------
 *
 * Server-side route that:
 *   1. Obtains an OAuth2 Bearer token from Orange (client_credentials grant)
 *      and caches it in memory until expiry (-60s safety buffer).
 *   2. Builds a `productOrders` payload (`action: "add"`) per cart item,
 *      mirroring the WordPress plugin's `build_orderItem_node` (which is the
 *      only version we know Orange historically accepts) — with two
 *      modernisations forced by Orange's tightened validation:
 *         a) addedBucket.type = "recurring"  (was "current")
 *         b) addedBucket.nextReset = endDate (was "")
 *   3. POSTs one request per SIM to
 *      https://api.orange.com/iot-wholesale-data-supervision/v1/productOrders/
 *   4. Returns an aggregated response with one entry per cart item.
 *
 * Volume convention
 * -----------------
 * The WP plugin sends `addedBucket.volume` as a string of **megabytes**
 *   ("2000" means 2 GB, "500" means 500 MB)
 * — see `class-malima-api-client.php::build_orange_item` line ~1328:
 *   `$data_volume = $value * 1000;  // convert GB → MB`
 * The caller (`utils/malimaOrangeApi.ts::toMalimaCart`) is now responsible
 * for normalising to MB. This route forwards the value as-is.
 *
 * Why server-side: the Bearer token must NEVER reach the browser.
 * `ORANGE_CLIENT_ID` and `ORANGE_CLIENT_SECRET` are server-only env vars.
 *
 * Env vars (set in .env.local — DO NOT commit):
 *   ORANGE_CLIENT_ID         — OAuth2 client id
 *   ORANGE_CLIENT_SECRET     — OAuth2 client secret
 *   ORANGE_AUTH_URL          — defaults to https://api.orange.com/oauth/v3/token
 *   ORANGE_CREATE_ORDER_URL  — defaults to
 *     https://api.orange.com/iot-wholesale-data-supervision/v1/productOrders/
 *   MALIMA_MODE              — "mock" | "sandbox" | "production" (default)
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// ── Types ────────────────────────────────────────────────────────────────────

interface CartItemInput {
  /** Local plan id (BeQuick or WP). Pass through unchanged. */
  planId?: string | number | null;
  bqPlanID?: string | null;
  planName?: string | null;
  planTitle?: string | null;
  simType?: string | null;           // "eSIM" | "pSIM" | other
  /** Plan duration in days. Either a number or a string like "30 Days". */
  durationDays?: number | string | null;
  /** Data allowance in **MB** (string). Aligned with the WP plugin. */
  dataVolume?: number | string | null;
  /** Roaming zone, e.g. "Europe", "France". */
  roamingZone?: string | null;
  /** SIM identifiers — required by Orange. */
  msisdn?: string | null;
  imsi?: string | null;
  iccid?: string | null;
  /** Quantity (each unit → one Orange order). Defaults to 1. */
  qty?: number;
}

interface IncomingBody {
  cart: CartItemInput[];
  /** Optional override start date (YYYY-MM-DD). Defaults to today. */
  startDate?: string;
}

interface MalimaResult {
  cartIndex: number;
  planId: string | number | null;
  simType: string | null;
  status: number;
  ok: boolean;
  request: Record<string, unknown>;
  response: unknown;
  orangeOrderId?: string;
  msisdn?: string | null;
  imsi?: string | null;
  iccid?: string | null;
  error?: string;
}

// ── OAuth2 token cache (in-memory; per server instance) ──────────────────────

interface CachedToken {
  accessToken: string;
  expiresAt: number; // epoch ms
}

let _cachedToken: CachedToken | null = null;

async function getOrangeAccessToken(): Promise<string> {
  if (_cachedToken && _cachedToken.expiresAt > Date.now() + 60_000) {
    return _cachedToken.accessToken;
  }

  const clientId = process.env.ORANGE_CLIENT_ID;
  const clientSecret = process.env.ORANGE_CLIENT_SECRET;
  const authUrl =
    process.env.ORANGE_AUTH_URL || "https://api.orange.com/oauth/v3/token";

  if (!clientId || !clientSecret) {
    throw new Error(
      "ORANGE_CLIENT_ID / ORANGE_CLIENT_SECRET must be set in the server env."
    );
  }

  const params = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  });

  const res = await fetch(authUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
  const json = (await res.json().catch(() => ({}))) as {
    access_token?: string;
    expires_in?: number;
    error_description?: string;
    error?: string;
  };
  if (!res.ok || !json.access_token) {
    throw new Error(
      `Orange auth failed (${res.status}): ${json.error_description || json.error || "unknown"}`
    );
  }

  _cachedToken = {
    accessToken: json.access_token,
    expiresAt: Date.now() + (json.expires_in ?? 3600) * 1000,
  };
  return _cachedToken.accessToken;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function addDaysISO(startISO: string, days: number): string {
  const d = new Date(startISO + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function parseDurationDays(raw: unknown): number {
  if (raw == null) return 7; // doc default
  if (typeof raw === "number" && Number.isFinite(raw)) return Math.max(1, Math.round(raw));
  const digits = String(raw).replace(/\D/g, "");
  const n = parseInt(digits, 10);
  return Number.isFinite(n) && n > 0 ? n : 7;
}

/**
 * Normalise volume to a string of **megabytes**. Matches the WP plugin.
 *
 *   - Numbers and numeric strings are assumed to be MB already (caller's job).
 *   - Strings like "2GB", "500MB", "2 GB", "1gb" are normalised here as a
 *     belt-and-braces safety net in case a caller forgets to normalise.
 *   - Default fallback is "200" (200 MB ≈ 0.2 GB, matching the old default).
 */
function normaliseVolumeMB(raw: unknown): string {
  if (raw == null || raw === "") return "200";
  // Pure number or numeric string → trust it's MB.
  if (typeof raw === "number" && Number.isFinite(raw)) {
    return String(Math.max(0, Math.round(raw)));
  }
  const s = String(raw).trim();
  // Numeric-only string ("2000", "500", "0.2") — convert GB-decimal to MB if < 50.
  // Anything below 50 is implausible as MB for a plan; assume GB.
  if (/^\d+(\.\d+)?$/.test(s)) {
    const n = parseFloat(s);
    if (!Number.isFinite(n) || n <= 0) return "200";
    if (n < 50) return String(Math.round(n * 1000));   // GB → MB
    return String(Math.round(n));                       // already MB
  }
  const m = s.toUpperCase().replace(/\s+/g, "").match(/^(\d+(?:\.\d+)?)(GB|MB|G|M)?$/);
  if (m) {
    const val = parseFloat(m[1]);
    const unit = (m[2] || "GB").toUpperCase();
    if (unit.startsWith("M")) return String(Math.round(val));
    return String(Math.round(val * 1000));
  }
  return "200";
}

/**
 * Build a single orderItem node — mirrors the WP plugin's
 * `build_orderItem_node`, with two modernisations:
 *   • `addedBucket.type = "recurring"`  (Orange rejected "current")
 *   • `addedBucket.nextReset = endDate` (required for recurring buckets)
 */
function buildOrderItem(item: CartItemInput, startDate: string) {
  const durationDays = parseDurationDays(item.durationDays);
  const endDate = addDaysISO(startDate, durationDays);
  const zone = item.roamingZone || "Europe";
  const volumeMB = normaliseVolumeMB(item.dataVolume);

  return {
    // Client-supplied idempotency key per item. Orange isn't strict about it
    // today, but having one makes retries safe and order tracing easier.
    id: randomUUID(),
    action: "add",
    offerCode: "",
    status: "no offer",
    product: {
      productCharacteristic: {
        startDate,
        initialEndDate: "",
        endDate,
        realLifeDuration: durationDays,
        realLifeDurationUnit: "Day",
        firstUsageDate: "",
        roamingZones: zone,
        data: {
          frequency: String(durationDays),
          frequencyUnit: "Day",
          // "recurring" buckets must have a reset date. For a single-period
          // plan that's the same as the bucket's endDate.
          nextReset: endDate,
          fairUseVolume: "CO",
          addedBucket: [
            {
              zone,
              // Orange API rejects "current" with:
              //   "Bad API format : Bucket / type must be recurring"
              // The original WP plugin used "current" but Orange has tightened
              // validation — only "recurring" is accepted now.
              type: "recurring",
              volume: volumeMB,
              endDate,
            },
          ],
        },
        voice: { usingVoice: false },
        sms: { usingSms: false },
      },
      reliesOnProduct: {
        msisdn: item.msisdn || "",
        imsi: item.imsi || "",
        iccid: item.iccid || "",
      },
    },
  };
}

// ── Handler ──────────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  let body: IncomingBody;
  try {
    body = (await req.json()) as IncomingBody;
  } catch {
    return NextResponse.json(
      { status: false, message: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const cart = Array.isArray(body.cart) ? body.cart : [];
  if (cart.length === 0) {
    return NextResponse.json(
      { status: false, message: "Empty cart — nothing to send to Malima/Orange." },
      { status: 400 }
    );
  }

  const startDate = body.startDate || todayISO();
  const endpoint =
    process.env.ORANGE_CREATE_ORDER_URL ||
    "https://api.orange.com/iot-wholesale-data-supervision/v1/productOrders/";

  // Only SIM products go to Orange — skip topups, device protection, etc.
  const eligible = cart
    .map((item, cartIndex) => ({ item, cartIndex }))
    .filter(({ item }) => {
      const t = (item.simType || "").toLowerCase();
      return t === "esim" || t === "psim";
    });

  if (eligible.length === 0) {
    return NextResponse.json({
      status: true,
      message: "No eSIM/pSIM items in cart — Malima/Orange skipped.",
      results: [],
    });
  }

  const mode = (process.env.MALIMA_MODE || "production").toLowerCase();

  const tasks = eligible.flatMap(({ item, cartIndex }) => {
    const qty = Math.max(1, Number(item.qty) || 1);
    return Array.from({ length: qty }, (_, unitIndex) => ({
      cartIndex,
      unitIndex,
      item,
    }));
  });

  if (mode === "mock") {
    const results: MalimaResult[] = tasks.map(({ item, cartIndex }, i) => {
      const requestBody = {
        id: randomUUID(),
        orderItem: [buildOrderItem(item, startDate)],
      };
      const fakeId = `MOCK-${Date.now()}-${i}`;
      return {
        cartIndex,
        planId: item.planId ?? item.bqPlanID ?? null,
        simType: item.simType ?? null,
        status: 201,
        ok: true,
        request: requestBody,
        response: {
          id: fakeId,
          status: "acknowledged",
          mock: true,
          orderItem: [
            {
              id: `${fakeId}-item`,
              status: "acknowledged",
              product: {
                reliesOnProduct: {
                  msisdn: item.msisdn || "",
                  imsi: item.imsi || "",
                  iccid: item.iccid || "",
                },
              },
            },
          ],
        },
        orangeOrderId: fakeId,
        msisdn: item.msisdn ?? null,
        imsi: item.imsi ?? null,
        iccid: item.iccid ?? null,
      };
    });

    return NextResponse.json({
      status: true,
      message: `Mock mode — ${results.length} order(s) generated locally, Orange not contacted.`,
      mode: "mock",
      results,
    });
  }

  // ── Real call (sandbox or production) ────────────────────────────────────

  let token: string;
  try {
    token = await getOrangeAccessToken();
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Token error";
    console.error("❌ Malima auth error:", msg);
    return NextResponse.json(
      { status: false, message: "Malima/Orange auth failed", error: msg },
      { status: 502 }
    );
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };

  const results: MalimaResult[] = await Promise.all(
    tasks.map(async ({ item, cartIndex }) => {
      const requestBody = {
        id: randomUUID(),
        orderItem: [buildOrderItem(item, startDate)],
      };

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers,
          body: JSON.stringify(requestBody),
        });
        const text = await res.text();
        let parsed: unknown;
        try {
          parsed = text ? JSON.parse(text) : null;
        } catch {
          parsed = text;
        }

        const maybeOrangeId =
          parsed && typeof parsed === "object"
            ? (parsed as { id?: unknown }).id
            : undefined;
        const orangeOrderId =
          typeof maybeOrangeId === "string" ? maybeOrangeId : undefined;

        return {
          cartIndex,
          planId: item.planId ?? item.bqPlanID ?? null,
          simType: item.simType ?? null,
          status: res.status,
          ok: res.ok,
          request: requestBody,
          response: parsed,
          orangeOrderId,
          msisdn: item.msisdn ?? null,
          imsi: item.imsi ?? null,
          iccid: item.iccid ?? null,
          error: res.ok ? undefined : `HTTP ${res.status}`,
        };
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Network error";
        console.error(`❌ Malima create-order failed (cart #${cartIndex}):`, msg);
        return {
          cartIndex,
          planId: item.planId ?? item.bqPlanID ?? null,
          simType: item.simType ?? null,
          status: 0,
          ok: false,
          request: requestBody,
          response: null,
          msisdn: item.msisdn ?? null,
          imsi: item.imsi ?? null,
          iccid: item.iccid ?? null,
          error: msg,
        };
      }
    })
  );

  const anyFailed = results.some((r) => !r.ok);
  return NextResponse.json(
    {
      status: !anyFailed,
      message: anyFailed
        ? "One or more Malima/Orange orders failed."
        : "All Malima/Orange orders created.",
      results,
    },
    { status: 200 }
  );
}