import { NextResponse } from "next/server";

/**
 * Check service availability via the VCare / Lifeline enrollment API.
 *
 * POST /api/malima/check-coverage
 * Body: { zip_code: string; enrollment_type?: string }
 *
 * Forwards to:
 *   POST https://www.vcareapi.com:8080/enrollment
 *   action: "check_service_availability"
 *
 * Env vars:
 *   VCARE_AGENT_ID                  — required; your agent identifier
 *   VCARE_ENROLLMENT_TYPE           — default enrollment type (default: "LIFELINE")
 *   VCARE_API_URL                   — override the endpoint (optional)
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
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
  if (!zipCode || !/^\d{5}(-\d{4})?$/.test(zipCode.trim())) {
    return NextResponse.json(
      { success: false, message: "A valid 5-digit US ZIP code is required." },
      { status: 400 }
    );
  }

  const agentId = process.env.ORANGE_CLIENT_ID;
  if (!agentId) {
    return NextResponse.json(
      { success: false, message: "VCARE_AGENT_ID is not configured." },
      { status: 500 }
    );
  }

  const apiUrl =
    process.env.VCARE_API_URL || "https://www.vcareapi.com:8080/enrollment";

  const enrollmentType =
    (payload.enrollment_type as string | undefined) ||
    process.env.VCARE_ENROLLMENT_TYPE ||
    "LIFELINE";

  const body = {
    action: "check_service_availability",
    zip_code: zipCode.trim(),
    enrollment_type: enrollmentType,
    is_enrollment: "Y",
    agent_id: agentId,
    external_transaction_id: `COV-${Date.now()}`,
    source: "WEBSITE",
  };

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    let data: unknown;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    if (!res.ok) {
      console.error(`❌ VCare check-coverage failed (${res.status}):`, data);
      return NextResponse.json(
        {
          success: false,
          message: `VCare API returned ${res.status}`,
          response: data,
        },
        { status: 200 }
      );
    }

    const json = data as {
      msg_code?: string;
      msg?: string;
      data?: Record<string, unknown>;
      token?: string;
    };

    const isSuccess = json.msg_code === "RESTAPI000";

    return NextResponse.json({
      success: isSuccess,
      message: json.msg ?? (isSuccess ? "Coverage available" : "Not available"),
      available: isSuccess,
      data: json.data ?? null,
      token: json.token ?? null,
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