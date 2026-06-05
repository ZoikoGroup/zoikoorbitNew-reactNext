"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardHero from "./sections/DashboardHero";

// ── Types ─────────────────────────────────────────────────────────────────────

interface MalimaOrderLine {
  cart_index: number;
  unit_index: number;
  plan_name: string;
  plan_id: string;
  sim_type: string;    // "eSIM" | "pSIM"
  msisdn: string;
  imsi: string;
  iccid: string;
  orange_order_id: string;
  qr_payload: string;
}

interface MalimaOrder {
  id: number;
  status: "success" | "partial" | "failed" | "pending";
  captured_at: string | null;
  customer_name: string;
  email: string;
  total: string | null;
  currency: string;
  stripe_payment_intent_id: string;
  lines: MalimaOrderLine[];
  line_count: number;
  has_esim: boolean;
  has_psim: boolean;
}

interface DataBalance {
  remaining: string;
  consumed: string;
  total: string;
  unit: string;   // always "MB" per Orange API 1.3
}

// One row from Orange Traffic Tracking REST API per bearer × origin pair
interface TrafficAmount {
  bearer_type: "DATA" | "VOICE" | "SMS";
  call_origin_type: "LOCAL" | "ROAMING";
  value: number;
  volume_type: string;
  sessions_number: number;
  subscription_id?: string;
  first_session_date_time?: string;
  last_session_date_time?: string;
}

interface TrafficPeriod {
  start_date: string;
  end_date: string;
}

interface SimInfo {
  msisdn: string;
  iccid: string;
  imsi: string;
  plan_name: string;
  sim_type: string;
  order_id: number;
  order_status: MalimaOrder["status"];
  // filled after parallel fetch
  balance: DataBalance | null;
  balanceLoading: boolean;
  balanceError: string | null;
  traffic: TrafficAmount[] | null;
  trafficPeriod: TrafficPeriod | null;
  trafficLoading: boolean;
  trafficError: string | null;
}

// ── Auth helpers ──────────────────────────────────────────────────────────────

function readUser(): { email?: string; username?: string; created_at?: string } | null {
  try { return JSON.parse(localStorage.getItem("zoikoorbit_user") || "null"); }
  catch { return null; }
}

function isLoggedIn(): boolean {
  return !!(localStorage.getItem("zoikoorbit_token") || localStorage.getItem("driverx_token"));
}

// ── Formatting helpers ────────────────────────────────────────────────────────

function fmtDate(iso: string | null): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch { return iso; }
}

function fmtMoney(total: string | null, currency: string): string {
  if (!total) return "—";
  const n = Number(total);
  if (!Number.isFinite(n)) return total;
  try { return new Intl.NumberFormat(undefined, { style: "currency", currency: currency || "USD" }).format(n); }
  catch { return `${n.toFixed(2)} ${currency}`; }
}

function mbDisplay(mb: number): string {
  return mb >= 1024 ? `${(mb / 1024).toFixed(1)} GB` : `${Math.round(mb)} MB`;
}

function pct(consumed: string, total: string): number {
  const c = Number(consumed), t = Number(total);
  return t > 0 ? Math.min(100, Math.round((c / t) * 100)) : 0;
}

// Aggregate traffic amounts for one SIM into a simple summary
function trafficSummary(amounts: TrafficAmount[]): {
  localDataMB: number; roamingDataMB: number; period?: string
} {
  let local = 0, roaming = 0;
  for (const a of amounts) {
    if (a.bearer_type !== "DATA") continue;
    // value is in KB per the spec (VolumeType)
    const mb = a.value / 1024;
    if (a.call_origin_type === "LOCAL") local += mb;
    else roaming += mb;
  }
  return { localDataMB: local, roamingDataMB: roaming };
}

// ── Small UI components ───────────────────────────────────────────────────────

function Spinner({ size = 8 }: { size?: number }) {
  return (
    <div className="flex justify-center py-10">
      <div className={`w-${size} h-${size} border-4 border-green-500 border-t-transparent rounded-full animate-spin`} role="status">
        <span className="sr-only">Loading…</span>
      </div>
    </div>
  );
}

