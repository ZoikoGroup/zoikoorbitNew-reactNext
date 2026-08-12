"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getUser, isLoggedIn } from "@/utils/auth";

// ── Types matching the Django response ───────────────────────────────────────

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
  pagination?: { total: number; limit: number; offset: number; has_more: boolean };
  response?: unknown;
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function MyOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auth gate. Mirrors the existing pattern: if there's no driverx_token,
    // bounce to /login. The dashboard isn't useful without an email anyway.
    if (!isLoggedIn()) {
      router.replace("/login?next=/dashboard/orders");
      return;
    }
    const user = getUser();
    const email = user?.email;
    if (!email) {
      setError("We couldn't find your account email. Please sign in again.");
      setLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/api/malima/my-orders?email=${encodeURIComponent(email)}`,
          { cache: "no-store" },
        );
        const data: MyOrdersResponse = await res.json();
        if (cancelled) return;
        if (!data.success || !data.orders) {
          setError(data.message || "Couldn't load your orders.");
          setOrders([]);
        } else {
          setOrders(data.orders);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Network error.");
          setOrders([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            My Orders
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Your purchases and SIM activation codes.
          </p>
        </div>
        <Link
          href="/plans"
          className="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800"
        >
          Buy a plan
        </Link>
      </header>

      {loading && <OrdersSkeleton />}

      {!loading && error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      {!loading && !error && orders && orders.length === 0 && (
        <EmptyState />
      )}

      {!loading && !error && orders && orders.length > 0 && (
        <ul className="space-y-4">
          {orders.map((o) => (
            <OrderCard key={o.id} order={o} />
          ))}
        </ul>
      )}
    </div>
  );
}

// ── Components ───────────────────────────────────────────────────────────────

function OrderCard({ order }: { order: Order }) {
  const date = order.captured_at
    ? new Date(order.captured_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";
  const planSummary = summarisePlans(order.lines);

  return (
    <li className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <Link
        href={`/dashboard/orders/${order.id}`}
        className="flex items-center justify-between gap-4 p-5"
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-base font-semibold text-gray-900 dark:text-white">
              {planSummary}
            </p>
            <StatusBadge status={order.status} />
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
            <span>Order #{order.id}</span>
            <span aria-hidden>•</span>
            <span>{date}</span>
            <span aria-hidden>•</span>
            <span>
              {order.line_count} SIM{order.line_count === 1 ? "" : "s"}
              {order.has_esim && order.has_psim
                ? " (eSIM + pSIM)"
                : order.has_esim
                ? " (eSIM)"
                : order.has_psim
                ? " (pSIM)"
                : ""}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {formatMoney(order.total, order.currency)}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-400 dark:text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </Link>
    </li>
  );
}

function StatusBadge({ status }: { status: Order["status"] }) {
  const styles: Record<Order["status"], string> = {
    success: "bg-green-50 text-green-700 ring-green-600/20",
    partial: "bg-amber-50 text-amber-700 ring-amber-600/20",
    failed: "bg-red-50 text-red-700 ring-red-600/20",
    pending: "bg-gray-50 text-gray-600 ring-gray-500/20",
  };
  const label: Record<Order["status"], string> = {
    success: "Active",
    partial: "Partial",
    failed: "Failed",
    pending: "Pending",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[status]}`}
    >
      {label[status]}
    </span>
  );
}

function OrdersSkeleton() {
  return (
    <ul className="space-y-4" aria-hidden>
      {[0, 1, 2].map((i) => (
        <li
          key={i}
          className="h-24 animate-pulse rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-800"
        />
      ))}
    </ul>
  );
}

function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center dark:bg-gray-800">
      <h2 className="text-base font-semibold text-gray-900 dark:text-white">
        No orders yet
      </h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Once you purchase a plan, it'll show up here with your activation QR code.
      </p>
      <Link
        href="/plans"
        className="mt-4 inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800"
      >
        Browse plans
      </Link>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function summarisePlans(lines: OrderLine[]): string {
  if (lines.length === 0) return "Order";
  if (lines.length === 1) return lines[0].plan_name;
  // Multi-line: show first plan + count of others.
  const first = lines[0].plan_name;
  return `${first} + ${lines.length - 1} more`;
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
