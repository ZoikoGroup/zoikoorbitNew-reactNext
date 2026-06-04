import { NextResponse } from "next/server";

/**
 * POST /api/malima/usage-report
 *
 * Server-side proxy for Orange API 1.3:
 *   POST https://api.orange.com/dub/v2/usageReport
 *   Auth: OAuth2 Bearer (same ORANGE_CLIENT_ID / ORANGE_CLIENT_SECRET as create-order)
 *
 * Request body:  { msisdn: string }
 * Response:      { success, msisdn, dataBalance: { remaining, consumed, total, unit } }
 *
 * The Orange bearer token is kept server-side and never sent to the browser.
 *
 * Env vars (already set for create-order route — no new vars needed):
 *   ORANGE_CLIENT_ID
 *   ORANGE_CLIENT_SECRET
 *   ORANGE_AUTH_URL          — default: https://api.orange.com/oauth/v3/token
 *   ORANGE_USAGE_REPORT_URL  — default: https://api.orange.com/dub/v2/usageReport
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// ── In-process token cache (shared pattern with create-order) ────────────────
interface TokenCache { accessToken: string; expiresAt: number }
let _token: TokenCache | null = null;

async function getBearerToken(): Promise<string> {
  if (_token && _token.expiresAt > Date.now() + 60_000) return _token.accessToken;

  const clientId     = process.env.ORANGE_CLIENT_ID;
  const clientSecret = process.env.ORANGE_CLIENT_SECRET;
  const authUrl      = process.env.ORANGE_AUTH_URL || "https://api.orange.com/oauth/v3/token";

  if (!clientId || !clientSecret) {
    throw new Error("ORANGE_CLIENT_ID / ORANGE_CLIENT_SECRET not set.");
  }

  const res = await fetch(authUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "client_credentials", client_id: clientId, client_secret: clientSecret }).toString(),
  });

  const json = (await res.json().catch(() => ({}))) as {
    access_token?: string; expires_in?: number; error?: string; error_description?: string;
  };

  if (!res.ok || !json.access_token) {
    throw new Error(`Orange auth failed (${res.status}): ${json.error_description || json.error || "unknown"}`);
  }

  _token = { accessToken: json.access_token, expiresAt: Date.now() + (json.expires_in ?? 3600) * 1000 };
  return _token.accessToken;
}

// ── Handler ──────────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  let body: { msisdn?: string };
  try { body = await req.json(); }
  catch { return NextResponse.json({ success: false, message: "Invalid JSON body" }, { status: 400 }); }

  const msisdn = (body.msisdn || "").trim();
  if (!msisdn) {
    return NextResponse.json({ success: false, message: "'msisdn' is required." }, { status: 400 });
  }

  let token: string;
  try { token = await getBearerToken(); }
  catch (err) {
    const msg = err instanceof Error ? err.message : "Token error";
    console.error("❌ usage-report auth error:", msg);
    return NextResponse.json({ success: false, message: msg }, { status: 502 });
  }

  const endpoint = process.env.ORANGE_USAGE_REPORT_URL || "https://api.orange.com/dub/v2/usageReport";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
      body: JSON.stringify({ msisdn }),
      // Don't cache — usage data changes in near-real-time
      cache: "no-store",
    });

    const text = await res.text();
    let data: unknown;
    try { data = text ? JSON.parse(text) : null; } catch { data = text; }

    if (!res.ok) {
      console.error(`❌ Orange usage-report (${res.status}):`, data);
      return NextResponse.json({ success: false, message: `Orange returned ${res.status}`, response: data });
    }

    // Orange response: { msisdn, dataBalance: { remaining, consumed, total, unit } }
    return NextResponse.json({ success: true, ...(data as object) });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Network error";
    console.error("❌ usage-report network error:", msg);
    return NextResponse.json({ success: false, message: msg }, { status: 502 });
  }
}