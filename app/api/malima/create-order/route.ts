import { NextResponse } from "next/server";

/**
 * Malima / Orange IoT — Create Product Order
 * ------------------------------------------
 *
 * Server-side route that:
 *   1. Obtains an OAuth2 Bearer token from Orange (client_credentials grant)
 *      and caches it in memory until expiry (-60s safety buffer).
 *   2. Builds a `productOrders` payload (`action: "add"`) per cart item,
 *      mirroring the spec from the handover doc (API 1.1) and the existing
 *      WordPress plugin's `build_orderItem_node`.
 *   3. POSTs one request per SIM to
 *      https://api.orange.com/iot-wholesale-data-supervision/v1/productOrders/
 *   4. Returns an aggregated response with one entry per cart item.
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
  /** Data allowance in MB. The handover doc uses "0.2" (GB-as-string for fairUseVolume CO);
   *  the WP plugin normalises GB→MB. We accept either and forward as a string. */
  dataVolume?: number | string | null;
  /** Roaming zone, e.g. "Europe", "France". */
  roamingZone?: string | null;
  /** SIM identifiers — required by Orange. If your SIM inventory lives elsewhere
   *  (e.g. Django), populate these before calling this route. */
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
  // Reuse if still valid (60s safety buffer)
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

  // Orange supports either Basic-auth + grant_type, or form-encoded credentials.
  // The WP plugin uses form-encoded body — match it for consistency.
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  });

  const res = await fetch(authUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: body.toString(),
  });

  const text = await res.text();
  let data: { access_token?: string; expires_in?: number; error?: string };
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Orange OAuth2 returned non-JSON (${res.status}): ${text.slice(0, 200)}`);
  }

  if (!res.ok || !data.access_token) {
    throw new Error(
      `Orange OAuth2 failed (${res.status}): ${data.error || text.slice(0, 200)}`
    );
  }

  const expiresInMs = (Number(data.expires_in) || 3600) * 1000;
  _cachedToken = {
    accessToken: data.access_token,
    expiresAt: Date.now() + expiresInMs,
  };
  return data.access_token;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function todayISO(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
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
 * Build a single orderItem node — matches API 1.1 spec exactly.
 * Mirrors the WP plugin's `build_orderItem_node`.
 */
function buildOrderItem(item: CartItemInput, startDate: string) {
  const durationDays = parseDurationDays(item.durationDays);
  const endDate = addDaysISO(startDate, durationDays);
  const zone = item.roamingZone || "Europe";
  // Volume is forwarded as a string — Orange accepts both GB-as-decimal ("0.2")
  // and integer MB ("2048") depending on the offer. We do not coerce units.
  const volume =
    item.dataVolume == null || item.dataVolume === ""
      ? "0.2"
      : String(item.dataVolume);

  return {
    id: "",
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
          nextReset: "",
          fairUseVolume: "CO",
          addedBucket: [
            {
              zone,
              type: "current",
              volume,
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
  // Same gate the WP plugin uses (only esim/psim).
  const eligible = cart
    .map((item, cartIndex) => ({ item, cartIndex }))
    .filter(({ item }) => {
      const t = (item.simType || "").toLowerCase();
      return t === "esim" || t === "psim";
    });

  if (eligible.length === 0) {
    // Not an error — just nothing to do for Orange.
    return NextResponse.json({
      status: true,
      message: "No eSIM/pSIM items in cart — Malima/Orange skipped.",
      results: [],
    });
  }

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

  // Fire all create-order calls in parallel — Orange supports this and the WP
  // plugin uses Requests::request_multiple for the same reason.
  const tasks = eligible.flatMap(({ item, cartIndex }) => {
    const qty = Math.max(1, Number(item.qty) || 1);
    return Array.from({ length: qty }, (_, unitIndex) => ({
      cartIndex,
      unitIndex,
      item,
    }));
  });

  const results: MalimaResult[] = await Promise.all(
    tasks.map(async ({ item, cartIndex }) => {
      const requestBody = {
        id: "",
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
    // We still return 200 even on partial failure so the client can inspect
    // each result and decide what to do per item; the `status` flag is the
    // boolean the checkout flow checks.
    { status: 200 }
  );
}