function Skel({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`} />;
}

const STATUS_RING: Record<string, string> = {
  success: "bg-green-50 text-green-700 ring-green-600/20",
  partial: "bg-amber-50 text-amber-700 ring-amber-600/20",
  failed:  "bg-red-50 text-red-700 ring-red-600/20",
  pending: "bg-gray-50 text-gray-600 ring-gray-500/20",
};
const STATUS_LABEL: Record<string, string> = {
  success: "Active", partial: "Partial", failed: "Failed", pending: "Pending",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${STATUS_RING[status] ?? STATUS_RING.pending}`}>
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}

function UsageBar({ value, color = "bg-green-500" }: { value: number; color?: string }) {
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
      <div className={`${color} h-1.5 rounded-full transition-all`} style={{ width: `${value}%` }} />
    </div>
  );
}

// ── SimCard ───────────────────────────────────────────────────────────────────

function SimCard({ sim }: { sim: SimInfo }) {
  const p = sim.balance ? pct(sim.balance.consumed, sim.balance.total) : 0;
  const barColor = p > 90 ? "bg-red-500" : p > 70 ? "bg-amber-400" : "bg-green-500";
  const summary  = sim.traffic ? trafficSummary(sim.traffic) : null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{sim.plan_name || "SIM Plan"}</p>
          <p className="text-xs font-mono text-gray-400 mt-0.5 truncate">{sim.msisdn}</p>
        </div>
        <span className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${
          sim.sim_type.toLowerCase() === "esim" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"
        }`}>
          {sim.sim_type || "SIM"}
        </span>
      </div>

      {/* Data balance (API 1.3) */}
      {sim.balanceLoading ? (
        <div className="space-y-2">
          <Skel className="h-5 w-28" />
          <Skel className="h-1.5 w-full" />
        </div>
      ) : sim.balance ? (
        <div>
          <div className="flex justify-between items-end mb-1">
            <div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">{mbDisplay(Number(sim.balance.remaining))}</span>
              <span className="text-xs text-gray-400 ml-1">remaining</span>
            </div>
            <span className="text-xs text-gray-400">of {mbDisplay(Number(sim.balance.total))}</span>
          </div>
          <UsageBar value={p} color={barColor} />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{p}% used</span>
            <span>{mbDisplay(Number(sim.balance.consumed))} consumed</span>
          </div>
        </div>
      ) : (
        <p className="text-xs text-gray-400">{sim.balanceError || "Balance unavailable"}</p>
      )}

      {/* Traffic breakdown (Traffic Tracking REST API) */}
      {sim.trafficLoading ? (
        <Skel className="h-4 w-40" />
      ) : summary ? (
        <div className="grid grid-cols-2 gap-2 border-t border-gray-100 dark:border-gray-700 pt-3">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400 mb-0.5">Local data</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">{mbDisplay(summary.localDataMB)}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400 mb-0.5">Roaming data</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">{mbDisplay(summary.roamingDataMB)}</p>
          </div>
          {sim.trafficPeriod && (
            <p className="col-span-2 text-[10px] text-gray-400 mt-1">
              Billing cycle: {sim.trafficPeriod.start_date} → {sim.trafficPeriod.end_date}
            </p>
          )}
        </div>
      ) : null}

      {/* ICCID */}
      <p className="text-[10px] font-mono text-gray-500 dark:text-gray-600 truncate">ICCID: {sim.iccid}</p>

      {/* Actions */}
      <div className="flex gap-2 mt-auto pt-1">
        <Link href={`/dashboard/orders/${sim.order_id}`} className="flex-1 text-center px-2 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-white text-xs rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition">View Order</Link>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function MyAccountPage() {
  const router = useRouter();

  const [ready,     setReady]     = useState(false);
  const [userName,  setUserName]  = useState("Customer");
  const [userEmail, setUserEmail] = useState("");

  // Malima orders
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [orders,        setOrders]        = useState<MalimaOrder[]>([]);
  const [ordersError,   setOrdersError]   = useState<string | null>(null);

  // Per-SIM enriched data
  const [sims, setSims] = useState<SimInfo[]>([]);

  // Activate SIM modal
  const [showSimModal, setShowSimModal] = useState(false);

  // ── Auth gate ────────────────────────────────────────────────────
  useEffect(() => {
    if (!isLoggedIn()) { router.replace("/login?next=/dashboard"); return; }
    const u = readUser();
    setUserName(u?.username || u?.email?.split("@")[0] || "Customer");
    setUserEmail(u?.email || "");
    setReady(true);
  }, [router]);

  // ── Fetch Malima orders ──────────────────────────────────────────
  const loadOrders = useCallback(async (email: string) => {
    setOrdersLoading(true);
    setOrdersError(null);
    try {
      const res  = await fetch(`/api/malima/my-orders?email=${encodeURIComponent(email)}`, { cache: "no-store" });
      const data = await res.json();
      if (data.success && data.orders) {
        setOrders(data.orders);
      } else {
        setOrdersError(data.message || "Could not load orders.");
      }
    } catch (e) {
      setOrdersError(e instanceof Error ? e.message : "Network error");
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  useEffect(() => {
    if (ready && userEmail) loadOrders(userEmail);
  }, [ready, userEmail, loadOrders]);

  // ── Build SIM list + fetch balance & traffic in parallel ─────────
  useEffect(() => {
    if (ordersLoading || orders.length === 0) return;

    const seen = new Set<string>();
    const initial: SimInfo[] = [];

    for (const order of orders) {
      if (order.status === "failed") continue;
      for (const line of order.lines) {
        if (!line.msisdn || seen.has(line.msisdn)) continue;
        seen.add(line.msisdn);
        initial.push({
          msisdn: line.msisdn, iccid: line.iccid, imsi: line.imsi,
          plan_name: line.plan_name, sim_type: line.sim_type,
          order_id: order.id, order_status: order.status,
          balance: null, balanceLoading: true, balanceError: null,
          traffic: null, trafficPeriod: null, trafficLoading: true, trafficError: null,
        });
      }
    }

    if (initial.length === 0) return;
    setSims(initial);

    // Fire balance (API 1.3) + traffic (Traffic Tracking REST) in parallel per SIM
    initial.forEach((sim, idx) => {
      // ── API 1.3: data balance ──────────────────────────────────
      fetch("/api/malima/usage-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ msisdn: sim.msisdn }),
        cache: "no-store",
      })
        .then(r => r.json())
        .then((d: { success?: boolean; dataBalance?: DataBalance; message?: string }) => {
          setSims(prev => prev.map((s, i) => i !== idx ? s : {
            ...s,
            balanceLoading: false,
            balance: d.success && d.dataBalance ? d.dataBalance : null,
            balanceError: d.success ? null : (d.message || "No data"),
          }));
        })
        .catch(e => {
          setSims(prev => prev.map((s, i) => i !== idx ? s : {
            ...s, balanceLoading: false, balanceError: e instanceof Error ? e.message : "Error",
          }));
        });

      // ── Traffic Tracking REST API: current billing period amounts ─
      fetch(`/api/malima/traffic-amounts?subscriptionId=${encodeURIComponent(sim.msisdn)}&billingCycle=CURRENT`, {
        cache: "no-store",
      })
        .then(r => r.json())
        .then((d: { success?: boolean; amounts?: TrafficAmount[]; period?: TrafficPeriod; message?: string }) => {
          setSims(prev => prev.map((s, i) => i !== idx ? s : {
            ...s,
            trafficLoading: false,
            traffic: d.success && d.amounts ? d.amounts : null,
            trafficPeriod: d.period ?? null,
            trafficError: d.success ? null : (d.message || "No traffic data"),
          }));
        })
        .catch(e => {
          setSims(prev => prev.map((s, i) => i !== idx ? s : {
            ...s, trafficLoading: false, trafficError: e instanceof Error ? e.message : "Error",
          }));
        });
    });
  }, [ordersLoading, orders]);

  // ── Derived ───────────────────────────────────────────────────────
  const recentOrders  = orders.slice(0, 4);
  const successOrders = orders.filter(o => o.status === "success" || o.status === "partial");
  const noData        = !ordersLoading && orders.length === 0 && sims.length === 0;

  if (!ready) return <Spinner />;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero with dynamic stats */}
      <DashboardHero
        userName={userName}
        totalOrders={ordersLoading ? undefined : orders.length}
        activeSims={ordersLoading ? undefined : sims.length}
        loading={ordersLoading}
      />

      <main className="grow dark:bg-gray-900 dark:text-white bg-gray-100 py-8 px-4">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* ── Error banner ───────────────────────────────────────── */}
          {ordersError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {ordersError}
            </div>
          )}

          {/* ── New subscriber welcome ─────────────────────────────── */}
          {noData && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-10 text-center">
              <h3 className="text-xl font-bold mb-2">👋 Welcome to Zoiko Orbit, {userName}!</h3>
              <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
                Your account is ready. Choose a plan to unlock global eSIM/pSIM connectivity.
              </p>
              <div className="flex justify-center gap-3 flex-wrap">
                <button
                  onClick={() => setShowSimModal(true)}
                  className="px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition"
                >
                  Activate Your SIM
                </button>
                <Link href="/plans" className="px-5 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition">
                  View Plans
                </Link>
              </div>
            </div>
          )}

          {/* ── SIM Data Usage ─────────────────────────────────────── */}
          {(sims.length > 0 || ordersLoading) && (
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-gray-900 dark:text-white">SIM Data Usage</h2>
                {sims.length > 0 && (
                  <span className="text-xs text-gray-400">
                    {sims.length} SIM{sims.length !== 1 ? "s" : ""} · live from Orange
                  </span>
                )}
              </div>

              {ordersLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm space-y-3">
                      <Skel className="h-4 w-32" />
                      <Skel className="h-6 w-24" />
                      <Skel className="h-1.5 w-full" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sims.map((sim, i) => <SimCard key={i} sim={sim} />)}
                </div>
              )}
            </section>
          )}

          {/* ── Orders + Quick actions ─────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Recent orders */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900 dark:text-white">Order History</h2>
                <Link href="/dashboard/orders" className="text-sm text-green-600 hover:underline">View all →</Link>
              </div>

              {ordersLoading ? (
                <div className="space-y-4">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <div className="space-y-1.5"><Skel className="h-4 w-36" /><Skel className="h-3 w-24" /></div>
                      <Skel className="h-6 w-14" />
                    </div>
                  ))}
                </div>
              ) : recentOrders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 text-sm mb-4">No orders yet.</p>
                  <Link href="/plans" className="px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-700">Browse Plans</Link>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                  {recentOrders.map(o => {
                    const planSummary = o.lines.length === 0 ? "Order"
                      : o.lines.length === 1 ? o.lines[0].plan_name
                      : `${o.lines[0].plan_name} +${o.lines.length - 1} more`;
                    return (
                      <li key={o.id}>
                        <Link
                          href={`/dashboard/orders/${o.id}`}
                          className="flex items-center justify-between py-3 -mx-2 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/40 transition"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{planSummary}</p>
                              <StatusBadge status={o.status} />
                            </div>
                            <p className="text-xs text-gray-400 mt-0.5">
                              #{o.id} · {fmtDate(o.captured_at)} · {o.line_count} SIM{o.line_count !== 1 ? "s" : ""}
                              {o.has_esim ? " (eSIM)" : ""}{o.has_psim ? " (pSIM)" : ""}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 ml-4 shrink-0">
                            <span className="text-sm font-semibold">{fmtMoney(o.total, o.currency)}</span>
                            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Quick actions */}
            <div className="space-y-4">

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
                <h2 className="font-semibold text-gray-900 dark:text-white mb-1">Account</h2>
                <p className="text-xs text-gray-400 truncate mb-4">{userEmail || "—"}</p>
                <div className="flex flex-col gap-2">
                  <Link href="/dashboard/edit-profile" className="w-full text-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white text-sm rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    Edit Profile
                  </Link>
                  <Link href="/dashboard/security" className="w-full text-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white text-sm rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    Security Settings
                  </Link>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
                <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Plans</h2>
                <div className="flex flex-col gap-2">
                  <Link href="/plans" className="w-full text-center px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition">
                    Browse Plans
                  </Link>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
                <h2 className="font-semibold text-red-500 mb-3">Support</h2>
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs px-3 py-2 rounded mb-3">
                  Our support team is available 24/7
                </div>
                <div className="flex flex-col gap-2">
                  <Link href="https://zoiko-orbit-chatbot-git-722985113446.europe-west1.run.app/ui/" target="_blank" className="w-full text-center px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition">
                    Contact Support
                  </Link>
                  <Link href="/faqs-self-service" className="w-full text-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white text-sm rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    FAQ
                  </Link>
                </div>
              </div>

            </div>
          </div>

          {/* ── All SIMs summary table ─────────────────────────────── */}
          {sims.length > 0 && (
            <section>
              <h2 className="font-semibold text-gray-900 dark:text-white mb-3">My SIM Cards</h2>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-700 text-left">
                      <th className="px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Plan</th>
                      <th className="px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide hidden sm:table-cell">MSISDN</th>
                      <th className="px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Type</th>
                      <th className="px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Remaining</th>
                      <th className="px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide hidden md:table-cell">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {sims.map((sim, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                        <td className="px-5 py-3 font-medium text-gray-900 dark:text-white truncate max-w-[160px]">
                          {sim.plan_name || "—"}
                        </td>
                        <td className="px-5 py-3 font-mono text-gray-500 hidden sm:table-cell">{sim.msisdn}</td>
                        <td className="px-5 py-3">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            sim.sim_type.toLowerCase() === "esim" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"
                          }`}>
                            {sim.sim_type || "SIM"}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-gray-700 dark:text-gray-300">
                          {sim.balanceLoading ? <Skel className="h-4 w-16" />
                            : sim.balance ? mbDisplay(Number(sim.balance.remaining))
                            : <span className="text-gray-400 text-xs">—</span>}
                        </td>
                        <td className="px-5 py-3 hidden md:table-cell">
                          <StatusBadge status={sim.order_status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

        </div>
      </main>

      {/* ── Activate SIM Modal ──────────────────────────────────────── */}
      {showSimModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl mx-4">
            <div className="flex justify-between items-start px-6 py-5 border-b dark:border-gray-700">
              <div>
                <h4 className="font-bold text-xl">Get Your SIM in 3 Simple Steps</h4>
                <p className="text-gray-400 text-sm mt-0.5">Quick activation. Seamless connectivity. No paperwork.</p>
              </div>
              <button onClick={() => setShowSimModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none ml-4">&times;</button>
            </div>
            <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { step: 1, title: "Choose a Plan", desc: "Pick a plan — Unlimited, Prepaid, Postpaid, Business or Travel.", full: false },
                { step: 2, title: "Select SIM Type", desc: "Choose eSIM for instant activation or a physical SIM delivered to you.", full: false },
                { step: 3, title: "Activate & Go", desc: "Complete activation online and enjoy fast 4G/5G coverage within minutes.", full: true },
              ].map(({ step, title, desc, full }) => (
                <div key={step} className={`${full ? "md:col-span-2" : ""} p-4 rounded-lg border bg-gray-50 dark:bg-gray-700 dark:border-gray-600`}>
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm shrink-0">{step}</div>
                    <div>
                      <h6 className="font-semibold text-red-500 mb-1">{title}</h6>
                      <p className="text-gray-400 text-sm">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 pb-6 flex justify-center">
              <button
                className="px-8 py-2.5 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
                onClick={() => { setShowSimModal(false); router.push("/plans"); }}
              >
                View Plans &amp; Activate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}