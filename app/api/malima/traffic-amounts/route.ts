import { NextResponse } from "next/server";

/**
 * GET /api/malima/traffic-amounts?subscriptionId=<msisdn>&billingCycle=CURRENT
 *
 * Server-side proxy for Orange Traffic Tracking REST API (from traffic-tracking-api.yaml):
 *   GET https://iosw-pbe-ba-rest.orange.com:443/{BU}/TrafficTrackingAPI-1/v1/subscriptions/{subscriptionId}/amounts
 *   Auth: HTTP Basic Auth (ORANGE_BASIC_USER / ORANGE_BASIC_PASS)
 *
 * Returns aggregated traffic amounts grouped by bearer_type (DATA, VOICE, SMS)
 * and call_origin_type (LOCAL, ROAMING) for the current or previous billing cycle.
 *
 * Response shape (from API spec):
 * {
 *   amounts: [{
 *     bearer_type: "DATA" | "VOICE" | "SMS",
 *     call_origin_type: "LOCAL" | "ROAMING",
 *     value: number,        // bytes or KB depending on volume_type
 *     volume_type: string,
 *     sessions_number: number,
 *     subscription_id: string,
 *     first_session_date_time: string,
 *     last_session_date_time: string,
 *   }],
 *   period: { start_date: string, end_date: string }
 * }
 *
 * Env vars:
 *   ORANGE_BASIC_USER        — Basic Auth username (from handover doc)
 *   ORANGE_BASIC_PASS        — Basic Auth password
 *   ORANGE_TT_BASE_URL       — base URL e.g. https://iosw-pbe-ba-rest.orange.com:443/MLM_EXT_IMC/TrafficTrackingAPI-1
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const subscriptionId = (url.searchParams.get("subscriptionId") || "").trim();
  const billingCycle   = (url.searchParams.get("billingCycle") || "CURRENT").toUpperCase();

  if (!subscriptionId) {
    return NextResponse.json({ success: false, message: "'subscriptionId' query param is required." }, { status: 400 });
  }
  if (!["CURRENT", "PREVIOUS"].includes(billingCycle)) {
    return NextResponse.json({ success: false, message: "'billingCycle' must be CURRENT or PREVIOUS." }, { status: 400 });
  }

  const user = process.env.ORANGE_BASIC_USER;
  const pass = process.env.ORANGE_BASIC_PASS;
  if (!user || !pass) {
    return NextResponse.json({ success: false, message: "ORANGE_BASIC_USER / ORANGE_BASIC_PASS not configured." }, { status: 500 });
  }

  const baseUrl = process.env.ORANGE_TT_BASE_URL ||
    "https://iosw-pbe-ba-rest.orange.com:443/MLM_EXT_IMC/TrafficTrackingAPI-1";

  const endpoint = `${baseUrl}/v1/subscriptions/${encodeURIComponent(subscriptionId)}/amounts?billingCycle=${billingCycle}`;
  const credentials = Buffer.from(`${user}:${pass}`).toString("base64");

  try {
    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Basic ${credentials}`,
      },
      cache: "no-store",
    });

    const text = await res.text();
    let data: unknown;
    try { data = text ? JSON.parse(text) : null; } catch { data = text; }

    if (!res.ok) {
      console.error(`❌ Orange traffic-amounts (${res.status}):`, data);
      return NextResponse.json({ success: false, message: `Orange returned ${res.status}`, response: data });
    }

    return NextResponse.json({ success: true, ...(data as object) });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Network error";
    console.error("❌ traffic-amounts network error:", msg);
    return NextResponse.json({ success: false, message: msg }, { status: 502 });
  }
}