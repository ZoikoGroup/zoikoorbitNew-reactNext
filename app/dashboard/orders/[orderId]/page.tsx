"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import QRCode from "@/components/QRCode";
import { getUser, isLoggedIn } from "@/utils/auth";

// ── Types (kept in sync with the orders list page) ──────────────────────────

interface OrderLine {
  cart_index: number;
  unit_index: number;
  plan_name: string;
  plan_id: string;
  sim_type: string;
  msisdn: string;
  imsi: string;
  iccid: string;
  orange_order_id: string;
  qr_payload: string;
}

interface Order {
  id: number;
  status: "success" | "partial" | "failed" | "pending";
  captured_at: string | null;
  customer_name: string;
  email: string;
  total: string | null;
  currency: string;
  stripe_payment_intent_id: string;
  lines: OrderLine[];
  line_count: number;
  has_esim: boolean;
  has_psim: boolean;
}

interface MyOrdersResponse {
  success: boolean;
  message: string;
  orders?: Order[];
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams<{ orderId: string }>();
  const orderId = Number(params?.orderId);

  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace(`/login?next=/dashboard/orders/${orderId}`);
      return;
    }
    const user = getUser();
    const email = user?.email;
    if (!email) {
      setError("We couldn't find your account email. Please sign in again.");
      setLoading(false);
      return;
    }
    if (!Number.isFinite(orderId)) {
      setError("Invalid order id.");
      setLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        // We reuse the /my-orders endpoint and find the matching order. Saves
        // adding a dedicated single-order endpoint; orders are small.
        const res = await fetch(
          `/api/malima/my-orders?email=${encodeURIComponent(email)}`,
          { cache: "no-store" },
        );
        const data: MyOrdersResponse = await res.json();
        if (cancelled) return;
        if (!data.success || !data.orders) {
          setError(data.message || "Couldn't load your order.");
          return;
        }
        const found = data.orders.find((o) => o.id === orderId);
        if (!found) {
          setError("Order not found, or it doesn't belong to this account.");
          return;
        }
        setOrder(found);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Network error.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [orderId, router]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm">
        <Link
          href="/dashboard/orders"
          className="text-gray-500 hover:text-gray-900"
        >
          ← Back to my orders
        </Link>
      </nav>

      {loading && <DetailSkeleton />}

      {!loading && error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && order && <OrderDetail order={order} />}
    </div>
  );
}

// ── Order detail body ───────────────────────────────────────────────────────

function OrderDetail({ order }: { order: Order }) {
  const date = order.captured_at
    ? new Date(order.captured_at).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  return (
    <>
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Order #{order.id}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Placed {date} · {formatMoney(order.total, order.currency)}
        </p>
      </header>

      {order.lines.length === 0 ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          This order has no active lines yet. If you just placed it, check back
          in a minute. If it's been longer, contact support.
        </div>
      ) : (
        <div className="space-y-6">
          {order.lines.map((line) => (
            <LineCard key={`${line.cart_index}-${line.unit_index}`} line={line} />
          ))}
        </div>
      )}

      <footer className="mt-10 text-xs text-gray-400">
        Trouble activating? <a href="mailto:support@zoikoorbit.com" className="text-gray-600 underline-offset-2 hover:underline">Email support</a>
        {order.stripe_payment_intent_id && (
          <> · Payment ref: <code className="font-mono">{order.stripe_payment_intent_id}</code></>
        )}
      </footer>
    </>
  );
}

function LineCard({ line }: { line: OrderLine }) {
  const isEsim = line.sim_type.toLowerCase() === "esim";
  const isPsim = line.sim_type.toLowerCase() === "psim";

  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-6 py-4">
        <h2 className="text-base font-semibold text-gray-900">
          {line.plan_name}
        </h2>
        <p className="mt-1 text-xs text-gray-500">
          {line.sim_type || "SIM"}
          {line.msisdn && (
            <>
              {" · "}
              <span className="font-mono">{line.msisdn}</span>
            </>
          )}
        </p>
      </div>

      <div className="grid gap-6 px-6 py-6 md:grid-cols-[auto,1fr] md:items-start">
        {isEsim && line.qr_payload && (
          <QRCode value={line.qr_payload} size={200} label="Scan to install" />
        )}

        {isEsim && !line.qr_payload && (
          <div className="flex h-[228px] w-[228px] items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-center text-xs text-gray-500">
            Activation code unavailable. Please contact support.
          </div>
        )}

        {isPsim && (
          <div className="flex h-[228px] w-[228px] items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-center text-sm text-gray-700">
            Insert your physical SIM card
          </div>
        )}

        <div className="space-y-4">
          {isEsim && (
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                How to install
              </h3>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-gray-600">
                <li>Open <span className="font-medium">Settings → Cellular</span> on your phone.</li>
                <li>Tap <span className="font-medium">Add eSIM</span> (or <span className="font-medium">Add Cellular Plan</span>).</li>
                <li>Scan the QR code on this screen with your phone's camera.</li>
                <li>Follow the prompts to install and label your plan.</li>
              </ol>
            </div>
          )}

          {isEsim && line.qr_payload && (
            <CopyableField label="Activation code (manual entry)" value={line.qr_payload} />
          )}

          <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 text-xs">
            <Field label="ICCID" value={line.iccid} mono />
            <Field label="IMSI" value={line.imsi} mono />
            {line.msisdn && <Field label="Phone number" value={line.msisdn} mono />}
            {line.orange_order_id && (
              <Field label="Carrier ref" value={line.orange_order_id} mono />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

// ── Bits ────────────────────────────────────────────────────────────────────

function Field({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <dt className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
        {label}
      </dt>
      <dd className={`mt-0.5 text-gray-700 ${mono ? "font-mono" : ""}`}>
        {value}
      </dd>
    </div>
  );
}

function CopyableField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Older browsers — silently no-op rather than alerting. The text is
      // visible on screen so they can still select-and-copy.
    }
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900">{label}</h3>
      <p className="mt-1 text-xs text-gray-500">
        If your phone can't scan the QR, enter this code manually under
        "Use Activation Code → Enter Details Manually".
      </p>
      <div className="mt-2 flex items-center gap-2">
        <code className="flex-1 break-all rounded-md border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-xs text-gray-800">
          {value}
        </code>
        <button
          type="button"
          onClick={copy}
          className="inline-flex shrink-0 items-center rounded-md border border-gray-200 bg-white px-2.5 py-2 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="space-y-6" aria-hidden>
      <div className="h-8 w-48 animate-pulse rounded bg-gray-100" />
      <div className="h-64 animate-pulse rounded-xl border border-gray-200 bg-gray-50" />
    </div>
  );
}

function formatMoney(total: string | null, currency: string): string {
  if (!total) return "—";
  const n = Number(total);
  if (!Number.isFinite(n)) return total;
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency || "USD",
    }).format(n);
  } catch {
    return `${n.toFixed(2)} ${currency}`;
  }
}
