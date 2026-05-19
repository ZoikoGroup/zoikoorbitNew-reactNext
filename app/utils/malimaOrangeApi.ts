"use client";

/**
 * Malima / Orange IoT — client orchestration helper
 * --------------------------------------------------
 *
 * Replaces the BeQuick `processOrderStripe` path entirely. New flow:
 *
 *   1. allocateSimsFromDjango(cart)
 *        Django reserves msisdn/imsi/iccid triples from its inventory.
 *   2. createMalimaOrder(enrichedCart)
 *        One POST per SIM to api.orange.com/.../productOrders/ via the
 *        internal /api/malima/create-order route (server-side OAuth2).
 *   3. saveMalimaOrderToDjango(malimaResponse, extra)
 *        Captures the full result + reservation ids + customer context
 *        in Django for reconciliation.
 *
 * The orchestrator `processOrderMalima` wires all three steps together so
 * the checkout component just calls it once.
 *
 * The browser never sees the Orange OAuth2 bearer; it lives server-side.
 */

// ── Types ────────────────────────────────────────────────────────────────────

export interface MalimaCartItem {
  cartIndex: number;
  unitIndex: number;
  planId?: string | number | null;
  bqPlanID?: string | null;
  planName?: string | null;
  simType?: string | null;             // "eSIM" | "pSIM" (others filtered out)
  durationDays?: number | string | null;
  dataVolume?: number | string | null;
  roamingZone?: string | null;
  msisdn?: string | null;              // filled by Django allocation
  imsi?: string | null;                // filled by Django allocation
  iccid?: string | null;               // filled by Django allocation
  reservation_id?: string | null;      // Django-side bookkeeping
  qty?: number;
}

export interface SimAllocation {
  cartIndex: number;
  unitIndex: number;
  msisdn: string;
  imsi: string;
  iccid: string;
  reservation_id?: string | null;
}

export interface AllocateResponse {
  success: boolean;
  message?: string;
  allocations?: SimAllocation[];
  response?: unknown;
}

