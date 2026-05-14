import { NextResponse } from "next/server";

/**
 * Save Malima/Orange order activity to the Django backend.
 *
 * This is a thin server-side proxy that forwards the full Malima response
 * (per-SIM order ids, msisdn/imsi/iccid, raw request/response) to:
 *   POST {DJANGO_API_BASE_URL}/api/v1/malima-orders/
 *
 * Why a proxy and not a direct browser → Django call?
 *   • Keeps the Django auth token (if any) server-side.
 *   • Lets us add request enrichment (timestamp, source tag, idempotency key)
 *     without touching the checkout component.
 *   • Centralises retries / error handling.
 *
 * Env vars:
 *   DJANGO_API_BASE_URL          — e.g. https://api.zoiko.example
 *   DJANGO_API_TOKEN             — optional bearer/api token
 *   DJANGO_MALIMA_ORDER_PATH     — defaults to /api/v1/malima-orders/
 *
 * NOTE: NEXT_PUBLIC_API_BASE_URL is also accepted as a fallback so existing
 * deployments that only set the public var keep working.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const base =
    process.env.DJANGO_API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "";
  if (!base) {
    return NextResponse.json(
      {
        success: false,
        message:
          "DJANGO_API_BASE_URL (or NEXT_PUBLIC_API_BASE_URL) is not configured.",
      },
      { status: 500 }
    );
  }

  const path =
    process.env.DJANGO_MALIMA_ORDER_PATH || "/api/v1/malima-orders/";
  const url = base.replace(/\/$/, "") + path;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (process.env.DJANGO_API_TOKEN) {
    headers.Authorization = `Token ${process.env.DJANGO_API_TOKEN}`;
  }

  // Enrich the payload with a server timestamp and source tag so the Django
  // side can audit where each record came from without trusting the client.
  const enriched = {
    source: "zoiko-orbit-checkout",
    captured_at: new Date().toISOString(),
    data: payload,
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(enriched),
    });
    const text = await res.text();
    let body: unknown;
    try {
      body = text ? JSON.parse(text) : null;
    } catch {
      body = text;
    }

    if (!res.ok) {
      console.error(`❌ Django save-malima-order failed (${res.status}):`, body);
      return NextResponse.json(
        {
          success: false,
          message: `Django returned ${res.status}`,
          response: body,
        },
        { status: 200 } // surface to client; let checkout decide
      );
    }

    return NextResponse.json({
      success: true,
      message: "Malima order saved to Django.",
      response: body,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Network error";
    console.error("❌ Django save-malima-order network error:", msg);
    return NextResponse.json(
      { success: false, message: msg },
      { status: 502 }
    );
  }
}
