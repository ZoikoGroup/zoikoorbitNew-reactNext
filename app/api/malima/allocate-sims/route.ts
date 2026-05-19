import { NextResponse } from "next/server";

/**
 * Allocate SIM identifiers from Django.
 *
 * Forwards the cart (one entry per eSIM/pSIM line, possibly with `qty` > 1)
 * to Django, which:
 *   1. Picks msisdn/imsi/iccid triples from its SIM inventory
 *   2. Reserves them against the order
 *   3. Returns one allocation per cart unit, in cart order
 *
 * Django endpoint:
 *   POST {DJANGO_API_BASE_URL}/api/v1/malima/allocate-sims/
 *
 * Expected Django response shape (per allocation, in order):
 * {
 *   "success": true,
 *   "allocations": [
 *     {
 *       "cartIndex": 0,
 *       "unitIndex": 0,
 *       "msisdn": "337000072459500",
 *       "imsi":   "208019106847736",
 *       "iccid":  "89330124616474773670",
 *       "reservation_id": "abc-123"
 *     },
 *     ...
 *   ]
 * }
 *
 * If Django can't satisfy the full request, it should return success: false
 * with a `message` and ideally any partially-reserved ids so the caller
 * can release them.
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

  const base = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!base) {
    return NextResponse.json(
      {
        success: false,
        message:
          "BACKEND_API_BASE_URL is not configured.",
      },
      { status: 500 }
    );
  }

  const path = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/v1/malima/allocate-sims/";
  const url = base.replace(/\/$/, "") + path;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (process.env.DJANGO_API_TOKEN) {
    headers.Authorization = `Token ${process.env.DJANGO_API_TOKEN}`;
  }

  try {
    const res = await fetch(path, {
      method: "POST",
      headers,
      body: JSON.stringify({
        source: "zoiko-orbit-checkout",
        requested_at: new Date().toISOString(),
        ...(payload as Record<string, unknown>),
      }),
    });
    const text = await res.text();
    let body: unknown;
    try {
      body = text ? JSON.parse(text) : null;
    } catch {
      body = text;
    }

    if (!res.ok) {
      console.error(`❌ Django allocate-sims failed (${res.status}):`, body);
      return NextResponse.json(
        {
          success: false,
          message: `Django returned ${res.status}`,
          response: body,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(body);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Network error";
    console.error("❌ Django allocate-sims network error:", msg);
    return NextResponse.json(
      { success: false, message: msg },
      { status: 502 }
    );
  }
}