export interface MalimaResult {
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

export interface MalimaCreateResponse {
  status: boolean;
  message: string;
  results: MalimaResult[];
}

export interface ProcessOrderResult {
  status: boolean;
  message: string;
  /** Reason it stopped, if status === false. One of:
   *  "empty_cart" | "allocate_failed" | "malima_failed" | "save_failed" | "ok" */
  stage: "empty_cart" | "allocate_failed" | "malima_failed" | "save_failed" | "ok";
  allocations: SimAllocation[];
  malima: MalimaCreateResponse;
  saved?: { success: boolean; message: string; response?: unknown };
}

// ── Cart shaping ─────────────────────────────────────────────────────────────

/**
 * Flatten the checkout cart into one MalimaCartItem per SIM **unit**.
 * Only eSIM/pSIM items go to Orange. Non-SIM lines (topups, device
 * protection, etc.) are dropped at this stage so allocations and Malima
 * calls all line up index-for-index.
 */
export function toMalimaCart(items: unknown[]): MalimaCartItem[] {
  if (!Array.isArray(items)) return [];
  const out: MalimaCartItem[] = [];

  items.forEach((raw, cartIndex) => {
    const item = raw as Record<string, unknown>;
    const simTypeRaw = (item.simType as string | null) ?? null;
    const simType = (simTypeRaw || "").toLowerCase();
    if (simType !== "esim" && simType !== "psim") return;

    const formData = (item.formData ?? {}) as Record<string, unknown>;
    const rawNested = (item._raw ?? {}) as Record<string, unknown>;
    const planTitle =
      (item.planTitle as string | null) ??
      (item.planName as string | null) ??
      "";

    // Try every place a duration could live, including the new `duration`
    // field your cart uses ("8 Days" as a string).
    const durationDays =
      item.durationDays ??
      item.duration ??              // ← "8 Days" style
      item.planDuration ??
      rawNested.durationDays ??
      null;

    // Data volume: explicit fields first, then try to extract from the plan
    // title. "Orbit Explore — 2GB • Europe & UK • 8 days" → "2" (GB).
    let dataVolume: unknown =
      item.dataVolume ??
      item.data_volume ??
      rawNested.dataVolume ??
      null;
    if (dataVolume == null && planTitle) {
      // Match "2GB", "500MB", "2 GB" (case-insensitive). Capture number + unit.
      const m = planTitle.match(/(\d+(?:\.\d+)?)\s*(GB|MB|G|M)\b/i);
      if (m) {
        const num = parseFloat(m[1]);
        const unit = m[2].toUpperCase();
        // Orange's `addedBucket.volume` is a string. The legacy WP plugin
        // passes GB-as-decimal like "0.2" or "2". MB users prefer integer
        // MB. We send GB-decimal because the doc examples use that style.
        dataVolume = (unit.startsWith("M") ? num / 1024 : num).toString();
      }
    }

    // Roaming zone: explicit fields first, then try a few well-known zone
    // names in the plan title.
    let roamingZone: unknown =
      item.roamingZone ??
      item.roaming_zone ??
      rawNested.roamingZone ??
      null;
    if (roamingZone == null && planTitle) {
      const lower = planTitle.toLowerCase();
      const zones = ["Europe", "UK", "USA", "World", "France", "Spain"];
      const found = zones.find((z) => lower.includes(z.toLowerCase()));
      if (found) roamingZone = found;
    }

    const qty = Math.max(
      1,
      Number(item.quantity ?? formData.priceQty ?? item.qty ?? 1) || 1,
    );

    for (let unitIndex = 0; unitIndex < qty; unitIndex++) {
      out.push({
        cartIndex,
        unitIndex,
        planId: (item.planId as string | number | null) ?? null,
        bqPlanID: (item.bqPlanID as string | null) ?? null,
        planName:
          (item.planName as string | null) ??
          (item.planTitle as string | null) ??
          null,
        simType: simTypeRaw,
        durationDays: durationDays as number | string | null,
        dataVolume: dataVolume as number | string | null,
        roamingZone: roamingZone as string | null,
        msisdn: null,
        imsi: null,
        iccid: null,
        reservation_id: null,
        qty: 1, // already flattened
      });
    }
  });

  return out;
}

// ── Step 1: allocate ─────────────────────────────────────────────────────────

/**
 * Ask Django to reserve SIM identifiers for every unit in the cart.
 */
export async function allocateSimsFromDjango(
  cart: MalimaCartItem[]
): Promise<AllocateResponse> {
  const res = await fetch("/api/malima/allocate-sims", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cart: cart.map((c) => ({
        cartIndex: c.cartIndex,
        unitIndex: c.unitIndex,
        planId: c.planId,
        bqPlanID: c.bqPlanID,
        simType: c.simType,
        roamingZone: c.roamingZone,
      })),
    }),
  });
  const json = (await res.json().catch(() => ({}))) as Partial<AllocateResponse>;
  return {
    success: Boolean(json.success),
    message: json.message || (res.ok ? "OK" : `HTTP ${res.status}`),
    allocations: Array.isArray(json.allocations) ? json.allocations : [],
    response: json.response,
  };
}

/**
 * Merge Django's allocations onto the cart. Match strictly by
 * (cartIndex, unitIndex) so re-ordering or partial allocations are safe.
 */
export function applyAllocations(
  cart: MalimaCartItem[],
  allocations: SimAllocation[]
): { enriched: MalimaCartItem[]; missing: MalimaCartItem[] } {
  const key = (c: { cartIndex: number; unitIndex: number }) =>
    `${c.cartIndex}:${c.unitIndex}`;
  const byKey = new Map(allocations.map((a) => [key(a), a]));

  const enriched: MalimaCartItem[] = [];
  const missing: MalimaCartItem[] = [];

  for (const item of cart) {
    const a = byKey.get(key(item));
    if (a && a.msisdn && a.imsi && a.iccid) {
      enriched.push({
        ...item,
        msisdn: a.msisdn,
        imsi: a.imsi,
        iccid: a.iccid,
        reservation_id: a.reservation_id ?? null,
      });
    } else {
      missing.push(item);
    }
  }
  return { enriched, missing };
}

// ── Step 2: create on Orange ─────────────────────────────────────────────────

export async function createMalimaOrder(
  cart: MalimaCartItem[]
): Promise<MalimaCreateResponse> {
  const res = await fetch("/api/malima/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart }),
  });
  const json = (await res.json().catch(() => ({}))) as Partial<MalimaCreateResponse>;
  return {
    status: Boolean(json.status),
    message: json.message || (res.ok ? "OK" : `HTTP ${res.status}`),
    results: Array.isArray(json.results) ? json.results : [],
  };
}

