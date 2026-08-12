import { NextResponse } from "next/server";

/**
 * Check service availability via the VCare / Lifeline enrollment API.
 *
 * POST /api/malima/check-coverage
 * Body: { zip_code: string; enrollment_type?: string }
 *
 * Env vars (set in .env.local — DO NOT commit):
 *   VCARE_AGENT_ID          — required; your portal agent identifier
 *   VCARE_ENROLLMENT_TYPE   — default enrollment type (default: "LIFELINE")
 *   VCARE_API_URL           — override the endpoint (optional)
 *                             default: https://www.vcareapi.com:8080/enrollment
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// ── VCare token cache ─────────────────────────────────────────────────────────

interface CachedToken {
  accessToken: string;
  expiresAt: number;
}

let _cachedToken: CachedToken | null = null;


async function getOrangeAccessToken(): Promise<string> {
  // if (_cachedToken && _cachedToken.expiresAt > Date.now() + 60_000) {
  //   return _cachedToken.accessToken;
  // }

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
  console.log("Access token",json.access_token);
  return json.access_token;
}

// ── Handler ───────────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  // ── 1. Parse & validate ───────────────────────────────────────────────────
  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const zipCode = payload.zip_code as string | undefined;
  if (!zipCode || !zipCode.trim()) {
    return NextResponse.json(
      { success: false, message: "zip_code is required." },
      { status: 400 }
    );
  }

  // ── 2. Env config ─────────────────────────────────────────────────────────
  const agentId = process.env.ORANGE_CLIENT_ID;
  if (!agentId) {
    return NextResponse.json(
      { success: false, message: "ORANGE_CLIENT_ID is not configured." },
      { status: 500 }
    );
  }

  const apiUrl =
    process.env.VCARE_API_URL || "https://www.vcareapi.com:8080/enrollment";

  const enrollmentType =
    (payload.enrollment_type as string | undefined) ||
    process.env.VCARE_ENROLLMENT_TYPE ||
    "LIFELINE";

  // ── 3. Build request headers ──────────────────────────────────────────────
  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(_cachedToken && _cachedToken.expiresAt > Date.now() + 60_000
      ? { Authorization: _cachedToken.accessToken }
      : {}),
  };

  // ── 4. Build VCare payload ────────────────────────────────────────────────
  const vcareBody = {
    action: "check_service_availability",
    zip_code: zipCode.trim(),
    enrollment_type: enrollmentType,
    is_enrollment: "Y",
    agent_id: agentId,
    external_transaction_id: `COV-${Date.now()}`,
    source: "WEBSITE",
  };

  // ── 5. Call VCare ─────────────────────────────────────────────────────────
  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(vcareBody),
    });

    const text = await res.text();
    let raw: unknown;
    try {
      raw = text ? JSON.parse(text) : null;
    } catch {
      raw = text;
    }

    if (!res.ok) {
      console.error(`❌ VCare check-coverage failed (${res.status}):`, raw);
      return NextResponse.json(
        { success: false, message: `VCare API returned ${res.status}`, response: raw },
        { status: 200 }
      );
    }

    // ── 6. Extract & cache the token ─────────────────────────────────────────
    const json = raw as {
      msg_code?: string;
      msg?: string;
      data?: Record<string, unknown>;
      token?: string;
      expires_in?: number;
    };

    const sessionToken = json.token
      ? getOrangeAccessToken()
      : null;

    const isSuccess = json.msg_code === "RESTAPI000";

    return NextResponse.json({
      success: isSuccess,
      message: json.msg ?? (isSuccess ? "Coverage available" : "Not available"),
      available: isSuccess,
      data: json.data ?? null,
      token: sessionToken,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Network error";
    console.error("❌ VCare check-coverage network error:", msg);
    return NextResponse.json(
      { success: false, message: msg },
      { status: 502 }
    );
  }
}