import { NextResponse } from "next/server";

/**
 * GET /api/malima/my-orders?email=customer@example.com
 *
 * Thin server-side proxy that forwards to Django:
 *   GET {DJANGO_API_BASE_URL}/api/v1/malima/my-orders/?email=...
 *
 * Auth model (per the dashboard design — "Pattern A"):
 *   • The Next.js client reads getUser().email from localStorage and passes
 *     it as the `email` query param.
 *   • This route attaches the service token (kept server-side) so Django
 *     accepts the call.
 *   • Django trusts the email the same way it trusts the billing email at
 *     checkout — Next.js is the trusted intermediary.
 *
 * If you later move to a stricter model (verify the user's session token
 * server-side and extract the email from the verified claims), only this
 * route changes — the Django side already accepts an email and is fine.
 *
 * Env vars:
 *   DJANGO_API_BASE_URL          — e.g. https://api.zoikoorbit.com
 *   DJANGO_API_TOKEN             — DRF service token
 *   DJANGO_MALIMA_MY_ORDERS_PATH — defaults to /api/v1/malima/my-orders/
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = (url.searchParams.get("email") || "").trim();
  const limit = url.searchParams.get("limit") || "50";
  const offset = url.searchParams.get("offset") || "0";

  if (!email) {
    return NextResponse.json(
      { success: false, message: "Missing 'email' query parameter." },
      { status: 400 }
    );
  }
  // Cheap sanity check — don't even round-trip if it's obviously not an email.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { success: false, message: "Invalid 'email' format." },
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
    process.env.DJANGO_MALIMA_MY_ORDERS_PATH ||
    "/api/v1/malima/my-orders/";
  const target = new URL(base.replace(/\/$/, "") + path);
  target.searchParams.set("email", email);
  target.searchParams.set("limit", limit);
  target.searchParams.set("offset", offset);

  const headers: Record<string, string> = {
    Accept: "application/json",
  };
  if (process.env.DJANGO_API_TOKEN) {
    headers.Authorization = `Token ${process.env.DJANGO_API_TOKEN}`;
  }

  try {
    const res = await fetch(target.toString(), {
      method: "GET",
      headers,
      // Customer data — always go to Django, never serve a stale cached copy.
      cache: "no-store",
    });
    const text = await res.text();
    let body: unknown;
    try {
      body = text ? JSON.parse(text) : null;
    } catch {
      body = text;
    }

    if (!res.ok) {
      console.error(`❌ Django my-orders failed (${res.status}):`, body);
      return NextResponse.json(
        {
          success: false,
          message: `Django returned ${res.status}`,
          response: body,
        },
        { status: 200 }    // surface details; let the page render an error UI
      );
    }

    return NextResponse.json(body, { status: 200 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Network error";
    console.error("❌ Django my-orders network error:", msg);
    return NextResponse.json(
      { success: false, message: msg },
      { status: 502 }
    );
  }
}