// ── Step 3: save ─────────────────────────────────────────────────────────────

export async function saveMalimaOrderToDjango(
  malimaResponse: MalimaCreateResponse,
  extra: Record<string, unknown> = {}
): Promise<{ success: boolean; message: string; response?: unknown }> {
  const res = await fetch("/api/malima/save-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ malima: malimaResponse, ...extra }),
  });
  const json = (await res.json().catch(() => ({}))) as {
    success?: boolean;
    message?: string;
    response?: unknown;
  };
  return {
    success: Boolean(json.success),
    message: json.message || (res.ok ? "OK" : `HTTP ${res.status}`),
    response: json.response,
  };
}

// ── Orchestrator ─────────────────────────────────────────────────────────────

/**
 * Full Malima order pipeline. Replaces `processOrderStripe`.
 *
 * @param rawCart    cart from localStorage / state (the same `products`
 *                   array previously passed to processOrderStripe)
 * @param context    extra metadata to persist alongside the Malima record
 *                   (billing address, totals, payment intent id, etc.)
 *
 * Behaviour:
 *   - If the cart has no eSIM/pSIM items → returns status:true, stage:"empty_cart".
 *     The checkout flow should treat that as "nothing to do on Orange" and
 *     proceed (this would happen for a pure topup or device-protection cart).
 *   - If allocation fails → returns status:false, stage:"allocate_failed".
 *     Nothing has been sent to Orange yet; checkout should refund / surface
 *     the error.
 *   - If at least one Orange call fails → returns status:false,
 *     stage:"malima_failed". The Django save still runs so operators can
 *     reconcile, and `result.malima.results[i]` shows per-SIM outcomes.
 *   - If save fails but Orange succeeded → returns status:false,
 *     stage:"save_failed". Operator must reconcile from Orange directly.
 */
export async function processOrderMalima(
  rawCart: unknown[],
  context: Record<string, unknown> = {}
): Promise<ProcessOrderResult> {
  const empty: MalimaCreateResponse = {
    status: true,
    message: "skipped",
    results: [],
  };

  // 0️⃣ Flatten + filter
  const flatCart = toMalimaCart(rawCart);
  if (flatCart.length === 0) {
    return {
      status: true,
      message: "No eSIM/pSIM items in cart — Malima skipped.",
      stage: "empty_cart",
      allocations: [],
      malima: empty,
    };
  }

  // 1️⃣ Allocate SIMs via Django
  const alloc = await allocateSimsFromDjango(flatCart);
  if (!alloc.success || !alloc.allocations || alloc.allocations.length === 0) {
    return {
      status: false,
      message: alloc.message || "SIM allocation failed.",
      stage: "allocate_failed",
      allocations: alloc.allocations ?? [],
      malima: empty,
    };
  }

  const { enriched, missing } = applyAllocations(flatCart, alloc.allocations);
  if (missing.length > 0) {
    return {
      status: false,
      message: `SIM allocation incomplete — ${missing.length} unit(s) without identifiers.`,
      stage: "allocate_failed",
      allocations: alloc.allocations,
      malima: empty,
    };
  }

  // 2️⃣ Create product orders on Orange (one POST per SIM, parallel server-side)
  const malima = await createMalimaOrder(enriched);

  // 3️⃣ Persist everything to Django — even on Malima failure, so an operator
  //     can reconcile from the captured request/response and reservation ids.
  const saved = await saveMalimaOrderToDjango(malima, {
    ...context,
    allocations: alloc.allocations,
    enriched_cart: enriched,
  });

  if (!malima.status) {
    return {
      status: false,
      message: malima.message,
      stage: "malima_failed",
      allocations: alloc.allocations,
      malima,
      saved,
    };
  }
  if (!saved.success) {
    return {
      status: false,
      message: saved.message,
      stage: "save_failed",
      allocations: alloc.allocations,
      malima,
      saved,
    };
  }

  return {
    status: true,
    message: "Order processed successfully via Malima/Orange.",
    stage: "ok",
    allocations: alloc.allocations,
    malima,
    saved,
  };
}

export default {
  toMalimaCart,
  applyAllocations,
  allocateSimsFromDjango,
  createMalimaOrder,
  saveMalimaOrderToDjango,
  processOrderMalima,
};
